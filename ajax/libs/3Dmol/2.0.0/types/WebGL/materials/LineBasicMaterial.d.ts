import { Color } from "../../colors";
import { Material } from "./Material";
export declare class LineBasicMaterial extends Material {
    color: Color;
    linewidth: number;
    linecap: string;
    linejoin: string;
    vertexColors: boolean;
    fog: boolean;
    shaderID: string;
    constructor(parameters?: any);
    clone<T extends this>(material?: T): T;
}
