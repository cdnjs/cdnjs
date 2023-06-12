export default CanvasTileLayerRenderer;
/**
 * @classdesc
 * Canvas renderer for tile layers.
 * @api
 * @template {import("../../layer/Tile.js").default<import("../../source/Tile.js").default>|import("../../layer/VectorTile.js").default} [LayerType=import("../../layer/Tile.js").default<import("../../source/Tile.js").default>|import("../../layer/VectorTile.js").default]
 * @extends {CanvasLayerRenderer<LayerType>}
 */
declare class CanvasTileLayerRenderer<LayerType extends import("../../layer/Tile.js").default<import("../../source/Tile.js").default> | import("../../layer/VectorTile.js").default = import("../../layer/Tile.js").default<import("../../source/Tile.js").default> | import("../../layer/VectorTile.js").default> extends CanvasLayerRenderer<LayerType> {
    /**
     * @param {LayerType} tileLayer Tile layer.
     */
    constructor(tileLayer: LayerType);
    /**
     * Rendered extent has changed since the previous `renderFrame()` call
     * @type {boolean}
     */
    extentChanged: boolean;
    /**
     * @private
     * @type {?import("../../extent.js").Extent}
     */
    private renderedExtent_;
    /**
     * @protected
     * @type {number}
     */
    protected renderedPixelRatio: number;
    /**
     * @protected
     * @type {import("../../proj/Projection.js").default}
     */
    protected renderedProjection: import("../../proj/Projection.js").default;
    /**
     * @protected
     * @type {number}
     */
    protected renderedRevision: number;
    /**
     * @protected
     * @type {!Array<import("../../Tile.js").default>}
     */
    protected renderedTiles: Array<import("../../Tile.js").default>;
    /**
     * @private
     * @type {boolean}
     */
    private newTiles_;
    /**
     * @protected
     * @type {import("../../extent.js").Extent}
     */
    protected tmpExtent: import("../../extent.js").Extent;
    /**
     * @private
     * @type {import("../../TileRange.js").default}
     */
    private tmpTileRange_;
    /**
     * @protected
     * @param {import("../../Tile.js").default} tile Tile.
     * @return {boolean} Tile is drawable.
     */
    protected isDrawableTile(tile: import("../../Tile.js").default): boolean;
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {!import("../../Tile.js").default} Tile.
     */
    getTile(z: number, x: number, y: number, frameState: import("../../Map.js").FrameState): import("../../Tile.js").default;
    /**
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray} Data at the pixel location.
     */
    getData(pixel: import("../../pixel.js").Pixel): Uint8ClampedArray;
    /**
     * @param {import("../../ImageTile.js").default} tile Tile.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {number} x Left of the tile.
     * @param {number} y Top of the tile.
     * @param {number} w Width of the tile.
     * @param {number} h Height of the tile.
     * @param {number} gutter Tile gutter.
     * @param {boolean} transition Apply an alpha transition.
     */
    drawTileImage(tile: import("../../ImageTile.js").default, frameState: import("../../Map.js").FrameState, x: number, y: number, w: number, h: number, gutter: number, transition: boolean): void;
    /**
     * @return {HTMLCanvasElement} Image
     */
    getImage(): HTMLCanvasElement;
    /**
     * Get the image from a tile.
     * @param {import("../../ImageTile.js").default} tile Tile.
     * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
     * @protected
     */
    protected getTileImage(tile: import("../../ImageTile.js").default): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {import("../../source/Tile.js").default} tileSource Tile source.
     * @protected
     */
    protected scheduleExpireCache(frameState: import("../../Map.js").FrameState, tileSource: import("../../source/Tile.js").default): void;
    /**
     * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
     * @param {import("../../source/Tile.js").default} tileSource Tile source.
     * @param {import('../../Tile.js').default} tile Tile.
     * @protected
     */
    protected updateUsedTiles(usedTiles: {
        [x: string]: {
            [x: string]: boolean;
        };
    }, tileSource: import("../../source/Tile.js").default, tile: import('../../Tile.js').default): void;
    /**
     * Manage tile pyramid.
     * This function performs a number of functions related to the tiles at the
     * current zoom and lower zoom levels:
     * - registers idle tiles in frameState.wantedTiles so that they are not
     *   discarded by the tile queue
     * - enqueues missing tiles
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {import("../../source/Tile.js").default} tileSource Tile source.
     * @param {import("../../tilegrid/TileGrid.js").default} tileGrid Tile grid.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../../proj/Projection.js").default} projection Projection.
     * @param {import("../../extent.js").Extent} extent Extent.
     * @param {number} currentZ Current Z.
     * @param {number} preload Load low resolution tiles up to `preload` levels.
     * @param {function(import("../../Tile.js").default):void} [tileCallback] Tile callback.
     * @protected
     */
    protected manageTilePyramid(frameState: import("../../Map.js").FrameState, tileSource: import("../../source/Tile.js").default, tileGrid: import("../../tilegrid/TileGrid.js").default, pixelRatio: number, projection: import("../../proj/Projection.js").default, extent: import("../../extent.js").Extent, currentZ: number, preload: number, tileCallback?: ((arg0: import("../../Tile.js").default) => void) | undefined): void;
}
import CanvasLayerRenderer from "./Layer.js";
//# sourceMappingURL=TileLayer.d.ts.map