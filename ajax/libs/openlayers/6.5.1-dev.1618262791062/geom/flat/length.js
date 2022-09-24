/**
 * @module ol/geom/flat/length
 */
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Length.
 */
export function lineStringLength(flatCoordinates, offset, end, stride) {
    var x1 = flatCoordinates[offset];
    var y1 = flatCoordinates[offset + 1];
    var length = 0;
    for (var i = offset + stride; i < end; i += stride) {
        var x2 = flatCoordinates[i];
        var y2 = flatCoordinates[i + 1];
        length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        x1 = x2;
        y1 = y2;
    }
    return length;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Perimeter.
 */
export function linearRingLength(flatCoordinates, offset, end, stride) {
    var perimeter = lineStringLength(flatCoordinates, offset, end, stride);
    var dx = flatCoordinates[end - stride] - flatCoordinates[offset];
    var dy = flatCoordinates[end - stride + 1] - flatCoordinates[offset + 1];
    perimeter += Math.sqrt(dx * dx + dy * dy);
    return perimeter;
}
//# sourceMappingURL=length.js.map