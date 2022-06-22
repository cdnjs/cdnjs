export default IIIFInfo;
/**
 * Enum representing the major IIIF Image API versions
 */
export type Versions = string;
export type PreferredOptions = {
    /**
     * Preferred image format. Will be used if the image information
     * indicates support for that format.
     */
    format?: string;
    /**
     * IIIF image qualitiy.  Will be used if the image information
     * indicates support for that quality.
     */
    quality?: string;
};
export type SupportedFeatures = {
    /**
     * Supported IIIF image size and region
     * calculation features.
     */
    supports?: Array<string>;
    /**
     * Supported image formats.
     */
    formats?: Array<string>;
    /**
     * Supported IIIF image qualities.
     */
    qualities?: Array<string>;
};
export type TileInfo = {
    /**
     * Supported resolution scaling factors.
     */
    scaleFactors: Array<number>;
    /**
     * Tile width in pixels.
     */
    width: number;
    /**
     * Tile height in pixels. Same as tile width if height is
     * not given.
     */
    height?: number;
};
export type IiifProfile = {
    /**
     * Supported image formats for the image service.
     */
    formats?: Array<string>;
    /**
     * Supported IIIF image qualities.
     */
    qualities?: Array<string>;
    /**
     * Supported features.
     */
    supports?: Array<string>;
    /**
     * Maximum area (pixels) available for this image service.
     */
    maxArea?: number;
    /**
     * Maximum height.
     */
    maxHeight?: number;
    /**
     * Maximum width.
     */
    maxWidth?: number;
};
export type ImageInformationResponse = {
    [x: string]: string | number | (string | number | IiifProfile)[] | {
        [x: string]: number;
    } | TileInfo;
};
/**
 * @classdesc
 * Format for transforming IIIF Image API image information responses into
 * IIIF tile source ready options
 *
 * @api
 */
declare class IIIFInfo {
    /**
     * @param {string|ImageInformationResponse} imageInfo
     * Deserialized image information JSON response object or JSON response as string
     */
    constructor(imageInfo: string | ImageInformationResponse);
    /**
     * @param {string|ImageInformationResponse} imageInfo
     * Deserialized image information JSON response object or JSON response as string
     * @api
     */
    setImageInfo(imageInfo: string | ImageInformationResponse): void;
    imageInfo: any;
    /**
     * @returns {Versions} Major IIIF version.
     * @api
     */
    getImageApiVersion(): Versions;
    /**
     * @param {Versions} version Optional IIIF image API version
     * @returns {string} Compliance level as it appears in the IIIF image information
     * response.
     */
    getComplianceLevelEntryFromProfile(version: Versions): string;
    /**
     * @param {Versions} version Optional IIIF image API version
     * @returns {string} Compliance level, on of 'level0', 'level1' or 'level2' or undefined
     */
    getComplianceLevelFromProfile(version: Versions): string;
    /**
     * @returns {SupportedFeatures} Image formats, qualities and region / size calculation
     * methods that are supported by the IIIF service.
     */
    getComplianceLevelSupportedFeatures(): SupportedFeatures;
    /**
     * @param {PreferredOptions=} opt_preferredOptions Optional options for preferred format and quality.
     * @returns {import("../source/IIIF.js").Options} IIIF tile source ready constructor options.
     * @api
     */
    getTileSourceOptions(opt_preferredOptions?: PreferredOptions | undefined): import("../source/IIIF.js").Options;
}
export namespace Versions {
    export const VERSION1: string;
    export const VERSION2: string;
    export const VERSION3: string;
}
//# sourceMappingURL=IIIFInfo.d.ts.map