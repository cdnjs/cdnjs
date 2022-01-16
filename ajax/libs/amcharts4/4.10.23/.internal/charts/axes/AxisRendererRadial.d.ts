/**
 * Module, defining Axis Renderer for radial axes.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRendererY, IAxisRendererYProperties, IAxisRendererYAdapters, IAxisRendererYEvents } from "./AxisRendererY";
import { AxisTick } from "./AxisTick";
import { RadarChart } from "../types/RadarChart";
import { IPoint } from "../../core/defs/IPoint";
import { Grid } from "./Grid";
import { AxisBreak } from "./AxisBreak";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { Percent } from "../../core/utils/Percent";
import { Sprite } from "../../core/Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisRendererRadial]].
 */
export interface IAxisRendererRadialProperties extends IAxisRendererYProperties {
    /**
     * Start angle of the radial axis in degrees. (0-360)
     */
    startAngle?: number;
    /**
     * End angle of the radial axis in degrees. (0-360)
     */
    endAngle?: number;
    /**
     * A grid type to display: "circles" or "polygons".
     *
     * @default "circles"
     */
    gridType?: "circles" | "polygons";
    /**
     * An angle of the axis in degrees. (0-360)
     */
    axisAngle?: number;
    /**
     * Outer radius of the radial axis.
     *
     * Can either be absolute (pixels) or relative ([[Percent]]).
     */
    radius?: number | Percent;
    /**
     * Inner radius of the radial axis.
     *
     * Can either be absolute (pixels) or relative ([[Percent]]).
     */
    innerRadius?: number | Percent;
}
/**
 * Defines events for [[AxisRendererRadial]].
 */
export interface IAxisRendererRadialEvents extends IAxisRendererYEvents {
}
/**
 * Defines adapters for [[AxisRenderer]].
 *
 * @see {@link Adapter}
 */
export interface IAxisRendererRadialAdapters extends IAxisRendererYAdapters, IAxisRendererRadialProperties {
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
export declare class AxisRendererRadial extends AxisRendererY {
    /**
     * Defines available properties.
     */
    _properties: IAxisRendererRadialProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisRendererRadialAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisRendererRadialEvents;
    /**
     * A related chart.
     */
    protected _chart: MutableValueDisposer<RadarChart>;
    /**
     * @ignore
     */
    pixelRadiusReal: number;
    /**
     * @ignore
     */
    _chartType: RadarChart;
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
     * @param value  Outer radius
     */
    /**
    * @return Inner radius
    */
    innerRadius: number | Percent;
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
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    updateLabelElement(label: this["_labelType"], position: number, endPosition: number, location?: number): void;
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
     * Start angle of the axis in degrees. (0-360)
     *
     * @param value  Start angle
     */
    /**
    * @return Start angle
    */
    startAngle: number;
    /**
     * End angle of the axis in degrees. (0-360)
     *
     * @param value  End angle
     */
    /**
    * @return End angle
    */
    endAngle: number;
    /**
     * Angle of the radial axis in degrees. (0-360)
     *
     * @param value  Axis angle
     */
    /**
    * @return Axis angle
    */
    axisAngle: number;
    /**
     * Grid type for radial axis.
     *
     * A grid on radia axis can either be perfect circles ("circles"), or
     * straight lines ("polygons").
     *
     * @default "circles"
     * @param value  Grid type
     */
    /**
    * Grid type
    */
    gridType: "circles" | "polygons";
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
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick      Tick element
     * @param position  Position
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
     * Converts a position on the axis to a coordinate in pixels.
     *
     * @ignore Exclude from docs
     * @param position  Position (0-1)
     * @return Coordinate (px)
     */
    positionToCoordinate(position: number): number;
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @param point  Point
     * @return Position (0-1)
     */
    pointToPosition(point: IPoint): number;
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
    chart: RadarChart;
}
