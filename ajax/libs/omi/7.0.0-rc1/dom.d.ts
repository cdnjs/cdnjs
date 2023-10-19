/**
 * Create an element with the given nodeName.
 * @param {string} nodeName The DOM node to create
 * @param {boolean} [isSvg=false] If `true`, creates an element within the SVG
 *  namespace.
 * @returns {Element} The created DOM node
 */
export declare function createNode(nodeName: string, isSvg: boolean): HTMLElement | SVGElement;
/**
 * Remove a child node from its parent if attached.
 * @param {Node} node The node to remove
 */
export declare function removeNode(node: Element): void;
/**
 * Set a named attribute on the given Node, with special behavior for some names
 * and event handlers. If `value` is `null`, the attribute/handler will be
 * removed.
 * @param {Element} node An element to mutate
 * @param {string} name The name/key to set, such as an event or attribute name
 * @param {*} old The last value that was set for this name/node pair
 * @param {*} value An attribute value, such as a function to be used as an
 *  event handler
 * @param {boolean} isSvg Are we currently diffing inside an svg?
 * @private
 */
export declare function setAccessor(node: HTMLElement, name: string, old: any, value: any, isSvg: boolean): void;
