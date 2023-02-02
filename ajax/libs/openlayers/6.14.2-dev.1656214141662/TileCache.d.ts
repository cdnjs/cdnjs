export default TileCache;
declare class TileCache extends LRUCache<any> {
    constructor(opt_highWaterMark?: number | undefined);
    /**
     * @param {!Object<string, boolean>} usedTiles Used tiles.
     */
    expireCache(usedTiles: {
        [x: string]: boolean;
    }): void;
    /**
     * Prune all tiles from the cache that don't have the same z as the newest tile.
     */
    pruneExceptNewestZ(): void;
}
import LRUCache from "./structs/LRUCache.js";
//# sourceMappingURL=TileCache.d.ts.map