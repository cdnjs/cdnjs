/**
 * Pushes a quad (two triangles) based on a point geometry
 * @param {Float32Array} instructions Array of render instructions for points.
 * @param {number} elementIndex Index from which render instructions will be read.
 * @param {Float32Array} vertexBuffer Buffer in the form of a typed array.
 * @param {Uint32Array} indexBuffer Buffer in the form of a typed array.
 * @param {number} customAttributesCount Amount of custom attributes for each element.
 * @param {BufferPositions} [bufferPositions] Buffer write positions; if not specified, positions will be set at 0.
 * @return {BufferPositions} New buffer positions where to write next
 * @property {number} vertexPosition New position in the vertex buffer where future writes should start.
 * @property {number} indexPosition New position in the index buffer where future writes should start.
 * @private
 */
export function writePointFeatureToBuffers(instructions: Float32Array, elementIndex: number, vertexBuffer: Float32Array, indexBuffer: Uint32Array, customAttributesCount: number, bufferPositions?: BufferPositions | undefined): BufferPositions;
/**
 * Pushes a single quad to form a line segment; also includes a computation for the join angles with previous and next
 * segment, in order to be able to offset the vertices correctly in the shader
 * @param {Float32Array} instructions Array of render instructions for lines.
 * @param {number} segmentStartIndex Index of the segment start point from which render instructions will be read.
 * @param {number} segmentEndIndex Index of the segment start point from which render instructions will be read.
 * @param {number|null} beforeSegmentIndex Index of the point right before the segment (null if none, e.g this is a line start)
 * @param {number|null} afterSegmentIndex Index of the point right after the segment (null if none, e.g this is a line end)
 * @param {Array<number>} vertexArray Array containing vertices.
 * @param {Array<number>} indexArray Array containing indices.
 * @param {Array<number>} customAttributes Array of custom attributes value
 * @param {import('../../transform.js').Transform} instructionsTransform Transform matrix used to project coordinates in instructions
 * @param {import('../../transform.js').Transform} invertInstructionsTransform Transform matrix used to project coordinates in instructions
 * @private
 */
export function writeLineSegmentToBuffers(instructions: Float32Array, segmentStartIndex: number, segmentEndIndex: number, beforeSegmentIndex: number | null, afterSegmentIndex: number | null, vertexArray: Array<number>, indexArray: Array<number>, customAttributes: Array<number>, instructionsTransform: import('../../transform.js').Transform, invertInstructionsTransform: import('../../transform.js').Transform): void;
/**
 * Pushes several triangles to form a polygon, including holes
 * @param {Float32Array} instructions Array of render instructions for lines.
 * @param {number} polygonStartIndex Index of the polygon start point from which render instructions will be read.
 * @param {Array<number>} vertexArray Array containing vertices.
 * @param {Array<number>} indexArray Array containing indices.
 * @param {number} customAttributesCount Amount of custom attributes for each element.
 * @return {number} Next polygon instructions index
 * @private
 */
export function writePolygonTrianglesToBuffers(instructions: Float32Array, polygonStartIndex: number, vertexArray: Array<number>, indexArray: Array<number>, customAttributesCount: number): number;
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