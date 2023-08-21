/**
 * Graticule (map grid line).
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLine } from "./MapLine";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Graticule is a map line spanning from the poles or around the globe.
 *
 * @since 4.3.0
 * @see {@link IGraticuleEvents} for a list of available events
 * @see {@link IGraticuleAdapters} for a list of available Adapters
 */
var Graticule = /** @class */ (function (_super) {
    __extends(Graticule, _super);
    /**
     * Constructor
     */
    function Graticule() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "Graticule";
        // Apply theme
        _this.applyTheme();
        _this.shortestDistance = true;
        return _this;
    }
    return Graticule;
}(MapLine));
export { Graticule };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Graticule"] = Graticule;
//# sourceMappingURL=Graticule.js.map