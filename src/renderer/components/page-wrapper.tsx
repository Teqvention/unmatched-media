import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>;
}
