import { IPush } from "../../../../Interfaces/Options/Interactivity/Modes/IPush";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Push implements IPush {
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    get particles_nb(): number;
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    set particles_nb(value: number);
    quantity: number;
    constructor();
    load(data?: RecursivePartial<IPush>): void;
}
