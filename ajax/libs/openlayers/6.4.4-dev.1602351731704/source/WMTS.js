/**
 * @module ol/source/WMTS
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
import TileImage from './TileImage.js';
import WMTSRequestEncoding from './WMTSRequestEncoding.js';
import { appendParams } from '../uri.js';
import { assign } from '../obj.js';
import { createFromCapabilitiesMatrixSet } from '../tilegrid/WMTS.js';
import { createFromTileUrlFunctions, expandUrl } from '../tileurlfunction.js';
import { equivalent, get as getProjection } from '../proj.js';
import { find, findIndex, includes } from '../array.js';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {import("../tilegrid/WMTS.js").default} tileGrid Tile grid.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("./WMTSRequestEncoding.js").default|string} [requestEncoding='KVP'] Request encoding.
 * @property {string} layer Layer name as advertised in the WMTS capabilities.
 * @property {string} style Style name as advertised in the WMTS capabilities.
 * @property {typeof import("../ImageTile.js").default} [tileClass]  Class used to instantiate image tiles. Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
 * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {string} [format='image/jpeg'] Image format. Only used when `requestEncoding` is `'KVP'`.
 * @property {string} [version='1.0.0'] WMTS version.
 * @property {string} matrixSet Matrix set.
 * @property {!Object} [dimensions] Additional "dimensions" for tile requests.
 * This is an object with properties named like the advertised WMTS dimensions.
 * @property {string} [url]  A URL for the service.
 * For the RESTful request encoding, this is a URL
 * template.  For KVP encoding, it is normal URL. A `{?-?}` template pattern,
 * for example `subdomain{a-f}.domain.com`, may be used instead of defining
 * each one separately in the `urls` option.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {Array<string>} [urls] An array of URLs.
 * Requests will be distributed among the URLs in this array.
 * @property {boolean} [wrapX=false] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 */
/**
 * @classdesc
 * Layer source for tile data from WMTS servers.
 * @api
 */
