/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "./Sprite";
import { EventListener, TargetedEventDispatcher, AMEvent } from "./utils/EventDispatcher";
import { IInteractionObjectEvents } from "./interaction/InteractionObject";
import { IPointer } from "./interaction/Pointer";
import { IPoint } from "./defs/IPoint";
/**
 * ============================================================================
 * RE-EXPORTS
 * ============================================================================
 * @hidden
 */
export { AMEvent };
/**
 * An [[EventDispatcher]] for [[Sprite]].
 *
 * @important
 */
export declare class SpriteEventDispatcher<T extends AMEvent<Sprite, ISpriteEvents>> extends TargetedEventDispatcher<Sprite, T> {
    /**
     * [_interactionEvents description]
     *
     * @todo Description
     */
    private _interactionEvents;
    /**
     * [_dispatchSpriteEvent description]
     *
     * @todo Description
     */
    private _dispatchSpriteEvent;
    /**
     * [_dispatchSpritePointEvent description]
     *
     * @todo Description
     */
    private _dispatchSpritePointEvent;
    /**
     * [_addInteractionObjectEvent description]
     *
     * @todo Description
     */
    private _addInteractionObjectEvent;
    /**
     * [_on description]
     *
     * @todo Description
     */
    protected _on<A, B, Key extends keyof T>(once: boolean, type: Key | null, callback: A, context: B, shouldClone: boolean, dispatch: (type: Key, event: T[Key]) => void): EventListener<T>;
}
/**
 * Defines a type of event that has a single point of reference.
 */
export declare type SpritePointerTypeEvent = {
    /**
     * Is event originated by touch pointer?
     */
    touch: boolean;
};
/**
 * Defines property set for a [[Sprite]] event that contains point information.
 */
export declare type SpritePointEvent = {
    /**
     * Event point in global (document) coordinates.
     */
    point: IPoint;
    /**
     * Event point in local Sprite coordinates.
     */
    spritePoint: IPoint;
    /**
     * Event point with chart (svg) coodinates.
     */
    svgPoint: IPoint;
};
/**
 * Defines a type of event that has a related Pointer.
 */
export declare type SpritePointerEvent = {
    /**
     * Coordinates of the primary cursor position.
     */
    pointer: IPointer;
};
/**
 * Defines property set for a [[Sprite]] event that contains mouse or touch
 * event.
 */
export declare type SpriteMouseTouchEvent = {
    /**
     * Original mouse/touch event.
     */
    event: MouseEvent | TouchEvent;
};
/**
 * Defines property set for a [[Sprite]] event that contains coordinate shift
 * information, such as drag events.
 */
export declare type SpriteShiftEvent = {
    /**
     * Shift in coordinates after dragging.
     */
    shift: IPoint;
};
/**
 * Defines available events available for [[Sprite]].
 */
