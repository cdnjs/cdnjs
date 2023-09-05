export default GeoTIFFSource;
export type SourceInfo = {
    /**
     * URL for the source GeoTIFF.
     */
    url?: string | undefined;
    /**
     * List of any overview URLs, only applies if the url parameter is given.
     */
    overviews?: string[] | undefined;
    /**
     * Blob containing the source GeoTIFF. `blob` and `url` are mutually exclusive.
     */
    blob?: Blob | undefined;
    /**
     * The minimum source data value.  Rendered values are scaled from 0 to 1 based on
     * the configured min and max.  If not provided and raster statistics are available, those will be used instead.
     * If neither are available, the minimum for the data type will be used.  To disable this behavior, set
     * the `normalize` option to `false` in the constructor.
     */
    min?: number | undefined;
    /**
     * The maximum source data value.  Rendered values are scaled from 0 to 1 based on
     * the configured min and max.  If not provided and raster statistics are available, those will be used instead.
     * If neither are available, the maximum for the data type will be used.  To disable this behavior, set
     * the `normalize` option to `false` in the constructor.
     */
    max?: number | undefined;
    /**
     * Values to discard (overriding any nodata values in the metadata).
     * When provided, an additional alpha band will be added to the data.  Often the GeoTIFF metadata
     * will include information about nodata values, so you should only need to set this property if
     * you find that it is not already extracted from the metadata.
     */
    nodata?: number | undefined;
    /**
     * Band numbers to be read from (where the first band is `1`). If not provided, all bands will
     * be read. For example, if a GeoTIFF has blue (1), green (2), red (3), and near-infrared (4) bands, and you only need the
     * near-infrared band, configure `bands: [4]`.
     */
    bands?: number[] | undefined;
};
export type GeoKeys = {
    /**
     * Model type.
     */
    GTModelTypeGeoKey: number;
    /**
     * Raster type.
     */
    GTRasterTypeGeoKey: number;
    /**
     * Angular units.
     */
    GeogAngularUnitsGeoKey: number;
    /**
     * Inverse flattening.
     */
    GeogInvFlatteningGeoKey: number;
    /**
     * Semi-major axis.
     */
    GeogSemiMajorAxisGeoKey: number;
    /**
     * Geographic coordinate system code.
     */
    GeographicTypeGeoKey: number;
    /**
     * Projected linear unit code.
     */
    ProjLinearUnitsGeoKey: number;
    /**
     * Projected coordinate system code.
     */
    ProjectedCSTypeGeoKey: number;
};
export type GeoTIFF = import("geotiff").GeoTIFF;
export type MultiGeoTIFF = import("geotiff").MultiGeoTIFF;
export type GDALMetadata = {
    /**
     * The minimum value (as a string).
     */
    STATISTICS_MINIMUM: string;
    /**
     * The maximum value (as a string).
     */
    STATISTICS_MAXIMUM: string;
};
export type GeoTIFFImage = import("geotiff").GeoTIFFImage;
export type GeoTIFFSourceOptions = {
    /**
     * Whether to force the usage of the browsers XMLHttpRequest API.
     */
    forceXHR?: boolean | undefined;
    /**
     * additional key-value pairs of headers to be passed with each request. Key is the header name, value the header value.
     */
    headers?: {
        [x: string]: string;
    } | undefined;
    /**
     * How credentials shall be handled. See
     * https://developer.mozilla.org/en-US/docs/Web/API/fetch for reference and possible values
     */
    credentials?: string | undefined;
    /**
     * The maximum amount of ranges to request in a single multi-range request.
     * By default only a single range is used.
     */
    maxRanges?: number | undefined;
    /**
     * Whether or not a full file is accepted when only a portion is
     * requested. Only use this when you know the source image to be small enough to fit in memory.
     */
    allowFullFile?: boolean | undefined;
    /**
     * The block size to use.
     */
    blockSize?: number | undefined;
    /**
     * The number of blocks that shall be held in a LRU cache.
     */
    cacheSize?: number | undefined;
};
export type Options = {
    /**
     * List of information about GeoTIFF sources.
     * Multiple sources can be combined when their resolution sets are equal after applying a scale.
     * The list of sources defines a mapping between input bands as they are read from each GeoTIFF and
     * the output bands that are provided by data tiles. To control which bands to read from each GeoTIFF,
     * use the {@link import ("./GeoTIFF.js").SourceInfo bands} property. If, for example, you specify two
     * sources, one with 3 bands and {@link import ("./GeoTIFF.js").SourceInfo nodata} configured, and
     * another with 1 band, the resulting data tiles will have 5 bands: 3 from the first source, 1 alpha
     * band from the first source, and 1 band from the second source.
     */
    sources: Array<SourceInfo>;
    /**
     * Additional options to be passed to [geotiff.js](https://geotiffjs.github.io/geotiff.js/module-geotiff.html)'s `fromUrl` or `fromUrls` methods.
     */
    sourceOptions?: GeoTIFFSourceOptions | undefined;
    /**
     * By default, bands from the sources are read as-is. When
     * reading GeoTIFFs with the purpose of displaying them as RGB images, setting this to `true` will
     * convert other color spaces (YCbCr, CMYK) to RGB.  Setting the option to `'auto'` will make it so CMYK, YCbCr,
     * CIELab, and ICCLab images will automatically be converted to RGB.
     */
    convertToRGB?: boolean | "auto" | undefined;
    /**
     * By default, the source data is normalized to values between
     * 0 and 1 with scaling factors based on the raster statistics or `min` and `max` properties of each source.
     * If instead you want to work with the raw values in a style expression, set this to `false`.  Setting this option
     * to `false` will make it so any `min` and `max` properties on sources are ignored.
     */
    normalize?: boolean | undefined;
    /**
     * Whether the layer is opaque.
     */
    opaque?: boolean | undefined;
    /**
     * Source projection.  If not provided, the GeoTIFF metadata
     * will be read for projection information.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number | undefined;
    /**
     * Render tiles beyond the tile grid extent.
     */
    wrapX?: boolean | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * the linear interpolation is used to resample the data.  If false, nearest neighbor is used.
     */
    interpolate?: boolean | undefined;
};
/**
 * @typedef {Object} GeoTIFFSourceOptions
 * @property {boolean} [forceXHR=false] Whether to force the usage of the browsers XMLHttpRequest API.
 * @property {Object<string, string>} [headers] additional key-value pairs of headers to be passed with each request. Key is the header name, value the header value.
 * @property {string} [credentials] How credentials shall be handled. See
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch for reference and possible values
 * @property {number} [maxRanges] The maximum amount of ranges to request in a single multi-range request.
 * By default only a single range is used.
 * @property {boolean} [allowFullFile=false] Whether or not a full file is accepted when only a portion is
 * requested. Only use this when you know the source image to be small enough to fit in memory.
 * @property {number} [blockSize=65536] The block size to use.
 * @property {number} [cacheSize=100] The number of blocks that shall be held in a LRU cache.
 */
