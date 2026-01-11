"use client";

import { SplitPane } from "@/components/split-pane";
import { ActivityLog } from "../_components/activity-log";
import { ManageCommentsCard } from "../_components/manage-comments-card";
import type { BotViewTabProps } from "../_types/tabs";

export function ManageCommentsTabView({
  log,
  clearLog,
  pushLog,
}: BotViewTabProps) {
  return (
    <SplitPane
      left={<ManageCommentsCard onLog={pushLog} />}
      right={<ActivityLog items={log} onClear={clearLog} title="System log" />}
    />
  );
}
