/**
 * Axis Label module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Label, ILabelProperties, ILabelAdapters, ILabelEvents } from "../../core/elements/Label";
import { AxisItemLocation, AxisDataItem, Axis } from "./Axis";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisLabel]].
 */
export interface IAxisLabelProperties extends ILabelProperties {
    /**
     * Relative location of the label. (0-1)
     */
    location?: number;
    /**
     * Draw the label on the inside of the Axis?
     */
    inside?: boolean;
}
/**
 * Defines events for [[AxisLabel]].
 */
export interface IAxisLabelEvents extends ILabelEvents {
}
/**
 * Defines adapters for [[AxisLabel]].
 *
 * @see {@link Adapter}
 */
export interface IAxisLabelAdapters extends ILabelAdapters, IAxisLabelProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Use to create labels on Axis.
 *
 * @see {@link IAxisLabelEvents} for a list of available events
 * @see {@link IAxisLabelAdapters} for a list of available Adapters
 * @important
 */
export declare class AxisLabel extends Label {
    /**
     * Defines available properties.
     */
    _properties: IAxisLabelProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisLabelAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisLabelEvents;
    /**
     * Related data item.
     */
    _dataItem: AxisDataItem;
    /**
     * A referecent to Axis element this fill is applied to.
     */
    axis: Axis;
    /**
     * Constructor
     */
    constructor();
    /**
     * Relative location of the label. (0-1)
     *
     * @param value  Location (0-1)
     */
    /**
    * @return Location (0-1)
    */
    location: AxisItemLocation;
    /**
     * Sets if label should be drawn inside axis.
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
     * @ignore
     */
    protected setDisabled(value: boolean): boolean;
}
