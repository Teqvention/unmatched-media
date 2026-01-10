"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

export const PALETTE_KEY = "palette";

export const PALETTES = [
  { key: "neutral", label: "Neutral" },
  { key: "blue", label: "Blue" },
  { key: "green", label: "Green" },
  { key: "red", label: "Red" },
  { key: "rose", label: "Rose" },
  { key: "violet", label: "Violet" },
  { key: "yellow", label: "Yellow" },
] as const;

export type PaletteKey = (typeof PALETTES)[number]["key"];
export type Mode = "light" | "dark" | "system";

function applyPalette(palette: PaletteKey) {
  const root = document.documentElement;

  if (palette === "neutral") {
    root.removeAttribute("data-palette");
    localStorage.removeItem(PALETTE_KEY);
    return;
  }

  root.setAttribute("data-palette", palette);
  localStorage.setItem(PALETTE_KEY, palette);
}

function readPalette(): PaletteKey {
  const saved = localStorage.getItem(PALETTE_KEY);
  const keys = PALETTES.map((p) => p.key);
  return keys.includes(saved as PaletteKey) ? (saved as PaletteKey) : "neutral";
}

interface UseThemeSettingsOptions {
  defaultPalette?: PaletteKey;
  syncAcrossTabs?: boolean;
}

export function useThemeSettings(options: UseThemeSettingsOptions = {}) {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  const defaultPalette = options.defaultPalette ?? "neutral";

  const [mounted, setMounted] = useState(false);
  const [palette, setPaletteState] = useState<PaletteKey>(defaultPalette);

  // Mark mounted (avoids SSR/hydration edge cases)
  useEffect(() => setMounted(true), []);

  // On app boot (page refresh), re-apply saved palette
  useEffect(() => {
    if (!mounted) {
      return;
    }
    const p = readPalette();
    setPaletteState(p);
    applyPalette(p);
  }, [mounted]);

  const setMode = useCallback(
    (m: Mode) => {
      setTheme(m);
    },
    [setTheme]
  );

  const setPalette = useCallback((p: PaletteKey) => {
    setPaletteState(p);
    applyPalette(p);
  }, []);

  const resetPalette = useCallback(() => {
    setPalette("neutral");
  }, [setPalette]);

  // Optional: keep multiple tabs in sync
  useEffect(() => {
    if (!(mounted && options.syncAcrossTabs)) {
      return;
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key !== PALETTE_KEY) {
        return;
      }
      const p = readPalette();
      setPaletteState(p);
      applyPalette(p);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [mounted, options.syncAcrossTabs]);

  const mode = useMemo<Mode>(() => {
    // next-themes can return undefined during hydration
    return (theme ?? "system") as Mode;
  }, [theme]);

  return {
    mounted,

    // mode
    mode,
    setMode,
    resolvedTheme, // "light" | "dark" (helpful for UI if you need it)
    systemTheme,

    // palette
    palette,
    setPalette,
    resetPalette,

    // constants (handy in components)
    PALETTES,
  };
}
