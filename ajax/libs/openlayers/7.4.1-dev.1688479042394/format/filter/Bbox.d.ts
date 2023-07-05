export default Bbox;
/**
 * @classdesc
 * Represents a `<BBOX>` operator to test whether a geometry-valued property
 * intersects a fixed bounding box
 *
 * @api
 */
declare class Bbox extends Filter {
    /**
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../../extent.js").Extent} extent Extent.
     * @param {string} [srsName] SRS name. No srsName attribute will be set
     * on geometries when this is not provided.
     */
    constructor(geometryName: string, extent: import("../../extent.js").Extent, srsName?: string | undefined);
    /**
     * @type {!string}
     */
    geometryName: string;
    /**
     * @type {import("../../extent.js").Extent}
     */
    extent: import("../../extent.js").Extent;
    /**
     * @type {string|undefined}
     */
    srsName: string | undefined;
}
import Filter from './Filter.js';
//# sourceMappingURL=Bbox.d.ts.map