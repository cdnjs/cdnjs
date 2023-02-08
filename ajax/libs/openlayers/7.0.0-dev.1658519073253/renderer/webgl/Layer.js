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
/**
 * @module ol/renderer/webgl/Layer
 */
import LayerProperty from '../../layer/Property.js';
import LayerRenderer from '../Layer.js';
import RenderEvent from '../../render/Event.js';
import RenderEventType from '../../render/EventType.js';
import WebGLHelper from '../../webgl/Helper.js';
import { apply as applyTransform, compose as composeTransform, create as createTransform, } from '../../transform.js';
import { containsCoordinate } from '../../extent.js';
/**
 * @typedef {Object} PostProcessesOptions
 * @property {number} [scaleRatio] Scale ratio; if < 1, the post process will render to a texture smaller than
 * the main canvas that will then be sampled up (useful for saving resource on blur steps).
 * @property {string} [vertexShader] Vertex shader source
 * @property {string} [fragmentShader] Fragment shader source
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process step
 */
/**
 * @typedef {Object} Options
 * @property {Object<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * @property {Array<PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * Base WebGL renderer class.
 * Holds all logic related to data manipulation & some common rendering logic
 * @template {import("../../layer/Layer.js").default} LayerType
 * @extends {LayerRenderer<LayerType>}
 */
