export declare let $REVISION: number;
type EqualityFn = (a: any, b: any) => boolean;
export declare class Cell<T> {
    revision: number;
    _value: T;
    _lastValue: T;
    _isEqual: EqualityFn;
    constructor(initialValue: T, isEqual?: EqualityFn);
    get value(): T;
    set value(newValue: T);
}
export declare class TrackingCache {
    _cachedValue: any;
    _cachedRevision: number;
    _deps: any[];
    hits: number;
    fn: () => any;
    constructor(fn: () => any);
    clear(): void;
    get value(): any;
    get revision(): number;
}
export declare function getValue<T>(cell: Cell<T>): T;
type CellValue<T extends Cell<unknown>> = T extends Cell<infer U> ? U : never;
export declare function setValue<T extends Cell<unknown>>(storage: T, value: CellValue<T>): void;
export declare function createCell<T = unknown>(initialValue: T, isEqual?: EqualityFn): Cell<T>;
export declare function createCache<T = unknown>(fn: () => T): TrackingCache;
export {};
