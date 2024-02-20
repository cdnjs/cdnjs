type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare class Fastdom {
  clear<T extends () => void>(task: T): boolean;
  extend<T extends object>(props: T): Omit<this, keyof T & keyof this> & T;
  measure<T extends () => void>(task: T, context?: any): T;
  mutate<T extends () => void>(task: T, context?: any): T;
  catch: null | ((e: unknown) => any);
}

declare const fastdom: Fastdom

export default fastdom;
