/**
 * @param {string} token The access token to parse.
 * @return {AccessTokenClaims} The parsed token claims.
 */
export function parseTokenClaims(token: string): AccessTokenClaims;
/**
 * Gets a CRS identifier accepted by Sentinel Hub.
 * See https://docs.sentinel-hub.com/api/latest/api/process/crs/.
 *
 * @param {import("../proj/Projection.js").default} projection The projection.
 * @return {string} The projection identifier accepted by Sentinel Hub.
 */
export function getProjectionIdentifier(projection: import("../proj/Projection.js").default): string;
/**
 * This is intended to work with named functions, anonymous functions, arrow functions, and object methods.
 * Due to how the Evalscript is executed, these are serialized as function expressions using `var`.
 *
 * @param {string} name The name of the function.
 * @param {Function|undefined} func The function to serialize.
 * @return {string} The serialized function.
 */
export function serializeFunction(name: string, func: Function | undefined): string;
export default SentinelHub;
export type AuthConfig = {
    /**
     * The URL to get the authentication token.
     */
    tokenUrl?: string | undefined;
    /**
     * The client ID.
     */
    clientId: string;
    /**
     * The client secret.
     */
    clientSecret: string;
};
export type AccessTokenClaims = {
    /**
     * The expiration time of the token (in seconds).
     */
    exp: number;
};
export type Evalscript = {
    /**
     * The setup function.
     */
    setup: Setup;
    /**
     * The function to transform input samples into output values.
     */
    evaluatePixel: EvaluatePixel;
    /**
     * Optional function to adjust the output bands.
     */
    updateOutput?: UpdateOutput | undefined;
    /**
     * Optional function to update the output metadata.
     */
    updateOutputMetadata?: UpdateOutputMetadata | undefined;
    /**
     * Optional function called before processing.
     */
    preProcessScenes?: Collections | undefined;
    /**
     * The Evalscript version.
     */
    version?: string | undefined;
};
export type Setup = () => SetupResult;
export type EvaluatePixel = (arg0: Sample | Array<Sample>, arg1: Scenes, arg2: InputMetadata, arg3: CustomData, arg4: OutputMetadata) => OutputValues | Array<number> | void;
export type UpdateOutput = (arg0: {
    [x: string]: UpdatedOutputDescription;
}) => void;
export type UpdateOutputMetadata = (arg0: Scenes, arg1: InputMetadata, arg2: OutputMetadata) => void;
export type SetupResult = {
    /**
     * Description of the input data.
     */
    input: Array<string> | Array<InputDescription>;
    /**
     * Description of the output data.
     */
    output: OutputDescription | Array<OutputDescription>;
    /**
     * Control how samples from input scenes are composed.
     */
    mosaicking?: "SIMPLE" | "ORBIT" | "TILE" | undefined;
};
export type InputDescription = {
    /**
     * Input band identifiers.
     */
    bands: Array<string>;
    /**
     * Input band units.
     */
    units?: string | string[] | undefined;
    /**
     * Properties to include in the input metadata.
     */
    metadata?: string[] | undefined;
};
export type OutputDescription = {
    /**
     * Output identifier.
     */
    id?: string | undefined;
    /**
     * Number of output bands.
     */
    bands: number;
    /**
     * Output sample type.
     */
    sampleType?: SampleType | undefined;
    /**
     * Output nodata value.
     */
    nodataValue?: number | undefined;
};
export type UpdatedOutputDescription = {
    /**
     * Number of output bands.
     */
    bands: number;
};
export type SampleType = "INT8" | "UINT8" | "INT16" | "UINT16" | "FLOAT32" | "AUTO";
export type Sample = {
    [x: string]: number;
};
export type Collections = {
    /**
     * For 'ORBIT' mosaicking, this will be the start of the search interval.
     */
    from?: string | undefined;
    /**
     * For 'ORBIT' mosaicking, this will be the end of the search interval.
     */
    to?: string | undefined;
    /**
     * The scenes in the collection.
     */
    scenes: Scenes;
};
export type Scenes = {
    /**
     * Information about scenes included in the tile when 'mosaicking' is 'ORBIT'.
     */
    orbit?: Orbit[] | undefined;
    /**
     * Information about scenes included in the tile when 'mosaicking' is 'TILE'.
     */
    tiles?: Tile[] | undefined;
};
export type Orbit = {
    /**
     * The earliest date for all scenes included in the tile.
     */
    dateFrom: string;
    /**
     * The latest date for scenes included in the tile.
     */
    dateTo: string;
    /**
     * Metadata for each tile.
     */
    tiles: any[];
};
export type Tile = {
    /**
     * The date of scene used in the tile.
     */
    date: string;
    /**
     * The estimated percentage of pixels obscured by clouds in the scene.
     */
    cloudCoverage: number;
    /**
     * The path to the data in storage.
     */
    dataPath: string;
    /**
     * The internal identifier for the scene.
     */
    shId: number;
};
export type InputMetadata = {
    /**
     * The version of the service used for processing.
     */
    serviceVersion: string;
    /**
     * The factor used to convert digital number (DN) values to reflectance.
     */
    normalizationFactor: number;
};
export type CustomData = {
    [x: string]: unknown;
};
export type OutputMetadata = {
    /**
     * Arbitrary user data.
     */
    userData: any;
};
export type OutputValues = {
    [x: string]: number[];
};
export type ProcessRequest = {
    /**
     * Input data configuration.
     */
    input: ProcessRequestInput;
    /**
     * The Evalscript used for processing.
     */
    evalscript: string;
    /**
     * The output configuration.
     */
    output?: ProcessRequestOutput | undefined;
};
export type ProcessRequestInput = {
    /**
     * The bounding box of the input data.
     */
    bounds: ProcessRequestInputBounds;
    /**
     * The intput data.
     */
    data: Array<ProcessRequestInputDataItem>;
};
export type ProcessRequestInputDataItem = {
    /**
     * The type of the input data.
     */
    type?: string | undefined;
    /**
     * The identifier of the input data.
     */
    id?: string | undefined;
    /**
     * The filter to apply to the input data.
     */
    dataFilter?: DataFilter | undefined;
    /**
     * The processing to apply to the input data.
     */
    processing?: {
        [x: string]: unknown;
    } | undefined;
};
export type DataFilter = {
    /**
     * The data time range.
     */
    timeRange?: TimeRange | undefined;
    /**
     * The maximum cloud coverage (0-100).
     */
    maxCloudCoverage?: number | undefined;
};
export type TimeRange = {
    /**
     * The start time (inclusive).
     */
    from?: string | undefined;
    /**
     * The end time (inclusive).
     */
    to?: string | undefined;
};
export type ProcessRequestInputBounds = {
    /**
     * The bounding box of the input data.
     */
    bbox?: number[] | undefined;
    /**
     * The properties of the bounding box.
     */
    properties?: ProcessRequestInputBoundsProperties | undefined;
    /**
     * The geometry of the bounding box.
     */
    geometry?: import("geojson").Geometry | undefined;
};
export type ProcessRequestInputBoundsProperties = {
    /**
     * The coordinate reference system of the bounding box.
     */
    crs: string;
};
export type ProcessRequestOutput = {
    /**
     * Image width in pixels.
     */
    width?: number | undefined;
    /**
     * Image height in pixels.
     */
    height?: number | undefined;
    /**
     * Spatial resolution in the x direction.
     */
    resx?: number | undefined;
    /**
     * Spatial resolution in the y direction.
     */
    resy?: number | undefined;
    /**
     * Response configuration.
     */
    responses?: ProcessRequestOutputResponse[] | undefined;
};
export type ProcessRequestOutputResponse = {
    /**
     * Identifier used to connect results to outputs from the setup.
     */
    identifier?: string | undefined;
    /**
     * Response format.
     */
    format?: ProcessRequestOutputFormat | undefined;
};
export type ProcessRequestOutputFormat = {
    /**
     * The output format type.
     */
    type?: string | undefined;
};
export type Options = {
    /**
     * The authentication configuration with `clientId` and `clientSecret` or an access token.
     * See [Sentinel Hub authentication](https://docs.sentinel-hub.com/api/latest/api/overview/authentication/)
     * for details.  If not provided in the constructor, the source will not be rendered until {@link module :ol/source/SentinelHub~SentinelHub#setAuth}is called.
     */
    auth?: string | AuthConfig | undefined;
    /**
     * The input data configuration.  If not provided in the constructor,
     * the source will not be rendered until {@link module :ol/source/SentinelHub~SentinelHub#setData} is called.
     */
    data?: ProcessRequestInputDataItem[] | undefined;
    /**
     * The process applied to the input data.  If not provided in the constructor,
     * the source will not be rendered until {@link module :ol/source/SentinelHub~SentinelHub#setEvalscript} is called.  See the
     * `setEvalscript` documentation for details on the restrictions when passing process functions.
     */
    evalscript?: string | Evalscript | undefined;
    /**
     * The pixel width and height of the source tiles.
     */
    tileSize?: number | import("../size.js").Size | undefined;
    /**
     * The Sentinel Hub Processing API URL.
     */
    url?: string | undefined;
    /**
     * Projection. Default is the view projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Allow the attributions to be collapsed.
     */
    attributionsCollapsible?: boolean | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
    /**
     * Wrap the world horizontally.
     */
    wrapX?: boolean | undefined;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {AuthConfig|string} [auth] The authentication configuration with `clientId` and `clientSecret` or an access token.
 * See [Sentinel Hub authentication](https://docs.sentinel-hub.com/api/latest/api/overview/authentication/)
 * for details.  If not provided in the constructor, the source will not be rendered until {@link module:ol/source/SentinelHub~SentinelHub#setAuth}
 * is called.
 * @property {Array<ProcessRequestInputDataItem>} [data] The input data configuration.  If not provided in the constructor,
 * the source will not be rendered until {@link module:ol/source/SentinelHub~SentinelHub#setData} is called.
 * @property {Evalscript|string} [evalscript] The process applied to the input data.  If not provided in the constructor,
 * the source will not be rendered until {@link module:ol/source/SentinelHub~SentinelHub#setEvalscript} is called.  See the
 * `setEvalscript` documentation for details on the restrictions when passing process functions.
 * @property {number|import("../size.js").Size} [tileSize=[512, 512]] The pixel width and height of the source tiles.
 * @property {string} [url='https://services.sentinel-hub.com/api/v1/process'] The Sentinel Hub Processing API URL.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {boolean} [attributionsCollapsible=true] Allow the attributions to be collapsed.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {boolean} [wrapX=true] Wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 */
/**
 * @classdesc
 * A tile source that generates tiles using the Sentinel Hub [Processing API](https://docs.sentinel-hub.com/api/latest/api/process/).
 * All of the constructor options are optional, however the source will not be ready for rendering until the `auth`, `data`,
 * and `evalscript` properties are provided.  These can be set after construction with the {@link module:ol/source/SentinelHub~SentinelHub#setAuth},
 * {@link module:ol/source/SentinelHub~SentinelHub#setData}, and {@link module:ol/source/SentinelHub~SentinelHub#setEvalscript}
 * methods.
 *
 * If there are errors while configuring the source or fetching an access token, the `change` event will be fired and the
 * source state will be set to `error`.  See the {@link module:ol/source/SentinelHub~SentinelHub#getError} method for
 * details on handling these errors.
 * @api
 */
declare class SentinelHub extends DataTileSource<import("../DataTile.js").default> {
    /**
     * @param {Options} [options] Sentinel Hub options.
     */
    constructor(options?: Options);
    /**
     * @type {Error|null}
     */
    error_: Error | null;
    /**
     * @type {string}
     * @private
     */
    private evalscript_;
    /**
     * @type {Array<ProcessRequestInputDataItem>|null}
     * @private
     */
    private inputData_;
    /**
     * @type {string}
     * @private
     */
    private processUrl_;
    /**
     * @type {string}
     * @private
     */
    private token_;
    /**
     * @type {ReturnType<typeof setTimeout>}
     * @private
     */
    private tokenRenewalId_;
    /**
     * Set the authentication configuration for the source (if not provided in the constructor).
     * If an object with `clientId` and `clientSecret` is provided, an access token will be fetched
     * and used with processing requests.  Alternatively, an access token can be supplied directly.
     *
     * @param {AuthConfig|string} auth The auth config or access token.
     * @api
     */
    setAuth(auth: AuthConfig | string): Promise<void>;
    /**
     * Set or update the input data used.
     *
     * @param {Array<ProcessRequestInputDataItem>} data The input data configuration.
     * @api
     */
    setData(data: Array<ProcessRequestInputDataItem>): void;
    /**
     * Set or update the Evalscript used to process the data.  Either a process object or a string
     * Evalscript can be provided.  If a process object is provided, it will be serialized to produce the
     * Evalscript string.  Because these functions will be serialized and executed by the Processing API,
     * they cannot refer to other variables or functions that are not provided by the Processing API
     * context.
     *
     * @param {Evalscript|string} evalscript The process to apply to the input data.
     * @api
     */
    setEvalscript(evalscript: Evalscript | string): void;
    fireWhenReady_(): void;
    /**
     * @param {number} z The z tile index.
     * @param {number} x The x tile index.
     * @param {number} y The y tile index.
     * @param {number} attempt The attempt number (starting with 1).  Incremented with retries.
     * @return {Promise<import('../DataTile.js').Data>} The composed tile data.
     * @private
     */
    private loadTile_;
    /**
     * When the source state is `error`, use this function to get more information about the error.
     * To debug a faulty configuration, you may want to use a listener like this:
     * ```js
     * source.on('change', () => {
     *   if (source.getState() === 'error') {
     *     console.error(source.getError());
     *   }
     * });
     * ```
     *
     * @return {Error|null} A source loading error.
     * @api
     */
    getError(): Error | null;
}
import DataTileSource from './DataTile.js';
//# sourceMappingURL=SentinelHub.d.ts.map