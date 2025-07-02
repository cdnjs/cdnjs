/**
 * Utilities for encoding/decoding values to be used in shaders
 * @module ol/render/webgl/encodeUtil
 */
/**
 * Generates a color array based on a numerical id
 * Note: the range for each component is 0 to 1 with 256 steps
 * @param {number} id Id
 * @param {Array<number>} [array] Reusable array
 * @return {Array<number>} Color array containing the encoded id
 */
export function colorEncodeId(id: number, array?: Array<number>): Array<number>;
/**
 * Reads an id from a color-encoded array
 * Note: the expected range for each component is 0 to 1 with 256 steps.
 * @param {Array<number>} color Color array containing the encoded id
 * @return {number} Decoded id
 */
export function colorDecodeId(color: Array<number>): number;
//# sourceMappingURL=encodeUtil.d.ts.map