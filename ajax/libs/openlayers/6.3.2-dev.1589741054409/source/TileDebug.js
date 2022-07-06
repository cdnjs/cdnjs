/**
 * @module ol/source/TileDebug
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
import Tile from '../Tile.js';
import TileState from '../TileState.js';
import XYZ from './XYZ.js';
import { createCanvasContext2D } from '../dom.js';
import { getKeyZXY } from '../tilecoord.js';
import { toSize } from '../size.js';
var LabeledTile = /** @class */ (function (_super) {
    __extends(LabeledTile, _super);
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../size.js").Size} tileSize Tile size.
     * @param {string} text Text.
     */
    function LabeledTile(tileCoord, tileSize, text) {
        var _this = _super.call(this, tileCoord, TileState.LOADED) || this;
        /**
         * @private
         * @type {import("../size.js").Size}
         */
        _this.tileSize_ = tileSize;
        /**
         * @private
         * @type {string}
         */
        _this.text_ = text;
        /**
         * @private
         * @type {HTMLCanvasElement}
         */
        _this.canvas_ = null;
        return _this;
    }
    /**
     * Get the image element for this tile.
     * @return {HTMLCanvasElement} Image.
     */
    LabeledTile.prototype.getImage = function () {
        if (this.canvas_) {
            return this.canvas_;
        }
        else {
            var tileSize = this.tileSize_;
            var context = createCanvasContext2D(tileSize[0], tileSize[1]);
            context.strokeStyle = 'grey';
            context.strokeRect(0.5, 0.5, tileSize[0] + 0.5, tileSize[1] + 0.5);
            context.fillStyle = 'grey';
            context.strokeStyle = 'white';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.font = '24px sans-serif';
            context.lineWidth = 4;
            context.strokeText(this.text_, tileSize[0] / 2, tileSize[1] / 2, tileSize[0]);
            context.fillText(this.text_, tileSize[0] / 2, tileSize[1] / 2, tileSize[0]);
            this.canvas_ = context.canvas;
            return context.canvas;
        }
    };
    LabeledTile.prototype.load = function () { };
    return LabeledTile;
}(Tile));
/**
 * @typedef {Object} Options
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Optional projection.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [zDirection=0] Set to `1` when debugging `VectorTile` sources with
 * a default configuration. Indicates which resolution should be used by a renderer if
 * the view resolution does not match any resolution of the tile source. If 0, the nearest
 * resolution will be used. If 1, the nearest lower resolution will be used. If -1, the
 * nearest higher resolution will be used.
 */
/**
 * @classdesc
 * A pseudo tile source, which does not fetch tiles from a server, but renders
 * a grid outline for the tile grid/projection along with the coordinates for
 * each tile. See examples/canvas-tiles for an example.
 *
 * Uses Canvas context2d, so requires Canvas support.
 * @api
 */
var TileDebug = /** @class */ (function (_super) {
    __extends(TileDebug, _super);
    /**
     * @param {Options=} opt_options Debug tile options.
     */
    function TileDebug(opt_options) {
        var _this = this;
        /**
         * @type {Options}
         */
        var options = opt_options || {};
        _this = _super.call(this, {
            opaque: false,
            projection: options.projection,
            tileGrid: options.tileGrid,
            wrapX: options.wrapX !== undefined ? options.wrapX : true,
            zDirection: options.zDirection,
        }) || this;
        return _this;
    }
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @return {!LabeledTile} Tile.
     */
    TileDebug.prototype.getTile = function (z, x, y) {
        var tileCoordKey = getKeyZXY(z, x, y);
        if (this.tileCache.containsKey(tileCoordKey)) {
            return /** @type {!LabeledTile} */ (this.tileCache.get(tileCoordKey));
        }
        else {
            var tileSize = toSize(this.tileGrid.getTileSize(z));
            var tileCoord = [z, x, y];
            var textTileCoord = this.getTileCoordForTileUrlFunction(tileCoord);
            var text = void 0;
            if (textTileCoord) {
                text =
                    'z:' +
                        textTileCoord[0] +
                        ' x:' +
                        textTileCoord[1] +
                        ' y:' +
                        textTileCoord[2];
            }
            else {
                text = 'none';
            }
            var tile = new LabeledTile(tileCoord, tileSize, text);
            this.tileCache.set(tileCoordKey, tile);
            return tile;
        }
    };
    return TileDebug;
}(XYZ));
export default TileDebug;
//# sourceMappingURL=TileDebug.js.map