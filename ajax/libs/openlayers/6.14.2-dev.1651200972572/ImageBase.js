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
 * @module ol/ImageBase
 */
import EventTarget from './events/Target.js';
import EventType from './events/EventType.js';
import { abstract } from './util.js';
/**
 * @abstract
 */
var ImageBase = /** @class */ (function (_super) {
    __extends(ImageBase, _super);
    /**
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {number|undefined} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./ImageState.js").default} state State.
     */
    function ImageBase(extent, resolution, pixelRatio, state) {
        var _this = _super.call(this) || this;
        /**
         * @protected
         * @type {import("./extent.js").Extent}
         */
        _this.extent = extent;
        /**
         * @private
         * @type {number}
         */
        _this.pixelRatio_ = pixelRatio;
        /**
         * @protected
         * @type {number|undefined}
         */
        _this.resolution = resolution;
        /**
         * @protected
         * @type {import("./ImageState.js").default}
         */
        _this.state = state;
        return _this;
    }
    /**
     * @protected
     */
    ImageBase.prototype.changed = function () {
        this.dispatchEvent(EventType.CHANGE);
    };
    /**
     * @return {import("./extent.js").Extent} Extent.
     */
    ImageBase.prototype.getExtent = function () {
        return this.extent;
    };
    /**
     * @abstract
     * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
     */
    ImageBase.prototype.getImage = function () {
        return abstract();
    };
    /**
     * @return {number} PixelRatio.
     */
    ImageBase.prototype.getPixelRatio = function () {
        return this.pixelRatio_;
    };
    /**
     * @return {number} Resolution.
     */
    ImageBase.prototype.getResolution = function () {
        return /** @type {number} */ (this.resolution);
    };
    /**
     * @return {import("./ImageState.js").default} State.
     */
    ImageBase.prototype.getState = function () {
        return this.state;
    };
    /**
     * Load not yet loaded URI.
     * @abstract
     */
    ImageBase.prototype.load = function () {
        abstract();
    };
    return ImageBase;
}(EventTarget));
export default ImageBase;
//# sourceMappingURL=ImageBase.js.map