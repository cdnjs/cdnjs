/**
 * @param {import('../style/literal.js').SymbolType} type Symbol type
 * @param {string} sizeExpressionGlsl Size expression
 * @return {string} The GLSL opacity function
 */
export function getSymbolOpacityGlslFunction(type: import('../style/literal.js').SymbolType, sizeExpressionGlsl: string): string;
/**
 * Packs all components of a color into a two-floats array
 * @param {import("../color.js").Color|string} color Color as array of numbers or string
 * @return {Array<number>} Vec2 array containing the color in compressed form
 */
export function packColor(color: import("../color.js").Color | string): Array<number>;
/**
 * @typedef {Object} StyleParseResult
 * @property {ShaderBuilder} builder Shader builder pre-configured according to a given style
 * @property {boolean} hasSymbol Has a symbol style defined
 * @property {boolean} hasStroke Has a stroke style defined
 * @property {boolean} hasFill Has a fill style defined
 * @property {import("../render/webgl/VectorStyleRenderer.js").UniformDefinitions} uniforms Uniform definitions
 * @property {import("../render/webgl/VectorStyleRenderer.js").AttributeDefinitions} attributes Attribute definitions
 */
/**
 * Parses a {@link import("../style/literal").LiteralStyle} object and returns a {@link ShaderBuilder}
 * object that has been configured according to the given style, as well as `attributes` and `uniforms`
 * arrays to be fed to the `WebGLPointsRenderer` class.
 *
 * Also returns `uniforms` and `attributes` properties as expected by the
 * {@link module:ol/renderer/webgl/PointsLayer~WebGLPointsLayerRenderer}.
 *
 * @param {import("../style/literal").LiteralStyle} style Literal style.
 * @return {StyleParseResult} Result containing shader params, attributes and uniforms.
 */
export function parseLiteralStyle(style: import("../style/literal").LiteralStyle): StyleParseResult;
export type StyleParseResult = {
    /**
     * Shader builder pre-configured according to a given style
     */
    builder: ShaderBuilder;
    /**
     * Has a symbol style defined
     */
    hasSymbol: boolean;
    /**
     * Has a stroke style defined
     */
    hasStroke: boolean;
    /**
     * Has a fill style defined
     */
    hasFill: boolean;
    /**
     * Uniform definitions
     */
    uniforms: import("../render/webgl/VectorStyleRenderer.js").UniformDefinitions;
    /**
     * Attribute definitions
     */
    attributes: import("../render/webgl/VectorStyleRenderer.js").AttributeDefinitions;
};
import { ShaderBuilder } from './ShaderBuilder.js';
//# sourceMappingURL=styleparser.d.ts.map