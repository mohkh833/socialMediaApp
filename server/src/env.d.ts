declare namespace NodeJS {
    interface ProcessEnv {
      readonly PASS_SEC: string
      readonly JWT_SEC: string
    }
  }