export default TileLayer;
/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @api
 */
declare class TileLayer extends BaseTileLayer {
    /**
     * @param {import("./BaseTile.js").Options=} opt_options Tile layer options.
     */
    constructor(opt_options?: import("./BaseTile.js").Options);
}
import BaseTileLayer from "./BaseTile.js";
//# sourceMappingURL=Tile.d.ts.map