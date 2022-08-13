/**
 * @module ol/source/BingMaps
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
import SourceState from './State.js';
import TileImage from './TileImage.js';
import { applyTransform, intersects } from '../extent.js';
import { createFromTileUrlFunctions } from '../tileurlfunction.js';
import { createOrUpdate } from '../tilecoord.js';
import { createXYZ, extentFromProjection } from '../tilegrid.js';
import { get as getProjection, getTransformFromProjections } from '../proj.js';
import { jsonp as requestJSONP } from '../net.js';
/**
 * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coord.
 * @return {string} Quad key.
 */
export function quadKey(tileCoord) {
    var z = tileCoord[0];
    var digits = new Array(z);
    var mask = 1 << (z - 1);
    var i, charCode;
    for (i = 0; i < z; ++i) {
        // 48 is charCode for 0 - '0'.charCodeAt(0)
        charCode = 48;
        if (tileCoord[1] & mask) {
            charCode += 1;
        }
        if (tileCoord[2] & mask) {
            charCode += 2;
        }
        digits[i] = String.fromCharCode(charCode);
        mask >>= 1;
    }
    return digits.join('');
}
/**
 * The attribution containing a link to the Microsoft® Bing™ Maps Platform APIs’
 * Terms Of Use.
 * @const
 * @type {string}
 */
var TOS_ATTRIBUTION = '<a class="ol-attribution-bing-tos" ' +
    'href="https://www.microsoft.com/maps/product/terms.html" target="_blank">' +
    'Terms of Use</a>';
/**
 * @typedef {Object} Options
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {boolean} [hidpi=false] If `true` hidpi tiles will be requested.
 * @property {string} [culture='en-us'] Culture code.
 * @property {string} key Bing Maps API key. Get yours at http://www.bingmapsportal.com/.
 * @property {string} imagerySet Type of imagery.
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {number} [maxZoom=21] Max zoom. Default is what's advertized by the BingMaps service.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 */
/**
 * @typedef {Object} BingMapsImageryMetadataResponse
 * @property {number} statusCode The response status code
 * @property {string} statusDescription The response status description
 * @property {string} authenticationResultCode The authentication result code
 * @property {Array<ResourceSet>} resourceSets The array of resource sets
 */
/**
 * @typedef {Object} ResourceSet
 * @property {Array<Resource>} resources
 */
/**
 * @typedef {Object} Resource
 * @property {number} imageHeight The image height
 * @property {number} imageWidth The image width
 * @property {number} zoomMin The minimum zoom level
 * @property {number} zoomMax The maximum zoom level
 * @property {string} imageUrl The image URL
 * @property {Array<string>} imageUrlSubdomains The image URL subdomains for rotation
 * @property {Array<ImageryProvider>} [imageryProviders] The array of ImageryProviders
 */
/**
 * @typedef {Object} ImageryProvider
 * @property {Array<CoverageArea>} coverageAreas The coverage areas
 * @property {string} [attribution] The attribution
 */
/**
 * @typedef {Object} CoverageArea
 * @property {number} zoomMin The minimum zoom
 * @property {number} zoomMax The maximum zoom
 * @property {Array<number>} bbox The coverage bounding box
 */
/**
 * @classdesc
 * Layer source for Bing Maps tile data.
 * @api
 */
