/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} fraction Fraction.
 * @param {Array<number>} [opt_dest] Destination.
 * @param {number} [opt_dimension] Destination dimension (default is `2`)
 * @return {Array<number>} Destination.
 */
export function interpolatePoint(flatCoordinates: number[], offset: number, end: number, stride: number, fraction: number, opt_dest?: number[] | undefined, opt_dimension?: number | undefined): number[];
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} m M.
 * @param {boolean} extrapolate Extrapolate.
 * @return {import("../../coordinate.js").Coordinate} Coordinate.
 */
export function lineStringCoordinateAtM(flatCoordinates: number[], offset: number, end: number, stride: number, m: number, extrapolate: boolean): number[];
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} m M.
 * @param {boolean} extrapolate Extrapolate.
 * @param {boolean} interpolate Interpolate.
 * @return {import("../../coordinate.js").Coordinate} Coordinate.
 */
export function lineStringsCoordinateAtM(flatCoordinates: number[], offset: number, ends: number[], stride: number, m: number, extrapolate: boolean, interpolate: boolean): number[];
//# sourceMappingURL=interpolate.d.ts.map