/**
 * @typedef {function((import("./coordinate.js").Coordinate|undefined), number, import("./size.js").Size, boolean=, Array<number>=): (import("./coordinate.js").Coordinate|undefined)} Type
 */
/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {boolean} onlyCenter If true, the constraint will only apply to the view center.
 * @param {boolean} smooth If true, the view will be able to go slightly out of the given extent
 * (only during interaction and animation).
 * @return {Type} The constraint.
 */
export function createExtent(extent: number[], onlyCenter: boolean, smooth: boolean): (arg0: number[], arg1: number, arg2: number[], arg3?: boolean, arg4?: number[]) => number[];
/**
 * @param {import("./coordinate.js").Coordinate} [center] Center.
 * @return {import("./coordinate.js").Coordinate|undefined} Center.
 */
export function none(center?: number[]): number[];
export type Type = (arg0: number[], arg1: number, arg2: number[], arg3?: boolean, arg4?: number[]) => number[];
//# sourceMappingURL=centerconstraint.d.ts.map