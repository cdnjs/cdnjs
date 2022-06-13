export default Stamen;
export type Options = {
    /**
     * Tile cache size. The default depends on the screen size. Will be ignored if too small.
     */
    cacheSize?: number;
    /**
     * Layer name.
     */
    layer: string;
    /**
     * Minimum zoom.
     */
    minZoom?: number;
    /**
     * Maximum zoom.
     */
    maxZoom?: number;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number;
    /**
     * Optional function to load a tile given a URL. The default is
     * ```js
     * function(imageTile, src) {
     * imageTile.getImage().src = src;
     * };
     * ```
     */
    tileLoadFunction?: (arg0: import("../Tile.js").default, arg1: string) => void;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number;
    /**
     * URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
     */
    url?: string;
    /**
     * Whether to wrap the world horizontally.
     */
    wrapX?: boolean;
};
/**
 * @typedef {Object} Options
 * @property {number} [cacheSize] Tile cache size. The default depends on the screen size. Will be ignored if too small.
 * @property {string} layer Layer name.
 * @property {number} [minZoom] Minimum zoom.
 * @property {number} [maxZoom] Maximum zoom.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction]
 * Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 */
/**
 * @classdesc
 * Layer source for the Stamen tile server.
 * @api
 */
declare class Stamen extends XYZ {
    /**
     * @param {Options} options Stamen options.
     */
    constructor(options: Options);
}
import XYZ from "./XYZ.js";
//# sourceMappingURL=Stamen.d.ts.map