/**
 * @module ol/source/UTFGrid
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
import Tile from '../Tile.js';
import TileSource from './Tile.js';
import TileState from '../TileState.js';
import { applyTransform, intersects } from '../extent.js';
import { assert } from '../asserts.js';
import { createFromTemplates, nullTileUrlFunction } from '../tileurlfunction.js';
import { createXYZ, extentFromProjection } from '../tilegrid.js';
import { getKeyZXY } from '../tilecoord.js';
import { get as getProjection, getTransformFromProjections } from '../proj.js';
import { listenOnce } from '../events.js';
import { jsonp as requestJSONP } from '../net.js';
/**
 * @typedef {Object} UTFGridJSON
 * @property {Array<string>} grid The grid.
 * @property {Array<string>} keys The keys.
 * @property {Object<string, Object>} [data] Optional data.
 */
var CustomTile = /** @class */ (function (_super) {
    __extends(CustomTile, _super);
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../TileState.js").default} state State.
     * @param {string} src Image source URI.
     * @param {import("../extent.js").Extent} extent Extent of the tile.
     * @param {boolean} preemptive Load the tile when visible (before it's needed).
     * @param {boolean} jsonp Load the tile as a script.
     */
    function CustomTile(tileCoord, state, src, extent, preemptive, jsonp) {
        var _this = _super.call(this, tileCoord, state) || this;
        /**
         * @private
         * @type {string}
         */
        _this.src_ = src;
        /**
         * @private
         * @type {import("../extent.js").Extent}
         */
        _this.extent_ = extent;
        /**
         * @private
         * @type {boolean}
         */
        _this.preemptive_ = preemptive;
        /**
         * @private
         * @type {Array<string>}
         */
        _this.grid_ = null;
        /**
         * @private
         * @type {Array<string>}
         */
        _this.keys_ = null;
        /**
         * @private
         * @type {Object<string, Object>|undefined}
         */
        _this.data_ = null;
        /**
         * @private
         * @type {boolean}
         */
        _this.jsonp_ = jsonp;
        return _this;
    }
    /**
     * Get the image element for this tile.
     * @return {HTMLImageElement} Image.
     */
    CustomTile.prototype.getImage = function () {
        return null;
    };
    /**
     * Synchronously returns data at given coordinate (if available).
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {*} The data.
     */
    CustomTile.prototype.getData = function (coordinate) {
        if (!this.grid_ || !this.keys_) {
            return null;
        }
        var xRelative = (coordinate[0] - this.extent_[0]) / (this.extent_[2] - this.extent_[0]);
        var yRelative = (coordinate[1] - this.extent_[1]) / (this.extent_[3] - this.extent_[1]);
        var row = this.grid_[Math.floor((1 - yRelative) * this.grid_.length)];
        if (typeof row !== 'string') {
            return null;
        }
        var code = row.charCodeAt(Math.floor(xRelative * row.length));
        if (code >= 93) {
            code--;
        }
        if (code >= 35) {
            code--;
        }
        code -= 32;
        var data = null;
        if (code in this.keys_) {
            var id = this.keys_[code];
            if (this.data_ && id in this.data_) {
                data = this.data_[id];
            }
            else {
                data = id;
            }
        }
        return data;
    };
    /**
     * Calls the callback (synchronously by default) with the available data
     * for given coordinate (or `null` if not yet loaded).
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {function(*): void} callback Callback.
     * @param {boolean} [opt_request] If `true` the callback is always async.
     *                               The tile data is requested if not yet loaded.
     */
    CustomTile.prototype.forDataAtCoordinate = function (coordinate, callback, opt_request) {
        if (this.state == TileState.EMPTY && opt_request === true) {
            this.state = TileState.IDLE;
            listenOnce(this, EventType.CHANGE, function (e) {
                callback(this.getData(coordinate));
            }, this);
            this.loadInternal_();
        }
        else {
            if (opt_request === true) {
                setTimeout(function () {
                    callback(this.getData(coordinate));
                }.bind(this), 0);
            }
            else {
                callback(this.getData(coordinate));
            }
        }
    };
    /**
     * Return the key to be used for all tiles in the source.
     * @return {string} The key for all tiles.
     */
    CustomTile.prototype.getKey = function () {
        return this.src_;
    };
    /**
     * @private
     */
    CustomTile.prototype.handleError_ = function () {
        this.state = TileState.ERROR;
        this.changed();
    };
    /**
     * @param {!UTFGridJSON} json UTFGrid data.
     * @private
     */
    CustomTile.prototype.handleLoad_ = function (json) {
        this.grid_ = json['grid'];
        this.keys_ = json['keys'];
        this.data_ = json['data'];
        this.state = TileState.LOADED;
        this.changed();
    };
    /**
     * @private
     */
    CustomTile.prototype.loadInternal_ = function () {
        if (this.state == TileState.IDLE) {
            this.state = TileState.LOADING;
            if (this.jsonp_) {
                requestJSONP(this.src_, this.handleLoad_.bind(this), this.handleError_.bind(this));
            }
            else {
                var client = new XMLHttpRequest();
                client.addEventListener('load', this.onXHRLoad_.bind(this));
                client.addEventListener('error', this.onXHRError_.bind(this));
                client.open('GET', this.src_);
                client.send();
            }
        }
    };
    /**
     * @private
     * @param {Event} event The load event.
     */
    CustomTile.prototype.onXHRLoad_ = function (event) {
        var client = /** @type {XMLHttpRequest} */ (event.target);
        // status will be 0 for file:// urls
        if (!client.status || (client.status >= 200 && client.status < 300)) {
            var response = void 0;
            try {
                response = /** @type {!UTFGridJSON} */ (JSON.parse(client.responseText));
            }
            catch (err) {
                this.handleError_();
                return;
            }
            this.handleLoad_(response);
        }
        else {
            this.handleError_();
        }
    };
    /**
     * @private
     * @param {Event} event The error event.
     */
    CustomTile.prototype.onXHRError_ = function (event) {
        this.handleError_();
    };
    /**
     */
    CustomTile.prototype.load = function () {
        if (this.preemptive_) {
            this.loadInternal_();
        }
        else {
            this.setState(TileState.EMPTY);
        }
    };
    return CustomTile;
}(Tile));
export { CustomTile };
/**
 * @typedef {Object} Options
 * @property {boolean} [preemptive=true]
 * If `true` the UTFGrid source loads the tiles based on their "visibility".
 * This improves the speed of response, but increases traffic.
 * Note that if set to `false` (lazy loading), you need to pass `true` as
 * `opt_request` to the `forDataAtCoordinateAndResolution` method otherwise no
 * data will ever be loaded.
 * @property {boolean} [jsonp=false] Use JSONP with callback to load the TileJSON.
 * Useful when the server does not support CORS..
 * @property {import("./TileJSON.js").Config} [tileJSON] TileJSON configuration for this source.
 * If not provided, `url` must be configured.
 * @property {string} [url] TileJSON endpoint that provides the configuration for this source.
 * Request will be made through JSONP. If not provided, `tileJSON` must be configured.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Layer source for UTFGrid interaction data loaded from TileJSON format.
 * @api
 */
var UTFGrid = /** @class */ (function (_super) {
    __extends(UTFGrid, _super);
    /**
     * @param {Options} options Source options.
     */
    function UTFGrid(options) {
        var _this = _super.call(this, {
            projection: getProjection('EPSG:3857'),
            state: 'loading',
            zDirection: options.zDirection,
        }) || this;
        /**
         * @private
         * @type {boolean}
         */
        _this.preemptive_ =
            options.preemptive !== undefined ? options.preemptive : true;
        /**
         * @private
         * @type {!import("../Tile.js").UrlFunction}
         */
        _this.tileUrlFunction_ = nullTileUrlFunction;
        /**
         * @private
         * @type {string|undefined}
         */
        _this.template_ = undefined;
        /**
         * @private
         * @type {boolean}
         */
        _this.jsonp_ = options.jsonp || false;
        if (options.url) {
            if (_this.jsonp_) {
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
    UTFGrid.prototype.onXHRLoad_ = function (event) {
        var client = /** @type {XMLHttpRequest} */ (event.target);
        // status will be 0 for file:// urls
        if (!client.status || (client.status >= 200 && client.status < 300)) {
            var response = void 0;
            try {
                response = /** @type {import("./TileJSON.js").Config} */ (JSON.parse(client.responseText));
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
    UTFGrid.prototype.onXHRError_ = function (event) {
        this.handleTileJSONError();
    };
    /**
     * Return the template from TileJSON.
     * @return {string|undefined} The template from TileJSON.
     * @api
     */
    UTFGrid.prototype.getTemplate = function () {
        return this.template_;
    };
    /**
     * Calls the callback (synchronously by default) with the available data
     * for given coordinate and resolution (or `null` if not yet loaded or
     * in case of an error).
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {function(*): void} callback Callback.
     * @param {boolean} [opt_request] If `true` the callback is always async.
     *                               The tile data is requested if not yet loaded.
     * @api
     */
    UTFGrid.prototype.forDataAtCoordinateAndResolution = function (coordinate, resolution, callback, opt_request) {
        if (this.tileGrid) {
            var z = this.tileGrid.getZForResolution(resolution, this.zDirection);
            var tileCoord = this.tileGrid.getTileCoordForCoordAndZ(coordinate, z);
            var tile = /** @type {!CustomTile} */ (this.getTile(tileCoord[0], tileCoord[1], tileCoord[2], 1, this.getProjection()));
            tile.forDataAtCoordinate(coordinate, callback, opt_request);
        }
        else {
            if (opt_request === true) {
                setTimeout(function () {
                    callback(null);
                }, 0);
            }
            else {
                callback(null);
            }
        }
    };
    /**
     * @protected
     */
    UTFGrid.prototype.handleTileJSONError = function () {
        this.setState('error');
    };
    /**
     * TODO: very similar to ol/source/TileJSON#handleTileJSONResponse
     * @protected
     * @param {import("./TileJSON.js").Config} tileJSON Tile JSON.
     */
    UTFGrid.prototype.handleTileJSONResponse = function (tileJSON) {
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
        });
        this.tileGrid = tileGrid;
        this.template_ = tileJSON['template'];
        var grids = tileJSON['grids'];
        if (!grids) {
            this.setState('error');
            return;
        }
        this.tileUrlFunction_ = createFromTemplates(grids, tileGrid);
        if (tileJSON['attribution'] !== undefined) {
            var attributionExtent_1 = extent !== undefined ? extent : gridExtent;
            this.setAttributions(function (frameState) {
                if (intersects(attributionExtent_1, frameState.extent)) {
                    return [tileJSON['attribution']];
                }
                return null;
            });
        }
        this.setState('ready');
    };
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!CustomTile} Tile.
     */
    UTFGrid.prototype.getTile = function (z, x, y, pixelRatio, projection) {
        var tileCoordKey = getKeyZXY(z, x, y);
        if (this.tileCache.containsKey(tileCoordKey)) {
            return this.tileCache.get(tileCoordKey);
        }
        else {
            var tileCoord = [z, x, y];
            var urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
            var tileUrl = this.tileUrlFunction_(urlTileCoord, pixelRatio, projection);
            var tile = new CustomTile(tileCoord, tileUrl !== undefined ? TileState.IDLE : TileState.EMPTY, tileUrl !== undefined ? tileUrl : '', this.tileGrid.getTileCoordExtent(tileCoord), this.preemptive_, this.jsonp_);
            this.tileCache.set(tileCoordKey, tile);
            return tile;
        }
    };
    /**
     * Marks a tile coord as being used, without triggering a load.
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     */
    UTFGrid.prototype.useTile = function (z, x, y) {
        var tileCoordKey = getKeyZXY(z, x, y);
        if (this.tileCache.containsKey(tileCoordKey)) {
            this.tileCache.get(tileCoordKey);
        }
    };
    return UTFGrid;
}(TileSource));
export default UTFGrid;
//# sourceMappingURL=UTFGrid.js.map