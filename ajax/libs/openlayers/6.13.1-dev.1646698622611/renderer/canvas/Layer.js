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
 * @module ol/renderer/canvas/Layer
 */
import LayerRenderer from '../Layer.js';
import RenderEvent from '../../render/Event.js';
import RenderEventType from '../../render/EventType.js';
import { apply as applyTransform, compose as composeTransform, create as createTransform, } from '../../transform.js';
import { asArray } from '../../color.js';
import { containsCoordinate, getBottomLeft, getBottomRight, getTopLeft, getTopRight, } from '../../extent.js';
import { createCanvasContext2D } from '../../dom.js';
import { equals } from '../../array.js';
/**
 * @type {CanvasRenderingContext2D}
 */
var pixelContext = null;
function createPixelContext() {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    pixelContext = canvas.getContext('2d');
}
/**
 * @abstract
 * @template {import("../../layer/Layer.js").default} LayerType
 * @extends {LayerRenderer<LayerType>}
 */
var CanvasLayerRenderer = /** @class */ (function (_super) {
    __extends(CanvasLayerRenderer, _super);
    /**
     * @param {LayerType} layer Layer.
     */
    function CanvasLayerRenderer(layer) {
        var _this = _super.call(this, layer) || this;
        /**
         * @protected
         * @type {HTMLElement}
         */
        _this.container = null;
        /**
         * @protected
         * @type {number}
         */
        _this.renderedResolution;
        /**
         * A temporary transform.  The values in this transform should only be used in a
         * function that sets the values.
         * @protected
         * @type {import("../../transform.js").Transform}
         */
        _this.tempTransform = createTransform();
        /**
         * The transform for rendered pixels to viewport CSS pixels.  This transform must
         * be set when rendering a frame and may be used by other functions after rendering.
         * @protected
         * @type {import("../../transform.js").Transform}
         */
        _this.pixelTransform = createTransform();
        /**
         * The transform for viewport CSS pixels to rendered pixels.  This transform must
         * be set when rendering a frame and may be used by other functions after rendering.
         * @protected
         * @type {import("../../transform.js").Transform}
         */
        _this.inversePixelTransform = createTransform();
        /**
         * @type {CanvasRenderingContext2D}
         */
        _this.context = null;
        /**
         * @type {boolean}
         */
        _this.containerReused = false;
        /**
         * @private
         * @type {CanvasRenderingContext2D}
         */
        _this.pixelContext_ = null;
        /**
         * @protected
         * @type {import("../../PluggableMap.js").FrameState|null}
         */
        _this.frameState = null;
        return _this;
    }
    /**
     * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
     * @param {number} col The column index.
     * @param {number} row The row index.
     * @return {Uint8ClampedArray|null} The image data.
     */
    CanvasLayerRenderer.prototype.getImageData = function (image, col, row) {
        if (!pixelContext) {
            createPixelContext();
        }
        pixelContext.clearRect(0, 0, 1, 1);
        var data;
        try {
            pixelContext.drawImage(image, col, row, 1, 1, 0, 0, 1, 1);
            data = pixelContext.getImageData(0, 0, 1, 1).data;
        }
        catch (err) {
            return null;
        }
        return data;
    };
    /**
     * @param {import('../../PluggableMap.js').FrameState} frameState Frame state.
     * @return {string} Background color.
     */
    CanvasLayerRenderer.prototype.getBackground = function (frameState) {
        var layer = this.getLayer();
        var background = layer.getBackground();
        if (typeof background === 'function') {
            background = background(frameState.viewState.resolution);
        }
        return background || undefined;
    };
    /**
     * Get a rendering container from an existing target, if compatible.
     * @param {HTMLElement} target Potential render target.
     * @param {string} transform CSS Transform.
     * @param {number} opacity Opacity.
     * @param {string} [opt_backgroundColor] Background color.
     */
    CanvasLayerRenderer.prototype.useContainer = function (target, transform, opacity, opt_backgroundColor) {
        var layerClassName = this.getLayer().getClassName();
        var container, context;
        if (target &&
            target.className === layerClassName &&
            target.style.opacity === '' &&
            opacity === 1 &&
            (!opt_backgroundColor ||
                (target.style.backgroundColor &&
                    equals(asArray(target.style.backgroundColor), asArray(opt_backgroundColor))))) {
            var canvas = target.firstElementChild;
            if (canvas instanceof HTMLCanvasElement) {
                context = canvas.getContext('2d');
            }
        }
        if (context && context.canvas.style.transform === transform) {
            // Container of the previous layer renderer can be used.
            this.container = target;
            this.context = context;
            this.containerReused = true;
        }
        else if (this.containerReused) {
            // Previously reused container cannot be used any more.
            this.container = null;
            this.context = null;
            this.containerReused = false;
        }
        if (!this.container) {
            container = document.createElement('div');
            container.className = layerClassName;
            var style = container.style;
            style.position = 'absolute';
            style.width = '100%';
            style.height = '100%';
            if (opt_backgroundColor) {
                style.backgroundColor = opt_backgroundColor;
            }
            context = createCanvasContext2D();
            var canvas = context.canvas;
            container.appendChild(canvas);
            style = canvas.style;
            style.position = 'absolute';
            style.left = '0';
            style.transformOrigin = 'top left';
            this.container = container;
            this.context = context;
        }
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent Clip extent.
     * @protected
     */
    CanvasLayerRenderer.prototype.clipUnrotated = function (context, frameState, extent) {
        var topLeft = getTopLeft(extent);
        var topRight = getTopRight(extent);
        var bottomRight = getBottomRight(extent);
        var bottomLeft = getBottomLeft(extent);
        applyTransform(frameState.coordinateToPixelTransform, topLeft);
        applyTransform(frameState.coordinateToPixelTransform, topRight);
        applyTransform(frameState.coordinateToPixelTransform, bottomRight);
        applyTransform(frameState.coordinateToPixelTransform, bottomLeft);
        var inverted = this.inversePixelTransform;
        applyTransform(inverted, topLeft);
        applyTransform(inverted, topRight);
        applyTransform(inverted, bottomRight);
        applyTransform(inverted, bottomLeft);
        context.save();
        context.beginPath();
        context.moveTo(Math.round(topLeft[0]), Math.round(topLeft[1]));
        context.lineTo(Math.round(topRight[0]), Math.round(topRight[1]));
        context.lineTo(Math.round(bottomRight[0]), Math.round(bottomRight[1]));
        context.lineTo(Math.round(bottomLeft[0]), Math.round(bottomLeft[1]));
        context.clip();
    };
    /**
     * @param {import("../../render/EventType.js").default} type Event type.
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @private
     */
    CanvasLayerRenderer.prototype.dispatchRenderEvent_ = function (type, context, frameState) {
        var layer = this.getLayer();
        if (layer.hasListener(type)) {
            var event_1 = new RenderEvent(type, this.inversePixelTransform, frameState, context);
            layer.dispatchEvent(event_1);
        }
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    CanvasLayerRenderer.prototype.preRender = function (context, frameState) {
        this.frameState = frameState;
        this.dispatchRenderEvent_(RenderEventType.PRERENDER, context, frameState);
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    CanvasLayerRenderer.prototype.postRender = function (context, frameState) {
        this.dispatchRenderEvent_(RenderEventType.POSTRENDER, context, frameState);
    };
    /**
     * Creates a transform for rendering to an element that will be rotated after rendering.
     * @param {import("../../coordinate.js").Coordinate} center Center.
     * @param {number} resolution Resolution.
     * @param {number} rotation Rotation.
     * @param {number} pixelRatio Pixel ratio.
     * @param {number} width Width of the rendered element (in pixels).
     * @param {number} height Height of the rendered element (in pixels).
     * @param {number} offsetX Offset on the x-axis in view coordinates.
     * @protected
     * @return {!import("../../transform.js").Transform} Transform.
     */
    CanvasLayerRenderer.prototype.getRenderTransform = function (center, resolution, rotation, pixelRatio, width, height, offsetX) {
        var dx1 = width / 2;
        var dy1 = height / 2;
        var sx = pixelRatio / resolution;
        var sy = -sx;
        var dx2 = -center[0] + offsetX;
        var dy2 = -center[1];
        return composeTransform(this.tempTransform, dx1, dy1, sx, sy, -rotation, dx2, dy2);
    };
    /**
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @param {import("../../PluggableMap.js").FrameState} frameState FrameState.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @return {Uint8ClampedArray|Uint8Array} The result.  If there is no data at the pixel
     *    location, null will be returned.  If there is data, but pixel values cannot be
     *    returned, and empty array will be returned.
     */
    CanvasLayerRenderer.prototype.getDataAtPixel = function (pixel, frameState, hitTolerance) {
        var renderPixel = applyTransform(this.inversePixelTransform, pixel.slice());
        var context = this.context;
        var layer = this.getLayer();
        var layerExtent = layer.getExtent();
        if (layerExtent) {
            var renderCoordinate = applyTransform(frameState.pixelToCoordinateTransform, pixel.slice());
            /** get only data inside of the layer extent */
            if (!containsCoordinate(layerExtent, renderCoordinate)) {
                return null;
            }
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
            pixelContext.drawImage(context.canvas, x, y, 1, 1, 0, 0, 1, 1);
            data = pixelContext.getImageData(0, 0, 1, 1).data;
        }
        catch (err) {
            if (err.name === 'SecurityError') {
                // tainted canvas, we assume there is data at the given pixel (although there might not be)
                this.pixelContext_ = null;
                return new Uint8Array();
            }
            return data;
        }
        if (data[3] === 0) {
            return null;
        }
        return data;
    };
    /**
     * Clean up.
     */
    CanvasLayerRenderer.prototype.disposeInternal = function () {
        delete this.frameState;
        _super.prototype.disposeInternal.call(this);
    };
    return CanvasLayerRenderer;
}(LayerRenderer));
export default CanvasLayerRenderer;
//# sourceMappingURL=Layer.js.map