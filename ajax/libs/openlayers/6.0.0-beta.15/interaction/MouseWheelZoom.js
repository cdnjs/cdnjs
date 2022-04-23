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
 * @module ol/interaction/MouseWheelZoom
 */
import { always } from '../events/condition.js';
import EventType from '../events/EventType.js';
import { DEVICE_PIXEL_RATIO, FIREFOX, SAFARI } from '../has.js';
import Interaction, { zoomByDelta } from './Interaction.js';
import { clamp } from '../math.js';
/**
 * @enum {string}
 */
export var Mode = {
    TRACKPAD: 'trackpad',
    WHEEL: 'wheel'
};
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition~always}.
 * @property {number} [maxDelta=1] Maximum mouse wheel delta.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [timeout=80] Mouse wheel timeout duration in milliseconds.
 * @property {boolean} [useAnchor=true] Enable zooming using the mouse's
 * location as the anchor. When set to `false`, zooming in and out will zoom to
 * the center of the screen instead of zooming on the mouse's location.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @api
 */
var MouseWheelZoom = /** @class */ (function (_super) {
    __extends(MouseWheelZoom, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function MouseWheelZoom(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, /** @type {import("./Interaction.js").InteractionOptions} */ (options)) || this;
        /**
         * @private
         * @type {number}
         */
        _this.totalDelta_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.lastDelta_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.maxDelta_ = options.maxDelta !== undefined ? options.maxDelta : 1;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        /**
         * @private
         * @type {number}
         */
        _this.timeout_ = options.timeout !== undefined ? options.timeout : 80;
        /**
         * @private
         * @type {boolean}
         */
        _this.useAnchor_ = options.useAnchor !== undefined ? options.useAnchor : true;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition ? options.condition : always;
        /**
         * @private
         * @type {?import("../coordinate.js").Coordinate}
         */
        _this.lastAnchor_ = null;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.startTime_ = undefined;
        /**
         * @private
         * @type {?}
         */
        _this.timeoutId_;
        /**
         * @private
         * @type {Mode|undefined}
         */
        _this.mode_ = undefined;
        /**
         * Trackpad events separated by this delay will be considered separate
         * interactions.
         * @type {number}
         */
        _this.trackpadEventGap_ = 400;
        /**
         * @type {?}
         */
        _this.trackpadTimeoutId_;
        /**
         * The number of delta values per zoom level
         * @private
         * @type {number}
         */
        _this.trackpadDeltaPerZoom_ = 300;
        return _this;
    }
    /**
     * @private
     */
    MouseWheelZoom.prototype.endInteraction_ = function () {
        this.trackpadTimeoutId_ = undefined;
        var view = this.getMap().getView();
        view.endInteraction(undefined, Math.sign(this.lastDelta_), this.lastAnchor_);
    };
    /**
     * Handles the {@link module:ol/MapBrowserEvent map browser event} (if it was a mousewheel-event) and eventually
     * zooms the map.
     * @override
     */
    MouseWheelZoom.prototype.handleEvent = function (mapBrowserEvent) {
        if (!this.condition_(mapBrowserEvent)) {
            return true;
        }
        var type = mapBrowserEvent.type;
        if (type !== EventType.WHEEL && type !== EventType.MOUSEWHEEL) {
            return true;
        }
        mapBrowserEvent.preventDefault();
        var map = mapBrowserEvent.map;
        var wheelEvent = /** @type {WheelEvent} */ (mapBrowserEvent.originalEvent);
        if (this.useAnchor_) {
            this.lastAnchor_ = mapBrowserEvent.coordinate;
        }
        // Delta normalisation inspired by
        // https://github.com/mapbox/mapbox-gl-js/blob/001c7b9/js/ui/handler/scroll_zoom.js
        var delta;
        if (mapBrowserEvent.type == EventType.WHEEL) {
            delta = wheelEvent.deltaY;
            if (FIREFOX &&
                wheelEvent.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
                delta /= DEVICE_PIXEL_RATIO;
            }
            if (wheelEvent.deltaMode === WheelEvent.DOM_DELTA_LINE) {
                delta *= 40;
            }
        }
        else if (mapBrowserEvent.type == EventType.MOUSEWHEEL) {
            delta = -wheelEvent.wheelDeltaY;
            if (SAFARI) {
                delta /= 3;
            }
        }
        if (delta === 0) {
            return false;
        }
        else {
            this.lastDelta_ = delta;
        }
        var now = Date.now();
        if (this.startTime_ === undefined) {
            this.startTime_ = now;
        }
        if (!this.mode_ || now - this.startTime_ > this.trackpadEventGap_) {
            this.mode_ = Math.abs(delta) < 4 ?
                Mode.TRACKPAD :
                Mode.WHEEL;
        }
        if (this.mode_ === Mode.TRACKPAD) {
            var view = map.getView();
            if (this.trackpadTimeoutId_) {
                clearTimeout(this.trackpadTimeoutId_);
            }
            else {
                view.beginInteraction();
            }
            this.trackpadTimeoutId_ = setTimeout(this.endInteraction_.bind(this), this.trackpadEventGap_);
            view.adjustZoom(-delta / this.trackpadDeltaPerZoom_, this.lastAnchor_);
            this.startTime_ = now;
            return false;
        }
        this.totalDelta_ += delta;
        var timeLeft = Math.max(this.timeout_ - (now - this.startTime_), 0);
        clearTimeout(this.timeoutId_);
        this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, map), timeLeft);
        return false;
    };
    /**
     * @private
     * @param {import("../PluggableMap.js").default} map Map.
     */
    MouseWheelZoom.prototype.handleWheelZoom_ = function (map) {
        var view = map.getView();
        if (view.getAnimating()) {
            view.cancelAnimations();
        }
        var delta = clamp(this.totalDelta_, -this.maxDelta_, this.maxDelta_);
        zoomByDelta(view, -delta, this.lastAnchor_, this.duration_);
        this.mode_ = undefined;
        this.totalDelta_ = 0;
        this.lastAnchor_ = null;
        this.startTime_ = undefined;
        this.timeoutId_ = undefined;
    };
    /**
     * Enable or disable using the mouse's location as an anchor when zooming
     * @param {boolean} useAnchor true to zoom to the mouse's location, false
     * to zoom to the center of the map
     * @api
     */
    MouseWheelZoom.prototype.setMouseAnchor = function (useAnchor) {
        this.useAnchor_ = useAnchor;
        if (!useAnchor) {
            this.lastAnchor_ = null;
        }
    };
    return MouseWheelZoom;
}(Interaction));
export default MouseWheelZoom;
//# sourceMappingURL=MouseWheelZoom.js.map