/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional: set to "true" to enable the optional AI fallback for the assistant. */
  readonly VITE_ASSISTANT_AI?: string;
  /** Optional: HTTPS endpoint that receives { message, lang, system } and returns { reply }. */
  readonly VITE_ASSISTANT_AI_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
