import { Character } from "../types";
/**
 * Given a node, generate an array of split text and nodes.
 */
export declare const constructQueueFromNodes: (el: Element) => Character[];
/**
 * Construct a character object to be placed in the queue.
 * When a `null` node is passed, it's being used as a quick
 * way to add a single text node to the element.
 */
export declare const createCharacterObject: (content: string | Node, node?: null | Node) => Character;
/**
 * Convert string to array of chunks that will be later
 * used to construct a TypeIt queue.
 */
export declare function chunkStringAsHtml(string: string): Character[];
/**
 * Given a string, chunk it into array items to be later
 * converted to queue items for typing.
 *
 * @param {string} str
 * @param {boolean} asHtml
 * @return {array}
 */
export declare function maybeChunkStringAsHtml(str: string, asHtml?: boolean): Character[];
