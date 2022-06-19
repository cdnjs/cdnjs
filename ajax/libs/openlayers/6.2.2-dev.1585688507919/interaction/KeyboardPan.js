var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/interaction/KeyboardPan
 */
import { rotate as rotateCoordinate } from '../coordinate.js';
import EventType from '../events/EventType.js';
import KeyCode from '../events/KeyCode.js';
import { noModifierKeys, targetNotEditable } from '../events/condition.js';
import Interaction, { pan } from './Interaction.js';
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition~noModifierKeys} and
 * {@link module:ol/events/condition~targetNotEditable}.
 * @property {number} [duration=100] Animation duration in milliseconds.
 * @property {number} [pixelDelta=128] The amount of pixels to pan on each key
 * press.
 */
/**
 * @classdesc
 * Allows the user to pan the map using keyboard arrows.
 * Note that, although this interaction is by default included in maps,
 * the keys can only be used when browser focus is on the element to which
 * the keyboard events are attached. By default, this is the map div,
 * though you can change this with the `keyboardEventTarget` in
 * {@link module:ol/Map~Map}. `document` never loses focus but, for any other
 * element, focus will have to be on, and returned to, this element if the keys
 * are to function.
 * See also {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}.
 * @api
 */
var KeyboardPan = /** @class */ (function (_super) {
    __extends(KeyboardPan, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function KeyboardPan(opt_options) {
        var _this = _super.call(this, {
            handleEvent: handleEvent
        }) || this;
        var options = opt_options || {};
        /**
         * @private
         * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Browser event.
         * @return {boolean} Combined condition result.
         */
        _this.defaultCondition_ = function (mapBrowserEvent) {
            return noModifierKeys(mapBrowserEvent) &&
                targetNotEditable(mapBrowserEvent);
        };
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition !== undefined ?
            options.condition : _this.defaultCondition_;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 100;
        /**
         * @private
         * @type {number}
         */
        _this.pixelDelta_ = options.pixelDelta !== undefined ?
            options.pixelDelta : 128;
        return _this;
    }
    return KeyboardPan;
}(Interaction));
/**
 * Handles the {@link module:ol/MapBrowserEvent map browser event} if it was a
 * `KeyEvent`, and decides the direction to pan to (if an arrow key was
 * pressed).
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {KeyboardPan}
 */
function handleEvent(mapBrowserEvent) {
    var stopEvent = false;
    if (mapBrowserEvent.type == EventType.KEYDOWN) {
        var keyEvent = /** @type {KeyboardEvent} */ (mapBrowserEvent.originalEvent);
        var keyCode = keyEvent.keyCode;
        if (this.condition_(mapBrowserEvent) &&
            (keyCode == KeyCode.DOWN ||
                keyCode == KeyCode.LEFT ||
                keyCode == KeyCode.RIGHT ||
                keyCode == KeyCode.UP)) {
            var map = mapBrowserEvent.map;
            var view = map.getView();
            var mapUnitsDelta = view.getResolution() * this.pixelDelta_;
            var deltaX = 0, deltaY = 0;
            if (keyCode == KeyCode.DOWN) {
                deltaY = -mapUnitsDelta;
            }
            else if (keyCode == KeyCode.LEFT) {
                deltaX = -mapUnitsDelta;
            }
            else if (keyCode == KeyCode.RIGHT) {
                deltaX = mapUnitsDelta;
            }
            else {
                deltaY = mapUnitsDelta;
            }
            var delta = [deltaX, deltaY];
            rotateCoordinate(delta, view.getRotation());
            pan(view, delta, this.duration_);
            mapBrowserEvent.preventDefault();
            stopEvent = true;
        }
    }
    return !stopEvent;
}
export default KeyboardPan;
//# sourceMappingURL=KeyboardPan.js.map