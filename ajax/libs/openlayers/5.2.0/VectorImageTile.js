/**
 * @module ol/VectorImageTile
 */
import {getUid} from './util.js';
import Tile from './Tile.js';
import TileState from './TileState.js';
import {createCanvasContext2D} from './dom.js';
import {listen, unlistenByKey} from './events.js';
import {getHeight, getIntersection, getWidth} from './extent.js';
import EventType from './events/EventType.js';
import {loadFeaturesXhr} from './featureloader.js';
import {VOID} from './functions.js';


/**
 * @typedef {Object} ReplayState
 * @property {boolean} dirty
 * @property {null|module:ol/render~OrderFunction} renderedRenderOrder
 * @property {number} renderedTileRevision
 * @property {number} renderedRevision
 */


var VectorImageTile = (function (Tile) {
  function VectorImageTile(tileCoord, state, sourceRevision, format, tileLoadFunction,
    urlTileCoord, tileUrlFunction, sourceTileGrid, tileGrid, sourceTiles,
    pixelRatio, projection, tileClass, handleTileChange, zoom) {
    var this$1 = this;


    Tile.call(this, tileCoord, state, {transition: 0});

    /**
     * @private
     * @type {!Object<string, CanvasRenderingContext2D>}
     */
    this.context_ = {};

    /**
     * @private
     * @type {module:ol/featureloader~FeatureLoader}
     */
    this.loader_;

    /**
     * @private
     * @type {!Object<string, module:ol/VectorImageTile~ReplayState>}
     */
    this.replayState_ = {};

    /**
     * @private
     * @type {Object<string, module:ol/VectorTile>}
     */
    this.sourceTiles_ = sourceTiles;

    /**
     * Keys of source tiles used by this tile. Use with {@link #getTile}.
     * @type {Array<string>}
     */
    this.tileKeys = [];

    /**
     * @type {module:ol/extent~Extent}
     */
    this.extent = null;

    /**
     * @type {number}
     */
    this.sourceRevision_ = sourceRevision;

    /**
     * @type {module:ol/tilecoord~TileCoord}
     */
    this.wrappedTileCoord = urlTileCoord;

    /**
     * @type {Array<module:ol/events~EventsKey>}
     */
    this.loadListenerKeys_ = [];

    /**
     * @type {Array<module:ol/events~EventsKey>}
     */
    this.sourceTileListenerKeys_ = [];

    if (urlTileCoord) {
      var extent = this.extent = tileGrid.getTileCoordExtent(urlTileCoord);
      var resolution = tileGrid.getResolution(zoom);
      var sourceZ = sourceTileGrid.getZForResolution(resolution);
      var useLoadedOnly = zoom != tileCoord[0];
      var loadCount = 0;
      sourceTileGrid.forEachTileCoord(extent, sourceZ, function(sourceTileCoord) {
        var sharedExtent = getIntersection(extent,
          sourceTileGrid.getTileCoordExtent(sourceTileCoord));
        var sourceExtent = sourceTileGrid.getExtent();
        if (sourceExtent) {
          sharedExtent = getIntersection(sharedExtent, sourceExtent, sharedExtent);
        }
        if (getWidth(sharedExtent) / resolution >= 0.5 &&
            getHeight(sharedExtent) / resolution >= 0.5) {
          // only include source tile if overlap is at least 1 pixel
          ++loadCount;
          var sourceTileKey = sourceTileCoord.toString();
          var sourceTile = sourceTiles[sourceTileKey];
          if (!sourceTile && !useLoadedOnly) {
            var tileUrl = tileUrlFunction(sourceTileCoord, pixelRatio, projection);
            sourceTile = sourceTiles[sourceTileKey] = new tileClass(sourceTileCoord,
              tileUrl == undefined ? TileState.EMPTY : TileState.IDLE,
              tileUrl == undefined ? '' : tileUrl,
              format, tileLoadFunction);
            this.sourceTileListenerKeys_.push(
              listen(sourceTile, EventType.CHANGE, handleTileChange));
          }
          if (sourceTile && (!useLoadedOnly || sourceTile.getState() == TileState.LOADED)) {
            sourceTile.consumers++;
            this.tileKeys.push(sourceTileKey);
          }
        }
      }.bind(this));

      if (useLoadedOnly && loadCount == this.tileKeys.length) {
        this.finishLoading_();
      }

      if (zoom <= tileCoord[0] && this.state != TileState.LOADED) {
        while (zoom > tileGrid.getMinZoom()) {
          var tile = new VectorImageTile(tileCoord, state, sourceRevision,
            format, tileLoadFunction, urlTileCoord, tileUrlFunction,
            sourceTileGrid, tileGrid, sourceTiles, pixelRatio, projection,
            tileClass, VOID, --zoom);
          if (tile.state == TileState.LOADED) {
            this$1.interimTile = tile;
            break;
          }
        }
      }
    }

  }

  if ( Tile ) VectorImageTile.__proto__ = Tile;
  VectorImageTile.prototype = Object.create( Tile && Tile.prototype );
  VectorImageTile.prototype.constructor = VectorImageTile;

  /**
   * @inheritDoc
   */
  VectorImageTile.prototype.disposeInternal = function disposeInternal () {
    var this$1 = this;

    this.state = TileState.ABORT;
    this.changed();
    if (this.interimTile) {
      this.interimTile.dispose();
    }

    for (var i = 0, ii = this.tileKeys.length; i < ii; ++i) {
      var sourceTileKey = this$1.tileKeys[i];
      var sourceTile = this$1.getTile(sourceTileKey);
      sourceTile.consumers--;
      if (sourceTile.consumers == 0) {
        delete this$1.sourceTiles_[sourceTileKey];
        sourceTile.dispose();
      }
    }
    this.tileKeys.length = 0;
    this.sourceTiles_ = null;
    this.loadListenerKeys_.forEach(unlistenByKey);
    this.loadListenerKeys_.length = 0;
    this.sourceTileListenerKeys_.forEach(unlistenByKey);
    this.sourceTileListenerKeys_.length = 0;
    Tile.prototype.disposeInternal.call(this);
  };

  /**
   * @param {module:ol/layer/Layer} layer Layer.
   * @return {CanvasRenderingContext2D} The rendering context.
   */
  VectorImageTile.prototype.getContext = function getContext (layer) {
    var key = getUid(layer).toString();
    if (!(key in this.context_)) {
      this.context_[key] = createCanvasContext2D();
    }
    return this.context_[key];
  };

  /**
   * Get the Canvas for this tile.
   * @param {module:ol/layer/Layer} layer Layer.
   * @return {HTMLCanvasElement} Canvas.
   */
  VectorImageTile.prototype.getImage = function getImage (layer) {
    return this.getReplayState(layer).renderedTileRevision == -1 ?
      null : this.getContext(layer).canvas;
  };

  /**
   * @param {module:ol/layer/Layer} layer Layer.
   * @return {module:ol/VectorImageTile~ReplayState} The replay state.
   */
  VectorImageTile.prototype.getReplayState = function getReplayState (layer) {
    var key = getUid(layer).toString();
    if (!(key in this.replayState_)) {
      this.replayState_[key] = {
        dirty: false,
        renderedRenderOrder: null,
        renderedRevision: -1,
        renderedTileRevision: -1
      };
    }
    return this.replayState_[key];
  };

  /**
   * @inheritDoc
   */
  VectorImageTile.prototype.getKey = function getKey () {
    return this.tileKeys.join('/') + '-' + this.sourceRevision_;
  };

  /**
   * @param {string} tileKey Key (tileCoord) of the source tile.
   * @return {module:ol/VectorTile} Source tile.
   */
  VectorImageTile.prototype.getTile = function getTile (tileKey) {
    return this.sourceTiles_[tileKey];
  };

  /**
   * @inheritDoc
   */
  VectorImageTile.prototype.load = function load () {
    // Source tiles with LOADED state - we just count them because once they are
    // loaded, we're no longer listening to state changes.
    var leftToLoad = 0;
    // Source tiles with ERROR state - we track them because they can still have
    // an ERROR state after another load attempt.
    var errorSourceTiles = {};

    if (this.state == TileState.IDLE) {
      this.setState(TileState.LOADING);
    }
    if (this.state == TileState.LOADING) {
      this.tileKeys.forEach(function(sourceTileKey) {
        var sourceTile = this.getTile(sourceTileKey);
        if (sourceTile.state == TileState.IDLE) {
          sourceTile.setLoader(this.loader_);
          sourceTile.load();
        }
        if (sourceTile.state == TileState.LOADING) {
          var key = listen(sourceTile, EventType.CHANGE, function(e) {
            var state = sourceTile.getState();
            if (state == TileState.LOADED ||
                state == TileState.ERROR) {
              var uid = getUid(sourceTile);
              if (state == TileState.ERROR) {
                errorSourceTiles[uid] = true;
              } else {
                --leftToLoad;
                delete errorSourceTiles[uid];
              }
              if (leftToLoad - Object.keys(errorSourceTiles).length == 0) {
                this.finishLoading_();
              }
            }
          }.bind(this));
          this.loadListenerKeys_.push(key);
          ++leftToLoad;
        }
      }.bind(this));
    }
    if (leftToLoad - Object.keys(errorSourceTiles).length == 0) {
      setTimeout(this.finishLoading_.bind(this), 0);
    }
  };

  /**
   * @private
   */
  VectorImageTile.prototype.finishLoading_ = function finishLoading_ () {
    var this$1 = this;

    var loaded = this.tileKeys.length;
    var empty = 0;
    for (var i = loaded - 1; i >= 0; --i) {
      var state = this$1.getTile(this$1.tileKeys[i]).getState();
      if (state != TileState.LOADED) {
        --loaded;
      }
      if (state == TileState.EMPTY) {
        ++empty;
      }
    }
    if (loaded == this.tileKeys.length) {
      this.loadListenerKeys_.forEach(unlistenByKey);
      this.loadListenerKeys_.length = 0;
      this.setState(TileState.LOADED);
    } else {
      this.setState(empty == this.tileKeys.length ? TileState.EMPTY : TileState.ERROR);
    }
  };

  return VectorImageTile;
}(Tile));


export default VectorImageTile;

/**
 * Sets the loader for a tile.
 * @param {module:ol/VectorTile} tile Vector tile.
 * @param {string} url URL.
 */
export function defaultLoadFunction(tile, url) {
  var loader = loadFeaturesXhr(url, tile.getFormat(), tile.onLoad.bind(tile), tile.onError.bind(tile));
  tile.setLoader(loader);
}

//# sourceMappingURL=VectorImageTile.js.map