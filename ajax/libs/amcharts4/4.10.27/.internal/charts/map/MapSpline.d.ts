/**
 * Map spline module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLine, IMapLineProperties, IMapLineAdapters, IMapLineEvents } from "./MapLine";
import { Polyspline } from "../../core/elements/Polyspline";
import { MapSplineSeriesDataItem, MapSplineSeries } from "./MapSplineSeries";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[MapSpline]].
 */
export interface IMapSplineProperties extends IMapLineProperties {
}
/**
 * Defines events for [[MapSpline]].
 */
export interface IMapSplineEvents extends IMapLineEvents {
}
/**
 * Defines adapters for [[MapSpline]].
 *
 * @see {@link Adapter}
 */
export interface IMapSplineAdapters extends IMapLineAdapters, IMapSplineProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a spline on the map.
 *
 * @see {@link IMapSplineEvents} for a list of available events
 * @see {@link IMapSplineAdapters} for a list of available Adapters
 */
export declare class MapSpline extends MapLine {
    /**
     * Defines available properties.
     */
    _properties: IMapSplineProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapSplineAdapters;
    /**
     * Defines available events.
     */
    _events: IMapSplineEvents;
    /**
     * A visual element for the spline.
     */
    line: Polyspline;
    /**
     * A related data item.
     */
    _dataItem: MapSplineSeriesDataItem;
    /**
     * A map series this object belongs to.
     */
    series: MapSplineSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    protected createLine(): void;
    /**
     * ShortestDistance = true is not supported by MapSpline, only MapLine does support it
     * @default false
     * @param value
     * @todo: review description
     */
    shortestDistance: boolean;
}
