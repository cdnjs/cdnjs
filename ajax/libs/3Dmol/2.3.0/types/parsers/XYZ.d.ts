import { ParserOptionsSpec } from './ParserOptionsSpec';
/**
 * Read an XYZ file from str and return result
 *
 * @param {string} str
 * @param {ParserOptionsSpec} options
 * @category Parsers
*/
export declare function XYZ(str: string, options: ParserOptionsSpec): any[][] & Record<string, any>;
