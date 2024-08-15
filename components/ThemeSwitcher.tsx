"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { UilSun, UilMoon, UilSetting } from "@/config/icons";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

const themeIcons = {
  light: <UilSun />,
  dark: <UilMoon />,
  system: <UilSetting />,
} as Record<string, JSX.Element>;

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, themes, setTheme } = useTheme();

  const activeThemeIndex = themes.findIndex((t) => t === theme);

  function switchTheme() {
    const nextThemeIndex = (activeThemeIndex + 1) % themes.length;
    setTheme(themes[nextThemeIndex]);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="group fixed right-4 top-4 ml-4 rounded-lg border border-black/60 px-1 py-1 opacity-75 transition-all duration-200 ease-in hover:bg-white/20 hover:opacity-100 dark:border-white/60"
      onClick={switchTheme}
    >
      {theme && themeIcons[theme]}
      <div className="absolute -left-16 top-10 hidden w-[102px] text-center group-hover:block">
        <div className="absolute -top-[11px] right-1.5 inline-block h-3 w-5 -translate-x-2 overflow-hidden">
          <div className="h-3 w-3 origin-bottom-left rotate-45 transform border border-black/20 bg-white dark:border-white/20 dark:bg-black"></div>
        </div>
        <div className="inline-block rounded-md border border-black/20 bg-white px-1.5 py-1 text-xs text-black dark:border-white/20 dark:bg-black dark:text-white">Theme {theme}</div>
      </div>
    </button>
  );
}
