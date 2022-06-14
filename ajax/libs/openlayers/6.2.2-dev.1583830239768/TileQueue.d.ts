export default TileQueue;
export type PriorityFunction = (arg0: import("./Tile.js").default, arg1: string, arg2: number[], arg3: number) => number;
/**
 * @typedef {function(import("./Tile.js").default, string, import("./coordinate.js").Coordinate, number): number} PriorityFunction
 */
declare class TileQueue extends PriorityQueue<any> {
    /**
     * @param {PriorityFunction} tilePriorityFunction Tile priority function.
     * @param {function(): ?} tileChangeCallback Function called on each tile change event.
     */
    constructor(tilePriorityFunction: (arg0: import("./Tile.js").default, arg1: string, arg2: number[], arg3: number) => number, tileChangeCallback: () => any);
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
     * @inheritDoc
     */
    enqueue(element: any): boolean;
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
import PriorityQueue from "./structs/PriorityQueue.js";
//# sourceMappingURL=TileQueue.d.ts.map