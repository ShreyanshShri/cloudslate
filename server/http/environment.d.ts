declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_AUTH_TOKEN: string;
        NODE_ENV: 'development' | 'production';
        PORT: number;
        PWD: string;
        JWT_PVT_KEY: string;
      }
    }

}

export {}