/**
 * The functionality related to interaction pointers such as mouse cursor and
 * point of touch on touch-enabled devices
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IPoint } from "../defs/IPoint";
import { AMEvent } from "../utils/EventDispatcher";
import { InteractionObject, IInteractionObjectEvents } from "./InteractionObject";
/**
 * Represents pointer, i.e. mouse cursor or touch point.
 */
export interface IPointer {
    /**
     * An ID of the pointer.
     *
     * Mouse is always "0".
     */
    id: string;
    /**
     * Is that a touch pointer?
     */
    touch: boolean;
    /**
     * A [[IPoint]] to where pointer position was when it was created.
     */
    startPoint: IPoint;
    /**
     * A timestamp of when the pointer was created.
     */
    startTime: number;
    /**
     * Current position of the pointer.
     */
    point: IPoint;
    /**
     * Holds information about trail of the pointer movement.
     *
     * It's an array of [[IBreadcrumb]] items, indicating where pointer has been
     * at any particular time in its movement.
     */
    track: IBreadcrumb[];
    /**
     * Holds a timeout identifier for HIT event.
     *
     * This is used to delay HIT event so that we can catch DOUBLEHIT. (if
     * enabled)
     */
    hitTimeout?: number;
    /**
     * Holds a reference to a swipe timeout.
     */
    swipeTimeout?: number;
    /**
     * Holds indicator if swipe gesture was canceled.
     */
    swipeCanceled?: boolean;
    /**
     * A reference to the last encountered event object.
     */
    lastEvent?: MouseEvent | Touch;
    /**
     * A reference to last "down" event in case we need to access it for some
     * other operation, such as initiating drag on a different object.
     */
    lastDownEvent?: MouseEvent | TouchEvent;
    /**
     * A reference to last "up" event in case we need to access it for some
     * other operation, such as initiating drag on a different object.
     */
    lastUpEvent?: MouseEvent | TouchEvent;
    /**
     * For mousedown events, we need to know which mouse button was clicked:
     * 1 - left button
     * 2 - middle button
     * 3 - right button
     */
    button?: number;
    /**
     * A reference to "dragstart" event if it's necessary. Normally we don't
     * execute this event on draggable sprites immediately on DOWN event. We wait
     * until it is actually moved to do it.
     */
    dragStartEvents?: Array<AMEvent<InteractionObject, IInteractionObjectEvents>["dragstart"]>;
    /**
     * Contains reference to InteractionObject which is currently being dragged
     * by this pointer. This is used to run checks if we should trigger hovers
     * on other elements when element is being dragged.
     */
    dragTarget?: InteractionObject;
}
/**
 * Represents coordinates at specific point in time.
 */
export interface IBreadcrumb {
    /**
     * Timestamp in milliseconds of the trail breadcrumb.
     */
    timestamp: number;
    /**
     * Holds the coordinates for the breadcrumb.
     */
    point: IPoint;
}
