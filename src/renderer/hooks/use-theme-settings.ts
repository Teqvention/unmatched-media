"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

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
  { key: "chrome", label: "Chrome", description: "Slick, high-contrast" },
];

const PALETTE_KEY = "palette";
const BASE_KEY = "base";

const DEFAULT_PALETTE: PaletteKey = "neutral";
const DEFAULT_BASE: BaseKey = "slate";

export interface ThemeSettingsOptions {
  defaultPalette?: PaletteKey;
  defaultBase?: BaseKey;
  syncAcrossTabs?: boolean;
}

function isPaletteKey(v: unknown): v is PaletteKey {
  return typeof v === "string" && PALETTES.some((p) => p.key === v);
}

function isBaseKey(v: unknown): v is BaseKey {
  return typeof v === "string" && BASES.some((b) => b.key === v);
}

export function useThemeSettings(options: ThemeSettingsOptions = {}) {
  const { defaultPalette, defaultBase, syncAcrossTabs = true } = options;

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveDefaults = useMemo(
    () => ({
      palette: defaultPalette ?? DEFAULT_PALETTE,
      base: defaultBase ?? DEFAULT_BASE,
    }),
    [defaultPalette, defaultBase]
  );

  const [palette, setPaletteState] = useState<PaletteKey>(
    effectiveDefaults.palette
  );
  const [base, setBaseState] = useState<BaseKey>(effectiveDefaults.base);

  // read stored values on mount; fall back to provided defaults
  useEffect(() => {
    if (!mounted) {
      return;
    }

    try {
      const storedPalette = localStorage.getItem(PALETTE_KEY);
      setPaletteState(
        isPaletteKey(storedPalette) ? storedPalette : effectiveDefaults.palette
      );

      const storedBase = localStorage.getItem(BASE_KEY);
      setBaseState(isBaseKey(storedBase) ? storedBase : effectiveDefaults.base);
    } catch {
      setPaletteState(effectiveDefaults.palette);
      setBaseState(effectiveDefaults.base);
    }
  }, [mounted, effectiveDefaults]);

  // optionally sync across tabs/windows
  useEffect(() => {
    if (!(mounted && syncAcrossTabs)) {
      return;
    }

    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== localStorage) {
        return;
      }

      if (e.key === PALETTE_KEY && isPaletteKey(e.newValue)) {
        setPaletteState(e.newValue);
      }

      if (e.key === BASE_KEY && isBaseKey(e.newValue)) {
        setBaseState(e.newValue);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [mounted, syncAcrossTabs]);

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
  const setMode = (m: "light" | "dark" | "system") => {
    setTheme(m);
  };

  const setPalette = (k: PaletteKey) => {
    setPaletteState(k);
  };

  const resetPalette = () => {
    setPaletteState(effectiveDefaults.palette);
  };

  const setBase = (k: BaseKey) => {
    setBaseState(k);
  };

  const resetBase = () => {
    setBaseState(effectiveDefaults.base);
  };

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
