/**
 * Recursively parses a style expression and outputs a GLSL-compatible string. Takes in a compilation context that
 * will be read and modified during the parsing operation.
 * @param {import("../expr/gpu.js").CompilationContext} compilationContext Compilation context
 * @param {import("../expr/expression.js").EncodedExpression} value Value
 * @param {number} [expectedType] Expected final type (can be several types combined)
 * @return {string} GLSL-compatible output
 */
export function expressionToGlsl(compilationContext: import("../expr/gpu.js").CompilationContext, value: import("../expr/expression.js").EncodedExpression, expectedType?: number): string;
/**
 * Packs all components of a color into a two-floats array
 * @param {import("../color.js").Color|string} color Color as array of numbers or string
 * @return {Array<number>} Vec2 array containing the color in compressed form
 */
export function packColor(color: import("../color.js").Color | string): Array<number>;
/**
 * see https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * @param {Object|string} input The hash input, either an object or string
 * @return {string} Hash (if the object cannot be serialized, it is based on `getUid`)
 */
export function computeHash(input: any | string): string;
/**
 * @typedef {Object} StyleParseResult
 * @property {ShaderBuilder} builder Shader builder pre-configured according to a given style
 * @property {import("../render/webgl/VectorStyleRenderer.js").UniformDefinitions} uniforms Uniform definitions
 * @property {import("../render/webgl/VectorStyleRenderer.js").AttributeDefinitions} attributes Attribute definitions
 */
/**
 * Parses a {@link import("../style/webgl.js").WebGLStyle} object and returns a {@link ShaderBuilder}
 * object that has been configured according to the given style, as well as `attributes` and `uniforms`
 * arrays to be fed to the `WebGLPointsRenderer` class.
 *
 * Also returns `uniforms` and `attributes` properties as expected by the
 * {@link module:ol/renderer/webgl/PointsLayer~WebGLPointsLayerRenderer}.
 *
 * @param {import("../style/webgl.js").WebGLStyle} style Literal style.
 * @param {import('../style/flat.js').StyleVariables} variables Style variables.
 * @return {StyleParseResult} Result containing shader params, attributes and uniforms.
 */
export function parseLiteralStyle(style: import("../style/webgl.js").WebGLStyle, variables: import("../style/flat.js").StyleVariables): StyleParseResult;
export type StyleParseResult = {
    /**
     * Shader builder pre-configured according to a given style
     */
    builder: ShaderBuilder;
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