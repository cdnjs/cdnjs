var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @module ol/render/webgl/utils
 */
import earcut from 'earcut';
import { apply as applyTransform } from '../../transform.js';
import { clamp } from '../../math.js';
var tmpArray_ = [];
/**
 * An object holding positions both in an index and a vertex buffer.
 * @typedef {Object} BufferPositions
 * @property {number} vertexPosition Position in the vertex buffer
 * @property {number} indexPosition Position in the index buffer
 */
var bufferPositions_ = { vertexPosition: 0, indexPosition: 0 };
function writePointVertex(buffer, pos, x, y, index) {
    buffer[pos + 0] = x;
    buffer[pos + 1] = y;
    buffer[pos + 2] = index;
}
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
export function writePointFeatureToBuffers(instructions, elementIndex, vertexBuffer, indexBuffer, customAttributesCount, bufferPositions) {
    // This is for x, y and index
    var baseVertexAttrsCount = 3;
    var baseInstructionsCount = 2;
    var stride = baseVertexAttrsCount + customAttributesCount;
    var x = instructions[elementIndex + 0];
    var y = instructions[elementIndex + 1];
    // read custom numerical attributes on the feature
    var customAttrs = tmpArray_;
    customAttrs.length = customAttributesCount;
    for (var i = 0; i < customAttrs.length; i++) {
        customAttrs[i] = instructions[elementIndex + baseInstructionsCount + i];
    }
    var vPos = bufferPositions ? bufferPositions.vertexPosition : 0;
    var iPos = bufferPositions ? bufferPositions.indexPosition : 0;
    var baseIndex = vPos / stride;
    // push vertices for each of the four quad corners (first standard then custom attributes)
    writePointVertex(vertexBuffer, vPos, x, y, 0);
    customAttrs.length &&
        vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
    vPos += stride;
    writePointVertex(vertexBuffer, vPos, x, y, 1);
    customAttrs.length &&
        vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
    vPos += stride;
    writePointVertex(vertexBuffer, vPos, x, y, 2);
    customAttrs.length &&
        vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
    vPos += stride;
    writePointVertex(vertexBuffer, vPos, x, y, 3);
    customAttrs.length &&
        vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
    vPos += stride;
    indexBuffer[iPos++] = baseIndex;
    indexBuffer[iPos++] = baseIndex + 1;
    indexBuffer[iPos++] = baseIndex + 3;
    indexBuffer[iPos++] = baseIndex + 1;
    indexBuffer[iPos++] = baseIndex + 2;
    indexBuffer[iPos++] = baseIndex + 3;
    bufferPositions_.vertexPosition = vPos;
    bufferPositions_.indexPosition = iPos;
    return bufferPositions_;
}
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
export function writeLineSegmentToBuffers(instructions, segmentStartIndex, segmentEndIndex, beforeSegmentIndex, afterSegmentIndex, vertexArray, indexArray, customAttributes, instructionsTransform, invertInstructionsTransform) {
    // compute the stride to determine how many vertices were already pushed
    var baseVertexAttrsCount = 5; // base attributes: x0, y0, x1, y1, params (vertex number [0-3], join angle 1, join angle 2)
    var stride = baseVertexAttrsCount + customAttributes.length;
    var baseIndex = vertexArray.length / stride;
    // The segment is composed of two positions called P0[x0, y0] and P1[x1, y1]
    // Depending on whether there are points before and after the segment, its final shape
    // will be different
    var p0 = [
        instructions[segmentStartIndex + 0],
        instructions[segmentStartIndex + 1],
    ];
    var p1 = [instructions[segmentEndIndex], instructions[segmentEndIndex + 1]];
    // to compute offsets from the line center we need to reproject
    // coordinates back in world units and compute the length of the segment
    var p0world = applyTransform(invertInstructionsTransform, __spreadArray([], p0, true));
    var p1world = applyTransform(invertInstructionsTransform, __spreadArray([], p1, true));
    function computeVertexParameters(vertexNumber, joinAngle1, joinAngle2) {
        var shift = 10000;
        var anglePrecision = 1500;
        return (Math.round(joinAngle1 * anglePrecision) +
            Math.round(joinAngle2 * anglePrecision) * shift +
            vertexNumber * shift * shift);
    }
    // compute the angle between p0pA and p0pB
    // returns a value in [0, 2PI]
    function angleBetween(p0, pA, pB) {
        var lenA = Math.sqrt((pA[0] - p0[0]) * (pA[0] - p0[0]) + (pA[1] - p0[1]) * (pA[1] - p0[1]));
        var tangentA = [(pA[0] - p0[0]) / lenA, (pA[1] - p0[1]) / lenA];
        var orthoA = [-tangentA[1], tangentA[0]];
        var lenB = Math.sqrt((pB[0] - p0[0]) * (pB[0] - p0[0]) + (pB[1] - p0[1]) * (pB[1] - p0[1]));
        var tangentB = [(pB[0] - p0[0]) / lenB, (pB[1] - p0[1]) / lenB];
        // this angle can be clockwise or anticlockwise; hence the computation afterwards
        var angle = lenA === 0 || lenB === 0
            ? 0
            : Math.acos(clamp(tangentB[0] * tangentA[0] + tangentB[1] * tangentA[1], -1, 1));
        var isClockwise = tangentB[0] * orthoA[0] + tangentB[1] * orthoA[1] > 0;
        return !isClockwise ? Math.PI * 2 - angle : angle;
    }
    var joinBefore = beforeSegmentIndex !== null;
    var joinAfter = afterSegmentIndex !== null;
    var angle0 = 0;
    var angle1 = 0;
    // add vertices and adapt offsets for P0 in case of join
    if (joinBefore) {
        // B for before
        var pB = [
            instructions[beforeSegmentIndex],
            instructions[beforeSegmentIndex + 1],
        ];
        var pBworld = applyTransform(invertInstructionsTransform, __spreadArray([], pB, true));
        angle0 = angleBetween(p0world, p1world, pBworld);
    }
    // adapt offsets for P1 in case of join
    if (joinAfter) {
        // A for after
        var pA = [
            instructions[afterSegmentIndex],
            instructions[afterSegmentIndex + 1],
        ];
        var pAworld = applyTransform(invertInstructionsTransform, __spreadArray([], pA, true));
        angle1 = angleBetween(p1world, p0world, pAworld);
    }
    // add main segment triangles
    vertexArray.push(p0[0], p0[1], p1[0], p1[1], computeVertexParameters(0, angle0, angle1));
    vertexArray.push.apply(vertexArray, customAttributes);
    vertexArray.push(p0[0], p0[1], p1[0], p1[1], computeVertexParameters(1, angle0, angle1));
    vertexArray.push.apply(vertexArray, customAttributes);
    vertexArray.push(p0[0], p0[1], p1[0], p1[1], computeVertexParameters(2, angle0, angle1));
    vertexArray.push.apply(vertexArray, customAttributes);
    vertexArray.push(p0[0], p0[1], p1[0], p1[1], computeVertexParameters(3, angle0, angle1));
    vertexArray.push.apply(vertexArray, customAttributes);
    indexArray.push(baseIndex, baseIndex + 1, baseIndex + 2, baseIndex + 1, baseIndex + 3, baseIndex + 2);
}
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
export function writePolygonTrianglesToBuffers(instructions, polygonStartIndex, vertexArray, indexArray, customAttributesCount) {
    var instructionsPerVertex = 2; // x, y
    var attributesPerVertex = 2 + customAttributesCount;
    var instructionsIndex = polygonStartIndex;
    var customAttributes = instructions.slice(instructionsIndex, instructionsIndex + customAttributesCount);
    instructionsIndex += customAttributesCount;
    var ringsCount = instructions[instructionsIndex++];
    var verticesCount = 0;
    var holes = new Array(ringsCount - 1);
    for (var i = 0; i < ringsCount; i++) {
        verticesCount += instructions[instructionsIndex++];
        if (i < ringsCount - 1) {
            holes[i] = verticesCount;
        }
    }
    var flatCoords = instructions.slice(instructionsIndex, instructionsIndex + verticesCount * instructionsPerVertex);
    // pushing to vertices and indices!! this is where the magic happens
    var result = earcut(flatCoords, holes, instructionsPerVertex);
    for (var i = 0; i < result.length; i++) {
        indexArray.push(result[i] + vertexArray.length / attributesPerVertex);
    }
    for (var i = 0; i < flatCoords.length; i += 2) {
        vertexArray.push.apply(vertexArray, __spreadArray([flatCoords[i], flatCoords[i + 1]], customAttributes, false));
    }
    return instructionsIndex + verticesCount * instructionsPerVertex;
}
/**
 * Returns a texture of 1x1 pixel, white
 * @private
 * @return {ImageData} Image data.
 */
