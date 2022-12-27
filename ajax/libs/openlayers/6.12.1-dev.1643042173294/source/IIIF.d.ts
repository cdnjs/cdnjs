export default IIIF;
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
     * Size of the cache.
     */
    cacheSize?: number;
    /**
     * The value for the crossOrigin option of the request.
     */
    crossOrigin?: string | null;
    /**
     * The extent.
     */
    extent?: number[];
    /**
     * Requested image format.
     */
    format?: string;
    /**
     * Deprecated.  Use the `interpolate` option instead.
     */
    imageSmoothing?: boolean;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean;
    /**
     * Projection.
     */
    projection?: string | import("../proj/Projection.js").default | undefined;
    /**
     * Requested IIIF image quality. Default is 'native'
     * for version 1, 'default' for versions 2 and 3.
     */
    quality?: string;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number;
    /**
     * Supported resolutions as given in IIIF 'scaleFactors'
     */
    resolutions?: number[];
    /**
     * Size of the image [width, height].
     */
    size: number[];
    /**
     * Supported scaled image sizes.
     * Content of the IIIF info.json 'sizes' property, but as array of Size objects.
     */
    sizes?: number[][];
    /**
     * Source state.
     */
    state?: any;
    /**
     * Supported IIIF region and size calculation
     * features.
     */
    supports?: string[];
    /**
     * Tile pixel ratio.
     */
    tilePixelRatio?: number;
    /**
     * Tile size.
     * Same tile size is used for all zoom levels. If tile size is a number,
     * a square tile is assumed. If the IIIF image service supports arbitrary
     * tiling (sizeByH, sizeByW, sizeByWh or sizeByPct as well as regionByPx or regionByPct
     * are supported), the default tilesize is 256.
     */
    tileSize?: number | number[];
    /**
     * Transition.
     */
    transition?: number;
    /**
     * Base URL of the IIIF Image service.
     * This should be the same as the IIIF Image ID.
     */
    url?: string;
    /**
     * Service's IIIF Image API version.
     */
    version?: string;
    /**
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | ((arg0: number, arg1: number, arg2: number) => number);
};
/**
 * @classdesc
 * Layer source for IIIF Image API services.
 * @api
 */
declare class IIIF extends TileImage {
    /**
     * @param {Options} [opt_options] Tile source options. Use {@link import("../format/IIIFInfo.js").IIIFInfo}
     * to parse Image API service information responses into constructor options.
     * @api
     */
    constructor(opt_options?: Options | undefined);
}
import TileImage from "./TileImage.js";
//# sourceMappingURL=IIIF.d.ts.map