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
 * @module ol/interaction/DoubleClickZoom
 */
import MapBrowserEventType from '../MapBrowserEventType.js';
import Interaction, { zoomByDelta } from './Interaction.js';
/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [delta=1] The zoom delta applied on each double click.
 */
/**
 * @classdesc
 * Allows the user to zoom by double-clicking on the map.
 * @api
 */
var DoubleClickZoom = /** @class */ (function (_super) {
    __extends(DoubleClickZoom, _super);
    /**
     * @param {Options=} opt_options Options.
     */
    function DoubleClickZoom(opt_options) {
        var _this = _super.call(this, {
            handleEvent: handleEvent
        }) || this;
        var options = opt_options ? opt_options : {};
        /**
         * @private
         * @type {number}
         */
        _this.delta_ = options.delta ? options.delta : 1;
        /**
         * @private
         * @type {number}
         */
        _this.duration_ = options.duration !== undefined ? options.duration : 250;
        return _this;
    }
    return DoubleClickZoom;
}(Interaction));
/**
 * Handles the {@link module:ol/MapBrowserEvent map browser event} (if it was a
 * doubleclick) and eventually zooms the map.
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {DoubleClickZoom}
 */
function handleEvent(mapBrowserEvent) {
    var stopEvent = false;
    if (mapBrowserEvent.type == MapBrowserEventType.DBLCLICK) {
        var browserEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
        var map = mapBrowserEvent.map;
        var anchor = mapBrowserEvent.coordinate;
        var delta = browserEvent.shiftKey ? -this.delta_ : this.delta_;
        var view = map.getView();
        zoomByDelta(view, delta, anchor, this.duration_);
        mapBrowserEvent.preventDefault();
        stopEvent = true;
    }
    return !stopEvent;
}
export default DoubleClickZoom;
//# sourceMappingURL=DoubleClickZoom.js.map