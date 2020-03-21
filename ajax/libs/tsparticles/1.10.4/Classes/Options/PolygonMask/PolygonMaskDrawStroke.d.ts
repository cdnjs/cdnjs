import { IPolygonMaskDrawStroke } from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDrawStroke";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke {
    color: string;
    width: number;
    constructor();
    load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void;
}