export function getBlankImageData() {
    var canvas = document.createElement('canvas');
    var image = canvas.getContext('2d').createImageData(1, 1);
    image.data[0] = 255;
    image.data[1] = 255;
    image.data[2] = 255;
    image.data[3] = 255;
    return image;
}
/**
 * Generates a color array based on a numerical id
 * Note: the range for each component is 0 to 1 with 256 steps
 * @param {number} id Id
 * @param {Array<number>} [opt_array] Reusable array
 * @return {Array<number>} Color array containing the encoded id
 */
export function colorEncodeId(id, opt_array) {
    var array = opt_array || [];
    var radix = 256;
    var divide = radix - 1;
    array[0] = Math.floor(id / radix / radix / radix) / divide;
    array[1] = (Math.floor(id / radix / radix) % radix) / divide;
    array[2] = (Math.floor(id / radix) % radix) / divide;
    array[3] = (id % radix) / divide;
    return array;
}
/**
 * Reads an id from a color-encoded array
 * Note: the expected range for each component is 0 to 1 with 256 steps.
 * @param {Array<number>} color Color array containing the encoded id
 * @return {number} Decoded id
 */
export function colorDecodeId(color) {
    var id = 0;
    var radix = 256;
    var mult = radix - 1;
    id += Math.round(color[0] * radix * radix * radix * mult);
    id += Math.round(color[1] * radix * radix * mult);
    id += Math.round(color[2] * radix * mult);
    id += Math.round(color[3] * mult);
    return id;
}
//# sourceMappingURL=utils.js.map