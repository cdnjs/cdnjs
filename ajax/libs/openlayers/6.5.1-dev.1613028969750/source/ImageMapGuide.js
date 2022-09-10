/**
 * @module ol/source/ImageMapGuide
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import EventType from '../events/EventType.js';
import ImageSource, { defaultImageLoadFunction } from './Image.js';
import ImageWrapper from '../Image.js';
import { appendParams } from '../uri.js';
import { assign } from '../obj.js';
import { containsExtent, getCenter, getHeight, getWidth, scaleFromCenter, } from '../extent.js';
/**
 * @typedef {Object} Options
 * @property {string} [url] The mapagent url.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {number} [displayDpi=96] The display resolution.
 * @property {number} [metersPerUnit=1] The meters-per-unit value.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting
 * the image from the remote server.
 * @property {boolean} [useOverlay] If `true`, will use `GETDYNAMICMAPOVERLAYIMAGE`.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [ratio=1] Ratio. `1` means image requests are the size of the map viewport, `2` means
 * twice the width and height of the map viewport, and so on. Must be `1` or higher.
 * @property {Array<number>} [resolutions] Resolutions.
 * If specified, requests will be made for these resolutions only.
 * @property {import("../Image.js").LoadFunction} [imageLoadFunction] Optional function to load an image given a URL.
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {Object} [params] Additional parameters.
 */
/**
 * @classdesc
 * Source for images from Mapguide servers
 *
 * @fires module:ol/source/Image.ImageSourceEvent
 * @api
 */
