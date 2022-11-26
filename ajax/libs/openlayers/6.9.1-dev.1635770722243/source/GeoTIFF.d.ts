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
     * Values to discard (overriding any nodata values in the metadata).
     * When provided, an additional alpha band will be added to the data.  Often the GeoTIFF metadata
     * will include information about nodata values, so you should only need to set this property if
     * you find that it is not already extracted from the metadata.
     */
    nodata?: number;
    /**
     * Band numbers to be read from (where the first band is `1`). If not provided, all bands will
     * be read. For example, if a GeoTIFF has blue (1), green (2), red (3), and near-infrared (4) bands, and you only need the
     * near-infrared band, configure `bands: [4]`.
     */
    bands?: number[];
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
export type GeoTIFF = {
    /**
     * Get the number of internal subfile images.
     */
    getImageCount: () => Promise<number>;
    /**
     * Get the image at the specified index.
     */
    getImage: (arg0: number) => Promise<GeoTIFFImage>;
};
export type MultiGeoTIFF = {
    /**
     * Get the number of internal subfile images.
     */
    getImageCount: () => Promise<number>;
    /**
     * Get the image at the specified index.
     */
    getImage: (arg0: number) => Promise<GeoTIFFImage>;
};
export type GeoTIFFImage = {
    /**
     * The file directory.
     */
    fileDirectory: any;
    /**
     * The parsed geo-keys.
     */
    geoKeys: GeoKeys;
    /**
     * Uses little endian byte order.
     */
    littleEndian: boolean;
    /**
     * The tile cache.
     */
    tiles: any;
    /**
     * The image is tiled.
     */
    isTiled: boolean;
    /**
     * Get the image bounding box.
     */
    getBoundingBox: () => number[];
    /**
     * Get the image origin.
     */
    getOrigin: () => number[];
    /**
     * Get the image resolution.
     */
    getResolution: (arg0: GeoTIFFImage) => number[];
    /**
     * Get the pixel width of the image.
     */
    getWidth: () => number;
    /**
     * Get the pixel height of the image.
     */
    getHeight: () => number;
    /**
     * Get the pixel width of image tiles.
     */
    getTileWidth: () => number;
    /**
     * Get the pixel height of image tiles.
     */
    getTileHeight: () => number;
    /**
     * Get the nodata value (or null if none).
     */
    getGDALNoData: () => number | null;
    /**
     * Get the number of samples per pixel.
     */
    getSamplesPerPixel: () => number;
};
export type Options = {
    /**
     * List of information about GeoTIFF sources.
     * Multiple sources can be combined when their resolution sets are equal after applying a scale.
     * The list of sources defines a mapping between input bands as they are read from each GeoTIFF and
     * the output bands that are provided by data tiles. To control which bands to read from each GeoTIFF,
     * use the {@link import("./GeoTIFF.js").SourceInfo bands} property. If, for example, you specify two
     * sources, one with 3 bands and {@link import("./GeoTIFF.js").SourceInfo nodata} configured, and
     * another with 1 band, the resulting data tiles will have 5 bands: 3 from the first source, 1 alpha
     * band from the first source, and 1 band from the second source.
     */
    sources: SourceInfo[];
    /**
     * By default, bands from the sources are read as-is. When
     * reading GeoTIFFs with the purpose of displaying them as RGB images, setting this to `true` will
     * convert other color spaces (YCbCr, CMYK) to RGB.
     */
    convertToRGB?: boolean;
    /**
     * By default, the source data is normalized to values between
     * 0 and 1 with scaling factors based on the `min` and `max` properties of each source.  If instead
     * you want to work with the raw values in a style expression, set this to `false`.  Setting this option
     * to `false` will make it so any `min` and `max` properties on sources are ignored.
     */
    normalize?: boolean;
    /**
     * Whether the layer is opaque.
     */
    opaque?: boolean;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number;
};
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
 * @property {boolean} [convertToRGB = false] By default, bands from the sources are read as-is. When
 * reading GeoTIFFs with the purpose of displaying them as RGB images, setting this to `true` will
 * convert other color spaces (YCbCr, CMYK) to RGB.
 * @property {boolean} [normalize=true] By default, the source data is normalized to values between
 * 0 and 1 with scaling factors based on the `min` and `max` properties of each source.  If instead
 * you want to work with the raw values in a style expression, set this to `false`.  Setting this option
 * to `false` will make it so any `min` and `max` properties on sources are ignored.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
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
     * @type {Array<Array<GeoTIFFImage>>}
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
     * @type {'readRasters' | 'readRGB'}
     */
    readMethod_: 'readRasters' | 'readRGB';
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
     * @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
     * from a single GeoTIFF.
     * @private
     */
    private configure_;
    loadTile_(z: any, x: any, y: any): Promise<Uint8Array | Float32Array>;
}
import DataTile from "./DataTile.js";
//# sourceMappingURL=GeoTIFF.d.ts.map