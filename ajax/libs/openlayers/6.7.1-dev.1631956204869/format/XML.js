/**
 * @module ol/format/XML
 */
import { isDocument, parse } from '../xml.js';
/**
 * @classdesc
 * Generic format for reading non-feature XML data
 *
 * @abstract
 */
var XML = /** @class */ (function () {
    function XML() {
    }
    /**
     * Read the source document.
     *
     * @param {Document|Element|string} source The XML source.
     * @return {Object} An object representing the source.
     * @api
     */
    XML.prototype.read = function (source) {
        if (!source) {
            return null;
        }
        else if (typeof source === 'string') {
            var doc = parse(source);
            return this.readFromDocument(doc);
        }
        else if (isDocument(source)) {
            return this.readFromDocument(/** @type {Document} */ (source));
        }
        else {
            return this.readFromNode(/** @type {Element} */ (source));
        }
    };
    /**
     * @param {Document} doc Document.
     * @return {Object} Object
     */
    XML.prototype.readFromDocument = function (doc) {
        for (var n = doc.firstChild; n; n = n.nextSibling) {
            if (n.nodeType == Node.ELEMENT_NODE) {
                return this.readFromNode(/** @type {Element} */ (n));
            }
        }
        return null;
    };
    /**
     * @abstract
     * @param {Element} node Node.
     * @return {Object} Object
     */
    XML.prototype.readFromNode = function (node) { };
    return XML;
}());
export default XML;
//# sourceMappingURL=XML.js.map