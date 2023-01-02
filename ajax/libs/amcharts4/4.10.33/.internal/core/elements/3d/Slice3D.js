/**
 * 3D slice module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Slice } from "../Slice";
import { Sprite } from "../../Sprite";
import * as $math from "../../utils/Math";
import * as $path from "../../rendering/Path";
import * as $type from "../../utils/Type";
import { Color, color } from "../../utils/Color";
import { RadialGradient } from "../../rendering/fills/RadialGradient";
import { LinearGradient } from "../../rendering/fills/LinearGradient";
import { LightenFilter } from "../../rendering/filters/LightenFilter";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a 3D slice of a Pie chart.
 *
 * @see {@link ISlice3DEvents} for a list of available events
 * @see {@link ISlice3DAdapters} for a list of available Adapters
 */
var Slice3D = /** @class */ (function (_super) {
    __extends(Slice3D, _super);
    /**
     * Constructor
     */
    function Slice3D() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "Slice3D";
        _this.layout = "none";
        // Create edge container
        var edge = _this.createChild(Sprite);
        _this.edge = edge;
        edge.shouldClone = false;
        edge.isMeasured = false;
        edge.toBack();
        // Set defaults
        _this.angle = 30;
        _this.depth = 20;
        // Create side A element
        var sideA = _this.createChild(Sprite);
        _this.sideA = sideA;
        sideA.shouldClone = false;
        sideA.isMeasured = false;
        //sideA.setElement(this.paper.add("path"));
        //sideA.strokeOpacity = 0;
        // Crate side B element
        var sideB = _this.createChild(Sprite);
        _this.sideB = sideB;
        sideB.shouldClone = false;
        sideB.isMeasured = false;
        //sideB.setElement(this.paper.add("path"));
        //sideB.strokeOpacity = 0;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets actual `fill` property on the SVG element, including applicable color
     * modifiers.
     *
     * @ignore Exclude from docs
     * @param value  Fill
     */
    Slice3D.prototype.setFill = function (value) {
        _super.prototype.setFill.call(this, value);
        var colorStr;
        if (value instanceof Color) {
            colorStr = value.hex;
        }
        else if (value instanceof LinearGradient || value instanceof RadialGradient) {
            colorStr = value.stops.getIndex(0).color.hex;
        }
        else {
            var filter = new LightenFilter();
            filter.lightness = -0.25;
            this.edge.filters.push(filter);
            this.sideA.filters.push(filter.clone());
            this.sideB.filters.push(filter.clone());
        }
        if (colorStr) {
            var edgeFill = color(colorStr).lighten(-0.25);
            this.edge.fill = edgeFill;
            this.sideA.fill = edgeFill;
            this.sideB.fill = edgeFill;
            this.edge.stroke = edgeFill;
            this.sideA.stroke = edgeFill;
            this.sideB.stroke = edgeFill;
        }
    };
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    Slice3D.prototype.draw = function () {
        this.cornerRadius = 0;
        this.innerCornerRadius = 0;
        _super.prototype.draw.call(this);
        if (this.arc !== 0 && this.radius > 0 && this.depth > 0) {
            this.sideB.show(0);
            this.sideA.show(0);
            this.edge.show(0);
            var startAngle = this.startAngle;
            var arc = this.arc;
            var innerRadius = this.pixelInnerRadius || 0;
            var radiusY = this.radiusY || 0;
            //let cornerRadius = this.cornerRadius || 0;
            //let innerCornerRadius = this.innerCornerRadius;
            var radius = this.radius;
            // this is code duplicate with $path.arc. @todo to think how to avoid it
            var endAngle = startAngle + arc;
            //let crSin = $math.sin($math.min(arc, 45) / 2);
            //innerCornerRadius = innerCornerRadius || cornerRadius;
            var innerRadiusY = (radiusY / radius) * innerRadius;
            //let cornerRadiusY = (radiusY / radius) * cornerRadius;
            //let innerCornerRadiusY = (radiusY / radius) * innerCornerRadius;
            //cornerRadius = $math.fitToRange(cornerRadius, 0, (radius - innerRadius) / 2);
            //cornerRadiusY = $math.fitToRange(cornerRadiusY, 0, (radiusY - innerRadiusY) / 2);
            //innerCornerRadius = $math.fitToRange(innerCornerRadius, 0, (radius - innerRadius) / 2);
            //innerCornerRadiusY = $math.fitToRange(innerCornerRadiusY, 0, (radiusY - innerRadiusY) / 2);
            //cornerRadius = $math.fitToRange(cornerRadius, 0, radius * crSin);
            //cornerRadiusY = $math.fitToRange(cornerRadiusY, 0, radiusY * crSin);
            //innerCornerRadius = $math.fitToRange(innerCornerRadius, 0, innerRadius * crSin);
            //innerCornerRadiusY = $math.fitToRange(innerCornerRadiusY, 0, innerRadiusY * crSin);
            //let crAngle: number = Math.asin(cornerRadius / radius / 2) * $math.DEGREES * 2;
            //let crAngleY: number = Math.asin(cornerRadiusY / radiusY / 2) * $math.DEGREES * 2;
            //if (innerRadius < innerCornerRadius) {
            //	innerRadius = innerCornerRadius;
            //}
            //if (innerRadiusY < innerCornerRadiusY) {
            //	innerRadiusY = innerCornerRadiusY;
            //}
            //let crInnerAngle: number = Math.asin(innerCornerRadius / innerRadius / 2) * $math.DEGREES * 2;
            //let crInnerAngleY: number = Math.asin(innerCornerRadiusY / innerRadiusY / 2) * $math.DEGREES * 2;
            //if (!$type.isNumber(crInnerAngle)) {
            //	crInnerAngle = 0;
            //}
            //if (!$type.isNumber(crInnerAngleY)) {
            //	crInnerAngleY = 0;
            //}
            //let middleAngle = startAngle + arc / 2;
            //let mPoint = { x: $math.round($math.cos(middleAngle) * innerRadius, 4), y: $math.round($math.sin(middleAngle) * innerRadiusY, 4) };
            var a0 = { x: $math.cos(startAngle) * (innerRadius), y: $math.sin(startAngle) * (innerRadiusY) };
            var b0 = { x: $math.cos(startAngle) * (radius), y: $math.sin(startAngle) * (radiusY) };
            var c0 = { x: $math.cos(endAngle) * (radius), y: $math.sin(endAngle) * (radiusY) };
            var d0 = { x: $math.cos(endAngle) * (innerRadius), y: $math.sin(endAngle) * (innerRadiusY) };
            // end of duplicate
            var h = this.depth;
            var ah = { x: a0.x, y: a0.y - h };
            var bh = { x: b0.x, y: b0.y - h };
            var ch = { x: c0.x, y: c0.y - h };
            var dh = { x: d0.x, y: d0.y - h };
            var edgePath = "";
            var count = Math.ceil(arc / 5);
            var step = arc / count;
            var mangle = startAngle;
            var prevPoint = bh;
            for (var i = 0; i < count; i++) {
                mangle += step;
                if (mangle > 0 && mangle < 180) {
                    edgePath += $path.moveTo(prevPoint);
                    var pp = { x: $math.cos(mangle) * (radius), y: $math.sin(mangle) * (radiusY) - h };
                    edgePath += $path.lineTo({ x: prevPoint.x, y: prevPoint.y + h });
                    edgePath += $path.arcToPoint({ x: pp.x, y: pp.y + h }, radius, radiusY, true);
                    edgePath += $path.lineTo(pp);
                    edgePath += $path.arcToPoint(prevPoint, radius, radiusY);
                    edgePath += "z";
                    prevPoint = pp;
                }
                else {
                    edgePath += $path.moveTo(prevPoint);
                    var pp = { x: $math.cos(mangle) * (radius), y: $math.sin(mangle) * (radiusY) - h };
                    edgePath += $path.arcToPoint(pp, radius, radiusY, true);
                    edgePath += $path.lineTo({ x: pp.x, y: pp.y + h });
                    edgePath += $path.arcToPoint({ x: prevPoint.x, y: prevPoint.y + h }, radius, radiusY);
                    edgePath += $path.lineTo(prevPoint);
                    edgePath += "z";
                    prevPoint = pp;
                }
            }
            prevPoint = ah;
            mangle = startAngle;
            for (var i = 0; i < count; i++) {
                mangle += step;
                if (mangle > 0 && mangle < 180) {
                    edgePath += $path.moveTo(prevPoint);
                    var pp = { x: $math.cos(mangle) * (innerRadius), y: $math.sin(mangle) * (innerRadiusY) - h };
                    edgePath += $path.lineTo({ x: prevPoint.x, y: prevPoint.y + h });
                    edgePath += $path.arcToPoint({ x: pp.x, y: pp.y + h }, innerRadius, innerRadiusY, true);
                    edgePath += $path.lineTo(pp);
                    edgePath += $path.arcToPoint(prevPoint, innerRadius, innerRadiusY);
                    edgePath += "z";
                    prevPoint = pp;
                }
                else {
                    edgePath += $path.moveTo(prevPoint);
                    var pp = { x: $math.cos(mangle) * (innerRadius), y: $math.sin(mangle) * (innerRadiusY) - h };
                    edgePath += $path.arcToPoint(pp, innerRadius, innerRadiusY, true);
                    edgePath += $path.lineTo({ x: pp.x, y: pp.y + h });
                    edgePath += $path.arcToPoint({ x: prevPoint.x, y: prevPoint.y + h }, innerRadius, innerRadiusY);
                    edgePath += $path.lineTo(prevPoint);
                    edgePath += "z";
                    prevPoint = pp;
                }
            }
            this.edge.path = edgePath;
            /*
                        a0 = { x: $math.cos(startAngle) * (innerRadius + innerCornerRadius), y: $math.sin(startAngle) * (innerRadiusY + innerCornerRadiusY) };
                        b0 = { x: $math.cos(startAngle) * (radius - cornerRadius), y: $math.sin(startAngle) * (radiusY - cornerRadiusY) };
                        c0 = { x: $math.cos(endAngle) * (radius - cornerRadius), y: $math.sin(endAngle) * (radiusY - cornerRadiusY) };
                        d0 = { x: $math.cos(endAngle) * (innerRadius + innerCornerRadius), y: $math.sin(endAngle) * (innerRadiusY + innerCornerRadiusY) };
                        // end of duplicate
            
                        ah = { x: a0.x, y: a0.y - h };
                        bh = { x: b0.x, y: b0.y - h };
                        ch = { x: c0.x, y: c0.y - h };
                        dh = { x: d0.x, y: d0.y - h };
            */
            this.sideA.path = $path.moveTo(a0) + $path.lineTo(b0) + $path.lineTo(bh) + $path.lineTo(ah) + $path.closePath();
            this.sideB.path = $path.moveTo(c0) + $path.lineTo(d0) + $path.lineTo(dh) + $path.lineTo(ch) + $path.closePath();
            if (this.startAngle < 90) {
                this.sideA.toBack();
            }
            else {
                this.sideA.toFront();
            }
            if (this.startAngle + this.arc > 90) {
                this.sideB.toBack();
            }
            else {
                this.sideB.toFront();
            }
            this.slice.dy = -h;
        }
        else {
            this.sideA.hide(0);
            this.sideB.hide(0);
            this.edge.hide(0);
        }
    };
    Object.defineProperty(Slice3D.prototype, "depth", {
        /**
         * @return Depth (px)
         */
        get: function () {
            return this.getPropertyValue("depth");
        },
        /**
         * Depth (height) of the 3D slice in pixels.
         *
         * @default 20
         * @param depth  Depth (px)
         */
        set: function (depth) {
            this.setPropertyValue("depth", depth, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice3D.prototype, "angle", {
        /**
         * @return Angle
         */
        get: function () {
            var angle = this.getPropertyValue("angle");
            if (!$type.isNumber(angle)) {
                angle = 0;
            }
            return angle;
        },
        /**
         * Angle of the point of view to the 3D element. (0-360)
         *
         * @default 30
         * @param value  Angle
         */
        set: function (value) {
            this.setPropertyValue("angle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice3D.prototype, "radiusY", {
        /**
         * @return Vertical radius (0-1)
         */
        get: function () {
            var radiusY = this.getPropertyValue("radiusY");
            if (!$type.isNumber(radiusY)) {
                radiusY = this.radius - this.radius * this.angle / 90;
            }
            return radiusY;
        },
        /**
         * Vertical radius for creating skewed slices.
         *
         * This is relevant to `radius`, e.g. 0.5 will set vertical radius to half
         * the `radius`.
         *
         * @param value Vertical radius (0-1)
         */
        set: function (value) {
            this.setPropertyValue("radiusY", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    Slice3D.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.edge.copyFrom(source.edge);
        this.sideA.copyFrom(source.sideA);
        this.sideB.copyFrom(source.sideB);
    };
    return Slice3D;
}(Slice));
export { Slice3D };
//# sourceMappingURL=Slice3D.js.map