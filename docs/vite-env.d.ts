/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GITLAB_USER_ID: string;
    readonly VITE_GITLAB_PROJECT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}