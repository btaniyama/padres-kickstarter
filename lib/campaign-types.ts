export type PledgeEntry = {
  amountCents: number;
  comment: string;
  createdAt: number;
};

export type CampaignStats = {
  totalCents: number;
  backerCount: number;
  goalCents: number;
  recentPledges: PledgeEntry[];
};
