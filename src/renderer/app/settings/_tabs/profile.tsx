"use client";

import {
  Check,
  Edit3,
  KeyRound,
  Laptop,
  LogOut,
  Monitor,
  Smartphone,
} from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export interface LoginSession {
  id: string;
  deviceName: string; // e.g. "MacBook Pro"
  deviceType: "laptop" | "desktop" | "phone" | "tablet";
  ipAddress?: string;
  lastLoginAt: string; // already formatted for UI (or format in parent)
  timeZone?: string; // e.g. "Berlin"
  current?: boolean; // if this is the current session/device
}

interface Props {
  user?: UserProfile;
  sessions?: LoginSession[];

  onSaveProfile?: (data: {
    name: string;
    email: string;
  }) => Promise<void> | void;
  onUploadAvatar?: (file: File) => Promise<void> | void;

  onChangePassword?: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void> | void;

  onSignOutSession?: (sessionId: string) => Promise<void> | void;
  onSignOutAll?: () => Promise<void> | void;
}

const initialsRegex = /\s+/;
function initials(name: string) {
  const parts = name.trim().split(initialsRegex).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

function DeviceIcon({ type }: { type: LoginSession["deviceType"] }) {
  const cls = "size-4 text-muted-foreground";
  if (type === "phone" || type === "tablet") {
    return <Smartphone className={cls} />;
  }
  if (type === "desktop") {
    return <Monitor className={cls} />;
  }
  return <Laptop className={cls} />;
}

function Stat({ label, value }: { label: string; value?: string }) {
  return (
    <div className="min-w-0">
      <div className="text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </div>
      <div className="truncate font-medium text-sm">{value ?? "—"}</div>
    </div>
  );
}

export function ProfileTabView({
  user = {
    name: "Tim Müller",
    email: "tim.müller@web.de",
    avatarUrl: "",
  },
  sessions = [
    {
      id: "s1",
      deviceName: "MacBook Pro",
      deviceType: "laptop",
      ipAddress: "19.242.242.242",
      lastLoginAt: "November 16, 2025",
      timeZone: "Berlin",
      current: true,
    },
    {
      id: "s2",
      deviceName: "MacBook Pro",
      deviceType: "laptop",
      ipAddress: "19.242.242.242",
      lastLoginAt: "November 16, 2025",
      timeZone: "Berlin",
    },
    {
      id: "s3",
      deviceName: "iPhone",
      deviceType: "phone",
      ipAddress: "19.111.90.10",
      lastLoginAt: "October 02, 2025",
      timeZone: "Lisbon",
    },
  ],
  onSaveProfile,
  onUploadAvatar,
  onChangePassword,
  onSignOutSession,
  onSignOutAll,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // profile edit
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [savingProfile, setSavingProfile] = useState(false);

  // password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const passwordMismatch =
    confirmPassword.length > 0 &&
    newPassword.length > 0 &&
    confirmPassword !== newPassword;

  async function handleAvatarPick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    await onUploadAvatar?.(file);
    e.target.value = "";
  }

  async function handleSaveProfile() {
    setSavingProfile(true);
    try {
      await onSaveProfile?.({ name: editName, email: editEmail });
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleChangePassword() {
    if (passwordMismatch) {
      return;
    }
    setSavingPassword(true);
    try {
      await onChangePassword?.({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* PROFILE HEADER CARD (like your screenshot) */}
      <Card className="p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="size-20">
                <AvatarImage alt={user.name} src={user.avatarUrl ?? ""} />
                <AvatarFallback className="text-lg">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>

              {/* subtle “edit ring” vibe */}
              <div className="pointer-events-none absolute -inset-1.5 rounded-full border border-primary/60 border-dashed" />
            </div>

            <div className="min-w-0">
              <div className="truncate font-semibold text-2xl leading-tight">
                {user.name}
              </div>
              <div className="truncate text-muted-foreground text-sm">
                {user.email}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-10 rounded-md px-5">
                      <Edit3 className="mr-2 size-4" />
                      Edit profile
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-130">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Update your name, email, and avatar.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-14">
                            <AvatarImage
                              alt={user.name}
                              src={user.avatarUrl ?? ""}
                            />
                            <AvatarFallback>
                              {initials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="truncate font-medium text-sm">
                              {user.name}
                            </div>
                            <div className="truncate text-muted-foreground text-xs">
                              {user.email}
                            </div>
                          </div>
                        </div>

                        <div>
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            type="button"
                            variant="outline"
                          >
                            Change avatar
                          </Button>
                          <input
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarPick}
                            ref={fileInputRef}
                            type="file"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="profile-name">Name</Label>
                          <Input
                            id="profile-name"
                            onChange={(e) => setEditName(e.target.value)}
                            value={editName}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="profile-email">Email</Label>
                          <Input
                            id="profile-email"
                            onChange={(e) => setEditEmail(e.target.value)}
                            value={editEmail}
                          />
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        disabled={savingProfile}
                        onClick={handleSaveProfile}
                      >
                        {savingProfile ? "Saving..." : "Save changes"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* right side empty in screenshot — keep subtle balance */}
          <div className="hidden md:block" />
        </div>
      </Card>

      {/* CHANGE PASSWORD CARD */}
      <Card className="p-6 md:p-8">
        <div className="font-semibold text-2xl">Change password</div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current password</Label>
            <Input
              className="h-11"
              id="currentPassword"
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              value={currentPassword}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              className="h-11"
              id="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              value={newPassword}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input
              className={cn("h-11", passwordMismatch && "border-destructive")}
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
            />
            {passwordMismatch ? (
              <p className="text-destructive text-xs">
                Passwords do not match.
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <Button
            className="h-11 rounded-md px-6"
            disabled={
              savingPassword ||
              !currentPassword ||
              !newPassword ||
              passwordMismatch
            }
            onClick={handleChangePassword}
          >
            <KeyRound className="mr-2 size-4" />
            {savingPassword ? "Saving..." : "Save new password"}
          </Button>
        </div>
      </Card>

      {/* LOGIN HISTORY / DEVICES LIST (previously used devices) */}
      <Card className="gap-0 p-0">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-semibold text-2xl">Logged in devices</div>
              <div className="text-muted-foreground text-sm">
                Previously used devices and recent login sessions.
              </div>
            </div>

            {onSignOutAll ? (
              <Button className="h-10" variant="outline">
                <LogOut className="mr-2 size-4" />
                Sign out all
              </Button>
            ) : null}
          </div>
        </div>

        {/* “header row” feel like your screenshot */}
        <div className="grid grid-cols-1 gap-0 border-t bg-accent/20 px-6 py-4 font-medium text-sm md:grid-cols-4 md:px-8">
          <div>Device</div>
          <div>IP address</div>
          <div>Last login time</div>
          <div>Time zone</div>
        </div>

        <div className="divide-y">
          {sessions.map((s) => (
            <div
              className={cn(
                "grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-4 md:items-center md:px-8",
                s.current && "bg-primary/5"
              )}
              key={s.id}
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex size-9 items-center justify-center rounded-md bg-muted/50">
                  <DeviceIcon type={s.deviceType} />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="truncate font-semibold text-sm">
                      {s.deviceName}
                    </div>
                    {s.current ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-primary text-xs">
                        <Check className="size-3" />
                        Current
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <Stat label="IP address" value={s.ipAddress} />
              <Stat label="Last login time" value={s.lastLoginAt} />
              <div className="flex items-center justify-between gap-3 md:justify-start">
                <Stat label="Time zone" value={s.timeZone} />

                {onSignOutSession ? (
                  <Button
                    className="h-9"
                    disabled={!!s.current}
                    onClick={() => onSignOutSession(s.id)}
                    size="sm"
                    variant="outline"
                  >
                    <LogOut className="mr-2 size-4" />
                    Sign out
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
