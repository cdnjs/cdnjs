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
 * @module ol/renderer/canvas/ImageLayer
 */
import CanvasLayerRenderer from './Layer.js';
import ViewHint from '../../ViewHint.js';
import { ENABLE_RASTER_REPROJECTION } from '../../reproj/common.js';
import { IMAGE_SMOOTHING_DISABLED, IMAGE_SMOOTHING_ENABLED } from './common.js';
import { assign } from '../../obj.js';
import { compose as composeTransform, makeInverse } from '../../transform.js';
import { containsExtent, intersects as intersectsExtent } from '../../extent.js';
import { fromUserExtent } from '../../proj.js';
import { getIntersection, isEmpty } from '../../extent.js';
import { toString as toTransformString } from '../../transform.js';
/**
 * @classdesc
 * Canvas renderer for image layers.
 * @api
 */
var CanvasImageLayerRenderer = /** @class */ (function (_super) {
    __extends(CanvasImageLayerRenderer, _super);
    /**
     * @param {import("../../layer/Image.js").default} imageLayer Image layer.
     */
    function CanvasImageLayerRenderer(imageLayer) {
        var _this = _super.call(this, imageLayer) || this;
        /**
         * @protected
         * @type {?import("../../ImageBase.js").default}
         */
        _this.image_ = null;
        return _this;
    }
    /**
     * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
     */
    CanvasImageLayerRenderer.prototype.getImage = function () {
        return !this.image_ ? null : this.image_.getImage();
    };
    /**
     * Determine whether render should be called.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    CanvasImageLayerRenderer.prototype.prepareFrame = function (frameState) {
        var layerState = frameState.layerStatesArray[frameState.layerIndex];
        var pixelRatio = frameState.pixelRatio;
        var viewState = frameState.viewState;
        var viewResolution = viewState.resolution;
        var imageSource = this.getLayer().getSource();
        var hints = frameState.viewHints;
        var renderedExtent = frameState.extent;
        if (layerState.extent !== undefined) {
            renderedExtent = getIntersection(renderedExtent, fromUserExtent(layerState.extent, viewState.projection));
        }
        if (!hints[ViewHint.ANIMATING] &&
            !hints[ViewHint.INTERACTING] &&
            !isEmpty(renderedExtent)) {
            if (imageSource) {
                var projection = viewState.projection;
                if (!ENABLE_RASTER_REPROJECTION) {
                    var sourceProjection = imageSource.getProjection();
                    if (sourceProjection) {
                        projection = sourceProjection;
                    }
                }
                var image = imageSource.getImage(renderedExtent, viewResolution, pixelRatio, projection);
                if (image && this.loadImage(image)) {
                    this.image_ = image;
                }
            }
            else {
                this.image_ = null;
            }
        }
        return !!this.image_;
    };
    /**
     * Render the layer.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     */
    CanvasImageLayerRenderer.prototype.renderFrame = function (frameState, target) {
        var image = this.image_;
        var imageExtent = image.getExtent();
        var imageResolution = image.getResolution();
        var imagePixelRatio = image.getPixelRatio();
        var layerState = frameState.layerStatesArray[frameState.layerIndex];
        var pixelRatio = frameState.pixelRatio;
        var viewState = frameState.viewState;
        var viewCenter = viewState.center;
        var viewResolution = viewState.resolution;
        var size = frameState.size;
        var scale = (pixelRatio * imageResolution) / (viewResolution * imagePixelRatio);
        var width = Math.round(size[0] * pixelRatio);
        var height = Math.round(size[1] * pixelRatio);
        var rotation = viewState.rotation;
        if (rotation) {
            var size_1 = Math.round(Math.sqrt(width * width + height * height));
            width = size_1;
            height = size_1;
        }
        // set forward and inverse pixel transforms
        composeTransform(this.pixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / pixelRatio, 1 / pixelRatio, rotation, -width / 2, -height / 2);
        makeInverse(this.inversePixelTransform, this.pixelTransform);
        var canvasTransform = toTransformString(this.pixelTransform);
        this.useContainer(target, canvasTransform, layerState.opacity, this.getBackground(frameState));
        var context = this.context;
        var canvas = context.canvas;
        if (canvas.width != width || canvas.height != height) {
            canvas.width = width;
            canvas.height = height;
        }
        else if (!this.containerReused) {
            context.clearRect(0, 0, width, height);
        }
        // clipped rendering if layer extent is set
        var clipped = false;
        var render = true;
        if (layerState.extent) {
            var layerExtent = fromUserExtent(layerState.extent, viewState.projection);
            render = intersectsExtent(layerExtent, frameState.extent);
            clipped = render && !containsExtent(layerExtent, frameState.extent);
            if (clipped) {
                this.clipUnrotated(context, frameState, layerExtent);
            }
        }
        var img = image.getImage();
        var transform = composeTransform(this.tempTransform, width / 2, height / 2, scale, scale, 0, (imagePixelRatio * (imageExtent[0] - viewCenter[0])) / imageResolution, (imagePixelRatio * (viewCenter[1] - imageExtent[3])) / imageResolution);
        this.renderedResolution = (imageResolution * pixelRatio) / imagePixelRatio;
        var dw = img.width * transform[0];
        var dh = img.height * transform[3];
        if (!this.getLayer().getSource().getInterpolate()) {
            assign(context, IMAGE_SMOOTHING_DISABLED);
        }
        this.preRender(context, frameState);
        if (render && dw >= 0.5 && dh >= 0.5) {
            var dx = transform[4];
            var dy = transform[5];
            var opacity = layerState.opacity;
            var previousAlpha = void 0;
            if (opacity !== 1) {
                previousAlpha = context.globalAlpha;
                context.globalAlpha = opacity;
            }
            context.drawImage(img, 0, 0, +img.width, +img.height, Math.round(dx), Math.round(dy), Math.round(dw), Math.round(dh));
            if (opacity !== 1) {
                context.globalAlpha = previousAlpha;
            }
        }
        this.postRender(context, frameState);
        if (clipped) {
            context.restore();
        }
        assign(context, IMAGE_SMOOTHING_ENABLED);
        if (canvasTransform !== canvas.style.transform) {
            canvas.style.transform = canvasTransform;
        }
        return this.container;
    };
    return CanvasImageLayerRenderer;
}(CanvasLayerRenderer));
export default CanvasImageLayerRenderer;
//# sourceMappingURL=ImageLayer.js.map