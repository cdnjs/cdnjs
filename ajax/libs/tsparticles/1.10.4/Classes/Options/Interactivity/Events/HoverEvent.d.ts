import { IHoverEvent } from "../../../../Interfaces/Options/Interactivity/Events/IHoverEvent";
import { HoverMode } from "../../../../Enums/Modes/HoverMode";
import { IParallax } from "../../../../Interfaces/Options/Interactivity/Events/IParallax";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class HoverEvent implements IHoverEvent {
    enable: boolean;
    mode: HoverMode | HoverMode[];
    parallax: IParallax;
    constructor();
    load(data?: RecursivePartial<IHoverEvent>): void;
}
