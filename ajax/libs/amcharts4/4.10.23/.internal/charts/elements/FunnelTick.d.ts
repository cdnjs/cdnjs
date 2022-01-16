/**
 * Funnel tick module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Tick, ITickProperties, ITickAdapters, ITickEvents } from "../elements/Tick";
import { Label } from "../../core/elements/Label";
import { FunnelSlice } from "./FunnelSlice";
import { MutableValueDisposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[FunnelTick]].
 */
export interface IFunnelTickProperties extends ITickProperties {
    locationX?: number;
    locationY?: number;
}
/**
 * Defines events for [[FunnelTick]].
 */
export interface IFunnelTickEvents extends ITickEvents {
}
/**
 * Defines adapters for [[FunnelTick]].
 *
 * @see {@link Adapter}
 */
export interface IFunnelTickAdapters extends ITickAdapters, IFunnelTickProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws an tick line for a funnel slice connecting it to a related label.
 *
 * @see {@link IFunnelTickEvents} for a list of available events
 * @see {@link IFunnelTickAdapters} for a list of available Adapters
 */
export declare class FunnelTick extends Tick {
    /**
     * Defines available properties.
     */
    _properties: IFunnelTickProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IFunnelTickAdapters;
    /**
     * Defines available events.
     */
    _events: IFunnelTickEvents;
    /**
     * A label element this tick is attached to.
     */
    protected _label: MutableValueDisposer<Label>;
    /**
     * A slice element this tick is attached to.
     */
    protected _slice: MutableValueDisposer<FunnelSlice>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the tick element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * [[FunnelSlice]] element tick is attached to.
     *
     * @param slice  Slice
     */
    /**
    * @return FunnelSlice
    */
    slice: FunnelSlice;
    /**
     * [[Label]] element tick is attached to.
     *
     * @param label  Label
     */
    /**
    * @return Label
    */
    label: Label;
    /**
     * A relative horizontal position within target element a tick is pointing
     * to.
     *
     * A scale is from 0 to 1, where 0 means left edge, and 1 right edge.
     *
     * You can also set any value in-between (e.g. 0.5 will point to the middle
     * of the slice), or outside 0-1 range, which will put tick anchor position
     * outside target element.
     *
     * @param value  Location (0-1)
     */
    /**
    * @return Location (0-1)
    */
    locationX: number;
    /**
     * A relative vertical position within target element a tick is pointing
     * to.
     *
     * A scale is from 0 to 1, where 0 means top edge, and 1 bottom edge.
     *
     * You can also set any value in-between (e.g. 0.5 will point to the middle
     * of the slice), or outside 0-1 range, which will put tick anchor position
     * outside target element.
     *
     * @param value  Location (0-1)
     */
    /**
    * @return Location (0-1)
    */
    locationY: number;
}
