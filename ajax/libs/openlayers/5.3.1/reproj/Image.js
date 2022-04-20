/**
 * @module ol/reproj/Image
 */
import {ERROR_THRESHOLD} from './common.js';

import ImageBase from '../ImageBase.js';
import ImageState from '../ImageState.js';
import {listen, unlistenByKey} from '../events.js';
import EventType from '../events/EventType.js';
import {getCenter, getIntersection, getHeight, getWidth} from '../extent.js';
import {calculateSourceResolution, render as renderReprojected} from '../reproj.js';
import Triangulation from './Triangulation.js';


/**
 * @typedef {function(import("../extent.js").Extent, number, number) : import("../ImageBase.js").default} FunctionType
 */


/**
 * @classdesc
 * Class encapsulating single reprojected image.
 * See {@link module:ol/source/Image~ImageSource}.
 */
var ReprojImage = /*@__PURE__*/(function (ImageBase) {
  function ReprojImage(sourceProj, targetProj, targetExtent, targetResolution, pixelRatio, getImageFunction) {
    var maxSourceExtent = sourceProj.getExtent();
    var maxTargetExtent = targetProj.getExtent();

    var limitedTargetExtent = maxTargetExtent ?
      getIntersection(targetExtent, maxTargetExtent) : targetExtent;

    var targetCenter = getCenter(limitedTargetExtent);
    var sourceResolution = calculateSourceResolution(
      sourceProj, targetProj, targetCenter, targetResolution);

    var errorThresholdInPixels = ERROR_THRESHOLD;

    var triangulation = new Triangulation(
      sourceProj, targetProj, limitedTargetExtent, maxSourceExtent,
      sourceResolution * errorThresholdInPixels);

    var sourceExtent = triangulation.calculateSourceExtent();
    var sourceImage = getImageFunction(sourceExtent, sourceResolution, pixelRatio);
    var state = ImageState.LOADED;
    if (sourceImage) {
      state = ImageState.IDLE;
    }
    var sourcePixelRatio = sourceImage ? sourceImage.getPixelRatio() : 1;

    ImageBase.call(this, targetExtent, targetResolution, sourcePixelRatio, state);

    /**
     * @private
     * @type {import("../proj/Projection.js").default}
     */
    this.targetProj_ = targetProj;

    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    this.maxSourceExtent_ = maxSourceExtent;

    /**
     * @private
     * @type {!import("./Triangulation.js").default}
     */
    this.triangulation_ = triangulation;

    /**
     * @private
     * @type {number}
     */
    this.targetResolution_ = targetResolution;

    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    this.targetExtent_ = targetExtent;

    /**
     * @private
     * @type {import("../ImageBase.js").default}
     */
    this.sourceImage_ = sourceImage;

    /**
     * @private
     * @type {number}
     */
    this.sourcePixelRatio_ = sourcePixelRatio;

    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    this.canvas_ = null;

    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */
    this.sourceListenerKey_ = null;
  }

  if ( ImageBase ) ReprojImage.__proto__ = ImageBase;
  ReprojImage.prototype = Object.create( ImageBase && ImageBase.prototype );
  ReprojImage.prototype.constructor = ReprojImage;

  /**
   * @inheritDoc
   */
  ReprojImage.prototype.disposeInternal = function disposeInternal () {
    if (this.state == ImageState.LOADING) {
      this.unlistenSource_();
    }
    ImageBase.prototype.disposeInternal.call(this);
  };

  /**
   * @inheritDoc
   */
  ReprojImage.prototype.getImage = function getImage () {
    return this.canvas_;
  };

  /**
   * @return {import("../proj/Projection.js").default} Projection.
   */
  ReprojImage.prototype.getProjection = function getProjection () {
    return this.targetProj_;
  };

  /**
   * @private
   */
  ReprojImage.prototype.reproject_ = function reproject_ () {
    var sourceState = this.sourceImage_.getState();
    if (sourceState == ImageState.LOADED) {
      var width = getWidth(this.targetExtent_) / this.targetResolution_;
      var height = getHeight(this.targetExtent_) / this.targetResolution_;

      this.canvas_ = renderReprojected(width, height, this.sourcePixelRatio_,
        this.sourceImage_.getResolution(), this.maxSourceExtent_,
        this.targetResolution_, this.targetExtent_, this.triangulation_, [{
          extent: this.sourceImage_.getExtent(),
          image: this.sourceImage_.getImage()
        }], 0);
    }
    this.state = sourceState;
    this.changed();
  };

  /**
   * @inheritDoc
   */
  ReprojImage.prototype.load = function load () {
    if (this.state == ImageState.IDLE) {
      this.state = ImageState.LOADING;
      this.changed();

      var sourceState = this.sourceImage_.getState();
      if (sourceState == ImageState.LOADED || sourceState == ImageState.ERROR) {
        this.reproject_();
      } else {
        this.sourceListenerKey_ = listen(this.sourceImage_,
          EventType.CHANGE, function(e) {
            var sourceState = this.sourceImage_.getState();
            if (sourceState == ImageState.LOADED || sourceState == ImageState.ERROR) {
              this.unlistenSource_();
              this.reproject_();
            }
          }, this);
        this.sourceImage_.load();
      }
    }
  };

  /**
   * @private
   */
  ReprojImage.prototype.unlistenSource_ = function unlistenSource_ () {
    unlistenByKey(/** @type {!import("../events.js").EventsKey} */ (this.sourceListenerKey_));
    this.sourceListenerKey_ = null;
  };

  return ReprojImage;
}(ImageBase));


export default ReprojImage;

//# sourceMappingURL=Image.js.map