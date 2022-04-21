var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/renderer/webgl/PointsLayer
 */
import LayerRenderer from '../Layer';
import WebGLArrayBuffer from '../../webgl/Buffer';
import { DYNAMIC_DRAW, ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER, FLOAT } from '../../webgl';
import WebGLHelper, { DefaultAttrib } from '../../webgl/Helper';
import GeometryType from '../../geom/GeometryType';
var VERTEX_SHADER = "\n  precision mediump float;\n  attribute vec2 a_position;\n  attribute vec2 a_texCoord;\n  attribute float a_rotateWithView;\n  attribute vec2 a_offsets;\n  attribute float a_opacity;\n  attribute vec4 a_color;\n  \n  uniform mat4 u_projectionMatrix;\n  uniform mat4 u_offsetScaleMatrix;\n  uniform mat4 u_offsetRotateMatrix;\n  \n  varying vec2 v_texCoord;\n  varying float v_opacity;\n  varying vec4 v_color;\n  \n  void main(void) {\n    mat4 offsetMatrix = u_offsetScaleMatrix;\n    if (a_rotateWithView == 1.0) {\n      offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n    }\n    vec4 offsets = offsetMatrix * vec4(a_offsets, 0.0, 0.0);\n    gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n    v_texCoord = a_texCoord;\n    v_opacity = a_opacity;\n    v_color = a_color;\n  }";
var FRAGMENT_SHADER = "\n  precision mediump float;\n  \n  uniform sampler2D u_texture;\n\n  varying vec2 v_texCoord;\n  varying float v_opacity;\n  varying vec4 v_color;\n  \n  void main(void) {\n    if (v_opacity == 0.0) {\n      discard;\n    }\n    vec4 textureColor = texture2D(u_texture, v_texCoord);\n    gl_FragColor = v_color * textureColor;\n    gl_FragColor.a *= v_opacity;\n    gl_FragColor.rgb *= gl_FragColor.a;\n  }";
/**
 * @typedef {Object} PostProcessesOptions
 * @property {number} [scaleRatio] Scale ratio; if < 1, the post process will render to a texture smaller than
 * the main canvas that will then be sampled up (useful for saving resource on blur steps).
 * @property {string} [vertexShader] Vertex shader source
 * @property {string} [fragmentShader] Fragment shader source
 * @property {Object.<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process step
 */
