import { GOAL_CENTS } from "./constants";

/** Extra dollars on top of headline goal (absolute total = GOAL + extra). */
function overGoalDollars(extra: number): number {
  return GOAL_CENTS + Math.round(extra * 100);
}

/**
 * Cumulative fake USD raised (in cents) required to unlock each stretch.
 * Base goal first, then +$500M steps; final tier jumps to $10B (parody).
 */
export const STRETCH_GOALS = [
  {
    id: "sg-0",
    unlockAtCents: GOAL_CENTS,
    title: "WE OWN THE TEAM",
    body: "We clear the fake bar to pretend the fans bankrolled the franchise. Cap table theater, a trust that sounds legit in a headline, and one laminated badge that says “Owner” for whoever posts the most in game threads.",
  },
  {
    id: "sg-1",
    unlockAtCents: overGoalDollars(500_000_000),
    title: "The great California burrito wall",
    body: "Every section at Petco gets a dedicated California burrito stand—guac ethics committee on retainer, foil-to-hand ratio optimized, and a gentle rule that you may not return to your seat until you’ve made at least one questionable hot-sauce decision.",
  },
  {
    id: "sg-2",
    unlockAtCents: overGoalDollars(1_000_000_000),
    title: "Project Cyborg Elbow (simulated)",
    body: "We invest heavily in extremely fictional bionic-arm R&D. Yu Darvish now throws an entirely unreasonable 110 mph in this timeline. MLB has questions. We have a PDF that says “fan engagement.”",
  },
  {
    id: "sg-3",
    unlockAtCents: overGoalDollars(1_500_000_000),
    title: "NLBest™ — jersey sponsor of destiny",
    body: "The NL West is dead; long live NLBest™—our new chest-patch energy drink / lifestyle brand / coping mechanism. Not affiliated with reality, nutrition, or anyone who understands trademarks.",
  },
  {
    id: "sg-4",
    unlockAtCents: overGoalDollars(2_000_000_000),
    title: "Trolley to third; Manny with a Stone IPA",
    body: "We extend the trolley so it drops you off directly at third base.. Manny Machado personally greets you with a Stone IPA—cold, confident, and technically not part of any CBA we’ve read.",
  },
  {
    id: "sg-5",
    unlockAtCents: overGoalDollars(2_500_000_000),
    title: "Rey Mysterio Jr. night… forever",
    body: "All players must wear Rey Mysterio Jr. masks for the full nine. Umpires pretend not to notice. Broadcast adds lucha commentary. The Friar finally feels seen.",
  },
  {
    id: "sg-6",
    /** $3.5B goal + $6.5B = $10B cumulative (not `overGoalDollars(10e9)` — that would be $13.5B). */
    unlockAtCents: overGoalDollars(6_500_000_000),
    title: "The $10B fork in the road",
    body: "We buy the Chargers and haul the bolts back to San Diego where they belong—or we buy the Dodgers and dissolve them. Dealer's choice. Parody. Obviously.",
  },
] as const;
