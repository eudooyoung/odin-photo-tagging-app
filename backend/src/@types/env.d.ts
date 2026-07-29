declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      APP_DEBUG: string;
      SESSION_SECRET: string;
    }
  }
}

export {};
