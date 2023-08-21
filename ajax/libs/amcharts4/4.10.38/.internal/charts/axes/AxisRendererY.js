/**
 * Module, defining Axis Renderer for vertical axes.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisRenderer } from "./AxisRenderer";
import { WavedLine } from "../../core/elements/WavedLine";
import { WavedRectangle } from "../../core/elements/WavedRectangle";
import { registry } from "../../core/Registry";
import { percent, Percent } from "../../core/utils/Percent";
import * as $math from "../../core/utils/Math";
import * as $path from "../../core/rendering/Path";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
import { defaultRules, ResponsiveBreakpoints } from "../../core/utils/Responsive";
import { AxisBullet } from "./AxisBullet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for vertical axis.
 *
 * @see {@link IAxisRendererYEvents} for a list of available events
 * @see {@link IAxisRendererYAdapters} for a list of available Adapters
 */
var AxisRendererY = /** @class */ (function (_super) {
    __extends(AxisRendererY, _super);
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    function AxisRendererY() {
        var _this = _super.call(this) || this;
        _this.className = "AxisRendererY";
        _this.minGridDistance = 40;
        _this.opposite = false;
        _this.height = percent(100);
        _this.labels.template.verticalCenter = "middle";
        _this.applyTheme();
        return _this;
    }
    /**
    * @ignore
    */
    AxisRendererY.prototype.setAxis = function (axis) {
        _super.prototype.setAxis.call(this, axis);
        axis.layout = "horizontal";
    };
    /**
     * @ignore
     */
    AxisRendererY.prototype.updateGridContainer = function () {
        var axis = this.axis;
        if (axis) {
            var gridContainer = this.gridContainer;
            gridContainer.y = axis.pixelY;
            gridContainer.height = axis.axisLength;
        }
    };
    /**
     * @ignore
     */
    AxisRendererY.prototype.toAxisPosition = function (value) {
        var axis = this.axis;
        if (axis) {
            var inversedPosition = 1 - value;
            var relativePositionSprite = axis.relativePositionSprite;
            var y = axis.pixelY;
            if (relativePositionSprite) {
                y = $utils.spritePointToSprite({ x: 0, y: this.pixelY }, this.parent, relativePositionSprite).y;
            }
            else {
                relativePositionSprite = axis.parent;
            }
            if (relativePositionSprite) {
                var relativeY = y / relativePositionSprite.innerHeight;
                var relativeHeight = axis.axisLength / relativePositionSprite.innerHeight;
                return 1 - (inversedPosition - relativeY) / relativeHeight;
            }
        }
        return value;
    };
    /**
     * Called when rendered is attached to an Axis, as well as a property of
     * Axis that might affect the appearance is updated.
     *
     * E.g. `axis.opposite`, `axis.inside`, etc.
     *
     * This method is called **before** draw, so that any related setting
     * changed in this method can be changed.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    AxisRendererY.prototype.processRenderer = function () {
        _super.prototype.processRenderer.call(this);
        var axis = this.axis;
        if (axis) {
            var title = axis.title;
            title.valign = "middle";
            if (!(axis.height instanceof Percent)) {
                axis.height = percent(100);
            }
            if (this.opposite) {
                title.rotation = 90;
                this.line.toBack();
                title.toFront();
            }
            else {
                title.rotation = -90;
                title.toBack();
                this.line.toFront();
            }
        }
    };
    /**
     * Updates some of the Axis tooltip's visual properties, related to
     * rendering of the Axis.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    AxisRendererY.prototype.updateTooltip = function () {
        var axis = this.axis;
        if (axis) {
            var bigNum = 2000;
            var bbx = 0;
            var bby = 0;
            var bbw = bigNum;
            var bbh = this.axisLength;
            // right
            if (this.opposite) {
                if (this.inside) {
                    bbx = -bigNum;
                    bbw = bigNum;
                }
            }
            // left
            else {
                if (!this.inside) {
                    bbx = -bigNum;
                    bbw = bigNum;
                }
            }
            this.axis.updateTooltip("horizontal", { x: bbx, y: bby, width: bbw, height: bbh });
        }
    };
    Object.defineProperty(AxisRendererY.prototype, "axisLength", {
        /**
         * Returns actual length of the Axis, in pixels.
         *
         * @return Length (px)
         */
        get: function () {
            var axis = this.axis;
            return (axis.measuredHeight - axis.pixelPaddingTop - axis.pixelPaddingBottom) || 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts relative position on axis to point coordinates.
     *
     * @param position  Position (0-1)
     * @param position2  Position (0-1) Position on the second axis
     * @return Point
     */
    AxisRendererY.prototype.positionToPoint = function (position, position2) {
        return { x: 0, y: this.positionToCoordinate(position) };
    };
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @param point  Point
     * @return Position (0-1)
     */
    AxisRendererY.prototype.pointToPosition = function (point) {
        return this.coordinateToPosition(point.y, point.x);
    };
    /**
     * Converts a coordinate in pixels to a relative position. (0-1)
     *
     * @param coordinate  Coordinate (px)
     * @param coordinate2  Coordinate of a second axis, only needed for complex axes systems, like timeline (px)
     * @return Position (0-1)
     */
    AxisRendererY.prototype.coordinateToPosition = function (coordinate, coordinate2) {
        var position;
        var axis = this.axis;
        var axisFullLength = axis.axisFullLength;
        if (axis.renderer.inversed) {
            position = (1 - axis.start) - coordinate / axisFullLength;
        }
        else {
            position = coordinate / axisFullLength + (1 - axis.end);
        }
        return $math.round(position, 5);
    };
    /**
     * [getPositionRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param startPosition  Starting position
     * @param endPosition    End position
     * @return SVG path
     */
    AxisRendererY.prototype.getPositionRangePath = function (startPosition, endPosition) {
        var y1 = $math.fitToRange(this.positionToCoordinate(startPosition), 0, this.axisLength);
        var y2 = $math.fitToRange(this.positionToCoordinate(endPosition), 0, this.axisLength);
        var h = Math.abs(y2 - y1);
        var w = this.getWidth();
        var y = Math.min(y1, y2);
        var x = 0;
        return $path.rectToPath({
            x: x,
            y: y,
            width: w,
            height: h
        }, true);
    };
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererY.prototype.updateGridElement = function (grid, position, endPosition) {
        position = position + (endPosition - position) * grid.location;
        var point = this.positionToPoint(position);
        //	point.y = $utils.spritePointToSprite({ x: 0, y: point.y }, this, this.gridContainer).y;
        grid.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: this.getWidth(), y: 0 });
        this.positionItem(grid, point);
        this.toggleVisibility(grid, position, 0, 1);
    };
    /**
     * Updates and positions a tick element.
     *
     * @ignore Exclude from docs
     * @param tick         Tick element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererY.prototype.updateTickElement = function (tick, position, endPosition) {
        position = position + (endPosition - position) * tick.location;
        var point = this.positionToPoint(position);
        var tickLength = tick.length;
        try {
            $utils.used(this.axis.title.measuredWidth);
        }
        catch (_a) {
            // void
        }
        point.x = $utils.spritePointToSprite({ x: this.line.pixelX, y: 0 }, this.line.parent, this.gridContainer).x;
        if (!this.opposite) {
            tickLength *= (tick.inside ? 1 : -1);
        }
        else {
            tickLength *= (tick.inside ? -1 : 1);
        }
        tick.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: tickLength, y: 0 });
        this.positionItem(tick, point);
        this.toggleVisibility(tick, position, 0, 1);
    };
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererY.prototype.updateAxisLine = function () {
        this.line.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: 0, y: this.axisLength });
    };
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererY.prototype.updateBaseGridElement = function () {
        _super.prototype.updateBaseGridElement.call(this);
        var axis = this.axis;
        var w = this.getWidth();
        var h = this.axisLength;
        var y = axis.basePoint.y;
        var baseGrid = this.baseGrid;
        if (y < -0.2 || y > h + 0.2) {
            baseGrid.hide(0);
        }
        else {
            var x = $utils.spritePointToSprite({ x: 0, y: 0 }, this.gridContainer, baseGrid.parent).x;
            baseGrid.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: w, y: 0 });
            baseGrid.moveTo({ x: x, y: y });
            baseGrid.show(0);
        }
    };
    /**
     * Updates and positions a label element.
     *
     * @ignore Exclude from docs
     * @param label        Label element
     * @param position     Starting position
     * @param endPosition  Ending position
     */
    AxisRendererY.prototype.updateLabelElement = function (label, position, endPosition, location) {
        if (!$type.hasValue(location)) {
            location = label.location;
        }
        position = position + (endPosition - position) * location;
        label.isMeasured = !label.inside;
        var point = this.positionToPoint(position);
        var horizontalCenter;
        var deltaX = 0;
        var maxWidth = this.gridContainer.maxWidth;
        if (this.opposite) {
            if (label.inside) {
                horizontalCenter = "right";
                if (label.align == "left") {
                    deltaX = -maxWidth;
                    horizontalCenter = "left";
                }
                if (label.align == "center") {
                    deltaX = -maxWidth / 2;
                    horizontalCenter = "middle";
                }
            }
            else {
                horizontalCenter = "left";
            }
            point.x = 0 + deltaX;
        }
        else {
            if (label.inside) {
                horizontalCenter = "left";
                if (label.align == "right") {
                    deltaX = maxWidth;
                    horizontalCenter = "right";
                }
                if (label.align == "center") {
                    deltaX = maxWidth / 2;
                    horizontalCenter = "middle";
                }
            }
            else {
                horizontalCenter = "right";
            }
            point.x = this.measuredWidth + deltaX;
        }
        if (label.rotation == 0) {
            // Apply fuzzy logic to verticalCenter only if labels are not rotated
            label.horizontalCenter = horizontalCenter;
        }
        this.positionItem(label, point);
        this.toggleVisibility(label, position, this.minLabelPosition, this.maxLabelPosition);
    };
    /**
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param axisBreak Break element
     */
    AxisRendererY.prototype.updateBreakElement = function (axisBreak) {
        _super.prototype.updateBreakElement.call(this, axisBreak);
        var startLine = axisBreak.startLine;
        var endLine = axisBreak.endLine;
        var fillShape = axisBreak.fillShape;
        var startPoint = axisBreak.startPoint;
        var endPoint = axisBreak.endPoint;
        var x1 = axisBreak.pixelMarginLeft;
        var x2 = this.getWidth() - axisBreak.pixelMarginLeft - axisBreak.pixelMarginRight;
        startPoint.y = $math.fitToRange(startPoint.y, -1, this.axisLength + 1);
        endPoint.y = $math.fitToRange(endPoint.y, -1, this.axisLength + 1);
        if (startPoint.y == endPoint.y && (startPoint.y < 0 || startPoint.y > this.axisLength)) {
            axisBreak.fillShape.__disabled = true;
        }
        else {
            axisBreak.fillShape.__disabled = false;
        }
        var w = Math.abs(x2 - x1);
        startLine.x = x1;
        startLine.height = 0;
        startLine.width = w;
        endLine.x = x1;
        endLine.height = 0;
        endLine.width = w;
        fillShape.width = w;
        fillShape.height = Math.abs(endPoint.y - startPoint.y);
        fillShape.x = x1;
        fillShape.y = endPoint.y;
    };
    /**
     * Creates visual elements for and axis break.
     *
     * @ignore Exclude from docs
     * @param axisBreak Axis break
     */
    AxisRendererY.prototype.createBreakSprites = function (axisBreak) {
        axisBreak.startLine = new WavedLine();
        axisBreak.endLine = new WavedLine();
        var wavedRectangle = new WavedRectangle();
        wavedRectangle.setWavedSides(true, false, true, false);
        axisBreak.fillShape = wavedRectangle;
    };
    /**
     * Converts a position on the axis to a coordinate in pixels.
     *
     * @ignore Exclude from docs
     * @param position  Position (0-1)
     * @return Coordinate (px)
     */
    AxisRendererY.prototype.positionToCoordinate = function (position) {
        var coordinate;
        var axis = this.axis;
        var axisFullLength = axis.axisFullLength;
        if (!axis.renderer.inversed) {
            coordinate = (axis.end - position) * axisFullLength;
        }
        else {
            coordinate = (position - axis.start) * axisFullLength;
        }
        return coordinate;
    };
    /**
     * Updates and positions axis bullets.
     *
     * @ignore Exclude from docs
     * @param bullet       AxisBullet element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererY.prototype.updateBullet = function (bullet, position, endPosition) {
        var location = 0.5;
        if (bullet instanceof AxisBullet) {
            location = bullet.location;
        }
        position = position + (endPosition - position) * location;
        var point = this.positionToPoint(position);
        point.x = $utils.spritePointToSprite({ x: this.line.pixelX, y: 0 }, this.line.parent, this.gridContainer).x;
        this.positionItem(bullet, point);
        this.toggleVisibility(bullet, position, 0, 1);
    };
    return AxisRendererY;
}(AxisRenderer));
export { AxisRendererY };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRendererY"] = AxisRendererY;
/**
 * Add default responsive rules
 */
/**
 * Put labels inside plot area.
 * Disable first and last labels.
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.widthS,
    state: function (target, stateId) {
        if (target instanceof AxisRendererY) {
            var state = target.states.create(stateId);
            state.properties.inside = true;
            state.properties.maxLabelPosition = 0.9;
            state.properties.minLabelPosition = 0.1;
            return state;
        }
        return null;
    }
});
/**
 * Disable labels altogather on very small charts
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.widthXS,
    state: function (target, stateId) {
        if (target instanceof AxisRendererY) {
            var state = target.states.create(stateId);
            state.properties.disabled = true;
            return state;
        }
        return null;
    }
});
//# sourceMappingURL=AxisRendererY.js.map