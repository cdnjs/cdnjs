export declare type RequiredDeep<T> = {
    [K in keyof T]: RequiredDeep<T[K]>;
} & Required<T>;
/**
 * get the canvas context with device pixel ratio
 */
export declare function getCanvasCtx(canvas: HTMLCanvasElement, appSize: number, devicePixelRatio?: number): CanvasRenderingContext2D | null;
