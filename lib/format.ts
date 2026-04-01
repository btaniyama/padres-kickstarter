export function formatUsdFromCents(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(dollars);
}

/** Capped at 100 — use for progress bar width. */
export function percentFunded(totalCents: number, goalCents: number): number {
  if (goalCents <= 0) return 0;
  return Math.min(100, (totalCents / goalCents) * 100);
}

/** Uncapped % of goal (can exceed 100 when over-funded). */
export function percentOfGoal(totalCents: number, goalCents: number): number {
  if (goalCents <= 0) return 0;
  return (totalCents / goalCents) * 100;
}
