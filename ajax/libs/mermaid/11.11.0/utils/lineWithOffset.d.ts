import type { EdgeData, Point } from '../types.js';
export declare const markerOffsets: {
    readonly aggregation: 18;
    readonly extension: 18;
    readonly composition: 18;
    readonly dependency: 6;
    readonly lollipop: 13.5;
    readonly arrow_point: 4;
};
export declare const getLineFunctionsWithOffset: (edge: Pick<EdgeData, "arrowTypeStart" | "arrowTypeEnd">) => {
    x: (this: void, d: Point | [number, number], i: number, data: (Point | [number, number])[]) => number;
    y: (this: void, d: Point | [number, number], i: number, data: (Point | [number, number])[]) => number;
};
