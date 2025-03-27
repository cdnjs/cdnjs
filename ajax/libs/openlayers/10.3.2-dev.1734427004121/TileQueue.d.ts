/**
 * @param {import('./Map.js').FrameState} frameState Frame state.
 * @param {import("./Tile.js").default} tile Tile.
 * @param {string} tileSourceKey Tile source key.
 * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
 * @param {number} tileResolution Tile resolution.
 * @return {number} Tile priority.
 */
export function getTilePriority(frameState: import("./Map.js").FrameState, tile: import("./Tile.js").default, tileSourceKey: string, tileCenter: import("./coordinate.js").Coordinate, tileResolution: number): number;
export default TileQueue;
export type PriorityFunction = (arg0: import("./Tile.js").default, arg1: string, arg2: import("./tilecoord.js").TileCoord, arg3: number) => number;
export type TileQueueElement = [import("./Tile.js").default, string, import("./tilecoord.js").TileCoord, number];
/**
 * @typedef {function(import("./Tile.js").default, string, import('./tilecoord.js').TileCoord, number): number} PriorityFunction
 */
/**
 * @typedef {[import('./Tile.js').default, string, import('./tilecoord.js').TileCoord, number]} TileQueueElement
 */
/**
 * @extends PriorityQueue<TileQueueElement>}
 */
declare class TileQueue extends PriorityQueue<TileQueueElement> {
    /**
     * @param {PriorityFunction} tilePriorityFunction Tile priority function.
     * @param {function(): ?} tileChangeCallback Function called on each tile change event.
     */
    constructor(tilePriorityFunction: PriorityFunction, tileChangeCallback: () => unknown);
    /** @private */
    private boundHandleTileChange_;
    /**
     * @private
     * @type {function(): ?}
     */
    private tileChangeCallback_;
    /**
     * @private
     * @type {number}
     */
    private tilesLoading_;
    /**
     * @private
     * @type {!Object<string,boolean>}
     */
    private tilesLoadingKeys_;
    /**
     * @return {number} Number of tiles loading.
     */
    getTilesLoading(): number;
    /**
     * @param {import("./events/Event.js").default} event Event.
     * @protected
     */
    protected handleTileChange(event: import("./events/Event.js").default): void;
    /**
     * @param {number} maxTotalLoading Maximum number tiles to load simultaneously.
     * @param {number} maxNewLoads Maximum number of new tiles to load.
     */
    loadMoreTiles(maxTotalLoading: number, maxNewLoads: number): void;
}
import PriorityQueue from './structs/PriorityQueue.js';
//# sourceMappingURL=TileQueue.d.ts.map