export default TileTexture;
export type TileType = import("../DataTile.js").default | ImageTile | ReprojTile;
/**
 * @typedef {import("../DataTile.js").default|ImageTile|ReprojTile} TileType
 */
declare class TileTexture extends EventTarget {
    /**
     * @param {TileType} tile The tile.
     * @param {import("../tilegrid/TileGrid.js").default} grid Tile grid.
     * @param {import("../webgl/Helper.js").default} helper WebGL helper.
     */
    constructor(tile: TileType, grid: import("../tilegrid/TileGrid.js").default, helper: import("../webgl/Helper.js").default);
    /**
     * @type {TileType}
     */
    tile: TileType;
    /**
     * @type {Array<WebGLTexture>}
     */
    textures: Array<WebGLTexture>;
    handleTileChange_(): void;
    size: import("../size.js").Size;
    bandCount: number;
    helper_: import("./Helper.js").default;
    coords: WebGLArrayBuffer;
    /**
     * @param {TileType} tile Tile.
     */
    setTile(tile: TileType): void;
    loaded: boolean | undefined;
    uploadTile_(): void;
}
import ImageTile from "../ImageTile.js";
import ReprojTile from "../reproj/Tile.js";
import EventTarget from "../events/Target.js";
import WebGLArrayBuffer from "./Buffer.js";
//# sourceMappingURL=TileTexture.d.ts.map