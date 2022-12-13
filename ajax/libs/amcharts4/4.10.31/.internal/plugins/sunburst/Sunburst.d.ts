/**
 * Sunburst chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PieChart, IPieChartProperties, IPieChartDataFields, IPieChartAdapters, IPieChartEvents, PieChartDataItem } from "../../charts/types/PieChart";
import { SunburstSeries, SunburstSeriesDataItem } from "./SunburstSeries";
import { Color } from "../../core/utils/Color";
import { ColorSet } from "../../core/utils/ColorSet";
import { OrderedListTemplate } from "../../core/utils/SortedList";
import { DictionaryTemplate } from "../../core/utils/Dictionary";
import { Export } from "../../core/export/Export";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Sunburst]].
 *
 * @since 4.1.6
 * @see {@link DataItem}
 */
export declare class SunburstDataItem extends PieChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: Sunburst;
    /**
     * A treemap level this data item is displayed at.
     */
    protected _level: number;
    /**
     * Series of children data items.
     */
    protected _series: SunburstSeries;
    /**
     * Related series data item.
     */
    seriesDataItem: SunburstSeriesDataItem;
    /**
     * Constructor
     */
    constructor();
    /**
     * Numeric value of the item.
     *
     * @param value  Value
     */
    /**
    * Numeric value of the slice.
    *
    * @return Value
    */
    value: number;
    /**
     * Percent of the slice.
     *
     * @return {number} Percent
     */
    readonly percent: number;
    /**
     * Item's name.
     *
     * @param name  Name
     */
    /**
    * @return Name
    */
    name: string;
    /**
     * A list of item's sub-children.
     *
     * @param children  Item's children
     */
    /**
    * @return Item's children
    */
    children: OrderedListTemplate<SunburstDataItem>;
    /**
     * Depth level in the Sunburst hierarchy.
     *
     * The top-level item will have level set at 0. Its children will have
     * level 1, and so on.
     *
     * @readonly
     * @return Level
     */
    readonly level: number;
    /**
     * Item's color.
     *
     * If not set, will use parent's color, or, if that is not set either,
     * automatically assigned color from chart's color set. (`chart.colors`)
     *
     * @param value  Color
     */
    /**
    * @return Color
    */
    color: Color;
    /**
     * A series representing slice's children.
     *
     * @param  series Child series
     */
    /**
    * @return Child series
    */
    series: SunburstSeries;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[Sunburst]].
 *
 * @since 4.1.6
 */
export interface ISunburstDataFields extends IPieChartDataFields {
    /**
     * A name of the field in data that holds item's numeric value.
     */
    value?: string;
    /**
     * A name of the field in data that holds item's sub-items.
     */
    children?: string;
    /**
     * A name of the field in data that holds item's name.
     */
    name?: string;
    /**
     * A name of the field in data that holds item's color.
     *
     * If not set, a new color will be automatically assigned to each item as
     * defined by theme.
     */
    color?: string;
    /**
     * Name of the field in data that holds boolean flag if item should be hidden.
     */
    hidden?: string;
}
/**
 * Defines properties for [[Sunburst]].
 *
 * @since 4.1.6
 */
export interface ISunburstProperties extends IPieChartProperties {
}
/**
 * Defines events for [[Sunburst]].
 *
 * @since 4.1.6
 */
export interface ISunburstEvents extends IPieChartEvents {
}
/**
 * Defines adapters for [[Sunburst]].
 *
 * @since 4.1.6
 * @see {@link Adapter}
 */
export interface ISunburstAdapters extends IPieChartAdapters, ISunburstProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A main class for Sunburst chart type.
 *
 * @since 4.1.6
 * @see {@link ISunburstEvents} for a list of available Events
 * @see {@link ISunburstAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sunburst/} For more information
 * @todo Example
 * @important
 */
export declare class Sunburst extends PieChart {
    /**
     * Defines the type of data item.
     */
    _dataItem: SunburstDataItem;
    /**
     * Defines available data fields.
     */
    _dataFields: ISunburstDataFields;
    /**
     * Defines available properties.
     */
    _properties: ISunburstProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISunburstAdapters;
    /**
     * Defines available events.
     */
    _events: ISunburstEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: SunburstSeries;
    /**
     * A set of colors to be applied automatically to each new chart item, if
     * not explicitly set.
     */
    colors: ColorSet;
    /**
     * Holds series object for each Sunburst level.
     *
     * "0" is the top-level series.
     * "1" is the second level.
     * Etc.
     */
    seriesTemplates: DictionaryTemplate<string, this["_seriesType"]>;
    /**
     * [_homeDataItem description]
     *
     * @todo Description
     */
    protected _homeDataItem: SunburstDataItem;
    /**
     * Number of levels in current chart.
     */
    protected _levelCount: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creates and returns a new series of the suitable type.
     *
     * @return New series
     */
    protected createSeries(): this["_seriesType"];
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * (Re)validates chart's data.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * Creates [[SunburstSeries]] instance for item's children.
     *
     * @param  dataItem Data item
     */
    protected createSunburstSeries(dataItem: this["_dataItem"]): void;
    /**
     * Initializes the Sunburst series.
     *
     * @param  dataItem  Chart data item
     */
    protected initSeries(dataItem: SunburstDataItem): void;
    /**
     * Recalculates Sunburst radius, based on a number of criteria.
     *
     * @ignore Exclude from docs
     */
    updateRadius(): void;
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Since this chart uses hierarchical data, we need to remove childrent
     * dataField from export of non-hierarchical formats such as CSV and XSLX.
     *
     * @return Export
     */
    protected getExporting(): Export;
    protected handleSeriesAdded2(): void;
}
