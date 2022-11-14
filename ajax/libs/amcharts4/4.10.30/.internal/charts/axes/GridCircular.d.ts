/**
 * A module defining functionality for circular axis grid elements.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Grid, IGridProperties, IGridAdapters, IGridEvents } from "./Grid";
import { Percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[GridCircular]].
 */
export interface IGridCircularProperties extends IGridProperties {
    /**
     * Inner radius of the circular grid. (absolute or relative)
     */
    innerRadius: number | Percent;
    /**
     * Outer radius of the circular grid. (absolute or relative)
     */
    radius: number | Percent;
}
/**
 * Defines events for [[GridCircular]].
 */
export interface IGridCircularEvents extends IGridEvents {
}
/**
 * Defines adapters for [[GridCircular]].
 *
 * @see {@link Adapter}
 */
export interface IGridCircularAdapters extends IGridAdapters, IGridCircularProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a circular grid element for circular-type axis.
 *
 * @see {@link IGridCircularEvents} for a list of available events
 * @see {@link IGridCircularAdapters} for a list of available Adapters
 * @todo Review: container is better, as we'll be able to attach something to the GridCircular, also with 3d charts we might need some additional elements
 */
export declare class GridCircular extends Grid {
    /**
     * Defines available properties.
     */
    _properties: IGridCircularProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IGridCircularAdapters;
    /**
     * Defines available events.
     */
    _events: IGridCircularEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Inner radius of the circular grid. (absolute or relative)
     *
     * @param value Inner radius
     */
    /**
    * @return Inner radius
    */
    innerRadius: number | Percent;
    /**
     * Outer radius of the circular grid. (absolute or relative)
     *
     * @param value Outer radius
     */
    /**
    * @return Outer radius
    */
    radius: number | Percent;
}
