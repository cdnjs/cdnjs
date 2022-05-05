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
 * @module ol/VectorRenderTile
 */
import { getUid } from './util.js';
import Tile from './Tile.js';
import TileState from './TileState.js';
import { createCanvasContext2D } from './dom.js';
/**
 * @typedef {Object} ReplayState
 * @property {boolean} dirty
 * @property {null|import("./render.js").OrderFunction} renderedRenderOrder
 * @property {number} renderedTileRevision
 * @property {number} renderedResolution
 * @property {number} renderedRevision
 * @property {number} renderedZ
 * @property {number} renderedTileResolution
 * @property {number} renderedTileZ
 */
var VectorRenderTile = /** @class */ (function (_super) {
    __extends(VectorRenderTile, _super);
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {TileState} state State.
     * @param {import("./tilecoord.js").TileCoord} urlTileCoord Wrapped tile coordinate for source urls.
     * @param {import("./tilegrid/TileGrid.js").default} sourceTileGrid Tile grid of the source.
     * @param {function(VectorRenderTile):Array<import("./VectorTile").default>} getSourceTiles Function
     * to get an source tiles for this tile.
     * @param {function(VectorRenderTile):void} removeSourceTiles Function to remove this tile from its
     * source tiles's consumer count.
     */
    function VectorRenderTile(tileCoord, state, urlTileCoord, sourceTileGrid, getSourceTiles, removeSourceTiles) {
        var _this = _super.call(this, tileCoord, state, { transition: 0 }) || this;
        /**
         * @private
         * @type {!Object<string, CanvasRenderingContext2D>}
         */
        _this.context_ = {};
        /**
         * Executor groups by layer uid. Entries are read/written by the renderer.
         * @type {Object<string, Array<import("./render/canvas/ExecutorGroup.js").default>>}
         */
        _this.executorGroups = {};
        /**
         * Number of loading source tiles. Read/written by the source.
         * @type {number}
         */
        _this.loadingSourceTiles = 0;
        /**
         * Tile keys of error source tiles. Read/written by the source.
         * @type {Object<string, boolean>}
         */
        _this.errorSourceTileKeys = {};
        /**
         * @private
         * @type {!Object<string, ReplayState>}
         */
        _this.replayState_ = {};
        /**
         * @type {number}
         */
        _this.wantedResolution;
        /**
         * @type {!function(import("./VectorRenderTile.js").default):Array<import("./VectorTile.js").default>}
         */
        _this.getSourceTiles_ = getSourceTiles;
        /**
         * @type {!function(import("./VectorRenderTile.js").default):void}
         */
        _this.removeSourceTiles_ = removeSourceTiles;
        /**
         * @private
         * @type {import("./tilegrid/TileGrid.js").default}
         */
        _this.sourceTileGrid_ = sourceTileGrid;
        /**
         * z of the source tiles of the last getSourceTiles call.
         * @type {number}
         */
        _this.sourceZ = -1;
        /**
         * True when all tiles for this tile's nominal resolution are available.
         * @type {boolean}
         */
        _this.hifi = false;
        /**
         * @type {import("./tilecoord.js").TileCoord}
         */
        _this.wrappedTileCoord = urlTileCoord;
        return _this;
    }
    /**
     * @inheritDoc
     */
    VectorRenderTile.prototype.disposeInternal = function () {
        this.removeSourceTiles_(this);
        for (var key in this.context_) {
            var canvas = this.context_[key].canvas;
            canvas.width = canvas.height = 0;
        }
        for (var key in this.executorGroups) {
            var executorGroups = this.executorGroups[key];
            for (var i = 0, ii = executorGroups.length; i < ii; ++i) {
                executorGroups[i].disposeInternal();
            }
        }
        this.setState(TileState.ABORT);
        _super.prototype.disposeInternal.call(this);
    };
    /**
     * @param {import("./layer/Layer.js").default} layer Layer.
     * @return {CanvasRenderingContext2D} The rendering context.
     */
    VectorRenderTile.prototype.getContext = function (layer) {
        var key = getUid(layer);
        if (!(key in this.context_)) {
            this.context_[key] = createCanvasContext2D();
        }
        return this.context_[key];
    };
    /**
     * @param {import("./layer/Layer.js").default} layer Layer.
     * @return {boolean} Tile has a rendering context for the given layer.
     */
    VectorRenderTile.prototype.hasContext = function (layer) {
        return getUid(layer) in this.context_;
    };
    /**
     * Get the Canvas for this tile.
     * @param {import("./layer/Layer.js").default} layer Layer.
     * @return {HTMLCanvasElement} Canvas.
     */
    VectorRenderTile.prototype.getImage = function (layer) {
        return this.hasContext(layer) ? this.getContext(layer).canvas : null;
    };
    /**
     * @param {import("./layer/Layer.js").default} layer Layer.
     * @return {ReplayState} The replay state.
     */
    VectorRenderTile.prototype.getReplayState = function (layer) {
        var key = getUid(layer);
        if (!(key in this.replayState_)) {
            this.replayState_[key] = {
                dirty: false,
                renderedRenderOrder: null,
                renderedResolution: NaN,
                renderedRevision: -1,
                renderedTileResolution: NaN,
                renderedTileRevision: -1,
                renderedZ: -1,
                renderedTileZ: -1
            };
        }
        return this.replayState_[key];
    };
    /**
     * @inheritDoc
     */
    VectorRenderTile.prototype.load = function () {
        this.getSourceTiles_(this);
    };
    return VectorRenderTile;
}(Tile));
export default VectorRenderTile;
//# sourceMappingURL=VectorRenderTile.js.map