var WMTS = /** @class */ (function (_super) {
    __extends(WMTS, _super);
    /**
     * @param {Options} options WMTS options.
     */
    function WMTS(options) {
        // TODO: add support for TileMatrixLimits
        var _this = this;
        var requestEncoding = options.requestEncoding !== undefined
            ? /** @type {import("./WMTSRequestEncoding.js").default} */ (options.requestEncoding)
            : WMTSRequestEncoding.KVP;
        // FIXME: should we create a default tileGrid?
        // we could issue a getCapabilities xhr to retrieve missing configuration
        var tileGrid = options.tileGrid;
        var urls = options.urls;
        if (urls === undefined && options.url !== undefined) {
            urls = expandUrl(options.url);
        }
        _this = _super.call(this, {
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            imageSmoothing: options.imageSmoothing,
            projection: options.projection,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileClass: options.tileClass,
            tileGrid: tileGrid,
            tileLoadFunction: options.tileLoadFunction,
            tilePixelRatio: options.tilePixelRatio,
            urls: urls,
            wrapX: options.wrapX !== undefined ? options.wrapX : false,
            transition: options.transition,
        }) || this;
        /**
         * @private
         * @type {string}
         */
        _this.version_ = options.version !== undefined ? options.version : '1.0.0';
        /**
         * @private
         * @type {string}
         */
        _this.format_ = options.format !== undefined ? options.format : 'image/jpeg';
        /**
         * @private
         * @type {!Object}
         */
        _this.dimensions_ =
            options.dimensions !== undefined ? options.dimensions : {};
        /**
         * @private
         * @type {string}
         */
        _this.layer_ = options.layer;
        /**
         * @private
         * @type {string}
         */
        _this.matrixSet_ = options.matrixSet;
        /**
         * @private
         * @type {string}
         */
        _this.style_ = options.style;
        // FIXME: should we guess this requestEncoding from options.url(s)
        //        structure? that would mean KVP only if a template is not provided.
        /**
         * @private
         * @type {import("./WMTSRequestEncoding.js").default}
         */
        _this.requestEncoding_ = requestEncoding;
        _this.setKey(_this.getKeyForDimensions_());
        if (urls && urls.length > 0) {
            _this.tileUrlFunction = createFromTileUrlFunctions(urls.map(_this.createFromWMTSTemplate.bind(_this)));
        }
        return _this;
    }
    /**
     * Set the URLs to use for requests.
     * URLs may contain OGC conform URL Template Variables: {TileMatrix}, {TileRow}, {TileCol}.
     * @param {Array<string>} urls URLs.
     */
    WMTS.prototype.setUrls = function (urls) {
        this.urls = urls;
        var key = urls.join('\n');
        this.setTileUrlFunction(createFromTileUrlFunctions(urls.map(this.createFromWMTSTemplate.bind(this))), key);
    };
    /**
     * Get the dimensions, i.e. those passed to the constructor through the
     * "dimensions" option, and possibly updated using the updateDimensions
     * method.
     * @return {!Object} Dimensions.
     * @api
     */
    WMTS.prototype.getDimensions = function () {
        return this.dimensions_;
    };
    /**
     * Return the image format of the WMTS source.
     * @return {string} Format.
     * @api
     */
    WMTS.prototype.getFormat = function () {
        return this.format_;
    };
    /**
     * Return the layer of the WMTS source.
     * @return {string} Layer.
     * @api
     */
    WMTS.prototype.getLayer = function () {
        return this.layer_;
    };
    /**
     * Return the matrix set of the WMTS source.
     * @return {string} MatrixSet.
     * @api
     */
    WMTS.prototype.getMatrixSet = function () {
        return this.matrixSet_;
    };
    /**
     * Return the request encoding, either "KVP" or "REST".
     * @return {import("./WMTSRequestEncoding.js").default} Request encoding.
     * @api
     */
    WMTS.prototype.getRequestEncoding = function () {
        return this.requestEncoding_;
    };
    /**
     * Return the style of the WMTS source.
     * @return {string} Style.
     * @api
     */
    WMTS.prototype.getStyle = function () {
        return this.style_;
    };
    /**
     * Return the version of the WMTS source.
     * @return {string} Version.
     * @api
     */
    WMTS.prototype.getVersion = function () {
        return this.version_;
    };
    /**
     * @private
     * @return {string} The key for the current dimensions.
     */
    WMTS.prototype.getKeyForDimensions_ = function () {
        var i = 0;
        var res = [];
        for (var key in this.dimensions_) {
            res[i++] = key + '-' + this.dimensions_[key];
        }
        return res.join('/');
    };
    /**
     * Update the dimensions.
     * @param {Object} dimensions Dimensions.
     * @api
     */
    WMTS.prototype.updateDimensions = function (dimensions) {
        assign(this.dimensions_, dimensions);
        this.setKey(this.getKeyForDimensions_());
    };
    /**
     * @param {string} template Template.
     * @return {import("../Tile.js").UrlFunction} Tile URL function.
     */
    WMTS.prototype.createFromWMTSTemplate = function (template) {
        var requestEncoding = this.requestEncoding_;
        // context property names are lower case to allow for a case insensitive
        // replacement as some services use different naming conventions
        var context = {
            'layer': this.layer_,
            'style': this.style_,
            'tilematrixset': this.matrixSet_,
        };
        if (requestEncoding == WMTSRequestEncoding.KVP) {
            assign(context, {
                'Service': 'WMTS',
                'Request': 'GetTile',
                'Version': this.version_,
                'Format': this.format_,
            });
        }
        // TODO: we may want to create our own appendParams function so that params
        // order conforms to wmts spec guidance, and so that we can avoid to escape
        // special template params
        template =
            requestEncoding == WMTSRequestEncoding.KVP
                ? appendParams(template, context)
                : template.replace(/\{(\w+?)\}/g, function (m, p) {
                    return p.toLowerCase() in context ? context[p.toLowerCase()] : m;
                });
        var tileGrid = /** @type {import("../tilegrid/WMTS.js").default} */ (this
            .tileGrid);
        var dimensions = this.dimensions_;
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
                var localContext_1 = {
                    'TileMatrix': tileGrid.getMatrixId(tileCoord[0]),
                    'TileCol': tileCoord[1],
                    'TileRow': tileCoord[2],
                };
                assign(localContext_1, dimensions);
                var url = template;
                if (requestEncoding == WMTSRequestEncoding.KVP) {
                    url = appendParams(url, localContext_1);
                }
                else {
                    url = url.replace(/\{(\w+?)\}/g, function (m, p) {
                        return localContext_1[p];
                    });
                }
                return url;
            }
        });
    };
    return WMTS;
}(TileImage));
export default WMTS;
/**
 * Generate source options from a capabilities object.
 * @param {Object} wmtsCap An object representing the capabilities document.
 * @param {!Object} config Configuration properties for the layer.  Defaults for
 *                  the layer will apply if not provided.
 *
 * Required config properties:
 *  - layer - {string} The layer identifier.
 *
 * Optional config properties:
 *  - matrixSet - {string} The matrix set identifier, required if there is
 *       more than one matrix set in the layer capabilities.
 *  - projection - {string} The desired CRS when no matrixSet is specified.
 *       eg: "EPSG:3857". If the desired projection is not available,
 *       an error is thrown.
 *  - requestEncoding - {string} url encoding format for the layer. Default is
 *       the first tile url format found in the GetCapabilities response.
 *  - style - {string} The name of the style
 *  - format - {string} Image format for the layer. Default is the first
 *       format returned in the GetCapabilities response.
 *  - crossOrigin - {string|null|undefined} Cross origin. Default is `undefined`.
 * @return {?Options} WMTS source options object or `null` if the layer was not found.
 * @api
 */
