/**
 * Returns the possible types for a given value (each type being a binary flag)
 * To test a value use e.g. `getValueType(v) & ValueTypes.BOOLEAN`
 * @param {ExpressionValue} value Value
 * @return {ValueTypes|number} Type or types inferred from the value
 */
export function getValueType(value: string | number | boolean | any[] | number[]): number;
/**
 * Checks if only one value type is enabled in the input number.
 * @param {ValueTypes|number} valueType Number containing value type binary flags
 * @return {boolean} True if only one type flag is enabled, false if zero or multiple
 */
export function isTypeUnique(valueType: number): boolean;
/**
 * Context available during the parsing of an expression.
 * @typedef {Object} ParsingContext
 * @property {boolean} [inFragmentShader] If false, means the expression output should be made for a vertex shader
 * @property {Array<string>} variables List of variables used in the expression; contains **unprefixed names**
 * @property {Array<string>} attributes List of attributes used in the expression; contains **unprefixed names**
 * @property {Object<string, number>} stringLiteralsMap This object maps all encountered string values to a number
 * @property {number} [bandCount] Number of bands per pixel.
 */
/**
 * Will return the number as a float with a dot separator, which is required by GLSL.
 * @param {number} v Numerical value.
 * @return {string} The value as string.
 */
export function numberToGlsl(v: number): string;
/**
 * Will return the number array as a float with a dot separator, concatenated with ', '.
 * @param {Array<number>} array Numerical values array.
 * @return {string} The array as a vector, e. g.: `vec3(1.0, 2.0, 3.0)`.
 */
export function arrayToGlsl(array: number[]): string;
/**
 * Will normalize and converts to string a `vec4` color array compatible with GLSL.
 * @param {string|import("../color.js").Color} color Color either in string format or [r, g, b, a] array format,
 * with RGB components in the 0..255 range and the alpha component in the 0..1 range.
 * Note that the final array will always have 4 components.
 * @return {string} The color expressed in the `vec4(1.0, 1.0, 1.0, 1.0)` form.
 */
export function colorToGlsl(color: string | number[]): string;
/**
 * Returns a stable equivalent number for the string literal.
 * @param {ParsingContext} context Parsing context
 * @param {string} string String literal value
 * @return {number} Number equivalent
 */
export function getStringNumberEquivalent(context: ParsingContext, string: string): number;
/**
 * Returns a stable equivalent number for the string literal, for use in shaders. This number is then
 * converted to be a GLSL-compatible string.
 * @param {ParsingContext} context Parsing context
 * @param {string} string String literal value
 * @return {string} GLSL-compatible string containing a number
 */
export function stringToGlsl(context: ParsingContext, string: string): string;
/**
 * Recursively parses a style expression and outputs a GLSL-compatible string. Takes in a parsing context that
 * will be read and modified during the parsing operation.
 * @param {ParsingContext} context Parsing context
 * @param {ExpressionValue} value Value
 * @param {ValueTypes|number} [typeHint] Hint for the expected final type (can be several types combined)
 * @return {string} GLSL-compatible output
 */
export function expressionToGlsl(context: ParsingContext, value: string | number | boolean | any[] | number[], typeHint?: number | undefined): string;
/**
 * Get the uniform name given a variable name.
 * @param {string} variableName The variable name.
 * @return {string} The uniform name.
 */
export function uniformNameForVariable(variableName: string): string;
/**
 * Possible inferred types from a given value or expression.
 * Note: these are binary flags.
 */
export type ValueTypes = number;
export namespace ValueTypes {
    export const NUMBER: number;
    export const STRING: number;
    export const COLOR: number;
    export const BOOLEAN: number;
    export const NUMBER_ARRAY: number;
    export const ANY: number;
    export const NONE: number;
}
/**
 * An operator declaration must contain two methods: `getReturnType` which returns a type based on
 * the operator arguments, and `toGlsl` which returns a GLSL-compatible string.
 * Note: both methods can process arguments recursively.
 * @typedef {Object} Operator
 * @property {function(Array<ExpressionValue>): ValueTypes|number} getReturnType Returns one or several types
 * @property {function(ParsingContext, Array<ExpressionValue>, ValueTypes=): string} toGlsl Returns a GLSL-compatible string
 * Note: takes in an optional type hint as 3rd parameter
 */
/**
 * Operator declarations
 * @type {Object<string, Operator>}
 */
export const Operators: {
    [x: string]: Operator;
};
/**
 * Context available during the parsing of an expression.
 */
