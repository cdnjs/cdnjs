import { IBubble } from "../../../../Interfaces/Options/Interactivity/Modes/IBubble";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Bubble implements IBubble {
    distance: number;
    duration: number;
    opacity: number;
    size: number;
    constructor();
    load(data?: RecursivePartial<IBubble>): void;
}
