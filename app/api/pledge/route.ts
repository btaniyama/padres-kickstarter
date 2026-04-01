import { NextResponse } from "next/server";
import { NO_STORE_JSON_HEADERS } from "@/lib/api-cache-headers";
import { MAX_PLEDGE_DOLLARS } from "@/lib/constants";
import { getPledgeRatelimit } from "@/lib/ratelimit";
import { addPledge, normalizeComment } from "@/lib/stats";

export const dynamic = "force-dynamic";

const MAX_PLEDGE_CENTS = MAX_PLEDGE_DOLLARS * 100;

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  const limiter = getPledgeRatelimit();
  if (limiter) {
    const { success } = await limiter.limit(clientIp(req));
    if (!success) {
      return NextResponse.json(
        { error: "Too many pledges. Try again in a minute." },
        { status: 429 },
      );
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const amountCents =
    typeof body === "object" &&
    body !== null &&
    "amountCents" in body &&
    typeof (body as { amountCents: unknown }).amountCents === "number"
      ? Math.floor((body as { amountCents: number }).amountCents)
      : null;

  if (amountCents === null || !Number.isFinite(amountCents)) {
    return NextResponse.json({ error: "amountCents must be a number" }, { status: 400 });
  }

  if (amountCents < 1) {
    return NextResponse.json(
      { error: "amountCents must be at least 1" },
      { status: 400 },
    );
  }

  if (amountCents > MAX_PLEDGE_CENTS) {
    return NextResponse.json(
      { error: `amountCents cannot exceed ${MAX_PLEDGE_CENTS} ($${MAX_PLEDGE_DOLLARS.toLocaleString()} fake)` },
      { status: 400 },
    );
  }

  const commentRaw =
    typeof body === "object" &&
    body !== null &&
    "comment" in body
      ? (body as { comment: unknown }).comment
      : undefined;

  const commentResult = normalizeComment(commentRaw);
  if (!commentResult.ok) {
    return NextResponse.json({ error: commentResult.error }, { status: 400 });
  }

  try {
    const stats = await addPledge(amountCents, commentResult.value);
    return NextResponse.json(stats, { headers: NO_STORE_JSON_HEADERS });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to record pledge" }, { status: 500 });
  }
}
