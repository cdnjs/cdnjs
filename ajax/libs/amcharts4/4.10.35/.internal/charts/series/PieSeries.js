/**
 * Defines Pie Chart Series.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PercentSeries, PercentSeriesDataItem } from "./PercentSeries";
import { Slice } from "../../core/elements/Slice";
//import { Slice3D } from "../../core/elements/3D/Slice3D";
import { AxisLabelCircular } from "../axes/AxisLabelCircular";
import { PieTick } from "../elements/PieTick";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import { Percent, percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
//@todo: sequenced?
/**
 * Defines a [[DataItem]] for [[PieSeries]].
 *
 * @see {@link DataItem}
 */
var PieSeriesDataItem = /** @class */ (function (_super) {
    __extends(PieSeriesDataItem, _super);
    /**
     * Constructor
     */
    function PieSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PieSeriesDataItem";
        _this.values.radiusValue = {};
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(PieSeriesDataItem.prototype, "radiusValue", {
        /**
         * @return Radius
         */
        get: function () {
            return this.values.radiusValue.value;
        },
        /**
         * Slice's radius, if other than default.
         *
         * @param value  Radius
         */
        set: function (value) {
            this.setValue("radiusValue", value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Hide the data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param toValue   Target value for animation
     * @param fields    Fields to animate while hiding
     */
    PieSeriesDataItem.prototype.hide = function (duration, delay, toValue, fields) {
        return _super.prototype.hide.call(this, duration, delay, 0, ["value", "radiusValue"]);
    };
    /**
     * Show hidden data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param fields    Fields to animate while hiding
     */
    PieSeriesDataItem.prototype.show = function (duration, delay, fields) {
        return _super.prototype.show.call(this, duration, delay, ["value", "radiusValue"]);
    };
    return PieSeriesDataItem;
}(PercentSeriesDataItem));
export { PieSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a slice series on a Pie chart.
 *
 * @see {@link IPieSeriesEvents} for a list of available Events
 * @see {@link IPieSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var PieSeries = /** @class */ (function (_super) {
    __extends(PieSeries, _super);
    /**
     * Constructor
     */
    function PieSeries() {
        var _this = _super.call(this) || this;
        _this.className = "PieSeries";
        _this.alignLabels = true;
        //this.startAngle = -90;
        //this.endAngle = 270;
        _this.layout = "none";
        _this.labels.template.radius = percent(5);
        _this.addDisposer(_this.labels.template.events.on("enabled", _this.invalidate, _this, false));
        _this.applyTheme();
        return _this;
    }
    /**
     * creates slice
     */
    PieSeries.prototype.createSlice = function () {
        return new Slice();
    };
    /**
     * creates tick
     */
    PieSeries.prototype.createTick = function () {
        return new PieTick();
    };
    /**
     * creates label
     */
    PieSeries.prototype.createLabel = function () {
        return new AxisLabelCircular();
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    PieSeries.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Pie Slice Series");
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    PieSeries.prototype.createDataItem = function () {
        return new PieSeriesDataItem();
    };
    /**
     * Inits slice.
     *
     * @param slice to init
     */
    PieSeries.prototype.initSlice = function (slice) {
        slice.isMeasured = false;
        slice.defaultState.properties.scale = 1;
        slice.observe("scale", this.handleSliceScale, this);
        slice.observe(["dx", "dy", "x", "y", "shiftRadius"], this.handleSliceMove, this);
        slice.tooltipText = "{category}: {value.percent.formatNumber('#.#p')} ({value.value})";
        var hoverState = slice.states.create("hover");
        hoverState.properties.scale = 1.05;
        var defaultState = slice.defaultState;
        defaultState.properties.shiftRadius = 0;
        slice.togglable = true;
        slice.events.on("toggled", function (event) {
            event.target.hideTooltip();
            // The following takes care of removing hover on subsequent click of
            // a slice
            if (event.target.interactions.lastHitPointer
                && event.target.interactions.lastHitPointer.touch
                && !event.target.isActive) {
                event.target.isHover = false;
            }
        });
        var activeState = slice.states.create("active");
        activeState.properties.shiftRadius = 0.10;
    };
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    PieSeries.prototype.validate = function () {
        this._leftItems = [];
        this._rightItems = [];
        this._currentStartAngle = this.startAngle;
        this._arcRect = $math.getArcRect(this.startAngle, this.endAngle);
        this._maxRadiusPercent = 0;
        for (var i = this.startIndex; i < this.endIndex; i++) {
            var dataItem = this.dataItems.getIndex(i);
            var radiusValuePercent = dataItem.values.radiusValue.percent;
            if (radiusValuePercent > this._maxRadiusPercent) {
                this._maxRadiusPercent = radiusValuePercent;
            }
        }
        _super.prototype.validate.call(this);
        if (this.alignLabels) {
            if (this.startAngle > this.endAngle) {
                this._rightItems.reverse();
            }
            else {
                this._leftItems.reverse();
            }
            this._rightItems.sort(function (a, b) {
                var aAngle = (a.slice.middleAngle + 360) % 360;
                var bAngle = (b.slice.middleAngle + 360) % 360;
                if (aAngle > 270) {
                    aAngle -= 360;
                }
                if (bAngle > 270) {
                    bAngle -= 360;
                }
                if (aAngle < bAngle) {
                    return -1;
                }
                else if (aAngle > bAngle) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            this._leftItems.sort(function (a, b) {
                var aAngle = (a.slice.middleAngle + 360) % 360;
                var bAngle = (b.slice.middleAngle + 360) % 360;
                if (aAngle < bAngle) {
                    return 1;
                }
                else if (aAngle > bAngle) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            this.arrangeLabels(this._rightItems);
            this.arrangeLabels2(this._rightItems);
            this.arrangeLabels(this._leftItems);
            this.arrangeLabels2(this._leftItems);
        }
    };
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    PieSeries.prototype.validateDataElement = function (dataItem) {
        if (this.pixelRadius > 0) {
            if (this.ignoreZeroValues && (dataItem.value == 0 || dataItem.value == null)) {
                dataItem.__disabled = true;
            }
            else {
                dataItem.__disabled = false;
            }
            // SLICE
            var slice = dataItem.slice;
            slice.radius = this.pixelRadius;
            if ($type.isNumber(dataItem.radiusValue)) {
                slice.radius = this.pixelInnerRadius + (this.pixelRadius - this.pixelInnerRadius) * dataItem.values.radiusValue.percent / this._maxRadiusPercent;
            }
            if (!(slice.innerRadius instanceof Percent)) {
                slice.innerRadius = this.pixelInnerRadius;
            }
            slice.startAngle = this._currentStartAngle;
            slice.arc = Math.abs(dataItem.values.value.percent) * (this.endAngle - this.startAngle) / 100;
            // LABEL
            if (!this.labels.template.disabled) {
                var label = dataItem.label;
                var tick = dataItem.tick;
                tick.slice = slice;
                tick.label = label;
                var normalizedMiddleAngle = (slice.middleAngle + 360) % 360; // force angle to be 0 - 360;
                var point = void 0;
                if (this.alignLabels) {
                    var labelRadius = label.pixelRadius(slice.radius);
                    var x = tick.length + labelRadius;
                    label.dx = 0;
                    label.dy = 0;
                    label.verticalCenter = "middle";
                    var arcRect = this._arcRect;
                    // right half
                    if (normalizedMiddleAngle > 270 || normalizedMiddleAngle <= 90) {
                        x += (arcRect.width + arcRect.x) * this.pixelRadius;
                        label.horizontalCenter = "left";
                        this._rightItems.push(dataItem);
                    }
                    // left half
                    else {
                        x -= arcRect.x * this.pixelRadius;
                        label.horizontalCenter = "right";
                        this._leftItems.push(dataItem);
                        x *= -1;
                    }
                    var distance = slice.radius + tick.length + labelRadius;
                    point = { x: x, y: slice.iy * distance };
                    label.moveTo(point);
                }
                else {
                    var depth = slice["depth"];
                    if (!$type.isNumber(depth)) {
                        depth = 0;
                    }
                    label.fixPosition(slice.middleAngle, slice.radius, slice.radiusY, 0, -depth);
                }
            }
            this._currentStartAngle += slice.arc;
            // do this at the end, otherwise bullets won't be positioned properly
            _super.prototype.validateDataElement.call(this, dataItem);
        }
    };
    Object.defineProperty(PieSeries.prototype, "radius", {
        /**
         * @return Radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Outer radius for the series' slices in pixels or [[Percent]].
         *
         * @param value  Radius
         */
        set: function (value) {
            if (this.setPercentProperty("radius", value, true, false, 10, false)) {
                this.invalidateDataItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "pixelRadius", {
        /**
         * @return Radius
         * @ignore
         */
        get: function () {
            return this._pixelRadius;
        },
        /**
         * @ignore
         */
        set: function (value) {
            if (this._pixelRadius != value) {
                this._pixelRadius = value;
                this.invalidateDataItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "pixelInnerRadius", {
        /**
         * @return Pixel inner radius
         * @ignore
         */
        get: function () {
            return this._pixelInnerRadius;
        },
        /**
         * @ignore
         */
        set: function (value) {
            if (this._pixelInnerRadius != value) {
                this._pixelInnerRadius = value;
                this.invalidateDataItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "innerRadius", {
        /**
         * @ignore Exclude from docs
         * @return Radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius for the series' slices in pixels.
         *
         * @ignore Exclude from docs
         * @todo Redo so that users can set it
         * @param value  Radius
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "startAngle", {
        /**
         * @return Angle
         */
        get: function () {
            var startAngle = this.getPropertyValue("startAngle");
            if ($type.isNumber(startAngle)) {
                return startAngle;
            }
            else {
                return this._startAngleInternal;
            }
        },
        /**
         * Start angle for the series' slices in degrees. (0-360)
         *
         * @param value  Angle
         */
        set: function (value) {
            this.setPropertyValue("startAngle", $math.normalizeAngle(value), true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "endAngle", {
        /**
         * @return Angle
         */
        get: function () {
            var endAngle = this.getPropertyValue("endAngle");
            if ($type.isNumber(endAngle)) {
                return endAngle;
            }
            else {
                return this._endAngleInternal;
            }
        },
        /**
         * End angle for the series' slices in degrees. (0-360)
         *
         * @param value  Angle
         */
        set: function (value) {
            this.setPropertyValue("endAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Positions series bullet.
     *
     * @ignore Exclude from docs
     * @param bullet  Bullet
     */
    PieSeries.prototype.positionBullet = function (bullet) {
        _super.prototype.positionBullet.call(this, bullet);
        var dataItem = bullet.dataItem;
        var slice = dataItem.slice;
        var locationX = bullet.locationX;
        if (!$type.isNumber(locationX)) {
            locationX = 0.5;
        }
        var locationY = bullet.locationY;
        if (!$type.isNumber(locationY)) {
            locationY = 1;
        }
        var angle = slice.startAngle + slice.arc * locationX;
        bullet.x = locationY * slice.radius * $math.cos(angle);
        bullet.y = locationY * slice.radiusY * $math.sin(angle);
    };
    /**
     * Repositions bullet and labels when slice moves.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    PieSeries.prototype.handleSliceMove = function (event) {
        if (!this.alignLabels) {
            var slice = event.target;
            var dataItem = slice.dataItem;
            // moving textelement, as label dx and dy are already employed for aligning
            //@labeltodo
            if (dataItem) {
                var label = dataItem.label;
                if (label) {
                    label.dx = label.fdx + slice.dx + slice.pixelX;
                    label.dy = label.fdy + slice.dy + slice.pixelY;
                }
            }
        }
    };
    Object.defineProperty(PieSeries.prototype, "bbox", {
        /**
         * Returns bounding box (square) for this element.
         *
         * @ignore Exclude from docs
         */
        get: function () {
            if (this.definedBBox) {
                return this.definedBBox;
            }
            var chart = this.chart;
            if (chart) {
                return $math.getArcRect(chart.startAngle, chart.endAngle, this.pixelRadius);
            }
            return $math.getArcRect(this.startAngle, this.endAngle, this.pixelRadius);
        },
        enumerable: true,
        configurable: true
    });
    return PieSeries;
}(PercentSeries));
export { PieSeries };
/**
 * bboxter class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PieSeries"] = PieSeries;
registry.registeredClasses["PieSeriesDataItem"] = PieSeriesDataItem;
//# sourceMappingURL=PieSeries.js.map