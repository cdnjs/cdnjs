import { IGrab } from "../../../../Interfaces/Options/Interactivity/Modes/IGrab";
import { IGrabLineLinked } from "../../../../Interfaces/Options/Interactivity/Modes/IGrabLineLinked";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Grab implements IGrab {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    get line_linked(): IGrabLineLinked;
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    set line_linked(value: IGrabLineLinked);
    distance: number;
    lineLinked: IGrabLineLinked;
    constructor();
    load(data?: RecursivePartial<IGrab>): void;
}
