import { IConnect } from "../../../../Interfaces/Options/Interactivity/Modes/IConnect";
import { IConnectLineLinked } from "../../../../Interfaces/Options/Interactivity/Modes/IConnectLineLinked";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Connect implements IConnect {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    get line_linked(): IConnectLineLinked;
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    set line_linked(value: IConnectLineLinked);
    distance: number;
    lineLinked: IConnectLineLinked;
    radius: number;
    constructor();
    load(data?: RecursivePartial<IConnect>): void;
}
