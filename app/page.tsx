import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CampaignStatsProvider } from "@/components/CampaignStatsProvider";
import { PledgeFeed } from "@/components/PledgeFeed";
import { PledgePanel } from "@/components/PledgePanel";
import { StretchGoals } from "@/components/StretchGoals";
import { MAGIC_WORD_PLEDGE_DOLLARS } from "@/lib/constants";
import { cn } from "@/lib/cn";

const REWARDS = [
  {
    tier: "$0 — Moral support",
    body: "You believed in us before fake money was cool.",
  },
  {
    tier: "$25 — Digital high five",
    body: "Delivered as a Reddit reply that says “o7”.",
  },
  {
    tier: "$100 — Name a seat (simulated)",
    body: "We will imagine your username on a seat. It cannot be enforced in this plane of reality.",
  },
  {
    tier: "$500 — GM for a day (simulated)",
    body: "You may suggest one lineup. The simulation will ignore it exactly like real life.",
  },
  {
    tier: "$5,000 — Banner plane (imaginary)",
    body: "We will think really hard about a flyover during the seventh-inning stretch.",
  },
  {
    tier: `$${MAGIC_WORD_PLEDGE_DOLLARS.toLocaleString("en-US")} — Billionaire tier`,
    body: "Reserved for actual billionaires only. If you’re not on a Forbes list, don’t even click it.",
  },
] as const;

const H2 =
  "font-heading text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl";

function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-2 text-[13px] font-semibold tracking-wide text-stone-500",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Same horizontal inset as ContentCard body copy (Story / FAQ / Rewards). */
function SectionBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-4 max-w-prose", className)}>{children}</div>
  );
}

