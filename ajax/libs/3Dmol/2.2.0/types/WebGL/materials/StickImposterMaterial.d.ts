import { ImposterMaterial } from "./ImposterMaterial";
export declare class StickImposterMaterial extends ImposterMaterial {
    shaderID: string;
    constructor(parameters?: any);
    clone<T extends this>(material?: T): T;
}
