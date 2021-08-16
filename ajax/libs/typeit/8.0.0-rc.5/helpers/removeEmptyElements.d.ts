import { Element } from "../types";
declare const _default: (node: Element, nodeToIgnore: Element) => void;
/**
 * Given a DOM scope and selector, remove any HTML element remnants,
 * EXCEPT for <br> tags, which may be typed but do not have any text content.
 */
export default _default;