/**
 * @typedef {Object} Options
 * @property {function(import("../../Feature").default):number} [sizeCallback] Will be called on every feature in the
 * source to compute the size of the quad on screen (in pixels). This is only done on source change.
 * @property {function(import("../../Feature").default, number):number} [coordCallback] Will be called on every feature in the
 * source to compute the coordinate of the quad center on screen (in pixels). This is only done on source change.
 * The second argument is 0 for `x` component and 1 for `y`.
 * @property {function(import("../../Feature").default, number):number} [texCoordCallback] Will be called on every feature in the
 * source to compute the texture coordinates of each corner of the quad (without effect if no `texture` option defined). This is only done on source change.
 * The second argument is 0 for `u0` component, 1 for `v0`, 2 for `u1`, and 3 for `v1`.
 * @property {function(import("../../Feature").default, number, number):number} [colorCallback] Will be called on every feature in the
 * source to compute the color of each corner of the quad. This is only done on source change.
 * The second argument is 0 for bottom left, 1 for bottom right, 2 for top right and 3 for top left
 * The third argument is 0 for red, 1 for green, 2 for blue and 3 for alpha
 * The return value should be between 0 and 1.
 * @property {function(import("../../Feature").default):number} [opacityCallback] Will be called on every feature in the
 * source to compute the opacity of the quad on screen (from 0 to 1). This is only done on source change.
 * Note: this is multiplied with the color of the point which can also have an alpha value < 1.
 * @property {function(import("../../Feature").default):boolean} [rotateWithViewCallback] Will be called on every feature in the
 * source to compute whether the quad on screen must stay upwards (`false`) or follow the view rotation (`true`).
 * This is only done on source change.
 * @property {HTMLCanvasElement|HTMLImageElement|ImageData} [texture] Texture to use on points. `texCoordCallback` and `sizeCallback`
 * must be defined for this to have any effect.
 * @property {string} [vertexShader] Vertex shader source
 * @property {string} [fragmentShader] Fragment shader source
 * @property {Object.<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * Please note that `u_texture` is reserved for the main texture slot.
 * @property {Array<PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * WebGL vector renderer optimized for points.
 * All features will be rendered as quads (two triangles forming a square). New data will be flushed to the GPU
 * every time the vector source changes.
 *
 * Use shaders to customize the final output. The following attributes are available:
 * * `vec2 a_position`
 * * `vec2 a_texCoord`
 * * `vec2 a_offsets`
 * * `float a_rotateWithView`
 * * `float a_opacity`
 * * `float a_color`
 *
 * The following uniform is used for the main texture: `u_texture`.
 *
 * Please note that the main shader output should have premultiplied alpha, otherwise visual anomalies may occur.
 *
 * Points are rendered as quads with the following structure:
 *
 *   (u0, v1)      (u1, v1)
 *  [3]----------[2]
 *   |`           |
 *   |  `         |
 *   |    `       |
 *   |      `     |
 *   |        `   |
 *   |          ` |
 *  [0]----------[1]
 *   (u0, v0)      (u1, v0)
 *
 * This uses {@link module:ol/webgl/Helper~WebGLHelper} internally.
 *
 * Default shaders are shown hereafter:
 *
 * * Vertex shader:
 *   ```
 *   precision mediump float;
 *
 *   attribute vec2 a_position;
 *   attribute vec2 a_texCoord;
 *   attribute float a_rotateWithView;
 *   attribute vec2 a_offsets;
 *   attribute float a_opacity;
 *   attribute vec4 a_color;
 *
 *   uniform mat4 u_projectionMatrix;
 *   uniform mat4 u_offsetScaleMatrix;
 *   uniform mat4 u_offsetRotateMatrix;
 *
 *   varying vec2 v_texCoord;
 *   varying float v_opacity;
 *   varying vec4 v_color;
 *
 *   void main(void) {
 *     mat4 offsetMatrix = u_offsetScaleMatrix;
 *     if (a_rotateWithView == 1.0) {
 *       offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;
 *     }
 *     vec4 offsets = offsetMatrix * vec4(a_offsets, 0.0, 0.0);
 *     gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;
 *     v_texCoord = a_texCoord;
 *     v_opacity = a_opacity;
 *     v_color = a_color;
 *   }
 *   ```
 *
 * * Fragment shader:
 *   ```
 *   precision mediump float;
 *
 *   uniform sampler2D u_texture;
 *
 *   varying vec2 v_texCoord;
 *   varying float v_opacity;
 *   varying vec4 v_color;
 *
 *   void main(void) {
 *     if (v_opacity == 0.0) {
 *       discard;
 *     }
 *     vec4 textureColor = texture2D(u_texture, v_texCoord);
 *     gl_FragColor = v_color * textureColor;
 *     gl_FragColor.a *= v_opacity;
 *     gl_FragColor.rgb *= gl_FragColor.a;
 *   }
 *   ```
 *
 * @api
 */
