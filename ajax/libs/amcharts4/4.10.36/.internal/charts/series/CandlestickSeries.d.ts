/**
 * Candlestick Series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, ColumnSeriesDataItem, IColumnSeriesDataFields, IColumnSeriesProperties, IColumnSeriesAdapters, IColumnSeriesEvents } from "./ColumnSeries";
import { GroupField, IXYSeriesGroupFields } from "./XYSeries";
import { Container } from "../../core/Container";
import { Candlestick } from "../elements/Candlestick";
import * as $type from "../../core/utils/Type";
import { CalculatedValue } from "../../core/Component";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CandlestickSeries]].
 *
 * @see {@link DataItem}
 */
export declare class CandlestickSeriesDataItem extends ColumnSeriesDataItem {
    /**
     * A sprite used to draw the column.
     */
    _column: Candlestick;
    /**
     * Defines a type of [[Component]] this data item is used for
     * @todo Disabled to work around TS bug (see if we can re-enable it again)
     */
    /**
     * Constructor
     */
    constructor();
    /**
     * Low value for horizontal axis.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    lowValueX: number;
    /**
     * Low value for vertical axis.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    lowValueY: number;
    /**
     * High value for horizontal axis.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    highValueX: number;
    /**
     * High value for vertical axis.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    highValueY: number;
    /**
     * Close value for horizontal axis.
     *
     * This is an alias for `valueX` added for convenience only.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    closeValueX: number;
    /**
     * Close value for vertical axis.
     *
     * This is an alias for `valueX` added for convenience only.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    closeValueY: number;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[CandlestickSeries]].
 */
export interface ICandlestickSeriesDataFields extends IColumnSeriesDataFields {
    /**
     * Field name in data which holds low numeric value for horizontal axis.
     */
    lowValueX?: string;
    /**
     * Field name in data which holds low numeric value for vertical axis.
     */
    lowValueY?: string;
    /**
     * Field name in data which holds high numeric value for horizontal axis.
     */
    highValueX?: string;
    /**
     * Field name in data which holds low numeric value for vertical axis.
     */
    highValueY?: string;
    /**
     * Field name in data which holds low date for horizontal axis.
     */
    lowDateX?: string;
    /**
     * Field name in data which holds low date for vertical axis.
     */
    lowDateY?: string;
    /**
     * Field name in data which holds high date for horizontal axis.
     */
    highDateX?: string;
    /**
     * Field name in data which holds high date for vertical axis.
     */
    highDateY?: string;
    /**
     * Which calculated field to use to use as a horizontal axis high value for
     * the item.
     */
    highValueXShow?: CalculatedValue;
    /**
     * Which calculated field to use to use as a horizontal axis low value for
     * the item.
     */
    lowValueXShow?: CalculatedValue;
    /**
     * Which calculated field to use to use as a vertical axis low value for
     * the item.
     */
    lowValueYShow?: CalculatedValue;
    /**
     * Which calculated field to use to use as a vertical axis high value for
     * the item.
     */
    highValueYShow?: CalculatedValue;
}
/**
 * Defines data fields that can be calculated for aggregate values.
 *
 * @since 4.7.0
 */
export interface ICandlestickSeriesGroupFields extends IXYSeriesGroupFields {
    /**
     * Indicates how to calculate aggregate value for `lowValueX` data field.
     *
     * @default "low"
     */
    lowValueX?: GroupField;
    /**
     * Indicates how to calculate aggregate value for `lowValueY` data field.
     *
     * @default "low"
     */
    lowValueY?: GroupField;
    /**
     * Indicates how to calculate aggregate value for `highValueX` data field.
     *
     * @default "high"
     */
    highValueX?: GroupField;
    /**
     * Indicates how to calculate aggregate value for `highValueY` data field.
     *
     * @default "high"
     */
    highValueY?: GroupField;
}
/**
 * Defines properties for [[CandlestickSeries]].
 */
export interface ICandlestickSeriesProperties extends IColumnSeriesProperties {
}
/**
 * Defines events for [[CandlestickSeries]].
 */
export interface ICandlestickSeriesEvents extends IColumnSeriesEvents {
}
/**
 * Defines adapters for [[CandlestickSeries]].
 *
 * @see {@link Adapter}
 */
export interface ICandlestickSeriesAdapters extends IColumnSeriesAdapters, ICandlestickSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a candlestick graph.
 *
 * @see {@link ICandlestickSeriesEvents} for a list of available Events
 * @see {@link ICandlestickSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class CandlestickSeries extends ColumnSeries {
    /**
     * Defines type of the group fields.
     *
     * @ignore
     * @since 4.7.0
     */
    _groupFields: ICandlestickSeriesGroupFields;
    /**
     * Defines the type of data item.
     */
    _dataItem: CandlestickSeriesDataItem;
    /**
     * Sets type of the column.
     */
    _column: Candlestick;
    /**
     * Defines available data fields.
     */
    _dataFields: ICandlestickSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: ICandlestickSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICandlestickSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: ICandlestickSeriesEvents;
    /**
     * A data field to look for "low" value for horizontal axis.
     */
    protected _xLowField: $type.Keyof<this["_dataFields"]>;
    /**
     * A data field to look for "low" value for vertical axis.
     */
    protected _yLowField: $type.Keyof<this["_dataFields"]>;
    /**
     * A data field to look for "high" value for horizontal axis.
     */
    protected _xHighField: $type.Keyof<this["_dataFields"]>;
    /**
     * A data field to look for "high" value for vertical axis.
     */
    protected _yHighField: $type.Keyof<this["_dataFields"]>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    validateDataElementReal(dataItem: this["_dataItem"]): void;
    protected validateCandlestick(dataItem: this["dataItem"]): void;
    /**
     * A data field to look for "low" value for horizontal axis.
     *
     * @ignore Exclude from docs
     * @return Field name
     */
    readonly xLowField: string;
    /**
     * A data field to look for "low" value for vertical axis.
     *
     * @ignore Exclude from docs
     * @return Field name
     */
    readonly yLowField: string;
    /**
     * A data field to look for "high" value for horizontal axis.
     *
     * @ignore Exclude from docs
     * @return Field name
     */
    readonly xHighField: string;
    /**
     * A data field to look for "high" value for vertical axis.
     *
     * @ignore Exclude from docs
     * @return Field name
     */
    readonly yHighField: string;
    /**
     * Sets up which data fields to use for data access.
     */
    protected defineFields(): void;
    /**
     * Creates elements in related legend container, that mimics the look of this
     * Series.
     *
     * @ignore Exclude from docs
     * @param marker  Legend item container
     */
    createLegendMarker(marker: Container): void;
    /**
     * Returns an element to use for Candlestick
     * @ignore
     * @return Element.
     */
    protected createColumnTemplate(): this["_column"];
}
