/**
 * Module for building Gauge charts.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { RadarChart, IRadarChartProperties, IRadarChartDataFields, IRadarChartAdapters, IRadarChartEvents, RadarChartDataItem } from "./RadarChart";
import { ListTemplate, IListEvents } from "../../core/utils/List";
import { ClockHand } from "../elements/ClockHand";
import { Ordering } from "../../core/utils/Order";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[GaugeChart]].
 *
 * @see {@link DataItem}
 */
export declare class GaugeChartDataItem extends RadarChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: GaugeChart;
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
 * Defines data fields for [[GaugeChart]].
 */
export interface IGaugeChartDataFields extends IRadarChartDataFields {
}
/**
 * Defines properties for [[GaugeChart]].
 */
export interface IGaugeChartProperties extends IRadarChartProperties {
}
/**
 * Defines events for [[GaugeChart]].
 */
export interface IGaugeChartEvents extends IRadarChartEvents {
}
/**
 * Defines adapters for [[GaugeChart]].
 *
 * @see {@link Adapter}
 */
export interface IGaugeChartAdapters extends IRadarChartAdapters, IGaugeChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Gauge chart.
 *
 * @see {@link IGaugeChartEvents} for a list of available Events
 * @see {@link IGaugeChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/gauge-chart/} for documentation
 * @important
 */
export declare class GaugeChart extends RadarChart {
    /**
     * Defines available data fields.
     */
    _dataFields: IGaugeChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: IGaugeChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IGaugeChartAdapters;
    /**
     * Defines available events.
     */
    _events: IGaugeChartEvents;
    /**
     * A list of [[ClockHand]] items displayed on this Gauge chart.
     */
    hands: ListTemplate<ClockHand>;
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
     * Decorates a [[ClockHand]] when it is added to the chart.
     *
     * @param event  Event
     */
    protected processHand(event: IListEvents<ClockHand>["inserted"]): void;
    /**
     * This function is used to sort element's JSON config properties, so that
     * some properties that absolutely need to be processed last, can be put at
     * the end.
     *
     * @ignore Exclude from docs
     * @param a  Element 1
     * @param b  Element 2
     * @return Sorting number
     */
    protected configOrder(a: string, b: string): Ordering;
}
