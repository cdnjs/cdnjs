/**
 * Serpentine chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { CurveChart, ICurveChartProperties, ICurveChartDataFields, ICurveChartAdapters, ICurveChartEvents, CurveChartDataItem } from "./CurveChart";
import { Orientation } from "../../core/defs/Orientation";
import { Percent } from "../../core/utils/Percent";
import { AxisRendererCurveY } from "./AxisRendererCurveY";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SerpentineChart]].
 *
 * @see {@link DataItem}
 */
export declare class SerpentineChartDataItem extends CurveChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: SerpentineChart;
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
 * Defines data fields for [[SerpentineChart]].
 */
export interface ISerpentineChartDataFields extends ICurveChartDataFields {
}
/**
 * Defines properties for [[SerpentineChart]].
 */
export interface ISerpentineChartProperties extends ICurveChartProperties {
    /**
     * Orientation (direction) of the chart.
     *
     * @default vertical
     */
    orientation?: Orientation;
    /**
     * How many "turns" (levels) the chart will have.
     *
     * @default 3
     */
    levelCount?: number;
    /**
     * Outer radius of the Y axis.
     *
     * It can be fixed number of pixels or percentage of the radius of distance
     * between rings of the spiral.
     *
     * @default 25%
     */
    yAxisRadius?: number | Percent;
    /**
     * Inner radius of the Y axis.
     *
     * It can be fixed number of pixels or percentage of the radius of distance
     * between rings of the spiral.
     *
     * @default -25%
     */
    yAxisInnerRadius?: number | Percent;
}
/**
 * Defines events for [[SerpentineChart]].
 */
export interface ISerpentineChartEvents extends ICurveChartEvents {
}
/**
 * Defines adapters for [[SerpentineChart]].
 *
 * @see {@link Adapter}
 */
export interface ISerpentineChartAdapters extends ICurveChartAdapters, ISerpentineChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Serpentine chart.
 *
 * @see {@link ISerpentineChartEvents} for a list of available Events
 * @see {@link ISerpentineChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Serpentine} for documentation
 * @important
 */
export declare class SerpentineChart extends CurveChart {
    /**
     * Defines available data fields.
     */
    _dataFields: ISerpentineChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: ISerpentineChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISerpentineChartAdapters;
    /**
     * Defines available events.
     */
    _events: ISerpentineChartEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Orientation (direction) of the chart.
     *
     * Options: "vertical" (default) or "horizontal".
     *
     * @default vertical
     * @param  value  Orientaiton
     */
    /**
    * @return Orientation
    */
    orientation: Orientation;
    /**
     * How many "turns" (levels) the chart will have.
     *
     * @default 3
     * @param  value  Level count
     */
    /**
    * @return Level count
    */
    levelCount: number;
    /**
     * Outer radius of the Y axis.
     *
     * It can be fixed number of pixels or percentage of the radius of distance
     * between rings of the spiral.
     *
     * IMPORTANT: this will override `radius` setting set on directly on the
     * Y axis renderer.
     *
     * @default 25%
     * @param  value  Outer radius
     */
    /**
    * @return {number} Outer radius
    */
    yAxisRadius: number | Percent;
    /**
     * Inner radius of the Y axis.
     *
     * It can be fixed number of pixels or percentage of the radius of distance
     * between rings of the spiral.
     *
     * IMPORTANT: this will override `innerRadius` setting set on directly on the
     * Y axis renderer.
     *
     * @default -25%
     * @param  value  Inner radius
     */
    /**
    * @return Inner radius
    */
    yAxisInnerRadius: number | Percent;
    /**
     * Validates the chart.
     *
     * @ignore
     */
    validate(): void;
    /**
     * Triggers (re)rendering of the vertical (Y) axis.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     */
    updateYAxis(renderer: AxisRendererCurveY): void;
}
