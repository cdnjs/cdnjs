export default VectorRenderTile;
export type ReplayState = {
    /**
     * Dirty.
     */
    dirty: boolean;
    /**
     * RenderedRenderOrder.
     */
    renderedRenderOrder: null | import("./render.js").OrderFunction;
    /**
     * RenderedTileRevision.
     */
    renderedTileRevision: number;
    /**
     * RenderedResolution.
     */
    renderedResolution: number;
    /**
     * RenderedRevision.
     */
    renderedRevision: number;
    /**
     * RenderedTileResolution.
     */
    renderedTileResolution: number;
    /**
     * RenderedTileZ.
     */
    renderedTileZ: number;
};
declare class VectorRenderTile extends Tile {
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("./TileState.js").default} state State.
     * @param {import("./tilecoord.js").TileCoord} urlTileCoord Wrapped tile coordinate for source urls.
     * @param {function(VectorRenderTile):Array<import("./VectorTile").default>} getSourceTiles Function.
     * @param {function(VectorRenderTile):void} removeSourceTiles Function.
     */
    constructor(tileCoord: import("./tilecoord.js").TileCoord, state: any, urlTileCoord: import("./tilecoord.js").TileCoord, getSourceTiles: (arg0: VectorRenderTile) => Array<import("./VectorTile").default<any>>, removeSourceTiles: (arg0: VectorRenderTile) => void);
    /**
     * @private
     * @type {CanvasRenderingContext2D|null}
     */
    private context_;
    /**
     * Executor groups. Read/written by the renderer.
     * @type {Array<import("./render/canvas/ExecutorGroup.js").default>}
     */
    executorGroups: Array<import("./render/canvas/ExecutorGroup.js").default>;
    /**
     * Number of loading source tiles. Read/written by the source.
     * @type {number}
     */
    loadingSourceTiles: number;
    /**
     * @type {Object<number, ImageData>}
     */
    hitDetectionImageData: {
        [x: number]: ImageData;
    };
    /**
     * @private
     * @type {!Object<string, ReplayState>}
     */
    private replayState_;
    /**
     * @type {Array<import("./VectorTile.js").default>}
     */
    sourceTiles: Array<import("./VectorTile").default<any>>;
    /**
     * @type {Object<string, boolean>}
     */
    errorTileKeys: {
        [x: string]: boolean;
    };
    /**
     * @type {number}
     */
    wantedResolution: number;
    /**
     * @type {!function():Array<import("./VectorTile.js").default>}
     */
    getSourceTiles: () => Array<import("./VectorTile").default<any>>;
    /**
     * @type {!function(VectorRenderTile):void}
     * @private
     */
    private removeSourceTiles_;
    /**
     * @type {import("./tilecoord.js").TileCoord}
     */
    wrappedTileCoord: import("./tilecoord.js").TileCoord;
    /**
     * @return {CanvasRenderingContext2D} The rendering context.
     */
    getContext(): CanvasRenderingContext2D;
    /**
     * @return {boolean} Tile has a rendering context.
     */
    hasContext(): boolean;
    /**
     * Get the Canvas for this tile.
     * @return {HTMLCanvasElement} Canvas.
     */
    getImage(): HTMLCanvasElement;
    /**
     * @param {import("./layer/Layer.js").default} layer Layer.
     * @return {ReplayState} The replay state.
     */
    getReplayState(layer: import("./layer/Layer.js").default): ReplayState;
}
import Tile from './Tile.js';
//# sourceMappingURL=VectorRenderTile.d.ts.map