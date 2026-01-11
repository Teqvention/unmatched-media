import type { ReactNode } from "react";

export function SplitPane({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-2">
      <div className="space-y-4">{left}</div>
      <div className="min-h-130 lg:min-h-0">{right}</div>
    </div>
  );
}
