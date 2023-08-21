/**
 * Sliced chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PercentChart, IPercentChartProperties, IPercentChartDataFields, IPercentChartAdapters, IPercentChartEvents, PercentChartDataItem } from "./PercentChart";
import { FunnelSeries } from "../series/FunnelSeries";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SlicedChart]].
 *
 * @see {@link DataItem}
 */
export declare class SlicedChartDataItem extends PercentChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: SlicedChart;
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
 * Defines data fields for [[SlicedChart]].
 */
export interface ISlicedChartDataFields extends IPercentChartDataFields {
}
/**
 * Defines properties for [[SlicedChart]]
 */
export interface ISlicedChartProperties extends IPercentChartProperties {
}
/**
 * Defines events for [[SlicedChart]].
 */
export interface ISlicedChartEvents extends IPercentChartEvents {
}
/**
 * Defines adapters for [[SlicedChart]].
 *
 * @see {@link Adapter}
 */
export interface ISlicedChartAdapters extends IPercentChartAdapters, ISlicedChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Sliced chart.
 *
 * @see {@link ISlicedChartEvents} for a list of available Events
 * @see {@link ISlicedChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for documentation
 * @important
 */
export declare class SlicedChart extends PercentChart {
    /**
     * Defines available data fields.
     */
    _dataFields: ISlicedChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: ISlicedChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISlicedChartAdapters;
    /**
     * Defines available events.
     */
    _events: ISlicedChartEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: FunnelSeries;
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
     * (Re)validates the chart, causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
}
