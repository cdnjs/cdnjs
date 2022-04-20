/**
 * @module ol/ImageCanvas
 */
import ImageBase from './ImageBase.js';
import ImageState from './ImageState.js';


/**
 * A function that is called to trigger asynchronous canvas drawing.  It is
 * called with a "done" callback that should be called when drawing is done.
 * If any error occurs during drawing, the "done" callback should be called with
 * that error.
 *
 * @typedef {function(function(Error=))} Loader
 */


var ImageCanvas = /*@__PURE__*/(function (ImageBase) {
  function ImageCanvas(extent, resolution, pixelRatio, canvas, opt_loader) {

    var state = opt_loader !== undefined ? ImageState.IDLE : ImageState.LOADED;

    ImageBase.call(this, extent, resolution, pixelRatio, state);

    /**
     * Optional canvas loader function.
     * @type {?Loader}
     * @private
     */
    this.loader_ = opt_loader !== undefined ? opt_loader : null;

    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    this.canvas_ = canvas;

    /**
     * @private
     * @type {Error}
     */
    this.error_ = null;

  }

  if ( ImageBase ) ImageCanvas.__proto__ = ImageBase;
  ImageCanvas.prototype = Object.create( ImageBase && ImageBase.prototype );
  ImageCanvas.prototype.constructor = ImageCanvas;

  /**
   * Get any error associated with asynchronous rendering.
   * @return {Error} Any error that occurred during rendering.
   */
  ImageCanvas.prototype.getError = function getError () {
    return this.error_;
  };

  /**
   * Handle async drawing complete.
   * @param {Error=} err Any error during drawing.
   * @private
   */
  ImageCanvas.prototype.handleLoad_ = function handleLoad_ (err) {
    if (err) {
      this.error_ = err;
      this.state = ImageState.ERROR;
    } else {
      this.state = ImageState.LOADED;
    }
    this.changed();
  };

  /**
   * @inheritDoc
   */
  ImageCanvas.prototype.load = function load () {
    if (this.state == ImageState.IDLE) {
      this.state = ImageState.LOADING;
      this.changed();
      this.loader_(this.handleLoad_.bind(this));
    }
  };

  /**
   * @return {HTMLCanvasElement} Canvas element.
   */
  ImageCanvas.prototype.getImage = function getImage () {
    return this.canvas_;
  };

  return ImageCanvas;
}(ImageBase));


export default ImageCanvas;

//# sourceMappingURL=ImageCanvas.js.map