/**
 * Encode a list of n-dimensional points and return an encoded string
 *
 * Attention: This function will modify the passed array!
 *
 * @param {Array<number>} numbers A list of n-dimensional points.
 * @param {number} stride The number of dimension of the points in the list.
 * @param {number} [factor] The factor by which the numbers will be
 *     multiplied. The remaining decimal places will get rounded away.
 *     Default is `1e5`.
 * @return {string} The encoded string.
 * @api
 */
export function encodeDeltas(numbers: Array<number>, stride: number, factor?: number): string;
/**
 * Decode a list of n-dimensional points from an encoded string
 *
 * @param {string} encoded An encoded string.
 * @param {number} stride The number of dimension of the points in the
 *     encoded string.
 * @param {number} [factor] The factor by which the resulting numbers will
 *     be divided. Default is `1e5`.
 * @return {Array<number>} A list of n-dimensional points.
 * @api
 */
export function decodeDeltas(encoded: string, stride: number, factor?: number): Array<number>;
/**
 * Encode a list of floating point numbers and return an encoded string
 *
 * Attention: This function will modify the passed array!
 *
 * @param {Array<number>} numbers A list of floating point numbers.
 * @param {number} [factor] The factor by which the numbers will be
 *     multiplied. The remaining decimal places will get rounded away.
 *     Default is `1e5`.
 * @return {string} The encoded string.
 * @api
 */
export function encodeFloats(numbers: Array<number>, factor?: number): string;
/**
 * Decode a list of floating point numbers from an encoded string
 *
 * @param {string} encoded An encoded string.
 * @param {number} [factor] The factor by which the result will be divided.
 *     Default is `1e5`.
 * @return {Array<number>} A list of floating point numbers.
 * @api
 */
export function decodeFloats(encoded: string, factor?: number): Array<number>;
/**
 * Encode a list of signed integers and return an encoded string
 *
 * Attention: This function will modify the passed array!
 *
 * @param {Array<number>} numbers A list of signed integers.
 * @return {string} The encoded string.
 */
export function encodeSignedIntegers(numbers: Array<number>): string;
/**
 * Decode a list of signed integers from an encoded string
 *
 * @param {string} encoded An encoded string.
 * @return {Array<number>} A list of signed integers.
 */
export function decodeSignedIntegers(encoded: string): Array<number>;
/**
 * Encode a list of unsigned integers and return an encoded string
 *
 * @param {Array<number>} numbers A list of unsigned integers.
 * @return {string} The encoded string.
 */
export function encodeUnsignedIntegers(numbers: Array<number>): string;
/**
 * Decode a list of unsigned integers from an encoded string
 *
 * @param {string} encoded An encoded string.
 * @return {Array<number>} A list of unsigned integers.
 */
export function decodeUnsignedIntegers(encoded: string): Array<number>;
/**
 * Encode one single unsigned integer and return an encoded string
 *
 * @param {number} num Unsigned integer that should be encoded.
 * @return {string} The encoded string.
 */
export function encodeUnsignedInteger(num: number): string;
export default Polyline;
export type Options = {
    /**
     * The factor by which the coordinates values will be scaled.
     */
    factor?: number | undefined;
    /**
     * Layout of the
     * feature geometries created by the format reader.
     */
    geometryLayout?: import("../geom/Geometry.js").GeometryLayout | undefined;
};
/**
 * @typedef {Object} Options
 * @property {number} [factor=1e5] The factor by which the coordinates values will be scaled.
 * @property {import("../geom/Geometry.js").GeometryLayout} [geometryLayout='XY'] Layout of the
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
declare class Polyline extends TextFeature {
    /**
     * @param {Options} [options] Optional configuration object.
     */
    constructor(options?: Options);
    /**
     * @private
     * @type {number}
     */
    private factor_;
    /**
     * @private
     * @type {import("../geom/Geometry.js").GeometryLayout}
     */
    private geometryLayout_;
    /**
     * @param {import("../Feature.js").default<LineString>} feature Features.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @protected
     * @return {string} Text.
     * @override
     */
    protected override writeFeatureText(feature: import("../Feature.js").default<LineString>, options?: import("./Feature.js").WriteOptions): string;
    /**
     * @param {Array<import("../Feature.js").default<LineString>>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @protected
     * @return {string} Text.
     * @override
     */
    protected override writeFeaturesText(features: Array<import("../Feature.js").default<LineString>>, options?: import("./Feature.js").WriteOptions): string;
    /**
     * @param {LineString} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @protected
     * @return {string} Text.
     * @override
     */
    protected override writeGeometryText(geometry: LineString, options?: import("./Feature.js").WriteOptions): string;
}
import TextFeature from './TextFeature.js';
import LineString from '../geom/LineString.js';
//# sourceMappingURL=Polyline.d.ts.map