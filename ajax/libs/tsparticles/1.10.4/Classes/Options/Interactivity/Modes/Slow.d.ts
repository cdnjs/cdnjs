import { ISlow } from "../../../../Interfaces/Options/Interactivity/Modes/ISlow";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Slow implements ISlow {
    active: boolean;
    factor: number;
    radius: number;
    constructor();
    load(data?: RecursivePartial<ISlow>): void;
}
