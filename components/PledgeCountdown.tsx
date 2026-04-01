"use client";

import { PLEDGE_DEADLINE_MS } from "@/lib/pledge-deadline";
import { cn } from "@/lib/cn";
import { usePledgeClock } from "@/hooks/use-pledge-clock";
import { useCampaignStats } from "./CampaignStatsProvider";

const MS_1H = 60 * 60 * 1000;
const MS_4H = 4 * MS_1H;

/** Under 4h (but not final hour) vs under 1h — drives urgency styling. */
function urgencyLevel(remainingMs: number): "normal" | "soon" | "urgent" {
  if (remainingMs <= 0) return "normal";
  if (remainingMs < MS_1H) return "urgent";
  if (remainingMs < MS_4H) return "soon";
  return "normal";
}

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
  const urgency = effectiveOpen ? urgencyLevel(remaining) : "normal";

  if (variant === "hero") {
    return (
      <div
        className={cn(
          "mt-6 rounded-xl border p-4 sm:p-5 transition-[background-color,border-color,box-shadow] duration-500",
          urgency === "normal" &&
            "border-stone-200 bg-stone-50",
          urgency === "soon" &&
            "border-amber-400/90 bg-gradient-to-br from-amber-50 to-amber-100/80 shadow-md shadow-amber-200/40",
          urgency === "urgent" &&
            "border-red-400 bg-gradient-to-br from-red-50 to-orange-50 shadow-md shadow-red-200/50 ring-1 ring-red-300/60",
        )}
        role="status"
        aria-live="polite"
      >
        <p
          className={cn(
            "text-[13px] font-semibold",
            urgency === "normal" && "text-stone-700",
            urgency === "soon" && "text-amber-900",
            urgency === "urgent" && "text-red-950",
          )}
        >
          Time left to pledge
          {urgency === "soon" ? (
            <span className="ml-2 rounded-md bg-amber-200/80 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-950">
              Under 4 hours
            </span>
          ) : null}
          {urgency === "urgent" ? (
            <span className="ml-2 rounded-md bg-red-200/90 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-red-950">
              Under 1 hour
            </span>
          ) : null}
        </p>
        {effectiveOpen ? (
          <p
            className={cn(
              "mt-2 font-heading text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl",
              urgency === "normal" && "text-stone-900",
              urgency === "soon" && "text-amber-950",
              urgency === "urgent" && "text-red-950",
            )}
          >
            {formatRemaining(remaining)}
          </p>
        ) : (
          <p className="mt-2 font-heading text-lg font-semibold text-stone-800 sm:text-xl">
            Pledging has closed
          </p>
        )}
        <p
          className={cn(
            "mt-0.5 text-xs",
            urgency === "normal" && "text-stone-500",
            urgency === "soon" && "text-amber-800/90",
            urgency === "urgent" && "text-red-900/85",
          )}
        >
          Closes at midnight Pacific · April 2, 2026
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-4 rounded-lg border px-3 py-2.5 text-[13px] shadow-sm transition-[background-color,border-color] duration-500",
        urgency === "normal" && "border-stone-200 bg-white text-stone-700",
        urgency === "soon" &&
          "border-amber-400/90 bg-amber-50 text-amber-950 ring-1 ring-amber-200/60",
        urgency === "urgent" &&
          "border-red-400 bg-red-50 text-red-950 ring-1 ring-red-300/70",
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn(
          "font-semibold",
          urgency === "normal" && "text-stone-800",
          urgency === "soon" && "text-amber-900",
          urgency === "urgent" && "text-red-950",
        )}
      >
        Time left:{" "}
      </span>
      {effectiveOpen ? (
        <span
          className={cn(
            "tabular-nums font-semibold",
            urgency === "normal" && "text-stone-900",
            urgency === "soon" && "text-amber-950",
            urgency === "urgent" && "text-red-950",
          )}
        >
          {formatRemaining(remaining)}
        </span>
      ) : (
        <span className="font-medium text-stone-700">ended</span>
      )}
      {urgency === "soon" ? (
        <span className="ml-2 text-[11px] font-bold uppercase tracking-wide text-amber-800">
          · {"<"}4h
        </span>
      ) : null}
      {urgency === "urgent" ? (
        <span className="ml-2 text-[11px] font-bold uppercase tracking-wide text-red-800">
          · {"<"}1h
        </span>
      ) : null}
    </div>
  );
}
