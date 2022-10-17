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
    constructor(coordinates: Array<Array<import("../coordinate.js").Coordinate> | LineString> | Array<number>, opt_layout?: any, opt_ends?: Array<number>);
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
    getCoordinateAtM(m: number, opt_extrapolate?: boolean, opt_interpolate?: boolean): import("../coordinate.js").Coordinate;
    /**
     * @return {Array<number>} Ends.
     */
    getEnds(): Array<number>;
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
    getLineStrings(): Array<LineString>;
    /**
     * @return {Array<number>} Flat midpoints.
     */
    getFlatMidpoints(): Array<number>;
}
import SimpleGeometry from "./SimpleGeometry.js";
import LineString from "./LineString.js";
//# sourceMappingURL=MultiLineString.d.ts.map