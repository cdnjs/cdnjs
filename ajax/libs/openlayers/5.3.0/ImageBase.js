/**
 * @module ol/ImageBase
 */
import {abstract} from './util.js';
import EventTarget from './events/Target.js';
import EventType from './events/EventType.js';

/**
 * @abstract
 */
var ImageBase = /*@__PURE__*/(function (EventTarget) {
  function ImageBase(extent, resolution, pixelRatio, state) {

    EventTarget.call(this);

    /**
     * @protected
     * @type {import("./extent.js").Extent}
     */
    this.extent = extent;

    /**
     * @private
     * @type {number}
     */
    this.pixelRatio_ = pixelRatio;

    /**
     * @protected
     * @type {number|undefined}
     */
    this.resolution = resolution;

    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */
    this.state = state;

  }

  if ( EventTarget ) ImageBase.__proto__ = EventTarget;
  ImageBase.prototype = Object.create( EventTarget && EventTarget.prototype );
  ImageBase.prototype.constructor = ImageBase;

  /**
   * @protected
   */
  ImageBase.prototype.changed = function changed () {
    this.dispatchEvent(EventType.CHANGE);
  };

  /**
   * @return {import("./extent.js").Extent} Extent.
   */
  ImageBase.prototype.getExtent = function getExtent () {
    return this.extent;
  };

  /**
   * @abstract
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   */
  ImageBase.prototype.getImage = function getImage () {
    return abstract();
  };

  /**
   * @return {number} PixelRatio.
   */
  ImageBase.prototype.getPixelRatio = function getPixelRatio () {
    return this.pixelRatio_;
  };

  /**
   * @return {number} Resolution.
   */
  ImageBase.prototype.getResolution = function getResolution () {
    return /** @type {number} */ (this.resolution);
  };

  /**
   * @return {import("./ImageState.js").default} State.
   */
  ImageBase.prototype.getState = function getState () {
    return this.state;
  };

  /**
   * Load not yet loaded URI.
   * @abstract
   */
  ImageBase.prototype.load = function load () {
    abstract();
  };

  return ImageBase;
}(EventTarget));


export default ImageBase;

//# sourceMappingURL=ImageBase.js.map