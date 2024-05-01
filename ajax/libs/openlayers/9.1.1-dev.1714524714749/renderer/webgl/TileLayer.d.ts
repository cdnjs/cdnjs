export const Uniforms: {
    TILE_TEXTURE_ARRAY: string;
    TEXTURE_PIXEL_WIDTH: string;
    TEXTURE_PIXEL_HEIGHT: string;
    TEXTURE_RESOLUTION: string;
    TEXTURE_ORIGIN_X: string;
    TEXTURE_ORIGIN_Y: string;
    TILE_TRANSFORM: string;
    TRANSITION_ALPHA: string;
    DEPTH: string;
    RENDER_EXTENT: string;
    PATTERN_ORIGIN: string;
    RESOLUTION: string;
    ZOOM: string;
    GLOBAL_ALPHA: string;
    PROJECTION_MATRIX: string;
    SCREEN_TO_WORLD_MATRIX: string;
};
export namespace Attributes {
    let TEXTURE_COORD: string;
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
export type TileTextureType = import("../../webgl/TileTexture.js").TileType;
export type TileTextureRepresentation = import("../../webgl/TileTexture.js").default;
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
 * @typedef {import("../../webgl/TileTexture.js").TileType} TileTextureType
 */
/**
 * @typedef {import("../../webgl/TileTexture.js").default} TileTextureRepresentation
 */
/**
 * @classdesc
 * WebGL renderer for tile layers.
 * @extends {WebGLBaseTileLayerRenderer<LayerType, TileTextureType, TileTextureRepresentation>}
 * @api
 */
declare class WebGLTileLayerRenderer extends WebGLBaseTileLayerRenderer<import("../../layer/WebGLTile.js").default, import("../../webgl/TileTexture.js").TileType, TileTexture> {
    /**
     * @param {LayerType} tileLayer Tile layer.
     * @param {Options} options Options.
     */
    constructor(tileLayer: LayerType, options: Options);
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
     * @type {Array<import("../../webgl/PaletteTexture.js").default>}
     * @private
     */
    private paletteTextures_;
    /**
     * @param {Options} options Options.
     */
    reset(options: Options): void;
    createTileRepresentation(options: any): TileTexture;
    beforeTilesRender(frameState: any, tilesWithAlpha: any): void;
    renderTile(tileTexture: any, tileTransform: any, frameState: any, renderExtent: any, tileResolution: any, tileSize: any, tileOrigin: any, tileExtent: any, depth: any, gutter: any, alpha: any): void;
    /**
     * @param {import("../../pixel.js").Pixel} pixel Pixel.
     * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView} Data at the pixel location.
     */
    getData(pixel: import("../../pixel.js").Pixel): Uint8ClampedArray | Uint8Array | Float32Array | DataView;
}
import TileTexture from '../../webgl/TileTexture.js';
import WebGLBaseTileLayerRenderer from './TileLayerBase.js';
//# sourceMappingURL=TileLayer.d.ts.map