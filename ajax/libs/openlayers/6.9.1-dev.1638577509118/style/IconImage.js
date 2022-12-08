/**
 * @module ol/style/IconImage
 */
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
import EventTarget from '../events/Target.js';
import EventType from '../events/EventType.js';
import ImageState from '../ImageState.js';
import { asString } from '../color.js';
import { createCanvasContext2D } from '../dom.js';
import { shared as iconImageCache } from './IconImageCache.js';
import { listenImage } from '../Image.js';
/**
 * @type {CanvasRenderingContext2D}
 */
var taintedTestContext = null;
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
         * @type {Object<number, HTMLCanvasElement>}
         */
        _this.canvas_ = {};
        /**
         * @private
         * @type {import("../color.js").Color}
         */
        _this.color_ = color;
        /**
         * @private
         * @type {?function():void}
         */
        _this.unlisten_ = null;
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
            if (!taintedTestContext) {
                taintedTestContext = createCanvasContext2D(1, 1);
            }
            taintedTestContext.drawImage(this.image_, 0, 0);
            try {
                taintedTestContext.getImageData(0, 0, 1, 1);
                this.tainted_ = false;
            }
            catch (e) {
                taintedTestContext = null;
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
        else {
            this.size_ = [this.image_.width, this.image_.height];
        }
        this.unlistenImage_();
        this.dispatchChangeEvent_();
    };
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
     */
    IconImage.prototype.getImage = function (pixelRatio) {
        this.replaceColor_(pixelRatio);
        return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
    };
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Image or Canvas element.
     */
    IconImage.prototype.getPixelRatio = function (pixelRatio) {
        this.replaceColor_(pixelRatio);
        return this.canvas_[pixelRatio] ? pixelRatio : 1;
    };
    /**
     * @return {import("../ImageState.js").default} Image state.
     */
    IconImage.prototype.getImageState = function () {
        return this.imageState_;
    };
    /**
     * @return {HTMLImageElement|HTMLCanvasElement} Image element.
     */
    IconImage.prototype.getHitDetectionImage = function () {
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
     * Get the size of the icon (in pixels).
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
            try {
                /** @type {HTMLImageElement} */ (this.image_).src = this.src_;
            }
            catch (e) {
                this.handleImageError_();
            }
            this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
        }
    };
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @private
     */
    IconImage.prototype.replaceColor_ = function (pixelRatio) {
        if (!this.color_ ||
            this.canvas_[pixelRatio] ||
            this.imageState_ !== ImageState.LOADED) {
            return;
        }
        var canvas = document.createElement('canvas');
        this.canvas_[pixelRatio] = canvas;
        canvas.width = Math.ceil(this.image_.width * pixelRatio);
        canvas.height = Math.ceil(this.image_.height * pixelRatio);
        var ctx = canvas.getContext('2d');
        ctx.scale(pixelRatio, pixelRatio);
        ctx.drawImage(this.image_, 0, 0);
        ctx.globalCompositeOperation = 'multiply';
        // Internet Explorer 11 does not support the multiply operation.
        // If the canvas is tainted in Internet Explorer this still produces
        // a solid color image with the shape of the icon.
        if (ctx.globalCompositeOperation === 'multiply' || this.isTainted_()) {
            ctx.fillStyle = asString(this.color_);
            ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
            ctx.globalCompositeOperation = 'destination-in';
            ctx.drawImage(this.image_, 0, 0);
        }
        else {
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imgData.data;
            var r = this.color_[0] / 255.0;
            var g = this.color_[1] / 255.0;
            var b = this.color_[2] / 255.0;
            var a = this.color_[3];
            for (var i = 0, ii = data.length; i < ii; i += 4) {
                data[i] *= r;
                data[i + 1] *= g;
                data[i + 2] *= b;
                data[i + 3] *= a;
            }
            ctx.putImageData(imgData, 0, 0);
        }
    };
    /**
     * Discards event handlers which listen for load completion or errors.
     *
     * @private
     */
    IconImage.prototype.unlistenImage_ = function () {
        if (this.unlisten_) {
            this.unlisten_();
            this.unlisten_ = null;
        }
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