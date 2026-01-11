import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BotLogLevel } from "@/types/views/bot";

export function LogIcon({ level }: { level: BotLogLevel }) {
  const cls = "size-4";

  switch (level) {
    case "success":
      return <CheckCircle2 className={cn(cls, "text-emerald-500")} />;
    case "warn":
      return <AlertTriangle className={cn(cls, "text-amber-500")} />;
    case "error":
      return <XCircle className={cn(cls, "text-destructive")} />;
    default:
      return <Info className={cn(cls, "text-muted-foreground")} />;
  }
}
