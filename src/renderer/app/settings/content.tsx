"use client";

import { Bell, SwatchBook, User } from "lucide-react";
import { PageWrapper } from "@/components/page-wrapper";
import { type ViewTabItem, ViewTabs } from "@/components/view-tabs";
import { BrandingTabView } from "./_tabs/branding";
import { NotificationsTabView } from "./_tabs/notifications";
import { ProfileTabView } from "./_tabs/profile";

const tabs: ViewTabItem[] = [
  {
    key: "profile",
    label: "Profile Settings",
    description: "Manage your personal information",
    icon: <User className="size-4" />,
    content: <ProfileTabView />,
  },
  {
    key: "branding",
    label: "Branding",
    description: "Customize the appearance",
    icon: <SwatchBook className="size-4" />,
    content: <BrandingTabView />,
  },
  {
    key: "notifications",
    label: "Notifications",
    description: "Configure your notifications",
    icon: <Bell className="size-4" />,
    content: <NotificationsTabView />,
  },
];

export function Content() {
  return (
    <PageWrapper>
      <ViewTabs tabs={tabs} />
    </PageWrapper>
  );
}
