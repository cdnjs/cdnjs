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
 * @typedef {function(function(Error=): void): void} Loader
 */
var ImageCanvas = /** @class */ (function (_super) {
    __extends(ImageCanvas, _super);
    /**
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {HTMLCanvasElement} canvas Canvas.
     * @param {Loader=} opt_loader Optional loader function to
     *     support asynchronous canvas drawing.
     */
    function ImageCanvas(extent, resolution, pixelRatio, canvas, opt_loader) {
        var _this = this;
        var state = opt_loader !== undefined ? ImageState.IDLE : ImageState.LOADED;
        _this = _super.call(this, extent, resolution, pixelRatio, state) || this;
        /**
         * Optional canvas loader function.
         * @type {?Loader}
         * @private
         */
        _this.loader_ = opt_loader !== undefined ? opt_loader : null;
        /**
         * @private
         * @type {HTMLCanvasElement}
         */
        _this.canvas_ = canvas;
        /**
         * @private
         * @type {?Error}
         */
        _this.error_ = null;
        return _this;
    }
    /**
     * Get any error associated with asynchronous rendering.
     * @return {?Error} Any error that occurred during rendering.
     */
    ImageCanvas.prototype.getError = function () {
        return this.error_;
    };
    /**
     * Handle async drawing complete.
     * @param {Error=} err Any error during drawing.
     * @private
     */
    ImageCanvas.prototype.handleLoad_ = function (err) {
        if (err) {
            this.error_ = err;
            this.state = ImageState.ERROR;
        }
        else {
            this.state = ImageState.LOADED;
        }
        this.changed();
    };
    /**
     * Load not yet loaded URI.
     */
    ImageCanvas.prototype.load = function () {
        if (this.state == ImageState.IDLE) {
            this.state = ImageState.LOADING;
            this.changed();
            this.loader_(this.handleLoad_.bind(this));
        }
    };
    /**
     * @return {HTMLCanvasElement} Canvas element.
     */
    ImageCanvas.prototype.getImage = function () {
        return this.canvas_;
    };
    return ImageCanvas;
}(ImageBase));
export default ImageCanvas;
//# sourceMappingURL=ImageCanvas.js.map