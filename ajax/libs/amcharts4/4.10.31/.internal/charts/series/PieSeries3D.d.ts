/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PieSeries, PieSeriesDataItem, IPieSeriesDataFields, IPieSeriesProperties, IPieSeriesAdapters, IPieSeriesEvents } from "../series/PieSeries";
import { PieChart3D } from "../types/PieChart3D";
import { Slice3D } from "../../core/elements/3d/Slice3D";
import { Bullet } from "../elements/Bullet";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PieSeries3D]].
 *
 * @see {@link DataItem}
 */
export declare class PieSeries3DDataItem extends PieSeriesDataItem {
    /**
     * Defines type of the slice represented by this data item.
     */
    _slice: Slice3D;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: PieSeries3D;
    /**
     * @todo Remove?
     * @deprecated
     */
    component: PieSeries3D;
    /**
     * Constructor
     */
    constructor();
    /**
     * Slice depth (height).
     *
     * @param value  Depth
     */
    /**
    * @return Depth
    */
    depthValue: number;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[PieSeries3D]].
 */
export interface IPieSeries3DDataFields extends IPieSeriesDataFields {
    /**
     * Name of the field in data that holds 3D slice depth (height).
     */
    depthValue?: string;
}
/**
 * Defines properties for [[PieSeries3D]].
 */
export interface IPieSeries3DProperties extends IPieSeriesProperties {
    /**
     * Depth (height) of the pie slice in pixels.
     */
    depth?: number;
    /**
     * Angle of the view point of the 3D pie.
     */
    angle?: number;
}
/**
 * Defines events for [[PieSeries3D]].
 */
export interface IPieSeries3DEvents extends IPieSeriesEvents {
}
/**
 * Defines adapters for [[PieSeries3D]].
 *
 * @see {@link Adapter}
 */
export interface IPieSeries3DAdapters extends IPieSeriesAdapters, IPieSeries3DProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a slice series on a 3D pie chart.
 *
 * @see {@link IPieSeries3DEvents} for a list of available Events
 * @see {@link IPieSeries3DAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class PieSeries3D extends PieSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IPieSeries3DDataFields;
    /**
     * Defines available properties.
     */
    _properties: IPieSeries3DProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPieSeries3DAdapters;
    /**
     * Defines available events.
     */
    _events: IPieSeries3DEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: PieSeries3DDataItem;
    /**
     * A chart series belongs to.
     */
    _chart: PieChart3D;
    _slice: Slice3D;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns a new/empty DataItem of the type appropriate for this object
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * creates slice
     */
    protected createSlice(): this["_slice"];
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElement(dataItem: PieSeries3DDataItem): void;
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Depth (height) of the pie slice in pixels.
     *
     * @param value  Depth (px)
     */
    /**
    * @return Depth (px)
    */
    depth: number;
    /**
     * Angle of the view point of the 3D pie. (0-360)
     *
     * @param value  Angle
     */
    /**
    * @return Angle
    */
    angle: number;
    /**
     * Positions series bullet.
     *
     * @ignore Exclude from docs
     * @param bullet  Bullet
     */
    positionBullet(bullet: Bullet): void;
}
