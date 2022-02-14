/**
 * Axis Tick module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Tick, ITickProperties, ITickAdapters, ITickEvents } from "../elements/Tick";
import { AxisItemLocation, AxisDataItem, Axis } from "./Axis";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisTick]].
 */
export interface IAxisTickProperties extends ITickProperties {
    /**
     * Relative location of the tick. (0-1)
     */
    location?: number;
    /**
     * Draw the tick on the inside of the Axis?
     */
    inside?: boolean;
    /**
     * Normally fill goes below series. Set this to `true` to go above.
     *
     * @default false
     */
    above?: boolean;
}
/**
 * Defines events for [[AxisTick]].
 */
export interface IAxisTickEvents extends ITickEvents {
}
/**
 * Defines adapter for [[AxisTick]].
 *
 * @see {@link Adapter}
 */
export interface IAxisTickAdapters extends ITickAdapters, IAxisTickProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws an axis tick
 * @see {@link IAxisTickEvents} for a list of available events
 * @see {@link IAxisTickAdapters} for a list of available Adapters
 */
export declare class AxisTick extends Tick {
    /**
     * Defines available properties
     */
    _properties: IAxisTickProperties;
    /**
     * Defines available adapters
     */
    _adapter: IAxisTickAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisTickEvents;
    _dataItem: AxisDataItem;
    /**
     * A referece to Axis element this tick is placed on.
     */
    axis: Axis;
    constructor();
    /**
     * Relative location of the tick. (0-1)
     *
     * @param value  Location (0-1)
     */
    /**
    * @return Location (0-1)
    */
    location: AxisItemLocation;
    /**
     * Sets if tick should be drawn inside axis.
     *
     * @param value  Inside?
     */
    /**
    * Returns if label is set to be drawn inside axis.
    *
    * @return Inside?
    */
    inside: boolean;
    /**
     * Normally tick goes below series. Set this to `true` to go above.
     *
     * @default false
     * @since 4.5.9
     * @param  value  Draw above series?
     */
    /**
    * @return Draw above series?
    */
    above: boolean;
    /**
     * @ignore
     */
    protected setDisabled(value: boolean): boolean;
}
