import { ISize } from "../../../Interfaces/Options/Particles/ISize";
import { ISizeAnimation } from "../../../Interfaces/Options/Particles/ISizeAnimation";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class ParticlesSize implements ISize {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    get anim(): ISizeAnimation;
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    set anim(value: ISizeAnimation);
    animation: ISizeAnimation;
    random: boolean;
    value: number;
    constructor();
    load(data?: RecursivePartial<ISize>): void;
}
