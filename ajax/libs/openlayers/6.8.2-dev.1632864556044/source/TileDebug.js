/**
 * @module ol/source/TileDebug
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
import XYZ from './XYZ.js';
import { createCanvasContext2D } from '../dom.js';
import { toSize } from '../size.js';
/**
 * @typedef {Object} Options
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Optional projection.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Set to `1` when debugging `VectorTile` sources with a default configuration.
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 * @property {string} [template='z:{z} x:{x} y:{y}'] Template for labeling the tiles.
 * Should include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 */
/**
 * @classdesc
 * A pseudo tile source, which does not fetch tiles from a server, but renders
 * a grid outline for the tile grid/projection along with the coordinates for
 * each tile. See examples/canvas-tiles for an example.
 * @api
 */
var TileDebug = /** @class */ (function (_super) {
    __extends(TileDebug, _super);
    /**
     * @param {Options} [opt_options] Debug tile options.
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
            url: options.template || 'z:{z} x:{x} y:{y}',
            tileLoadFunction: function (tile, text) {
                var z = tile.getTileCoord()[0];
                var tileSize = toSize(_this.tileGrid.getTileSize(z));
                var context = createCanvasContext2D(tileSize[0], tileSize[1]);
                context.strokeStyle = 'grey';
                context.strokeRect(0.5, 0.5, tileSize[0] + 0.5, tileSize[1] + 0.5);
                context.fillStyle = 'grey';
                context.strokeStyle = 'white';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.font = '24px sans-serif';
                context.lineWidth = 4;
                context.strokeText(text, tileSize[0] / 2, tileSize[1] / 2, tileSize[0]);
                context.fillText(text, tileSize[0] / 2, tileSize[1] / 2, tileSize[0]);
                /** @type {import("../ImageTile.js").default} */ (tile).setImage(context.canvas);
            },
        }) || this;
        return _this;
    }
    return TileDebug;
}(XYZ));
export default TileDebug;
//# sourceMappingURL=TileDebug.js.map