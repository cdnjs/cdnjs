import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../../Base";
import { registry } from "../../Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for color modifiers.
 *
 * @ignore Exclude from docs
 */
var ColorModifier = /** @class */ (function (_super) {
    __extends(ColorModifier, _super);
    /**
     * Constructor
     */
    function ColorModifier() {
        var _this = _super.call(this) || this;
        _this.className = "ColorModifier";
        _this.applyTheme();
        return _this;
    }
    /**
     * Modifies color value.
     *
     * @ignore Exclude from docs
     * @param value  Original color
     * @return Modified
     */
    ColorModifier.prototype.modify = function (value) {
        return value;
    };
    return ColorModifier;
}(BaseObject));
export { ColorModifier };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ColorModifier"] = ColorModifier;
//# sourceMappingURL=ColorModifier.js.map