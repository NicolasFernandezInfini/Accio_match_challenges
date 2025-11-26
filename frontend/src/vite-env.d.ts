/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_MODE?: string
  readonly VITE_AUTH_ENABLED?: string
  readonly VITE_AUTH_TOKEN_KEY?: string
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_WEBSOCKETS?: string
  readonly VITE_API_TIMEOUT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
