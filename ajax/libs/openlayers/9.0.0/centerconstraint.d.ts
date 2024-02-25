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
export function createExtent(extent: import("./extent.js").Extent, onlyCenter: boolean, smooth: boolean): Type;
/**
 * @param {import("./coordinate.js").Coordinate} [center] Center.
 * @return {import("./coordinate.js").Coordinate|undefined} Center.
 */
export function none(center?: import("./coordinate.js").Coordinate | undefined): import("./coordinate.js").Coordinate | undefined;
export type Type = (arg0: (import("./coordinate.js").Coordinate | undefined), arg1: number, arg2: import("./size.js").Size, arg3: boolean | undefined, arg4: Array<number> | undefined) => (import("./coordinate.js").Coordinate | undefined);
//# sourceMappingURL=centerconstraint.d.ts.map