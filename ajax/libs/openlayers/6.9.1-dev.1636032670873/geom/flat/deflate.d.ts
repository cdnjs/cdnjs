/**
 * @module ol/geom/flat/deflate
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
export function deflateCoordinate(flatCoordinates: number[], offset: number, coordinate: number[], stride: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<import("../../coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
export function deflateCoordinates(flatCoordinates: number[], offset: number, coordinates: number[][], stride: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>} coordinatess Coordinatess.
 * @param {number} stride Stride.
 * @param {Array<number>} [opt_ends] Ends.
 * @return {Array<number>} Ends.
 */
export function deflateCoordinatesArray(flatCoordinates: number[], offset: number, coordinatess: number[][][], stride: number, opt_ends?: number[] | undefined): number[];
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} coordinatesss Coordinatesss.
 * @param {number} stride Stride.
 * @param {Array<Array<number>>} [opt_endss] Endss.
 * @return {Array<Array<number>>} Endss.
 */
export function deflateMultiCoordinatesArray(flatCoordinates: number[], offset: number, coordinatesss: number[][][][], stride: number, opt_endss?: number[][] | undefined): number[][];
//# sourceMappingURL=deflate.d.ts.map