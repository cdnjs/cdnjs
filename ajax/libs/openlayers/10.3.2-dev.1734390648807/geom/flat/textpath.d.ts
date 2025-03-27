/**
 * @param {Array<number>} flatCoordinates Path to put text on.
 * @param {number} offset Start offset of the `flatCoordinates`.
 * @param {number} end End offset of the `flatCoordinates`.
 * @param {number} stride Stride.
 * @param {string} text Text to place on the path.
 * @param {number} startM m along the path where the text starts.
 * @param {number} maxAngle Max angle between adjacent chars in radians.
 * @param {number} scale The product of the text scale and the device pixel ratio.
 * @param {function(string, string, Object<string, number>):number} measureAndCacheTextWidth Measure and cache text width.
 * @param {string} font The font.
 * @param {Object<string, number>} cache A cache of measured widths.
 * @param {number} rotation Rotation to apply to the flatCoordinates to determine whether text needs to be reversed.
 * @param {boolean} keepUpright Whether the text needs to be kept upright
 * @return {Array<Array<*>>|null} The result array (or null if `maxAngle` was
 * exceeded). Entries of the array are x, y, anchorX, angle, chunk.
 */
export function drawTextOnPath(flatCoordinates: Array<number>, offset: number, end: number, stride: number, text: string, startM: number, maxAngle: number, scale: number, measureAndCacheTextWidth: (arg0: string, arg1: string, arg2: {
    [x: string]: number;
}) => number, font: string, cache: {
    [x: string]: number;
}, rotation: number, keepUpright?: boolean): Array<Array<any>> | null;
//# sourceMappingURL=textpath.d.ts.map