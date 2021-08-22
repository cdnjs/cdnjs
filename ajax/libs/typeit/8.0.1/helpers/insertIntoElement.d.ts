import { Character, Element } from "../types";
/**
 * Given a node, find the corresponding PRINTED node already in an element.
 */
export declare const findPrintedNode: (node: Element, elementToSearch: Element) => Element;
/**
 * Determine if a given node is the _last_ child in the element.
 * This will allow us to know if we should continue typing into it,
 * or if we should create another node to append at the end.
 */
export declare const isLastElement: (node: Node, nodeToIgnore: Node | null) => boolean;
/**
 * Inserts a set of content into the element. Intended for SINGLE characters.
 */
declare const insertIntoElement: (targetElement: Element, character: Character, cursorNode: Element, cursorPosition: number) => void;
export default insertIntoElement;
