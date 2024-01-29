/**
 * Create an approximation of a circle on the surface of a sphere.
 * @param {import("../coordinate.js").Coordinate} center Center (`[lon, lat]` in degrees).
 * @param {number} radius The great-circle distance from the center to
 *     the polygon vertices in meters.
 * @param {number} [n] Optional number of vertices for the resulting
 *     polygon. Default is `32`.
 * @param {number} [sphereRadius] Optional radius for the sphere (defaults to
 *     the Earth's mean radius using the WGS84 ellipsoid).
 * @return {Polygon} The "circular" polygon.
 * @api
 */
export function circular(center: import("../coordinate.js").Coordinate, radius: number, n?: number | undefined, sphereRadius?: number | undefined): Polygon;
/**
 * Create a polygon from an extent. The layout used is `XY`.
 * @param {import("../extent.js").Extent} extent The extent.
 * @return {Polygon} The polygon.
 * @api
 */
export function fromExtent(extent: import("../extent.js").Extent): Polygon;
/**
 * Create a regular polygon from a circle.
 * @param {import("./Circle.js").default} circle Circle geometry.
 * @param {number} [sides] Number of sides of the polygon. Default is 32.
 * @param {number} [angle] Start angle for the first vertex of the polygon in
 *     counter-clockwise radians. 0 means East. Default is 0.
 * @return {Polygon} Polygon geometry.
 * @api
 */
export function fromCircle(circle: import("./Circle.js").default, sides?: number | undefined, angle?: number | undefined): Polygon;
/**
 * Modify the coordinates of a polygon to make it a regular polygon.
 * @param {Polygon} polygon Polygon geometry.
 * @param {import("../coordinate.js").Coordinate} center Center of the regular polygon.
 * @param {number} radius Radius of the regular polygon.
 * @param {number} [angle] Start angle for the first vertex of the polygon in
 *     counter-clockwise radians. 0 means East. Default is 0.
 */
export function makeRegular(polygon: Polygon, center: import("../coordinate.js").Coordinate, radius: number, angle?: number | undefined): void;
export default Polygon;
/**
 * @classdesc
 * Polygon geometry.
 *
 * @api
 */
declare class Polygon extends SimpleGeometry {
    /**
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
     *     Array of linear rings that define the polygon. The first linear ring of the
     *     array defines the outer-boundary or surface of the polygon. Each subsequent
     *     linear ring defines a hole in the surface of the polygon. A linear ring is
     *     an array of vertices' coordinates where the first coordinate and the last are
     *     equivalent. (For internal use, flat coordinates in combination with
     *     `layout` and `ends` are also accepted.)
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
     */
    constructor(coordinates: Array<Array<import("../coordinate.js").Coordinate>> | Array<number>, layout?: import("./Geometry.js").GeometryLayout | undefined, ends?: number[] | undefined);
    /**
     * @type {Array<number>}
     * @private
     */
    private ends_;
    /**
     * @private
     * @type {number}
     */
    private flatInteriorPointRevision_;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate|null}
     */
    private flatInteriorPoint_;
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
     * @private
     * @type {number}
     */
    private orientedRevision_;
    /**
     * @private
     * @type {Array<number>|null}
     */
    private orientedFlatCoordinates_;
    /**
     * Append the passed linear ring to this polygon.
     * @param {LinearRing} linearRing Linear ring.
     * @api
     */
    appendLinearRing(linearRing: LinearRing): void;
    /**
     * Make a complete copy of the geometry.
     * @return {!Polygon} Clone.
     * @api
     */
    clone(): Polygon;
    /**
     * Return the area of the polygon on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    getArea(): number;
    /**
     * Get the coordinate array for this geometry.  This array has the structure
     * of a GeoJSON coordinate array for polygons.
     *
     * @param {boolean} [right] Orient coordinates according to the right-hand
     *     rule (counter-clockwise for exterior and clockwise for interior rings).
     *     If `false`, coordinates will be oriented according to the left-hand rule
     *     (clockwise for exterior and counter-clockwise for interior rings).
     *     By default, coordinate orientation will depend on how the geometry was
     *     constructed.
     * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
     * @api
     */
    getCoordinates(right?: boolean | undefined): Array<Array<import("../coordinate.js").Coordinate>>;
    /**
     * @return {Array<number>} Ends.
     */
    getEnds(): Array<number>;
    /**
     * @return {Array<number>} Interior point.
     */
    getFlatInteriorPoint(): Array<number>;
    /**
     * Return an interior point of the polygon.
     * @return {Point} Interior point as XYM coordinate, where M is the
     * length of the horizontal intersection that the point belongs to.
     * @api
     */
    getInteriorPoint(): Point;
    /**
     * Return the number of rings of the polygon,  this includes the exterior
     * ring and any interior rings.
     *
     * @return {number} Number of rings.
     * @api
     */
    getLinearRingCount(): number;
    /**
     * Return the Nth linear ring of the polygon geometry. Return `null` if the
     * given index is out of range.
     * The exterior linear ring is available at index `0` and the interior rings
     * at index `1` and beyond.
     *
     * @param {number} index Index.
     * @return {LinearRing|null} Linear ring.
     * @api
     */
    getLinearRing(index: number): LinearRing | null;
    /**
     * Return the linear rings of the polygon.
     * @return {Array<LinearRing>} Linear rings.
     * @api
     */
    getLinearRings(): Array<LinearRing>;
    /**
     * @return {Array<number>} Oriented flat coordinates.
     */
    getOrientedFlatCoordinates(): Array<number>;
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {Polygon} Simplified Polygon.
     * @protected
     */
    protected getSimplifiedGeometryInternal(squaredTolerance: number): Polygon;
    /**
     * Set the coordinates of the polygon.
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     */
    setCoordinates(coordinates: Array<Array<import("../coordinate.js").Coordinate>>, layout?: import("./Geometry.js").GeometryLayout | undefined): void;
}
import SimpleGeometry from './SimpleGeometry.js';
import LinearRing from './LinearRing.js';
import Point from './Point.js';
//# sourceMappingURL=Polygon.d.ts.map