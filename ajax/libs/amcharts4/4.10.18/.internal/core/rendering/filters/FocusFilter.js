/**
 * Module for "Focus" filter.
 */
import { __extends } from "tslib";
import { Filter } from "./Filter";
import { InterfaceColorSet } from "../../utils/InterfaceColorSet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a "Focus" filter.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/accessibility/} more about accessibility
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/changing-appearance-of-focused-items/} cusomizing focus appearance
 */
var FocusFilter = /** @class */ (function (_super) {
    __extends(FocusFilter, _super);
    /**
     * Constructor
     */
    function FocusFilter() {
        var _this = _super.call(this) || this;
        _this.className = "FocusFilter";
        // Create elements
        // NOTE: we do not need to add each individual element to `_disposers`
        // because `filterPrimitives` has an event handler which automatically adds
        // anything added to it to `_disposers`
        _this.feFlood = _this.paper.add("feFlood");
        _this.feFlood.attr({ "flood-color": new InterfaceColorSet().getFor("primaryButtonHover"), "result": "base" });
        _this.filterPrimitives.push(_this.feFlood);
        _this.feMorphology = _this.paper.add("feMorphology");
        _this.feMorphology.attr({ "result": "bigger", "in": "SourceGraphic", "operator": "dilate", "radius": "2" });
        _this.filterPrimitives.push(_this.feMorphology);
        _this.feColorMatrix = _this.paper.add("feColorMatrix");
        _this.feColorMatrix.attr({ "result": "mask", "in": "bigger", "type": "matrix", "values": "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" });
        _this.filterPrimitives.push(_this.feColorMatrix);
        _this.feComposite = _this.paper.add("feComposite");
        _this.feComposite.attr({ "result": "drop", "in": "base", "in2": "mask", "operator": "in" });
        _this.filterPrimitives.push(_this.feComposite);
        _this.feBlend = _this.paper.add("feBlend");
        _this.feBlend.attr({ "in": "SourceGraphic", "in2": "drop", "mode": "normal" });
        _this.filterPrimitives.push(_this.feBlend);
        // Set default properties
        _this.width = 130;
        _this.height = 130;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(FocusFilter.prototype, "stroke", {
        /**
         * @return Color
         */
        get: function () {
            return this.properties["stroke"];
        },
        /**
         * Stroke (outline) color.
         *
         * @param value  Color
         */
        set: function (value) {
            this.properties["stroke"] = value;
            this.feFlood.attr({ "flood-color": value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusFilter.prototype, "strokeWidth", {
        /**
         * @return Outline thickness (px)
         */
        get: function () {
            return this.properties["strokeWidth"];
        },
        /**
         * Stroke (outline) thickness in pixels.
         *
         * @param value  Outline thickness (px)
         */
        set: function (value) {
            this.properties["strokeWidth"] = value;
            this.feMorphology.attr({ "radius": value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusFilter.prototype, "opacity", {
        /**
         * @return Outline opacity (0-1)
         */
        get: function () {
            return this.properties["opacity"];
        },
        /**
         * Opacity of the outline. (0-1)
         *
         * @param value  Outline opacity (0-1)
         */
        set: function (value) {
            this.properties["opacity"] = value;
            this.feColorMatrix.attr({ "values": "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " + value + " 0" });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets filter's target element.
     *
     * In addition it also disables built-in focus outline on element this
     * filter is applied to.
     *
     * @ignore Exclude from docs
     * @param value  Element filter is being attached to
     */
    FocusFilter.prototype.setSprite = function (value) {
        if (this._sprite && this._sprite != value) {
            this._sprite.group.removeStyle("outline");
        }
        value.group.addStyle({
            "outline": "none"
        });
        _super.prototype.setSprite.call(this, value);
    };
    return FocusFilter;
}(Filter));
export { FocusFilter };
//# sourceMappingURL=FocusFilter.js.map