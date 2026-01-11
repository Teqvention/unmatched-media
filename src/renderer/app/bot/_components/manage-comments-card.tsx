import { XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { BotLogLevel } from "@/types/views/bot";
import { BotViewCard } from "./bot-view-card";

interface CommentPreset {
  id: string;
  text: string;
}

export function ManageCommentsCard({
  onLog,
}: {
  onLog: (lvl: BotLogLevel, msg: string) => void;
}) {
  const [text, setText] = useState("");
  const [items, setItems] = useState<CommentPreset[]>([
    { id: "1", text: "so hot" },
    { id: "2", text: "so hot" },
    { id: "3", text: "so hot" },
    { id: "4", text: "so hot" },
  ]);

  return (
    <BotViewCard>
      <div className="font-semibold text-sm">Comment presets</div>
      <div className="text-muted-foreground text-sm">
        Save quick comment templates that the bot can reuse.
      </div>

      <Separator className="my-4" />

      <div className="grid gap-2">
        <Label>Enter a comment</Label>
        <Input
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment..."
          value={text}
        />
        <Button
          className="bg-emerald-600 hover:bg-emerald-600/90"
          onClick={() => {
            const v = text.trim();
            if (!v) {
              return;
            }
            setItems((p) => [
              { id: `${Date.now()}-${Math.random()}`, text: v },
              ...p,
            ]);
            setText("");
            onLog("success", "Comment preset added.");
          }}
        >
          Save comment
        </Button>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((preset) => (
          <div
            className="flex items-center justify-between gap-2 rounded-md border bg-card/50 px-3 py-2"
            key={preset.id}
          >
            <div className="truncate text-sm">{preset.text}</div>
            <Button
              className="shrink-0"
              onClick={() => {
                setItems((p) => p.filter((item) => item.id !== preset.id));
                onLog("warn", "Comment preset removed.");
              }}
              size="icon"
              variant="ghost"
            >
              <XCircle className="size-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </div>
    </BotViewCard>
  );
}
