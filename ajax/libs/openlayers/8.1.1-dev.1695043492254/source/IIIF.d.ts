export default IIIF;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean | undefined;
    /**
     * Size of the cache.
     */
    cacheSize?: number | undefined;
    /**
     * The value for the crossOrigin option of the request.
     */
    crossOrigin?: string | null | undefined;
    /**
     * The extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * Requested image format.
     */
    format?: string | undefined;
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
     * Requested IIIF image quality. Default is 'native'
     * for version 1, 'default' for versions 2 and 3.
     */
    quality?: string | undefined;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number | undefined;
    /**
     * Supported resolutions as given in IIIF 'scaleFactors'
     */
    resolutions?: number[] | undefined;
    /**
     * Size of the image [width, height].
     */
    size: import("../size.js").Size;
    /**
     * Supported scaled image sizes.
     * Content of the IIIF info.json 'sizes' property, but as array of Size objects.
     */
    sizes?: import("../size.js").Size[] | undefined;
    /**
     * Source state.
     */
    state?: import("./Source.js").State | undefined;
    /**
     * Supported IIIF region and size calculation
     * features.
     */
    supports?: string[] | undefined;
    /**
     * Tile pixel ratio.
     */
    tilePixelRatio?: number | undefined;
    /**
     * Tile size.
     * Same tile size is used for all zoom levels. If tile size is a number,
     * a square tile is assumed. If the IIIF image service supports arbitrary
     * tiling (sizeByH, sizeByW, sizeByWh or sizeByPct as well as regionByPx or regionByPct
     * are supported), the default tilesize is 256.
     */
    tileSize?: number | import("../size.js").Size | undefined;
    /**
     * Transition.
     */
    transition?: number | undefined;
    /**
     * Base URL of the IIIF Image service.
     * This should be the same as the IIIF Image ID.
     */
    url?: string | undefined;
    /**
     * Service's IIIF Image API version.
     */
    version?: string | undefined;
    /**
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module :ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
};
/**
 * @classdesc
 * Layer source for IIIF Image API services.
 * @api
 */
declare class IIIF extends TileImage {
    /**
     * @param {Options} [options] Tile source options. Use {@link import("../format/IIIFInfo.js").IIIFInfo}
     * to parse Image API service information responses into constructor options.
     * @api
     */
    constructor(options?: Options | undefined);
}
import TileImage from './TileImage.js';
//# sourceMappingURL=IIIF.d.ts.map