var WebGLPointsLayerRenderer = /** @class */ (function (_super) {
    __extends(WebGLPointsLayerRenderer, _super);
    /**
     * @param {import("../../layer/Vector.js").default} vectorLayer Vector layer.
     * @param {Options=} [opt_options] Options.
     */
    function WebGLPointsLayerRenderer(vectorLayer, opt_options) {
        var _this = _super.call(this, vectorLayer) || this;
        var options = opt_options || {};
        var uniforms = options.uniforms || {};
        uniforms.u_texture = options.texture || _this.getDefaultTexture();
        _this.helper_ = new WebGLHelper({
            postProcesses: options.postProcesses,
            uniforms: uniforms
        });
        _this.sourceRevision_ = -1;
        _this.verticesBuffer_ = new WebGLArrayBuffer([], DYNAMIC_DRAW);
        _this.indicesBuffer_ = new WebGLArrayBuffer([], DYNAMIC_DRAW);
        _this.program_ = _this.helper_.getProgram(options.fragmentShader || FRAGMENT_SHADER, options.vertexShader || VERTEX_SHADER);
        _this.helper_.useProgram(_this.program_);
        _this.sizeCallback_ = options.sizeCallback || function () {
            return 1;
        };
        _this.coordCallback_ = options.coordCallback || function (feature, index) {
            var geom = /** @type {import("../../geom/Point").default} */ (feature.getGeometry());
            return geom.getCoordinates()[index];
        };
        _this.opacityCallback_ = options.opacityCallback || function () {
            return 1;
        };
        _this.texCoordCallback_ = options.texCoordCallback || function (feature, index) {
            return index < 2 ? 0 : 1;
        };
        _this.colorCallback_ = options.colorCallback || function (feature, index, component) {
            return 1;
        };
        _this.rotateWithViewCallback_ = options.rotateWithViewCallback || function () {
            return false;
        };
        return _this;
    }
    /**
     * @inheritDoc
     */
    WebGLPointsLayerRenderer.prototype.disposeInternal = function () {
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * @inheritDoc
     */
    WebGLPointsLayerRenderer.prototype.renderFrame = function (frameState, layerState) {
        this.helper_.drawElements(0, this.indicesBuffer_.getArray().length);
        this.helper_.finalizeDraw(frameState);
        var canvas = this.helper_.getCanvas();
        var opacity = layerState.opacity;
        if (opacity !== parseFloat(canvas.style.opacity)) {
            canvas.style.opacity = opacity;
        }
        return canvas;
    };
    /**
     * @inheritDoc
     */
    WebGLPointsLayerRenderer.prototype.prepareFrame = function (frameState) {
        var _this = this;
        var vectorLayer = /** @type {import("../../layer/Vector.js").default} */ (this.getLayer());
        var vectorSource = vectorLayer.getSource();
        var stride = 12;
        this.helper_.prepareDraw(frameState);
        if (this.sourceRevision_ < vectorSource.getRevision()) {
            this.sourceRevision_ = vectorSource.getRevision();
            this.verticesBuffer_.getArray().length = 0;
            this.indicesBuffer_.getArray().length = 0;
            var viewState = frameState.viewState;
            var projection = viewState.projection;
            var resolution = viewState.resolution;
            // loop on features to fill the buffer
            vectorSource.loadFeatures([-Infinity, -Infinity, Infinity, Infinity], resolution, projection);
            vectorSource.forEachFeature(function (feature) {
                if (!feature.getGeometry() || feature.getGeometry().getType() !== GeometryType.POINT) {
                    return;
                }
                var x = _this.coordCallback_(feature, 0);
                var y = _this.coordCallback_(feature, 1);
                var u0 = _this.texCoordCallback_(feature, 0);
                var v0 = _this.texCoordCallback_(feature, 1);
                var u1 = _this.texCoordCallback_(feature, 2);
                var v1 = _this.texCoordCallback_(feature, 3);
                var size = _this.sizeCallback_(feature);
                var opacity = _this.opacityCallback_(feature);
                var rotateWithView = _this.rotateWithViewCallback_(feature) ? 1 : 0;
                var v0_r = _this.colorCallback_(feature, 0, 0);
                var v0_g = _this.colorCallback_(feature, 0, 1);
                var v0_b = _this.colorCallback_(feature, 0, 2);
                var v0_a = _this.colorCallback_(feature, 0, 3);
                var v1_r = _this.colorCallback_(feature, 1, 0);
                var v1_g = _this.colorCallback_(feature, 1, 1);
                var v1_b = _this.colorCallback_(feature, 1, 2);
                var v1_a = _this.colorCallback_(feature, 1, 3);
                var v2_r = _this.colorCallback_(feature, 2, 0);
                var v2_g = _this.colorCallback_(feature, 2, 1);
                var v2_b = _this.colorCallback_(feature, 2, 2);
                var v2_a = _this.colorCallback_(feature, 2, 3);
                var v3_r = _this.colorCallback_(feature, 3, 0);
                var v3_g = _this.colorCallback_(feature, 3, 1);
                var v3_b = _this.colorCallback_(feature, 3, 2);
                var v3_a = _this.colorCallback_(feature, 3, 3);
                var baseIndex = _this.verticesBuffer_.getArray().length / stride;
                _this.verticesBuffer_.getArray().push(x, y, -size / 2, -size / 2, u0, v0, opacity, rotateWithView, v0_r, v0_g, v0_b, v0_a, x, y, +size / 2, -size / 2, u1, v0, opacity, rotateWithView, v1_r, v1_g, v1_b, v1_a, x, y, +size / 2, +size / 2, u1, v1, opacity, rotateWithView, v2_r, v2_g, v2_b, v2_a, x, y, -size / 2, +size / 2, u0, v1, opacity, rotateWithView, v3_r, v3_g, v3_b, v3_a);
                _this.indicesBuffer_.getArray().push(baseIndex, baseIndex + 1, baseIndex + 3, baseIndex + 1, baseIndex + 2, baseIndex + 3);
            });
            this.helper_.flushBufferData(ARRAY_BUFFER, this.verticesBuffer_);
            this.helper_.flushBufferData(ELEMENT_ARRAY_BUFFER, this.indicesBuffer_);
        }
        // write new data
        this.helper_.bindBuffer(ARRAY_BUFFER, this.verticesBuffer_);
        this.helper_.bindBuffer(ELEMENT_ARRAY_BUFFER, this.indicesBuffer_);
        var bytesPerFloat = Float32Array.BYTES_PER_ELEMENT;
        this.helper_.enableAttributeArray(DefaultAttrib.POSITION, 2, FLOAT, bytesPerFloat * stride, 0);
        this.helper_.enableAttributeArray(DefaultAttrib.OFFSETS, 2, FLOAT, bytesPerFloat * stride, bytesPerFloat * 2);
        this.helper_.enableAttributeArray(DefaultAttrib.TEX_COORD, 2, FLOAT, bytesPerFloat * stride, bytesPerFloat * 4);
        this.helper_.enableAttributeArray(DefaultAttrib.OPACITY, 1, FLOAT, bytesPerFloat * stride, bytesPerFloat * 6);
        this.helper_.enableAttributeArray(DefaultAttrib.ROTATE_WITH_VIEW, 1, FLOAT, bytesPerFloat * stride, bytesPerFloat * 7);
        this.helper_.enableAttributeArray(DefaultAttrib.COLOR, 4, FLOAT, bytesPerFloat * stride, bytesPerFloat * 8);
        return true;
    };
    /**
     * Will return the last shader compilation errors. If no error happened, will return null;
     * @return {string|null} Errors, or null if last compilation was successful
     * @api
     */
    WebGLPointsLayerRenderer.prototype.getShaderCompileErrors = function () {
        return this.helper_.getShaderCompileErrors();
    };
    /**
     * Returns a texture of 1x1 pixel, white
     * @private
     * @return {ImageData} Image data.
     */
    WebGLPointsLayerRenderer.prototype.getDefaultTexture = function () {
        var canvas = document.createElement('canvas');
        var image = canvas.getContext('2d').createImageData(1, 1);
        image.data[0] = image.data[1] = image.data[2] = image.data[3] = 255;
        return image;
    };
    return WebGLPointsLayerRenderer;
}(LayerRenderer));
export default WebGLPointsLayerRenderer;
//# sourceMappingURL=PointsLayer.js.map