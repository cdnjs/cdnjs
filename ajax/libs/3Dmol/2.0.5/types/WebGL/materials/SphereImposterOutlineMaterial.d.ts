import { Color } from "../../colors";
import { ImposterMaterial } from "./ImposterMaterial";
export declare class SphereImposterOutlineMaterial extends ImposterMaterial {
    outlineColor: Color;
    outlineWidth: number;
    outlinePushback: number;
    constructor(parameters?: any);
    clone<T extends this>(material?: T): T;
}
