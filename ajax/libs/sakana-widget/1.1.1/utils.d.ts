/**
 * browser native deep clone
 */
export declare function cloneDeep<T>(src: T): T;
/**
 * get the canvas context with device pixel ratio
 */
export declare function getCanvasCtx(canvas: HTMLCanvasElement, appSize: number, devicePixelRatio?: number): CanvasRenderingContext2D | null;
