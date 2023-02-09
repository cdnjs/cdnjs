/**
 * Map spline module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLine } from "./MapLine";
import { Polyspline } from "../../core/elements/Polyspline";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a spline on the map.
 *
 * @see {@link IMapSplineEvents} for a list of available events
 * @see {@link IMapSplineAdapters} for a list of available Adapters
 */
var MapSpline = /** @class */ (function (_super) {
    __extends(MapSpline, _super);
    /**
     * Constructor
     */
    function MapSpline() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "MapSpline";
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * @ignore
     */
    MapSpline.prototype.createLine = function () {
        this.line = new Polyspline();
        this.line.tensionX = 0.8;
        this.line.tensionY = 0.8;
    };
    Object.defineProperty(MapSpline.prototype, "shortestDistance", {
        /**
         * ShortestDistance = true is not supported by MapSpline, only MapLine does support it
         * @default false
         * @param value
         * @todo: review description
         */
        get: function () {
            return false;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return MapSpline;
}(MapLine));
export { MapSpline };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapSpline"] = MapSpline;
//# sourceMappingURL=MapSpline.js.map