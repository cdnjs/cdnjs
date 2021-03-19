/**
 * Module, defining base Axis Renderer.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Sprite } from "../../core/Sprite";
import { IPoint } from "../../core/defs/IPoint";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { Axis } from "./Axis";
import { AxisLine } from "./AxisLine";
import { AxisFill } from "./AxisFill";
import { Grid } from "./Grid";
import { AxisLabel } from "./AxisLabel";
import { AxisTick } from "./AxisTick";
import { AxisBreak } from "./AxisBreak";
import { Chart } from "../Chart";
import { ListTemplate } from "../../core/utils/List";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisRenderer]].
 */
export interface IAxisRendererProperties extends IContainerProperties {
    /**
     * Minimum distance in pixels between grid elements.
     */
    minGridDistance?: number;
    /**
     * Draw axis labels inside axis.
     */
    inside?: boolean;
    /**
     * Draw axis on opposite side of the plot area?
     */
    opposite?: boolean;
    /**
     * Inverse the order of the scale for the Axis.
     */
    inversed?: boolean;
    /**
     * Location of the cell start. (0-1)
     */
    cellStartLocation?: number;
    /**
     * Location of the cell end. (0-1)
     */
    cellEndLocation?: number;
    /**
     * Location of the axis tooltip. (0-1)
     */
    tooltipLocation?: number;
    /**
     * Location of the tooltip relative secondary axis cell. (0-1)
     */
    tooltipLocation2?: number;
    /**
     * Resize axis tooltip to the full width of the cell.
     */
    fullWidthTooltip?: boolean;
    /**
     * Labels with position less than this will be hidden.
     */
    minLabelPosition?: number;
    /**
     * Labels with position bigger than this will be hidden.
     */
    maxLabelPosition?: number;
}
/**
 * Defines events for [[AxisRenderer]].
 */
export interface IAxisRendererEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[AxisRenderer]].
 *
 * @see {@link Adapter}
 */
export interface IAxisRendererAdapters extends IContainerAdapters, IAxisRendererProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all axis renderers.
 *
 * @see {@link IAxisRendererEvents} for a list of available events
 * @see {@link IAxisRendererAdapters} for a list of available Adapters
 */
