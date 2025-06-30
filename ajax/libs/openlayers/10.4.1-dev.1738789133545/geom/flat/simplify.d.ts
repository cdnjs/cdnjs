/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {boolean} highQuality Highest quality.
 * @param {Array<number>} [simplifiedFlatCoordinates] Simplified flat
 *     coordinates.
 * @return {Array<number>} Simplified line string.
 */
export function simplifyLineString(flatCoordinates: Array<number>, offset: number, end: number, stride: number, squaredTolerance: number, highQuality: boolean, simplifiedFlatCoordinates?: Array<number>): Array<number>;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */
export function douglasPeucker(flatCoordinates: Array<number>, offset: number, end: number, stride: number, squaredTolerance: number, simplifiedFlatCoordinates: Array<number>, simplifiedOffset: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<number>} simplifiedEnds Simplified ends.
 * @return {number} Simplified offset.
 */
export function douglasPeuckerArray(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, squaredTolerance: number, simplifiedFlatCoordinates: Array<number>, simplifiedOffset: number, simplifiedEnds: Array<number>): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<Array<number>>} simplifiedEndss Simplified endss.
 * @return {number} Simplified offset.
 */
export function douglasPeuckerMultiArray(flatCoordinates: Array<number>, offset: number, endss: Array<Array<number>>, stride: number, squaredTolerance: number, simplifiedFlatCoordinates: Array<number>, simplifiedOffset: number, simplifiedEndss: Array<Array<number>>): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */
export function radialDistance(flatCoordinates: Array<number>, offset: number, end: number, stride: number, squaredTolerance: number, simplifiedFlatCoordinates: Array<number>, simplifiedOffset: number): number;
/**
 * @param {number} value Value.
 * @param {number} tolerance Tolerance.
 * @return {number} Rounded value.
 */
export function snap(value: number, tolerance: number): number;
/**
 * Simplifies a line string using an algorithm designed by Tim Schaub.
 * Coordinates are snapped to the nearest value in a virtual grid and
 * consecutive duplicate coordinates are discarded.  This effectively preserves
 * topology as the simplification of any subsection of a line string is
 * independent of the rest of the line string.  This means that, for examples,
 * the common edge between two polygons will be simplified to the same line
 * string independently in both polygons.  This implementation uses a single
 * pass over the coordinates and eliminates intermediate collinear points.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */
export function quantize(flatCoordinates: Array<number>, offset: number, end: number, stride: number, tolerance: number, simplifiedFlatCoordinates: Array<number>, simplifiedOffset: number): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<number>} simplifiedEnds Simplified ends.
 * @return {number} Simplified offset.
 */
export function quantizeArray(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, tolerance: number, simplifiedFlatCoordinates: Array<number>, simplifiedOffset: number, simplifiedEnds: Array<number>): number;
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<Array<number>>} simplifiedEndss Simplified endss.
 * @return {number} Simplified offset.
 */
export function quantizeMultiArray(flatCoordinates: Array<number>, offset: number, endss: Array<Array<number>>, stride: number, tolerance: number, simplifiedFlatCoordinates: Array<number>, simplifiedOffset: number, simplifiedEndss: Array<Array<number>>): number;
//# sourceMappingURL=simplify.d.ts.map