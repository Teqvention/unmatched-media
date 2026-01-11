"use client";

import { Check, Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  type BaseKey,
  type PaletteKey,
  useThemeSettings,
} from "@/hooks/use-theme-settings";
import { cn } from "@/lib/utils";

function ModeCard({
  title,
  description,
  icon,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "w-full rounded-lg border bg-card p-4 text-left transition",
        "hover:bg-accent hover:text-accent-foreground",
        selected && "ring-2 ring-ring"
      )}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{icon}</div>
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-muted-foreground text-sm">{description}</div>
          </div>
        </div>

        {selected ? (
          <span className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="m-1 size-4" />
          </span>
        ) : null}
      </div>
    </button>
  );
}

function PaletteCard({
  paletteKey,
  label,
  selected,
  onClick,
}: {
  paletteKey: PaletteKey;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const previewClass = {
    neutral: "bg-muted",
    blue: "bg-[oklch(0.623_0.214_259.815)]",
    green: "bg-[oklch(0.723_0.219_149.579)]",
    red: "bg-[oklch(0.637_0.237_25.331)]",
    rose: "bg-[oklch(0.6002_0.2414_0.1348)]",
    violet: "bg-[oklch(0.606_0.25_292.717)]",
    yellow: "bg-[oklch(0.828_0.189_84.429)]",
  }[paletteKey];

  return (
    <button
      className={cn(
        "group w-full rounded-lg border bg-card p-3 text-left transition",
        "hover:bg-accent hover:text-accent-foreground",
        selected && "ring-2 ring-ring"
      )}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center justify-between">
        <div className="font-medium text-sm">{label}</div>
        {selected ? <Check className="size-4 text-primary" /> : null}
      </div>

      <div className="mt-3 overflow-hidden rounded-md border">
        <div className={cn("h-7 w-full opacity-90", previewClass)} />
        <div className="h-7 w-full bg-background" />
        <div className="h-7 w-full bg-card" />
      </div>
    </button>
  );
}

function BaseCard({
  baseKey,
  label,
  description,
  selected,
  onClick,
}: {
  baseKey: BaseKey;
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  const preview = {
    slate: ["bg-slate-100", "bg-slate-50", "bg-slate-200"],
    zinc: ["bg-zinc-100", "bg-zinc-50", "bg-zinc-200"],
    gray: ["bg-gray-100", "bg-gray-50", "bg-gray-200"],
    neutral: ["bg-neutral-100", "bg-neutral-50", "bg-neutral-200"],
    stone: ["bg-stone-100", "bg-stone-50", "bg-stone-200"],
    chrome: ["bg-slate-100", "bg-zinc-50", "bg-slate-200"],
  }[baseKey];

  return (
    <button
      className={cn(
        "group w-full rounded-lg border bg-card p-3 text-left transition",
        "hover:bg-accent hover:text-accent-foreground",
        selected && "ring-2 ring-ring"
      )}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-medium text-sm">{label}</div>
          {description ? (
            <div className="text-muted-foreground text-xs">{description}</div>
          ) : null}
        </div>
        {selected ? <Check className="mt-0.5 size-4 text-primary" /> : null}
      </div>

      <div className="mt-3 overflow-hidden rounded-md border">
        <div className={cn("h-7 w-full", preview[0])} />
        <div className={cn("h-7 w-full", preview[1])} />
        <div className={cn("h-7 w-full", preview[2])} />
      </div>
    </button>
  );
}

export function BrandingTabView() {
  const {
    mode,
    setMode,
    palette,
    setPalette,
    resetPalette,
    PALETTES,
    base,
    setBase,
    resetBase,
    BASES,
    mounted,
  } = useThemeSettings();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg">Branding</h2>
        <p className="text-muted-foreground text-sm">
          Choose a color mode and a palette for your workspace UI.
        </p>
      </div>

      <Separator />

      {/* MODE */}
      <div className="space-y-3">
        <div>
          <div className="font-medium text-sm">Color mode</div>
          <div className="text-muted-foreground text-sm">
            Controls light/dark appearance.
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <ModeCard
            description="Always use light mode"
            icon={<Sun className="size-5" />}
            onClick={() => setMode("light")}
            selected={mounted && mode === "light"}
            title="Light"
          />
          <ModeCard
            description="Always use dark mode"
            icon={<Moon className="size-5" />}
            onClick={() => setMode("dark")}
            selected={mounted && mode === "dark"}
            title="Dark"
          />
          <ModeCard
            description="Match your device settings"
            icon={<Laptop className="size-5" />}
            onClick={() => setMode("system")}
            selected={mounted && mode === "system"}
            title="System"
          />
        </div>
      </div>

      <Separator />

      {/* PALETTE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-medium text-sm">Palette</div>
            <div className="text-muted-foreground text-sm">
              Controls the accent color (buttons, highlights, rings).
            </div>
          </div>

          <Button onClick={resetPalette} variant="outline">
            Reset
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PALETTES.map((p) => (
            <PaletteCard
              key={p.key}
              label={p.label}
              onClick={() => setPalette(p.key)}
              paletteKey={p.key}
              selected={palette === p.key}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* BASE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-medium text-sm">Base</div>
            <div className="text-muted-foreground text-sm">
              Controls backgrounds, surfaces, and borders (overall aesthetic).
            </div>
          </div>

          <Button onClick={resetBase} variant="outline">
            Reset
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BASES.map((b) => (
            <BaseCard
              baseKey={b.key}
              description={b.description}
              key={b.key}
              label={b.label}
              onClick={() => setBase(b.key)}
              selected={mounted && base === b.key}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
