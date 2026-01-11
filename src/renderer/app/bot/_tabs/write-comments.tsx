"use client";

import { SplitPane } from "@/components/split-pane";
import { BotModuleState, type BotViewTabProps } from "@/types/views/bot";
import { ActivityLog } from "../_components/activity-log";
import { BotViewCard } from "../_components/bot-view-card";
import { StartStop } from "../_components/start-stop";

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
                setState((s) => ({
                  ...s,
                  write_comments: BotModuleState.Active,
                }));
                pushLog("info", "Comments writer started.");
              }}
              onStop={() => {
                setState((s) => ({
                  ...s,
                  write_comments: BotModuleState.Inactive,
                }));
                pushLog("warning", "Comments writer stopped.");
              }}
              running={state.write_comments === BotModuleState.Active}
            />
          </div>
        </BotViewCard>
      }
      right={<ActivityLog items={log} onClear={clearLog} title="Writer log" />}
    />
  );
}
