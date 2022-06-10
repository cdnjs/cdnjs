export default Point;
/**
 * @classdesc
 * Point geometry.
 *
 * @api
 */
declare class Point extends SimpleGeometry {
    /**
     * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     */
    constructor(coordinates: number[], opt_layout?: any);
    /**
     * Make a complete copy of the geometry.
     * @return {!Point} Clone.
     * @override
     * @api
     */
    clone(): Point;
    /**
     * @inheritDoc
     */
    closestPointXY(x: any, y: any, closestPoint: any, minSquaredDistance: any): any;
    /**
     * Return the coordinate of the point.
     * @return {import("../coordinate.js").Coordinate} Coordinates.
     * @override
     * @api
     */
    getCoordinates(): number[];
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
     * @inheritDoc
     * @api
     */
    setCoordinates(coordinates: any, opt_layout: any): void;
}
import SimpleGeometry from "./SimpleGeometry.js";
//# sourceMappingURL=Point.d.ts.map