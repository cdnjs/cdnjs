/**
 * @typedef {'default' | 'truncated'} TierSizeCalculation
 */
export class CustomTile extends ImageTile {
    /**
     * @param {import("../size.js").Size} tileSize Full tile size.
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../TileState.js").default} state State.
     * @param {string} src Image source URI.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @param {import("../Tile.js").Options} [options] Tile options.
     */
    constructor(tileSize: import("../size.js").Size, tileCoord: import("../tilecoord.js").TileCoord, state: any, src: string, crossOrigin: string | null, tileLoadFunction: import("../Tile.js").LoadFunction, options?: import("../Tile.js").Options | undefined);
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
     */
    private zoomifyImage_;
    /**
     * @type {import("../size.js").Size}
     */
    tileSize_: import("../size.js").Size;
}
export default Zoomify;
export type TierSizeCalculation = 'default' | 'truncated';
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
     */
    cacheSize?: number | undefined;
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value  you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
    /**
     * Projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * The pixel ratio used by the tile service. For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px by 512px images (for retina/hidpi devices) then `tilePixelRatio` should be set to `2`
     */
    tilePixelRatio?: number | undefined;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number | undefined;
    /**
     * URL template or base URL of the Zoomify service.
     * A base URL is the fixed part
     * of the URL, excluding the tile group, z, x, and y folder structure, e.g.
     * `http://my.zoomify.info/IMAGE.TIF/`. A URL template must include
     * `{TileGroup}`, `{x}`, `{y}`, and `{z}` placeholders, e.g.
     * `http://my.zoomify.info/IMAGE.TIF/{TileGroup}/{z}-{x}-{y}.jpg`.
     * Internet Imaging Protocol (IIP) with JTL extension can be also used with
     * `{tileIndex}` and `{z}` placeholders, e.g.
     * `http://my.zoomify.info?FIF=IMAGE.TIF&JTL={z},{tileIndex}`.
     * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
     * used instead of defining each one separately in the `urls` option.
     */
    url: string;
    /**
     * Tier size calculation method: `default` or `truncated`.
     */
    tierSizeCalculation?: TierSizeCalculation | undefined;
    /**
     * Size.
     */
    size: import("../size.js").Size;
    /**
     * Extent for the TileGrid that is created.
     * Default sets the TileGrid in the
     * fourth quadrant, meaning extent is `[0, -height, width, 0]`. To change the
     * extent to the first quadrant (the default for OpenLayers 2) set the extent
     * as `[0, 0, width, height]`.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number | undefined;
    /**
     * Tile size. Same tile size is used for all zoom levels.
     */
    tileSize?: number | undefined;
    /**
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module :ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
};
import ImageTile from '../ImageTile.js';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value  you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {number} [tilePixelRatio] The pixel ratio used by the tile service. For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px by 512px images (for retina/hidpi devices) then `tilePixelRatio` should be set to `2`
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {string} url URL template or base URL of the Zoomify service.
 * A base URL is the fixed part
 * of the URL, excluding the tile group, z, x, and y folder structure, e.g.
 * `http://my.zoomify.info/IMAGE.TIF/`. A URL template must include
 * `{TileGroup}`, `{x}`, `{y}`, and `{z}` placeholders, e.g.
 * `http://my.zoomify.info/IMAGE.TIF/{TileGroup}/{z}-{x}-{y}.jpg`.
 * Internet Imaging Protocol (IIP) with JTL extension can be also used with
 * `{tileIndex}` and `{z}` placeholders, e.g.
 * `http://my.zoomify.info?FIF=IMAGE.TIF&JTL={z},{tileIndex}`.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {TierSizeCalculation} [tierSizeCalculation] Tier size calculation method: `default` or `truncated`.
 * @property {import("../size.js").Size} size Size.
 * @property {import("../extent.js").Extent} [extent] Extent for the TileGrid that is created.
 * Default sets the TileGrid in the
 * fourth quadrant, meaning extent is `[0, -height, width, 0]`. To change the
 * extent to the first quadrant (the default for OpenLayers 2) set the extent
 * as `[0, 0, width, height]`.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number} [tileSize=256] Tile size. Same tile size is used for all zoom levels.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Layer source for tile data in Zoomify format (both Zoomify and Internet
 * Imaging Protocol are supported).
 * @api
 */
declare class Zoomify extends TileImage {
    /**
     * @param {Options} options Options.
     */
    constructor(options: Options);
}
import TileImage from './TileImage.js';
//# sourceMappingURL=Zoomify.d.ts.map