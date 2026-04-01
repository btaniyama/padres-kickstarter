/** Parody fundraising goal: $3B in cents */
export const GOAL_CENTS = 300_000_000_000;

/** Max fake dollars per single pledge ($1M) */
export const MAX_PLEDGE_DOLLARS = 1_000_000;

/** Trap amount: submitting this opens the “magic word” modal instead of posting. */
export const MAGIC_WORD_PLEDGE_DOLLARS = 1_000_000_000;
export const MAGIC_WORD_PLEDGE_CENTS = MAGIC_WORD_PLEDGE_DOLLARS * 100;

/**
 * Same GIF as tumblr.com/post/16216399525 — served from /public so it always loads
 * (Tumblr’s “.gifv” URL is still a GIF; `<video>` cannot play it).
 */
export const MAGIC_WORD_MEDIA_PATH = "/magic-word.gif";

/** Recent pledge comments stored newest-first (LPUSH). */
export const RECENT_PLEDGES_MAX = 500;

/** Max characters for pledge comment */
export const MAX_COMMENT_LENGTH = 500;

export const REDIS_KEYS = {
  totalCents: "padres_parody:total_cents",
  backerCount: "padres_parody:backer_count",
  recentPledges: "padres_parody:recent_pledges",
} as const;
