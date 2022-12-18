export default Intersects;
/**
 * @classdesc
 * Represents a `<Intersects>` operator to test whether a geometry-valued property
 * intersects a given geometry.
 * @api
 */
declare class Intersects extends Spatial {
    /**
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../geom/Geometry.js").default} geometry Geometry.
     * @param {string} [opt_srsName] SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     */
    constructor(geometryName: string, geometry: import("../../geom/Geometry.js").default, opt_srsName?: string | undefined);
}
import Spatial from "./Spatial.js";
//# sourceMappingURL=Intersects.d.ts.map