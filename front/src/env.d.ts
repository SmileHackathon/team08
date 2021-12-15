/// <reference types="vite/client" />

interface ImportMetaEnv {
  // その他の環境変数...
  readonly VITE_FRONT_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
