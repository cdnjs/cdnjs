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
 * @module ol/interaction/PinchRotate
 */
import PointerInteraction, { centroid as centroidFromPointers, } from './Pointer.js';
import { FALSE } from '../functions.js';
import { disable } from '../rotationconstraint.js';
/**
 * @typedef {Object} Options
 * @property {number} [duration=250] The duration of the animation in
 * milliseconds.
 * @property {number} [threshold=0.3] Minimal angle in radians to start a rotation.
 */
/**
 * @classdesc
 * Allows the user to rotate the map by twisting with two fingers
 * on a touch screen.
 * @api
 */
var PinchRotate = /** @class */ (function (_super) {
    __extends(PinchRotate, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function PinchRotate(opt_options) {
        var _this = this;
        var options = opt_options ? opt_options : {};
        var pointerOptions = /** @type {import("./Pointer.js").Options} */ (options);
        if (!pointerOptions.stopDown) {
            pointerOptions.stopDown = FALSE;
        }
        _this = _super.call(this, pointerOptions) || this;
        /**
         * @private
         * @type {import("../coordinate.js").Coordinate}
         */
        _this.anchor_ = null;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.lastAngle_ = undefined;
        /**
         * @private
         * @type {boolean}
         */
        _this.rotating_ = false;
        /**
         * @private
         * @type {number}
         */
        _this.rotationDelta_ = 0.0;
        /**
         * @private
         * @type {number}
         */
        _this.threshold_ = options.threshold !== undefined ? options.threshold : 0.3;
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
    PinchRotate.prototype.handleDragEvent = function (mapBrowserEvent) {
        var rotationDelta = 0.0;
        var touch0 = this.targetPointers[0];
        var touch1 = this.targetPointers[1];
        // angle between touches
        var angle = Math.atan2(touch1.clientY - touch0.clientY, touch1.clientX - touch0.clientX);
        if (this.lastAngle_ !== undefined) {
            var delta = angle - this.lastAngle_;
            this.rotationDelta_ += delta;
            if (!this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_) {
                this.rotating_ = true;
            }
            rotationDelta = delta;
        }
        this.lastAngle_ = angle;
        var map = mapBrowserEvent.map;
        var view = map.getView();
        if (view.getConstraints().rotation === disable) {
            return;
        }
        // rotate anchor point.
        // FIXME: should be the intersection point between the lines:
        //     touch0,touch1 and previousTouch0,previousTouch1
        var viewportPosition = map.getViewport().getBoundingClientRect();
        var centroid = centroidFromPointers(this.targetPointers);
        centroid[0] -= viewportPosition.left;
        centroid[1] -= viewportPosition.top;
        this.anchor_ = map.getCoordinateFromPixelInternal(centroid);
        // rotate
        if (this.rotating_) {
            map.render();
            view.adjustRotationInternal(rotationDelta, this.anchor_);
        }
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    PinchRotate.prototype.handleUpEvent = function (mapBrowserEvent) {
        if (this.targetPointers.length < 2) {
            var map = mapBrowserEvent.map;
            var view = map.getView();
            view.endInteraction(this.duration_);
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    PinchRotate.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (this.targetPointers.length >= 2) {
            var map = mapBrowserEvent.map;
            this.anchor_ = null;
            this.lastAngle_ = undefined;
            this.rotating_ = false;
            this.rotationDelta_ = 0.0;
            if (!this.handlingDownUpSequence) {
                map.getView().beginInteraction();
            }
            return true;
        }
        else {
            return false;
        }
    };
    return PinchRotate;
}(PointerInteraction));
export default PinchRotate;
//# sourceMappingURL=PinchRotate.js.map