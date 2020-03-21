import { IEvents } from "../../../../Interfaces/Options/Interactivity/Events/IEvents";
import { IDivEvent } from "../../../../Interfaces/Options/Interactivity/Events/IDivEvent";
import { IHoverEvent } from "../../../../Interfaces/Options/Interactivity/Events/IHoverEvent";
import { IClickEvent } from "../../../../Interfaces/Options/Interactivity/Events/IClickEvent";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Events implements IEvents {
    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     */
    get onclick(): IClickEvent;
    /**
     *
     * @deprecated this property is obsolete, please use the new onClick
     * @param value
     */
    set onclick(value: IClickEvent);
    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     */
    get ondiv(): IDivEvent;
    /**
     *
     * @deprecated this property is obsolete, please use the new onDiv
     * @param value
     */
    set ondiv(value: IDivEvent);
    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     */
    get onhover(): IHoverEvent;
    /**
     *
     * @deprecated this property is obsolete, please use the new onHover
     * @param value
     */
    set onhover(value: IHoverEvent);
    onClick: IClickEvent;
    onDiv: IDivEvent;
    onHover: IHoverEvent;
    resize: boolean;
    constructor();
    load(data?: RecursivePartial<IEvents>): void;
}
