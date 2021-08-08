/**
 * Module, defining Axis Renderer for curved axes.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRendererY, IAxisRendererYProperties, IAxisRendererYAdapters, IAxisRendererYEvents } from "../../charts/axes/AxisRendererY";
import { AxisRendererCurveX } from "./AxisRendererCurveX";
import { AxisTick } from "../../charts/axes/AxisTick";
import { IPoint } from "../../core/defs/IPoint";
import { Grid } from "../../charts/axes/Grid";
import { AxisBreak } from "../../charts/axes/AxisBreak";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { CurveChart } from "./CurveChart";
import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisRendererCurveY]].
 */
export interface IAxisRendererCurveYProperties extends IAxisRendererYProperties {
    /**
     * Outer radius of the vertical (Y) axis in pixels.
     *
     * Indicate distance from the charts X axis control curve.
     */
    radius?: number;
    /**
     * Inner radius of the vertical (Y) axis in pixels.
     *
     * Indicate distance from the charts X axis control curve.
     */
    innerRadius?: number;
    /**
     * Relative location of the Y axis along the length of the X axis.
     *
     * Values range from 0 (default) which means start of the X axis, to 1 meaning
     * end of the X axis.
     */
    axisLocation?: number;
}
/**
 * Defines events for [[AxisRendererCurveY]].
 */
export interface IAxisRendererCurveYEvents extends IAxisRendererYEvents {
}
/**
 * Defines adapters for [[AxisRenderer]].
 *
 * @see {@link Adapter}
 */
export interface IAxisRendererCurveYAdapters extends IAxisRendererYAdapters, IAxisRendererCurveYProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for radial axis.
 */
export declare class AxisRendererCurveY extends AxisRendererY {
    /**
     * Defines available properties.
     */
    _properties: IAxisRendererCurveYProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisRendererCurveYAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisRendererCurveYEvents;
    /**
     * A related chart.
     */
    protected _chart: MutableValueDisposer<CurveChart>;
    /**
     * @ignore
     */
    axisRendererX: AxisRendererCurveX;
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    constructor();
    /**
     * Validates Axis renderer.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Actual length of the Axis, in pixels.
     *
     * @return Length (px)
     */
    readonly axisLength: number;
    /**
     * Outer radius of the vertical (Y) axis in pixels.
     *
     * Indicate distance from the charts X axis control curve.
     *
     * Negative number means inside/below the X axis.
     *
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Axis_radii} for more info
     * @param value  Outer radius
     */
    /**
    * @return Outer radius
    */
    radius: number;
    /**
     * Inner radius of the vertical (Y) axis in pixels.
     *
     * Indicate distance from the charts X axis control curve.
     *
     * Negative number means inside/below the X axis.
     *
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Axis_radii} for more info
     * @param value  Outer radius
     */
    /**
    * @return Inner radius
    */
    innerRadius: number;
    /**
     * Chart, associated with the Axis.
     *
     * @ignore Exclude from docs
     * @param value Chart
     */
    /**
    * @ignore Exclude from docs
    * @return Chart
    */
    chart: CurveChart;
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @return Point
     */
    positionToPoint(position: number): IPoint;
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    updateAxisLine(): void;
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    updateGridElement(grid: Grid, position: number, endPosition: number): void;
    /**
     * [getGridPath description]
     *
     * @ignore
     * @todo description
     * @param   position  Position
     * @return            SVG path
     */
    getGridPath(position: number): string;
    /**
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    updateLabelElement(label: this["_labelType"], position: number, endPosition: number, location?: number): void;
    /**
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick      Tick element
     * @param position  Position
     */
    updateTickElement(tick: AxisTick, position: number): void;
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
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    updateBaseGridElement(): void;
    /**
     * Checks if point is within bounds of a container.
     *
     * @ignore Exclude from docs
     * @param point Point coordinates
     * @return Fits?
     */
    fitsToBounds(point: IPoint): boolean;
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
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param axisBreak Break element
     */
    updateBreakElement(axisBreak: AxisBreak): void;
    /**
     * Creates visual elements for and axis break.
     *
     * @ignore Exclude from docs
     * @param axisBreak Axis break
     */
    createBreakSprites(axisBreak: AxisBreak): void;
    /**
     * Updates some of the Axis tooltip's visual properties, related to
     * rendering of the Axis.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    updateTooltip(): void;
    /**
     * Converts a position on the axis to a coordinate in pixels.
     *
     * @param  position  Position (0-1)
     * @return           Coordinate (px)
     */
    positionToCoordinate(position: number): number;
    /**
     * Relative location of the Y axis along the length of the X axis.
     *
     * Values range from 0 (default) which means start of the X axis, to 1 meaning
     * end of the X axis.
     *
     * @default 0
     * @param  value  Axis location
     */
    /**
    * @return Axis location
    */
    axisLocation: number;
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
     * Converts a coordinate in pixels to a relative position. (0-1)
     *
     * @param coordinate  Coordinate (px)
     * @param coordinate2  Coordinate (px) Some more complicated axes need two coordinates
     * @return Position (0-1)
     */
    coordinateToPosition(coordinate: number, coordinate2?: number): number;
    /**
     * @ignore
     */
    toAxisPosition(value: number): number;
}
