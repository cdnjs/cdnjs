/**
 * @module ol/style/IconImage
 */

import {createCanvasContext2D} from '../dom.js';
import {listenOnce, unlistenByKey} from '../events.js';
import EventTarget from '../events/Target.js';
import EventType from '../events/EventType.js';
import ImageState from '../ImageState.js';
import {shared as iconImageCache} from '../style/IconImageCache.js';

var IconImage = (function (EventTarget) {
  function IconImage(image, src, size, crossOrigin, imageState, color) {

    EventTarget.call(this);

    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */
    this.hitDetectionImage_ = null;

    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */
    this.image_ = !image ? new Image() : image;

    if (crossOrigin !== null) {
      this.image_.crossOrigin = crossOrigin;
    }

    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    this.canvas_ = color ?
      /** @type {HTMLCanvasElement} */ (document.createElement('canvas')) :
      null;

    /**
     * @private
     * @type {module:ol/color~Color}
     */
    this.color_ = color;

    /**
     * @private
     * @type {Array<module:ol/events~EventsKey>}
     */
    this.imageListenerKeys_ = null;

    /**
     * @private
     * @type {module:ol/ImageState}
     */
    this.imageState_ = imageState;

    /**
     * @private
     * @type {module:ol/size~Size}
     */
    this.size_ = size;

    /**
     * @private
     * @type {string|undefined}
     */
    this.src_ = src;

    /**
     * @private
     * @type {boolean}
     */
    this.tainting_ = false;
    if (this.imageState_ == ImageState.LOADED) {
      this.determineTainting_();
    }

  }

  if ( EventTarget ) IconImage.__proto__ = EventTarget;
  IconImage.prototype = Object.create( EventTarget && EventTarget.prototype );
  IconImage.prototype.constructor = IconImage;

  /**
   * @private
   */
  IconImage.prototype.determineTainting_ = function determineTainting_ () {
    var context = createCanvasContext2D(1, 1);
    try {
      context.drawImage(this.image_, 0, 0);
      context.getImageData(0, 0, 1, 1);
    } catch (e) {
      this.tainting_ = true;
    }
  };

  /**
   * @private
   */
  IconImage.prototype.dispatchChangeEvent_ = function dispatchChangeEvent_ () {
    this.dispatchEvent(EventType.CHANGE);
  };

  /**
   * @private
   */
  IconImage.prototype.handleImageError_ = function handleImageError_ () {
    this.imageState_ = ImageState.ERROR;
    this.unlistenImage_();
    this.dispatchChangeEvent_();
  };

  /**
   * @private
   */
  IconImage.prototype.handleImageLoad_ = function handleImageLoad_ () {
    this.imageState_ = ImageState.LOADED;
    if (this.size_) {
      this.image_.width = this.size_[0];
      this.image_.height = this.size_[1];
    }
    this.size_ = [this.image_.width, this.image_.height];
    this.unlistenImage_();
    this.determineTainting_();
    this.replaceColor_();
    this.dispatchChangeEvent_();
  };

  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
   */
  IconImage.prototype.getImage = function getImage (pixelRatio) {
    return this.canvas_ ? this.canvas_ : this.image_;
  };

  /**
   * @return {module:ol/ImageState} Image state.
   */
  IconImage.prototype.getImageState = function getImageState () {
    return this.imageState_;
  };

  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement} Image element.
   */
  IconImage.prototype.getHitDetectionImage = function getHitDetectionImage (pixelRatio) {
    if (!this.hitDetectionImage_) {
      if (this.tainting_) {
        var width = this.size_[0];
        var height = this.size_[1];
        var context = createCanvasContext2D(width, height);
        context.fillRect(0, 0, width, height);
        this.hitDetectionImage_ = context.canvas;
      } else {
        this.hitDetectionImage_ = this.image_;
      }
    }
    return this.hitDetectionImage_;
  };

  /**
   * @return {module:ol/size~Size} Image size.
   */
  IconImage.prototype.getSize = function getSize () {
    return this.size_;
  };

  /**
   * @return {string|undefined} Image src.
   */
  IconImage.prototype.getSrc = function getSrc () {
    return this.src_;
  };

  /**
   * Load not yet loaded URI.
   */
  IconImage.prototype.load = function load () {
    if (this.imageState_ == ImageState.IDLE) {
      this.imageState_ = ImageState.LOADING;
      this.imageListenerKeys_ = [
        listenOnce(this.image_, EventType.ERROR,
          this.handleImageError_, this),
        listenOnce(this.image_, EventType.LOAD,
          this.handleImageLoad_, this)
      ];
      try {
        this.image_.src = this.src_;
      } catch (e) {
        this.handleImageError_();
      }
    }
  };

  /**
   * @private
   */
  IconImage.prototype.replaceColor_ = function replaceColor_ () {
    if (this.tainting_ || this.color_ === null) {
      return;
    }

    this.canvas_.width = this.image_.width;
    this.canvas_.height = this.image_.height;

    var ctx = this.canvas_.getContext('2d');
    ctx.drawImage(this.image_, 0, 0);

    var imgData = ctx.getImageData(0, 0, this.image_.width, this.image_.height);
    var data = imgData.data;
    var r = this.color_[0] / 255.0;
    var g = this.color_[1] / 255.0;
    var b = this.color_[2] / 255.0;

    for (var i = 0, ii = data.length; i < ii; i += 4) {
      data[i] *= r;
      data[i + 1] *= g;
      data[i + 2] *= b;
    }
    ctx.putImageData(imgData, 0, 0);
  };

  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */
  IconImage.prototype.unlistenImage_ = function unlistenImage_ () {
    this.imageListenerKeys_.forEach(unlistenByKey);
    this.imageListenerKeys_ = null;
  };

  return IconImage;
}(EventTarget));


/**
 * @param {HTMLImageElement|HTMLCanvasElement} image Image.
 * @param {string} src Src.
 * @param {module:ol/size~Size} size Size.
 * @param {?string} crossOrigin Cross origin.
 * @param {module:ol/ImageState} imageState Image state.
 * @param {module:ol/color~Color} color Color.
 * @return {module:ol/style/IconImage} Icon image.
 */
export function get(image, src, size, crossOrigin, imageState, color) {
  var iconImage = iconImageCache.get(src, crossOrigin, color);
  if (!iconImage) {
    iconImage = new IconImage(image, src, size, crossOrigin, imageState, color);
    iconImageCache.set(src, crossOrigin, color, iconImage);
  }
  return iconImage;
}


export default IconImage;

//# sourceMappingURL=IconImage.js.map