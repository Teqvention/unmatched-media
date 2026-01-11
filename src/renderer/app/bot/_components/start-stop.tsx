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
        <Button className="bg-red-700 hover:bg-red-800" onClick={onStop}>
          <Square className="size-4" />
          {stopLabel}
        </Button>
      ) : (
        <Button className="bg-green-700 hover:bg-green-800" onClick={onStart}>
          <Play className="size-4" />
          {startLabel}
        </Button>
      )}
    </div>
  );
}
