/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { RadarChart } from "../types/RadarChart";
import { XYCursor, IXYCursorAdapters, IXYCursorEvents, IXYCursorProperties } from "./XYCursor";
import { IPoint } from "../../core/defs/IPoint";
import { ISpriteEvents } from "../../core/Sprite";
import { Percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[RadarCursor]].
 */
export interface IRadarCursorProperties extends IXYCursorProperties {
    /**
     * Inner radius of the cursor's circular line.
     * Absolute (px) or relative ([[Percent]]).
     */
    innerRadius: number | Percent;
    /**
     * Outer radius of the cursor's circular line.
     * Absolute (px) or relative ([[Percent]]).
     */
    radius: number | Percent;
    /**
     * Starting angle of the cursor's radial line.
     */
    startAngle: number;
    /**
     * Ending angle of the cursor's radial line.
     */
    endAngle: number;
}
/**
 * Defines events for [[RadarCursor]].
 */
export interface IRadarCursorEvents extends IXYCursorEvents {
}
/**
 * Defines adapters for [[RadarCursor]].
 *
 * @see {@link Adapter}
 */
export interface IRadarCursorAdapters extends IXYCursorAdapters, IRadarCursorProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Cursor for [[RadarChart]].
 *
 * @see {@link IRadarCursorEvents} for a list of available events
 * @see {@link IRadarCursorAdapters} for a list of available Adapters
 */
export declare class RadarCursor extends XYCursor {
    /**
     * Defines available properties
     */
    _properties: IRadarCursorProperties;
    /**
     * Defines available adapters
     */
    _adapter: IRadarCursorAdapters;
    /**
     * Defines available events.
     */
    _events: IRadarCursorEvents;
    /**
     * A reference to chart cursor belongs to.
     */
    _chart: RadarChart;
    protected _prevAngle: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * Checks if point is within bounds of a container.
     *
     * @ignore Exclude from docs
     * @param point  Point to check
     * @return Fits within container?
     */
    fitsToBounds(point: IPoint): boolean;
    /**
     * Starting angle of the cursor's radial line.
     *
     * @param value Start angle
     */
    /**
    * @return Start angle
    */
    startAngle: number;
    /**
     * End angle of the cursor's radial line.
     *
     * @param value End angle
     */
    /**
    * @return End angle
    */
    endAngle: number;
    protected triggerMoveReal(point: IPoint, force?: boolean): void;
    /**
     * (Re)draws the horizontal (circular) cursor's line.
     *
     * @param point New target point
     */
    protected updateLineX(point: IPoint): void;
    /**
     * (Re)draws the vertical (radial) cursor's line.
     *
     * @param point New target point
     */
    protected updateLineY(point: IPoint): void;
    /**
     * Updates selection dimensions on size change.
     *
     * @ignore Exclude from docs
     */
    updateSelection(): void;
    /**
     * Updates cursors current positions.
     */
    protected getPositions(): void;
    /**
     * Overriding inherited method, so that nothing happens when it's triggered.
     *
     * @ignore Exclude from docs
     */
    protected updatePoint(point: IPoint): void;
    /**
     * Updates Cursor's position when axis tooltip changes horizontal position.
     *
     * @param event Axis event
     */
    protected handleXTooltipPosition(event: ISpriteEvents["positionchanged"]): void;
    /**
     * Updates Cursor's position when axis tooltip changes vertical position.
     *
     * @todo Description
     * @param event Axis event
     */
    protected handleYTooltipPosition(event: ISpriteEvents["positionchanged"]): void;
    /**
     * needs to be overriden
     * @ignore
     */
    protected updateLinePositions(point: IPoint): void;
    /**
     * [getRanges description]
     *
     * @todo Description
     */
    protected getRanges(): void;
    /**
     * Overriding inherited method, so that nothing happens when `updateSize`
     * is triggered.
     *
     * RadarCursor is quite complicated and needs own sizing logic.
     *
     * @ignore Exclude from docs
     */
    updateSize(): void;
    /**
     * Outer radius of the cursor's circular line.
     * Absolute (px) or relative ([[Percent]]).
     *
     * @param value  Outer radius
     */
    /**
    * @return Outer radius
    */
    radius: number | Percent;
    /**
     * Outer radius of the circular line in pixels.
     *
     * @return Outer radius (px)
     * @readonly
     */
    readonly pixelRadius: number;
    /**
     * [truePixelRadius description]
     *
     * @todo Description
     * @return Outer radius (px)
     * @readonly
     */
    readonly truePixelRadius: number;
    /**
     * Inner radius of the cursor's circular line.
     * Absolute (px) or relative ([[Percent]]).
     *
     * @param value  Inner radius
     */
    /**
    * @return Inner radius
    */
    innerRadius: number | Percent;
    /**
     * Inner radius of the circular line in pixels.
     *
     * @return Inner radius (px)
     * @readonly
     */
    readonly pixelInnerRadius: number;
    /**
     *
     * @ignore Exclude from docs
     */
    protected fixPoint(point: IPoint): IPoint;
}
