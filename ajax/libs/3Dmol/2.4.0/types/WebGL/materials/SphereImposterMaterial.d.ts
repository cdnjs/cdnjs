import { ImposterMaterial } from "./ImposterMaterial";
export declare class SphereImposterMaterial extends ImposterMaterial {
    shaderID: string;
    constructor(parameters?: any);
    clone<T extends this>(material?: T): T;
}
