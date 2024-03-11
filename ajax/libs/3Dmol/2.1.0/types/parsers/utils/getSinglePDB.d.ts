import { Matrix4 } from "../../WebGL";
import { ParserOptionsSpec } from "../ParserOptionsSpec";
import { AtomSpec, Cryst } from "specs";
export declare function getSinglePDB(lines: string[], options: ParserOptionsSpec, sslookup: {
    [x: string]: {
        [x: string]: string;
    };
    hasOwnProperty?: any;
}): [AtomSpec[], {
    symmetries: Matrix4[];
    cryst: Cryst;
}, string[]];
