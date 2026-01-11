import { Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StartStop({
  running,
  onStart,
  onStop,
  startLabel = "Start",
  stopLabel = "Stop",
}: {
  running: boolean;
  onStart: () => void;
  onStop: () => void;
  startLabel?: string;
  stopLabel?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {running ? (
        <Button onClick={onStop} variant="destructive">
          <Square className="mr-2 size-4" />
          {stopLabel}
        </Button>
      ) : (
        <Button
          className="bg-emerald-600 hover:bg-emerald-600/90"
          onClick={onStart}
        >
          <Play className="mr-2 size-4" />
          {startLabel}
        </Button>
      )}
    </div>
  );
}
