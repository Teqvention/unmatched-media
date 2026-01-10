"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function PlattformSwitcher({
  plattforms,
}: {
  plattforms: {
    name: string;
    logo: React.ElementType;
    plan: string;
    disabled?: boolean;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeplattform, setActiveplattform] = React.useState(plattforms[0]);

  if (!activeplattform) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeplattform.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeplattform.name}
                </span>
                <span className="truncate text-xs">{activeplattform.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Plattforms
            </DropdownMenuLabel>

            {plattforms.map((plattform, index) => (
              <DropdownMenuItem
                className={`gap-2 p-2 ${
                  plattform.disabled ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={plattform.disabled}
                key={plattform.name} // <-- added disabled here
                onClick={() => setActiveplattform(plattform)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <plattform.logo className="size-3.5 shrink-0" />
                </div>
                {plattform.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
