"use client";

import { RECENT_PLEDGES_MAX } from "@/lib/constants";
import { formatUsdFromCents } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useCampaignStats } from "./CampaignStatsProvider";

export function PledgeFeed({ className }: { className?: string }) {
  const { stats } = useCampaignStats();
  const pledges = stats?.recentPledges ?? [];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]",
        className,
      )}
      role="region"
      aria-labelledby="pledge-feed-heading"
    >
      <div className="h-1 bg-gradient-to-r from-padres-gold/80 via-amber-200 to-padres-gold/80" aria-hidden />
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="pledge-feed-heading"
            className="font-heading text-[15px] font-semibold tracking-tight text-stone-900"
          >
            Live pledge log
          </h2>
          <p className="text-[11px] text-stone-500">
            Newest first · up to {RECENT_PLEDGES_MAX.toLocaleString()} kept
          </p>
        </div>
        <p className="mt-1 text-[13px] text-stone-500">
          Refreshes automatically.
        </p>

        <div
          className="mt-4 max-h-[min(50vh,28rem)] overflow-y-auto overscroll-contain rounded-xl border border-stone-100 bg-stone-50/60 pr-1"
          tabIndex={0}
        >
          {pledges.length === 0 ? (
            <p className="px-3 py-8 text-center text-[14px] text-stone-500">
              No pledges yet. Be the first backer.
            </p>
          ) : (
            <ul className="divide-y divide-stone-100 p-0">
              {pledges.map((p, i) => (
                <li
                  key={`${p.createdAt}-${i}`}
                  className="list-none px-3 py-2.5 sm:px-4"
                >
                  <p className="text-[14px] leading-snug text-stone-800">
                    {p.comment}
                  </p>
                  <p className="mt-1 text-[12px] text-stone-500">
                    <span className="font-medium tabular-nums text-stone-700">
                      {formatUsdFromCents(p.amountCents)}
                    </span>
                    <span className="mx-1.5 text-stone-300">·</span>
                    {new Date(p.createdAt).toLocaleString(undefined, {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
