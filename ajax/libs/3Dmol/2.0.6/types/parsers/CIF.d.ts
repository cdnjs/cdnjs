import { ParserOptionsSpec } from './ParserOptionsSpec';
/**
 * Puts atoms specified in mmCIF fromat in str into atoms
 *
 * @param {string} str
 * @param {ParserOptionsSpec} options
 * @category Parsers
*/
export declare function CIF(str: string, options?: ParserOptionsSpec): any[] & Record<string, any>;
