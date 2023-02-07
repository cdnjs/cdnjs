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
 * @module ol/DataTile
 */
import Tile from './Tile.js';
import TileState from './TileState.js';
/**
 * Data that can be used with a DataTile.  For increased browser compatibility, use
 * Uint8Array instead of Uint8ClampedArray where possible.
 * @typedef {Uint8Array|Uint8ClampedArray|Float32Array|DataView} Data
 */
/**
 * @typedef {Object} Options
 * @property {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @property {function(): Promise<Data>} loader Data loader.
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 * @property {import('./size.js').Size} [size=[256, 256]] Tile size.
 * @api
 */
var DataTile = /** @class */ (function (_super) {
    __extends(DataTile, _super);
    /**
     * @param {Options} options Tile options.
     */
    function DataTile(options) {
        var _this = this;
        var state = TileState.IDLE;
        _this = _super.call(this, options.tileCoord, state, {
            transition: options.transition,
            interpolate: options.interpolate,
        }) || this;
        /**
         * @type {function(): Promise<Data>}
         * @private
         */
        _this.loader_ = options.loader;
        /**
         * @type {Data}
         * @private
         */
        _this.data_ = null;
        /**
         * @type {Error}
         * @private
         */
        _this.error_ = null;
        /**
         * @type {import('./size.js').Size}
         * @private
         */
        _this.size_ = options.size || [256, 256];
        return _this;
    }
    /**
     * Get the tile size.
     * @return {import('./size.js').Size} Tile size.
     */
    DataTile.prototype.getSize = function () {
        return this.size_;
    };
    /**
     * Get the data for the tile.
     * @return {Data} Tile data.
     * @api
     */
    DataTile.prototype.getData = function () {
        return this.data_;
    };
    /**
     * Get any loading error.
     * @return {Error} Loading error.
     * @api
     */
    DataTile.prototype.getError = function () {
        return this.error_;
    };
    /**
     * Load not yet loaded URI.
     * @api
     */
    DataTile.prototype.load = function () {
        if (this.state !== TileState.IDLE && this.state !== TileState.ERROR) {
            return;
        }
        this.state = TileState.LOADING;
        this.changed();
        var self = this;
        this.loader_()
            .then(function (data) {
            self.data_ = data;
            self.state = TileState.LOADED;
            self.changed();
        })
            .catch(function (error) {
            self.error_ = error;
            self.state = TileState.ERROR;
            self.changed();
        });
    };
    return DataTile;
}(Tile));
export default DataTile;
//# sourceMappingURL=DataTile.js.map