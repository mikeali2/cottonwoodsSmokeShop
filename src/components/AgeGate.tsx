import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { logAgeVerification } from "../lib/logAgeVerification";

const STORAGE_KEY = "cottonwoods-age-21";

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function AgeGate({ children }: { children: ReactNode }) {
  const [blocked, setBlocked] = useState(() =>
    typeof window === "undefined" ? true : !readStored(),
  );

  useEffect(() => {
    if (!blocked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [blocked]);

  const confirm = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode — session only */
    }
    void logAgeVerification();
    setBlocked(false);
  }, []);

  const decline = useCallback(() => {
    window.location.href = "https://www.google.com";
  }, []);

  return (
    <>
      {children}
      {blocked ? (
        <div
          className="age-gate"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          aria-describedby="age-gate-desc"
        >
          <div className="age-gate__backdrop" aria-hidden />
          <div className="age-gate__panel">
            <h2 id="age-gate-title" className="age-gate__title">
              Age verification
            </h2>
            <p id="age-gate-desc" className="age-gate__text">
              This site contains information related to vape and smoke products intended for adults
              of legal smoking age. By entering, you confirm that you are{" "}
              <strong>21 years of age or older</strong> (or the minimum age in your jurisdiction).
            </p>
            <p className="age-gate__fine">
              False confirmations may violate local law. We reserve the right to refuse service.
            </p>
            <div className="age-gate__actions">
              <button type="button" className="btn btn--primary age-gate__btn" onClick={confirm}>
                I am 21 or older
              </button>
              <button type="button" className="btn btn--ghost age-gate__btn" onClick={decline}>
                I am under 21
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
