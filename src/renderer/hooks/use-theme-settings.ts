"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type PaletteKey =
  | "neutral"
  | "blue"
  | "green"
  | "red"
  | "rose"
  | "violet"
  | "yellow";

export type BaseKey =
  | "slate"
  | "zinc"
  | "gray"
  | "neutral"
  | "stone"
  | "chrome";

export const PALETTES: Array<{ key: PaletteKey; label: string }> = [
  { key: "neutral", label: "Neutral" },
  { key: "blue", label: "Blue" },
  { key: "green", label: "Green" },
  { key: "red", label: "Red" },
  { key: "rose", label: "Rose" },
  { key: "violet", label: "Violet" },
  { key: "yellow", label: "Yellow" },
];

export const BASES: Array<{
  key: BaseKey;
  label: string;
  description?: string;
}> = [
  { key: "slate", label: "Slate", description: "Cool, modern" },
  { key: "zinc", label: "Zinc", description: "Clean, neutral-cool" },
  { key: "gray", label: "Gray", description: "Classic" },
  { key: "neutral", label: "Neutral", description: "Most neutral" },
  { key: "stone", label: "Stone", description: "Warm, earthy" },
  { key: "chrome", label: "Chrome", description: "Slick, high-contrast" }, // your custom one
];

const PALETTE_KEY = "palette";
const BASE_KEY = "base";

const DEFAULT_PALETTE: PaletteKey = "neutral";
const DEFAULT_BASE: BaseKey = "slate";

export function useThemeSettings() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [palette, setPaletteState] = useState<PaletteKey>(DEFAULT_PALETTE);
  const [base, setBaseState] = useState<BaseKey>(DEFAULT_BASE);

  // read stored values on mount
  useEffect(() => {
    if (!mounted) {
      return;
    }

    try {
      const storedPalette = localStorage.getItem(
        PALETTE_KEY
      ) as PaletteKey | null;
      if (storedPalette && PALETTES.some((p) => p.key === storedPalette)) {
        setPaletteState(storedPalette);
      }

      const storedBase = localStorage.getItem(BASE_KEY) as BaseKey | null;
      if (storedBase && BASES.some((b) => b.key === storedBase)) {
        setBaseState(storedBase);
      }
    } catch {
      /**/
    }
  }, [mounted]);

  // apply + persist palette
  useEffect(() => {
    if (!mounted) {
      return;
    }
    try {
      document.documentElement.dataset.palette = palette;
      localStorage.setItem(PALETTE_KEY, palette);
    } catch {
      /**/
    }
  }, [palette, mounted]);

  // apply + persist base
  useEffect(() => {
    if (!mounted) {
      return;
    }
    try {
      document.documentElement.dataset.base = base;
      localStorage.setItem(BASE_KEY, base);
    } catch {
      /**/
    }
  }, [base, mounted]);

  const mode = (theme ?? "system") as "light" | "dark" | "system";
  const setMode = (m: "light" | "dark" | "system") => setTheme(m);

  const setPalette = (k: PaletteKey) => setPaletteState(k);
  const resetPalette = () => setPaletteState(DEFAULT_PALETTE);
  const setBase = (k: BaseKey) => setBaseState(k);
  const resetBase = () => setBaseState(DEFAULT_BASE);

  return {
    mounted,

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
  };
}
