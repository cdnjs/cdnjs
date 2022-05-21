/**
 * @module ol/geom/flat/interpolate
 */
import { binarySearch } from '../../array.js';
import { lerp } from '../../math.js';
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} fraction Fraction.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Destination.
 */
export function interpolatePoint(flatCoordinates, offset, end, stride, fraction, opt_dest) {
    var pointX = NaN;
    var pointY = NaN;
    var n = (end - offset) / stride;
    if (n === 1) {
        pointX = flatCoordinates[offset];
        pointY = flatCoordinates[offset + 1];
    }
    else if (n == 2) {
        pointX = (1 - fraction) * flatCoordinates[offset] +
            fraction * flatCoordinates[offset + stride];
        pointY = (1 - fraction) * flatCoordinates[offset + 1] +
            fraction * flatCoordinates[offset + stride + 1];
    }
    else if (n !== 0) {
        var x1 = flatCoordinates[offset];
        var y1 = flatCoordinates[offset + 1];
        var length_1 = 0;
        var cumulativeLengths = [0];
        for (var i = offset + stride; i < end; i += stride) {
            var x2 = flatCoordinates[i];
            var y2 = flatCoordinates[i + 1];
            length_1 += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            cumulativeLengths.push(length_1);
            x1 = x2;
            y1 = y2;
        }
        var target = fraction * length_1;
        var index = binarySearch(cumulativeLengths, target);
        if (index < 0) {
            var t = (target - cumulativeLengths[-index - 2]) /
                (cumulativeLengths[-index - 1] - cumulativeLengths[-index - 2]);
            var o = offset + (-index - 2) * stride;
            pointX = lerp(flatCoordinates[o], flatCoordinates[o + stride], t);
            pointY = lerp(flatCoordinates[o + 1], flatCoordinates[o + stride + 1], t);
        }
        else {
            pointX = flatCoordinates[offset + index * stride];
            pointY = flatCoordinates[offset + index * stride + 1];
        }
    }
    if (opt_dest) {
        opt_dest[0] = pointX;
        opt_dest[1] = pointY;
        return opt_dest;
    }
    else {
        return [pointX, pointY];
    }
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} m M.
 * @param {boolean} extrapolate Extrapolate.
 * @return {import("../../coordinate.js").Coordinate} Coordinate.
 */
export function lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, extrapolate) {
    if (end == offset) {
        return null;
    }
    var coordinate;
    if (m < flatCoordinates[offset + stride - 1]) {
        if (extrapolate) {
            coordinate = flatCoordinates.slice(offset, offset + stride);
            coordinate[stride - 1] = m;
            return coordinate;
        }
        else {
            return null;
        }
    }
    else if (flatCoordinates[end - 1] < m) {
        if (extrapolate) {
            coordinate = flatCoordinates.slice(end - stride, end);
            coordinate[stride - 1] = m;
            return coordinate;
        }
        else {
            return null;
        }
    }
    // FIXME use O(1) search
    if (m == flatCoordinates[offset + stride - 1]) {
        return flatCoordinates.slice(offset, offset + stride);
    }
    var lo = offset / stride;
    var hi = end / stride;
    while (lo < hi) {
        var mid = (lo + hi) >> 1;
        if (m < flatCoordinates[(mid + 1) * stride - 1]) {
            hi = mid;
        }
        else {
            lo = mid + 1;
        }
    }
    var m0 = flatCoordinates[lo * stride - 1];
    if (m == m0) {
        return flatCoordinates.slice((lo - 1) * stride, (lo - 1) * stride + stride);
    }
    var m1 = flatCoordinates[(lo + 1) * stride - 1];
    var t = (m - m0) / (m1 - m0);
    coordinate = [];
    for (var i = 0; i < stride - 1; ++i) {
        coordinate.push(lerp(flatCoordinates[(lo - 1) * stride + i], flatCoordinates[lo * stride + i], t));
    }
    coordinate.push(m);
    return coordinate;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} m M.
 * @param {boolean} extrapolate Extrapolate.
 * @param {boolean} interpolate Interpolate.
 * @return {import("../../coordinate.js").Coordinate} Coordinate.
 */
export function lineStringsCoordinateAtM(flatCoordinates, offset, ends, stride, m, extrapolate, interpolate) {
    if (interpolate) {
        return lineStringCoordinateAtM(flatCoordinates, offset, ends[ends.length - 1], stride, m, extrapolate);
    }
    var coordinate;
    if (m < flatCoordinates[stride - 1]) {
        if (extrapolate) {
            coordinate = flatCoordinates.slice(0, stride);
            coordinate[stride - 1] = m;
            return coordinate;
        }
        else {
            return null;
        }
    }
    if (flatCoordinates[flatCoordinates.length - 1] < m) {
        if (extrapolate) {
            coordinate = flatCoordinates.slice(flatCoordinates.length - stride);
            coordinate[stride - 1] = m;
            return coordinate;
        }
        else {
            return null;
        }
    }
    for (var i = 0, ii = ends.length; i < ii; ++i) {
        var end = ends[i];
        if (offset == end) {
            continue;
        }
        if (m < flatCoordinates[offset + stride - 1]) {
            return null;
        }
        else if (m <= flatCoordinates[end - 1]) {
            return lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, false);
        }
        offset = end;
    }
    return null;
}
//# sourceMappingURL=interpolate.js.map