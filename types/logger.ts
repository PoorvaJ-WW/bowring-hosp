// src/utils/logger.ts
interface Logger {
    step(message: string): void;
    warn(message: string): void;
    error(message: string, error?: unknown): void;
    info(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
  }
  
  export const logger: Logger = {
    step(message: string) {
      console.log(`✓ ${message}`);
    },
  
    warn(message: string) {
      console.warn(`⚠️ ${message}`);
    },
  
    error(message: string, error?: unknown) {
      console.error(`❌ ${message}`);
      if (error) {
        console.error(error);
      }
    },
  
    info(message: string, ...args: any[]) {
      console.log(message, ...args);
    },
  
    debug(message: string, ...args: any[]) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  };