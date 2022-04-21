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
 * @module ol/renderer/canvas/ImageLayer
 */
import { ENABLE_RASTER_REPROJECTION } from '../../reproj/common.js';
import ViewHint from '../../ViewHint.js';
import { containsExtent, intersects } from '../../extent.js';
import { getIntersection, isEmpty } from '../../extent.js';
import CanvasLayerRenderer from './Layer.js';
import { compose as composeTransform, makeInverse, toString as transformToString } from '../../transform.js';
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
     * @inheritDoc
     */
    CanvasImageLayerRenderer.prototype.getImage = function () {
        return !this.image_ ? null : this.image_.getImage();
    };
    /**
     * @inheritDoc
     */
    CanvasImageLayerRenderer.prototype.prepareFrame = function (frameState, layerState) {
        var pixelRatio = frameState.pixelRatio;
        var viewState = frameState.viewState;
        var viewResolution = viewState.resolution;
        var imageSource = this.getLayer().getSource();
        var hints = frameState.viewHints;
        var renderedExtent = frameState.extent;
        if (layerState.extent !== undefined) {
            renderedExtent = getIntersection(renderedExtent, layerState.extent);
        }
        if (!hints[ViewHint.ANIMATING] && !hints[ViewHint.INTERACTING] && !isEmpty(renderedExtent)) {
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
        return !!this.image_;
    };
    /**
     * @inheritDoc
     */
    CanvasImageLayerRenderer.prototype.renderFrame = function (frameState, layerState) {
        var image = this.image_;
        var imageExtent = image.getExtent();
        var imageResolution = image.getResolution();
        var imagePixelRatio = image.getPixelRatio();
        var pixelRatio = frameState.pixelRatio;
        var viewState = frameState.viewState;
        var viewCenter = viewState.center;
        var viewResolution = viewState.resolution;
        var size = frameState.size;
        var scale = pixelRatio * imageResolution / (viewResolution * imagePixelRatio);
        var width = Math.round(size[0] * pixelRatio);
        var height = Math.round(size[1] * pixelRatio);
        var rotation = viewState.rotation;
        if (rotation) {
            var size_1 = Math.round(Math.sqrt(width * width + height * height));
            width = height = size_1;
        }
        // set forward and inverse pixel transforms
        composeTransform(this.pixelTransform_, frameState.size[0] / 2, frameState.size[1] / 2, 1 / pixelRatio, 1 / pixelRatio, rotation, -width / 2, -height / 2);
        makeInverse(this.inversePixelTransform_, this.pixelTransform_);
        var context = this.context;
        var canvas = context.canvas;
        if (canvas.width != width || canvas.height != height) {
            canvas.width = width;
            canvas.height = height;
        }
        else {
            context.clearRect(0, 0, width, height);
        }
        // clipped rendering if layer extent is set
        var extent = layerState.extent;
        var clipped = extent !== undefined &&
            !containsExtent(extent, frameState.extent) &&
            intersects(extent, frameState.extent);
        if (clipped) {
            this.clip(context, frameState, extent);
        }
        var img = image.getImage();
        var transform = composeTransform(this.tempTransform_, width / 2, height / 2, scale, scale, 0, imagePixelRatio * (imageExtent[0] - viewCenter[0]) / imageResolution, imagePixelRatio * (viewCenter[1] - imageExtent[3]) / imageResolution);
        this.renderedResolution = imageResolution * pixelRatio / imagePixelRatio;
        var dx = transform[4];
        var dy = transform[5];
        var dw = img.width * transform[0];
        var dh = img.height * transform[3];
        this.preRender(context, frameState);
        if (dw >= 0.5 && dh >= 0.5) {
            this.context.drawImage(img, 0, 0, +img.width, +img.height, Math.round(dx), Math.round(dy), Math.round(dw), Math.round(dh));
        }
        this.postRender(context, frameState);
        if (clipped) {
            context.restore();
        }
        var opacity = layerState.opacity;
        if (opacity !== parseFloat(canvas.style.opacity)) {
            canvas.style.opacity = opacity;
        }
        var canvasTransform = transformToString(this.pixelTransform_);
        if (canvasTransform !== canvas.style.transform) {
            canvas.style.transform = canvasTransform;
        }
        return canvas;
    };
    return CanvasImageLayerRenderer;
}(CanvasLayerRenderer));
export default CanvasImageLayerRenderer;
//# sourceMappingURL=ImageLayer.js.map