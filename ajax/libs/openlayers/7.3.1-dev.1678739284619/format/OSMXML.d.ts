export default OSMXML;
/**
 * @classdesc
 * Feature format for reading data in the
 * [OSMXML format](https://wiki.openstreetmap.org/wiki/OSM_XML).
 *
 * @api
 */
declare class OSMXML extends XMLFeature {
    /**
     * @type {import("../proj/Projection.js").default}
     */
    dataProjection: import("../proj/Projection.js").default;
}
import XMLFeature from "./XMLFeature.js";
//# sourceMappingURL=OSMXML.d.ts.map