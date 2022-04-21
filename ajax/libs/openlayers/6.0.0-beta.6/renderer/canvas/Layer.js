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
 * @module ol/renderer/canvas/Layer
 */
import { getBottomLeft, getBottomRight, getTopLeft, getTopRight } from '../../extent.js';
import { createCanvasContext2D } from '../../dom.js';
import RenderEvent from '../../render/Event.js';
import RenderEventType from '../../render/EventType.js';
import { rotateAtOffset } from '../../render/canvas.js';
import LayerRenderer from '../Layer.js';
import { create as createTransform, apply as applyTransform, compose as composeTransform } from '../../transform.js';
/**
 * @abstract
 */
var CanvasLayerRenderer = /** @class */ (function (_super) {
    __extends(CanvasLayerRenderer, _super);
    /**
     * @param {import("../../layer/Layer.js").default} layer Layer.
     */
    function CanvasLayerRenderer(layer) {
        var _this = _super.call(this, layer) || this;
        /**
         * @protected
         * @type {number}
         */
        _this.renderedResolution;
        /**
         * A temporary transform.  The values in this transform should only be used in a
         * function that sets the values.
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.tempTransform_ = createTransform();
        /**
         * The transform for rendered pixels to viewport CSS pixels.  This transform must
         * be set when rendering a frame and may be used by other functions after rendering.
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.pixelTransform_ = createTransform();
        /**
         * The transform for viewport CSS pixels to rendered pixels.  This transform must
         * be set when rendering a frame and may be used by other functions after rendering.
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.inversePixelTransform_ = createTransform();
        /**
         * @protected
         * @type {CanvasRenderingContext2D}
         */
        _this.context = createCanvasContext2D();
        var canvas = _this.context.canvas;
        canvas.style.position = 'absolute';
        canvas.style.transformOrigin = 'top left';
        canvas.className = _this.getLayer().getClassName();
        return _this;
    }
    /**
     * @inheritDoc
     */
    CanvasLayerRenderer.prototype.disposeInternal = function () {
        this.context.canvas.width = this.context.canvas.height = 0;
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent Clip extent.
     * @protected
     */
    CanvasLayerRenderer.prototype.clip = function (context, frameState, extent) {
        var pixelRatio = frameState.pixelRatio;
        var halfWidth = (frameState.size[0] * pixelRatio) / 2;
        var halfHeight = (frameState.size[1] * pixelRatio) / 2;
        var rotation = frameState.viewState.rotation;
        var topLeft = getTopLeft(extent);
        var topRight = getTopRight(extent);
        var bottomRight = getBottomRight(extent);
        var bottomLeft = getBottomLeft(extent);
        applyTransform(frameState.coordinateToPixelTransform, topLeft);
        applyTransform(frameState.coordinateToPixelTransform, topRight);
        applyTransform(frameState.coordinateToPixelTransform, bottomRight);
        applyTransform(frameState.coordinateToPixelTransform, bottomLeft);
        context.save();
        rotateAtOffset(context, -rotation, halfWidth, halfHeight);
        context.beginPath();
        context.moveTo(topLeft[0] * pixelRatio, topLeft[1] * pixelRatio);
        context.lineTo(topRight[0] * pixelRatio, topRight[1] * pixelRatio);
        context.lineTo(bottomRight[0] * pixelRatio, bottomRight[1] * pixelRatio);
        context.lineTo(bottomLeft[0] * pixelRatio, bottomLeft[1] * pixelRatio);
        context.clip();
        rotateAtOffset(context, rotation, halfWidth, halfHeight);
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
        var inverted = this.inversePixelTransform_;
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
            var event_1 = new RenderEvent(type, this.inversePixelTransform_, frameState, context, null);
            layer.dispatchEvent(event_1);
        }
    };
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @protected
     */
    CanvasLayerRenderer.prototype.preRender = function (context, frameState) {
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
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {number} width Width of the rendered element (in pixels).
     * @param {number} height Height of the rendered element (in pixels).
     * @param {number} offsetX Offset on the x-axis in view coordinates.
     * @protected
     * @return {!import("../../transform.js").Transform} Transform.
     */
    CanvasLayerRenderer.prototype.getRenderTransform = function (frameState, width, height, offsetX) {
        var viewState = frameState.viewState;
        var pixelRatio = frameState.pixelRatio;
        var dx1 = width / 2;
        var dy1 = height / 2;
        var sx = pixelRatio / viewState.resolution;
        var sy = -sx;
        var dx2 = -viewState.center[0] + offsetX;
        var dy2 = -viewState.center[1];
        return composeTransform(this.tempTransform_, dx1, dy1, sx, sy, -viewState.rotation, dx2, dy2);
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
        var renderPixel = applyTransform(this.inversePixelTransform_, pixel.slice());
        var context = this.context;
        var data;
        try {
            data = context.getImageData(Math.round(renderPixel[0]), Math.round(renderPixel[1]), 1, 1).data;
        }
        catch (err) {
            if (err.name === 'SecurityError') {
                // tainted canvas, we assume there is data at the given pixel (although there might not be)
                return new Uint8Array();
            }
            return data;
        }
        if (data[3] === 0) {
            return null;
        }
        return data;
    };
    return CanvasLayerRenderer;
}(LayerRenderer));
export default CanvasLayerRenderer;
//# sourceMappingURL=Layer.js.map