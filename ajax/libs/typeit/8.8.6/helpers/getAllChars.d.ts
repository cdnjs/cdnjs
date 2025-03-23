import { El } from "../types";
/**
 * Get a flattened array of text nodes that have been typed.
 * This excludes any cursor character that might exist.
 */
declare let getAllChars: (element: El) => any[];
export default getAllChars;
