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
export function arrayToGlsl(array: Array<number>): string;
/**
 * Will normalize and converts to string a `vec4` color array compatible with GLSL.
 * @param {string|import("../color.js").Color} color Color either in string format or [r, g, b, a] array format,
 * with RGB components in the 0..255 range and the alpha component in the 0..1 range.
 * Note that the final array will always have 4 components.
 * @return {string} The color expressed in the `vec4(1.0, 1.0, 1.0, 1.0)` form.
 */
export function colorToGlsl(color: string | import("../color.js").Color): string;
/**
 * Returns a stable equivalent number for the string literal.
 * @param {string} string String literal value
 * @return {number} Number equivalent
 */
export function getStringNumberEquivalent(string: string): number;
/**
 * Returns a stable equivalent number for the string literal, for use in shaders. This number is then
 * converted to be a GLSL-compatible string.
 * Note: with a float precision of `mediump`, the amount of unique strings supported is 16,777,216
 * @param {string} string String literal value
 * @return {string} GLSL-compatible string containing a number
 */
export function stringToGlsl(string: string): string;
/**
 * Get the uniform name given a variable name.
 * @param {string} variableName The variable name.
 * @return {string} The uniform name.
 */
export function uniformNameForVariable(variableName: string): string;
/**
 * @typedef {import('./expression.js').ParsingContext} ParsingContext
 */
/**
 *
 * @typedef {import("./expression.js").Expression} Expression
 */
/**
 *
 * @typedef {import("./expression.js").LiteralExpression} LiteralExpression
 */
/**
 * @typedef {Object} CompilationContextProperty
 * @property {string} name Name
 * @property {number} type Resolved property type
 * @property {function(import("../Feature.js").FeatureLike): *} [evaluator] Function used for evaluating the value;
 */
/**
 * @typedef {Object} CompilationContextVariable
 * @property {string} name Name
 * @property {number} type Resolved variable type
 * @property {function(Object): *} [evaluator] Function used for evaluating the value; argument is the style variables object
 */
/**
 * @typedef {Object} CompilationContext
 * @property {boolean} [inFragmentShader] If false, means the expression output should be made for a vertex shader
 * @property {Object<string, CompilationContextProperty>} properties The values for properties used in 'get' expressions.
 * @property {Object<string, CompilationContextVariable>} variables The values for variables used in 'var' expressions.
 * @property {Object<string, string>} functions Lookup of functions used by the style.
 * @property {number} [bandCount] Number of bands per pixel.
 * @property {Array<PaletteTexture>} [paletteTextures] List of palettes used by the style.
 * @property {import("../style/webgl.js").WebGLStyle} style Literal style.
 */
/**
 * @return {CompilationContext} A new compilation context.
 */
export function newCompilationContext(): CompilationContext;
/**
 * @typedef {string} CompiledExpression
 */
/**
 * @typedef {function(CompilationContext, CallExpression, number): string} Compiler
 * Third argument is the expected value types
 */
/**
 * @param {import('./expression.js').EncodedExpression} encoded The encoded expression.
 * @param {number} type The expected type.
 * @param {import('./expression.js').ParsingContext} parsingContext The parsing context.
 * @param {CompilationContext} compilationContext An existing compilation context
 * @return {CompiledExpression} The compiled expression.
 */
export function buildExpression(encoded: import('./expression.js').EncodedExpression, type: number, parsingContext: import('./expression.js').ParsingContext, compilationContext: CompilationContext): CompiledExpression;
export const PALETTE_TEXTURE_ARRAY: "u_paletteTextures";
export type ParsingContext = import('./expression.js').ParsingContext;
export type Expression = import("./expression.js").Expression;
export type LiteralExpression = import("./expression.js").LiteralExpression;
export type CompilationContextProperty = {
    /**
     * Name
     */
    name: string;
    /**
     * Resolved property type
     */
    type: number;
    /**
     * Function used for evaluating the value;
     */
    evaluator?: ((arg0: import("../Feature.js").FeatureLike) => any) | undefined;
};
export type CompilationContextVariable = {
    /**
     * Name
     */
    name: string;
    /**
     * Resolved variable type
     */
    type: number;
    /**
     * Function used for evaluating the value; argument is the style variables object
     */
    evaluator?: ((arg0: any) => any) | undefined;
};
export type CompilationContext = {
    /**
     * If false, means the expression output should be made for a vertex shader
     */
    inFragmentShader?: boolean | undefined;
    /**
     * The values for properties used in 'get' expressions.
     */
    properties: {
        [x: string]: CompilationContextProperty;
    };
    /**
     * The values for variables used in 'var' expressions.
     */
    variables: {
        [x: string]: CompilationContextVariable;
    };
    /**
     * Lookup of functions used by the style.
     */
    functions: {
        [x: string]: string;
    };
    /**
     * Number of bands per pixel.
     */
    bandCount?: number | undefined;
    /**
     * List of palettes used by the style.
     */
    paletteTextures?: PaletteTexture[] | undefined;
    /**
     * Literal style.
     */
    style: import("../style/webgl.js").WebGLStyle;
};
export type CompiledExpression = string;
/**
 * Third argument is the expected value types
 */
export type Compiler = (arg0: CompilationContext, arg1: CallExpression, arg2: number) => string;
import PaletteTexture from '../webgl/PaletteTexture.js';
import { CallExpression } from './expression.js';
//# sourceMappingURL=gpu.d.ts.map