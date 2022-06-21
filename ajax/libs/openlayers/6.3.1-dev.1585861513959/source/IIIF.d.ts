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
    cacheSize?: number;
    crossOrigin?: string;
    extent?: number[];
    /**
     * Requested image format.
     */
    format?: string;
    projection?: string | import("../proj/Projection.js").default;
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
    tilePixelRatio?: number;
    /**
     * Tile size.
     * Same tile size is used for all zoom levels. If tile size is a number,
     * a square tile is assumed. If the IIIF image service supports arbitrary
     * tiling (sizeByH, sizeByW, sizeByWh or sizeByPct as well as regionByPx or regionByPct
     * are supported), the default tilesize is 256.
     */
    tileSize?: number | number[];
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
     * Indicate which resolution should be used
     * by a renderer if the view resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     */
    zDirection?: number;
};
/**
 * @classdesc
 * Layer source for IIIF Image API services.
 * @api
 */
declare class IIIF extends TileImage {
    /**
     * @param {Options=} opt_options Tile source options. Use {@link import("../format/IIIFInfo.js").IIIFInfo}
     * to parse Image API service information responses into constructor options.
     * @api
     */
    constructor(opt_options?: Options);
}
import TileImage from "./TileImage.js";
//# sourceMappingURL=IIIF.d.ts.map