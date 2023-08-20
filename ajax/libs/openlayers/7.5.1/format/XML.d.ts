export default XML;
/**
 * @classdesc
 * Generic format for reading non-feature XML data
 *
 * @abstract
 */
declare class XML {
    /**
     * Read the source document.
     *
     * @param {Document|Element|string} source The XML source.
     * @return {Object} An object representing the source.
     * @api
     */
    read(source: Document | Element | string): any;
    /**
     * @param {Document} doc Document.
     * @return {Object} Object
     */
    readFromDocument(doc: Document): any;
    /**
     * @abstract
     * @param {Element} node Node.
     * @return {Object} Object
     */
    readFromNode(node: Element): any;
}
//# sourceMappingURL=XML.d.ts.map