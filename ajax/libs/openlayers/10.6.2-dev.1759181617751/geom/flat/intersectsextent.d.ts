/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @param {import('../../extent.js').Extent} [coordinatesExtent] Coordinates extent
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLineString(flatCoordinates: Array<number>, offset: number, end: number, stride: number, extent: import("../../extent.js").Extent, coordinatesExtent?: import("../../extent.js").Extent): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLineStringArray(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, extent: import("../../extent.js").Extent): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLinearRing(flatCoordinates: Array<number>, offset: number, end: number, stride: number, extent: import("../../extent.js").Extent): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLinearRingArray(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, extent: import("../../extent.js").Extent): boolean;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
export function intersectsLinearRingMultiArray(flatCoordinates: Array<number>, offset: number, endss: Array<Array<number>>, stride: number, extent: import("../../extent.js").Extent): boolean;
//# sourceMappingURL=intersectsextent.d.ts.map