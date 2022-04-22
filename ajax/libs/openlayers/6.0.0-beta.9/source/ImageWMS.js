/**
 * @module ol/source/ImageWMS
 */
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
import { DEFAULT_WMS_VERSION } from './common.js';
import ImageWrapper from '../Image.js';
import { assert } from '../asserts.js';
import { listen } from '../events.js';
import EventType from '../events/EventType.js';
import { containsExtent, getCenter, getForViewAndSize, getHeight, getWidth } from '../extent.js';
import { assign } from '../obj.js';
import { get as getProjection, transform } from '../proj.js';
import { calculateSourceResolution } from '../reproj.js';
import ImageSource, { defaultImageLoadFunction } from './Image.js';
import WMSServerType from './WMSServerType.js';
import { compareVersions } from '../string.js';
import { appendParams } from '../uri.js';
/**
 * @const
 * @type {import("../size.js").Size}
 */
var GETFEATUREINFO_IMAGE_SIZE = [101, 101];
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting
 * the image from the remote server.
 * @property {import("./WMSServerType.js").default|string} [serverType] The type of
 * the remote WMS server: `mapserver`, `geoserver` or `qgis`. Only needed if `hidpi` is `true`.
 * @property {import("../Image.js").LoadFunction} [imageLoadFunction] Optional function to load an image given a URL.
 * @property {Object<string,*>} params WMS request parameters.
 * At least a `LAYERS` param is required. `STYLES` is
 * `''` by default. `VERSION` is `1.3.0` by default. `WIDTH`, `HEIGHT`, `BBOX`
 * and `CRS` (`SRS` for WMS version < 1.3.0) will be set dynamically.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [ratio=1.5] Ratio. `1` means image requests are the size of the map viewport, `2` means
 * twice the width and height of the map viewport, and so on. Must be `1` or
 * higher.
 * @property {Array<number>} [resolutions] Resolutions.
 * If specified, requests will be made for these resolutions only.
 * @property {string} url WMS service URL.
 */
/**
 * @classdesc
 * Source for WMS servers providing single, untiled images.
 *
 * @fires module:ol/source/Image.ImageSourceEvent
 * @api
 */
