/**
 * @module ol/geom/flat/textpath
 */
import { lerp } from '../../math.js';
import { rotate } from './transform.js';
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
 * @return {Array<Array<*>>} The result array (or null if `maxAngle` was
 * exceeded). Entries of the array are x, y, anchorX, angle, chunk.
 */
export function drawTextOnPath(flatCoordinates, offset, end, stride, text, startM, maxAngle, scale, measureAndCacheTextWidth, font, cache, rotation) {
    var result = [];
    // Keep text upright
    var reverse;
    if (rotation) {
        var rotatedCoordinates = rotate(flatCoordinates, offset, end, stride, rotation, [flatCoordinates[offset], flatCoordinates[offset + 1]]);
        reverse =
            rotatedCoordinates[0] >
                rotatedCoordinates[rotatedCoordinates.length - stride];
    }
    else {
        reverse = flatCoordinates[offset] > flatCoordinates[end - stride];
    }
    var numChars = text.length;
    var x1 = flatCoordinates[offset];
    var y1 = flatCoordinates[offset + 1];
    offset += stride;
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    var segmentM = 0;
    var segmentLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    var angleChanged = false;
    var index, previousAngle;
    for (var i = 0; i < numChars; ++i) {
        index = reverse ? numChars - i - 1 : i;
        var char = text[index];
        var charLength = scale * measureAndCacheTextWidth(font, char, cache);
        var charM = startM + charLength / 2;
        while (offset < end - stride && segmentM + segmentLength < charM) {
            x1 = x2;
            y1 = y2;
            offset += stride;
            x2 = flatCoordinates[offset];
            y2 = flatCoordinates[offset + 1];
            segmentM += segmentLength;
            segmentLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }
        var segmentPos = charM - segmentM;
        var angle = Math.atan2(y2 - y1, x2 - x1);
        if (reverse) {
            angle += angle > 0 ? -Math.PI : Math.PI;
        }
        if (previousAngle !== undefined) {
            var delta = angle - previousAngle;
            angleChanged = angleChanged || delta !== 0;
            delta +=
                delta > Math.PI ? -2 * Math.PI : delta < -Math.PI ? 2 * Math.PI : 0;
            if (Math.abs(delta) > maxAngle) {
                return null;
            }
        }
        previousAngle = angle;
        var interpolate = segmentPos / segmentLength;
        var x = lerp(x1, x2, interpolate);
        var y = lerp(y1, y2, interpolate);
        result[index] = [x, y, charLength / 2, angle, char];
        startM += charLength;
    }
    return angleChanged
        ? result
        : [[result[0][0], result[0][1], result[0][2], result[0][3], text]];
}
//# sourceMappingURL=textpath.js.map