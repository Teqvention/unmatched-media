import type { ComponentProps, ReactNode } from "react";
import { lockTailwindClasses } from "@/lib/lock-classes";
import { cn } from "@/lib/utils";

interface PageWrapperProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export function PageWrapper({
  children,
  className,
  ...props
}: PageWrapperProps) {
  const safeClassName = lockTailwindClasses(className, {
    lockPadding: true,
    lockHeight: true,
  });

  return (
    <div
      className={cn(
        "flex h-full max-h-[calc(100svh-(--spacing(16)))] flex-1 flex-col items-start justify-start gap-4 overflow-hidden p-4",
        safeClassName
      )}
      {...props}
    >
      {children}
    </div>
  );
}
