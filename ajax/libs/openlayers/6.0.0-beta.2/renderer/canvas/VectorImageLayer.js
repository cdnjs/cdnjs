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
import ImageCanvas from '../../ImageCanvas.js';
import ViewHint from '../../ViewHint.js';
import { equals } from '../../array.js';
import { getHeight, getWidth, isEmpty, scaleFromCenter } from '../../extent.js';
import { assign } from '../../obj.js';
import CanvasImageLayerRenderer from './ImageLayer.js';
import CanvasVectorLayerRenderer from './VectorLayer.js';
import { listen } from '../../events.js';
import EventType from '../../events/EventType.js';
import ImageState from '../../ImageState.js';
/**
 * @classdesc
 * Canvas renderer for image layers.
 * @api
 */
var CanvasVectorImageLayerRenderer = /** @class */ (function (_super) {
    __extends(CanvasVectorImageLayerRenderer, _super);
    /**
     * @param {import("../../layer/VectorImage.js").default} layer Vector image layer.
     */
    function CanvasVectorImageLayerRenderer(layer) {
        var _this = _super.call(this, layer) || this;
        /**
         * @type {!Array<string>}
         */
        _this.skippedFeatures_ = [];
        /**
         * @private
         * @type {import("./VectorLayer.js").default}
         */
        _this.vectorRenderer_ = new CanvasVectorLayerRenderer(layer);
        /**
         * @private
         * @type {number}
         */
        _this.layerImageRatio_ = layer.getImageRatio();
        return _this;
    }
    /**
     * @inheritDoc
     */
    CanvasVectorImageLayerRenderer.prototype.disposeInternal = function () {
        this.vectorRenderer_.dispose();
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * @inheritDoc
     */
    CanvasVectorImageLayerRenderer.prototype.prepareFrame = function (frameState, layerState) {
        var pixelRatio = frameState.pixelRatio;
        var viewState = frameState.viewState;
        var viewResolution = viewState.resolution;
        var hints = frameState.viewHints;
        var vectorRenderer = this.vectorRenderer_;
        var renderedExtent = frameState.extent;
        if (this.layerImageRatio_ !== 1) {
            renderedExtent = renderedExtent.slice(0);
            scaleFromCenter(renderedExtent, this.layerImageRatio_);
        }
        if (!hints[ViewHint.ANIMATING] && !hints[ViewHint.INTERACTING] && !isEmpty(renderedExtent)) {
            var skippedFeatures_1 = this.skippedFeatures_;
            var context = vectorRenderer.context;
            var imageFrameState_1 = /** @type {import("../../PluggableMap.js").FrameState} */ (assign({}, frameState, {
                size: [
                    getWidth(renderedExtent) / viewResolution,
                    getHeight(renderedExtent) / viewResolution
                ],
                viewState: /** @type {import("../../View.js").State} */ (assign({}, frameState.viewState, {
                    rotation: 0
                }))
            }));
            var newSkippedFeatures_1 = Object.keys(imageFrameState_1.skippedFeatureUids).sort();
            var image_1 = new ImageCanvas(renderedExtent, viewResolution, pixelRatio, context.canvas, function (callback) {
                if (vectorRenderer.prepareFrame(imageFrameState_1, layerState) &&
                    (vectorRenderer.replayGroupChanged ||
                        !equals(skippedFeatures_1, newSkippedFeatures_1))) {
                    vectorRenderer.renderFrame(imageFrameState_1, layerState);
                    skippedFeatures_1 = newSkippedFeatures_1;
                    callback();
                }
            });
            listen(image_1, EventType.CHANGE, function () {
                if (image_1.getState() === ImageState.LOADED) {
                    this.image_ = image_1;
                    this.skippedFeatures_ = skippedFeatures_1;
                }
            }, this);
            image_1.load();
        }
        if (this.image_) {
            var image = this.image_;
            var imageResolution = image.getResolution();
            var imagePixelRatio = image.getPixelRatio();
            this.renderedResolution = imageResolution * pixelRatio / imagePixelRatio;
        }
        return !!this.image_;
    };
    /**
     * @override
     */
    CanvasVectorImageLayerRenderer.prototype.preRender = function () { };
    /**
     * @override
     */
    CanvasVectorImageLayerRenderer.prototype.postRender = function () { };
    /**
     * @inheritDoc
     */
    CanvasVectorImageLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback) {
        if (this.vectorRenderer_) {
            return this.vectorRenderer_.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback);
        }
        else {
            return _super.prototype.forEachFeatureAtCoordinate.call(this, coordinate, frameState, hitTolerance, callback);
        }
    };
    return CanvasVectorImageLayerRenderer;
}(CanvasImageLayerRenderer));
export default CanvasVectorImageLayerRenderer;
//# sourceMappingURL=VectorImageLayer.js.map