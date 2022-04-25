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
 * @module ol/MapBrowserEvent
 */
import MapEvent from './MapEvent.js';
/**
 * @classdesc
 * Events emitted as map browser events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map browser event.
 */
var MapBrowserEvent = /** @class */ (function (_super) {
    __extends(MapBrowserEvent, _super);
    /**
     * @param {string} type Event type.
     * @param {import("./PluggableMap.js").default} map Map.
     * @param {Event} browserEvent Browser event.
     * @param {boolean=} opt_dragging Is the map currently being dragged?
     * @param {?import("./PluggableMap.js").FrameState=} opt_frameState Frame state.
     */
    function MapBrowserEvent(type, map, browserEvent, opt_dragging, opt_frameState) {
        var _this = _super.call(this, type, map, opt_frameState) || this;
        /**
         * The original browser event.
         * @const
         * @type {Event}
         * @api
         */
        _this.originalEvent = browserEvent;
        /**
         * The map pixel relative to the viewport corresponding to the original browser event.
         * @type {import("./pixel.js").Pixel}
         * @api
         */
        _this.pixel = map.getEventPixel(browserEvent);
        /**
         * The coordinate in view projection corresponding to the original browser event.
         * @type {import("./coordinate.js").Coordinate}
         * @api
         */
        _this.coordinate = map.getCoordinateFromPixel(_this.pixel);
        /**
         * Indicates if the map is currently being dragged. Only set for
         * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
         *
         * @type {boolean}
         * @api
         */
        _this.dragging = opt_dragging !== undefined ? opt_dragging : false;
        return _this;
    }
    /**
     * Prevents the default browser action.
     * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
     * @override
     * @api
     */
    MapBrowserEvent.prototype.preventDefault = function () {
        _super.prototype.preventDefault.call(this);
        this.originalEvent.preventDefault();
    };
    /**
     * Prevents further propagation of the current event.
     * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
     * @override
     * @api
     */
    MapBrowserEvent.prototype.stopPropagation = function () {
        _super.prototype.stopPropagation.call(this);
        this.originalEvent.stopPropagation();
    };
    return MapBrowserEvent;
}(MapEvent));
export default MapBrowserEvent;
//# sourceMappingURL=MapBrowserEvent.js.map