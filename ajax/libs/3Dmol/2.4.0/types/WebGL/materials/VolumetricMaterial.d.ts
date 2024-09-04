import { Color } from "../../colors";
import { Material } from "./Material";
export declare class VolumetricMaterial extends Material {
    transparent: boolean;
    volumetric: boolean;
    color: Color;
    transferfn: any;
    map: any;
    extent: any[];
    maxdepth: number;
    unit: number;
    texmatrix: any;
    transfermin: number;
    transfermax: number;
    subsamples: number;
    shaderID: string;
    side: number;
    constructor(parameters?: any);
    clone<T extends this>(material?: T): T;
}
