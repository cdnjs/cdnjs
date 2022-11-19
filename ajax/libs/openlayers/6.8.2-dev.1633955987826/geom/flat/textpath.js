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
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    var x1 = 0;
    var y1 = 0;
    var segmentLength = 0;
    var segmentM = 0;
    function advance() {
        x1 = x2;
        y1 = y2;
        offset += stride;
        x2 = flatCoordinates[offset];
        y2 = flatCoordinates[offset + 1];
        segmentM += segmentLength;
        segmentLength = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    do {
        advance();
    } while (offset < end - stride && segmentM + segmentLength < startM);
    var interpolate = segmentLength === 0 ? 0 : (startM - segmentM) / segmentLength;
    var beginX = lerp(x1, x2, interpolate);
    var beginY = lerp(y1, y2, interpolate);
    var startOffset = offset - stride;
    var startLength = segmentM;
    var endM = startM + scale * measureAndCacheTextWidth(font, text, cache);
    while (offset < end - stride && segmentM + segmentLength < endM) {
        advance();
    }
    interpolate = segmentLength === 0 ? 0 : (endM - segmentM) / segmentLength;
    var endX = lerp(x1, x2, interpolate);
    var endY = lerp(y1, y2, interpolate);
    // Keep text upright
    var reverse;
    if (rotation) {
        var flat = [beginX, beginY, endX, endY];
        rotate(flat, 0, 4, 2, rotation, flat, flat);
        reverse = flat[0] > flat[2];
    }
    else {
        reverse = beginX > endX;
    }
    var PI = Math.PI;
    var result = [];
    var singleSegment = startOffset + stride === offset;
    offset = startOffset;
    segmentLength = 0;
    segmentM = startLength;
    x2 = flatCoordinates[offset];
    y2 = flatCoordinates[offset + 1];
    var previousAngle;
    // All on the same segment
    if (singleSegment) {
        advance();
        previousAngle = Math.atan2(y2 - y1, x2 - x1);
        if (reverse) {
            previousAngle += previousAngle > 0 ? -PI : PI;
        }
        var x = (endX + beginX) / 2;
        var y = (endY + beginY) / 2;
        result[0] = [x, y, (endM - startM) / 2, previousAngle, text];
        return result;
    }
    for (var i = 0, ii = text.length; i < ii;) {
        advance();
        var angle = Math.atan2(y2 - y1, x2 - x1);
        if (reverse) {
            angle += angle > 0 ? -PI : PI;
        }
        if (previousAngle !== undefined) {
            var delta = angle - previousAngle;
            delta += delta > PI ? -2 * PI : delta < -PI ? 2 * PI : 0;
            if (Math.abs(delta) > maxAngle) {
                return null;
            }
        }
        previousAngle = angle;
        var iStart = i;
        var charLength = 0;
        for (; i < ii; ++i) {
            var index = reverse ? ii - i - 1 : i;
            var len = scale * measureAndCacheTextWidth(font, text[index], cache);
            if (offset + stride < end &&
                segmentM + segmentLength < startM + charLength + len / 2) {
                break;
            }
            charLength += len;
        }
        if (i === iStart) {
            continue;
        }
        var chars = reverse
            ? text.substring(ii - iStart, ii - i)
            : text.substring(iStart, i);
        interpolate =
            segmentLength === 0
                ? 0
                : (startM + charLength / 2 - segmentM) / segmentLength;
        var x = lerp(x1, x2, interpolate);
        var y = lerp(y1, y2, interpolate);
        result.push([x, y, charLength / 2, angle, chars]);
        startM += charLength;
    }
    return result;
}
//# sourceMappingURL=textpath.js.map