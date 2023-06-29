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
 *   .setSymbolSizeExpression('...')
 *   .outputSymbolFragmentShader();
 * ```
 */
export class ShaderBuilder {
    /**
     * Uniforms; these will be declared in the header (should include the type).
     * @type {Array<string>}
     * @private
     */
    private uniforms_;
    /**
     * Attributes; these will be declared in the header (should include the type).
     * @type {Array<string>}
     * @private
     */
    private attributes_;
    /**
     * Varyings with a name, a type and an expression.
     * @type {Array<VaryingDescription>}
     * @private
     */
    private varyings_;
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
    addVarying(name: string, type: 'float' | 'vec2' | 'vec3' | 'vec4', expression: string): ShaderBuilder;
    /**
     * Sets an expression to compute the size of the shape.
     * This expression can use all the uniforms and attributes available
     * in the vertex shader, and should evaluate to a `vec2` value.
     * @param {string} expression Size expression
     * @return {ShaderBuilder} the builder object
     */
    setSymbolSizeExpression(expression: string): ShaderBuilder;
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
    setSymbolColorExpression(expression: string): ShaderBuilder;
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
     * @param {string} expression Stroke width expression, returning value in pixels
     * @return {ShaderBuilder} the builder object
     */
    setStrokeWidthExpression(expression: string): ShaderBuilder;
    setStrokeColorExpression(expression: any): ShaderBuilder;
    setFillColorExpression(expression: any): ShaderBuilder;
    addVertexShaderFunction(code: any): void;
    addFragmentShaderFunction(code: any): void;
    /**
     * Generates a symbol vertex shader from the builder parameters
     *
     * Four uniforms are hardcoded in all shaders: `u_projectionMatrix`, `u_offsetScaleMatrix`,
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
     * Generates a symbol fragment shader from the builder parameters
     *
     * Expects the following varyings to be transmitted by the vertex shader:
     * `vec2 v_quadCoord`, `vec2 v_texCoord`
     *
     * @param {boolean} [forHitDetection] If true, the shader will be modified to include hit detection variables
     * (namely, hit color with encoded feature id).
     * @return {string} The full shader as a string.
     */
    getSymbolFragmentShader(forHitDetection?: boolean | undefined): string;
    /**
     * Generates a stroke vertex shader from the builder parameters
     *
     * @param {boolean} [forHitDetection] If true, the shader will be modified to include hit detection variables
     * (namely, hit color with encoded feature id).
     * @return {string} The full shader as a string.
     */
    getStrokeVertexShader(forHitDetection?: boolean | undefined): string;
    /**
     * Generates a stroke fragment shader from the builder parameters
     *
     * @param {boolean} [forHitDetection] If true, the shader will be modified to include hit detection variables
     * (namely, hit color with encoded feature id).
     * @return {string} The full shader as a string.
     */
    getStrokeFragmentShader(forHitDetection?: boolean | undefined): string;
    /**
     * Generates a fill vertex shader from the builder parameters
     *
     * @param {boolean} [forHitDetection] If true, the shader will be modified to include hit detection variables
     * (namely, hit color with encoded feature id).
     * @return {string} The full shader as a string.
     */
    getFillVertexShader(forHitDetection?: boolean | undefined): string;
    /**
     * Generates a fill fragment shader from the builder parameters
     *
     * @param {boolean} [forHitDetection] If true, the shader will be modified to include hit detection variables
     * (namely, hit color with encoded feature id).
     * @return {string} The full shader as a string.
     */
    getFillFragmentShader(forHitDetection?: boolean | undefined): string;
}
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