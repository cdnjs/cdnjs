/**
 * @module ol/renderer/canvas/VectorTileLayer
 */
import {getUid} from '../../util.js';
import LayerType from '../../LayerType.js';
import TileState from '../../TileState.js';
import ViewHint from '../../ViewHint.js';
import {createCanvasContext2D} from '../../dom.js';
import {listen, unlisten} from '../../events.js';
import EventType from '../../events/EventType.js';
import rbush from 'rbush';
import {buffer, containsCoordinate, equals, getIntersection, getTopLeft, intersects} from '../../extent.js';
import VectorTileRenderType from '../../layer/VectorTileRenderType.js';
import {equivalent as equivalentProjection} from '../../proj.js';
import Units from '../../proj/Units.js';
import ReplayType from '../../render/ReplayType.js';
import {labelCache, rotateAtOffset} from '../../render/canvas.js';
import CanvasReplayGroup, {replayDeclutter} from '../../render/canvas/ReplayGroup.js';
import {ORDER} from '../../render/replay.js';
import CanvasTileLayerRenderer from './TileLayer.js';
import {getSquaredTolerance as getSquaredRenderTolerance, renderFeature} from '../vector.js';
import {
  create as createTransform,
  compose as composeTransform,
  reset as resetTransform,
  scale as scaleTransform,
  translate as translateTransform
} from '../../transform.js';


/**
 * @type {!Object<string, Array<import("../../render/ReplayType.js").default>>}
 */
var IMAGE_REPLAYS = {
  'image': [ReplayType.POLYGON, ReplayType.CIRCLE,
    ReplayType.LINE_STRING, ReplayType.IMAGE, ReplayType.TEXT],
  'hybrid': [ReplayType.POLYGON, ReplayType.LINE_STRING]
};


/**
 * @type {!Object<string, Array<import("../../render/ReplayType.js").default>>}
 */
var VECTOR_REPLAYS = {
  'image': [ReplayType.DEFAULT],
  'hybrid': [ReplayType.IMAGE, ReplayType.TEXT, ReplayType.DEFAULT],
  'vector': ORDER
};


/**
 * @classdesc
 * Canvas renderer for vector tile layers.
 * @api
 */
