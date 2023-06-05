export default TileTexture;
export type TileType = import("../DataTile.js").default | ImageTile | ReprojTile;
export type Options = {
    /**
     * The tile.
     */
    tile: TileType;
    /**
     * Tile grid.
     */
    grid: import("../tilegrid/TileGrid.js").default;
    /**
     * WebGL helper.
     */
    helper: import("../webgl/Helper.js").default;
    /**
     * The size in pixels of the gutter around image tiles to ignore.
     */
    gutter?: number | undefined;
};
/**
 * @typedef {import("../DataTile.js").default|ImageTile|ReprojTile} TileType
 */
/**
 * @typedef {Object} Options
 * @property {TileType} tile The tile.
 * @property {import("../tilegrid/TileGrid.js").default} grid Tile grid.
 * @property {import("../webgl/Helper.js").default} helper WebGL helper.
 * @property {number} [gutter=0] The size in pixels of the gutter around image tiles to ignore.
 */
declare class TileTexture extends EventTarget {
    /**
     * @param {Options} options The tile texture options.
     */
    constructor(options: Options);
    /**
     * @type {TileType}
     */
    tile: TileType;
    /**
     * @type {Array<WebGLTexture>}
     */
    textures: Array<WebGLTexture>;
    handleTileChange_(): void;
    /**
     * @type {import("../size.js").Size}
     * @private
     */
    private renderSize_;
    /**
     * @type {number}
     * @private
     */
    private gutter_;
    /**
     * @type {number}
     */
    bandCount: number;
    /**
     * @type {import("../webgl/Helper.js").default}
     * @private
     */
    private helper_;
    /**
     * @type {WebGLArrayBuffer}
     */
    coords: WebGLArrayBuffer;
    /**
     * @param {TileType} tile Tile.
     */
    setTile(tile: TileType): void;
    loaded: boolean | undefined;
    uploadTile_(): void;
    /**
     * @param {import("../DataTile.js").ImageLike} image The image.
     * @param {number} renderCol The column index (in rendered tile space).
     * @param {number} renderRow The row index (in rendered tile space).
     * @return {Uint8ClampedArray|null} The data.
     * @private
     */
    private getImagePixelData_;
    /**
     * @param {import("../DataTile.js").ArrayLike} data The data.
     * @param {import("../size.js").Size} sourceSize The size.
     * @param {number} renderCol The column index (in rendered tile space).
     * @param {number} renderRow The row index (in rendered tile space).
     * @return {import("../DataTile.js").ArrayLike|null} The data.
     * @private
     */
    private getArrayPixelData_;
    /**
     * Get data for a pixel.  If the tile is not loaded, null is returned.
     * @param {number} renderCol The column index (in rendered tile space).
     * @param {number} renderRow The row index (in rendered tile space).
     * @return {import("../DataTile.js").ArrayLike|null} The data.
     */
    getPixelData(renderCol: number, renderRow: number): import("../DataTile.js").ArrayLike | null;
}
import ImageTile from "../ImageTile.js";
import ReprojTile from "../reproj/Tile.js";
import EventTarget from "../events/Target.js";
import WebGLArrayBuffer from "./Buffer.js";
//# sourceMappingURL=TileTexture.d.ts.map