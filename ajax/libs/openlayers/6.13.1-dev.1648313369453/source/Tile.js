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
 * @module ol/source/Tile
 */
import Event from '../events/Event.js';
import Source from './Source.js';
import TileCache from '../TileCache.js';
import TileState from '../TileState.js';
import { abstract } from '../util.js';
import { assert } from '../asserts.js';
import { equivalent } from '../proj.js';
import { getKeyZXY, withinExtentAndZ } from '../tilecoord.js';
import { getForProjection as getTileGridForProjection, wrapX, } from '../tilegrid.js';
import { scale as scaleSize, toSize } from '../size.js';
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./TileEventType").TileSourceEventTypes, TileSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./TileEventType").TileSourceEventTypes, Return>} TileSourceOnSignature
 */
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] CacheSize.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./State.js").default} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing images divided into a tile grid.
 * @abstract
 * @api
 */
var TileSource = /** @class */ (function (_super) {
    __extends(TileSource, _super);
    /**
     * @param {Options} options SourceTile source options.
     */
    function TileSource(options) {
        var _this = _super.call(this, {
            attributions: options.attributions,
            attributionsCollapsible: options.attributionsCollapsible,
            projection: options.projection,
            state: options.state,
            wrapX: options.wrapX,
            interpolate: options.interpolate,
        }) || this;
        /***
         * @type {TileSourceOnSignature<import("../events").EventsKey>}
         */
        _this.on;
        /***
         * @type {TileSourceOnSignature<import("../events").EventsKey>}
         */
        _this.once;
        /***
         * @type {TileSourceOnSignature<void>}
         */
        _this.un;
        /**
         * @private
         * @type {boolean}
         */
        _this.opaque_ = options.opaque !== undefined ? options.opaque : false;
        /**
         * @private
         * @type {number}
         */
        _this.tilePixelRatio_ =
            options.tilePixelRatio !== undefined ? options.tilePixelRatio : 1;
        /**
         * @type {import("../tilegrid/TileGrid.js").default|null}
         */
        _this.tileGrid = options.tileGrid !== undefined ? options.tileGrid : null;
        var tileSize = [256, 256];
        if (_this.tileGrid) {
            toSize(_this.tileGrid.getTileSize(_this.tileGrid.getMinZoom()), tileSize);
        }
        /**
         * @protected
         * @type {import("../TileCache.js").default}
         */
        _this.tileCache = new TileCache(options.cacheSize || 0);
        /**
         * @protected
         * @type {import("../size.js").Size}
         */
        _this.tmpSize = [0, 0];
        /**
         * @private
         * @type {string}
         */
        _this.key_ = options.key || '';
        /**
         * @protected
         * @type {import("../Tile.js").Options}
         */
        _this.tileOptions = {
            transition: options.transition,
            interpolate: options.interpolate,
        };
        /**
         * zDirection hint, read by the renderer. Indicates which resolution should be used
         * by a renderer if the views resolution does not match any resolution of the tile source.
         * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
         * will be used. If -1, the nearest higher resolution will be used.
         * @type {number|import("../array.js").NearestDirectionFunction}
         */
        _this.zDirection = options.zDirection ? options.zDirection : 0;
        return _this;
    }
    /**
     * @return {boolean} Can expire cache.
     */
    TileSource.prototype.canExpireCache = function () {
        return this.tileCache.canExpireCache();
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {!Object<string, boolean>} usedTiles Used tiles.
     */
    TileSource.prototype.expireCache = function (projection, usedTiles) {
        var tileCache = this.getTileCacheForProjection(projection);
        if (tileCache) {
            tileCache.expireCache(usedTiles);
        }
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {number} z Zoom level.
     * @param {import("../TileRange.js").default} tileRange Tile range.
     * @param {function(import("../Tile.js").default):(boolean|void)} callback Called with each
     *     loaded tile.  If the callback returns `false`, the tile will not be
     *     considered loaded.
     * @return {boolean} The tile range is fully covered with loaded tiles.
     */
    TileSource.prototype.forEachLoadedTile = function (projection, z, tileRange, callback) {
        var tileCache = this.getTileCacheForProjection(projection);
        if (!tileCache) {
            return false;
        }
        var covered = true;
        var tile, tileCoordKey, loaded;
        for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
            for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
                tileCoordKey = getKeyZXY(z, x, y);
                loaded = false;
                if (tileCache.containsKey(tileCoordKey)) {
                    tile = /** @type {!import("../Tile.js").default} */ (tileCache.get(tileCoordKey));
                    loaded = tile.getState() === TileState.LOADED;
                    if (loaded) {
                        loaded = callback(tile) !== false;
                    }
                }
                if (!loaded) {
                    covered = false;
                }
            }
        }
        return covered;
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {number} Gutter.
     */
    TileSource.prototype.getGutterForProjection = function (projection) {
        return 0;
    };
    /**
     * Return the key to be used for all tiles in the source.
     * @return {string} The key for all tiles.
     */
    TileSource.prototype.getKey = function () {
        return this.key_;
    };
    /**
     * Set the value to be used as the key for all tiles in the source.
     * @param {string} key The key for tiles.
     * @protected
     */
    TileSource.prototype.setKey = function (key) {
        if (this.key_ !== key) {
            this.key_ = key;
            this.changed();
        }
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {boolean} Opaque.
     */
    TileSource.prototype.getOpaque = function (projection) {
        return this.opaque_;
    };
    /**
     * @return {Array<number>|null} Resolutions.
     */
    TileSource.prototype.getResolutions = function () {
        if (!this.tileGrid) {
            return null;
        }
        return this.tileGrid.getResolutions();
    };
    /**
     * @abstract
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!import("../Tile.js").default} Tile.
     */
    TileSource.prototype.getTile = function (z, x, y, pixelRatio, projection) {
        return abstract();
    };
    /**
     * Return the tile grid of the tile source.
     * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
     * @api
     */
    TileSource.prototype.getTileGrid = function () {
        return this.tileGrid;
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
     */
    TileSource.prototype.getTileGridForProjection = function (projection) {
        if (!this.tileGrid) {
            return getTileGridForProjection(projection);
        }
        else {
            return this.tileGrid;
        }
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../TileCache.js").default} Tile cache.
     * @protected
     */
    TileSource.prototype.getTileCacheForProjection = function (projection) {
        assert(equivalent(this.getProjection(), projection), 68 // A VectorTile source can only be rendered if it has a projection compatible with the view projection.
        );
        return this.tileCache;
    };
    /**
     * Get the tile pixel ratio for this source. Subclasses may override this
     * method, which is meant to return a supported pixel ratio that matches the
     * provided `pixelRatio` as close as possible.
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Tile pixel ratio.
     */
    TileSource.prototype.getTilePixelRatio = function (pixelRatio) {
        return this.tilePixelRatio_;
    };
    /**
     * @param {number} z Z.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../size.js").Size} Tile size.
     */
    TileSource.prototype.getTilePixelSize = function (z, pixelRatio, projection) {
        var tileGrid = this.getTileGridForProjection(projection);
        var tilePixelRatio = this.getTilePixelRatio(pixelRatio);
        var tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
        if (tilePixelRatio == 1) {
            return tileSize;
        }
        else {
            return scaleSize(tileSize, tilePixelRatio, this.tmpSize);
        }
    };
    /**
     * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
     * is outside the resolution and extent range of the tile grid, `null` will be
     * returned.
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../proj/Projection.js").default} [opt_projection] Projection.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
     *     null if no tile URL should be created for the passed `tileCoord`.
     */
    TileSource.prototype.getTileCoordForTileUrlFunction = function (tileCoord, opt_projection) {
        var projection = opt_projection !== undefined ? opt_projection : this.getProjection();
        var tileGrid = this.getTileGridForProjection(projection);
        if (this.getWrapX() && projection.isGlobal()) {
            tileCoord = wrapX(tileGrid, tileCoord, projection);
        }
        return withinExtentAndZ(tileCoord, tileGrid) ? tileCoord : null;
    };
    /**
     * Remove all cached tiles from the source. The next render cycle will fetch new tiles.
     * @api
     */
    TileSource.prototype.clear = function () {
        this.tileCache.clear();
    };
    TileSource.prototype.refresh = function () {
        this.clear();
        _super.prototype.refresh.call(this);
    };
    /**
     * Increases the cache size if needed
     * @param {number} tileCount Minimum number of tiles needed.
     * @param {import("../proj/Projection.js").default} projection Projection.
     */
    TileSource.prototype.updateCacheSize = function (tileCount, projection) {
        var tileCache = this.getTileCacheForProjection(projection);
        if (tileCount > tileCache.highWaterMark) {
            tileCache.highWaterMark = tileCount;
        }
    };
    /**
     * Marks a tile coord as being used, without triggering a load.
     * @abstract
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {import("../proj/Projection.js").default} projection Projection.
     */
    TileSource.prototype.useTile = function (z, x, y, projection) { };
    return TileSource;
}(Source));
/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Tile~TileSource} instances are instances of this
 * type.
 */
var TileSourceEvent = /** @class */ (function (_super) {
    __extends(TileSourceEvent, _super);
    /**
     * @param {string} type Type.
     * @param {import("../Tile.js").default} tile The tile.
     */
    function TileSourceEvent(type, tile) {
        var _this = _super.call(this, type) || this;
        /**
         * The tile related to the event.
         * @type {import("../Tile.js").default}
         * @api
         */
        _this.tile = tile;
        return _this;
    }
    return TileSourceEvent;
}(Event));
export { TileSourceEvent };
export default TileSource;
//# sourceMappingURL=Tile.js.map