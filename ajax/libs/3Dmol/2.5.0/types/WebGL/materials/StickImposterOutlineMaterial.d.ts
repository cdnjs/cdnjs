import { Color } from "../../colors";
import { ImposterMaterial } from "./ImposterMaterial";
export declare class StickImposterOutlineMaterial extends ImposterMaterial {
    shaderID: string;
    outlineColor: Color;
    outlineWidth: number;
    outlinePushback: number;
    outlineMaxPixels: number;
    constructor(parameters?: Record<keyof StickImposterOutlineMaterial, unknown> & {
        width?: number;
        pushback?: number;
        maxpixels?: number;
    });
    clone<T extends this>(material?: T): T;
}
