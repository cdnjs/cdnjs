/**
 * Axis break module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { WavedLine } from "../../core/elements/WavedLine";
import { List } from "../../core/utils/List";
import { registry } from "../../core/Registry";
import { color } from "../../core/utils/Color";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class to define "breaks" on axes.
 *
 * @see {@link IAxisBreakEvents} for a list of available events
 * @see {@link IAxisBreakAdapters} for a list of available Adapters
 * @important
 */
var AxisBreak = /** @class */ (function (_super) {
    __extends(AxisBreak, _super);
    /**
     * Constructor
     */
    function AxisBreak() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Reference to parent Axis.
         */
        _this._axis = new MutableValueDisposer();
        /**
         * A list of axis data items which fall within this break.
         */
        _this.dataItems = new List();
        _this.className = "AxisBreak";
        // Set defaults
        _this.breakSize = 0.01;
        _this.marginLeft = -5;
        _this.marginRight = -5;
        _this.marginTop = -5;
        _this.marginBottom = -5;
        var interfaceColors = new InterfaceColorSet();
        // Create elements
        // (these won't be used actually, just for setting properties)
        var fillShape = new WavedLine();
        fillShape.fill = interfaceColors.getFor("background");
        fillShape.stroke = color();
        fillShape.fillOpacity = 0.9;
        fillShape.zIndex = 0;
        _this._fillShape = fillShape;
        var startLine = new WavedLine();
        startLine.fill = color();
        startLine.stroke = interfaceColors.getFor("grid");
        startLine.strokeOpacity = 0.3;
        startLine.zIndex = 1;
        _this._startLine = startLine;
        var endLine = new WavedLine();
        endLine.fill = color();
        endLine.stroke = color("#000000"); // interfaceColors.getFor("grid");
        endLine.strokeOpacity = 0.3;
        endLine.zIndex = 2;
        _this._endLine = endLine;
        _this._disposers.push(_this._axis);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    AxisBreak.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._fillShape) {
            this._fillShape.dispose();
        }
        if (this._startLine) {
            this._startLine.dispose();
        }
        if (this._endLine) {
            this._endLine.dispose();
        }
    };
    Object.defineProperty(AxisBreak.prototype, "startLine", {
        /**
         * @return Element
         */
        get: function () {
            return this._startLine;
        },
        /**
         * An element used for the starting line of the break.
         *
         * @param sprite  Element
         */
        set: function (sprite) {
            if (this._startLine) {
                this._startLine.dispose();
            }
            this._startLine = sprite;
            this.addBreakSprite(sprite);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBreak.prototype, "endLine", {
        /**
         * @return Element
         */
        get: function () {
            return this._endLine;
        },
        /**
         * An element used for the end line of the break.
         *
         * @param sprite Element
         */
        set: function (sprite) {
            if (this._endLine) {
                this._endLine.dispose();
            }
            this._endLine = sprite;
            this.addBreakSprite(sprite);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBreak.prototype, "fillShape", {
        /**
         * @return Element
         */
        get: function () {
            return this._fillShape;
        },
        /**
         * An element used for fill of the break.
         *
         * @param sprite Element
         */
        set: function (sprite) {
            if (this._fillShape) {
                this._fillShape.dispose();
            }
            this._fillShape = sprite;
            this.addBreakSprite(sprite);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a break element (e.g. lines, fill) to the break, which is
     * [[Container]].
     *
     * @ignore Exclude from docs
     * @param sprite Element to add
     */
    AxisBreak.prototype.addBreakSprite = function (sprite) {
        sprite.parent = this;
        sprite.isMeasured = false;
        this._disposers.push(sprite);
    };
    Object.defineProperty(AxisBreak.prototype, "axis", {
        /**
         * @return Axis
         */
        get: function () {
            return this._axis.get();
        },
        /**
         * An Axis this Break is associated with.
         *
         * @param axis  Axis
         */
        set: function (axis) {
            if (this._axis.get() !== axis) {
                this._axis.set(axis, axis.renderer.gridContainer.events.on("transformed", this.invalidate, this, false));
                axis.renderer.createBreakSprites(this);
                // this can't go to copyFrom, as axis is set later
                var breakTemplate = axis.axisBreaks.template;
                this.startLine.copyFrom(breakTemplate.startLine);
                this.endLine.copyFrom(breakTemplate.endLine);
                this.fillShape.copyFrom(breakTemplate.fillShape);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBreak.prototype, "breakSize", {
        /**
         * @return Relative axis break
         */
        get: function () {
            return this.getPropertyValue("breakSize");
        },
        /**
         * A size of the break relative to the actual size of the scope break spans.
         *
         * For example, if `breakSize = 0.1` and unbroken scope of values it spans
         * would be 100 pixels, the break would be 10 pixels wide.
         *
         * 0 means the break will completely collapse and hide the values.
         * 1 means break would be not collapse at all, which would make it
         * effectively useless.
         *
         * @default 0.01
         * @param value  Relative axis break
         */
        set: function (value) {
            if (this.setPropertyValue("breakSize", value)) {
                if (this.axis) {
                    this.axis.invalidate();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBreak.prototype, "startPoint", {
        /**
         * Returns pixel coordinates of axis break's start.
         *
         * @return Start point
         */
        get: function () {
            var renderer = this.axis.renderer;
            if (renderer) {
                return renderer.positionToPoint(this.startPosition);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBreak.prototype, "endPoint", {
        /**
         * Returns pixel coordinates of axis break's end.
         *
         * @return End point
         */
        get: function () {
            var renderer = this.axis.renderer;
            if (renderer) {
                return renderer.positionToPoint(this.endPosition);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBreak.prototype, "startPosition", {
        /**
         * Returns a relative position at which axis break starts.
         *
         * This is a calculated position, meaning it shows relative position of the
         * break after break is applied.
         *
         * @return Start position
         */
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBreak.prototype, "endPosition", {
        /**
         * Returns a relative position at which axis break ends.
         *
         * This is a calculated position, meaning it shows relative position of the
         * break after break is applied.
         *
         * @return End position
         */
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Draws the axis break.
     *
     * @ignore Exclude from docs
     */
    AxisBreak.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.axis) {
            var renderer = this.axis.renderer;
            renderer.updateBreakElement(this);
        }
    };
    Object.defineProperty(AxisBreak.prototype, "startValue", {
        /**
         * @return Starting value
         */
        get: function () {
            return this.getPropertyValue("startValue");
        },
        /**
         * A starting value for the break.
         *
         * @param value  Starting value
         */
        set: function (value) {
            if (this.setPropertyValue("startValue", value)) {
                if (this.axis) {
                    this.axis.invalidate();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBreak.prototype, "endValue", {
        /**
         * @return End value
         */
        get: function () {
            return this.getPropertyValue("endValue");
        },
        /**
         * An end value for the break.
         *
         * @param value  End value
         */
        set: function (value) {
            if (this.setPropertyValue("endValue", value)) {
                if (this.axis) {
                    this.axis.invalidate();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return AxisBreak;
}(Container));
export { AxisBreak };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisBreak"] = AxisBreak;
//# sourceMappingURL=AxisBreak.js.map