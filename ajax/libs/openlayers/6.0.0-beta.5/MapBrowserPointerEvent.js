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
 * @module ol/MapBrowserPointerEvent
 */
import MapBrowserEvent from './MapBrowserEvent.js';
var MapBrowserPointerEvent = /** @class */ (function (_super) {
    __extends(MapBrowserPointerEvent, _super);
    /**
     * @param {string} type Event type.
     * @param {import("./PluggableMap.js").default} map Map.
     * @param {import("./pointer/PointerEvent.js").default} pointerEvent Pointer event.
     * @param {boolean=} opt_dragging Is the map currently being dragged?
     * @param {?import("./PluggableMap.js").FrameState=} opt_frameState Frame state.
     */
    function MapBrowserPointerEvent(type, map, pointerEvent, opt_dragging, opt_frameState) {
        var _this = _super.call(this, type, map, pointerEvent.originalEvent, opt_dragging, opt_frameState) || this;
        /**
         * @const
         * @type {import("./pointer/PointerEvent.js").default}
         */
        _this.pointerEvent = pointerEvent;
        return _this;
    }
    return MapBrowserPointerEvent;
}(MapBrowserEvent));
export default MapBrowserPointerEvent;
//# sourceMappingURL=MapBrowserPointerEvent.js.map