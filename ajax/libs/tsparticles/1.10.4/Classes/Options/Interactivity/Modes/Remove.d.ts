import { IRemove } from "../../../../Interfaces/Options/Interactivity/Modes/IRemove";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Remove implements IRemove {
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
    load(data?: RecursivePartial<IRemove>): void;
}
