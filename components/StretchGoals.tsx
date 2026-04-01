"use client";

import { formatUsdFromCents } from "@/lib/format";
import { STRETCH_GOALS } from "@/lib/stretch-goals";
import { cn } from "@/lib/cn";
import { useCampaignStats } from "./CampaignStatsProvider";

/** List + intro; section chrome (label / H2) lives on the page. */
export function StretchGoals() {
  const { stats } = useCampaignStats();
  const total = stats?.totalCents ?? 0;
  const goal = stats?.goalCents ?? 0;
  const pastBase = goal > 0 && total >= goal;

  return (
    <>
      <p className="text-[13px] leading-relaxed text-stone-600">
        {pastBase
          ? "Fake milestones beyond the base goal. Same spirit, more ambition."
          : "Unlock after we cross the base funding goal — then keep climbing."}
      </p>

      <ul className="mt-4 space-y-2">
        {STRETCH_GOALS.map((sg) => {
          const unlocked = total >= sg.unlockAtCents;
          return (
            <li
              key={sg.id}
              className={cn(
                "list-none rounded-xl border px-3 py-2.5 transition-colors sm:px-4",
                unlocked
                  ? "border-emerald-200/90 bg-emerald-50/70"
                  : "border-stone-100 bg-stone-50/50",
              )}
            >
              <div className="flex items-start gap-2">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                    unlocked
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-200 text-stone-500",
                  )}
                  aria-hidden
                >
                  {unlocked ? "✓" : "·"}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-[15px] font-semibold leading-snug",
                      unlocked ? "text-emerald-950" : "text-stone-800",
                    )}
                  >
                    {sg.title}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-[14px] leading-relaxed",
                      unlocked ? "text-emerald-900/90" : "text-stone-600",
                    )}
                  >
                    {sg.body}
                  </p>
                  <p className="mt-1.5 text-[11px] tabular-nums text-stone-500">
                    Unlocks at{" "}
                    <span className="font-medium text-stone-600">
                      {formatUsdFromCents(sg.unlockAtCents)}
                    </span>{" "}
                    raised
                    {unlocked ? (
                      <span className="text-emerald-700"> · Unlocked</span>
                    ) : null}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
