export default TileCache;
declare class TileCache extends LRUCache<any> {
    constructor(highWaterMark?: number);
    /**
     * @param {!Object<string, boolean>} usedTiles Used tiles.
     * @override
     */
    override expireCache(usedTiles: {
        [x: string]: boolean;
    }): void;
    /**
     * Prune all tiles from the cache that don't have the same z as the newest tile.
     */
    pruneExceptNewestZ(): void;
}
import LRUCache from './structs/LRUCache.js';
//# sourceMappingURL=TileCache.d.ts.map