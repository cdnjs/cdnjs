/**
 * Radar chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { CurveChart, ICurveChartProperties, ICurveChartDataFields, ICurveChartAdapters, ICurveChartEvents, CurveChartDataItem } from "./CurveChart";
import { Percent } from "../../core/utils/Percent";
import { AxisRendererCurveY } from "./AxisRendererCurveY";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SpiralChart]].
 *
 * @see {@link DataItem}
 */
export declare class SpiralChartDataItem extends CurveChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: SpiralChart;
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
 * Defines data fields for [[SpiralChart]].
 */
export interface ISpiralChartDataFields extends ICurveChartDataFields {
}
/**
 * Defines properties for [[SpiralChart]].
 */
export interface ISpiralChartProperties extends ICurveChartProperties {
    /**
     * Inner radius of the spiral.
     *
     * Can be either fixed number in pixels, or in percent.
     *
     * @default 25%
     */
    innerRadius?: number | Percent;
    /**
     * Number of rings the spiral will consist of.
     *
     * @default 3
     */
    levelCount?: number;
    /**
     * An angle the spiral will start at.
     *
     * @default 0
     */
    startAngle?: number;
    /**
     * An angle the spiral will end at.
     *
     * @default 0
     */
    endAngle?: number;
    /**
     * Number of pixels the spiral diameter will increase by each full rotation.
     *
     * Normally the chart will calculate it by itself. You can override it by
     * setting your own value of `radiusStep`.
     *
     * In such case the chart might be bigger or smaller than chart container.
     */
    radiusStep?: number;
    /**
     * Precision setting to use when automatically generating axis points for the
     * spiral.
     *
     * The smaller the number, the finer line. However, small number will impact
     * the performace.
     *
     * Depending on actual chart configuration, you might need to find the best
     * possible value to balance between detail and good performance.
     *
     * @default 5
     */
    precisionStep?: number;
    /**
     * Outer radius of the Y axis.
     *
     * It can be fixed number of pixels or percentage of the radius of distance
     * between rings of the spiral.
     *
     * @default 35%
     */
    yAxisRadius?: number | Percent;
    /**
     * Inner radius of the Y axis.
     *
     * It can be fixed number of pixels or percentage of the radius of distance
     * between rings of the spiral.
     *
     * @default -35%
     */
    yAxisInnerRadius?: number | Percent;
    /**
     * Normally the spiral will start at the center.
     *
     * Set this to `true` to start at the outer end.
     *
     * @default false
     */
    inversed?: boolean;
}
/**
 * Defines events for [[SpiralChart]].
 */
export interface ISpiralChartEvents extends ICurveChartEvents {
}
/**
 * Defines adapters for [[SpiralChart]].
 *
 * @see {@link Adapter}
 */
export interface ISpiralChartAdapters extends ICurveChartAdapters, ISpiralChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Spiral chart.
 *
 * @see {@link ISpiralChartEvents} for a list of available Events
 * @see {@link ISpiralChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Spiral} for documentation
 * @important
 */
export declare class SpiralChart extends CurveChart {
    /**
     * Defines available data fields.
     */
    _dataFields: ISpiralChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: ISpiralChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISpiralChartAdapters;
    /**
     * Defines available events.
     */
    _events: ISpiralChartEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Number of rings the spiral will consist of.
     *
     * @default 3
     * @param  value  Number of circles
     */
    /**
    * @return Number of circles
    */
    levelCount: number;
    /**
     * An angle the spiral will start at.
     *
     * @default 0
     * @param  value  Start angle
     */
    /**
    * @return End angle
    */
    startAngle: number;
    /**
     * An angle the spiral will end at.
     *
     * @default 0
     * @param  value  End angle
     */
    /**
    * @return End angle
    */
    endAngle: number;
    /**
     * Number of pixels the spiral diameter will increase by each full rotation.
     *
     * Normally the chart will calculate it by itself. You can override it by
     * setting your own value of `radiusStep`.
     *
     * In such case the chart might be bigger or smaller than chart container.
     *
     * @param {number} value  Radius step (px)
     */
    /**
    * @return Radius step (px)
    */
    radiusStep: number;
    /**
     * Precision setting to use when automatically generating axis points for the
     * spiral.
     *
     * The smaller the number, the finer line. However, small number will impact
     * the performace.
     *
     * Depending on actual chart configuration, you might need to find the best
     * possible value to balance between detail and good performance.
     *
     * @default 5
     * @param  value  Precision
     */
    /**
    * @return Precision
    */
    precisionStep: number;
    /**
     * Inner radius of the spiral.
     *
     * Can be either fixed number in pixels, or in percent.
     *
     * @default 25%
     * @param  value  Inner radius
     */
    /**
    * @return Inner radius
    */
    innerRadius: number | Percent;
    /**
     * Outer radius of the Y axis.
     *
     * It can be fixed number of pixels or percentage of the radius of distance
     * between rings of the spiral.
     *
     * IMPORTANT: this will override `radius` setting set on directly on the
     * Y axis renderer.
     *
     * @default 35%
     * @param  value  Outer radius
     */
    /**
    * @return Outer radius
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
     * @default -35%
     * @param  value  Inner radius
     */
    /**
    * @return Inner radius
    */
    yAxisInnerRadius: number | Percent;
    /**
     * Normally the spiral will start at the center.
     *
     * Set this to `true` to start at the outer end.
     *
     * @default false
     * @param  value  Inversed?
     */
    /**
    * @return Inversed?
    */
    inversed: boolean;
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
