export declare type RequiredDeep<T> = {
    [K in keyof T]: RequiredDeep<T[K]>;
} & Required<T>;
/**
 * simple is object
 */
export declare function isObject(value: any): boolean;
/**
 * simple deep clone
 */
export declare function cloneDeep<T>(value: T): T;
/**
 * simple deep merge
 */
export declare function mergeDeep<T, U>(target: T, source: U): T & U;
/**
 * get the canvas context with device pixel ratio
 */
export declare function getCanvasCtx(canvas: HTMLCanvasElement, appSize: number, devicePixelRatio?: number): CanvasRenderingContext2D | null;
