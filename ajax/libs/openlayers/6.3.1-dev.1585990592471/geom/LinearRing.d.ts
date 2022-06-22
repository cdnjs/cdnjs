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
     *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
     * @param {GeometryLayout=} opt_layout Layout.
     */
    constructor(coordinates: Array<import("../coordinate.js").Coordinate> | Array<number>, opt_layout?: GeometryLayout | undefined);
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
     * @override
     * @api
     */
    clone(): LinearRing;
    /**
     * @inheritDoc
     */
    closestPointXY(x: any, y: any, closestPoint: any, minSquaredDistance: any): any;
    /**
     * Return the area of the linear ring on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    getArea(): number;
    /**
     * Return the coordinates of the linear ring.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @override
     * @api
     */
    getCoordinates(): Array<import("../coordinate.js").Coordinate>;
    /**
     * @inheritDoc
     */
    getSimplifiedGeometryInternal(squaredTolerance: any): LinearRing;
    /**
     * @inheritDoc
     * @api
     */
    getType(): string;
    /**
     * @inheritDoc
     */
    intersectsExtent(extent: any): boolean;
    /**
     * Set the coordinates of the linear ring.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {GeometryLayout=} opt_layout Layout.
     * @override
     * @api
     */
    setCoordinates(coordinates: Array<import("../coordinate.js").Coordinate>, opt_layout?: GeometryLayout | undefined): void;
}
import SimpleGeometry from "./SimpleGeometry.js";
import GeometryLayout from "./GeometryLayout.js";
//# sourceMappingURL=LinearRing.d.ts.map