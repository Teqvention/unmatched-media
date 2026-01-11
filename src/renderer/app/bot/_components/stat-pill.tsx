import { cn } from "@/lib/utils";

export function StatPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2">
      <div className="inline-flex size-8 items-center justify-center rounded-md bg-muted/50">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-muted-foreground text-xs">{label}</div>
        <div
          className={cn(
            "font-semibold text-sm",
            typeof value === "string" ? "truncate capitalize" : ""
          )}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
