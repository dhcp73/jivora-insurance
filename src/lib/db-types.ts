export type AnyDb = {
  prepare: (sql: string) => {
    run: (...params: unknown[]) => unknown;
    get: (...params: unknown[]) => unknown;
    all: (...params: unknown[]) => unknown[];
  };
  exec: (sql: string) => void;
  pragma: (s: string) => unknown;
  transaction: <T>(fn: () => T) => () => T;
  close: () => void;
};
