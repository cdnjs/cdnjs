import { ParserOptionsSpec } from "./ParserOptionsSpec";
/**
 * Parse pdb file from str and create atoms if computeStruct is true will always perform secondary structure analysis,
 * otherwise only do analysis of SHEET/HELIX comments are missing
 *
 * @param {string} str
 * @param {ParserOptionsSpec} options - keepH (do not strip hydrogens), noSecondaryStructure,
 *            assignbonds (default true, calculate implicit bonds)
 *            (do not compute ss), altLoc (which alternate location to select, if present; '*' to load all)
 * @category Parsers
 *
*/
export declare function PDB(str: string, options: ParserOptionsSpec): any[] & Record<string, any>;
