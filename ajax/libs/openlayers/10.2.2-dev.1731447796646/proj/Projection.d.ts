export default Projection;
export type Options = {
    /**
     * The SRS identifier code, e.g. `EPSG:4326`.
     */
    code: string;
    /**
     * Units. Required unless a
     * proj4 projection is defined for `code`.
     */
    units?: import("./Units.js").Units | undefined;
    /**
     * The validity extent for the SRS.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * The axis orientation as specified in Proj4.
     */
    axisOrientation?: string | undefined;
    /**
     * Whether the projection is valid for the whole globe.
     */
    global?: boolean | undefined;
    /**
     * The meters per unit for the SRS.
     * If not provided, the `units` are used to get the meters per unit from the {@link METERS_PER_UNIT}lookup table.
     */
    metersPerUnit?: number | undefined;
    /**
     * The world extent for the SRS.
     */
    worldExtent?: import("../extent.js").Extent | undefined;
    /**
     * Function to determine resolution at a point. The function is called with a
     * `number` view resolution and a {@link module :ol/coordinate~Coordinate} as arguments, and returns
     * the `number` resolution in projection units at the passed coordinate. If this is `undefined`,
     * the default {@link module :ol/proj.getPointResolution} function will be used.
     */
    getPointResolution?: ((arg0: number, arg1: import("../coordinate.js").Coordinate) => number) | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} code The SRS identifier code, e.g. `EPSG:4326`.
 * @property {import("./Units.js").Units} [units] Units. Required unless a
 * proj4 projection is defined for `code`.
 * @property {import("../extent.js").Extent} [extent] The validity extent for the SRS.
 * @property {string} [axisOrientation='enu'] The axis orientation as specified in Proj4.
 * @property {boolean} [global=false] Whether the projection is valid for the whole globe.
 * @property {number} [metersPerUnit] The meters per unit for the SRS.
 * If not provided, the `units` are used to get the meters per unit from the {@link METERS_PER_UNIT}
 * lookup table.
 * @property {import("../extent.js").Extent} [worldExtent] The world extent for the SRS.
 * @property {function(number, import("../coordinate.js").Coordinate):number} [getPointResolution]
 * Function to determine resolution at a point. The function is called with a
 * `number` view resolution and a {@link module:ol/coordinate~Coordinate} as arguments, and returns
 * the `number` resolution in projection units at the passed coordinate. If this is `undefined`,
 * the default {@link module:ol/proj.getPointResolution} function will be used.
 */
/**
 * @classdesc
 * In most cases, you should not need to create instances of this class.
 * Instead, where projection information is required, you can use a string
 * projection code or identifier (e.g. `EPSG:4326`) instead of a projection
 * instance.
 *
 * The library includes support for transforming coordinates between the following
 * projections:
 *
 *  * WGS 84 / Geographic - Using codes `EPSG:4326`, `CRS:84`, `urn:ogc:def:crs:EPSG:6.6:4326`,
 *    `urn:ogc:def:crs:OGC:1.3:CRS84`, `urn:ogc:def:crs:OGC:2:84`, `http://www.opengis.net/gml/srs/epsg.xml#4326`,
 *    or `urn:x-ogc:def:crs:EPSG:4326`
 *  * WGS 84 / Spherical Mercator - Using codes `EPSG:3857`, `EPSG:102100`, `EPSG:102113`, `EPSG:900913`,
 *    `urn:ogc:def:crs:EPSG:6.18:3:3857`, or `http://www.opengis.net/gml/srs/epsg.xml#3857`
 *  * WGS 84 / UTM zones - Using codes `EPSG:32601` through `EPSG:32660` for northern zones
 *    and `EPSG:32701` through `EPSG:32760` for southern zones. Note that the built-in UTM transforms
 *    are lower accuracy (with errors on the order of 0.1 m) than those that you might get in a
 *    library like [proj4js](https://github.com/proj4js/proj4js).
 *
 * For additional projection support, or to use higher accuracy transforms than the built-in ones, you can use
 * the [proj4js](https://github.com/proj4js/proj4js) library. With `proj4js`, after adding any new projection
 * definitions, call the {@link module:ol/proj/proj4.register} function.
 *
 * You can use the {@link module:ol/proj.get} function to retrieve a projection instance
 * for one of the registered projections.
 *
 * @api
 */
