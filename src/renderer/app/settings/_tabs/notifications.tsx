"use client";

import { Bell, DollarSign, MessageSquare, Shield, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

type Channel = "inApp" | "email" | "push";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  defaultEnabled?: boolean;
  channels?: Partial<Record<Channel, boolean>>;
}

interface NotificationGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: NotificationSetting[];
}

function Row({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-muted-foreground text-sm">{description}</div>
      </div>
      <Switch checked={enabled} onCheckedChange={onToggle} />
    </div>
  );
}

export function NotificationsTabView() {
  const groups: NotificationGroup[] = [
    {
      id: "chats",
      title: "Chats",
      icon: <MessageSquare className="size-4 text-muted-foreground" />,
      items: [
        {
          id: "chats_new_message",
          title: "New news",
          description: "Notifies you as soon as a user writes to you.",
          defaultEnabled: true,
        },
      ],
    },
    {
      id: "revenue",
      title: "Revenue",
      icon: <DollarSign className="size-4 text-muted-foreground" />,
      items: [
        {
          id: "revenue_new_sale",
          title: "New sale",
          description: "Push message at every sale.",
          defaultEnabled: true,
        },
      ],
    },
    {
      id: "team",
      title: "Team",
      icon: <Users className="size-4 text-muted-foreground" />,
      items: [
        {
          id: "team_staff_activities",
          title: "Staff activities",
          description:
            "Shows you when a team member becomes active or inactive.",
          defaultEnabled: false,
        },
      ],
    },
    {
      id: "system",
      title: "System",
      icon: <Shield className="size-4 text-muted-foreground" />,
      items: [
        {
          id: "system_new_device",
          title: "New device",
          description: "Security warning for new login location.",
          defaultEnabled: true,
        },
      ],
    },
  ];

  // simple local state; wire to your backend later
  const initial = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const g of groups) {
      for (const i of g.items) {
        map[i.id] = !!i.defaultEnabled;
      }
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [enabled, setEnabled] = useState<Record<string, boolean>>(initial);

  const setAll = (value: boolean) => {
    setEnabled((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        next[key] = value;
      }
      return next;
    });
  };

  const anyEnabled = Object.values(enabled).some(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg">Notifications</h2>
        <p className="text-muted-foreground text-sm">
          Choose which events you want to be notified about.
        </p>
      </div>

      <Card className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex size-9 items-center justify-center rounded-md bg-muted/50">
              <Bell className="size-4 text-muted-foreground" />
            </div>
            <div>
              <div className="font-semibold text-sm">Global notifications</div>
              <div className="text-muted-foreground text-sm">
                Quickly enable or disable all notifications.
              </div>
            </div>
          </div>

          <Switch checked={anyEnabled} onCheckedChange={(v) => setAll(v)} />
        </div>
      </Card>

      <div className="grid gap-6">
        {groups.map((group) => (
          <Card className="p-0" key={group.id}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex size-9 items-center justify-center rounded-md bg-muted/50">
                  {group.icon}
                </div>
                <div className="font-semibold text-lg">{group.title}</div>
              </div>

              <Separator className="my-4" />

              <div className="divide-y">
                {group.items.map((item) => (
                  <Row
                    description={item.description}
                    enabled={!!enabled[item.id]}
                    key={item.id}
                    onToggle={(v) =>
                      setEnabled((prev) => ({
                        ...prev,
                        [item.id]: v,
                      }))
                    }
                    title={item.title}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
