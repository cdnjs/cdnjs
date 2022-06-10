export default TileCache;
declare class TileCache extends LRUCache<any> {
    constructor(opt_highWaterMark?: number);
    /**
     * @param {!Object<string, import("./TileRange.js").default>} usedTiles Used tiles.
     */
    expireCache(usedTiles: {
        [x: string]: import("./TileRange.js").default;
    }): void;
    /**
     * Prune all tiles from the cache that don't have the same z as the newest tile.
     */
    pruneExceptNewestZ(): void;
}
import LRUCache from "./structs/LRUCache.js";
//# sourceMappingURL=TileCache.d.ts.map