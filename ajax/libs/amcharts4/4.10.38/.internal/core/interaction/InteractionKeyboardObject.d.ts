/**
 * Functionality related simulating of dragging of elements using keyboard.
 */
import { InteractionObject } from "./InteractionObject";
import { IAnimationObject } from "../utils/Animation";
import { IDisposer } from "../utils/Disposer";
/**
 * [[InteractionKeyboardObject]] is used to simulate dragging of the `draggable`
 * element using keyboard arrows.
 *
 * @ignore Exclude from docs
 */
export declare class InteractionKeyboardObject implements IAnimationObject, IDisposer {
    /**
     * A [[InteractionObject]] representation of an element we're performing
     * animation on.
     */
    interaction: InteractionObject;
    /**
     * Indicates if this object has already been deleted. Any
     * destruction/disposal code should take this into account when deciding
     * wheter to run potentially costly disposal operations if they already have
     * been run.
     */
    protected _disposed: boolean;
    /**
     * Timestamp on when animation started.
     */
    private _startedOn;
    /**
     * Indicates direction of current horizontal movement.
     *
     * 0 - not moving horizontally
     * 1 - moving right
     * -1 - moving left
     */
    directionX: 0 | 1 | -1;
    /**
     * Indicates direction of current vertical movement.
     *
     * 0 - not moving vertically
     * 1 - moving down
     * -1 - moving up
     */
    directionY: 0 | 1 | -1;
    /**
     * Holds reference to original keyboard event.
     */
    keyboardEvent: KeyboardEvent;
    /**
     * Constructor.
     *
     * @param io An InteractionObject
     */
    constructor(io: InteractionObject, ev: KeyboardEvent);
    /**
     * It's an update method which is called by the system if
     * [[InteractionObject]] is used as animation.
     *
     * This will update coordinates of the element based on the movement
     * directions.
     */
    update(): void;
    /**
     * Returns if this object has been already been disposed.
     *
     * @return Is disposed?
     */
    isDisposed(): boolean;
    /**
     * Disposes this object. Removes from system animations.
     */
    dispose(): void;
}
