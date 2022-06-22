/**
 * @param {GeometryLayout} layout Layout.
 * @return {number} Stride.
 */
export function getStrideForLayout(layout: GeometryLayout): number;
/**
 * @param {SimpleGeometry} simpleGeometry Simple geometry.
 * @param {import("../transform.js").Transform} transform Transform.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed flat coordinates.
 */
export function transformGeom2D(simpleGeometry: SimpleGeometry, transform: import("../transform.js").Transform, opt_dest?: Array<number> | undefined): Array<number>;
export default SimpleGeometry;
import GeometryLayout from "./GeometryLayout.js";
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
     * @type {GeometryLayout}
     */
    protected layout: GeometryLayout;
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
     * @inheritDoc
     */
    computeExtent(extent: any): number[];
    /**
     * @abstract
     * @return {Array<*>} Coordinates.
     */
    getCoordinates(): Array<any>;
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
     * @return {GeometryLayout} Layout.
     * @api
     */
    getLayout(): GeometryLayout;
    /**
     * @inheritDoc
     */
    getSimplifiedGeometry(squaredTolerance: any): SimpleGeometry;
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
     * @param {GeometryLayout} layout Layout.
     * @param {Array<number>} flatCoordinates Flat coordinates.
     */
    setFlatCoordinates(layout: GeometryLayout, flatCoordinates: Array<number>): void;
    /**
     * @abstract
     * @param {!Array<*>} coordinates Coordinates.
     * @param {GeometryLayout=} opt_layout Layout.
     */
    setCoordinates(coordinates: Array<any>, opt_layout?: GeometryLayout | undefined): void;
    /**
     * @param {GeometryLayout|undefined} layout Layout.
     * @param {Array<*>} coordinates Coordinates.
     * @param {number} nesting Nesting.
     * @protected
     */
    protected setLayout(layout: GeometryLayout | undefined, coordinates: Array<any>, nesting: number): void;
}
import Geometry from "./Geometry.js";
//# sourceMappingURL=SimpleGeometry.d.ts.map