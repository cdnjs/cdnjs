/**
 * Curve chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { XYChart, IXYChartProperties, IXYChartDataFields, IXYChartAdapters, IXYChartEvents, XYChartDataItem } from "../../charts/types/XYChart";
import { CurveLineSeries } from "./CurveLineSeries";
import { CurveColumnSeries } from "./CurveColumnSeries";
import { Container } from "../../core/Container";
import { CurveCursor } from "./CurveCursor";
import { Axis } from "../../charts/axes/Axis";
import { AxisRenderer } from "../../charts/axes/AxisRenderer";
import { AxisRendererCurveX } from "./AxisRendererCurveX";
import { AxisRendererCurveY } from "./AxisRendererCurveY";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurveChart]].
 *
 * @see {@link DataItem}
 */
export declare class CurveChartDataItem extends XYChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: CurveChart;
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
 * Defines data fields for [[CurveChart]].
 */
export interface ICurveChartDataFields extends IXYChartDataFields {
}
/**
 * Defines properties for [[CurveChart]].
 */
export interface ICurveChartProperties extends IXYChartProperties {
}
/**
 * Defines events for [[CurveChart]].
 */
export interface ICurveChartEvents extends IXYChartEvents {
}
/**
 * Defines adapters for [[CurveChart]].
 *
 * @see {@link Adapter}
 */
export interface ICurveChartAdapters extends IXYChartAdapters, ICurveChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Curve chart.
 *
 * @see {@link ICurveChartEvents} for a list of available Events
 * @see {@link ICurveChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/} for documentation
 * @important
 */
export declare class CurveChart extends XYChart {
    /**
     * Defines available data fields.
     */
    _dataFields: ICurveChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: ICurveChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICurveChartAdapters;
    /**
     * Defines available events.
     */
    _events: ICurveChartEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: CurveLineSeries | CurveColumnSeries;
    /**
     * Defines X axis renderer type.
     */
    _xAxisRendererType: AxisRendererCurveX;
    /**
     * Defines Y axis renderer type.
     */
    _yAxisRendererType: AxisRendererCurveY;
    /**
     * Defines X axis renderer type.
     */
    protected _axisRendererX: typeof AxisRendererCurveX;
    /**
     * Defines Y axis renderer type.
     */
    protected _axisRendererY: typeof AxisRendererCurveY;
    /**
     * Defines type of the cursor used in this chart.
     */
    _cursor: CurveCursor;
    /**
     * A container that holds chart's visual elements.
     */
    curveContainer: Container;
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
    /**
     * Updates all Y axes after range change event.
     */
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
     * Creates and returns a new Series, suitable for [[CurveChart]].
     *
     * @return New Series
     */
    protected createSeries(): this["_seriesType"];
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
    /**
     * @ignore
     * @return Has license?
     */
    hasLicense(): boolean;
}
