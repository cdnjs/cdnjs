/**
 * @module ol/geom/flat/area
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
export function linearRing(flatCoordinates: number[], offset: number, end: number, stride: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
export function linearRings(flatCoordinates: number[], offset: number, ends: number[], stride: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
export function linearRingss(flatCoordinates: number[], offset: number, endss: number[][], stride: number): number;
//# sourceMappingURL=area.d.ts.map