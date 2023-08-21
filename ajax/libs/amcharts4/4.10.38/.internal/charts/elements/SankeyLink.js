/**
 * SankeyLink module
 */
import { __extends, __read } from "tslib";
import { FlowDiagramLink } from "./FlowDiagramLink";
import { registry } from "../../core/Registry";
import { Polyspline } from "../../core/elements/Polyspline";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import * as $smoothing from "../../core/rendering/Smoothing";
import * as $path from "../../core/rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class creates a link (waved color-filled line) between two nodes in a
 * Sankey Diagram.
 *
 * @see {@link ISankeyLinkEvents} for a list of available events
 * @see {@link ISankeyLinkAdapters} for a list of available Adapters
 * @important
 */
var SankeyLink = /** @class */ (function (_super) {
    __extends(SankeyLink, _super);
    /**
     * Constructor
     */
    function SankeyLink() {
        var _this = _super.call(this) || this;
        _this.className = "SankeyLink";
        // TODO can this be removed ?
        new InterfaceColorSet();
        _this.tension = 0.8;
        _this.controlPointDistance = 0.2;
        _this.startAngle = 0;
        _this.endAngle = 0;
        _this.linkWidth = 0;
        _this.startX = 0;
        _this.endX = 0;
        _this.startY = 0;
        _this.endY = 0;
        _this.middleLine = _this.createChild(Polyspline);
        _this.middleLine.shouldClone = false;
        _this.middleLine.strokeOpacity = 0;
        _this.applyTheme();
        return _this;
    }
    SankeyLink.prototype.makeBackwards = function () {
        if (this.states.getKey("backwards") != undefined) {
            this.setState("backwards");
        }
    };
    /**
     * (Re)validates (redraws) the link.
     *
     * @ignore Exclude from docs
     */
    SankeyLink.prototype.validate = function () {
        var _a, _b, _c, _d;
        _super.prototype.validate.call(this);
        if (!this.isTemplate) {
            var x0 = this.startX;
            var y0 = this.startY;
            var x1 = this.endX;
            var y1 = this.endY;
            if (this.states.getKey("backwards")) {
                this.setState("default");
            }
            if (this.dataItem) {
                var chart = this.dataItem.component;
                if (chart) {
                    if (chart.orientation == "horizontal") {
                        if (x1 < x0) {
                            _a = __read([x1, x0], 2), x0 = _a[0], x1 = _a[1];
                            _b = __read([y1, y0], 2), y0 = _b[0], y1 = _b[1];
                            this.makeBackwards();
                        }
                    }
                    else {
                        if (y1 < y0) {
                            _c = __read([y1, y0], 2), y0 = _c[0], y1 = _c[1];
                            _d = __read([x1, x0], 2), x0 = _d[0], x1 = _d[1];
                            this.makeBackwards();
                        }
                    }
                }
            }
            if (!$type.isNumber(x1)) {
                x1 = x0;
            }
            if (!$type.isNumber(y1)) {
                y1 = y0;
            }
            var startAngle = this.startAngle;
            var endAngle = this.endAngle;
            var w = this.linkWidth;
            var path = "";
            var xt0 = x0;
            var yt0 = y0;
            var xt1 = x1;
            var yt1 = y1;
            var xb0 = x0 + w * $math.sin(startAngle);
            var xb1 = x1 + w * $math.sin(endAngle);
            var yb0 = y0 + w * $math.cos(startAngle);
            var yb1 = y1 + w * $math.cos(endAngle);
            var xm0 = x0 + w / 2 * $math.sin(startAngle);
            var xm1 = x1 + w / 2 * $math.sin(endAngle);
            var ym0 = y0 + w / 2 * $math.cos(startAngle);
            var ym1 = y1 + w / 2 * $math.cos(endAngle);
            this.zIndex = this.zIndex || this.dataItem.index;
            var tensionX = this.tension + (1 - this.tension) * $math.sin(startAngle);
            var tensionY = this.tension + (1 - this.tension) * $math.cos(startAngle);
            this.middleLine.tensionX = tensionX;
            this.middleLine.tensionY = tensionY;
            if ($type.isNumber(w) && ($type.isNumber(x0) && $type.isNumber(x1) && $type.isNumber(y0) && $type.isNumber(y1))) {
                // solves issues with gradient fill of straight lines
                if ($math.round(xt0, 3) == $math.round(xt1, 3)) {
                    xt1 += 0.01;
                }
                if ($math.round(yt0, 3) == $math.round(yt1, 3)) {
                    yt1 += 0.01;
                }
                if ($math.round(xb0, 3) == $math.round(xb1, 3)) {
                    xb1 += 0.01;
                }
                if ($math.round(yb0, 3) == $math.round(yb1, 3)) {
                    yb1 += 0.01;
                }
                var minX = Math.min(xb0, xb1, xt0, xt1);
                var minY = Math.min(yb0, yb1, yt0, yt1);
                var maxX = Math.max(xb0, xb1, xt0, xt1);
                var maxY = Math.max(yb0, yb1, yt0, yt1);
                this._bbox = {
                    x: minX,
                    y: minY,
                    width: maxX - minX,
                    height: maxY - minY
                };
                var cpd = this.controlPointDistance;
                var kxt0 = xt0 + (xt1 - xt0) * cpd * $math.cos(startAngle);
                var kyt0 = yt0 + (yt1 - yt0) * cpd * $math.sin(startAngle);
                var kxt1 = xt1 - (xt1 - xt0) * cpd * $math.cos(endAngle);
                var kyt1 = yt1 - (yt1 - yt0) * cpd * $math.sin(endAngle);
                var kxm0 = xm0 + (xm1 - xm0) * cpd * $math.cos(startAngle);
                var kym0 = ym0 + (ym1 - ym0) * cpd * $math.sin(startAngle);
                var kxm1 = xm1 - (xm1 - xm0) * cpd * $math.cos(endAngle);
                var kym1 = ym1 - (ym1 - ym0) * cpd * $math.sin(endAngle);
                var angle = $math.getAngle({ x: kxt0, y: kyt0 }, { x: kxt1, y: kyt1 });
                var dx = (w / $math.cos(angle) - w) / $math.tan(angle) * $math.cos(startAngle);
                var dy = (w / $math.sin(angle) - w) * $math.tan(angle) * $math.sin(startAngle);
                var kxb0 = -dx / 2 + xb0 + (xb1 - xb0) * cpd * $math.cos(startAngle);
                var kyb0 = -dy / 2 + yb0 + (yb1 - yb0) * cpd * $math.sin(startAngle);
                var kxb1 = -dx / 2 + xb1 - (xb1 - xb0) * cpd * $math.cos(endAngle);
                var kyb1 = -dy / 2 + yb1 - (yb1 - yb0) * cpd * $math.sin(endAngle);
                if (ym1 == ym0) {
                    ym1 += 0.01;
                }
                this.middleLine.segments = [[{ x: xm0, y: ym0 }, { x: kxm0, y: kym0 }, { x: kxm1, y: kym1 }, { x: xm1, y: ym1 }]];
                kxt0 += dx / 2;
                kyt0 += dy / 2;
                kxt1 += dx / 2;
                kyt1 += dy / 2;
                path += $path.moveTo({ x: xt0, y: yt0 });
                path += new $smoothing.Tension(tensionX, tensionY).smooth([{ x: xt0, y: yt0 }, { x: kxt0, y: kyt0 }, { x: kxt1, y: kyt1 }, { x: xt1, y: yt1 }]);
                path += $path.lineTo({ x: xb1, y: yb1 });
                path += new $smoothing.Tension(tensionX, tensionY).smooth([{ x: xb1, y: yb1 }, { x: kxb1, y: kyb1 }, { x: kxb0, y: kyb0 }, { x: xb0, y: yb0 }]);
                path += $path.closePath();
            }
            this.link.path = path;
            if (this.maskBullets) {
                this.bulletsMask.path = path;
                this.bulletsContainer.mask = this.bulletsMask;
            }
            this.positionBullets();
        }
    };
    Object.defineProperty(SankeyLink.prototype, "startX", {
        /**
         * @return Start X
         */
        get: function () {
            return this.getPropertyValue("startX");
        },
        /**
         * [startX description]
         *
         * @todo Description
         * @param value  Start X
         */
        set: function (value) {
            this.setPropertyValue("startX", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SankeyLink.prototype, "endX", {
        /**
         * @return End X
         */
        get: function () {
            return this.getPropertyValue("endX");
        },
        /**
         * [endX description]
         *
         * @todo Description
         * @param value  End X
         */
        set: function (value) {
            this.setPropertyValue("endX", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SankeyLink.prototype, "startY", {
        /**
         * @return Start Y
         */
        get: function () {
            return this.getPropertyValue("startY");
        },
        /**
         * [startY description]
         *
         * @todo Description
         * @param value  Start Y
         */
        set: function (value) {
            this.setPropertyValue("startY", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SankeyLink.prototype, "endY", {
        /**
         * @return End Y
         */
        get: function () {
            return this.getPropertyValue("endY");
        },
        /**
         * [endY description]
         *
         * @todo Description
         * @param value End Y
         */
        set: function (value) {
            this.setPropertyValue("endY", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SankeyLink.prototype, "linkWidth", {
        /**
         * @return [description]
         */
        get: function () {
            return this.getPropertyValue("linkWidth");
        },
        /**
         * [linkWidth description]
         *
         * @todo Description
         * @param value [description]
         */
        set: function (value) {
            this.setPropertyValue("linkWidth", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SankeyLink.prototype, "controlPointDistance", {
        /**
         * @return relative control point distance
         */
        get: function () {
            return this.getPropertyValue("controlPointDistance");
        },
        /**
         * Distance of control point of a link, defines relative distance from a node at which linke should bend
         * @default 0.2
         * @param value
         */
        set: function (value) {
            this.setPropertyValue("controlPointDistance", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SankeyLink.prototype, "tension", {
        /**
         * @return tension value
         */
        get: function () {
            return this.getPropertyValue("tension");
        },
        /**
         * Tension of a spline, 1 would make the link to have sharp edges
         * @default 0.8
         * @param value
         */
        set: function (value) {
            this.setPropertyValue("tension", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return SankeyLink;
}(FlowDiagramLink));
export { SankeyLink };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SankeyLink"] = SankeyLink;
//# sourceMappingURL=SankeyLink.js.map