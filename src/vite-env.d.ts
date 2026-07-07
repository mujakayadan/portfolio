/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YARBA_API_URL: string;
  readonly VITE_YARBA_PORTFOLIO_TOKEN: string;
  readonly VITE_YARBA_PORTFOLIO_SUBDOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
