/**
 * Module for "Blur" filter.
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
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a "Blur" filter.
 */
var BlurFilter = /** @class */ (function (_super) {
    __extends(BlurFilter, _super);
    /**
     * Constructor
     */
    function BlurFilter() {
        var _this = _super.call(this) || this;
        _this.className = "BlurFilter";
        // Create elements
        // NOTE: we do not need to add each individual element to `_disposers`
        // because `filterPrimitives` has an event handler which automatically adds
        // anything added to it to `_disposers`
        _this.feGaussianBlur = _this.paper.add("feGaussianBlur");
        _this.feGaussianBlur.attr({ "result": "blurOut", "in": "SourceGraphic" });
        _this.filterPrimitives.push(_this.feGaussianBlur);
        // Set default properties
        _this.width = 200;
        _this.height = 200;
        _this.blur = 1.5;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(BlurFilter.prototype, "blur", {
        /**
         * @return Blur
         */
        get: function () {
            return this.properties.blur;
        },
        /**
         * Blur value.
         *
         * The bigger the value, the blurrier the target element will become.
         *
         * @default 1.5
         * @param value Blur
         */
        set: function (value) {
            this.properties.blur = value;
            this.feGaussianBlur.attr({ "stdDeviation": value / this.scale });
        },
        enumerable: true,
        configurable: true
    });
    return BlurFilter;
}(Filter));
export { BlurFilter };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["BlurFilter"] = BlurFilter;
//# sourceMappingURL=BlurFilter.js.map