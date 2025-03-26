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
     *     combination with `layout` and `ends` are also accepted.)
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @param {Array<number>} [ends] Flat coordinate ends for internal use.
     */
    constructor(coordinates: Array<Array<import("../coordinate.js").Coordinate> | LineString> | Array<number>, layout?: import("./Geometry.js").GeometryLayout, ends?: Array<number>);
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
     * @override
     */
    override clone(): MultiLineString;
    /**
     * Returns the coordinate at `m` using linear interpolation, or `null` if no
     * such coordinate exists.
     *
     * `extrapolate` controls extrapolation beyond the range of Ms in the
     * MultiLineString. If `extrapolate` is `true` then Ms less than the first
     * M will return the first coordinate and Ms greater than the last M will
     * return the last coordinate.
     *
     * `interpolate` controls interpolation between consecutive LineStrings
     * within the MultiLineString. If `interpolate` is `true` the coordinates
     * will be linearly interpolated between the last coordinate of one LineString
     * and the first coordinate of the next LineString.  If `interpolate` is
     * `false` then the function will return `null` for Ms falling between
     * LineStrings.
     *
     * @param {number} m M.
     * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
     * @param {boolean} [interpolate] Interpolate. Default is `false`.
     * @return {import("../coordinate.js").Coordinate|null} Coordinate.
     * @api
     */
    getCoordinateAtM(m: number, extrapolate?: boolean, interpolate?: boolean): import("../coordinate.js").Coordinate | null;
    /**
     * Return the coordinates of the multilinestring.
     * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
     * @api
     * @override
     */
    override getCoordinates(): Array<Array<import("../coordinate.js").Coordinate>>;
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
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {MultiLineString} Simplified MultiLineString.
     * @protected
     * @override
     */
    protected override getSimplifiedGeometryInternal(squaredTolerance: number): MultiLineString;
    /**
     * Set the coordinates of the multilinestring.
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     * @override
     */
    override setCoordinates(coordinates: Array<Array<import("../coordinate.js").Coordinate>>, layout?: import("./Geometry.js").GeometryLayout): void;
}
import SimpleGeometry from './SimpleGeometry.js';
import LineString from './LineString.js';
//# sourceMappingURL=MultiLineString.d.ts.map