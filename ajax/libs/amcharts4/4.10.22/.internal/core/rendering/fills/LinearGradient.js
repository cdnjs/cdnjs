/**
 * Contains code and logic for generating linear gradients.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../../Base";
import { List } from "../../utils/List";
import { getGhostPaper } from "../Paper";
import { registry } from "../../Registry";
import * as $iter from "../../utils/Iterator";
import * as $math from "../../utils/Math";
import * as $type from "../../utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Linear gradient class.
 */
var LinearGradient = /** @class */ (function (_super) {
    __extends(LinearGradient, _super);
    /**
     * Constructor.
     */
    function LinearGradient() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * List of colors switch definitions in a gradient.
         */
        _this._stops = new List();
        /**
         * Gradient direction.
         */
        _this._rotation = 0;
        _this.className = "LinearGradient";
        _this._stops.events.on("setIndex", _this.validate, _this);
        _this._stops.events.on("inserted", _this.validate, _this);
        // Create element
        _this.element = _this.paper.addGroup("linearGradient");
        _this.id = "gradient-" + registry.getUniqueId();
        _this.element.attr({ "id": _this.id });
        _this._disposers.push(_this.element);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws gradient.
     *
     * @ignore Exclude from docs
     */
    LinearGradient.prototype.validate = function () {
        var _this = this;
        var rotation = (this._rotation + 90) * $math.RADIANS;
        var x1 = Math.round(50 + Math.sin(rotation + Math.PI) * 50) + '%';
        var y1 = Math.round(50 + Math.cos(rotation) * 50) + '%';
        var x2 = Math.round(50 + Math.sin(rotation) * 50) + '%';
        var y2 = Math.round(50 + Math.cos(rotation + Math.PI) * 50) + '%';
        var gradientElement = this.element;
        gradientElement.removeChildNodes();
        gradientElement.attr({ "x1": x1, "x2": x2, "y1": y1, "y2": y2 });
        $iter.each($iter.indexed(this._stops.iterator()), function (a) {
            var i = a[0];
            var stop = a[1];
            var offset = stop.offset;
            if (!$type.isNumber(offset)) {
                offset = i / (_this._stops.length - 1);
            }
            var gradientStop = _this.paper.add("stop");
            if ($type.hasValue(stop.color)) {
                gradientStop.attr({ "stop-color": stop.color.toString() });
            }
            if ($type.isNumber(stop.opacity)) {
                gradientStop.attr({ "stop-opacity": stop.opacity });
            }
            if ($type.isNumber(offset)) {
                gradientStop.attr({ "offset": offset });
            }
            gradientElement.add(gradientStop);
        });
    };
    /**
     * Clears the gradient.
     *
     * @ignore Exclude from docs
     */
    LinearGradient.prototype.clear = function () {
        this._stops.clear();
    };
    /**
     * Adds a color step to the gradient.
     *
     * @param color    Color (hex code or named color)
     * @param opacity  Opacity (value from 0 to 1; 0 completely transaprent, 1 fully opaque)
     * @param offset   Position of color in the gradient (value 0 to 1; 0 meaning start of the gradient and 1 end)
     */
    LinearGradient.prototype.addColor = function (color, opacity, offset) {
        this._stops.push({ color: color, opacity: opacity, offset: offset });
    };
    Object.defineProperty(LinearGradient.prototype, "stops", {
        /**
         * A list of color stops in the gradient.
         *
         * @return Stops
         */
        get: function () {
            return this._stops;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearGradient.prototype, "paper", {
        /**
         * @ignore Exclude from docs
         * @return Paper
         */
        get: function () {
            if (this._paper) {
                return this._paper;
            }
            return getGhostPaper();
        },
        /**
         * [[Paper]] instace to use for the gradient.
         *
         * @ignore Exclude from docs
         * @param paper  Paper
         */
        set: function (paper) {
            if (this._paper != paper) {
                this._paper = paper;
                this.validate();
                paper.appendDef(this.element);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearGradient.prototype, "rotation", {
        /**
         * @return Rotation
         */
        get: function () {
            return this._rotation;
        },
        /**
         * Rotation (direction) of the gradient in degrees.
         *
         * @param value  Rotation
         */
        set: function (value) {
            //this.element.attr({ "gradientTransform": "rotate(" + value + " 10 100)" });
            this._rotation = value;
            this.validate();
        },
        enumerable: true,
        configurable: true
    });
    LinearGradient.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.stops.copyFrom(source.stops);
        this._rotation = source.rotation;
    };
    Object.defineProperty(LinearGradient.prototype, "gradientUnits", {
        /**
         * Which units are used when drawing gradient filter.
         *
         * Use `"userSpaceOnUse"` when applying gradient on a perfectly straight line.
         *
         * @since 4.9.17
         * @default objectBoundingBox
         * @param value Filter units
         */
        set: function (value) {
            this.element.attr({ gradientUnits: value });
        },
        enumerable: true,
        configurable: true
    });
    return LinearGradient;
}(BaseObject));
export { LinearGradient };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["LinearGradient"] = LinearGradient;
//# sourceMappingURL=LinearGradient.js.map