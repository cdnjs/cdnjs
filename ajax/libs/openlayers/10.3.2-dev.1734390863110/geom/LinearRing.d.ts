export default LinearRing;
/**
 * @classdesc
 * Linear ring geometry. Only used as part of polygon; cannot be rendered
 * on its own.
 *
 * @api
 */
declare class LinearRing extends SimpleGeometry {
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `layout` are also accepted.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     */
    constructor(coordinates: Array<import("../coordinate.js").Coordinate> | Array<number>, layout?: import("./Geometry.js").GeometryLayout);
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
     * Make a complete copy of the geometry.
     * @return {!LinearRing} Clone.
     * @api
     * @override
     */
    override clone(): LinearRing;
    /**
     * Return the area of the linear ring on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    getArea(): number;
    /**
     * Return the coordinates of the linear ring.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @api
     * @override
     */
    override getCoordinates(): Array<import("../coordinate.js").Coordinate>;
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {LinearRing} Simplified LinearRing.
     * @protected
     * @override
     */
    protected override getSimplifiedGeometryInternal(squaredTolerance: number): LinearRing;
    /**
     * Set the coordinates of the linear ring.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     * @api
     * @override
     */
    override setCoordinates(coordinates: Array<import("../coordinate.js").Coordinate>, layout?: import("./Geometry.js").GeometryLayout): void;
}
import SimpleGeometry from './SimpleGeometry.js';
//# sourceMappingURL=LinearRing.d.ts.map