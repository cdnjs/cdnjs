/**
 * Map arched line module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLine } from "./MapLine";
import { Polyarc } from "../../core/elements/Polyarc";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw an arched line on the map.
 *
 * @see {@link IMapArcEvents} for a list of available events
 * @see {@link IMapArcAdapters} for a list of available Adapters
 */
var MapArc = /** @class */ (function (_super) {
    __extends(MapArc, _super);
    /**
     * Constructor
     */
    function MapArc() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "MapArc";
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * @ignore
     */
    MapArc.prototype.createLine = function () {
        this.line = new Polyarc();
    };
    Object.defineProperty(MapArc.prototype, "shortestDistance", {
        get: function () {
            return false;
        },
        /**
         * `shortestDistance = true` is not supported by `MapArc`.
         *
         * Only [[MapLine]] supports it.
         *
         * @default false
         * @param value
         */
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return MapArc;
}(MapLine));
export { MapArc };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapArc"] = MapArc;
//# sourceMappingURL=MapArc.js.map