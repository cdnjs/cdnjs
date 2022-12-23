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
 * @enum {string}
 */
export var WebGLWorkerMessageType = {
    GENERATE_BUFFERS: 'GENERATE_BUFFERS',
};
/**
 * @typedef {Object} WebGLWorkerGenerateBuffersMessage
 * This message will trigger the generation of a vertex and an index buffer based on the given render instructions.
 * When the buffers are generated, the worked will send a message of the same type to the main thread, with
 * the generated buffers in it.
 * Note that any addition properties present in the message *will* be sent back to the main thread.
 * @property {WebGLWorkerMessageType} type Message type
 * @property {ArrayBuffer} renderInstructions Render instructions raw binary buffer.
 * @property {ArrayBuffer} [vertexBuffer] Vertices array raw binary buffer (sent by the worker).
 * @property {ArrayBuffer} [indexBuffer] Indices array raw binary buffer (sent by the worker).
 * @property {number} [customAttributesCount] Amount of custom attributes count in the render instructions.
 */
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
        layer.addChangeListener(LayerProperty.MAP, _this.removeHelper_.bind(_this));
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
    WebGLLayerRenderer.prototype.removeHelper_ = function () {
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
        if (this.getLayer().getSource()) {
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
                if (this.helper) {
                    this.helper.dispose();
                }
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
        this.removeHelper_();
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
var tmpArray_ = [];
var bufferPositions_ = { vertexPosition: 0, indexPosition: 0 };
function writePointVertex(buffer, pos, x, y, index) {
    buffer[pos + 0] = x;
    buffer[pos + 1] = y;
    buffer[pos + 2] = index;
}
/**
 * An object holding positions both in an index and a vertex buffer.
 * @typedef {Object} BufferPositions
 * @property {number} vertexPosition Position in the vertex buffer
 * @property {number} indexPosition Position in the index buffer
 */
/**
 * Pushes a quad (two triangles) based on a point geometry
 * @param {Float32Array} instructions Array of render instructions for points.
 * @param {number} elementIndex Index from which render instructions will be read.
 * @param {Float32Array} vertexBuffer Buffer in the form of a typed array.
 * @param {Uint32Array} indexBuffer Buffer in the form of a typed array.
 * @param {number} customAttributesCount Amount of custom attributes for each element.
 * @param {BufferPositions} [bufferPositions] Buffer write positions; if not specified, positions will be set at 0.
 * @return {BufferPositions} New buffer positions where to write next
 * @property {number} vertexPosition New position in the vertex buffer where future writes should start.
 * @property {number} indexPosition New position in the index buffer where future writes should start.
 * @private
 */
export function writePointFeatureToBuffers(instructions, elementIndex, vertexBuffer, indexBuffer, customAttributesCount, bufferPositions) {
    // This is for x, y and index
    var baseVertexAttrsCount = 3;
    var baseInstructionsCount = 2;
    var stride = baseVertexAttrsCount + customAttributesCount;
    var x = instructions[elementIndex + 0];
    var y = instructions[elementIndex + 1];
    // read custom numerical attributes on the feature
    var customAttrs = tmpArray_;
    customAttrs.length = customAttributesCount;
    for (var i = 0; i < customAttrs.length; i++) {
        customAttrs[i] = instructions[elementIndex + baseInstructionsCount + i];
    }
    var vPos = bufferPositions ? bufferPositions.vertexPosition : 0;
    var iPos = bufferPositions ? bufferPositions.indexPosition : 0;
    var baseIndex = vPos / stride;
    // push vertices for each of the four quad corners (first standard then custom attributes)
    writePointVertex(vertexBuffer, vPos, x, y, 0);
    customAttrs.length &&
        vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
    vPos += stride;
    writePointVertex(vertexBuffer, vPos, x, y, 1);
    customAttrs.length &&
        vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
    vPos += stride;
    writePointVertex(vertexBuffer, vPos, x, y, 2);
    customAttrs.length &&
        vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
    vPos += stride;
    writePointVertex(vertexBuffer, vPos, x, y, 3);
    customAttrs.length &&
        vertexBuffer.set(customAttrs, vPos + baseVertexAttrsCount);
    vPos += stride;
    indexBuffer[iPos++] = baseIndex;
    indexBuffer[iPos++] = baseIndex + 1;
    indexBuffer[iPos++] = baseIndex + 3;
    indexBuffer[iPos++] = baseIndex + 1;
    indexBuffer[iPos++] = baseIndex + 2;
    indexBuffer[iPos++] = baseIndex + 3;
    bufferPositions_.vertexPosition = vPos;
    bufferPositions_.indexPosition = iPos;
    return bufferPositions_;
}
/**
 * Returns a texture of 1x1 pixel, white
 * @private
 * @return {ImageData} Image data.
 */
export function getBlankImageData() {
    var canvas = document.createElement('canvas');
    var image = canvas.getContext('2d').createImageData(1, 1);
    image.data[0] = 255;
    image.data[1] = 255;
    image.data[2] = 255;
    image.data[3] = 255;
    return image;
}
/**
 * Generates a color array based on a numerical id
 * Note: the range for each component is 0 to 1 with 256 steps
 * @param {number} id Id
 * @param {Array<number>} [opt_array] Reusable array
 * @return {Array<number>} Color array containing the encoded id
 */
export function colorEncodeId(id, opt_array) {
    var array = opt_array || [];
    var radix = 256;
    var divide = radix - 1;
    array[0] = Math.floor(id / radix / radix / radix) / divide;
    array[1] = (Math.floor(id / radix / radix) % radix) / divide;
    array[2] = (Math.floor(id / radix) % radix) / divide;
    array[3] = (id % radix) / divide;
    return array;
}
/**
 * Reads an id from a color-encoded array
 * Note: the expected range for each component is 0 to 1 with 256 steps.
 * @param {Array<number>} color Color array containing the encoded id
 * @return {number} Decoded id
 */
export function colorDecodeId(color) {
    var id = 0;
    var radix = 256;
    var mult = radix - 1;
    id += Math.round(color[0] * radix * radix * radix * mult);
    id += Math.round(color[1] * radix * radix * mult);
    id += Math.round(color[2] * radix * mult);
    id += Math.round(color[3] * mult);
    return id;
}
export default WebGLLayerRenderer;
//# sourceMappingURL=Layer.js.map