var ImageMapGuide = /** @class */ (function (_super) {
    __extends(ImageMapGuide, _super);
    /**
     * @param {Options} options ImageMapGuide options.
     */
    function ImageMapGuide(options) {
        var _this = _super.call(this, {
            imageSmoothing: options.imageSmoothing,
            projection: options.projection,
            resolutions: options.resolutions,
        }) || this;
        /**
         * @private
         * @type {?string}
         */
        _this.crossOrigin_ =
            options.crossOrigin !== undefined ? options.crossOrigin : null;
        /**
         * @private
         * @type {number}
         */
        _this.displayDpi_ =
            options.displayDpi !== undefined ? options.displayDpi : 96;
        /**
         * @private
         * @type {!Object}
         */
        _this.params_ = options.params || {};
        /**
         * @private
         * @type {string|undefined}
         */
        _this.url_ = options.url;
        /**
         * @private
         * @type {import("../Image.js").LoadFunction}
         */
        _this.imageLoadFunction_ =
            options.imageLoadFunction !== undefined
                ? options.imageLoadFunction
                : defaultImageLoadFunction;
        /**
         * @private
         * @type {boolean}
         */
        _this.hidpi_ = options.hidpi !== undefined ? options.hidpi : true;
        /**
         * @private
         * @type {number}
         */
        _this.metersPerUnit_ =
            options.metersPerUnit !== undefined ? options.metersPerUnit : 1;
        /**
         * @private
         * @type {number}
         */
        _this.ratio_ = options.ratio !== undefined ? options.ratio : 1;
        /**
         * @private
         * @type {boolean}
         */
        _this.useOverlay_ =
            options.useOverlay !== undefined ? options.useOverlay : false;
        /**
         * @private
         * @type {import("../Image.js").default}
         */
        _this.image_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.renderedRevision_ = 0;
        return _this;
    }
    /**
     * Get the user-provided params, i.e. those passed to the constructor through
     * the "params" option, and possibly updated using the updateParams method.
     * @return {Object} Params.
     * @api
     */
    ImageMapGuide.prototype.getParams = function () {
        return this.params_;
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../Image.js").default} Single image.
     */
    ImageMapGuide.prototype.getImageInternal = function (extent, resolution, pixelRatio, projection) {
        resolution = this.findNearestResolution(resolution);
        pixelRatio = this.hidpi_ ? pixelRatio : 1;
        var image = this.image_;
        if (image &&
            this.renderedRevision_ == this.getRevision() &&
            image.getResolution() == resolution &&
            image.getPixelRatio() == pixelRatio &&
            containsExtent(image.getExtent(), extent)) {
            return image;
        }
        if (this.ratio_ != 1) {
            extent = extent.slice();
            scaleFromCenter(extent, this.ratio_);
        }
        var width = getWidth(extent) / resolution;
        var height = getHeight(extent) / resolution;
        var size = [width * pixelRatio, height * pixelRatio];
        if (this.url_ !== undefined) {
            var imageUrl = this.getUrl(this.url_, this.params_, extent, size, projection);
            image = new ImageWrapper(extent, resolution, pixelRatio, imageUrl, this.crossOrigin_, this.imageLoadFunction_);
            image.addEventListener(EventType.CHANGE, this.handleImageChange.bind(this));
        }
        else {
            image = null;
        }
        this.image_ = image;
        this.renderedRevision_ = this.getRevision();
        return image;
    };
    /**
     * Return the image load function of the source.
     * @return {import("../Image.js").LoadFunction} The image load function.
     * @api
     */
    ImageMapGuide.prototype.getImageLoadFunction = function () {
        return this.imageLoadFunction_;
    };
    /**
     * Update the user-provided params.
     * @param {Object} params Params.
     * @api
     */
    ImageMapGuide.prototype.updateParams = function (params) {
        assign(this.params_, params);
        this.changed();
    };
    /**
     * @param {string} baseUrl The mapagent url.
     * @param {Object<string, string|number>} params Request parameters.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {import("../size.js").Size} size Size.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {string} The mapagent map image request URL.
     */
    ImageMapGuide.prototype.getUrl = function (baseUrl, params, extent, size, projection) {
        var scale = getScale(extent, size, this.metersPerUnit_, this.displayDpi_);
        var center = getCenter(extent);
        var baseParams = {
            'OPERATION': this.useOverlay_
                ? 'GETDYNAMICMAPOVERLAYIMAGE'
                : 'GETMAPIMAGE',
            'VERSION': '2.0.0',
            'LOCALE': 'en',
            'CLIENTAGENT': 'ol/source/ImageMapGuide source',
            'CLIP': '1',
            'SETDISPLAYDPI': this.displayDpi_,
            'SETDISPLAYWIDTH': Math.round(size[0]),
            'SETDISPLAYHEIGHT': Math.round(size[1]),
            'SETVIEWSCALE': scale,
            'SETVIEWCENTERX': center[0],
            'SETVIEWCENTERY': center[1],
        };
        assign(baseParams, params);
        return appendParams(baseUrl, baseParams);
    };
    /**
     * Set the image load function of the MapGuide source.
     * @param {import("../Image.js").LoadFunction} imageLoadFunction Image load function.
     * @api
     */
    ImageMapGuide.prototype.setImageLoadFunction = function (imageLoadFunction) {
        this.image_ = null;
        this.imageLoadFunction_ = imageLoadFunction;
        this.changed();
    };
    return ImageMapGuide;
}(ImageSource));
/**
 * @param {import("../extent.js").Extent} extent The map extents.
 * @param {import("../size.js").Size} size The viewport size.
 * @param {number} metersPerUnit The meters-per-unit value.
 * @param {number} dpi The display resolution.
 * @return {number} The computed map scale.
 */
function getScale(extent, size, metersPerUnit, dpi) {
    var mcsW = getWidth(extent);
    var mcsH = getHeight(extent);
    var devW = size[0];
    var devH = size[1];
    var mpp = 0.0254 / dpi;
    if (devH * mcsW > devW * mcsH) {
        return (mcsW * metersPerUnit) / (devW * mpp); // width limited
    }
    else {
        return (mcsH * metersPerUnit) / (devH * mpp); // height limited
    }
}
export default ImageMapGuide;
//# sourceMappingURL=ImageMapGuide.js.map