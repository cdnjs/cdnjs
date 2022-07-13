import { El } from "../types";
export declare function walkElementNodes(element: El | Node, shouldReverse?: boolean, shouldIncludeCursor?: boolean): El[];
/**
 * Convert string to array of chunks that will be later
 * used to construct a TypeIt queue.
 */
export declare function chunkStringAsHtml(string: string): El[];
/**
 * Given a string, chunk it into array items to be later
 * converted to queue items for typing.
 *
 * @param {string} str
 * @param {boolean} asHtml
 * @return {array}
 */
export declare function maybeChunkStringAsHtml(str: string, asHtml?: boolean): Partial<El>[];
