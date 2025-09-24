/**
 * Utilities for encoding/decoding values to be used in shaders
 * @module ol/render/webgl/encodeUtil
 */
/**
 * Generates a color array based on a numerical id, and pack it just like the `packColor` function of 'ol/render/webgl/compileUtil.js'.
 * Note: the range for each component is 0 to 1 with 256 steps
 * @param {number} id Id
 * @param {Array<number>} [array] Reusable array
 * @return {Array<number>} Packed color array with two components
 */
export function colorEncodeIdAndPack(id: number, array?: Array<number>): Array<number>;
/**
 * Reads an id from a color-encoded array
 * Note: the expected range for each component is 0 to 1 with 256 steps.
 * @param {Array<number>} color Color array containing the encoded id; color components are in the range 0 to 1
 * @return {number} Decoded id
 */
export function colorDecodeId(color: Array<number>): number;
//# sourceMappingURL=encodeUtil.d.ts.map