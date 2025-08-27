export const COMMON_HEADER: "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_screenToWorldMatrix;\nuniform vec2 u_viewportSizePx;\nuniform float u_pixelRatio;\nuniform float u_globalAlpha;\nuniform float u_time;\nuniform float u_zoom;\nuniform float u_resolution;\nuniform float u_rotation;\nuniform vec4 u_renderExtent;\nuniform vec2 u_patternOrigin;\nuniform float u_depth;\nuniform mediump int u_hitDetection;\n\nconst float PI = 3.141592653589793238;\nconst float TWO_PI = 2.0 * PI;\nfloat currentLineMetric = 0.; // an actual value will be used in the stroke shaders\n\nvec4 unpackColor(vec2 packedColor) {\n  return vec4(\n    min(floor(packedColor[0] / 256.0) / 255.0, 1.0),\n    min(mod(packedColor[0], 256.0) / 255.0, 1.0),\n    min(floor(packedColor[1] / 256.0) / 255.0, 1.0),\n    min(mod(packedColor[1], 256.0) / 255.0, 1.0)\n  );\n}\n";
/**
 * @typedef {Object} AttributeDescription
 * @property {string} name Attribute name, as will be declared in the header of the vertex shader (including a_)
 * @property {string} type Attribute GLSL type, either `float`, `vec2`, `vec4`...
 * @property {string} varyingName Varying name, as will be declared in the header of both shaders (including v_)
 * @property {string} varyingType Varying type, either `float`, `vec2`, `vec4`...
 * @property {string} varyingExpression GLSL expression to assign to the varying in the vertex shader (e.g. `unpackColor(a_myAttr)`)
 */
/**
 * @typedef {Object} UniformDescription
 * @property {string} name Uniform name, as will be declared in the header of the vertex shader (including u_)
 * @property {string} type Uniform GLSL type, either `float`, `vec2`, `vec4`...
 */
/**
 * @classdesc
 * This class implements a classic builder pattern for generating many different types of shaders.
 * Methods can be chained, e. g.:
 *
 * ```js
 * const shader = new ShaderBuilder()
 *   .addAttribute('a_width', 'float')
 *   .addUniform('u_time', 'float)
 *   .setColorExpression('...')
 *   .setSymbolSizeExpression('...')
 *   .getSymbolFragmentShader();
 * ```
 *
 * A note on [alpha premultiplication](https://en.wikipedia.org/wiki/Alpha_compositing#Straight_versus_premultiplied):
 * The ShaderBuilder class expects all colors to **not having been alpha-premultiplied!** This is because alpha
 * premultiplication is done at the end of each fragment shader.
 */
