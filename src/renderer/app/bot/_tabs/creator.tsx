"use client";

import { SplitPane } from "@/components/split-pane";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BotModuleState, type BotViewTabProps } from "@/types/views/bot";
import { ActivityLog } from "../_components/activity-log";
import { BotViewCard } from "../_components/bot-view-card";
import { StartStop } from "../_components/start-stop";

export function CreatorTabView({
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
              <div className="font-semibold text-sm">Creator scrape</div>
              <div className="text-muted-foreground text-sm">
                Enter a creator username and start scraping.
              </div>
            </div>

            <StartStop
              onStart={() => {
                setState((s) => ({ ...s, creator: BotModuleState.Active }));
                pushLog("info", "Creator scrape started.");
              }}
              onStop={() => {
                setState((s) => ({ ...s, creator: BotModuleState.Inactive }));
                pushLog("warning", "Creator scrape stopped.");
              }}
              running={state.creator === BotModuleState.Active}
            />
          </div>

          <Separator className="my-4" />

          <div className="grid gap-2">
            <Label>Creator</Label>
            <Input placeholder="creatorname" />
          </div>
        </BotViewCard>
      }
      right={<ActivityLog items={log} onClear={clearLog} title="Scraper log" />}
    />
  );
}
