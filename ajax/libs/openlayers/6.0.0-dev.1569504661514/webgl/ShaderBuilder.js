/**
 * Utilities for generating shaders from literal style objects
 * @module ol/webgl/ShaderBuilder
 */
/**
 * Will return the number as a float with a dot separator, which is required by GLSL.
 * @param {number} v Numerical value.
 * @returns {string} The value as string.
 */
export function formatNumber(v) {
    var s = v.toString();
    return s.indexOf('.') === -1 ? s + '.0' : s;
}
/**
 * Will return the number array as a float with a dot separator, concatenated with ', '.
 * @param {Array<number>} array Numerical values array.
 * @returns {string} The array as string, e. g.: `1.0, 2.0, 3.0`.
 */
export function formatArray(array) {
    return array.map(formatNumber).join(', ');
}
/**
 * Will normalize and converts to string a color array compatible with GLSL.
 * @param {Array<number>} colorArray Color in [r, g, b, a] array form, with RGB components in the
 * 0..255 range and the alpha component in the 0..1 range. Note that if the A component is
 * missing, only 3 values will be output.
 * @returns {string} The color components concatenated in `1.0, 1.0, 1.0, 1.0` form.
 */
export function formatColor(colorArray) {
    return colorArray.map(function (c, i) {
        return i < 3 ? c / 255 : c;
    }).map(formatNumber).join(', ');
}
/**
 * @typedef {Object} VaryingDescription
 * @property {string} name Varying name, as will be declared in the header.
 * @property {string} type Varying type, either `float`, `vec2`, `vec4`...
 * @property {string} expression Expression which will be assigned to the varying in the vertex shader, and
 * passed on to the fragment shader.
 */
/**
 * @typedef {Object} ShaderParameters
 * @property {Array<string>} [uniforms] Uniforms; these will be declared in the header (should include the type).
 * @property {Array<string>} [attributes] Attributes; these will be declared in the header (should include the type).
 * @property {Array<VaryingDescription>} [varyings] Varyings with a name, a type and an expression.
 * @property {string} sizeExpression This will be assigned to a `vec2 size` variable.
 * @property {string} offsetExpression This will be assigned to a `vec2 offset` variable.
 * @property {string} colorExpression This will be the value assigned to gl_FragColor
 * @property {string} texCoordExpression This will be the value assigned to the `vec4 v_texCoord` varying.
 * @property {boolean} [rotateWithView=false] Whether symbols should rotate with view
 */
/**
 * Generates a symbol vertex shader from a set of parameters,
 * intended to be used on point geometries.
 *
 * Three uniforms are hardcoded in all shaders: `u_projectionMatrix`, `u_offsetScaleMatrix` and
 * `u_offsetRotateMatrix`.
 *
 * The following attributes are hardcoded and expected to be present in the vertex buffers:
 * `vec2 a_position`, `float a_index` (being the index of the vertex in the quad, 0 to 3).
 *
 * @param {ShaderParameters} parameters Parameters for the shader.
 * @returns {string} The full shader as a string.
 */
export function getSymbolVertexShader(parameters) {
    var offsetMatrix = parameters.rotateWithView ?
        'u_offsetScaleMatrix * u_offsetRotateMatrix' :
        'u_offsetScaleMatrix';
    var uniforms = parameters.uniforms || [];
    var attributes = parameters.attributes || [];
    var varyings = parameters.varyings || [];
    var body = "precision mediump float;\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\n" + uniforms.map(function (uniform) {
        return 'uniform ' + uniform + ';';
    }).join('\n') + "\nattribute vec2 a_position;\nattribute float a_index;\n" + attributes.map(function (attribute) {
        return 'attribute ' + attribute + ';';
    }).join('\n') + "\nvarying vec2 v_texCoord;\n" + varyings.map(function (varying) {
        return 'varying ' + varying.type + ' ' + varying.name + ';';
    }).join('\n') + "\nvoid main(void) {\n  mat4 offsetMatrix = " + offsetMatrix + ";\n  vec2 size = " + parameters.sizeExpression + ";\n  vec2 offset = " + parameters.offsetExpression + ";\n  float offsetX = a_index == 0.0 || a_index == 3.0 ? offset.x - size.x / 2.0 : offset.x + size.x / 2.0;\n  float offsetY = a_index == 0.0 || a_index == 1.0 ? offset.y - size.y / 2.0 : offset.y + size.y / 2.0;\n  vec4 offsets = offsetMatrix * vec4(offsetX, offsetY, 0.0, 0.0);\n  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n  vec4 texCoord = " + parameters.texCoordExpression + ";\n  float u = a_index == 0.0 || a_index == 3.0 ? texCoord.s : texCoord.q;\n  float v = a_index == 2.0 || a_index == 3.0 ? texCoord.t : texCoord.p;\n  v_texCoord = vec2(u, v);\n" + varyings.map(function (varying) {
        return '  ' + varying.name + ' = ' + varying.expression + ';';
    }).join('\n') + "\n}";
    return body;
}
/**
 * Generates a symbol fragment shader intended to be used on point geometries.
 *
 * Expected the following varyings to be transmitted by the vertex shader:
 * `vec2 v_texCoord`
 *
 * @param {ShaderParameters} parameters Parameters for the shader.
 * @returns {string} The full shader as a string.
 */
export function getSymbolFragmentShader(parameters) {
    var uniforms = parameters.uniforms || [];
    var varyings = parameters.varyings || [];
    var body = "precision mediump float;\n" + uniforms.map(function (uniform) {
        return 'uniform ' + uniform + ';';
    }).join('\n') + "\nvarying vec2 v_texCoord;\n" + varyings.map(function (varying) {
        return 'varying ' + varying.type + ' ' + varying.name + ';';
    }).join('\n') + "\nvoid main(void) {\n  gl_FragColor = " + parameters.colorExpression + ";\n  gl_FragColor.rgb *= gl_FragColor.a;\n}";
    return body;
}
//# sourceMappingURL=ShaderBuilder.js.map