/**
 * Get a string representation for a type.
 * @param {number} type The type.
 * @return {string} The type name.
 */
export function typeName(type: number): string;
/**
 * @param {number} broad The broad type.
 * @param {number} specific The specific type.
 * @return {boolean} The broad type includes the specific type.
 */
export function includesType(broad: number, specific: number): boolean;
/**
 * @param {number} oneType One type.
 * @param {number} otherType Another type.
 * @return {boolean} The set of types overlap (share a common specific type)
 */
export function overlapsType(oneType: number, otherType: number): boolean;
/**
 * @param {number} type The type.
 * @param {number} expected The expected type.
 * @return {boolean} The given type is exactly the expected type.
 */
export function isType(type: number, expected: number): boolean;
/**
 * @typedef {LiteralExpression|CallExpression} Expression
 */
/**
 * @typedef {Object} ParsingContext
 * @property {Set<string>} variables Variables referenced with the 'var' operator.
 * @property {Set<string>} properties Properties referenced with the 'get' operator.
 * @property {boolean} featureId The style uses the feature id.
 * @property {boolean} geometryType The style uses the feature geometry type.
 * @property {boolean} mapState The style uses the map state (view state or time elapsed).
 */
/**
 * @return {ParsingContext} A new parsing context.
 */
export function newParsingContext(): ParsingContext;
/**
 * @typedef {LiteralValue|Array} EncodedExpression
 */
/**
 * @param {EncodedExpression} encoded The encoded expression.
 * @param {number} expectedType The expected type.
 * @param {ParsingContext} context The parsing context.
 * @return {Expression} The parsed expression result.
 */
export function parse(encoded: EncodedExpression, expectedType: number, context: ParsingContext): Expression;
/**
 * Returns a simplified geometry type suited for the `geometry-type` operator
 * @param {import('../geom/Geometry.js').default|import('../render/Feature.js').default} geometry Geometry object
 * @return {'Point'|'LineString'|'Polygon'|''} Simplified geometry type; empty string of no geometry found
 */
export function computeGeometryType(geometry: import("../geom/Geometry.js").default | import("../render/Feature.js").default): "Point" | "LineString" | "Polygon" | "";
export const NoneType: 0;
export const BooleanType: number;
export const NumberType: number;
export const StringType: number;
export const ColorType: number;
export const NumberArrayType: number;
export const SizeType: number;
export const AnyType: number;
/**
 * @typedef {boolean|number|string|Array<number>} LiteralValue
 */
export class LiteralExpression {
    /**
     * @param {number} type The value type.
     * @param {LiteralValue} value The literal value.
     */
    constructor(type: number, value: LiteralValue);
    type: number;
    value: LiteralValue;
}
export class CallExpression {
    /**
     * @param {number} type The return type.
     * @param {string} operator The operator.
     * @param {...Expression} args The arguments.
     */
    constructor(type: number, operator: string, ...args: Expression[]);
    type: number;
    operator: string;
    args: Expression[];
}
/**
 * @type {Object<string, string>}
 */
export const Ops: {
    [x: string]: string;
};
export type Expression = LiteralExpression | CallExpression;
export type ParsingContext = {
    /**
     * Variables referenced with the 'var' operator.
     */
    variables: Set<string>;
    /**
     * Properties referenced with the 'get' operator.
     */
    properties: Set<string>;
    /**
     * The style uses the feature id.
     */
    featureId: boolean;
    /**
     * The style uses the feature geometry type.
     */
    geometryType: boolean;
    /**
     * The style uses the map state (view state or time elapsed).
     */
    mapState: boolean;
};
export type EncodedExpression = LiteralValue | any[];
/**
 * An argument validator applies various checks to an encoded expression arguments and
 * returns the parsed arguments if any.  The second argument is the return type of the call expression.
 */
