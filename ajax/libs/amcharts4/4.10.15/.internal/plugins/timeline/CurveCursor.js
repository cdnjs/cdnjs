import { __extends } from "tslib";
import { XYCursor } from "../../charts/cursors/XYCursor";
//import { Percent, percent } from "../../core/utils/Percent";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import * as $utils from "../../core/utils/Utils";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Cursor for [[CurveChart]].
 *
 * @see {@link ICurveCursorEvents} for a list of available events
 * @see {@link ICurveCursorAdapters} for a list of available Adapters
 */
var CurveCursor = /** @class */ (function (_super) {
    __extends(CurveCursor, _super);
    /**
     * Constructor
     */
    function CurveCursor() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "CurveCursor";
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
    CurveCursor.prototype.fitsToBounds = function (point) {
        if (this.xAxis && this.yAxis) {
            var xAxisRenderer = this.xAxis.renderer;
            var yAxisRenderer = this.yAxis.renderer;
            var index = xAxisRenderer.polyspline.getClosestPointIndex(point);
            var distance = $math.getDistance(point, xAxisRenderer.polyspline.allPoints[index]);
            if (distance >= Math.abs(yAxisRenderer.radius) && distance >= Math.abs(yAxisRenderer.innerRadius)) {
                return false;
            }
            return true;
        }
    };
    /**
     * [triggerMoveReal description]
     *
     * @param  point  Target point
     */
    CurveCursor.prototype.triggerMoveReal = function (point) {
        if (!this.xAxis || (this.xAxis && (!this.xAxis.cursorTooltipEnabled || this.xAxis.tooltip.disabled))) {
            this.updateLineX(this.point);
        }
        if (!this.yAxis || (this.yAxis && (!this.yAxis.cursorTooltipEnabled || this.yAxis.tooltip.disabled))) {
            this.updateLineY(this.point);
        }
        this.updateSelection();
        _super.prototype.triggerMoveReal.call(this, point);
    };
    /**
     * (Re)draws the x cursor's line.
     *
     * @param point New target point
     */
    CurveCursor.prototype.updateLineX = function (point) {
        var lineX = this.lineX;
        var xAxis = this.xAxis;
        if (!xAxis) {
            this.xAxis = this.chart.xAxes.getIndex(0);
            xAxis = this.xAxis;
        }
        if (lineX && lineX.visible && !lineX.disabled && xAxis) {
            var position = xAxis.renderer.pointToPosition(point);
            var axisRendererX = xAxis.renderer;
            lineX.path = axisRendererX.getGridPath($math.fitToRange(position, xAxis.start, xAxis.end));
        }
    };
    /**
     * (Re)draws the vertical (radial) cursor's line.
     *
     * @param point New target point
     */
    CurveCursor.prototype.updateLineY = function (point) {
        var lineY = this.lineY;
        var yAxis = this.yAxis;
        if (!yAxis) {
            this.yAxis = this.chart.yAxes.getIndex(0);
            yAxis = this.yAxis;
        }
        if (lineY && lineY.visible && !lineY.disabled && yAxis) {
            var position = yAxis.renderer.pointToPosition(point);
            var axisRendererY = yAxis.renderer;
            lineY.path = axisRendererY.getGridPath($math.fitToRange(position, yAxis.start, yAxis.end));
        }
    };
    /**
     * Updates selection dimensions on size change.
     *
     * @ignore Exclude from docs
     */
    CurveCursor.prototype.updateSelection = function () {
        if (this._usesSelection) {
            var downPoint = this.downPoint;
            var xAxis = this.xAxis;
            var yAxis = this.yAxis;
            if (xAxis && yAxis && downPoint) {
                var point = this.point;
                var selection = this.selection;
                selection.x = 0;
                selection.y = 0;
                var path = "";
                var behavior = this.behavior;
                if (behavior == "zoomX" || behavior == "selectX") {
                    var startPosition = xAxis.renderer.pointToPosition(downPoint);
                    var endPosition = xAxis.renderer.pointToPosition(point);
                    path += xAxis.renderer.getPositionRangePath(startPosition, endPosition);
                    startPosition = xAxis.toGlobalPosition(startPosition);
                    endPosition = xAxis.toGlobalPosition(endPosition);
                    this.xRange = { start: Math.min(startPosition, endPosition), end: Math.max(endPosition, startPosition) };
                }
                else if (behavior == "zoomY" || behavior == "selectY") {
                    var startPosition = yAxis.renderer.pointToPosition(downPoint);
                    var endPosition = yAxis.renderer.pointToPosition(point);
                    path += yAxis.renderer.getPositionRangePath(startPosition, endPosition);
                    startPosition = yAxis.toGlobalPosition(startPosition);
                    endPosition = yAxis.toGlobalPosition(endPosition);
                    this.yRange = { start: Math.min(startPosition, endPosition), end: Math.max(endPosition, startPosition) };
                }
                selection.path = path;
            }
            else {
                this.selection.hide();
            }
        }
    };
    /**
     * Updates cursors current positions.
     */
    CurveCursor.prototype.getPositions = function () {
        // positions are used by axes or series
        if (this.xAxis) {
            this.xPosition = this.xAxis.toGlobalPosition(this.xAxis.renderer.pointToPosition(this.point));
        }
        if (this.yAxis) {
            this.yPosition = this.yAxis.toGlobalPosition(this.yAxis.renderer.pointToPosition(this.point));
        }
    };
    /**
     * Overriding inherited method, so that nothing happens when it's triggered.
     */
    CurveCursor.prototype.updatePoint = function (point) {
    };
    /**
     * Updates Cursor's position when axis tooltip changes horizontal position.
     *
     * @param event Axis event
     */
    CurveCursor.prototype.handleXTooltipPosition = function (event) {
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
    CurveCursor.prototype.handleYTooltipPosition = function (event) {
        if (this.yAxis.cursorTooltipEnabled) {
            var tooltip = this.yAxis.tooltip;
            this.updateLineY($utils.svgPointToSprite({ x: tooltip.pixelX, y: tooltip.pixelY }, this));
        }
    };
    /**
     * Overriding so that nothing happens when it's called.
     *
     * @param  point  Point
     */
    CurveCursor.prototype.updateLinePositions = function (point) {
    };
    /**
     * [getRanges description]
     *
     * @todo Description
     */
    CurveCursor.prototype.getRanges = function () { };
    /**
     * Overriding inherited method, so that nothing happens when `updateSize`
     * is triggered.
     *
     * CurveCursor is quite complicated and needs own sizing logic.
     *
     * @ignore Exclude from docs
     */
    CurveCursor.prototype.updateSize = function () { };
    /**
     *
     * @ignore Exclude from docs
     */
    CurveCursor.prototype.fixPoint = function (point) {
        // overriding xy method
        return point;
    };
    return CurveCursor;
}(XYCursor));
export { CurveCursor };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CurveCursor"] = CurveCursor;
//# sourceMappingURL=CurveCursor.js.map