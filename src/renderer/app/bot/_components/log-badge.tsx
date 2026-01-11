import { Badge } from "@/components/ui/badge";
import type { BotLogLevel } from "@/types/views/bot";

export function LogBadge({ level }: { level: BotLogLevel }) {
  switch (level) {
    case "success":
      return (
        <Badge className="bg-green-500/25 text-foreground capitalize">
          {level}
        </Badge>
      );
    case "warning":
      return (
        <Badge className="bg-amber-500/25 text-foreground capitalize">
          {level}
        </Badge>
      );
    case "error":
      return (
        <Badge className="bg-destructive/50 text-foreground capitalize">
          {level}
        </Badge>
      );
    default:
      return (
        <Badge className="bg-muted-foreground/25 text-foreground capitalize">
          {level}
        </Badge>
      );
  }
}
