import { ParserOptionsSpec } from "./ParserOptionsSpec";
import { AtomSpec } from "specs";
/**
 * Puts atoms specified in mmCIF fromat in str into atoms
 *
 * @param {string} str
 * @param {ParserOptionsSpec} options
 * @category Parsers
 */
export declare function CIF(str: string, options?: ParserOptionsSpec): AtomSpec[][] & {
    modelData?: unknown;
};