export type ParsingContext = {
    /**
     * If false, means the expression output should be made for a vertex shader
     */
    inFragmentShader?: boolean;
    /**
     * List of variables used in the expression; contains **unprefixed names**
     */
    variables: string[];
    /**
     * List of attributes used in the expression; contains **unprefixed names**
     */
    attributes: string[];
    /**
     * This object maps all encountered string values to a number
     */
    stringLiteralsMap: {
        [x: string]: number;
    };
    /**
     * Number of bands per pixel.
     */
    bandCount?: number;
};
/**
 * Base type used for literal style parameters; can be a number literal or the output of an operator,
 * which in turns takes {@link import("./expressions.js").ExpressionValue} arguments.
 *
 * The following operators can be used:
 *
 * * Reading operators:
 *    * `['band', bandIndex, xOffset, yOffset]` For tile layers only. Fetches pixel values from band
 *      `bandIndex` of the source's data. The first `bandIndex` of the source data is `1`. Fetched values
 *      are in the 0..1 range. {@link import("../source/TileImage.js").default} sources have 4 bands: red,
 *      green, blue and alpha. {@link import("../source/DataTile.js").default} sources can have any number
 *      of bands, depending on the underlying data source and
 *      {@link import("../source/GeoTIFF.js").Options configuration}. `xOffset` and `yOffset` are optional
 *      and allow specifying pixel offsets for x and y. This is used for sampling data from neighboring pixels.
 *    * `['get', 'attributeName']` fetches a feature attribute (it will be prefixed by `a_` in the shader)
 *      Note: those will be taken from the attributes provided to the renderer
 *    * `['resolution']` returns the current resolution
 *    * `['time']` returns the time in seconds since the creation of the layer
 *    * `['var', 'varName']` fetches a value from the style variables, or 0 if undefined
 *    * `['zoom']` returns the current zoom level
 *
 * * Math operators:
 *    * `['*', value1, value2]` multiplies `value1` by `value2`
 *    * `['/', value1, value2]` divides `value1` by `value2`
 *    * `['+', value1, value2]` adds `value1` and `value2`
 *    * `['-', value1, value2]` subtracts `value2` from `value1`
 *    * `['clamp', value, low, high]` clamps `value` between `low` and `high`
 *    * `['%', value1, value2]` returns the result of `value1 % value2` (modulo)
 *    * `['^', value1, value2]` returns the value of `value1` raised to the `value2` power
 *    * `['abs', value1]` returns the absolute value of `value1`
 *    * `['sin', value1]` returns the sine of `value1`
 *    * `['cos', value1]` returns the cosine of `value1`
 *    * `['atan', value1, value2]` returns `atan2(value1, value2)`. If `value2` is not provided, returns `atan(value1)`
 *
 * * Transform operators:
 *    * `['case', condition1, output1, ...conditionN, outputN, fallback]` selects the first output whose corresponding
 *      condition evaluates to `true`. If no match is found, returns the `fallback` value.
 *      All conditions should be `boolean`, output and fallback can be any kind.
 *    * `['match', input, match1, output1, ...matchN, outputN, fallback]` compares the `input` value against all
 *      provided `matchX` values, returning the output associated with the first valid match. If no match is found,
 *      returns the `fallback` value.
 *      `input` and `matchX` values must all be of the same type, and can be `number` or `string`. `outputX` and
 *      `fallback` values must be of the same type, and can be of any kind.
 *    * `['interpolate', interpolation, input, stop1, output1, ...stopN, outputN]` returns a value by interpolating between
 *      pairs of inputs and outputs; `interpolation` can either be `['linear']` or `['exponential', base]` where `base` is
 *      the rate of increase from stop A to stop B (i.e. power to which the interpolation ratio is raised); a value
 *      of 1 is equivalent to `['linear']`.
 *      `input` and `stopX` values must all be of type `number`. `outputX` values can be `number` or `color` values.
 *      Note: `input` will be clamped between `stop1` and `stopN`, meaning that all output values will be comprised
 *      between `output1` and `outputN`.
 *
 * * Logical operators:
 *    * `['<', value1, value2]` returns `true` if `value1` is strictly lower than `value2`, or `false` otherwise.
 *    * `['<=', value1, value2]` returns `true` if `value1` is lower than or equals `value2`, or `false` otherwise.
 *    * `['>', value1, value2]` returns `true` if `value1` is strictly greater than `value2`, or `false` otherwise.
 *    * `['>=', value1, value2]` returns `true` if `value1` is greater than or equals `value2`, or `false` otherwise.
 *    * `['==', value1, value2]` returns `true` if `value1` equals `value2`, or `false` otherwise.
 *    * `['!=', value1, value2]` returns `true` if `value1` does not equal `value2`, or `false` otherwise.
 *    * `['!', value1]` returns `false` if `value1` is `true` or greater than `0`, or `true` otherwise.
 *    * `['all', value1, value2, ...]` returns `true` if all the inputs are `true`, `false` otherwise.
 *    * `['any', value1, value2, ...]` returns `true` if any of the inputs are `true`, `false` otherwise.
 *    * `['between', value1, value2, value3]` returns `true` if `value1` is contained between `value2` and `value3`
 *      (inclusively), or `false` otherwise.
 *
 * * Conversion operators:
 *    * `['array', value1, ...valueN]` creates a numerical array from `number` values; please note that the amount of
 *      values can currently only be 2, 3 or 4.
 *    * `['color', red, green, blue, alpha]` creates a `color` value from `number` values; the `alpha` parameter is
 *      optional; if not specified, it will be set to 1.
 *      Note: `red`, `green` and `blue` components must be values between 0 and 255; `alpha` between 0 and 1.
 *
 * Values can either be literals or another operator, as they will be evaluated recursively.
 * Literal values can be of the following types:
 * * `boolean`
 * * `number`
 * * `string`
 * * {@link module:ol/color~Color}
 */
export type ExpressionValue = string | number | boolean | any[] | number[];
/**
 * An operator declaration must contain two methods: `getReturnType` which returns a type based on
 * the operator arguments, and `toGlsl` which returns a GLSL-compatible string.
 * Note: both methods can process arguments recursively.
 */
export type Operator = {
    /**
     * Returns one or several types
     */
    getReturnType: (arg0: (string | number | boolean | any[] | number[])[]) => number;
    /**
     * Returns a GLSL-compatible string
     * Note: takes in an optional type hint as 3rd parameter
     */
    toGlsl: (arg0: ParsingContext, arg1: (string | number | boolean | any[] | number[])[], arg2?: number | undefined) => string;
};
//# sourceMappingURL=expressions.d.ts.map