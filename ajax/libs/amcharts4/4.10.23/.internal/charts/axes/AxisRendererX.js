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
import { AxisBullet } from "./AxisBullet";
import { WavedLine } from "../../core/elements/WavedLine";
import { WavedRectangle } from "../../core/elements/WavedRectangle";
import { registry } from "../../core/Registry";
import { percent, Percent } from "../../core/utils/Percent";
import * as $math from "../../core/utils/Math";
import * as $path from "../../core/rendering/Path";
import * as $utils from "../../core/utils/Utils";
import * as $type from "../../core/utils/Type";
import { defaultRules, ResponsiveBreakpoints } from "../../core/utils/Responsive";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A renderer for horizontal axis.
 *
 * @see {@link IAxisRendererEvents} for a list of available events
 * @see {@link IAxisRendererAdapters} for a list of available Adapters
 */
var AxisRendererX = /** @class */ (function (_super) {
    __extends(AxisRendererX, _super);
    /**
     * Constructor.
     *
     * @param axis Related axis
     */
    function AxisRendererX() {
        var _this = _super.call(this) || this;
        _this.className = "AxisRendererX";
        _this.minGridDistance = 120;
        _this.opposite = false;
        _this.rotation = 0;
        _this.width = percent(100);
        _this.labels.template.horizontalCenter = "middle";
        _this.applyTheme();
        return _this;
    }
    /**
    * @ignore
    */
    AxisRendererX.prototype.setAxis = function (axis) {
        _super.prototype.setAxis.call(this, axis);
        axis.layout = "vertical";
    };
    /**
     * @ignore
     */
    AxisRendererX.prototype.updateGridContainer = function () {
        var axis = this.axis;
        if (axis) {
            var gridContainer = this.gridContainer;
            gridContainer.x = axis.pixelX;
            gridContainer.width = axis.axisLength;
        }
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
    AxisRendererX.prototype.processRenderer = function () {
        _super.prototype.processRenderer.call(this);
        // can not do this in init, as axis is set later
        var axis = this.axis;
        if (axis) {
            if (!(axis.width instanceof Percent)) {
                axis.width = percent(100);
            }
            // @todo Is thi sneeded?
            $utils.used(this.line);
            var title = axis.title;
            title.rotation = 0;
            title.align = "center";
            if (this.opposite) {
                this.line.toFront();
                title.toBack();
            }
            else {
                title.toFront();
                this.toBack();
                this.line.toBack();
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
    AxisRendererX.prototype.updateTooltip = function () {
        var axis = this.axis;
        if (axis) {
            var bigNum = 1000;
            var bbx = this.line.pixelX;
            var bby = this.line.pixelY;
            var bbw = this.axisLength;
            var bbh = bigNum;
            // top
            if (this.opposite) {
                if (!this.inside) {
                    bby = -bigNum;
                    bbh = bigNum;
                }
            }
            // bottom
            else {
                if (this.inside) {
                    bby = -bigNum;
                    bbh = bigNum;
                }
            }
            this.axis.updateTooltip("vertical", { x: bbx, y: bby, width: bbw, height: bbh });
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
    AxisRendererX.prototype.updateLabelElement = function (label, position, endPosition, location) {
        if (!$type.hasValue(location)) {
            location = label.location;
        }
        position = position + (endPosition - position) * location;
        var point = this.positionToPoint(position);
        label.isMeasured = !label.inside;
        var deltaY = 0;
        var verticalCenter;
        var maxHeight = this.gridContainer.maxHeight;
        if (this.opposite) {
            if (label.inside) {
                verticalCenter = "top";
                if (label.valign == "bottom") {
                    deltaY = maxHeight;
                    verticalCenter = "bottom";
                }
                if (label.valign == "middle") {
                    deltaY = maxHeight / 2;
                    verticalCenter = "middle";
                }
            }
            else {
                verticalCenter = "bottom";
            }
            point.y = deltaY;
        }
        else {
            if (label.inside) {
                verticalCenter = "bottom";
                if (label.valign == "top") {
                    deltaY = -maxHeight;
                    verticalCenter = "top";
                }
                if (label.valign == "middle") {
                    deltaY = -maxHeight / 2;
                    verticalCenter = "middle";
                }
            }
            else {
                verticalCenter = "top";
            }
            point.y += deltaY;
        }
        if (label.rotation == 0) {
            // Apply fuzzy logic to verticalCenter only if labels are not rotated
            label.verticalCenter = verticalCenter;
        }
        this.positionItem(label, point);
        this.toggleVisibility(label, position, this.minLabelPosition, this.maxLabelPosition);
    };
    Object.defineProperty(AxisRendererX.prototype, "axisLength", {
        /**
         * Returns actual length of the Axis, in pixels.
         *
         * @return Length (px)
         */
        get: function () {
            var axis = this.axis;
            return (axis.measuredWidth - axis.pixelPaddingRight - axis.pixelPaddingLeft) || 0;
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
    AxisRendererX.prototype.positionToPoint = function (position, position2) {
        return { x: this.positionToCoordinate(position), y: 0 };
    };
    /**
     * Converts a point at specific coordinates to a relative position (0-1)
     * on the axis.
     *
     * @param point  Point
     * @return Position (0-1)
     */
    AxisRendererX.prototype.pointToPosition = function (point) {
        return this.coordinateToPosition(point.x, point.y);
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
    AxisRendererX.prototype.getPositionRangePath = function (startPosition, endPosition) {
        var x1 = $math.fitToRange(this.positionToCoordinate(startPosition), 0, this.axisLength);
        var x2 = $math.fitToRange(this.positionToCoordinate(endPosition), 0, this.axisLength);
        var w = Math.abs(x2 - x1);
        var h = this.getHeight();
        var x = Math.min(x1, x2);
        var y = 0;
        return $path.rectToPath({
            x: x,
            y: y,
            width: w,
            height: h
        }, true);
    };
    /**
     * Updates and positions an axis break element.
     *
     * @ignore Exclude from docs
     * @param axisBreak Break element
     */
    AxisRendererX.prototype.updateBreakElement = function (axisBreak) {
        _super.prototype.updateBreakElement.call(this, axisBreak);
        var startLine = axisBreak.startLine;
        var endLine = axisBreak.endLine;
        var fillShape = axisBreak.fillShape;
        var startPoint = axisBreak.startPoint;
        var endPoint = axisBreak.endPoint;
        var y1 = axisBreak.pixelMarginLeft;
        var y2 = this.getHeight() - axisBreak.pixelMarginTop - axisBreak.pixelMarginBottom;
        startPoint.x = $math.fitToRange(startPoint.x, -1, this.axisLength + 1);
        endPoint.x = $math.fitToRange(endPoint.x, -1, this.axisLength + 1);
        if (startPoint.x == endPoint.x && (startPoint.x < 0 || startPoint.x > this.axisLength)) {
            axisBreak.fillShape.__disabled = true;
        }
        else {
            axisBreak.fillShape.__disabled = false;
        }
        startLine.y = y1;
        startLine.width = 0;
        startLine.height = y2;
        endLine.y = y1;
        endLine.width = 0;
        endLine.height = y2;
        fillShape.height = y2;
        fillShape.width = Math.abs(endPoint.x - startPoint.x);
        fillShape.y = y1;
        fillShape.x = startPoint.x;
    };
    /**
     * Updates and positions a grid element.
     *
     * @ignore Exclude from docs
     * @param grid         Grid element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererX.prototype.updateGridElement = function (grid, position, endPosition) {
        position = position + (endPosition - position) * grid.location;
        var point = this.positionToPoint(position);
        //point.x = $utils.spritePointToSprite({x:point.x, y:0}, this, this.gridContainer).x;
        grid.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: 0, y: this.getHeight() });
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
    AxisRendererX.prototype.updateTickElement = function (tick, position, endPosition) {
        position = position + (endPosition - position) * tick.location;
        var point = this.positionToPoint(position);
        var tickLength = tick.length;
        point.y = $utils.spritePointToSprite({ x: 0, y: this.line.pixelY }, this.line.parent, this.gridContainer).y;
        if (this.opposite) {
            tickLength *= (tick.inside ? 1 : -1);
        }
        else {
            tickLength *= (tick.inside ? -1 : 1);
        }
        tick.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: 0, y: tickLength });
        this.positionItem(tick, point);
        this.toggleVisibility(tick, position, 0, 1);
    };
    /**
     * Updates and positions the axis line element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererX.prototype.updateAxisLine = function () {
        this.line.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: this.axisLength, y: 0 });
    };
    /**
     * Updates and positions the base grid element.
     *
     * @ignore Exclude from docs
     */
    AxisRendererX.prototype.updateBaseGridElement = function () {
        _super.prototype.updateBaseGridElement.call(this);
        var axis = this.axis;
        var h = this.getHeight();
        var w = this.axisLength;
        var baseGrid = this.baseGrid;
        var x = axis.basePoint.x;
        if (x < -0.2 || x > w + 0.2) {
            baseGrid.hide(0);
        }
        else {
            var y = $utils.spritePointToSprite({ x: 0, y: 0 }, this.gridContainer, baseGrid.parent).y;
            baseGrid.path = $path.moveTo({ x: 0, y: 0 }) + $path.lineTo({ x: 0, y: h });
            baseGrid.moveTo({ x: x, y: y });
            baseGrid.show(0);
        }
    };
    /**
     * Creates visual elements for and axis break.
     *
     * @ignore Exclude from docs
     * @param axisBreak Axis break
     */
    AxisRendererX.prototype.createBreakSprites = function (axisBreak) {
        axisBreak.startLine = new WavedLine();
        axisBreak.endLine = new WavedLine();
        var wavedRectangle = new WavedRectangle();
        wavedRectangle.setWavedSides(false, true, false, true);
        axisBreak.fillShape = wavedRectangle;
    };
    /**
     * @ignore
     */
    AxisRendererX.prototype.toAxisPosition = function (value) {
        var inversedPosition = value;
        var axis = this.axis;
        if (axis) {
            var relativePositionSprite = axis.relativePositionSprite;
            var x = axis.pixelX;
            if (relativePositionSprite) {
                x = $utils.spritePointToSprite({ x: this.pixelX, y: 0 }, this.parent, relativePositionSprite).x;
            }
            else {
                relativePositionSprite = axis.parent;
            }
            if (relativePositionSprite) {
                var relativeX = x / relativePositionSprite.innerWidth;
                var relativeWidth = axis.axisLength / relativePositionSprite.innerWidth;
                return (inversedPosition - relativeX) / relativeWidth;
            }
        }
        return value;
    };
    /**
     * Updates and positions axis bullets.
     *
     * @ignore Exclude from docs
     * @param bullet       AxisBullet element
     * @param position     Starting position
     * @param endPosition  End position
     */
    AxisRendererX.prototype.updateBullet = function (bullet, position, endPosition) {
        var location = 0.5;
        if (bullet instanceof AxisBullet) {
            location = bullet.location;
        }
        position = position + (endPosition - position) * location;
        var point = this.positionToPoint(position);
        point.y = $utils.spritePointToSprite({ x: 0, y: this.line.pixelY }, this.line.parent, this.gridContainer).y;
        this.positionItem(bullet, point);
        this.toggleVisibility(bullet, position, 0, 1);
    };
    return AxisRendererX;
}(AxisRenderer));
export { AxisRendererX };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisRendererX"] = AxisRendererX;
/**
 * Add default responsive rules
 */
/**
 * Put labels inside plot area.
 * Disable first and last labels.
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.heightXS,
    state: function (target, stateId) {
        if (target instanceof AxisRendererX) {
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
    relevant: ResponsiveBreakpoints.heightXXS,
    state: function (target, stateId) {
        if (target instanceof AxisRendererX) {
            var state = target.states.create(stateId);
            state.properties.disabled = true;
            return state;
        }
        return null;
    }
});
//# sourceMappingURL=AxisRendererX.js.map