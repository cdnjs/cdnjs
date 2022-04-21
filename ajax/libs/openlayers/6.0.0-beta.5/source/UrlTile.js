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
 * @module ol/source/UrlTile
 */
import { getUid } from '../util.js';
import TileState from '../TileState.js';
import { expandUrl, createFromTemplates, nullTileUrlFunction } from '../tileurlfunction.js';
import TileSource, { TileSourceEvent } from './Tile.js';
import TileEventType from './TileEventType.js';
import { getKeyZXY } from '../tilecoord.js';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions]
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize]
 * @property {boolean} [opaque]
 * @property {import("../proj.js").ProjectionLike} [projection]
 * @property {import("./State.js").default} [state]
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid]
 * @property {import("../Tile.js").LoadFunction} tileLoadFunction
 * @property {number} [tilePixelRatio]
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction]
 * @property {string} [url]
 * @property {Array<string>} [urls]
 * @property {boolean} [wrapX=true]
 * @property {number} [transition]
 * @property {string} [key]
 */
/**
 * @classdesc
 * Base class for sources providing tiles divided into a tile grid over http.
 *
 * @fires import("./Tile.js").TileSourceEvent
 */
var UrlTile = /** @class */ (function (_super) {
    __extends(UrlTile, _super);
    /**
     * @param {Options} options Image tile options.
     */
    function UrlTile(options) {
        var _this = _super.call(this, {
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            opaque: options.opaque,
            projection: options.projection,
            state: options.state,
            tileGrid: options.tileGrid,
            tilePixelRatio: options.tilePixelRatio,
            wrapX: options.wrapX,
            transition: options.transition,
            key: options.key,
            attributionsCollapsible: options.attributionsCollapsible
        }) || this;
        /**
         * @private
         * @type {boolean}
         */
        _this.generateTileUrlFunction_ = !options.tileUrlFunction;
        /**
         * @protected
         * @type {import("../Tile.js").LoadFunction}
         */
        _this.tileLoadFunction = options.tileLoadFunction;
        /**
         * @protected
         * @type {import("../Tile.js").UrlFunction}
         */
        _this.tileUrlFunction = options.tileUrlFunction ? options.tileUrlFunction.bind(_this) : nullTileUrlFunction;
        /**
         * @protected
         * @type {!Array<string>|null}
         */
        _this.urls = null;
        if (options.urls) {
            _this.setUrls(options.urls);
        }
        else if (options.url) {
            _this.setUrl(options.url);
        }
        /**
         * @private
         * @type {!Object<string, boolean>}
         */
        _this.tileLoadingKeys_ = {};
        return _this;
    }
    /**
     * Return the tile load function of the source.
     * @return {import("../Tile.js").LoadFunction} TileLoadFunction
     * @api
     */
    UrlTile.prototype.getTileLoadFunction = function () {
        return this.tileLoadFunction;
    };
    /**
     * Return the tile URL function of the source.
     * @return {import("../Tile.js").UrlFunction} TileUrlFunction
     * @api
     */
    UrlTile.prototype.getTileUrlFunction = function () {
        return this.tileUrlFunction;
    };
    /**
     * Return the URLs used for this source.
     * When a tileUrlFunction is used instead of url or urls,
     * null will be returned.
     * @return {!Array<string>|null} URLs.
     * @api
     */
    UrlTile.prototype.getUrls = function () {
        return this.urls;
    };
    /**
     * Handle tile change events.
     * @param {import("../events/Event.js").default} event Event.
     * @protected
     */
    UrlTile.prototype.handleTileChange = function (event) {
        var tile = /** @type {import("../Tile.js").default} */ (event.target);
        var uid = getUid(tile);
        var tileState = tile.getState();
        var type;
        if (tileState == TileState.LOADING) {
            this.tileLoadingKeys_[uid] = true;
            type = TileEventType.TILELOADSTART;
        }
        else if (uid in this.tileLoadingKeys_) {
            delete this.tileLoadingKeys_[uid];
            type = tileState == TileState.ERROR ? TileEventType.TILELOADERROR :
                (tileState == TileState.LOADED || tileState == TileState.ABORT) ?
                    TileEventType.TILELOADEND : undefined;
        }
        if (type != undefined) {
            this.dispatchEvent(new TileSourceEvent(type, tile));
        }
    };
    /**
     * Set the tile load function of the source.
     * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @api
     */
    UrlTile.prototype.setTileLoadFunction = function (tileLoadFunction) {
        this.tileCache.clear();
        this.tileLoadFunction = tileLoadFunction;
        this.changed();
    };
    /**
     * Set the tile URL function of the source.
     * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
     * @param {string=} key Optional new tile key for the source.
     * @api
     */
    UrlTile.prototype.setTileUrlFunction = function (tileUrlFunction, key) {
        this.tileUrlFunction = tileUrlFunction;
        this.tileCache.pruneExceptNewestZ();
        if (typeof key !== 'undefined') {
            this.setKey(key);
        }
        else {
            this.changed();
        }
    };
    /**
     * Set the URL to use for requests.
     * @param {string} url URL.
     * @api
     */
    UrlTile.prototype.setUrl = function (url) {
        var urls = this.urls = expandUrl(url);
        this.setUrls(urls);
    };
    /**
     * Set the URLs to use for requests.
     * @param {Array<string>} urls URLs.
     * @api
     */
    UrlTile.prototype.setUrls = function (urls) {
        this.urls = urls;
        var key = urls.join('\n');
        if (this.generateTileUrlFunction_) {
            this.setTileUrlFunction(createFromTemplates(urls, this.tileGrid), key);
        }
        else {
            this.setKey(key);
        }
    };
    /**
     * @inheritDoc
     */
    UrlTile.prototype.useTile = function (z, x, y) {
        var tileCoordKey = getKeyZXY(z, x, y);
        if (this.tileCache.containsKey(tileCoordKey)) {
            this.tileCache.get(tileCoordKey);
        }
    };
    return UrlTile;
}(TileSource));
export default UrlTile;
//# sourceMappingURL=UrlTile.js.map