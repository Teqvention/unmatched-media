import { BotModuleState } from "@/types/views/bot";

export const getStatusColor = (state: BotModuleState) => {
  switch (state) {
    case BotModuleState.Active:
      return "bg-green-500";
    case BotModuleState.Inactive:
      return "bg-foreground/25";
    case BotModuleState.Error:
      return "bg-destructive";
    default:
      return "bg-muted-foreground/40";
  }
};
