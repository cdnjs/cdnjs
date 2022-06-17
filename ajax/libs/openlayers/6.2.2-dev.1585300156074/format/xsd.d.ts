/**
 * @param {Node} node Node.
 * @return {boolean|undefined} Boolean.
 */
export function readBoolean(node: Node): boolean;
/**
 * @param {string} string String.
 * @return {boolean|undefined} Boolean.
 */
export function readBooleanString(string: string): boolean;
/**
 * @param {Node} node Node.
 * @return {number|undefined} DateTime in seconds.
 */
export function readDateTime(node: Node): number;
/**
 * @param {Node} node Node.
 * @return {number|undefined} Decimal.
 */
export function readDecimal(node: Node): number;
/**
 * @param {string} string String.
 * @return {number|undefined} Decimal.
 */
export function readDecimalString(string: string): number;
/**
 * @param {Node} node Node.
 * @return {number|undefined} Non negative integer.
 */
export function readNonNegativeInteger(node: Node): number;
/**
 * @param {string} string String.
 * @return {number|undefined} Non negative integer.
 */
export function readNonNegativeIntegerString(string: string): number;
/**
 * @param {Node} node Node.
 * @return {string|undefined} String.
 */
export function readString(node: Node): string;
/**
 * @param {Node} node Node to append a TextNode with the boolean to.
 * @param {boolean} bool Boolean.
 */
export function writeBooleanTextNode(node: Node, bool: boolean): void;
/**
 * @param {Node} node Node to append a CDATA Section with the string to.
 * @param {string} string String.
 */
export function writeCDATASection(node: Node, string: string): void;
/**
 * @param {Node} node Node to append a TextNode with the dateTime to.
 * @param {number} dateTime DateTime in seconds.
 */
export function writeDateTimeTextNode(node: Node, dateTime: number): void;
/**
 * @param {Node} node Node to append a TextNode with the decimal to.
 * @param {number} decimal Decimal.
 */
export function writeDecimalTextNode(node: Node, decimal: number): void;
/**
 * @param {Node} node Node to append a TextNode with the decimal to.
 * @param {number} nonNegativeInteger Non negative integer.
 */
export function writeNonNegativeIntegerTextNode(node: Node, nonNegativeInteger: number): void;
/**
 * @param {Node} node Node to append a TextNode with the string to.
 * @param {string} string String.
 */
export function writeStringTextNode(node: Node, string: string): void;
//# sourceMappingURL=xsd.d.ts.map