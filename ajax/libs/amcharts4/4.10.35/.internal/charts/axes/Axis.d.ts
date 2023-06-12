/**
 * Base class for all Axis
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Component, IComponentProperties, IComponentDataFields, IComponentAdapters, IComponentEvents } from "../../core/Component";
import { Container } from "../../core/Container";
import { Sprite } from "../../core/Sprite";
import { DataItem, IDataItemAdapters } from "../../core/DataItem";
import { Grid } from "./Grid";
import { AxisTick } from "./AxisTick";
import { AxisLabel } from "./AxisLabel";
import { AxisFill } from "./AxisFill";
import { AxisBreak } from "./AxisBreak";
import { AxisRenderer } from "./AxisRenderer";
import { Chart } from "../Chart";
import { XYSeries, XYSeriesDataItem } from "../series/XYSeries";
import { IPoint, IOrientationPoint } from "../../core/defs/IPoint";
import { Label } from "../../core/elements/Label";
import { IRectangle } from "../../core/defs/IRectangle";
import { PointerOrientation } from "../../core/elements/Tooltip";
import { IRange } from "../../core/defs/IRange";
import { Ordering } from "../../core/utils/Order";
import { SortedListTemplate } from "../../core/utils/SortedList";
import { List, ListTemplate, IListEvents } from "../../core/utils/List";
import { IDisposer } from "../../core/utils/Disposer";
import * as $iter from "../../core/utils/Iterator";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[Axis]].
 *
 * @see {@link DataItem}
 */
