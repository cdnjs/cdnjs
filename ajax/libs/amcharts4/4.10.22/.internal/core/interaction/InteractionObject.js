/**
 * Interaction Object module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { InteractionObjectEventDispatcher } from "./InteractionObjectEvents";
import { BaseObjectEvents } from "../Base";
import { List } from "../utils/List";
import { Dictionary, DictionaryDisposer } from "../utils/Dictionary";
import { getInteraction } from "./Interaction";
import * as $type from "../utils/Type";
/**
 * Re-exports
 */
export { InteractionObjectEventDispatcher };
/**
 * Interaction object represents an object that is subject for any kind of
 * interaction with it with any input devices: mouse, touch or keyboard.
 *
 * Any DOM element can be wrapped into an Internaction object which in turn
 * enables attaching various interaction events to it, such as: hit, drag,
 * swipe, etc.
 *
 * To create an [[InteractionObject]] out of a [[Sprite]], use:
 * `interaction.getInteractionFromSprite(sprite: Sprite)`
 *
 * To create an [[InteractionObject]] out of a a regular element:
 * `interaction.getInteraction(element: HTMLElement)`
 */
var InteractionObject = /** @class */ (function (_super) {
    __extends(InteractionObject, _super);
    /**
     * Constructor
     */
    function InteractionObject(element) {
        var _this = _super.call(this) || this;
        /**
         * @ignore
         * An [[EventDispatcher]] instance which holds events for this object
         */
        _this._eventDispatcher = new InteractionObjectEventDispatcher(_this);
        /**
         * Collection of Disposers for various events. (so that those get disposed
         * when the whole InteractionObject is disposed)
         *
         * @ignore Exclude from docs
         */
        _this.eventDisposers = new Dictionary();
        /**
         * A [[Dictionary]] that holds temporarily replaced original style values for
         * HTML element, so that they can be restored when the functionality that
         * replaced them is done.
         *
         * @ignore Exclude from docs
         */
        _this.replacedStyles = new Dictionary();
        _this._clickable = false;
        _this._contextMenuDisabled = false;
        _this._hoverable = false;
        _this._trackable = false;
        _this._draggable = false;
        _this._swipeable = false;
        _this._resizable = false;
        _this._wheelable = false;
        _this._inert = false;
        /**
         * Is element currently hovered?
         */
        _this._isHover = false;
        /**
         * Was this element hovered via pointer or is it just "pretenting" to be
         * hovered.
         *
         * @ignore
         */
        _this.isRealHover = false;
        /**
         * Is the element hovered by touch pointer?
         */
        _this._isHoverByTouch = false;
        /**
         * Has element got any pointers currently pressing down on it?
         */
        _this._isDown = false;
        /**
         * Does element have focus?
         */
        _this._isFocused = false;
        /**
         * Is element currently protected from touch interactions?
         */
        _this._isTouchProtected = false;
        /**
         * Options used for inertia functionality.
         */
        _this._inertiaOptions = new Dictionary();
        /**
         * A collection of different inertia types, currently playing out.
         *
         * @ignore Exclude from docs
         */
        _this.inertias = new Dictionary();
        /**
         * Click/tap options.
         */
        _this._hitOptions = {};
        /**
         * Hover options.
         */
        _this._hoverOptions = {};
        /**
         * Swipe gesture options.
         */
        _this._swipeOptions = {};
        /**
         * Keyboard options.
         */
        _this._keyboardOptions = {};
        /**
         * Mouse options.
         */
        _this._mouseOptions = {};
        /**
         * Cursor options.
         */
        _this._cursorOptions = {
            "defaultStyle": [{
                    "property": "cursor",
                    "value": "default"
                }]
        };
        _this._disposers.push(_this._eventDispatcher);
        _this._element = element;
        _this.className = "InteractionObject";
        _this._disposers.push(new DictionaryDisposer(_this.inertias));
        _this._disposers.push(new DictionaryDisposer(_this.eventDisposers));
        _this.applyTheme();
        return _this;
    }
    ;
    Object.defineProperty(InteractionObject.prototype, "events", {
        /**
         * An [[EventDispatcher]] instance which holds events for this object
         */
        get: function () {
            return this._eventDispatcher;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "isHover", {
        /**
         * @return Hovered?
         */
        get: function () {
            return this._isHover;
        },
        /**
         * Indicates if this element is currently hovered.
         *
         * @param value Hovered?
         */
        set: function (value) {
            if (this.isHover != value) {
                this._isHover = value;
                if (value) {
                    getInteraction().overObjects.moveValue(this);
                }
                else {
                    this.isRealHover = false;
                    getInteraction().overObjects.removeValue(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "isHoverByTouch", {
        /**
         * @return Hovered?
         */
        get: function () {
            return this._isHoverByTouch;
        },
        /**
         * Indicates if this element is currently hovered.
         *
         * @param value Hovered?
         */
        set: function (value) {
            if (this.isHoverByTouch != value) {
                this._isHoverByTouch = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "overPointers", {
        /**
         * A list of pointers currently over the element.
         *
         * @see {@link Pointer}
         * @return List if pointers currently hovering the element
         */
        get: function () {
            if (!this._overPointers) {
                this._overPointers = new List();
            }
            return this._overPointers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "isDown", {
        /**
         * @return Has down pointers?
         */
        get: function () {
            return this._isDown;
        },
        /**
         * Indicates if this element has currently any pointers pressing on it.
         *
         * @param value Has down pointers?
         */
        set: function (value) {
            if (this.isDown != value) {
                this._isDown = value;
                if (value) {
                    getInteraction().downObjects.moveValue(this);
                }
                else {
                    getInteraction().downObjects.removeValue(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "downPointers", {
        /**
         * A list of pointers currently pressing down on this element.
         *
         * @see {@link Pointer}
         * @return List of down pointers
         */
        get: function () {
            if (!this._downPointers) {
                this._downPointers = new List();
            }
            return this._downPointers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "isFocused", {
        /**
         * @return Focused?
         */
        get: function () {
            return this._isFocused;
        },
        /**
         * Indicates if this element is currently focused.
         *
         * @param value Focused?
         */
        set: function (value) {
            if (this.isFocused != value) {
                this._isFocused = value;
                if (value) {
                    getInteraction().focusedObject = this;
                }
                else {
                    getInteraction().focusedObject = undefined;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "isTouchProtected", {
        /**
         * @ignore
         * @return Touch protected?
         */
        get: function () {
            return this._isTouchProtected;
        },
        /**
         * Indicates if this element is currently being protected from touch actions.
         *
         * @ignore
         * @param value Touch protected?
         */
        set: function (value) {
            if (this._isTouchProtected != value) {
                this._isTouchProtected = value;
                if (value) {
                    getInteraction().unprepElement(this);
                }
                else if (this.draggable || this.swipeable || this.trackable || this.resizable) {
                    getInteraction().prepElement(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "clickable", {
        /**
         * @return Clickable?
         */
        get: function () {
            return this._clickable;
        },
        /**
         * Is element clickable? Clickable elements will generate "hit" events when
         * clicked or tapped.
         *
         * @param value Clickable?
         */
        set: function (value) {
            if (this._clickable !== value) {
                this._clickable = value;
                getInteraction().processClickable(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "contextMenuDisabled", {
        /**
         * @return Context menu disabled?
         */
        get: function () {
            return this._contextMenuDisabled;
        },
        /**
         * Should element prevent context menu to be displayed, e.g. when
         * right-clicked?
         *
         * @default false
         * @param value Context menu disabled?
         */
        set: function (value) {
            if (this._contextMenuDisabled !== value) {
                this._contextMenuDisabled = value;
                getInteraction().processContextMenu(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "hoverable", {
        /**
         * @return Hoverable?
         */
        get: function () {
            return this._hoverable;
        },
        /**
         * Indicates if element should generate hover events.
         *
         * @param value Hoverable?
         */
        set: function (value) {
            if (this._hoverable !== value) {
                this._hoverable = value;
                getInteraction().processHoverable(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "trackable", {
        /**
         * @return Track pointer?
         */
        get: function () {
            return this._trackable;
        },
        /**
         * Indicates if pointer movement over element should be tracked.
         *
         * @param value Track pointer?
         */
        set: function (value) {
            if (this._trackable !== value) {
                this._trackable = value;
                getInteraction().processTrackable(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "draggable", {
        /**
         * @return Draggable?
         */
        get: function () {
            return this._draggable;
        },
        /**
         * Indicates if element can be dragged. (moved)
         *
         * @param value Draggable?
         */
        set: function (value) {
            if (this._draggable !== value) {
                this._draggable = value;
                getInteraction().processDraggable(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "swipeable", {
        /**
         * @return Track swipe?
         */
        get: function () {
            return this._swipeable;
        },
        /**
         * Indicates whether element should react to swipe gesture.
         *
         * @param value Track swipe?
         */
        set: function (value) {
            if (this._swipeable !== value) {
                this._swipeable = value;
                getInteraction().processSwipeable(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "resizable", {
        /**
         * @return Resizeble?
         */
        get: function () {
            return this._resizable;
        },
        /**
         * Indicates if element can be resized.
         *
         * @param value Resizeable?
         */
        set: function (value) {
            if (this._resizable !== value) {
                this._resizable = value;
                getInteraction().processResizable(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "wheelable", {
        /**
         * @return Track wheel?
         */
        get: function () {
            return this._wheelable;
        },
        /**
         * Indicates whether track moouse wheel rotation over element.
         *
         * @param value Track wheel?
         */
        set: function (value) {
            if (this._wheelable !== value) {
                this._wheelable = value;
                getInteraction().processWheelable(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "inert", {
        /**
         * @return Inert?
         */
        get: function () {
            return this._inert;
        },
        /**
         * Indicates if element is inert, i.e. if it should carry movement momentum
         * after it is dragged and released.
         *
         * @param value Inert?
         */
        set: function (value) {
            if (this._inert !== value) {
                this._inert = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "focusable", {
        /**
         * @return Focusable?
         */
        get: function () {
            return this._focusable;
        },
        /**
         * Indicates if element can gain focus.
         *
         * @param value Focusable?
         */
        set: function (value) {
            if (this._focusable !== value) {
                this._focusable = value;
                if (this._focusable && this.tabindex == -1) {
                    this._tabindex = 1;
                }
                getInteraction().processFocusable(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "tabindex", {
        /**
         * @return Tab index
         */
        get: function () {
            return $type.getValueDefault(this._tabindex, -1);
        },
        /**
         * Element's tab index.
         *
         * @param value Tab index
         */
        set: function (value) {
            if (this._tabindex !== value) {
                this._tabindex = value;
                if (value > -1) {
                    this.focusable = true;
                }
                getInteraction().processFocusable(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "element", {
        /**
         * @return Element
         */
        get: function () {
            return this._element;
        },
        /**
         * A DOM element associated with this element.
         *
         * @param element Element
         */
        set: function (element) {
            this._element = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "originalPosition", {
        /**
         * @ignore Exclude from docs
         * @return Position.
         */
        get: function () {
            return this._originalPosition || { x: 0, y: 0 };
        },
        /**
         * Element's original position.
         *
         * @ignore Exclude from docs
         * @param value Position
         */
        set: function (value) {
            this._originalPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "originalScale", {
        /**
         * @return Scale
         */
        get: function () {
            return $type.getValueDefault(this._originalScale, 1);
        },
        /**
         * Element's original scale.
         *
         * @ignore Exclude from docs
         * @param value Scale
         */
        set: function (value) {
            if (this._originalScale !== value) {
                this._originalScale = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "originalAngle", {
        /**
         * @return Angle
         */
        get: function () {
            return $type.getValueDefault(this._originalAngle, 0);
        },
        /**
         * Element's original angle.
         *
         * @ignore Exclude from docs
         * @param value Angle
         */
        set: function (value) {
            if (this._originalAngle !== value) {
                this._originalAngle = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "inertiaOptions", {
        /**
         * @return Options
         */
        get: function () {
            if (this.sprite && this.sprite._adapterO) {
                return this.sprite._adapterO.apply("inertiaOptions", this._inertiaOptions);
            }
            else {
                return this._inertiaOptions;
            }
        },
        /**
         * Inertia options.
         *
         * @param value  Options
         */
        set: function (value) {
            this._inertiaOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "hitOptions", {
        /**
         * @return Options
         */
        get: function () {
            if (this.sprite && this.sprite._adapterO) {
                return this.sprite._adapterO.apply("hitOptions", this._hitOptions);
            }
            else {
                return this._hitOptions;
            }
        },
        /**
         * Hit options.
         *
         * @param value  Options
         */
        set: function (value) {
            this._hitOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "hoverOptions", {
        /**
         * @return Options
         */
        get: function () {
            if (this.sprite && this.sprite._adapterO) {
                return this.sprite._adapterO.apply("hoverOptions", this._hoverOptions);
            }
            else {
                return this._hoverOptions;
            }
        },
        /**
         * Hover options.
         *
         * @param value  Options
         */
        set: function (value) {
            this._hoverOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "swipeOptions", {
        /**
         * @return Options
         */
        get: function () {
            if (this.sprite && this.sprite._adapterO) {
                return this.sprite._adapterO.apply("swipeOptions", this._swipeOptions);
            }
            else {
                return this._swipeOptions;
            }
        },
        /**
         * Swipe options.
         *
         * @param value  Options
         */
        set: function (value) {
            this._swipeOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "keyboardOptions", {
        /**
         * @return Options
         */
        get: function () {
            if (this.sprite && this.sprite._adapterO) {
                return this.sprite._adapterO.apply("keyboardOptions", this._keyboardOptions);
            }
            else {
                return this._keyboardOptions;
            }
        },
        /**
         * Keyboard options.
         *
         * @param value  Options
         */
        set: function (value) {
            this._keyboardOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "mouseOptions", {
        /**
         * @return Options
         */
        get: function () {
            if (this.sprite && this.sprite._adapterO) {
                return this.sprite._adapterO.apply("mouseOptions", this._mouseOptions);
            }
            else {
                return this._mouseOptions;
            }
        },
        /**
         * Mouse options.
         *
         * Enables controlling options related to the mouse, for example sensitivity
         * of its mouse wheel.
         *
         * E.g. the below will reduce chart's wheel-zoom speed to half its default
         * speed:
         *
         * ```TypeScript
         * chart.plotContainer.mouseOptions.sensitivity = 0.5;
         * ```
         * ```JavaScript
         * chart.plotContainer.mouseOptions.sensitivity = 0.5;
         * ```
         * ```JSON
         * {
         *   // ...
         *   "plotContainer": {
         *     "mouseOptions": {
         *       "sensitivity": 0.5
         *     }
         *   }
         * }
         * ```
         *
         * @since 4.5.14
         * @param value  Options
         */
        set: function (value) {
            this._mouseOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InteractionObject.prototype, "cursorOptions", {
        /**
         * @return Options
         */
        get: function () {
            if (this.sprite && this.sprite._adapterO) {
                return this.sprite._adapterO.apply("cursorOptions", this._cursorOptions);
            }
            else {
                return this._cursorOptions;
            }
        },
        /**
         * Cursor options.
         *
         * @param value  Options
         */
        set: function (value) {
            this._cursorOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all properties and related assets from another object of the same
     * type.
     *
     * @param source Source object
     */
    InteractionObject.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.inertiaOptions = source.inertiaOptions;
        this.hitOptions = source.hitOptions;
        this.hoverOptions = source.hoverOptions;
        this.swipeOptions = source.swipeOptions;
        this.keyboardOptions = source.keyboardOptions;
        this.cursorOptions = source.cursorOptions;
        this.contextMenuDisabled = source.contextMenuDisabled;
        getInteraction().applyCursorOverStyle(this);
    };
    /**
     * @ignore Exclude from docs
     */
    InteractionObject.prototype.setEventDisposer = function (key, value, f) {
        var disposer = this.eventDisposers.getKey(key);
        if (value) {
            if (disposer == null) {
                this.eventDisposers.setKey(key, f());
            }
        }
        else {
            if (disposer != null) {
                disposer.dispose();
                this.eventDisposers.removeKey(key);
            }
        }
    };
    /**
     * Disposes object.
     */
    InteractionObject.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        // Remove from all interaction registries
        var interaction = getInteraction();
        interaction.overObjects.removeValue(this);
        interaction.downObjects.removeValue(this);
        interaction.trackedObjects.removeValue(this);
        interaction.transformedObjects.removeValue(this);
        // Unlock document wheel
        if (this.isHover && this.wheelable) {
            interaction.unlockWheel();
        }
        if (interaction.focusedObject === this) {
            interaction.focusedObject = undefined;
        }
    };
    return InteractionObject;
}(BaseObjectEvents));
export { InteractionObject };
//# sourceMappingURL=InteractionObject.js.map