"use client";

import { SplitPane } from "@/components/split-pane";
import { ActivityLog } from "../_components/activity-log";
import { BotViewCard } from "../_components/bot-view-card";
import { StartStop } from "../_components/start-stop";
import type { BotViewTabProps } from "../_types/tabs";

export function WriteCommentsTabView({
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
              <div className="font-semibold text-sm">Write comments</div>
              <div className="text-muted-foreground text-sm">
                Start the comments writer automation.
              </div>
            </div>

            <StartStop
              onStart={() => {
                setState((s) => ({ ...s, write_comments: "running" }));
                pushLog("info", "Comments writer started.");
              }}
              onStop={() => {
                setState((s) => ({ ...s, write_comments: "on" }));
                pushLog("warn", "Comments writer stopped.");
              }}
              running={state.write_comments === "running"}
            />
          </div>
        </BotViewCard>
      }
      right={<ActivityLog items={log} onClear={clearLog} title="Writer log" />}
    />
  );
}
