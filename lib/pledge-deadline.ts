/**
 * Pledging closes at the start of April 2, 2026 in America/Los_Angeles
 * (Pacific; uses PDT UTC−7 on that date — “PST” colloquially).
 */
export const PLEDGE_DEADLINE_MS = Date.parse("2026-04-02T07:00:00.000Z");

export function isPledgeWindowOpen(now = Date.now()): boolean {
  return now < PLEDGE_DEADLINE_MS;
}

export function pledgeWindowMeta() {
  return {
    pledgeDeadlineMs: PLEDGE_DEADLINE_MS,
    pledgeWindowOpen: isPledgeWindowOpen(),
  };
}
