import { ParserOptionsSpec } from "./ParserOptionsSpec";
import { AtomSpec } from "specs";
export declare function CIF(str: string, options?: ParserOptionsSpec): AtomSpec[][] & {
    modelData?: unknown;
};
