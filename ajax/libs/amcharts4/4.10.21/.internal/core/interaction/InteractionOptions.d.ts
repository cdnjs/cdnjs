/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IStyleProperty } from "../defs/IStyleProperty";
/**
 * Represents collection of options for [[Sprite]] inertia.
 */
export interface IInertiaOptions {
    /**
     * When calculating inertia direction and speed, we look back at the log of
     * coordinates. This setting holds number of milliseconds to check back to.
     */
    time?: number;
    /**
     * How long should inertia animation play out.
     */
    duration?: number;
    /**
     * How far should object go by inertia counting from its reference point in
     * trail and its release point. I.e. if there are 100 pixels between reference
     * point and drop point, then  it will go another `100 x inertiaFactor` pixels
     * by inertia.
     */
    factor?: number;
    /**
     * Easing function to be used for inertia animation.
     */
    easing?: (value: number) => number;
}
/**
 * Represents collection of options related to click/tap
 */
export interface IHitOptions {
    /**
     * If there were less than this milliseconds between two consecutive clicks
     * consider it a double-hit.
     */
    doubleHitTime?: number;
    /**
     * Maximum number of pixels a pointer can move from its original position
     * while holding down mouse/touch to still consider it a click rather than
     * some other gesture.
     */
    hitTolerance?: number;
    /**
     * If set to `true` (default), Interaction will try to trick the browser not
     * to move focus on a clicked/touched element. This prevents items to become
     * focused (and highlighted) on click/touch, but still make them focusable
     * using keyboard for accessibility.
     */
    noFocus?: boolean;
}
/**
 * Represents collection of options related to hovering elements
 */
export interface IHoverOptions {
    /**
     * What happens when element is no longer touched.
     *
     * `"remove"` - "out" event is triggered immediately, meaning all related hover
     * states and tooltips will be removed.
     *
     * `"delay"` - "out" event is delayed by `touchOutDelay` milliseconds.
     *
     * `"leave"` (default) - "out" event will not be triggered until any other
     * interaction takes place somewhere elese.
     *
     * @default "leave"
     */
    touchOutBehavior?: "removed" | "delay" | "leave";
    /**
     * How long in milliseconds should "out" event be delayed when the element
     * is not longer being touched. Works only if `touchOutBehavior = "delay"`.
     */
    touchOutDelay?: number;
}
/**
 * Represents collection of options for swipe gesture.
 */
export interface ISwipeOptions {
    /**
     * Time limit in milliseconds for swipe to occur.
     */
    time?: number;
    /**
     * Vertical limit in pixels. Gesture deviating more than that will cancel
     * swipe.
     */
    verticalThreshold?: number;
    /**
     * Minimum number of pixels to move horizontally for swipe to register.
     */
    horizontalThreshold?: number;
}
/**
 * Holds styles for mouse cursor.
 */
export interface ICursorOptions {
    /**
     * CSS to apply to cursor when neutral.
     */
    defaultStyle?: Array<IStyleProperty>;
    /**
     * CSS to apply to cursor when hovering over element.
     */
    overStyle?: Array<IStyleProperty>;
    /**
     * CSS to apply to cursor when mouse button is down.
     */
    downStyle?: Array<IStyleProperty>;
}
/**
 * Defines an interface for a keyboar option object.
 *
 * These are used when controlling draggable elements with keyboard arrows.
 */
export interface IKeyboardOptions {
    /**
     * Number of pixels to move per millisecond.
     */
    speed?: number;
    /**
     * A multiplication factor for move speed growth per second
     * For example if the initial speed is 10px/s (0.01px/ms) and accelleration
     * is 0.5, pressing and holding arrow key will make the element move at
     * 10px/s, then will accellerate to 15px/s after 1s, and so on.
     */
    accelleration?: number;
    /**
     * Number of milliseconds before accelleration kicks in.
     */
    accellerationDelay?: number;
}
/**
 * Represents collection of options for mouse-related interactions.
 */
export interface IMouseOptions {
    /**
     * A modifier for mouse wheel sensitivity.
     *
     * 1 (default) means sensitivity is default.
     *
     * Less than 1 will reduce sensitivity, while value bigger than 1 will
     * increase it.
     */
    sensitivity?: number;
}
