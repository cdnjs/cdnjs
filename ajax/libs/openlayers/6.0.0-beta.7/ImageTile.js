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
 * @module ol/ImageTile
 */
import Tile from './Tile.js';
import TileState from './TileState.js';
import { createCanvasContext2D } from './dom.js';
import { listenOnce, unlistenByKey } from './events.js';
import EventType from './events/EventType.js';
var ImageTile = /** @class */ (function (_super) {
    __extends(ImageTile, _super);
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {TileState} state State.
     * @param {string} src Image source URI.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @param {import("./Tile.js").Options=} opt_options Tile options.
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
         * @type {Array<import("./events.js").EventsKey>}
         */
        _this.imageListenerKeys_ = null;
        /**
         * @private
         * @type {import("./Tile.js").LoadFunction}
         */
        _this.tileLoadFunction_ = tileLoadFunction;
        return _this;
    }
    /**
     * @inheritDoc
     */
    ImageTile.prototype.disposeInternal = function () {
        if (this.state == TileState.LOADING) {
            this.unlistenImage_();
            this.image_ = getBlankImage();
        }
        if (this.interimTile) {
            this.interimTile.dispose();
        }
        this.state = TileState.ABORT;
        this.changed();
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
     * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
     * @api
     */
    ImageTile.prototype.getImage = function () {
        return this.image_;
    };
    /**
     * @inheritDoc
     */
    ImageTile.prototype.getKey = function () {
        return this.src_;
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
     * @inheritDoc
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
            this.imageListenerKeys_ = [
                listenOnce(this.image_, EventType.ERROR, this.handleImageError_, this),
                listenOnce(this.image_, EventType.LOAD, this.handleImageLoad_, this)
            ];
            this.tileLoadFunction_(this, this.src_);
        }
    };
    /**
     * Discards event handlers which listen for load completion or errors.
     *
     * @private
     */
    ImageTile.prototype.unlistenImage_ = function () {
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