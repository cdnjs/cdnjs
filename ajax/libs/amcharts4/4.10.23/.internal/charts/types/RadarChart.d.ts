/**
 * Radar chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { XYChart, IXYChartProperties, IXYChartDataFields, IXYChartAdapters, IXYChartEvents, XYChartDataItem } from "./XYChart";
import { Percent } from "../../core/utils/Percent";
import { RadarSeries } from "../series/RadarSeries";
import { RadarColumnSeries } from "../series/RadarColumnSeries";
import { Container } from "../../core/Container";
import { RadarCursor } from "../cursors/RadarCursor";
import { Axis } from "../axes/Axis";
import { AxisRenderer } from "../axes/AxisRenderer";
import { AxisRendererCircular } from "../axes/AxisRendererCircular";
import { AxisRendererRadial } from "../axes/AxisRendererRadial";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[RadarChart]].
 *
 * @see {@link DataItem}
 */
export declare class RadarChartDataItem extends XYChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: RadarChart;
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
 * Defines data fields for [[RadarChart]].
 */
export interface IRadarChartDataFields extends IXYChartDataFields {
}
/**
 * Defines properties for [[RadarChart]].
 */
export interface IRadarChartProperties extends IXYChartProperties {
    /**
     * Radius of the Radar face. Absolute or relative.
     */
    radius?: number | Percent;
    /**
     * Inner radius of the Radar face. Percent value is relative to radius.
     *
     * @todo review desc
     */
    innerRadius?: number | Percent;
    /**
     * An angle radar face starts on. (degrees)
     *
     * @default -90
     */
    startAngle?: number;
    /**
     * An angle radar face ends on. (degrees)
     *
     * @default 270
     */
    endAngle?: number;
}
/**
 * Defines events for [[RadarChart]].
 */
export interface IRadarChartEvents extends IXYChartEvents {
}
/**
 * Defines adapters for [[RadarChart]].
 *
 * @see {@link Adapter}
 */
export interface IRadarChartAdapters extends IXYChartAdapters, IRadarChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Radar chart.
 *
 * @see {@link IRadarChartEvents} for a list of available Events
 * @see {@link IRadarChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/radar-chart/} for documentation
 * @important
 */
export declare class RadarChart extends XYChart {
    /**
     * Defines available data fields.
     */
    _dataFields: IRadarChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: IRadarChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IRadarChartAdapters;
    /**
     * Defines available events.
     */
    _events: IRadarChartEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: RadarSeries | RadarColumnSeries;
    /**
     * Defines X axis renderer type.
     */
    _xAxisRendererType: AxisRendererCircular;
    /**
     * Defines Y axis renderer type.
     */
    _yAxisRendererType: AxisRendererRadial;
    /**
     * Defines X axis renderer type.
     */
    protected _axisRendererX: typeof AxisRendererCircular;
    /**
     * Defines Y axis renderer type.
     */
    protected _axisRendererY: typeof AxisRendererRadial;
    /**
     * [_cursor description]
     *
     * @todo Description
     */
    _cursor: RadarCursor;
    /**
     * A container that holds Radar visual elements.
     */
    radarContainer: Container;
    /**
     *
     * @ignore Exclude from docs
     */
    protected _pixelInnerRadius: number;
    /**
     * used by cursor. We adjust innerradius if start and end angle are close to each other
     * @ignore Exclude from docs
     */
    innerRadiusModifyer: number;
    /**
     * @ignore
     */
    mr: number;
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
     * Decorates Axis with required properties for this chart.
     *
     * @param axis  Axis
     */
    protected processAxis(axis: Axis): void;
    /**
     * Updates all X axes after range change event.
     */
    protected handleXAxisRangeChange(): void;
    /**
     * Updates all Y axes after range change event.
     */
    protected handleYAxisRangeChange(): void;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
    /**
     * Does calculations before drawing the chart.
     */
    protected beforeDraw(): void;
    /**
     * Creates and returns a new Series, suitable for RadarChart.
     *
     * @return New Series
     */
    protected createSeries(): this["_seriesType"];
    /**
     * Starting angle of the Radar face. (degrees)
     *
     * Normally, a circular radar face begins (the radial axis is drawn) at the
     * top center. (at -90 degrees)
     *
     * You can use `startAngle` to change this setting.
     *
     * E.g. setting this to 0 will make the radial axis start horizontally to
     * the right, as opposed to vertical.
     *
     * For a perfect circle the absolute sum of `startAngle` and `endAngle`
     * needs to be 360.
     *
     * However, it's **not** necessary to do so. You can set those to lesser
     * numbers, to create semi-circles.
     *
     * E.g. `startAngle = -90` with `endAngle = 0` will create a radar face that
     * looks like a quarter of a circle.
     *
     * @default -90
     * @param value  Start angle (degrees)
     */
    /**
    * @return Start angle (degrees)
    */
    startAngle: number;
    /**
     * Starting angle of the Radar face. (degrees)
     *
     * Normally, a circular radar face ends (the radial axis is drawn) exactly
     * where it has started, forming a full 360 circle. (at 270 degrees)
     *
     * You can use `endAngle` to end the circle somewhere else.
     *
     * E.g. setting this to 180 will make the radar face end at horizontal line
     * to the left off the center.
     *
     * For a perfect circle the absolute sum of `startAngle` and `endAngle`
     * needs to be 360.
     *
     * However, it's **not** necessary to do so. You can set those to lesser
     * numbers, to create semi-circles.
     *
     * E.g. `startAngle = -90` with `endAngle = 0` will create a radar face that
     * looks like a quarter of a circle.
     *
     * @default -90
     * @param value  End angle (degrees)
     */
    /**
    * @return End angle (degrees)
    */
    endAngle: number;
    /**
     * Outer radius of the Radar face.
     *
     * This can either be in absolute pixel value, or relative [[Percent]].
     *
     * @param value  Outer radius
     */
    /**
    * @return Outer radius
    */
    radius: number | Percent;
    /**
     * @return Inner radius in pixels
     */
    readonly pixelInnerRadius: number;
    /**
     * Inner radius of the radar face.
     *
     * This can either be in absolute pixel value, or relative [[Percent]].
     *
     * If set in Percent, it will be relative to `radius`. (outer radius)
     *
     * @param value Inner radius
     */
    /**
    * @return Inner radius
    */
    innerRadius: number | Percent;
    /**
     * Triggers (re)rendering of the horizontal (X) axis.
     *
     * @ignore Exclude from docs
     * @param axis Axis
     */
    updateXAxis(renderer: AxisRenderer): void;
    /**
     * Triggers (re)rendering of the vertical (Y) axis.
     *
     * @ignore Exclude from docs
     * @param axis Axis
     */
    updateYAxis(renderer: AxisRenderer): void;
}
