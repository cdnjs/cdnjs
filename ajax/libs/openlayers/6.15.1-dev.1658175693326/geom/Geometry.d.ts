export default Geometry;
/**
 * The geometry type.  One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, or `'Circle'`.
 */
export type Type = 'Point' | 'LineString' | 'LinearRing' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Circle';
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for vector geometries.
 *
 * To get notified of changes to the geometry, register a listener for the
 * generic `change` event on your geometry instance.
 *
 * @abstract
 * @api
 */
declare class Geometry extends BaseObject {
    constructor();
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    private extent_;
    /**
     * @private
     * @type {number}
     */
    private extentRevision_;
    /**
     * @protected
     * @type {number}
     */
    protected simplifiedGeometryMaxMinSquaredTolerance: number;
    /**
     * @protected
     * @type {number}
     */
    protected simplifiedGeometryRevision: number;
    /**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} revision The geometry revision.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
     * @return {Geometry} Simplified geometry.
     */
    simplifyTransformedInternal: (...arg0: any[]) => any;
    /**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
     * @return {Geometry} Simplified geometry.
     */
    simplifyTransformed(squaredTolerance: number, opt_transform?: import("../proj.js").TransformFunction | undefined): Geometry;
    /**
     * Make a complete copy of the geometry.
     * @abstract
     * @return {!Geometry} Clone.
     */
    clone(): Geometry;
    /**
     * @abstract
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    closestPointXY(x: number, y: number, closestPoint: import("../coordinate.js").Coordinate, minSquaredDistance: number): number;
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @return {boolean} Contains (x, y).
     */
    containsXY(x: number, y: number): boolean;
    /**
     * Return the closest point of the geometry to the passed point as
     * {@link module:ol/coordinate~Coordinate coordinate}.
     * @param {import("../coordinate.js").Coordinate} point Point.
     * @param {import("../coordinate.js").Coordinate} [opt_closestPoint] Closest point.
     * @return {import("../coordinate.js").Coordinate} Closest point.
     * @api
     */
    getClosestPoint(point: import("../coordinate.js").Coordinate, opt_closestPoint?: import("../coordinate.js").Coordinate | undefined): import("../coordinate.js").Coordinate;
    /**
     * Returns true if this geometry includes the specified coordinate. If the
     * coordinate is on the boundary of the geometry, returns false.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains coordinate.
     * @api
     */
    intersectsCoordinate(coordinate: import("../coordinate.js").Coordinate): boolean;
    /**
     * @abstract
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    protected computeExtent(extent: import("../extent.js").Extent): import("../extent.js").Extent;
    /**
     * Get the extent of the geometry.
     * @param {import("../extent.js").Extent} [opt_extent] Extent.
     * @return {import("../extent.js").Extent} extent Extent.
     * @api
     */
    getExtent(opt_extent?: import("../extent.js").Extent | undefined): import("../extent.js").Extent;
    /**
     * Rotate the geometry around a given coordinate. This modifies the geometry
     * coordinates in place.
     * @abstract
     * @param {number} angle Rotation angle in radians.
     * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
     * @api
     */
    rotate(angle: number, anchor: import("../coordinate.js").Coordinate): void;
    /**
     * Scale the geometry (with an optional origin).  This modifies the geometry
     * coordinates in place.
     * @abstract
     * @param {number} sx The scaling factor in the x-direction.
     * @param {number} [opt_sy] The scaling factor in the y-direction (defaults to sx).
     * @param {import("../coordinate.js").Coordinate} [opt_anchor] The scale origin (defaults to the center
     *     of the geometry extent).
     * @api
     */
    scale(sx: number, opt_sy?: number | undefined, opt_anchor?: import("../coordinate.js").Coordinate | undefined): void;
    /**
     * Create a simplified version of this geometry.  For linestrings, this uses
     * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
     * algorithm.  For polygons, a quantization-based
     * simplification is used to preserve topology.
     * @param {number} tolerance The tolerance distance for simplification.
     * @return {Geometry} A new, simplified version of the original geometry.
     * @api
     */
    simplify(tolerance: number): Geometry;
    /**
     * Create a simplified version of this geometry using the Douglas Peucker
     * algorithm.
     * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
     * @abstract
     * @param {number} squaredTolerance Squared tolerance.
     * @return {Geometry} Simplified geometry.
     */
    getSimplifiedGeometry(squaredTolerance: number): Geometry;
    /**
     * Get the type of this geometry.
     * @abstract
     * @return {Type} Geometry type.
     */
    getType(): Type;
    /**
     * Apply a transform function to the coordinates of the geometry.
     * The geometry is modified in place.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     * @abstract
     * @param {import("../proj.js").TransformFunction} transformFn Transform function.
     * Called with a flat array of geometry coordinates.
     */
    applyTransform(transformFn: import("../proj.js").TransformFunction): void;
    /**
     * Test if the geometry and the passed extent intersect.
     * @abstract
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     */
    intersectsExtent(extent: import("../extent.js").Extent): boolean;
    /**
     * Translate the geometry.  This modifies the geometry coordinates in place.  If
     * instead you want a new geometry, first `clone()` this geometry.
     * @abstract
     * @param {number} deltaX Delta X.
     * @param {number} deltaY Delta Y.
     * @api
     */
    translate(deltaX: number, deltaY: number): void;
    /**
     * Transform each coordinate of the geometry from one coordinate reference
     * system to another. The geometry is modified in place.
     * For example, a line will be transformed to a line and a circle to a circle.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     *
     * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
     *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
     * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
     *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
     * @return {Geometry} This geometry.  Note that original geometry is
     *     modified in place.
     * @api
     */
    transform(source: import("../proj.js").ProjectionLike, destination: import("../proj.js").ProjectionLike): Geometry;
}
import BaseObject from "../Object.js";
//# sourceMappingURL=Geometry.d.ts.map