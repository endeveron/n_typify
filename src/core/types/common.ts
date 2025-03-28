export type TSearchParams = {
  [key: string]: string | undefined;
};

export type TWithChildren<T = object> = T & { children?: React.ReactNode };

export type ErrorWithCode = { code?: number; message: string };

export type TServerActionError = {
  success: false;
  error: Error | ErrorWithCode;
};

export type TServerActionResult<T = unknown> =
  | {
      success: true;
      data?: T;
    }
  | TServerActionError;
