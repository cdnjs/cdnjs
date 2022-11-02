/**
 * @typedef {Object} StyleParseResult
 * @property {ShaderBuilder} builder Shader builder pre-configured according to a given style
 * @property {Object<string,import("./Helper").UniformValue>} uniforms Uniform definitions.
 * @property {Array<import("../renderer/webgl/PointsLayer").CustomAttribute>} attributes Attribute descriptions.
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
export function parseLiteralStyle(style: import("../style/literal.js").LiteralStyle): StyleParseResult;
/**
 * @typedef {Object} VaryingDescription
 * @property {string} name Varying name, as will be declared in the header.
 * @property {string} type Varying type, either `float`, `vec2`, `vec4`...
 * @property {string} expression Expression which will be assigned to the varying in the vertex shader, and
 * passed on to the fragment shader.
 */
/**
 * @classdesc
 * This class implements a classic builder pattern for generating many different types of shaders.
 * Methods can be chained, e. g.:
 *
 * ```js
 * const shader = new ShaderBuilder()
 *   .addVarying('v_width', 'float', 'a_width')
 *   .addUniform('u_time')
 *   .setColorExpression('...')
 *   .setSizeExpression('...')
 *   .outputSymbolFragmentShader();
 * ```
 */
export class ShaderBuilder {
    /**
     * Uniforms; these will be declared in the header (should include the type).
     * @type {Array<string>}
     * @private
     */
    private uniforms;
    /**
     * Attributes; these will be declared in the header (should include the type).
     * @type {Array<string>}
     * @private
     */
    private attributes;
    /**
     * Varyings with a name, a type and an expression.
     * @type {Array<VaryingDescription>}
     * @private
     */
    private varyings;
    /**
     * @type {string}
     * @private
     */
    private sizeExpression;
    /**
     * @type {string}
     * @private
     */
    private rotationExpression;
    /**
     * @type {string}
     * @private
     */
    private offsetExpression;
    /**
     * @type {string}
     * @private
     */
    private colorExpression;
    /**
     * @type {string}
     * @private
     */
    private texCoordExpression;
    /**
     * @type {string}
     * @private
     */
    private discardExpression;
    /**
     * @type {boolean}
     * @private
     */
    private rotateWithView;
    /**
     * Adds a uniform accessible in both fragment and vertex shaders.
     * The given name should include a type, such as `sampler2D u_texture`.
     * @param {string} name Uniform name
     * @return {ShaderBuilder} the builder object
     */
    addUniform(name: string): ShaderBuilder;
    /**
     * Adds an attribute accessible in the vertex shader, read from the geometry buffer.
     * The given name should include a type, such as `vec2 a_position`.
     * @param {string} name Attribute name
     * @return {ShaderBuilder} the builder object
     */
    addAttribute(name: string): ShaderBuilder;
    /**
     * Adds a varying defined in the vertex shader and accessible from the fragment shader.
     * The type and expression of the varying have to be specified separately.
     * @param {string} name Varying name
     * @param {'float'|'vec2'|'vec3'|'vec4'} type Type
     * @param {string} expression Expression used to assign a value to the varying.
     * @return {ShaderBuilder} the builder object
     */
    addVarying(name: string, type: "float" | "vec2" | "vec3" | "vec4", expression: string): ShaderBuilder;
    /**
     * Sets an expression to compute the size of the shape.
     * This expression can use all the uniforms and attributes available
     * in the vertex shader, and should evaluate to a `vec2` value.
     * @param {string} expression Size expression
     * @return {ShaderBuilder} the builder object
     */
    setSizeExpression(expression: string): ShaderBuilder;
    /**
     * Sets an expression to compute the rotation of the shape.
     * This expression can use all the uniforms and attributes available
     * in the vertex shader, and should evaluate to a `float` value in radians.
     * @param {string} expression Size expression
     * @return {ShaderBuilder} the builder object
     */
    setRotationExpression(expression: string): ShaderBuilder;
    /**
     * Sets an expression to compute the offset of the symbol from the point center.
     * This expression can use all the uniforms and attributes available
     * in the vertex shader, and should evaluate to a `vec2` value.
     * Note: will only be used for point geometry shaders.
     * @param {string} expression Offset expression
     * @return {ShaderBuilder} the builder object
     */
    setSymbolOffsetExpression(expression: string): ShaderBuilder;
    /**
     * Sets an expression to compute the color of the shape.
     * This expression can use all the uniforms, varyings and attributes available
     * in the fragment shader, and should evaluate to a `vec4` value.
     * @param {string} expression Color expression
     * @return {ShaderBuilder} the builder object
     */
    setColorExpression(expression: string): ShaderBuilder;
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
     * Sets whether the symbols should rotate with the view or stay aligned with the map.
     * Note: will only be used for point geometry shaders.
     * @param {boolean} rotateWithView Rotate with view
     * @return {ShaderBuilder} the builder object
     */
    setSymbolRotateWithView(rotateWithView: boolean): ShaderBuilder;
    /**
     * @return {string} Previously set size expression
     */
    getSizeExpression(): string;
    /**
     * @return {string} Previously set symbol offset expression
     */
    getOffsetExpression(): string;
    /**
     * @return {string} Previously set color expression
     */
    getColorExpression(): string;
    /**
     * @return {string} Previously set texture coordinate expression
     */
    getTextureCoordinateExpression(): string;
    /**
     * @return {string} Previously set fragment discard expression
     */
    getFragmentDiscardExpression(): string;
    /**
     * Generates a symbol vertex shader from the builder parameters,
     * intended to be used on point geometries.
     *
     * Three uniforms are hardcoded in all shaders: `u_projectionMatrix`, `u_offsetScaleMatrix`,
     * `u_offsetRotateMatrix`, `u_time`.
     *
     * The following attributes are hardcoded and expected to be present in the vertex buffers:
     * `vec2 a_position`, `float a_index` (being the index of the vertex in the quad, 0 to 3).
     *
     * The following varyings are hardcoded and gives the coordinate of the pixel both in the quad and on the texture:
     * `vec2 v_quadCoord`, `vec2 v_texCoord`
     *
     * @param {boolean} [forHitDetection] If true, the shader will be modified to include hit detection variables
     * (namely, hit color with encoded feature id).
     * @return {string} The full shader as a string.
     */
    getSymbolVertexShader(forHitDetection?: boolean | undefined): string;
    /**
     * Generates a symbol fragment shader from the builder parameters,
     * intended to be used on point geometries.
     *
     * Expects the following varyings to be transmitted by the vertex shader:
     * `vec2 v_quadCoord`, `vec2 v_texCoord`
     *
     * @param {boolean} [forHitDetection] If true, the shader will be modified to include hit detection variables
     * (namely, hit color with encoded feature id).
     * @return {string} The full shader as a string.
     */
    getSymbolFragmentShader(forHitDetection?: boolean | undefined): string;
}
export type StyleParseResult = {
    /**
     * Shader builder pre-configured according to a given style
     */
    builder: ShaderBuilder;
    /**
     * Uniform definitions.
     */
    uniforms: {
        [x: string]: number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData | ((arg0: import("../PluggableMap.js").FrameState) => number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData);
    };
    /**
     * Attribute descriptions.
     */
    attributes: import("../renderer/webgl/PointsLayer.js").CustomAttribute[];
};
export type VaryingDescription = {
    /**
     * Varying name, as will be declared in the header.
     */
    name: string;
    /**
     * Varying type, either `float`, `vec2`, `vec4`...
     */
    type: string;
    /**
     * Expression which will be assigned to the varying in the vertex shader, and
     * passed on to the fragment shader.
     */
    expression: string;
};
//# sourceMappingURL=ShaderBuilder.d.ts.map