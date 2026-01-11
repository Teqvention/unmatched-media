import type { BotModuleState } from "@/types/views/bot";

export const getStatusColor = (state: BotModuleState) => {
  switch (state) {
    case "running":
      return "bg-emerald-500";
    case "on":
      return "bg-primary";
    case "error":
      return "bg-destructive";
    default:
      return "bg-muted-foreground/40";
  }
};