var CanvasVectorTileLayerRenderer = /*@__PURE__*/(function (CanvasTileLayerRenderer) {
  function CanvasVectorTileLayerRenderer(layer) {

    CanvasTileLayerRenderer.call(this, layer, true);

    /**
     * Declutter tree.
     * @private
     */
    this.declutterTree_ = layer.getDeclutter() ? rbush(9, undefined) : null;

    /**
     * @private
     * @type {boolean}
     */
    this.dirty_ = false;

    /**
     * @private
     * @type {number}
     */
    this.renderedLayerRevision_;

    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    this.tmpTransform_ = createTransform();

    var renderMode = layer.getRenderMode();

    // Use lower resolution for pure vector rendering. Closest resolution otherwise.
    this.zDirection = renderMode === VectorTileRenderType.VECTOR ? 1 : 0;

    if (renderMode !== VectorTileRenderType.VECTOR) {
      this.context = createCanvasContext2D();
    }


    listen(labelCache, EventType.CLEAR, this.handleFontsChanged_, this);

  }

  if ( CanvasTileLayerRenderer ) CanvasVectorTileLayerRenderer.__proto__ = CanvasTileLayerRenderer;
  CanvasVectorTileLayerRenderer.prototype = Object.create( CanvasTileLayerRenderer && CanvasTileLayerRenderer.prototype );
  CanvasVectorTileLayerRenderer.prototype.constructor = CanvasVectorTileLayerRenderer;

  /**
   * @inheritDoc
   */
  CanvasVectorTileLayerRenderer.prototype.disposeInternal = function disposeInternal () {
    unlisten(labelCache, EventType.CLEAR, this.handleFontsChanged_, this);
    CanvasTileLayerRenderer.prototype.disposeInternal.call(this);
  };

  /**
   * @inheritDoc
   */
  CanvasVectorTileLayerRenderer.prototype.getTile = function getTile (z, x, y, pixelRatio, projection) {
    var tile = CanvasTileLayerRenderer.prototype.getTile.call(this, z, x, y, pixelRatio, projection);
    if (tile.getState() === TileState.LOADED) {
      this.createReplayGroup_(/** @type {import("../../VectorImageTile.js").default} */ (tile), pixelRatio, projection);
      if (this.context) {
        this.renderTileImage_(/** @type {import("../../VectorImageTile.js").default} */ (tile), pixelRatio, projection);
      }
    }
    return tile;
  };

  /**
   * @inheritDoc
   */
  CanvasVectorTileLayerRenderer.prototype.getTileImage = function getTileImage (tile) {
    var tileLayer = /** @type {import("../../layer/Tile.js").default} */ (this.getLayer());
    return /** @type {import("../../VectorImageTile.js").default} */ (tile).getImage(tileLayer);
  };

  /**
   * @inheritDoc
   */
  CanvasVectorTileLayerRenderer.prototype.prepareFrame = function prepareFrame (frameState, layerState) {
    var layer = /** @type {import("../../layer/Vector.js").default} */ (this.getLayer());
    var layerRevision = layer.getRevision();
    if (this.renderedLayerRevision_ != layerRevision) {
      this.renderedTiles.length = 0;
    }
    this.renderedLayerRevision_ = layerRevision;
    return CanvasTileLayerRenderer.prototype.prepareFrame.call(this, frameState, layerState);
  };

  /**
   * @param {import("../../VectorImageTile.js").default} tile Tile.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../proj/Projection.js").default} projection Projection.
   * @private
   */
  CanvasVectorTileLayerRenderer.prototype.createReplayGroup_ = function createReplayGroup_ (tile, pixelRatio, projection) {
    var this$1 = this;

    var layer = /** @type {import("../../layer/Vector.js").default} */ (this.getLayer());
    var revision = layer.getRevision();
    var renderOrder = /** @type {import("../../render.js").OrderFunction} */ (layer.getRenderOrder()) || null;

    var replayState = tile.getReplayState(layer);
    if (!replayState.dirty && replayState.renderedRevision == revision &&
        replayState.renderedRenderOrder == renderOrder) {
      return;
    }

    var source = /** @type {import("../../source/VectorTile.js").default} */ (layer.getSource());
    var sourceTileGrid = source.getTileGrid();
    var tileGrid = source.getTileGridForProjection(projection);
    var resolution = tileGrid.getResolution(tile.tileCoord[0]);
    var tileExtent = tile.extent;

    var loop = function ( t, tt ) {
      var sourceTile = tile.getTile(tile.tileKeys[t]);
      if (sourceTile.getState() != TileState.LOADED) {
        return;
      }

      var sourceTileCoord = sourceTile.tileCoord;
      var sourceTileExtent = sourceTileGrid.getTileCoordExtent(sourceTileCoord);
      var sharedExtent = getIntersection(tileExtent, sourceTileExtent);
      var bufferedExtent = equals(sourceTileExtent, sharedExtent) ? null :
        buffer(sharedExtent, layer.getRenderBuffer() * resolution, this$1.tmpExtent);
      var tileProjection = sourceTile.getProjection();
      var reproject = false;
      if (!equivalentProjection(projection, tileProjection)) {
        reproject = true;
        sourceTile.setProjection(projection);
      }
      replayState.dirty = false;
      var replayGroup = new CanvasReplayGroup(0, sharedExtent, resolution,
        pixelRatio, source.getOverlaps(), this$1.declutterTree_, layer.getRenderBuffer());
      var squaredTolerance = getSquaredRenderTolerance(resolution, pixelRatio);

      /**
       * @param {import("../../Feature.js").FeatureLike} feature Feature.
       * @this {CanvasVectorTileLayerRenderer}
       */
      var render = function(feature) {
        var styles;
        var styleFunction = feature.getStyleFunction() || layer.getStyleFunction();
        if (styleFunction) {
          styles = styleFunction(feature, resolution);
        }
        if (styles) {
          var dirty = this.renderFeature(feature, squaredTolerance, styles, replayGroup);
          this.dirty_ = this.dirty_ || dirty;
          replayState.dirty = replayState.dirty || dirty;
        }
      };

      var features = sourceTile.getFeatures();
      if (renderOrder && renderOrder !== replayState.renderedRenderOrder) {
        features.sort(renderOrder);
      }
      for (var i = 0, ii = features.length; i < ii; ++i) {
        var feature = features[i];
        if (reproject) {
          if (tileProjection.getUnits() == Units.TILE_PIXELS) {
            // projected tile extent
            tileProjection.setWorldExtent(sourceTileExtent);
            // tile extent in tile pixel space
            tileProjection.setExtent(sourceTile.getExtent());
          }
          feature.getGeometry().transform(tileProjection, projection);
        }
        if (!bufferedExtent || intersects(bufferedExtent, feature.getGeometry().getExtent())) {
          render.call(this$1, feature);
        }
      }
      replayGroup.finish();
      sourceTile.setReplayGroup(layer, tile.tileCoord.toString(), replayGroup);
    };

    for (var t = 0, tt = tile.tileKeys.length; t < tt; ++t) loop( t, tt );
    replayState.renderedRevision = revision;
    replayState.renderedRenderOrder = renderOrder;
  };

  /**
   * @inheritDoc
   */
  CanvasVectorTileLayerRenderer.prototype.forEachFeatureAtCoordinate = function forEachFeatureAtCoordinate (coordinate, frameState, hitTolerance, callback, thisArg) {
    var resolution = frameState.viewState.resolution;
    var rotation = frameState.viewState.rotation;
    hitTolerance = hitTolerance == undefined ? 0 : hitTolerance;
    var layer = this.getLayer();
    /** @type {!Object<string, boolean>} */
    var features = {};

    var renderedTiles = /** @type {Array<import("../../VectorImageTile.js").default>} */ (this.renderedTiles);

    var bufferedExtent, found;
    var i, ii;
    for (i = 0, ii = renderedTiles.length; i < ii; ++i) {
      var tile = renderedTiles[i];
      bufferedExtent = buffer(tile.extent, hitTolerance * resolution, bufferedExtent);
      if (!containsCoordinate(bufferedExtent, coordinate)) {
        continue;
      }
      for (var t = 0, tt = tile.tileKeys.length; t < tt; ++t) {
        var sourceTile = tile.getTile(tile.tileKeys[t]);
        if (sourceTile.getState() != TileState.LOADED) {
          continue;
        }
        var replayGroup = /** @type {CanvasReplayGroup} */ (sourceTile.getReplayGroup(layer,
          tile.tileCoord.toString()));
        found = found || replayGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, {},
          /**
           * @param {import("../../Feature.js").FeatureLike} feature Feature.
           * @return {?} Callback result.
           */
          function(feature) {
            var key = getUid(feature);
            if (!(key in features)) {
              features[key] = true;
              return callback.call(thisArg, feature, layer);
            }
          }, null);
      }
    }
    return found;
  };

  /**
   * @param {import("../../VectorTile.js").default} tile Tile.
   * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
   * @return {import("../../transform.js").Transform} transform Transform.
   * @private
   */
  CanvasVectorTileLayerRenderer.prototype.getReplayTransform_ = function getReplayTransform_ (tile, frameState) {
    var layer = this.getLayer();
    var source = /** @type {import("../../source/VectorTile.js").default} */ (layer.getSource());
    var tileGrid = source.getTileGrid();
    var tileCoord = tile.tileCoord;
    var tileResolution = tileGrid.getResolution(tileCoord[0]);
    var viewState = frameState.viewState;
    var pixelRatio = frameState.pixelRatio;
    var renderResolution = viewState.resolution / pixelRatio;
    var tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent);
    var center = viewState.center;
    var origin = getTopLeft(tileExtent);
    var size = frameState.size;
    var offsetX = Math.round(pixelRatio * size[0] / 2);
    var offsetY = Math.round(pixelRatio * size[1] / 2);
    return composeTransform(this.tmpTransform_,
      offsetX, offsetY,
      tileResolution / renderResolution, tileResolution / renderResolution,
      viewState.rotation,
      (origin[0] - center[0]) / tileResolution,
      (center[1] - origin[1]) / tileResolution);
  };

  /**
   * @param {import("../../events/Event.js").default} event Event.
   */
  CanvasVectorTileLayerRenderer.prototype.handleFontsChanged_ = function handleFontsChanged_ (event) {
    var layer = this.getLayer();
    if (layer.getVisible() && this.renderedLayerRevision_ !== undefined) {
      layer.changed();
    }
  };

  /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */
  CanvasVectorTileLayerRenderer.prototype.handleStyleImageChange_ = function handleStyleImageChange_ (event) {
    this.renderIfReadyAndVisible();
  };

  /**
   * @inheritDoc
   */
  CanvasVectorTileLayerRenderer.prototype.postCompose = function postCompose (context, frameState, layerState) {
    var layer = /** @type {import("../../layer/Vector.js").default} */ (this.getLayer());
    var renderMode = layer.getRenderMode();
    if (renderMode != VectorTileRenderType.IMAGE) {
      var declutterReplays = layer.getDeclutter() ? {} : null;
      var source = /** @type {import("../../source/VectorTile.js").default} */ (layer.getSource());
      var replayTypes = VECTOR_REPLAYS[renderMode];
      var pixelRatio = frameState.pixelRatio;
      var rotation = frameState.viewState.rotation;
      var size = frameState.size;
      var offsetX, offsetY;
      if (rotation) {
        offsetX = Math.round(pixelRatio * size[0] / 2);
        offsetY = Math.round(pixelRatio * size[1] / 2);
        rotateAtOffset(context, -rotation, offsetX, offsetY);
      }
      if (declutterReplays) {
        this.declutterTree_.clear();
      }
      var viewHints = frameState.viewHints;
      var snapToPixel = !(viewHints[ViewHint.ANIMATING] || viewHints[ViewHint.INTERACTING]);
      var tiles = this.renderedTiles;
      var tileGrid = source.getTileGridForProjection(frameState.viewState.projection);
      var clips = [];
      var zs = [];
      for (var i = tiles.length - 1; i >= 0; --i) {
        var tile = /** @type {import("../../VectorImageTile.js").default} */ (tiles[i]);
        if (tile.getState() == TileState.ABORT) {
          continue;
        }
        var tileCoord = tile.tileCoord;
        var worldOffset = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent)[0] - tile.extent[0];
        var transform = undefined;
        for (var t = 0, tt = tile.tileKeys.length; t < tt; ++t) {
          var sourceTile = tile.getTile(tile.tileKeys[t]);
          if (sourceTile.getState() != TileState.LOADED) {
            continue;
          }
          var replayGroup = /** @type {CanvasReplayGroup} */ (sourceTile.getReplayGroup(layer, tileCoord.toString()));
          if (!replayGroup || !replayGroup.hasReplays(replayTypes)) {
            // sourceTile was not yet loaded when this.createReplayGroup_() was
            // called, or it has no replays of the types we want to render
            continue;
          }
          if (!transform) {
            transform = this.getTransform(frameState, worldOffset);
          }
          var currentZ = sourceTile.tileCoord[0];
          var currentClip = replayGroup.getClipCoords(transform);
          context.save();
          context.globalAlpha = layerState.opacity;
          // Create a clip mask for regions in this low resolution tile that are
          // already filled by a higher resolution tile
          for (var j = 0, jj = clips.length; j < jj; ++j) {
            var clip = clips[j];
            if (currentZ < zs[j]) {
              context.beginPath();
              // counter-clockwise (outer ring) for current tile
              context.moveTo(currentClip[0], currentClip[1]);
              context.lineTo(currentClip[2], currentClip[3]);
              context.lineTo(currentClip[4], currentClip[5]);
              context.lineTo(currentClip[6], currentClip[7]);
              // clockwise (inner ring) for higher resolution tile
              context.moveTo(clip[6], clip[7]);
              context.lineTo(clip[4], clip[5]);
              context.lineTo(clip[2], clip[3]);
              context.lineTo(clip[0], clip[1]);
              context.clip();
            }
          }
          replayGroup.replay(context, transform, rotation, {}, snapToPixel, replayTypes, declutterReplays);
          context.restore();
          clips.push(currentClip);
          zs.push(currentZ);
        }
      }
      if (declutterReplays) {
        replayDeclutter(declutterReplays, context, rotation, snapToPixel);
      }
      if (rotation) {
        rotateAtOffset(context, rotation,
          /** @type {number} */ (offsetX), /** @type {number} */ (offsetY));
      }
    }
    CanvasTileLayerRenderer.prototype.postCompose.call(this, context, frameState, layerState);
  };

  /**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/ReplayGroup.js").default} replayGroup Replay group.
   * @return {boolean} `true` if an image is loading.
   */
  CanvasVectorTileLayerRenderer.prototype.renderFeature = function renderFeature$1 (feature, squaredTolerance, styles, replayGroup) {
    if (!styles) {
      return false;
    }
    var loading = false;
    if (Array.isArray(styles)) {
      for (var i = 0, ii = styles.length; i < ii; ++i) {
        loading = renderFeature(
          replayGroup, feature, styles[i], squaredTolerance,
          this.handleStyleImageChange_, this) || loading;
      }
    } else {
      loading = renderFeature(
        replayGroup, feature, styles, squaredTolerance,
        this.handleStyleImageChange_, this);
    }
    return loading;
  };

  /**
   * @param {import("../../VectorImageTile.js").default} tile Tile.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../proj/Projection.js").default} projection Projection.
   * @private
   */
  CanvasVectorTileLayerRenderer.prototype.renderTileImage_ = function renderTileImage_ (tile, pixelRatio, projection) {
    var layer = /** @type {import("../../layer/Vector.js").default} */ (this.getLayer());
    var replayState = tile.getReplayState(layer);
    var revision = layer.getRevision();
    var replays = IMAGE_REPLAYS[layer.getRenderMode()];
    if (replays && replayState.renderedTileRevision !== revision) {
      replayState.renderedTileRevision = revision;
      var tileCoord = tile.wrappedTileCoord;
      var z = tileCoord[0];
      var source = /** @type {import("../../source/VectorTile.js").default} */ (layer.getSource());
      var tileGrid = source.getTileGridForProjection(projection);
      var resolution = tileGrid.getResolution(z);
      var context = tile.getContext(layer);
      var size = source.getTilePixelSize(z, pixelRatio, projection);
      context.canvas.width = size[0];
      context.canvas.height = size[1];
      var tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent);
      for (var i = 0, ii = tile.tileKeys.length; i < ii; ++i) {
        var sourceTile = tile.getTile(tile.tileKeys[i]);
        if (sourceTile.getState() != TileState.LOADED) {
          continue;
        }
        var pixelScale = pixelRatio / resolution;
        var transform = resetTransform(this.tmpTransform_);
        scaleTransform(transform, pixelScale, -pixelScale);
        translateTransform(transform, -tileExtent[0], -tileExtent[3]);
        var replayGroup = /** @type {CanvasReplayGroup} */ (sourceTile.getReplayGroup(layer,
          tile.tileCoord.toString()));
        replayGroup.replay(context, transform, 0, {}, true, replays);
      }
    }
  };

  return CanvasVectorTileLayerRenderer;
}(CanvasTileLayerRenderer));


/**
 * Determine if this renderer handles the provided layer.
 * @param {import("../../layer/Layer.js").default} layer The candidate layer.
 * @return {boolean} The renderer can render the layer.
 */
CanvasVectorTileLayerRenderer['handles'] = function(layer) {
  return layer.getType() === LayerType.VECTOR_TILE;
};


/**
 * Create a layer renderer.
 * @param {import("../Map.js").default} mapRenderer The map renderer.
 * @param {import("../../layer/Layer.js").default} layer The layer to be rendererd.
 * @return {CanvasVectorTileLayerRenderer} The layer renderer.
 */
CanvasVectorTileLayerRenderer['create'] = function(mapRenderer, layer) {
  return new CanvasVectorTileLayerRenderer(/** @type {import("../../layer/VectorTile.js").default} */ (layer));
};


export default CanvasVectorTileLayerRenderer;

//# sourceMappingURL=VectorTileLayer.js.map