/**
 * Interaction manages all aspects of user interaction - mouse move,
 * click, hover, drag events, touch gestures.
 *
 * [[InteractionObject]] elements that want to use certain events, must attach event
 * listeners to Interaction instance.
 *
 * Interaction itself will not modify [[InteractionObject]] elements, it will be up to
 * those elements to handle interaction information received via event triggers.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObjectEvents, IBaseObjectEvents } from "../Base";
import { List } from "../utils/List";
import { IInertiaOptions, ISwipeOptions, IHitOptions, IHoverOptions, IKeyboardOptions, IMouseOptions } from "./InteractionOptions";
import { IDisposer } from "../utils/Disposer";
import { InteractionObject, IInteractionObjectEvents } from "./InteractionObject";
import { Dictionary } from "../utils/Dictionary";
import { InertiaTypes } from "./Inertia";
import { IPointer, IBreadcrumb } from "./Pointer";
import { IPoint } from "../defs/IPoint";
import { IStyleProperty } from "../defs/IStyleProperty";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Represents an Event object that comes from [[Interaction]]
 */
export interface IInteractionEvents extends IBaseObjectEvents {
    track: {
        pointer: IPointer;
        touch: boolean;
        event: MouseEvent | TouchEvent;
    };
    down: {
        pointer: IPointer;
        touch: boolean;
        event: MouseEvent | TouchEvent;
    };
    up: {
        pointer: IPointer;
        touch: boolean;
        event: MouseEvent | TouchEvent;
    };
    focus: {
        event: FocusEvent;
    };
}
/**
 * Interface representing a delayed event
 *
 * @ignore Exclude from docs
 */