export declare class AxisDataItem extends DataItem {
    /**
     * Reference to a related [[Grid]] element.
     */
    protected _grid: Grid;
    /**
     * Reference to a related [[AxisTick]] element.
     */
    protected _tick: AxisTick;
    /**
     * Reference to a related [[AxisLabel]] element.
     */
    protected _label: AxisLabel;
    /**
     * Reference to a related [[AxisFill]] element.
     */
    protected _axisFill: AxisFill;
    /**
     * A mask for axis. We're using [[AxisFill]] since the mask, basically, has
     * the same shape and features.
     */
    protected _mask: AxisFill;
    /**
     * Container which might be used to hold some extra items, like series
     * segments when data item is used for axis range.
     */
    protected _contents: Container;
    /**
     * A text to be used as label for this data item.
     */
    protected _text: string;
    /**
     * Holds a physical position of the grid line associated with this data item,
     * so that it can be used when measuring distance between points, and hiding
     * some of them so they don't overlap.
     */
    point: IPoint;
    /**
     * If the data item is within an existing [[AxisBreak]] this property will
     * hold a reference to that [[AxisBreak]].
     */
    _axisBreak: AxisBreak;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: Axis;
    /**
     * Used to distinguish from real data points and those data items that are
     * used for ranges, like `series.axisRanges` or `axis.axisRanges`.
     *
     * @ignore Exclude from docs
     */
    isRange: boolean;
    /**
     * relative position of data item on axis
     */
    position: number;
    /**
     * @ignore
     */
    protected _bullet: Sprite;
    /**
     * Allows hiding axis item (tick, label, grid) if it is closer to axis
     * beginning than this relative position (0-1).
     *
     * For axis labels it overrides `minLabelPosition` if set.
     *
     * ```TypeScript
     * // Hide all ticks and labels closer than 20% to axis beginning.
     * axis.dataItems.template.minPosition = 0.2;
     * ```
     * ```JavaScript
     * // Hide all ticks and labels closer than 20% to axis beginning.
     * axis.dataItems.template.minPosition = 0.2;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "xAxes": [{
     *     // ...
     *     // Hide all ticks and labels closer than 20% to axis beginning.
     *     "dataItems": {
     *       "minPosition": 0.2
     *     }
     *   }]
     * }
     * ```
     *
     * @since 4.5.11
     */
    minPosition?: number;
    /**
     * Allows hiding axis item (tick, label, grid) if it is closer to axis
     * end than this relative position (0-1).
     *
     * For axis labels it overrides `maxLabelPosition` if set.
     *
     * ```TypeScript
     * // Hide all ticks and labels closer than 20% to axis end.
     * axis.dataItems.template.maxPosition = 0.8;
     * ```
     * ```JavaScript
     * // Hide all ticks and labels closer than 20% to axis end.
     * axis.dataItems.template.maxPosition = 0.8;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "xAxes": [{
     *     // ...
     *     // Hide all ticks and labels closer than 20% to axis end.
     *     "dataItems": {
     *       "maxPosition": 0.8
     *     }
     *   }]
     * }
     * ```
     *
     * @since 4.5.11
     */
    maxPosition?: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * Actual index of the axis data item.
     *
     * @since 4.7.8
     */
    itemIndex: number;
    /**
     * A [[Grid]] element associated with this data item.
     *
     * If there is no grid element associated with data item, a new one is
     * created and returned.
     *
     * @param grid  Grid element
     */
    /**
    * @return Grid element
    */
    grid: Grid;
    /**
     * An [[AxisTick]] element associated with this data item.
     *
     * If there is no tick element associated with data item, a new one is
     * created and returned.
     *
     * @param tick  Tick element
     */
    /**
    * @return Tick element
    */
    tick: AxisTick;
    /**
     * An [[AxisLabel]] element associated with this data item.
     *
     * If there is no label element associated with data item, a new one is
     * created and returned.
     *
     * @param label Label element
     */
    /**
    * @return Label element
    */
    label: AxisLabel;
    /**
     * An [[AxisFill]] associated element with this data item.
     *
     * If there is no fill element associated with data item, a new one is
     * created and returned.
     *
     * @param label Label element
     */
    /**
    * @return Label element
    */
    axisFill: AxisFill;
    /**
     * Text to be used as data item's label.
     *
     * @param text Text label
     */
    /**
    * @return Text label
    */
    text: string;
    /**
     * Data item's mask.
     *
     * @return Mask
     */
    readonly mask: AxisFill;
    /**
     * Returns a [[Container]] to place all visual elements, related to data item
     * in.
     *
     * If there is no Container, a new one is created.
     *
     * @return Contents container
     */
    readonly contents: Container;
    /**
     * An [[AxisBreak]] this data item falls within.
     *
     * @param axisBreak Axis break
     */
    /**
    * @return Axis break
    */
    axisBreak: this["_axisBreak"];
    /**
     * Re-draws the element.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Appends data item's elements to the parent [[Container]].
     *
     * @ignore Exclude from docs
     */
    appendChildren(): void;
    /**
     * Checks if data item has particular property set.
     *
     * @param prop  Property name
     * @return Property set?
     */
    protected hasProperty(prop: string): boolean;
    /**
     * Copies all parameters from another [[AxisDataItem]].
     *
     * @param source Source AxisDataItem
     */
    copyFrom(source: this): void;
    /**
     * Sets visibility of the Data Item.
     *
     * @param value Data Item
     */
    setVisibility(value: boolean, noChangeValues?: boolean): void;
    /**
     * Set it to an instance of any [[Sprite]]. It will be displayed as an axis
     * bullet in the middle of the cell, or specific value.
     *
     * If you need position bullet relatively to the cell, use [[AxisBullet]]
     * instead. It has a `location` property which can be used to indicate
     * precise relative location within cell/range.
     *
     * Also, [[AxisBullet]] is a [[Container]] so you can push any other element
     * into it.
     *
     * NOTE: `location` is relative to the parent axis range's scope, i.e.
     * between its `date` and `endDate` for [[DateAxis]], or `value`/`endValue`
     * ([[ValueAxis]]), or `category`/`endCategory` ([[categoryAxis]]).
     *
     * ```TypeScript
     * let range = dateAxis.axisRanges.create();
     * range.date = new Date(2018, 0, 5);
     *
     * let flag = new am4plugins_bullets.FlagBullet();
     * flag.label.text = "Hello";
     *
     * range.bullet = flag;
     * ```
     * ```JavaScript
     * var range = dateAxis.axisRanges.create();
     * range.date = new Date(2018, 0, 5);
     *
     * var flag = new am4plugins_bullets.FlagBullet();
     * flag.label.text = "Hello";
     *
     * range.bullet = flag;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "xAxes": [{
     *     "type": "DateAxis",
     *     // ...
     *     "axisRanges": [{
     *       "date": new Date(2018, 0, 5),
     *       "bullet: {
     *         "type": "FlagBullet",
     *         "label": {
     *           "text": "Hello"
     *         }
     *       }
     *     }]
     *   }]
     * }
     * ```
     *
     * @since 4.5.9
     * @param  value  Bullet
     */
    /**
    * @return Bullet
    */
    bullet: Sprite;
}
/**
 * Defines adapters for [[AxisDataItem]]
 * Includes both the [[DataItemAdapter]] definitions and properties
 * @see {@link DataItemAdapter}
 */
