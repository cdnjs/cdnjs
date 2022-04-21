/**
 * @module ol/render/canvas/ReplayGroup
 */

import {numberSafeCompareFunction} from '../../array.js';
import {createCanvasContext2D} from '../../dom.js';
import {buffer, createEmpty, extendCoordinate} from '../../extent.js';
import {transform2D} from '../../geom/flat/transform.js';
import {isEmpty} from '../../obj.js';
import ReplayGroup from '../ReplayGroup.js';
import ReplayType from '../ReplayType.js';
import CanvasReplay from './Replay.js';
import CanvasImageReplay from './ImageReplay.js';
import CanvasLineStringReplay from './LineStringReplay.js';
import CanvasPolygonReplay from './PolygonReplay.js';
import CanvasTextReplay from './TextReplay.js';
import {ORDER} from '../replay.js';
import {create as createTransform, compose as composeTransform} from '../../transform.js';


/**
 * @type {Object<ReplayType, typeof CanvasReplay>}
 */
var BATCH_CONSTRUCTORS = {
  'Circle': CanvasPolygonReplay,
  'Default': CanvasReplay,
  'Image': CanvasImageReplay,
  'LineString': CanvasLineStringReplay,
  'Polygon': CanvasPolygonReplay,
  'Text': CanvasTextReplay
};


