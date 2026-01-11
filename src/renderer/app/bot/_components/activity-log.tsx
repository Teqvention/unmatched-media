import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BotLogItem } from "@/types/views/bot";
import { BotViewCard } from "./bot-view-card";
import { LogIcon } from "./log-icon";

export function ActivityLog({
  title = "Activity",
  items,
  onClear,
  actions,
}: {
  title?: string;
  items: BotLogItem[];
  onClear?: () => void;
  actions?: React.ReactNode;
}) {
  return (
    <BotViewCard className="h-full gap-0 overflow-hidden p-0">
      <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-4 py-3">
        <div className="font-semibold text-sm">{title}</div>
        <div className="flex items-center gap-2">
          {actions}
          {onClear ? (
            <Button onClick={onClear} size="sm" variant="outline">
              <Trash2 className="mr-2 size-4" />
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      <ScrollArea className="max-h-[calc(100svh-(--spacing(48)))] flex-1 overflow-auto p-3">
        <div className="space-y-2">
          {items.length === 0 ? (
            <div className="rounded-md border border-dashed p-4 text-muted-foreground text-sm">
              No activity yet.
            </div>
          ) : null}

          {items.map((x) => (
            <div
              className="flex items-start gap-3 rounded-md border bg-card/50 px-3 py-2"
              key={x.id}
            >
              <div className="mt-0.5 shrink-0">
                <LogIcon level={x.level} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-muted-foreground text-xs">{x.time}</div>
                <div className="text-sm">{x.message}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </BotViewCard>
  );
}
