/**
 * @module ol/source/Tile
 */

import {VOID} from '../functions.js';
import TileCache from '../TileCache.js';
import TileState from '../TileState.js';
import Event from '../events/Event.js';
import {equivalent} from '../proj.js';
import {toSize, scale as scaleSize} from '../size.js';
import Source from '../source/Source.js';
import {getKeyZXY, withinExtentAndZ} from '../tilecoord.js';
import {wrapX, getForProjection as getTileGridForProjection} from '../tilegrid.js';

/**
 * @typedef {Object} Options
 * @property {module:ol/source/Source~AttributionLike} [attributions]
 * @property {number} [cacheSize]
 * @property {module:ol/extent~Extent} [extent]
 * @property {boolean} [opaque]
 * @property {number} [tilePixelRatio]
 * @property {module:ol/proj~ProjectionLike} [projection]
 * @property {module:ol/source/State} [state]
 * @property {module:ol/tilegrid/TileGrid} [tileGrid]
 * @property {boolean} [wrapX=true]
 * @property {number} [transition]
 */


/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing images divided into a tile grid.
 * @api
 */
var TileSource = (function (Source) {
  function TileSource(options) {

    Source.call(this, {
      attributions: options.attributions,
      extent: options.extent,
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
     * @type {module:ol/tilegrid/TileGrid}
     */
    this.tileGrid = options.tileGrid !== undefined ? options.tileGrid : null;

    /**
     * @protected
     * @type {module:ol/TileCache}
     */
    this.tileCache = new TileCache(options.cacheSize);

    /**
     * @protected
     * @type {module:ol/size~Size}
     */
    this.tmpSize = [0, 0];

    /**
     * @private
     * @type {string}
     */
    this.key_ = '';

    /**
     * @protected
     * @type {module:ol/Tile~Options}
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
   * @param {module:ol/proj/Projection} projection Projection.
   * @param {!Object<string, module:ol/TileRange>} usedTiles Used tiles.
   */
  TileSource.prototype.expireCache = function expireCache (projection, usedTiles) {
    var tileCache = this.getTileCacheForProjection(projection);
    if (tileCache) {
      tileCache.expireCache(usedTiles);
    }
  };

  /**
   * @param {module:ol/proj/Projection} projection Projection.
   * @param {number} z Zoom level.
   * @param {module:ol/TileRange} tileRange Tile range.
   * @param {function(module:ol/Tile):(boolean|undefined)} callback Called with each
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
          tile = /** @type {!module:ol/Tile} */ (tileCache.get(tileCoordKey));
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
   * @param {module:ol/proj/Projection} projection Projection.
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
   * @param {module:ol/proj/Projection} projection Projection.
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
   * @param {module:ol/proj/Projection} projection Projection.
   * @return {!module:ol/Tile} Tile.
   */
  TileSource.prototype.getTile = function getTile (z, x, y, pixelRatio, projection) {};

  /**
   * Return the tile grid of the tile source.
   * @return {module:ol/tilegrid/TileGrid} Tile grid.
   * @api
   */
  TileSource.prototype.getTileGrid = function getTileGrid () {
    return this.tileGrid;
  };

  /**
   * @param {module:ol/proj/Projection} projection Projection.
   * @return {!module:ol/tilegrid/TileGrid} Tile grid.
   */
  TileSource.prototype.getTileGridForProjection = function getTileGridForProjection$1 (projection) {
    if (!this.tileGrid) {
      return getTileGridForProjection(projection);
    } else {
      return this.tileGrid;
    }
  };

  /**
   * @param {module:ol/proj/Projection} projection Projection.
   * @return {module:ol/TileCache} Tile cache.
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
   * @param {module:ol/proj/Projection} projection Projection.
   * @return {module:ol/size~Size} Tile size.
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
   * @param {module:ol/tilecoord~TileCoord} tileCoord Tile coordinate.
   * @param {module:ol/proj/Projection=} opt_projection Projection.
   * @return {module:ol/tilecoord~TileCoord} Tile coordinate to be passed to the tileUrlFunction or
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

  return TileSource;
}(Source));


/**
 * Marks a tile coord as being used, without triggering a load.
 * @param {number} z Tile coordinate z.
 * @param {number} x Tile coordinate x.
 * @param {number} y Tile coordinate y.
 * @param {module:ol/proj/Projection} projection Projection.
 */
TileSource.prototype.useTile = VOID;


/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Tile~TileSource} instances are instances of this
 * type.
 */
export var TileSourceEvent = (function (Event) {
  function TileSourceEvent(type, tile) {

    Event.call(this, type);

    /**
     * The tile related to the event.
     * @type {module:ol/Tile}
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