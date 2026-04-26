import type { SiteTheme } from "./types";

/** Pick warm (gold-era) or purple-era asset path. */
export function themeAsset(theme: SiteTheme, warmPath: string, purplePath: string) {
  return theme === "purple" ? purplePath : warmPath;
}