export type ArgValidator = (arg0: Array<EncodedExpression>, arg1: number, arg2: ParsingContext) => Array<Expression> | void;
/**
 * Base type used for literal style parameters; can be a number literal or the output of an operator,
 * which in turns takes {@link import ("./expression.js").ExpressionValue} arguments.
 *
 * See below for details on the available operators (with notes for those that are WebGL or Canvas only).
 *
 * Reading operators:
 *   `['band', bandIndex, xOffset, yOffset]` For tile layers only. Fetches pixel values from band
 *     `bandIndex` of the source's data. The first `bandIndex` of the source data is `1`. Fetched values
 *     are in the 0..1 range. {@link import ("../source/TileImage.js").default} sources have 4 bands: red,
 *     green, blue and alpha. {@link import ("../source/DataTile.js").default} sources can have any number
 *     of bands, depending on the underlying data source and
 *     {@link import ("../source/GeoTIFF.js").Options configuration}. `xOffset` and `yOffset` are optional
 *     and allow specifying pixel offsets for x and y. This is used for sampling data from neighboring pixels (WebGL only).
 *   `['get', attributeName]` fetches a feature property value, similar to `feature.get('attributeName')`.
 *   `['get', attributeName, keyOrArrayIndex, ...]` (Canvas only) Access nested properties and array items of a
 *     feature property. The result is `undefined` when there is nothing at the specified key or index.
 *   `['geometry-type']` returns a feature's geometry type as string, either: 'LineString', 'Point' or 'Polygon'
 *     `Multi*` values are returned as their singular equivalent
 *     `Circle` geometries are returned as 'Polygon'
 *     `GeometryCollection` geometries are returned as the type of the first geometry found in the collection (WebGL only).
 *   `['resolution']` returns the current resolution
 *   `['time']` The time in seconds since the creation of the layer (WebGL only).
 *   `['var', 'varName']` fetches a value from the style variables; will throw an error if that variable is undefined
 *   `['zoom']` The current zoom level (WebGL only).
 *   `['line-metric']` returns the M component of the current point on a line (WebGL only); in case where the geometry layout of the line
 *      does not contain an M component (e.g. XY or XYZ), 0 is returned; 0 is also returned for geometries other than lines.
 *      Please note that the M component will be linearly interpolated between the two points composing a segment.
 *
 * Math operators:
 *   `['*', value1, value2, ...]` multiplies the values (either numbers or colors)
 *   `['/', value1, value2]` divides `value1` by `value2`
 *   `['+', value1, value2, ...]` adds the values
 *   `['-', value1, value2]` subtracts `value2` from `value1`
 *   `['clamp', value, low, high]` clamps `value` between `low` and `high`
 *   `['%', value1, value2]` returns the result of `value1 % value2` (modulo)
 *   `['^', value1, value2]` returns the value of `value1` raised to the `value2` power
 *   `['abs', value1]` returns the absolute value of `value1`
 *   `['floor', value1]` returns the nearest integer less than or equal to `value1`
 *   * `['round', value1]` returns the nearest integer to `value1`
 *   * `['ceil', value1]` returns the nearest integer greater than or equal to `value1`
 *   * `['sin', value1]` returns the sine of `value1`
 *   * `['cos', value1]` returns the cosine of `value1`
 *   * `['atan', value1, value2]` returns `atan2(value1, value2)`. If `value2` is not provided, returns `atan(value1)`
 *   * `['sqrt', value1]` returns the square root of `value1`
 *
 * * Transform operators:
 *   * `['case', condition1, output1, ...conditionN, outputN, fallback]` selects the first output whose corresponding
 *     condition evaluates to `true`. If no match is found, returns the `fallback` value.
 *     All conditions should be `boolean`, output and fallback can be any kind.
 *   * `['match', input, match1, output1, ...matchN, outputN, fallback]` compares the `input` value against all
 *     provided `matchX` values, returning the output associated with the first valid match. If no match is found,
 *     returns the `fallback` value.
 *     `input` and `matchX` values must all be of the same type, and can be `number` or `string`. `outputX` and
 *     `fallback` values must be of the same type, and can be of any kind.
 *   * `['interpolate', interpolation, input, stop1, output1, ...stopN, outputN]` returns a value by interpolating between
 *     pairs of inputs and outputs; `interpolation` can either be `['linear']` or `['exponential', base]` where `base` is
 *     the rate of increase from stop A to stop B (i.e. power to which the interpolation ratio is raised); a value
 *     of 1 is equivalent to `['linear']`.
 *     `input` and `stopX` values must all be of type `number`. `outputX` values can be `number` or `color` values.
 *     Note: `input` will be clamped between `stop1` and `stopN`, meaning that all output values will be comprised
 *     between `output1` and `outputN`.
 *   * `['string', value1, value2, ...]` returns the first value in the list that evaluates to a string.
 *     An example would be to provide a default value for get: `['string', ['get', 'propertyname'], 'default value']]`
 *     (Canvas only).
 *   * `['number', value1, value2, ...]` returns the first value in the list that evaluates to a number.
 *     An example would be to provide a default value for get: `['string', ['get', 'propertyname'], 42]]`
 *     (Canvas only).
 *   * `['coalesce', value1, value2, ...]` returns the first value in the list which is not null or undefined.
 *     An example would be to provide a default value for get: `['coalesce', ['get','propertyname'], 'default value']]`
 *     (Canvas only).
 *
 * * Logical operators:
 *   * `['<', value1, value2]` returns `true` if `value1` is strictly lower than `value2`, or `false` otherwise.
 *   * `['<=', value1, value2]` returns `true` if `value1` is lower than or equals `value2`, or `false` otherwise.
 *   * `['>', value1, value2]` returns `true` if `value1` is strictly greater than `value2`, or `false` otherwise.
 *   * `['>=', value1, value2]` returns `true` if `value1` is greater than or equals `value2`, or `false` otherwise.
 *   * `['==', value1, value2]` returns `true` if `value1` equals `value2`, or `false` otherwise.
 *   * `['!=', value1, value2]` returns `true` if `value1` does not equal `value2`, or `false` otherwise.
 *   * `['!', value1]` returns `false` if `value1` is `true` or greater than `0`, or `true` otherwise.
 *   * `['all', value1, value2, ...]` returns `true` if all the inputs are `true`, `false` otherwise.
 *   * `['any', value1, value2, ...]` returns `true` if any of the inputs are `true`, `false` otherwise.
 *   * `['has', attributeName, keyOrArrayIndex, ...]` returns `true` if feature properties include the (nested) key `attributeName`,
 *     `false` otherwise.
 *   * `['between', value1, value2, value3]` returns `true` if `value1` is contained between `value2` and `value3`
 *     (inclusively), or `false` otherwise.
 *   * `['in', needle, haystack]` returns `true` if `needle` is found in `haystack`, and
 *     `false` otherwise.
 *     This operator has the following limitations:
 *     * `haystack` has to be an array of numbers or strings (searching for a substring in a string is not supported yet)
 *     * Only literal arrays are supported as `haystack` for now; this means that `haystack` cannot be the result of an
 *     expression. If `haystack` is an array of strings, use the `literal` operator to disambiguate from an expression:
 *     `['literal', ['abc', 'def', 'ghi']]`
 *
 * * Conversion operators:
 *   * `['array', value1, ...valueN]` creates a numerical array from `number` values; please note that the amount of
 *     values can currently only be 2, 3 or 4 (WebGL only).
 *   * `['color', red, green, blue, alpha]` or `['color', shade, alpha]` creates a `color` value from `number` values;
 *     the `alpha` parameter is optional; if not specified, it will be set to 1 (WebGL only).
 *     Note: `red`, `green` and `blue` or `shade` components must be values between 0 and 255; `alpha` between 0 and 1.
 *   * `['palette', index, colors]` picks a `color` value from an array of colors using the given index; the `index`
 *     expression must evaluate to a number; the items in the `colors` array must be strings with hex colors
 *     (e.g. `'#86A136'`), colors using the rgba[a] functional notation (e.g. `'rgb(134, 161, 54)'` or `'rgba(134, 161, 54, 1)'`),
 *     named colors (e.g. `'red'`), or array literals with 3 ([r, g, b]) or 4 ([r, g, b, a]) values (with r, g, and b
 *     in the 0-255 range and a in the 0-1 range) (WebGL only).
 *   * `['to-string', value]` converts the input value to a string. If the input is a boolean, the result is "true" or "false".
 *     If the input is a number, it is converted to a string as specified by the "NumberToString" algorithm of the ECMAScript
 *     Language Specification. If the input is a color, it is converted to a string of the form "rgba(r,g,b,a)". (Canvas only)
 *
 * Values can either be literals or another operator, as they will be evaluated recursively.
 * Literal values can be of the following types:
 * * `boolean`
 * * `number`
 * * `number[]` (number arrays can only have a length of 2, 3 or 4)
 * * `string`
 * * {@link module :ol/color~Color}
 */
export type ExpressionValue = Array<any> | import("../color.js").Color | string | number | boolean;
export type LiteralValue = boolean | number | string | Array<number>;
/**
 * Second argument is the expected type.
 */
export type Parser = (arg0: any[], arg1: number, arg2: ParsingContext) => Expression;
//# sourceMappingURL=expression.d.ts.map