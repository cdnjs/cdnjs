import { AtomSpec } from "specs";
import { ParserOptionsSpec } from "./ParserOptionsSpec";
/**
 * Parse a gro file from str and create atoms
 *
 * @param {string} str
 * @param {ParserOptionsSpec} options
 * @category Parsers
 * @returns {Array<AtomSpec[]>} - Returns a 2D array of type AtomSpec
 */
export declare function GRO(str: string, options: ParserOptionsSpec): AtomSpec[][] & {
    box?: string[];
};
