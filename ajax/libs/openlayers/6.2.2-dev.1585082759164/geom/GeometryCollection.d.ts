export default GeometryCollection;
/**
 * @classdesc
 * An array of {@link module:ol/geom/Geometry} objects.
 *
 * @api
 */
declare class GeometryCollection extends Geometry {
    /**
     * @param {Array<Geometry>=} opt_geometries Geometries.
     */
    constructor(opt_geometries?: Geometry[]);
    /**
     * @private
     * @type {Array<Geometry>}
     */
    private geometries_;
    /**
     * @type {Array<import("../events.js").EventsKey>}
     */
    changeEventsKeys_: Array<import("../events.js").EventsKey>;
    /**
     * @private
     */
    private unlistenGeometriesChange_;
    /**
     * @private
     */
    private listenGeometriesChange_;
    /**
     * Make a complete copy of the geometry.
     * @return {!GeometryCollection} Clone.
     * @override
     * @api
     */
    clone(): GeometryCollection;
    /**
     * @inheritDoc
     */
    closestPointXY(x: any, y: any, closestPoint: any, minSquaredDistance: any): any;
    /**
     * @inheritDoc
     */
    containsXY(x: any, y: any): boolean;
    /**
     * @inheritDoc
     */
    computeExtent(extent: any): any;
    /**
     * Return the geometries that make up this geometry collection.
     * @return {Array<Geometry>} Geometries.
     * @api
     */
    getGeometries(): Geometry[];
    /**
     * @return {Array<Geometry>} Geometries.
     */
    getGeometriesArray(): Geometry[];
    /**
     * @inheritDoc
     */
    getSimplifiedGeometry(squaredTolerance: any): GeometryCollection;
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
     * @return {boolean} Is empty.
     */
    isEmpty(): boolean;
    /**
     * @inheritDoc
     * @api
     */
    rotate(angle: any, anchor: any): void;
    /**
     * @inheritDoc
     * @api
     */
    scale(sx: any, opt_sy: any, opt_anchor: any): void;
    /**
     * Set the geometries that make up this geometry collection.
     * @param {Array<Geometry>} geometries Geometries.
     * @api
     */
    setGeometries(geometries: Geometry[]): void;
    /**
     * @param {Array<Geometry>} geometries Geometries.
     */
    setGeometriesArray(geometries: Geometry[]): void;
    /**
     * @inheritDoc
     * @api
     */
    applyTransform(transformFn: any): void;
    /**
     * @inheritDoc
     * @api
     */
    translate(deltaX: any, deltaY: any): void;
}
import Geometry from "./Geometry.js";
//# sourceMappingURL=GeometryCollection.d.ts.map