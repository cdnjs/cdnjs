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
export function deflateCoordinate(flatCoordinates: Array<number>, offset: number, coordinate: import("../../coordinate.js").Coordinate, stride: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<import("../../coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
export function deflateCoordinates(flatCoordinates: Array<number>, offset: number, coordinates: Array<import("../../coordinate.js").Coordinate>, stride: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>} coordinatess Coordinatess.
 * @param {number} stride Stride.
 * @param {Array<number>} [opt_ends] Ends.
 * @return {Array<number>} Ends.
 */
export function deflateCoordinatesArray(flatCoordinates: Array<number>, offset: number, coordinatess: Array<Array<import("../../coordinate.js").Coordinate>>, stride: number, opt_ends?: number[] | undefined): Array<number>;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} coordinatesss Coordinatesss.
 * @param {number} stride Stride.
 * @param {Array<Array<number>>} [opt_endss] Endss.
 * @return {Array<Array<number>>} Endss.
 */
export function deflateMultiCoordinatesArray(flatCoordinates: Array<number>, offset: number, coordinatesss: Array<Array<Array<import("../../coordinate.js").Coordinate>>>, stride: number, opt_endss?: number[][] | undefined): Array<Array<number>>;
//# sourceMappingURL=deflate.d.ts.map