declare class Projection {
    /**
     * @param {Options} options Projection options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {string}
     */
    private code_;
    /**
     * Units of projected coordinates. When set to `TILE_PIXELS`, a
     * `this.extent_` and `this.worldExtent_` must be configured properly for each
     * tile.
     * @private
     * @type {import("./Units.js").Units}
     */
    private units_;
    /**
     * Validity extent of the projection in projected coordinates. For projections
     * with `TILE_PIXELS` units, this is the extent of the tile in
     * tile pixel space.
     * @private
     * @type {import("../extent.js").Extent}
     */
    private extent_;
    /**
     * Extent of the world in EPSG:4326. For projections with
     * `TILE_PIXELS` units, this is the extent of the tile in
     * projected coordinate space.
     * @private
     * @type {import("../extent.js").Extent}
     */
    private worldExtent_;
    /**
     * @private
     * @type {string}
     */
    private axisOrientation_;
    /**
     * @private
     * @type {boolean}
     */
    private global_;
    /**
     * @private
     * @type {boolean}
     */
    private canWrapX_;
    /**
     * @private
     * @type {function(number, import("../coordinate.js").Coordinate):number|undefined}
     */
    private getPointResolutionFunc_;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */
    private defaultTileGrid_;
    /**
     * @private
     * @type {number|undefined}
     */
    private metersPerUnit_;
    /**
     * @return {boolean} The projection is suitable for wrapping the x-axis
     */
    canWrapX(): boolean;
    /**
     * Get the code for this projection, e.g. 'EPSG:4326'.
     * @return {string} Code.
     * @api
     */
    getCode(): string;
    /**
     * Get the validity extent for this projection.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getExtent(): import("../extent.js").Extent;
    /**
     * Get the units of this projection.
     * @return {import("./Units.js").Units} Units.
     * @api
     */
    getUnits(): import("./Units.js").Units;
    /**
     * Get the amount of meters per unit of this projection.  If the projection is
     * not configured with `metersPerUnit` or a units identifier, the return is
     * `undefined`.
     * @return {number|undefined} Meters.
     * @api
     */
    getMetersPerUnit(): number | undefined;
    /**
     * Get the world extent for this projection.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getWorldExtent(): import("../extent.js").Extent;
    /**
     * Get the axis orientation of this projection.
     * Example values are:
     * enu - the default easting, northing, elevation.
     * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
     *     or south orientated transverse mercator.
     * wnu - westing, northing, up - some planetary coordinate systems have
     *     "west positive" coordinate systems
     * @return {string} Axis orientation.
     * @api
     */
    getAxisOrientation(): string;
    /**
     * Is this projection a global projection which spans the whole world?
     * @return {boolean} Whether the projection is global.
     * @api
     */
    isGlobal(): boolean;
    /**
     * Set if the projection is a global projection which spans the whole world
     * @param {boolean} global Whether the projection is global.
     * @api
     */
    setGlobal(global: boolean): void;
    /**
     * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
     */
    getDefaultTileGrid(): import("../tilegrid/TileGrid.js").default;
    /**
     * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
     */
    setDefaultTileGrid(tileGrid: import("../tilegrid/TileGrid.js").default): void;
    /**
     * Set the validity extent for this projection.
     * @param {import("../extent.js").Extent} extent Extent.
     * @api
     */
    setExtent(extent: import("../extent.js").Extent): void;
    /**
     * Set the world extent for this projection.
     * @param {import("../extent.js").Extent} worldExtent World extent
     *     [minlon, minlat, maxlon, maxlat].
     * @api
     */
    setWorldExtent(worldExtent: import("../extent.js").Extent): void;
    /**
     * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
     * for this projection.
     * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
     * @api
     */
    setGetPointResolution(func: (arg0: number, arg1: import("../coordinate.js").Coordinate) => number): void;
    /**
     * Get the custom point resolution function for this projection (if set).
     * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
     * resolution function (if set).
     */
    getPointResolutionFunc(): (arg0: number, arg1: import("../coordinate.js").Coordinate) => number | undefined;
}
//# sourceMappingURL=Projection.d.ts.map