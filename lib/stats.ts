import {
  GOAL_CENTS,
  MAX_COMMENT_LENGTH,
  RECENT_PLEDGES_MAX,
  REDIS_KEYS,
} from "./constants";
import type { CampaignStats, PledgeEntry } from "./campaign-types";
import { isPledgeWindowOpen, pledgeWindowMeta } from "./pledge-deadline";
import { redis } from "./redis";

export type { CampaignStats, PledgeEntry } from "./campaign-types";

export type Stats = Pick<
  CampaignStats,
  "totalCents" | "backerCount" | "goalCents"
>;

export type StatsWithPledges = CampaignStats;

const memory: Stats = {
  totalCents: 0,
  backerCount: 0,
  goalCents: GOAL_CENTS,
};

const memoryPledges: PledgeEntry[] = [];

/**
 * Upstash deserializes list values to objects; in-memory path uses plain objects.
 * Only raw Redis strings need JSON.parse.
 */
function parsePledgeLine(raw: unknown): PledgeEntry | null {
  try {
    const p: unknown =
      typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
    if (
      p !== null &&
      typeof p === "object" &&
      "amountCents" in p &&
      "comment" in p &&
      "createdAt" in p &&
      typeof (p as PledgeEntry).amountCents === "number" &&
      typeof (p as PledgeEntry).comment === "string" &&
      typeof (p as PledgeEntry).createdAt === "number"
    ) {
      return p as PledgeEntry;
    }
  } catch {
    /* skip */
  }
  return null;
}

async function loadRecentPledges(): Promise<PledgeEntry[]> {
  if (!redis) {
    return [...memoryPledges];
  }
  const lines = await redis.lrange(REDIS_KEYS.recentPledges, 0, RECENT_PLEDGES_MAX - 1);
  const out: PledgeEntry[] = [];
  for (const line of lines) {
    const p = parsePledgeLine(line);
    if (p) out.push(p);
  }
  return out;
}

export async function getStats(): Promise<StatsWithPledges> {
  const recentPledges = await loadRecentPledges();
  const window = pledgeWindowMeta();
  if (!redis) {
    return { ...memory, recentPledges, ...window };
  }
  const [totalRaw, backerRaw] = await Promise.all([
    redis.get<string | number>(REDIS_KEYS.totalCents),
    redis.get<string | number>(REDIS_KEYS.backerCount),
  ]);
  const totalCents = Number(totalRaw ?? 0);
  const backerCount = Number(backerRaw ?? 0);
  return {
    totalCents,
    backerCount,
    goalCents: GOAL_CENTS,
    recentPledges,
    ...window,
  };
}

export function normalizeComment(raw: unknown): { ok: true; value: string } | { ok: false; error: string } {
  if (typeof raw !== "string") {
    return { ok: false, error: "comment is required" };
  }
  const trimmed = raw.trim().replace(/\0/g, "");
  if (trimmed.length === 0) {
    return { ok: false, error: "Add a comment with your pledge." };
  }
  if (trimmed.length > MAX_COMMENT_LENGTH) {
    return {
      ok: false,
      error: `Comment must be ${MAX_COMMENT_LENGTH} characters or fewer.`,
    };
  }
  return { ok: true, value: trimmed };
}

export async function addPledge(
  amountCents: number,
  comment: string,
): Promise<StatsWithPledges> {
  if (!isPledgeWindowOpen()) {
    throw new Error("PLEDGE_CLOSED");
  }
  const entry: PledgeEntry = {
    amountCents,
    comment,
    createdAt: Date.now(),
  };
  const serialized = JSON.stringify(entry);

  if (!redis) {
    memory.totalCents += amountCents;
    memory.backerCount += 1;
    memoryPledges.unshift(entry);
    if (memoryPledges.length > RECENT_PLEDGES_MAX) {
      memoryPledges.length = RECENT_PLEDGES_MAX;
    }
    return getStats();
  }

  await redis
    .pipeline()
    .incrby(REDIS_KEYS.totalCents, amountCents)
    .incr(REDIS_KEYS.backerCount)
    .lpush(REDIS_KEYS.recentPledges, serialized)
    .ltrim(REDIS_KEYS.recentPledges, 0, RECENT_PLEDGES_MAX - 1)
    .exec();

  return getStats();
}
