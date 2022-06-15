/**
 * @module ol/geom/flat/segments
 */
/**
 * This function calls `callback` for each segment of the flat coordinates
 * array. If the callback returns a truthy value the function returns that
 * value immediately. Otherwise the function returns `false`.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {function(import("../../coordinate.js").Coordinate, import("../../coordinate.js").Coordinate): T} callback Function
 *     called for each segment.
 * @return {T|boolean} Value.
 * @template T
 */
export function forEach<T>(flatCoordinates: number[], offset: number, end: number, stride: number, callback: (arg0: number[], arg1: number[]) => T): boolean | T;
//# sourceMappingURL=segments.d.ts.map