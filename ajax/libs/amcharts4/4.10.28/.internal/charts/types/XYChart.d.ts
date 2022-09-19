/**
 * XY Chart module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, ISerialChartProperties, ISerialChartDataFields, ISerialChartAdapters, ISerialChartEvents, SerialChartDataItem } from "./SerialChart";
import { Sprite, ISpriteEvents, AMEvent } from "../../core/Sprite";
import { Container } from "../../core/Container";
import { List, IListEvents } from "../../core/utils/List";
import { Axis } from "../axes/Axis";
import { AxisRenderer } from "../axes/AxisRenderer";
import { AxisRendererX } from "../axes/AxisRendererX";
import { AxisRendererY } from "../axes/AxisRendererY";
import { XYSeries, XYSeriesDataItem } from "../series/XYSeries";
import { Scrollbar, IScrollbarEvents } from "../../core/elements/Scrollbar";
import { IRange } from "../../core/defs/IRange";
import { XYCursor, IXYCursorEvents } from "../cursors/XYCursor";
import { IPoint } from "../../core/defs/IPoint";
import { IDisposer } from "../../core/utils/Disposer";
import { Button } from "../../core/elements/Button";
import { Ordering } from "../../core/utils/Order";
import { XYChartScrollbar } from "../elements/XYChartScrollbar";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[XYChart]].
 *
 * @see {@link DataItem}
 */
export declare class XYChartDataItem extends SerialChartDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: XYChart;
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
 * Defines data fields for [[XYChart]].
 */
export interface IXYChartDataFields extends ISerialChartDataFields {
}
/**
 * Defines properties for [[XYChart]].
 */
export interface IXYChartProperties extends ISerialChartProperties {
    /**
     * A container that is used as a maske for bullets so that they can't
     * "spill" outside of the plot area.
     */
    maskBullets?: boolean;
    /**
     * Specifies what should chart do if when mouse wheel is rotated.
     *
     * @default "none"
     */
    mouseWheelBehavior?: "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none";
    /**
     * Specifies what should chart do if when horizontal mouse wheel is rotated.
     *
     * @default "none"
     */
    horizontalMouseWheelBehavior?: "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none";
    /**
     * Specifies if chart should arrange series tooltips so that they won't
     * overlap.
     *
     * @default true
     */
    arrangeTooltips?: boolean;
}
/**
 * Defines events for [[XYChart]].
 */
export interface IXYChartEvents extends ISerialChartEvents {
}
/**
 * Defines adapters for [[XYChart]].
 *
 * @see {@link Adapter}
 */
export interface IXYChartAdapters extends ISerialChartAdapters, IXYChartProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates an XY chart, and any derivative chart, like Serial, Date-based, etc.
 *
 * Basically this is a chart type, that is used to display any chart
 * information in a square plot area.
 *
 * The horizontal and vertical scale is determined by the type of Axis.
 *
 * The plot types are determined by type of Series.
 *
 * ```TypeScript
 * // Includes
 * import * as am4core from "@amcharts/amcharts4/core";
 * import * as am4charts from "@amcharts/amcharts4/charts";
 *
 * // Create chart
 * let chart = am4core.create("chartdiv", am4charts.XYChart);
 *
 * // Add Data
 * chart.data = [{
 * "country": "USA",
 * "visits": 3025
 * }, {
 * 	"country": "China",
 * 	"visits": 1882
 * }, {
 * 	"country": "Japan",
 * 	"visits": 1809
 * }];
 *
 * // Add category axis
 * let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
 * categoryAxis.dataFields.category = "country";
 *
 * // Add value axis
 * let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
 *
 * // Add series
 * let series = chart.series.push(new am4charts.ColumnSeries());
 * series.name = "Web Traffic";
 * series.dataFields.categoryX = "country";
 * series.dataFields.valueY = "visits";
 * ```
 * ```JavaScript
 * // Create chart
 * var chart = am4core.create("chartdiv", am4charts.XYChart);
 *
 * // The following would work as well:
 * // var chart = am4core.create("chartdiv", "XYChart");
 *
 * // Add Data
 * chart.data = [{
 * "country": "USA",
 * "visits": 3025
 * }, {
 * 	"country": "China",
 * 	"visits": 1882
 * }, {
 * 	"country": "Japan",
 * 	"visits": 1809
 * }];
 *
 * // Add category axis
 * var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
 * categoryAxis.dataFields.category = "country";
 *
 * // Add value axis
 * var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
 *
 * // Add series
 * var series = chart.series.push(new am4charts.ColumnSeries());
 * series.name = "Web Traffic";
 * series.dataFields.categoryX = "country";
 * series.dataFields.valueY = "visits";
 * ```
 * ```JSON
 * var chart = am4core.createFromConfig({
 *
 * 	// Category axis
 * 	"xAxes": [{
 * 		"type": "CategoryAxis",
 * 		"dataFields": {
 * 			"category": "country"
 * 		}
 * 	}],
 *
 * 	// Value axis
 * 	"yAxes": [{
 * 		"type": "ValueAxis"
 * 	}],
 *
 * 	// Series
 * 	"series": [{
 * 		"type": "ColumnSeries",
 * 		"dataFields": {
 * 			"categoryX": "country",
 * 			"valueY": "visits"
 * 		},
 * 		"name": "Web Traffic"
 * 	}],
 *
 * 	// Cursor
 * 	"cursor": {},
 *
 * 	// Data
 * 	"data": [{
 * 		"country": "USA",
 * 		"visits": 3025
 * 	}, {
 * 		"country": "China",
 * 		"visits": 1882
 * 	}, {
 * 		"country": "Japan",
 * 		"visits": 1809
 * 	}]
 *
 * }, "chartdiv", "XYChart");
 * ```
 *
 *
 * @see {@link IXYChartEvents} for a list of available Events
 * @see {@link IXYChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/xy-chart/} for documentation
 * @important
 */
