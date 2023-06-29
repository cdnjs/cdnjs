/**
 * Line series segment module.
 * @todo Add description about what this is
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { Sprite, visualProperties } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import * as $path from "../../core/rendering/Path";
import * as $object from "../../core/utils/Object";
import * as $type from "../../core/utils/Type";
import { color } from "../../core/utils/Color";
import * as $smoothing from "../../core/rendering/Smoothing";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Represents a line series segment.
 *
 * A line segment can be used to apply different properties to a part of the
 * line series, between two data points.
 *
 * @see {@link ILineSeriesSegmentEvents} for a list of available events
 * @see {@link ILineSeriesSegmentAdapters} for a list of available Adapters
 * @todo Example
 */
var LineSeriesSegment = /** @class */ (function (_super) {
    __extends(LineSeriesSegment, _super);
    /**
     * Constructor
     */
    function LineSeriesSegment() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "LineSeriesSegment";
        // Set defaults
        _this.isMeasured = false;
        _this.interactionsEnabled = false;
        _this.layout = "none";
        // Create fill element
        var fillSprite = _this.createChild(Sprite);
        _this.fillSprite = fillSprite;
        fillSprite.shouldClone = false;
        fillSprite.setElement(_this.paper.add("path"));
        fillSprite.isMeasured = false;
        _this._disposers.push(fillSprite);
        // Create line element
        var strokeSprite = _this.createChild(Sprite);
        _this.strokeSprite = strokeSprite;
        strokeSprite.shouldClone = false;
        strokeSprite.fill = color();
        strokeSprite.setElement(_this.paper.add("path"));
        strokeSprite.isMeasured = false;
        _this._disposers.push(strokeSprite);
        return _this;
    }
    /**
     * Draws the series segment.
     *
     * @ignore Exclude from docs
     * @param points       Points to connect
     * @param closePoints  ?
     * @param smoothnessX  Horizontal bezier setting (?)
     * @param smoothnessY  Vertical bezier setting (?)
     */
    LineSeriesSegment.prototype.drawSegment = function (points, closePoints, smoothnessX, smoothnessY) {
        if (!this.disabled) {
            if (points.length > 0 && closePoints.length > 0 && $type.isNumber(points[0].x) && $type.isNumber(points[0].y)) {
                // first moveTo helps to avoid Chrome straight line in the mask bug.
                var path = $path.moveTo({ x: points[0].x - 0.2, y: points[0].y - 0.2 }) + $path.moveTo(points[0]);
                var series = this.series;
                if (series.smoothing == "bezier") {
                    path += new $smoothing.Tension(smoothnessX, smoothnessY).smooth(points);
                }
                else if (series.smoothing == "monotoneX") {
                    path += new $smoothing.MonotoneX({ closed: false }).smooth(points);
                }
                else if (series.smoothing == "monotoneY") {
                    path += new $smoothing.MonotoneY({ closed: false }).smooth(points);
                }
                if (this.strokeOpacity == 0 || this.strokeSprite.strokeOpacity == 0) {
                    // like this and not if != 0, otherwise ranges stroke won't be drawn.
                }
                else {
                    this.strokeSprite.path = path;
                }
                if (this.fillOpacity > 0 || this.fillSprite.fillOpacity > 0) { // helps to avoid drawing fill object if fill is not visible
                    if ($type.isNumber(closePoints[0].x) && $type.isNumber(closePoints[0].y)) {
                        path += $path.lineTo(closePoints[0]);
                        if (series.smoothing == "bezier") {
                            path += new $smoothing.Tension(smoothnessX, smoothnessY).smooth(closePoints);
                        }
                        else if (series.smoothing == "monotoneX") {
                            path += new $smoothing.MonotoneX({ closed: false }).smooth(closePoints);
                        }
                        else if (series.smoothing == "monotoneY") {
                            path += new $smoothing.MonotoneY({ closed: false }).smooth(closePoints);
                        }
                        path += $path.lineTo(points[0]);
                        path += $path.closePath();
                        this.fillSprite.path = path;
                    }
                }
            }
            else {
                this.fillSprite.path = "";
                this.strokeSprite.path = "";
            }
        }
    };
    /**
     * Copies properties from a [[Sprite]] to both line and fill elements.
     *
     * @param source Source [[Sprite]] to copy properties from
     */
    LineSeriesSegment.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        var lineElement = this.strokeSprite;
        $object.copyProperties(source, lineElement.properties, visualProperties);
        lineElement.events.copyFrom(source.strokeSprite.events);
        lineElement.fillOpacity = 0;
        var fillElement = this.fillSprite;
        $object.copyProperties(source, fillElement.properties, visualProperties);
        fillElement.events.copyFrom(source.fillSprite.events);
        fillElement.strokeOpacity = 0;
    };
    return LineSeriesSegment;
}(Container));
export { LineSeriesSegment };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["LineSeriesSegment"] = LineSeriesSegment;
//# sourceMappingURL=LineSeriesSegment.js.map