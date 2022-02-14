/**
 * Module for "Drop Shadow" filter.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Filter } from "./Filter";
import { color } from "../../utils/Color";
import { registry } from "../../Registry";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creats a "Drop Shadow" filter.
 */
var DropShadowFilter = /** @class */ (function (_super) {
    __extends(DropShadowFilter, _super);
    /**
     * Constructor
     */
    function DropShadowFilter() {
        var _this = _super.call(this) || this;
        _this.className = "DropShadowFilter";
        // Create elements
        // NOTE: we do not need to add each individual element to `_disposers`
        // because `filterPrimitives` has an event handler which automatically adds
        // anything added to it to `_disposers`
        _this.color = color("#000");
        _this.feGaussianBlur = _this.paper.add("feGaussianBlur");
        _this.feGaussianBlur.attr({ "result": "blurOut", "in": "SourceGraphic" });
        _this.filterPrimitives.push(_this.feGaussianBlur);
        _this.feOffset = _this.paper.add("feOffset");
        _this.feOffset.attr({ "result": "offsetBlur" });
        _this.filterPrimitives.push(_this.feOffset);
        _this.feFlood = _this.paper.add("feFlood");
        _this.feFlood.attr({ "flood-color": _this.color });
        _this.filterPrimitives.push(_this.feFlood);
        _this.feComposite = _this.paper.add("feComposite");
        _this.feComposite.attr({ "in2": "offsetBlur", operator: "in" });
        _this.filterPrimitives.push(_this.feComposite);
        _this.feMerge = _this.paper.addGroup("feMerge");
        _this.feMerge.add(_this.paper.add("feMergeNode"));
        _this.feMerge.add(_this.paper.add("feMergeNode").attr({ "in": "SourceGraphic" }));
        _this.filterPrimitives.push(_this.feMerge);
        // Set default properties
        _this.width = 200;
        _this.height = 200;
        _this.blur = 1.5;
        _this.dx = 3;
        _this.dy = 3;
        _this.opacity = 0.5;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(DropShadowFilter.prototype, "color", {
        /**
         * @return Color
         */
        get: function () {
            return this.properties.color;
        },
        /**
         * Shadow color.
         *
         * @param value  Color
         */
        set: function (value) {
            this.properties.color = value;
            if (this.feFlood) {
                this.feFlood.attr({ "flood-color": value });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropShadowFilter.prototype, "opacity", {
        /**
         * @return Opacity (0-1)
         */
        get: function () {
            return this.properties.opacity;
        },
        /**
         * Opacity of the shadow. (0-1)
         *
         * @param value  Opacity (0-1)
         */
        set: function (value) {
            this.properties.opacity = value;
            this.feFlood.attr({ "flood-opacity": value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropShadowFilter.prototype, "dx", {
        /**
         * @return Horizontal offset (px)
         */
        get: function () {
            return this.properties.dx;
        },
        /**
         * Horizontal offset in pixels.
         *
         * @param value  Horizontal offset (px)
         */
        set: function (value) {
            this.properties.dx = value;
            this.feOffset.attr({ "dx": value / this.scale });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropShadowFilter.prototype, "dy", {
        /**
         * @return Vertical offset (px)
         */
        get: function () {
            return this.properties.dy;
        },
        /**
         * Vertical offset in pixels.
         *
         * @param value Vertical offset (px)
         */
        set: function (value) {
            this.properties.dy = value;
            this.feOffset.attr({ "dy": value / this.scale });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropShadowFilter.prototype, "blur", {
        /**
         * @return Blur
         */
        get: function () {
            return this.properties.blur;
        },
        /**
         * Blur.
         *
         * @param value  Blur
         */
        set: function (value) {
            this.properties.blur = value;
            this.feGaussianBlur.attr({ "stdDeviation": value / this.scale });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * [updateScale description]
     *
     * @todo Description
     */
    DropShadowFilter.prototype.updateScale = function () {
        this.dx = this.dx;
        this.dy = this.dy;
        this.blur = this.blur;
    };
    return DropShadowFilter;
}(Filter));
export { DropShadowFilter };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["DropShadowFilter"] = DropShadowFilter;
//# sourceMappingURL=DropShadowFilter.js.map