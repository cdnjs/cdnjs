import { IStroke } from "../../../../Interfaces/Options/Particles/Shape/IStroke";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Stroke implements IStroke {
    color: string;
    width: number;
    constructor();
    load(data?: RecursivePartial<IStroke>): void;
}
