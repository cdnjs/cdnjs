import type { EdgeData, Point } from '../types.js';
export declare const getLineFunctionsWithOffset: (edge: Pick<EdgeData, "arrowTypeStart" | "arrowTypeEnd">) => {
    x: (this: void, d: Point | [number, number], i: number, data: (Point | [number, number])[]) => number;
    y: (this: void, d: Point | [number, number], i: number, data: (Point | [number, number])[]) => number;
};