var ImageWMS = /** @class */ (function (_super) {
    __extends(ImageWMS, _super);
    /**
     * @param {Options=} [opt_options] ImageWMS options.
     */
    function ImageWMS(opt_options) {
        var _this = this;
        var options = opt_options || /** @type {Options} */ ({});
        _this = _super.call(this, {
            attributions: options.attributions,
            projection: options.projection,
            resolutions: options.resolutions
        }) || this;
        /**
         * @private
         * @type {?string}
         */
        _this.crossOrigin_ =
            options.crossOrigin !== undefined ? options.crossOrigin : null;
        /**
         * @private
         * @type {string|undefined}
         */
        _this.url_ = options.url;
        /**
         * @private
         * @type {import("../Image.js").LoadFunction}
         */
        _this.imageLoadFunction_ = options.imageLoadFunction !== undefined ?
            options.imageLoadFunction : defaultImageLoadFunction;
        /**
         * @private
         * @type {!Object}
         */
        _this.params_ = options.params || {};
        /**
         * @private
         * @type {boolean}
         */
        _this.v13_ = true;
        _this.updateV13_();
        /**
         * @private
         * @type {import("./WMSServerType.js").default|undefined}
         */
        _this.serverType_ = /** @type {import("./WMSServerType.js").default|undefined} */ (options.serverType);
        /**
         * @private
         * @type {boolean}
         */
        _this.hidpi_ = options.hidpi !== undefined ? options.hidpi : true;
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
     * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
     * projection. Return `undefined` if the GetFeatureInfo URL cannot be
     * constructed.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {import("../proj.js").ProjectionLike} projection Projection.
     * @param {!Object} params GetFeatureInfo params. `INFO_FORMAT` at least should
     *     be provided. If `QUERY_LAYERS` is not provided then the layers specified
     *     in the `LAYERS` parameter will be used. `VERSION` should not be
     *     specified here.
     * @return {string|undefined} GetFeatureInfo URL.
     * @api
     */
    ImageWMS.prototype.getGetFeatureInfoUrl = function (coordinate, resolution, projection, params) {
        if (this.url_ === undefined) {
            return undefined;
        }
        var projectionObj = getProjection(projection);
        var sourceProjectionObj = this.getProjection();
        if (sourceProjectionObj && sourceProjectionObj !== projectionObj) {
            resolution = calculateSourceResolution(sourceProjectionObj, projectionObj, coordinate, resolution);
            coordinate = transform(coordinate, projectionObj, sourceProjectionObj);
        }
        var extent = getForViewAndSize(coordinate, resolution, 0, GETFEATUREINFO_IMAGE_SIZE);
        var baseParams = {
            'SERVICE': 'WMS',
            'VERSION': DEFAULT_WMS_VERSION,
            'REQUEST': 'GetFeatureInfo',
            'FORMAT': 'image/png',
            'TRANSPARENT': true,
            'QUERY_LAYERS': this.params_['LAYERS']
        };
        assign(baseParams, this.params_, params);
        var x = Math.floor((coordinate[0] - extent[0]) / resolution);
        var y = Math.floor((extent[3] - coordinate[1]) / resolution);
        baseParams[this.v13_ ? 'I' : 'X'] = x;
        baseParams[this.v13_ ? 'J' : 'Y'] = y;
        return this.getRequestUrl_(extent, GETFEATUREINFO_IMAGE_SIZE, 1, sourceProjectionObj || projectionObj, baseParams);
    };
    /**
     * Get the user-provided params, i.e. those passed to the constructor through
     * the "params" option, and possibly updated using the updateParams method.
     * @return {Object} Params.
     * @api
     */
    ImageWMS.prototype.getParams = function () {
        return this.params_;
    };
    /**
     * @inheritDoc
     */
    ImageWMS.prototype.getImageInternal = function (extent, resolution, pixelRatio, projection) {
        if (this.url_ === undefined) {
            return null;
        }
        resolution = this.findNearestResolution(resolution);
        if (pixelRatio != 1 && (!this.hidpi_ || this.serverType_ === undefined)) {
            pixelRatio = 1;
        }
        var imageResolution = resolution / pixelRatio;
        var center = getCenter(extent);
        var viewWidth = Math.ceil(getWidth(extent) / imageResolution);
        var viewHeight = Math.ceil(getHeight(extent) / imageResolution);
        var viewExtent = getForViewAndSize(center, imageResolution, 0, [viewWidth, viewHeight]);
        var requestWidth = Math.ceil(this.ratio_ * getWidth(extent) / imageResolution);
        var requestHeight = Math.ceil(this.ratio_ * getHeight(extent) / imageResolution);
        var requestExtent = getForViewAndSize(center, imageResolution, 0, [requestWidth, requestHeight]);
        var image = this.image_;
        if (image &&
            this.renderedRevision_ == this.getRevision() &&
            image.getResolution() == resolution &&
            image.getPixelRatio() == pixelRatio &&
            containsExtent(image.getExtent(), viewExtent)) {
            return image;
        }
        var params = {
            'SERVICE': 'WMS',
            'VERSION': DEFAULT_WMS_VERSION,
            'REQUEST': 'GetMap',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        };
        assign(params, this.params_);
        this.imageSize_[0] = Math.round(getWidth(requestExtent) / imageResolution);
        this.imageSize_[1] = Math.round(getHeight(requestExtent) / imageResolution);
        var url = this.getRequestUrl_(requestExtent, this.imageSize_, pixelRatio, projection, params);
        this.image_ = new ImageWrapper(requestExtent, resolution, pixelRatio, url, this.crossOrigin_, this.imageLoadFunction_);
        this.renderedRevision_ = this.getRevision();
        listen(this.image_, EventType.CHANGE, this.handleImageChange, this);
        return this.image_;
    };
    /**
     * Return the image load function of the source.
     * @return {import("../Image.js").LoadFunction} The image load function.
     * @api
     */
    ImageWMS.prototype.getImageLoadFunction = function () {
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
    ImageWMS.prototype.getRequestUrl_ = function (extent, size, pixelRatio, projection, params) {
        assert(this.url_ !== undefined, 9); // `url` must be configured or set using `#setUrl()`
        params[this.v13_ ? 'CRS' : 'SRS'] = projection.getCode();
        if (!('STYLES' in this.params_)) {
            params['STYLES'] = '';
        }
        if (pixelRatio != 1) {
            switch (this.serverType_) {
                case WMSServerType.GEOSERVER:
                    var dpi = (90 * pixelRatio + 0.5) | 0;
                    if ('FORMAT_OPTIONS' in params) {
                        params['FORMAT_OPTIONS'] += ';dpi:' + dpi;
                    }
                    else {
                        params['FORMAT_OPTIONS'] = 'dpi:' + dpi;
                    }
                    break;
                case WMSServerType.MAPSERVER:
                    params['MAP_RESOLUTION'] = 90 * pixelRatio;
                    break;
                case WMSServerType.CARMENTA_SERVER:
                case WMSServerType.QGIS:
                    params['DPI'] = 90 * pixelRatio;
                    break;
                default:
                    assert(false, 8); // Unknown `serverType` configured
                    break;
            }
        }
        params['WIDTH'] = size[0];
        params['HEIGHT'] = size[1];
        var axisOrientation = projection.getAxisOrientation();
        var bbox;
        if (this.v13_ && axisOrientation.substr(0, 2) == 'ne') {
            bbox = [extent[1], extent[0], extent[3], extent[2]];
        }
        else {
            bbox = extent;
        }
        params['BBOX'] = bbox.join(',');
        return appendParams(/** @type {string} */ (this.url_), params);
    };
    /**
     * Return the URL used for this WMS source.
     * @return {string|undefined} URL.
     * @api
     */
    ImageWMS.prototype.getUrl = function () {
        return this.url_;
    };
    /**
     * Set the image load function of the source.
     * @param {import("../Image.js").LoadFunction} imageLoadFunction Image load function.
     * @api
     */
    ImageWMS.prototype.setImageLoadFunction = function (imageLoadFunction) {
        this.image_ = null;
        this.imageLoadFunction_ = imageLoadFunction;
        this.changed();
    };
    /**
     * Set the URL to use for requests.
     * @param {string|undefined} url URL.
     * @api
     */
    ImageWMS.prototype.setUrl = function (url) {
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
    ImageWMS.prototype.updateParams = function (params) {
        assign(this.params_, params);
        this.updateV13_();
        this.image_ = null;
        this.changed();
    };
    /**
     * @private
     */
    ImageWMS.prototype.updateV13_ = function () {
        var version = this.params_['VERSION'] || DEFAULT_WMS_VERSION;
        this.v13_ = compareVersions(version, '1.3') >= 0;
    };
    return ImageWMS;
}(ImageSource));
export default ImageWMS;
//# sourceMappingURL=ImageWMS.js.map