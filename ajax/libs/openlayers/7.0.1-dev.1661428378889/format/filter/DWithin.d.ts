export default DWithin;
/**
 * @classdesc
 * Represents a `<DWithin>` operator to test whether a geometry-valued property
 * is within a distance to a given geometry.
 * @api
 */
declare class DWithin extends Spatial {
    /**
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../geom/Geometry.js").default} geometry Geometry.
     * @param {!number} distance Distance.
     * @param {!string} unit Unit.
     * @param {string} [srsName] SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     */
    constructor(geometryName: string, geometry: import("../../geom/Geometry.js").default, distance: number, unit: string, srsName?: string | undefined);
    /**
     * @public
     * @type {!number}
     */
    public distance: number;
    /**
     * @public
     * @type {!string}
     */
    public unit: string;
}
import Spatial from "./Spatial.js";
//# sourceMappingURL=DWithin.d.ts.map