export interface IDelayedEvent {
    type: keyof IInteractionObjectEvents;
    io: InteractionObject;
    pointer: IPointer;
    event: MouseEvent | TouchEvent;
    keepUntil?: number;
    timeout?: IDisposer;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
* Interaction manages all aspects of user interaction - mouse move,
* click, hover, drag events, touch gestures.
*
* [[InteractionObject]] elements that want to use certain events, must attach event
* listeners to Interaction instance.
*
* Interaction itself will not modify [[InteractionObject]] elements, it will be up to
* those elements to handle interaction information received via event triggers.
*
* @see {@link IInteractionEvents} for a list of available events
*/
export declare class Interaction extends BaseObjectEvents {
    /**
     * Defines available events.
     *
     * @deprecated Use inetraction.body.events instead
     */
    _events: IInteractionEvents;
    /**
     * A reference to an [[Interaction]] object for document's body.
     *
     * Users can use it to add global, non-chart related events, that will be
     * applicable to the whole document.
     */
    body: InteractionObject;
    /**
     * An indicator of global events were already initialized.
     */
    protected _globalEventsAdded: boolean;
    /**
     * Holds which mouse event listeners to use.
     */
    protected _pointerEvents: {
        "pointerdown": string;
        "pointerup": string;
        "pointermove": string;
        "pointercancel": string;
        "pointerover": string;
        "pointerout": string;
        "wheel": string;
    };
    /**
     * Indicates if Interaction should use only "pointer" type events, like
     * "pointermove", available in all modern browsers, ignoring "legacy"
     * events, like "touchmove".
     */
    protected _usePointerEventsOnly: boolean;
    /**
     * Use only touch events (for touch only devices such as tablets and phones)
     */
    protected _useTouchEventsOnly: boolean;
    /**
     * Add special hover events. Normally, touch device tap will also simulate
     * hover event. On some devices (ahem iOS) we want to prevent that so that
     * over/out events are not duplicated.
     */
    protected _addHoverEvents: boolean;
    /**
     * Indicates if passive mode options is supported by this browser.
     */
    protected _passiveSupported: boolean;
    /**
     * Holds list of delayed events
     */
    protected _delayedEvents: {
        out: IDelayedEvent[];
    };
    /**
     * List of objects that current have a pointer hovered over them.
     */
    overObjects: List<InteractionObject>;
    /**
     * List of objects that currently has a pressed pointer.
     */
    downObjects: List<InteractionObject>;
    /**
     * List of objects that need mouse position to be reported to them.
     */
    trackedObjects: List<InteractionObject>;
    /**
     * List of objects that are currently being dragged.
     */
    transformedObjects: List<InteractionObject>;
    /**
     * An object that currently has focus. Usually set automatically via
     * [[InteractionObject]] `isFocus` method.
     */
    focusedObject: $type.Optional<InteractionObject>;
    /**
     * Holds all known pointers.
     */
    pointers: Dictionary<string, IPointer>;
    /**
     * Last pointer that generate some kind of action.
     *
     * @since 4.9.5
     * @ignore
     */
    lastPointer: $type.Optional<IPointer>;
    /**
     * Inertia options that need to be applied to after element drag, if it's
     * `inert = true`.
     *
     * This is just a default, which can and probably will be overridden by
     * actual elements.
     */
    inertiaOptions: Dictionary<InertiaTypes, IInertiaOptions>;
    /**
     * Default options for click events. These can be overridden in
     * [[InteractionObject]].
     */
    hitOptions: IHitOptions;
    /**
     * Default options for hover events. These can be overridden in
     * [[InteractionObject]].
     */
    hoverOptions: IHoverOptions;
    /**
     * Default options for detecting a swipe gesture. These can be overridden in
     * [[InteractionObject]].
     */
    swipeOptions: ISwipeOptions;
    /**
     * Default options for keyboard operations. These can be overridden in
     * [[InteractionObject]].
     */
    keyboardOptions: IKeyboardOptions;
    /**
     * Default options for keyboard operations. These can be overridden in
     * [[InteractionObject]].
     *
     * @since 4.5.14
     */
    mouseOptions: IMouseOptions;
    /**
     * Constructor. Sets up universal document-wide move events to handle stuff
     * outside particular chart container.
     */
    constructor();
    /**
     * This is a nasty detection for Firefox. The reason why we have is that
     * Firefox ESR version does not support matchMedia correctly.
     *
     * On iOS, Firefox uses different userAgent, so we don't have to detect iOS.
     *
     * @return Full Firefox?
     */
    protected fullFF(): boolean;
    protected debug(): void;
    /**
     * ==========================================================================
     * Processing
     * ==========================================================================
     * @hidden
     */
    /**
     * Sets up global events.
     *
     * We need this so that we can track drag movement beyond chart's container.
     *
     * @ignore Exclude from docs
     */
    addGlobalEvents(): void;
    /**
     * Sets if [[InteractionObject]] is clickable.
     *
     * @ignore Exclude from docs
     * @param io [[InteractionObject]] instance
     */
    processClickable(io: InteractionObject): void;
    /**
     * Sets if [[InteractionObject]] will display context menu when right-clicked.
     *
     * @ignore Exclude from docs
     * @param io [[InteractionObject]] instance
     */
    processContextMenu(io: InteractionObject): void;
    /**
     * Sets if [[InteractionObject]] is hoverable.
     *
     * @ignore Exclude from docs
     * @param io [[InteractionObject]] instance
     */
    processHoverable(io: InteractionObject): void;
    /**
     * Sets up [[InteractionObject]] as movable. Movable can be any
     * transformation, e.g. drag, swipe, resize, track.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    processMovable(io: InteractionObject): void;
    /**
     * Checks if [[InteractionObject]] is trackable and sets relative events.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    processTrackable(io: InteractionObject): void;
    /**
     * Checks if [[InteractionObject]] is draggable.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    processDraggable(io: InteractionObject): void;
    /**
     * Checks if [[InteractionObject]] is swipeable and sets relative events.
     *
     * A swipe event is triggered when a horizontal drag of 75px or more (and
     * less than 30px vertically) occurs within 700 milliseconds. This can be
     * overridden in sprites [[swipeOptions]].
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    processSwipeable(io: InteractionObject): void;
    /**
     * Checks if [[InteractionObject]] is resizable and attaches required events
     * to it.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    processResizable(io: InteractionObject): void;
    /**
     * Checks if [[InteractionObject]] is supposed to capture mouse wheel events
     * and prepares it to catch those events.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    processWheelable(io: InteractionObject): void;
    /**
     * Checks if [[InteractionObject]] is focusable. A focusable element is an
     * element that will be highlighted when users presses TAB key. If the
     * element is focusable, this function will attach relative focus/blur
     * events to it.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    processFocusable(io: InteractionObject): void;
    /**
     * Checks if [[InteractionObject]] is "touchable". It means any interaction
     * whatsoever: mouse click, touch screen tap, swipe, drag, resize, etc.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    processTouchable(io: InteractionObject): void;
    /**
     * ==========================================================================
     * Non-pointer events
     * ==========================================================================
     * @hidden
     */
    /**
     * Dispatches "focus" event when element gains focus.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    handleFocus(io: InteractionObject, ev: FocusEvent): void;
    /**
     * Used by regular click events to prevent focus if "noFocus" is set.
     *
     * This should not be called by "focus" handlers.
     *
     * @param io  Element
     * @param ev  Original event
     */
    private handleFocusBlur;
    /**
     * Dispatches "blur" event when element loses focus.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    handleBlur(io: InteractionObject, ev: FocusEvent): void;
    /**
     * ==========================================================================
     * Global keyboard-related even handlers
     * ==========================================================================
     * @hidden
     */
    /**
     * Checks if there is an item that has currently focus and that they key is
     * one of the directional keys. If both of the conditions are true, it
     * creates an object to simulate movement of dragable element with keyboard.
     *
     * @ignore Exclude from docs
     * @param ev An original keyboard event
     */
    handleGlobalKeyDown(ev: KeyboardEvent): void;
    /**
     * Dispatches related events when the keyboard key is realeasd.
     *
     * @ignore Exclude from docs
     * @param ev An original keyboard event
     */
    handleGlobalKeyUp(ev: KeyboardEvent): void;
    /**
     * ==========================================================================
     * Global pointer-related even handlers
     * ==========================================================================
     * @hidden
     */
    /**
     * Handler for a global "pointermove" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    handleGlobalPointerMove(ev: MouseEvent): void;
    /**
     * Handler for a global "pointerdown" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    handleGlobalPointerDown(ev: MouseEvent): void;
    /**
     * Prevents touch action from firing.
     *
     * @ignore Exclude from docs
     * @param ev Event
     */
    preventTouchAction(ev: TouchEvent): void;
    /**
     * Handler for a global "pointerup" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    handleGlobalPointerUp(ev: MouseEvent, cancelled?: boolean): void;
    /**
 * ==========================================================================
 * Global touch-related even handlers
 * ==========================================================================
 */
    /**
     * Handler for a global "touchmove" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    handleGlobalTouchMove(ev: TouchEvent): void;
    /**
     * Handler for a global "touchstart" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    handleGlobalTouchStart(ev: TouchEvent): void;
    /**
     * Handler for a global "touchend" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    handleGlobalTouchEnd(ev: TouchEvent): void;
    /**
     * ==========================================================================
     * Element-specific pointer-related even handlers
     * ==========================================================================
     * @hidden
     */
    /**
     * Handles event when pointer is over [[InteractionObject]] and button is
     * pressed.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    handlePointerDown(io: InteractionObject, ev: MouseEvent | PointerEvent): void;
    /**
     * Handles event when [[InteractionObject]] is hovered by a mouse pointer.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    handlePointerOver(io: InteractionObject, ev: MouseEvent | PointerEvent): void;
    /**
     * Handles event when [[InteractionObject]] loses hover from a mouse pointer.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    handlePointerOut(io: InteractionObject, ev: MouseEvent | PointerEvent): void;
    /**
     * Handles event when mouse wheel is crolled over the [[InteractionObject]].
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     * @todo Investigate more-cross browser stuff https://developer.mozilla.org/en-US/docs/Web/Events/wheel
     */
    handleMouseWheel(io: InteractionObject, ev: WheelEvent): void;
    /**
     * ==========================================================================
     * Element-specific touch-related even handlers
     * ==========================================================================
     * @hidden
     */
    /**
      * Handles an event when an [[InteractionObject]] is touched on a touch
      * device.
      *
      * @ignore Exclude from docs
      * @param io  Element
      * @param ev  Original event
      */
    handleTouchDown(io: InteractionObject, ev: TouchEvent): void;
    /**
     * ==========================================================================
     * Universal handlers
     * ==========================================================================
     * @hidden
     */
    /**
     * Handles click/tap. Checks for doublehit.
     *
     * @ignore Exclude from docs
     * @param io       Interaction object
     * @param pointer  Pointer
     * @param ev       Original event
     */
    handleHit(io: InteractionObject, pointer: IPointer, ev: MouseEvent | TouchEvent): void;
    /**
     * Handles pointer hovering over [[InteractionObject]].
     *
     * @ignore Exclude from docs
     * @param io       Interaction object
     * @param pointer  Pointer
     * @param ev       Original event
     * @param soft     Invoked by helper function
     */
    handleOver(io: InteractionObject, pointer: IPointer, ev: MouseEvent | TouchEvent, soft?: boolean): void;
    /**
     * Handles when [[InteractionObject]] is no longer hovered.
     *
     * If `soft = true`, this means that method is being invoked by some other
     * code, not hard "out" function, like `handleUp` which implies we need to
     * run additional checks before unhovering the object.
     *
     * @ignore Exclude from docs
     * @param io       Interaction object
     * @param pointer  Pointer
     * @param ev       Original event
     * @param soft     Invoked by helper function
     * @param force    Force imediate out
     */
    handleOut(io: InteractionObject, pointer: IPointer, ev: MouseEvent | TouchEvent, soft?: boolean, force?: boolean): void;
    /**
     * Processes dalyed events, such as "out" event that was initiated for
     * elements by touch.
     */
    private processDelayed;
    /**
     * Performs tasks on pointer down.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    handleDown(io: InteractionObject, pointer: IPointer, ev: MouseEvent | TouchEvent | undefined): void;
    /**
     * Performs tasks on pointer up.
     *
     * @ignore Exclude from docs
     * @param pointer  Pointer
     * @param ev       Original event
     */
    handleGlobalUp(pointer: IPointer, ev: MouseEvent | TouchEvent | undefined, cancelled?: boolean): void;
    /**
     * Simulates all pointers being up once mouse leaves document area.
     *
     * @ignore Exclude from docs
     * @param ev       Original event
     */
    handleDocumentLeave(ev: MouseEvent): void;
    /**
     * Handles when [[InteractionObject]] is no longer hovered.
     *
     * @ignore Exclude from docs
     * @param io       Interaction object
     * @param pointer  Pointer
     * @param ev       Original event
     */
    handleUp(io: InteractionObject, pointer: IPointer, ev: MouseEvent | TouchEvent, cancelled?: boolean): void;
    /**
     * Checks if event needs to be prevented on draggable and such items, so that
     * touch gestures like navigation and scroll do not kick in.
     *
     * @param io  Object
     * @param ev  Event
     */
    private maybePreventDefault;
    /**
     * Cancels all hovers on all currently hovered objects.
     *
     * @param  pointer  Pointer
     * @param  ev       Event
     */
    private cancelAllHovers;
    /**
     * Checks if hovers should be cancelled on transform as per global options.
     * @param   pointer  Pointer
     * @return           Cancel?
     */
    private shouldCancelHovers;
    /**
     * Handles pointer move.
     *
     * @ignore Exclude from docs
     * @param pointer  Pointer
     * @param ev       Original event
     */
    handleGlobalMove(pointer: IPointer, ev: MouseEvent | TouchEvent): void;
    /**
     * Handles reporting of pointer movement.
     *
     * @ignore Exclude from docs
     * @param io        Element
     * @param pointer    Pointer
     * @param ev         Original event
     * @param skipCheck  Sould we skip check if cursor actually moved
     */
    handleTrack(io: InteractionObject, pointer: IPointer, ev: MouseEvent | TouchEvent, skipCheck?: boolean): void;
    /**
     * Handles swipe action.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    handleSwipe(io: InteractionObject, pointer: IPointer, ev: MouseEvent | TouchEvent): void;
    /**
     * Handles event triggering for wheel rotation.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param deltaX   Horizontal shift
     * @param deltaY   Vertical shift
     * @param ev       Original event
     */
    handleWheel(io: InteractionObject, pointer: IPointer, deltaX: number, deltaY: number, ev: WheelEvent): void;
    /**
     * Initiates inertia checking sub-routines for different movement types:
     * drag, resize.
     *
     * @ignore Exclude from docs
     * @param sprite
     * @param pointer
     */
    handleInertia(io: InteractionObject, pointer: IPointer): void;
    /**
     * Continues moving the element to simulate the effect of inertia. Happens
     * when `inert` and `draggable` object is dragged and then released.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     */
    handleMoveInertia(io: InteractionObject, pointer: IPointer): void;
    /**
     * Continues resizing of a `resizable` element after it is resized and
     * released.
     *
     * **NOTE:** this is is just a placeholder function. No actual fucntionality
     * is implemented, yet.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     */
    handleResizeInertia(io: InteractionObject, pointer: IPointer): void;
    /**
     * Recalculates element's position and size based on position of
     * all its related pointers.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    handleTransform(io: InteractionObject, ev: MouseEvent | TouchEvent): void;
    /**
     * Handles movement of the dragged element.
     *
     * @ignore Exclude from docs
     * @param io            Element
     * @param point         Current point of the pointer
     * @param startPoint    Starting point of the pointer
     * @param ev            Original event
     * @param pointerMoved  Did pointer move?
     */
    handleTransformMove(io: InteractionObject, point: IPoint, startPoint: IPoint, ev: MouseEvent | TouchEvent | KeyboardEvent, pointerMoved: boolean, touch: boolean): void;
    /**
     * Handles resizing of the element.
     *
     * @ignore Exclude from docs
     * @param io            Element
     * @param point1        Current position of reference point #1
     * @param startPoint1   Original position of reference point #1
     * @param point2        Current position of reference point #2
     * @param startPoint2   Original position of reference point #2
     * @param ev            Original event
     * @param pointerMoved  Did pointer move?
     */
    handleTransformResize(io: InteractionObject, point1: IPoint, startPoint1: IPoint, point2: IPoint, startPoint2: IPoint, ev: MouseEvent | TouchEvent, pointerMoved: boolean, touch: boolean): void;
    /**
     * Handles all the preparations of the element when it starts to be dragged.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    processDragStart(io: InteractionObject, pointer?: IPointer, ev?: MouseEvent | TouchEvent): void;
    /**
     * Finishes up element drag operation.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    processDragStop(io: InteractionObject, pointer?: IPointer, ev?: MouseEvent | TouchEvent): void;
    /**
     * Handles all the preparations of the element when it starts to be resized.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    processResizeStart(io: InteractionObject, pointer?: IPointer, ev?: MouseEvent | TouchEvent): void;
    /**
     * Finishes up element drag operation.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    processResizeStop(io: InteractionObject, pointer?: IPointer, ev?: MouseEvent | TouchEvent): void;
    /**
     * ==========================================================================
     * Controls for InteractionObjects initiating directly
     * ==========================================================================
     * @hidden
     */
    /**
     * Manually triggers drag start on the element. Could be useful in cases
     * where tracking or dragging one element can also influence dragging another
     * element.
     *
     * Passing in `pointer` reference is advisable. If not passed in it will try
     * to determine which pointer to attach to. However, it's better to specify
     * it explicitly.
     *
     * @param io       Element
     * @param pointer  Pointer
     */
    dragStart(io: InteractionObject, pointer?: IPointer): void;
    /**
     * Manually ends drag on the element.
     *
     * @param io       Element
     * @param pointer  Pointer
     */
    dragStop(io: InteractionObject, pointer?: IPointer, cancelled?: boolean): void;
    /**
     * This method uses a fuzzy logic to find the pointer to be used for dragging.
     * Beware that this is not a rock-solid solution. If there are a few objects
     * being dragged at the same time, you may get unexepected results.
     *
     * @param io  InteractionObject to get pointers from
     * @return Pointer currently being used for dragging
     */
    getDragPointer(io?: InteractionObject): $type.Optional<IPointer>;
    /**
     * ==========================================================================
     * Utils
     * ==========================================================================
     * @hidden
     */
    /**
     * Returns pointer id for the given event object.
     *
     * @param ev  Event
     * @return Pointer ID
     */
    protected getPointerId(ev: any): string;
    /**
     * Returns a cursor position of the event.
     *
     * @param ev  Original event
     * @return Event point
     */
    protected getPointerPoint(ev: MouseEvent | Touch): IPoint;
    /**
     * Returns [[Pointer]] object that is associated with the Event.
     *
     * If no such [[Pointer]] object exists, it is created.
     *
     * @param ev  Event
     * @return Pointer
     */
    protected getPointer(ev: MouseEvent | Touch): IPointer;
    /**
     * Determines if pointer event originated from a touch pointer or mouse.
     *
     * @param ev  Original event
     * @return Touch pointer?
     */
    protected isPointerTouch(ev: MouseEvent | Touch): boolean;
    /**
     * Resets the poiner to original state, i.e. cleans movement information,
     * starting point, etc.
     *
     * @param pointer Pointer
     */
    protected resetPointer(pointer: IPointer, ev: MouseEvent | PointerEvent | Touch): void;
    /**
     * Adds a "breadcrumb" point to the [[Pointer]] to log its movement path.
     *
     * @param pointer  Pointer
     * @param point    Point coordinates
     */
    protected addBreadCrumb(pointer: IPointer, point: IPoint): void;
    /**
     * Prepares the document for various touch-related operations.
     *
     * @ignore Exclude from docs
     */
    lockDocument(): void;
    /**
     * Restores document functionality.
     *
     * @ignore Exclude from docs
     */
    unlockDocument(): void;
    /**
     * Lock element (disable all touch)
     *
     * @ignore Exclude from docs
     */
    lockElement(io: InteractionObject): void;
    /**
     * Restores element's functionality.
     *
     * @ignore Exclude from docs
     */
    unlockElement(io: InteractionObject): void;
    /**
     * Locks document's wheel scroll.
     *
     * @ignore Exclude from docs
     */
    lockWheel(): void;
    /**
     * Unlocks document's wheel scroll.
     *
     * @ignore Exclude from docs
     */
    unlockWheel(): void;
    /**
     * Checks if top element at pointer's position belongs to the SVG.
     *
     * @ignore Exlude from docs
     * @param pointer  Pointer
     * @param svg      The <svg> element
     * @param id       A unique identifier of the object that is checking for locality
     * @return Belongs to SVG
     */
    isLocalElement(pointer: IPointer, svg: SVGSVGElement, id: string): boolean;
    /**
     * A function that cancels mouse wheel scroll.
     *
     * @ignore Exclude from docs
     * @param ev  Event object
     * @return Returns `false` to cancel
     */
    protected wheelLockEvent(ev: Event): boolean;
    /**
     * Applies a set of styles to an element. Stores the original styles so they
     * can be restored later.
     *
     * @ignore
     * @param io      Element
     */
    prepElement(io: InteractionObject): void;
    /**
     * Restores replaced styles
     *
     * @ignore
     * @param  io  Element
     */
    unprepElement(io: InteractionObject): void;
    /**
     * Returns an option associated with hit events.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    getHitOption(io: InteractionObject, option: keyof IHitOptions): any;
    /**
     * Returns an option associated with hover events.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    getHoverOption(io: InteractionObject, option: keyof IHoverOptions): any;
    /**
     * Returns an option associated with swipe events.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    getSwipeOption(io: InteractionObject, option: keyof ISwipeOptions): any;
    /**
     * Returns an option for keyboard.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    getKeyboardOption(io: InteractionObject, option: keyof IKeyboardOptions): any;
    /**
     * Returns an option for mouse.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    getMouseOption(io: InteractionObject, option: keyof IMouseOptions): any;
    /**
     * Returns an option associated with inertia.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param type    Inertia type
     * @param option  Option key
     * @return Option value
     */
    getInertiaOption(io: InteractionObject, type: InertiaTypes, option: keyof IInertiaOptions): any;
    /**
     * Stops currently going on inertia. Useful if inertia is currently being
     * animated and the object is being interacted with.
     *
     * @param io Element
     */
    protected stopInertia(io: InteractionObject): void;
    /**
     * Check if swiping is currently being performed on an object.
     *
     * @param io       Element
     * @param pointer  Pointer to check
     * @return `true` if swiping
     */
    swiping(io: InteractionObject, pointer: IPointer): boolean;
    /**
     * Returns `true` if a successfull swipe action was performed on an element.
     *
     * @param io       Element
     * @param pointer  Pointer
     * @return Swiped?
     */
    swiped(io: InteractionObject, pointer: IPointer): boolean;
    /**
     * Applies style to mouse cursor based on its stage in relation to
     * [[InteractionObject]].
     *
     * @ignore Exclude from docs
     * @param Element
     */
    applyCursorOverStyle(io: InteractionObject): void;
    /**
     * Applies style to mouse cursor based on its stage in relation to
     * [[InteractionObject]].
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     */
    applyCursorDownStyle(io: InteractionObject, pointer: IPointer): void;
    /**
     * Restores original cursor style for the element.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     */
    restoreCursorDownStyle(io: InteractionObject, pointer: IPointer): void;
    /**
     * Sets style on the body of the document.
     *
     * @ignore Exclude from docs
     * @param style  Style definitions
     */
    setGlobalStyle(style: Array<IStyleProperty> | IStyleProperty): void;
    /**
     * Restores style on the body of the document.
     *
     * @ignore Exclude from docs
     * @param style  Style definitions
     */
    restoreGlobalStyle(style: Array<IStyleProperty> | IStyleProperty): void;
    /**
     * Checks if element is a non-cahrt element.
     *
     * @param io  InteractionObject
     * @return Global element?
     */
    protected isGlobalElement(io: InteractionObject): boolean;
    /**
     * Checks if pointer has moved since it was created.
     *
     * @param pointer    Pointer
     * @param tolerance  Tolerance in pixels
     * @param minTime    Minimum time required for the pointer to be down to be considered moved
     * @return `true` if the pointer has moved
     */
    moved(pointer: IPointer, tolerance: number, minTime?: number): boolean;
    /**
     * Returns if pointer is "old", meaning it has been pressing for more than
     * X milliseconds.
     *
     * @ignore
     * @param pointer  Pointer
     * @param minTime  Minimum time to consider pointer old
     * @return {boolean}
     */
    old(pointer: IPointer, minTime?: number): boolean;
    /**
     * Returns total a shift in pointers coordinates between its original
     * position and now.
     *
     * @param pointer  Pointer
     * @return Shift in coordinates (x/y)
     */
    getShift(pointer: IPointer): IPoint;
    /**
     * Returns a point from [[Pointer]]'s move history at a certain timetamp.
     *
     * @param pointer    Pointer
     * @param timestamp  Timestamp
     * @return Point
     */
    getTrailPoint(pointer: IPointer, timestamp: number): $type.Optional<IBreadcrumb>;
    /**
     * Checks if same pointer already exists in the list.
     *
     * @param list     List to check agains
     * @param pointer  Pointer
     * @return Exists?
     */
    protected pointerExists(list: List<IPointer>, pointer: IPointer): boolean;
    /**
     * Returns an [[InteractionObject]] representation of a DOM element.
     *
     * You can use this on any HTML or SVG element, to add interactive features
     * to it.
     *
     * @param element  Element
     * @return InteractionObject
     */
    getInteraction(element: HTMLElement | SVGSVGElement): InteractionObject;
    /**
     * Sets a style property on an element. Stores original value to be restored
     * later with [[restoreStyle]].
     *
     * @see {@link restoreStyle}
     * @param io        Element
     * @param property  Property
     * @param value     Value
     */
    setTemporaryStyle(io: InteractionObject, property: string, value: string): void;
    /**
     * Restores specific style on an element.
     *
     * @param io        Element
     * @param property  Style property
     */
    restoreStyle(io: InteractionObject, property: string): void;
    /**
     * Restore temporarily reset styles on an element.
     *
     * @param io Element
     */
    restoreAllStyles(io: InteractionObject): void;
    /**
     * Disposes this object and cleans up after itself.
     */
    dispose(): void;
    private log;
    /**
     * Checks whether there are currently any objects being transformed (dragged
     * or resized).
     *
     * If `except` is set, that object will be ignored.
     *
     * @since 4.9.3
     * @param   except  Ignore this object(s)
     * @return          Objects are being transformed
     */
    areTransformed(except?: InteractionObject | InteractionObject[]): boolean;
    /**
     * Log.
     */
    private logTouch;
    /**
     * Indicates if passive mode options is supported by this browser.
     */
    private static _passiveSupported;
    /**
     * Indicates if passive mode options is supported by this browser.
     */
    static readonly passiveSupported: boolean;
}
/**
 * Returns a single unified global instance of [[Interaction]].
 *
 * All code should use this function, rather than create their own instances
 * of [[Interaction]].
 */
export declare function getInteraction(): Interaction;
