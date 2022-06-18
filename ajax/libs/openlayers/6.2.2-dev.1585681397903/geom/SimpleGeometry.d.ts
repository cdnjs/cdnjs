/**
 * @param {GeometryLayout} layout Layout.
 * @return {number} Stride.
 */
export function getStrideForLayout(layout: {
    XY: string;
    XYZ: string;
    XYM: string;
    XYZM: string;
}): number;
/**
 * @param {SimpleGeometry} simpleGeometry Simple geometry.
 * @param {import("../transform.js").Transform} transform Transform.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed flat coordinates.
 */
export function transformGeom2D(simpleGeometry: SimpleGeometry, transform: number[], opt_dest?: number[]): number[];
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
    getCoordinates(): any[];
    /**
     * Return the first coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} First coordinate.
     * @api
     */
    getFirstCoordinate(): number[];
    /**
     * @return {Array<number>} Flat coordinates.
     */
    getFlatCoordinates(): number[];
    /**
     * Return the last coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} Last point.
     * @api
     */
    getLastCoordinate(): number[];
    /**
     * Return the {@link module:ol/geom/GeometryLayout layout} of the geometry.
     * @return {GeometryLayout} Layout.
     * @api
     */
    getLayout(): {
        XY: string;
        XYZ: string;
        XYM: string;
        XYZM: string;
    };
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
    setFlatCoordinates(layout: {
        XY: string;
        XYZ: string;
        XYM: string;
        XYZM: string;
    }, flatCoordinates: number[]): void;
    /**
     * @abstract
     * @param {!Array<*>} coordinates Coordinates.
     * @param {GeometryLayout=} opt_layout Layout.
     */
    setCoordinates(coordinates: any[], opt_layout?: {
        XY: string;
        XYZ: string;
        XYM: string;
        XYZM: string;
    }): void;
    /**
     * @param {GeometryLayout|undefined} layout Layout.
     * @param {Array<*>} coordinates Coordinates.
     * @param {number} nesting Nesting.
     * @protected
     */
    protected setLayout(layout: {
        XY: string;
        XYZ: string;
        XYM: string;
        XYZM: string;
    }, coordinates: any[], nesting: number): void;
}
import Geometry from "./Geometry.js";
import GeometryLayout from "./GeometryLayout.js";
//# sourceMappingURL=SimpleGeometry.d.ts.map