export default STACLayer;
export type Item = {
    /**
     * The item type ("Feature").
     */
    type: string;
    /**
     * The STAC version.
     */
    stac_version: string;
    /**
     * The item identifier.
     */
    id: string;
    /**
     * The item footprint.
     */
    geometry: import("geojson").GeoJSON | null;
    /**
     * The bounding box (only required if geometry is null).
     */
    bbox?: number[] | undefined;
    /**
     * The item properties.
     */
    properties: any;
    /**
     * Links to other resources.
     */
    links: Array<Link>;
    /**
     * Asset lookup.
     */
    assets: {
        [x: string]: Asset;
    };
    /**
     * The collection id (if the item is part of a collection).
     */
    collection: string;
};
export type Link = {
    /**
     * The URL.
     */
    href: string;
    /**
     * The link relationship.
     */
    rel: string;
    /**
     * The media type.
     */
    type?: string | undefined;
    /**
     * The link title.
     */
    title?: string | undefined;
};
export type Asset = {
    /**
     * The asset URL.
     */
    href: string;
    /**
     * The asset title.
     */
    title?: string | undefined;
    /**
     * The asset description.
     */
    description?: string | undefined;
    /**
     * The media type.
     */
    type?: string | undefined;
    /**
     * The asset roles.
     */
    roles?: string[] | undefined;
};
export type AssetSelector = (arg0: {
    [x: string]: Asset;
}) => Array<Asset>;
export type Options = {
    /**
     * The selector for the assets to be rendered.  This can be an
     * array of strings corresponding to asset keys or a function that returns an array of assets
     * given item's asset lookup object.
     */
    assets?: string[] | AssetSelector | undefined;
    /**
     * The STAC item URL.  One of `url` or `item` must be provided.
     */
    url?: string | undefined;
    /**
     * The STAC item metadata.  One of `url` or `item` must be provided.
     */
    item?: any;
    /**
     * Given STAC item metadata, get options for the source.
     */
    getSourceOptions?: ((arg0: Item) => (import("../source/GeoTIFF.js").Options | Promise<import("../source/GeoTIFF.js").Options>)) | undefined;
    /**
     * Style to apply to the layer.
     */
    style?: import("./WebGLTile.js").Style | undefined;
    /**
     * Opacity (0, 1).
     */
    opacity?: number | undefined;
    /**
     * Visibility.
     */
    visible?: boolean | undefined;
    /**
     * The bounding extent for layer rendering.  The layer will not be
     * rendered outside of this extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * The z-index for layer rendering.  At rendering time, the layers
     * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
     * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
     * method was used.
     */
    zIndex?: number | undefined;
    /**
     * The minimum resolution (inclusive) at which this layer will be
     * visible.
     */
    minResolution?: number | undefined;
    /**
     * The maximum resolution (exclusive) below which this layer will
     * be visible.
     */
    maxResolution?: number | undefined;
    /**
     * The minimum view zoom level (exclusive) above which this layer will be
     * visible.
     */
    minZoom?: number | undefined;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number | undefined;
    /**
     * Preload. Load low-resolution tiles up to `preload` levels. `0`
     * means no preloading.
     */
    preload?: number | undefined;
    /**
     * The internal texture cache size.  This needs to be large enough to render
     * two zoom levels worth of tiles.
     */
    cacheSize?: number | undefined;
    /**
     * A CSS class name to set to the layer element.
     */
    className?: string | undefined;
};
/**
 * @typedef {function(Object<string, Asset>):Array<Asset>} AssetSelector
 */
/**
 * @typedef {Object} Options
 * @property {Array<string>|AssetSelector} [assets] The selector for the assets to be rendered.  This can be an
 * array of strings corresponding to asset keys or a function that returns an array of assets
 * given item's asset lookup object.
 * @property {string} [url] The STAC item URL.  One of `url` or `item` must be provided.
 * @property {Object} [item] The STAC item metadata.  One of `url` or `item` must be provided.
 * @property {function(Item):(import("../source/GeoTIFF.js").Options|Promise<import("../source/GeoTIFF.js").Options>)} [getSourceOptions] Given STAC item metadata, get options for the source.
 * @property {import("./WebGLTile.js").Style} [style] Style to apply to the layer.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {number} [cacheSize=512] The internal texture cache size.  This needs to be large enough to render
 * two zoom levels worth of tiles.
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 */
/**
 * @classdesc
 * Renders assets from a STAC Item.
 *
 * @extends WebGLTileLayer
 * @api
 */
declare class STACLayer extends WebGLTileLayer {
    /**
     * @param {Options} options Layer options.
     */
    constructor(options: Options);
    /**
     * @type {AssetSelector}
     * @private
     */
    private assetSelector_;
    /**
     * @type {function(Item):(import("../source/GeoTIFF.js").Options|Promise<import("../source/GeoTIFF.js").Options>)}
     * @private
     */
    private getSourceOptions_;
    /**
     * @type {Item}
     * @private
     */
    private item_;
    /**
     * @param {Error} error The error.
     * @private
     */
    private handleError_;
    /**
     * @param {Item} item The item data.
     * @return {Promise} Resolves when complete.
     * @private
     */
    private configure_;
    /**
     * @param {Array<Asset>} assets The assets to render.
     * @private
     */
    private updateSource_;
    /**
     * Update the assets to be rendered.
     * @param {Array<string>} keys Asset keys.
     */
    setAssets(keys: Array<string>): void;
    /**
     * Get the item metadata.
     * @return {Item} The item.
     */
    getItem(): Item;
}
import WebGLTileLayer from "./WebGLTile.js";
//# sourceMappingURL=STAC.d.ts.map