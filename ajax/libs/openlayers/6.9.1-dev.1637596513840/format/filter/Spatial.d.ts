export default Spatial;
/**
 * @classdesc
 * Abstract class; normally only used for creating subclasses and not instantiated in apps.
 * Represents a spatial operator to test whether a geometry-valued property
 * relates to a given geometry.
 *
 * @abstract
 */
declare class Spatial extends Filter {
    /**
     * @param {!string} tagName The XML tag name for this filter.
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../geom/Geometry.js").default} geometry Geometry.
     * @param {string} [opt_srsName] SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     */
    constructor(tagName: string, geometryName: string, geometry: import("../../geom/Geometry.js").default, opt_srsName?: string | undefined);
    /**
     * @type {!string}
     */
    geometryName: string;
    /**
     * @type {import("../../geom/Geometry.js").default}
     */
    geometry: import("../../geom/Geometry.js").default;
    /**
     * @type {string|undefined}
     */
    srsName: string | undefined;
}
import Filter from "./Filter.js";
//# sourceMappingURL=Spatial.d.ts.map