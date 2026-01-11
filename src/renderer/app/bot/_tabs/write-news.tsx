import { Bot, Newspaper, Users } from "lucide-react";
import { SplitPane } from "@/components/split-pane";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BotModuleState, type WriteNewsTabProps } from "@/types/views/bot";
import { ActivityLog } from "../_components/activity-log";
import { BotViewCard } from "../_components/bot-view-card";
import { StartStop } from "../_components/start-stop";
import { StatPill } from "../_components/stat-pill";

export function WriteNewsTabView({
  state,
  setState,
  log,
  pushLog,
  clearLog,
  onlyNewUsers,
  setOnlyNewUsers,
}: WriteNewsTabProps) {
  return (
    <SplitPane
      left={
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatPill
              icon={<Users className="size-4 text-muted-foreground" />}
              label="Users"
              value="2,250"
            />
            <StatPill
              icon={<Newspaper className="size-4 text-muted-foreground" />}
              label="Written to"
              value="2,250"
            />
            <StatPill
              icon={<Bot className="size-4 text-muted-foreground" />}
              label="Bot"
              value={state.write_news}
            />
          </div>

          <BotViewCard>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-sm">Send a news message</div>
                <div className="text-muted-foreground text-sm">
                  Configure the range + message body, then start.
                </div>
              </div>

              <StartStop
                onStart={() => {
                  setState((s) => ({
                    ...s,
                    write_news: BotModuleState.Active,
                  }));
                  pushLog("info", "Write news started.");
                }}
                onStop={() => {
                  setState((s) => ({
                    ...s,
                    write_news: BotModuleState.Inactive,
                  }));
                  pushLog("warning", "Write news stopped.");
                }}
                running={state.write_news === BotModuleState.Active}
                startLabel="Start"
                stopLabel="Stop"
              />
            </div>

            <Separator className="my-4" />

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Media selection (optional)</Label>
                <Button className="justify-start" variant="outline">
                  Select media
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>From</Label>
                  <Input placeholder="From (last index: 345)" />
                </div>
                <div className="grid gap-2">
                  <Label>Until</Label>
                  <Input placeholder="Until" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>News</Label>
                <Textarea
                  className="min-h-30"
                  placeholder="What message do you want to send"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={onlyNewUsers}
                  id="onlyNew"
                  onCheckedChange={(v) => setOnlyNewUsers(Boolean(v))}
                />
                <Label className="text-sm" htmlFor="onlyNew">
                  Only write to new users
                </Label>
              </div>
            </div>
          </BotViewCard>
        </>
      }
      right={
        <ActivityLog items={log} onClear={clearLog} title="Bot activity" />
      }
    />
  );
}
