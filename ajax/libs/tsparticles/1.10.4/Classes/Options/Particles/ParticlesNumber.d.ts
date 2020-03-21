import { IParticlesNumber } from "../../../Interfaces/Options/Particles/IParticlesNumber";
import { IDensity } from "../../../Interfaces/Options/Particles/IDensity";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class ParticlesNumber implements IParticlesNumber {
    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    get max(): number;
    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    set max(value: number);
    density: IDensity;
    limit: number;
    value: number;
    constructor();
    load(data?: RecursivePartial<IParticlesNumber>): void;
}
