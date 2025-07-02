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
export function forEach<T>(flatCoordinates: Array<number>, offset: number, end: number, stride: number, callback: (arg0: import("../../coordinate.js").Coordinate, arg1: import("../../coordinate.js").Coordinate) => T): T | boolean;
/**
 * Calculate the intersection point of two line segments.
 * Reference: https://stackoverflow.com/a/72474223/2389327
 * @param {Array<import("../../coordinate.js").Coordinate>} segment1 The first line segment as an array of two points.
 * @param {Array<import("../../coordinate.js").Coordinate>} segment2 The second line segment as an array of two points.
 * @return {import("../../coordinate.js").Coordinate|undefined} The intersection point or `undefined` if no intersection.
 */
export function getIntersectionPoint(segment1: Array<import("../../coordinate.js").Coordinate>, segment2: Array<import("../../coordinate.js").Coordinate>): import("../../coordinate.js").Coordinate | undefined;
//# sourceMappingURL=segments.d.ts.map