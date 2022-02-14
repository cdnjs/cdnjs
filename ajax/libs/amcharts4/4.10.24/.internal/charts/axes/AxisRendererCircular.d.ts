/**
 * Module, defining Axis Renderer for circular axes.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRenderer, IAxisRendererProperties, IAxisRendererAdapters, IAxisRendererEvents } from "./AxisRenderer";
import { Axis } from "./Axis";
import { AxisFillCircular } from "./AxisFillCircular";
import { AxisRendererRadial } from "./AxisRendererRadial";
import { IPoint } from "../../core/defs/IPoint";
import { AxisTick } from "./AxisTick";
import { GridCircular } from "./GridCircular";
import { AxisLabelCircular } from "./AxisLabelCircular";
import { Percent } from "../../core/utils/Percent";
import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisRendererCircular]].
 */
export interface IAxisRendererCircularProperties extends IAxisRendererProperties {
    /**
     * Start angle of the circular axis in degrees (0-360).
     */
    startAngle?: number;
    /**
     * End angle of the circular axis in degrees (0-360).
     */
    endAngle?: number;
    /**
     * Outer radius of the circular axis.
     *
     * Can either be absolute (pixels) or relative ([[Percent]]).
     */
    radius?: number | Percent;
    /**
     * Inner radius of the circular axis.
     *
     * Can either be absolute (pixels) or relative ([[Percent]]).
     */
    innerRadius?: number | Percent;
    /**
     * Specifies if axis should use it's own start/end angles or the ones set on chart.
     */
    useChartAngles?: boolean;
}
/**
 * Defines events for [[AxisRendererCircular]].
 */
export interface IAxisRendererCircularEvents extends IAxisRendererEvents {
}
/**
 * Defines adapters for [[AxisRenderer]].
 *
 * @see {@link Adapter}
 */
export interface IAxisRendererCircularAdapters extends IAxisRendererAdapters, IAxisRendererCircularProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for circular axis.
 */
export declare class AxisRendererCircular extends AxisRenderer {
    /**
     * Defines available properties.
     */
    _properties: IAxisRendererCircularProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisRendererCircularAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisRendererCircularEvents;
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
     * Y axis renderer
     */
    axisRendererY: AxisRendererRadial;
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    constructor();
    /**
    * @ignore
    */
    setAxis(axis: Axis): void;
    /**
     * Validates Axis renderer.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Returns actual length of the Axis, in pixels.
     *
     * @return Length (px)
     */
    readonly axisLength: number;
    /**
     * Outer radius of the axis.
     *
     * Can be absolute (px) or relative ([[Percent]]).
     *
     * @param value  Outer radius
     */
    /**
    * @return Outer radius
    */
    radius: number | Percent;
    /**
     * Outer radius in pixels.
     *
     * @return Outer radius (px)
     */
    readonly pixelRadius: number;
    /**
     * Inner radius of the axis.
     *
     * Can be absolute (px) or relative ([[Percent]]).
     *
     * @param value  Inner radius
     */
    /**
    * @return Inner radius
    */
    innerRadius: number | Percent;
    /**
     * Specifies if axis should use its own `startAngle` and `endAngle` or
     * inherit them from relative properties from chart.
     *
     * @default false
     * @param value  Use chart's angles
     */
    /**
    * @return Use chart angles
    */
    useChartAngles: boolean;
    /**
     * Inner radius in pixels.
     *
     * @return Inner radius (px)
     */
    readonly pixelInnerRadius: number;
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @param position2  Position (0-1) Position on the second axis
     * @return Point
     */
    positionToPoint(position: number, position2?: number): IPoint;
    /**
     * Converts relative position (0-1) on axis to angle in degrees (0-360).
     *
     * @param position  Position (0-1)
     * @return Angle (0-360)
     */
    positionToAngle(position: number): number;
    /**
     * Converts angle on axis to relative position(0-1).
     *
     * @param angle Angle in degrees
     * @return Position (0-1)
     */
    angleToPosition(angle: number): number;
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
    updateGridElement(grid: GridCircular, position: number, endPosition: number): void;
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
    updateLabelElement(label: this["_labelType"], position: number, endPosition: number, location?: number): void;
    /**
     * Checks if point is within bounds of a container.
     *
     * @ignore Exclude from docs
     * @param point Point coordinates
     * @return Fits?
     */
    fitsToBounds(point: IPoint): boolean;
    /**
     * Start angle of the axis in degrees (0-360).
     *
     * @param value  Start angle
     */
    /**
    * @return Start angle
    */
    startAngle: number;
    /**
     * End angle of the axis in degrees (0-360).
     *
     * @param value  End angle
     */
    /**
    * @return End angle
    */
    endAngle: number;
    /**
     * [getPositionRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param startPosition  Starting position
     * @param endPosition    End position
     * @return SVG path
     */
    getPositionRangePath(startPosition: number, endPosition: number, radius?: number | Percent, innerRadius?: number | Percent, cornerRadius?: number): string;
    /**
     * Returns a new grid element, suitable for this Axis Renderer type.
     *
     * @return Grid element
     */
    createGrid(): this["_gridType"];
    /**
     * Returns a new fill element, suitable for this Axis Renderer type.
     *
     * @return Fill element
     */
    createFill(axis: Axis): this["_fillType"];
    /**
     * Returns a new label element, suitable for this Axis Renderer type.
     *
     * @return Label element
     */
    createLabel(): this["_labelType"];
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @param point  Point
     * @return Position (0-1)
     */
    pointToPosition(point: IPoint): number;
}
