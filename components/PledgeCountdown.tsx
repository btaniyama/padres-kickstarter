"use client";

import { PLEDGE_DEADLINE_MS } from "@/lib/pledge-deadline";
import { usePledgeClock } from "@/hooks/use-pledge-clock";
import { useCampaignStats } from "./CampaignStatsProvider";

function formatRemaining(ms: number): string {
  if (ms <= 0) return "0s";
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  parts.push(`${hours}h`);
  parts.push(`${mins}m`);
  parts.push(`${String(secs).padStart(2, "0")}s`);
  return parts.join(" ");
}

type Variant = "hero" | "panel";

export function PledgeCountdown({ variant }: { variant: Variant }) {
  const { stats } = useCampaignStats();
  const now = usePledgeClock();
  const deadlineMs = stats?.pledgeDeadlineMs ?? PLEDGE_DEADLINE_MS;
  const remaining = Math.max(0, deadlineMs - now);
  const effectiveOpen = remaining > 0;

  if (variant === "hero") {
    return (
      <div
        className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-4 sm:p-5"
        role="status"
        aria-live="polite"
      >
        <p className="text-[13px] font-semibold text-stone-700">
          Time left to pledge
        </p>
        {effectiveOpen ? (
          <p className="mt-2 font-heading text-2xl font-semibold tabular-nums tracking-tight text-stone-900 sm:text-3xl">
            {formatRemaining(remaining)}
          </p>
        ) : (
          <p className="mt-2 font-heading text-lg font-semibold text-stone-800 sm:text-xl">
            Pledging has closed
          </p>
        )}
        <p className="mt-0.5 text-xs text-stone-500">
          Closes at midnight Pacific · April 2, 2026
        </p>
      </div>
    );
  }

  return (
    <div
      className="mb-4 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-[13px] text-stone-700 shadow-sm"
      role="status"
      aria-live="polite"
    >
      <span className="font-semibold text-stone-800">Time left: </span>
      {effectiveOpen ? (
        <span className="tabular-nums font-medium text-stone-900">
          {formatRemaining(remaining)}
        </span>
      ) : (
        <span className="font-medium text-stone-700">ended</span>
      )}
    </div>
  );
}
