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
import WebGLArrayBuffer from '../../webgl/Buffer.js';
import { DYNAMIC_DRAW, ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER, FLOAT } from '../../webgl.js';
import { DefaultAttrib, DefaultUniform } from '../../webgl/Helper.js';
import GeometryType from '../../geom/GeometryType.js';
import WebGLLayerRenderer, { getBlankTexture, pushFeatureToBuffer } from './Layer.js';
import GeoJSON from '../../format/GeoJSON.js';
import { getUid } from '../../util.js';
import ViewHint from '../../ViewHint.js';
import { createEmpty, equals } from '../../extent.js';
import { create as createTransform, makeInverse as makeInverseTransform, multiply as multiplyTransform, apply as applyTransform } from '../../transform.js';
var VERTEX_SHADER = "\n  precision mediump float;\n  attribute vec2 a_position;\n  attribute vec2 a_texCoord;\n  attribute float a_rotateWithView;\n  attribute vec2 a_offsets;\n  attribute float a_opacity;\n  attribute vec4 a_color;\n\n  uniform mat4 u_projectionMatrix;\n  uniform mat4 u_offsetScaleMatrix;\n  uniform mat4 u_offsetRotateMatrix;\n\n  varying vec2 v_texCoord;\n  varying float v_opacity;\n  varying vec4 v_color;\n\n  void main(void) {\n    mat4 offsetMatrix = u_offsetScaleMatrix;\n    if (a_rotateWithView == 1.0) {\n      offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n    }\n    vec4 offsets = offsetMatrix * vec4(a_offsets, 0.0, 0.0);\n    gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n    v_texCoord = a_texCoord;\n    v_opacity = a_opacity;\n    v_color = a_color;\n  }";
var FRAGMENT_SHADER = "\n  precision mediump float;\n\n  uniform sampler2D u_texture;\n\n  varying vec2 v_texCoord;\n  varying float v_opacity;\n  varying vec4 v_color;\n\n  void main(void) {\n    if (v_opacity == 0.0) {\n      discard;\n    }\n    vec4 textureColor = texture2D(u_texture, v_texCoord);\n    gl_FragColor = v_color * textureColor;\n    gl_FragColor.a *= v_opacity;\n    gl_FragColor.rgb *= gl_FragColor.a;\n  }";
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
 * @property {function(import("../../Feature").default, Array<number>=):Array<number>} [colorCallback] Will be called on every feature in the
 * source to compute the color for use in the fragment shader (available as the `v_color` varying). This is only done on source change.
 * The return value should be between an array of R, G, B, A values between 0 and 1.  To reduce unnecessary
 * allocation, the function is called with a reusable array that can serve as the return value after updating
 * the R, G, B, and A values.
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
 * @property {Array<import("./Layer").PostProcessesOptions>} [postProcesses] Post-processes definitions
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
 * ```
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
 *  ```
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
        var _this = this;
        var options = opt_options || {};
        var uniforms = options.uniforms || {};
        uniforms.u_texture = options.texture || getBlankTexture();
        var projectionMatrixTransform = createTransform();
        uniforms[DefaultUniform.PROJECTION_MATRIX] = projectionMatrixTransform;
        _this = _super.call(this, vectorLayer, {
            uniforms: uniforms,
            postProcesses: options.postProcesses
        }) || this;
        _this.sourceRevision_ = -1;
        _this.verticesBuffer_ = new WebGLArrayBuffer([], DYNAMIC_DRAW);
        _this.indicesBuffer_ = new WebGLArrayBuffer([], DYNAMIC_DRAW);
        _this.program_ = _this.helper_.getProgram(options.fragmentShader || FRAGMENT_SHADER, options.vertexShader || VERTEX_SHADER);
        _this.helper_.useProgram(_this.program_);
        _this.sizeCallback_ = options.sizeCallback || function () {
            return 1;
        };
        _this.coordCallback_ = options.coordCallback || function (feature, index) {
            var geom = feature.getGeometry();
            return geom.getCoordinates()[index];
        };
        _this.opacityCallback_ = options.opacityCallback || function () {
            return 1;
        };
        _this.texCoordCallback_ = options.texCoordCallback || function (feature, index) {
            return index < 2 ? 0 : 1;
        };
        _this.colorArray_ = [1, 1, 1, 1];
        _this.colorCallback_ = options.colorCallback || function (feature, color) {
            return this.colorArray_;
        };
        _this.rotateWithViewCallback_ = options.rotateWithViewCallback || function () {
            return false;
        };
        _this.geojsonFormat_ = new GeoJSON();
        /**
         * @type {Object<string, import("../../format/GeoJSON").GeoJSONFeature>}
         * @private
         */
        _this.geojsonFeatureCache_ = {};
        _this.previousExtent_ = createEmpty();
        /**
         * This transform is updated on every frame and is the composition of:
         * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
         * - current world->screen transform
         * @type {import("../../transform.js").Transform}
         * @private
         */
        _this.currentTransform_ = projectionMatrixTransform;
        /**
         * This transform is updated when buffers are rebuilt and converts world space coordinates to screen space
         * @type {import("../../transform.js").Transform}
         * @private
         */
        _this.renderTransform_ = createTransform();
        /**
         * @type {import("../../transform.js").Transform}
         * @private
         */
        _this.invertRenderTransform_ = createTransform();
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
    WebGLPointsLayerRenderer.prototype.renderFrame = function (frameState) {
        var layerState = frameState.layerStatesArray[frameState.layerIndex];
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
        var vectorLayer = /** @type {import("../../layer/Vector.js").default} */ (this.getLayer());
        var vectorSource = vectorLayer.getSource();
        var viewState = frameState.viewState;
        // TODO: get this from somewhere...
        var stride = 12;
        // the source has changed: clear the feature cache & reload features
        var sourceChanged = this.sourceRevision_ < vectorSource.getRevision();
        if (sourceChanged) {
            this.sourceRevision_ = vectorSource.getRevision();
            this.geojsonFeatureCache_ = {};
            var projection = viewState.projection;
            var resolution = viewState.resolution;
            vectorSource.loadFeatures([-Infinity, -Infinity, Infinity, Infinity], resolution, projection);
        }
        var viewNotMoving = !frameState.viewHints[ViewHint.ANIMATING] && !frameState.viewHints[ViewHint.INTERACTING];
        var extentChanged = !equals(this.previousExtent_, frameState.extent);
        if ((sourceChanged || extentChanged) && viewNotMoving) {
            this.rebuildBuffers_(frameState);
            this.previousExtent_ = frameState.extent.slice();
        }
        // apply the current projection transform with the invert of the one used to fill buffers
        this.helper_.makeProjectionTransform(frameState, this.currentTransform_);
        multiplyTransform(this.currentTransform_, this.invertRenderTransform_);
        this.helper_.prepareDraw(frameState);
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
     * Rebuild internal webgl buffers based on current view extent; costly, should not be called too much
     * @param {import("../../PluggableMap").FrameState} frameState Frame state.
     * @private
     */
    WebGLPointsLayerRenderer.prototype.rebuildBuffers_ = function (frameState) {
        var vectorLayer = /** @type {import("../../layer/Vector.js").default} */ (this.getLayer());
        var vectorSource = vectorLayer.getSource();
        this.verticesBuffer_.getArray().length = 0;
        this.indicesBuffer_.getArray().length = 0;
        // saves the projection transform for the current frame state
        this.helper_.makeProjectionTransform(frameState, this.renderTransform_);
        makeInverseTransform(this.invertRenderTransform_, this.renderTransform_);
        // loop on features to fill the buffer
        var features = vectorSource.getFeatures();
        var feature;
        for (var i = 0; i < features.length; i++) {
            feature = features[i];
            if (!feature.getGeometry() || feature.getGeometry().getType() !== GeometryType.POINT) {
                continue;
            }
            var geojsonFeature = this.geojsonFeatureCache_[getUid(feature)];
            if (!geojsonFeature) {
                geojsonFeature = this.geojsonFormat_.writeFeatureObject(feature);
                this.geojsonFeatureCache_[getUid(feature)] = geojsonFeature;
            }
            geojsonFeature.geometry.coordinates[0] = this.coordCallback_(feature, 0);
            geojsonFeature.geometry.coordinates[1] = this.coordCallback_(feature, 1);
            applyTransform(this.renderTransform_, geojsonFeature.geometry.coordinates);
            geojsonFeature.properties = geojsonFeature.properties || {};
            geojsonFeature.properties.color = this.colorCallback_(feature, this.colorArray_);
            geojsonFeature.properties.u0 = this.texCoordCallback_(feature, 0);
            geojsonFeature.properties.v0 = this.texCoordCallback_(feature, 1);
            geojsonFeature.properties.u1 = this.texCoordCallback_(feature, 2);
            geojsonFeature.properties.v1 = this.texCoordCallback_(feature, 3);
            geojsonFeature.properties.size = this.sizeCallback_(feature);
            geojsonFeature.properties.opacity = this.opacityCallback_(feature);
            geojsonFeature.properties.rotateWithView = this.rotateWithViewCallback_(feature) ? 1 : 0;
            pushFeatureToBuffer(this.verticesBuffer_, this.indicesBuffer_, geojsonFeature);
        }
        this.helper_.flushBufferData(ARRAY_BUFFER, this.verticesBuffer_);
        this.helper_.flushBufferData(ELEMENT_ARRAY_BUFFER, this.indicesBuffer_);
    };
    return WebGLPointsLayerRenderer;
}(WebGLLayerRenderer));
export default WebGLPointsLayerRenderer;
//# sourceMappingURL=PointsLayer.js.map