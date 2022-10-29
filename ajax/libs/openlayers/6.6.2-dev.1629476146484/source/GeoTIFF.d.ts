export default GeoTIFFSource;
export type SourceInfo = {
    /**
     * URL for the source GeoTIFF.
     */
    url: string;
    /**
     * List of any overview URLs.
     */
    overviews?: string[];
    /**
     * The minimum source data value.  Rendered values are scaled from 0 to 1 based on
     * the configured min and max.
     */
    min?: number;
    /**
     * The maximum source data value.  Rendered values are scaled from 0 to 1 based on
     * the configured min and max.
     */
    max?: number;
    /**
     * Values to discard. When provided, an additional band (alpha) will be added
     * to the data.
     */
    nodata?: number;
    /**
     * Indices of the bands to be read from. If not provided, all bands will
     * be read. If, for example, a GeoTIFF has red, green, blue and near-infrared bands and you only need the
     * infrared band, configure `bands: [3]`.
     */
    bands?: number[];
};
export type Options = {
    /**
     * List of information about GeoTIFF sources.
     * Multiple sources can be combined when their resolution sets are equal after applying a scale.
     * The list of sources defines a mapping between input bands as they are read from each GeoTIFF, and
     * the output bands that are provided by data tiles. To control which bands to read from each GeoTIFF,
     * use the {@link import("./GeoTIFF.js").SourceInfo bands} property. If, for example, you spedify two
     * sources, one with 3 bands and {@link import("./GeoTIFF.js").SourceInfo nodata} configured, and
     * another with 1 band, the resulting data tiles will have 5 bands: 3 from the first source, 1 alpha
     * band from the first source, and 1 band from the second source.
     */
    sources: SourceInfo[];
};
/**
 * @typedef {Object} Options
 * @property {Array<SourceInfo>} sources List of information about GeoTIFF sources.
 * Multiple sources can be combined when their resolution sets are equal after applying a scale.
 * The list of sources defines a mapping between input bands as they are read from each GeoTIFF, and
 * the output bands that are provided by data tiles. To control which bands to read from each GeoTIFF,
 * use the {@link import("./GeoTIFF.js").SourceInfo bands} property. If, for example, you spedify two
 * sources, one with 3 bands and {@link import("./GeoTIFF.js").SourceInfo nodata} configured, and
 * another with 1 band, the resulting data tiles will have 5 bands: 3 from the first source, 1 alpha
 * band from the first source, and 1 band from the second source.
 */
/**
 * @classdesc
 * A source for working with GeoTIFF data.
 * @api
 */
declare class GeoTIFFSource extends DataTile {
    /**
     * @param {Options} options Data tile options.
     */
    constructor(options: Options);
    /**
     * @type {Array<SourceInfo>}
     * @private
     */
    private sourceInfo_;
    /**
     * @type {Array<Array<import("geotiff/src/geotiffimage.js").GeoTIFFImage>>}
     * @private
     */
    private sourceImagery_;
    /**
     * @type {Array<number>}
     * @private
     */
    private resolutionFactors_;
    /**
     * @type {Array<number>}
     * @private
     */
    private samplesPerPixel_;
    /**
     * @type {Array<Array<number>>}
     * @private
     */
    private nodataValues_;
    /**
     * @type {boolean}
     * @private
     */
    private addAlpha_;
    /**
     * @type {Error}
     * @private
     */
    private error_;
    /**
     * @return {Error} A source loading error. When the source state is `error`, use this function
     * to get more information about the error. To debug a faulty configuration, you may want to use
     * a listener like
     * ```js
     * geotiffSource.on('change', () => {
     *   if (geotiffSource.getState() === 'error') {
     *     console.error(geotiffSource.getError());
     *   }
     * });
     * ```
     */
    getError(): Error;
    /**
     * Configure the tile grid based on images within the source GeoTIFFs.  Each GeoTIFF
     * must have the same internal tiled structure.
     * @param {Array<Array<import("geotiff/src/geotiffimage.js").GeoTIFFImage>>} sources Each source is a list of images
     * from a single GeoTIFF.
     * @private
     */
    private configure_;
    loadTile_(z: any, x: any, y: any): Promise<Uint8ClampedArray>;
}
import DataTile from "./DataTile.js";
//# sourceMappingURL=GeoTIFF.d.ts.map