import { ILineLinkedShadow } from "../../../Interfaces/Options/Particles/ILineLinkedShadow";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class LineLinkedShadow implements ILineLinkedShadow {
    blur: number;
    color: string;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<ILineLinkedShadow>): void;
}
