export default WMTSCapabilities;
/**
 * @classdesc
 * Format for reading WMTS capabilities data.
 *
 * @api
 */
declare class WMTSCapabilities extends XML {
    /**
     * @type {OWS}
     * @private
     */
    private owsParser_;
    /**
     * @inheritDoc
     */
    readFromDocument(doc: any): {};
    /**
     * @inheritDoc
     */
    readFromNode(node: any): {};
}
import XML from "./XML.js";
//# sourceMappingURL=WMTSCapabilities.d.ts.map