/**
 * Parse a pqr file from str and create atoms. A pqr file is assumed to be a
 * whitespace delimited PDB with charge and radius fields.
 *
 * @param {string}
 *            str
 * @param {ParserOptionsSpec}
 *            options - noSecondaryStructure (do not compute ss)
* @category Parsers
 */
export declare function PQR(str: any, options: any): any[][] & Record<string, any>;
