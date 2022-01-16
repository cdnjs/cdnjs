/**
 * Percent chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, ISerialChartProperties, ISerialChartDataFields, ISerialChartAdapters, ISerialChartEvents, SerialChartDataItem } from "./SerialChart";
import { PercentSeries } from "../series/PercentSeries";
import { Legend } from "../Legend";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PercentChart]].
 *
 * @see {@link DataItem}
 */
export declare class PercentChartDataItem extends SerialChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: PercentChart;
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
 * Defines data fields for [[PercentChart]].
 */
export interface IPercentChartDataFields extends ISerialChartDataFields {
}
/**
 * Defines properties for [[PercentChart]]
 */
export interface IPercentChartProperties extends ISerialChartProperties {
}
/**
 * Defines events for [[PercentChart]].
 */
export interface IPercentChartEvents extends ISerialChartEvents {
}
/**
 * Defines adapters for [[PercentChart]].
 *
 * @see {@link Adapter}
 */
export interface IPercentChartAdapters extends ISerialChartAdapters, IPercentChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This is a base class for "percent-based" chart types like Pie and Funnel.
 *
 * @see {@link IPercentChartEvents} for a list of available Events
 * @see {@link IPercentChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/pie-chart/} for Pie chart documentation
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for Sliced chart documentation
 */
export declare class PercentChart extends SerialChart {
    /**
     * Defines available data fields.
     */
    _dataFields: IPercentChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: IPercentChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPercentChartAdapters;
    /**
     * Defines available events.
     */
    _events: IPercentChartEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: PercentSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * (Re)validates chart data.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * Setups the legend to use the chart's data.
     * @ignore
     */
    feedLegend(): void;
    /**
     * Creates a new [[PercentSeries]].
     *
     * @return New series
     */
    protected createSeries(): this["_seriesType"];
    /**
     * @ignore
     */
    protected setLegend(legend: Legend): void;
}
