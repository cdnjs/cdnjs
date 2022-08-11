var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/interaction/DragRotateAndZoom
 */
import PointerInteraction from './Pointer.js';
import { mouseOnly, shiftKeyOnly } from '../events/condition.js';
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition~shiftKeyOnly}.
 * @property {number} [duration=400] Animation duration in milliseconds.
 */
/**
 * @classdesc
 * Allows the user to zoom and rotate the map by clicking and dragging
 * on the map.  By default, this interaction is limited to when the shift
 * key is held down.
 *
 * This interaction is only supported for mouse devices.
 *
 * And this interaction is not included in the default interactions.
 * @api
 */
var DragRotateAndZoom = /** @class */ (function (_super) {
    __extends(DragRotateAndZoom, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DragRotateAndZoom(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, /** @type {import("./Pointer.js").Options} */ (options)) || this;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition ? options.condition : shiftKeyOnly;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.lastAngle_ = undefined;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.lastMagnitude_ = undefined;
        /**
         * @private
         * @type {number}
         */
        _this.lastScaleDelta_ = 0;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 400;
        return _this;
    }
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     */
    DragRotateAndZoom.prototype.handleDragEvent = function (mapBrowserEvent) {
        if (!mouseOnly(mapBrowserEvent)) {
            return;
        }
        var map = mapBrowserEvent.map;
        var size = map.getSize();
        var offset = mapBrowserEvent.pixel;
        var deltaX = offset[0] - size[0] / 2;
        var deltaY = size[1] / 2 - offset[1];
        var theta = Math.atan2(deltaY, deltaX);
        var magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        var view = map.getView();
        if (this.lastAngle_ !== undefined) {
            var angleDelta = this.lastAngle_ - theta;
            view.adjustRotationInternal(angleDelta);
        }
        this.lastAngle_ = theta;
        if (this.lastMagnitude_ !== undefined) {
            view.adjustResolutionInternal(this.lastMagnitude_ / magnitude);
        }
        if (this.lastMagnitude_ !== undefined) {
            this.lastScaleDelta_ = this.lastMagnitude_ / magnitude;
        }
        this.lastMagnitude_ = magnitude;
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragRotateAndZoom.prototype.handleUpEvent = function (mapBrowserEvent) {
        if (!mouseOnly(mapBrowserEvent)) {
            return true;
        }
        var map = mapBrowserEvent.map;
        var view = map.getView();
        var direction = this.lastScaleDelta_ > 1 ? 1 : -1;
        view.endInteraction(this.duration_, direction);
        this.lastScaleDelta_ = 0;
        return false;
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragRotateAndZoom.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (!mouseOnly(mapBrowserEvent)) {
            return false;
        }
        if (this.condition_(mapBrowserEvent)) {
            mapBrowserEvent.map.getView().beginInteraction();
            this.lastAngle_ = undefined;
            this.lastMagnitude_ = undefined;
            return true;
        }
        else {
            return false;
        }
    };
    return DragRotateAndZoom;
}(PointerInteraction));
export default DragRotateAndZoom;
//# sourceMappingURL=DragRotateAndZoom.js.map