export class ShaderBuilder {
    /**
     * Uniforms; these will be declared in the header (should include the type).
     * @type {Array<UniformDescription>}
     * @private
     */
    private uniforms_;
    /**
     * Attributes; these will be declared in the header (should include the type).
     * @type {Array<AttributeDescription>}
     * @private
     */
    private attributes_;
    /**
     * @type {boolean}
     * @private
     */
    private hasSymbol_;
    /**
     * @type {string}
     * @private
     */
    private symbolSizeExpression_;
    /**
     * @type {string}
     * @private
     */
    private symbolRotationExpression_;
    /**
     * @type {string}
     * @private
     */
    private symbolOffsetExpression_;
    /**
     * @type {string}
     * @private
     */
    private symbolColorExpression_;
    /**
     * @type {string}
     * @private
     */
    private texCoordExpression_;
    /**
     * @type {string}
     * @private
     */
    private discardExpression_;
    /**
     * @type {boolean}
     * @private
     */
    private symbolRotateWithView_;
    /**
     * @type {boolean}
     * @private
     */
    private hasStroke_;
    /**
     * @type {string}
     * @private
     */
    private strokeWidthExpression_;
    /**
     * @type {string}
     * @private
     */
    private strokeColorExpression_;
    /**
     * @private
     */
    private strokeOffsetExpression_;
    /**
     * @private
     */
    private strokeCapExpression_;
    /**
     * @private
     */
    private strokeJoinExpression_;
    /**
     * @private
     */
    private strokeMiterLimitExpression_;
    /**
     * @private
     */
    private strokeDistanceFieldExpression_;
    /**
     * @private
     * @type {string}
     */
    private strokePatternLengthExpression_;
    /**
     * @type {boolean}
     * @private
     */
    private hasFill_;
    /**
     * @type {string}
     * @private
     */
    private fillColorExpression_;
    /**
     * @type {Array<string>}
     * @private
     */
    private vertexShaderFunctions_;
    /**
     * @type {Array<string>}
     * @private
     */
    private fragmentShaderFunctions_;
    /**
     * Adds a uniform accessible in both fragment and vertex shaders.
     * The given name should include a type, such as `sampler2D u_texture`.
     * @param {string} name Uniform name, including the `u_` prefix
     * @param {'float'|'vec2'|'vec3'|'vec4'|'sampler2D'} type GLSL type
     * @return {ShaderBuilder} the builder object
     */
    addUniform(name: string, type: "float" | "vec2" | "vec3" | "vec4" | "sampler2D"): ShaderBuilder;
    /**
     * Adds an attribute accessible in the vertex shader, read from the geometry buffer.
     * The given name should include a type, such as `vec2 a_position`.
     * Attributes will also be made available under the same name in fragment shaders.
     * @param {string} name Attribute name, including the `a_` prefix
     * @param {'float'|'vec2'|'vec3'|'vec4'} type GLSL type
     * @param {string} [varyingExpression] Expression which will be assigned to the varying in the vertex shader, and
     * passed on to the fragment shader.
     * @param {'float'|'vec2'|'vec3'|'vec4'} [varyingType] Type of the attribute after transformation;
     * e.g. `vec4` after unpacking color components
     * @return {ShaderBuilder} the builder object
     */
    addAttribute(name: string, type: "float" | "vec2" | "vec3" | "vec4", varyingExpression?: string, varyingType?: "float" | "vec2" | "vec3" | "vec4"): ShaderBuilder;
    /**
     * Sets an expression to compute the size of the shape.
     * This expression can use all the uniforms and attributes available
     * in the vertex shader, and should evaluate to a `vec2` value.
     * @param {string} expression Size expression
     * @return {ShaderBuilder} the builder object
     */
    setSymbolSizeExpression(expression: string): ShaderBuilder;
    /**
     * @return {string} The current symbol size expression
     */
    getSymbolSizeExpression(): string;
    /**
     * Sets an expression to compute the rotation of the shape.
     * This expression can use all the uniforms and attributes available
     * in the vertex shader, and should evaluate to a `float` value in radians.
     * @param {string} expression Size expression
     * @return {ShaderBuilder} the builder object
     */
    setSymbolRotationExpression(expression: string): ShaderBuilder;
    /**
     * Sets an expression to compute the offset of the symbol from the point center.
     * This expression can use all the uniforms and attributes available
     * in the vertex shader, and should evaluate to a `vec2` value.
     * @param {string} expression Offset expression
     * @return {ShaderBuilder} the builder object
     */
    setSymbolOffsetExpression(expression: string): ShaderBuilder;
    /**
     * @return {string} The current symbol offset expression
     */
    getSymbolOffsetExpression(): string;
    /**
     * Sets an expression to compute the color of the shape.
     * This expression can use all the uniforms, varyings and attributes available
     * in the fragment shader, and should evaluate to a `vec4` value.
     * @param {string} expression Color expression
     * @return {ShaderBuilder} the builder object
     */
    setSymbolColorExpression(expression: string): ShaderBuilder;
    /**
     * @return {string} The current symbol color expression
     */
    getSymbolColorExpression(): string;
    /**
     * Sets an expression to compute the texture coordinates of the vertices.
     * This expression can use all the uniforms and attributes available
     * in the vertex shader, and should evaluate to a `vec4` value.
     * @param {string} expression Texture coordinate expression
     * @return {ShaderBuilder} the builder object
     */
    setTextureCoordinateExpression(expression: string): ShaderBuilder;
    /**
     * Sets an expression to determine whether a fragment (pixel) should be discarded,
     * i.e. not drawn at all.
     * This expression can use all the uniforms, varyings and attributes available
     * in the fragment shader, and should evaluate to a `bool` value (it will be
     * used in an `if` statement)
     * @param {string} expression Fragment discard expression
     * @return {ShaderBuilder} the builder object
     */
    setFragmentDiscardExpression(expression: string): ShaderBuilder;
    /**
     * @return {string} The current fragment discard expression
     */
    getFragmentDiscardExpression(): string;
    /**
     * Sets whether the symbols should rotate with the view or stay aligned with the map.
     * Note: will only be used for point geometry shaders.
     * @param {boolean} rotateWithView Rotate with view
     * @return {ShaderBuilder} the builder object
     */
    setSymbolRotateWithView(rotateWithView: boolean): ShaderBuilder;
    /**
     * @param {string} expression Stroke width expression, returning value in pixels
     * @return {ShaderBuilder} the builder object
     */
    setStrokeWidthExpression(expression: string): ShaderBuilder;
    /**
     * @param {string} expression Stroke color expression, evaluate to `vec4`: can rely on currentLengthPx and currentRadiusPx
     * @return {ShaderBuilder} the builder object
     */
    setStrokeColorExpression(expression: string): ShaderBuilder;
    /**
     * @return {string} The current stroke color expression
     */
    getStrokeColorExpression(): string;
    /**
     * @param {string} expression Stroke color expression, evaluate to `float`
     * @return {ShaderBuilder} the builder object
     */
    setStrokeOffsetExpression(expression: string): ShaderBuilder;
    /**
     * @param {string} expression Stroke line cap expression, evaluate to `float`
     * @return {ShaderBuilder} the builder object
     */
    setStrokeCapExpression(expression: string): ShaderBuilder;
    /**
     * @param {string} expression Stroke line join expression, evaluate to `float`
     * @return {ShaderBuilder} the builder object
     */
    setStrokeJoinExpression(expression: string): ShaderBuilder;
    /**
     * @param {string} expression Stroke miter limit expression, evaluate to `float`
     * @return {ShaderBuilder} the builder object
     */
    setStrokeMiterLimitExpression(expression: string): ShaderBuilder;
    /**
     * @param {string} expression Stroke distance field expression, evaluate to `float`
     * This can override the default distance field; can rely on currentLengthPx and currentRadiusPx
     * @return {ShaderBuilder} the builder object
     */
    setStrokeDistanceFieldExpression(expression: string): ShaderBuilder;
    /**
     * Defining a pattern length for a stroke lets us avoid having visual artifacts when
     * a linestring is very long and thus has very high "distance" attributes on its vertices.
     * If we apply a pattern or dash array to a stroke we know for certain that the full distance value
     * is not necessary and can be trimmed down using `mod(currentDistance, patternLength)`.
     * @param {string} expression Stroke expression that evaluates to a`float; value is expected to be
     * in pixels.
     * @return {ShaderBuilder} the builder object
     */
    setStrokePatternLengthExpression(expression: string): ShaderBuilder;
    /**
     * @return {string} The current stroke pattern length expression.
     */
    getStrokePatternLengthExpression(): string;
    /**
     * @param {string} expression Fill color expression, evaluate to `vec4`
     * @return {ShaderBuilder} the builder object
     */
    setFillColorExpression(expression: string): ShaderBuilder;
    /**
     * @return {string} The current fill color expression
     */
    getFillColorExpression(): string;
    addVertexShaderFunction(code: any): this;
    addFragmentShaderFunction(code: any): this;
    /**
     * Generates a symbol vertex shader from the builder parameters
     * @return {string|null} The full shader as a string; null if no size or color specified
     */
    getSymbolVertexShader(): string | null;
    /**
     * Generates a symbol fragment shader from the builder parameters
     * @return {string|null} The full shader as a string; null if no size or color specified
     */
    getSymbolFragmentShader(): string | null;
    /**
     * Generates a stroke vertex shader from the builder parameters
     * @return {string|null} The full shader as a string; null if no size or color specified
     */
    getStrokeVertexShader(): string | null;
    /**
     * Generates a stroke fragment shader from the builder parameters
     *
     * @return {string|null} The full shader as a string; null if no size or color specified
     */
    getStrokeFragmentShader(): string | null;
    /**
     * Generates a fill vertex shader from the builder parameters
     *
     * @return {string|null} The full shader as a string; null if no color specified
     */
    getFillVertexShader(): string | null;
    /**
     * Generates a fill fragment shader from the builder parameters
     * @return {string|null} The full shader as a string; null if no color specified
     */
    getFillFragmentShader(): string | null;
}
export type AttributeDescription = {
    /**
     * Attribute name, as will be declared in the header of the vertex shader (including a_)
     */
    name: string;
    /**
     * Attribute GLSL type, either `float`, `vec2`, `vec4`...
     */
    type: string;
    /**
     * Varying name, as will be declared in the header of both shaders (including v_)
     */
    varyingName: string;
    /**
     * Varying type, either `float`, `vec2`, `vec4`...
     */
    varyingType: string;
    /**
     * GLSL expression to assign to the varying in the vertex shader (e.g. `unpackColor(a_myAttr)`)
     */
    varyingExpression: string;
};
export type UniformDescription = {
    /**
     * Uniform name, as will be declared in the header of the vertex shader (including u_)
     */
    name: string;
    /**
     * Uniform GLSL type, either `float`, `vec2`, `vec4`...
     */
    type: string;
};
//# sourceMappingURL=ShaderBuilder.d.ts.map