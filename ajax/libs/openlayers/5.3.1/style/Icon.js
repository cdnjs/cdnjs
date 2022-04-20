/**
 * @module ol/style/Icon
 */
import {getUid} from '../util.js';
import ImageState from '../ImageState.js';
import {assert} from '../asserts.js';
import {asArray} from '../color.js';
import {listen, unlisten} from '../events.js';
import EventType from '../events/EventType.js';
import IconAnchorUnits from './IconAnchorUnits.js';
import {get as getIconImage} from './IconImage.js';
import IconOrigin from './IconOrigin.js';
import ImageStyle from './Image.js';


/**
 * @typedef {Object} Options
 * @property {Array<number>} [anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
 * @property {import("./IconOrigin.js").default} [anchorOrigin] Origin of the anchor: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`. Default is `top-left`.
 * @property {import("./IconAnchorUnits.js").default} [anchorXUnits] Units in which the anchor x value is
 * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
 * the x value in pixels. Default is `'fraction'`.
 * @property {import("./IconAnchorUnits.js").default} [anchorYUnits] Units in which the anchor y value is
 * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
 * the y value in pixels. Default is `'fraction'`.
 * @property {import("../color.js").Color|string} [color] Color to tint the icon. If not specified,
 * the icon will be left as is.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you are using the WebGL renderer or if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {HTMLImageElement|HTMLCanvasElement} [img] Image object for the icon. If the `src` option is not provided then the
 * provided image must already be loaded. And in that case, it is required
 * to provide the size of the image, with the `imgSize` option.
 * @property {Array<number>} [offset=[0, 0]] Offset, which, together with the size and the offset origin, define the
 * sub-rectangle to use from the original icon image.
 * @property {import("./IconOrigin.js").default} [offsetOrigin] Origin of the offset: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`. Default is `top-left`.
 * @property {number} [opacity=1] Opacity of the icon.
 * @property {number} [scale=1] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the icon with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {import("../size.js").Size} [size] Icon size in pixel. Can be used together with `offset` to define the
 * sub-rectangle to use from the origin (sprite) icon image.
 * @property {import("../size.js").Size} [imgSize] Image size in pixels. Only required if `img` is set and `src` is not, and
 * for SVG images in Internet Explorer 11. The provided `imgSize` needs to match the actual size of the image.
 * @property {string} [src] Image source URI.
 */


/**
 * @classdesc
 * Set icon style for vector features.
 * @api
 */
