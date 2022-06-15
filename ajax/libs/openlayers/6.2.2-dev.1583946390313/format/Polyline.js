var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/format/Polyline
 */
import { assert } from '../asserts.js';
import Feature from '../Feature.js';
import { transformGeometryWithOptions } from './Feature.js';
import TextFeature from './TextFeature.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import LineString from '../geom/LineString.js';
import { getStrideForLayout } from '../geom/SimpleGeometry.js';
import { flipXY } from '../geom/flat/flip.js';
import { inflateCoordinates } from '../geom/flat/inflate.js';
import { get as getProjection } from '../proj.js';
/**
 * @typedef {Object} Options
 * @property {number} [factor=1e5] The factor by which the coordinates values will be scaled.
 * @property {GeometryLayout} [geometryLayout='XY'] Layout of the
 * feature geometries created by the format reader.
 */
/**
 * @classdesc
 * Feature format for reading and writing data in the Encoded
 * Polyline Algorithm Format.
 *
 * When reading features, the coordinates are assumed to be in two dimensions
 * and in [latitude, longitude] order.
 *
 * As Polyline sources contain a single feature,
 * {@link module:ol/format/Polyline~Polyline#readFeatures} will return the
 * feature in an array.
 *
 * @api
 */
var Polyline = /** @class */ (function (_super) {
    __extends(Polyline, _super);
    /**
     * @param {Options=} opt_options Optional configuration object.
     */
    function Polyline(opt_options) {
        var _this = _super.call(this) || this;
        var options = opt_options ? opt_options : {};
        /**
         * @inheritDoc
         */
        _this.dataProjection = getProjection('EPSG:4326');
        /**
         * @private
         * @type {number}
         */
        _this.factor_ = options.factor ? options.factor : 1e5;
        /**
         * @private
         * @type {GeometryLayout}
         */
        _this.geometryLayout_ = options.geometryLayout ?
            options.geometryLayout : GeometryLayout.XY;
        return _this;
    }
    /**
     * @inheritDoc
     */
    Polyline.prototype.readFeatureFromText = function (text, opt_options) {
        var geometry = this.readGeometryFromText(text, opt_options);
        return new Feature(geometry);
    };
    /**
     * @inheritDoc
     */
    Polyline.prototype.readFeaturesFromText = function (text, opt_options) {
        var feature = this.readFeatureFromText(text, opt_options);
        return [feature];
    };
    /**
     * @inheritDoc
     */
    Polyline.prototype.readGeometryFromText = function (text, opt_options) {
        var stride = getStrideForLayout(this.geometryLayout_);
        var flatCoordinates = decodeDeltas(text, stride, this.factor_);
        flipXY(flatCoordinates, 0, flatCoordinates.length, stride, flatCoordinates);
        var coordinates = inflateCoordinates(flatCoordinates, 0, flatCoordinates.length, stride);
        var lineString = new LineString(coordinates, this.geometryLayout_);
        return transformGeometryWithOptions(lineString, false, this.adaptOptions(opt_options));
    };
    /**
     * @inheritDoc
     */
    Polyline.prototype.writeFeatureText = function (feature, opt_options) {
        var geometry = feature.getGeometry();
        if (geometry) {
            return this.writeGeometryText(geometry, opt_options);
        }
        else {
            assert(false, 40); // Expected `feature` to have a geometry
            return '';
        }
    };
    /**
     * @inheritDoc
     */
    Polyline.prototype.writeFeaturesText = function (features, opt_options) {
        return this.writeFeatureText(features[0], opt_options);
    };
    /**
     * @inheritDoc
     */
    Polyline.prototype.writeGeometryText = function (geometry, opt_options) {
        geometry = /** @type {LineString} */
            (transformGeometryWithOptions(geometry, true, this.adaptOptions(opt_options)));
        var flatCoordinates = geometry.getFlatCoordinates();
        var stride = geometry.getStride();
        flipXY(flatCoordinates, 0, flatCoordinates.length, stride, flatCoordinates);
        return encodeDeltas(flatCoordinates, stride, this.factor_);
    };
    return Polyline;
}(TextFeature));
/**
 * Encode a list of n-dimensional points and return an encoded string
 *
 * Attention: This function will modify the passed array!
 *
 * @param {Array<number>} numbers A list of n-dimensional points.
 * @param {number} stride The number of dimension of the points in the list.
 * @param {number=} opt_factor The factor by which the numbers will be
 *     multiplied. The remaining decimal places will get rounded away.
 *     Default is `1e5`.
 * @return {string} The encoded string.
 * @api
 */
