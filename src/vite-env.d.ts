/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Optional: POST JSON logs here (Zapier, Make, your API). See `src/lib/logAgeVerification.ts`. */
  readonly VITE_AGE_VERIFICATION_LOG_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
