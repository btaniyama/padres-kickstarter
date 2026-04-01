"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CampaignStats } from "@/lib/campaign-types";

type CampaignStatsContextValue = {
  stats: CampaignStats | null;
  loadError: string | null;
  loadStats: () => Promise<void>;
  setStats: (next: CampaignStats) => void;
};

const CampaignStatsContext = createContext<CampaignStatsContextValue | null>(
  null,
);

export function CampaignStatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    const res = await fetch(`/api/stats?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });
    if (!res.ok) throw new Error("Failed to load");
    const data = (await res.json()) as CampaignStats;
    setStats(data);
    setLoadError(null);
  }, []);

  useEffect(() => {
    loadStats().catch(() => setLoadError("Could not load totals."));
  }, [loadStats]);

  useEffect(() => {
    const id = setInterval(() => {
      loadStats().catch(() => {});
    }, 8000);
    return () => clearInterval(id);
  }, [loadStats]);

  const value = useMemo(
    () => ({ stats, loadError, loadStats, setStats }),
    [stats, loadError, loadStats],
  );

  return (
    <CampaignStatsContext.Provider value={value}>
      {children}
    </CampaignStatsContext.Provider>
  );
}

export function useCampaignStats(): CampaignStatsContextValue {
  const ctx = useContext(CampaignStatsContext);
  if (!ctx) {
    throw new Error("useCampaignStats must be used within CampaignStatsProvider");
  }
  return ctx;
}