export function optionsFromCapabilities(wmtsCap, config) {
    var layers = wmtsCap['Contents']['Layer'];
    var l = find(layers, function (elt, index, array) {
        return elt['Identifier'] == config['layer'];
    });
    if (l === null) {
        return null;
    }
    var tileMatrixSets = wmtsCap['Contents']['TileMatrixSet'];
    var idx;
    if (l['TileMatrixSetLink'].length > 1) {
        if ('projection' in config) {
            idx = findIndex(l['TileMatrixSetLink'], function (elt, index, array) {
                var tileMatrixSet = find(tileMatrixSets, function (el) {
                    return el['Identifier'] == elt['TileMatrixSet'];
                });
                var supportedCRS = tileMatrixSet['SupportedCRS'];
                var proj1 = getProjection(supportedCRS);
                var proj2 = getProjection(config['projection']);
                if (proj1 && proj2) {
                    return equivalent(proj1, proj2);
                }
                else {
                    return supportedCRS == config['projection'];
                }
            });
        }
        else {
            idx = findIndex(l['TileMatrixSetLink'], function (elt, index, array) {
                return elt['TileMatrixSet'] == config['matrixSet'];
            });
        }
    }
    else {
        idx = 0;
    }
    if (idx < 0) {
        idx = 0;
    }
    var matrixSet = 
    /** @type {string} */
    (l['TileMatrixSetLink'][idx]['TileMatrixSet']);
    var matrixLimits = 
    /** @type {Array<Object>} */
    (l['TileMatrixSetLink'][idx]['TileMatrixSetLimits']);
    var format = /** @type {string} */ (l['Format'][0]);
    if ('format' in config) {
        format = config['format'];
    }
    idx = findIndex(l['Style'], function (elt, index, array) {
        if ('style' in config) {
            return elt['Title'] == config['style'];
        }
        else {
            return elt['isDefault'];
        }
    });
    if (idx < 0) {
        idx = 0;
    }
    var style = /** @type {string} */ (l['Style'][idx]['Identifier']);
    var dimensions = {};
    if ('Dimension' in l) {
        l['Dimension'].forEach(function (elt, index, array) {
            var key = elt['Identifier'];
            var value = elt['Default'];
            if (value === undefined) {
                value = elt['Value'][0];
            }
            dimensions[key] = value;
        });
    }
    var matrixSets = wmtsCap['Contents']['TileMatrixSet'];
    var matrixSetObj = find(matrixSets, function (elt, index, array) {
        return elt['Identifier'] == matrixSet;
    });
    var projection;
    var code = matrixSetObj['SupportedCRS'];
    if (code) {
        projection = getProjection(code);
    }
    if ('projection' in config) {
        var projConfig = getProjection(config['projection']);
        if (projConfig) {
            if (!projection || equivalent(projConfig, projection)) {
                projection = projConfig;
            }
        }
    }
    var wrapX = false;
    var switchOriginXY = projection.getAxisOrientation().substr(0, 2) == 'ne';
    var matrix = matrixSetObj.TileMatrix[0];
    // create default matrixLimit
    var selectedMatrixLimit = {
        MinTileCol: 0,
        MinTileRow: 0,
        // substract one to end up at tile top left
        MaxTileCol: matrix.MatrixWidth - 1,
        MaxTileRow: matrix.MatrixHeight - 1,
    };
    //in case of matrix limits, use matrix limits to calculate extent
    if (matrixLimits) {
        selectedMatrixLimit = matrixLimits[matrixLimits.length - 1];
        var m = find(matrixSetObj.TileMatrix, function (tileMatrixValue) {
            return tileMatrixValue.Identifier === selectedMatrixLimit.TileMatrix ||
                matrixSetObj.Identifier + ':' + tileMatrixValue.Identifier ===
                    selectedMatrixLimit.TileMatrix;
        });
        if (m) {
            matrix = m;
        }
    }
    var resolution = (matrix.ScaleDenominator * 0.00028) / projection.getMetersPerUnit(); // WMTS 1.0.0: standardized rendering pixel size
    var origin = switchOriginXY
        ? [matrix.TopLeftCorner[1], matrix.TopLeftCorner[0]]
        : matrix.TopLeftCorner;
    var tileSpanX = matrix.TileWidth * resolution;
    var tileSpanY = matrix.TileHeight * resolution;
    var extent = [
        origin[0] + tileSpanX * selectedMatrixLimit.MinTileCol,
        // add one to get proper bottom/right coordinate
        origin[1] - tileSpanY * (1 + selectedMatrixLimit.MaxTileRow),
        origin[0] + tileSpanX * (1 + selectedMatrixLimit.MaxTileCol),
        origin[1] - tileSpanY * selectedMatrixLimit.MinTileRow,
    ];
    if (projection.getExtent() === null) {
        projection.setExtent(extent);
    }
    var tileGrid = createFromCapabilitiesMatrixSet(matrixSetObj, extent, matrixLimits);
    /** @type {!Array<string>} */
    var urls = [];
    var requestEncoding = config['requestEncoding'];
    requestEncoding = requestEncoding !== undefined ? requestEncoding : '';
    if ('OperationsMetadata' in wmtsCap &&
        'GetTile' in wmtsCap['OperationsMetadata']) {
        var gets = wmtsCap['OperationsMetadata']['GetTile']['DCP']['HTTP']['Get'];
        for (var i = 0, ii = gets.length; i < ii; ++i) {
            if (gets[i]['Constraint']) {
                var constraint = find(gets[i]['Constraint'], function (element) {
                    return element['name'] == 'GetEncoding';
                });
                var encodings = constraint['AllowedValues']['Value'];
                if (requestEncoding === '') {
                    // requestEncoding not provided, use the first encoding from the list
                    requestEncoding = encodings[0];
                }
                if (requestEncoding === WMTSRequestEncoding.KVP) {
                    if (includes(encodings, WMTSRequestEncoding.KVP)) {
                        urls.push(/** @type {string} */ (gets[i]['href']));
                    }
                }
                else {
                    break;
                }
            }
            else if (gets[i]['href']) {
                requestEncoding = WMTSRequestEncoding.KVP;
                urls.push(/** @type {string} */ (gets[i]['href']));
            }
        }
    }
    if (urls.length === 0) {
        requestEncoding = WMTSRequestEncoding.REST;
        l['ResourceURL'].forEach(function (element) {
            if (element['resourceType'] === 'tile') {
                format = element['format'];
                urls.push(/** @type {string} */ (element['template']));
            }
        });
    }
    return {
        urls: urls,
        layer: config['layer'],
        matrixSet: matrixSet,
        format: format,
        projection: projection,
        requestEncoding: requestEncoding,
        tileGrid: tileGrid,
        style: style,
        dimensions: dimensions,
        wrapX: wrapX,
        crossOrigin: config['crossOrigin'],
    };
}
//# sourceMappingURL=WMTS.js.map