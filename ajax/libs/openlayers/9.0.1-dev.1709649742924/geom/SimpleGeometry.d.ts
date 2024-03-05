/**
 * @param {number} stride Stride.
 * @return {import("./Geometry.js").GeometryLayout} layout Layout.
 */
export function getLayoutForStride(stride: number): import("./Geometry.js").GeometryLayout;
/**
 * @param {import("./Geometry.js").GeometryLayout} layout Layout.
 * @return {number} Stride.
 */
export function getStrideForLayout(layout: import("./Geometry.js").GeometryLayout): number;
/**
 * @param {SimpleGeometry} simpleGeometry Simple geometry.
 * @param {import("../transform.js").Transform} transform Transform.
 * @param {Array<number>} [dest] Destination.
 * @return {Array<number>} Transformed flat coordinates.
 */
export function transformGeom2D(simpleGeometry: SimpleGeometry, transform: import("../transform.js").Transform, dest?: number[] | undefined): Array<number>;
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
     * @type {import("./Geometry.js").GeometryLayout}
     */
    protected layout: import("./Geometry.js").GeometryLayout;
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
     * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
     * @return {import("./Geometry.js").GeometryLayout} Layout.
     * @api
     */
    getLayout(): import("./Geometry.js").GeometryLayout;
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
     * @param {import("./Geometry.js").GeometryLayout} layout Layout.
     * @param {Array<number>} flatCoordinates Flat coordinates.
     */
    setFlatCoordinates(layout: import("./Geometry.js").GeometryLayout, flatCoordinates: Array<number>): void;
    /**
     * @abstract
     * @param {!Array<*>} coordinates Coordinates.
     * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
     */
    setCoordinates(coordinates: Array<any>, layout?: import("./Geometry.js").GeometryLayout | undefined): void;
    /**
     * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
     * @param {Array<*>} coordinates Coordinates.
     * @param {number} nesting Nesting.
     * @protected
     */
    protected setLayout(layout: import("./Geometry.js").GeometryLayout | undefined, coordinates: Array<any>, nesting: number): void;
}
import Geometry from './Geometry.js';
//# sourceMappingURL=SimpleGeometry.d.ts.map