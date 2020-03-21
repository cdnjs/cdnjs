import { IParticles } from "../../../Interfaces/Options/Particles/IParticles";
import { IParticlesColor } from "../../../Interfaces/Options/Particles/IParticlesColor";
import { ILineLinked } from "../../../Interfaces/Options/Particles/ILineLinked";
import { IMove } from "../../../Interfaces/Options/Particles/IMove";
import { IParticlesNumber } from "../../../Interfaces/Options/Particles/IParticlesNumber";
import { IOpacity } from "../../../Interfaces/Options/Particles/IOpacity";
import { IShape } from "../../../Interfaces/Options/Particles/Shape/IShape";
import { ISize } from "../../../Interfaces/Options/Particles/ISize";
import { IRotate } from "../../../Interfaces/Options/Particles/IRotate";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Particles implements IParticles {
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     */
    get line_linked(): ILineLinked;
    /**
     *
     * @deprecated this property is obsolete, please use the new lineLinked
     * @param value
     */
    set line_linked(value: ILineLinked);
    color: IParticlesColor;
    lineLinked: ILineLinked;
    move: IMove;
    number: IParticlesNumber;
    opacity: IOpacity;
    rotate: IRotate;
    shape: IShape;
    size: ISize;
    constructor();
    load(data?: RecursivePartial<IParticles>): void;
}
