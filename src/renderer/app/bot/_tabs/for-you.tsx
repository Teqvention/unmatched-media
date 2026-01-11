import { Bot, Settings2, Users } from "lucide-react";
import { SplitPane } from "@/components/split-pane";
import { BotModuleState, type BotViewTabProps } from "@/types/views/bot";
import { ActivityLog } from "../_components/activity-log";
import { BotViewCard } from "../_components/bot-view-card";
import { StartStop } from "../_components/start-stop";
import { StatPill } from "../_components/stat-pill";

export function ForYouTabView({
  state,
  setState,
  log,
  pushLog,
  clearLog,
}: BotViewTabProps) {
  return (
    <SplitPane
      left={
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatPill
              icon={<Users className="size-4 text-muted-foreground" />}
              label="New users"
              value="+5,232"
            />
            <StatPill
              icon={<Bot className="size-4 text-muted-foreground" />}
              label="State"
              value={state.foryou}
            />
            <StatPill
              icon={<Settings2 className="size-4 text-muted-foreground" />}
              label="Mode"
              value="ForYou"
            />
          </div>

          <BotViewCard>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-sm">ForYou scrape</div>
                <div className="text-muted-foreground text-sm">
                  Scrape users from the ForYou feed.
                </div>
              </div>

              <StartStop
                onStart={() => {
                  setState((s) => ({ ...s, foryou: BotModuleState.Active }));
                  pushLog("info", "ForYou scrape started.");
                }}
                onStop={() => {
                  setState((s) => ({ ...s, foryou: BotModuleState.Inactive }));
                  pushLog("warning", "ForYou scrape stopped.");
                }}
                running={state.foryou === BotModuleState.Active}
              />
            </div>
          </BotViewCard>
        </>
      }
      right={<ActivityLog items={log} onClear={clearLog} title="Scraper log" />}
    />
  );
}
