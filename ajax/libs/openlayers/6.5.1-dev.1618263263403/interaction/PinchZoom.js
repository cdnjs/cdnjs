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
 * @module ol/interaction/PinchZoom
 */
import PointerInteraction, { centroid as centroidFromPointers, } from './Pointer.js';
import { FALSE } from '../functions.js';
/**
 * @typedef {Object} Options
 * @property {number} [duration=400] Animation duration in milliseconds.
 */
/**
 * @classdesc
 * Allows the user to zoom the map by pinching with two fingers
 * on a touch screen.
 * @api
 */
var PinchZoom = /** @class */ (function (_super) {
    __extends(PinchZoom, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function PinchZoom(opt_options) {
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
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 400;
        /**
         * @private
         * @type {number|undefined}
         */
        _this.lastDistance_ = undefined;
        /**
         * @private
         * @type {number}
         */
        _this.lastScaleDelta_ = 1;
        return _this;
    }
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     */
    PinchZoom.prototype.handleDragEvent = function (mapBrowserEvent) {
        var scaleDelta = 1.0;
        var touch0 = this.targetPointers[0];
        var touch1 = this.targetPointers[1];
        var dx = touch0.clientX - touch1.clientX;
        var dy = touch0.clientY - touch1.clientY;
        // distance between touches
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (this.lastDistance_ !== undefined) {
            scaleDelta = this.lastDistance_ / distance;
        }
        this.lastDistance_ = distance;
        var map = mapBrowserEvent.map;
        var view = map.getView();
        if (scaleDelta != 1.0) {
            this.lastScaleDelta_ = scaleDelta;
        }
        // scale anchor point.
        var viewportPosition = map.getViewport().getBoundingClientRect();
        var centroid = centroidFromPointers(this.targetPointers);
        centroid[0] -= viewportPosition.left;
        centroid[1] -= viewportPosition.top;
        this.anchor_ = map.getCoordinateFromPixelInternal(centroid);
        // scale, bypass the resolution constraint
        map.render();
        view.adjustResolutionInternal(scaleDelta, this.anchor_);
    };
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     */
    PinchZoom.prototype.handleUpEvent = function (mapBrowserEvent) {
        if (this.targetPointers.length < 2) {
            var map = mapBrowserEvent.map;
            var view = map.getView();
            var direction = this.lastScaleDelta_ > 1 ? 1 : -1;
            view.endInteraction(this.duration_, direction);
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
    PinchZoom.prototype.handleDownEvent = function (mapBrowserEvent) {
        if (this.targetPointers.length >= 2) {
            var map = mapBrowserEvent.map;
            this.anchor_ = null;
            this.lastDistance_ = undefined;
            this.lastScaleDelta_ = 1;
            if (!this.handlingDownUpSequence) {
                map.getView().beginInteraction();
            }
            return true;
        }
        else {
            return false;
        }
    };
    return PinchZoom;
}(PointerInteraction));
export default PinchZoom;
//# sourceMappingURL=PinchZoom.js.map