/**
 * @module ol/render/webgl/ReplayGroup
 */

import {numberSafeCompareFunction} from '../../array.js';
import {buffer, createOrUpdateFromCoordinate} from '../../extent.js';
import {isEmpty} from '../../obj.js';
import {ORDER} from '../replay.js';
import ReplayGroup from '../ReplayGroup.js';
import WebGLCircleReplay from './CircleReplay.js';
import WebGLImageReplay from './ImageReplay.js';
import WebGLLineStringReplay from './LineStringReplay.js';
import WebGLPolygonReplay from './PolygonReplay.js';
import WebGLTextReplay from './TextReplay.js';

/**
 * @type {Array<number>}
 */
var HIT_DETECTION_SIZE = [1, 1];

/**
 * @type {Object<import("../ReplayType.js").default, typeof import("./Replay.js").default>}
 */
var BATCH_CONSTRUCTORS = {
  'Circle': WebGLCircleReplay,
  'Image': WebGLImageReplay,
  'LineString': WebGLLineStringReplay,
  'Polygon': WebGLPolygonReplay,
  'Text': WebGLTextReplay
};


var WebGLReplayGroup = /*@__PURE__*/(function (ReplayGroup) {
  function WebGLReplayGroup(tolerance, maxExtent, opt_renderBuffer) {
    ReplayGroup.call(this);

    /**
     * @type {import("../../extent.js").Extent}
     * @private
     */
    this.maxExtent_ = maxExtent;

    /**
     * @type {number}
     * @private
     */
    this.tolerance_ = tolerance;

    /**
     * @type {number|undefined}
     * @private
     */
    this.renderBuffer_ = opt_renderBuffer;

    /**
     * @private
     * @type {!Object<string,
     *        Object<import("../ReplayType.js").default, import("./Replay.js").default>>}
     */
    this.replaysByZIndex_ = {};

  }

  if ( ReplayGroup ) WebGLReplayGroup.__proto__ = ReplayGroup;
  WebGLReplayGroup.prototype = Object.create( ReplayGroup && ReplayGroup.prototype );
  WebGLReplayGroup.prototype.constructor = WebGLReplayGroup;

  /**
   * @inheritDoc
   */
  WebGLReplayGroup.prototype.addDeclutter = function addDeclutter (group) {
    return [];
  };

  /**
   * @param {import("../../webgl/Context.js").default} context WebGL context.
   * @return {function()} Delete resources function.
   */
  WebGLReplayGroup.prototype.getDeleteResourcesFunction = function getDeleteResourcesFunction (context) {
    var functions = [];
    var zKey;
    for (zKey in this.replaysByZIndex_) {
      var replays = this.replaysByZIndex_[zKey];
      for (var replayKey in replays) {
        functions.push(
          replays[replayKey].getDeleteResourcesFunction(context));
      }
    }
    return function() {
      var arguments$1 = arguments;

      var length = functions.length;
      var result;
      for (var i = 0; i < length; i++) {
        result = functions[i].apply(this, arguments$1);
      }
      return result;
    };
  };

  /**
   * @param {import("../../webgl/Context.js").default} context Context.
   */
  WebGLReplayGroup.prototype.finish = function finish (context) {
    var zKey;
    for (zKey in this.replaysByZIndex_) {
      var replays = this.replaysByZIndex_[zKey];
      for (var replayKey in replays) {
        replays[replayKey].finish(context);
      }
    }
  };

  /**
   * @inheritDoc
   */
  WebGLReplayGroup.prototype.getReplay = function getReplay (zIndex, replayType) {
    var zIndexKey = zIndex !== undefined ? zIndex.toString() : '0';
    var replays = this.replaysByZIndex_[zIndexKey];
    if (replays === undefined) {
      replays = {};
      this.replaysByZIndex_[zIndexKey] = replays;
    }
    var replay = replays[replayType];
    if (replay === undefined) {
      var Constructor = BATCH_CONSTRUCTORS[replayType];
      replay = new Constructor(this.tolerance_, this.maxExtent_);
      replays[replayType] = replay;
    }
    return replay;
  };

  /**
   * @inheritDoc
   */
  WebGLReplayGroup.prototype.isEmpty = function isEmpty$1 () {
    return isEmpty(this.replaysByZIndex_);
  };

  /**
   * @param {import("../../webgl/Context.js").default} context Context.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} size Size.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} opacity Global opacity.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   */
  WebGLReplayGroup.prototype.replay = function replay (
    context,
    center,
    resolution,
    rotation,
    size,
    pixelRatio,
    opacity,
    skippedFeaturesHash
  ) {
    /** @type {Array<number>} */
    var zs = Object.keys(this.replaysByZIndex_).map(Number);
    zs.sort(numberSafeCompareFunction);

    var i, ii, j, jj, replays, replay;
    for (i = 0, ii = zs.length; i < ii; ++i) {
      replays = this.replaysByZIndex_[zs[i].toString()];
      for (j = 0, jj = ORDER.length; j < jj; ++j) {
        replay = replays[ORDER[j]];
        if (replay !== undefined) {
          replay.replay(context,
            center, resolution, rotation, size, pixelRatio,
            opacity, skippedFeaturesHash,
            undefined, false);
        }
      }
    }
  };

  /**
   * @private
   * @param {import("../../webgl/Context.js").default} context Context.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} size Size.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} opacity Global opacity.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @param {function((import("../../Feature.js").default|import("../Feature.js").default)): T|undefined} featureCallback Feature callback.
   * @param {boolean} oneByOne Draw features one-by-one for the hit-detecion.
   * @param {import("../../extent.js").Extent=} opt_hitExtent Hit extent: Only features intersecting
   *  this extent are checked.
   * @return {T|undefined} Callback result.
   * @template T
   */
  WebGLReplayGroup.prototype.replayHitDetection_ = function replayHitDetection_ (
    context,
    center,
    resolution,
    rotation,
    size,
    pixelRatio,
    opacity,
    skippedFeaturesHash,
    featureCallback,
    oneByOne,
    opt_hitExtent
  ) {
    /** @type {Array<number>} */
    var zs = Object.keys(this.replaysByZIndex_).map(Number);
    zs.sort(function(a, b) {
      return b - a;
    });

    var i, ii, j, replays, replay, result;
    for (i = 0, ii = zs.length; i < ii; ++i) {
      replays = this.replaysByZIndex_[zs[i].toString()];
      for (j = ORDER.length - 1; j >= 0; --j) {
        replay = replays[ORDER[j]];
        if (replay !== undefined) {
          result = replay.replay(context,
            center, resolution, rotation, size, pixelRatio, opacity,
            skippedFeaturesHash, featureCallback, oneByOne, opt_hitExtent);
          if (result) {
            return result;
          }
        }
      }
    }
    return undefined;
  };

  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../webgl/Context.js").default} context Context.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} size Size.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} opacity Global opacity.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @param {function((import("../../Feature.js").default|import("../Feature.js").default)): T|undefined} callback Feature callback.
   * @return {T|undefined} Callback result.
   * @template T
   */
  WebGLReplayGroup.prototype.forEachFeatureAtCoordinate = function forEachFeatureAtCoordinate (
    coordinate,
    context,
    center,
    resolution,
    rotation,
    size,
    pixelRatio,
    opacity,
    skippedFeaturesHash,
    callback
  ) {
    var gl = context.getGL();
    gl.bindFramebuffer(
      gl.FRAMEBUFFER, context.getHitDetectionFramebuffer());


    /**
     * @type {import("../../extent.js").Extent}
     */
    var hitExtent;
    if (this.renderBuffer_ !== undefined) {
      // build an extent around the coordinate, so that only features that
      // intersect this extent are checked
      hitExtent = buffer(createOrUpdateFromCoordinate(coordinate), resolution * this.renderBuffer_);
    }

    return this.replayHitDetection_(context,
      coordinate, resolution, rotation, HIT_DETECTION_SIZE,
      pixelRatio, opacity, skippedFeaturesHash,
      /**
       * @param {import("../../Feature.js").default|import("../Feature.js").default} feature Feature.
       * @return {?} Callback result.
       */
      function(feature) {
        var imageData = new Uint8Array(4);
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, imageData);

        if (imageData[3] > 0) {
          var result = callback(feature);
          if (result) {
            return result;
          }
        }
      }, true, hitExtent);
  };

  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../webgl/Context.js").default} context Context.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} size Size.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} opacity Global opacity.
   * @param {Object<string, boolean>} skippedFeaturesHash Ids of features to skip.
   * @return {boolean} Is there a feature at the given coordinate?
   */
  WebGLReplayGroup.prototype.hasFeatureAtCoordinate = function hasFeatureAtCoordinate (
    coordinate,
    context,
    center,
    resolution,
    rotation,
    size,
    pixelRatio,
    opacity,
    skippedFeaturesHash
  ) {
    var gl = context.getGL();
    gl.bindFramebuffer(
      gl.FRAMEBUFFER, context.getHitDetectionFramebuffer());

    var hasFeature = this.replayHitDetection_(context,
      coordinate, resolution, rotation, HIT_DETECTION_SIZE,
      pixelRatio, opacity, skippedFeaturesHash,
      /**
       * @param {import("../../Feature.js").default|import("../Feature.js").default} feature Feature.
       * @return {boolean} Is there a feature?
       */
      function(feature) {
        var imageData = new Uint8Array(4);
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, imageData);
        return imageData[3] > 0;
      }, false);

    return hasFeature !== undefined;
  };

  return WebGLReplayGroup;
}(ReplayGroup));


export default WebGLReplayGroup;

//# sourceMappingURL=ReplayGroup.js.map