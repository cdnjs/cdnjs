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
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObjectEvents } from "../Base";
import { List } from "../utils/List";
import { Animation } from "../utils/Animation";
import { MultiDisposer } from "../utils/Disposer";
import { InteractionObject } from "./InteractionObject";
import { InteractionKeyboardObject } from "./InteractionKeyboardObject";
import { Dictionary } from "../utils/Dictionary";
import { Inertia } from "./Inertia";
import { addEventListener } from "../utils/DOM";
import { keyboard } from "../utils/Keyboard";
import { system } from "./../System";
import { options } from "./../Options";
import * as $ease from "../utils/Ease";
import * as $math from "../utils/Math";
import * as $array from "../utils/Array";
import * as $dom from "../utils/DOM";
import * as $iter from "../utils/Iterator";
import * as $type from "../utils/Type";
import * as $time from "../utils/Time";
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
var Interaction = /** @class */ (function (_super) {
    __extends(Interaction, _super);
    /**
     * Constructor. Sets up universal document-wide move events to handle stuff
     * outside particular chart container.
     */
    function Interaction() {
        var _this = 
        // Call super
        _super.call(this) || this;
        /**
         * An indicator of global events were already initialized.
         */
        _this._globalEventsAdded = false;
        /**
         * Holds which mouse event listeners to use.
         */
        _this._pointerEvents = {
            "pointerdown": "mousedown",
            "pointerup": "mouseup",
            "pointermove": "mousemove",
            "pointercancel": "mouseup",
            "pointerover": "mouseover",
            "pointerout": "mouseout",
            "wheel": "wheel"
        };
        /**
         * Indicates if Interaction should use only "pointer" type events, like
         * "pointermove", available in all modern browsers, ignoring "legacy"
         * events, like "touchmove".
         */
        _this._usePointerEventsOnly = false;
        /**
         * Use only touch events (for touch only devices such as tablets and phones)
         */
        _this._useTouchEventsOnly = false;
        /**
         * Add special hover events. Normally, touch device tap will also simulate
         * hover event. On some devices (ahem iOS) we want to prevent that so that
         * over/out events are not duplicated.
         */
        _this._addHoverEvents = true;
        /**
         * Indicates if passive mode options is supported by this browser.
         */
        _this._passiveSupported = false;
        /**
         * Holds list of delayed events
         */
        _this._delayedEvents = { out: [] };
        /**
         * List of objects that current have a pointer hovered over them.
         */
        _this.overObjects = new List();
        /**
         * List of objects that currently has a pressed pointer.
         */
        _this.downObjects = new List();
        /**
         * List of objects that need mouse position to be reported to them.
         */
        _this.trackedObjects = new List();
        /**
         * List of objects that are currently being dragged.
         */
        _this.transformedObjects = new List();
        /**
         * Holds all known pointers.
         */
        _this.pointers = new Dictionary();
        /**
         * Inertia options that need to be applied to after element drag, if it's
         * `inert = true`.
         *
         * This is just a default, which can and probably will be overridden by
         * actual elements.
         */
        _this.inertiaOptions = new Dictionary();
        /**
         * Default options for click events. These can be overridden in
         * [[InteractionObject]].
         */
        _this.hitOptions = {
            "doubleHitTime": 300,
            //"delayFirstHit": false,
            "hitTolerance": 10,
            "noFocus": true
        };
        /**
         * Default options for hover events. These can be overridden in
         * [[InteractionObject]].
         */
        _this.hoverOptions = {
            "touchOutBehavior": "leave",
            "touchOutDelay": 1000
        };
        /**
         * Default options for detecting a swipe gesture. These can be overridden in
         * [[InteractionObject]].
         */
        _this.swipeOptions = {
            "time": 500,
            "verticalThreshold": 75,
            "horizontalThreshold": 30
        };
        /**
         * Default options for keyboard operations. These can be overridden in
         * [[InteractionObject]].
         */
        _this.keyboardOptions = {
            "speed": 0.1,
            "accelleration": 1.2,
            "accellerationDelay": 2000
        };
        /**
         * Default options for keyboard operations. These can be overridden in
         * [[InteractionObject]].
         *
         * @since 4.5.14
         */
        _this.mouseOptions = {
            "sensitivity": 1
        };
        // Set class name
        _this.className = "Interaction";
        // Create InteractionObject for <body>
        _this.body = _this.getInteraction(document.body);
        _this._disposers.push(_this.body);
        // Detect browser capabilities and determine what event listeners to use
        if (window.hasOwnProperty("PointerEvent")) {
            // IE10+/Edge without touch controls enabled
            _this._pointerEvents.pointerdown = "pointerdown";
            _this._pointerEvents.pointerup = "pointerup";
            _this._pointerEvents.pointermove = "pointermove";
            _this._pointerEvents.pointercancel = "pointercancel";
            _this._pointerEvents.pointerover = "pointerover";
            _this._pointerEvents.pointerout = "pointerout";
            //this._usePointerEventsOnly = true;
        }
        else if (window.hasOwnProperty("MSPointerEvent")) {
            // IE9
            _this._pointerEvents.pointerdown = "MSPointerDown";
            _this._pointerEvents.pointerup = "MSPointerUp";
            _this._pointerEvents.pointermove = "MSPointerMove";
            _this._pointerEvents.pointercancel = "MSPointerUp";
            _this._pointerEvents.pointerover = "MSPointerOver";
            _this._pointerEvents.pointerout = "MSPointerOut";
            //this._usePointerEventsOnly = true;
        }
        else if ((typeof matchMedia !== "undefined") && matchMedia('(pointer:fine)').matches) {
            // This is only for Safari as it does not support PointerEvent
            // Do nothing and let it use regular `mouse*` events
            // Hi Apple ;)
            // Additionally disable hover events for iOS devices
            if ('ontouchstart' in window) {
                _this._addHoverEvents = false;
                _this._useTouchEventsOnly = true;
            }
        }
        else if (window.navigator.userAgent.match(/MSIE /)) {
            // Oh looky, an MSIE that does not support PointerEvent. Hi granpa IE9!
            _this._usePointerEventsOnly = true;
        }
        else if (_this.fullFF()) {
            // Old FF, let's use regular events.
            // (Newer FFs would be detected by the PointerEvent availability check)
            _this._usePointerEventsOnly = true;
        }
        else {
            // Uses defaults for normal browsers
            // We also assume that this must be a touch device that does not have
            // any pointer events
            _this._useTouchEventsOnly = true;
        }
        // Detect if device has a mouse
        // This is turning out to be not reliable
        // @todo remove
        /*if (!window.navigator.msPointerEnabled && (typeof matchMedia !== "undefined") && !matchMedia('(pointer:fine)').matches && !this.fullFF()) {
            this._useTouchEventsOnly = true;
        }*/
        // Detect proper mouse wheel events
        if ("onwheel" in document.createElement("div")) {
            // Modern browsers
            _this._pointerEvents.wheel = "wheel";
        }
        else if ($type.hasValue(document.onmousewheel)) {
            // Webkit and IE support at least "mousewheel"
            _this._pointerEvents.wheel = "mousewheel";
        }
        // Set up default inertia options
        _this.inertiaOptions.setKey("move", {
            "time": 100,
            "duration": 500,
            "factor": 1,
            "easing": $ease.polyOut3
        });
        _this.inertiaOptions.setKey("resize", {
            "time": 100,
            "duration": 500,
            "factor": 1,
            "easing": $ease.polyOut3
        });
        // Set the passive mode support
        _this._passiveSupported = Interaction.passiveSupported;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * This is a nasty detection for Firefox. The reason why we have is that
     * Firefox ESR version does not support matchMedia correctly.
     *
     * On iOS, Firefox uses different userAgent, so we don't have to detect iOS.
     *
     * @return Full Firefox?
     */
    Interaction.prototype.fullFF = function () {
        return (window.navigator.userAgent.match(/Firefox/)) && !(window.navigator.userAgent.match(/Android/));
    };
    Interaction.prototype.debug = function () { };
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
    Interaction.prototype.addGlobalEvents = function () {
        var _this = this;
        if (!this._globalEventsAdded) {
            if (!this._useTouchEventsOnly) {
                this._disposers.push(addEventListener(document, this._pointerEvents.pointerdown, function (ev) { _this.handleGlobalPointerDown(ev); }));
                this._disposers.push(addEventListener(document, this._pointerEvents.pointermove, function (ev) { _this.handleGlobalPointerMove(ev); }));
                this._disposers.push(addEventListener(document, this._pointerEvents.pointerup, function (ev) { _this.handleGlobalPointerUp(ev); }));
                this._disposers.push(addEventListener(document, this._pointerEvents.pointercancel, function (ev) { _this.handleGlobalPointerUp(ev, true); }));
                this._disposers.push(addEventListener(document, "mouseenter", function (ev) {
                    if (!$type.hasValue(ev.relatedTarget) && (ev.buttons == 0 || ev.which == 0)) {
                        _this.handleDocumentLeave(ev);
                    }
                }));
            }
            // No need to duplicate events for hubrid systems that support both
            // pointer events and touch events. Touch events are need only for
            // some touch-only systems, like Mobile Safari.
            if (!this._usePointerEventsOnly) {
                this._disposers.push(addEventListener(document, "touchstart", function (ev) { _this.handleGlobalTouchStart(ev); }));
                this._disposers.push(addEventListener(document, "touchmove", function (ev) { _this.handleGlobalTouchMove(ev); }));
                this._disposers.push(addEventListener(document, "touchend", function (ev) { _this.handleGlobalTouchEnd(ev); }));
            }
            this._disposers.push(addEventListener(document, "keydown", function (ev) { _this.handleGlobalKeyDown(ev); }));
            this._disposers.push(addEventListener(document, "keyup", function (ev) { _this.handleGlobalKeyUp(ev); }));
            this._globalEventsAdded = true;
        }
    };
    /**
     * Sets if [[InteractionObject]] is clickable.
     *
     * @ignore Exclude from docs
     * @param io [[InteractionObject]] instance
     */
    Interaction.prototype.processClickable = function (io) {
        // Add or remove touch events
        this.processTouchable(io);
    };
    /**
     * Sets if [[InteractionObject]] will display context menu when right-clicked.
     *
     * @ignore Exclude from docs
     * @param io [[InteractionObject]] instance
     */
    Interaction.prototype.processContextMenu = function (io) {
        if (io.contextMenuDisabled) {
            if (!io.eventDisposers.hasKey("contextMenuDisabled")) {
                io.eventDisposers.setKey("contextMenuDisabled", addEventListener(io.element, "contextmenu", function (e) {
                    e.preventDefault();
                }));
            }
        }
        else {
            if (io.eventDisposers.hasKey("contextMenuDisabled")) {
                io.eventDisposers.getKey("contextMenuDisabled").dispose();
            }
        }
    };
    /**
     * Sets if [[InteractionObject]] is hoverable.
     *
     * @ignore Exclude from docs
     * @param io [[InteractionObject]] instance
     */
    Interaction.prototype.processHoverable = function (io) {
        var _this = this;
        if (io.hoverable || io.trackable) {
            // Add global events
            this.addGlobalEvents();
            // Add hover styles
            this.applyCursorOverStyle(io);
            // Add local events
            if (!io.eventDisposers.hasKey("hoverable") && this._addHoverEvents) {
                io.eventDisposers.setKey("hoverable", new MultiDisposer([
                    addEventListener(io.element, this._pointerEvents.pointerout, function (e) { return _this.handlePointerOut(io, e); }),
                    addEventListener(io.element, this._pointerEvents.pointerover, function (e) { return _this.handlePointerOver(io, e); })
                ]));
            }
            if (io.trackable) {
                //sprite.addEventListener("touchmove", this.handleTouchMove, false, this);
            }
        }
        else {
            var disposer = io.eventDisposers.getKey("hoverable");
            if (disposer != null) {
                disposer.dispose();
                io.eventDisposers.removeKey("hoverable");
            }
        }
        // Add or remove touch events
        this.processTouchable(io);
    };
    /**
     * Sets up [[InteractionObject]] as movable. Movable can be any
     * transformation, e.g. drag, swipe, resize, track.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    Interaction.prototype.processMovable = function (io) {
        // Add unified events
        if (io.draggable || io.swipeable || io.trackable || io.resizable) {
            // Prep the element
            if (!this.isGlobalElement(io) && !io.isTouchProtected) {
                this.prepElement(io);
            }
            // Add hover styles
            this.applyCursorOverStyle(io);
        }
        // Add or remove touch events
        this.processTouchable(io);
    };
    /**
     * Checks if [[InteractionObject]] is trackable and sets relative events.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    Interaction.prototype.processTrackable = function (io) {
        this.processHoverable(io);
        this.processMovable(io);
        if (io.trackable) {
            this.trackedObjects.moveValue(io);
        }
        else {
            this.trackedObjects.removeValue(io);
        }
    };
    /**
     * Checks if [[InteractionObject]] is draggable.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    Interaction.prototype.processDraggable = function (io) {
        this.processMovable(io);
    };
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
    Interaction.prototype.processSwipeable = function (io) {
        this.processMovable(io);
    };
    /**
     * Checks if [[InteractionObject]] is resizable and attaches required events
     * to it.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    Interaction.prototype.processResizable = function (io) {
        this.processMovable(io);
    };
    /**
     * Checks if [[InteractionObject]] is supposed to capture mouse wheel events
     * and prepares it to catch those events.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    Interaction.prototype.processWheelable = function (io) {
        var _this = this;
        if (io.wheelable) {
            //io.hoverable = true;
            if (!io.eventDisposers.hasKey("wheelable")) {
                io.eventDisposers.setKey("wheelable", new MultiDisposer([
                    addEventListener(io.element, this._pointerEvents.wheel, function (e) { return _this.handleMouseWheel(io, e); }, this._passiveSupported ? { passive: false } : false),
                    io.events.on("out", function (e) {
                        if (io.wheelable) {
                            _this.unlockWheel();
                        }
                    }),
                    io.events.on("over", function (e) {
                        //console.log("whelab over")
                        if (io.wheelable) {
                            _this.lockWheel();
                        }
                    })
                ]));
            }
        }
        else {
            var disposer = io.eventDisposers.getKey("wheelable");
            if (disposer != null) {
                disposer.dispose();
                io.eventDisposers.removeKey("wheelable");
            }
        }
    };
    /**
     * Checks if [[InteractionObject]] is focusable. A focusable element is an
     * element that will be highlighted when users presses TAB key. If the
     * element is focusable, this function will attach relative focus/blur
     * events to it.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    Interaction.prototype.processFocusable = function (io) {
        var _this = this;
        if (io.focusable === true && (io.tabindex > -1) && !this._useTouchEventsOnly) {
            if (!io.eventDisposers.hasKey("focusable")) {
                io.eventDisposers.setKey("focusable", new MultiDisposer([
                    addEventListener(io.element, "focus", function (e) { return _this.handleFocus(io, e); }),
                    addEventListener(io.element, "blur", function (e) { return _this.handleBlur(io, e); }),
                    addEventListener(io.element, this._pointerEvents.pointerdown, function (e) { return _this.handleFocusBlur(io, e); }),
                    addEventListener(io.element, "touchstart", function (e) { return _this.handleFocusBlur(io, e); }, this._passiveSupported ? { passive: false } : false)
                ]));
            }
        }
        else {
            var disposer = io.eventDisposers.getKey("focusable");
            if (disposer != null) {
                disposer.dispose();
                io.eventDisposers.removeKey("focusable");
            }
        }
    };
    /**
     * Checks if [[InteractionObject]] is "touchable". It means any interaction
     * whatsoever: mouse click, touch screen tap, swipe, drag, resize, etc.
     *
     * @ignore Exclude from docs
     * @param io  Element
     */
    Interaction.prototype.processTouchable = function (io) {
        var _this = this;
        // Add unified events
        if (io.clickable || io.hoverable || io.trackable || io.draggable || io.swipeable || io.resizable) {
            // Add global events
            this.addGlobalEvents();
            // Add local events
            if (!io.eventDisposers.hasKey("touchable")) {
                if (!this._useTouchEventsOnly && !this._usePointerEventsOnly) {
                    io.eventDisposers.setKey("touchable", new MultiDisposer([
                        addEventListener(io.element, this._pointerEvents.pointerdown, function (e) { return _this.handlePointerDown(io, e); }),
                        addEventListener(io.element, "touchstart", function (e) { return _this.handleTouchDown(io, e); }, this._passiveSupported ? { passive: false } : false)
                    ]));
                }
                else if (!this._useTouchEventsOnly) {
                    io.eventDisposers.setKey("touchable", addEventListener(io.element, this._pointerEvents.pointerdown, function (e) { return _this.handlePointerDown(io, e); }));
                }
                else if (!this._usePointerEventsOnly) {
                    io.eventDisposers.setKey("touchable", addEventListener(io.element, "touchstart", function (e) { return _this.handleTouchDown(io, e); }, this._passiveSupported ? { passive: false } : false));
                }
            }
        }
        else {
            var disposer = io.eventDisposers.getKey("touchable");
            if (disposer != null) {
                disposer.dispose();
                io.eventDisposers.removeKey("touchable");
            }
        }
    };
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
    Interaction.prototype.handleFocus = function (io, ev) {
        if (!io.focusable) {
            ev.preventDefault();
            return;
        }
        io.isFocused = true;
        if (io.events.isEnabled("focus") && !system.isPaused) {
            var imev = {
                type: "focus",
                target: io,
                event: ev
            };
            io.events.dispatchImmediately("focus", imev);
        }
    };
    /**
     * Used by regular click events to prevent focus if "noFocus" is set.
     *
     * This should not be called by "focus" handlers.
     *
     * @param io  Element
     * @param ev  Original event
     */
    Interaction.prototype.handleFocusBlur = function (io, ev) {
        if (io.focusable !== false && this.getHitOption(io, "noFocus")) {
            io.events.once("focus", function () {
                io.events.disableType("blur");
                $dom.blur();
                if (io.sprite) {
                    io.sprite.handleBlur();
                }
                io.events.enableType("blur");
            });
        }
    };
    /**
     * Dispatches "blur" event when element loses focus.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    Interaction.prototype.handleBlur = function (io, ev) {
        if (!io.focusable) {
            ev.preventDefault();
            return;
        }
        io.isFocused = false;
        if (io.events.isEnabled("blur") && !system.isPaused) {
            var imev = {
                type: "blur",
                target: io,
                event: ev
            };
            io.events.dispatchImmediately("blur", imev);
        }
    };
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
    Interaction.prototype.handleGlobalKeyDown = function (ev) {
        if (this.focusedObject) {
            if (keyboard.isKey(ev, "esc")) {
                // ESC removes focus
                $dom.blur();
            }
            else if (this.focusedObject.draggable && keyboard.isKey(ev, ["up", "down", "left", "right"])) {
                // Prevent scrolling of the document
                ev.preventDefault();
                // Get focused object
                var io = this.focusedObject;
                // Get particular key
                var disposerKey = "interactionKeyboardObject";
                // If such disposer already exists we know the event is going on so we
                // just move on
                if (io.eventDisposers.hasKey(disposerKey)) {
                    return;
                }
                // Create a keyboard mover
                var ko = new InteractionKeyboardObject(io, ev);
                io.eventDisposers.setKey(disposerKey, ko);
                switch (keyboard.getEventKey(ev)) {
                    case "up":
                        ko.directionY = -1;
                        break;
                    case "down":
                        ko.directionY = 1;
                        break;
                    case "left":
                        ko.directionX = -1;
                        break;
                    case "right":
                        ko.directionX = 1;
                        break;
                }
            }
        }
    };
    /**
     * Dispatches related events when the keyboard key is realeasd.
     *
     * @ignore Exclude from docs
     * @param ev An original keyboard event
     */
    Interaction.prototype.handleGlobalKeyUp = function (ev) {
        var disposerKey = "interactionKeyboardObject";
        if (this.focusedObject) {
            var disposer = this.focusedObject.eventDisposers.getKey(disposerKey);
            if (disposer != null) {
                // Prevent scrolling of the document
                ev.preventDefault();
                // Dispose stuff
                disposer.dispose();
                this.focusedObject.eventDisposers.removeKey(disposerKey);
            }
            // Does focused object have "hit" event?
            var sprite = this.focusedObject.sprite;
            if (keyboard.isKey(ev, "enter") && sprite) {
                if (sprite.events.isEnabled("hit") || sprite.events.isEnabled("toggled")) {
                    this.focusedObject.dispatchImmediately("hit");
                }
                else if (sprite.showTooltipOn == "hit") {
                    this.focusedObject.dispatchImmediately("up");
                }
            }
        }
    };
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
    Interaction.prototype.handleGlobalPointerMove = function (ev) {
        // Get pointer
        var pointer = this.getPointer(ev);
        // Update current point position
        pointer.point = this.getPointerPoint(ev);
        // Prepare and fire global event
        if (this.events.isEnabled("track") && !system.isPaused) {
            var imev = {
                type: "track",
                target: this,
                event: ev,
                pointer: pointer,
                touch: pointer.touch
            };
            this.events.dispatchImmediately("track", imev);
        }
        // Track
        this.addBreadCrumb(pointer, pointer.point);
        // Process further
        this.handleGlobalMove(pointer, ev);
    };
    /**
     * Handler for a global "pointerdown" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    Interaction.prototype.handleGlobalPointerDown = function (ev) {
        // Remove delayed hovers
        this.processDelayed();
        // Get pointer
        var pointer = this.getPointer(ev);
        // Prepare and fire global event
        if (this.events.isEnabled("down") && !system.isPaused) {
            var imev = {
                type: "down",
                target: this,
                event: ev,
                pointer: pointer,
                touch: pointer.touch
            };
            this.events.dispatchImmediately("down", imev);
        }
    };
    /**
     * Prevents touch action from firing.
     *
     * @ignore Exclude from docs
     * @param ev Event
     */
    Interaction.prototype.preventTouchAction = function (ev) {
        if (!ev.defaultPrevented) {
            ev.preventDefault();
        }
    };
    /**
     * Handler for a global "pointerup" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    Interaction.prototype.handleGlobalPointerUp = function (ev, cancelled) {
        if (cancelled === void 0) { cancelled = false; }
        // Get pointer
        var pointer = this.getPointer(ev);
        // Prepare and fire global event
        if (this.events.isEnabled("up") && !system.isPaused) {
            var imev = {
                type: "up",
                target: this,
                event: ev,
                pointer: pointer,
                touch: pointer.touch
            };
            this.events.dispatchImmediately("up", imev);
        }
        // Process further
        this.handleGlobalUp(pointer, ev, cancelled);
    };
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
    Interaction.prototype.handleGlobalTouchMove = function (ev) {
        // Process each changed touch point
        for (var i = 0; i < ev.changedTouches.length; i++) {
            // Get pointer
            var pointer = this.getPointer(ev.changedTouches[i]);
            // Update current point position
            pointer.point = this.getPointerPoint(ev.changedTouches[i]);
            // Prepare and fire global event
            if (this.events.isEnabled("track") && !system.isPaused) {
                var imev = {
                    type: "track",
                    target: this,
                    event: ev,
                    pointer: pointer,
                    touch: pointer.touch
                };
                this.events.dispatchImmediately("track", imev);
            }
            // Track
            this.addBreadCrumb(pointer, pointer.point);
            // Process further
            this.handleGlobalMove(pointer, ev);
        }
    };
    /**
     * Handler for a global "touchstart" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    Interaction.prototype.handleGlobalTouchStart = function (ev) {
        // Remove delayed hovers
        this.processDelayed();
        // Process each changed touch point
        for (var i = 0; i < ev.changedTouches.length; i++) {
            // Get pointer
            var pointer = this.getPointer(ev.changedTouches[i]);
            // Prepare and fire global event
            if (!this._usePointerEventsOnly && this.events.isEnabled("down") && !system.isPaused) {
                var imev = {
                    type: "down",
                    target: this,
                    event: ev,
                    pointer: pointer,
                    touch: pointer.touch
                };
                this.events.dispatchImmediately("down", imev);
            }
        }
    };
    /**
     * Handler for a global "touchend" event.
     *
     * @ignore Exclude from docs
     * @param ev Event object
     */
    Interaction.prototype.handleGlobalTouchEnd = function (ev) {
        // Process each changed touch point
        for (var i = 0; i < ev.changedTouches.length; i++) {
            // Get pointer
            var pointer = this.getPointer(ev.changedTouches[i]);
            // Prepare and fire global event
            if (this.events.isEnabled("up") && !system.isPaused) {
                var imev = {
                    type: "up",
                    target: this,
                    event: ev,
                    pointer: pointer,
                    touch: pointer.touch
                };
                this.events.dispatchImmediately("up", imev);
            }
            // Handle element-related events
            this.handleGlobalUp(pointer, ev);
        }
    };
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
    Interaction.prototype.handlePointerDown = function (io, ev) {
        // Stop further propagation so we don't get multiple triggers on hybrid
        // devices (both mouse and touch capabilities)
        //ev.preventDefault();
        //ev.stopPropagation();
        //if (ev.defaultPrevented) {
        //}
        // Get pointer
        var pointer = this.getPointer(ev);
        // Ignore if it's anything but mouse's primary button
        if (!pointer.touch && ev.which != 1 && ev.which != 3) {
            return;
        }
        // Set mouse button
        pointer.button = ev.which;
        // Reset pointer
        this.resetPointer(pointer, ev);
        // Process down
        this.handleDown(io, pointer, ev);
    };
    /**
     * Handles event when [[InteractionObject]] is hovered by a mouse pointer.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    Interaction.prototype.handlePointerOver = function (io, ev) {
        // Get pointer
        var pointer = this.getPointer(ev);
        // Process down
        this.handleOver(io, pointer, ev);
    };
    /**
     * Handles event when [[InteractionObject]] loses hover from a mouse pointer.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    Interaction.prototype.handlePointerOut = function (io, ev) {
        // Get pointer
        var pointer = this.getPointer(ev);
        // Process down
        this.handleOut(io, pointer, ev);
    };
    /**
     * Handles event when mouse wheel is crolled over the [[InteractionObject]].
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     * @todo Investigate more-cross browser stuff https://developer.mozilla.org/en-US/docs/Web/Events/wheel
     */
    Interaction.prototype.handleMouseWheel = function (io, ev) {
        // Get pointer
        var pointer = this.getPointer(ev);
        // Update current point position
        pointer.point = this.getPointerPoint(ev);
        // Init delta values
        var deltaX = 0, deltaY = 0;
        // Set up modifier
        // This is needed because FireFox reports wheel deltas in "lines" instead
        // of pixels so we have to approximate pixel value
        var mod = 1;
        if (ev.deltaMode == 1) {
            mod = 50;
        }
        // Adjust configurable sensitivity
        mod *= this.getMouseOption(io, "sensitivity");
        // Calculate deltas
        if (ev instanceof WheelEvent) {
            deltaX = Math.round((-1 * ev.wheelDeltaX) || (ev.deltaX * mod));
            deltaY = Math.round((-1 * ev.wheelDeltaY) || (ev.deltaY * mod));
        }
        else {
            throw new Error("Invalid event type");
        }
        // Handle the event
        this.handleWheel(io, pointer, deltaX, deltaY, ev);
    };
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
    Interaction.prototype.handleTouchDown = function (io, ev) {
        // Stop further propagation so we don't get multiple triggers on hybrid
        // devices (both mouse and touch capabilities)
        //this.maybePreventDefault(io, ev);
        //return;
        // Process each changed touch point
        for (var i = 0; i < ev.changedTouches.length; i++) {
            // Get pointer
            var pointer = this.getPointer(ev.changedTouches[i]);
            this.maybePreventDefault(io, ev, pointer);
            // Reset pointer
            this.resetPointer(pointer, ev.changedTouches[i]);
            // Process down
            this.handleDown(io, pointer, ev);
        }
    };
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
    Interaction.prototype.handleHit = function (io, pointer, ev) {
        // Check if this is a double-hit
        var now = $time.getTime();
        if (io.lastHit && (io.lastHit >= (now - this.getHitOption(io, "doubleHitTime")))) {
            // Yup - it's a double-hit
            // Cancel the hit
            //clearTimeout(io.lastHitPointer.hitTimeout);
            // If it happened too fast it probably means that hybrid device just
            // generated two events for the same tap
            if ((now - io.lastHit) < 100) {
                // Ignore
                return;
            }
            // Clear last hit
            io.lastHit = undefined;
            io.lastHitPointer = undefined;
            // Dispatch event
            if (io.events.isEnabled("doublehit") && !system.isPaused) {
                var imev = {
                    type: "doublehit",
                    target: io,
                    point: pointer.point,
                    event: ev,
                    touch: pointer.touch
                };
                io.events.dispatchImmediately("doublehit", imev);
            }
        }
        else {
            // Log last hit
            io.lastHit = now;
            io.lastHitPointer = pointer;
            if (pointer.button === 3) {
                // Execute HIT now
                if (io.events.isEnabled("rightclick") && !system.isPaused) {
                    var imev = {
                        type: "rightclick",
                        target: io,
                        event: ev
                    };
                    io.events.dispatchImmediately("rightclick", imev);
                }
            }
            else {
                if (io.events.isEnabled("hit") && !system.isPaused) {
                    var imev = {
                        type: "hit",
                        target: io,
                        event: ev,
                        point: pointer.point,
                        touch: pointer.touch
                    };
                    io.events.dispatchImmediately("hit", imev);
                }
            }
        }
    };
    /**
     * Handles pointer hovering over [[InteractionObject]].
     *
     * @ignore Exclude from docs
     * @param io       Interaction object
     * @param pointer  Pointer
     * @param ev       Original event
     * @param soft     Invoked by helper function
     */
    Interaction.prototype.handleOver = function (io, pointer, ev, soft) {
        if (soft === void 0) { soft = false; }
        if (!io.hoverable) {
            return;
        }
        var hoversPaused = false;
        if (this.shouldCancelHovers(pointer) && this.areTransformed() && this.moved(pointer, this.getHitOption(io, "hitTolerance"))) {
            hoversPaused = true;
            this.cancelAllHovers(ev);
        }
        // Remove any delayed outs
        this.processDelayed();
        // Add pointer
        io.overPointers.moveValue(pointer);
        // Check if object is not yet hovered
        if (!io.isRealHover) {
            // Set element as hovered
            if (!hoversPaused) {
                io.isHover = true;
                io.isRealHover = true;
                this.overObjects.moveValue(io);
            }
            // Generate body track event. This is needed so that if element loads
            // under unmoved mouse cursor, we still need all the actions that are
            // required to happen to kick in.
            this.handleTrack(this.body, pointer, ev, true);
            // Event
            if (io.events.isEnabled("over") && !system.isPaused && !hoversPaused) {
                var imev = {
                    type: "over",
                    target: io,
                    event: ev,
                    pointer: pointer,
                    touch: pointer.touch
                };
                io.events.dispatchImmediately("over", imev);
            }
        }
    };
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
    Interaction.prototype.handleOut = function (io, pointer, ev, soft, force) {
        var _this = this;
        if (soft === void 0) { soft = false; }
        if (force === void 0) { force = false; }
        if (!io.hoverable) {
            return;
        }
        // Remove pointer
        io.overPointers.removeValue(pointer);
        // Check if element is still hovered
        if (io.isHover && (!io.hasDelayedOut || force)) {
            // Should we run additional checks?
            if (soft && io.overPointers.length) {
                // There are still pointers hovering - don't do anything else and
                // wait until either no over pointers are there or we get a hard out
                // event.
                return;
            }
            // Should we delay "out" if this is happening on a touch device?
            if (pointer && pointer.touch && !force && !this.old(pointer)) {
                // This is a touch pointer, and it hasn't moved, let's pretend
                // the object is still hovered, and act as per "behavior" setting
                var behavior = this.getHoverOption(io, "touchOutBehavior");
                if (behavior == "leave") {
                    // Set to "leave", so we do not execute any "out" event.
                    // It will be handled by any other interaction that happens
                    // afterwards.
                    this._delayedEvents.out.push({
                        type: "out",
                        io: io,
                        pointer: pointer,
                        event: ev,
                        keepUntil: $time.getTime() + 500
                    });
                    io.hasDelayedOut = true;
                    return;
                }
                else if (behavior == "delay" && this.getHoverOption(io, "touchOutDelay")) {
                    this._delayedEvents.out.push({
                        type: "out",
                        io: io,
                        pointer: pointer,
                        event: ev,
                        keepUntil: $time.getTime() + 500,
                        timeout: this.setTimeout(function () {
                            _this.handleOut(io, pointer, ev, true);
                        }, this.getHoverOption(io, "touchOutDelay"))
                    });
                    return;
                }
                else {
                    // Nothing for "remove" - that's how it works "out-of-the-box"
                }
            }
            // Set element as not hovered
            io.isHover = false;
            this.overObjects.removeValue(io);
            // Invoke event
            if (!io.isDisposed() && io.events.isEnabled("out") && !system.isPaused) {
                var imev = {
                    type: "out",
                    target: io,
                    event: ev,
                    pointer: pointer,
                    touch: pointer.touch
                };
                io.events.dispatchImmediately("out", imev);
            }
            // Reset object from lefover delayed outs, pointers
            io.overPointers.clear();
            io.hasDelayedOut = false;
            // @todo (clean delayed)
        }
    };
    /**
     * Processes dalyed events, such as "out" event that was initiated for
     * elements by touch.
     */
    Interaction.prototype.processDelayed = function () {
        var delayedEvent;
        while (true) {
            delayedEvent = this._delayedEvents.out.pop();
            if (!delayedEvent) {
                break;
            }
            if (delayedEvent.timeout) {
                delayedEvent.timeout.dispose();
            }
            this.handleOut(delayedEvent.io, delayedEvent.pointer, delayedEvent.event, false, true);
        }
    };
    /**
     * Performs tasks on pointer down.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    Interaction.prototype.handleDown = function (io, pointer, ev) {
        // Need to prevent default event from happening on transformable objects
        this.maybePreventDefault(io, ev, pointer);
        // Stop inertia animations if they're currently being played out
        if (io.inert) {
            this.stopInertia(io);
        }
        // Trigger hover because some touch devices won't trigger over events
        // on their own
        this.handleOver(io, pointer, ev, true);
        // Add pointer to list
        io.downPointers.moveValue(pointer);
        // Apply styles if necessary
        this.applyCursorDownStyle(io, pointer);
        // Check if object is already down
        if (!io.isDown) {
            // Lose focus if needed
            if (io.focusable !== false && this.getHitOption(io, "noFocus") && this.focusedObject) {
                $dom.blur();
            }
            // Set object as hovered
            io.isDown = true;
            this.downObjects.moveValue(io);
            // Prep object for dragging and/or resizing
            if (io.draggable) {
                this.processDragStart(io, pointer, ev);
            }
            if (io.resizable) {
                this.processResizeStart(io, pointer, ev);
            }
        }
        // Dispatch "down" event
        if (io.events.isEnabled("down") && !system.isPaused) {
            var imev = {
                type: "down",
                target: io,
                event: ev,
                pointer: pointer,
                touch: pointer.touch
            };
            io.events.dispatchImmediately("down", imev);
        }
    };
    /**
     * Performs tasks on pointer up.
     *
     * @ignore Exclude from docs
     * @param pointer  Pointer
     * @param ev       Original event
     */
    Interaction.prototype.handleGlobalUp = function (pointer, ev, cancelled) {
        var _this = this;
        if (cancelled === void 0) { cancelled = false; }
        var sorted = this.downObjects.values.slice();
        sorted.sort(function (x, y) {
            if (x && y) {
                var pos = x.element.compareDocumentPosition(y.element);
                if (pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                    return 1;
                }
                else if (pos & Node.DOCUMENT_POSITION_CONTAINS) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
            else {
                return 0;
            }
        });
        // Process all down objects
        $array.each(sorted, function (io) {
            // Check if this particular pointer is pressing down
            // on object
            if (io && io.downPointers.contains(pointer)) {
                _this.handleUp(io, pointer, ev, cancelled);
            }
        });
    };
    /**
     * Simulates all pointers being up once mouse leaves document area.
     *
     * @ignore Exclude from docs
     * @param ev       Original event
     */
    Interaction.prototype.handleDocumentLeave = function (ev) {
        var _this = this;
        // Process all down objects
        $iter.each(this.downObjects.backwards().iterator(), function (io) {
            io.downPointers.each(function (pointer) {
                _this.handleUp(io, pointer, ev);
            });
        });
    };
    /**
     * Handles when [[InteractionObject]] is no longer hovered.
     *
     * @ignore Exclude from docs
     * @param io       Interaction object
     * @param pointer  Pointer
     * @param ev       Original event
     */
    Interaction.prototype.handleUp = function (io, pointer, ev, cancelled) {
        if (cancelled === void 0) { cancelled = false; }
        // Restore cursor style
        this.restoreCursorDownStyle(io, pointer);
        // Remove pointer from the list
        io.downPointers.removeValue(pointer);
        // Trigger out because some touch devices won't trigger out events
        // on their own
        if ((pointer && pointer.touch) || this._useTouchEventsOnly) {
            this.handleOut(io, pointer, ev, true);
        }
        // Check if object still down
        if (io.isDown) {
            // Check if there are no other pointers hovering this element
            if (io.downPointers.length == 0) {
                // Set element as no longer down
                io.isDown = false;
                this.downObjects.removeValue(io);
            }
            // Dispatch "up" event
            if (io.events.isEnabled("up") && !system.isPaused && pointer) {
                var imev = {
                    type: "up",
                    target: io,
                    event: ev,
                    pointer: pointer,
                    touch: pointer.touch
                };
                io.events.dispatchImmediately("up", imev);
            }
            // Check if this was not a cancelled event.
            // If event was canelled (which might happen if gesture resulted in
            // navigation or page scroll) there's no point in triggering hit and
            // other actions.
            if (!cancelled) {
                // Handle swiping-related stuff
                if (io.swipeable && this.swiped(io, pointer)) {
                    // Swiped - nothing else should happen
                    this.handleSwipe(io, pointer, ev);
                }
                else {
                    // Check if it maybe a click
                    if (io.clickable && !this.moved(pointer, this.getHitOption(io, "hitTolerance"))) {
                        this.handleHit(io, pointer, ev);
                    }
                    // Handle inertia
                    if (io.inert && this.moved(pointer, this.getHitOption(io, "hitTolerance"))) {
                        this.handleInertia(io, pointer);
                    }
                    else if (io.draggable) {
                        this.processDragStop(io, pointer, ev);
                    }
                    if (io.resizable) {
                        this.processResizeStop(io, pointer, ev);
                    }
                }
            }
        }
    };
    /**
     * Checks if event needs to be prevented on draggable and such items, so that
     * touch gestures like navigation and scroll do not kick in.
     *
     * @param io  Object
     * @param ev  Event
     */
    Interaction.prototype.maybePreventDefault = function (io, ev, pointer) {
        if ($type.hasValue(ev)
            && (io.draggable || io.swipeable || io.trackable || io.resizable)
            && !this.isGlobalElement(io)
            && ev.cancelable !== false
            && (!io.isTouchProtected || !pointer || !pointer.touch)) {
            ev.preventDefault();
        }
    };
    /**
     * Cancels all hovers on all currently hovered objects.
     *
     * @param  pointer  Pointer
     * @param  ev       Event
     */
    Interaction.prototype.cancelAllHovers = function (ev) {
        var _this = this;
        //this.overObjects.each((io) => {
        $iter.each(this.overObjects.backwards().iterator(), function (io) {
            if (io) {
                var pointer = io.overPointers.getIndex(0);
                _this.handleOut(io, pointer, ev, true, true);
            }
        });
    };
    /**
     * Checks if hovers should be cancelled on transform as per global options.
     * @param   pointer  Pointer
     * @return           Cancel?
     */
    Interaction.prototype.shouldCancelHovers = function (pointer) {
        return options.disableHoverOnTransform == "always" || (options.disableHoverOnTransform == "touch" && pointer.touch);
    };
    /**
     * Handles pointer move.
     *
     * @ignore Exclude from docs
     * @param pointer  Pointer
     * @param ev       Original event
     */
    Interaction.prototype.handleGlobalMove = function (pointer, ev) {
        var _this = this;
        // Process hovered elements
        // We check if the element became unhovered without reporting the mouseout
        // event. (it happens in some cases)
        if (!pointer.touch) {
            var target_1 = $dom.eventTarget(pointer.lastEvent);
            $iter.each(this.overObjects.backwards().iterator(), function (io) {
                // Is this pointer relevant to element?
                if (io && io.overPointers.contains(pointer) && io.hoverable) {
                    // Check if the element is still hovered
                    var reset = false;
                    if (io.element && pointer.lastEvent) {
                        if (!$dom.contains(io.element, target_1)) {
                            reset = true;
                        }
                    }
                    else {
                        reset = true;
                    }
                    if (reset) {
                        _this.handleOut(io, pointer, ev, true);
                    }
                }
            });
        }
        // Process down elements
        $iter.each(this.transformedObjects.backwards().iterator(), function (io) {
            // Is this pointer relevant to element?
            if (io.downPointers.contains(pointer) &&
                // Swipe still happening?
                !(io.swipeable && _this.swiping(io, pointer)) &&
                (io.draggable || io.resizable)) {
                _this.handleTransform(io, ev);
            }
        });
        // Process tracked elements
        $iter.each(this.trackedObjects.backwards().iterator(), function (io) {
            // Is this pointer relevant to element?
            if (!io.overPointers.contains(pointer)) {
                _this.handleTrack(io, pointer, ev);
            }
        });
    };
    /**
     * Handles reporting of pointer movement.
     *
     * @ignore Exclude from docs
     * @param io        Element
     * @param pointer    Pointer
     * @param ev         Original event
     * @param skipCheck  Sould we skip check if cursor actually moved
     */
    Interaction.prototype.handleTrack = function (io, pointer, ev, skipCheck) {
        if (skipCheck === void 0) { skipCheck = false; }
        // Do nothing if the cursor did not actually move
        if (!skipCheck && !this.moved(pointer, 0)) {
            return;
        }
        // Initiate TRACK event
        if (io.events.isEnabled("track") && !system.isPaused) {
            var imev = {
                type: "track",
                target: io,
                event: ev,
                point: pointer.point,
                pointer: pointer,
                touch: pointer.touch
            };
            io.events.dispatchImmediately("track", imev);
        }
    };
    /**
     * Handles swipe action.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    Interaction.prototype.handleSwipe = function (io, pointer, ev) {
        // We pass in InteractionEvent with shift in mouse coordinates
        // between when the drag started and ended
        if (io.events.isEnabled("swipe") && !system.isPaused) {
            var imev = {
                type: "swipe",
                target: io,
                event: ev,
                touch: pointer.touch
            };
            io.events.dispatchImmediately("swipe", imev);
        }
        if (pointer.startPoint.x < pointer.point.x) {
            if (io.events.isEnabled("swiperight") && !system.isPaused) {
                var imev = {
                    type: "swiperight",
                    target: io,
                    event: ev,
                    touch: pointer.touch
                };
                io.events.dispatchImmediately("swiperight", imev);
            }
        }
        else {
            if (io.events.isEnabled("swipeleft") && !system.isPaused) {
                var imev = {
                    type: "swipeleft",
                    target: io,
                    event: ev,
                    touch: pointer.touch
                };
                io.events.dispatchImmediately("swipeleft", imev);
            }
        }
    };
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
    Interaction.prototype.handleWheel = function (io, pointer, deltaX, deltaY, ev) {
        var shift = {
            x: deltaX,
            y: deltaY
        };
        // Trigger generic WHEEL event
        if (io.events.isEnabled("wheel") && !system.isPaused) {
            io.events.dispatchImmediately("wheel", {
                type: "wheel",
                target: io,
                event: ev,
                point: pointer.point,
                shift: shift
            });
        }
        // Trigger direction-specific events
        // Horizontal
        if (deltaX < 0) {
            if (io.events.isEnabled("wheelleft") && !system.isPaused) {
                io.events.dispatchImmediately("wheelleft", {
                    type: "wheelleft",
                    target: io,
                    event: ev,
                    point: pointer.point,
                    shift: shift
                });
            }
        }
        else if (deltaX > 0) {
            if (io.events.isEnabled("swiperight") && !system.isPaused) {
                io.events.dispatchImmediately("wheelright", {
                    type: "wheelright",
                    target: io,
                    event: ev,
                    point: pointer.point,
                    shift: shift
                });
            }
            // Vertical
        }
        else if (deltaY < 0) {
            if (io.events.isEnabled("wheelup") && !system.isPaused) {
                io.events.dispatchImmediately("wheelup", {
                    type: "wheelup",
                    target: io,
                    event: ev,
                    point: pointer.point,
                    shift: shift
                });
            }
        }
        else if (deltaY > 0) {
            if (io.events.isEnabled("wheeldown") && !system.isPaused) {
                io.events.dispatchImmediately("wheeldown", {
                    type: "wheeldown",
                    target: io,
                    event: ev,
                    point: pointer.point,
                    shift: shift
                });
            }
        }
    };
    /**
     * Initiates inertia checking sub-routines for different movement types:
     * drag, resize.
     *
     * @ignore Exclude from docs
     * @param sprite
     * @param pointer
     */
    Interaction.prototype.handleInertia = function (io, pointer) {
        if (io.draggable && io.downPointers.length === 0) {
            this.handleMoveInertia(io, pointer);
        }
        if (io.resizable && io.downPointers.length > 1) {
            this.handleResizeInertia(io, pointer);
        }
    };
    /**
     * Continues moving the element to simulate the effect of inertia. Happens
     * when `inert` and `draggable` object is dragged and then released.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     */
    Interaction.prototype.handleMoveInertia = function (io, pointer) {
        var interaction = io;
        var type = "move";
        var point = {
            "x": pointer.point.x,
            "y": pointer.point.y
        };
        var startPoint = {
            "x": pointer.startPoint.x,
            "y": pointer.startPoint.y
        };
        // Init inertia object
        var inertia = new Inertia(interaction, type, point, startPoint);
        // Get inertia data
        var ref = this.getTrailPoint(pointer, $time.getTime() - this.getInertiaOption(io, "move", "time"));
        if (typeof ref === "undefined") {
            this.processDragStop(io, pointer, pointer.lastUpEvent);
            return;
        }
        // Init animation options
        var factor = this.getInertiaOption(io, "move", "factor");
        var animationOptions = [{
                "to": pointer.point.x + (pointer.point.x - ref.point.x) * factor,
                "property": "x"
            }, {
                "to": pointer.point.y + (pointer.point.y - ref.point.y) * factor,
                "property": "y"
            }];
        // Start animation
        var animation = new Animation(inertia, animationOptions, this.getInertiaOption(io, "move", "duration"), this.getInertiaOption(io, "move", "easing")).start();
        this._disposers.push(animation.events.on("animationended", function (ev) {
            inertia.done();
        }));
        // Add inertia object
        io.inertias.setKey("move", inertia);
    };
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
    Interaction.prototype.handleResizeInertia = function (io, pointer) {
        // Some day, folks. Some day...
    };
    /**
     * Recalculates element's position and size based on position of
     * all its related pointers.
     *
     * @ignore Exclude from docs
     * @param io  Element
     * @param ev  Original event
     */
    Interaction.prototype.handleTransform = function (io, ev) {
        // Get primary pointer and its respective points
        var pointer1 = io.downPointers.getIndex(0);
        var point1 = null;
        var startPoint1 = null;
        if (pointer1) {
            point1 = pointer1.point;
            startPoint1 = pointer1.startPoint;
        }
        // Init secondary pointer
        var pointer2;
        var point2;
        var startPoint2;
        // Use center of the sprite to simulate "second" point of touch
        point2 = {
            "x": io.originalPosition.x,
            "y": io.originalPosition.y
        };
        startPoint2 = point2;
        // Determine if it's a sinngle pointer or multi
        var singlePoint = true;
        for (var i = 1; i < io.downPointers.length; i++) {
            // Get pointer
            var nextPointer = io.downPointers.getIndex(i);
            // Doublecheck if it's not the same pointer by comparing original position
            if (startPoint1.x != nextPointer.startPoint.x && startPoint1.y != nextPointer.startPoint.y) {
                // Several pointers down
                singlePoint = false;
                // Get second pointer
                pointer2 = nextPointer;
                point2 = pointer2.point;
                startPoint2 = pointer2.startPoint;
                // Stop looking
                break;
            }
        }
        // Primary touch point moved?
        var pointer1Moved = pointer1 && this.moved(pointer1, 0);
        // Report DRAG_START if necessary
        if (io.draggable && pointer1 && pointer1.dragStartEvents && pointer1.dragStartEvents.length && pointer1Moved) {
            if (io.events.isEnabled("dragstart") && !system.isPaused) {
                io.events.dispatchImmediately("dragstart", pointer1.dragStartEvents.shift());
            }
            //delete pointer1.dragStartEvents;
        }
        // Determine what we do in order of superiority
        if (singlePoint && io.draggable) {
            // We have only one pointer and the Sprite is draggable
            // There's nothing else to be done - just move it
            this.handleTransformMove(io, point1, startPoint1, ev, pointer1Moved, pointer1.touch);
            if (this.shouldCancelHovers(pointer1) && this.moved(pointer1, this.getHitOption(io, "hitTolerance"))) {
                this.cancelAllHovers(ev);
            }
        }
        else {
            // Check if second touch point moved
            var pointer2Moved = pointer2 && this.moved(pointer2, 0);
            if ((this.shouldCancelHovers(pointer1) && this.moved(pointer1, this.getHitOption(io, "hitTolerance")))
                ||
                    (this.shouldCancelHovers(pointer2) && this.moved(pointer2, this.getHitOption(io, "hitTolerance")))) {
                this.cancelAllHovers(ev);
            }
            if (io.draggable && io.resizable) {
                //this.handleTransformAll(io, point1, startPoint1, point2, startPoint2, ev, pointer1Moved && pointer2Moved);
                this.handleTransformMove(io, point1, startPoint1, ev, pointer1Moved && pointer2Moved, pointer1.touch);
                this.handleTransformResize(io, point1, startPoint1, point2, startPoint2, ev, pointer1Moved && pointer2Moved, pointer1.touch);
            }
            else {
                if (io.draggable) {
                    this.handleTransformMove(io, point1, startPoint1, ev, pointer1Moved, pointer1.touch);
                }
                if (io.resizable && (!singlePoint || ev.ctrlKey)) {
                    this.handleTransformResize(io, point1, startPoint1, point2, startPoint2, ev, pointer1Moved && pointer2Moved, pointer1.touch);
                }
            }
        }
    };
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
    Interaction.prototype.handleTransformMove = function (io, point, startPoint, ev, pointerMoved, touch) {
        if (pointerMoved) {
            if (io.events.isEnabled("drag") && !system.isPaused && (!io.isTouchProtected || !touch)) {
                var imev = {
                    type: "drag",
                    target: io,
                    event: ev,
                    shift: {
                        "x": point.x - startPoint.x,
                        "y": point.y - startPoint.y
                    },
                    startPoint: startPoint,
                    point: point,
                    touch: touch
                };
                io.events.dispatchImmediately("drag", imev);
            }
        }
    };
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
    Interaction.prototype.handleTransformResize = function (io, point1, startPoint1, point2, startPoint2, ev, pointerMoved, touch) {
        if (io.events.isEnabled("resize") && !system.isPaused && (!io.isTouchProtected || !touch)) {
            var imev = {
                type: "resize",
                target: io,
                event: ev,
                scale: $math.getScale(point1, startPoint1, point2, startPoint2),
                startPoint1: startPoint1,
                point1: point1,
                startPoint2: startPoint2,
                point2: point2,
                touch: touch
            };
            io.events.dispatchImmediately("resize", imev);
        }
    };
    /**
     * Handles all the preparations of the element when it starts to be dragged.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    Interaction.prototype.processDragStart = function (io, pointer, ev) {
        // Add to draggedObjects
        this.transformedObjects.moveValue(io);
        if (this.shouldCancelHovers(pointer)) {
            this.cancelAllHovers(ev);
        }
        // Report "dragstart"
        var imev = {
            type: "dragstart",
            target: io,
            event: ev,
            touch: pointer ? pointer.touch : false
        };
        // Log object that we are starting to drag, so we can check against and
        // avoid hovers on other objects that might be in the path of movement.
        if (pointer) {
            pointer.dragTarget = io;
            //pointer.startPoint = pointer.point;
        }
        /**
         * If pointer is set we will not fire the event until the pointer has
         * actually moved. If it's not set we don't have to wait for anything, so we
         * just fire off the event right away.
         */
        if (pointer && pointer.dragStartEvents) {
            pointer.dragStartEvents.push(imev);
        }
        else {
            if (!system.isPaused) {
                io.dispatchImmediately("dragstart", imev);
            }
        }
    };
    /**
     * Finishes up element drag operation.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    Interaction.prototype.processDragStop = function (io, pointer, ev) {
        // Pointer set?
        if (!pointer) {
            pointer = this.getDragPointer(io);
        }
        // Unset drag object
        if (pointer) {
            pointer.dragTarget = undefined;
        }
        // Removed from transformedObjects
        this.transformedObjects.removeValue(io);
        // Unlock document
        //this.unlockDocument();
        // Report dragstop
        if (!pointer || this.moved(pointer, 0)) {
            if (io.events.isEnabled("dragstop") && !system.isPaused) {
                var imev = {
                    type: "dragstop",
                    target: io,
                    touch: pointer ? pointer.touch : false
                };
                io.events.dispatchImmediately("dragstop", imev);
            }
        }
    };
    /**
     * Handles all the preparations of the element when it starts to be resized.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    Interaction.prototype.processResizeStart = function (io, pointer, ev) {
        // Add to draggedObjects
        this.transformedObjects.moveValue(io);
    };
    /**
     * Finishes up element drag operation.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     * @param ev       Original event
     */
    Interaction.prototype.processResizeStop = function (io, pointer, ev) {
        // Removed from transformedObjects
        this.transformedObjects.removeValue(io);
    };
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
    Interaction.prototype.dragStart = function (io, pointer) {
        if (!pointer) {
            pointer = this.getDragPointer(io);
        }
        if (pointer) {
            this.handleDown(io, pointer, pointer.lastDownEvent);
        }
    };
    /**
     * Manually ends drag on the element.
     *
     * @param io       Element
     * @param pointer  Pointer
     */
    Interaction.prototype.dragStop = function (io, pointer, cancelled) {
        if (!pointer) {
            pointer = this.getDragPointer(io);
        }
        if (pointer && !cancelled) {
            this.handleGlobalUp(pointer, pointer.lastUpEvent, cancelled);
        }
    };
    /**
     * This method uses a fuzzy logic to find the pointer to be used for dragging.
     * Beware that this is not a rock-solid solution. If there are a few objects
     * being dragged at the same time, you may get unexepected results.
     *
     * @param io  InteractionObject to get pointers from
     * @return Pointer currently being used for dragging
     */
    Interaction.prototype.getDragPointer = function (io) {
        if (io) {
            // InteractionObject is supplied
            // Use it's first down pointer
            return io.downPointers.getIndex(0);
        }
        else if (this.transformedObjects.length) {
            // Use first dragged object
            return this.getDragPointer(this.transformedObjects.getIndex(0));
        }
        else {
            return undefined;
        }
    };
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
    Interaction.prototype.getPointerId = function (ev) {
        var id = "";
        if ($type.hasValue(ev.identifier)) {
            id = "" + ev.identifier;
        }
        else if ($type.hasValue(ev.pointerId)) {
            id = "" + ev.pointerId;
        }
        else {
            id = "m";
        }
        return id.replace("-", "");
    };
    /**
     * Returns a cursor position of the event.
     *
     * @param ev  Original event
     * @return Event point
     */
    Interaction.prototype.getPointerPoint = function (ev) {
        return {
            "x": ev.clientX,
            "y": ev.clientY
        };
    };
    /**
     * Returns [[Pointer]] object that is associated with the Event.
     *
     * If no such [[Pointer]] object exists, it is created.
     *
     * @param ev  Event
     * @return Pointer
     */
    Interaction.prototype.getPointer = function (ev) {
        // Get pointer id
        var id = this.getPointerId(ev);
        // Get current coordinates
        var point = this.getPointerPoint(ev);
        // Look for the pointer in the Dictionary if it maybe already exists
        var pointer;
        if (this.pointers.hasKey(id)) {
            // We already have such pointer
            pointer = this.pointers.getKey(id);
            // We need this, because Edge reuses pointer ids across touch and mouse
            pointer.touch = this.isPointerTouch(ev);
            // Reset pointer
            //pointer.point = point;
        }
        else {
            // Init pointer
            pointer = {
                "id": id,
                //"touch": !(ev instanceof MouseEvent) || ((<any>ev).pointerType && (<any>ev).pointerType != "pointer"),
                //"touch": !(ev instanceof MouseEvent) || ((<any>ev).pointerType && (<any>ev).pointerType != "mouse"),
                "touch": this.isPointerTouch(ev),
                "startPoint": point,
                "startTime": $time.getTime(),
                "point": point,
                "track": [],
                "swipeCanceled": false,
                "dragStartEvents": []
            };
            // Add first breadcrumb
            this.addBreadCrumb(pointer, point);
            // Add for re-use later
            this.pointers.setKey(id, pointer);
        }
        // Log last event
        pointer.lastEvent = ev;
        this.lastPointer = pointer;
        return pointer;
    };
    /**
     * Determines if pointer event originated from a touch pointer or mouse.
     *
     * @param ev  Original event
     * @return Touch pointer?
     */
    Interaction.prototype.isPointerTouch = function (ev) {
        if (typeof Touch !== "undefined" && ev instanceof Touch) {
            return true;
        }
        else if (typeof PointerEvent !== "undefined" && ev instanceof PointerEvent && $type.hasValue(ev.pointerType)) {
            switch (ev.pointerType) {
                case "touch":
                case "pen":
                case 2:
                    return true;
                case "mouse":
                case 4:
                    return false;
                default:
                    return !(ev instanceof MouseEvent);
            }
        }
        else if ($type.hasValue(ev.type)) {
            if (ev.type.match(/^mouse/)) {
                return false;
            }
        }
        return true;
    };
    /**
     * Resets the poiner to original state, i.e. cleans movement information,
     * starting point, etc.
     *
     * @param pointer Pointer
     */
    Interaction.prototype.resetPointer = function (pointer, ev) {
        // Get current coordinates
        var point = this.getPointerPoint(ev);
        ;
        pointer.startTime = $time.getTime();
        pointer.startPoint = { x: point.x, y: point.y };
        pointer.point = { x: point.x, y: point.y };
        pointer.track = [];
        pointer.swipeCanceled = false;
        //clearTimeout(pointer.swipeTimeout);
        //clearTimeout(pointer.holdTimeout);
    };
    /**
     * Adds a "breadcrumb" point to the [[Pointer]] to log its movement path.
     *
     * @param pointer  Pointer
     * @param point    Point coordinates
     */
    Interaction.prototype.addBreadCrumb = function (pointer, point) {
        pointer.track.push({
            "timestamp": $time.getTime(),
            "point": point
        });
    };
    /**
     * Prepares the document for various touch-related operations.
     *
     * @ignore Exclude from docs
     */
    Interaction.prototype.lockDocument = function () {
        this.prepElement(this.body);
    };
    /**
     * Restores document functionality.
     *
     * @ignore Exclude from docs
     */
    Interaction.prototype.unlockDocument = function () {
        if (this.transformedObjects.length == 0) {
            this.restoreAllStyles(this.body);
        }
    };
    /**
     * Lock element (disable all touch)
     *
     * @ignore Exclude from docs
     */
    Interaction.prototype.lockElement = function (io) {
        this.prepElement(io);
    };
    /**
     * Restores element's functionality.
     *
     * @ignore Exclude from docs
     */
    Interaction.prototype.unlockElement = function (io) {
        this.restoreAllStyles(io);
    };
    /**
     * Locks document's wheel scroll.
     *
     * @ignore Exclude from docs
     */
    Interaction.prototype.lockWheel = function () {
        window.addEventListener(this._pointerEvents.wheel, this.wheelLockEvent, this._passiveSupported ? { passive: false } : false);
    };
    /**
     * Unlocks document's wheel scroll.
     *
     * @ignore Exclude from docs
     */
    Interaction.prototype.unlockWheel = function () {
        window.removeEventListener(this._pointerEvents.wheel, this.wheelLockEvent);
    };
    /**
     * Checks if top element at pointer's position belongs to the SVG.
     *
     * @ignore Exlude from docs
     * @param pointer  Pointer
     * @param svg      The <svg> element
     * @param id       A unique identifier of the object that is checking for locality
     * @return Belongs to SVG
     */
    Interaction.prototype.isLocalElement = function (pointer, svg, id) {
        var cached = this.getCache("local_pointer_" + pointer.id);
        if ($type.hasValue(cached)) {
            return cached;
        }
        var doc = ($dom.getRoot(svg) || document);
        if (doc.elementFromPoint) {
            var target = doc.elementFromPoint(pointer.point.x, pointer.point.y);
            var local = target && $dom.contains(svg, target);
            this.setCache("local_pointer_" + pointer.id + "_" + id, local, 100);
            return local;
        }
        return false;
    };
    /**
     * A function that cancels mouse wheel scroll.
     *
     * @ignore Exclude from docs
     * @param ev  Event object
     * @return Returns `false` to cancel
     */
    Interaction.prototype.wheelLockEvent = function (ev) {
        ev.preventDefault();
        return false;
    };
    /**
     * Applies a set of styles to an element. Stores the original styles so they
     * can be restored later.
     *
     * @ignore
     * @param io      Element
     */
    Interaction.prototype.prepElement = function (io) {
        var el = io.element;
        if (el) {
            // Define possible props
            var props = [
                "touchAction", "webkitTouchAction", "MozTouchAction", "MSTouchAction", "msTouchAction", "oTouchAction",
                "userSelect", "webkitUserSelect", "MozUserSelect", "MSUserSelect", "msUserSelect", "oUserSelect",
                "touchSelect", "webkitTouchSelect", "MozTouchSelect", "MSTouchSelect", "msTouchSelect", "oTouchSelect",
                "touchCallout", "webkitTouchCallout", "MozTouchCallout", "MSTouchCallout", "msTouchCallout", "oTouchCallout",
                "contentZooming", "webkitContentZooming", "MozContentZooming", "MSContentZooming", "msContentZooming", "oContentZooming",
                "userDrag", "webkitUserDrag", "MozUserDrag", "MSUserDrag", "msUserDrag", "oUserDrag"
            ];
            for (var i = 0; i < props.length; i++) {
                if (props[i] in el.style) {
                    this.setTemporaryStyle(io, props[i], "none");
                }
            }
            // Remove iOS-specific selection;
            this.setTemporaryStyle(io, "tapHighlightColor", "rgba(0, 0, 0, 0)");
            //this.setTemporaryStyle(io, "webkitOverflowScrolling", "none");
        }
    };
    /**
     * Restores replaced styles
     *
     * @ignore
     * @param  io  Element
     */
    Interaction.prototype.unprepElement = function (io) {
        var el = io.element;
        if (el) {
            // Define possible props
            var props = [
                "touchAction", "webkitTouchAction", "MozTouchAction", "MSTouchAction", "msTouchAction", "oTouchAction",
                "userSelect", "webkitUserSelect", "MozUserSelect", "MSUserSelect", "msUserSelect", "oUserSelect",
                "touchSelect", "webkitTouchSelect", "MozTouchSelect", "MSTouchSelect", "msTouchSelect", "oTouchSelect",
                "touchCallout", "webkitTouchCallout", "MozTouchCallout", "MSTouchCallout", "msTouchCallout", "oTouchCallout",
                "contentZooming", "webkitContentZooming", "MozContentZooming", "MSContentZooming", "msContentZooming", "oContentZooming",
                "userDrag", "webkitUserDrag", "MozUserDrag", "MSUserDrag", "msUserDrag", "oUserDrag"
            ];
            for (var i = 0; i < props.length; i++) {
                if (props[i] in el.style) {
                    this.restoreStyle(io, props[i]);
                }
            }
            // Remove iOS-specific selection;
            this.restoreStyle(io, "tapHighlightColor");
            //this.restoreStyle(io, "webkitOverflowScrolling");
        }
    };
    /**
     * Returns an option associated with hit events.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    Interaction.prototype.getHitOption = function (io, option) {
        var res = io.hitOptions[option];
        if (typeof res === "undefined") {
            res = this.hitOptions[option];
        }
        return res;
    };
    /**
     * Returns an option associated with hover events.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    Interaction.prototype.getHoverOption = function (io, option) {
        var res = io.hoverOptions[option];
        if (typeof res === "undefined") {
            res = this.hoverOptions[option];
        }
        return res;
    };
    /**
     * Returns an option associated with swipe events.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    Interaction.prototype.getSwipeOption = function (io, option) {
        var res = io.swipeOptions[option];
        if (typeof res === "undefined") {
            res = this.swipeOptions[option];
        }
        return res;
    };
    /**
     * Returns an option for keyboard.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    Interaction.prototype.getKeyboardOption = function (io, option) {
        var res = io.keyboardOptions[option];
        if (typeof res === "undefined") {
            res = this.keyboardOptions[option];
        }
        return res;
    };
    /**
     * Returns an option for mouse.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param option  Option key
     * @return Option value
     */
    Interaction.prototype.getMouseOption = function (io, option) {
        var res = io.mouseOptions[option];
        if (typeof res === "undefined") {
            res = this.mouseOptions[option];
        }
        return res;
    };
    /**
     * Returns an option associated with inertia.
     *
     * @ignore Exclude from docs
     * @param io      Element
     * @param type    Inertia type
     * @param option  Option key
     * @return Option value
     */
    Interaction.prototype.getInertiaOption = function (io, type, option) {
        var options = io.inertiaOptions.getKey(type);
        var res;
        if (options && $type.hasValue(options[option])) {
            res = options[option];
        }
        else {
            res = this.inertiaOptions.getKey(type)[option];
        }
        return res;
    };
    /**
     * Stops currently going on inertia. Useful if inertia is currently being
     * animated and the object is being interacted with.
     *
     * @param io Element
     */
    Interaction.prototype.stopInertia = function (io) {
        var x;
        var inertias = ["move", "resize"];
        for (var i = 0; i < inertias.length; i++) {
            x = inertias[i];
            if (io.inertias.hasKey(x)) {
                var inertia = io.inertias.getKey(x);
                if (inertia) {
                    inertia.dispose();
                    //io.inertiaAnimations.removeKey(x);
                    //this.processDragStop(io);
                    continue;
                }
            }
        }
    };
    /**
     * Check if swiping is currently being performed on an object.
     *
     * @param io       Element
     * @param pointer  Pointer to check
     * @return `true` if swiping
     */
    Interaction.prototype.swiping = function (io, pointer) {
        var now = $time.getTime();
        if (pointer.swipeCanceled || !io.swipeable) {
            return false;
        }
        else if ((Math.abs(pointer.startPoint.y - pointer.point.y) < this.getSwipeOption(io, "verticalThreshold")) &&
            (pointer.startTime > (now - this.getSwipeOption(io, "time")))) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Returns `true` if a successfull swipe action was performed on an element.
     *
     * @param io       Element
     * @param pointer  Pointer
     * @return Swiped?
     */
    Interaction.prototype.swiped = function (io, pointer) {
        var now = $time.getTime();
        if (pointer.swipeCanceled) {
            return false;
        }
        else if ((Math.abs(pointer.startPoint.x - pointer.point.x) > this.getSwipeOption(io, "horizontalThreshold")) &&
            (Math.abs(pointer.startPoint.y - pointer.point.y) < this.getSwipeOption(io, "verticalThreshold")) &&
            (pointer.startTime > (now - this.getSwipeOption(io, "time")))) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Applies style to mouse cursor based on its stage in relation to
     * [[InteractionObject]].
     *
     * @ignore Exclude from docs
     * @param Element
     */
    Interaction.prototype.applyCursorOverStyle = function (io) {
        // Get sprite's cursor ooptions
        var options = io.cursorOptions;
        if (!$type.hasValue(options.overStyle)) {
            return;
        }
        // Apply cursor down styles
        for (var i = 0; i < options.overStyle.length; i++) {
            $dom.setStyle(io.element, options.overStyle[i].property, options.overStyle[i].value);
        }
    };
    /**
     * Applies style to mouse cursor based on its stage in relation to
     * [[InteractionObject]].
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     */
    Interaction.prototype.applyCursorDownStyle = function (io, pointer) {
        // Not applicable for touch pointers since they don't display a cursor
        if (pointer && pointer.touch) {
            return;
        }
        var downStyle = io.cursorOptions.downStyle;
        // Is down?
        if (io.downPointers.contains(pointer) && $type.hasValue(downStyle)) {
            // Apply cursor down styles
            for (var i = 0; i < downStyle.length; i++) {
                this.setTemporaryStyle(this.body, downStyle[i].property, downStyle[i].value);
                this.setTemporaryStyle(io, downStyle[i].property, downStyle[i].value);
            }
        }
    };
    /**
     * Restores original cursor style for the element.
     *
     * @ignore Exclude from docs
     * @param io       Element
     * @param pointer  Pointer
     */
    Interaction.prototype.restoreCursorDownStyle = function (io, pointer) {
        // Not applicable for touch pointers since they don't display a cursor
        if (pointer && pointer.touch) {
            return;
        }
        var downStyle = io.cursorOptions.downStyle;
        // Is down?
        if (io.downPointers.contains(pointer) && $type.hasValue(downStyle)) {
            // Apply cursor down styles
            for (var i = 0; i < downStyle.length; i++) {
                this.restoreStyle(this.body, downStyle[i].property);
                this.restoreStyle(io, downStyle[i].property);
            }
        }
    };
    /**
     * Sets style on the body of the document.
     *
     * @ignore Exclude from docs
     * @param style  Style definitions
     */
    Interaction.prototype.setGlobalStyle = function (style) {
        var body = getInteraction().body;
        var styles = ($type.isArray(style) ? style : [style]);
        for (var i = 0; i < styles.length; i++) {
            this.setTemporaryStyle(body, styles[i].property, styles[i].value);
        }
    };
    /**
     * Restores style on the body of the document.
     *
     * @ignore Exclude from docs
     * @param style  Style definitions
     */
    Interaction.prototype.restoreGlobalStyle = function (style) {
        var body = getInteraction().body;
        var styles = ($type.isArray(style) ? style : [style]);
        for (var i = 0; i < styles.length; i++) {
            this.restoreStyle(body, styles[i].property);
        }
    };
    /**
     * Checks if element is a non-cahrt element.
     *
     * @param io  InteractionObject
     * @return Global element?
     */
    Interaction.prototype.isGlobalElement = function (io) {
        return document.body === io.element;
    };
    /**
     * Checks if pointer has moved since it was created.
     *
     * @param pointer    Pointer
     * @param tolerance  Tolerance in pixels
     * @param minTime    Minimum time required for the pointer to be down to be considered moved
     * @return `true` if the pointer has moved
     */
    Interaction.prototype.moved = function (pointer, tolerance, minTime) {
        /*// If there was more time, we don't care if cursor actually moved
        let duration = $time.getTime() - pointer.startTime;
        if ($type.hasValue(minTime) && (minTime > duration)) {
            return false;
        }*/
        if (minTime === void 0) { minTime = 300; }
        // That was quick measure shift
        var shift = this.getShift(pointer);
        return (Math.abs(shift.x) > tolerance) || (Math.abs(shift.y) > tolerance);
    };
    /**
     * Returns if pointer is "old", meaning it has been pressing for more than
     * X milliseconds.
     *
     * @ignore
     * @param pointer  Pointer
     * @param minTime  Minimum time to consider pointer old
     * @return {boolean}
     */
    Interaction.prototype.old = function (pointer, minTime) {
        if (minTime === void 0) { minTime = 300; }
        return $time.getTime() - pointer.startTime > minTime;
    };
    /**
     * Returns total a shift in pointers coordinates between its original
     * position and now.
     *
     * @param pointer  Pointer
     * @return Shift in coordinates (x/y)
     */
    Interaction.prototype.getShift = function (pointer) {
        return {
            "x": pointer.startPoint.x - pointer.point.x,
            "y": pointer.startPoint.y - pointer.point.y
        };
    };
    /**
     * Returns a point from [[Pointer]]'s move history at a certain timetamp.
     *
     * @param pointer    Pointer
     * @param timestamp  Timestamp
     * @return Point
     */
    Interaction.prototype.getTrailPoint = function (pointer, timestamp) {
        var res;
        for (var i = 0; i < pointer.track.length; i++) {
            if (pointer.track[i].timestamp >= timestamp) {
                res = pointer.track[i];
                break;
            }
        }
        return res;
    };
    /**
     * Checks if same pointer already exists in the list.
     *
     * @param list     List to check agains
     * @param pointer  Pointer
     * @return Exists?
     */
    Interaction.prototype.pointerExists = function (list, pointer) {
        var exists = false;
        list.each(function (item) {
            if (item == pointer) {
                return;
            }
            exists = item.point.x == pointer.point.x && item.point.y == pointer.point.y;
        });
        return exists;
    };
    /**
     * Returns an [[InteractionObject]] representation of a DOM element.
     *
     * You can use this on any HTML or SVG element, to add interactive features
     * to it.
     *
     * @param element  Element
     * @return InteractionObject
     */
    Interaction.prototype.getInteraction = function (element) {
        return new InteractionObject(element);
    };
    /**
     * Sets a style property on an element. Stores original value to be restored
     * later with [[restoreStyle]].
     *
     * @see {@link restoreStyle}
     * @param io        Element
     * @param property  Property
     * @param value     Value
     */
    Interaction.prototype.setTemporaryStyle = function (io, property, value) {
        // Get element
        //let el = io.element.tagName == "g" ? <SVGSVGElement>io.element.parentNode : io.element;
        var el = io.element;
        // Save original property if it is set and hasn't been saved before already
        if ($type.hasValue(el.style[property]) && !io.replacedStyles.hasKey(property)) {
            io.replacedStyles.setKey(property, el.style[property]);
        }
        // Replace with the new one
        $dom.setStyle(el, property, value);
    };
    /**
     * Restores specific style on an element.
     *
     * @param io        Element
     * @param property  Style property
     */
    Interaction.prototype.restoreStyle = function (io, property) {
        // Reset style
        if (io.replacedStyles.hasKey(property)) {
            io.element.style[property] = io.replacedStyles.getKey(property);
            io.replacedStyles.removeKey(property);
        }
        else {
            delete io.element.style[property];
        }
    };
    /**
     * Restore temporarily reset styles on an element.
     *
     * @param io Element
     */
    Interaction.prototype.restoreAllStyles = function (io) {
        $iter.each(io.replacedStyles.iterator(), function (a) {
            var key = a[0];
            var value = a[1];
            io.element.style[key] = value;
            io.replacedStyles.removeKey(key);
        });
    };
    /**
     * Disposes this object and cleans up after itself.
     */
    Interaction.prototype.dispose = function () {
        if (!this.isDisposed()) {
            _super.prototype.dispose.call(this);
            this.restoreAllStyles(this.body);
            this.unlockWheel();
        }
    };
    // @ts-ignore Used for debugging
    Interaction.prototype.log = function (text, ev, io) {
        var show = true;
        if (show) {
            // Touchlist?
            if (ev.changedTouches) {
                for (var i = 0; i < ev.changedTouches.length; i++) {
                    this.logTouch(text, ev.type, ev.changedTouches[i]);
                }
                return;
            }
            // Get type
            var type = "";
            if (ev.pointerType) {
                switch (ev.pointerType) {
                    case 2:
                        type = "touch";
                        break;
                    case 4:
                        type = "mouse";
                        break;
                    default:
                        type = ev.pointerType;
                        break;
                }
            }
            else if (typeof TouchEvent != "undefined" && ev instanceof TouchEvent) {
                type = "touch";
            }
            else if (ev.type.match(/^mouse/)) {
                type = "mouse";
            }
            else {
                type = "???";
            }
            // Get ID
            var id = "";
            if ($type.hasValue(ev.identifier)) {
                id = ev.identifier;
            }
            else if ($type.hasValue(ev.pointerId)) {
                id = ev.pointerId;
            }
            else {
                id = "???";
            }
            if (io) {
                console.log(text + " (" + io.uid + ")  " + ev.type + "  " + type + "  " + id);
            }
            else {
                console.log(text + "  " + ev.type + "  " + type + "  " + id);
            }
        }
    };
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
    Interaction.prototype.areTransformed = function (except) {
        var count = this.transformedObjects.length;
        if (except) {
            var ex = $type.isArray(except) ? except : [except];
            for (var i = 0; i < ex.length; i++) {
                if (this.transformedObjects.contains(ex[i])) {
                    count--;
                }
            }
        }
        return count > 0;
    };
    /**
     * Log.
     */
    Interaction.prototype.logTouch = function (text, type, ev) {
        console.log(text + "  " + type + "  " + "touch" + "  " + ev.identifier);
    };
    Object.defineProperty(Interaction, "passiveSupported", {
        /**
         * Indicates if passive mode options is supported by this browser.
         */
        get: function () {
            var _this = this;
            if (this._passiveSupported == null) {
                // Check for passive mode support
                try {
                    var options_1 = Object.defineProperty({}, "passive", {
                        get: function () {
                            _this._passiveSupported = true;
                        }
                    });
                    window.addEventListener("test", options_1, options_1);
                    window.removeEventListener("test", options_1, options_1);
                }
                catch (err) {
                    this._passiveSupported = false;
                }
            }
            return this._passiveSupported;
        },
        enumerable: true,
        configurable: true
    });
    return Interaction;
}(BaseObjectEvents));
export { Interaction };
var interaction = null;
/**
 * Returns a single unified global instance of [[Interaction]].
 *
 * All code should use this function, rather than create their own instances
 * of [[Interaction]].
 */
export function getInteraction() {
    if (interaction == null) {
        interaction = new Interaction();
    }
    return interaction;
}
//# sourceMappingURL=Interaction.js.map