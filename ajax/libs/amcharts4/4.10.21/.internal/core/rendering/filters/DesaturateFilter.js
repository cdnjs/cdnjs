/**
 * Module for "Desaturate" filter.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Filter } from "./Filter";
import { registry } from "../../Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creats a "Desaturate" filter
 */
var DesaturateFilter = /** @class */ (function (_super) {
    __extends(DesaturateFilter, _super);
    /**
     * Constructor
     */
    function DesaturateFilter() {
        var _this = _super.call(this) || this;
        _this.className = "DesaturateFilter";
        // Create elements
        // NOTE: we do not need to add each individual element to `_disposers`
        // because `filterPrimitives` has an event handler which automatically adds
        // anything added to it to `_disposers`
        _this.feColorMatrix = _this.paper.add("feColorMatrix");
        _this.feColorMatrix.attr({ "type": "saturate" });
        _this.filterPrimitives.push(_this.feColorMatrix);
        // Set default properties
        _this.width = 120;
        _this.height = 120;
        _this.saturation = 0;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(DesaturateFilter.prototype, "saturation", {
        /**
         * @return Saturation (0-1)
         */
        get: function () {
            return this.properties["saturation"];
        },
        /**
         * Saturation.
         *
         * 0 - completely desaturated.
         * 1 - fully saturated (gray).
         *
         * @param value  Saturation (0-1)
         */
        set: function (value) {
            this.properties["saturation"] = value;
            this.feColorMatrix.attr({ "values": value.toString() });
        },
        enumerable: true,
        configurable: true
    });
    return DesaturateFilter;
}(Filter));
export { DesaturateFilter };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["DesaturateFilter"] = DesaturateFilter;
//# sourceMappingURL=DesaturateFilter.js.map