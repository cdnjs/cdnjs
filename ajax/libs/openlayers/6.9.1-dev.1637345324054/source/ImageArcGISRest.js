/**
 * @module ol/source/ImageArcGISRest
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
import ImageWrapper from '../Image.js';
import { appendParams } from '../uri.js';
import { assert } from '../asserts.js';
import { assign } from '../obj.js';
import { containsExtent, getHeight, getWidth } from '../extent.js';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting the image from
 * the remote server.
 * @property {import("../Image.js").LoadFunction} [imageLoadFunction] Optional function to load an image given
 * a URL.
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {Object<string,*>} [params] ArcGIS Rest parameters. This field is optional. Service
 * defaults will be used for any fields not specified. `FORMAT` is `PNG32` by default. `F` is
 * `IMAGE` by default. `TRANSPARENT` is `true` by default.  `BBOX`, `SIZE`, `BBOXSR`, and `IMAGESR`
 * will be set dynamically. Set `LAYERS` to override the default service layer visibility. See
 * https://developers.arcgis.com/rest/services-reference/export-map.htm
 * for further reference.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * The projection code must contain a numeric end portion separated by :
 * or the entire code must form a valid ArcGIS SpatialReference definition.
 * @property {number} [ratio=1.5] Ratio. `1` means image requests are the size of the map viewport,
 * `2` means twice the size of the map viewport, and so on.
 * @property {Array<number>} [resolutions] Resolutions. If specified, requests will be made for
 * these resolutions only.
 * @property {string} [url] ArcGIS Rest service URL for a Map Service or Image Service. The url
 * should include /MapServer or /ImageServer.
 */
/**
 * @classdesc
 * Source for data from ArcGIS Rest services providing single, untiled images.
 * Useful when underlying map service has labels.
 *
 * If underlying map service is not using labels,
 * take advantage of ol image caching and use
 * {@link module:ol/source/TileArcGISRest} data source.
 *
 * @fires module:ol/source/Image.ImageSourceEvent
 * @api
 */
var ImageArcGISRest = /** @class */ (function (_super) {
    __extends(ImageArcGISRest, _super);
    /**
     * @param {Options} [opt_options] Image ArcGIS Rest Options.
     */
    function ImageArcGISRest(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            attributions: options.attributions,
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
         * @type {boolean}
         */
        _this.hidpi_ = options.hidpi !== undefined ? options.hidpi : true;
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
         * @type {!Object}
         */
        _this.params_ = options.params || {};
        /**
         * @private
         * @type {import("../Image.js").default}
         */
        _this.image_ = null;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        _this.imageSize_ = [0, 0];
        /**
         * @private
         * @type {number}
         */
        _this.renderedRevision_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.ratio_ = options.ratio !== undefined ? options.ratio : 1.5;
        return _this;
    }
    /**
     * Get the user-provided params, i.e. those passed to the constructor through
     * the "params" option, and possibly updated using the updateParams method.
     * @return {Object} Params.
     * @api
     */
    ImageArcGISRest.prototype.getParams = function () {
        return this.params_;
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../Image.js").default} Single image.
     */
    ImageArcGISRest.prototype.getImageInternal = function (extent, resolution, pixelRatio, projection) {
        if (this.url_ === undefined) {
            return null;
        }
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
        var params = {
            'F': 'image',
            'FORMAT': 'PNG32',
            'TRANSPARENT': true,
        };
        assign(params, this.params_);
        extent = extent.slice();
        var centerX = (extent[0] + extent[2]) / 2;
        var centerY = (extent[1] + extent[3]) / 2;
        if (this.ratio_ != 1) {
            var halfWidth = (this.ratio_ * getWidth(extent)) / 2;
            var halfHeight = (this.ratio_ * getHeight(extent)) / 2;
            extent[0] = centerX - halfWidth;
            extent[1] = centerY - halfHeight;
            extent[2] = centerX + halfWidth;
            extent[3] = centerY + halfHeight;
        }
        var imageResolution = resolution / pixelRatio;
        // Compute an integer width and height.
        var width = Math.ceil(getWidth(extent) / imageResolution);
        var height = Math.ceil(getHeight(extent) / imageResolution);
        // Modify the extent to match the integer width and height.
        extent[0] = centerX - (imageResolution * width) / 2;
        extent[2] = centerX + (imageResolution * width) / 2;
        extent[1] = centerY - (imageResolution * height) / 2;
        extent[3] = centerY + (imageResolution * height) / 2;
        this.imageSize_[0] = width;
        this.imageSize_[1] = height;
        var url = this.getRequestUrl_(extent, this.imageSize_, pixelRatio, projection, params);
        this.image_ = new ImageWrapper(extent, resolution, pixelRatio, url, this.crossOrigin_, this.imageLoadFunction_);
        this.renderedRevision_ = this.getRevision();
        this.image_.addEventListener(EventType.CHANGE, this.handleImageChange.bind(this));
        return this.image_;
    };
    /**
     * Return the image load function of the source.
     * @return {import("../Image.js").LoadFunction} The image load function.
     * @api
     */
    ImageArcGISRest.prototype.getImageLoadFunction = function () {
        return this.imageLoadFunction_;
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {import("../size.js").Size} size Size.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {Object} params Params.
     * @return {string} Request URL.
     * @private
     */
    ImageArcGISRest.prototype.getRequestUrl_ = function (extent, size, pixelRatio, projection, params) {
        // ArcGIS Server only wants the numeric portion of the projection ID.
        // (if there is no numeric portion the entire projection code must
        // form a valid ArcGIS SpatialReference definition).
        var srid = projection
            .getCode()
            .split(/:(?=\d+$)/)
            .pop();
        params['SIZE'] = size[0] + ',' + size[1];
        params['BBOX'] = extent.join(',');
        params['BBOXSR'] = srid;
        params['IMAGESR'] = srid;
        params['DPI'] = Math.round(90 * pixelRatio);
        var url = this.url_;
        var modifiedUrl = url
            .replace(/MapServer\/?$/, 'MapServer/export')
            .replace(/ImageServer\/?$/, 'ImageServer/exportImage');
        if (modifiedUrl == url) {
            assert(false, 50); // `options.featureTypes` should be an Array
        }
        return appendParams(modifiedUrl, params);
    };
    /**
     * Return the URL used for this ArcGIS source.
     * @return {string|undefined} URL.
     * @api
     */
    ImageArcGISRest.prototype.getUrl = function () {
        return this.url_;
    };
    /**
     * Set the image load function of the source.
     * @param {import("../Image.js").LoadFunction} imageLoadFunction Image load function.
     * @api
     */
    ImageArcGISRest.prototype.setImageLoadFunction = function (imageLoadFunction) {
        this.image_ = null;
        this.imageLoadFunction_ = imageLoadFunction;
        this.changed();
    };
    /**
     * Set the URL to use for requests.
     * @param {string|undefined} url URL.
     * @api
     */
    ImageArcGISRest.prototype.setUrl = function (url) {
        if (url != this.url_) {
            this.url_ = url;
            this.image_ = null;
            this.changed();
        }
    };
    /**
     * Update the user-provided params.
     * @param {Object} params Params.
     * @api
     */
    ImageArcGISRest.prototype.updateParams = function (params) {
        assign(this.params_, params);
        this.image_ = null;
        this.changed();
    };
    return ImageArcGISRest;
}(ImageSource));
export default ImageArcGISRest;
//# sourceMappingURL=ImageArcGISRest.js.map