import { IDivEvent } from "../../../../Interfaces/Options/Interactivity/Events/IDivEvent";
import { DivMode } from "../../../../Enums/Modes/DivMode";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class DivEvent implements IDivEvent {
    /**
     *
     * @deprecated this property is obsolete, please use the new elementId
     */
    get el(): string;
    /**
     *
     * @deprecated this property is obsolete, please use the new elementId
     * @param value
     */
    set el(value: string);
    elementId: string;
    enable: boolean;
    mode: DivMode | DivMode[];
    constructor();
    load(data?: RecursivePartial<IDivEvent>): void;
}
