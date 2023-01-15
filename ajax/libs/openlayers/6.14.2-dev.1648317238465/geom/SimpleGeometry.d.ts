/**
 * @param {import("./GeometryLayout.js").default} layout Layout.
 * @return {number} Stride.
 */
export function getStrideForLayout(layout: any): number;
/**
 * @param {SimpleGeometry} simpleGeometry Simple geometry.
 * @param {import("../transform.js").Transform} transform Transform.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed flat coordinates.
 */
export function transformGeom2D(simpleGeometry: SimpleGeometry, transform: import("../transform.js").Transform, opt_dest?: number[] | undefined): Array<number>;
export default SimpleGeometry;
/**
 * @classdesc
 * Abstract base class; only used for creating subclasses; do not instantiate
 * in apps, as cannot be rendered.
 *
 * @abstract
 * @api
 */
declare class SimpleGeometry extends Geometry {
    /**
     * @protected
     * @type {import("./GeometryLayout.js").default}
     */
    protected layout: any;
    /**
     * @protected
     * @type {number}
     */
    protected stride: number;
    /**
     * @protected
     * @type {Array<number>}
     */
    protected flatCoordinates: Array<number>;
    /**
     * @abstract
     * @return {Array<*> | null} Coordinates.
     */
    getCoordinates(): Array<any> | null;
    /**
     * Return the first coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} First coordinate.
     * @api
     */
    getFirstCoordinate(): import("../coordinate.js").Coordinate;
    /**
     * @return {Array<number>} Flat coordinates.
     */
    getFlatCoordinates(): Array<number>;
    /**
     * Return the last coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} Last point.
     * @api
     */
    getLastCoordinate(): import("../coordinate.js").Coordinate;
    /**
     * Return the {@link module:ol/geom/GeometryLayout layout} of the geometry.
     * @return {import("./GeometryLayout.js").default} Layout.
     * @api
     */
    getLayout(): any;
    /**
     * Create a simplified version of this geometry using the Douglas Peucker algorithm.
     * @param {number} squaredTolerance Squared tolerance.
     * @return {SimpleGeometry} Simplified geometry.
     */
    getSimplifiedGeometry(squaredTolerance: number): SimpleGeometry;
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {SimpleGeometry} Simplified geometry.
     * @protected
     */
    protected getSimplifiedGeometryInternal(squaredTolerance: number): SimpleGeometry;
    /**
     * @return {number} Stride.
     */
    getStride(): number;
    /**
     * @param {import("./GeometryLayout.js").default} layout Layout.
     * @param {Array<number>} flatCoordinates Flat coordinates.
     */
    setFlatCoordinates(layout: any, flatCoordinates: Array<number>): void;
    /**
     * @abstract
     * @param {!Array<*>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     */
    setCoordinates(coordinates: Array<any>, opt_layout?: any): void;
    /**
     * @param {import("./GeometryLayout.js").default|undefined} layout Layout.
     * @param {Array<*>} coordinates Coordinates.
     * @param {number} nesting Nesting.
     * @protected
     */
    protected setLayout(layout: any | undefined, coordinates: Array<any>, nesting: number): void;
}
import Geometry from "./Geometry.js";
//# sourceMappingURL=SimpleGeometry.d.ts.map