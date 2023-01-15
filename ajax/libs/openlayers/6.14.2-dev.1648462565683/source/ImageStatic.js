/**
 * @module ol/source/ImageStatic
 */
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
import EventType from '../events/EventType.js';
import ImageSource, { defaultImageLoadFunction } from './Image.js';
import ImageState from '../ImageState.js';
import ImageWrapper from '../Image.js';
import { IMAGE_SMOOTHING_DISABLED } from '../renderer/canvas/common.js';
import { assign } from '../obj.js';
import { createCanvasContext2D } from '../dom.js';
import { getHeight, getWidth, intersects } from '../extent.js';
import { get as getProjection } from '../proj.js';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {import("../extent.js").Extent} [imageExtent] Extent of the image in map coordinates.
 * This is the [left, bottom, right, top] map coordinates of your image.
 * @property {import("../Image.js").LoadFunction} [imageLoadFunction] Optional function to load an image given a URL.
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {import("../size.js").Size} [imageSize] Size of the image in pixels. Usually the image size is auto-detected, so this
 * only needs to be set if auto-detection fails for some reason.
 * @property {string} url Image URL.
 */
/**
 * @classdesc
 * A layer source for displaying a single, static image.
 * @api
 */
var Static = /** @class */ (function (_super) {
    __extends(Static, _super);
    /**
     * @param {Options} options ImageStatic options.
     */
    function Static(options) {
        var _this = this;
        var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : null;
        var /** @type {import("../Image.js").LoadFunction} */ imageLoadFunction = options.imageLoadFunction !== undefined
            ? options.imageLoadFunction
            : defaultImageLoadFunction;
        var interpolate = options.imageSmoothing !== undefined ? options.imageSmoothing : true;
        if (options.interpolate !== undefined) {
            interpolate = options.interpolate;
        }
        _this = _super.call(this, {
            attributions: options.attributions,
            interpolate: interpolate,
            projection: getProjection(options.projection),
        }) || this;
        /**
         * @private
         * @type {string}
         */
        _this.url_ = options.url;
        /**
         * @private
         * @type {import("../extent.js").Extent}
         */
        _this.imageExtent_ = options.imageExtent;
        /**
         * @private
         * @type {import("../Image.js").default}
         */
        _this.image_ = new ImageWrapper(_this.imageExtent_, undefined, 1, _this.url_, crossOrigin, imageLoadFunction);
        /**
         * @private
         * @type {import("../size.js").Size|null}
         */
        _this.imageSize_ = options.imageSize ? options.imageSize : null;
        _this.image_.addEventListener(EventType.CHANGE, _this.handleImageChange.bind(_this));
        return _this;
    }
    /**
     * Returns the image extent
     * @return {import("../extent.js").Extent} image extent.
     * @api
     */
    Static.prototype.getImageExtent = function () {
        return this.imageExtent_;
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../Image.js").default} Single image.
     */
    Static.prototype.getImageInternal = function (extent, resolution, pixelRatio, projection) {
        if (intersects(extent, this.image_.getExtent())) {
            return this.image_;
        }
        return null;
    };
    /**
     * Return the URL used for this image source.
     * @return {string} URL.
     * @api
     */
    Static.prototype.getUrl = function () {
        return this.url_;
    };
    /**
     * @param {import("../events/Event.js").default} evt Event.
     */
    Static.prototype.handleImageChange = function (evt) {
        if (this.image_.getState() == ImageState.LOADED) {
            var imageExtent = this.image_.getExtent();
            var image = this.image_.getImage();
            var imageWidth = void 0, imageHeight = void 0;
            if (this.imageSize_) {
                imageWidth = this.imageSize_[0];
                imageHeight = this.imageSize_[1];
            }
            else {
                imageWidth = image.width;
                imageHeight = image.height;
            }
            var extentWidth = getWidth(imageExtent);
            var extentHeight = getHeight(imageExtent);
            var xResolution = extentWidth / imageWidth;
            var yResolution = extentHeight / imageHeight;
            var targetWidth = imageWidth;
            var targetHeight = imageHeight;
            if (xResolution > yResolution) {
                targetWidth = Math.round(extentWidth / yResolution);
            }
            else {
                targetHeight = Math.round(extentHeight / xResolution);
            }
            if (targetWidth !== imageWidth || targetHeight !== imageHeight) {
                var context = createCanvasContext2D(targetWidth, targetHeight);
                if (!this.getInterpolate()) {
                    assign(context, IMAGE_SMOOTHING_DISABLED);
                }
                var canvas = context.canvas;
                context.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, canvas.width, canvas.height);
                this.image_.setImage(canvas);
            }
        }
        _super.prototype.handleImageChange.call(this, evt);
    };
    return Static;
}(ImageSource));
export default Static;
//# sourceMappingURL=ImageStatic.js.map