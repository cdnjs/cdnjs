import { MeshLambertMaterial } from "./MeshLambertMaterial";
export declare class MeshDoubleLambertMaterial extends MeshLambertMaterial {
    shaderID: string;
    side: number;
    outline: boolean;
    constructor(parameters?: any);
    clone<T extends this>(material?: T): T;
}
