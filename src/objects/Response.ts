export type Response<T> = 
  | { data: T; error: null }
  | { data: null; error: unknown };
