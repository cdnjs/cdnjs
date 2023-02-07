/**
 * This parses the ChemDoodle json file format. Although this is registered
 * for the json file extension, other chemical json file formats exist that
 * this can not parse. Check which one you have and do not assume that
 * .json can be parsed
 *
 * @param {string} str
 * @param {ParserOptionsSpec} options
 * @category Parsers
 */
export declare function CDJSON(str: any, options: any): any[][] & Record<string, any>;
