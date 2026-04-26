import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isSiteTheme, THEME_STORAGE_KEY, type SiteTheme } from "../theme/types";

function readStoredTheme(): SiteTheme {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (isSiteTheme(v)) return v;
  } catch {
    /* ignore */
  }
  return "warm";
}

function applyDomTheme(theme: SiteTheme) {
  const root = document.documentElement;
  if (theme === "purple") {
    root.dataset.theme = "purple";
  } else {
    delete root.dataset.theme;
  }
}

type ThemeContextValue = {
  theme: SiteTheme;
  setTheme: (t: SiteTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>(() =>
    typeof window === "undefined" ? "warm" : readStoredTheme(),
  );

  useLayoutEffect(() => {
    applyDomTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = useCallback((t: SiteTheme) => {
    setThemeState(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "warm" ? "purple" : "warm"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
