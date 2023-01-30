export default ImageTile;
declare class ImageTile extends Tile {
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("./TileState.js").default} state State.
     * @param {string} src Image source URI.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @param {import("./Tile.js").Options} [opt_options] Tile options.
     */
    constructor(tileCoord: import("./tilecoord.js").TileCoord, state: any, src: string, crossOrigin: string | null, tileLoadFunction: import("./Tile.js").LoadFunction, opt_options?: import("./Tile.js").Options | undefined);
    /**
     * @private
     * @type {?string}
     */
    private crossOrigin_;
    /**
     * Image URI
     *
     * @private
     * @type {string}
     */
    private src_;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */
    private image_;
    /**
     * @private
     * @type {?function():void}
     */
    private unlisten_;
    /**
     * @private
     * @type {import("./Tile.js").LoadFunction}
     */
    private tileLoadFunction_;
    /**
     * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
     * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
     * @api
     */
    getImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    /**
     * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
     * @param {HTMLCanvasElement|HTMLImageElement} element Element.
     */
    setImage(element: HTMLCanvasElement | HTMLImageElement): void;
    /**
     * Tracks loading or read errors.
     *
     * @private
     */
    private handleImageError_;
    /**
     * Tracks successful image load.
     *
     * @private
     */
    private handleImageLoad_;
    /**
     * Discards event handlers which listen for load completion or errors.
     *
     * @private
     */
    private unlistenImage_;
}
import Tile from "./Tile.js";
//# sourceMappingURL=ImageTile.d.ts.map