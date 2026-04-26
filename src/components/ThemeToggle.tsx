import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-switch" role="radiogroup" aria-label="Color theme">
      <div className="theme-switch__track" data-theme={theme}>
        <span className="theme-switch__thumb" aria-hidden />
        <button
          type="button"
          role="radio"
          aria-checked={theme === "warm"}
          aria-label="Amber and gold theme"
          className="theme-switch__btn"
          onClick={() => setTheme("warm")}
        >
          <span className="theme-switch__swatch theme-switch__swatch--warm" aria-hidden />
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={theme === "purple"}
          aria-label="Purple theme"
          className="theme-switch__btn"
          onClick={() => setTheme("purple")}
        >
          <span className="theme-switch__swatch theme-switch__swatch--purple" aria-hidden />
        </button>
      </div>
    </div>
  );
}
