import { IPolygonMaskMove } from "../../../Interfaces/Options/PolygonMask/IPolygonMaskMove";
import { PolygonMaskMoveType } from "../../../Enums/PolygonMaskMoveType";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Move implements IPolygonMaskMove {
    radius: number;
    type: PolygonMaskMoveType;
    constructor();
    load(data?: RecursivePartial<IPolygonMaskMove>): void;
}
