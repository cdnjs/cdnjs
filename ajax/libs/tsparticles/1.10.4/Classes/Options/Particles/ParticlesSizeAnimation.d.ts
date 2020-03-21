import { ISizeAnimation } from "../../../Interfaces/Options/Particles/ISizeAnimation";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class ParticlesSizeAnimation implements ISizeAnimation {
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    get size_min(): number;
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    set size_min(value: number);
    enable: boolean;
    minimumValue: number;
    speed: number;
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<ISizeAnimation>): void;
}
