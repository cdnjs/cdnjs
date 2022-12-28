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
 * @module ol/ImageTile
 */
import Tile from './Tile.js';
import TileState from './TileState.js';
import { createCanvasContext2D } from './dom.js';
import { listenImage } from './Image.js';
var ImageTile = /** @class */ (function (_super) {
    __extends(ImageTile, _super);
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("./TileState.js").default} state State.
     * @param {string} src Image source URI.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @param {import("./Tile.js").Options} [opt_options] Tile options.
     */
    function ImageTile(tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) {
        var _this = _super.call(this, tileCoord, state, opt_options) || this;
        /**
         * @private
         * @type {?string}
         */
        _this.crossOrigin_ = crossOrigin;
        /**
         * Image URI
         *
         * @private
         * @type {string}
         */
        _this.src_ = src;
        _this.key = src;
        /**
         * @private
         * @type {HTMLImageElement|HTMLCanvasElement}
         */
        _this.image_ = new Image();
        if (crossOrigin !== null) {
            _this.image_.crossOrigin = crossOrigin;
        }
        /**
         * @private
         * @type {?function():void}
         */
        _this.unlisten_ = null;
        /**
         * @private
         * @type {import("./Tile.js").LoadFunction}
         */
        _this.tileLoadFunction_ = tileLoadFunction;
        return _this;
    }
    /**
     * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
     * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
     * @api
     */
    ImageTile.prototype.getImage = function () {
        return this.image_;
    };
    /**
     * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
     * @param {HTMLCanvasElement|HTMLImageElement} element Element.
     */
    ImageTile.prototype.setImage = function (element) {
        this.image_ = element;
        this.state = TileState.LOADED;
        this.unlistenImage_();
        this.changed();
    };
    /**
     * Tracks loading or read errors.
     *
     * @private
     */
    ImageTile.prototype.handleImageError_ = function () {
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
    ImageTile.prototype.handleImageLoad_ = function () {
        var image = /** @type {HTMLImageElement} */ (this.image_);
        if (image.naturalWidth && image.naturalHeight) {
            this.state = TileState.LOADED;
        }
        else {
            this.state = TileState.EMPTY;
        }
        this.unlistenImage_();
        this.changed();
    };
    /**
     * Load not yet loaded URI.
     * @api
     */
    ImageTile.prototype.load = function () {
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
            this.tileLoadFunction_(this, this.src_);
            this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
        }
    };
    /**
     * Discards event handlers which listen for load completion or errors.
     *
     * @private
     */
    ImageTile.prototype.unlistenImage_ = function () {
        if (this.unlisten_) {
            this.unlisten_();
            this.unlisten_ = null;
        }
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