var WebGLLayerRenderer = /** @class */ (function (_super) {
    __extends(WebGLLayerRenderer, _super);
    /**
     * @param {LayerType} layer Layer.
     * @param {Options} [opt_options] Options.
     */
    function WebGLLayerRenderer(layer, opt_options) {
        var _this = _super.call(this, layer) || this;
        var options = opt_options || {};
        /**
         * The transform for viewport CSS pixels to rendered pixels.  This transform is only
         * set before dispatching rendering events.
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.inversePixelTransform_ = createTransform();
        /**
         * @private
         * @type {CanvasRenderingContext2D}
         */
        _this.pixelContext_ = null;
        /**
         * @private
         */
        _this.postProcesses_ = options.postProcesses;
        /**
         * @private
         */
        _this.uniforms_ = options.uniforms;
        /**
         * @type {WebGLHelper}
         * @protected
         */
        _this.helper;
        layer.addChangeListener(LayerProperty.MAP, _this.removeHelper.bind(_this));
        _this.dispatchPreComposeEvent = _this.dispatchPreComposeEvent.bind(_this);
        _this.dispatchPostComposeEvent = _this.dispatchPostComposeEvent.bind(_this);
        return _this;
    }
    /**
     * @param {WebGLRenderingContext} context The WebGL rendering context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    WebGLLayerRenderer.prototype.dispatchPreComposeEvent = function (context, frameState) {
        var layer = this.getLayer();
        if (layer.hasListener(RenderEventType.PRECOMPOSE)) {
            var event_1 = new RenderEvent(RenderEventType.PRECOMPOSE, undefined, frameState, context);
            layer.dispatchEvent(event_1);
        }
    };
    /**
     * @param {WebGLRenderingContext} context The WebGL rendering context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    WebGLLayerRenderer.prototype.dispatchPostComposeEvent = function (context, frameState) {
        var layer = this.getLayer();
        if (layer.hasListener(RenderEventType.POSTCOMPOSE)) {
            var event_2 = new RenderEvent(RenderEventType.POSTCOMPOSE, undefined, frameState, context);
            layer.dispatchEvent(event_2);
        }
    };
    /**
     * Reset options (only handles uniforms).
     * @param {Options} options Options.
     */
    WebGLLayerRenderer.prototype.reset = function (options) {
        this.uniforms_ = options.uniforms;
        if (this.helper) {
            this.helper.setUniforms(this.uniforms_);
        }
    };
    /**
     * @protected
     */
    WebGLLayerRenderer.prototype.removeHelper = function () {
        if (this.helper) {
            this.helper.dispose();
            delete this.helper;
        }
    };
    /**
     * Determine whether renderFrame should be called.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    WebGLLayerRenderer.prototype.prepareFrame = function (frameState) {
        if (this.getLayer().getRenderSource()) {
            var incrementGroup = true;
            var groupNumber = -1;
            var className = void 0;
            for (var i = 0, ii = frameState.layerStatesArray.length; i < ii; i++) {
                var layer = frameState.layerStatesArray[i].layer;
                var renderer = layer.getRenderer();
                if (!(renderer instanceof WebGLLayerRenderer)) {
                    incrementGroup = true;
                    continue;
                }
                var layerClassName = layer.getClassName();
                if (incrementGroup || layerClassName !== className) {
                    groupNumber += 1;
                    incrementGroup = false;
                }
                className = layerClassName;
                if (renderer === this) {
                    break;
                }
            }
            var canvasCacheKey = 'map/' + frameState.mapId + '/group/' + groupNumber;
            if (!this.helper || !this.helper.canvasCacheKeyMatches(canvasCacheKey)) {
                this.removeHelper();
                this.helper = new WebGLHelper({
                    postProcesses: this.postProcesses_,
                    uniforms: this.uniforms_,
                    canvasCacheKey: canvasCacheKey,
                });
                if (className) {
                    this.helper.getCanvas().className = className;
                }
                this.afterHelperCreated();
            }
        }
        return this.prepareFrameInternal(frameState);
    };
    /**
     * @protected
     */
    WebGLLayerRenderer.prototype.afterHelperCreated = function () { };
    /**
     * Determine whether renderFrame should be called.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     * @protected
     */
    WebGLLayerRenderer.prototype.prepareFrameInternal = function (frameState) {
        return true;
    };
    /**
     * Clean up.
     */
    WebGLLayerRenderer.prototype.disposeInternal = function () {
        this.removeHelper();
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * @param {import("../../render/EventType.js").default} type Event type.
     * @param {WebGLRenderingContext} context The rendering context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @private
     */
    WebGLLayerRenderer.prototype.dispatchRenderEvent_ = function (type, context, frameState) {
        var layer = this.getLayer();
        if (layer.hasListener(type)) {
            composeTransform(this.inversePixelTransform_, 0, 0, frameState.pixelRatio, -frameState.pixelRatio, 0, 0, -frameState.size[1]);
            var event_3 = new RenderEvent(type, this.inversePixelTransform_, frameState, context);
            layer.dispatchEvent(event_3);
        }
    };
    /**
     * @param {WebGLRenderingContext} context The rendering context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    WebGLLayerRenderer.prototype.preRender = function (context, frameState) {
        this.dispatchRenderEvent_(RenderEventType.PRERENDER, context, frameState);
    };
    /**
     * @param {WebGLRenderingContext} context The rendering context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    WebGLLayerRenderer.prototype.postRender = function (context, frameState) {
        this.dispatchRenderEvent_(RenderEventType.POSTRENDER, context, frameState);
    };
    /**
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @param {import("../../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @return {Uint8ClampedArray|Uint8Array} The result.  If there is no data at the pixel
     *    location, null will be returned.  If there is data, but pixel values cannot be
     *    returned, and empty array will be returned.
     */
    WebGLLayerRenderer.prototype.getDataAtPixel = function (pixel, frameState, hitTolerance) {
        var renderPixel = applyTransform([frameState.pixelRatio, 0, 0, frameState.pixelRatio, 0, 0], pixel.slice());
        var gl = this.helper.getGL();
        if (!gl) {
            return null;
        }
        var layer = this.getLayer();
        var layerExtent = layer.getExtent();
        if (layerExtent) {
            var renderCoordinate = applyTransform(frameState.pixelToCoordinateTransform, pixel.slice());
            /** get only data inside of the layer extent */
            if (!containsCoordinate(layerExtent, renderCoordinate)) {
                return null;
            }
        }
        var attributes = gl.getContextAttributes();
        if (!attributes || !attributes.preserveDrawingBuffer) {
            // we assume there is data at the given pixel (although there might not be)
            return new Uint8Array();
        }
        var x = Math.round(renderPixel[0]);
        var y = Math.round(renderPixel[1]);
        var pixelContext = this.pixelContext_;
        if (!pixelContext) {
            var pixelCanvas = document.createElement('canvas');
            pixelCanvas.width = 1;
            pixelCanvas.height = 1;
            pixelContext = pixelCanvas.getContext('2d');
            this.pixelContext_ = pixelContext;
        }
        pixelContext.clearRect(0, 0, 1, 1);
        var data;
        try {
            pixelContext.drawImage(gl.canvas, x, y, 1, 1, 0, 0, 1, 1);
            data = pixelContext.getImageData(0, 0, 1, 1).data;
        }
        catch (err) {
            return data;
        }
        if (data[3] === 0) {
            return null;
        }
        return data;
    };
    return WebGLLayerRenderer;
}(LayerRenderer));
export default WebGLLayerRenderer;
//# sourceMappingURL=Layer.js.map