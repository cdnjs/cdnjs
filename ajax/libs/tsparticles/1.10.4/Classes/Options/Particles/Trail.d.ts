import { ITrail } from "../../../Interfaces/Options/Particles/ITrail";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Trail implements ITrail {
    enable: boolean;
    length: number;
    fillColor: string;
    constructor();
    load(data?: RecursivePartial<ITrail>): void;
}
