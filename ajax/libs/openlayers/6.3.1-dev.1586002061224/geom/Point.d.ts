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
    constructor(coordinates: import("../coordinate.js").Coordinate, opt_layout?: any);
    /**
     * Make a complete copy of the geometry.
     * @return {!Point} Clone.
     * @api
     */
    clone(): Point;
    /**
     * Return the coordinate of the point.
     * @return {import("../coordinate.js").Coordinate} Coordinates.
     * @api
     */
    getCoordinates(): import("../coordinate.js").Coordinate;
    /**
     * @param {!Array<*>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     * @api
     */
    setCoordinates(coordinates: Array<any>, opt_layout?: any): void;
}
import SimpleGeometry from "./SimpleGeometry.js";
//# sourceMappingURL=Point.d.ts.map