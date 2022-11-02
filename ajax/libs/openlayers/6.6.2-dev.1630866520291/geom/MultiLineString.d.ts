export default MultiLineString;
/**
 * @classdesc
 * Multi-linestring geometry.
 *
 * @api
 */
declare class MultiLineString extends SimpleGeometry {
    /**
     * @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
     *     Coordinates or LineString geometries. (For internal use, flat coordinates in
     *     combination with `opt_layout` and `opt_ends` are also accepted.)
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     * @param {Array<number>} [opt_ends] Flat coordinate ends for internal use.
     */
    constructor(coordinates: number[] | (number[][] | LineString)[], opt_layout?: any, opt_ends?: number[] | undefined);
    /**
     * @type {Array<number>}
     * @private
     */
    private ends_;
    /**
     * @private
     * @type {number}
     */
    private maxDelta_;
    /**
     * @private
     * @type {number}
     */
    private maxDeltaRevision_;
    /**
     * Append the passed linestring to the multilinestring.
     * @param {LineString} lineString LineString.
     * @api
     */
    appendLineString(lineString: LineString): void;
    /**
     * Make a complete copy of the geometry.
     * @return {!MultiLineString} Clone.
     * @api
     */
    clone(): MultiLineString;
    /**
     * Returns the coordinate at `m` using linear interpolation, or `null` if no
     * such coordinate exists.
     *
     * `opt_extrapolate` controls extrapolation beyond the range of Ms in the
     * MultiLineString. If `opt_extrapolate` is `true` then Ms less than the first
     * M will return the first coordinate and Ms greater than the last M will
     * return the last coordinate.
     *
     * `opt_interpolate` controls interpolation between consecutive LineStrings
     * within the MultiLineString. If `opt_interpolate` is `true` the coordinates
     * will be linearly interpolated between the last coordinate of one LineString
     * and the first coordinate of the next LineString.  If `opt_interpolate` is
     * `false` then the function will return `null` for Ms falling between
     * LineStrings.
     *
     * @param {number} m M.
     * @param {boolean} [opt_extrapolate] Extrapolate. Default is `false`.
     * @param {boolean} [opt_interpolate] Interpolate. Default is `false`.
     * @return {import("../coordinate.js").Coordinate} Coordinate.
     * @api
     */
    getCoordinateAtM(m: number, opt_extrapolate?: boolean | undefined, opt_interpolate?: boolean | undefined): number[];
    /**
     * Return the coordinates of the multilinestring.
     * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
     * @api
     */
    getCoordinates(): number[][][];
    /**
     * @return {Array<number>} Ends.
     */
    getEnds(): number[];
    /**
     * Return the linestring at the specified index.
     * @param {number} index Index.
     * @return {LineString} LineString.
     * @api
     */
    getLineString(index: number): LineString;
    /**
     * Return the linestrings of this multilinestring.
     * @return {Array<LineString>} LineStrings.
     * @api
     */
    getLineStrings(): LineString[];
    /**
     * @return {Array<number>} Flat midpoints.
     */
    getFlatMidpoints(): number[];
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {MultiLineString} Simplified MultiLineString.
     * @protected
     */
    protected getSimplifiedGeometryInternal(squaredTolerance: number): MultiLineString;
    /**
     * Set the coordinates of the multilinestring.
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
     * @param {GeometryLayout} [opt_layout] Layout.
     * @api
     */
    setCoordinates(coordinates: number[][][], opt_layout?: {
        XY: string;
        XYZ: string;
        XYM: string;
        XYZM: string;
    } | undefined): void;
}
import SimpleGeometry from "./SimpleGeometry.js";
import LineString from "./LineString.js";
//# sourceMappingURL=MultiLineString.d.ts.map