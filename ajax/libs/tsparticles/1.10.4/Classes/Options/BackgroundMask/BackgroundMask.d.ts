import { IBackgroundMask } from "../../../Interfaces/Options/BackgroundMask/IBackgroundMask";
import { IParticlesColor } from "../../../Interfaces/Options/Particles/IParticlesColor";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class BackgroundMask implements IBackgroundMask {
    cover?: IParticlesColor;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<IBackgroundMask>): void;
}
