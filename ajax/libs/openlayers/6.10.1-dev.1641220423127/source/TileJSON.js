/**
 * @module ol/source/TileJSON
 */
// FIXME check order of async callbacks
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
 * See https://mapbox.com/developers/api/.
 */
import SourceState from './State.js';
import TileImage from './TileImage.js';
import { applyTransform, intersects } from '../extent.js';
import { assert } from '../asserts.js';
import { createFromTemplates } from '../tileurlfunction.js';
import { createXYZ, extentFromProjection } from '../tilegrid.js';
import { get as getProjection, getTransformFromProjections } from '../proj.js';
import { jsonp as requestJSONP } from '../net.js';
/**
 * @typedef {Object} Config
 * @property {string} [name] The name.
 * @property {string} [description] The description.
 * @property {string} [version] The version.
 * @property {string} [attribution] The attribution.
 * @property {string} [template] The template.
 * @property {string} [legend] The legend.
 * @property {string} [scheme] The scheme.
 * @property {Array<string>} tiles The tile URL templates.
 * @property {Array<string>} [grids] Optional grids.
 * @property {number} [minzoom] Minimum zoom level.
 * @property {number} [maxzoom] Maximum zoom level.
 * @property {Array<number>} [bounds] Optional bounds.
 * @property {Array<number>} [center] Optional center.
 */
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {boolean} [jsonp=false] Use JSONP with callback to load the TileJSON.
 * Useful when the server does not support CORS..
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {Config} [tileJSON] TileJSON configuration for this source.
 * If not provided, `url` must be configured.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The tile size used by the tile service.
 * Note: `tileSize` and other non-standard TileJSON properties are currently ignored.
 * @property {string} [url] URL to the TileJSON file. If not provided, `tileJSON` must be configured.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Layer source for tile data in TileJSON format.
 * @api
 */
var TileJSON = /** @class */ (function (_super) {
    __extends(TileJSON, _super);
    /**
     * @param {Options} options TileJSON options.
     */
    function TileJSON(options) {
        var _this = this;
        var interpolate = options.imageSmoothing !== undefined ? options.imageSmoothing : true;
        if (options.interpolate !== undefined) {
            interpolate = options.interpolate;
        }
        _this = _super.call(this, {
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            interpolate: interpolate,
            projection: getProjection('EPSG:3857'),
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            state: SourceState.LOADING,
            tileLoadFunction: options.tileLoadFunction,
            wrapX: options.wrapX !== undefined ? options.wrapX : true,
            transition: options.transition,
            zDirection: options.zDirection,
        }) || this;
        /**
         * @type {Config}
         * @private
         */
        _this.tileJSON_ = null;
        /**
         * @type {number|import("../size.js").Size}
         * @private
         */
        _this.tileSize_ = options.tileSize;
        if (options.url) {
            if (options.jsonp) {
                requestJSONP(options.url, _this.handleTileJSONResponse.bind(_this), _this.handleTileJSONError.bind(_this));
            }
            else {
                var client = new XMLHttpRequest();
                client.addEventListener('load', _this.onXHRLoad_.bind(_this));
                client.addEventListener('error', _this.onXHRError_.bind(_this));
                client.open('GET', options.url);
                client.send();
            }
        }
        else if (options.tileJSON) {
            _this.handleTileJSONResponse(options.tileJSON);
        }
        else {
            assert(false, 51); // Either `url` or `tileJSON` options must be provided
        }
        return _this;
    }
    /**
     * @private
     * @param {Event} event The load event.
     */
    TileJSON.prototype.onXHRLoad_ = function (event) {
        var client = /** @type {XMLHttpRequest} */ (event.target);
        // status will be 0 for file:// urls
        if (!client.status || (client.status >= 200 && client.status < 300)) {
            var response = void 0;
            try {
                response = /** @type {TileJSON} */ (JSON.parse(client.responseText));
            }
            catch (err) {
                this.handleTileJSONError();
                return;
            }
            this.handleTileJSONResponse(response);
        }
        else {
            this.handleTileJSONError();
        }
    };
    /**
     * @private
     * @param {Event} event The error event.
     */
    TileJSON.prototype.onXHRError_ = function (event) {
        this.handleTileJSONError();
    };
    /**
     * @return {Config} The tilejson object.
     * @api
     */
    TileJSON.prototype.getTileJSON = function () {
        return this.tileJSON_;
    };
    /**
     * @protected
     * @param {Config} tileJSON Tile JSON.
     */
    TileJSON.prototype.handleTileJSONResponse = function (tileJSON) {
        var epsg4326Projection = getProjection('EPSG:4326');
        var sourceProjection = this.getProjection();
        var extent;
        if (tileJSON['bounds'] !== undefined) {
            var transform = getTransformFromProjections(epsg4326Projection, sourceProjection);
            extent = applyTransform(tileJSON['bounds'], transform);
        }
        var gridExtent = extentFromProjection(sourceProjection);
        var minZoom = tileJSON['minzoom'] || 0;
        var maxZoom = tileJSON['maxzoom'] || 22;
        var tileGrid = createXYZ({
            extent: gridExtent,
            maxZoom: maxZoom,
            minZoom: minZoom,
            tileSize: this.tileSize_,
        });
        this.tileGrid = tileGrid;
        this.tileUrlFunction = createFromTemplates(tileJSON['tiles'], tileGrid);
        if (tileJSON['attribution'] !== undefined && !this.getAttributions()) {
            var attributionExtent_1 = extent !== undefined ? extent : gridExtent;
            this.setAttributions(function (frameState) {
                if (intersects(attributionExtent_1, frameState.extent)) {
                    return [tileJSON['attribution']];
                }
                return null;
            });
        }
        this.tileJSON_ = tileJSON;
        this.setState(SourceState.READY);
    };
    /**
     * @protected
     */
    TileJSON.prototype.handleTileJSONError = function () {
        this.setState(SourceState.ERROR);
    };
    return TileJSON;
}(TileImage));
export default TileJSON;
//# sourceMappingURL=TileJSON.js.map