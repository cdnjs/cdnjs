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
 * @module ol/source/Image
 */
import Event from '../events/Event.js';
import ImageState from '../ImageState.js';
import ReprojImage from '../reproj/Image.js';
import Source from './Source.js';
import { ENABLE_RASTER_REPROJECTION } from '../reproj/common.js';
import { IMAGE_SMOOTHING_DISABLED } from './common.js';
import { abstract } from '../util.js';
import { equals } from '../extent.js';
import { equivalent } from '../proj.js';
import { linearFindNearest } from '../array.js';
/**
 * @enum {string}
 */
export var ImageSourceEventType = {
    /**
     * Triggered when an image starts loading.
     * @event module:ol/source/Image.ImageSourceEvent#imageloadstart
     * @api
     */
    IMAGELOADSTART: 'imageloadstart',
    /**
     * Triggered when an image finishes loading.
     * @event module:ol/source/Image.ImageSourceEvent#imageloadend
     * @api
     */
    IMAGELOADEND: 'imageloadend',
    /**
     * Triggered if image loading results in an error.
     * @event module:ol/source/Image.ImageSourceEvent#imageloaderror
     * @api
     */
    IMAGELOADERROR: 'imageloaderror',
};
/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Image~ImageSource} instances are instances of this
 * type.
 */
var ImageSourceEvent = /** @class */ (function (_super) {
    __extends(ImageSourceEvent, _super);
    /**
     * @param {string} type Type.
     * @param {import("../Image.js").default} image The image.
     */
    function ImageSourceEvent(type, image) {
        var _this = _super.call(this, type) || this;
        /**
         * The image related to the event.
         * @type {import("../Image.js").default}
         * @api
         */
        _this.image = image;
        return _this;
    }
    return ImageSourceEvent;
}(Event));
export { ImageSourceEvent };
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions]
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {import("../proj.js").ProjectionLike} [projection]
 * @property {Array<number>} [resolutions]
 * @property {import("./State.js").default} [state]
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing a single image.
 * @abstract
 * @fires module:ol/source/Image.ImageSourceEvent
 * @api
 */
var ImageSource = /** @class */ (function (_super) {
    __extends(ImageSource, _super);
    /**
     * @param {Options} options Single image source options.
     */
    function ImageSource(options) {
        var _this = _super.call(this, {
            attributions: options.attributions,
            projection: options.projection,
            state: options.state,
        }) || this;
        /**
         * @private
         * @type {Array<number>}
         */
        _this.resolutions_ =
            options.resolutions !== undefined ? options.resolutions : null;
        /**
         * @private
         * @type {import("../reproj/Image.js").default}
         */
        _this.reprojectedImage_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.reprojectedRevision_ = 0;
        /**
         * @private
         * @type {object|undefined}
         */
        _this.contextOptions_ =
            options.imageSmoothing === false ? IMAGE_SMOOTHING_DISABLED : undefined;
        return _this;
    }
    /**
     * @return {Array<number>} Resolutions.
     */
    ImageSource.prototype.getResolutions = function () {
        return this.resolutions_;
    };
    /**
     * @return {Object|undefined} Context options.
     */
    ImageSource.prototype.getContextOptions = function () {
        return this.contextOptions_;
    };
    /**
     * @protected
     * @param {number} resolution Resolution.
     * @return {number} Resolution.
     */
    ImageSource.prototype.findNearestResolution = function (resolution) {
        if (this.resolutions_) {
            var idx = linearFindNearest(this.resolutions_, resolution, 0);
            resolution = this.resolutions_[idx];
        }
        return resolution;
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../ImageBase.js").default} Single image.
     */
    ImageSource.prototype.getImage = function (extent, resolution, pixelRatio, projection) {
        var sourceProjection = this.getProjection();
        if (!ENABLE_RASTER_REPROJECTION ||
            !sourceProjection ||
            !projection ||
            equivalent(sourceProjection, projection)) {
            if (sourceProjection) {
                projection = sourceProjection;
            }
            return this.getImageInternal(extent, resolution, pixelRatio, projection);
        }
        else {
            if (this.reprojectedImage_) {
                if (this.reprojectedRevision_ == this.getRevision() &&
                    equivalent(this.reprojectedImage_.getProjection(), projection) &&
                    this.reprojectedImage_.getResolution() == resolution &&
                    equals(this.reprojectedImage_.getExtent(), extent)) {
                    return this.reprojectedImage_;
                }
                this.reprojectedImage_.dispose();
                this.reprojectedImage_ = null;
            }
            this.reprojectedImage_ = new ReprojImage(sourceProjection, projection, extent, resolution, pixelRatio, function (extent, resolution, pixelRatio) {
                return this.getImageInternal(extent, resolution, pixelRatio, sourceProjection);
            }.bind(this), this.contextOptions_);
            this.reprojectedRevision_ = this.getRevision();
            return this.reprojectedImage_;
        }
    };
    /**
     * @abstract
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../ImageBase.js").default} Single image.
     * @protected
     */
    ImageSource.prototype.getImageInternal = function (extent, resolution, pixelRatio, projection) {
        return abstract();
    };
    /**
     * Handle image change events.
     * @param {import("../events/Event.js").default} event Event.
     * @protected
     */
    ImageSource.prototype.handleImageChange = function (event) {
        var image = /** @type {import("../Image.js").default} */ (event.target);
        switch (image.getState()) {
            case ImageState.LOADING:
                this.loading = true;
                this.dispatchEvent(new ImageSourceEvent(ImageSourceEventType.IMAGELOADSTART, image));
                break;
            case ImageState.LOADED:
                this.loading = false;
                this.dispatchEvent(new ImageSourceEvent(ImageSourceEventType.IMAGELOADEND, image));
                break;
            case ImageState.ERROR:
                this.loading = false;
                this.dispatchEvent(new ImageSourceEvent(ImageSourceEventType.IMAGELOADERROR, image));
                break;
            default:
            // pass
        }
    };
    return ImageSource;
}(Source));
/**
 * Default image load function for image sources that use import("../Image.js").Image image
 * instances.
 * @param {import("../Image.js").default} image Image.
 * @param {string} src Source.
 */
export function defaultImageLoadFunction(image, src) {
    /** @type {HTMLImageElement|HTMLVideoElement} */ (image.getImage()).src = src;
}
export default ImageSource;
//# sourceMappingURL=Image.js.map