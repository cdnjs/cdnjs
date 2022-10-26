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
 * @module ol/reproj/Image
 */
import { ERROR_THRESHOLD } from './common.js';
import EventType from '../events/EventType.js';
import ImageBase from '../ImageBase.js';
import ImageState from '../ImageState.js';
import Triangulation from './Triangulation.js';
import { calculateSourceResolution, render as renderReprojected, } from '../reproj.js';
import { getCenter, getHeight, getIntersection, getWidth } from '../extent.js';
import { listen, unlistenByKey } from '../events.js';
/**
 * @typedef {function(import("../extent.js").Extent, number, number) : import("../ImageBase.js").default} FunctionType
 */
/**
 * @classdesc
 * Class encapsulating single reprojected image.
 * See {@link module:ol/source/Image~ImageSource}.
 */
var ReprojImage = /** @class */ (function (_super) {
    __extends(ReprojImage, _super);
    /**
     * @param {import("../proj/Projection.js").default} sourceProj Source projection (of the data).
     * @param {import("../proj/Projection.js").default} targetProj Target projection.
     * @param {import("../extent.js").Extent} targetExtent Target extent.
     * @param {number} targetResolution Target resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {FunctionType} getImageFunction
     *     Function returning source images (extent, resolution, pixelRatio).
     * @param {object} [opt_contextOptions] Properties to set on the canvas context.
     */
    function ReprojImage(sourceProj, targetProj, targetExtent, targetResolution, pixelRatio, getImageFunction, opt_contextOptions) {
        var _this = this;
        var maxSourceExtent = sourceProj.getExtent();
        var maxTargetExtent = targetProj.getExtent();
        var limitedTargetExtent = maxTargetExtent
            ? getIntersection(targetExtent, maxTargetExtent)
            : targetExtent;
        var targetCenter = getCenter(limitedTargetExtent);
        var sourceResolution = calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution);
        var errorThresholdInPixels = ERROR_THRESHOLD;
        var triangulation = new Triangulation(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);
        var sourceExtent = triangulation.calculateSourceExtent();
        var sourceImage = getImageFunction(sourceExtent, sourceResolution, pixelRatio);
        var state = sourceImage ? ImageState.IDLE : ImageState.EMPTY;
        var sourcePixelRatio = sourceImage ? sourceImage.getPixelRatio() : 1;
        _this = _super.call(this, targetExtent, targetResolution, sourcePixelRatio, state) || this;
        /**
         * @private
         * @type {import("../proj/Projection.js").default}
         */
        _this.targetProj_ = targetProj;
        /**
         * @private
         * @type {import("../extent.js").Extent}
         */
        _this.maxSourceExtent_ = maxSourceExtent;
        /**
         * @private
         * @type {!import("./Triangulation.js").default}
         */
        _this.triangulation_ = triangulation;
        /**
         * @private
         * @type {number}
         */
        _this.targetResolution_ = targetResolution;
        /**
         * @private
         * @type {import("../extent.js").Extent}
         */
        _this.targetExtent_ = targetExtent;
        /**
         * @private
         * @type {import("../ImageBase.js").default}
         */
        _this.sourceImage_ = sourceImage;
        /**
         * @private
         * @type {number}
         */
        _this.sourcePixelRatio_ = sourcePixelRatio;
        /**
         * @private
         * @type {object}
         */
        _this.contextOptions_ = opt_contextOptions;
        /**
         * @private
         * @type {HTMLCanvasElement}
         */
        _this.canvas_ = null;
        /**
         * @private
         * @type {?import("../events.js").EventsKey}
         */
        _this.sourceListenerKey_ = null;
        return _this;
    }
    /**
     * Clean up.
     */
    ReprojImage.prototype.disposeInternal = function () {
        if (this.state == ImageState.LOADING) {
            this.unlistenSource_();
        }
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * @return {HTMLCanvasElement} Image.
     */
    ReprojImage.prototype.getImage = function () {
        return this.canvas_;
    };
    /**
     * @return {import("../proj/Projection.js").default} Projection.
     */
    ReprojImage.prototype.getProjection = function () {
        return this.targetProj_;
    };
    /**
     * @private
     */
    ReprojImage.prototype.reproject_ = function () {
        var sourceState = this.sourceImage_.getState();
        if (sourceState == ImageState.LOADED) {
            var width = getWidth(this.targetExtent_) / this.targetResolution_;
            var height = getHeight(this.targetExtent_) / this.targetResolution_;
            this.canvas_ = renderReprojected(width, height, this.sourcePixelRatio_, this.sourceImage_.getResolution(), this.maxSourceExtent_, this.targetResolution_, this.targetExtent_, this.triangulation_, [
                {
                    extent: this.sourceImage_.getExtent(),
                    image: this.sourceImage_.getImage(),
                },
            ], 0, undefined, this.contextOptions_);
        }
        this.state = sourceState;
        this.changed();
    };
    /**
     * Load not yet loaded URI.
     */
    ReprojImage.prototype.load = function () {
        if (this.state == ImageState.IDLE) {
            this.state = ImageState.LOADING;
            this.changed();
            var sourceState = this.sourceImage_.getState();
            if (sourceState == ImageState.LOADED || sourceState == ImageState.ERROR) {
                this.reproject_();
            }
            else {
                this.sourceListenerKey_ = listen(this.sourceImage_, EventType.CHANGE, function (e) {
                    var sourceState = this.sourceImage_.getState();
                    if (sourceState == ImageState.LOADED ||
                        sourceState == ImageState.ERROR) {
                        this.unlistenSource_();
                        this.reproject_();
                    }
                }, this);
                this.sourceImage_.load();
            }
        }
    };
    /**
     * @private
     */
    ReprojImage.prototype.unlistenSource_ = function () {
        unlistenByKey(
        /** @type {!import("../events.js").EventsKey} */ (this.sourceListenerKey_));
        this.sourceListenerKey_ = null;
    };
    return ReprojImage;
}(ImageBase));
export default ReprojImage;
//# sourceMappingURL=Image.js.map