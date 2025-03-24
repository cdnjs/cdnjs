import { Matrix4 } from "../../WebGL";
import { ParserOptionsSpec } from "../ParserOptionsSpec";
import { AtomSpec, Cryst } from "specs";
export declare function getSinglePDB(lines: string[], options: ParserOptionsSpec, sslookup: {
    [x: string]: {
        [x: string]: string;
    };
    hasOwnProperty?: any;
}): [
    AtomSpec[],
    {
        symmetries: Matrix4[];
        cryst: Omit<Cryst, "origin" | "size" | "unit" | "matrix4" | "matrix">;
    },
    string[]
];
