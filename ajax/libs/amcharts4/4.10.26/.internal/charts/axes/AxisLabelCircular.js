/**
 * Axis Label module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisLabel } from "./AxisLabel";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import * as $path from "../../core/rendering/Path";
import * as $utils from "../../core/utils/Utils";
import { Percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Use to create labels on circular axis.
 *
 * @see {@link IAxisLabelCircularEvents} for a list of available events
 * @see {@link IAxisLabelCircularAdapters} for a list of available Adapters
 */
var AxisLabelCircular = /** @class */ (function (_super) {
    __extends(AxisLabelCircular, _super);
    /**
     * Constructor
     */
    function AxisLabelCircular() {
        var _this = _super.call(this) || this;
        /**
         *
         * @ignore
         */
        _this.fdx = 0;
        /**
         *
         * @ignore
         */
        _this.fdy = 0;
        _this.className = "AxisLabelCircular";
        _this.padding(0, 0, 0, 0);
        _this.location = 0.5;
        _this.locationOnPath = 0.5;
        _this.radius = 0;
        _this.isMeasured = false;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(AxisLabelCircular.prototype, "relativeRotation", {
        /**
         * @return Rotation angle
         */
        get: function () {
            return this.getPropertyValue("relativeRotation");
        },
        /**
         * Relative rotation of the label.
         *
         * It is an angle to circle. In case 90, labels will be positioned like rays
         * of light, if 0 - positioned along the circle.
         *
         * @param value Rotation angle
         */
        set: function (value) {
            this.setPropertyValue("relativeRotation", value, true);
            if (!$type.hasValue(value)) {
                this.rotation = undefined;
                var dataItem = this.dataItem;
                if (dataItem && dataItem.component) {
                    dataItem.component.invalidateDataItems();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisLabelCircular.prototype, "radius", {
        /**
         * @return Distance (px)
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Distance from axis circle to label in pixels or percent.
         *
         * @param value Distance (px or percent)
         */
        set: function (value) {
            this.setPercentProperty("radius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisLabelCircular.prototype, "bent", {
        /**
         * @return Bent?
         */
        get: function () {
            return this.getPropertyValue("bent");
        },
        /**
         * Specifies if label should be bent along the circle.
         *
         * IMPORTANT: Use this with caution, since it is quite CPU-greedy.
         *
         * @since 4.1.2
         * @default false
         * @param  value  Bent?
         */
        set: function (value) {
            this.setPropertyValue("bent", value, true);
            this.setPropertyValue("wrap", false);
            this.setPropertyValue("horizontalCenter", "none");
            this.setPropertyValue("verticalCenter", "none");
            if (value) {
                this.setPropertyValue("dx", 0);
                this.setPropertyValue("dy", 0);
                this.setPropertyValue("x", 0);
                this.setPropertyValue("y", 0);
                this.setPropertyValue("rotation", 0);
                //this.setPropertyValue("relativeRotation", undefined);
                this.fdx = 0;
                this.fdy = 0;
                this.textAlign = "middle";
            }
            else {
                if (this.textPathElement) {
                    this.textPathElement.dispose();
                    this.textPathElement = undefined;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns label radius in pixels.
     *
     * @param   axisRadius  Radius
     * @return              Pixel radius
     */
    AxisLabelCircular.prototype.pixelRadius = function (axisRadius) {
        var sign = 1;
        if (this.inside) {
            sign = -1;
        }
        return $utils.relativeToValue(this.radius, axisRadius) * sign;
    };
    /**
     * Returns label horizontal radius in pixels.
     *
     * @param   axisRadius   Radius
     * @param   axisRadiusY  Vertical radius
     * @return               Radius
     */
    AxisLabelCircular.prototype.pixelRadiusY = function (axisRadius, axisRadiusY) {
        var sign = 1;
        if (this.inside) {
            sign = -1;
        }
        var radius = this.radius;
        if ($type.isNumber(radius)) {
            radius *= axisRadiusY / axisRadius;
            return $utils.relativeToValue(radius, axisRadius) * sign;
        }
        else {
            return $utils.relativeToValue(radius, axisRadiusY) * sign;
        }
    };
    /**
     * [fixPosition description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param point       Label affixation point
     * @param axisRadius  Distance from point (px)
     */
    AxisLabelCircular.prototype.fixPosition = function (angle, axisRadius, axisRadiusY, dx, dy) {
        if (!$type.isNumber(axisRadiusY)) {
            axisRadiusY = axisRadius;
        }
        if (!$type.isNumber(dx)) {
            dx = 0;
        }
        if (!$type.isNumber(dy)) {
            dy = 0;
        }
        var point = { x: axisRadius * $math.cos(angle), y: axisRadiusY * $math.sin(angle) };
        if (this.invalid) {
            this.validate(); //@todo" check if we need this
        }
        var isNegative = false;
        var realRadius = this.radius;
        if (realRadius instanceof Percent && realRadius.value < 0) {
            isNegative = true;
        }
        else if (realRadius < 0) {
            isNegative = true;
        }
        var relativeRotation = this.relativeRotation;
        var labelRadius = this.pixelRadius(axisRadius);
        if (this.bent) {
            var point_1 = { x: (axisRadius + labelRadius) * $math.cos(angle + 180), y: (axisRadiusY + labelRadius * axisRadiusY / axisRadius) * $math.sin(angle + 180) };
            this.path = $path.moveTo(point_1) + $path.arcTo(angle + 180, 360, axisRadius + labelRadius, axisRadiusY + labelRadius * axisRadiusY / axisRadius);
            if (this.textPathElement) {
                this.textPathElement.attr({ "startOffset": (this.locationOnPath * 100) + "%" });
            }
            return;
        }
        // WHEN ROTATED
        if ($type.isNumber(relativeRotation)) {
            this.horizontalCenter = "none";
            this.verticalCenter = "none";
            angle = $math.fitAngleToRange(angle, -180, 180);
            var pixelWidth = this.bbox.width;
            var pixelHeight = this.bbox.height;
            var pixelPaddingBottom = this.pixelPaddingBottom;
            var pixelPaddingTop = this.pixelPaddingTop;
            var pixelPaddingLeft = this.pixelPaddingLeft;
            var pixelPaddingRight = this.pixelPaddingRight;
            if (angle > 90 || angle < -90) {
                if (relativeRotation == -90) {
                    relativeRotation = 90;
                    pixelWidth = 0;
                }
            }
            else {
                if (relativeRotation == -90) {
                    pixelHeight = -pixelHeight;
                }
                if (relativeRotation == 90) {
                    relativeRotation = -90;
                    pixelWidth = -pixelPaddingLeft - pixelPaddingRight;
                    pixelHeight = -pixelHeight - pixelPaddingTop - pixelPaddingBottom;
                }
            }
            this.rotation = relativeRotation + angle + 90;
            var dH = $math.sin(relativeRotation) / 2;
            var dW = $math.cos(relativeRotation) / 2;
            var rotation = this.rotation;
            this.dx = pixelHeight * dH * $math.sin(rotation) - pixelWidth * dW * $math.cos(rotation);
            this.dy = -pixelHeight * dH * $math.cos(rotation) - pixelWidth * dW * $math.sin(rotation);
            if (!this.inside) {
                labelRadius += (pixelHeight + pixelPaddingBottom + pixelPaddingTop) * $math.cos(relativeRotation) + (pixelWidth + pixelPaddingLeft + pixelPaddingRight) * $math.sin(relativeRotation);
            }
            else {
                if (angle > 90 || angle < -90) {
                    labelRadius -= (pixelPaddingBottom + pixelPaddingTop) * $math.cos(relativeRotation) + (pixelPaddingLeft + pixelPaddingRight) * $math.sin(relativeRotation);
                }
                else {
                    labelRadius += (pixelPaddingBottom + this.bbox.height + pixelPaddingTop) * $math.cos(relativeRotation) + (pixelPaddingLeft + pixelPaddingRight + this.bbox.width) * $math.sin(relativeRotation);
                }
            }
            point.x += $math.cos(angle) * labelRadius;
            point.y += $math.sin(angle) * labelRadius * axisRadiusY / axisRadius;
        }
        else {
            // END OF ROTATED
            this.horizontalCenter = "middle";
            this.verticalCenter = "middle";
            if (isNegative) {
                this.dx = 0;
                this.dy = 0;
                point.x = (axisRadius + labelRadius) * $math.cos(angle);
                point.y = (axisRadiusY + labelRadius * axisRadiusY / axisRadius) * $math.sin(angle);
            }
            else {
                // we don't use valign for labels because then they would jump while animating. instead we modify dy depending on a y position
                // this math makes dy to be 1 at the top of the circle, 0.5 at the middle and 1 at the bottom
                // @todo with this math doesn't work well with inside = true
                this.dy = this._measuredHeight / 2 * $math.sin(angle); //(1 - (point.y + axisRadiusY) / (2 * axisRadiusY));
                // simmilar with dx
                this.dx = this._measuredWidth / 2 * $math.cos(angle); //(1 - (point.x + axisRadius) / (2 * axisRadius));
                point.x += $math.cos(angle) * labelRadius;
                point.y += $math.sin(angle) * labelRadius * axisRadiusY / axisRadius;
            }
        }
        point.x += dx;
        point.y += dy;
        this.fdx = this.dx;
        this.fdy = this.dy;
        this.moveTo(point);
    };
    return AxisLabelCircular;
}(AxisLabel));
export { AxisLabelCircular };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisLabelCircular"] = AxisLabelCircular;
//# sourceMappingURL=AxisLabelCircular.js.map