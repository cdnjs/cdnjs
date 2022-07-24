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
 * @module ol/TileQueue
 */
import EventType from './events/EventType.js';
import PriorityQueue, { DROP } from './structs/PriorityQueue.js';
import TileState from './TileState.js';
/**
 * @typedef {function(import("./Tile.js").default, string, import("./coordinate.js").Coordinate, number): number} PriorityFunction
 */
var TileQueue = /** @class */ (function (_super) {
    __extends(TileQueue, _super);
    /**
     * @param {PriorityFunction} tilePriorityFunction Tile priority function.
     * @param {function(): ?} tileChangeCallback Function called on each tile change event.
     */
    function TileQueue(tilePriorityFunction, tileChangeCallback) {
        var _this = _super.call(this, 
        /**
         * @param {Array} element Element.
         * @return {number} Priority.
         */
        function (element) {
            return tilePriorityFunction.apply(null, element);
        }, 
        /**
         * @param {Array} element Element.
         * @return {string} Key.
         */
        function (element) {
            return /** @type {import("./Tile.js").default} */ (element[0]).getKey();
        }) || this;
        /** @private */
        _this.boundHandleTileChange_ = _this.handleTileChange.bind(_this);
        /**
         * @private
         * @type {function(): ?}
         */
        _this.tileChangeCallback_ = tileChangeCallback;
        /**
         * @private
         * @type {number}
         */
        _this.tilesLoading_ = 0;
        /**
         * @private
         * @type {!Object<string,boolean>}
         */
        _this.tilesLoadingKeys_ = {};
        return _this;
    }
    /**
     * @param {Array} element Element.
     * @return {boolean} The element was added to the queue.
     */
    TileQueue.prototype.enqueue = function (element) {
        var added = _super.prototype.enqueue.call(this, element);
        if (added) {
            var tile = element[0];
            tile.addEventListener(EventType.CHANGE, this.boundHandleTileChange_);
        }
        return added;
    };
    /**
     * @return {number} Number of tiles loading.
     */
    TileQueue.prototype.getTilesLoading = function () {
        return this.tilesLoading_;
    };
    /**
     * @param {import("./events/Event.js").default} event Event.
     * @protected
     */
    TileQueue.prototype.handleTileChange = function (event) {
        var tile = /** @type {import("./Tile.js").default} */ (event.target);
        var state = tile.getState();
        if ((tile.hifi && state === TileState.LOADED) ||
            state === TileState.ERROR ||
            state === TileState.EMPTY) {
            tile.removeEventListener(EventType.CHANGE, this.boundHandleTileChange_);
            var tileKey = tile.getKey();
            if (tileKey in this.tilesLoadingKeys_) {
                delete this.tilesLoadingKeys_[tileKey];
                --this.tilesLoading_;
            }
            this.tileChangeCallback_();
        }
    };
    /**
     * @param {number} maxTotalLoading Maximum number tiles to load simultaneously.
     * @param {number} maxNewLoads Maximum number of new tiles to load.
     */
    TileQueue.prototype.loadMoreTiles = function (maxTotalLoading, maxNewLoads) {
        var newLoads = 0;
        var state, tile, tileKey;
        while (this.tilesLoading_ < maxTotalLoading &&
            newLoads < maxNewLoads &&
            this.getCount() > 0) {
            tile = /** @type {import("./Tile.js").default} */ (this.dequeue()[0]);
            tileKey = tile.getKey();
            state = tile.getState();
            if (state === TileState.IDLE && !(tileKey in this.tilesLoadingKeys_)) {
                this.tilesLoadingKeys_[tileKey] = true;
                ++this.tilesLoading_;
                ++newLoads;
                tile.load();
            }
        }
    };
    return TileQueue;
}(PriorityQueue));
export default TileQueue;
/**
 * @param {import('./PluggableMap.js').FrameState} frameState Frame state.
 * @param {import("./Tile.js").default} tile Tile.
 * @param {string} tileSourceKey Tile source key.
 * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
 * @param {number} tileResolution Tile resolution.
 * @return {number} Tile priority.
 */
export function getTilePriority(frameState, tile, tileSourceKey, tileCenter, tileResolution) {
    // Filter out tiles at higher zoom levels than the current zoom level, or that
    // are outside the visible extent.
    if (!frameState || !(tileSourceKey in frameState.wantedTiles)) {
        return DROP;
    }
    if (!frameState.wantedTiles[tileSourceKey][tile.getKey()]) {
        return DROP;
    }
    // Prioritize the highest zoom level tiles closest to the focus.
    // Tiles at higher zoom levels are prioritized using Math.log(tileResolution).
    // Within a zoom level, tiles are prioritized by the distance in pixels between
    // the center of the tile and the center of the viewport.  The factor of 65536
    // means that the prioritization should behave as desired for tiles up to
    // 65536 * Math.log(2) = 45426 pixels from the focus.
    var center = frameState.viewState.center;
    var deltaX = tileCenter[0] - center[0];
    var deltaY = tileCenter[1] - center[1];
    return (65536 * Math.log(tileResolution) +
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) / tileResolution);
}
//# sourceMappingURL=TileQueue.js.map