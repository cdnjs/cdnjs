/**
 * @module ol/geom/flat/transform
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../transform.js").Transform} transform Transform.
 * @param {Array<number>} [dest] Destination.
 * @param {number} [destinationStride] Stride of destination coordinates; if unspecified, assumed to be 2.
 * @return {Array<number>} Transformed coordinates.
 */
export function transform2D(flatCoordinates: Array<number>, offset: number, end: number, stride: number, transform: import("../../transform.js").Transform, dest?: Array<number>, destinationStride?: number): Array<number>;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} angle Angle.
 * @param {Array<number>} anchor Rotation anchor point.
 * @param {Array<number>} [dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */
export function rotate(flatCoordinates: Array<number>, offset: number, end: number, stride: number, angle: number, anchor: Array<number>, dest?: Array<number>): Array<number>;
/**
 * Scale the coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} sx Scale factor in the x-direction.
 * @param {number} sy Scale factor in the y-direction.
 * @param {Array<number>} anchor Scale anchor point.
 * @param {Array<number>} [dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */
export function scale(flatCoordinates: Array<number>, offset: number, end: number, stride: number, sx: number, sy: number, anchor: Array<number>, dest?: Array<number>): Array<number>;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} deltaX Delta X.
 * @param {number} deltaY Delta Y.
 * @param {Array<number>} [dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */
export function translate(flatCoordinates: Array<number>, offset: number, end: number, stride: number, deltaX: number, deltaY: number, dest?: Array<number>): Array<number>;
//# sourceMappingURL=transform.d.ts.map