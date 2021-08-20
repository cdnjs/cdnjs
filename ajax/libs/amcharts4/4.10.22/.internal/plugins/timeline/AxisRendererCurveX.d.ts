/**
 * Module, defining Axis Renderer for curved axes.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRendererX, IAxisRendererXAdapters, IAxisRendererXEvents, IAxisRendererXProperties } from "../../charts/axes/AxisRendererX";
import { AxisRendererCurveY } from "./AxisRendererCurveY";
import { Axis } from "../../charts/axes/Axis";
import { IPoint, IOrientationPoint } from "../../core/defs/IPoint";
import { Sprite } from "../../core/Sprite";
import { GridCircular } from "../../charts/axes/GridCircular";
import { AxisLabelCircular } from "../../charts/axes/AxisLabelCircular";
import { AxisFillCircular } from "../../charts/axes/AxisFillCircular";
import { Polyspline } from "../../core/elements/Polyspline";
import { AxisTick } from "../../charts/axes/AxisTick";
import { AxisBreak } from "../../charts/axes/AxisBreak";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisRendererCurveX]].
 */
export interface IAxisRendererCurveXProperties extends IAxisRendererXProperties {
    /**
     * A line object representing curve of the axis.
     */
    polyspline?: Polyspline;
    /**
     * Precision setting to use when drawing chart objects. Basically, it's
     * number of pixels that a control point should be added at.
     *
     * The smaller the number, the finer line. However, small number will impact
     * the performace.
     *
     * Depending on actual chart configuration, you might need to find the best
     * possible value to balance between detail and good performance.
     *
     * @default 10
     */
    precisionStep?: number;
    /**
     * Should the chart be scaled automatically, to fit into container?
     *
     * @default true
     */
    autoScale?: boolean;
    /**
     * Should chart be centered within chart area?
     *
     * @default true
     */
    autoCenter?: boolean;
    /**
     * Array of control points to draw axis curve along.
     */
    points?: IPoint[];
}
/**
 * Defines events for [[AxisRendererCurveX]].
 */
export interface IAxisRendererCurveXEvents extends IAxisRendererXEvents {
}
/**
 * Defines adapters for [[AxisRenderer]].
 *
 * @see {@link Adapter}
 */
export interface IAxisRendererCurveXAdapters extends IAxisRendererXAdapters, IAxisRendererCurveXProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for "horizontal" curve axis.
 */
export declare class AxisRendererCurveX extends AxisRendererX {
    /**
     * Defines available properties.
     */
    _properties: IAxisRendererCurveXProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisRendererCurveXAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisRendererCurveXEvents;
    /**
     * Defines type of the grid elements.
     */
    _gridType: GridCircular;
    /**
     * Defines type for the fill elements.
     */
    _fillType: AxisFillCircular;
    /**
     * Defines type for the label elements.
     */
    _labelType: AxisLabelCircular;
    /**
     * @ignore
     */
    pixelRadiusReal: number;
    /**
     * @ignore
     */
    axisRendererY: AxisRendererCurveY;
    /**
     * @readonly
     * @ignore
     */
    autoScaleScale: number;
    /**
     * @ignore
     */
    protected _tempSprite: Sprite;
    /**
     * @ignore
     */
    protected _pointsChanged: boolean;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Returns actual length of the Axis, in pixels.
     *
     * @return Length (px)
     */
    readonly axisLength: number;
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    updateAxisLine(): void;
    /**
     * A [[Polyspline]] elment that represents axis shape / curve.
     *
     * @param  value  Polyspline
     */
    /**
    * @return Polyspline
    */
    polyspline: Polyspline;
    /**
     * Should the chart be scaled automatically, to fit into container?
     *
     * @default true
     * @param  value  Auto-scale?
     */
    /**
    * @return Auto-scale?
    */
    autoScale: boolean;
    /**
     * Should chart be centered within chart area?
     *
     * @default true
     * @param  value  Auto-center?
     */
    /**
    * @return {boolean} Auto-center?
    */
    autoCenter: boolean;
    /**
     * Precision setting to use when drawing chart objects. Basically, it's
     * number of pixels that a control point should be added at.
     *
     * The smaller the number, the finer line. However, small number will impact
     * the performace.
     *
     * Depending on actual chart configuration, you might need to find the best
     * possible value to balance between detail and good performance.
     *
     * @default 10
     * @param  value  Precision step
     */
    /**
    * @return Precision step
    */
    precisionStep: number;
    /**
     * An array of control points that define axis curve.
     *
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/timeline/#Control_points} for more info
     * @param  value  Control points
     */
    /**
    * @return Control points
    */
    points: IPoint[];
    /**
    * @ignore
    */
    setAxis(axis: Axis): void;
    /**
     * A handler for when axis size changes.
     */
    protected handleSizeChange(): void;
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @param position2  Position (0-1) Position on the second axis
     * @return Point
     */
    positionToPoint(position: number, position2?: number): IOrientationPoint;
    /**
     * Converts relative position (0-1) on axis to angle in degrees (0-360).
     *
     * @param position  Position (0-1)
     * @return Angle (0-360)
     */
    positionToAngle(position: number): number;
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    updateGridElement(grid: GridCircular, position: number, endPosition: number): void;
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
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick      Tick element
     * @param position  Position
     */
    updateTickElement(tick: AxisTick, position: number): void;
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
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    updateBaseGridElement(): void;
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
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param axisBreak Break element
     */
    updateBreakElement(axisBreak: AxisBreak): void;
    /**
     * @ignore
     */
    toAxisPosition(value: number): number;
    /**
     * Converts a coordinate in pixels to a relative position. (0-1)
     *
     * @param coordinate  Coordinate (px)
     * @param coordinate2  Coordinate (px) Some more complicated axes need two coordinates
     * @return Position (0-1)
     */
    coordinateToPosition(coordinate: number, coordinate2?: number): number;
    /**
     * Updates some of the Axis tooltip's visual properties, related to
     * rendering of the Axis.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    updateTooltip(): void;
    /**
     * [[CurveChart]] does not support inversed X axes. This setting will be
     * ignored.
     * @param  value  Flip axis?
     */
    /**
    * @return Flip axis?
    */
    inversed: boolean;
}
