import { Material } from "./Material";
export declare class MeshOutlineMaterial extends Material {
    fog: boolean;
    shaderID: string;
    wireframe: boolean;
    outlineColor: any;
    outlineWidth: any;
    outlinePushback: any;
    constructor(parameters?: any);
    clone<T extends this>(material?: T): T;
}
