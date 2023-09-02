/**
 * Creates chunks of equal length from a linestring
 * @param {number} chunkLength Length of each chunk.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Start offset of the `flatCoordinates`.
 * @param {number} end End offset of the `flatCoordinates`.
 * @param {number} stride Stride.
 * @return {Array<Array<number>>} Chunks of linestrings with stride 2.
 */
export function lineChunk(chunkLength: number, flatCoordinates: Array<number>, offset: number, end: number, stride: number): Array<Array<number>>;
//# sourceMappingURL=linechunk.d.ts.map