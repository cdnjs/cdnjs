export namespace Uniforms {
    export const TILE_TEXTURE_PREFIX: string;
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
     * A CSS class name to set to the canvas element.
     */
    className?: string;
    /**
     * The texture cache size.
     */
    cacheSize?: number;
};
/**
 * @typedef {Object} Options
 * @property {string} vertexShader Vertex shader source.
 * @property {string} fragmentShader Fragment shader source.
 * @property {Object<string, import("../../webgl/Helper").UniformValue>} [uniforms] Additional uniforms
 * made available to shaders.
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {number} [cacheSize=512] The texture cache size.
 */
/**
 * @classdesc
 * WebGL renderer for tile layers.
 * @api
 */
declare class WebGLTileLayerRenderer extends WebGLLayerRenderer<any> {
    /**
     * @param {import("../../layer/WebGLTile.js").default} tileLayer Tile layer.
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
    program_: WebGLProgram;
    indices_: WebGLArrayBuffer;
    /**
     * @type {import("../../structs/LRUCache.js").default<import("../../webgl/TileTexture.js").default>}
     * @private
     */
    private tileTextureCache_;
    renderedOpacity_: any;
    /**
     * @protected
     * @param {import("../../Tile.js").default} tile Tile.
     * @return {boolean} Tile is drawable.
     */
    protected isDrawableTile(tile: import("../../Tile.js").default): boolean;
    enqueueTiles(frameState: any, extent: any, z: any, tileTexturesByZ: any): void;
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
     * @param {Object<string, Array<import("../../webgl/TileTexture.js").default>>} tileTexturesByZ Lookup of
     * tile textures by zoom level.
     * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
     * @private
     */
    private findAltTiles_;
}
import WebGLLayerRenderer from "./Layer.js";
import WebGLArrayBuffer from "../../webgl/Buffer.js";
//# sourceMappingURL=TileLayer.d.ts.map