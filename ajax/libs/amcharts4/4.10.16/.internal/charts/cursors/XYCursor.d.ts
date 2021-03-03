/**
 * Cursor for XY chart
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Cursor, ICursorProperties, ICursorAdapters, ICursorEvents } from "./Cursor";
import { Sprite, ISpriteEvents } from "../../core/Sprite";
import { MutableValueDisposer, IDisposer } from "../../core/utils/Disposer";
import { IPoint } from "../../core/defs/IPoint";
import { IRange } from "../../core/defs/IRange";
import { Axis } from "../axes/Axis";
import { XYSeries } from "../series/XYSeries";
import { AxisRenderer } from "../axes/AxisRenderer";
import { XYChart } from "../types/XYChart";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[XYCursor]].
 */
export interface IXYCursorProperties extends ICursorProperties {
    /**
     * Cursor's behavior when moved with pointer down:
     *
     * * "zoomX" - zooms horizontally; (default)
     * * "zoomY" - zooms vertically;
     * * "zoomXY" - zooms both horizontally and vertically;
     * * "selectX" - selects a range horizontally;
     * * "selectY" - selects a range vertically;
     * * "selectXY" - selects a range both horizontally and vertically;
     * * "panX" - moves (pans) current selection horizontally;
     * * "panY" - moves (pans) current selection vertically;
     * * "panXY" - moves (pans) current selection both horizontally and vertically;
     * * "none" - does nothing with pointer down.
     *
     * @default "zoomX"
     */
    behavior?: "zoomX" | "zoomY" | "zoomXY" | "selectX" | "selectY" | "selectXY" | "panX" | "panY" | "panXY" | "none";
    /**
     * Cursor's horizontal line is expanded to take full width of the related
     * Axis' cell/category.
     */
    fullWidthLineX?: boolean;
    /**
     * Cursor's vertical line is expanded to take full width of the related
     * Axis' cell/category.
     */
    fullWidthLineY?: boolean;
    /**
     * If cursor behavior is panX or panY, we allow to pan plot out of it's max bounds for a better user experience.
     * This setting specifies relative value by how much we can pan out the plot
     */
    maxPanOut?: number;
    /**
     * Specifies to which series cursor lines should be snapped.
     *
     * Can be a single series instance or an array of series.
     */
    snapToSeries?: XYSeries | XYSeries[];
    /**
     * If set to `true` this will hide series tooltips when selecting with cursor.
     *
     * @since 4.5.15
     */
    hideSeriesTooltipsOnSelection?: boolean;
    /**
     * If set to a numeric value, cursor will display closest series' tooltips
     * plus tooltips from series that are closer to than `maxTooltipDistance` to
     * it.
     *
     * Set it to `-1` to always force one tooltip, even if there are multiple
     * data items in exactly same place.
     *
     * @since 4.7.18
     */
    maxTooltipDistance?: number;
}
/**
 * Defines events for [[XYCursor]].
 */
export interface IXYCursorEvents extends ICursorEvents {
}
/**
 * Defines adapters for [[XYCursor]].
 *
 * @see {@link Adapter}
 */
export interface IXYCursorAdapters extends ICursorAdapters, IXYCursorProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A cursor used on [[XYChart]].
 *
 * @see {@link IXYCursorEvents} for a list of available events
 * @see {@link IXYCursorAdapters} for a list of available Adapters
 * @todo Add description, examples
 */
