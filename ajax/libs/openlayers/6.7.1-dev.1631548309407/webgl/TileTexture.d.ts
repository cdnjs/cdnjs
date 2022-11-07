export default TileTexture;
declare class TileTexture extends EventTarget {
    /**
     * @param {import("../DataTile.js").default|import("../ImageTile.js").default} tile The tile.
     * @param {import("../tilegrid/TileGrid.js").default} grid Tile grid.
     * @param {import("../webgl/Helper.js").default} helper WebGL helper.
     */
    constructor(tile: import("../DataTile.js").default | ImageTile, grid: import("../tilegrid/TileGrid.js").default, helper: import("./Helper.js").default);
    /**
     * @type {import("../DataTile.js").default|import("../ImageTile.js").default}
     */
    tile: import("../DataTile.js").default | import("../ImageTile.js").default;
    /**
     * @type {Array<WebGLTexture>}
     */
    textures: Array<WebGLTexture>;
    handleTileChange_(): void;
    size: number[];
    bandCount: number;
    helper_: import("./Helper.js").default;
    coords: WebGLArrayBuffer;
    /**
     * @param {import("../DataTile.js").default|import("../ImageTile.js").default} tile Tile.
     */
    setTile(tile: import("../DataTile.js").default | ImageTile): void;
    loaded: boolean | undefined;
    uploadTile_(): void;
}
import EventTarget from "../events/Target.js";
import WebGLArrayBuffer from "./Buffer.js";
import ImageTile from "../ImageTile.js";
//# sourceMappingURL=TileTexture.d.ts.map