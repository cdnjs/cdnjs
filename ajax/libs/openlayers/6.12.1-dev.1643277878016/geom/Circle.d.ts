export default Circle;
/**
 * @classdesc
 * Circle geometry.
 *
 * @api
 */
declare class Circle extends SimpleGeometry {
    /**
     * @param {!import("../coordinate.js").Coordinate} center Center.
     *     For internal use, flat coordinates in combination with `opt_layout` and no
     *     `opt_radius` are also accepted.
     * @param {number} [opt_radius] Radius.
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     */
    constructor(center: import("../coordinate.js").Coordinate, opt_radius?: number | undefined, opt_layout?: any);
    /**
     * Make a complete copy of the geometry.
     * @return {!Circle} Clone.
     * @api
     */
    clone(): Circle;
    /**
     * Return the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
     * @return {import("../coordinate.js").Coordinate} Center.
     * @api
     */
    getCenter(): import("../coordinate.js").Coordinate;
    /**
     * Return the radius of the circle.
     * @return {number} Radius.
     * @api
     */
    getRadius(): number;
    /**
     * @private
     * @return {number} Radius squared.
     */
    private getRadiusSquared_;
    /**
     * Set the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
     * @param {import("../coordinate.js").Coordinate} center Center.
     * @api
     */
    setCenter(center: import("../coordinate.js").Coordinate): void;
    /**
     * Set the center (as {@link module:ol/coordinate~Coordinate coordinate}) and the radius (as
     * number) of the circle.
     * @param {!import("../coordinate.js").Coordinate} center Center.
     * @param {number} radius Radius.
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     * @api
     */
    setCenterAndRadius(center: import("../coordinate.js").Coordinate, radius: number, opt_layout?: any): void;
    getCoordinates(): null;
    setCoordinates(coordinates: any, opt_layout: any): void;
    /**
     * Set the radius of the circle. The radius is in the units of the projection.
     * @param {number} radius Radius.
     * @api
     */
    setRadius(radius: number): void;
}
import SimpleGeometry from "./SimpleGeometry.js";
//# sourceMappingURL=Circle.d.ts.map