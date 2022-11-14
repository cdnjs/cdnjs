/**
 * Functionality for drawing simple ClockHands
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { Circle } from "../../core/elements/Circle";
import { Trapezoid } from "../../core/elements/Trapezoid";
import { MutableValueDisposer, MultiDisposer } from "../../core/utils/Disposer";
import { percent } from "../../core/utils/Percent";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * ClockHand class is capable of drawing a simple pointy shape with optionally
 * rounderd corners and an icon.
 *
 * @see {@link IClockHandEvents} for a list of available events
 * @see {@link IClockHandAdapters} for a list of available Adapters
 * @todo Improve
 * @important
 */
var ClockHand = /** @class */ (function (_super) {
    __extends(ClockHand, _super);
    /**
     * Constructor
     */
    function ClockHand() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * An Axis hand is related to.
         */
        _this._axis = new MutableValueDisposer();
        _this.className = "ClockHand";
        var interfaceColors = new InterfaceColorSet();
        _this.fill = interfaceColors.getFor("alternativeBackground");
        _this.stroke = _this.fill;
        var pin = new Circle();
        pin.radius = 5;
        _this.pin = pin;
        _this.isMeasured = false;
        _this.startWidth = 5;
        _this.endWidth = 1;
        _this.width = percent(100);
        _this.height = percent(100);
        _this.radius = percent(100);
        _this.innerRadius = percent(0);
        var hand = new Trapezoid();
        _this.hand = hand;
        _this._disposers.push(_this._axis);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Re(validates) the clock hand, effectively redrawing it.
     *
     * @ignore Exclude from docs
     */
    ClockHand.prototype.validate = function () {
        _super.prototype.validate.call(this);
        var hand = this.hand;
        hand.width = this.pixelWidth;
        var h = Math.max(this.startWidth, this.endWidth);
        hand.height = h;
        hand.leftSide = percent(this.startWidth / h * 100);
        hand.rightSide = percent(this.endWidth / h * 100);
        if (this.axis) {
            var renderer = this.axis.renderer;
            var x0 = $utils.relativeRadiusToValue(this.innerRadius, renderer.pixelRadius);
            var x1 = $utils.relativeRadiusToValue(this.radius, renderer.pixelRadius);
            hand.x = x0;
            hand.y = -h / 2;
            hand.width = x1 - x0;
        }
    };
    Object.defineProperty(ClockHand.prototype, "pin", {
        /**
         * @return Pin element
         */
        get: function () {
            return this._pin;
        },
        /**
         * A circle element used as hand's base. (pin)
         *
         * @param pin  Pin element
         */
        set: function (pin) {
            if (this._pin) {
                this.removeDispose(this._pin);
            }
            if (pin) {
                this._pin = pin;
                pin.parent = this;
                this._disposers.push(pin);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClockHand.prototype, "hand", {
        /**
         * @return Hand element
         */
        get: function () {
            return this._hand;
        },
        /**
         * A trapezoid shape used for hand itself.
         *
         * The shape of the trapezoid is controlled by ClockHand's `startWidth` and
         * `endWidth` properties.
         *
         * Set `endWidth` to 1 (px) to make it pointy.
         *
         * @param hand  Hand element
         */
        set: function (hand) {
            if (this._hand) {
                this.removeDispose(this._hand);
            }
            if (hand) {
                this._hand = hand;
                hand.parent = this;
                this._disposers.push(hand);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClockHand.prototype, "radius", {
        /**
         * @return Radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Radius of the hand's outer end. (tip)
         *
         * Absolute (px) or relative ([[Percent]]).
         *
         * @default Percent(0)
         * @param value  Radius
         */
        set: function (value) {
            this.setPercentProperty("radius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClockHand.prototype, "innerRadius", {
        /**
         * @return Radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Radius of the hand's inner end. (base)
         *
         * Absolute (px) or relative ([[Percent]]).
         *
         * @default Percent(0)
         * @param value  Radius
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClockHand.prototype, "startWidth", {
        /**
         * @return Width (px)
         */
        get: function () {
            return this.getPropertyValue("startWidth");
        },
        /**
         * Width, in pixels, of the clock hand's inner end. (base)
         *
         * @default 5
         * @param value  Width (px)
         */
        set: function (value) {
            this.setPropertyValue("startWidth", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClockHand.prototype, "endWidth", {
        /**
         * @return Width (px)
         */
        get: function () {
            return this.getPropertyValue("endWidth");
        },
        /**
         * Width, in pixels, of the clock hand's outer end. (tip)
         *
         * @default 1
         * @param value  Width (px)
         */
        set: function (value) {
            this.setPropertyValue("endWidth", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClockHand.prototype, "rotationDirection", {
        /**
         * @return rotationDirection
         */
        get: function () {
            return this.getPropertyValue("rotationDirection");
        },
        /**
         * Rotation direction
         *
         * @default any
         * @param value
         */
        set: function (value) {
            this.setPropertyValue("rotationDirection", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves clock hand to particular value.
     *
     * If `duration` is set to a number in milliseconds, the hand will move
     * to the new position gracefully, rather than jumping rigth to it.
     *
     * Alternatively, you can also set `value` directly.
     *
     * @param value     New value
     * @param duration  Animation duration (ms)
     * @param easing  Animation easing function
     */
    ClockHand.prototype.showValue = function (value, duration, easing) {
        this._value = value;
        if (value != undefined) {
            if (!$type.isNumber(duration)) {
                duration = 0;
            }
            if (this.axis) {
                var renderer = this.axis.renderer;
                var newAngle = renderer.positionToAngle(this.axis.anyToPosition(value));
                var currentAngle = this.rotation;
                if (this.rotationDirection == "clockWise") {
                    if (newAngle < currentAngle) {
                        this.rotation = currentAngle - 360;
                    }
                }
                if (this.rotationDirection == "counterClockWise") {
                    if (newAngle > currentAngle) {
                        this.rotation = currentAngle + 360;
                    }
                }
                this.animate({ property: "rotation", to: newAngle }, duration, easing);
            }
        }
    };
    Object.defineProperty(ClockHand.prototype, "currentPosition", {
        /**
         * Returns hand's relative position on axis
         */
        get: function () {
            if (this.axis) {
                var renderer = this.axis.renderer;
                return renderer.angleToPosition(this.rotation);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClockHand.prototype, "value", {
        /**
         * @return Value
         */
        get: function () {
            return this._value;
        },
        /**
         * A current value clock hand is pointing to.
         *
         * @param value  Value
         */
        set: function (value) {
            this.showValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClockHand.prototype, "axis", {
        /**
         * @return Axis
         */
        get: function () {
            return this._axis.get();
        },
        /**
         * An Axis clock hand is associated with.
         *
         * Hand's `value` relates to values on the Axis.
         *
         * @param axis  Axis
         */
        set: function (axis) {
            if (this.axis != axis) {
                this._axis.set(axis, new MultiDisposer([
                    axis.events.on("datavalidated", this.updateValue, this, false),
                    axis.events.on("datarangechanged", this.updateValue, this, false),
                    axis.events.on("dataitemsvalidated", this.updateValue, this, false),
                    axis.events.on("propertychanged", this.invalidate, this, false)
                ]));
            }
            if (axis) {
                var chart = axis.chart;
                if (chart) {
                    this.rotation = chart.startAngle;
                }
            }
            this.parent = axis.renderer;
            this.zIndex = 5;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Triggers `value` accessor, so that Hand animates to new position, in case
     * value has changed.
     *
     * @ignore Exclude from docs
     */
    ClockHand.prototype.updateValue = function () {
        this.value = this.value;
    };
    /**
 * Processes JSON-based config before it is applied to the object.
 *
 * @ignore Exclude from docs
 * @param config  Config
 */
    ClockHand.prototype.processConfig = function (config) {
        if (config) {
            // Connect clock hands with axes
            if ($type.hasValue(config.axis) && $type.isString(config.axis) && this.map.hasKey(config.axis)) {
                config.axis = this.map.getKey(config.axis);
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    return ClockHand;
}(Container));
export { ClockHand };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ClockHand"] = ClockHand;
//# sourceMappingURL=ClockHand.js.map