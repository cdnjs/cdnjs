import { IMove } from "../../../Interfaces/Options/Particles/IMove";
import { MoveDirection } from "../../../Enums/MoveDirection";
import { OutMode } from "../../../Enums/OutMode";
import { IAttract } from "../../../Interfaces/Options/Particles/IAttract";
import { ITrail } from "../../../Interfaces/Options/Particles/ITrail";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Move implements IMove {
    /**
     *
     * @deprecated this property is obsolete, please use the new collisions
     */
    get bounce(): boolean;
    /**
     *
     * @deprecated this property is obsolete, please use the new collisions
     */
    set bounce(value: boolean);
    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */
    get out_mode(): OutMode;
    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    set out_mode(value: OutMode);
    attract: IAttract;
    collisions: boolean;
    direction: MoveDirection;
    enable: boolean;
    outMode: OutMode;
    random: boolean;
    speed: number;
    straight: boolean;
    trail: ITrail;
    constructor();
    load(data?: RecursivePartial<IMove>): void;
}
