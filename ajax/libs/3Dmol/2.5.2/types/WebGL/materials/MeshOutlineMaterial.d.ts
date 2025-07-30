import { Material } from "./Material";
export declare class MeshOutlineMaterial extends Material {
    fog: boolean;
    shaderID: string;
    wireframe: boolean;
    outlineColor: any;
    outlineWidth: number;
    outlinePushback: number;
    outlineMaxPixels: number;
    constructor(parameters?: any);
    clone<T extends this>(material?: T): T;
}
