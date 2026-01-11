"use client";

import {
  AudioWaveform,
  Bot,
  ChartSpline,
  GalleryVerticalEnd,
  MessageCircle,
  Users,
  Workflow,
} from "lucide-react";

import type * as React from "react";
import { NavLinks } from "@/components/sidebar/nav-main";
import { PlattformSwitcher } from "@/components/sidebar/nav-platform";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const navigation = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  plattforms: [
    {
      name: "Maloum",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "4Base (coming soon)",
      logo: AudioWaveform,
      plan: "Startup",
      disabled: true,
    },
  ],
  links: [
    { name: "Dashboard", url: "/", icon: ChartSpline },
    { name: "Chat", url: "/chat", icon: MessageCircle },
    { name: "Manage Users", url: "/users", icon: Users },
    { name: "Automation", url: "/automation", icon: Workflow },
    { name: "Bot", url: "/bot", icon: Bot },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <PlattformSwitcher plattforms={navigation.plattforms} />
      </SidebarHeader>
      <SidebarContent>
        <NavLinks links={navigation.links} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigation.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