export declare class XYChart extends SerialChart {
    /**
     * Defines available data fields.
     */
    _dataFields: IXYChartDataFields;
    /**
     * Defines available properties.
     */
    _properties: IXYChartProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IXYChartAdapters;
    /**
     * Defines available events.
     */
    _events: IXYChartEvents;
    /**
     * Defines a type of series that this chart uses.
     */
    _seriesType: XYSeries;
    /**
     * A list of horizontal axes.
     */
    protected _xAxes: List<Axis<this["_xAxisRendererType"]>>;
    /**
     * A list of vertical axes.
     */
    protected _yAxes: List<Axis<this["_yAxisRendererType"]>>;
    /**
     * A container that holds vertical axes and plot area.
     *
     * @type {Container}
     */
    yAxesAndPlotContainer: Container;
    /**
     * A container that holds top axes.
     *
     * @type {Container}
     */
    topAxesContainer: Container;
    /**
     * A container that holds bottom axes.
     *
     * @type {Container}
     */
    bottomAxesContainer: Container;
    /**
     * A container that holds left axes.
     *
     * @type {Container}
     */
    leftAxesContainer: Container;
    /**
     * A container that holds right axes.
     *
     * @type {Container}
     */
    rightAxesContainer: Container;
    /**
     * A container for plot area.
     *
     * @type {Container}
     */
    plotContainer: Container;
    /**
     * A reference to horizontal [[Scrollbar]].
     */
    protected _scrollbarX: Scrollbar;
    /**
     * A reference to vertical [[Scrollbar]].
     */
    protected _scrollbarY: Scrollbar;
    /**
     * A reference to chart's cursor.
     */
    _cursor: XYCursor;
    /**
     * A container that chart's cursor is placed in.
     */
    protected _cursorContainer: Container;
    /**
     * Defines the type of horizontal axis rederer.
     */
    protected _axisRendererX: typeof AxisRendererX;
    /**
     * Defines the type of vertical axis rederer.
     */
    protected _axisRendererY: typeof AxisRendererY;
    /**
     * Defines the type horizontal axis renderer.
     */
    _xAxisRendererType: AxisRendererX;
    /**
     * Defines the type of vertical axis renderer.
     */
    _yAxisRendererType: AxisRendererY;
    /**
     * A button which is used to zoom out the chart.
     */
    protected _zoomOutButton: Button;
    /**
     * An element that is used as a mask to contain bullets from spilling out of
     * the plot area.
     */
    protected _bulletMask: Sprite;
    protected _panStartXRange: IRange;
    protected _panStartYRange: IRange;
    protected _panEndXRange: IRange;
    protected _panEndYRange: IRange;
    protected _mouseWheelDisposer: IDisposer;
    protected _mouseWheelDisposer2: IDisposer;
    protected _cursorXPosition: number;
    protected _cursorYPosition: number;
    /**
     * Holds a reference to the container axis bullets are drawn in.
     */
    axisBulletsContainer: Container;
    /**
     * @ignore
     */
    _seriesPoints: {
        point: IPoint;
        series: XYSeries;
    }[];
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
     * Draws the chart.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Triggers a redrawing of all chart's series.
     *
     * @ignore Exclude from docs
     */
    updatePlotElements(): void;
    /**
     * Triggers data (re)validation which in turn can cause a redraw of the
     * whole chart or just aprticular series / elements.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * Updates margins for horizontal axes based on settings and available space.
     *
     * @ignore Exclude from docs
     */
    protected updateXAxesMargins(): void;
    /**
     * Triggers a re-initialization of this element.
     *
     * Will result in complete redrawing of the element.
     *
     * @ignore Exclude from docs
     */
    reinit(): void;
    /**
     * Triggers an update on the horizontal axis when one of its properties
     * change.
     *
     * @ignore Exclude from docs
     * @param event An event object
     */
    handleXAxisChange(event: AMEvent<AxisRenderer, ISpriteEvents>["propertychanged"]): void;
    /**
     * Triggers an update on the vertical axis when one of its properties
     * change.
     *
     * @ignore Exclude from docs
     * @param event An event object
     */
    handleYAxisChange(event: AMEvent<AxisRenderer, ISpriteEvents>["propertychanged"]): void;
    /**
     * Sets up a new horizontal (X) axis when it is added to the chart.
     *
     * @ignore Exclude from docs
     * @param event  Axis insert event
     */
    processXAxis(event: IListEvents<Axis>["inserted"]): void;
    /**
     * Sets up a new vertical (Y) axis when it is added to the chart.
     *
     * @ignore Exclude from docs
     * @param event Axis insert event
     */
    processYAxis(event: IListEvents<Axis>["inserted"]): void;
    /**
     * Updates horizontal (X) scrollbar and other horizontal axis whenever axis'
     * value range changes.
     */
    protected handleXAxisRangeChange(): void;
    /**
     * Shows or hides the Zoom Out button depending on whether the chart is fully
     * zoomed out or not.
     */
    toggleZoomOutButton(): void;
    /**
     * @ignore
     * moved this check to a separate method so that we could override it in TreeMapSeries
     */
    protected seriesAppeared(): boolean;
    /**
     * Updates vertical (Y) scrollbar and other horizontal axis whenever axis'
     * value range changes.
     */
    protected handleYAxisRangeChange(): void;
    /**
     * Updates a relative scrollbar whenever data range of the axis changes.
     *
     * @param scrollbar  Scrollbar instance
     * @param range      New data (values) range of the axis
     */
    protected updateScrollbar(scrollbar: Scrollbar, range: IRange): void;
    /**
     * Returns a common range of values between a list of axes.
     *
     * This is used to synchronize the zoom between multiple axes.
     *
     * @ignore Exclude from docs
     * @param axes  A list of axes
     * @return Common value range
     */
    getCommonAxisRange(axes: List<Axis>): IRange;
    /**
     * Triggers (re)rendering of the horizontal (X) axis.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     */
    updateXAxis(renderer: AxisRenderer): void;
    /**
     * Triggers (re)rendering of the vertical (Y) axis.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     */
    updateYAxis(renderer: AxisRenderer): void;
    /**
     * Decorates an Axis for use with this chart, e.g. sets proper renderer
     * and containers for placement.
     *
     * @param axis  Axis
     */
    protected processAxis(axis: Axis): void;
    /**
     * This is done because for some reason IE doesn't change mask if path of a
     * mask changes.
     */
    protected updateSeriesMasks(): void;
    protected handleSeriesRemoved(event: IListEvents<XYSeries>["removed"]): void;
    /**
     * A list of horizontal (X) axes.
     *
     * @return List of axes
     */
    readonly xAxes: List<Axis<this["_xAxisRendererType"]>>;
    /**
     * @ignore
     */
    handleAxisRemoval(event: IListEvents<Axis>["removed"]): void;
    /**
     * A list of vertical (Y) axes.
     *
     * @return List of axes
     */
    readonly yAxes: List<Axis<this["_yAxisRendererType"]>>;
    /**
     * Decorates a new [[XYSeries]] object with required parameters when it is
     * added to the chart.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    handleSeriesAdded(event: IListEvents<XYSeries>["inserted"]): void;
    /**
     * Chart's [[Cursor]].
     *
     * @param cursor  Cursor
     */
    /**
    * @return Cursor
    */
    cursor: this["_cursor"];
    /**
     * Performs tasks when the cursor's position changes, e.g. shows proper
     * tooltips on axes and series.
     *
     * @ignore Exclude from docs
     */
    handleCursorPositionChange(): void;
    /**
     * Finds closest data item to position out of the array of items.
     *
     * @since 4.9.29
     * @param   dataItems  Array of items
     * @param              xPosition X position
     * @param              yPosition Y position
     * @return             Data item
     */
    getClosest(dataItems: XYSeriesDataItem[], xPosition: number, yPosition: number): XYSeriesDataItem;
    /**
     * Hides all cursor-related tooltips when the cursor itself is hidden.
     *
     * @ignore Exclude from docs
     */
    handleHideCursor(): void;
    /**
     * Updates values for each series' legend item.
     *
     * @ignore Exclude from docs
     */
    updateSeriesLegend(): void;
    /**
     * Hides a tooltip for a list of objects.
     *
     * @ignore Exclude from docs
     * @param sprites  A list of sprites to hide tooltip for
     */
    hideObjectTooltip(sprites: List<Axis | XYSeries>): void;
    /**
     * Shows a tooltip for all chart's series, using specific coordinates as a
     * reference point.
     *
     * The tooltip might be shown at different coordinates depending on the
     * actual data point's position, overlapping with other tooltips, etc.
     *
     * @ignore Exclude from docs
     * @param position  Reference point
     */
    showSeriesTooltip(position?: IPoint): void;
    /**
     * @ignore
     */
    sortSeriesTooltips(seriesPoints: {
        point: IPoint;
        series: XYSeries;
    }[]): void;
    /**
     * Shows tooltips for a list of axes at specific position.
     *
     * Position might be X coordinate for horizontal axes, and Y coordinate for
     * vertical axes.
     *
     * @ignore Exclude from docs
     * @param axes      List of axes to show tooltip on
     * @param position  Position (px)
     */
    showAxisTooltip(axes: List<Axis>, position: number, except?: Axis[]): void;
    /**
     * Recalculates the value range for the axis taking into account zoom level & inversed.
     *
     * @param axis   Axis
     * @param range  Range
     * @return Modified range
     */
    getUpdatedRange(axis: Axis<this["_xAxisRendererType"]>, range: IRange): IRange;
    /**
     * Performs zoom and other operations when user finishes zooming using chart
     * cursor, e.g. zooms axes.
     *
     * @param event Cursor's event
     */
    protected handleCursorZoomEnd(event: IXYCursorEvents["zoomended"]): void;
    /**
     * Performs zoom and other operations when user is panning chart plot using chart cursor.
     *
     * @param event Cursor's event
     */
    protected handleCursorPanStart(event: IXYCursorEvents["panning"]): void;
    /**
     * Performs zoom and other operations when user ends panning
     *
     * @param event Cursor's event
     */
    protected handleCursorPanEnd(event: IXYCursorEvents["panning"]): void;
    protected handleCursorCanceled(): void;
    /**
     * Performs zoom and other operations when user is panning chart plot using chart cursor.
     *
     * @param event Cursor's event
     */
    protected handleCursorPanning(event: IXYCursorEvents["panning"]): void;
    /**
     * @ignore
     */
    handleYAxisSet(series: XYSeries): void;
    /**
     * Performs zoom and other operations when user starts zooming using chart
     * cursor, e.g. zooms axes.
     *
     * @param event Cursor's event
     */
    protected handleCursorZoomStart(event: IXYCursorEvents["zoomstarted"]): void;
    /**
     * Horizontal (X) scrollbar.
     *
     * @param scrollbar Scrollbar
     */
    /**
    * @return Scrollbar
    */
    scrollbarX: Scrollbar;
    /**
     * Vertical (Y) scrollbar.
     *
     * @param scrollbar Scrollbar
     */
    /**
    * @return Scrollbar
    */
    scrollbarY: Scrollbar;
    /**
     * Zooms axes affected by the horizontal (X) scrollbar when the selection
     * on it changes.
     *
     * @param event Scrollbar range change event
     */
    protected handleXScrollbarChange(event: AMEvent<Scrollbar, IScrollbarEvents>["rangechanged"]): void;
    /**
     * Zooms axes affected by the vertical (Y) scrollbar when the selection
     * on it changes.
     *
     * @param event Scrollbar range change event
     */
    protected handleYScrollbarChange(event: AMEvent<Scrollbar, IScrollbarEvents>["rangechanged"]): void;
    /**
     * Zooms axes that are affected by to specific relative range.
     *
     * @param axes       List of axes to zoom
     * @param range      Range of values to zoom to (0-1)
     * @param instantly  If set to `true` will skip zooming animation
     * @return Recalculated range that is common to all involved axes
     */
    protected zoomAxes(axes: List<Axis<this["_xAxisRendererType"]>>, range: IRange, instantly?: boolean, round?: boolean, declination?: number, stop?: boolean): IRange;
    /**
     * Indicates if bullet container is masked.
     *
     * If it is set to `true`, any bullets that do not fit into bullet container
     * will be clipped off. Settting to `false` will allow bullets to "spill out"
     * of the plot area so they are not cut off.
     *
     * @param value Mask bullet container?
     */
    /**
    * @return Mask bullet container?
    */
    maskBullets: boolean;
    /**
     * Indicates if chart should arrange series tooltips so that they would not
     * overlap.
     *
     * If set to `true` (default), the chart will adjust vertical positions of
     * all simultaneously shown tooltips to avoid overlapping.
     *
     * However, if you have a vertically-arranged chart, it might not make sense,
     * because tooltips would most probably not be aligned horizontally. In this
     * case it would probably be a good idea to set this setting to `false`.
     *
     * @default true
     * @param value Arrange tooltips?
     */
    /**
    * @return Arrange tooltips?
    */
    arrangeTooltips: boolean;
    /**
     * Handles mouse wheel event.
     *
     * @param event  Original event
     */
    protected handleWheel(event: AMEvent<Sprite, ISpriteEvents>["wheel"]): void;
    /**
     * Handles mouse wheel event.
     *
     * @param event  Original event
     */
    protected handleHorizontalWheel(event: AMEvent<Sprite, ISpriteEvents>["wheel"]): void;
    /**
     * @ignore
     */
    protected handleWheelReal(shift: number, mouseWheelBehavior: "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none", plotPoint: IPoint): void;
    /**
     * Specifies action for when mouse wheel is used when over the chart.
     *
     * Options: Options: `"zoomX"`, `"zoomY"`, `"zoomXY"`, `"panX"`, `"panY"`,`"panXY"`, `"none"` (default).
     *
     * You can control sensitivity of wheel zooming via `mouseOptions`.
     *
     * @default "none"
     * @see {@link https://www.amcharts.com/docs/v4/reference/sprite/#mouseOptions_property} More information about `mouseOptions`
     * @param mouse wheel behavior
     */
    /**
    * @return Mouse wheel behavior
    */
    mouseWheelBehavior: "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none";
    /**
     * Specifies action for when horizontal mouse wheel is used when over the chart.
     *
     * Options: Options: `"zoomX"`, `"zoomY"`, `"zoomXY"`, `"panX"`, `"panY"`, `"panXY"`, `"none"` (default).
     *
     * @default "none"
     * @see {@link https://www.amcharts.com/docs/v4/reference/sprite/#mouseOptions_property} More information about `mouseOptions`
     * @param mouse wheel behavior
     */
    /**
    * @return Horizontal mouse wheel behavior
    */
    horizontalMouseWheelBehavior: "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none";
    /**
     * This function is called by the [[DataSource]]'s `dateFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-specific data fields so they are parsed properly.
     *
     * @param fields  Array of date fields
     * @return Array of date fields populated with chart's date fields
     */
    protected dataSourceDateFields(fields: string[]): string[];
    /**
     * This function is called by the [[DataSource]]'s `numberFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-specific data fields so they are parsed properly.
     *
     * @param value  Array of number fields
     * @return Array of number fields populated with chart's number fields
     */
    protected dataSourceNumberFields(fields: string[]): string[];
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
    /**
     * Creates a new Series of type suitable for this chart.
     *
     * @return New series
     */
    protected createSeries(): this["_seriesType"];
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
    zoomOutButton: Button;
    /**
     * Copies all parameters from another [[XYChart]].
     *
     * @param source Source XYChart
     */
    copyFrom(source: this): void;
    /**
     * @ignore
     */
    disposeData(): void;
    /**
     * Adds one or several (array) of data items to the existing data.
     *
     * @param rawDataItem One or many raw data item objects
     */
    addData(rawDataItem: Object | Object[], removeCount?: number): void;
    /**
     * @ignore
     */
    protected addScrollbarData(scrollbar: XYChartScrollbar, removeCount: number): void;
    /**
     * @ignore
     */
    protected removeScrollbarData(scrollbar: XYChartScrollbar, removeCount: number): void;
    /**
     * Removes elements from the beginning of data
     *
     * @param count number of elements to remove
     */
    removeData(count: $type.Optional<number>): void;
    /**
     * @param  value  Tap to activate?
     */
    protected setTapToActivate(value: boolean): void;
    protected handleTapToActivate(): void;
    protected handleTapToActivateDeactivation(): void;
}
