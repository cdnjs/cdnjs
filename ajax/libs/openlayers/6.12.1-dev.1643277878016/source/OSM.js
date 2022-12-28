/**
 * @module ol/source/OSM
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
import XYZ from './XYZ.js';
/**
 * The attribution containing a link to the OpenStreetMap Copyright and License
 * page.
 * @const
 * @type {string}
 * @api
 */
export var ATTRIBUTION = '&#169; ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> ' +
    'contributors.';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {number} [maxZoom=19] Max zoom.
 * @property {boolean} [opaque=true] Whether the layer is opaque.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [url='https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'] URL template.
 * Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Layer source for the OpenStreetMap tile server.
 * @api
 */
var OSM = /** @class */ (function (_super) {
    __extends(OSM, _super);
    /**
     * @param {Options} [opt_options] Open Street Map options.
     */
    function OSM(opt_options) {
        var options = opt_options || {};
        var interpolate = options.imageSmoothing !== undefined ? options.imageSmoothing : true;
        if (options.interpolate !== undefined) {
            interpolate = options.interpolate;
        }
        var attributions;
        if (options.attributions !== undefined) {
            attributions = options.attributions;
        }
        else {
            attributions = [ATTRIBUTION];
        }
        var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';
        var url = options.url !== undefined
            ? options.url
            : 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        return _super.call(this, {
            attributions: attributions,
            attributionsCollapsible: false,
            cacheSize: options.cacheSize,
            crossOrigin: crossOrigin,
            interpolate: interpolate,
            maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
            opaque: options.opaque !== undefined ? options.opaque : true,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileLoadFunction: options.tileLoadFunction,
            transition: options.transition,
            url: url,
            wrapX: options.wrapX,
            zDirection: options.zDirection,
        }) || this;
    }
    return OSM;
}(XYZ));
export default OSM;
//# sourceMappingURL=OSM.js.map