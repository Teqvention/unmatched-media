import type { Metadata } from "next";
import { PageWrapper } from "@/components/page-wrapper";
import { type ViewTabItem, ViewTabs } from "@/components/view-tabs";
import { BrandingTabView } from "./_tabs/branding";
import { NotificationsTabView } from "./_tabs/notifications";
import { ProfileTabView } from "./_tabs/profile";

export const metadata: Metadata = {
  title: "My Next Page",
};

const tabs: ViewTabItem[] = [
  {
    key: "profile",
    label: "Profile Settings",
    content: <ProfileTabView />,
  },
  {
    key: "branding",
    label: "Branding",
    content: <BrandingTabView />,
  },
  {
    key: "notifications",
    label: "Notifications",
    content: <NotificationsTabView />,
  },
];

export default function () {
  return (
    <PageWrapper>
      <ViewTabs tabs={tabs} />
    </PageWrapper>
  );
}
