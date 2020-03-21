import { IShadow } from "../../../Interfaces/Options/Particles/IShadow";
import { ICoordinates } from "../../../Interfaces/ICoordinates";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Shadow implements IShadow {
    blur: number;
    color: string;
    enable: boolean;
    offset: ICoordinates;
    constructor();
    load(data?: RecursivePartial<IShadow>): void;
}
