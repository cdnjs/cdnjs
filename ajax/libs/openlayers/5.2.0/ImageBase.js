/**
 * @module ol/ImageBase
 */
import EventTarget from './events/Target.js';
import EventType from './events/EventType.js';

/**
 * @abstract
 */
var ImageBase = (function (EventTarget) {
  function ImageBase(extent, resolution, pixelRatio, state) {

    EventTarget.call(this);

    /**
     * @protected
     * @type {module:ol/extent~Extent}
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
     * @type {module:ol/ImageState}
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
   * @return {module:ol/extent~Extent} Extent.
   */
  ImageBase.prototype.getExtent = function getExtent () {
    return this.extent;
  };

  /**
   * @abstract
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   */
  ImageBase.prototype.getImage = function getImage () {};

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
   * @return {module:ol/ImageState} State.
   */
  ImageBase.prototype.getState = function getState () {
    return this.state;
  };

  /**
   * Load not yet loaded URI.
   * @abstract
   */
  ImageBase.prototype.load = function load () {};

  return ImageBase;
}(EventTarget));


export default ImageBase;

//# sourceMappingURL=ImageBase.js.map