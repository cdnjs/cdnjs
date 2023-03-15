export default TileLayer;
/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Tile.js").default} TileSourceType
 * @extends BaseTileLayer<TileSourceType, CanvasTileLayerRenderer>
 * @api
 */
declare class TileLayer<TileSourceType extends import("../source/Tile.js").default> extends BaseTileLayer<TileSourceType, CanvasTileLayerRenderer<TileLayer<import("../source/Tile.js").default> | import("./VectorTile.js").default>> {
    /**
     * @param {import("./BaseTile.js").Options<TileSourceType>} [options] Tile layer options.
     */
    constructor(options?: import("./BaseTile.js").Options<TileSourceType> | undefined);
    createRenderer(): any;
}
import CanvasTileLayerRenderer from "../renderer/canvas/TileLayer.js";
import BaseTileLayer from "./BaseTile.js";
//# sourceMappingURL=Tile.d.ts.map