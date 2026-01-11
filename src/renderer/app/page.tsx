import {
  Activity,
  ArrowRight,
  Bot,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard",
};

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="gap-0 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex size-9 items-center justify-center rounded-md bg-muted/50">
          {icon}
        </div>
        <div className="text-muted-foreground text-xs">{hint}</div>
      </div>

      <div className="mt-3 text-muted-foreground text-sm">{label}</div>
      <div className="mt-1 font-semibold text-2xl tracking-tight">{value}</div>
    </Card>
  );
}

function QuickAction({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      className="group rounded-lg border bg-card p-4 transition hover:bg-accent hover:text-accent-foreground"
      href={href}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-sm">{title}</div>
          <div className="mt-1 text-muted-foreground text-sm group-hover:text-accent-foreground/80">
            {description}
          </div>
        </div>
        <ArrowRight className="mt-0.5 size-4 text-muted-foreground group-hover:text-accent-foreground" />
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-muted-foreground text-sm">Overview</div>
          <h1 className="font-semibold text-2xl tracking-tight">Dashboard</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/bot">
              <Bot className="mr-2 size-4" />
              Open bots
            </Link>
          </Button>
          <Button asChild>
            <Link href="/settings">
              <ShieldCheck className="mr-2 size-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Stats */}
      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          hint="Last 30 days"
          icon={<Users className="size-4 text-muted-foreground" />}
          label="Users"
          value="2,250"
        />
        <StatCard
          hint="Total"
          icon={<Newspaper className="size-4 text-muted-foreground" />}
          label="News sent"
          value="2,250"
        />
        <StatCard
          hint="Today"
          icon={<MessageSquare className="size-4 text-muted-foreground" />}
          label="Comments written"
          value="318"
        />
        <StatCard
          hint="Live"
          icon={<Activity className="size-4 text-muted-foreground" />}
          label="Bot status"
          value="Running"
        />
      </div>

      {/* Main grid */}
      <div className="grid w-full gap-4 lg:grid-cols-3">
        {/* Activity */}
        <Card className="gap-0 py-0 lg:col-span-2">
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <div className="font-semibold text-sm">Recent activity</div>
              <div className="text-muted-foreground text-sm">
                Latest bot events & actions
              </div>
            </div>

            <Button asChild size="sm" variant="outline">
              <Link href="/bot">
                View all
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="p-3">
            <div className="space-y-2">
              {[
                { t: "12:41:03", m: "Rate limit warning (429) — backing off." },
                { t: "12:40:27", m: "Loaded already scraped users." },
                { t: "12:40:12", m: "Successfully logged into account." },
              ].map((x) => (
                <div
                  className="flex items-start gap-3 rounded-md border bg-card/50 px-3 py-2"
                  key={x.t}
                >
                  <div className="mt-0.5 size-2 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <div className="text-muted-foreground text-xs">{x.t}</div>
                    <div className="text-sm">{x.m}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick actions */}
        <Card className="gap-0 p-4">
          <div className="font-semibold text-sm">Quick actions</div>
          <div className="mt-1 text-muted-foreground text-sm">
            Jump into common tasks.
          </div>

          <div className="mt-4 grid gap-3">
            <QuickAction
              description="Send a message to a user segment."
              href="/bot?tab=write_news"
              title="Write news"
            />
            <QuickAction
              description="Discover new users to message."
              href="/bot?tab=foryou"
              title="ForYou scraper"
            />
            <QuickAction
              description="Edit comment presets."
              href="/bot?tab=manage_comments"
              title="Manage comments"
            />
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
