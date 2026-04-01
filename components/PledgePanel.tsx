"use client";

import { useState } from "react";
import type { CampaignStats } from "@/lib/campaign-types";
import {
  MAGIC_WORD_PLEDGE_CENTS,
  MAGIC_WORD_PLEDGE_DOLLARS,
} from "@/lib/constants";
import { formatUsdFromCents, percentFunded, percentOfGoal } from "@/lib/format";
import { useCampaignStats } from "./CampaignStatsProvider";
import { MagicWordModal } from "./MagicWordModal";

const PRESETS = [25, 100, 500, 5000] as const;

export function PledgePanel() {
  const { stats, loadError, setStats } = useCampaignStats();
  const [amountDollars, setAmountDollars] = useState("100");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [magicWordOpen, setMagicWordOpen] = useState(false);

  const pctBar =
    stats !== null ? percentFunded(stats.totalCents, stats.goalCents) : 0;
  const pctLabel =
    stats !== null ? percentOfGoal(stats.totalCents, stats.goalCents) : 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const dollars = Number.parseFloat(amountDollars.replace(/,/g, ""));
    if (!Number.isFinite(dollars) || dollars <= 0) {
      setError("Enter a positive amount.");
      return;
    }
    const trimmed = comment.trim();
    if (trimmed.length === 0) {
      setError("Add a comment with your pledge.");
      return;
    }
    const amountCents = Math.round(dollars * 100);
    if (amountCents === MAGIC_WORD_PLEDGE_CENTS) {
      setMagicWordOpen(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/pledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents, comment: trimmed }),
      });
      const data = (await res.json()) as CampaignStats & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setStats({
        totalCents: data.totalCents,
        backerCount: data.backerCount,
        goalCents: data.goalCents,
        recentPledges: data.recentPledges ?? [],
      });
      setSuccess(true);
      setComment("");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]">
      <div className="h-1 bg-padres-gold" aria-hidden />
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-stone-900">
              Back this project
            </p>
            <p className="mt-0.5 text-[13px] text-stone-500">
              Community pledge · no checkout
            </p>
          </div>
        </div>

        {loadError ? (
          <p className="mt-4 text-sm text-amber-800" role="status">
            {loadError}
          </p>
        ) : null}

        <div className="mt-5 rounded-xl bg-stone-50 p-4 sm:p-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <span className="font-heading text-3xl font-semibold tabular-nums tracking-tight text-stone-900 sm:text-[2rem]">
              {stats === null ? "—" : formatUsdFromCents(stats.totalCents)}
            </span>
            <span className="text-sm text-stone-500">
              of{" "}
              <span className="font-medium text-stone-700">
                {stats === null ? "—" : formatUsdFromCents(stats.goalCents)}
              </span>
            </span>
          </div>

          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-stone-200/90"
            role="progressbar"
            aria-valuenow={Math.round(Math.min(100, pctLabel))}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Funding progress"
          >
            <div
              className="h-full rounded-full bg-padres-gold transition-[width] duration-500 ease-out"
              style={{ width: `${pctBar}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone-600">
            <span>
              <span className="font-semibold tabular-nums text-stone-900">
                {stats === null ? "—" : stats.backerCount.toLocaleString()}
              </span>{" "}
              backers
            </span>
            <span>
              <span className="font-semibold tabular-nums text-stone-900">
                {pctLabel.toFixed(1)}%
              </span>{" "}
              funded
            </span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="pledge-amount"
              className="mb-2 block text-[13px] font-medium text-stone-700"
            >
              Amount (USD)
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setAmountDollars(String(n))}
                  className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-sm transition hover:border-stone-300 hover:bg-stone-50"
                >
                  ${n.toLocaleString()}
                </button>
              ))}
              <button
                type="button"
                onClick={() =>
                  setAmountDollars(String(MAGIC_WORD_PLEDGE_DOLLARS))
                }
                title="What could go wrong?"
                className="rounded-lg border border-amber-300/80 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-950 shadow-sm transition hover:border-amber-400 hover:bg-amber-100"
              >
                $1B
              </button>
            </div>
            <div className="mt-3 flex max-w-full items-center gap-2 sm:max-w-xs">
              <span className="text-stone-500" aria-hidden>
                $
              </span>
              <input
                id="pledge-amount"
                type="text"
                inputMode="decimal"
                value={amountDollars}
                onChange={(e) => setAmountDollars(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-[15px] text-stone-900 shadow-sm outline-none ring-padres-gold/40 transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-2"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="pledge-comment"
              className="mb-2 block text-[13px] font-medium text-stone-700"
            >
              Comment{" "}
              <span className="font-normal text-stone-500">(required)</span>
            </label>
            <textarea
              id="pledge-comment"
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              placeholder="Say something for the wall…"
              className="w-full resize-y rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-[15px] leading-relaxed text-stone-900 shadow-sm outline-none ring-padres-gold/40 transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-2"
            />
            <p className="mt-1.5 text-xs text-stone-500">{comment.length}/500</p>
          </div>

          {error ? (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-900">
              Pledge recorded. You&apos;re on the board.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-padres-gold text-[15px] font-semibold text-stone-900 shadow-sm transition hover:bg-padres-gold-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:opacity-50"
          >
            {loading ? "Recording…" : "Pledge now"}
          </button>
          <p className="text-center text-[12px] leading-relaxed text-stone-500">
            No payment processed here—pledge is symbolic.
          </p>
        </form>
      </div>

      <MagicWordModal
        open={magicWordOpen}
        onClose={() => setMagicWordOpen(false)}
      />
    </div>
  );
}
