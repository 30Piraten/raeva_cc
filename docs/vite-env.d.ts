/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APP_TITLE: string;
    VITE_APP_DESCRIPTION: string;
    VITE_APP_AUTHOR: string;
    VITE_APP_VERSION: string;
    VITE_APP_REPO: string;
    VITE_APP_REPO_URL: string;
    VITE_APP_REPO_ISSUES_URL: string;
    VITE_APP_REPO_PAGES_URL: string;
    VITE_APP_REPO_PAGES_BRANCH: string;
    readonly VITE_GITLAB_USER_ID: string;
    readonly VITE_GITLAB_PROJECT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}