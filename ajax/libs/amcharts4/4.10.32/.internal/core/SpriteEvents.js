import { __extends } from "tslib";
import { Dictionary } from "./utils/Dictionary";
import { TargetedEventDispatcher } from "./utils/EventDispatcher";
import { MultiDisposer, CounterDisposer } from "./utils/Disposer";
import * as $utils from "./utils/Utils";
import * as $object from "./utils/Object";
/**
 * An [[EventDispatcher]] for [[Sprite]].
 *
 * @important
 */
var SpriteEventDispatcher = /** @class */ (function (_super) {
    __extends(SpriteEventDispatcher, _super);
    function SpriteEventDispatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * [_interactionEvents description]
         *
         * @todo Description
         */
        _this._interactionEvents = new Dictionary();
        return _this;
    }
    /**
     * [_dispatchSpriteEvent description]
     *
     * @todo Description
     */
    SpriteEventDispatcher.prototype._dispatchSpriteEvent = function (ev) {
        if (this.target.disabled || this.target.isTemplate) {
            return;
        }
        // TODO remove this <any> later
        if (this.target.events.isEnabled(ev.type)) {
            var imev = $object.merge(ev, {
                target: this.target
            });
            this.target.events.dispatchImmediately(imev.type, imev);
        }
    };
    /**
     * [_dispatchSpritePointEvent description]
     *
     * @todo Description
     */
    SpriteEventDispatcher.prototype._dispatchSpritePointEvent = function (ev) {
        if (this.target.disabled || this.target.isTemplate) {
            return;
        }
        // TODO remove this <any> later
        if (this.target.events.isEnabled(ev.type)) {
            var imev = $object.merge(ev, {
                target: this.target,
                spritePoint: ev.point ? $utils.documentPointToSprite(ev.point, this.target) : undefined,
                svgPoint: this.target.getSvgPoint(ev.point)
            });
            this.target.events.dispatchImmediately(imev.type, imev);
        }
    };
    /**
     * [_addInteractionObjectEvent description]
     *
     * @todo Description
     */
    SpriteEventDispatcher.prototype._addInteractionObjectEvent = function (type, callback, context, shouldClone) {
        var _this = this;
        var key = shouldClone + "-" + type;
        var counter = this._interactionEvents.insertKeyIfEmpty(key, function () {
            var disposer = _this.target.interactions.events.on(type, callback, context, shouldClone);
            return new CounterDisposer(function () {
                _this._interactionEvents.removeKey(key);
                disposer.dispose();
            });
        });
        return counter.increment();
    };
    /**
     * [_on description]
     *
     * @todo Description
     */
    SpriteEventDispatcher.prototype._on = function (once, type, callback, context, shouldClone, dispatch) {
        var info = _super.prototype._on.call(this, once, type, callback, context, shouldClone, dispatch);
        var disposers = [info.disposer];
        /**
         * Catching Sprite-related events, converting them to [[SpriteEvent]] and
         * triggering them on sprite
         */
        switch (type) {
            case "hit":
            case "track":
            case "doublehit":
            case "wheel":
            case "wheelup":
            case "wheeldown":
            case "wheelleft":
            case "wheelright":
                disposers.push(this._addInteractionObjectEvent(type, this._dispatchSpritePointEvent, this, shouldClone));
                break;
            case "rightclick":
            case "down":
            //case "hold":
            case "up":
            case "drag":
            case "dragged":
            case "dragstart":
            case "dragstop":
            case "over":
            case "out":
            case "swipe":
            case "swipeleft":
            case "swiperight":
            case "resize":
            //case "rotate":
            case "focus":
            case "blur":
            case "toggled":
                disposers.push(this._addInteractionObjectEvent(type, this._dispatchSpriteEvent, this, shouldClone));
                break;
        }
        /**
         * Set functional properties based on events. For example if we add a
         * "drag" event handler, we want to make the Sprite draggable, even if we
         * don't explicitly set "draggable"
         */
        switch (type) {
            case "hit":
            case "doublehit":
            case "rightclick":
            case "down":
            case "up":
                this.target.clickable = true;
                break;
            case "toggled":
                this.target.togglable = true;
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
                this.target.hoverable = true;
            case "out":
                this.target.hoverable = true;
                break;
            case "focus":
            case "blur":
                this.target.focusable = true;
                break;
        }
        info.disposer = new MultiDisposer(disposers);
        return info;
    };
    return SpriteEventDispatcher;
}(TargetedEventDispatcher));
export { SpriteEventDispatcher };
//# sourceMappingURL=SpriteEvents.js.map