/**
 * Module for "Lighten" filter.
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
 * Creates a "Lighten" filter.
 */
var LightenFilter = /** @class */ (function (_super) {
    __extends(LightenFilter, _super);
    /**
     * Constructor
     */
    function LightenFilter() {
        var _this = _super.call(this) || this;
        _this.className = "LightenFilter";
        // Create elements
        // NOTE: we do not need to add each individual element to `_disposers`
        // because `filterPrimitives` has an event handler which automatically adds
        // anything added to it to `_disposers`
        _this.feColorMatrix = _this.paper.add("feColorMatrix");
        _this.feColorMatrix.attr({ "type": "matrix" });
        _this.filterPrimitives.push(_this.feColorMatrix);
        // Set default properties
        _this.lightness = 0;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(LightenFilter.prototype, "lightness", {
        /**
         * @return Lightness
         */
        get: function () {
            return this.properties["lightness"];
        },
        /**
         * Lightness of the target colors.
         *
         * If `lightness` is a positive number, the filter will make all colors
         * lighter.
         *
         * If `lightness` is negative, colors will be darkened.
         *
         * @param value  Lightness
         */
        set: function (value) {
            this.properties["lightness"] = value;
            var v = value + 1;
            this.feColorMatrix.attr({ "values": v + " 0 0 0 0 0 " + v + " 0 0 0 0 0 " + v + " 0 0 0 0 0 1 0" });
        },
        enumerable: true,
        configurable: true
    });
    return LightenFilter;
}(Filter));
export { LightenFilter };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["LightenFilter"] = LightenFilter;
//# sourceMappingURL=LightenFilter.js.map