/**
 * @module ol/format/XML
 */
import {isDocument, isNode, parse} from '../xml.js';

/**
 * @classdesc
 * Generic format for reading non-feature XML data
 *
 * @abstract
 */
var XML = function XML () {};

XML.prototype.read = function read (source) {
  if (isDocument(source)) {
    return this.readFromDocument(/** @type {Document} */ (source));
  } else if (isNode(source)) {
    return this.readFromNode(/** @type {Node} */ (source));
  } else if (typeof source === 'string') {
    var doc = parse(source);
    return this.readFromDocument(doc);
  } else {
    return null;
  }
};

/**
 * @abstract
 * @param {Document} doc Document.
 * @return {Object} Object
 */
XML.prototype.readFromDocument = function readFromDocument (doc) {};

/**
 * @abstract
 * @param {Node} node Node.
 * @return {Object} Object
 */
XML.prototype.readFromNode = function readFromNode (node) {};

export default XML;

//# sourceMappingURL=XML.js.map