export declare class AxisRenderer extends Container {
    /**
     * Defines available properties.
     */
    _properties: IAxisRendererProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisRendererAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisRendererEvents;
    /**
     * A related Axis.
     */
    protected _axis: Axis;
    /**
     * A line object of the related axis.
     */
    line: AxisLine;
    /**
     * Base grid element. ([[Sprite]])
     *
     * For value axes base grid is at value 0.
     *
     * For category/date axis it is added at the end of the last item/date.
     *
     */
    baseGrid: Sprite;
    /**
     * A [[Container]] holding all of the [[Grid]] elements.
     */
    gridContainer: Container;
    /**
     * A [[Container]] holding all of the axis bullets.
     */
    bulletsContainer: Container;
    /**
     * A [[Container]] holding all of the [[AxisBreak]] elements.
     */
    breakContainer: Container;
    /**
     * A related chart.
     */
    protected _chart: MutableValueDisposer<Chart>;
    /**
     * Defines type of the grid elements.
     */
    _gridType: Grid;
    /**
     * Defines type for the fill elements.
     */
    _fillType: AxisFill;
    /**
     * Defines type for tick elements.
     */
    _tickType: AxisTick;
    /**
     * Defines type for the label elements.
     */
    _labelType: AxisLabel;
    /**
     * A list of grid elements.
     */
    protected _grid: ListTemplate<this["_gridType"]>;
    /**
     * A list of tick elements.
     */
    protected _ticks: ListTemplate<this["_tickType"]>;
    /**
     * A list of label elements.
     */
    protected _labels: ListTemplate<this["_labelType"]>;
    /**
     * A list of fill elements.
     */
    protected _axisFills: ListTemplate<this["_fillType"]>;
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    constructor();
    /**
     * Axis of a renderer
     * @param axis Axis
     */
    /**
    * Axis of a renderer
    * @return axis Axis
    */
    axis: Axis;
    /**
    * @ignore
    */
    setAxis(axis: Axis): void;
    /**
     * Called when rendered is attached to an Axis, as well as a property of
     * Axis that might affect the appearance is updated.
     *
     * E.g. `axis.opposite`, `axis.inside`, etc.
     *
     * This method is called **before** draw, so that any related setting
     * changed in this method can be changed.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    processRenderer(): void;
    /**
     * Updates Axis' tooltip.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    updateTooltip(): void;
    /**
     * Returns actual length of the Axis, in pixels.
     *
     * @return Length (px)
     */
    readonly axisLength: number;
    /**
     * Re-positions an element to new coordinates.
     *
     * @ignore Exclude from docs
     * @param item   A target element
     * @param point  New coordinates
     */
    positionItem(item: Sprite, point: IPoint): void;
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @return Point
     */
    positionToPoint(position: number, position2?: number): IPoint;
    /**
     * Converts relative position on axis to angle.
     *
     * @ignore Exclude from docs
     * @todo Description (review / units)
     * @param position  Position (0-1)
     * @return Angle
     */
    positionToAngle(position: number): number;
    /**
     * Converts relative position (0-1) on axis to a pixel coordinate.
     *
     * @param position  Position (0-1)
     * @return Coordinate (px)
     */
    positionToCoordinate(position: number): number;
    updateGridContainer(): void;
    protected getHeight(): number;
    protected getWidth(): number;
    /**
     * Converts a coordinate in pixels to a relative position. (0-1)
     *
     * @param coordinate  Coordinate (px)
     * @param coordinate2  Coordinate of a second axis, only needed for complex axes systems, like timeline (px)
     * @return Position (0-1)
     */
    coordinateToPosition(coordinate: number, coordinate2?: number): number;
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @ignore Exclude from docs
     * @param point  Point
     * @return Position (0-1)
     */
    pointToPosition(point: IPoint): number;
    /**
     * [getPositionRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param startPosition  Starting position
     * @param endPosition    End position
     * @return SVG path
     */
    getPositionRangePath(startPosition: number, endPosition: number): string;
    /**
     * Invalidates all axis data items, effectively causing them re-evaluated.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    invalidateAxisItems(): void;
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    updateGridElement(grid: Sprite, position: number, endPosition: number): void;
    /**
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick         Tick element
     * @param position     Starting position
     * @param endPosition  End position
     */
    updateTickElement(tick: AxisTick, position: number, endPosition: number): void;
    /**
     * Updates and positions axis bullet.
     *
     * @ignore Exclude from docs
     * @param bullet       AxisBullet element
     * @param position     Starting position
     * @param endPosition  End position
     */
    updateBullet(bullet: Sprite, position: number, endPosition: number): void;
    /**
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    updateLabelElement(label: AxisLabel, position: number, endPosition: number, location?: number): void;
    /**
     * Updates and positions the axis fill element.
     *
     * @ignore Exclude from docs
     * @param fill         Fill element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    updateFillElement(fill: AxisFill, position: number, endPosition: number): void;
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    updateAxisLine(): void;
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    updateBaseGridElement(): void;
    /**
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param axisBreak Break element
     */
    updateBreakElement(axisBreak: AxisBreak): void;
    /**
     * Minimum distance in pixels between grid elements.
     *
     * Use it to control density of the grid/labels on the axis.element.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/#Setting_the_density_of_the_the_grid_labels} for more info
     * @param value  Min distance (px)
     */
    /**
    * @return Min distance (px)
    */
    minGridDistance: number;
    /**
     * A chart, associated with the Axis.
     *
     * @ignore Exclude from docs
     * @param value  Chart
     */
    /**
    * @ignore Exclude from docs
    * @return Chart
    */
    chart: Chart;
    /**
     * Toggles visibility of an element, based on its current position and
     * min/max position settings.
     *
     * E.g. labels based on `minLabelPosition` and `maxLabelPosition`.
     *
     * @ignore Exclude from docs
     * @param sprite       An element to toggle
     * @param position     Elements current position
     * @param minPosition  Min position setting
     * @param maxPosition  Max position setting
     */
    protected toggleVisibility(sprite: Sprite, position: number, minPosition: number, maxPosition: number): void;
    /**
     * Creates visual elements for and axis break.
     *
     * @ignore Exclude from docs
     * @param axisBreak Axis break
     */
    createBreakSprites(axisBreak: AxisBreak): void;
    /**
     * A list of Axis' Fill elements.
     *
     * Those are fill elements that cover the space between every second set
     * of grid lines, and can be configured to create striped charts.
     *
     * Please note that these are disabled by default. To enable them, set
     * template to true.
     *
     * ```TypeScript
     * categoryAxis.renderer.axisFills.template.disabled = false;
     * ```
     * ```JavaScript
     * categoryAxis.renderer.axisFills.template.disabled = false;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "xAxes": [{
     *     // ...
     *     "renderer": {
     *       "axisFills": {
     *         "disabled": false
     *       }
     *     }
     *   }]
     * }
     * ```
     *
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/alternated-axis-fills/} this tutorial for more info.
     * @return Fill elements
     */
    readonly axisFills: ListTemplate<this["_fillType"]>;
    /**
     * Returns a new fill element, suitable for this Axis Renderer type.
     *
     * @return Fill element
     */
    createFill(axis: Axis): this["_fillType"];
    /**
     * A list of Axis' Grid elements.
     *
     * @return Grid elements
     */
    readonly grid: ListTemplate<this["_gridType"]>;
    /**
     * Returns a new grid element, suitable for this Axis Renderer type.
     *
     * @return Grid element
     */
    createGrid(): this["_gridType"];
    /**
     * A list of Axis' Tick elements.
     *
     * Please note that these are disabled by default. To enable ticks, you'll
     * need to set `disabled` and `strokeOpacity` properties of the tick template.
     *
     * ```TypeScript
     * categoryAxis.renderer.ticks.template.disabled = false;
     * categoryAxis.renderer.ticks.template.strokeOpacty = 0.5;
     * ```
     * ```JavaScript
     * categoryAxis.renderer.ticks.template.disabled = false;
     * categoryAxis.renderer.ticks.template.strokeOpacty = 0.5;
     * ```
     * ```JSON
     * {
     *   // ...
     *   "xAxes": [{
     *     // ...
     *     "renderer": {
     *       "ticks": {
     *         "disabled": false,
     *         "strokeOpacty": 0.5
     *       }
     *     }
     *   }]
     * }
     * ```
     *
     * @return Tick elements
     */
    readonly ticks: ListTemplate<this["_tickType"]>;
    /**
     * Returns a new tick element, suitable for this Axis Renderer type.
     *
     * @return Tick element
     */
    createTick(): this["_tickType"];
    /**
     * A list of Axis' Label elements.
     *
     * @return Label elements
     */
    readonly labels: ListTemplate<this["_labelType"]>;
    /**
     * Returns a new label element, suitable for this Axis Renderer type.
     *
     * @return Label element
     */
    createLabel(): this["_labelType"];
    /**
     * Indicates whether Axis' labels and ticks should be drawn inside Plot area.
     *
     * Does not work with all renderers, like AxisRendererRadial.
     *
     * @param value  Labels inside?
     */
    /**
    * @return Labels inside?
    */
    inside: boolean;
    /**
     * Indicates whether Axis should be drawn on the opposite side of the plot
     * area than it would normally be drawn based on chart's settings.
     *
     * Does not work with all renderers, like [[AxisRendererRadial]] and
     * [[AxisRenderer Circular].
     *
     * @param value  Draw axis on opposite side?
     */
    /**
    * @return Draw axis on opposite side?
    */
    opposite: boolean;
    /**
     * Indicates if Axis tooltip should take the whole width of the axis cell.
     * (between two grid lines)
     *
     * NOTE: this setting is ignored on circular axis types.
     *
     * @param value Full width tooltip?
     */
    /**
    * @return Full width tooltip?
    */
    fullWidthTooltip: boolean;
    /**
     * Location within axis cell to show tooltip on. (0-1)
     *
     * 0 - show at the start
     * 0.5 - show right in the middle
     * 1 - show at the end
     *
     * @param value Tooltip location
     */
    /**
    * @return Tooltip location
    */
    tooltipLocation: number;
    /**
     * Location within secondary axis cell to show tooltip on. (0-1)
     *
     * 0 - show at the start
     * 0.5 - show right in the middle
     * 1 - show at the end
     *
     * @param value Tooltip location
     */
    /**
    * @return Tooltip location
    */
    tooltipLocation2: number;
    /**
     * Location for the cell start.
     *
     * Normally a "cell" is the whole available width in a category.
     *
     * If there are several clustered column-like series available, the whole
     * space is divided between each clustered column, or column stacks.
     *
     * `cellStartLocation` identifies where, within available space, the actual
     * cell starts.
     *
     * This, together with column series' `width` will affect actual width of
     * columns, and thus gaps between them.
     *
     * This will affect category-like axes only, like [[DateAxis]], or
     * [[CategoryAxis]].
     *
     * This is used to limit a space occupied by series like column.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/} for more info.
     * @param value Cell start (0-1)
     */
    /**
    * @return Cell start (0-1)
    */
    cellStartLocation: number;
    /**
     * Location for the cell end.
     *
     * Normally a "cell" is the whole available width in a category.
     *
     * If there are several clustered column-like series available, the whole
     * space is divided between each clustered column, or column stacks.
     *
     * `cellEndLocation` identifies where, within available space, the actual
     * cell ends.
     *
     * This, together with column series' `width` will affect actual width of
     * columns, and thus gaps between them.
     *
     * This will affect category-like axes only, like [[DateAxis]], or
     * [[CategoryAxis]].
     *
     * This is used to limit a space occupied by series like column.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/} for more info.
     * @param value Cell end (0-1)
     */
    /**
    * @return Cell end (0-1)
    */
    cellEndLocation: number;
    /**
     * Indicates if the scale of the axis should be flipped.
     *
     * @param value Flip axis?
     */
    /**
    * @return Flip axis?
    */
    inversed: boolean;
    /**
     * Minimum position along the Axis, for labels.
     *
     * Labels, which have their position closer to the start of the Axis, will be
     * automatically hidden.
     *
     * E.g., setting this to 0.05 (5% of total axis length) would hide labels,
     * that would otherwise be drawn very near start of the Axis.
     *
     * This is especially usefull with `inside = true`, or if the chart hasn't
     * got any extra margins.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/} for more info.
     * @param value  Min label position (0-1)
     */
    /**
    * @return Min label position (0-1)
    */
    minLabelPosition: number;
    /**
     * Maximum position along the Axis, for labels.
     *
     * Labels, which have their position closer to the and of the Axis, will be
     * automatically hidden.
     *
     * E.g., setting this to 0.95 (95% of total axis length) would hide labels,
     * that would otherwise be drawn very near end of the Axis.
     *
     * This is especially usefull with `inside = true`, or if the chart hasn't
     * got any extra margins.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/} for more info.
     * @param value  Max label position (0-1)
     */
    /**
    * @return Max label position (0-1)
    */
    maxLabelPosition: number;
    /**
     * Copies all settings and related items from another object of the same
     * type.
     *
     * @param source  Source object
     */
    copyFrom(source: this): void;
    /**
     * @ignore
     */
    toAxisPosition(value: number): number;
    /**
     * Sets `visibility` property:
     *
     * * `true` - visible
     * * `false` - hidden
     *
     * @param value  true - visible, false - hidden
     * @return Current visibility
     */
    setVisibility(value: boolean): void;
}
