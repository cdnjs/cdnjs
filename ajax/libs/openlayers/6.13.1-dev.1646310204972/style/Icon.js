var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/style/Icon
 */
import EventType from '../events/EventType.js';
import IconAnchorUnits from './IconAnchorUnits.js';
import IconOrigin from './IconOrigin.js';
import ImageState from '../ImageState.js';
import ImageStyle from './Image.js';
import { asArray } from '../color.js';
import { assert } from '../asserts.js';
import { get as getIconImage } from './IconImage.js';
import { getUid } from '../util.js';
/**
 * @typedef {Object} Options
 * @property {Array<number>} [anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
 * @property {import("./IconOrigin.js").default} [anchorOrigin='top-left'] Origin of the anchor: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {import("./IconAnchorUnits.js").default} [anchorXUnits='fraction'] Units in which the anchor x value is
 * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
 * the x value in pixels.
 * @property {import("./IconAnchorUnits.js").default} [anchorYUnits='fraction'] Units in which the anchor y value is
 * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
 * the y value in pixels.
 * @property {import("../color.js").Color|string} [color] Color to tint the icon. If not specified,
 * the icon will be left as is.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {HTMLImageElement|HTMLCanvasElement} [img] Image object for the icon. If the `src` option is not provided then the
 * provided image must already be loaded. And in that case, it is required
 * to provide the size of the image, with the `imgSize` option.
 * @property {Array<number>} [offset=[0, 0]] Offset, which, together with the size and the offset origin, define the
 * sub-rectangle to use from the original icon image.
 * @property {Array<number>} [displacement=[0,0]] Displacement of the icon.
 * @property {import("./IconOrigin.js").default} [offsetOrigin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {number} [opacity=1] Opacity of the icon.
 * @property {number|import("../size.js").Size} [scale=1] Scale.
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
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function Icon(opt_options) {
        var _this = this;
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
         * @type {number|import("../size.js").Size}
         */
        var scale = options.scale !== undefined ? options.scale : 1;
        /**
         * @type {boolean}
         */
        var rotateWithView = options.rotateWithView !== undefined ? options.rotateWithView : false;
        _this = _super.call(this, {
            opacity: opacity,
            rotation: rotation,
            scale: scale,
            displacement: options.displacement !== undefined ? options.displacement : [0, 0],
            rotateWithView: rotateWithView,
        }) || this;
        /**
         * @private
         * @type {Array<number>}
         */
        _this.anchor_ = options.anchor !== undefined ? options.anchor : [0.5, 0.5];
        /**
         * @private
         * @type {Array<number>}
         */
        _this.normalizedAnchor_ = null;
        /**
         * @private
         * @type {import("./IconOrigin.js").default}
         */
        _this.anchorOrigin_ =
            options.anchorOrigin !== undefined
                ? options.anchorOrigin
                : IconOrigin.TOP_LEFT;
        /**
         * @private
         * @type {import("./IconAnchorUnits.js").default}
         */
        _this.anchorXUnits_ =
            options.anchorXUnits !== undefined
                ? options.anchorXUnits
                : IconAnchorUnits.FRACTION;
        /**
         * @private
         * @type {import("./IconAnchorUnits.js").default}
         */
        _this.anchorYUnits_ =
            options.anchorYUnits !== undefined
                ? options.anchorYUnits
                : IconAnchorUnits.FRACTION;
        /**
         * @private
         * @type {?string}
         */
        _this.crossOrigin_ =
            options.crossOrigin !== undefined ? options.crossOrigin : null;
        /**
         * @type {HTMLImageElement|HTMLCanvasElement}
         */
        var image = options.img !== undefined ? options.img : null;
        /**
         * @private
         * @type {import("../size.js").Size|undefined}
         */
        _this.imgSize_ = options.imgSize;
        /**
         * @type {string|undefined}
         */
        var src = options.src;
        assert(!(src !== undefined && image), 4); // `image` and `src` cannot be provided at the same time
        assert(!image || (image && _this.imgSize_), 5); // `imgSize` must be set when `image` is provided
        if ((src === undefined || src.length === 0) && image) {
            src = /** @type {HTMLImageElement} */ (image).src || getUid(image);
        }
        assert(src !== undefined && src.length > 0, 6); // A defined and non-empty `src` or `image` must be provided
        /**
         * @type {import("../ImageState.js").default}
         */
        var imageState = options.src !== undefined ? ImageState.IDLE : ImageState.LOADED;
        /**
         * @private
         * @type {import("../color.js").Color}
         */
        _this.color_ = options.color !== undefined ? asArray(options.color) : null;
        /**
         * @private
         * @type {import("./IconImage.js").default}
         */
        _this.iconImage_ = getIconImage(image, 
        /** @type {string} */ (src), _this.imgSize_ !== undefined ? _this.imgSize_ : null, _this.crossOrigin_, imageState, _this.color_);
        /**
         * @private
         * @type {Array<number>}
         */
        _this.offset_ = options.offset !== undefined ? options.offset : [0, 0];
        /**
         * @private
         * @type {import("./IconOrigin.js").default}
         */
        _this.offsetOrigin_ =
            options.offsetOrigin !== undefined
                ? options.offsetOrigin
                : IconOrigin.TOP_LEFT;
        /**
         * @private
         * @type {Array<number>}
         */
        _this.origin_ = null;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        _this.size_ = options.size !== undefined ? options.size : null;
        return _this;
    }
    /**
     * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
     * @return {Icon} The cloned style.
     * @api
     */
    Icon.prototype.clone = function () {
        var scale = this.getScale();
        return new Icon({
            anchor: this.anchor_.slice(),
            anchorOrigin: this.anchorOrigin_,
            anchorXUnits: this.anchorXUnits_,
            anchorYUnits: this.anchorYUnits_,
            color: this.color_ && this.color_.slice
                ? this.color_.slice()
                : this.color_ || undefined,
            crossOrigin: this.crossOrigin_,
            imgSize: this.imgSize_,
            offset: this.offset_.slice(),
            offsetOrigin: this.offsetOrigin_,
            opacity: this.getOpacity(),
            rotateWithView: this.getRotateWithView(),
            rotation: this.getRotation(),
            scale: Array.isArray(scale) ? scale.slice() : scale,
            size: this.size_ !== null ? this.size_.slice() : undefined,
            src: this.getSrc(),
        });
    };
    /**
     * Get the anchor point in pixels. The anchor determines the center point for the
     * symbolizer.
     * @return {Array<number>} Anchor.
     * @api
     */
    Icon.prototype.getAnchor = function () {
        var anchor = this.normalizedAnchor_;
        if (!anchor) {
            anchor = this.anchor_;
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
        }
        var displacement = this.getDisplacement();
        return [anchor[0] - displacement[0], anchor[1] + displacement[1]];
    };
    /**
     * Set the anchor point. The anchor determines the center point for the
     * symbolizer.
     *
     * @param {Array<number>} anchor Anchor.
     * @api
     */
    Icon.prototype.setAnchor = function (anchor) {
        this.anchor_ = anchor;
        this.normalizedAnchor_ = null;
    };
    /**
     * Get the icon color.
     * @return {import("../color.js").Color} Color.
     * @api
     */
    Icon.prototype.getColor = function () {
        return this.color_;
    };
    /**
     * Get the image icon.
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
     * @api
     */
    Icon.prototype.getImage = function (pixelRatio) {
        return this.iconImage_.getImage(pixelRatio);
    };
    /**
     * Get the pixel ratio.
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} The pixel ratio of the image.
     * @api
     */
    Icon.prototype.getPixelRatio = function (pixelRatio) {
        return this.iconImage_.getPixelRatio(pixelRatio);
    };
    /**
     * @return {import("../size.js").Size} Image size.
     */
    Icon.prototype.getImageSize = function () {
        return this.iconImage_.getSize();
    };
    /**
     * @return {import("../ImageState.js").default} Image state.
     */
    Icon.prototype.getImageState = function () {
        return this.iconImage_.getImageState();
    };
    /**
     * @return {HTMLImageElement|HTMLCanvasElement} Image element.
     */
    Icon.prototype.getHitDetectionImage = function () {
        return this.iconImage_.getHitDetectionImage();
    };
    /**
     * Get the origin of the symbolizer.
     * @return {Array<number>} Origin.
     * @api
     */
    Icon.prototype.getOrigin = function () {
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
    Icon.prototype.getSrc = function () {
        return this.iconImage_.getSrc();
    };
    /**
     * Get the size of the icon (in pixels).
     * @return {import("../size.js").Size} Image size.
     * @api
     */
    Icon.prototype.getSize = function () {
        return !this.size_ ? this.iconImage_.getSize() : this.size_;
    };
    /**
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    Icon.prototype.listenImageChange = function (listener) {
        this.iconImage_.addEventListener(EventType.CHANGE, listener);
    };
    /**
     * Load not yet loaded URI.
     * When rendering a feature with an icon style, the vector renderer will
     * automatically call this method. However, you might want to call this
     * method yourself for preloading or other purposes.
     * @api
     */
    Icon.prototype.load = function () {
        this.iconImage_.load();
    };
    /**
     * @param {function(import("../events/Event.js").default): void} listener Listener function.
     */
    Icon.prototype.unlistenImageChange = function (listener) {
        this.iconImage_.removeEventListener(EventType.CHANGE, listener);
    };
    return Icon;
}(ImageStyle));
export default Icon;
//# sourceMappingURL=Icon.js.map