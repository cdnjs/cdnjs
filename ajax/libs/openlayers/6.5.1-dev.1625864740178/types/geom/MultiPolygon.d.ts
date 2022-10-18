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
     *     For internal use, flat coordinates in combination with `opt_layout` and `opt_endss` are also accepted.
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     * @param {Array<Array<number>>} [opt_endss] Array of ends for internal use with flat coordinates.
     */
    constructor(coordinates: Array<Array<Array<import("../coordinate.js").Coordinate>> | Polygon> | Array<number>, opt_layout?: any, opt_endss?: Array<Array<number>>);
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
     * @type {Array<number>}
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
     * @type {Array<number>}
     */
    private orientedFlatCoordinates_;
    /**
     * Append the passed polygon to this multipolygon.
     * @param {Polygon} polygon Polygon.
     * @api
     */
    appendPolygon(polygon: Polygon): void;
    /**
     * Return the area of the multipolygon on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    getArea(): number;
    /**
     * @return {Array<Array<number>>} Endss.
     */
    getEndss(): Array<Array<number>>;
    /**
     * @return {Array<number>} Flat interior points.
     */
    getFlatInteriorPoints(): Array<number>;
    /**
     * Return the interior points as {@link module:ol/geom/MultiPoint multipoint}.
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
}
import SimpleGeometry from "./SimpleGeometry.js";
import Polygon from "./Polygon.js";
import MultiPoint from "./MultiPoint.js";
//# sourceMappingURL=MultiPolygon.d.ts.map