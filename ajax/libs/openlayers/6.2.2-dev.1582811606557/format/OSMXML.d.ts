export default OSMXML;
/**
 * @classdesc
 * Feature format for reading data in the
 * [OSMXML format](http://wiki.openstreetmap.org/wiki/OSM_XML).
 *
 * @api
 */
declare class OSMXML extends XMLFeature {
    /**
     * @inheritDoc
     */
    readFeaturesFromNode(node: any, opt_options: any): any[];
}
import XMLFeature from "./XMLFeature.js";
//# sourceMappingURL=OSMXML.d.ts.map