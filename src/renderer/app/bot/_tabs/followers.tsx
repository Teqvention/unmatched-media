"use client";

import { SplitPane } from "@/components/split-pane";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BotModuleState, type BotViewTabProps } from "@/types/views/bot";
import { ActivityLog } from "../_components/activity-log";
import { BotViewCard } from "../_components/bot-view-card";
import { StartStop } from "../_components/start-stop";

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
                setState((s) => ({ ...s, followers: BotModuleState.Active }));
                pushLog("info", "Followers scrape started.");
              }}
              onStop={() => {
                setState((s) => ({ ...s, followers: BotModuleState.Inactive }));
                pushLog("warning", "Followers scrape stopped.");
              }}
              running={state.followers === BotModuleState.Active}
            />
          </div>

          <Separator className="my-4" />

          <Button
            className="justify-start"
            onClick={() =>
              setState((s) => ({
                ...s,
                followers:
                  s.followers === BotModuleState.Active
                    ? BotModuleState.Inactive
                    : BotModuleState.Active,
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
