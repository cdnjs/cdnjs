/**
 * @module ol/style/Image
 */


/**
 * @typedef {Object} Options
 * @property {number} opacity
 * @property {boolean} rotateWithView
 * @property {number} rotation
 * @property {number} scale
 */


/**
 * @classdesc
 * A base class used for creating subclasses and not instantiated in
 * apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
 * {@link module:ol/style/RegularShape~RegularShape}.
 * @api
 */
var ImageStyle = function ImageStyle(options) {

  /**
   * @private
   * @type {number}
   */
  this.opacity_ = options.opacity;

  /**
   * @private
   * @type {boolean}
   */
  this.rotateWithView_ = options.rotateWithView;

  /**
   * @private
   * @type {number}
   */
  this.rotation_ = options.rotation;

  /**
   * @private
   * @type {number}
   */
  this.scale_ = options.scale;

};

/**
 * Get the symbolizer opacity.
 * @return {number} Opacity.
 * @api
 */
ImageStyle.prototype.getOpacity = function getOpacity () {
  return this.opacity_;
};

/**
 * Determine whether the symbolizer rotates with the map.
 * @return {boolean} Rotate with map.
 * @api
 */
ImageStyle.prototype.getRotateWithView = function getRotateWithView () {
  return this.rotateWithView_;
};

/**
 * Get the symoblizer rotation.
 * @return {number} Rotation.
 * @api
 */
ImageStyle.prototype.getRotation = function getRotation () {
  return this.rotation_;
};

/**
 * Get the symbolizer scale.
 * @return {number} Scale.
 * @api
 */
ImageStyle.prototype.getScale = function getScale () {
  return this.scale_;
};

/**
 * This method is deprecated and always returns false.
 * @return {boolean} false.
 * @deprecated
 * @api
 */
ImageStyle.prototype.getSnapToPixel = function getSnapToPixel () {
  return false;
};

/**
 * Get the anchor point in pixels. The anchor determines the center point for the
 * symbolizer.
 * @abstract
 * @return {Array<number>} Anchor.
 */
ImageStyle.prototype.getAnchor = function getAnchor () {};

/**
 * Get the image element for the symbolizer.
 * @abstract
 * @param {number} pixelRatio Pixel ratio.
 * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
 */
ImageStyle.prototype.getImage = function getImage (pixelRatio) {};

/**
 * @abstract
 * @param {number} pixelRatio Pixel ratio.
 * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
 */
ImageStyle.prototype.getHitDetectionImage = function getHitDetectionImage (pixelRatio) {};

/**
 * @abstract
 * @return {module:ol/ImageState} Image state.
 */
ImageStyle.prototype.getImageState = function getImageState () {};

/**
 * @abstract
 * @return {module:ol/size~Size} Image size.
 */
ImageStyle.prototype.getImageSize = function getImageSize () {};

/**
 * @abstract
 * @return {module:ol/size~Size} Size of the hit-detection image.
 */
ImageStyle.prototype.getHitDetectionImageSize = function getHitDetectionImageSize () {};

/**
 * Get the origin of the symbolizer.
 * @abstract
 * @return {Array<number>} Origin.
 */
ImageStyle.prototype.getOrigin = function getOrigin () {};

/**
 * Get the size of the symbolizer (in pixels).
 * @abstract
 * @return {module:ol/size~Size} Size.
 */
ImageStyle.prototype.getSize = function getSize () {};

/**
 * Set the opacity.
 *
 * @param {number} opacity Opacity.
 * @api
 */
ImageStyle.prototype.setOpacity = function setOpacity (opacity) {
  this.opacity_ = opacity;
};

/**
 * Set whether to rotate the style with the view.
 *
 * @param {boolean} rotateWithView Rotate with map.
 * @api
 */
ImageStyle.prototype.setRotateWithView = function setRotateWithView (rotateWithView) {
  this.rotateWithView_ = rotateWithView;
};

/**
 * Set the rotation.
 *
 * @param {number} rotation Rotation.
 * @api
 */
ImageStyle.prototype.setRotation = function setRotation (rotation) {
  this.rotation_ = rotation;
};
/**
 * Set the scale.
 *
 * @param {number} scale Scale.
 * @api
 */
ImageStyle.prototype.setScale = function setScale (scale) {
  this.scale_ = scale;
};

/**
 * This method is deprecated and does nothing.
 * @param {boolean} snapToPixel Snap to pixel?
 * @deprecated
 * @api
 */
ImageStyle.prototype.setSnapToPixel = function setSnapToPixel (snapToPixel) {};

/**
 * @abstract
 * @param {function(this: T, module:ol/events/Event)} listener Listener function.
 * @param {T} thisArg Value to use as `this` when executing `listener`.
 * @return {module:ol/events~EventsKey|undefined} Listener key.
 * @template T
 */
ImageStyle.prototype.listenImageChange = function listenImageChange (listener, thisArg) {};

/**
 * Load not yet loaded URI.
 * @abstract
 */
ImageStyle.prototype.load = function load () {};

/**
 * @abstract
 * @param {function(this: T, module:ol/events/Event)} listener Listener function.
 * @param {T} thisArg Value to use as `this` when executing `listener`.
 * @template T
 */
ImageStyle.prototype.unlistenImageChange = function unlistenImageChange (listener, thisArg) {};

export default ImageStyle;

//# sourceMappingURL=Image.js.map