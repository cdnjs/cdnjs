var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @module ol/renderer/webgl/VectorLayer
 */
import BaseVector from '../../layer/BaseVector.js';
import LineStringBatchRenderer from '../../render/webgl/LineStringBatchRenderer.js';
import MixedGeometryBatch from '../../render/webgl/MixedGeometryBatch.js';
import PointBatchRenderer from '../../render/webgl/PointBatchRenderer.js';
import PolygonBatchRenderer from '../../render/webgl/PolygonBatchRenderer.js';
import VectorEventType from '../../source/VectorEventType.js';
import ViewHint from '../../ViewHint.js';
import WebGLLayerRenderer from './Layer.js';
import { DefaultUniform } from '../../webgl/Helper.js';
import { FILL_FRAGMENT_SHADER, FILL_VERTEX_SHADER, POINT_FRAGMENT_SHADER, POINT_VERTEX_SHADER, STROKE_FRAGMENT_SHADER, STROKE_VERTEX_SHADER, packColor, } from './shaders.js';
import { buffer, createEmpty, equals, getWidth } from '../../extent.js';
import { create as createTransform } from '../../transform.js';
import { create as createWebGLWorker } from '../../worker/webgl.js';
import { listen, unlistenByKey } from '../../events.js';
/**
 * @typedef {function(import("../../Feature").default, Object<string, *>):number} CustomAttributeCallback A callback computing
 * the value of a custom attribute (different for each feature) to be passed on to the GPU.
 * Properties are available as 2nd arg for quicker access.
 */
/**
 * @typedef {Object} ShaderProgram An object containing both shaders (vertex and fragment) as well as the required attributes
 * @property {string} [vertexShader] Vertex shader source (using the default one if unspecified).
 * @property {string} [fragmentShader] Fragment shader source (using the default one if unspecified).
 * @property {Object<import("./shaders.js").DefaultAttributes,CustomAttributeCallback>} attributes Custom attributes made available in the vertex shader.
 * Keys are the names of the attributes which are then accessible in the vertex shader using the `a_` prefix, e.g.: `a_opacity`.
 * Default shaders rely on the attributes in {@link module:ol/render/webgl/shaders~DefaultAttributes}.
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {ShaderProgram} [fill] Attributes and shaders for filling polygons.
 * @property {ShaderProgram} [stroke] Attributes and shaders for line strings and polygon strokes.
 * @property {ShaderProgram} [point] Attributes and shaders for points.
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions.
 * @property {Array<import("./Layer").PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @param {Object<import("./shaders.js").DefaultAttributes,CustomAttributeCallback>} obj Lookup of attribute getters.
 * @return {Array<import("../../render/webgl/BatchRenderer").CustomAttribute>} An array of attribute descriptors.
 */
function toAttributesArray(obj) {
    return Object.keys(obj).map(function (key) { return ({ name: key, callback: obj[key] }); });
}
/**
 * @classdesc
 * Experimental WebGL vector renderer. Supports polygons, lines and points:
 *  * Polygons are broken down into triangles
 *  * Lines are rendered as strips of quads
 *  * Points are rendered as quads
 *
 * You need to provide vertex and fragment shaders as well as custom attributes for each type of geometry. All shaders
 * can access the uniforms in the {@link module:ol/webgl/Helper~DefaultUniform} enum.
 * The vertex shaders can access the following attributes depending on the geometry type:
 *  * For polygons: {@link module:ol/render/webgl/PolygonBatchRenderer~Attributes}
 *  * For line strings: {@link module:ol/render/webgl/LineStringBatchRenderer~Attributes}
 *  * For points: {@link module:ol/render/webgl/PointBatchRenderer~Attributes}
 *
 * Please note that the fragment shaders output should have premultiplied alpha, otherwise visual anomalies may occur.
 *
 * Note: this uses {@link module:ol/webgl/Helper~WebGLHelper} internally.
 */
