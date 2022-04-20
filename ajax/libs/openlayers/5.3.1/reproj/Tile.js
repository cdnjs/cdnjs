/**
 * @module ol/reproj/Tile
 */
import {ERROR_THRESHOLD} from './common.js';

import Tile from '../Tile.js';
import TileState from '../TileState.js';
import {listen, unlistenByKey} from '../events.js';
import EventType from '../events/EventType.js';
import {getArea, getCenter, getIntersection} from '../extent.js';
import {clamp} from '../math.js';
import {calculateSourceResolution, render as renderReprojected} from '../reproj.js';
import Triangulation from './Triangulation.js';


/**
 * @typedef {function(number, number, number, number) : import("../Tile.js").default} FunctionType
 */


/**
 * @classdesc
 * Class encapsulating single reprojected tile.
 * See {@link module:ol/source/TileImage~TileImage}.
 *
 */
var ReprojTile = /*@__PURE__*/(function (Tile) {
  function ReprojTile(
    sourceProj,
    sourceTileGrid,
    targetProj,
    targetTileGrid,
    tileCoord,
    wrappedTileCoord,
    pixelRatio,
    gutter,
    getTileFunction,
    opt_errorThreshold,
    opt_renderEdges
  ) {
    Tile.call(this, tileCoord, TileState.IDLE);

    /**
     * @private
     * @type {boolean}
     */
    this.renderEdges_ = opt_renderEdges !== undefined ? opt_renderEdges : false;

    /**
     * @private
     * @type {number}
     */
    this.pixelRatio_ = pixelRatio;

    /**
     * @private
     * @type {number}
     */
    this.gutter_ = gutter;

    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    this.canvas_ = null;

    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */
    this.sourceTileGrid_ = sourceTileGrid;

    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */
    this.targetTileGrid_ = targetTileGrid;

    /**
     * @private
     * @type {import("../tilecoord.js").TileCoord}
     */
    this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;

    /**
     * @private
     * @type {!Array<import("../Tile.js").default>}
     */
    this.sourceTiles_ = [];

    /**
     * @private
     * @type {Array<import("../events.js").EventsKey>}
     */
    this.sourcesListenerKeys_ = null;

    /**
     * @private
     * @type {number}
     */
    this.sourceZ_ = 0;

    var targetExtent = targetTileGrid.getTileCoordExtent(this.wrappedTileCoord_);
    var maxTargetExtent = this.targetTileGrid_.getExtent();
    var maxSourceExtent = this.sourceTileGrid_.getExtent();

    var limitedTargetExtent = maxTargetExtent ?
      getIntersection(targetExtent, maxTargetExtent) : targetExtent;

    if (getArea(limitedTargetExtent) === 0) {
      // Tile is completely outside range -> EMPTY
      // TODO: is it actually correct that the source even creates the tile ?
      this.state = TileState.EMPTY;
      return;
    }

    var sourceProjExtent = sourceProj.getExtent();
    if (sourceProjExtent) {
      if (!maxSourceExtent) {
        maxSourceExtent = sourceProjExtent;
      } else {
        maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
      }
    }

    var targetResolution = targetTileGrid.getResolution(
      this.wrappedTileCoord_[0]);

    var targetCenter = getCenter(limitedTargetExtent);
    var sourceResolution = calculateSourceResolution(
      sourceProj, targetProj, targetCenter, targetResolution);

    if (!isFinite(sourceResolution) || sourceResolution <= 0) {
      // invalid sourceResolution -> EMPTY
      // probably edges of the projections when no extent is defined
      this.state = TileState.EMPTY;
      return;
    }

    var errorThresholdInPixels = opt_errorThreshold !== undefined ?
      opt_errorThreshold : ERROR_THRESHOLD;

    /**
     * @private
     * @type {!import("./Triangulation.js").default}
     */
    this.triangulation_ = new Triangulation(
      sourceProj, targetProj, limitedTargetExtent, maxSourceExtent,
      sourceResolution * errorThresholdInPixels);

    if (this.triangulation_.getTriangles().length === 0) {
      // no valid triangles -> EMPTY
      this.state = TileState.EMPTY;
      return;
    }

    this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);
    var sourceExtent = this.triangulation_.calculateSourceExtent();

    if (maxSourceExtent) {
      if (sourceProj.canWrapX()) {
        sourceExtent[1] = clamp(
          sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
        sourceExtent[3] = clamp(
          sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
      } else {
        sourceExtent = getIntersection(sourceExtent, maxSourceExtent);
      }
    }

    if (!getArea(sourceExtent)) {
      this.state = TileState.EMPTY;
    } else {
      var sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(
        sourceExtent, this.sourceZ_);

      for (var srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
        for (var srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
          var tile = getTileFunction(this.sourceZ_, srcX, srcY, pixelRatio);
          if (tile) {
            this.sourceTiles_.push(tile);
          }
        }
      }

      if (this.sourceTiles_.length === 0) {
        this.state = TileState.EMPTY;
      }
    }
  }

  if ( Tile ) ReprojTile.__proto__ = Tile;
  ReprojTile.prototype = Object.create( Tile && Tile.prototype );
  ReprojTile.prototype.constructor = ReprojTile;

  /**
   * @inheritDoc
   */
  ReprojTile.prototype.disposeInternal = function disposeInternal () {
    if (this.state == TileState.LOADING) {
      this.unlistenSources_();
    }
    Tile.prototype.disposeInternal.call(this);
  };

  /**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */
  ReprojTile.prototype.getImage = function getImage () {
    return this.canvas_;
  };

  /**
   * @private
   */
  ReprojTile.prototype.reproject_ = function reproject_ () {
    var sources = [];
    this.sourceTiles_.forEach(function(tile, i, arr) {
      if (tile && tile.getState() == TileState.LOADED) {
        sources.push({
          extent: this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord),
          image: tile.getImage()
        });
      }
    }.bind(this));
    this.sourceTiles_.length = 0;

    if (sources.length === 0) {
      this.state = TileState.ERROR;
    } else {
      var z = this.wrappedTileCoord_[0];
      var size = this.targetTileGrid_.getTileSize(z);
      var width = typeof size === 'number' ? size : size[0];
      var height = typeof size === 'number' ? size : size[1];
      var targetResolution = this.targetTileGrid_.getResolution(z);
      var sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);

      var targetExtent = this.targetTileGrid_.getTileCoordExtent(
        this.wrappedTileCoord_);
      this.canvas_ = renderReprojected(width, height, this.pixelRatio_,
        sourceResolution, this.sourceTileGrid_.getExtent(),
        targetResolution, targetExtent, this.triangulation_, sources,
        this.gutter_, this.renderEdges_);

      this.state = TileState.LOADED;
    }
    this.changed();
  };

  /**
   * @inheritDoc
   */
  ReprojTile.prototype.load = function load () {
    if (this.state == TileState.IDLE) {
      this.state = TileState.LOADING;
      this.changed();

      var leftToLoad = 0;

      this.sourcesListenerKeys_ = [];
      this.sourceTiles_.forEach(function(tile, i, arr) {
        var state = tile.getState();
        if (state == TileState.IDLE || state == TileState.LOADING) {
          leftToLoad++;

          var sourceListenKey = listen(tile, EventType.CHANGE,
            function(e) {
              var state = tile.getState();
              if (state == TileState.LOADED ||
                    state == TileState.ERROR ||
                    state == TileState.EMPTY) {
                unlistenByKey(sourceListenKey);
                leftToLoad--;
                if (leftToLoad === 0) {
                  this.unlistenSources_();
                  this.reproject_();
                }
              }
            }, this);
          this.sourcesListenerKeys_.push(sourceListenKey);
        }
      }.bind(this));

      this.sourceTiles_.forEach(function(tile, i, arr) {
        var state = tile.getState();
        if (state == TileState.IDLE) {
          tile.load();
        }
      });

      if (leftToLoad === 0) {
        setTimeout(this.reproject_.bind(this), 0);
      }
    }
  };

  /**
   * @private
   */
  ReprojTile.prototype.unlistenSources_ = function unlistenSources_ () {
    this.sourcesListenerKeys_.forEach(unlistenByKey);
    this.sourcesListenerKeys_ = null;
  };

  return ReprojTile;
}(Tile));


export default ReprojTile;

//# sourceMappingURL=Tile.js.map