/**
 * Pushes a quad (two triangles) based on a point geometry
 * @param {Float32Array} instructions Array of render instructions for points.
 * @param {number} elementIndex Index from which render instructions will be read.
 * @param {Float32Array} vertexBuffer Buffer in the form of a typed array.
 * @param {Uint32Array} indexBuffer Buffer in the form of a typed array.
 * @param {number} customAttributesSize Amount of custom attributes for each element.
 * @param {BufferPositions} [bufferPositions] Buffer write positions; if not specified, positions will be set at 0.
 * @return {BufferPositions} New buffer positions where to write next
 * @property {number} vertexPosition New position in the vertex buffer where future writes should start.
 * @property {number} indexPosition New position in the index buffer where future writes should start.
 * @private
 */
export function writePointFeatureToBuffers(instructions: Float32Array, elementIndex: number, vertexBuffer: Float32Array, indexBuffer: Uint32Array, customAttributesSize: number, bufferPositions?: BufferPositions | undefined): BufferPositions;
/**
 * Pushes a single quad to form a line segment; also includes a computation for the join angles with previous and next
 * segment, in order to be able to offset the vertices correctly in the shader.
 * Join angles are between 0 and 2PI.
 * This also computes the length of the current segment and the sum of the join angle tangents in order
 * to store this information on each subsequent segment along the line. This is necessary to correctly render dashes
 * and symbols along the line.
 *
 *   pB (before)                          pA (after)
 *    X             negative             X
 *     \             offset             /
 *      \                              /
 *       \   join              join   /
 *        \ angle 0          angle 1 /
 *         \←---                ←---/      positive
 *          \   ←--          ←--   /        offset
 *           \     ↑       ↓      /
 *            X────┴───────┴─────X
 *            p0                  p1
 *
 * @param {Float32Array} instructions Array of render instructions for lines.s
 * @param {number} segmentStartIndex Index of the segment start point from which render instructions will be read.
 * @param {number} segmentEndIndex Index of the segment end point from which render instructions will be read.
 * @param {number|null} beforeSegmentIndex Index of the point right before the segment (null if none, e.g this is a line start)
 * @param {number|null} afterSegmentIndex Index of the point right after the segment (null if none, e.g this is a line end)
 * @param {Array<number>} vertexArray Array containing vertices.
 * @param {Array<number>} indexArray Array containing indices.
 * @param {Array<number>} customAttributes Array of custom attributes value
 * @param {import('../../transform.js').Transform} toWorldTransform Transform matrix used to obtain world coordinates from instructions
 * @param {number} currentLength Cumulated length of segments processed so far
 * @param {number} currentAngleTangentSum Cumulated tangents of the join angles processed so far
 * @return {{length: number, angle: number}} Cumulated length with the newly processed segment (in world units), new sum of the join angle tangents
 * @private
 */
export function writeLineSegmentToBuffers(instructions: Float32Array, segmentStartIndex: number, segmentEndIndex: number, beforeSegmentIndex: number | null, afterSegmentIndex: number | null, vertexArray: Array<number>, indexArray: Array<number>, customAttributes: Array<number>, toWorldTransform: import('../../transform.js').Transform, currentLength: number, currentAngleTangentSum: number): {
    length: number;
    angle: number;
};
/**
 * Pushes several triangles to form a polygon, including holes
 * @param {Float32Array} instructions Array of render instructions for lines.
 * @param {number} polygonStartIndex Index of the polygon start point from which render instructions will be read.
 * @param {Array<number>} vertexArray Array containing vertices.
 * @param {Array<number>} indexArray Array containing indices.
 * @param {number} customAttributesSize Amount of custom attributes for each element.
 * @return {number} Next polygon instructions index
 * @private
 */
export function writePolygonTrianglesToBuffers(instructions: Float32Array, polygonStartIndex: number, vertexArray: Array<number>, indexArray: Array<number>, customAttributesSize: number): number;
/**
 * Returns a texture of 1x1 pixel, white
 * @private
 * @return {ImageData} Image data.
 */
export function getBlankImageData(): ImageData;
/**
 * Generates a color array based on a numerical id
 * Note: the range for each component is 0 to 1 with 256 steps
 * @param {number} id Id
 * @param {Array<number>} [array] Reusable array
 * @return {Array<number>} Color array containing the encoded id
 */
export function colorEncodeId(id: number, array?: number[] | undefined): Array<number>;
/**
 * Reads an id from a color-encoded array
 * Note: the expected range for each component is 0 to 1 with 256 steps.
 * @param {Array<number>} color Color array containing the encoded id
 * @return {number} Decoded id
 */
export function colorDecodeId(color: Array<number>): number;
export const LINESTRING_ANGLE_COSINE_CUTOFF: 0.985;
/**
 * An object holding positions both in an index and a vertex buffer.
 */
export type BufferPositions = {
    /**
     * Position in the vertex buffer
     */
    vertexPosition: number;
    /**
     * Position in the index buffer
     */
    indexPosition: number;
};
//# sourceMappingURL=utils.d.ts.map