var WebGLVectorLayerRenderer = /** @class */ (function (_super) {
    __extends(WebGLVectorLayerRenderer, _super);
    /**
     * @param {import("../../layer/Layer.js").default} layer Layer.
     * @param {Options} options Options.
     */
    function WebGLVectorLayerRenderer(layer, options) {
        var _this = this;
        var uniforms = options.uniforms || {};
        var projectionMatrixTransform = createTransform();
        uniforms[DefaultUniform.PROJECTION_MATRIX] = projectionMatrixTransform;
        _this = _super.call(this, layer, {
            uniforms: uniforms,
            postProcesses: options.postProcesses,
        }) || this;
        _this.sourceRevision_ = -1;
        _this.previousExtent_ = createEmpty();
        /**
         * This transform is updated on every frame and is the composition of:
         * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
         * - current world->screen transform
         * @type {import("../../transform.js").Transform}
         * @private
         */
        _this.currentTransform_ = projectionMatrixTransform;
        var fillAttributes = __assign({ color: function () {
                return packColor('#ddd');
            }, opacity: function () {
                return 1;
            } }, (options.fill && options.fill.attributes));
        var strokeAttributes = __assign({ color: function () {
                return packColor('#eee');
            }, opacity: function () {
                return 1;
            }, width: function () {
                return 1.5;
            } }, (options.stroke && options.stroke.attributes));
        var pointAttributes = __assign({ color: function () {
                return packColor('#eee');
            }, opacity: function () {
                return 1;
            } }, (options.point && options.point.attributes));
        _this.fillVertexShader_ =
            (options.fill && options.fill.vertexShader) || FILL_VERTEX_SHADER;
        _this.fillFragmentShader_ =
            (options.fill && options.fill.fragmentShader) || FILL_FRAGMENT_SHADER;
        _this.fillAttributes_ = toAttributesArray(fillAttributes);
        _this.strokeVertexShader_ =
            (options.stroke && options.stroke.vertexShader) || STROKE_VERTEX_SHADER;
        _this.strokeFragmentShader_ =
            (options.stroke && options.stroke.fragmentShader) ||
                STROKE_FRAGMENT_SHADER;
        _this.strokeAttributes_ = toAttributesArray(strokeAttributes);
        _this.pointVertexShader_ =
            (options.point && options.point.vertexShader) || POINT_VERTEX_SHADER;
        _this.pointFragmentShader_ =
            (options.point && options.point.fragmentShader) || POINT_FRAGMENT_SHADER;
        _this.pointAttributes_ = toAttributesArray(pointAttributes);
        /**
         * @private
         */
        _this.worker_ = createWebGLWorker();
        /**
         * @private
         */
        _this.batch_ = new MixedGeometryBatch();
        var source = _this.getLayer().getSource();
        _this.batch_.addFeatures(source.getFeatures());
        _this.sourceListenKeys_ = [
            listen(source, VectorEventType.ADDFEATURE, _this.handleSourceFeatureAdded_, _this),
            listen(source, VectorEventType.CHANGEFEATURE, _this.handleSourceFeatureChanged_, _this),
            listen(source, VectorEventType.REMOVEFEATURE, _this.handleSourceFeatureDelete_, _this),
            listen(source, VectorEventType.CLEAR, _this.handleSourceFeatureClear_, _this),
        ];
        return _this;
    }
    WebGLVectorLayerRenderer.prototype.afterHelperCreated = function () {
        this.polygonRenderer_ = new PolygonBatchRenderer(this.helper, this.worker_, this.fillVertexShader_, this.fillFragmentShader_, this.fillAttributes_);
        this.pointRenderer_ = new PointBatchRenderer(this.helper, this.worker_, this.pointVertexShader_, this.pointFragmentShader_, this.pointAttributes_);
        this.lineStringRenderer_ = new LineStringBatchRenderer(this.helper, this.worker_, this.strokeVertexShader_, this.strokeFragmentShader_, this.strokeAttributes_);
    };
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    WebGLVectorLayerRenderer.prototype.handleSourceFeatureAdded_ = function (event) {
        var feature = event.feature;
        this.batch_.addFeature(feature);
    };
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    WebGLVectorLayerRenderer.prototype.handleSourceFeatureChanged_ = function (event) {
        var feature = event.feature;
        this.batch_.changeFeature(feature);
    };
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    WebGLVectorLayerRenderer.prototype.handleSourceFeatureDelete_ = function (event) {
        var feature = event.feature;
        this.batch_.removeFeature(feature);
    };
    /**
     * @private
     */
    WebGLVectorLayerRenderer.prototype.handleSourceFeatureClear_ = function () {
        this.batch_.clear();
    };
    /**
     * Render the layer.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    WebGLVectorLayerRenderer.prototype.renderFrame = function (frameState) {
        var gl = this.helper.getGL();
        this.preRender(gl, frameState);
        var layer = this.getLayer();
        var vectorSource = layer.getSource();
        var projection = frameState.viewState.projection;
        var multiWorld = vectorSource.getWrapX() && projection.canWrapX();
        var projectionExtent = projection.getExtent();
        var extent = frameState.extent;
        var worldWidth = multiWorld ? getWidth(projectionExtent) : null;
        var endWorld = multiWorld
            ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1
            : 1;
        var world = multiWorld
            ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth)
            : 0;
        do {
            this.polygonRenderer_.render(this.batch_.polygonBatch, this.currentTransform_, frameState, world * worldWidth);
            this.lineStringRenderer_.render(this.batch_.lineStringBatch, this.currentTransform_, frameState, world * worldWidth);
            this.pointRenderer_.render(this.batch_.pointBatch, this.currentTransform_, frameState, world * worldWidth);
        } while (++world < endWorld);
        this.helper.finalizeDraw(frameState);
        var canvas = this.helper.getCanvas();
        var layerState = frameState.layerStatesArray[frameState.layerIndex];
        var opacity = layerState.opacity;
        if (opacity !== parseFloat(canvas.style.opacity)) {
            canvas.style.opacity = String(opacity);
        }
        this.postRender(gl, frameState);
        return canvas;
    };
    /**
     * Determine whether renderFrame should be called.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    WebGLVectorLayerRenderer.prototype.prepareFrameInternal = function (frameState) {
        var _this = this;
        var layer = this.getLayer();
        var vectorSource = layer.getSource();
        var viewState = frameState.viewState;
        var viewNotMoving = !frameState.viewHints[ViewHint.ANIMATING] &&
            !frameState.viewHints[ViewHint.INTERACTING];
        var extentChanged = !equals(this.previousExtent_, frameState.extent);
        var sourceChanged = this.sourceRevision_ < vectorSource.getRevision();
        if (sourceChanged) {
            this.sourceRevision_ = vectorSource.getRevision();
        }
        if (viewNotMoving && (extentChanged || sourceChanged)) {
            var projection = viewState.projection;
            var resolution = viewState.resolution;
            var renderBuffer = layer instanceof BaseVector ? layer.getRenderBuffer() : 0;
            var extent = buffer(frameState.extent, renderBuffer * resolution);
            vectorSource.loadFeatures(extent, resolution, projection);
            this.ready = false;
            var remaining_1 = 3;
            var rebuildCb = function () {
                remaining_1--;
                _this.ready = remaining_1 <= 0;
                _this.getLayer().changed();
            };
            this.polygonRenderer_.rebuild(this.batch_.polygonBatch, frameState, 'Polygon', rebuildCb);
            this.lineStringRenderer_.rebuild(this.batch_.lineStringBatch, frameState, 'LineString', rebuildCb);
            this.pointRenderer_.rebuild(this.batch_.pointBatch, frameState, 'Point', rebuildCb);
            this.previousExtent_ = frameState.extent.slice();
        }
        this.helper.makeProjectionTransform(frameState, this.currentTransform_);
        this.helper.prepareDraw(frameState);
        return true;
    };
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
     * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
     * @return {T|undefined} Callback result.
     * @template T
     */
    WebGLVectorLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, matches) {
        return undefined;
    };
    /**
     * Clean up.
     */
    WebGLVectorLayerRenderer.prototype.disposeInternal = function () {
        this.worker_.terminate();
        this.layer_ = null;
        this.sourceListenKeys_.forEach(function (key) {
            unlistenByKey(key);
        });
        this.sourceListenKeys_ = null;
        _super.prototype.disposeInternal.call(this);
    };
    return WebGLVectorLayerRenderer;
}(WebGLLayerRenderer));
export default WebGLVectorLayerRenderer;
//# sourceMappingURL=VectorLayer.js.map