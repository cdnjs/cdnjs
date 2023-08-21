/**
 * Module, defining Axis Renderer for vertical axes.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRenderer, IAxisRendererProperties, IAxisRendererAdapters, IAxisRendererEvents } from "./AxisRenderer";
import { Sprite } from "../../core/Sprite";
import { IPoint } from "../../core/defs/IPoint";
import { Axis } from "./Axis";
import { Grid } from "./Grid";
import { AxisTick } from "./AxisTick";
import { AxisLabel } from "./AxisLabel";
import { AxisBreak } from "./AxisBreak";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[AxisRendererY]].
 */
export interface IAxisRendererYProperties extends IAxisRendererProperties {
}
/**
 * Defines events for [[AxisRendererY]].
 */
export interface IAxisRendererYEvents extends IAxisRendererEvents {
}
/**
 * Defines adapters for [[AxisRenderer]].
 *
 * @see {@link Adapter}
 */
export interface IAxisRendererYAdapters extends IAxisRendererAdapters, IAxisRendererYProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for vertical axis.
 *
 * @see {@link IAxisRendererYEvents} for a list of available events
 * @see {@link IAxisRendererYAdapters} for a list of available Adapters
 */
export declare class AxisRendererY extends AxisRenderer {
    /**
     * Defines available properties.
     */
    _properties: IAxisRendererYProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IAxisRendererYAdapters;
    /**
     * Defines available events.
     */
    _events: IAxisRendererYEvents;
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
     * @ignore
     */
    updateGridContainer(): void;
    /**
     * @ignore
     */
    toAxisPosition(value: number): number;
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
     * Updates some of the Axis tooltip's visual properties, related to
     * rendering of the Axis.
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
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @param position2  Position (0-1) Position on the second axis
     * @return Point
     */
    positionToPoint(position: number, position2?: number): IPoint;
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @param point  Point
     * @return Position (0-1)
     */
    pointToPosition(point: IPoint): number;
    /**
     * Converts a coordinate in pixels to a relative position. (0-1)
     *
     * @param coordinate  Coordinate (px)
     * @param coordinate2  Coordinate of a second axis, only needed for complex axes systems, like timeline (px)
     * @return Position (0-1)
     */
    coordinateToPosition(coordinate: number, coordinate2?: number): number;
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
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    updateGridElement(grid: Grid, position: number, endPosition: number): void;
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
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    updateLabelElement(label: AxisLabel, position: number, endPosition: number, location?: number): void;
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
     * Converts a position on the axis to a coordinate in pixels.
     *
     * @ignore Exclude from docs
     * @param position  Position (0-1)
     * @return Coordinate (px)
     */
    positionToCoordinate(position: number): number;
    /**
     * Updates and positions axis bullets.
     *
     * @ignore Exclude from docs
     * @param bullet       AxisBullet element
     * @param position     Starting position
     * @param endPosition  End position
     */
    updateBullet(bullet: Sprite, position: number, endPosition: number): void;
}
