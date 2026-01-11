"use client";

import {
  Heart,
  MessageSquare,
  Newspaper,
  UserSearch,
  Users,
} from "lucide-react";
import { useSearchParams } from "next/dist/client/components/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { type ViewTabItem, ViewTabs } from "@/components/view-tabs";
import type {
  BotLogItem,
  BotLogLevel,
  BotModuleState,
  BotViewTabProps,
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

export function Content({ tab }: { tab?: string }) {
  const [state, setState] = useState<Record<string, BotModuleState>>({
    write_news: "on",
    foryou: "running",
    followers: "off",
    creator: "off",
    likes: "off",
    write_comments: "on",
    manage_news: "on",
    manage_comments: "on",
  });

  const [log, setLog] = useState<BotLogItem[]>([
    {
      id: "l1",
      level: "info",
      time: "12:40:12",
      message: "Successfully logged into account.",
    },
    {
      id: "l2",
      level: "success",
      time: "12:40:27",
      message: "Loaded already scraped users.",
    },
    {
      id: "l3",
      level: "warn",
      time: "12:41:03",
      message: "Rate limit warning (429) — backing off.",
    },
  ]);

  const pushLog = (level: BotLogLevel, message: string) => {
    setLog((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        level,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
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

  const router = useRouter();
  const sp = useSearchParams();

  const onTabChange = (key: string) => {
    setActiveTab(key);

    const next = new URLSearchParams(sp.toString());
    next.set("tab", key);

    router.replace(`?${next.toString()}`, { scroll: false });
  };

  return (
    <PageWrapper>
      <ViewTabs
        activeKey={activeTab}
        className="h-full"
        contentClassName="p-4"
        keepMounted
        navClassName="w-72 bg-card relative"
        onActiveKeyChange={onTabChange}
        tabs={tabs}
      />
    </PageWrapper>
  );
}
