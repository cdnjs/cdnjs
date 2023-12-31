export default TileTexture;
export type TileType = import("../DataTile.js").default | ImageTile | ReprojTile;
/**
 * @typedef {import("../DataTile.js").default|ImageTile|ReprojTile} TileType
 */
/**
 * @extends {BaseTileRepresentation<TileType>}
 */
declare class TileTexture extends BaseTileRepresentation<TileType> {
    /**
     * @param {import("./BaseTileRepresentation.js").TileRepresentationOptions<TileType>} options The tile texture options.
     */
    constructor(options: import("./BaseTileRepresentation.js").TileRepresentationOptions<TileType>);
    /**
     * @type {Array<WebGLTexture>}
     */
    textures: Array<WebGLTexture>;
    /**
     * @type {import("../size.js").Size}
     * @private
     */
    private renderSize_;
    /**
     * @type {number}
     */
    bandCount: number;
    /**
     * @type {WebGLArrayBuffer}
     */
    coords: WebGLArrayBuffer;
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
import ImageTile from '../ImageTile.js';
import ReprojTile from '../reproj/Tile.js';
import BaseTileRepresentation from './BaseTileRepresentation.js';
import WebGLArrayBuffer from './Buffer.js';
//# sourceMappingURL=TileTexture.d.ts.map