var Icon = /*@__PURE__*/(function (ImageStyle) {
  function Icon(opt_options) {
    var options = opt_options || {};

    /**
     * @type {number}
     */
    var opacity = options.opacity !== undefined ? options.opacity : 1;

    /**
     * @type {number}
     */
    var rotation = options.rotation !== undefined ? options.rotation : 0;

    /**
     * @type {number}
     */
    var scale = options.scale !== undefined ? options.scale : 1;

    /**
     * @type {boolean}
     */
    var rotateWithView = options.rotateWithView !== undefined ?
      options.rotateWithView : false;

    ImageStyle.call(this, {
      opacity: opacity,
      rotation: rotation,
      scale: scale,
      rotateWithView: rotateWithView
    });

    /**
     * @private
     * @type {Array<number>}
     */
    this.anchor_ = options.anchor !== undefined ? options.anchor : [0.5, 0.5];

    /**
     * @private
     * @type {Array<number>}
     */
    this.normalizedAnchor_ = null;

    /**
     * @private
     * @type {import("./IconOrigin.js").default}
     */
    this.anchorOrigin_ = options.anchorOrigin !== undefined ?
      options.anchorOrigin : IconOrigin.TOP_LEFT;

    /**
     * @private
     * @type {import("./IconAnchorUnits.js").default}
     */
    this.anchorXUnits_ = options.anchorXUnits !== undefined ?
      options.anchorXUnits : IconAnchorUnits.FRACTION;

    /**
     * @private
     * @type {import("./IconAnchorUnits.js").default}
     */
    this.anchorYUnits_ = options.anchorYUnits !== undefined ?
      options.anchorYUnits : IconAnchorUnits.FRACTION;

    /**
     * @private
     * @type {?string}
     */
    this.crossOrigin_ =
        options.crossOrigin !== undefined ? options.crossOrigin : null;

    /**
     * @type {HTMLImageElement|HTMLCanvasElement}
     */
    var image = options.img !== undefined ? options.img : null;

    /**
     * @type {import("../size.js").Size}
     */
    var imgSize = options.imgSize !== undefined ? options.imgSize : null;

    /**
     * @type {string|undefined}
     */
    var src = options.src;

    assert(!(src !== undefined && image),
      4); // `image` and `src` cannot be provided at the same time
    assert(!image || (image && imgSize),
      5); // `imgSize` must be set when `image` is provided

    if ((src === undefined || src.length === 0) && image) {
      src = /** @type {HTMLImageElement} */ (image).src || getUid(image);
    }
    assert(src !== undefined && src.length > 0,
      6); // A defined and non-empty `src` or `image` must be provided

    /**
     * @type {import("../ImageState.js").default}
     */
    var imageState = options.src !== undefined ?
      ImageState.IDLE : ImageState.LOADED;

    /**
     * @private
     * @type {import("../color.js").Color}
     */
    this.color_ = options.color !== undefined ? asArray(options.color) : null;

    /**
     * @private
     * @type {import("./IconImage.js").default}
     */
    this.iconImage_ = getIconImage(
      image, /** @type {string} */ (src), imgSize, this.crossOrigin_, imageState, this.color_);

    /**
     * @private
     * @type {Array<number>}
     */
    this.offset_ = options.offset !== undefined ? options.offset : [0, 0];

    /**
     * @private
     * @type {import("./IconOrigin.js").default}
     */
    this.offsetOrigin_ = options.offsetOrigin !== undefined ?
      options.offsetOrigin : IconOrigin.TOP_LEFT;

    /**
     * @private
     * @type {Array<number>}
     */
    this.origin_ = null;

    /**
     * @private
     * @type {import("../size.js").Size}
     */
    this.size_ = options.size !== undefined ? options.size : null;

  }

  if ( ImageStyle ) Icon.__proto__ = ImageStyle;
  Icon.prototype = Object.create( ImageStyle && ImageStyle.prototype );
  Icon.prototype.constructor = Icon;

  /**
   * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
   * @return {Icon} The cloned style.
   * @api
   */
  Icon.prototype.clone = function clone () {
    return new Icon({
      anchor: this.anchor_.slice(),
      anchorOrigin: this.anchorOrigin_,
      anchorXUnits: this.anchorXUnits_,
      anchorYUnits: this.anchorYUnits_,
      crossOrigin: this.crossOrigin_,
      color: (this.color_ && this.color_.slice) ? this.color_.slice() : this.color_ || undefined,
      src: this.getSrc(),
      offset: this.offset_.slice(),
      offsetOrigin: this.offsetOrigin_,
      size: this.size_ !== null ? this.size_.slice() : undefined,
      opacity: this.getOpacity(),
      scale: this.getScale(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView()
    });
  };

  /**
   * @inheritDoc
   * @api
   */
  Icon.prototype.getAnchor = function getAnchor () {
    if (this.normalizedAnchor_) {
      return this.normalizedAnchor_;
    }
    var anchor = this.anchor_;
    var size = this.getSize();
    if (this.anchorXUnits_ == IconAnchorUnits.FRACTION ||
        this.anchorYUnits_ == IconAnchorUnits.FRACTION) {
      if (!size) {
        return null;
      }
      anchor = this.anchor_.slice();
      if (this.anchorXUnits_ == IconAnchorUnits.FRACTION) {
        anchor[0] *= size[0];
      }
      if (this.anchorYUnits_ == IconAnchorUnits.FRACTION) {
        anchor[1] *= size[1];
      }
    }

    if (this.anchorOrigin_ != IconOrigin.TOP_LEFT) {
      if (!size) {
        return null;
      }
      if (anchor === this.anchor_) {
        anchor = this.anchor_.slice();
      }
      if (this.anchorOrigin_ == IconOrigin.TOP_RIGHT ||
          this.anchorOrigin_ == IconOrigin.BOTTOM_RIGHT) {
        anchor[0] = -anchor[0] + size[0];
      }
      if (this.anchorOrigin_ == IconOrigin.BOTTOM_LEFT ||
          this.anchorOrigin_ == IconOrigin.BOTTOM_RIGHT) {
        anchor[1] = -anchor[1] + size[1];
      }
    }
    this.normalizedAnchor_ = anchor;
    return this.normalizedAnchor_;
  };

  /**
   * Set the anchor point. The anchor determines the center point for the
   * symbolizer.
   *
   * @param {Array<number>} anchor Anchor.
   * @api
   */
  Icon.prototype.setAnchor = function setAnchor (anchor) {
    this.anchor_ = anchor;
    this.normalizedAnchor_ = null;
  };

  /**
   * Get the icon color.
   * @return {import("../color.js").Color} Color.
   * @api
   */
  Icon.prototype.getColor = function getColor () {
    return this.color_;
  };

  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
   * @override
   * @api
   */
  Icon.prototype.getImage = function getImage (pixelRatio) {
    return this.iconImage_.getImage(pixelRatio);
  };

  /**
   * @override
   */
  Icon.prototype.getImageSize = function getImageSize () {
    return this.iconImage_.getSize();
  };

  /**
   * @override
   */
  Icon.prototype.getHitDetectionImageSize = function getHitDetectionImageSize () {
    return this.getImageSize();
  };

  /**
   * @override
   */
  Icon.prototype.getImageState = function getImageState () {
    return this.iconImage_.getImageState();
  };

  /**
   * @override
   */
  Icon.prototype.getHitDetectionImage = function getHitDetectionImage (pixelRatio) {
    return this.iconImage_.getHitDetectionImage(pixelRatio);
  };

  /**
   * @inheritDoc
   * @api
   */
  Icon.prototype.getOrigin = function getOrigin () {
    if (this.origin_) {
      return this.origin_;
    }
    var offset = this.offset_;

    if (this.offsetOrigin_ != IconOrigin.TOP_LEFT) {
      var size = this.getSize();
      var iconImageSize = this.iconImage_.getSize();
      if (!size || !iconImageSize) {
        return null;
      }
      offset = offset.slice();
      if (this.offsetOrigin_ == IconOrigin.TOP_RIGHT ||
          this.offsetOrigin_ == IconOrigin.BOTTOM_RIGHT) {
        offset[0] = iconImageSize[0] - size[0] - offset[0];
      }
      if (this.offsetOrigin_ == IconOrigin.BOTTOM_LEFT ||
          this.offsetOrigin_ == IconOrigin.BOTTOM_RIGHT) {
        offset[1] = iconImageSize[1] - size[1] - offset[1];
      }
    }
    this.origin_ = offset;
    return this.origin_;
  };

  /**
   * Get the image URL.
   * @return {string|undefined} Image src.
   * @api
   */
  Icon.prototype.getSrc = function getSrc () {
    return this.iconImage_.getSrc();
  };

  /**
   * @inheritDoc
   * @api
   */
  Icon.prototype.getSize = function getSize () {
    return !this.size_ ? this.iconImage_.getSize() : this.size_;
  };

  /**
   * @override
   */
  Icon.prototype.listenImageChange = function listenImageChange (listener, thisArg) {
    return listen(this.iconImage_, EventType.CHANGE,
      listener, thisArg);
  };

  /**
   * Load not yet loaded URI.
   * When rendering a feature with an icon style, the vector renderer will
   * automatically call this method. However, you might want to call this
   * method yourself for preloading or other purposes.
   * @override
   * @api
   */
  Icon.prototype.load = function load () {
    this.iconImage_.load();
  };

  /**
   * @override
   */
  Icon.prototype.unlistenImageChange = function unlistenImageChange (listener, thisArg) {
    unlisten(this.iconImage_, EventType.CHANGE,
      listener, thisArg);
  };

  return Icon;
}(ImageStyle));


export default Icon;

//# sourceMappingURL=Icon.js.map