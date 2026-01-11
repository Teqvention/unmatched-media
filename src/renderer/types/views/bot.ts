// biome-ignore lint/style/noEnum: <>
export enum BotModuleState {
  Active = "active",
  Inactive = "inactive",
  Error = "error",
}

export type BotLogLevel = "success" | "warning" | "error" | "info";

export interface BotLogItem {
  id: string;
  level: BotLogLevel;
  time: string;
  message: string;
}

export interface BotViewTabProps {
  state: Record<string, BotModuleState>;
  setState: React.Dispatch<
    React.SetStateAction<Record<string, BotModuleState>>
  >;
  log: BotLogItem[];
  pushLog: (level: BotLogLevel, message: string) => void;
  clearLog: () => void;
}

export interface WriteNewsTabProps extends BotViewTabProps {
  onlyNewUsers: boolean;
  setOnlyNewUsers: React.Dispatch<React.SetStateAction<boolean>>;
}
