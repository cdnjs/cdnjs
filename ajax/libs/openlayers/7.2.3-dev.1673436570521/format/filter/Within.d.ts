export default Within;
/**
 * @classdesc
 * Represents a `<Within>` operator to test whether a geometry-valued property
 * is within a given geometry.
 * @api
 */
declare class Within extends Spatial {
    /**
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../geom/Geometry.js").default} geometry Geometry.
     * @param {string} [srsName] SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     */
    constructor(geometryName: string, geometry: import("../../geom/Geometry.js").default, srsName?: string | undefined);
}
import Spatial from "./Spatial.js";
//# sourceMappingURL=Within.d.ts.map