import { IRepulse } from "../../../../Interfaces/Options/Interactivity/Modes/IRepulse";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Repulse implements IRepulse {
    distance: number;
    duration: number;
    constructor();
    load(data?: RecursivePartial<IRepulse>): void;
}
