import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { BotModuleState } from "@/types/views/bot";
import { getStatusColor } from "../_utils/status";

export function StatusPip({ state }: { state: BotModuleState }) {
  // no text indicator; purely visual
  const base = "inline-flex size-2.5 rounded-full";
  const dot = getStatusColor(state);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="relative inline-flex items-center justify-center">
          {/* ping halo when running */}
          {state === "running" ? (
            <span className="absolute inline-flex size-4 animate-ping rounded-full bg-emerald-500/30" />
          ) : null}
          <span
            aria-hidden
            className={cn(
              base,
              dot,
              state === "off" && "ring-1 ring-border",
              state === "on" && "ring-2 ring-primary/20",
              state === "error" && "ring-2 ring-destructive/20"
            )}
          />
          <span className="sr-only">{state}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <span>{state}</span>
      </TooltipContent>
    </Tooltip>
  );
}
