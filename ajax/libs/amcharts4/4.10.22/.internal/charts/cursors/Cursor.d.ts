/**
 * Cursor module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { IInteractionEvents } from "../../core/interaction/Interaction";
import { IInteractionObjectEvents } from "../../core/interaction/InteractionObjectEvents";
import { IPoint } from "../../core/defs/IPoint";
import { Chart } from "../Chart";
import * as $type from "../../core/utils/Type";
import { Animation } from "../../core/utils/Animation";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Cursor]].
 */
export interface ICursorProperties extends IContainerProperties {
}
/**
 * Defines events for [[Cursor]].
 */
export interface ICursorEvents extends IContainerEvents {
    /**
     * Invoked when position of cursor changes.
     */
    cursorpositionchanged: {};
    /**
     * Invoked when user starts selecting a range with a cursor, e.g. presses
     * down mouse button and drags the cursor.
     */
    selectstarted: {};
    /**
     * Invoked when selection has ended, e.g. user releases mouse button.
     */
    selectended: {};
    /**
     * Invoked when user starts zooming using cursor.
     */
    zoomstarted: {};
    /**
     * Invoked when user clicked to start zooming/panning/selecting but haven't
     * finished the operation.
     */
    behaviorcanceled: {};
    /**
     * Invoked when user is done zooming using cursor.
     */
    zoomended: {};
    /**
     * Invoked when user starts panning using cursor.
     */
    panstarted: {};
    /**
     * Invoked when user is done panning using cursor.
     */
    panended: {};
    /**
     * Invoked when user is panning using cursor.
     */
    panning: {};
}
/**
 * Defines adapters for [[Cursor]].
 *
 * @see {@link Adapter}
 */
export interface ICursorAdapters extends IContainerAdapters, ICursorProperties {
    /**
     * Can be used to modify cursor position point dynamically using custom code.
     *
     * @since 4.9.35
     */
    cursorPoint: IPoint;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Main Cursor class with common cursor functionality.
 *
 * Chart-specific cursors must extend this class.
 *
 * @see {@link ICursorEvents} for a list of available events
 * @see {@link ICursorAdapters} for a list of available Adapters
 * @todo Add description, examples
 * @todo Should we allow changing `_generalBehavior`?
 */
export declare class Cursor extends Container {
    /**
     * Defines available properties.
     */
    _properties: ICursorProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICursorAdapters;
    /**
     * Defines available events.
     */
    _events: ICursorEvents;
    /**
     * Point coordinates of where selection started.
     */
    downPoint: IPoint;
    /**
     * Point coordinates of where selection ended.
     */
    upPoint: IPoint;
    /**
     * Current cursor position during selection.
     *
     * @todo Better description
     */
    point: IPoint;
    /**
     * Relative horizontal position.
     *
     * @todo: maybe we should make getter only? it is used from outside by axes or series to show tooltips at some position
     */
    xPosition: number;
    /**
     * Relative vertical position.
     *
     * @todo: maybe we should make getter only? it is used from outside by axes or series to show tooltips at some position
     */
    yPosition: number;
    /**
     * [_usesSelection description]
     *
     * @todo Description
     */
    protected _usesSelection: boolean;
    /**
     * What to do when user pressed down and drags cursor: zoom or select.
     */
    protected _generalBehavior: "zoom" | "select" | "pan";
    /**
     * A reference to chart cursor belongs to.
     */
    _chart: Chart;
    /**
     * Specifies the rules when cursor needs to be moved or hidden.
     */
    protected _stick: "hard" | "soft" | "none";
    /**
     * A screen point that cursor is "stuck" to.
     */
    protected _stickPoint: IPoint;
    /**
     * non-modified down point
     * @ignore
     */
    protected _downPointOrig: IPoint;
    /**
     * non-modified up point
     * @ignore
     */
    protected _upPointOrig: IPoint;
    /**
     * Constructor
     */
    constructor();
    /**
     * Handle pointer movement in document and update cursor position as needed.
     *
     * @ignore Exclude from docs
     * @param event Event
     */
    handleCursorMove(event: IInteractionObjectEvents["track"]): IPoint;
    /**
     * Hides actual SVG elements and handles hiding animations.
     *
     * @param duration  Fade out duration (ms)
     * @return Fade out duration (ms)
     * @ignore
     */
    protected hideReal(duration?: number): $type.Optional<Animation>;
    /**
     * Places the cursor at specific point.
     *
     * The second parameter has following options:
     *
     * `"none"` - placed cursor will only be there until mouse/touch moves, then
     * it either moves to a new place (if pointer over plot area) or is hidden.
     *
     * `"soft"` - cursor will stay in the place if mouse/touch is happening
     * outside chart, but will move to a new place whe plot area is hovered or
     * touched.
     *
     * `"hard"` - cursor will stay in place no matter what, until it is moved by
     * another `triggerMove()` call.
     *
     * The third parameter - `force` (since `4.9.5`) - if set to `true` will
     * make cursor execute all of the actions associated with cursor move,
     * including line redraws, tooltip updates, etc. Useful when underlying
     * chart data is dynamically being updated.
     *
     * @param point  Point to place cursor at
     * @param stick  Level of cursor stickiness to the place
     * @param force  Force cursor move
     */
    triggerMove(point: IPoint, stick?: "hard" | "soft" | "none", force?: boolean): void;
    /**
     * Places the cursor at specific point.
     *
     * @param point Point to place cursor at
     */
    protected triggerMoveReal(point: IPoint, force?: boolean): void;
    /**
     * Simulates pressing down (click/touch) action by a cursor.
     *
     * @param point               Point of action
     */
    triggerDown(point: IPoint): void;
    /**
     * Simulates pressing down (click/touch) action by a cursor.
     *
     * @param point               Point of action
     */
    protected triggerDownReal(point: IPoint): void;
    /**
     * Simulates the action of release of the mouse down / touch.
     *
     * @param point               Point of action
     */
    triggerUp(point: IPoint): void;
    /**
     * Simulates the action of release of the mouse down / touch.
     *
     * @param point               Point of action
     */
    protected triggerUpReal(point: IPoint): void;
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
     * Handles pointer down event so we can start zoom or selection.
     *
     * @ignore Exclude from docs
     * @param event Original event
     */
    handleCursorDown(event: IInteractionEvents["down"]): void;
    /**
     * Determines whether Cursor should prevent default action on move.
     *
     * Child classes should override this as necessary.
     *
     * @return Prevent default?
     */
    protected shouldPreventGestures(touch: boolean): boolean;
    /**
     * Updates the coordinates of where pointer down event occurred
     * (was pressed).
     */
    protected updatePoint(point: IPoint): void;
    /**
     * Handles pointer up event - finishes zoom or selection action.
     *
     * @ignore Exclude from docs
     * @param event Original event
     */
    handleCursorUp(event: IInteractionEvents["up"]): void;
    /**
     * A reference to a [[Chart]] the cursor belongs to.
     *
     * @param value  Chart
     */
    /**
    * @return Chart
    */
    chart: this["_chart"];
}
