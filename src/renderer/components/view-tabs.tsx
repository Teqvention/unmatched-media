"use client";

import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

export interface ViewTabItem {
  key: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;

  /**
   * Either:
   * - a ReactNode
   * - a render function (useful if you want lazy-ish rendering or access to key)
   */
  content: ReactNode | ((ctx: { activeKey: string }) => ReactNode);
}

export type ViewDropdownItem =
  | {
      type?: "item";
      key: string;
      label: ReactNode;
      icon?: ReactNode;
      disabled?: boolean;
      onSelect: () => void;
    }
  | { type: "separator"; key: string }
  | { type: "label"; key: string; label: ReactNode };

interface ViewTabsProps {
  tabs: ViewTabItem[];

  /** Uncontrolled */
  defaultActiveKey?: string;

  /** Controlled */
  activeKey?: string;
  onActiveKeyChange?: (key: string) => void;

  /** Header options */
  title?: ReactNode;
  subtitle?: ReactNode;

  /**
   * If provided, completely replaces the whole header area.
   * Use this when you want a custom top bar (search, breadcrumbs, etc.)
   */
  header?: ReactNode;

  /** Optional dropdown in the header (e.g. workspace/user switcher) */
  dropdown?: ReactNode;

  /** Optional right-side actions in the header (buttons, icons, etc.) */
  actions?: ReactNode;

  /** Layout tuning */
  navAriaLabel?: string;
  keepMounted?: boolean; // render all tab contents and hide inactive (keeps state)
  className?: string;
  navClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
}

export function ViewTabs({
  tabs,
  defaultActiveKey,
  activeKey,
  onActiveKeyChange,
  dropdown = null,

  navAriaLabel = "View sections",
  keepMounted = false,

  className,
  navClassName,
  contentClassName,
}: ViewTabsProps) {
  const firstKey = tabs[0]?.key ?? "";

  const isControlled = typeof activeKey === "string";
  const [internalKey, setInternalKey] = useState<string>(
    defaultActiveKey ?? firstKey
  );

  const currentKey = isControlled ? (activeKey as string) : internalKey;

  // keep currentKey valid if tabs change
  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    if (!tabs.some((t) => t.key === currentKey)) {
      const next = defaultActiveKey ?? tabs[0]?.key ?? "";
      if (!isControlled) {
        setInternalKey(next);
      }
      onActiveKeyChange?.(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.map((t) => t.key).join("|")]);

  const setKey = (key: string) => {
    if (!isControlled) {
      setInternalKey(key);
    }
    onActiveKeyChange?.(key);
  };

  const activeTab = tabs.find((t) => t.key === currentKey) ?? tabs[0];

  return (
    <div className={cn("flex w-full flex-1 flex-col", className)}>
      {/* BODY */}
      <div className="flex max-h-[calc(100svh-(--spacing(24)))] flex-1 overflow-hidden rounded-lg border">
        {/* LEFT NAV */}
        <nav
          aria-label={navAriaLabel}
          className={cn("w-64 shrink-0 divide-y bg-card", navClassName)}
        >
          <div className="sticky top-0 flex flex-col gap-0 divide-y border-b bg-card">
            {dropdown !== null ? (
              <div className="px-4 py-3">{dropdown}</div>
            ) : null}
            {tabs.map((t) => {
              const isActive = t.key === currentKey;

              return (
                <button
                  className={cn(
                    "group relative w-full rounded-none px-4 py-2 text-left transition",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "hover:bg-foreground/10",

                    // active vs inactive text
                    isActive ? "text-foreground" : "text-foreground/90"
                  )}
                  disabled={t.disabled}
                  key={t.key}
                  onClick={() => !t.disabled && setKey(t.key)}
                  type="button"
                >
                  {/* Accent rail on the RIGHT, aligned with the nav/content divider */}
                  <span
                    className={cn(
                      "pointer-events-none absolute top-0 bottom-0 left-0 w-0.75",
                      "transition-opacity",
                      isActive
                        ? "bg-primary opacity-100"
                        : "bg-primary opacity-0"
                    )}
                  />

                  {/* Active background (subtle) */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-none transition",
                      isActive ? "bg-primary/15" : "bg-transparent"
                    )}
                  />

                  {/* Content (keep above the overlay) */}
                  <div className="relative flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-4">
                      {t.icon ? (
                        <span
                          className={cn(
                            "shrink-0 transition-colors",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          {t.icon}
                        </span>
                      ) : null}

                      <div className="min-w-0">
                        <div className="truncate font-medium text-sm">
                          {t.label}
                        </div>
                        {t.description ? (
                          <div className="text-muted-foreground text-xs">
                            {t.description}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {t.badge ? (
                      <div className="relative shrink-0">{t.badge}</div>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* RIGHT CONTENT */}
        <ScrollArea
          className={cn(
            "max-h-[calc(100svh-(--spacing(24)))] min-h-75 flex-1 border-l bg-card p-0",
            contentClassName
          )}
        >
          <div className="h-full p-4">{activeTab ? renderContent() : null}</div>
        </ScrollArea>
      </div>
    </div>
  );

  function renderContent(): ReactNode {
    if (keepMounted) {
      return (
        <div>
          {tabs.map((t) => {
            const node =
              typeof t.content === "function"
                ? t.content({ activeKey: currentKey })
                : t.content;
            return (
              <div className={cn(t.key !== currentKey && "hidden")} key={t.key}>
                {node}
              </div>
            );
          })}
        </div>
      );
    }

    if (typeof activeTab.content === "function") {
      return activeTab.content({ activeKey: currentKey });
    }

    return activeTab.content;
  }
}
