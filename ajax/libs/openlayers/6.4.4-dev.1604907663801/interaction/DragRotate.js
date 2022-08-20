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
 * @module ol/interaction/DragRotate
 */
import PointerInteraction from './Pointer.js';
import { FALSE } from '../functions.js';
import { altShiftKeysOnly, mouseActionButton, mouseOnly, } from '../events/condition.js';
import { disable } from '../rotationconstraint.js';
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an
 * {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition~altShiftKeysOnly}.
 * @property {number} [duration=250] Animation duration in milliseconds.
 */
/**
 * @classdesc
 * Allows the user to rotate the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the alt and shift keys are held down.
 *
 * This interaction is only supported for mouse devices.
 * @api
 */
var DragRotate = /** @class */ (function (_super) {
    __extends(DragRotate, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DragRotate(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        _this = _super.call(this, {
            stopDown: FALSE,
        }) || this;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition ? options.condition : altShiftKeysOnly;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.lastAngle_ = undefined;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        return _this;
    }
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     */
    DragRotate.prototype.handleDragEvent = function (mapBrowserEvent) {
        if (!mouseOnly(mapBrowserEvent)) {
            return;
        }
        var map = mapBrowserEvent.map;
        var view = map.getView();
        if (view.getConstraints().rotation === disable) {
            return;
        }
        var size = map.getSize();
        var offset = mapBrowserEvent.pixel;
        var theta = Math.atan2(size[1] / 2 - offset[1], offset[0] - size[0] / 2);
        if (this.lastAngle_ !== undefined) {
            var delta = theta - this.lastAngle_;
            view.adjustRotationInternal(-delta);
        }
        this.lastAngle_ = theta;
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragRotate.prototype.handleUpEvent = function (mapBrowserEvent) {
        if (!mouseOnly(mapBrowserEvent)) {
            return true;
        }
        var map = mapBrowserEvent.map;
        var view = map.getView();
        view.endInteraction(this.duration_);
        return false;
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    DragRotate.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (!mouseOnly(mapBrowserEvent)) {
            return false;
        }
        if (mouseActionButton(mapBrowserEvent) &&
            this.condition_(mapBrowserEvent)) {
            var map = mapBrowserEvent.map;
            map.getView().beginInteraction();
            this.lastAngle_ = undefined;
            return true;
        }
        else {
            return false;
        }
    };
    return DragRotate;
}(PointerInteraction));
export default DragRotate;
//# sourceMappingURL=DragRotate.js.map