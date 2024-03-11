import { ParserOptionsSpec } from "./ParserOptionsSpec";
/**
 * Parse a gro file from str and create atoms
 *
 * @param {string}
 *            str
 * @param {ParserOptionsSpec}
 *            options*
 * @category Parsers
*/
export declare function GRO(str: string, options: ParserOptionsSpec): any[][] & Record<string, any>;
