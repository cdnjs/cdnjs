/**
 * Recursively parses a style expression and outputs a GLSL-compatible string. Takes in a compilation context that
 * will be read and modified during the parsing operation.
 * @param {import("../../expr/gpu.js").CompilationContext} compilationContext Compilation context
 * @param {import("../../expr/expression.js").EncodedExpression} value Value
 * @param {number} [expectedType] Expected final type (can be several types combined)
 * @return {string} GLSL-compatible output
 */
export function expressionToGlsl(compilationContext: import("../../expr/gpu.js").CompilationContext, value: import("../../expr/expression.js").EncodedExpression, expectedType?: number): string;
/**
 * Packs all components of a color into a two-floats array
 * @param {import("../../color.js").Color|string} color Color as array of numbers or string
 * @return {Array<number>} Vec2 array containing the color in compressed form
 */
export function packColor(color: import("../../color.js").Color | string): Array<number>;
/**
 * @param {number} type Value type
 * @return {1|2|3|4} The amount of components for this value
 */
export function getGlslSizeFromType(type: number): 1 | 2 | 3 | 4;
/**
 * @param {number} type Value type
 * @return {'float'|'vec2'|'vec3'|'vec4'} The corresponding GLSL type for this value
 */
export function getGlslTypeFromType(type: number): "float" | "vec2" | "vec3" | "vec4";
/**
 * Applies the properties and variables collected in a compilation context to a ShaderBuilder instance:
 * properties will show up as attributes in shaders, and variables will show up as uniforms.
 * @param {import("./ShaderBuilder.js").ShaderBuilder} builder Shader builder
 * @param {import("../../expr/gpu.js").CompilationContext} context Compilation context
 */
export function applyContextToBuilder(builder: import("./ShaderBuilder.js").ShaderBuilder, context: import("../../expr/gpu.js").CompilationContext): void;
/**
 * Generates a set of uniforms from variables collected in a compilation context,
 * to be fed to a WebGLHelper instance
 * @param {import("../../expr/gpu.js").CompilationContext} context Compilation context
 * @param {import('../../style/flat.js').StyleVariables} [variables] Style variables.
 * @return {Object<string,import("../../webgl/Helper").UniformValue>} Uniforms
 */
export function generateUniformsFromContext(context: import("../../expr/gpu.js").CompilationContext, variables?: import("../../style/flat.js").StyleVariables): {
    [x: string]: import("../../webgl/Helper").UniformValue;
};
/**
 * Generates a set of attributes from properties collected in a compilation context,
 * to be fed to a WebGLHelper instance
 * @param {import("../../expr/gpu.js").CompilationContext} context Compilation context
 * @return {import('./VectorStyleRenderer.js').AttributeDefinitions} Attributes
 */
export function generateAttributesFromContext(context: import("../../expr/gpu.js").CompilationContext): import("./VectorStyleRenderer.js").AttributeDefinitions;
export const UNPACK_COLOR_FN: "vec4 unpackColor(vec2 packedColor) {\n  return vec4(\n    fract(floor(packedColor[0] / 256.0) / 256.0),\n    fract(packedColor[0] / 256.0),\n    fract(floor(packedColor[1] / 256.0) / 256.0),\n    fract(packedColor[1] / 256.0)\n  );\n}";
//# sourceMappingURL=compileUtil.d.ts.map