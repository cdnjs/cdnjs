/**
 * @module ol/geom/flat/straightchunk
 */
/**
 * @param {number} maxAngle Maximum acceptable angle delta between segments.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Array<number>} Start and end of the first suitable chunk of the
 * given `flatCoordinates`.
 */
export function matchingChunk(maxAngle: number, flatCoordinates: Array<number>, offset: number, end: number, stride: number): Array<number>;
//# sourceMappingURL=straightchunk.d.ts.map