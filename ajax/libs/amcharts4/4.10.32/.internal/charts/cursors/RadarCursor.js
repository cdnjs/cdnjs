import { __extends } from "tslib";
import { XYCursor } from "./XYCursor";
import { Percent, percent } from "../../core/utils/Percent";
import { registry } from "../../core/Registry";
import * as $path from "../../core/rendering/Path";
import * as $math from "../../core/utils/Math";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Cursor for [[RadarChart]].
 *
 * @see {@link IRadarCursorEvents} for a list of available events
 * @see {@link IRadarCursorAdapters} for a list of available Adapters
 */
var RadarCursor = /** @class */ (function (_super) {
    __extends(RadarCursor, _super);
    /**
     * Constructor
     */
    function RadarCursor() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "RadarCursor";
        _this.radius = percent(100);
        _this.innerRadius = percent(0);
        // Apply theme
        _this.applyTheme();
        _this.mask = undefined;
        return _this;
    }
    /**
     * Checks if point is within bounds of a container.
     *
     * @ignore Exclude from docs
     * @param point  Point to check
     * @return Fits within container?
     */
    RadarCursor.prototype.fitsToBounds = function (point) {
        var radius = $math.getDistance(point);
        //if(!$math.isAngleInRange(angle, this.startAngle, this.endAngle)){
        //return false;
        //}
        if (radius < this.truePixelRadius + 1 && radius > this.pixelInnerRadius - 1) { // ok to add/remove some
            return true;
        }
        return false;
    };
    Object.defineProperty(RadarCursor.prototype, "startAngle", {
        /**
         * @return Start angle
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * Starting angle of the cursor's radial line.
         *
         * @param value Start angle
         */
        set: function (value) {
            this.setPropertyValue("startAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadarCursor.prototype, "endAngle", {
        /**
         * @return End angle
         */
        get: function () {
            return this.getPropertyValue("endAngle");
        },
        /**
         * End angle of the cursor's radial line.
         *
         * @param value End angle
         */
        set: function (value) {
            this.setPropertyValue("endAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    RadarCursor.prototype.triggerMoveReal = function (point, force) {
        if (!this.xAxis || (this.xAxis && (!this.xAxis.cursorTooltipEnabled || this.xAxis.tooltip.disabled))) {
            this.updateLineX(this.point);
        }
        if (!this.yAxis || (this.yAxis && (!this.yAxis.cursorTooltipEnabled || this.yAxis.tooltip.disabled))) {
            this.updateLineY(this.point);
        }
        this.updateSelection();
        _super.prototype.triggerMoveReal.call(this, point, force);
    };
    /**
     * (Re)draws the horizontal (circular) cursor's line.
     *
     * @param point New target point
     */
    RadarCursor.prototype.updateLineX = function (point) {
        var radius = this.pixelRadius;
        var startAngle = this.startAngle;
        var endAngle = this.endAngle;
        var innerRadius = this.pixelInnerRadius;
        if (radius > 0 && $type.isNumber(startAngle) && $type.isNumber(endAngle) && $type.isNumber(innerRadius)) {
            var angle = $math.fitAngleToRange($math.getAngle(point), startAngle, endAngle);
            var path = void 0;
            if (this.lineX && this.lineX.visible) {
                this.lineX.moveTo({ x: 0, y: 0 });
                // fill
                if (this.xAxis && this.fullWidthLineX) {
                    var startPoint = this.xAxis.currentItemStartPoint;
                    var endPoint = this.xAxis.currentItemEndPoint;
                    if (startPoint && endPoint) {
                        var fillStartAngle = $math.fitAngleToRange($math.getAngle(startPoint), startAngle, endAngle);
                        var fillEndAngle = $math.fitAngleToRange($math.getAngle(endPoint), startAngle, endAngle);
                        var arc = fillEndAngle - fillStartAngle;
                        // clockwise
                        // this is needed, normalizeAngle doesn't solve it
                        if (startAngle < endAngle) {
                            if (arc < 0) {
                                arc += 360;
                            }
                        }
                        // ccw
                        else {
                            if (arc > 0) {
                                arc -= 360;
                            }
                        }
                        angle -= arc / 2;
                        path = $path.moveTo({ x: innerRadius * $math.cos(angle), y: innerRadius * $math.sin(angle) })
                            + $path.lineTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) })
                            + $path.arcTo(angle, arc, radius)
                            + $path.lineTo({ x: innerRadius * $math.cos(angle + arc), y: innerRadius * $math.sin(angle + arc) })
                            + $path.arcTo(angle + arc, -arc, innerRadius);
                    }
                }
                // line
                if (!path) {
                    path = $path.moveTo({ x: innerRadius * $math.cos(angle), y: innerRadius * $math.sin(angle) }) + $path.lineTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
                }
                this.lineX.path = path;
            }
        }
    };
    /**
     * (Re)draws the vertical (radial) cursor's line.
     *
     * @param point New target point
     */
    RadarCursor.prototype.updateLineY = function (point) {
        if (this.lineY && this.lineY.visible) {
            var startAngle = this.startAngle;
            var endAngle = this.endAngle;
            var truePixelRadius = this.truePixelRadius;
            var radius = $math.fitToRange($math.getDistance(point), 0, this.truePixelRadius);
            if ($type.isNumber(radius) && $type.isNumber(startAngle)) {
                this.lineY.moveTo({ x: 0, y: 0 });
                var path = void 0;
                var arc = endAngle - startAngle;
                if (this.yAxis && this.fullWidthLineY) {
                    // fill
                    var startPoint = this.yAxis.currentItemStartPoint;
                    var endPoint = this.yAxis.currentItemEndPoint;
                    if (startPoint && endPoint) {
                        var innerRadius = $math.fitToRange($math.getDistance(startPoint), 0, truePixelRadius);
                        radius = $math.fitToRange($math.getDistance(endPoint), 0, truePixelRadius);
                        path = $path.moveTo({ x: radius * $math.cos(startAngle), y: radius * $math.sin(startAngle) }) + $path.arcTo(startAngle, arc, radius);
                        path += $path.moveTo({ x: innerRadius * $math.cos(endAngle), y: innerRadius * $math.sin(endAngle) }) + $path.arcTo(endAngle, -arc, innerRadius);
                    }
                }
                if (!path) {
                    path = $path.moveTo({ x: radius * $math.cos(startAngle), y: radius * $math.sin(startAngle) }) + $path.arcTo(startAngle, endAngle - startAngle, radius);
                }
                this.lineY.path = path;
            }
        }
    };
    /**
     * Updates selection dimensions on size change.
     *
     * @ignore Exclude from docs
     */
    RadarCursor.prototype.updateSelection = function () {
        if (this._usesSelection) {
            var downPoint = this.downPoint;
            if (downPoint) {
                var point = this.point;
                var radius = this.pixelRadius;
                var truePixelRadius = this.truePixelRadius;
                var innerRadius = this.pixelInnerRadius;
                var startAngle = Math.min(this.startAngle, this.endAngle);
                var endAngle = Math.max(this.startAngle, this.endAngle);
                var downAngle = $math.fitAngleToRange($math.getAngle(downPoint), startAngle, endAngle);
                var angle = $math.fitAngleToRange($math.getAngle(point), startAngle, endAngle);
                var downRadius = $math.getDistance(downPoint);
                if (downRadius < truePixelRadius) {
                    var currentRadius = $math.fitToRange($math.getDistance(point), 0, truePixelRadius);
                    this._prevAngle = angle;
                    var path = $path.moveTo({ x: 0, y: 0 });
                    var downSin = $math.sin(downAngle);
                    var downCos = $math.cos(downAngle);
                    var sin = $math.sin(angle);
                    var cos = $math.cos(angle);
                    var behavior = this.behavior;
                    if (behavior == "zoomX" || behavior == "selectX") {
                        path += $path.lineTo({ x: radius * downCos, y: radius * downSin }) + $path.arcTo(downAngle, angle - downAngle, radius) + $path.lineTo({ x: innerRadius * cos, y: innerRadius * sin }) + $path.arcTo(angle, downAngle - angle, innerRadius);
                    }
                    else if (behavior == "zoomY" || behavior == "selectY") {
                        path = $path.moveTo({ x: currentRadius * $math.cos(startAngle), y: currentRadius * $math.sin(startAngle) }) + $path.arcTo(startAngle, endAngle - startAngle, currentRadius) + $path.lineTo({ x: downRadius * $math.cos(endAngle), y: downRadius * $math.sin(endAngle) }) + $path.arcTo(endAngle, startAngle - endAngle, downRadius) + $path.closePath();
                    }
                    else if (behavior == "zoomXY") {
                        path = $path.moveTo({ x: currentRadius * $math.cos(downAngle), y: currentRadius * $math.sin(downAngle) }) + $path.arcTo(downAngle, angle - downAngle, currentRadius) + $path.lineTo({ x: downRadius * $math.cos(angle), y: downRadius * $math.sin(angle) }) + $path.arcTo(angle, downAngle - angle, downRadius) + $path.closePath();
                    }
                    this.selection.path = path;
                }
                this.selection.moveTo({ x: 0, y: 0 });
            }
        }
    };
    /**
     * Updates cursors current positions.
     */
    RadarCursor.prototype.getPositions = function () {
        // positions are used by axes or series
        var chart = this.chart;
        if (chart) {
            var innerRadius = this.pixelInnerRadius;
            var radius = this.truePixelRadius - innerRadius;
            var startAngle = this.startAngle;
            var endAngle = this.endAngle;
            var angle = $math.fitAngleToRange($math.getAngle(this.point), startAngle, endAngle);
            var xPosition = ((angle - startAngle) / (endAngle - startAngle));
            this.xPosition = xPosition;
            this.yPosition = $math.fitToRange(($math.getDistance(this.point) - innerRadius) / radius, 0, 1);
        }
    };
    /**
     * Overriding inherited method, so that nothing happens when it's triggered.
     *
     * @ignore Exclude from docs
     */
    RadarCursor.prototype.updatePoint = function (point) {
    };
    /**
     * Updates Cursor's position when axis tooltip changes horizontal position.
     *
     * @param event Axis event
     */
    RadarCursor.prototype.handleXTooltipPosition = function (event) {
        if (this.xAxis.cursorTooltipEnabled) {
            var tooltip = this.xAxis.tooltip;
            this.updateLineX($utils.svgPointToSprite({ x: tooltip.pixelX, y: tooltip.pixelY }, this));
        }
    };
    /**
     * Updates Cursor's position when axis tooltip changes vertical position.
     *
     * @todo Description
     * @param event Axis event
     */
    RadarCursor.prototype.handleYTooltipPosition = function (event) {
        if (this.yAxis.cursorTooltipEnabled) {
            var tooltip = this.yAxis.tooltip;
            this.updateLineY($utils.svgPointToSprite({ x: tooltip.pixelX, y: tooltip.pixelY }, this));
        }
    };
    /**
     * needs to be overriden
     * @ignore
     */
    RadarCursor.prototype.updateLinePositions = function (point) {
    };
    /**
     * [getRanges description]
     *
     * @todo Description
     */
    RadarCursor.prototype.getRanges = function () {
        var downPoint = this.downPoint;
        if (downPoint) {
            var upPoint = this.upPoint;
            var chart = this.chart;
            if (chart) {
                var radius = this.pixelRadius;
                var startAngle = this.startAngle;
                var endAngle = this.endAngle;
                var downAngle = $math.fitAngleToRange($math.getAngle(downPoint), this.startAngle, this.endAngle);
                var upAngle = $math.fitAngleToRange($math.getAngle(upPoint), this.startAngle, this.endAngle);
                var downRadius = $math.fitToRange($math.getDistance(downPoint), 0, radius);
                var upRadius = $math.fitToRange($math.getDistance(upPoint), 0, radius);
                var startX = 0;
                var endX = 1;
                var startY = 0;
                var endY = 1;
                var behavior = this.behavior;
                if (behavior == "zoomX" || behavior == "selectX" || behavior == "zoomXY" || behavior == "selectXY") {
                    var arc = endAngle - startAngle;
                    startX = $math.round((downAngle - startAngle) / arc, 5);
                    endX = $math.round((upAngle - startAngle) / arc, 5);
                }
                if (behavior == "zoomY" || behavior == "selectY" || behavior == "zoomXY" || behavior == "selectXY") {
                    startY = $math.round(downRadius / radius, 5);
                    endY = $math.round(upRadius / radius, 5);
                }
                this.xRange = { start: Math.min(startX, endX), end: Math.max(startX, endX) };
                this.yRange = { start: Math.min(startY, endY), end: Math.max(startY, endY) };
                if (this.behavior == "selectX" || this.behavior == "selectY" || this.behavior == "selectXY") {
                    // void
                }
                else {
                    this.selection.hide();
                }
            }
        }
    };
    /**
     * Overriding inherited method, so that nothing happens when `updateSize`
     * is triggered.
     *
     * RadarCursor is quite complicated and needs own sizing logic.
     *
     * @ignore Exclude from docs
     */
    RadarCursor.prototype.updateSize = function () { };
    Object.defineProperty(RadarCursor.prototype, "radius", {
        /**
         * @return Outer radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Outer radius of the cursor's circular line.
         * Absolute (px) or relative ([[Percent]]).
         *
         * @param value  Outer radius
         */
        set: function (value) {
            this.setPercentProperty("radius", value, false, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadarCursor.prototype, "pixelRadius", {
        /**
         * Outer radius of the circular line in pixels.
         *
         * @return Outer radius (px)
         * @readonly
         */
        get: function () {
            return $utils.relativeRadiusToValue(this.radius, this.truePixelRadius);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadarCursor.prototype, "truePixelRadius", {
        /**
         * [truePixelRadius description]
         *
         * @todo Description
         * @return Outer radius (px)
         * @readonly
         */
        get: function () {
            return $utils.relativeToValue(percent(100), $math.min(this.innerWidth / 2, this.innerHeight / 2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadarCursor.prototype, "innerRadius", {
        /**
         * @return Inner radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the cursor's circular line.
         * Absolute (px) or relative ([[Percent]]).
         *
         * @param value  Inner radius
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, false, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadarCursor.prototype, "pixelInnerRadius", {
        /**
         * Inner radius of the circular line in pixels.
         *
         * @return Inner radius (px)
         * @readonly
         */
        get: function () {
            var innerRadius = this.innerRadius;
            if (innerRadius instanceof Percent) {
                innerRadius = percent(100 * innerRadius.value * this.chart.innerRadiusModifyer);
            }
            return $utils.relativeRadiusToValue(innerRadius, this.truePixelRadius) || 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @ignore Exclude from docs
     */
    RadarCursor.prototype.fixPoint = function (point) {
        // overriding xy method
        return point;
    };
    return RadarCursor;
}(XYCursor));
export { RadarCursor };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["RadarCursor"] = RadarCursor;
//# sourceMappingURL=RadarCursor.js.map