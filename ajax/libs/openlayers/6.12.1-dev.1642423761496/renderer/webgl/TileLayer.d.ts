export namespace Uniforms {
    export const TILE_TEXTURE_ARRAY: string;
    export const TILE_TRANSFORM: string;
    export const TRANSITION_ALPHA: string;
    export const DEPTH: string;
    export const TEXTURE_PIXEL_WIDTH: string;
    export const TEXTURE_PIXEL_HEIGHT: string;
    export const RESOLUTION: string;
    export const ZOOM: string;
}
export namespace Attributes {
    export const TEXTURE_COORD: string;
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
        [x: string]: number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData | ((arg0: import("../../PluggableMap.js").FrameState) => number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData);
    };
    /**
     * Palette textures.
     */
    paletteTextures?: import("../../webgl/PaletteTexture.js").default[];
    /**
     * The texture cache size.
     */
    cacheSize?: number;
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
    constructor(tileLayer: import("../../layer/WebGLTile.js").default, options: Options);
    /**
     * This transform converts tile i, j coordinates to screen coordinates.
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
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../../extent.js").Extent} extent The extent to be rendered.
     * @param {number} z The zoom level.
     * @param {Object<number, Array<TileTexture>>} tileTexturesByZ The zoom level.
     */
    enqueueTiles(frameState: import("../../PluggableMap.js").FrameState, extent: number[], z: number, tileTexturesByZ: {
        [x: number]: TileTexture[];
    }): void;
    /**
     * Render the layer.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    renderFrame(frameState: import("../../PluggableMap.js").FrameState): HTMLElement;
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
}
import WebGLLayerRenderer from "./Layer.js";
import TileTexture from "../../webgl/TileTexture.js";
//# sourceMappingURL=TileLayer.d.ts.map