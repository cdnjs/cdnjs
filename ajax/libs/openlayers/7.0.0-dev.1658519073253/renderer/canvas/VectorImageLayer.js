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
 * @module ol/renderer/canvas/VectorImageLayer
 */
import CanvasImageLayerRenderer from './ImageLayer.js';
import CanvasVectorLayerRenderer from './VectorLayer.js';
import EventType from '../../events/EventType.js';
import ImageCanvas from '../../ImageCanvas.js';
import ImageState from '../../ImageState.js';
import RBush from 'rbush';
import ViewHint from '../../ViewHint.js';
import { apply, compose, create } from '../../transform.js';
import { assign } from '../../obj.js';
import { getHeight, getWidth, isEmpty, scaleFromCenter } from '../../extent.js';
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
         * @private
         * @type {import("./VectorLayer.js").default}
         */
        _this.vectorRenderer_ = new CanvasVectorLayerRenderer(layer);
        /**
         * @private
         * @type {number}
         */
        _this.layerImageRatio_ = layer.getImageRatio();
        /**
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.coordinateToVectorPixelTransform_ = create();
        /**
         * @private
         * @type {import("../../transform.js").Transform}
         */
        _this.renderedPixelToCoordinateTransform_ = null;
        return _this;
    }
    /**
     * Clean up.
     */
    CanvasVectorImageLayerRenderer.prototype.disposeInternal = function () {
        this.vectorRenderer_.dispose();
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * Asynchronous layer level hit detection.
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Promise<Array<import("../../Feature").default>>} Promise that resolves with an array of features.
     */
    CanvasVectorImageLayerRenderer.prototype.getFeatures = function (pixel) {
        if (!this.vectorRenderer_) {
            return new Promise(function (resolve) { return resolve([]); });
        }
        var vectorPixel = apply(this.coordinateToVectorPixelTransform_, apply(this.renderedPixelToCoordinateTransform_, pixel.slice()));
        return this.vectorRenderer_.getFeatures(vectorPixel);
    };
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    CanvasVectorImageLayerRenderer.prototype.handleFontsChanged = function () {
        this.vectorRenderer_.handleFontsChanged();
    };
    /**
     * Determine whether render should be called.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    CanvasVectorImageLayerRenderer.prototype.prepareFrame = function (frameState) {
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
        var width = getWidth(renderedExtent) / viewResolution;
        var height = getHeight(renderedExtent) / viewResolution;
        if (!hints[ViewHint.ANIMATING] &&
            !hints[ViewHint.INTERACTING] &&
            !isEmpty(renderedExtent)) {
            vectorRenderer.useContainer(null, null);
            var context = vectorRenderer.context;
            var layerState = frameState.layerStatesArray[frameState.layerIndex];
            context.globalAlpha = layerState.opacity;
            var imageLayerState = assign({}, layerState, { opacity: 1 });
            var imageFrameState_1 = 
            /** @type {import("../../PluggableMap.js").FrameState} */ (assign({}, frameState, {
                declutterTree: new RBush(9),
                extent: renderedExtent,
                size: [width, height],
                viewState: /** @type {import("../../View.js").State} */ (assign({}, frameState.viewState, {
                    rotation: 0,
                })),
                layerStatesArray: [imageLayerState],
                layerIndex: 0,
            }));
            var emptyImage_1 = true;
            var image_1 = new ImageCanvas(renderedExtent, viewResolution, pixelRatio, context.canvas, function (callback) {
                if (vectorRenderer.prepareFrame(imageFrameState_1) &&
                    vectorRenderer.replayGroupChanged) {
                    vectorRenderer.clipping = false;
                    if (vectorRenderer.renderFrame(imageFrameState_1, null)) {
                        vectorRenderer.renderDeclutter(imageFrameState_1);
                        emptyImage_1 = false;
                    }
                    callback();
                }
            });
            image_1.addEventListener(EventType.CHANGE, function () {
                if (image_1.getState() !== ImageState.LOADED) {
                    return;
                }
                this.image_ = emptyImage_1 ? null : image_1;
                var imageResolution = image_1.getResolution();
                var imagePixelRatio = image_1.getPixelRatio();
                var renderedResolution = (imageResolution * pixelRatio) / imagePixelRatio;
                this.renderedResolution = renderedResolution;
                this.coordinateToVectorPixelTransform_ = compose(this.coordinateToVectorPixelTransform_, width / 2, height / 2, 1 / renderedResolution, -1 / renderedResolution, 0, -viewState.center[0], -viewState.center[1]);
            }.bind(this));
            image_1.load();
        }
        if (this.image_) {
            this.renderedPixelToCoordinateTransform_ =
                frameState.pixelToCoordinateTransform.slice();
        }
        return !!this.image_;
    };
    /**
     */
    CanvasVectorImageLayerRenderer.prototype.preRender = function () { };
    /**
     */
    CanvasVectorImageLayerRenderer.prototype.postRender = function () { };
    /**
     */
    CanvasVectorImageLayerRenderer.prototype.renderDeclutter = function () { };
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
     * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
     * @return {T|undefined} Callback result.
     * @template T
     */
    CanvasVectorImageLayerRenderer.prototype.forEachFeatureAtCoordinate = function (coordinate, frameState, hitTolerance, callback, matches) {
        if (this.vectorRenderer_) {
            return this.vectorRenderer_.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches);
        }
        else {
            return _super.prototype.forEachFeatureAtCoordinate.call(this, coordinate, frameState, hitTolerance, callback, matches);
        }
    };
    return CanvasVectorImageLayerRenderer;
}(CanvasImageLayerRenderer));
export default CanvasVectorImageLayerRenderer;
//# sourceMappingURL=VectorImageLayer.js.map