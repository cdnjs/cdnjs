import { IInteractivity } from "../../../Interfaces/Options/Interactivity/IInteractivity";
import { InteractivityDetect } from "../../../Enums/InteractivityDetect";
import { Events } from "./Events/Events";
import { Modes } from "./Modes/Modes";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Interactivity implements IInteractivity {
    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     */
    get detect_on(): InteractivityDetect;
    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     * @param value
     */
    set detect_on(value: InteractivityDetect);
    detectsOn: InteractivityDetect;
    events: Events;
    modes: Modes;
    constructor();
    load(data?: RecursivePartial<IInteractivity>): void;
}
