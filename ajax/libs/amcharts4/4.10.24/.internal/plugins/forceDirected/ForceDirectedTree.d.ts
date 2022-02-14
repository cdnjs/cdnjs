/**
 * ForceDirectedTree chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, ISerialChartProperties, ISerialChartDataFields, ISerialChartAdapters, ISerialChartEvents, SerialChartDataItem } from "../../charts/types/SerialChart";
import { ForceDirectedSeries, ForceDirectedSeriesDataItem } from "./ForceDirectedSeries";
import { Export } from "../../core/export/Export";
import { IPoint } from "../../core/defs/IPoint";
import { Sprite, ISpriteEvents, AMEvent } from "../../core/Sprite";
import { IDisposer } from "../../core/utils/Disposer";
import { ZoomOutButton } from "../../core/elements/ZoomOutButton";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[ForceDirectedTree]].
 *
 * @since 4.3.8
 * @see {@link DataItem}
 */
export declare class ForceDirectedTreeDataItem extends SerialChartDataItem {
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[ForceDirectedTree]].
 *
 * @since 4.3.8
 */
export interface IForceDirectedTreeDataFields extends ISerialChartDataFields {
}
/**
 * Defines properties for [[ForceDirectedTree]].
 *
 * @since 4.3.8
 */
export interface IForceDirectedTreeProperties extends ISerialChartProperties {
    /**
     * Indicates whether chart can be zoomed/panned (via mouse, touch, or API).
     *
     * @since 4.10.0
     * @default false
     */
    zoomable?: boolean;
    /**
     * Specifies what should chart do if when mouse wheel is rotated.
     *
     * @since 4.10.0
     * @default none
     */
    mouseWheelBehavior?: "zoom" | "none";
    /**
     * When user zooms in or out current zoom level is multiplied or divided
     * by value of this setting.
     *
     * @since 4.10.0
     * @default 2
     */
    zoomStep?: number;
}
/**
 * Defines events for [[ForceDirectedTree]].
 *
 * @since 4.3.8
 */
export interface IForceDirectedTreeEvents extends ISerialChartEvents {
}
/**
 * Defines adapters for [[ForceDirectedTree]].
 *
 * @since 4.3.8
 * @see {@link Adapter}
 */
export interface IForceDirectedTreeAdapters extends ISerialChartAdapters, IForceDirectedTreeProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A main class for [[ForceDirectedTree]] chart type.
 *
 * @see {@link IForceDirectedTreeEvents} for a list of available Events
 * @see {@link IForceDirectedTreeAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/force-directed/} For more information
 * @since 4.3.8
 * @important
 */
export declare class ForceDirectedTree extends SerialChart {
    /**
     * Defines the type of data item.
     */
    _dataItem: ForceDirectedTreeDataItem;
    /**
     * Defines available data fields.
     */
    _dataFields: IForceDirectedTreeDataFields;
    /**
     * Defines available properties.
     */
    _properties: IForceDirectedTreeProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IForceDirectedTreeAdapters;
    /**
     * Defines available events.
     */
    _events: IForceDirectedTreeEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: ForceDirectedSeries;
    /**
     * @ignore
     */
    protected _mouseWheelDisposer: IDisposer;
    /**
     * @ignore
     */
    protected _backgroundZoomoutDisposer: IDisposer;
    /**
     * Default duration of zoom animations (ms).
     */
    zoomDuration: number;
    /**
     * Default zooming animation easing function.
     */
    zoomEasing: (value: number) => number;
    /**
     * Smallest available zoom level. The chart will not allow to zoom out past
     * this setting.
     *
     * NOTE: Should be power of 2.
     *
     * @default 1
     */
    minZoomLevel: number;
    /**
     * Biggest available zoom level. The chart will not allow to zoom in past
     * this setting.
     *
     * NOTE: Should be power of 2.
     *
     * @default 32
     */
    maxZoomLevel: number;
    /**
     * A button which is used to zoom out the chart.
     */
    protected _zoomOutButton: ZoomOutButton;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creates and returns a new series of the suitable type.
     *
     * @return New series
     */
    protected createSeries(): this["_seriesType"];
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Setups the legend to use the chart's data.
     *
     * @ignore
     */
    feedLegend(): void;
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Since this chart uses hierarchical data, we need to remove childrent
     * dataField from export of non-hierarchical formats such as CSV and XSLX.
     *
     * @return Export
     */
    protected getExporting(): Export;
    /**
     * Handles mouse wheel event, e.g. user rotates mouse wheel while over the
     * map: zooms in or out depending on the direction of the wheel turn.
     *
     * @param event  Original event
     */
    protected handleWheel(event: AMEvent<Sprite, ISpriteEvents>["wheel"]): void;
    /**
     * Zooms the chart to particular point.
     *
     * @from 4.10.0
     * @param  point      A point to zoom to
     * @param  zoomLevel  Zoom level
     * @param  center     Should the chart center on the target point?
     */
    zoomToPoint(point: IPoint, zoomLevel: number, center?: boolean): void;
    /**
     * Zooms the chart to particular data item (node).
     *
     * @from 4.10.0
     * @param  dataItem   A data item to zoom to
     * @param  zoomLevel  Zoom level
     * @param  center     Should the chart center on the target point?
     */
    zoomToDataItem(dataItem: ForceDirectedSeriesDataItem, zoomLevel?: number, center?: boolean): void;
    /**
     * Zooms out the chart to initial full view.
     *
     * @from 4.10.0
     */
    zoomOut(): void;
    /**
     * When user zooms in or out current zoom level is multiplied or divided
     * by value of this setting.
     *
     * @default false
     * @since 4.10.0
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/force-directed/#Zooming} for more information about zooming ForceDirectedTree
     * @param value  Zoomable
     */
    /**
    * @return Zoomable
    */
    zoomable: boolean;
    /**
     * Specifies what should chart do if when mouse wheel is rotated.
     *
     * @param Mouse wheel behavior
     * @since 4.10.0
     * @default none
     */
    /**
    * @return Mouse wheel behavior
    */
    mouseWheelBehavior: "zoom" | "none";
    /**
     * When user zooms in or out current zoom level is multiplied or divided
     * by value of this setting.
     *
     * @since 4.10.0
     * @default 2
     * @param value  Zoom factor
     */
    /**
    * @return Zoom factor
    */
    zoomStep: number;
    /**
     * A [[Button]] element that is used for zooming out the chart.
     *
     * This button appears only when chart is zoomed in, and disappears
     * autoamatically when it is zoome dout.
     *
     * @param button  Zoom out button
     */
    /**
    * @return Zoom out button
    */
    zoomOutButton: ZoomOutButton;
}
