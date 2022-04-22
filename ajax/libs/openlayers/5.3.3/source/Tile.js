/**
 * @module ol/source/Tile
 */
import {abstract} from '../util.js';
import TileCache from '../TileCache.js';
import TileState from '../TileState.js';
import Event from '../events/Event.js';
import {equivalent} from '../proj.js';
import {toSize, scale as scaleSize} from '../size.js';
import Source from './Source.js';
import {getKeyZXY, withinExtentAndZ} from '../tilecoord.js';
import {wrapX, getForProjection as getTileGridForProjection} from '../tilegrid.js';

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions]
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize]
 * @property {boolean} [opaque]
 * @property {number} [tilePixelRatio]
 * @property {import("../proj.js").ProjectionLike} [projection]
 * @property {import("./State.js").default} [state]
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid]
 * @property {boolean} [wrapX=true]
 * @property {number} [transition]
 * @property {string} [key]
 */


/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing images divided into a tile grid.
 * @abstract
 * @api
 */
var TileSource = /*@__PURE__*/(function (Source) {
  function TileSource(options) {

    Source.call(this, {
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      projection: options.projection,
      state: options.state,
      wrapX: options.wrapX
    });

    /**
     * @private
     * @type {boolean}
     */
    this.opaque_ = options.opaque !== undefined ? options.opaque : false;

    /**
     * @private
     * @type {number}
     */
    this.tilePixelRatio_ = options.tilePixelRatio !== undefined ?
      options.tilePixelRatio : 1;

    /**
     * @protected
     * @type {import("../tilegrid/TileGrid.js").default}
     */
    this.tileGrid = options.tileGrid !== undefined ? options.tileGrid : null;

    /**
     * @protected
     * @type {import("../TileCache.js").default}
     */
    this.tileCache = new TileCache(options.cacheSize);

    /**
     * @protected
     * @type {import("../size.js").Size}
     */
    this.tmpSize = [0, 0];

    /**
     * @private
     * @type {string}
     */
    this.key_ = options.key || '';

    /**
     * @protected
     * @type {import("../Tile.js").Options}
     */
    this.tileOptions = {transition: options.transition};

  }

  if ( Source ) TileSource.__proto__ = Source;
  TileSource.prototype = Object.create( Source && Source.prototype );
  TileSource.prototype.constructor = TileSource;

  /**
   * @return {boolean} Can expire cache.
   */
  TileSource.prototype.canExpireCache = function canExpireCache () {
    return this.tileCache.canExpireCache();
  };

  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, import("../TileRange.js").default>} usedTiles Used tiles.
   */
  TileSource.prototype.expireCache = function expireCache (projection, usedTiles) {
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
  TileSource.prototype.forEachLoadedTile = function forEachLoadedTile (projection, z, tileRange, callback) {
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
            loaded = (callback(tile) !== false);
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
  TileSource.prototype.getGutterForProjection = function getGutterForProjection (projection) {
    return 0;
  };

  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @protected
   */
  TileSource.prototype.getKey = function getKey () {
    return this.key_;
  };

  /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */
  TileSource.prototype.setKey = function setKey (key) {
    if (this.key_ !== key) {
      this.key_ = key;
      this.changed();
    }
  };

  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */
  TileSource.prototype.getOpaque = function getOpaque (projection) {
    return this.opaque_;
  };

  /**
   * @inheritDoc
   */
  TileSource.prototype.getResolutions = function getResolutions () {
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
  TileSource.prototype.getTile = function getTile (z, x, y, pixelRatio, projection) {
    return abstract();
  };

  /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default} Tile grid.
   * @api
   */
  TileSource.prototype.getTileGrid = function getTileGrid () {
    return this.tileGrid;
  };

  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */
  TileSource.prototype.getTileGridForProjection = function getTileGridForProjection$1 (projection) {
    if (!this.tileGrid) {
      return getTileGridForProjection(projection);
    } else {
      return this.tileGrid;
    }
  };

  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   * @protected
   */
  TileSource.prototype.getTileCacheForProjection = function getTileCacheForProjection (projection) {
    var thisProj = this.getProjection();
    if (thisProj && !equivalent(thisProj, projection)) {
      return null;
    } else {
      return this.tileCache;
    }
  };

  /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */
  TileSource.prototype.getTilePixelRatio = function getTilePixelRatio (pixelRatio) {
    return this.tilePixelRatio_;
  };

  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */
  TileSource.prototype.getTilePixelSize = function getTilePixelSize (z, pixelRatio, projection) {
    var tileGrid = this.getTileGridForProjection(projection);
    var tilePixelRatio = this.getTilePixelRatio(pixelRatio);
    var tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
    if (tilePixelRatio == 1) {
      return tileSize;
    } else {
      return scaleSize(tileSize, tilePixelRatio, this.tmpSize);
    }
  };

  /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default=} opt_projection Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */
  TileSource.prototype.getTileCoordForTileUrlFunction = function getTileCoordForTileUrlFunction (tileCoord, opt_projection) {
    var projection = opt_projection !== undefined ?
      opt_projection : this.getProjection();
    var tileGrid = this.getTileGridForProjection(projection);
    if (this.getWrapX() && projection.isGlobal()) {
      tileCoord = wrapX(tileGrid, tileCoord, projection);
    }
    return withinExtentAndZ(tileCoord, tileGrid) ? tileCoord : null;
  };

  /**
   * @inheritDoc
   */
  TileSource.prototype.refresh = function refresh () {
    this.tileCache.clear();
    this.changed();
  };

  /**
   * Marks a tile coord as being used, without triggering a load.
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  TileSource.prototype.useTile = function useTile (z, x, y, projection) {};

  return TileSource;
}(Source));


/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Tile~TileSource} instances are instances of this
 * type.
 */
export var TileSourceEvent = /*@__PURE__*/(function (Event) {
  function TileSourceEvent(type, tile) {

    Event.call(this, type);

    /**
     * The tile related to the event.
     * @type {import("../Tile.js").default}
     * @api
     */
    this.tile = tile;

  }

  if ( Event ) TileSourceEvent.__proto__ = Event;
  TileSourceEvent.prototype = Object.create( Event && Event.prototype );
  TileSourceEvent.prototype.constructor = TileSourceEvent;

  return TileSourceEvent;
}(Event));

export default TileSource;

//# sourceMappingURL=Tile.js.map