export function encodeDeltas(numbers, stride, opt_factor) {
    var factor = opt_factor ? opt_factor : 1e5;
    var d;
    var lastNumbers = new Array(stride);
    for (d = 0; d < stride; ++d) {
        lastNumbers[d] = 0;
    }
    for (var i = 0, ii = numbers.length; i < ii;) {
        for (d = 0; d < stride; ++d, ++i) {
            var num = numbers[i];
            var delta = num - lastNumbers[d];
            lastNumbers[d] = num;
            numbers[i] = delta;
        }
    }
    return encodeFloats(numbers, factor);
}
/**
 * Decode a list of n-dimensional points from an encoded string
 *
 * @param {string} encoded An encoded string.
 * @param {number} stride The number of dimension of the points in the
 *     encoded string.
 * @param {number=} opt_factor The factor by which the resulting numbers will
 *     be divided. Default is `1e5`.
 * @return {Array<number>} A list of n-dimensional points.
 * @api
 */
export function decodeDeltas(encoded, stride, opt_factor) {
    var factor = opt_factor ? opt_factor : 1e5;
    var d;
    /** @type {Array<number>} */
    var lastNumbers = new Array(stride);
    for (d = 0; d < stride; ++d) {
        lastNumbers[d] = 0;
    }
    var numbers = decodeFloats(encoded, factor);
    for (var i = 0, ii = numbers.length; i < ii;) {
        for (d = 0; d < stride; ++d, ++i) {
            lastNumbers[d] += numbers[i];
            numbers[i] = lastNumbers[d];
        }
    }
    return numbers;
}
/**
 * Encode a list of floating point numbers and return an encoded string
 *
 * Attention: This function will modify the passed array!
 *
 * @param {Array<number>} numbers A list of floating point numbers.
 * @param {number=} opt_factor The factor by which the numbers will be
 *     multiplied. The remaining decimal places will get rounded away.
 *     Default is `1e5`.
 * @return {string} The encoded string.
 * @api
 */
export function encodeFloats(numbers, opt_factor) {
    var factor = opt_factor ? opt_factor : 1e5;
    for (var i = 0, ii = numbers.length; i < ii; ++i) {
        numbers[i] = Math.round(numbers[i] * factor);
    }
    return encodeSignedIntegers(numbers);
}
/**
 * Decode a list of floating point numbers from an encoded string
 *
 * @param {string} encoded An encoded string.
 * @param {number=} opt_factor The factor by which the result will be divided.
 *     Default is `1e5`.
 * @return {Array<number>} A list of floating point numbers.
 * @api
 */
export function decodeFloats(encoded, opt_factor) {
    var factor = opt_factor ? opt_factor : 1e5;
    var numbers = decodeSignedIntegers(encoded);
    for (var i = 0, ii = numbers.length; i < ii; ++i) {
        numbers[i] /= factor;
    }
    return numbers;
}
/**
 * Encode a list of signed integers and return an encoded string
 *
 * Attention: This function will modify the passed array!
 *
 * @param {Array<number>} numbers A list of signed integers.
 * @return {string} The encoded string.
 */
export function encodeSignedIntegers(numbers) {
    for (var i = 0, ii = numbers.length; i < ii; ++i) {
        var num = numbers[i];
        numbers[i] = (num < 0) ? ~(num << 1) : (num << 1);
    }
    return encodeUnsignedIntegers(numbers);
}
/**
 * Decode a list of signed integers from an encoded string
 *
 * @param {string} encoded An encoded string.
 * @return {Array<number>} A list of signed integers.
 */
export function decodeSignedIntegers(encoded) {
    var numbers = decodeUnsignedIntegers(encoded);
    for (var i = 0, ii = numbers.length; i < ii; ++i) {
        var num = numbers[i];
        numbers[i] = (num & 1) ? ~(num >> 1) : (num >> 1);
    }
    return numbers;
}
/**
 * Encode a list of unsigned integers and return an encoded string
 *
 * @param {Array<number>} numbers A list of unsigned integers.
 * @return {string} The encoded string.
 */
export function encodeUnsignedIntegers(numbers) {
    var encoded = '';
    for (var i = 0, ii = numbers.length; i < ii; ++i) {
        encoded += encodeUnsignedInteger(numbers[i]);
    }
    return encoded;
}
/**
 * Decode a list of unsigned integers from an encoded string
 *
 * @param {string} encoded An encoded string.
 * @return {Array<number>} A list of unsigned integers.
 */
export function decodeUnsignedIntegers(encoded) {
    var numbers = [];
    var current = 0;
    var shift = 0;
    for (var i = 0, ii = encoded.length; i < ii; ++i) {
        var b = encoded.charCodeAt(i) - 63;
        current |= (b & 0x1f) << shift;
        if (b < 0x20) {
            numbers.push(current);
            current = 0;
            shift = 0;
        }
        else {
            shift += 5;
        }
    }
    return numbers;
}
/**
 * Encode one single unsigned integer and return an encoded string
 *
 * @param {number} num Unsigned integer that should be encoded.
 * @return {string} The encoded string.
 */
export function encodeUnsignedInteger(num) {
    var value, encoded = '';
    while (num >= 0x20) {
        value = (0x20 | (num & 0x1f)) + 63;
        encoded += String.fromCharCode(value);
        num >>= 5;
    }
    value = num + 63;
    encoded += String.fromCharCode(value);
    return encoded;
}
export default Polyline;
//# sourceMappingURL=Polyline.js.map