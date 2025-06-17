export declare const throttle: <T extends ((...args: any[]) => any)>(fn: T, wait?: number) => (...args: unknown[]) => void;