function ContentCard({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-white p-6 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.45)] sm:p-8",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <CampaignStatsProvider>
      <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-padres-brown-deep/95 text-white backdrop-blur-md">
        <div className="mx-auto flex h-[3.25rem] max-w-6xl items-center justify-between px-4 sm:h-14 sm:px-6">
          <span className="font-heading text-[15px] font-semibold tracking-tight text-white sm:text-base">
            Crowdfund<span className="text-padres-gold">ish</span>
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/85 sm:text-xs">
            Parody · April Fools
          </span>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero: horizontal padding matches ContentCard (p-6 sm:p-8) so text lines up with sections below */}
        <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6 sm:pt-6 lg:pt-8">
          <section
            aria-labelledby="campaign-title"
            className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]"
          >
            <div className="h-1 bg-gradient-to-r from-padres-gold via-amber-300 to-padres-gold" />
            <div className="px-6 py-6 sm:px-8 sm:py-8 lg:py-10">
              <p className="text-[13px] font-medium text-stone-500">
                r/Padres · fan campaign
              </p>
              <h1
                id="campaign-title"
                className="font-heading mt-4 max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl sm:leading-[1.1] lg:text-[2.5rem]"
              >
                Community ownership: the team sale we refuse to lose
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-stone-600 sm:text-lg">
                The Padres are reportedly for sale. Instead of letting
                billionaires have all the fun, we&apos;re pooling fake dollars to
                &quot;buy&quot; the franchise for shitposters, lurkers, and that
                one guy who only comments in game threads.
              </p>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-stone-100 pt-6 text-sm">
                <div>
                  <dt className="text-stone-500">Funding goal</dt>
                  <dd className="mt-0.5 font-medium tabular-nums text-stone-900">
                    $3,000,000,000
                  </dd>
                  <dd className="text-xs text-stone-500">fake USD · parody</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Currency</dt>
                  <dd className="mt-0.5 font-medium text-stone-900">
                    Pretend money only
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
          <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="order-2 flex min-w-0 flex-col gap-6 lg:order-1 lg:col-span-7">
              {/* Order: Story → Tiers → Stretch → FAQ (explicit flex order) */}
              <ContentCard className="order-1">
                <SectionLabel>Story</SectionLabel>
                <h2 id="story-heading" className={H2}>
                  Why we&apos;re doing this
                </h2>
                <SectionBody className="space-y-3 text-[15px] leading-relaxed text-stone-600 sm:text-base">
                  <p>
                    For too long, ownership has been decided in boardrooms. We
                    propose a bolder model: a distributed democracy powered by
                    Reddit takes, sunset games at Petco, and the sacred belief
                    that this time the bullpen will hold.
                  </p>
                  <p>
                    If we hit our goal, we will… look, we&apos;re not lawyers. We
                    will definitely update the sidebar wiki with a very confident
                    statement. We might even run a poll on whether the Friar
                    should wear smaller shoes. The important thing is spirit—and
                    this progress bar.
                  </p>
                </SectionBody>
              </ContentCard>

              <ContentCard
                className="order-2"
                role="region"
                aria-labelledby="rewards-heading"
              >
                <SectionLabel>Rewards</SectionLabel>
                <h2 id="rewards-heading" className={H2}>
                  Tiers
                </h2>
                <SectionBody>
                  <ul className="m-0 list-none divide-y divide-stone-100 p-0">
                    {REWARDS.map((item) => (
                      <li
                        key={item.tier}
                        className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:gap-8"
                      >
                        <p className="font-heading shrink-0 text-[15px] font-semibold text-stone-900 sm:w-52 sm:text-base">
                          {item.tier}
                        </p>
                        <p className="min-w-0 text-[15px] leading-relaxed text-stone-600">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </SectionBody>
              </ContentCard>

              <ContentCard
                className="order-3"
                role="region"
                aria-labelledby="stretch-goals-heading"
              >
                <SectionLabel>Stretch goals</SectionLabel>
                <h2 id="stretch-goals-heading" className={H2}>
                  What we unlock next
                </h2>
                <SectionBody>
                  <StretchGoals />
                </SectionBody>
              </ContentCard>

              <ContentCard className="order-4">
                <SectionLabel>FAQ</SectionLabel>
                <h2 id="faq-heading" className={H2}>
                  Questions
                </h2>
                <SectionBody>
                  <dl className="space-y-5 text-stone-600">
                    <div>
                      <dt className="text-[15px] font-semibold text-stone-900">
                        Is this a real Kickstarter?
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed">
                        No. It&apos;s a parody page. There is no crowdfunding
                        platform behind this and no money changes hands.
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[15px] font-semibold text-stone-900">
                        Are you affiliated with MLB, the Padres, or Reddit?
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed">
                        No. This is a fan joke for April Fools. Not affiliated with
                        Major League Baseball, the San Diego Padres, Reddit, or any
                        team owner—real, fictional, or suspiciously rich.
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[15px] font-semibold text-stone-900">
                        What happens to my pledge?
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed">
                        It increments a counter so your friends can see we&apos;re
                        all in this together. That&apos;s it. Save your actual money
                        for whatever you spend on real baseball.
                      </dd>
                    </div>
                  </dl>
                </SectionBody>
              </ContentCard>
            </div>

            <aside className="order-1 lg:order-2 lg:col-span-5">
              <div className="flex flex-col gap-4 lg:sticky lg:top-[4.5rem] lg:pb-8">
                <PledgePanel />
                <PledgeFeed />
                <p className="text-center text-[13px] leading-relaxed text-white/65 lg:text-left">
                  Fan project in spirit · Not endorsed by anyone who signs
                  paychecks
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-white/10 bg-padres-brown-deep py-8">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-sm leading-relaxed text-stone-300">
            April Fools parody · No real payments · Not affiliated with MLB or
            the Padres
            <span className="mx-2 text-white/35">·</span>
            <span className="whitespace-nowrap text-stone-400">
              © {new Date().getFullYear()}
            </span>
          </p>
        </div>
      </footer>
      </div>
    </CampaignStatsProvider>
  );
}
