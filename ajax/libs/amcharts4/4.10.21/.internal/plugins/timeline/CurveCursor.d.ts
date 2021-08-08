/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { CurveChart } from "./CurveChart";
import { XYCursor, IXYCursorAdapters, IXYCursorEvents, IXYCursorProperties } from "../../charts/cursors/XYCursor";
import { IPoint } from "../../core/defs/IPoint";
import { ISpriteEvents } from "../../core/Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[CurveCursor]].
 */
export interface ICurveCursorProperties extends IXYCursorProperties {
}
/**
 * Defines events for [[CurveCursor]].
 */
export interface ICurveCursorEvents extends IXYCursorEvents {
}
/**
 * Defines adapters for [[CurveCursor]].
 *
 * @see {@link Adapter}
 */
export interface ICurveCursorAdapters extends IXYCursorAdapters, ICurveCursorProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Cursor for [[CurveChart]].
 *
 * @see {@link ICurveCursorEvents} for a list of available events
 * @see {@link ICurveCursorAdapters} for a list of available Adapters
 */
export declare class CurveCursor extends XYCursor {
    /**
     * Defines available properties
     */
    _properties: ICurveCursorProperties;
    /**
     * Defines available adapters
     */
    _adapter: ICurveCursorAdapters;
    /**
     * Defines available events.
     */
    _events: ICurveCursorEvents;
    /**
     * A reference to chart cursor belongs to.
     */
    _chart: CurveChart;
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
     * [triggerMoveReal description]
     *
     * @param  point  Target point
     */
    protected triggerMoveReal(point: IPoint): void;
    /**
     * (Re)draws the x cursor's line.
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
     * Overriding so that nothing happens when it's called.
     *
     * @param  point  Point
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
     * CurveCursor is quite complicated and needs own sizing logic.
     *
     * @ignore Exclude from docs
     */
    updateSize(): void;
    /**
     *
     * @ignore Exclude from docs
     */
    protected fixPoint(point: IPoint): IPoint;
}
