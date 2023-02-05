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
 * @module ol/MapBrowserEvent
 */
import MapEvent from './MapEvent.js';
/**
 * @classdesc
 * Events emitted as map browser events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map browser event.
 * @template {UIEvent} EVENT
 */
var MapBrowserEvent = /** @class */ (function (_super) {
    __extends(MapBrowserEvent, _super);
    /**
     * @param {string} type Event type.
     * @param {import("./PluggableMap.js").default} map Map.
     * @param {EVENT} originalEvent Original event.
     * @param {boolean} [opt_dragging] Is the map currently being dragged?
     * @param {import("./PluggableMap.js").FrameState} [opt_frameState] Frame state.
     * @param {Array<PointerEvent>} [opt_activePointers] Active pointers.
     */
    function MapBrowserEvent(type, map, originalEvent, opt_dragging, opt_frameState, opt_activePointers) {
        var _this = _super.call(this, type, map, opt_frameState) || this;
        /**
         * The original browser event.
         * @const
         * @type {EVENT}
         * @api
         */
        _this.originalEvent = originalEvent;
        /**
         * The map pixel relative to the viewport corresponding to the original browser event.
         * @type {?import("./pixel.js").Pixel}
         */
        _this.pixel_ = null;
        /**
         * The coordinate in the user projection corresponding to the original browser event.
         * @type {?import("./coordinate.js").Coordinate}
         */
        _this.coordinate_ = null;
        /**
         * Indicates if the map is currently being dragged. Only set for
         * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
         *
         * @type {boolean}
         * @api
         */
        _this.dragging = opt_dragging !== undefined ? opt_dragging : false;
        /**
         * @type {Array<PointerEvent>|undefined}
         */
        _this.activePointers = opt_activePointers;
        return _this;
    }
    Object.defineProperty(MapBrowserEvent.prototype, "pixel", {
        /**
         * The map pixel relative to the viewport corresponding to the original event.
         * @type {import("./pixel.js").Pixel}
         * @api
         */
        get: function () {
            if (!this.pixel_) {
                this.pixel_ = this.map.getEventPixel(this.originalEvent);
            }
            return this.pixel_;
        },
        set: function (pixel) {
            this.pixel_ = pixel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MapBrowserEvent.prototype, "coordinate", {
        /**
         * The coordinate corresponding to the original browser event.  This will be in the user
         * projection if one is set.  Otherwise it will be in the view projection.
         * @type {import("./coordinate.js").Coordinate}
         * @api
         */
        get: function () {
            if (!this.coordinate_) {
                this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel);
            }
            return this.coordinate_;
        },
        set: function (coordinate) {
            this.coordinate_ = coordinate;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Prevents the default browser action.
     * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
     * @api
     */
    MapBrowserEvent.prototype.preventDefault = function () {
        _super.prototype.preventDefault.call(this);
        if ('preventDefault' in this.originalEvent) {
            /** @type {UIEvent} */ (this.originalEvent).preventDefault();
        }
    };
    /**
     * Prevents further propagation of the current event.
     * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
     * @api
     */
    MapBrowserEvent.prototype.stopPropagation = function () {
        _super.prototype.stopPropagation.call(this);
        if ('stopPropagation' in this.originalEvent) {
            /** @type {UIEvent} */ (this.originalEvent).stopPropagation();
        }
    };
    return MapBrowserEvent;
}(MapEvent));
export default MapBrowserEvent;
//# sourceMappingURL=MapBrowserEvent.js.map