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
 * @extends {BaseTileLayer<TileSourceType>}
 * @api
 */
declare class TileLayer<TileSourceType extends import("../source/Tile.js").default<any>> extends BaseTileLayer<TileSourceType> {
}
import BaseTileLayer from "./BaseTile.js";
//# sourceMappingURL=Tile.d.ts.map