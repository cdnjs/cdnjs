import { ParserOptionsSpec } from "./ParserOptionsSpec";
import { AtomSpec } from "specs";
/**
 * @param {string}
 *            str
 * @param {ParserOptionsSpec}
 *            options
 * @category Parsers
 */
export declare function CUBE(str: string, options: ParserOptionsSpec): AtomSpec[][] & {
    modelData?: unknown;
};
