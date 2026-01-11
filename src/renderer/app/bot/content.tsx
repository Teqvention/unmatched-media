"use client";

import {
  Heart,
  MessageSquare,
  Newspaper,
  UserSearch,
  Users,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ fix import
import { useEffect, useMemo, useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type ViewTabItem, ViewTabs } from "@/components/view-tabs";
import {
  type BotLogItem,
  type BotLogLevel,
  BotModuleState,
  type BotViewTabProps,
} from "@/types/views/bot";
import { StatusPip } from "./_components/status-pip";
import { CreatorTabView } from "./_tabs/creator";
import { FollowersTabView } from "./_tabs/followers";
import { ForYouTabView } from "./_tabs/for-you";
import { LikesTabView } from "./_tabs/likes";
import { ManageCommentsTabView } from "./_tabs/manage-comments";
import { ManageNewsTabView } from "./_tabs/manage-news";
import { WriteCommentsTabView } from "./_tabs/write-comments";
import { WriteNewsTabView } from "./_tabs/write-news";

const TZ = "Europe/Lisbon";
const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: TZ,
});
const formatTime = (iso: string) => TIME_FMT.format(new Date(iso));

export function Content({ tab }: { tab?: string }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [_selectedUser, setSelectedUser] = useState<string>("sophie");

  const [state, setState] = useState<Record<string, BotModuleState>>({
    write_news: BotModuleState.Active,
    foryou: BotModuleState.Active,
    followers: BotModuleState.Inactive,
    creator: BotModuleState.Inactive,
    likes: BotModuleState.Inactive,
    write_comments: BotModuleState.Active,
    manage_news: BotModuleState.Active,
    manage_comments: BotModuleState.Active,
  });

  const [log, setLog] = useState<BotLogItem[]>(() => [
    {
      id: "l1",
      level: "info",
      time: formatTime("2023-06-01T12:40:12+01:00"),
      message: "Successfully logged into account.",
    },
    {
      id: "l2",
      level: "success",
      time: formatTime("2023-06-01T12:40:27+01:00"),
      message: "Loaded already scraped users.",
    },
    {
      id: "l3",
      level: "warning",
      time: formatTime("2023-06-01T12:41:03+01:00"),
      message: "Rate limit warning (429) — backing off.",
    },
    {
      id: "l4",
      level: "error",
      time: formatTime("2023-06-01T12:41:45+01:00"),
      message: "Failed to scrape user data.",
    },
  ]);

  const pushLog = (level: BotLogLevel, message: string) => {
    setLog((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        level,
        time: TIME_FMT.format(new Date()),
        message,
      },
      ...prev,
    ]);
  };

  const clearLog = () => setLog([]);
  const [onlyNewUsers, setOnlyNewUsers] = useState(true);

  const baseTabProps: BotViewTabProps = {
    state,
    setState,
    log,
    pushLog,
    clearLog,
    // optional: if you want tab views to know which account is selected,
    // add selectedUser to the type and pass it here.
    // selectedUser,
  };

  const tabs: ViewTabItem[] = [
    {
      key: "write_news",
      label: "Write news",
      description: "Message sending",
      icon: <Newspaper className="size-4" />,
      badge: <StatusPip state={state.write_news} />,
      content: (
        <WriteNewsTabView
          {...baseTabProps}
          onlyNewUsers={onlyNewUsers}
          setOnlyNewUsers={setOnlyNewUsers}
        />
      ),
    },
    {
      key: "foryou",
      label: "ForYou Scraper",
      description: "Discovery scrape",
      icon: <UserSearch className="size-4" />,
      badge: <StatusPip state={state.foryou} />,
      content: <ForYouTabView {...baseTabProps} />,
    },
    {
      key: "followers",
      label: "Followers Scraper",
      description: "Followers list",
      icon: <Users className="size-4" />,
      badge: <StatusPip state={state.followers} />,
      content: <FollowersTabView {...baseTabProps} />,
    },
    {
      key: "creator",
      label: "Creator Scraper",
      description: "Scrape by creator",
      icon: <UserSearch className="size-4" />,
      badge: <StatusPip state={state.creator} />,
      content: <CreatorTabView {...baseTabProps} />,
    },
    {
      key: "likes",
      label: "Likes Scraper",
      description: "Scrape likes",
      icon: <Heart className="size-4" />,
      badge: <StatusPip state={state.likes} />,
      content: <LikesTabView {...baseTabProps} />,
    },
    {
      key: "write_comments",
      label: "Write comments",
      description: "Automation",
      icon: <MessageSquare className="size-4" />,
      badge: <StatusPip state={state.write_comments} />,
      content: <WriteCommentsTabView {...baseTabProps} />,
    },
    {
      key: "manage_news",
      label: "Managing news",
      description: "Templates",
      icon: <Newspaper className="size-4" />,
      badge: <StatusPip state={state.manage_news} />,
      content: <ManageNewsTabView {...baseTabProps} />,
    },
    {
      key: "manage_comments",
      label: "Manage comments",
      description: "Comment presets",
      icon: <MessageSquare className="size-4" />,
      badge: <StatusPip state={state.manage_comments} />,
      content: <ManageCommentsTabView {...baseTabProps} />,
    },
  ];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  const tabKeys = useMemo(() => new Set(tabs.map((t) => t.key)), [tabs]);
  const initial = tab && tabKeys.has(tab) ? tab : "write_news";
  const [activeTab, setActiveTab] = useState<string>(initial);

  useEffect(() => {
    if (tab && tabKeys.has(tab)) {
      setActiveTab(tab);
    }
  }, [tab, tabKeys]);

  const onTabChange = (key: string) => {
    setActiveTab(key);
    const next = new URLSearchParams(sp.toString());
    next.set("tab", key);
    router.replace(`?${next.toString()}`, { scroll: false });
  };

  const userItem = (name: string, src: string, key: string) => ({
    key,
    label: name,
    icon: (
      <Avatar className="size-7">
        <AvatarImage alt={name} src={src} />
        <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
      </Avatar>
    ),
    onSelect: () => setSelectedUser(key), // ✅ now exists
  });

  return (
    <PageWrapper>
      <ViewTabs
        activeKey={activeTab}
        className="h-full"
        dropdown={{
          trigger: "Select user",
          items: [
            { type: "label", key: "lbl", label: "Accounts" },
            userItem("Sophie", "/avatars/sophie.jpg", "sophie"),
            userItem("Lotta", "/avatars/lotta.jpg", "lotta"),
            userItem("Hannah", "/avatars/hannah.jpg", "hannah"),
          ],
        }}
        keepMounted
        navClassName="w-72 bg-card relative"
        onActiveKeyChange={onTabChange}
        tabs={tabs}
      />
    </PageWrapper>
  );
}