var CanvasReplayGroup = /*@__PURE__*/(function (ReplayGroup) {
  function CanvasReplayGroup(
    tolerance,
    maxExtent,
    resolution,
    pixelRatio,
    overlaps,
    declutterTree,
    opt_renderBuffer
  ) {
    ReplayGroup.call(this);

    /**
     * Declutter tree.
     * @private
     */
    this.declutterTree_ = declutterTree;

    /**
     * @type {import("../canvas.js").DeclutterGroup}
     * @private
     */
    this.declutterGroup_ = null;

    /**
     * @private
     * @type {number}
     */
    this.tolerance_ = tolerance;

    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    this.maxExtent_ = maxExtent;

    /**
     * @private
     * @type {boolean}
     */
    this.overlaps_ = overlaps;

    /**
     * @private
     * @type {number}
     */
    this.pixelRatio_ = pixelRatio;

    /**
     * @private
     * @type {number}
     */
    this.resolution_ = resolution;

    /**
     * @private
     * @type {number|undefined}
     */
    this.renderBuffer_ = opt_renderBuffer;

    /**
     * @private
     * @type {!Object<string, !Object<ReplayType, CanvasReplay>>}
     */
    this.replaysByZIndex_ = {};

    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    this.hitDetectionContext_ = createCanvasContext2D(1, 1);

    /**
     * @private
     * @type {import("../../transform.js").Transform}
     */
    this.hitDetectionTransform_ = createTransform();
  }

  if ( ReplayGroup ) CanvasReplayGroup.__proto__ = ReplayGroup;
  CanvasReplayGroup.prototype = Object.create( ReplayGroup && ReplayGroup.prototype );
  CanvasReplayGroup.prototype.constructor = CanvasReplayGroup;

  /**
   * @inheritDoc
   */
  CanvasReplayGroup.prototype.addDeclutter = function addDeclutter (group) {
    var declutter = null;
    if (this.declutterTree_) {
      if (group) {
        declutter = this.declutterGroup_;
        /** @type {number} */ (declutter[4])++;
      } else {
        declutter = this.declutterGroup_ = createEmpty();
        declutter.push(1);
      }
    }
    return declutter;
  };

  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  CanvasReplayGroup.prototype.clip = function clip (context, transform) {
    var flatClipCoords = this.getClipCoords(transform);
    context.beginPath();
    context.moveTo(flatClipCoords[0], flatClipCoords[1]);
    context.lineTo(flatClipCoords[2], flatClipCoords[3]);
    context.lineTo(flatClipCoords[4], flatClipCoords[5]);
    context.lineTo(flatClipCoords[6], flatClipCoords[7]);
    context.clip();
  };

  /**
   * @param {Array<ReplayType>} replays Replays.
   * @return {boolean} Has replays of the provided types.
   */
  CanvasReplayGroup.prototype.hasReplays = function hasReplays (replays) {
    for (var zIndex in this.replaysByZIndex_) {
      var candidates = this.replaysByZIndex_[zIndex];
      for (var i = 0, ii = replays.length; i < ii; ++i) {
        if (replays[i] in candidates) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * FIXME empty description for jsdoc
   */
  CanvasReplayGroup.prototype.finish = function finish () {
    for (var zKey in this.replaysByZIndex_) {
      var replays = this.replaysByZIndex_[zKey];
      for (var replayKey in replays) {
        replays[replayKey].finish();
      }
    }
  };

  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @param {function((import("../../Feature.js").default|import("../Feature.js").default)): T} callback Feature callback.
   * @param {Object<string, import("../canvas.js").DeclutterGroup>} declutterReplays Declutter replays.
   * @return {T|undefined} Callback result.
   * @template T
   */
  CanvasReplayGroup.prototype.forEachFeatureAtCoordinate = function forEachFeatureAtCoordinate (
    coordinate,
    resolution,
    rotation,
    hitTolerance,
    skippedFeaturesHash,
    callback,
    declutterReplays
  ) {

    hitTolerance = Math.round(hitTolerance);
    var contextSize = hitTolerance * 2 + 1;
    var transform = composeTransform(this.hitDetectionTransform_,
      hitTolerance + 0.5, hitTolerance + 0.5,
      1 / resolution, -1 / resolution,
      -rotation,
      -coordinate[0], -coordinate[1]);
    var context = this.hitDetectionContext_;

    if (context.canvas.width !== contextSize || context.canvas.height !== contextSize) {
      context.canvas.width = contextSize;
      context.canvas.height = contextSize;
    } else {
      context.clearRect(0, 0, contextSize, contextSize);
    }

    /**
     * @type {import("../../extent.js").Extent}
     */
    var hitExtent;
    if (this.renderBuffer_ !== undefined) {
      hitExtent = createEmpty();
      extendCoordinate(hitExtent, coordinate);
      buffer(hitExtent, resolution * (this.renderBuffer_ + hitTolerance), hitExtent);
    }

    var mask = getCircleArray(hitTolerance);
    var declutteredFeatures;
    if (this.declutterTree_) {
      declutteredFeatures = this.declutterTree_.all().map(function(entry) {
        return entry.value;
      });
    }

    var replayType;

    /**
     * @param {import("../../Feature.js").default|import("../Feature.js").default} feature Feature.
     * @return {?} Callback result.
     */
    function featureCallback(feature) {
      var imageData = context.getImageData(0, 0, contextSize, contextSize).data;
      for (var i = 0; i < contextSize; i++) {
        for (var j = 0; j < contextSize; j++) {
          if (mask[i][j]) {
            if (imageData[(j * contextSize + i) * 4 + 3] > 0) {
              var result = (void 0);
              if (!(declutteredFeatures && (replayType == ReplayType.IMAGE || replayType == ReplayType.TEXT)) ||
                  declutteredFeatures.indexOf(feature) !== -1) {
                result = callback(feature);
              }
              if (result) {
                return result;
              } else {
                context.clearRect(0, 0, contextSize, contextSize);
                return undefined;
              }
            }
          }
        }
      }
    }

    /** @type {Array<number>} */
    var zs = Object.keys(this.replaysByZIndex_).map(Number);
    zs.sort(numberSafeCompareFunction);

    var i, j, replays, replay, result;
    for (i = zs.length - 1; i >= 0; --i) {
      var zIndexKey = zs[i].toString();
      replays = this.replaysByZIndex_[zIndexKey];
      for (j = ORDER.length - 1; j >= 0; --j) {
        replayType = ORDER[j];
        replay = replays[replayType];
        if (replay !== undefined) {
          if (declutterReplays &&
              (replayType == ReplayType.IMAGE || replayType == ReplayType.TEXT)) {
            var declutter = declutterReplays[zIndexKey];
            if (!declutter) {
              declutterReplays[zIndexKey] = [replay, transform.slice(0)];
            } else {
              declutter.push(replay, transform.slice(0));
            }
          } else {
            result = replay.replayHitDetection(context, transform, rotation,
              skippedFeaturesHash, featureCallback, hitExtent);
            if (result) {
              return result;
            }
          }
        }
      }
    }
    return undefined;
  };

  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   * @return {Array<number>} Clip coordinates.
   */
  CanvasReplayGroup.prototype.getClipCoords = function getClipCoords (transform) {
    var maxExtent = this.maxExtent_;
    var minX = maxExtent[0];
    var minY = maxExtent[1];
    var maxX = maxExtent[2];
    var maxY = maxExtent[3];
    var flatClipCoords = [minX, minY, minX, maxY, maxX, maxY, maxX, minY];
    transform2D(
      flatClipCoords, 0, 8, 2, transform, flatClipCoords);
    return flatClipCoords;
  };

  /**
   * @inheritDoc
   */
  CanvasReplayGroup.prototype.getReplay = function getReplay (zIndex, replayType) {
    var zIndexKey = zIndex !== undefined ? zIndex.toString() : '0';
    var replays = this.replaysByZIndex_[zIndexKey];
    if (replays === undefined) {
      replays = {};
      this.replaysByZIndex_[zIndexKey] = replays;
    }
    var replay = replays[replayType];
    if (replay === undefined) {
      var Constructor = BATCH_CONSTRUCTORS[replayType];
      replay = new Constructor(this.tolerance_, this.maxExtent_,
        this.resolution_, this.pixelRatio_, this.overlaps_, this.declutterTree_);
      replays[replayType] = replay;
    }
    return replay;
  };

  /**
   * @return {Object<string, Object<ReplayType, CanvasReplay>>} Replays.
   */
  CanvasReplayGroup.prototype.getReplays = function getReplays () {
    return this.replaysByZIndex_;
  };

  /**
   * @inheritDoc
   */
  CanvasReplayGroup.prototype.isEmpty = function isEmpty$1 () {
    return isEmpty(this.replaysByZIndex_);
  };

  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
   * @param {Array<ReplayType>=} opt_replayTypes Ordered replay types to replay.
   *     Default is {@link module:ol/render/replay~ORDER}
   * @param {Object<string, import("../canvas.js").DeclutterGroup>=} opt_declutterReplays Declutter replays.
   */
  CanvasReplayGroup.prototype.replay = function replay (
    context,
    transform,
    viewRotation,
    skippedFeaturesHash,
    snapToPixel,
    opt_replayTypes,
    opt_declutterReplays
  ) {

    /** @type {Array<number>} */
    var zs = Object.keys(this.replaysByZIndex_).map(Number);
    zs.sort(numberSafeCompareFunction);

    // setup clipping so that the parts of over-simplified geometries are not
    // visible outside the current extent when panning
    context.save();
    this.clip(context, transform);

    var replayTypes = opt_replayTypes ? opt_replayTypes : ORDER;
    var i, ii, j, jj, replays, replay;
    for (i = 0, ii = zs.length; i < ii; ++i) {
      var zIndexKey = zs[i].toString();
      replays = this.replaysByZIndex_[zIndexKey];
      for (j = 0, jj = replayTypes.length; j < jj; ++j) {
        var replayType = replayTypes[j];
        replay = replays[replayType];
        if (replay !== undefined) {
          if (opt_declutterReplays &&
              (replayType == ReplayType.IMAGE || replayType == ReplayType.TEXT)) {
            var declutter = opt_declutterReplays[zIndexKey];
            if (!declutter) {
              opt_declutterReplays[zIndexKey] = [replay, transform.slice(0)];
            } else {
              declutter.push(replay, transform.slice(0));
            }
          } else {
            replay.replay(context, transform, viewRotation, skippedFeaturesHash, snapToPixel);
          }
        }
      }
    }

    context.restore();
  };

  return CanvasReplayGroup;
}(ReplayGroup));


/**
 * This cache is used for storing calculated pixel circles for increasing performance.
 * It is a static property to allow each Replaygroup to access it.
 * @type {Object<number, Array<Array<(boolean|undefined)>>>}
 */
var circleArrayCache = {
  0: [[true]]
};


/**
 * This method fills a row in the array from the given coordinate to the
 * middle with `true`.
 * @param {Array<Array<(boolean|undefined)>>} array The array that will be altered.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 */
function fillCircleArrayRowToMiddle(array, x, y) {
  var i;
  var radius = Math.floor(array.length / 2);
  if (x >= radius) {
    for (i = radius; i < x; i++) {
      array[i][y] = true;
    }
  } else if (x < radius) {
    for (i = x + 1; i < radius; i++) {
      array[i][y] = true;
    }
  }
}


/**
 * This methods creates a circle inside a fitting array. Points inside the
 * circle are marked by true, points on the outside are undefined.
 * It uses the midpoint circle algorithm.
 * A cache is used to increase performance.
 * @param {number} radius Radius.
 * @returns {Array<Array<(boolean|undefined)>>} An array with marked circle points.
 */
export function getCircleArray(radius) {
  if (circleArrayCache[radius] !== undefined) {
    return circleArrayCache[radius];
  }

  var arraySize = radius * 2 + 1;
  var arr = new Array(arraySize);
  for (var i = 0; i < arraySize; i++) {
    arr[i] = new Array(arraySize);
  }

  var x = radius;
  var y = 0;
  var error = 0;

  while (x >= y) {
    fillCircleArrayRowToMiddle(arr, radius + x, radius + y);
    fillCircleArrayRowToMiddle(arr, radius + y, radius + x);
    fillCircleArrayRowToMiddle(arr, radius - y, radius + x);
    fillCircleArrayRowToMiddle(arr, radius - x, radius + y);
    fillCircleArrayRowToMiddle(arr, radius - x, radius - y);
    fillCircleArrayRowToMiddle(arr, radius - y, radius - x);
    fillCircleArrayRowToMiddle(arr, radius + y, radius - x);
    fillCircleArrayRowToMiddle(arr, radius + x, radius - y);

    y++;
    error += 1 + 2 * y;
    if (2 * (error - x) + 1 > 0) {
      x -= 1;
      error += 1 - 2 * x;
    }
  }

  circleArrayCache[radius] = arr;
  return arr;
}


/**
 * @param {!Object<string, Array<*>>} declutterReplays Declutter replays.
 * @param {CanvasRenderingContext2D} context Context.
 * @param {number} rotation Rotation.
 * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
 */
export function replayDeclutter(declutterReplays, context, rotation, snapToPixel) {
  var zs = Object.keys(declutterReplays).map(Number).sort(numberSafeCompareFunction);
  var skippedFeatureUids = {};
  for (var z = 0, zz = zs.length; z < zz; ++z) {
    var replayData = declutterReplays[zs[z].toString()];
    for (var i = 0, ii = replayData.length; i < ii;) {
      var replay = replayData[i++];
      var transform = replayData[i++];
      replay.replay(context, transform, rotation, skippedFeatureUids, snapToPixel);
    }
  }
}


export default CanvasReplayGroup;

//# sourceMappingURL=ReplayGroup.js.map