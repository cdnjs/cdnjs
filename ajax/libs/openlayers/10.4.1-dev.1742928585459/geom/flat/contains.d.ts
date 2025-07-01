/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} Contains extent.
 */
export function linearRingContainsExtent(flatCoordinates: Array<number>, offset: number, end: number, stride: number, extent: import("../../extent.js").Extent): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
export function linearRingContainsXY(flatCoordinates: Array<number>, offset: number, end: number, stride: number, x: number, y: number): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
export function linearRingsContainsXY(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, x: number, y: number): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
export function linearRingssContainsXY(flatCoordinates: Array<number>, offset: number, endss: Array<Array<number>>, stride: number, x: number, y: number): boolean;
//# sourceMappingURL=contains.d.ts.map