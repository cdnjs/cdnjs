/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PieSeries, PieSeriesDataItem, IPieSeriesDataFields, IPieSeriesProperties, IPieSeriesAdapters, IPieSeriesEvents } from "../../charts/series/PieSeries";
import { Sunburst, SunburstDataItem } from "./Sunburst";
import * as $type from "../../core/utils/Type";
import { Animation } from "../../core/utils/Animation";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SunburstSeries]].
 *
 * @see {@link DataItem}
 * @since 4.1.6
 */
export declare class SunburstSeriesDataItem extends PieSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: SunburstSeries;
    /**
     * A reference to a component of a data item.
     */
    component: SunburstSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * A corresponding data item from the Sunburst.
     *
     * @readonly
     * @return Data item
     */
    readonly sunburstDataItem: SunburstDataItem;
    /**
     * Hide the data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param toValue   Target value for animation
     * @param fields    Fields to animate while hiding
     */
    hide(duration?: number, delay?: number, toValue?: number, fields?: string[]): $type.Optional<Animation>;
    /**
     * Show hidden data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param fields    Fields to animate while hiding
     */
    show(duration?: number, delay?: number, fields?: string[]): $type.Optional<Animation>;
    /**
     * Numeric value.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    value: number;
    /**
     *
     * @todo description
     * @ignore
     * @return Value
     */
    getActualWorkingValue(name: string): $type.Optional<number>;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[SunburstSeries]].
 *
 * @since 4.1.6
 */
export interface ISunburstSeriesDataFields extends IPieSeriesDataFields {
}
/**
 * Defines properties for [[SunburstSeries]].
 *
 * @since 4.1.6
 */
export interface ISunburstSeriesProperties extends IPieSeriesProperties {
}
/**
 * Defines events for [[SunburstSeries]].
 *
 * @since 4.1.6
 */
export interface ISunburstSeriesEvents extends IPieSeriesEvents {
}
/**
 * Defines adapters for [[SunburstSeries]].
 *
 * @see {@link Adapter}
 * @since 4.1.6
 */
export interface ISunburstSeriesAdapters extends IPieSeriesAdapters, ISunburstSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a [[Sunburst]] chart.
 *
 * @see {@link ISunburstSeriesEvents} for a list of available Events
 * @see {@link ISunburstSeriesAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sunburst/} For more information
 * @todo Example
 * @since 4.1.6
 * @important
 */
export declare class SunburstSeries extends PieSeries {
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: ISunburstSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: ISunburstSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISunburstSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: ISunburstSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: SunburstSeriesDataItem;
    /**
     * A chart series belongs to.
     */
    _chart: Sunburst;
    /**
     * The level in hierarchy hierarchy series is at.
     *
     * @readonly
     */
    level: number;
    /**
     * Parent data item of a series.
     */
    parentDataItem: SunburstDataItem;
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
     * Processes data item.
     *
     * @param dataItem     Data item
     * @param dataContext  Raw data
     * @param index        Index of the data item
     */
    protected processDataItem(dataItem: this["_dataItem"], dataContext?: Object): void;
    /**
     * [handleDataItemValueChange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    handleDataItemValueChange(dataItem?: this["_dataItem"], name?: string): void;
    /**
     * [handleDataItemWorkingValueChange description]
     *
     * @ignore
     * @todo Description
     * @param {this["_dataItem"]} dataItem [description]
     * @param {string}            name     [description]
     */
    handleDataItemWorkingValueChange(dataItem?: this["_dataItem"], name?: string): void;
}
