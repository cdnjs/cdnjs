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
 * @module ol/MapEvent
 */
import Event from './events/Event.js';
/**
 * @classdesc
 * Events emitted as map events are instances of this type.
 * See {@link module:ol/PluggableMap~PluggableMap} for which events trigger a map event.
 */
var MapEvent = /** @class */ (function (_super) {
    __extends(MapEvent, _super);
    /**
     * @param {string} type Event type.
     * @param {import("./PluggableMap.js").default} map Map.
     * @param {?import("./PluggableMap.js").FrameState} [opt_frameState] Frame state.
     */
    function MapEvent(type, map, opt_frameState) {
        var _this = _super.call(this, type) || this;
        /**
         * The map where the event occurred.
         * @type {import("./PluggableMap.js").default}
         * @api
         */
        _this.map = map;
        /**
         * The frame state at the time of the event.
         * @type {?import("./PluggableMap.js").FrameState}
         * @api
         */
        _this.frameState = opt_frameState !== undefined ? opt_frameState : null;
        return _this;
    }
    return MapEvent;
}(Event));
export default MapEvent;
//# sourceMappingURL=MapEvent.js.map