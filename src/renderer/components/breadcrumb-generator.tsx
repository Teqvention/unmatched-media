"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function BreadcrumbGenerator() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex h-16 w-full shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        className="mr-2 bg-white/20 data-[orientation=vertical]:h-4"
        orientation="vertical"
      />
      <Breadcrumb>
        <BreadcrumbList>
          {segments.length > 0 ? (
            <>
              <BreadcrumbLink
                className="-mx-2 rounded-md px-2 py-1 hover:bg-foreground/10"
                href="/"
              >
                Dashboard
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </>
          ) : (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          )}
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const href = `/${segments.slice(0, index + 1).join("/")}`;
            return (
              <BreadcrumbItem
                className={isLast ? "hidden md:block" : ""}
                key={href}
              >
                {isLast ? (
                  <BreadcrumbPage>
                    {segment
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink
                      className="-mx-2 rounded-md px-2 py-1 hover:bg-foreground/10"
                      href={href}
                    >
                      {segment
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
