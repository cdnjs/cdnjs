import { IPolygonMask } from "../../../Interfaces/Options/PolygonMask/IPolygonMask";
import { PolygonMaskType } from "../../../Enums/PolygonMaskType";
import { IPolygonMaskDraw } from "../../../Interfaces/Options/PolygonMask/IPolygonMaskDraw";
import { IPolygonMaskMove } from "../../../Interfaces/Options/PolygonMask/IPolygonMaskMove";
import { PolygonMaskInlineArrangement } from "../../../Enums/PolygonMaskInlineArrangement";
import { IPolygonInline } from "../../../Interfaces/Options/PolygonMask/IPolygonInline";
import { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class PolygonMask implements IPolygonMask {
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    get inlineArrangement(): PolygonMaskInlineArrangement;
    /**
     * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
     */
    set inlineArrangement(value: PolygonMaskInlineArrangement);
    draw: IPolygonMaskDraw;
    enable: boolean;
    inline: IPolygonInline;
    move: IPolygonMaskMove;
    scale: number;
    type: PolygonMaskType;
    url: string;
    constructor();
    load(data?: RecursivePartial<IPolygonMask>): void;
}
