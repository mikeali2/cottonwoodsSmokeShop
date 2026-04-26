import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="Site color theme">
      <button
        type="button"
        className={`theme-toggle__btn${theme === "warm" ? " is-active" : ""}`}
        onClick={() => setTheme("warm")}
      >
        Gold
      </button>
      <button
        type="button"
        className={`theme-toggle__btn${theme === "purple" ? " is-active" : ""}`}
        onClick={() => setTheme("purple")}
      >
        Purple
      </button>
    </div>
  );
}
