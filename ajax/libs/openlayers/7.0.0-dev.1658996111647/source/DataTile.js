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
 * @module ol/source/DataTile
 */
import DataTile from '../DataTile.js';
import EventType from '../events/EventType.js';
import TileEventType from './TileEventType.js';
import TileSource, { TileSourceEvent } from './Tile.js';
import TileState from '../TileState.js';
import { assign } from '../obj.js';
import { createXYZ, extentFromProjection } from '../tilegrid.js';
import { getKeyZXY } from '../tilecoord.js';
import { getUid } from '../util.js';
import { toPromise } from '../functions.js';
import { toSize } from '../size.js';
/**
 * Data tile loading function.  The function is called with z, x, and y tile coordinates and
 * returns {@link import("../DataTile.js").Data data} for a tile or a promise for the same.
 * @typedef {function(number, number, number) : (import("../DataTile.js").Data|Promise<import("../DataTile.js").Data>)} Loader
 */
/**
 * @typedef {Object} Options
 * @property {Loader} [loader] Data loader.  Called with z, x, and y tile coordinates.
 * Returns {@link import("../DataTile.js").Data data} for a tile or a promise for the same.
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The pixel width and height of the source tiles.
 * This may be different than the rendered pixel size if a `tileGrid` is provided.
 * @property {number} [gutter=0] The size in pixels of the gutter around data tiles to ignore.
 * This allows artifacts of rendering at tile edges to be ignored.
 * Supported data should be wider and taller than the tile size by a value of `2 x gutter`.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Tile projection.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("./Source.js").State} [state] The source state.
 * @property {number} [tilePixelRatio] Deprecated.  To have tiles scaled, pass a `tileSize` representing
 * the source tile size and a `tileGrid` with the desired rendered tile size.
 * @property {boolean} [wrapX=false] Render tiles beyond the antimeridian.
 * @property {number} [transition] Transition time when fading in new tiles (in miliseconds).
 * @property {number} [bandCount=4] Number of bands represented in the data.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */
/**
 * @classdesc
 * A source for typed array data tiles.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */
var DataTileSource = /** @class */ (function (_super) {
    __extends(DataTileSource, _super);
    /**
     * @param {Options} options Image tile options.
     */
    function DataTileSource(options) {
        var _this = this;
        var projection = options.projection === undefined ? 'EPSG:3857' : options.projection;
        var tileGrid = options.tileGrid;
        if (tileGrid === undefined && projection) {
            tileGrid = createXYZ({
                extent: extentFromProjection(projection),
                maxResolution: options.maxResolution,
                maxZoom: options.maxZoom,
                minZoom: options.minZoom,
                tileSize: options.tileSize,
            });
        }
        _this = _super.call(this, {
            cacheSize: 0.1,
            attributions: options.attributions,
            attributionsCollapsible: options.attributionsCollapsible,
            projection: projection,
            tileGrid: tileGrid,
            opaque: options.opaque,
            state: options.state,
            tilePixelRatio: options.tilePixelRatio,
            wrapX: options.wrapX,
            transition: options.transition,
            interpolate: options.interpolate,
        }) || this;
        /**
         * @private
         * @type {number}
         */
        _this.gutter_ = options.gutter !== undefined ? options.gutter : 0;
        /**
         * @private
         * @type {import('../size.js').Size|null}
         */
        _this.tileSize_ = options.tileSize ? toSize(options.tileSize) : null;
        if (!_this.tileSize_ && options.tilePixelRatio && tileGrid) {
            var renderTileSize = toSize(tileGrid.getTileSize(0));
            _this.tileSize_ = [
                renderTileSize[0] * options.tilePixelRatio,
                renderTileSize[1] * options.tilePixelRatio,
            ];
        }
        /**
         * @private
         * @type {Array<import('../size.js').Size>|null}
         */
        _this.tileSizes_ = null;
        /**
         * @private
         * @type {!Object<string, boolean>}
         */
        _this.tileLoadingKeys_ = {};
        /**
         * @private
         */
        _this.loader_ = options.loader;
        _this.handleTileChange_ = _this.handleTileChange_.bind(_this);
        /**
         * @type {number}
         */
        _this.bandCount = options.bandCount === undefined ? 4 : options.bandCount; // assume RGBA if undefined
        return _this;
    }
    /**
     * Set the source tile sizes.  The length of the array is expected to match the number of
     * levels in the tile grid.
     * @protected
     * @param {Array<import('../size.js').Size>} tileSizes An array of tile sizes.
     */
    DataTileSource.prototype.setTileSizes = function (tileSizes) {
        this.tileSizes_ = tileSizes;
    };
    /**
     * Get the source tile size at the given zoom level.  This may be different than the rendered tile
     * size.
     * @protected
     * @param {number} z Tile zoom level.
     * @return {import('../size.js').Size} The source tile size.
     */
    DataTileSource.prototype.getTileSize = function (z) {
        if (this.tileSizes_) {
            return this.tileSizes_[z];
        }
        if (this.tileSize_) {
            return this.tileSize_;
        }
        var tileGrid = this.getTileGrid();
        return tileGrid ? toSize(tileGrid.getTileSize(z)) : [256, 256];
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {number} Gutter.
     */
    DataTileSource.prototype.getGutterForProjection = function (projection) {
        return this.gutter_;
    };
    /**
     * @param {Loader} loader The data loader.
     * @protected
     */
    DataTileSource.prototype.setLoader = function (loader) {
        this.loader_ = loader;
    };
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!DataTile} Tile.
     */
    DataTileSource.prototype.getTile = function (z, x, y, pixelRatio, projection) {
        var size = this.getTileSize(z);
        var tileCoordKey = getKeyZXY(z, x, y);
        if (this.tileCache.containsKey(tileCoordKey)) {
            return this.tileCache.get(tileCoordKey);
        }
        var sourceLoader = this.loader_;
        function loader() {
            return toPromise(function () {
                return sourceLoader(z, x, y);
            });
        }
        var options = assign({
            tileCoord: [z, x, y],
            loader: loader,
            size: size,
        }, this.tileOptions);
        var tile = new DataTile(options);
        tile.key = this.getKey();
        tile.addEventListener(EventType.CHANGE, this.handleTileChange_);
        this.tileCache.set(tileCoordKey, tile);
        return tile;
    };
    /**
     * Handle tile change events.
     * @param {import("../events/Event.js").default} event Event.
     */
    DataTileSource.prototype.handleTileChange_ = function (event) {
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
            type =
                tileState == TileState.ERROR
                    ? TileEventType.TILELOADERROR
                    : tileState == TileState.LOADED
                        ? TileEventType.TILELOADEND
                        : undefined;
        }
        if (type) {
            this.dispatchEvent(new TileSourceEvent(type, tile));
        }
    };
    return DataTileSource;
}(TileSource));
export default DataTileSource;
//# sourceMappingURL=DataTile.js.map