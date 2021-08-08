/**
 * WordCloud chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, ISerialChartProperties, ISerialChartDataFields, ISerialChartAdapters, ISerialChartEvents, SerialChartDataItem } from "../../charts/types/SerialChart";
import { WordCloudSeries } from "./WordCloudSeries";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[WordCloud]].
 *
 * @see {@link DataItem}
 */
export declare class WordCloudDataItem extends SerialChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: WordCloud;
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
 * Defines data fields for [[WordCloud]].
 */
export interface IWordCloudDataFields extends ISerialChartDataFields {
}
/**
 * Defines properties for [[WordCloud]]
 */
export interface IWordCloudProperties extends ISerialChartProperties {
}
/**
 * Defines events for [[WordCloud]].
 */
export interface IWordCloudEvents extends ISerialChartEvents {
}
/**
 * Defines adapters for [[WordCloud]].
 *
 * @see {@link Adapter}
 */
export interface IWordCloudAdapters extends ISerialChartAdapters, IWordCloudProperties {
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
 * @see {@link IWordCloudEvents} for a list of available Events
 * @see {@link IWordCloudAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/wordcloud/} for documentation
 */
export declare class WordCloud extends SerialChart {
    /**
     * Defines available data fields.
     */
    _dataFields: IWordCloudDataFields;
    /**
     * Defines available properties.
     */
    _properties: IWordCloudProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IWordCloudAdapters;
    /**
     * Defines available events.
     */
    _events: IWordCloudEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: WordCloudSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creates a new [[PercentSeries]].
     *
     * @return New series
     */
    protected createSeries(): this["_seriesType"];
}
