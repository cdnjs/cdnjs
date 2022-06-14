/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLineString(flatCoordinates: number[], offset: number, end: number, stride: number, extent: number[]): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLineStringArray(flatCoordinates: number[], offset: number, ends: number[], stride: number, extent: number[]): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLinearRing(flatCoordinates: number[], offset: number, end: number, stride: number, extent: number[]): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLinearRingArray(flatCoordinates: number[], offset: number, ends: number[], stride: number, extent: number[]): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLinearRingMultiArray(flatCoordinates: number[], offset: number, endss: number[][], stride: number, extent: number[]): boolean;
//# sourceMappingURL=intersectsextent.d.ts.map