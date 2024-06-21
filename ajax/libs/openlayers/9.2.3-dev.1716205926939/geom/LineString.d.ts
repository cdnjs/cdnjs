export default LineString;
/**
 * @classdesc
 * Linestring geometry.
 *
 * @api
 */
declare class LineString extends SimpleGeometry {
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `layout` are also accepted.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     */
    constructor(coordinates: Array<import("../coordinate.js").Coordinate> | Array<number>, layout?: import("./Geometry.js").GeometryLayout | undefined);
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate|null}
     */
    private flatMidpoint_;
    /**
     * @private
     * @type {number}
     */
    private flatMidpointRevision_;
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
     * Append the passed coordinate to the coordinates of the linestring.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @api
     */
    appendCoordinate(coordinate: import("../coordinate.js").Coordinate): void;
    /**
     * Make a complete copy of the geometry.
     * @return {!LineString} Clone.
     * @api
     */
    clone(): LineString;
    /**
     * Iterate over each segment, calling the provided callback.
     * If the callback returns a truthy value the function returns that
     * value immediately. Otherwise the function returns `false`.
     *
     * @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
     *     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
     * @return {T|boolean} Value.
     * @template T,S
     * @api
     */
    forEachSegment<T, S>(callback: (this: S, arg1: import("../coordinate.js").Coordinate, arg2: import("../coordinate.js").Coordinate) => T): boolean | T;
    /**
     * Returns the coordinate at `m` using linear interpolation, or `null` if no
     * such coordinate exists.
     *
     * `extrapolate` controls extrapolation beyond the range of Ms in the
     * MultiLineString. If `extrapolate` is `true` then Ms less than the first
     * M will return the first coordinate and Ms greater than the last M will
     * return the last coordinate.
     *
     * @param {number} m M.
     * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
     * @return {import("../coordinate.js").Coordinate|null} Coordinate.
     * @api
     */
    getCoordinateAtM(m: number, extrapolate?: boolean | undefined): import("../coordinate.js").Coordinate | null;
    /**
     * Return the coordinates of the linestring.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @api
     */
    getCoordinates(): Array<import("../coordinate.js").Coordinate>;
    /**
     * Return the coordinate at the provided fraction along the linestring.
     * The `fraction` is a number between 0 and 1, where 0 is the start of the
     * linestring and 1 is the end.
     * @param {number} fraction Fraction.
     * @param {import("../coordinate.js").Coordinate} [dest] Optional coordinate whose values will
     *     be modified. If not provided, a new coordinate will be returned.
     * @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
     * @api
     */
    getCoordinateAt(fraction: number, dest?: import("../coordinate.js").Coordinate | undefined): import("../coordinate.js").Coordinate;
    /**
     * Return the length of the linestring on projected plane.
     * @return {number} Length (on projected plane).
     * @api
     */
    getLength(): number;
    /**
     * @return {Array<number>} Flat midpoint.
     */
    getFlatMidpoint(): Array<number>;
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {LineString} Simplified LineString.
     * @protected
     */
    protected getSimplifiedGeometryInternal(squaredTolerance: number): LineString;
    /**
     * Set the coordinates of the linestring.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     */
    setCoordinates(coordinates: Array<import("../coordinate.js").Coordinate>, layout?: import("./Geometry.js").GeometryLayout | undefined): void;
}
import SimpleGeometry from './SimpleGeometry.js';
//# sourceMappingURL=LineString.d.ts.map