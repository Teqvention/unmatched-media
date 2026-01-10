"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import { type PaletteKey, useThemeSettings } from "@/hooks/use-theme-settings";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider> & {
  /** Apply saved palette on boot (and optionally sync across tabs). */
  paletteDefault?: PaletteKey;
  syncPaletteAcrossTabs?: boolean;
};

function ThemeSettingsBootstrap({
  paletteDefault,
  syncPaletteAcrossTabs,
}: {
  paletteDefault?: PaletteKey;
  syncPaletteAcrossTabs?: boolean;
}) {
  // Must be rendered INSIDE NextThemesProvider so useTheme() has context.
  useThemeSettings({
    defaultPalette: paletteDefault,
    syncAcrossTabs: syncPaletteAcrossTabs ?? true,
  });

  return null;
}

export function ThemeProvider({
  children,
  paletteDefault = "neutral",
  syncPaletteAcrossTabs = true,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSettingsBootstrap
        paletteDefault={paletteDefault}
        syncPaletteAcrossTabs={syncPaletteAcrossTabs}
      />
      {children}
    </NextThemesProvider>
  );
}
