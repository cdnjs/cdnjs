import { IAttract } from "../../../Interfaces/Options/Particles/IAttract";
import { ICoordinates } from "../../../Interfaces/ICoordinates";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Attract implements IAttract {
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     */
    get rotateX(): number;
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.x
     * @param value
     */
    set rotateX(value: number);
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     */
    get rotateY(): number;
    /**
     *
     * @deprecated this property is obsolete, please use the new rotate.y
     * @param value
     */
    set rotateY(value: number);
    enable: boolean;
    rotate: ICoordinates;
    constructor();
    load(data?: RecursivePartial<IAttract>): void;
}
