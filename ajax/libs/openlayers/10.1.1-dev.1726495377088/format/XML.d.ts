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
     * @return {Object|null} An object representing the source.
     * @api
     */
    read(source: Document | Element | string): any | null;
    /**
     * @param {Document} doc Document.
     * @return {Object|null} Object
     */
    readFromDocument(doc: Document): any | null;
    /**
     * @abstract
     * @param {Element} node Node.
     * @return {Object|null} Object
     */
    readFromNode(node: Element): any | null;
}
//# sourceMappingURL=XML.d.ts.map