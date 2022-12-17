/**
 * @module ol/geom/flat/inflate
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Array<import("../../coordinate.js").Coordinate>} [opt_coordinates] Coordinates.
 * @return {Array<import("../../coordinate.js").Coordinate>} Coordinates.
 */
export function inflateCoordinates(flatCoordinates: number[], offset: number, end: number, stride: number, opt_coordinates?: number[][] | undefined): number[][];
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>} [opt_coordinatess] Coordinatess.
 * @return {Array<Array<import("../../coordinate.js").Coordinate>>} Coordinatess.
 */
export function inflateCoordinatesArray(flatCoordinates: number[], offset: number, ends: number[], stride: number, opt_coordinatess?: number[][][] | undefined): number[][][];
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} [opt_coordinatesss]
 *     Coordinatesss.
 * @return {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} Coordinatesss.
 */
export function inflateMultiCoordinatesArray(flatCoordinates: number[], offset: number, endss: number[][], stride: number, opt_coordinatesss?: number[][][][] | undefined): number[][][][];
//# sourceMappingURL=inflate.d.ts.map