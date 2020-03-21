import { ICharacterShape } from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class CharacterShape implements ICharacterShape {
    fill: boolean;
    font: string;
    style: string;
    value: string | string[];
    weight: string;
    constructor();
    load(data?: RecursivePartial<ICharacterShape>): void;
}
