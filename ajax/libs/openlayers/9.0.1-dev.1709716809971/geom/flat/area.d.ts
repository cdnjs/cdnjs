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
export function linearRing(flatCoordinates: Array<number>, offset: number, end: number, stride: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
export function linearRings(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
export function linearRingss(flatCoordinates: Array<number>, offset: number, endss: Array<Array<number>>, stride: number): number;
//# sourceMappingURL=area.d.ts.map