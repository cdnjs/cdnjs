export default CanvasTileLayerRenderer;
export type TileLookup = {
    [x: number]: Set<import("../../Tile.js").default>;
};
export type Options = {
    /**
     * The cache size.
     */
    cacheSize?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {number} [cacheSize=512] The cache size.
 */
/**
 * @classdesc
 * Canvas renderer for tile layers.
 * @api
 * @template {import("../../layer/Tile.js").default|import("../../layer/VectorTile.js").default} [LayerType=import("../../layer/Tile.js").default<import("../../source/Tile.js").default>|import("../../layer/VectorTile.js").default]
 * @extends {CanvasLayerRenderer<LayerType>}
 */
declare class CanvasTileLayerRenderer<LayerType extends import("../../layer/Tile.js").default | import("../../layer/VectorTile.js").default = import("../../layer/Tile.js").default<import("../../source/Tile.js").default<import("../../Tile.js").default>> | import("../../layer/VectorTile.js").default<import("../../source.js").VectorTile<any>, any>> extends CanvasLayerRenderer<LayerType> {
    /**
     * @param {LayerType} tileLayer Tile layer.
     * @param {Options} [options] Options.
     */
    constructor(tileLayer: LayerType, options?: Options);
    /**
     * Rendered extent has changed since the previous `renderFrame()` call
     * @type {boolean}
     */
    extentChanged: boolean;
    /**
     * The last call to `renderFrame` was completed with all tiles loaded
     * @type {boolean}
     */
    renderComplete: boolean;
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
     * @type {import("../../proj/Projection.js").default|null}
     */
    protected renderedProjection: import("../../proj/Projection.js").default | null;
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
     * @type {string}
     */
    private renderedSourceKey_;
    /**
     * @private
     * @type {number}
     */
    private renderedSourceRevision_;
    /**
     * @protected
     * @type {import("../../extent.js").Extent}
     */
    protected tempExtent: import("../../extent.js").Extent;
    /**
     * @private
     * @type {import("../../TileRange.js").default}
     */
    private tempTileRange_;
    /**
     * @type {import("../../tilecoord.js").TileCoord}
     * @private
     */
    private tempTileCoord_;
    /**
     * @type {import("../../structs/LRUCache.js").default<import("../../Tile.js").default>}
     * @private
     */
    private tileCache_;
    /**
     * @return {LRUCache} Tile cache.
     */
    getTileCache(): LRUCache<any>;
    /**
     * Get a tile from the cache or create one if needed.
     *
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
     * @protected
     */
    protected getOrCreateTile(z: number, x: number, y: number, frameState: import("../../Map.js").FrameState): import("../../Tile.js").default | null;
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
     * @protected
     */
    protected getTile(z: number, x: number, y: number, frameState: import("../../Map.js").FrameState): import("../../Tile.js").default | null;
    /**
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray} Data at the pixel location.
     * @override
     */
    override getData(pixel: import("../../pixel.js").Pixel): Uint8ClampedArray;
    renderedRevision_: any;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent The extent to be rendered.
     * @param {number} initialZ The zoom level.
     * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
     * @param {number} preload Number of additional levels to load.
     */
    enqueueTiles(frameState: import("../../Map.js").FrameState, extent: import("../../extent.js").Extent, initialZ: number, tilesByZ: TileLookup, preload: number): void;
    /**
     * Look for tiles covering the provided tile coordinate at an alternate
     * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
     * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
     * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
     * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
     * @private
     */
    private findStaleTile_;
    /**
     * Look for tiles covering the provided tile coordinate at an alternate
     * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
     * @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
     * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
     * @param {number} altZ The alternate zoom level.
     * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
     * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
     * @private
     */
    private findAltTiles_;
    /**
     * Render the layer.
     *
     * The frame rendering logic has three parts:
     *
     *  1. Enqueue tiles
     *  2. Find alt tiles for those that are not yet loaded
     *  3. Render loaded tiles
     *
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {HTMLElement} target Target that may be used to render content to.
     * @return {HTMLElement} The rendered element.
     * @override
     */
    override renderFrame(frameState: import("../../Map.js").FrameState, target: HTMLElement): HTMLElement;
    /**
     * Increases the cache size if needed
     * @param {number} tileCount Minimum number of tiles needed.
     */
    updateCacheSize(tileCount: number): void;
    /**
     * @param {import("../../Tile.js").default} tile Tile.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {number} x Left of the tile.
     * @param {number} y Top of the tile.
     * @param {number} w Width of the tile.
     * @param {number} h Height of the tile.
     * @param {number} gutter Tile gutter.
     * @param {boolean} transition Apply an alpha transition.
     * @protected
     */
    protected drawTile(tile: import("../../Tile.js").default, frameState: import("../../Map.js").FrameState, x: number, y: number, w: number, h: number, gutter: number, transition: boolean): void;
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
     * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
     * @param {import("../../source/Tile.js").default} tileSource Tile source.
     * @param {import('../../Tile.js').default} tile Tile.
     * @protected
     */
    protected updateUsedTiles(usedTiles: {
        [x: string]: {
            [x: string]: boolean;
        };
    }, tileSource: import("../../source/Tile.js").default, tile: import("../../Tile.js").default): void;
}
import CanvasLayerRenderer from './Layer.js';
import LRUCache from '../../structs/LRUCache.js';
//# sourceMappingURL=TileLayer.d.ts.map