import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Pattern } from "./Pattern";
import { registry } from "../../Registry";
import * as $path from "../../rendering/Path";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Line pattern.
 */
var LinePattern = /** @class */ (function (_super) {
    __extends(LinePattern, _super);
    /**
     * Constructor
     */
    function LinePattern() {
        var _this = _super.call(this) || this;
        _this.properties["gap"] = 0;
        _this._line = _this.paper.add("path");
        _this.addElement(_this._line);
        return _this;
    }
    /**
     * Draws the pattern.
     */
    LinePattern.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (Math.round(this.rotation / 90) != this.rotation / 90) {
            this.properties["shapeRendering"] = "auto";
        }
        if (this._line) {
            var w = this.width;
            var h = this.height;
            var path = "";
            if (!this.gap) {
                if (Math.round(this.rotation / 90) != this.rotation / 90) {
                    path = $path.moveTo({ x: -w, y: h / 2 }) + $path.lineTo({ x: w * 2, y: h / 2 });
                    this.properties["rotationX"] = this.width / 2;
                    this.properties["rotationY"] = this.height / 2;
                }
                else {
                    path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: w, y: 0 });
                }
            }
            else {
                var step = this.gap + this.strokeWidth;
                var count = this.height / step;
                for (var i = -count / 2; i < count * 1.5; i++) {
                    if (Math.round(this.rotation / 90) != this.rotation / 90) {
                        path += $path.moveTo({ x: -w, y: (i + 0.5) * step }) + $path.lineTo({ x: w * 2, y: (i + 0.5) * step });
                        this.properties["rotationX"] = this.width / 2;
                        this.properties["rotationY"] = this.height / 2;
                    }
                    else {
                        path += $path.moveTo({ x: -w, y: i * step }) + $path.lineTo({ x: w * 2, y: i * step });
                    }
                }
            }
            this._line.attr({ "d": path });
        }
    };
    Object.defineProperty(LinePattern.prototype, "gap", {
        /**
         * @return gap
         */
        get: function () {
            return this.properties["gap"];
        },
        /**
         * Number of pixels between pattern lines.
         *
         * The pattern will automatically draw required number of lines to fill
         * pattern area maintaining `gap` distance between them.
         *
         * 0 (zero) means only single line will be drawn.
         *
         * @default 0
         * @since 4.7.7
         */
        set: function (value) {
            this.properties["gap"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    return LinePattern;
}(Pattern));
export { LinePattern };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["LinePattern"] = LinePattern;
//# sourceMappingURL=LinePattern.js.map