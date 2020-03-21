import { IParticlesColor } from "../../../Interfaces/Options/Particles/IParticlesColor";
import { IColor } from "../../../Interfaces/IColor";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Color implements IParticlesColor {
    value: string | IColor | string[];
    constructor();
    load(data?: RecursivePartial<IParticlesColor>): void;
}
