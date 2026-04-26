import { supabase, supabaseConfigured } from "./supabaseClient";

const IPIFY = "https://api.ipify.org?format=json";

/**
 * Records a 21+ acknowledgment. IP is read in the browser (ipify) then sent to your backend.
 * Configure either Supabase (see `supabase/age_gate_logs.sql`) or `VITE_AGE_VERIFICATION_LOG_URL`.
 */
export async function logAgeVerification(): Promise<void> {
  let ip: string | null = null;
  try {
    const res = await fetch(IPIFY);
    if (res.ok) {
      const data = (await res.json()) as { ip?: string };
      ip = data.ip ?? null;
    }
  } catch {
    /* ignore — still log without IP */
  }

  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 512) : "";

  const webhook = import.meta.env.VITE_AGE_VERIFICATION_LOG_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "age_gate_21",
          ip,
          user_agent: userAgent,
          pathname:
            typeof window !== "undefined" ? window.location.pathname : "",
          at: new Date().toISOString(),
        }),
        mode: "cors",
      });
    } catch {
      /* non-blocking */
    }
    return;
  }

  if (supabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("age_gate_logs").insert({
        ip,
        user_agent: userAgent,
      });
      if (error) console.warn("[age gate] Supabase log failed:", error.message);
    } catch (e) {
      console.warn("[age gate] Supabase log failed:", e);
    }
  } else if (import.meta.env.DEV) {
    console.info("[age gate] No log backend configured. Set VITE_SUPABASE_* or VITE_AGE_VERIFICATION_LOG_URL.", {
      ip,
    });
  }
}
