import { IConnectLineLinked } from "../../../../Interfaces/Options/Interactivity/Modes/IConnectLineLinked";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class ConnectLineLinked implements IConnectLineLinked {
    opacity: number;
    constructor();
    load(data?: RecursivePartial<IConnectLineLinked>): void;
}
