import { GOAL_CENTS } from "./constants";

/** Extra fake dollars on top of base goal (absolute totals are GOAL + each). */
function overGoalDollars(extra: number): number {
  return GOAL_CENTS + Math.round(extra * 100);
}

/**
 * Cumulative fake USD raised (in cents) required to unlock each stretch.
 * Owner‑bucket logic, punch‑up tone—parody.
 */
export const STRETCH_GOALS = [
  {
    id: "sg-0",
    unlockAtCents: GOAL_CENTS,
    title: "Crowdfunded crown jewel (allegedly)",
    body: "We clear the fake bar to pretend the fans bankrolled the franchise. Cap table theater, a trust that sounds legit in a headline, and one laminated badge that says “Owner” for whoever posts the most in game threads.",
  },
  {
    id: "sg-1",
    unlockAtCents: overGoalDollars(250_000_000),
    title: "Petco, but make it obnoxious (in a good way)",
    body: "Mist fans, shorter beer lines, and club access where you can actually hear yourself think before the eighth. If we’re going to stress about leverage counts, we’ll do it somewhere with air conditioning.",
  },
  {
    id: "sg-2",
    unlockAtCents: overGoalDollars(500_000_000),
    title: "The “we’re not rebuilding” fund",
    body: "Payroll runway to keep the core, shop in the deep end of free agency, and sign the guy whose agent sends texts that make the NL West group chat go quiet.",
  },
  {
    id: "sg-3",
    unlockAtCents: overGoalDollars(1_000_000_000),
    title: "Teenagers who throw smoke (legally)",
    body: "Instructional league, international bonus pool oxygen, and a performance staff obsessed with spin and sleep. Boring on a spreadsheet, rude on a radar gun.",
  },
  {
    id: "sg-4",
    unlockAtCents: overGoalDollars(2_000_000_000),
    title: "Commissioner speed‑dial energy",
    body: "All‑Star Game ammo, league dinners where nobody orders salad on purpose, and enough goodwill that when the next pace‑of‑play brainstorm happens, our time zone gets a seat at the table.",
  },
] as const;
