/**
 * @param {string} str
 * @param {ParserOptionsSpec} options - keepH (do not strip hydrogens), noSecondaryStructure,
 *            assignbonds (default true, calculate implicit bonds)
 *            (do not compute ss), altLoc (which alternate location to select, if present; '*' to load all)
 * @category Parsers
 *
 */
export declare function PDB(str: any, options: any): any[] & Record<string, any>;
