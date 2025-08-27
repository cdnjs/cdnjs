export default Contains;
/**
 * @classdesc
 * Represents a `<Contains>` operator to test whether a geometry-valued property
 * contains a given geometry.
 * @api
 */
declare class Contains extends Spatial {
    /**
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../geom/Geometry.js").default} geometry Geometry.
     * @param {string} [srsName] SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     */
    constructor(geometryName: string, geometry: import("../../geom/Geometry.js").default, srsName?: string);
}
import Spatial from './Spatial.js';
//# sourceMappingURL=Contains.d.ts.map