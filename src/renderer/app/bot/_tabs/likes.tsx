"use client";

import { SplitPane } from "@/components/split-pane";
import { ActivityLog } from "../_components/activity-log";
import { BotViewCard } from "../_components/bot-view-card";
import { StartStop } from "../_components/start-stop";
import type { BotViewTabProps } from "../_types/tabs";

export function LikesTabView({
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
              <div className="font-semibold text-sm">Likes scrape</div>
              <div className="text-muted-foreground text-sm">
                Scrape likes from your own account.
              </div>
            </div>

            <StartStop
              onStart={() => {
                setState((s) => ({ ...s, likes: "running" }));
                pushLog("info", "Likes scrape started.");
              }}
              onStop={() => {
                setState((s) => ({ ...s, likes: "on" }));
                pushLog("warn", "Likes scrape stopped.");
              }}
              running={state.likes === "running"}
            />
          </div>
        </BotViewCard>
      }
      right={<ActivityLog items={log} onClear={clearLog} title="Scraper log" />}
    />
  );
}
