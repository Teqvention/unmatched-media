export type BotModuleState = "off" | "on" | "running" | "error";

export type BotLogLevel = "success" | "warn" | "error" | "info";

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
