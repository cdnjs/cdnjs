/**
 * Tick module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A basic Tick class.
 *
 * A tick is a short dash, mainly connecting an object like axis or slice to
 * it's textual label.
 *
 * @see {@link ITickEvents} for a list of available events
 * @see {@link ITickAdapters} for a list of available Adapters
 * @important
 */
var Tick = /** @class */ (function (_super) {
    __extends(Tick, _super);
    /**
     * Constructor
     */
    function Tick() {
        var _this = _super.call(this) || this;
        _this.className = "Tick";
        var interfaceColors = new InterfaceColorSet();
        _this.fillOpacity = 0;
        _this.length = 6;
        _this.strokeOpacity = 0.2;
        _this.stroke = interfaceColors.getFor("grid");
        _this.isMeasured = false;
        _this.nonScalingStroke = true;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(Tick.prototype, "length", {
        /**
         * @return Length (px)
         */
        get: function () {
            if (this.disabled) {
                return 0;
            }
            return this.getPropertyValue("length");
        },
        /**
         * Length of the tick in pixels.
         *
         * @param value  Length (px)
         */
        set: function (value) {
            this.setPropertyValue("length", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return Tick;
}(Sprite));
export { Tick };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Tick"] = Tick;
//# sourceMappingURL=Tick.js.map