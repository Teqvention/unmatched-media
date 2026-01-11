"use client";

import { SplitPane } from "@/components/split-pane";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ActivityLog } from "../_components/activity-log";
import { BotViewCard } from "../_components/bot-view-card";
import type { BotViewTabProps } from "../_types/tabs";

export function ManageNewsTabView({ log, clearLog }: BotViewTabProps) {
  return (
    <SplitPane
      left={
        <BotViewCard>
          <div className="font-semibold text-sm">News template</div>
          <div className="text-muted-foreground text-sm">
            Save the default message used by the bot.
          </div>

          <Separator className="my-4" />

          <Textarea className="min-h-40" placeholder="Write your message..." />

          <div className="mt-3">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-600/90">
              Save settings
            </Button>
          </div>
        </BotViewCard>
      }
      right={<ActivityLog items={log} onClear={clearLog} title="System log" />}
    />
  );
}
