import { IPolygonShape } from "../../../../Interfaces/Options/Particles/Shape/IPolygonShape";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class PolygonShape implements IPolygonShape {
    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     */
    get nb_sides(): number;
    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     * @param value
     */
    set nb_sides(value: number);
    sides: number;
    constructor();
    load(data?: RecursivePartial<IPolygonShape>): void;
}
