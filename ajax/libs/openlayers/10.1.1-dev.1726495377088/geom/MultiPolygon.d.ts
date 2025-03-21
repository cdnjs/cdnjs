export default MultiPolygon;
/**
 * @classdesc
 * Multi-polygon geometry.
 *
 * @api
 */
declare class MultiPolygon extends SimpleGeometry {
    /**
     * @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `layout` and `endss` are also accepted.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @param {Array<Array<number>>} [endss] Array of ends for internal use with flat coordinates.
     */
    constructor(coordinates: Array<Array<Array<import("../coordinate.js").Coordinate>> | Polygon> | Array<number>, layout?: import("./Geometry.js").GeometryLayout | undefined, endss?: number[][] | undefined);
    /**
     * @type {Array<Array<number>>}
     * @private
     */
    private endss_;
    /**
     * @private
     * @type {number}
     */
    private flatInteriorPointsRevision_;
    /**
     * @private
     * @type {Array<number>|null}
     */
    private flatInteriorPoints_;
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
     * Append the passed polygon to this multipolygon.
     * @param {Polygon} polygon Polygon.
     * @api
     */
    appendPolygon(polygon: Polygon): void;
    /**
     * Make a complete copy of the geometry.
     * @return {!MultiPolygon} Clone.
     * @api
     * @override
     */
    override clone(): MultiPolygon;
    /**
     * Return the area of the multipolygon on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    getArea(): number;
    /**
     * Get the coordinate array for this geometry.  This array has the structure
     * of a GeoJSON coordinate array for multi-polygons.
     *
     * @param {boolean} [right] Orient coordinates according to the right-hand
     *     rule (counter-clockwise for exterior and clockwise for interior rings).
     *     If `false`, coordinates will be oriented according to the left-hand rule
     *     (clockwise for exterior and counter-clockwise for interior rings).
     *     By default, coordinate orientation will depend on how the geometry was
     *     constructed.
     * @return {Array<Array<Array<import("../coordinate.js").Coordinate>>>} Coordinates.
     * @api
     * @override
     */
    override getCoordinates(right?: boolean | undefined): Array<Array<Array<import("../coordinate.js").Coordinate>>>;
    /**
     * @return {Array<Array<number>>} Endss.
     */
    getEndss(): Array<Array<number>>;
    /**
     * @return {Array<number>} Flat interior points.
     */
    getFlatInteriorPoints(): Array<number>;
    /**
     * Return the interior points as {@link module:ol/geom/MultiPoint~MultiPoint multipoint}.
     * @return {MultiPoint} Interior points as XYM coordinates, where M is
     * the length of the horizontal intersection that the point belongs to.
     * @api
     */
    getInteriorPoints(): MultiPoint;
    /**
     * @return {Array<number>} Oriented flat coordinates.
     */
    getOrientedFlatCoordinates(): Array<number>;
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {MultiPolygon} Simplified MultiPolygon.
     * @protected
     * @override
     */
    protected override getSimplifiedGeometryInternal(squaredTolerance: number): MultiPolygon;
    /**
     * Return the polygon at the specified index.
     * @param {number} index Index.
     * @return {Polygon} Polygon.
     * @api
     */
    getPolygon(index: number): Polygon;
    /**
     * Return the polygons of this multipolygon.
     * @return {Array<Polygon>} Polygons.
     * @api
     */
    getPolygons(): Array<Polygon>;
    /**
     * Set the coordinates of the multipolygon.
     * @param {!Array<Array<Array<import("../coordinate.js").Coordinate>>>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     * @override
     */
    override setCoordinates(coordinates: Array<Array<Array<import("../coordinate.js").Coordinate>>>, layout?: import("./Geometry.js").GeometryLayout | undefined): void;
}
import SimpleGeometry from './SimpleGeometry.js';
import Polygon from './Polygon.js';
import MultiPoint from './MultiPoint.js';
//# sourceMappingURL=MultiPolygon.d.ts.map