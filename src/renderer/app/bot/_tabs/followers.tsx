"use client";

import { SplitPane } from "@/components/split-pane";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ActivityLog } from "../_components/activity-log";
import { BotViewCard } from "../_components/bot-view-card";
import { StartStop } from "../_components/start-stop";
import type { BotViewTabProps } from "../_types/tabs";

export function FollowersTabView({
  state,
  setState,
  log,
  pushLog,
  clearLog,
}: BotViewTabProps) {
  return (
    <SplitPane
      left={
        <BotViewCard>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-sm">Followers scrape</div>
              <div className="text-muted-foreground text-sm">
                Scrape followers of the current account.
              </div>
            </div>

            <StartStop
              onStart={() => {
                setState((s) => ({ ...s, followers: "running" }));
                pushLog("info", "Followers scrape started.");
              }}
              onStop={() => {
                setState((s) => ({ ...s, followers: "on" }));
                pushLog("warn", "Followers scrape stopped.");
              }}
              running={state.followers === "running"}
            />
          </div>

          <Separator className="my-4" />

          <Button
            className="justify-start"
            onClick={() =>
              setState((s) => ({
                ...s,
                followers: s.followers === "off" ? "on" : "off",
              }))
            }
            variant="outline"
          >
            Toggle availability
          </Button>
        </BotViewCard>
      }
      right={<ActivityLog items={log} onClear={clearLog} title="Scraper log" />}
    />
  );
}
