export interface Logger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  debug: (message: string) => void;
}

export class SampleServerLogger implements Logger {
  info(message: string) {
    console.log('[SampleServerLogger]: ' + message);
  }
  warn(message: string) {
    console.log('[SampleServerLogger]: ' + message);
  }
  error(message: string) {
    console.log('[SampleServerLogger]: ' + message);
  }
  debug(message: string) {
    console.log('[SampleServerLogger]: ' + message);
  }
}

export let logger: Logger;

export const registerLogger = (newLogger: Logger) => {
  logger = newLogger;
};
