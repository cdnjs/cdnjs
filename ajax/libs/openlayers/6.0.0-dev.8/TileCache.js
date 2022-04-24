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
 * @module ol/TileCache
 */
import LRUCache from './structs/LRUCache.js';
import { fromKey, getKey } from './tilecoord.js';
var TileCache = /** @class */ (function (_super) {
    __extends(TileCache, _super);
    /**
     * @param {number=} opt_highWaterMark High water mark.
     */
    function TileCache(opt_highWaterMark) {
        return _super.call(this, opt_highWaterMark) || this;
    }
    /**
     * @param {!Object<string, import("./TileRange.js").default>} usedTiles Used tiles.
     */
    TileCache.prototype.expireCache = function (usedTiles) {
        while (this.canExpireCache()) {
            var tile = this.peekLast();
            if (tile.getKey() in usedTiles) {
                break;
            }
            else {
                this.pop().dispose();
            }
        }
    };
    /**
     * Prune all tiles from the cache that don't have the same z as the newest tile.
     */
    TileCache.prototype.pruneExceptNewestZ = function () {
        if (this.getCount() === 0) {
            return;
        }
        var key = this.peekFirstKey();
        var tileCoord = fromKey(key);
        var z = tileCoord[0];
        this.forEach(function (tile) {
            if (tile.tileCoord[0] !== z) {
                this.remove(getKey(tile.tileCoord));
                tile.dispose();
            }
        }.bind(this));
    };
    return TileCache;
}(LRUCache));
export default TileCache;
//# sourceMappingURL=TileCache.js.map