/**
 * @typedef {Object} Options
 * @property {Array<SourceInfo>} sources List of information about GeoTIFF sources.
 * Multiple sources can be combined when their resolution sets are equal after applying a scale.
 * The list of sources defines a mapping between input bands as they are read from each GeoTIFF and
 * the output bands that are provided by data tiles. To control which bands to read from each GeoTIFF,
 * use the {@link import("./GeoTIFF.js").SourceInfo bands} property. If, for example, you specify two
 * sources, one with 3 bands and {@link import("./GeoTIFF.js").SourceInfo nodata} configured, and
 * another with 1 band, the resulting data tiles will have 5 bands: 3 from the first source, 1 alpha
 * band from the first source, and 1 band from the second source.
 * @property {GeoTIFFSourceOptions} [sourceOptions] Additional options to be passed to [geotiff.js](https://geotiffjs.github.io/geotiff.js/module-geotiff.html)'s `fromUrl` or `fromUrls` methods.
 * @property {true|false|'auto'} [convertToRGB=false] By default, bands from the sources are read as-is. When
 * reading GeoTIFFs with the purpose of displaying them as RGB images, setting this to `true` will
 * convert other color spaces (YCbCr, CMYK) to RGB.  Setting the option to `'auto'` will make it so CMYK, YCbCr,
 * CIELab, and ICCLab images will automatically be converted to RGB.
 * @property {boolean} [normalize=true] By default, the source data is normalized to values between
 * 0 and 1 with scaling factors based on the raster statistics or `min` and `max` properties of each source.
 * If instead you want to work with the raw values in a style expression, set this to `false`.  Setting this option
 * to `false` will make it so any `min` and `max` properties on sources are ignored.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection] Source projection.  If not provided, the GeoTIFF metadata
 * will be read for projection information.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {boolean} [wrapX=false] Render tiles beyond the tile grid extent.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * the linear interpolation is used to resample the data.  If false, nearest neighbor is used.
 */
/**
 * @classdesc
 * A source for working with GeoTIFF data.
 * **Note for users of the full build**: The `GeoTIFF` source requires the
 * [geotiff.js](https://github.com/geotiffjs/geotiff.js) library to be loaded as well.
 *
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
     * @type {Object}
     * @private
     */
    private sourceOptions_;
    /**
     * @type {Array<Array<GeoTIFFImage>>}
     * @private
     */
    private sourceImagery_;
    /**
     * @type {Array<Array<GeoTIFFImage>>}
     * @private
     */
    private sourceMasks_;
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
     * @type {Array<Array<GDALMetadata>>}
     * @private
     */
    private metadata_;
    /**
     * @type {boolean}
     * @private
     */
    private normalize_;
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
     * @type {true|false|'auto'}
     */
    convertToRGB_: true | false | 'auto';
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
     * Determine the projection of the images in this GeoTIFF.
     * The default implementation looks at the ProjectedCSTypeGeoKey and the GeographicTypeGeoKey
     * of each image in turn.
     * You can override this method in a subclass to support more projections.
     *
     * @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
     * from a single GeoTIFF.
     */
    determineProjection(sources: Array<Array<GeoTIFFImage>>): void;
    /**
     * Configure the tile grid based on images within the source GeoTIFFs.  Each GeoTIFF
     * must have the same internal tiled structure.
     * @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
     * from a single GeoTIFF.
     * @private
     */
    private configure_;
    /**
     * @param {number} z The z tile index.
     * @param {number} x The x tile index.
     * @param {number} y The y tile index.
     * @return {Promise} The composed tile data.
     * @private
     */
    private loadTile_;
    /**
     * @param {import("../size.js").Size} sourceTileSize The source tile size.
     * @param {Array} sourceSamples The source samples.
     * @return {import("../DataTile.js").Data} The composed tile data.
     * @private
     */
    private composeTile_;
}
import DataTile from './DataTile.js';
//# sourceMappingURL=GeoTIFF.d.ts.map