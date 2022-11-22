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
 * @module ol/TileCache
 */
import LRUCache from './structs/LRUCache.js';
import { fromKey, getKey } from './tilecoord.js';
var TileCache = /** @class */ (function (_super) {
    __extends(TileCache, _super);
    function TileCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {!Object<string, boolean>} usedTiles Used tiles.
     */
    TileCache.prototype.expireCache = function (usedTiles) {
        while (this.canExpireCache()) {
            var tile = this.peekLast();
            if (tile.getKey() in usedTiles) {
                break;
            }
            else {
                this.pop().release();
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
                tile.release();
            }
        }.bind(this));
    };
    return TileCache;
}(LRUCache));
export default TileCache;
//# sourceMappingURL=TileCache.js.map