export declare class XYCursor extends Cursor {
    /**
     * Defines available properties.
     */
    _properties: IXYCursorProperties;
    /**
     * Defines available adapters
     */
    _adapter: IXYCursorAdapters;
    /**
     * Defines available events.
     */
    _events: IXYCursorEvents;
    /**
     * Vertical cursor line element.
     */
    protected _lineX: MutableValueDisposer<Sprite>;
    /**
     * Horizontal cursor line element.
     */
    protected _lineY: MutableValueDisposer<Sprite>;
    /**
     * Element which highlights selected area.
     */
    protected _selection: Sprite;
    /**
     * A range of current horizontal selection.
     */
    xRange: IRange;
    /**
     * A range of current vertical selection.
     */
    yRange: IRange;
    /**
     * Horizontal [[Axis]].
     */
    protected _xAxis: MutableValueDisposer<Axis<AxisRenderer>>;
    /**
     * Vertical [[Axis]].
     */
    protected _yAxis: MutableValueDisposer<Axis<AxisRenderer>>;
    /**
     * A reference to chart cursor belongs to.
     */
    _chart: XYChart;
    protected _snapToDisposers: IDisposer[];
    /**
     * Constructor
     */
    constructor();
    /**
     * Updates cursor element dimensions on size change.
     *
     * @ignore Exclude from docs
     */
    updateSize(): void;
    /**
     * Updates selection dimensions on size change.
     *
     * @ignore Exclude from docs
     */
    updateSelection(): void;
    /**
     *
     * @ignore Exclude from docs
     */
    protected fixPoint(point: IPoint): IPoint;
    /**
     * Places the cursor at specific point.
     *
     * @param point Point to place cursor at
     */
    protected triggerMoveReal(point: IPoint, force?: boolean): void;
    /**
     *
     * @ignore Exclude from docs
     */
    protected updateLinePositions(point: IPoint): void;
    protected triggerDownReal(point: IPoint): void;
    /**
     * Updates the coordinates of where pointer down event occurred
     * (was pressed).
     */
    protected updatePoint(point: IPoint): void;
    /**
     * Handle action when cursor is released, which should perform an operation
     * based on its `behavior`, like zoom.
     *
     * @param  point  Release point
     */
    protected triggerUpReal(point: IPoint): void;
    /**
     * Calculates if the cursor has moved enough based on its `behavior`.
     *
     * @return Moved?
     */
    private hasMoved;
    /**
     * [getRanges description]
     *
     * @todo Description
     */
    protected getPanningRanges(): void;
    /**
     * [getRanges description]
     *
     * @todo Description
     */
    protected getRanges(): void;
    /**
     * Cursor's behavior when it's moved with pointer down:
     *
     * * `"zoomX"` - zooms horizontally.
     * * `"zoomY"` - zooms vertically.
     * * `"zoomXY"` - zooms both horizontally and vertically.
     * * `"selectX"` - selects a range horizontally.
     * * `"selectY"` - selects a range vertically.
     * * `"selectXY"` - selects a range both horizontally and vertically.
     * * `"panX"` - moves (pans) current selection horizontally.
     * * `"panY"` - moves (pans) current selection vertically.
     * * `"panXY"` - moves (pans) current selection both horizontally and vertically.
     * * `"none"` - does nothing with pointer down.
     *
     * E.g. "zoomXY" will mean that pressing a mouse (or touching) over plot area
     * and dragging it will start zooming the chart.
     *
     * NOTE: `"zoomXY"` acts differently when used on a `DateAxis`.
     * See [this note](https://www.amcharts.com/docs/v4/concepts/chart-cursor/#zoomXY_behavior_and_DateAxis).
     *
     * @param value Bheavior
     */
    /**
    * Behavior
    */
    behavior: "zoomX" | "zoomY" | "zoomXY" | "selectX" | "selectY" | "selectXY" | "panX" | "panY" | "panXY" | "none";
    /**
     * Determines whether Cursor should prevent default action on move.
     *
     * If cursor's behavior is "none", it should not obstruct the page scrolling.
     *
     * @return Prevent default?
     */
    protected shouldPreventGestures(touch: boolean): boolean;
    /**
     * Cursor's horizontal line is expanded to take full width of the related
     * Axis' cell/category.
     *
     * NOTE: this setting will work properly if `xAxis` is set and only in case
     * `xAxis` is [[CategoryAxis]] or [[DateAxis]].
     *
     * @param value Full width?
     */
    /**
    * @return Full width?
    */
    fullWidthLineX: boolean;
    /**
     * Cursor's vertical line is expanded to take full width of the related
     * Axis' cell/category.
     *
     * NOTE: this setting will work properly if `yAxis` is set and only in case
     * `yAxis` is [[CategoryAxis]] or [[DateAxis]].
     *
     * @param value Full width?
     */
    /**
    * @return Full width?
    */
    fullWidthLineY: boolean;
    /**
     * If set to `true` this will hide series tooltips when selecting with cursor.
     *
     * @since 4.5.15
     * @param  value  hide tooltips?
     */
    /**
    * @return hide tooltip?
    */
    hideSeriesTooltipsOnSelection: boolean;
    /**
     * If set to a numeric value, cursor will display closest series' tooltips
     * plus tooltips from series that are closer to than `maxTooltipDistance` to
     * it.
     *
     * Set it to `-1` to always force one tooltip, even if there are multiple
     * data items in exactly same place.
     *
     * @since 4.7.18
     * @param  value  Distance
     */
    /**
    * @return Distance
    */
    maxTooltipDistance: number;
    /**
     * If cursor behavior is panX or panY, we allow to pan plot out of it's max bounds for a better user experience.
     * This setting specifies relative value by how much we can pan out the plot
     *
     * @param value
     */
    /**
    * @return Full width?
    */
    maxPanOut: number;
    /**
     * A reference to X [[Axis]].
     *
     * An XY cursor can live without `xAxis` set. You set xAxis for cursor when
     * you have axis tooltip enabled and you want cursor line to be at the same
     * position as tooltip.
     *
     * This works with [[CategoryAxis]] and [[DateAxis]] but not with
     * [[ValueAxis]].
     *
     * @todo Description (review)
     * @param axis X axis
     */
    /**
    * @return X axis
    */
    xAxis: Axis;
    /**
     * A reference to Y [[Axis]].
     *
     * An XY cursor can live without `yAxis` set. You set xAxis for cursor when
     * you have axis tooltip enabled and you want cursor line to be at the same
     * position as tooltip.
     *
     * This works with [[CategoryAxis]] and [[DateAxis]] but not with
     * [[ValueAxis]].
     *
     * @todo Description (review)
     * @param axis Y axis
     */
    /**
    * @return Y Axis
    */
    yAxis: Axis;
    /**
     * Updates Cursor's position when axis tooltip changes position.
     *
     * @ignore Exclude from docs
     * @param event Original Axis event
     */
    protected handleXTooltipPosition(event: ISpriteEvents["positionchanged"]): void;
    /**
     * Updates Cursor's position when Y axis changes position or scale.
     *
     * @ignore Exclude from docs
     * @param event Original Axis event
     */
    protected handleYTooltipPosition(event: ISpriteEvents["positionchanged"]): void;
    /**
     * A Line element to use for X axis.
     *
     * @param lineX Line
     */
    /**
    * @return Line element
    */
    lineX: Sprite;
    /**
     * A Line element to use Y axis.
     *
     * @param lineY Line
     */
    /**
    * @return Line element
    */
    lineY: Sprite;
    /**
     * A selection element ([[Sprite]]).
     *
     * @param selection Selection rectangle
     */
    /**
    * @return Selection rectangle
    */
    selection: Sprite;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * Looks if `xAxis` and `yAxis` is set via ID in JSON config, and replaces
     * with real references.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
    /**
     * Specifies to which series cursor lines should be snapped.
     *
     * Can be a single series instance or an array of series.
     *
     * @param {XYSeries | XYSeries[]}
     */
    /**
    * @return {XYSeries | XYSeries[]}
    */
    snapToSeries: XYSeries | XYSeries[];
    /**
     * [handleSnap description]
     *
     * @ignore
     * @todo Description
     */
    handleSnap(series: XYSeries): void;
    /**
     * Destroys this object and all related data.
     */
    dispose(): void;
}
