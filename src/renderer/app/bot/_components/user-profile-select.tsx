"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

export function UserProfileSelect({
  users,
  value,
  onChange,
  className,
}: {
  users: UserProfile[];
  value: string;
  onChange: (user: UserProfile) => void;
  className?: string;
}) {
  return (
    <Select
      onValueChange={(nextId) => {
        const u = users.find((x) => x.id === nextId);
        if (u) {
          onChange(u);
        }
      }}
      value={value}
    >
      <SelectTrigger
        className={cn(
          "h-12! w-full justify-between rounded-none border-0 bg-transparent px-3",
          className
        )}
      >
        <SelectValue className="flex items-start" placeholder="Select user" />
      </SelectTrigger>

      <SelectContent
        align="center"
        className="w-72 rounded-none border-x-0"
        position="popper"
      >
        {users.map((u) => (
          <SelectItem key={u.id} value={u.id}>
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="h-6 w-6">
                <AvatarImage alt={u.name} src={u.avatarUrl} />
                <AvatarFallback>
                  {u.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 text-start">
                <div className="truncate text-sm">{u.name}</div>
                {u.email ? (
                  <div className="truncate text-muted-foreground text-xs">
                    {u.email}
                  </div>
                ) : null}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