var BingMaps = /** @class */ (function (_super) {
    __extends(BingMaps, _super);
    /**
     * @param {Options} options Bing Maps options.
     */
    function BingMaps(options) {
        var _this = this;
        var hidpi = options.hidpi !== undefined ? options.hidpi : false;
        _this = _super.call(this, {
            cacheSize: options.cacheSize,
            crossOrigin: 'anonymous',
            imageSmoothing: options.imageSmoothing,
            opaque: true,
            projection: getProjection('EPSG:3857'),
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            state: SourceState.LOADING,
            tileLoadFunction: options.tileLoadFunction,
            tilePixelRatio: hidpi ? 2 : 1,
            wrapX: options.wrapX !== undefined ? options.wrapX : true,
            transition: options.transition,
        }) || this;
        /**
         * @private
         * @type {boolean}
         */
        _this.hidpi_ = hidpi;
        /**
         * @private
         * @type {string}
         */
        _this.culture_ = options.culture !== undefined ? options.culture : 'en-us';
        /**
         * @private
         * @type {number}
         */
        _this.maxZoom_ = options.maxZoom !== undefined ? options.maxZoom : -1;
        /**
         * @private
         * @type {string}
         */
        _this.apiKey_ = options.key;
        /**
         * @private
         * @type {string}
         */
        _this.imagerySet_ = options.imagerySet;
        var url = 'https://dev.virtualearth.net/REST/v1/Imagery/Metadata/' +
            _this.imagerySet_ +
            '?uriScheme=https&include=ImageryProviders&key=' +
            _this.apiKey_ +
            '&c=' +
            _this.culture_;
        requestJSONP(url, _this.handleImageryMetadataResponse.bind(_this), undefined, 'jsonp');
        return _this;
    }
    /**
     * Get the api key used for this source.
     *
     * @return {string} The api key.
     * @api
     */
    BingMaps.prototype.getApiKey = function () {
        return this.apiKey_;
    };
    /**
     * Get the imagery set associated with this source.
     *
     * @return {string} The imagery set.
     * @api
     */
    BingMaps.prototype.getImagerySet = function () {
        return this.imagerySet_;
    };
    /**
     * @param {BingMapsImageryMetadataResponse} response Response.
     */
    BingMaps.prototype.handleImageryMetadataResponse = function (response) {
        if (response.statusCode != 200 ||
            response.statusDescription != 'OK' ||
            response.authenticationResultCode != 'ValidCredentials' ||
            response.resourceSets.length != 1 ||
            response.resourceSets[0].resources.length != 1) {
            this.setState(SourceState.ERROR);
            return;
        }
        var resource = response.resourceSets[0].resources[0];
        var maxZoom = this.maxZoom_ == -1 ? resource.zoomMax : this.maxZoom_;
        var sourceProjection = this.getProjection();
        var extent = extentFromProjection(sourceProjection);
        var scale = this.hidpi_ ? 2 : 1;
        var tileSize = resource.imageWidth == resource.imageHeight
            ? resource.imageWidth / scale
            : [resource.imageWidth / scale, resource.imageHeight / scale];
        var tileGrid = createXYZ({
            extent: extent,
            minZoom: resource.zoomMin,
            maxZoom: maxZoom,
            tileSize: tileSize,
        });
        this.tileGrid = tileGrid;
        var culture = this.culture_;
        var hidpi = this.hidpi_;
        this.tileUrlFunction = createFromTileUrlFunctions(resource.imageUrlSubdomains.map(function (subdomain) {
            /** @type {import('../tilecoord.js').TileCoord} */
            var quadKeyTileCoord = [0, 0, 0];
            var imageUrl = resource.imageUrl
                .replace('{subdomain}', subdomain)
                .replace('{culture}', culture);
            return (
            /**
             * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
             * @param {number} pixelRatio Pixel ratio.
             * @param {import("../proj/Projection.js").default} projection Projection.
             * @return {string|undefined} Tile URL.
             */
            function (tileCoord, pixelRatio, projection) {
                if (!tileCoord) {
                    return undefined;
                }
                else {
                    createOrUpdate(tileCoord[0], tileCoord[1], tileCoord[2], quadKeyTileCoord);
                    var url = imageUrl;
                    if (hidpi) {
                        url += '&dpi=d1&device=mobile';
                    }
                    return url.replace('{quadkey}', quadKey(quadKeyTileCoord));
                }
            });
        }));
        if (resource.imageryProviders) {
            var transform_1 = getTransformFromProjections(getProjection('EPSG:4326'), this.getProjection());
            this.setAttributions(function (frameState) {
                var attributions = [];
                var viewState = frameState.viewState;
                var tileGrid = this.getTileGrid();
                var z = tileGrid.getZForResolution(viewState.resolution, this.zDirection);
                var tileCoord = tileGrid.getTileCoordForCoordAndZ(viewState.center, z);
                var zoom = tileCoord[0];
                resource.imageryProviders.map(function (imageryProvider) {
                    var intersecting = false;
                    var coverageAreas = imageryProvider.coverageAreas;
                    for (var i = 0, ii = coverageAreas.length; i < ii; ++i) {
                        var coverageArea = coverageAreas[i];
                        if (zoom >= coverageArea.zoomMin &&
                            zoom <= coverageArea.zoomMax) {
                            var bbox = coverageArea.bbox;
                            var epsg4326Extent = [bbox[1], bbox[0], bbox[3], bbox[2]];
                            var extent_1 = applyTransform(epsg4326Extent, transform_1);
                            if (intersects(extent_1, frameState.extent)) {
                                intersecting = true;
                                break;
                            }
                        }
                    }
                    if (intersecting) {
                        attributions.push(imageryProvider.attribution);
                    }
                });
                attributions.push(TOS_ATTRIBUTION);
                return attributions;
            }.bind(this));
        }
        this.setState(SourceState.READY);
    };
    return BingMaps;
}(TileImage));
export default BingMaps;
//# sourceMappingURL=BingMaps.js.map