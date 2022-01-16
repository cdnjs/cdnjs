/**
 * Functionality for drawing waved circles.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Circle } from "./Circle";
import { registry } from "../Registry";
import * as $path from "../rendering/Path";
import * as $math from "../utils/Math";
import * as $utils from "../utils/Utils";
import * as $smoothing from "../../core/rendering/Smoothing";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a waved circle.
 *
 * @see {@link IWavedCircleEvents} for a list of available events
 * @see {@link IWavedCircleAdapters} for a list of available Adapters
 */
var WavedCircle = /** @class */ (function (_super) {
    __extends(WavedCircle, _super);
    /**
     * Constructor
     */
    function WavedCircle() {
        var _this = _super.call(this) || this;
        _this.className = "WavedCircle";
        _this.element = _this.paper.add("path");
        _this.waveLength = 16;
        _this.waveHeight = 4;
        _this.fill = undefined;
        _this.fillOpacity = 0;
        _this.tension = 0.8;
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the waved line.
     *
     * @ignore Exclude from docs
     */
    WavedCircle.prototype.draw = function () {
        var path = "";
        var radius = this.pixelRadius;
        if (radius > 0) {
            var points = this.getPoints(radius);
            path = $path.moveTo(points[0]) + new $smoothing.Tension(this.tension, this.tension).smooth(points);
        }
        var innerRadius = this.pixelInnerRadius;
        if (innerRadius > 0) {
            var points = this.getPoints(innerRadius);
            points.reverse();
            path += $path.moveTo(points[0]) + new $smoothing.Tension(this.tension, this.tension).smooth(points);
        }
        this.path = path;
    };
    /**
     * Returns points that circle consists of.
     *
     * @param radius  Radius (px)
     * @return Points
     */
    WavedCircle.prototype.getPoints = function (radius) {
        var circleLength = radius * Math.PI * 2;
        var halfWaveHeight = this.waveHeight / 2;
        var waveLength = circleLength / Math.round(circleLength / this.waveLength);
        var halfWaveLength = waveLength / 2;
        var points = [];
        var count = circleLength / waveLength;
        for (var i = 0; i <= count; i++) {
            var angle1 = (i * waveLength) / circleLength * 360;
            var angle2 = (i * waveLength + halfWaveLength) / circleLength * 360;
            points.push({ x: (radius - halfWaveHeight) * $math.cos(angle1), y: (radius - halfWaveHeight) * $math.sin(angle1) });
            points.push({ x: (radius + halfWaveHeight) * $math.cos(angle2), y: (radius + halfWaveHeight) * $math.sin(angle2) });
        }
        points.pop();
        return points;
    };
    Object.defineProperty(WavedCircle.prototype, "innerRadius", {
        /**
         * @return Inner radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the circle in pixels (absolute) or [[Percent]] (relative).
         *
         * @param value  Inner radius
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, true, false, 10, false);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedCircle.prototype, "pixelInnerRadius", {
        /**
         * Calculated inner radius of the circle in pixels.
         *
         * @readonly
         * @return Inner radius (px)
         */
        get: function () {
            return $utils.relativeToValue(this.innerRadius, $math.min(this.innerWidth / 2, this.innerHeight / 2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedCircle.prototype, "waveLength", {
        /**
         * @return Wave length (px)
         */
        get: function () {
            return this.getPropertyValue("waveLength");
        },
        /**
         * Wave length in pixels.
         *
         * @default 16
         * @param value  Wave length (px)
         */
        set: function (value) {
            this.setPropertyValue("waveLength", value);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedCircle.prototype, "waveHeight", {
        /**
         * @return Wave height (px)
         */
        get: function () {
            return this.getPropertyValue("waveHeight");
        },
        /**
         * Wave height in pixels.
         *
         * @default 4
         * @param value  Wave height (px)
         */
        set: function (value) {
            this.setPropertyValue("waveHeight", value);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WavedCircle.prototype, "tension", {
        /**
         * @return Tension
         */
        get: function () {
            return this.getPropertyValue("tension");
        },
        /**
         * Tension of the wave.
         *
         * @default 0.8
         * @param value  Tension
         */
        set: function (value) {
            this.setPropertyValue("tension", value);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    return WavedCircle;
}(Circle));
export { WavedCircle };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["WavedCircle"] = WavedCircle;
//# sourceMappingURL=WavedCircle.js.map