/**
 * @module ol/source/VectorTile
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
import EventType from '../events/EventType.js';
import Tile from '../VectorTile.js';
import TileCache from '../TileCache.js';
import TileState from '../TileState.js';
import UrlTile from './UrlTile.js';
import VectorRenderTile from '../VectorRenderTile.js';
import { buffer as bufferExtent, getIntersection, intersects, } from '../extent.js';
import { createForProjection, createXYZ, extentFromProjection, } from '../tilegrid.js';
import { equals } from '../array.js';
import { fromKey, getKeyZXY } from '../tilecoord.js';
import { loadFeaturesXhr } from '../featureloader.js';
import { toSize } from '../size.js';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least twice the number of tiles in the viewport.
 * @property {import("../extent.js").Extent} [extent]
 * @property {import("../format/Feature.js").default} [format] Feature format for tiles. Used and required by the default.
 * @property {boolean} [overlaps=true] This source may have overlapping geometries. Setting this
 * to `false` (e.g. for sources with polygons that represent administrative
 * boundaries or TopoJSON sources) allows the renderer to optimise fill and
 * stroke operations.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection of the tile grid.
 * @property {import("./State.js").default} [state] Source state.
 * @property {typeof import("../VectorTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/VectorTile}.
 * @property {number} [maxZoom=22] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number|import("../size.js").Size} [tileSize=512] Optional tile size. Not used if `tileGrid` is provided.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction]
 * Optional function to load a tile given a URL. Could look like this for pbf tiles:
 * ```js
 * function(tile, url) {
 *   tile.setLoader(function(extent, resolution, projection) {
 *     fetch(url).then(function(response) {
 *       response.arrayBuffer().then(function(data) {
 *         const format = tile.getFormat() // ol/format/MVT configured as source format
 *         const features = format.readFeatures(data, {
 *           extent: extent,
 *           featureProjection: projection
 *         });
 *         tile.setFeatures(features);
 *       });
 *     });
 *   });
 * }
 * ```
 * If you do not need extent, resolution and projection to get the features for a tile (e.g.
 * for GeoJSON tiles), your `tileLoadFunction` does not need a `setLoader()` call. Only make sure
 * to call `setFeatures()` on the tile:
 * ```js
 * const format = new GeoJSON({featureProjection: map.getView().getProjection()});
 * async function tileLoadFunction(tile, url) {
 *   const response = await fetch(url);
 *   const data = await response.json();
 *   tile.setFeatures(format.readFeatures(data));
 * }
 * ```
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get tile URL given a tile coordinate and the projection.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {number} [transition] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * When set to `false`, only one world
 * will be rendered. When set to `true`, tiles will be wrapped horizontally to
 * render multiple worlds.
 * @property {number} [zDirection=1] Indicate which resolution should be used
 * by a renderer if the view resolution does not match any resolution of the tile source.
 * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
 * will be used. If -1, the nearest higher resolution will be used.
 */
/**
 * @classdesc
 * Class for layer sources providing vector data divided into a tile grid, to be
 * used with {@link module:ol/layer/VectorTile~VectorTile}. Although this source receives tiles
 * with vector features from the server, it is not meant for feature editing.
 * Features are optimized for rendering, their geometries are clipped at or near
 * tile boundaries and simplified for a view resolution. See
 * {@link module:ol/source/Vector} for vector sources that are suitable for feature
 * editing.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */
var VectorTile = /** @class */ (function (_super) {
    __extends(VectorTile, _super);
    /**
     * @param {!Options} options Vector tile options.
     */
    function VectorTile(options) {
        var _this = this;
        var projection = options.projection || 'EPSG:3857';
        var extent = options.extent || extentFromProjection(projection);
        var tileGrid = options.tileGrid ||
            createXYZ({
                extent: extent,
                maxResolution: options.maxResolution,
                maxZoom: options.maxZoom !== undefined ? options.maxZoom : 22,
                minZoom: options.minZoom,
                tileSize: options.tileSize || 512,
            });
        _this = _super.call(this, {
            attributions: options.attributions,
            attributionsCollapsible: options.attributionsCollapsible,
            cacheSize: options.cacheSize,
            opaque: false,
            projection: projection,
            state: options.state,
            tileGrid: tileGrid,
            tileLoadFunction: options.tileLoadFunction
                ? options.tileLoadFunction
                : defaultLoadFunction,
            tileUrlFunction: options.tileUrlFunction,
            url: options.url,
            urls: options.urls,
            wrapX: options.wrapX === undefined ? true : options.wrapX,
            transition: options.transition,
            zDirection: options.zDirection === undefined ? 1 : options.zDirection,
        }) || this;
        /**
         * @private
         * @type {import("../format/Feature.js").default}
         */
        _this.format_ = options.format ? options.format : null;
        /**
         * @type {Object<string, import("./VectorTile").default>}
         */
        _this.loadingTiles_ = {};
        /**
         * @private
         * @type {TileCache}
         */
        _this.sourceTileCache = new TileCache(_this.tileCache.highWaterMark);
        /**
         * @private
         * @type {boolean}
         */
        _this.overlaps_ = options.overlaps == undefined ? true : options.overlaps;
        /**
         * @protected
         * @type {typeof import("../VectorTile.js").default}
         */
        _this.tileClass = options.tileClass ? options.tileClass : Tile;
        /**
         * @private
         * @type {Object<string, import("../tilegrid/TileGrid.js").default>}
         */
        _this.tileGrids_ = {};
        return _this;
    }
    /**
     * Get features whose bounding box intersects the provided extent. Only features for cached
     * tiles for the last rendered zoom level are available in the source. So this method is only
     * suitable for requesting tiles for extents that are currently rendered.
     *
     * Features are returned in random tile order and as they are included in the tiles. This means
     * they can be clipped, duplicated across tiles, and simplified to the render resolution.
     *
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {Array<import("../Feature.js").FeatureLike>} Features.
     * @api
     */
    VectorTile.prototype.getFeaturesInExtent = function (extent) {
        var features = [];
        var tileCache = this.tileCache;
        if (tileCache.getCount() === 0) {
            return features;
        }
        var z = fromKey(tileCache.peekFirstKey())[0];
        var tileGrid = this.tileGrid;
        tileCache.forEach(function (tile) {
            if (tile.tileCoord[0] !== z || tile.getState() !== TileState.LOADED) {
                return;
            }
            var sourceTiles = tile.getSourceTiles();
            for (var i = 0, ii = sourceTiles.length; i < ii; ++i) {
                var sourceTile = sourceTiles[i];
                var tileCoord = sourceTile.tileCoord;
                if (intersects(extent, tileGrid.getTileCoordExtent(tileCoord))) {
                    var tileFeatures = sourceTile.getFeatures();
                    if (tileFeatures) {
                        for (var j = 0, jj = tileFeatures.length; j < jj; ++j) {
                            var candidate = tileFeatures[j];
                            var geometry = candidate.getGeometry();
                            if (intersects(extent, geometry.getExtent())) {
                                features.push(candidate);
                            }
                        }
                    }
                }
            }
        });
        return features;
    };
    /**
     * @return {boolean} The source can have overlapping geometries.
     */
    VectorTile.prototype.getOverlaps = function () {
        return this.overlaps_;
    };
    /**
     * clear {@link module:ol/TileCache~TileCache} and delete all source tiles
     * @api
     */
    VectorTile.prototype.clear = function () {
        this.tileCache.clear();
        this.sourceTileCache.clear();
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {!Object<string, boolean>} usedTiles Used tiles.
     */
    VectorTile.prototype.expireCache = function (projection, usedTiles) {
        _super.prototype.expireCache.call(this, projection, usedTiles);
        this.sourceTileCache.expireCache({});
    };
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection").default} projection Projection.
     * @param {VectorRenderTile} tile Vector image tile.
     * @return {Array<import("../VectorTile").default>} Tile keys.
     */
    VectorTile.prototype.getSourceTiles = function (pixelRatio, projection, tile) {
        var urlTileCoord = tile.wrappedTileCoord;
        var tileGrid = this.getTileGridForProjection(projection);
        var extent = tileGrid.getTileCoordExtent(urlTileCoord);
        var z = urlTileCoord[0];
        var resolution = tileGrid.getResolution(z);
        // make extent 1 pixel smaller so we don't load tiles for < 0.5 pixel render space
        bufferExtent(extent, -resolution, extent);
        var sourceTileGrid = this.tileGrid;
        var sourceExtent = sourceTileGrid.getExtent();
        if (sourceExtent) {
            getIntersection(extent, sourceExtent, extent);
        }
        var sourceZ = sourceTileGrid.getZForResolution(resolution, 1);
        var minZoom = sourceTileGrid.getMinZoom();
        var previousSourceTiles = tile.sourceTiles;
        var sourceTiles, covered, loadedZ;
        if (previousSourceTiles &&
            previousSourceTiles.length > 0 &&
            previousSourceTiles[0].tileCoord[0] === sourceZ) {
            sourceTiles = previousSourceTiles;
            covered = true;
            loadedZ = sourceZ;
        }
        else {
            sourceTiles = [];
            loadedZ = sourceZ + 1;
            do {
                --loadedZ;
                covered = true;
                sourceTileGrid.forEachTileCoord(extent, loadedZ, function (sourceTileCoord) {
                    var tileUrl = this.tileUrlFunction(sourceTileCoord, pixelRatio, projection);
                    var sourceTile;
                    if (tileUrl !== undefined) {
                        if (this.sourceTileCache.containsKey(tileUrl)) {
                            sourceTile = this.sourceTileCache.get(tileUrl);
                            var state = sourceTile.getState();
                            if (state === TileState.LOADED ||
                                state === TileState.ERROR ||
                                state === TileState.EMPTY) {
                                sourceTiles.push(sourceTile);
                                return;
                            }
                        }
                        else if (loadedZ === sourceZ) {
                            sourceTile = new this.tileClass(sourceTileCoord, TileState.IDLE, tileUrl, this.format_, this.tileLoadFunction);
                            sourceTile.extent = sourceTileGrid.getTileCoordExtent(sourceTileCoord);
                            sourceTile.projection = projection;
                            sourceTile.resolution = sourceTileGrid.getResolution(sourceTileCoord[0]);
                            this.sourceTileCache.set(tileUrl, sourceTile);
                            sourceTile.addEventListener(EventType.CHANGE, this.handleTileChange.bind(this));
                            sourceTile.load();
                        }
                    }
                    covered =
                        covered &&
                            sourceTile &&
                            sourceTile.getState() === TileState.LOADED;
                    if (!sourceTile) {
                        return;
                    }
                    if (sourceTile.getState() !== TileState.EMPTY &&
                        tile.getState() === TileState.IDLE) {
                        tile.loadingSourceTiles++;
                        sourceTile.addEventListener(EventType.CHANGE, function listenChange() {
                            var state = sourceTile.getState();
                            var sourceTileKey = sourceTile.getKey();
                            if (state === TileState.LOADED || state === TileState.ERROR) {
                                if (state === TileState.LOADED) {
                                    sourceTile.removeEventListener(EventType.CHANGE, listenChange);
                                    tile.loadingSourceTiles--;
                                    delete tile.errorSourceTileKeys[sourceTileKey];
                                }
                                else if (state === TileState.ERROR) {
                                    tile.errorSourceTileKeys[sourceTileKey] = true;
                                }
                                var errorTileCount = Object.keys(tile.errorSourceTileKeys)
                                    .length;
                                if (tile.loadingSourceTiles - errorTileCount === 0) {
                                    tile.hifi = errorTileCount === 0;
                                    tile.sourceZ = sourceZ;
                                    tile.setState(TileState.LOADED);
                                }
                            }
                        });
                    }
                }.bind(this));
                if (!covered) {
                    sourceTiles.length = 0;
                }
            } while (!covered && loadedZ > minZoom);
        }
        if (tile.getState() === TileState.IDLE) {
            tile.setState(TileState.LOADING);
        }
        if (covered) {
            tile.hifi = sourceZ === loadedZ;
            tile.sourceZ = loadedZ;
            if (tile.getState() < TileState.LOADED) {
                tile.setState(TileState.LOADED);
            }
            else if (!previousSourceTiles ||
                !equals(sourceTiles, previousSourceTiles)) {
                tile.sourceTiles = sourceTiles;
            }
        }
        return sourceTiles;
    };
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!VectorRenderTile} Tile.
     */
    VectorTile.prototype.getTile = function (z, x, y, pixelRatio, projection) {
        var coordKey = getKeyZXY(z, x, y);
        var key = this.getKey();
        var tile;
        if (this.tileCache.containsKey(coordKey)) {
            tile = this.tileCache.get(coordKey);
            if (tile.key === key) {
                return tile;
            }
        }
        var tileCoord = [z, x, y];
        var urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
        var sourceExtent = this.getTileGrid().getExtent();
        var tileGrid = this.getTileGridForProjection(projection);
        if (urlTileCoord && sourceExtent) {
            var tileExtent = tileGrid.getTileCoordExtent(urlTileCoord);
            // make extent 1 pixel smaller so we don't load tiles for < 0.5 pixel render space
            bufferExtent(tileExtent, -tileGrid.getResolution(z), tileExtent);
            if (!intersects(sourceExtent, tileExtent)) {
                urlTileCoord = null;
            }
        }
        var empty = true;
        if (urlTileCoord !== null) {
            var sourceTileGrid = this.tileGrid;
            var resolution = tileGrid.getResolution(z);
            var sourceZ = sourceTileGrid.getZForResolution(resolution, 1);
            // make extent 1 pixel smaller so we don't load tiles for < 0.5 pixel render space
            var extent = tileGrid.getTileCoordExtent(urlTileCoord);
            bufferExtent(extent, -resolution, extent);
            sourceTileGrid.forEachTileCoord(extent, sourceZ, function (sourceTileCoord) {
                empty =
                    empty &&
                        !this.tileUrlFunction(sourceTileCoord, pixelRatio, projection);
            }.bind(this));
        }
        var newTile = new VectorRenderTile(tileCoord, empty ? TileState.EMPTY : TileState.IDLE, urlTileCoord, this.getSourceTiles.bind(this, pixelRatio, projection));
        newTile.key = key;
        if (tile) {
            newTile.interimTile = tile;
            newTile.refreshInterimChain();
            this.tileCache.replace(coordKey, newTile);
        }
        else {
            this.tileCache.set(coordKey, newTile);
        }
        return newTile;
    };
    /**
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
     */
    VectorTile.prototype.getTileGridForProjection = function (projection) {
        var code = projection.getCode();
        var tileGrid = this.tileGrids_[code];
        if (!tileGrid) {
            // A tile grid that matches the tile size of the source tile grid is more
            // likely to have 1:1 relationships between source tiles and rendered tiles.
            var sourceTileGrid = this.tileGrid;
            tileGrid = createForProjection(projection, undefined, sourceTileGrid
                ? sourceTileGrid.getTileSize(sourceTileGrid.getMinZoom())
                : undefined);
            this.tileGrids_[code] = tileGrid;
        }
        return tileGrid;
    };
    /**
     * Get the tile pixel ratio for this source.
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Tile pixel ratio.
     */
    VectorTile.prototype.getTilePixelRatio = function (pixelRatio) {
        return pixelRatio;
    };
    /**
     * @param {number} z Z.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../size.js").Size} Tile size.
     */
    VectorTile.prototype.getTilePixelSize = function (z, pixelRatio, projection) {
        var tileGrid = this.getTileGridForProjection(projection);
        var tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
        return [
            Math.round(tileSize[0] * pixelRatio),
            Math.round(tileSize[1] * pixelRatio),
        ];
    };
    /**
     * Increases the cache size if needed
     * @param {number} tileCount Minimum number of tiles needed.
     * @param {import("../proj/Projection.js").default} projection Projection.
     */
    VectorTile.prototype.updateCacheSize = function (tileCount, projection) {
        _super.prototype.updateCacheSize.call(this, tileCount * 2, projection);
    };
    return VectorTile;
}(UrlTile));
export default VectorTile;
/**
 * Sets the loader for a tile.
 * @param {import("../VectorTile.js").default} tile Vector tile.
 * @param {string} url URL.
 */
export function defaultLoadFunction(tile, url) {
    var loader = loadFeaturesXhr(url, tile.getFormat(), tile.onLoad.bind(tile), tile.onError.bind(tile));
    tile.setLoader(loader);
}
//# sourceMappingURL=VectorTile.js.map