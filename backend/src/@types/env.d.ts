declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      APP_DEBUG: string;
      TEST_DATABASE_URL: string;
    }
  }
}

export {};
