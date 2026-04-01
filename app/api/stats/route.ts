import { NextResponse } from "next/server";
import { NO_STORE_JSON_HEADERS } from "@/lib/api-cache-headers";
import { getStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats, { headers: NO_STORE_JSON_HEADERS });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 },
    );
  }
}
