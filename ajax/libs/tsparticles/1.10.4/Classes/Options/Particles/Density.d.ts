import { IDensity } from "../../../Interfaces/Options/Particles/IDensity";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Density implements IDensity {
    /**
     *
     * @deprecated this property is obsolete, please use the new area
     */
    get value_area(): number;
    /**
     *
     * @deprecated this property is obsolete, please use the new area
     * @param value
     */
    set value_area(value: number);
    enable: boolean;
    area: number;
    constructor();
    load(data?: RecursivePartial<IDensity>): void;
}
