/**
 * Module for building 3D serial charts.
 */
/**
 * ============================================================================
 * Imports
 * ============================================================================
 * @hidden
 */
import { XYChart, IXYChartProperties, IXYChartDataFields, IXYChartAdapters, IXYChartEvents, XYChartDataItem } from "./XYChart";
import { Container } from "../../core/Container";
import { AxisRendererX3D } from "../axes/AxisRendererX3D";
import { AxisRendererY3D } from "../axes/AxisRendererY3D";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[XYChart3D]].
 *
 * @see {@link DataItem}
 */
export declare class XYChart3DDataItem extends XYChartDataItem {
    constructor();
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[XYChart3D]].
 */
export interface IXYChart3DDataFields extends IXYChartDataFields {
}
/**
 * Defines available properties for [[XYChart3D]].
 */
export interface IXYChart3DProperties extends IXYChartProperties {
    /**
     * Depths of the chart in pixels.
     */
    depth?: number;
    /**
     * Angle the chart is viewed at.
     */
    angle?: number;
}
/**
 * Defines events for [[XYChart3D]].
 */
export interface IXYChart3DEvents extends IXYChartEvents {
}
/**
 * Defines adapters for [[XYChart3D]].
 *
 * @see {@link Adapter}
 */
export interface IXYChart3DAdapters extends IXYChartAdapters, IXYChart3DProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a 3D XY chart.
 *
 * @see {@link IXYChart3DEvents} for a list of available Events
 * @see {@link IXYChart3DAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/xy-chart/} for documentation
 * @important
 */
export declare class XYChart3D extends XYChart {
    /**
     * Available data fields.
     */
    _dataFields: IXYChart3DDataFields;
    /**
     * Defines available properties.
     */
    _properties: IXYChart3DProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IXYChart3DAdapters;
    /**
     * Defines available events.
     */
    _events: IXYChart3DEvents;
    /**
     * Type of the axis renderer to use for X axes.
     */
    protected _axisRendererX: typeof AxisRendererX3D;
    /**
     * Type of the axis renderer to use for Y axes.
     */
    protected _axisRendererY: typeof AxisRendererY3D;
    /**
     * A container to add 3D column elements to.
     *
     * @ignore Exclude from docs
     */
    columnsContainer: Container;
    /**
     * Constructor
     */
    constructor();
    /**
     * This is done because for some reason IE doesn't change mask if path of a
     * mask changes.
     */
    protected updateSeriesMasks(): void;
    /**
     * Depth of the 3D chart / columns in pixels.
     *
     * @param value  Depth (px)
     */
    /**
    * @return Depth (px)
    */
    depth: number;
    /**
     * Angle the chart is viewed at.
     *
     * @todo Description (review)
     * @param value  Angle
     */
    /**
    * @return Angle
    */
    angle: number;
    /**
     * A calculated horizontal 3D offset (px).
     *
     * @readonly
     * @return Offset (px)
     */
    readonly dx3D: number;
    /**
     * A calculated vertical 3D offset (px).
     *
     * @readonly
     * @return Offset (px)
     */
    readonly dy3D: number;
    /**
     * (Re)validates layout
     *
     * @ignore Exclude from docs
     */
    validateLayout(): void;
    /**
     * Updates the layout (padding and scrollbar positions) to accommodate for
     * 3D depth and angle.
     */
    protected fixLayout(): void;
    /**
     * Updates column positions, offset and dimensions based on chart's angle
     * and depth.
     */
    protected fixColumns(): void;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
    protected maskColumns(): void;
}
