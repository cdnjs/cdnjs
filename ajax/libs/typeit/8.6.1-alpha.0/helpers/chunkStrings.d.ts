import { Element } from "../types";
export declare function walkElementNodes(element: Element | Node, shouldReverse?: boolean): Element[];
/**
 * Convert string to array of chunks that will be later
 * used to construct a TypeIt queue.
 */
export declare function chunkStringAsHtml(string: string): Element[];
/**
 * Given a string, chunk it into array items to be later
 * converted to queue items for typing.
 *
 * @param {string} str
 * @param {boolean} asHtml
 * @return {array}
 */
export declare function maybeChunkStringAsHtml(str: string, asHtml?: boolean): Partial<Element>[];