export interface ISpriteEvents extends IInteractionObjectEvents {
    /**
     * Invoked when Sprite completes transition to a [[SpriteState]].
     */
    transitionended: {};
    /**
     * Invoked when size of the Sprite changes.
     */
    sizechanged: {};
    /**
     * Invoked when maximum available size of the Sprite changes, i.e. when the
     * size of parent container changes.
     */
    maxsizechanged: {
        previousWidth: number;
        previousHeight: number;
    };
    /**
     * @todo Description
     */
    transformed: {
        /**
         * [string description]
         * @todo Needs description
         */
        dummyData?: string;
    };
    /**
     * Invoked when position of the [[Sprite]] changes.
     */
    positionchanged: {};
    /**
     * Invoked when [[Sprite]] is initialized.
     */
    inited: {};
    /**
     * Invoked when [[Sprite]] appears. Sprite appears when `sprite.appear()` method
     * is called and show animation is finished.
     */
    appeared: {};
    /**
     * Invoked when chart is shown if `am4core.options.queue = true` or/and `am4core.options.onlyShowOnViewport = true`.
     */
    removedfromqueue: {};
    /**
     * Invoked when [[Sprite]] is becomes ready, that is it has finished all
     * calculations and building itself.
     *
     * For [[Container]] object (and all those inheriting it, including charts)
     * this event will fire when all children become ready.
     */
    ready: {};
    /**
     * Invoked before [[Sprite]] is validated.
     *
     * @todo Description (check)
     */
    beforevalidated: {};
    /**
     * Invoked when [[Sprite]] is validated. (on init or after update)
     *
     * @todo Description (check)
     */
    validated: {};
    /**
     * Invoked when visibility of the [[Sprite]] changes. (from visible to hidden,
     * and vice versa)
     */
    visibilitychanged: {
        visible: boolean;
    };
    /**
     * Invoked when hidden [[Sprite]] is shown.
     */
    shown: {};
    /**
     * Invoked when visible [[Sprite]] is hidden.
     */
    hidden: {};
    /**
     * Invoked when zIndex of a sprite is changed
     */
    zIndexChanged: {};
    /**
     * Invoked when property of the [[Sprite]] changes.
     */
    propertychanged: {
        /**
         * Property key.
         */
        property: string;
    };
    /**
     * Invoked when the global scale changed, meaning that scale of [[Sprite]]
     * or any of its ascendants changed.
     */
    globalscalechanged: {};
    /**
     * Invoked when [[Sprite]] is clicked or touched.
     */
    hit: SpritePointerTypeEvent & SpritePointEvent & SpriteMouseTouchEvent;
    /**
     * Invoked when [[Sprite]] is clicked or touched twice in rapid succession.
     */
    doublehit: SpritePointerTypeEvent & SpritePointEvent & SpriteMouseTouchEvent;
    /**
     * Invoked when pointer (mouse cursor or touch point) moves over `trackable`
     * [[Sprite]].
     */
    track: SpritePointerTypeEvent & SpritePointEvent & SpritePointerEvent & SpriteMouseTouchEvent;
    /**
     * Invoked when user turns mouse wheel while over the [[Sprite]].
     */
    wheel: SpritePointEvent & SpriteShiftEvent & {
        /**
         * Original JavaScript event.
         */
        event: WheelEvent;
    };
    /**
     * Invoked when user turns mouse wheel upwards while over the [[Sprite]].
     */
    wheelup: SpritePointEvent & SpriteShiftEvent & {
        /**
         * Original JavaScript event
         */
        event: WheelEvent;
    };
    /**
     * Invoked when user turns mouse wheel downwards while over the [[Sprite]].
     */
    wheeldown: SpritePointEvent & SpriteShiftEvent & {
        /**
         * Original JavaScript event.
         */
        event: WheelEvent;
    };
    /**
     * Invoked when user turns mouse wheel leftwards while over the [[Sprite]].
     */
    wheelleft: SpritePointEvent & SpriteShiftEvent & {
        /**
         * Original JavaScript event
         */
        event: WheelEvent;
    };
    /**
     * Invoked when user turns mouse wheel rightwards while over the [[Sprite]].
     */
    wheelright: SpritePointEvent & SpriteShiftEvent & {
        /**
         * Original JavaScript event.
         */
        event: WheelEvent;
    };
    /**
     * Invoked when `togglable` Sprite is being toggled on and off. (its
     * `isActive` property is being changed)
     */
    toggled: {};
    /**
     * Invoked just before Sprite is disposed.
     */
    beforedisposed: {};
    /**
     * Invoked when sprite is disabled
     */
    disabled: {};
    /**
     * Invoked when sprite is enabled
     */
    enabled: {};
    /**
     * Invoked when `draggable` object is being dragged. (using mouse, touch or
     * keyboard).
     *
     * This is simmilar but different then `"drag"` event in that it kicks in
     * after `"drag"` which modifies [[Sprite]] coordinates. This allows doing
     * own manipulations and corrections to element positions.
     */
    dragged: SpritePointerTypeEvent & SpriteShiftEvent & SpritePointEvent & {
        /**
         * Original coordinates of the pointer's position when the dragging started.
         */
        startPoint: IPoint;
        /**
         * An original JavaScript event that triggered dragging.
         */
        event?: MouseEvent | TouchEvent | KeyboardEvent;
    };
    /**
     * Invoked when a sprite is added to a parent
     */
    parentset: {};
}
