/**
 * This module contains PatternSet object definition
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { Color } from "./Color";
import { InterfaceColorSet } from "./InterfaceColorSet";
import { LinePattern } from "../rendering/fills/LinePattern";
import { RectPattern } from "../rendering/fills/RectPattern";
import { CirclePattern } from "../rendering/fills/CirclePattern";
import { registry } from "../Registry";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines an interable list of distinctive patterns that can be used in
 * conjunction to colors to generate various fill patterns.
 *
 * @important
 * @since 4.7.5
 * @see {@link https://www.amcharts.com/docs/v4/concepts/colors/} for color-related info
 */
var PatternSet = /** @class */ (function (_super) {
    __extends(PatternSet, _super);
    /**
     * Constructor
     */
    function PatternSet() {
        var _this = _super.call(this) || this;
        /**
         * Holds the list of the colors in this set. (preset or auto-generated)
         */
        _this._list = [];
        /**
         * Current step.
         */
        _this._currentStep = 0;
        /**
         * If set to non-zero value, the PatternSet will start iterating patterns from
         * that particular index, not the first pattern in the list.
         */
        _this._startIndex = 0;
        /**
         * Current pass in cycle. Once all patterns in the list are iterated,
         * iteration restarts from beginning and currentPass is incremented.
         */
        _this._currentPass = 0;
        /**
         * A base color. If there are no colors pre-set in the color list, ColorSet
         * will use this color as a base when generating new ones, applying
         * `stepOptions` and `passOptions` to this base color.
         */
        _this.baseColor = new Color({
            r: 103,
            g: 183,
            b: 220
        });
        _this.className = "PatternSet";
        // Set base color to be used for pattern elements
        var interfaceColors = new InterfaceColorSet();
        // Set default patterns
        _this.list = [
            _this.getLinePattern(1000, 45, 1, 6),
            _this.getRectPattern(10, 0, 4),
            _this.getLinePattern(1000, -45, 1, 6),
            _this.getCirclePattern(11, 2, true),
            _this.getLinePattern(6, 90, 1),
            _this.getRectPattern(12, 45, 6, true),
            _this.getLinePattern(6, 0, 1),
            _this.getRectPattern(7, 0, 4),
            _this.getLinePattern(1000, 45, 2, 3, "4,2"),
            _this.getCirclePattern(9, 3, false),
            _this.getLinePattern(1000, -45, 2, 3, "4,2"),
            _this.getRectPattern(10, 45, Math.sqrt(50)),
            _this.getLinePattern(1000, -45, 2, 1),
            _this.getRectPattern(10, 0, 9),
            _this.getLinePattern(1000, 45, 2, 1),
            _this.getLinePattern(1000, 0, 3, 1),
            _this.getRectPattern(10, 45, 10),
            _this.getLinePattern(1000, 90, 3, 1)
        ];
        _this.baseColor = interfaceColors.getFor("stroke");
        _this.applyTheme();
        return _this;
    }
    PatternSet.prototype.getLinePattern = function (size, rotation, thickness, gap, strokeDashArray) {
        var pattern = new LinePattern();
        pattern.width = size;
        pattern.height = size;
        pattern.stroke = this.baseColor;
        pattern.gap = gap;
        pattern.strokeDasharray = strokeDashArray;
        pattern.strokeWidth = thickness;
        pattern.rotation = rotation;
        return pattern;
    };
    PatternSet.prototype.getRectPattern = function (size, rotation, thickness, outline) {
        var pattern = new RectPattern();
        pattern.width = size;
        pattern.height = size;
        pattern.rectWidth = thickness;
        pattern.rectHeight = thickness;
        if (outline) {
            pattern.stroke = this.baseColor;
            pattern.strokeWidth = 1;
            pattern.fillOpacity = 0;
        }
        else {
            pattern.fill = this.baseColor;
            pattern.strokeWidth = 0;
        }
        if (rotation != 0) {
            pattern.shapeRendering = "auto";
        }
        pattern.rotation = rotation;
        return pattern;
    };
    PatternSet.prototype.getCirclePattern = function (size, radius, outline) {
        var pattern = new CirclePattern();
        pattern.width = size;
        pattern.height = size;
        pattern.shapeRendering = "auto";
        pattern.radius = radius;
        if (outline) {
            pattern.stroke = this.baseColor;
            pattern.strokeWidth = 1;
            pattern.fillOpacity = 0;
        }
        else {
            pattern.fill = this.baseColor;
            pattern.strokeWidth = 0;
        }
        return pattern;
    };
    Object.defineProperty(PatternSet.prototype, "list", {
        /**
         * @return Pattern list
         */
        get: function () {
            return this._list;
        },
        /**
         * List of pre-defined patterns to be used in set.
         *
         * @param value Pattern list
         */
        set: function (value) {
            this._list = value;
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the next pattern in list.
     *
     * @return Pattern
     */
    PatternSet.prototype.next = function () {
        var pattern = this.getIndex(this.currentStep);
        this._currentStep++;
        return pattern;
    };
    /**
     * Returns a color at specific index in the list.
     *
     * @param  i  Index
     * @return Pattern
     */
    PatternSet.prototype.getIndex = function (i) {
        var pattern;
        while (this.list.length <= i) {
            this.generatePatterns();
        }
        pattern = this.list[i];
        return pattern.clone();
    };
    /**
     * Generates a new set of patterns.
     */
    PatternSet.prototype.generatePatterns = function () {
        var count = this.list.length / (this._currentPass + 1);
        this._currentPass++;
        for (var i = 0; i < count; i++) {
            this.list.push(this.list[i].clone());
        }
    };
    /**
     * Resets internal iterator.
     *
     * Calling `next()` after this will return the very first color in the color
     * list, even if it was already returned before.
     */
    PatternSet.prototype.reset = function () {
        this._currentStep = this._startIndex;
    };
    Object.defineProperty(PatternSet.prototype, "currentStep", {
        /**
         * @return Step
         */
        get: function () {
            return this._currentStep;
        },
        /**
         * Sets current color iteration. You can use this property to skip some
         * colors from iteration. E.g. setting it to `10` will skip first ten
         * colors.
         *
         * Please note that the number is zero-based.
         *
         * @param value  Step
         */
        set: function (value) {
            this._currentStep = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatternSet.prototype, "startIndex", {
        /**
         * @return Index
         */
        get: function () {
            return this._startIndex;
        },
        /**
         * If set to non-zero value, the ColorSet will start iterating colors from
         * that particular index, not the first color in the list.
         *
         * @default 0
         * @param  value  Index
         */
        set: function (value) {
            this._startIndex = value;
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    PatternSet.prototype.processConfig = function (config) {
        // if (config) {
        // 	// Set up axis ranges
        // 	if ($type.hasValue(config.list) && $type.isArray(config.list)) {
        // 		for (let i = 0, len = config.list.length; i < len; i++) {
        // 			if (!(config.list[i] instanceof Color)) {
        // 				config.list[i] = color(config.list[i]);
        // 			}
        // 		}
        // 	}
        // }
        _super.prototype.processConfig.call(this, config);
    };
    return PatternSet;
}(BaseObject));
export { PatternSet };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PatternSet"] = PatternSet;
//# sourceMappingURL=PatternSet.js.map