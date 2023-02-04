/**
 * @module ol/geom/flat/transform
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../transform.js").Transform} transform Transform.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */
export function transform2D(flatCoordinates: Array<number>, offset: number, end: number, stride: number, transform: import("../../transform.js").Transform, opt_dest?: number[] | undefined): Array<number>;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} angle Angle.
 * @param {Array<number>} anchor Rotation anchor point.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */
export function rotate(flatCoordinates: Array<number>, offset: number, end: number, stride: number, angle: number, anchor: Array<number>, opt_dest?: number[] | undefined): Array<number>;
/**
 * Scale the coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} sx Scale factor in the x-direction.
 * @param {number} sy Scale factor in the y-direction.
 * @param {Array<number>} anchor Scale anchor point.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */
export function scale(flatCoordinates: Array<number>, offset: number, end: number, stride: number, sx: number, sy: number, anchor: Array<number>, opt_dest?: number[] | undefined): Array<number>;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} deltaX Delta X.
 * @param {number} deltaY Delta Y.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */
export function translate(flatCoordinates: Array<number>, offset: number, end: number, stride: number, deltaX: number, deltaY: number, opt_dest?: number[] | undefined): Array<number>;
//# sourceMappingURL=transform.d.ts.map