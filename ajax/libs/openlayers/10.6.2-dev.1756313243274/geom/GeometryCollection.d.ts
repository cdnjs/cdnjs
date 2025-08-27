export default GeometryCollection;
/**
 * @classdesc
 * An array of {@link module:ol/geom/Geometry~Geometry} objects.
 *
 * @api
 */
declare class GeometryCollection extends Geometry {
    /**
     * @param {Array<Geometry>} geometries Geometries.
     */
    constructor(geometries: Array<Geometry>);
    /**
     * @private
     * @type {Array<Geometry>}
     */
    private geometries_;
    /**
     * @private
     * @type {Array<import("../events.js").EventsKey>}
     */
    private changeEventsKeys_;
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
     * @api
     * @override
     */
    override clone(): GeometryCollection;
    /**
     * Return the geometries that make up this geometry collection.
     * @return {Array<Geometry>} Geometries.
     * @api
     */
    getGeometries(): Array<Geometry>;
    /**
     * @return {Array<Geometry>} Geometries.
     */
    getGeometriesArray(): Array<Geometry>;
    /**
     * @return {Array<Geometry>} Geometries.
     */
    getGeometriesArrayRecursive(): Array<Geometry>;
    /**
     * Create a simplified version of this geometry using the Douglas Peucker algorithm.
     * @param {number} squaredTolerance Squared tolerance.
     * @return {GeometryCollection} Simplified GeometryCollection.
     * @override
     */
    override getSimplifiedGeometry(squaredTolerance: number): GeometryCollection;
    /**
     * @return {boolean} Is empty.
     */
    isEmpty(): boolean;
    /**
     * Set the geometries that make up this geometry collection.
     * @param {Array<Geometry>} geometries Geometries.
     * @api
     */
    setGeometries(geometries: Array<Geometry>): void;
    /**
     * @param {Array<Geometry>} geometries Geometries.
     */
    setGeometriesArray(geometries: Array<Geometry>): void;
}
import Geometry from './Geometry.js';
//# sourceMappingURL=GeometryCollection.d.ts.map