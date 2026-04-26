export type SiteTheme = "warm" | "purple";

export const THEME_STORAGE_KEY = "cottonwoods-theme";

export function isSiteTheme(v: string | null): v is SiteTheme {
  return v === "warm" || v === "purple";
}
