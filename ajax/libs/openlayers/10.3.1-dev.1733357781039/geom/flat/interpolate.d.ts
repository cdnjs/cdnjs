/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} fraction Fraction.
 * @param {Array<number>} [dest] Destination.
 * @param {number} [dimension] Destination dimension (default is `2`)
 * @return {Array<number>} Destination.
 */
export function interpolatePoint(flatCoordinates: Array<number>, offset: number, end: number, stride: number, fraction: number, dest?: Array<number>, dimension?: number): Array<number>;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} m M.
 * @param {boolean} extrapolate Extrapolate.
 * @return {import("../../coordinate.js").Coordinate|null} Coordinate.
 */
export function lineStringCoordinateAtM(flatCoordinates: Array<number>, offset: number, end: number, stride: number, m: number, extrapolate: boolean): import("../../coordinate.js").Coordinate | null;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} m M.
 * @param {boolean} extrapolate Extrapolate.
 * @param {boolean} interpolate Interpolate.
 * @return {import("../../coordinate.js").Coordinate|null} Coordinate.
 */
export function lineStringsCoordinateAtM(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, m: number, extrapolate: boolean, interpolate: boolean): import("../../coordinate.js").Coordinate | null;
//# sourceMappingURL=interpolate.d.ts.map