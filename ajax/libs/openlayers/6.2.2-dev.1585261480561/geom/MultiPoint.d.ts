export default MultiPoint;
/**
 * @classdesc
 * Multi-point geometry.
 *
 * @api
 */
declare class MultiPoint extends SimpleGeometry {
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     */
    constructor(coordinates: number[] | number[][], opt_layout?: any);
    /**
     * Append the passed point to this multipoint.
     * @param {Point} point Point.
     * @api
     */
    appendPoint(point: Point): void;
    /**
     * Make a complete copy of the geometry.
     * @return {!MultiPoint} Clone.
     * @override
     * @api
     */
    clone(): MultiPoint;
    /**
     * @inheritDoc
     */
    closestPointXY(x: any, y: any, closestPoint: any, minSquaredDistance: any): any;
    /**
     * Return the coordinates of the multipoint.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @override
     * @api
     */
    getCoordinates(): number[][];
    /**
     * Return the point at the specified index.
     * @param {number} index Index.
     * @return {Point} Point.
     * @api
     */
    getPoint(index: number): Point;
    /**
     * Return the points of this multipoint.
     * @return {Array<Point>} Points.
     * @api
     */
    getPoints(): Point[];
    /**
     * @inheritDoc
     * @api
     */
    getType(): string;
    /**
     * @inheritDoc
     * @api
     */
    intersectsExtent(extent: any): boolean;
    /**
     * Set the coordinates of the multipoint.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     * @override
     * @api
     */
    setCoordinates(coordinates: number[][], opt_layout?: any): void;
}
import SimpleGeometry from "./SimpleGeometry.js";
import Point from "./Point.js";
//# sourceMappingURL=MultiPoint.d.ts.map