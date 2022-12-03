/**
 * Sets the loader for a tile.
 * @param {import("../VectorTile.js").default} tile Vector tile.
 * @param {string} url URL.
 */
export function defaultLoadFunction(tile: Tile, url: string): void;
export default VectorTile;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean;
    /**
     * Initial tile cache size. Will auto-grow to hold at least twice the number of tiles in the viewport.
     */
    cacheSize?: number;
    /**
     * Extent.
     */
    extent?: number[];
    /**
     * Feature format for tiles. Used and required by the default.
     */
    format?: import("../format/Feature.js").default;
    /**
     * This source may have overlapping geometries. Setting this
     * to `false` (e.g. for sources with polygons that represent administrative
     * boundaries or TopoJSON sources) allows the renderer to optimise fill and
     * stroke operations.
     */
    overlaps?: boolean;
    /**
     * Projection of the tile grid.
     */
    projection?: string | import("../proj/Projection.js").default | undefined;
    /**
     * Source state.
     */
    state?: any;
    /**
     * Class used to instantiate image tiles.
     * Default is {@link module:ol/VectorTile}.
     */
    tileClass?: typeof Tile;
    /**
     * Optional max zoom level. Not used if `tileGrid` is provided.
     */
    maxZoom?: number;
    /**
     * Optional min zoom level. Not used if `tileGrid` is provided.
     */
    minZoom?: number;
    /**
     * Optional tile size. Not used if `tileGrid` is provided.
     */
    tileSize?: number | number[];
    /**
     * Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
     */
    maxResolution?: number;
    /**
     * Tile grid.
     */
    tileGrid?: import("../tilegrid/TileGrid.js").default;
    /**
     * Optional function to load a tile given a URL. Could look like this for pbf tiles:
     * ```js
     * function(tile, url) {
     * tile.setLoader(function(extent, resolution, projection) {
     * fetch(url).then(function(response) {
     * response.arrayBuffer().then(function(data) {
     * const format = tile.getFormat() // ol/format/MVT configured as source format
     * const features = format.readFeatures(data, {
     * extent: extent,
     * featureProjection: projection
     * });
     * tile.setFeatures(features);
     * });
     * });
     * });
     * }
     * ```
     * If you do not need extent, resolution and projection to get the features for a tile (e.g.
     * for GeoJSON tiles), your `tileLoadFunction` does not need a `setLoader()` call. Only make sure
     * to call `setFeatures()` on the tile:
     * ```js
     * const format = new GeoJSON({featureProjection: map.getView().getProjection()});
     * async function tileLoadFunction(tile, url) {
     * const response = await fetch(url);
     * const data = await response.json();
     * tile.setFeatures(format.readFeatures(data));
     * }
     * ```
     */
    tileLoadFunction?: (arg0: import("../Tile.js").default, arg1: string) => void;
    /**
     * Optional function to get tile URL given a tile coordinate and the projection.
     */
    tileUrlFunction?: (arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => string | undefined;
    /**
     * URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
     * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
     * used instead of defining each one separately in the `urls` option.
     */
    url?: string;
    /**
     * A duration for tile opacity
     * transitions in milliseconds. A duration of 0 disables the opacity transition.
     */
    transition?: number;
    /**
     * An array of URL templates.
     */
    urls?: string[];
    /**
     * Whether to wrap the world horizontally.
     * When set to `false`, only one world
     * will be rendered. When set to `true`, tiles will be wrapped horizontally to
     * render multiple worlds.
     */
    wrapX?: boolean;
    /**
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | ((arg0: number, arg1: number, arg2: number) => number);
};
import Tile from "../VectorTile.js";
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least twice the number of tiles in the viewport.
 * @property {import("../extent.js").Extent} [extent] Extent.
 * @property {import("../format/Feature.js").default} [format] Feature format for tiles. Used and required by the default.
 * @property {boolean} [overlaps=true] This source may have overlapping geometries. Setting this
 * to `false` (e.g. for sources with polygons that represent administrative
 * boundaries or TopoJSON sources) allows the renderer to optimise fill and
 * stroke operations.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection of the tile grid.
 * @property {import("./State.js").default} [state] Source state.
 * @property {typeof import("../VectorTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/VectorTile}.
 * @property {number} [maxZoom=22] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number|import("../size.js").Size} [tileSize=512] Optional tile size. Not used if `tileGrid` is provided.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction]
 * Optional function to load a tile given a URL. Could look like this for pbf tiles:
 * ```js
 * function(tile, url) {
 *   tile.setLoader(function(extent, resolution, projection) {
 *     fetch(url).then(function(response) {
 *       response.arrayBuffer().then(function(data) {
 *         const format = tile.getFormat() // ol/format/MVT configured as source format
 *         const features = format.readFeatures(data, {
 *           extent: extent,
 *           featureProjection: projection
 *         });
 *         tile.setFeatures(features);
 *       });
 *     });
 *   });
 * }
 * ```
 * If you do not need extent, resolution and projection to get the features for a tile (e.g.
 * for GeoJSON tiles), your `tileLoadFunction` does not need a `setLoader()` call. Only make sure
 * to call `setFeatures()` on the tile:
 * ```js
 * const format = new GeoJSON({featureProjection: map.getView().getProjection()});
 * async function tileLoadFunction(tile, url) {
 *   const response = await fetch(url);
 *   const data = await response.json();
 *   tile.setFeatures(format.readFeatures(data));
 * }
 * ```
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get tile URL given a tile coordinate and the projection.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {number} [transition] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * When set to `false`, only one world
 * will be rendered. When set to `true`, tiles will be wrapped horizontally to
 * render multiple worlds.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=1]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Class for layer sources providing vector data divided into a tile grid, to be
 * used with {@link module:ol/layer/VectorTile~VectorTile}. Although this source receives tiles
 * with vector features from the server, it is not meant for feature editing.
 * Features are optimized for rendering, their geometries are clipped at or near
 * tile boundaries and simplified for a view resolution. See
 * {@link module:ol/source/Vector} for vector sources that are suitable for feature
 * editing.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */
declare class VectorTile extends UrlTile {
    /**
     * @param {!Options} options Vector tile options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {import("../format/Feature.js").default}
     */
    private format_;
    /**
     * @private
     * @type {TileCache}
     */
    private sourceTileCache;
    /**
     * @private
     * @type {boolean}
     */
    private overlaps_;
    /**
     * @protected
     * @type {typeof import("../VectorTile.js").default}
     */
    protected tileClass: typeof import("../VectorTile.js").default;
    /**
     * @private
     * @type {Object<string, import("../tilegrid/TileGrid.js").default>}
     */
    private tileGrids_;
    /**
     * Get features whose bounding box intersects the provided extent. Only features for cached
     * tiles for the last rendered zoom level are available in the source. So this method is only
     * suitable for requesting tiles for extents that are currently rendered.
     *
     * Features are returned in random tile order and as they are included in the tiles. This means
     * they can be clipped, duplicated across tiles, and simplified to the render resolution.
     *
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {Array<import("../Feature.js").FeatureLike>} Features.
     * @api
     */
    getFeaturesInExtent(extent: number[]): (import("../render/Feature.js").default | import("../Feature.js").default<import("../geom/Geometry.js").default>)[];
    /**
     * @return {boolean} The source can have overlapping geometries.
     */
    getOverlaps(): boolean;
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection").default} projection Projection.
     * @param {VectorRenderTile} tile Vector image tile.
     * @return {Array<import("../VectorTile").default>} Tile keys.
     */
    getSourceTiles(pixelRatio: number, projection: import("../proj/Projection.js").default, tile: VectorRenderTile): Tile[];
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!VectorRenderTile} Tile.
     */
    getTile(z: number, x: number, y: number, pixelRatio: number, projection: import("../proj/Projection.js").default): VectorRenderTile;
}
import UrlTile from "./UrlTile.js";
import VectorRenderTile from "../VectorRenderTile.js";
//# sourceMappingURL=VectorTile.d.ts.map