import { __extends } from "tslib";
import { TargetedEventDispatcher } from "../utils/EventDispatcher";
import { MultiDisposer, CounterDisposer } from "../utils/Disposer";
/**
 * Represents an Event Dispatcher for [[InteractionObject]].
 *
 * Besides regular [[EventDispatcher]] functionality it adds new events with
 * direct application to DOM nodes. Primarily used to handle keyboard events,
 * but can turn into something else moving forward.
 */
var InteractionObjectEventDispatcher = /** @class */ (function (_super) {
    __extends(InteractionObjectEventDispatcher, _super);
    function InteractionObjectEventDispatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Holds a list of Disposers for DOM events added.
         */
        _this._domEvents = {};
        return _this;
    }
    /**
     * Adds a DOM event and returns Disposer.
     *
     * @return Disposer
     */
    InteractionObjectEventDispatcher.prototype._addDOMEvent = function (type, key, listener, context) {
        var _this = this;
        if (!this._domEvents[type]) {
            var callback_1 = function (e) {
                listener.call(context, key, e);
            };
            this.target.element.addEventListener(type, callback_1, false);
            this._domEvents[type] = new CounterDisposer(function () {
                delete _this._domEvents[type];
                _this.target.element.removeEventListener(type, callback_1, false);
            });
        }
        return this._domEvents[type].increment();
    };
    InteractionObjectEventDispatcher.prototype._dispatchKeyboardEvent = function (key, ev) {
        // TODO use this.dispatchImmediately ?
        if (this.target.events.isEnabled(key)) {
            this.target.events.dispatchImmediately(key, {
                type: key,
                target: this.target,
                event: ev
            });
        }
    };
    InteractionObjectEventDispatcher.prototype._on = function (once, type, callback, context, shouldClone, dispatch) {
        var info = _super.prototype._on.call(this, once, type, callback, context, shouldClone, dispatch);
        var disposers = [info.disposer];
        switch (type) {
            case "hit":
            case "doublehit":
            case "rightclick":
            case "down":
            case "up":
                this.target.clickable = true;
                break;
            case "drag":
            case "dragstart":
            case "dragstop":
                this.target.draggable = true;
                break;
            case "track":
                this.target.trackable = true;
                break;
            case "resize":
                this.target.resizable = true;
                break;
            case "swipe":
            case "swipeleft":
            case "swiperight":
                this.target.swipeable = true;
                break;
            case "wheel":
            case "wheelup":
            case "wheeldown":
            case "wheelleft":
            case "wheelright":
                this.target.wheelable = true;
                break;
            case "over":
            case "out":
                this.target.hoverable = true;
                break;
            case "focus":
            case "blur":
            case "focusin":
            case "focusout":
                this.target.focusable = true;
                break;
            case "keydown":
                disposers.push(this._addDOMEvent(type, type, this._dispatchKeyboardEvent, this));
                break;
            case "keyup":
                disposers.push(this._addDOMEvent(type, type, this._dispatchKeyboardEvent, this));
                break;
            case "keypress":
                disposers.push(this._addDOMEvent(type, type, this._dispatchKeyboardEvent, this));
                break;
            case "input":
                disposers.push(this._addDOMEvent(type, type, this._dispatchKeyboardEvent, this));
                break;
        }
        info.disposer = new MultiDisposer(disposers);
        return info;
    };
    return InteractionObjectEventDispatcher;
}(TargetedEventDispatcher));
export { InteractionObjectEventDispatcher };
//# sourceMappingURL=InteractionObjectEvents.js.map