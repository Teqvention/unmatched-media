import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { BotLogItem } from "@/types/views/bot";
import { BotViewCard } from "./bot-view-card";
import { LogBadge } from "./log-badge";

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
            <Button
              disabled={items.length === 0}
              onClick={onClear}
              size="sm"
              variant="outline"
            >
              <Trash2 className="mr-2 size-4" />
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      <ScrollArea className="max-h-[calc(100svh-(--spacing(48)))] flex-1 overflow-auto">
        <div className="space-y-2">
          {items.length > 0 ? (
            <Table>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <LogBadge level={item.level} />
                    </TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      {item.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}
        </div>
      </ScrollArea>
    </BotViewCard>
  );
}
