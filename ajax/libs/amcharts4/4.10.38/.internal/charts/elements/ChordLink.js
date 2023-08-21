/**
 * ChordLink module
 */
import { __extends } from "tslib";
import { FlowDiagramLink } from "./FlowDiagramLink";
import { registry } from "../../core/Registry";
import { QuadraticCurve } from "../../core/elements/QuadraticCurve";
import * as $math from "../../core/utils/Math";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class creates a link (waved color-filled line) between two nodes in a
 * Chord Diagram.
 *
 * @see {@link IChordLinkEvents} for a list of available events
 * @see {@link IChordLinkAdapters} for a list of available Adapters
 * @important
 */
var ChordLink = /** @class */ (function (_super) {
    __extends(ChordLink, _super);
    /**
     * Constructor
     */
    function ChordLink() {
        var _this = _super.call(this) || this;
        _this.className = "ChordLink";
        _this.middleLine = _this.createChild(QuadraticCurve);
        _this.middleLine.shouldClone = false;
        _this.middleLine.strokeOpacity = 0;
        _this.applyTheme();
        return _this;
    }
    /**
     * (Re)validates (redraws) the link.
     *
     * @ignore Exclude from docs
     */
    ChordLink.prototype.validate = function () {
        _super.prototype.validate.call(this);
        if (!this.isTemplate) {
            var startAngle = this.startAngle;
            var endAngle = this.endAngle;
            var arc = this.arc;
            var radius = this.radius;
            var fromNode = this.dataItem.fromNode;
            var toNode = this.dataItem.toNode;
            var fromX = 0;
            var fromY = 0;
            if (fromNode) {
                fromX = fromNode.pixelX + fromNode.dx;
                fromY = fromNode.pixelY + fromNode.dy;
            }
            var toX = 0;
            var toY = 0;
            if (toNode) {
                toX = toNode.pixelX + toNode.dx;
                toY = toNode.pixelY + toNode.dy;
            }
            if (radius > 0) {
                var x1 = radius * $math.cos(startAngle) + fromX;
                var y1 = radius * $math.sin(startAngle) + fromY;
                var x2 = radius * $math.cos(endAngle) + toX;
                var y2 = radius * $math.sin(endAngle) + toY;
                //let cpAngle = startAngle + arc + (endAngle - startAngle - arc) / 2;
                //let arcWidth = $math.getDistance({x:x1, y:y1}, {x:x4, y:y4});
                //let cpx = (arcWidth) * $math.cos(cpAngle);
                //let cpy = (arcWidth) * $math.sin(cpAngle);
                var cp = { x: 0, y: 0 };
                var path = $path.moveTo({ x: x1, y: y1 });
                path += $path.arcTo(startAngle, arc, radius);
                path += $path.quadraticCurveTo({ x: x2, y: y2 }, cp);
                path += $path.arcTo(endAngle, arc, radius);
                path += $path.quadraticCurveTo({ x: x1, y: y1 }, cp);
                if (arc > 0) {
                    this.link.path = path;
                }
                else {
                    this.link.path = "";
                }
                if (this.maskBullets) {
                    this.bulletsMask.path = path;
                    this.bulletsContainer.mask = this.bulletsMask;
                }
                var mAngle1 = startAngle + arc / 2;
                var mAngle2 = endAngle + arc / 2;
                var middleLine = this.middleLine;
                middleLine.x1 = radius * $math.cos(mAngle1) + fromX;
                middleLine.y1 = radius * $math.sin(mAngle1) + fromY;
                middleLine.x2 = radius * $math.cos(mAngle2) + toX;
                middleLine.y2 = radius * $math.sin(mAngle2) + toY;
                middleLine.cpx = 0;
                middleLine.cpy = 0;
                middleLine.stroke = this.fill;
                this.positionBullets();
            }
        }
    };
    Object.defineProperty(ChordLink.prototype, "radius", {
        /**
         * @return End Y
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * [radius description]
         *
         * @todo Description
         * @param value End Y
         */
        set: function (value) {
            this.setPropertyValue("radius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChordLink.prototype, "arc", {
        /**
         * @return [description]
         */
        get: function () {
            return this.getPropertyValue("arc");
        },
        /**
         * [arc description]
         *
         * @todo Description
         * @param value [description]
         */
        set: function (value) {
            this.setPropertyValue("arc", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return ChordLink;
}(FlowDiagramLink));
export { ChordLink };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ChordLink"] = ChordLink;
//# sourceMappingURL=ChordLink.js.map