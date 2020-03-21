import { ILineLinked } from "../../../Interfaces/Options/Particles/ILineLinked";
import { ILineLinkedShadow } from "../../../Interfaces/Options/Particles/ILineLinkedShadow";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class LineLinked implements ILineLinked {
    blink: boolean;
    color: string;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    shadow: ILineLinkedShadow;
    width: number;
    constructor();
    load(data?: RecursivePartial<ILineLinked>): void;
}
