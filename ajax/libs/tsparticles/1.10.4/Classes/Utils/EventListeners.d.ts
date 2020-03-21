import { Container } from "../Container";
/**
 * Particles container event listeners manager
 */
export declare class EventListeners {
    private readonly container;
    private readonly mouseMoveHandler;
    private readonly touchStartHandler;
    private readonly touchMoveHandler;
    private readonly touchEndHandler;
    private readonly mouseLeaveHandler;
    private readonly touchCancelHandler;
    private readonly touchEndClickHandler;
    private readonly mouseUpHandler;
    private readonly visibilityChangeHandler;
    private readonly resizeHandler;
    /**
     * Events listener constructor
     * @param container the calling container
     */
    constructor(container: Container);
    /**
     * Initializing event listeners
     */
    addEventsListeners(): void;
    removeEventsListeners(): void;
    private handleWindowResize;
    private handleVisibilityChange;
    /**
     * Mouse/Touch move event
     * @param e the event arguments
     */
    private mouseTouchMove;
    /**
     * Mouse/Touch event finish
     */
    private mouseTouchFinish;
    /**
     * Mouse/Touch click/tap event
     * @param e the click event arguments
     */
    private mouseTouchClick;
    /**
     * Mouse/Touch click/tap event implementation
     * @param e the click event arguments
     */
    private doMouseTouchClick;
}
