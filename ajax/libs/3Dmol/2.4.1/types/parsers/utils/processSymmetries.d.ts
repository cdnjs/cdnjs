import { ParserOptionsSpec } from "parsers/ParserOptionsSpec";
import { AtomSpec, Cryst } from "specs";
export declare function processSymmetries(copyMatrices: string[] | any[], atoms: AtomSpec[], options: ParserOptionsSpec, cryst: Omit<Cryst, "origin" | "size" | "unit" | "matrix4" | "matrix">): void;
