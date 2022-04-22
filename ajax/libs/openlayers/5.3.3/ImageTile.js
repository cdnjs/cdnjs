/**
 * @module ol/ImageTile
 */
import Tile from './Tile.js';
import TileState from './TileState.js';
import {createCanvasContext2D} from './dom.js';
import {listenOnce, unlistenByKey} from './events.js';
import EventType from './events/EventType.js';


var ImageTile = /*@__PURE__*/(function (Tile) {
  function ImageTile(tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) {

    Tile.call(this, tileCoord, state, opt_options);

    /**
     * @private
     * @type {?string}
     */
    this.crossOrigin_ = crossOrigin;

    /**
     * Image URI
     *
     * @private
     * @type {string}
     */
    this.src_ = src;

    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */
    this.image_ = new Image();
    if (crossOrigin !== null) {
      this.image_.crossOrigin = crossOrigin;
    }

    /**
     * @private
     * @type {Array<import("./events.js").EventsKey>}
     */
    this.imageListenerKeys_ = null;

    /**
     * @private
     * @type {import("./Tile.js").LoadFunction}
     */
    this.tileLoadFunction_ = tileLoadFunction;

  }

  if ( Tile ) ImageTile.__proto__ = Tile;
  ImageTile.prototype = Object.create( Tile && Tile.prototype );
  ImageTile.prototype.constructor = ImageTile;

  /**
   * @inheritDoc
   */
  ImageTile.prototype.disposeInternal = function disposeInternal () {
    if (this.state == TileState.LOADING) {
      this.unlistenImage_();
      this.image_ = getBlankImage();
    }
    if (this.interimTile) {
      this.interimTile.dispose();
    }
    this.state = TileState.ABORT;
    this.changed();
    Tile.prototype.disposeInternal.call(this);
  };

  /**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */
  ImageTile.prototype.getImage = function getImage () {
    return this.image_;
  };

  /**
   * @inheritDoc
   */
  ImageTile.prototype.getKey = function getKey () {
    return this.src_;
  };

  /**
   * Tracks loading or read errors.
   *
   * @private
   */
  ImageTile.prototype.handleImageError_ = function handleImageError_ () {
    this.state = TileState.ERROR;
    this.unlistenImage_();
    this.image_ = getBlankImage();
    this.changed();
  };

  /**
   * Tracks successful image load.
   *
   * @private
   */
  ImageTile.prototype.handleImageLoad_ = function handleImageLoad_ () {
    var image = /** @type {HTMLImageElement} */ (this.image_);
    if (image.naturalWidth && image.naturalHeight) {
      this.state = TileState.LOADED;
    } else {
      this.state = TileState.EMPTY;
    }
    this.unlistenImage_();
    this.changed();
  };

  /**
   * @inheritDoc
   * @api
   */
  ImageTile.prototype.load = function load () {
    if (this.state == TileState.ERROR) {
      this.state = TileState.IDLE;
      this.image_ = new Image();
      if (this.crossOrigin_ !== null) {
        this.image_.crossOrigin = this.crossOrigin_;
      }
    }
    if (this.state == TileState.IDLE) {
      this.state = TileState.LOADING;
      this.changed();
      this.imageListenerKeys_ = [
        listenOnce(this.image_, EventType.ERROR,
          this.handleImageError_, this),
        listenOnce(this.image_, EventType.LOAD,
          this.handleImageLoad_, this)
      ];
      this.tileLoadFunction_(this, this.src_);
    }
  };

  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */
  ImageTile.prototype.unlistenImage_ = function unlistenImage_ () {
    this.imageListenerKeys_.forEach(unlistenByKey);
    this.imageListenerKeys_ = null;
  };

  return ImageTile;
}(Tile));


/**
 * Get a 1-pixel blank image.
 * @return {HTMLCanvasElement} Blank image.
 */
function getBlankImage() {
  var ctx = createCanvasContext2D(1, 1);
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, 1, 1);
  return ctx.canvas;
}

export default ImageTile;

//# sourceMappingURL=ImageTile.js.map