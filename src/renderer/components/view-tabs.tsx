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

export interface ViewDropdown {
  trigger: ReactNode;
  items: ViewDropdownItem[];
  align?: "start" | "end";
}

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
  dropdown?: ViewDropdown;

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
      <div className="flex max-h-[calc(100svh-(--spacing(24)))] flex-1 divide-x overflow-hidden rounded-lg border">
        {/* LEFT NAV */}
        <nav
          aria-label={navAriaLabel}
          className={cn("w-64 shrink-0 divide-y bg-card", navClassName)}
        >
          {/* {dropdown ? <ViewTabsDropdown dropdown={dropdown} /> : null} */}

          <div className="sticky top-0 flex flex-col gap-0 divide-y border-b bg-card">
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
            "max-h-[calc(100svh-(--spacing(24)))] min-h-75 flex-1 bg-card p-0",
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

// function isSeparator(
//   item: ViewDropdownItem
// ): item is Extract<ViewDropdownItem, { type: "separator" }> {
//   return item.type === "separator";
// }

// function isLabel(
//   item: ViewDropdownItem
// ): item is Extract<ViewDropdownItem, { type: "label" }> {
//   return item.type === "label";
// }

// function isItem(
//   item: ViewDropdownItem
// ): item is Extract<ViewDropdownItem, { onSelect: () => void }> {
//   return "onSelect" in item;
// }

// interface DropdownGroup {
//   key: string;
//   label?: ReactNode;
//   items: Extract<ViewDropdownItem, { onSelect: () => void }>[];
// }

// function buildDropdownGroups(items: ViewDropdownItem[]) {
//   const blocks: Array<
//     { type: "group"; group: DropdownGroup } | { type: "sep"; key: string }
//   > = [];

//   let current: DropdownGroup | null = null;
//   let groupIndex = 0;

//   const flush = () => {
//     if (current && (current.label || current.items.length > 0)) {
//       blocks.push({ type: "group", group: current });
//     }
//     current = null;
//   };

//   for (const it of items) {
//     if (isSeparator(it)) {
//       flush();
//       blocks.push({ type: "sep", key: it.key });
//       continue;
//     }

//     if (isLabel(it)) {
//       flush();
//       current = {
//         key: `group-${it.key}-${groupIndex++}`,
//         label: it.label,
//         items: [],
//       };
//       continue;
//     }

//     // selectable item
//     if (isItem(it)) {
//       if (!current) {
//         current = { key: `group-auto-${groupIndex++}`, items: [] };
//       }
//       current.items.push(it);
//     }
//   }

//   flush();
//   return blocks;
// }

// function ViewTabsDropdown({ dropdown }: { dropdown: ViewDropdown }) {
//   const selectable = dropdown.items.filter(isItem);

//   const [value, setValue] = useState<string>(() => selectable[0]?.key ?? "");

//   useEffect(() => {
//     if (!selectable.some((x) => x.key === value)) {
//       setValue(selectable[0]?.key ?? "");
//     }
//   }, [selectable, value]);

//   const selected = selectable.find((x) => x.key === value);

//   const blocks = buildDropdownGroups(dropdown.items);

//   return (
//     <div>
//       <Select
//         onValueChange={(next) => {
//           setValue(next);
//           selectable.find((x) => x.key === next)?.onSelect();
//         }}
//         value={value}
//       >
//         <SelectTrigger className="h-14 justify-between">
//           {/* Trigger content (avatar + name) */}
//           {selected ? (
//             <div className="flex min-w-0 items-center gap-3">
//               {selected.icon ? (
//                 <span className="shrink-0">{selected.icon}</span>
//               ) : null}
//               <div className="min-w-0">
//                 <div className="truncate font-medium text-sm">
//                   {selected.label}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-muted-foreground text-sm">
//               {dropdown.trigger}
//             </div>
//           )}
//         </SelectTrigger>

//         <SelectContent align={dropdown.align ?? "start"}>
//           {blocks.map((b) => {
//             if (b.type === "sep") {
//               return <SelectSeparator key={b.key} />;
//             }

//             const g = b.group;
//             return (
//               <SelectGroup key={g.key}>
//                 {g.label ? <SelectLabel>{g.label}</SelectLabel> : null}

//                 {g.items.map((item) => (
//                   <SelectItem
//                     disabled={item.disabled}
//                     key={item.key}
//                     value={item.key}
//                   >
//                     <div className="flex items-center gap-3">
//                       {item.icon ? (
//                         <span className="shrink-0">{item.icon}</span>
//                       ) : null}
//                       <span className="truncate">{item.label}</span>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             );
//           })}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }
