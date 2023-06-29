/**
 * Serial chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Chart, IChartProperties, IChartDataFields, IChartAdapters, IChartEvents, ChartDataItem } from "../Chart";
import { IListEvents, ListTemplate } from "../../core/utils/List";
import { Container } from "../../core/Container";
import { Series } from "../series/Series";
import { ColorSet } from "../../core/utils/ColorSet";
import { PatternSet } from "../../core/utils/PatternSet";
import { IDisposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SerialChart]].
 *
 * @see {@link DataItem}
 */
export declare class SerialChartDataItem extends ChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: SerialChart;
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
 * Defines data fields for [[SerialChart]].
 */
export interface ISerialChartDataFields extends IChartDataFields {
}
/**
 * Defines properties for [[SerialChart]]
 */
export interface ISerialChartProperties extends IChartProperties {
    /**
     * A set of colors to be used for chart elements, like Series, Slices, etc.
     */
    colors?: ColorSet;
    /**
     * A set of patterns to use for fills, like Series, Slices, etc.
     *
     * @since 4.7.5
     */
    patterns?: PatternSet;
}
/**
 * Defines events for [[SerialChart]].
 */
export interface ISerialChartEvents extends IChartEvents {
}
/**
 * Defines adapters for [[SerialChart]].
 *
 * @see {@link Adapter}
 */
export interface ISerialChartAdapters extends IChartAdapters, ISerialChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all series-based charts, like XY, Pie, etc.
 *
 * Is not useful on its own.
 *
 * @see {@link ISerialChartEvents} for a list of available Events
 * @see {@link ISerialChartAdapters} for a list of available Adapters
 */
export declare class SerialChart extends Chart {
    /**
     * Defines data fields.
     */
    _dataFields: ISerialChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: ISerialChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISerialChartAdapters;
    /**
     * Defines available events.
     */
    _events: ISerialChartEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: Series;
    /**
     * Holds a list of [[Series]] displayed on the chart.
     */
    protected _series: ListTemplate<this["_seriesType"]>;
    /**
     * Holds the reference to the container actual series are drawn in.
     */
    readonly seriesContainer: Container;
    /**
     * Holds a reference to the container series' bullets are drawn in.
     */
    readonly bulletsContainer: Container;
    protected _exitDP: {
        [index: string]: IDisposer;
    };
    /**
     * Constructor
     */
    constructor();
    dispose(): void;
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor
     */
    protected applyInternalDefaults(): void;
    /**
     * A list of chart's series.
     *
     * @return Chart's series
     */
    readonly series: ListTemplate<this["_seriesType"]>;
    protected handleSeriesRemoved(event: IListEvents<Series>["removed"]): void;
    /**
     * Decorates a new [[Series]] object with required parameters when it is
     * added to the chart.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    handleSeriesAdded(event: IListEvents<Series>["inserted"]): void;
    protected handleLegendSeriesAdded(series: Series): void;
    protected handleSeriesAdded2(series: Series): void;
    /**
     * Setups the legend to use the chart's data.
     * @ignore
     */
    feedLegend(): void;
    /**
     * Creates and returns a new Series, suitable for this chart type.
     *
     * @return New series
     */
    protected createSeries(): this["_seriesType"];
    /**
     * Chart's color list.
     *
     * This list can be used by a number of serial items, like applying a new
     * color for each Series added. Or, applying a new color for each slice
     * of a Pie chart.
     *
     * Please see [[ColorSet]] for information on how you can set up to generate
     * unique colors.
     *
     * A theme you are using may override default pre-defined colors.
     *
     * @param value Color list
     */
    /**
    * @return Color list
    */
    colors: ColorSet;
    /**
     * A [[PatternSet]] to use when creating patterned fills for slices.
     *
     * @since 4.7.5
     * @param value  Pattern set
     */
    /**
    * @return Pattern set
    */
    patterns: PatternSet;
    /**
     * Copies all parameters from another [[SerialChart]].
     *
     * @param source Source SerialChart
     */
    copyFrom(source: this): void;
    /**
     * Hides the chart instantly and then shows it. If defaultState.transitionDuration > 0, this will result an animation in which properties of hidden state will animate to properties of visible state.
     */
    appear(): void;
}
