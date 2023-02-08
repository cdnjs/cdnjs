var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/interaction/Pointer
 */
import Interaction from './Interaction.js';
import MapBrowserEventType from '../MapBrowserEventType.js';
/**
 * @typedef {Object} Options
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleDownEvent]
 * Function handling "down" events. If the function returns `true` then a drag
 * sequence is started.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleDragEvent]
 * Function handling "drag" events. This function is called on "move" events
 * during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleEvent]
 * Method called by the map to notify the interaction that a browser event was
 * dispatched to the map. The function may return `false` to prevent the
 * propagation of the event to other interactions in the map's interactions
 * chain.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleMoveEvent]
 * Function handling "move" events. This function is called on "move" events.
 * This functions is also called during a drag sequence, so during a drag
 * sequence both the `handleDragEvent` function and this function are called.
 * If `handleDownEvent` is defined and it returns true this function will not
 * be called during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleUpEvent]
 *  Function handling "up" events. If the function returns `false` then the
 * current drag sequence is stopped.
 * @property {function(boolean):boolean} [stopDown]
 * Should the down event be propagated to other interactions, or should be
 * stopped?
 */
/**
 * @classdesc
 * Base class that calls user-defined functions on `down`, `move` and `up`
 * events. This class also manages "drag sequences".
 *
 * When the `handleDownEvent` user function returns `true` a drag sequence is
 * started. During a drag sequence the `handleDragEvent` user function is
 * called on `move` events. The drag sequence ends when the `handleUpEvent`
 * user function is called and returns `false`.
 * @api
 */
var PointerInteraction = /** @class */ (function (_super) {
    __extends(PointerInteraction, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function PointerInteraction(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, 
        /** @type {import("./Interaction.js").InteractionOptions} */ (options)) || this;
        if (options.handleDownEvent) {
            _this.handleDownEvent = options.handleDownEvent;
        }
        if (options.handleDragEvent) {
            _this.handleDragEvent = options.handleDragEvent;
        }
        if (options.handleMoveEvent) {
            _this.handleMoveEvent = options.handleMoveEvent;
        }
        if (options.handleUpEvent) {
            _this.handleUpEvent = options.handleUpEvent;
        }
        if (options.stopDown) {
            _this.stopDown = options.stopDown;
        }
        /**
         * @type {boolean}
         * @protected
         */
        _this.handlingDownUpSequence = false;
        /**
         * @type {Array<PointerEvent>}
         * @protected
         */
        _this.targetPointers = [];
        return _this;
    }
    /**
     * Returns the current number of pointers involved in the interaction,
     * e.g. `2` when two fingers are used.
     * @return {number} The number of pointers.
     * @api
     */
    PointerInteraction.prototype.getPointerCount = function () {
        return this.targetPointers.length;
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     * @protected
     */
    PointerInteraction.prototype.handleDownEvent = function (mapBrowserEvent) {
        return false;
    };
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @protected
     */
    PointerInteraction.prototype.handleDragEvent = function (mapBrowserEvent) { };
    /**
     * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may call into
     * other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
     * detected.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @api
     */
    PointerInteraction.prototype.handleEvent = function (mapBrowserEvent) {
        if (!mapBrowserEvent.originalEvent) {
            return true;
        }
        var stopEvent = false;
        this.updateTrackedPointers_(mapBrowserEvent);
        if (this.handlingDownUpSequence) {
            if (mapBrowserEvent.type == MapBrowserEventType.POINTERDRAG) {
                this.handleDragEvent(mapBrowserEvent);
                // prevent page scrolling during dragging
                mapBrowserEvent.originalEvent.preventDefault();
            }
            else if (mapBrowserEvent.type == MapBrowserEventType.POINTERUP) {
                var handledUp = this.handleUpEvent(mapBrowserEvent);
                this.handlingDownUpSequence =
                    handledUp && this.targetPointers.length > 0;
            }
        }
        else {
            if (mapBrowserEvent.type == MapBrowserEventType.POINTERDOWN) {
                var handled = this.handleDownEvent(mapBrowserEvent);
                this.handlingDownUpSequence = handled;
                stopEvent = this.stopDown(handled);
            }
            else if (mapBrowserEvent.type == MapBrowserEventType.POINTERMOVE) {
                this.handleMoveEvent(mapBrowserEvent);
            }
        }
        return !stopEvent;
    };
    /**
     * Handle pointer move events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @protected
     */
    PointerInteraction.prototype.handleMoveEvent = function (mapBrowserEvent) { };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     * @protected
     */
    PointerInteraction.prototype.handleUpEvent = function (mapBrowserEvent) {
        return false;
    };
    /**
     * This function is used to determine if "down" events should be propagated
     * to other interactions or should be stopped.
     * @param {boolean} handled Was the event handled by the interaction?
     * @return {boolean} Should the `down` event be stopped?
     */
    PointerInteraction.prototype.stopDown = function (handled) {
        return handled;
    };
    /**
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @private
     */
    PointerInteraction.prototype.updateTrackedPointers_ = function (mapBrowserEvent) {
        if (mapBrowserEvent.activePointers) {
            this.targetPointers = mapBrowserEvent.activePointers;
        }
    };
    return PointerInteraction;
}(Interaction));
/**
 * @param {Array<PointerEvent>} pointerEvents List of events.
 * @return {import("../pixel.js").Pixel} Centroid pixel.
 */
export function centroid(pointerEvents) {
    var length = pointerEvents.length;
    var clientX = 0;
    var clientY = 0;
    for (var i = 0; i < length; i++) {
        clientX += pointerEvents[i].clientX;
        clientY += pointerEvents[i].clientY;
    }
    return [clientX / length, clientY / length];
}
export default PointerInteraction;
//# sourceMappingURL=Pointer.js.map