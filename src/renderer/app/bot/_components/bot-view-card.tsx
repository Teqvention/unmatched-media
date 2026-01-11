import type { ComponentProps } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BotViewCardProps extends ComponentProps<"div"> {
  children: React.ReactNode;
}

export function BotViewCard({
  children,
  className,
  ...props
}: BotViewCardProps) {
  return (
    <Card className={cn("gap-2 p-4", className)} {...props}>
      {children}
    </Card>
  );
}
