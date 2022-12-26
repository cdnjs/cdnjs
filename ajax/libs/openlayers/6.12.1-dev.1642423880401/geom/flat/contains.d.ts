/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} Contains extent.
 */
export function linearRingContainsExtent(flatCoordinates: number[], offset: number, end: number, stride: number, extent: number[]): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
export function linearRingContainsXY(flatCoordinates: number[], offset: number, end: number, stride: number, x: number, y: number): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
export function linearRingsContainsXY(flatCoordinates: number[], offset: number, ends: number[], stride: number, x: number, y: number): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
export function linearRingssContainsXY(flatCoordinates: number[], offset: number, endss: number[][], stride: number, x: number, y: number): boolean;
//# sourceMappingURL=contains.d.ts.map