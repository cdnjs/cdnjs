/**
 * CurvedColumnSeries module.
 *
 * Not recommended using if you use scrollbars or your chart is zoomable in some other way.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, IColumnSeriesDataFields, IColumnSeriesProperties, IColumnSeriesAdapters, IColumnSeriesEvents, ColumnSeriesDataItem } from "./ColumnSeries";
import { CurvedColumn } from "../elements/CurvedColumn";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurvedColumnSeries]].
 *
 * @see {@link DataItem}
 */
export declare class CurvedColumnSeriesDataItem extends ColumnSeriesDataItem {
    /**
     * A sprite used to draw the column.
     */
    _column: CurvedColumn;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: CurvedColumnSeries;
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
 * Defines data fields for [[CurvedColumnSeries]].
 */
export interface ICurvedColumnSeriesDataFields extends IColumnSeriesDataFields {
}
/**
 * Defines properties for [[CurvedColumnSeries]].
 */
export interface ICurvedColumnSeriesProperties extends IColumnSeriesProperties {
}
/**
 * Defines events for [[CurvedColumnSeries]].
 */
export interface ICurvedColumnSeriesEvents extends IColumnSeriesEvents {
}
/**
 * Defines adapters for [[CurvedColumnSeries]].
 *
 * @see {@link Adapter}
 */
export interface ICurvedColumnSeriesAdapters extends IColumnSeriesAdapters, ICurvedColumnSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a curved columns graph.
 *
 * @see {@link ICurvedColumnSeriesEvents} for a list of available Events
 * @see {@link ICurvedColumnSeriesAdapters} for a list of available Adapters
 * @important
 */
export declare class CurvedColumnSeries extends ColumnSeries {
    /**
     * Defines type of the column.
     */
    _column: CurvedColumn;
    /**
     * Defines type of the data item.
     */
    _dataItem: CurvedColumnSeriesDataItem;
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: ICurvedColumnSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: ICurvedColumnSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICurvedColumnSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: ICurvedColumnSeriesEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns an element to use for the curved column.
     *
     * @ignore Exclude from docs
     * @return Element.
     */
    protected createColumnTemplate(): this["_column"];
    /**
     * Validates data item's elements.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElementReal(dataItem: this["_dataItem"]): void;
}
