/**
 * Contains code and logic for generating radial gradients.
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
import * as $type from "../../utils/Type";
import { Percent } from "../../utils/Percent";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Radial gradient class.
 */
var RadialGradient = /** @class */ (function (_super) {
    __extends(RadialGradient, _super);
    /**
     * Constructor
     */
    function RadialGradient() {
        var _this = _super.call(this) || this;
        /**
         * List of colors switch definitions in a gradient.
         */
        _this._stops = new List();
        _this.element = _this.paper.addGroup("radialGradient");
        _this.id = "gradient-" + registry.getUniqueId();
        _this.element.attr({ "id": _this.id });
        _this._disposers.push(_this.element);
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws gradient.
     */
    RadialGradient.prototype.draw = function () {
        var _this = this;
        var gradientElement = this.element;
        if ($type.isNumber(this.cx)) {
            var value = this.cx;
            if (value instanceof Percent) {
                value = value.percent + "%";
            }
            gradientElement.attr({ "cx": value });
        }
        if ($type.isNumber(this.cy)) {
            var value = this.cy;
            if (value instanceof Percent) {
                value = value.percent + "%";
            }
            gradientElement.attr({ "cy": value });
        }
        if (this.fx) {
            var value = this.fx;
            if (value instanceof Percent) {
                value = value.percent + "%";
            }
            gradientElement.attr({ "fx": value });
        }
        if (this.fy) {
            var value = this.fy;
            if (value instanceof Percent) {
                value = value.percent + "%";
            }
            gradientElement.attr({ "fy": value });
        }
        gradientElement.removeChildNodes();
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
     * Adds a color step to the gradient.
     *
     * @param color    Color (hex code or named color)
     * @param opacity  Opacity (value from 0 to 1; 0 completely transaprent, 1 fully opaque)
     * @param offset   Position of color in the gradient (value 0 to 1; 0 meaning start of the gradient and 1 end)
     */
    RadialGradient.prototype.addColor = function (color, opacity, offset) {
        this._stops.push({ color: color, opacity: opacity, offset: offset });
        this.draw();
    };
    Object.defineProperty(RadialGradient.prototype, "paper", {
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
         * A [[Paper]] instace to use for the gradient.
         *
         * @ignore Exclude from docs
         * @param paper  Paper
         */
        set: function (paper) {
            if (this._paper != paper) {
                this._paper = paper;
                this.draw();
                paper.appendDef(this.element);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialGradient.prototype, "cx", {
        get: function () {
            return this._cx;
        },
        /**
         * Center x coordinate of the gradient, can be set as number or Percent
         *
         * @param point  Center point
         */
        set: function (value) {
            this._cx = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialGradient.prototype, "cy", {
        get: function () {
            return this._cy;
        },
        /**
         * Center y coordinate of the gradient, can be set as number or Percent
         *
         * @param point  Center point
         */
        set: function (value) {
            this._cy = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialGradient.prototype, "fx", {
        get: function () {
            return this._fx;
        },
        /**
         * y coordinate of the focal point of a gradient, can be set in pixels or as Percent
         *
         * @param point  Center point
         */
        set: function (value) {
            this._fx = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialGradient.prototype, "fy", {
        get: function () {
            return this._fy;
        },
        /**
         * y coordinate of the focal point of a gradient, can be set in pixels or as Percent
         *
         * @param point  Center point
         */
        set: function (value) {
            this._fy = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    RadialGradient.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.stops.copyFrom(source.stops);
        this.cx = source.cx;
        this.cy = source.cy;
        this.fx = source.fx;
        this.fy = source.fy;
    };
    Object.defineProperty(RadialGradient.prototype, "stops", {
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
    /**
     * Clears the gradient.
     *
     * @ignore Exclude from docs
     */
    RadialGradient.prototype.clear = function () {
        this._stops.clear();
    };
    return RadialGradient;
}(BaseObject));
export { RadialGradient };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["RadialGradient"] = RadialGradient;
//# sourceMappingURL=RadialGradient.js.map