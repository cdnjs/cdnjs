declare namespace FastdomPromised {
  export function clear<T extends Promise<any>>(task: T): void;
  export function initialize(): void;
  export function measure<T extends () => void>(task: T, context?: any): Promise<ReturnType<T>>;
  export function mutate<T extends () => void>(task: T, context?: any): Promise<ReturnType<T>>;
}

export = FastdomPromised;
