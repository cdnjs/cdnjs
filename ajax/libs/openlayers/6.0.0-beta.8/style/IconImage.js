/**
 * @module ol/style/IconImage
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { createCanvasContext2D } from '../dom.js';
import { listenOnce, unlistenByKey } from '../events.js';
import EventTarget from '../events/Target.js';
import EventType from '../events/EventType.js';
import ImageState from '../ImageState.js';
import { shared as iconImageCache } from './IconImageCache.js';
var IconImage = /** @class */ (function (_super) {
    __extends(IconImage, _super);
    /**
     * @param {HTMLImageElement|HTMLCanvasElement} image Image.
     * @param {string|undefined} src Src.
     * @param {import("../size.js").Size} size Size.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../ImageState.js").default} imageState Image state.
     * @param {import("../color.js").Color} color Color.
     */
    function IconImage(image, src, size, crossOrigin, imageState, color) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {HTMLImageElement|HTMLCanvasElement}
         */
        _this.hitDetectionImage_ = null;
        /**
         * @private
         * @type {HTMLImageElement|HTMLCanvasElement}
         */
        _this.image_ = !image ? new Image() : image;
        if (crossOrigin !== null) {
            /** @type {HTMLImageElement} */ (_this.image_).crossOrigin = crossOrigin;
        }
        /**
         * @private
         * @type {HTMLCanvasElement}
         */
        _this.canvas_ = color ? document.createElement('canvas') : null;
        /**
         * @private
         * @type {import("../color.js").Color}
         */
        _this.color_ = color;
        /**
         * @private
         * @type {Array<import("../events.js").EventsKey>}
         */
        _this.imageListenerKeys_ = null;
        /**
         * @private
         * @type {import("../ImageState.js").default}
         */
        _this.imageState_ = imageState;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        _this.size_ = size;
        /**
         * @private
         * @type {string|undefined}
         */
        _this.src_ = src;
        /**
         * @private
         * @type {boolean|undefined}
         */
        _this.tainted_;
        return _this;
    }
    /**
     * @private
     * @return {boolean} The image canvas is tainted.
     */
    IconImage.prototype.isTainted_ = function () {
        if (this.tainted_ === undefined && this.imageState_ === ImageState.LOADED) {
            this.tainted_ = false;
            var context = createCanvasContext2D(1, 1);
            try {
                context.drawImage(this.image_, 0, 0);
                context.getImageData(0, 0, 1, 1);
            }
            catch (e) {
                this.tainted_ = true;
            }
        }
        return this.tainted_ === true;
    };
    /**
     * @private
     */
    IconImage.prototype.dispatchChangeEvent_ = function () {
        this.dispatchEvent(EventType.CHANGE);
    };
    /**
     * @private
     */
    IconImage.prototype.handleImageError_ = function () {
        this.imageState_ = ImageState.ERROR;
        this.unlistenImage_();
        this.dispatchChangeEvent_();
    };
    /**
     * @private
     */
    IconImage.prototype.handleImageLoad_ = function () {
        this.imageState_ = ImageState.LOADED;
        if (this.size_) {
            this.image_.width = this.size_[0];
            this.image_.height = this.size_[1];
        }
        this.size_ = [this.image_.width, this.image_.height];
        this.unlistenImage_();
        this.replaceColor_();
        this.dispatchChangeEvent_();
    };
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
     */
    IconImage.prototype.getImage = function (pixelRatio) {
        return this.canvas_ ? this.canvas_ : this.image_;
    };
    /**
     * @return {import("../ImageState.js").default} Image state.
     */
    IconImage.prototype.getImageState = function () {
        return this.imageState_;
    };
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLImageElement|HTMLCanvasElement} Image element.
     */
    IconImage.prototype.getHitDetectionImage = function (pixelRatio) {
        if (!this.hitDetectionImage_) {
            if (this.isTainted_()) {
                var width = this.size_[0];
                var height = this.size_[1];
                var context = createCanvasContext2D(width, height);
                context.fillRect(0, 0, width, height);
                this.hitDetectionImage_ = context.canvas;
            }
            else {
                this.hitDetectionImage_ = this.image_;
            }
        }
        return this.hitDetectionImage_;
    };
    /**
     * @return {import("../size.js").Size} Image size.
     */
    IconImage.prototype.getSize = function () {
        return this.size_;
    };
    /**
     * @return {string|undefined} Image src.
     */
    IconImage.prototype.getSrc = function () {
        return this.src_;
    };
    /**
     * Load not yet loaded URI.
     */
    IconImage.prototype.load = function () {
        if (this.imageState_ == ImageState.IDLE) {
            this.imageState_ = ImageState.LOADING;
            this.imageListenerKeys_ = [
                listenOnce(this.image_, EventType.ERROR, this.handleImageError_, this),
                listenOnce(this.image_, EventType.LOAD, this.handleImageLoad_, this)
            ];
            try {
                /** @type {HTMLImageElement} */ (this.image_).src = this.src_;
            }
            catch (e) {
                this.handleImageError_();
            }
        }
    };
    /**
     * @private
     */
    IconImage.prototype.replaceColor_ = function () {
        if (!this.color_ || this.isTainted_()) {
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
    IconImage.prototype.unlistenImage_ = function () {
        this.imageListenerKeys_.forEach(unlistenByKey);
        this.imageListenerKeys_ = null;
    };
    return IconImage;
}(EventTarget));
/**
 * @param {HTMLImageElement|HTMLCanvasElement} image Image.
 * @param {string} src Src.
 * @param {import("../size.js").Size} size Size.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../ImageState.js").default} imageState Image state.
 * @param {import("../color.js").Color} color Color.
 * @return {IconImage} Icon image.
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