import { IOpacity } from "../../../Interfaces/Options/Particles/IOpacity";
import { IOpacityAnimation } from "../../../Interfaces/Options/Particles/IOpacityAnimation";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Opacity implements IOpacity {
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     */
    get anim(): IOpacityAnimation;
    /**
     *
     * @deprecated this property is obsolete, please use the new animation
     * @param value
     */
    set anim(value: IOpacityAnimation);
    animation: IOpacityAnimation;
    random: boolean;
    value: number;
    constructor();
    load(data?: RecursivePartial<IOpacity>): void;
}
