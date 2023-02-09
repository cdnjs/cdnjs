/**
 * Line drawing functionality.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { color } from "../utils/Color";
import { LinearGradient } from "../rendering/fills/LinearGradient";
import { registry } from "../Registry";
import * as $type from "../utils/Type";
import * as $math from "../utils/Math";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a line.
 *
 * @see {@link ILineEvents} for a list of available events
 * @see {@link ILineAdapters} for a list of available Adapters
 */
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    /**
     * Constructor
     */
    function Line() {
        var _this = _super.call(this) || this;
        _this.className = "Line";
        _this.element = _this.paper.add("line");
        _this.fill = color(); //"none";
        _this.x1 = 0;
        _this.y1 = 0;
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the line.
     *
     * @ignore Exclude from docs
     */
    Line.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.x1 == this.x2 || this.y1 == this.y2) {
            this.pixelPerfect = true;
        }
        else {
            this.pixelPerfect = false;
        }
        this.x1 = this.x1;
        this.x2 = this.x2;
        this.y1 = this.y1;
        this.y2 = this.y2;
    };
    Object.defineProperty(Line.prototype, "x1", {
        /**
         * @return X
         */
        get: function () {
            return this.getPropertyValue("x1");
        },
        /**
         * X coordinate of first end.
         *
         * @param value X
         */
        set: function (value) {
            if (!$type.isNumber(value)) {
                value = 0;
            }
            var delta = 0;
            if (this.pixelPerfect && this.stroke instanceof LinearGradient) {
                delta = 0.00001;
            }
            this.setPropertyValue("x1", value, true);
            this.element.attr({ "x1": value + delta });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "x2", {
        /**
         * @return X
         */
        get: function () {
            var value = this.getPropertyValue("x2");
            if (!$type.isNumber(value)) {
                value = this.pixelWidth;
            }
            return value;
        },
        /**
         * X coordinate of second end.
         *
         * @param value X
         */
        set: function (value) {
            if (!$type.isNumber(value)) {
                value = 0;
            }
            this.setPropertyValue("x2", value, true);
            this.element.attr({ "x2": value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "y1", {
        /**
         * @return Y
         */
        get: function () {
            return this.getPropertyValue("y1");
        },
        /**
         * Y coordinate of first end.
         *
         * @param value Y
         */
        set: function (value) {
            if (!$type.isNumber(value)) {
                value = 0;
            }
            var delta = 0;
            if (this.pixelPerfect && this.stroke instanceof LinearGradient) {
                delta = 0.00001;
            }
            this.setPropertyValue("y1", value, true);
            this.element.attr({ "y1": value + delta });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "y2", {
        /**
         * @return Y
         */
        get: function () {
            var value = this.getPropertyValue("y2");
            if (!$type.isNumber(value)) {
                value = this.pixelHeight;
            }
            return value;
        },
        /**
         * Y coordinate of second end.
         *
         * @param value Y
         */
        set: function (value) {
            if (!$type.isNumber(value)) {
                value = 0;
            }
            this.setPropertyValue("y2", value, true);
            this.element.attr({ "y2": value });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts relative position along the line (0-1) into pixel coordinates.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    Line.prototype.positionToPoint = function (position) {
        var point1 = { x: this.x1, y: this.y1 };
        var point2 = { x: this.x2, y: this.y2 };
        var point = $math.getMidPoint(point1, point2, position);
        var angle = $math.getAngle(point1, point2);
        return { x: point.x, y: point.y, angle: angle };
    };
    return Line;
}(Sprite));
export { Line };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Line"] = Line;
//# sourceMappingURL=Line.js.map