export interface IAxisDataItemAdapters extends IDataItemAdapters {
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines named positions for data item's location within [[Axis]].
 */
export declare enum AxisItemLocation {
    Start = 0,
    Middle = 0.5,
    End = 1
}
/**
 * Defines data fields for [[Axis]].
 */
export interface IAxisDataFields extends IComponentDataFields {
}
/**
 * Defines properties for [[Axis]].
 */
export interface IAxisProperties extends IComponentProperties {
    /**
     * Axis start location.
     *
     * * 0 - None of the first cell is shown. (don't do that)
     * * 0.5 - Half of the first cell is shown.
     * * 1 - Full first cell is shown.
     *
     * @param value Location (0-1)
     */
    startLocation?: number;
    /**
     * Axis end location.
     *
     * * 0 - None of the last cell is shown. (don't do that)
     * * 0.5 - Half of the last cell is shown.
     * * 1 - Full last cell is shown.
     *
     * @param value Location (0-1)
     */
    endLocation?: number;
    /**
     * Indicates if cusor's tooltip should be shown on this Axis.
     */
    cursorTooltipEnabled?: boolean;
    /**
     * Normally, when axis is zoomed in, a zoom out button is shown by a chart,
     * and vice versa: when axis is zoomed out completely, zoom out button is
     * hidden.
     *
     * Setting this to `false` will disable this behavior. Zooming in our out
     * this axis will not reveal or hide zoom out button.
     *
     * @default true
     */
    toggleZoomOutButton?: boolean;
    /**
     * Indicates if axis' tooltip should be hidden while axis range is animating
     * (zooming)
     *
     * @since 4.7.16
     * @default true
     */
    hideTooltipWhileZooming?: boolean;
    zoomable?: boolean;
}
/**
 * Defines events for [[Axis]].
 */
export interface IAxisEvents extends IComponentEvents {
    /**
     * Invoked when available axis lenght changes, e.g. after resizing the whole
     * chart.
     */
    lengthchanged: {};
}
/**
 * Defines adapters for [[Axis]].
 *
 * @see {@link Adapter}
 */
export interface IAxisAdapters extends IComponentAdapters, IAxisProperties {
    /**
     * Applied to the tooltip text before it is shown.
     */
    getTooltipText: string;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all Axis elements.
 *
 * @see {@link IAxisEvents} for a list of available Events
 * @see {@link IAxisAdapters} for a list of available Adapters
 */
export declare class Axis<T extends AxisRenderer = AxisRenderer> extends Component {
    /**
     * Defines list of data fields.
     */
    _dataFields: IAxisDataFields;
    /**
     * Defines available properties.
     */
    _properties: IAxisProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisAdapters;
    /**
     * Defines the type of the [[DataItem]] used in the class.
     */
    _dataItem: AxisDataItem;
    /**
     * A list of Axis Ranges.
     */
    protected _axisRanges: ListTemplate<this["_dataItem"]>;
    /**
     * Defines the type of the axis breaks.
     */
    _axisBreak: AxisBreak;
    /**
     * Defines available events.
     */
    _events: IAxisEvents;
    /**
     * A [[Label]] instance that is used for Axis title label.
     */
    protected _title: Label;
    /**
     * "X", "Y", etc.
     *
     * This is needed so that Axis knows which of the values from series' data
     * items it should use.
     *
     * @ignore Exclude from docs
     */
    axisLetter: string;
    /**
     * A reference to chart the axis is for.
     */
    protected _chart: Chart;
    /**
     * A type for renderer used for this Axis.
     */
    _renderer: T;
    /**
     * Number of Grid elements on the axis.
     */
    protected _gridCount: number;
    /**
     * A list of [[XYSeries]] that are using this Axis.
     */
    protected _series: List<XYSeries>;
    /**
     * Holds the length of the Axis, so that we can check if it changed after
     * other changes and we need to update layouts.
     */
    protected _prevLength: number;
    /**
     * A list of Axis Breaks associated with this Axis.
     */
    protected _axisBreaks: SortedListTemplate<this["_axisBreak"]>;
    /**
     * A reference to the Iterator for Axis' data items.
     */
    protected _dataItemsIterator: $iter.ListIterator<this["_dataItem"]>;
    /**
     * A name of the data field this Axis looks for its data in, e.g. "category".
     *
     * @ignore Exclude from docs
     */
    axisFieldName: string;
    /**
     * [currentItemStartPoint description]
     *
     * @ignore Exclude from docs
     */
    currentItemStartPoint: IPoint;
    /**
     * [currentItemEndPoint description]
     *
     * @ignore Exclude from docs
     */
    currentItemEndPoint: IPoint;
    protected _tooltipPosition: number;
    /**
     * @ignore
     */
    relativePositionSprite?: Sprite;
    /**
     * Holds reference to a function that accepts a DataItem and its index as
     * parameters.
     *
     * It can either return a fill opacity for a fill, or manipulate data item
     * directly, to create various highlighting scenarios.
     *
     * For example, you can set it up to highlight only weekends on a
     * [[DateAxis]].
     */
    fillRule(dataItem: this["_dataItem"], index?: number): void;
    /**
     * Full length of the axis, in pixels.
     *
     * @readonly
     */
    axisFullLength: number;
    /**
     * Ghost label is used to prevent chart shrinking/expanding when zooming or
     * when data is invalidated. You can set custom text on it so that it would
     * be bigger/smaller,
     */
    ghostLabel: AxisLabel;
    /**
     * Specifies if axis should be automatically disposed when removing from
     * chart's axis list.
     *
     * @default true
     */
    autoDispose: boolean;
    /**
     * @ignore
     */
    protected _axisItemCount: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Invalidates layout.
     *
     * @ignore Exclude from docs
     */
    invalidateLayout(): void;
    /**
     * Invalidates series of this axis.
     */
    invalidateSeries(): void;
    /**
     * Override to cancel super call for data element validation.
     * @ignore
     */
    validateDataElements(): void;
    /**
     * Recalculates the number of grid items on the axis.
     */
    protected updateGridCount(): void;
    /**
     * Redraws the element.
     *
     * @ignore Exclude from docs
     */
    validateLayout(): void;
    /**
     * Initializes Axis' renderer.
     *
     * @ignore Exclude from docs
     */
    initRenderer(): void;
    /**
     * Adds a data item to the Axis.
     *
     * @param dataItem Data item
     */
    appendDataItem(dataItem: this["_dataItem"]): void;
    /**
     * Redraws Axis' related items.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Redars Axis ranges.
     *
     * @ignore Exclude from docs
     */
    validateAxisRanges(): void;
    /**
     * Invalidates all axis breaks, so they are redrawn.
     *
     * @ignore Exclude from docs
     */
    validateBreaks(): void;
    /**
     * Associates an Axis break with this Axis, after it is inserted into
     * `axisBreaks`.
     *
     * @ignore Exclude from docs
     * @param event Event
     */
    processBreak(event: IListEvents<this["_axisBreak"]>["inserted"]): void;
    /**
     * Registers a [[XYSeries]] element with this Axis.
     *
     * Returns a [[Disposer]] for all events, added to Series for watching
     * changes in Axis, and vice versa.
     * @ignore
     * @param series  Series
     * @return Event disposer
     */
    registerSeries(series: XYSeries): IDisposer;
    /**
     * An [[AxisRenderer]] to be used to render this Axis.
     *
     * Please note that most of the settings, related to Axis' appearance are set
     * via its renderer. Not directly on the Axis.
     *
     * E.g.:
     *
     * ```TypeScript
     * axis.renderer.inside = true;
     * axis.renderer.minLabelPosition = 0.1;
     * axis.renderer.maxLabelPosition = 0.9;
     * ```
     * ```JavaScript
     * axis.renderer.inside = true;
     * axis.renderer.minLabelPosition = 0.1;
     * axis.renderer.maxLabelPosition = 0.9;
     * ```
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/} for more info
     * @param renderer  Renderer
     */
    /**
    * @return Renderer
    */
    renderer: this["_renderer"];
    /**
     * Converts a relative position to angle. (for circular axes)
     *
     * @param position Position (0-1)
     * @return Angle
     */
    positionToAngle(position: number): number;
    /**
     * Converts pixel coordinates to a relative position. (0-1)
     *
     * @param point  Coorinates (px)
     * @return Position (0-1)
     */
    pointToPosition(point: IPoint): number;
    /**
     * Converts relative position to coordinate.
     *
     * @since 4.7.15
     * @param position (0-1)
     * @return coordinate (px)
     */
    positionToCoordinate(position: number): number;
    /**
     * [getAnyRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param start  [description]
     * @param end    [description]
     * @return [description]
     */
    getAnyRangePath(start: any, end: any): string;
    /**
     * Converts any positional parameter to a relative position on axis.
     *
     * @todo Description (review)
     * @param value  Pisition
     * @return Position (0-1)
     */
    anyToPosition(value: any): number;
    /**
     * Converts any positional parameter to a relative position on axis.
     *
     * @todo Description (review)
     * @param value  Pisition
     * @return Orientation point
     */
    anyToPoint(value: any): IOrientationPoint;
    /**
     * [getPositionRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param startPosition [description]
     * @param endPosition   [description]
     * @return [description]
     */
    getPositionRangePath(startPosition: number, endPosition: number): string;
    /**
     * Actual axis length in pixels.
     *
     * @return Axis length (px)
     */
    readonly axisLength: number;
    /**
     * Indicates if axis should display a tooltip for chart's cursor.
     *
     * @param value Display tooltip?
     */
    /**
    * @return Display tooltip?
    */
    cursorTooltipEnabled: boolean;
    /**
     * Normally, when axis is zoomed in, a zoom out button is shown by a chart,
     * and vice versa: when axis is zoomed out completely, zoom out button is
     * hidden.
     *
     * Setting this to `false` will disable this behavior. Zooming in our out
     * this axis will not reveal or hide zoom out button.
     *
     * @default true
     * @since 4.6.2
     * @param  value  Toggle zoom out button?
     */
    /**
    * @return Toggle zoom out button?
    */
    toggleZoomOutButton: boolean;
    /**
     * Hides element's [[Tooltip]].
     *
     * @see {@link Tooltip}
     */
    hideTooltip(duration?: number): void;
    /**
     * Shows Axis tooltip at specific relative position within Axis. (0-1)
     *
     * @param position Position (0-1)
     * @param local or global position
     */
    showTooltipAtPosition(position: number, local?: boolean): void;
    /**
     * Converts relative position (0-1) to Axis position with zoom level and
     * inversed taken into account.
     *
     * @param position Global position (0-1)
     * @return Position within Axis (0-1)
     */
    toAxisPosition(position: number): number;
    /**
     * Converts position on the axis with zoom level and
     * inversed taken into account to global position.
     *
     * @param position Axis position (0-1)
     * @return Global position (0-1)
     */
    toGlobalPosition(position: number): number;
    /**
     * Returns text to be used for cursor's Axis tooltip.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @param position  Position coordinate (px)
     * @return Label text
     */
    getTooltipText(position: number): string;
    /**
     * Updates Axis' tooltip's position and possibly size, and pointer (stem)
     * place.
     *
     * @ignore Exclude from docs
     * @param pointerOrientation  Pointer (stem) orientation
     * @param boundingRectangle   A rectangle for tooltip to fit within
     */
    updateTooltip(pointerOrientation: PointerOrientation, boundingRectangle: IRectangle): void;
    /**
     * [roundPosition description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param position  Relative position
     * @param location  Location on axis
     * @return Rounded position
     */
    roundPosition(position: number, location: AxisItemLocation, axisLocation?: number): number;
    /**
     * [getCellStartPosition description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param position [description]
     * @return [description]
     */
    getCellStartPosition(position: number): number;
    /**
     * [getCellEndPosition description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param position [description]
     * @return [description]
     */
    getCellEndPosition(position: number): number;
    /**
     * A list of axis ranges for this Axis.
     *
     * @return Axis ranges
     */
    readonly axisRanges: ListTemplate<this["_dataItem"]>;
    /**
     * Decorates an axis range after it has been added to the axis range list.
     *
     * @param event Event
     */
    protected processAxisRange(event: IListEvents<this["_dataItem"]>["inserted"]): void;
    /**
     * A list of axis breaks on this Axis.
     *
     * @return Axis breaks.
     */
    readonly axisBreaks: SortedListTemplate<this["_axisBreak"]>;
    /**
     * Creates a new axis break.
     *
     * @return Axis break
     */
    protected createAxisBreak(): this["_axisBreak"];
    /**
     * A list of Series currently associated with this Axis.
     *
     * @return Series
     */
    readonly series: List<XYSeries>;
    /**
     * Processes Series' data items.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     */
    processSeriesDataItems(): void;
    /**
     * Processes Series' single data item.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @param dataItem Data item
     */
    processSeriesDataItem(dataItem: XYSeriesDataItem, axisLetter?: string): void;
    /**
     * Post-processes Serie's data items.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     */
    postProcessSeriesDataItems(series?: XYSeries): void;
    /**
     * Post-processes Serie's single data item.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @param dataItem Data item
     */
    postProcessSeriesDataItem(dataItem: XYSeriesDataItem): void;
    /**
     * Updates Axis based on all Series that might influence it.
     *
     * Called by Series after Series data is validated.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     */
    updateAxisBySeries(): void;
    /**
     * Hides unused data items.
     *
     * @ignore Exclude from docs
     */
    hideUnusedDataItems(): void;
    /**
     * Returns a Series' data item that corresponds to specific position on Axis.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @param series    Series
     * @param position  Position (0-1)
     * @param findNearest  Should axis try to find nearest tooltip if there is no data item at exact position
     * @return Data item
     */
    getSeriesDataItem(series: XYSeries, position: number, findNearest?: boolean): XYSeriesDataItem;
    /**
     * Returns an angle that corresponds to specific position on axis.
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       ???
     * @param location  Location
     * @param stackKey  ???
     * @return Angle
     */
    getAngle(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * [getX description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem [description]
     * @param key      [description]
     * @param location [description]
     * @param stackKey [description]
     * @return [description]
     */
    getX(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * [getX description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem [description]
     * @param key      [description]
     * @param location [description]
     * @param stackKey [description]
     * @return [description]
     */
    getPositionX(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * [getY description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem [description]
     * @param key      [description]
     * @param location [description]
     * @param stackKey [description]
     * @return [description]
     */
    getY(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * [getY description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem [description]
     * @param key      [description]
     * @param location [description]
     * @param stackKey [description]
     * @return [description]
     */
    getPositionY(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Coordinates of the actual axis start.
     *
     * @ignore Exclude from docs
     * @return Base point coordinates
     */
    readonly basePoint: IPoint;
    /**
     * [dataChangeUpdate description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    dataChangeUpdate(): void;
    /**
     * [dataChangeUpdate description]
     *
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    seriesDataChangeUpdate(series: XYSeries): void;
    /**
     * Removes axis breaks that fall between `min` and `max` (???)
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param min  Start value
     * @param max  End value
     * @return Spread o
     */
    protected adjustDifference(min: number, max: number): number;
    /**
     * Checks if specific value falls within a break.
     *
     * Returns [[AxisBreak]] the value falls into.
     *
     * @param value  Value to check
     * @return Axis break
     */
    protected isInBreak(value: number): this["_axisBreak"];
    /**
     * [fixAxisBreaks description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    protected fixAxisBreaks(): void;
    /**
     * We need start/end indexes of axes to be 0 - `dataItems.length`.
     *
     * Yes, also for category axis, this helps to avoid jumping of categories
     * while scrolling and does not do a lot of extra work as we use
     * protected `_startIndex` and `_endIndex` when working with items.
     *
     * @hidden
     */
    /**
     * [startIndex description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param value [description]
     */
    /**
    * @ignore Exclude from docs
    * @return [description]
    */
    startIndex: number;
    /**
     * [endIndex description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param value [description]
     */
    /**
    * @ignore Exclude from docs
    * @return [description]
    */
    endIndex: number;
    /**
     * Returns a formatted label based on position.
     *
     * Individual axis types should override this method to generate a label
     * that is relevant to axis type.
     *
     * Please note that `position` represents position within axis which may be
     * zoomed and not correspond to Cursor's `position`.
     *
     * To convert Cursor's `position` to Axis' `position` use `toAxisPosition()` method.
     *
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/tracking-cursors-position-via-api/#Tracking_Cursor_s_position} For more information about cursor tracking.
     * @param position  Relative position on axis (0-1)
     * @return Position label
     */
    getPositionLabel(position: number): string;
    /**
     * A Chart this Axis belongs to.
     *
     * @param value  Chart
     */
    /**
    * @return Chart
    */
    chart: Chart;
    /**
     * Creates a data item for a Series range.
     *
     * @param series  Target Series
     * @return Range data item
     */
    createSeriesRange(series: XYSeries): this["_dataItem"];
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    copyFrom(source: this): void;
    /**
     * Resets internal iterator.
     */
    protected resetIterators(): void;
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
     * Ordering function used in JSON setup.
     *
     * @param a  Item A
     * @param b  Item B
     * @return Order
     */
    protected configOrder(a: string, b: string): Ordering;
    /**
     * Axis start location. Works on Date/Category axis, doesn't work on Value axis.
     *
     * * 0 - Full first cell is shown.
     * * 0.5 - Half of first cell is shown.
     * * 1 - None of the first cell is visible. (you probably don't want that)
     *
     * @param value Location (0-1)
     */
    /**
    * @return Location (0-1)
    */
    startLocation: number;
    /**
     * Axis end location. Works on Date/Category axis, doesn't work on Value axis.
     *
     * * 0 - None of the last cell is shown. (don't do that)
     * * 0.5 - Half of the last cell is shown.
     * * 1 - Full last cell is shown.
     *
     * @param value Location (0-1)
     */
    /**
    * @return Location (0-1)
    */
    endLocation: number;
    protected setDisabled(value: boolean): boolean;
    /**
     * A reference to a [[Label]] element which serves as a title to the axis.
     *
     * When axis is created it aleready has an element, so you can just modify
     * it.
     *
     * Or you can replace it with your own instance of `Label`.
     *
     * @param  value  Title label
     */
    /**
    * @return Title label
    */
    title: Label;
    /**
     * Indicates if axis' tooltip should be hidden while axis range is animating
     * (zooming)
     *
     * @default true
     * @since 4.7.16
     * @param  value  Hide tooltip while zooming?
     */
    /**
    * @return Hide tooltip while zooming?
    */
    hideTooltipWhileZooming: boolean;
    /**
     * Should the axis be zoomed with scrollbar/cursor?
     *
     * @default true
     * @since 4.9.28
     * @param  value  Zoomable?
     */
    /**
    * @return Zoomable?
    */
    zoomable: boolean;
}
