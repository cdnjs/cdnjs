import { IRotate } from "../../../Interfaces/Options/Particles/IRotate";
import { IRotateAnimation } from "../../../Interfaces/Options/Particles/IRotateAnimation";
import { RotateDirection } from "../../../Enums/RotateDirection";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Rotate implements IRotate {
    animation: IRotateAnimation;
    direction: RotateDirection;
    random: boolean;
    value: number;
    constructor();
    load(data?: RecursivePartial<IRotate>): void;
}
