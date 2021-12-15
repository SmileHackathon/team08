/// <reference types="vite/client" />

interface ImportMetaEnv {
  // その他の環境変数...
  readonly FRONT_SERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
