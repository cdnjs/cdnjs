/**
 * Map arc series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLineSeries, MapLineSeriesDataItem, IMapLineSeriesProperties, IMapLineSeriesDataFields, IMapLineSeriesAdapters, IMapLineSeriesEvents } from "./MapLineSeries";
import { MapArc } from "./MapArc";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapArcSeries]].
 *
 * @see {@link DataItem}
 */
export declare class MapArcSeriesDataItem extends MapLineSeriesDataItem {
    /**
     * A [[MapArc]] element related to this data item.
     */
    _mapLine: MapArc;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: MapArcSeries;
    /**
     * Constructor
     */
    constructor();
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[MapArcSeries]].
 */
export interface IMapArcSeriesDataFields extends IMapLineSeriesDataFields {
}
/**
 * Defines properties for [[MapArcSeries]].
 */
export interface IMapArcSeriesProperties extends IMapLineSeriesProperties {
}
/**
 * Defines events for [[MapArcSeries]].
 */
export interface IMapArcSeriesEvents extends IMapLineSeriesEvents {
}
/**
 * Defines adapters for [[MapArcSeries]].
 *
 * @see {@link Adapter}
 */
export interface IMapArcSeriesAdapters extends IMapLineSeriesAdapters, IMapArcSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A series of arc elements. (curved lines)
 *
 * @see {@link IMapArcSeriesEvents} for a list of available Events
 * @see {@link IMapArcSeriesAdapters} for a list of available Adapters
 * @important
 */
export declare class MapArcSeries extends MapLineSeries {
    /**
     * Defines available data fields.
     */
    _dataFields: IMapArcSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IMapArcSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapArcSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IMapArcSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: MapArcSeriesDataItem;
    /**
     * Defines the type of the line items in this series.
     */
    _mapLine: MapArc;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Returns a new line instance of suitable type.
     *
     * @return New line
     */
    protected createLine(): this["_mapLine"];
}
