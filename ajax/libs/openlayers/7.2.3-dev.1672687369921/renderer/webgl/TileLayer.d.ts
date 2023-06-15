export namespace Uniforms {
    const TILE_TEXTURE_ARRAY: string;
    const TILE_TRANSFORM: string;
    const TRANSITION_ALPHA: string;
    const DEPTH: string;
    const TEXTURE_PIXEL_WIDTH: string;
    const TEXTURE_PIXEL_HEIGHT: string;
    const TEXTURE_RESOLUTION: string;
    const TEXTURE_ORIGIN_X: string;
    const TEXTURE_ORIGIN_Y: string;
    const RENDER_EXTENT: string;
    const RESOLUTION: string;
    const ZOOM: string;
}
export namespace Attributes {
    const TEXTURE_COORD: string;
}
export default WebGLTileLayerRenderer;
export type Options = {
    /**
     * Vertex shader source.
     */
    vertexShader: string;
    /**
     * Fragment shader source.
     */
    fragmentShader: string;
    /**
     * Additional uniforms
     * made available to shaders.
     */
    uniforms?: {
        [x: string]: import("../../webgl/Helper.js").UniformValue;
    } | undefined;
    /**
     * Palette textures.
     */
    paletteTextures?: import("../../webgl/PaletteTexture.js").default[] | undefined;
    /**
     * The texture cache size.
     */
    cacheSize?: number | undefined;
};
export type LayerType = import("../../layer/WebGLTile.js").default;
/**
 * @typedef {Object} Options
 * @property {string} vertexShader Vertex shader source.
 * @property {string} fragmentShader Fragment shader source.
 * @property {Object<string, import("../../webgl/Helper").UniformValue>} [uniforms] Additional uniforms
 * made available to shaders.
 * @property {Array<import("../../webgl/PaletteTexture.js").default>} [paletteTextures] Palette textures.
 * @property {number} [cacheSize=512] The texture cache size.
 */
/**
 * @typedef {import("../../layer/WebGLTile.js").default} LayerType
 */
/**
 * @classdesc
 * WebGL renderer for tile layers.
 * @extends {WebGLLayerRenderer<LayerType>}
 * @api
 */
declare class WebGLTileLayerRenderer extends WebGLLayerRenderer<import("../../layer/WebGLTile.js").default> {
    /**
     * @param {LayerType} tileLayer Tile layer.
     * @param {Options} options Options.
     */
    constructor(tileLayer: LayerType, options: Options);
    /**
     * The last call to `renderFrame` was completed with all tiles loaded
     * @type {boolean}
     */
    renderComplete: boolean;
    /**
     * This transform converts texture coordinates to screen coordinates.
     * @type {import("../../transform.js").Transform}
     * @private
     */
    private tileTransform_;
    /**
     * @type {Array<number>}
     * @private
     */
    private tempMat4_;
    /**
     * @type {import("../../TileRange.js").default}
     * @private
     */
    private tempTileRange_;
    /**
     * @type {import("../../tilecoord.js").TileCoord}
     * @private
     */
    private tempTileCoord_;
    /**
     * @type {import("../../size.js").Size}
     * @private
     */
    private tempSize_;
    /**
     * @type {WebGLProgram}
     * @private
     */
    private program_;
    /**
     * @private
     */
    private vertexShader_;
    /**
     * @private
     */
    private fragmentShader_;
    /**
     * Tiles are rendered as a quad with the following structure:
     *
     *  [P3]---------[P2]
     *   |`           |
     *   |  `     B   |
     *   |    `       |
     *   |      `     |
     *   |   A    `   |
     *   |          ` |
     *  [P0]---------[P1]
     *
     * Triangle A: P0, P1, P3
     * Triangle B: P1, P2, P3
     *
     * @private
     */
    private indices_;
    /**
     * @type {import("../../structs/LRUCache.js").default<import("../../webgl/TileTexture.js").default>}
     * @private
     */
    private tileTextureCache_;
    /**
     * @type {Array<import("../../webgl/PaletteTexture.js").default>}
     * @private
     */
    private paletteTextures_;
    /**
     * @private
     * @type {import("../../Map.js").FrameState|null}
     */
    private frameState_;
    /**
     * @private
     * @type {import("../../proj/Projection.js").default}
     */
    private projection_;
    /**
     * @param {Options} options Options.
     */
    reset(options: Options): void;
    /**
     * @param {import("../../webgl/TileTexture").TileType} tile Tile.
     * @return {boolean} Tile is drawable.
     * @private
     */
    private isDrawableTile_;
    /**
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent The extent to be rendered.
     * @param {number} initialZ The zoom level.
     * @param {Object<number, Array<TileTexture>>} tileTexturesByZ The zoom level.
     * @param {number} preload Number of additional levels to load.
     */
    enqueueTiles(frameState: import("../../Map.js").FrameState, extent: import("../../extent.js").Extent, initialZ: number, tileTexturesByZ: {
        [x: number]: Array<TileTexture>;
    }, preload: number): void;
    /**
     * Render the layer.
     * @param {import("../../Map.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../../Map.js").FrameState): HTMLElement;
    /**
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView} Data at the pixel location.
     */
    getData(pixel: import("../../pixel.js").Pixel): Uint8ClampedArray | Uint8Array | Float32Array | DataView;
    /**
     * Look for tiles covering the provided tile coordinate at an alternate
     * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
     * @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
     * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
     * @param {number} altZ The alternate zoom level.
     * @param {Object<number, Array<import("../../webgl/TileTexture.js").default>>} tileTexturesByZ Lookup of
     * tile textures by zoom level.
     * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
     * @private
     */
    private findAltTiles_;
    clearCache(): void;
}
import WebGLLayerRenderer from "./Layer.js";
import TileTexture from "../../webgl/TileTexture.js";
//# sourceMappingURL=TileLayer.d.ts.map