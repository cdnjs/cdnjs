/**
 * Functionality related to inertia
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { InteractionObject } from "./InteractionObject";
import { Animation, IAnimatable } from "../utils/Animation";
import { IPoint } from "../defs/IPoint";
/**
 * Defines a list of available inertia types.
 */
export declare type InertiaTypes = "move" | "resize";
/**
 * A point of inertia is to simulate gradually drecreasing motion even after
 * actual interaction by user, that caused it, has already ended.
 *
 * [[Inertia]] object will continue triggering the same [[Sprite]] handlers
 * as if the interaction was still happening, gradually reducing
 * shift/angle/scale values until full stop.
 *
 * Basically, from the target element's point of view, while inertia is
 * playing, it is still being interacted with by user, albeit with a
 * decreasing speed.
 */
export declare class Inertia extends BaseObject implements IAnimatable {
    /**
     * Holds what type of inertia it is.
     */
    type: InertiaTypes;
    /**
     * An element we're performing animation on.
     */
    interaction: InteractionObject;
    /**
     * Starting pointer position. The position of pointer when we "released"
     * the element.
     */
    startPoint: IPoint;
    /**
     * Current (simulated) pointer position.
     */
    point: IPoint;
    /**
     * List of animations currently playing.
     */
    animations: Array<Animation>;
    /**
     * Constructor
     */
    constructor(interaction: InteractionObject, type: InertiaTypes, point: IPoint, startPoint: IPoint);
    /**
     * Sets current X coordinate.
     *
     * Will trigger "drag" event for the target element.
     *
     * @param value X
     */
    /**
    * Returns current X coordinate.
    *
    * @return X
    */
    x: number;
    /**
     * Sets current Y coordinate.
     *
     * Will trigger "drag" event for the target element.
     *
     * @param value Y
     */
    /**
    * Returns current Y coordinate.
    *
    * @return Y
    */
    y: number;
    /**
     * Simulates dragging of element.
     */
    handleMove(): void;
    /**
     * Finishes up the inertia animation. (removes reference to this animation
     * object)
     */
    done(): void;
}
