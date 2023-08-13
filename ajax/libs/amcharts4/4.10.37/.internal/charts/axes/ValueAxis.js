/**
 * Value Axis module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Axis, AxisDataItem } from "./Axis";
import { AxisRendererY } from "./AxisRendererY";
import { MultiDisposer } from "../../core/utils/Disposer";
import { registry } from "../../core/Registry";
import { ValueAxisBreak } from "./ValueAxisBreak";
import * as $math from "../../core/utils/Math";
import * as $iter from "../../core/utils/Iterator";
import * as $object from "../../core/utils/Object";
import * as $type from "../../core/utils/Type";
import * as $utils from "../../core/utils/Utils";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[ValueAxis]].
 *
 * @see {@link DataItem}
 */
var ValueAxisDataItem = /** @class */ (function (_super) {
    __extends(ValueAxisDataItem, _super);
    /**
     * Constructor
     */
    function ValueAxisDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "ValueAxisDataItem";
        _this.values.value = {};
        _this.values.endValue = {};
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(ValueAxisDataItem.prototype, "value", {
        /**
         * @return Value
         */
        get: function () {
            return this.values["value"].value;
        },
        /**
         * A data point's numeric value.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("value", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxisDataItem.prototype, "endValue", {
        /**
         * @return Value
         */
        get: function () {
            return this.values["endValue"].value;
        },
        /**
         * Data point's numeric end value.
         *
         * @param value  End value
         */
        set: function (value) {
            this.setValue("endValue", value);
        },
        enumerable: true,
        configurable: true
    });
    return ValueAxisDataItem;
}(AxisDataItem));
export { ValueAxisDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to create a value axis for the chart.
 *
 * ```TypeScript
 * // Create the axis
 * let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
 *
 * // Set settings
 * valueAxis.title.text = "Monthly Sales";
 * ```
 * ```JavaScript
 * // Create the axis
 * var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
 *
 * // Set settings
 * valueAxis.title.text = "Monthly Sales";
 * ```
 * ```JSON
 * "yAxes": [{
 *   "type": "ValueAxis",
 *   "title": {
 *     "text": "Monthly Sales"
 *   }
 * }]
 * ```
 *
 * @see {@link IValueAxisEvents} for a list of available Events
 * @see {@link IValueAxisAdapters} for a list of available Adapters
 * @important
 */
var ValueAxis = /** @class */ (function (_super) {
    __extends(ValueAxis, _super);
    /**
     * Constructor
     */
    function ValueAxis() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * [_stepDecimalPlaces description]
         *
         * @todo Description
         */
        _this._stepDecimalPlaces = 0;
        _this._prevStepDecimalPlaces = 0;
        _this._adjustLabelPrecision = true;
        /**
         * Base value for the axis.
         */
        _this._baseValue = 0;
        /**
         * Adjusted start in case we have breaks.
         *
         * @todo Description
         */
        _this._adjustedStart = 0;
        /**
         * Adjusted end in case we have breaks.
         *
         * @todo Description
         */
        _this._adjustedEnd = 1;
        _this._extremesChanged = false;
        _this._deltaMinMax = 1;
        _this._dsc = false;
        /**
         * As calculating totals is expensive operation and not often needed, we
         * don't do it by default.
         *
         * In case you use `totalPercent` or `total` in your charts, this must be set
         * to `true`.
         *
         * @default false
         * @see {@link https://www.amcharts.com/docs/v4/chart-types/xy-chart/#100_stacks} For using `calculateTotals` for 100% stacked series.
         * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-strings/#Placeholders_for_numeric_values} For using `calculateTotals` in labels.
         */
        _this.calculateTotals = false;
        _this.className = "ValueAxis";
        // Set field name
        _this.axisFieldName = "value";
        // Set defaults
        _this.setPropertyValue("maxZoomFactor", 1000);
        _this.setPropertyValue("extraMin", 0);
        _this.setPropertyValue("extraMax", 0);
        _this.setPropertyValue("strictMinMax", false);
        _this.setPropertyValue("maxPrecision", Number.MAX_VALUE);
        _this.setPropertyValue("adjustLabelPrecision", true);
        _this.setPropertyValue("extraTooltipPrecision", 0);
        _this.keepSelection = false;
        _this.includeRangesInMinMax = false;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Holds reference to a function that accepts a DataItem as parameter.
     *
     * It can either return a fill opacity for a fill, or manipulate data item
     * directly, to create various highlighting scenarios.
     */
    ValueAxis.prototype.fillRule = function (dataItem) {
        var value = dataItem.value;
        var axis = dataItem.component;
        if (!dataItem.axisFill.disabled) {
            // rounding in left to solve floating point number
            if ($math.round(value / axis.step / 2, 5) == Math.round(value / axis.step / 2)) {
                dataItem.axisFill.__disabled = true;
            }
            else {
                dataItem.axisFill.__disabled = false;
            }
        }
    };
    /**
     * Returns a new/empty [[DataItem]] of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    ValueAxis.prototype.createDataItem = function () {
        return new ValueAxisDataItem();
    };
    /**
     * Returns a new/empty [[AxisBreak]] of the appropriate type.
     *
     * @return Axis break
     */
    ValueAxis.prototype.createAxisBreak = function () {
        return new ValueAxisBreak();
    };
    /**
     * [dataChangeUpdate description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    ValueAxis.prototype.dataChangeUpdate = function () {
        this.clearCache();
        if (!this.keepSelection) {
            if (this._start != 0 || this._end != 1) {
                this._start = 0;
                this._end = 1;
                this.dispatchImmediately("startendchanged");
            }
        }
        else {
            if (this._start != 0) {
                this.dispatchImmediately("startchanged");
            }
            if (this._end != 1) {
                this.dispatchImmediately("endchanged");
            }
            if (this._start != 0 || this._end != 1) {
                this.dispatchImmediately("startendchanged");
            }
        }
        this._maxZoomed = this._maxDefined;
        this._minZoomed = this._minDefined;
        this._maxAdjusted = this._maxDefined;
        this._minAdjusted = this._minDefined;
    };
    /**
     * Processes data items of the related Series.
     *
     * @ignore Exclude from docs
     */
    ValueAxis.prototype.processSeriesDataItems = function () {
        // @todo: add some boolean (maybe autodedect) if we need these calculations or not. this place uses a lot of cpu
        if (this.calculateTotals) {
            var series = this.series.getIndex(0);
            var startIndex = series.startIndex;
            if (series.dataItems.length > 0) {
                if (startIndex > 0) {
                    startIndex--;
                }
                var endIndex = series.endIndex;
                if (endIndex < series.dataItems.length) {
                    endIndex++;
                }
                var _loop_1 = function (i) {
                    // This has to be `var` in order to avoid garbage collection
                    var total = {};
                    var sum = {};
                    this_1.series.each(function (series) {
                        if (!series.excludeFromTotal) {
                            var dataItem_1 = series.dataItems.getIndex(i);
                            if (dataItem_1) {
                                $object.each(dataItem_1.values, function (key) {
                                    var value = dataItem_1.values[key].workingValue; // can not use getWorkingValue here!
                                    if ($type.isNumber(value)) {
                                        if (!$type.isNumber(total[key])) {
                                            total[key] = Math.abs(value);
                                        }
                                        else {
                                            total[key] += Math.abs(value);
                                        }
                                        if (!$type.isNumber(sum[key])) {
                                            sum[key] = value;
                                        }
                                        else {
                                            sum[key] += value;
                                        }
                                    }
                                });
                            }
                        }
                    });
                    this_1.series.each(function (series) {
                        if (!series.excludeFromTotal) {
                            var dataItem_2 = series.dataItems.getIndex(i);
                            if (dataItem_2) {
                                $object.each(dataItem_2.values, function (key) {
                                    var value = dataItem_2.values[key].workingValue; // can not use getWorkingValue here!
                                    if ($type.isNumber(value)) {
                                        dataItem_2.setCalculatedValue(key, total[key], "total");
                                        dataItem_2.setCalculatedValue(key, 100 * value / total[key], "totalPercent");
                                        dataItem_2.setCalculatedValue(key, sum[key], "sum");
                                    }
                                });
                            }
                        }
                    });
                };
                var this_1 = this;
                // This has to be `var` in order to avoid garbage collection
                for (var i = startIndex; i < endIndex; ++i) {
                    _loop_1(i);
                }
            }
        }
    };
    /**
     * Validates the whole axis. Causes it to redraw.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    ValueAxis.prototype.validate = function () {
        if (this.axisLength <= 0) {
            return;
        }
        _super.prototype.validate.call(this);
        this.getMinMax();
        if (!$type.isNumber(this._minAdjusted)) {
            this.dataItems.each(function (dataItem) {
                dataItem.value = null;
            });
        }
        this.fixAxisBreaks();
        this.calculateZoom();
        this.validateAxisElements();
        this.validateAxisRanges();
        this.validateBreaks();
        this.hideUnusedDataItems();
        this.renderer.invalidateLayout();
        // hide too close
        //this.hideTooCloseDataItems();
    };
    /**
     * Calculates all positions, related to axis as per current zoom.
     *
     * @ignore Exclude from docs
     */
    ValueAxis.prototype.calculateZoom = function () {
        if ($type.isNumber(this.min) && $type.isNumber(this.max)) {
            var min = this.positionToValue(this.start);
            var max = this.positionToValue(this.end);
            var differece = this.adjustDifference(min, max);
            var minMaxStep = this.adjustMinMax(min, max, differece, this._gridCount, true);
            var stepDecimalPlaces = $utils.decimalPlaces(minMaxStep.step);
            this._stepDecimalPlaces = stepDecimalPlaces;
            min = $math.round(min, stepDecimalPlaces);
            max = $math.round(max, stepDecimalPlaces);
            minMaxStep = this.adjustMinMax(min, max, differece, this._gridCount, true);
            var step = minMaxStep.step;
            if (this.syncWithAxis) {
                var calculated = this.getCache(min + "-" + max);
                if ($type.isNumber(calculated)) {
                    step = calculated;
                }
            }
            else {
                min = minMaxStep.min;
                max = minMaxStep.max;
            }
            if (this._minZoomed != min || this._maxZoomed != max || this._step != step || this._dsc) {
                this._dsc = false;
                this._minZoomed = min;
                this._maxZoomed = max;
                this._step = step;
                this.dispatchImmediately("selectionextremeschanged");
            }
        }
    };
    ValueAxis.prototype.fixSmallStep = function (step) {
        if (1 + step == 1) {
            step *= 2;
            return this.fixSmallStep(step);
        }
        return step;
    };
    /**
     * Validates Axis elements.
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    ValueAxis.prototype.validateAxisElements = function () {
        var _this = this;
        if ($type.isNumber(this.max) && $type.isNumber(this.min)) {
            // first regular items
            var value_1 = this.minZoomed - this._step * 2;
            if (!this.logarithmic) {
                value_1 = Math.floor(value_1 / this._step) * this._step;
            }
            else {
                var differencePower = Math.log(this.max) * Math.LOG10E - Math.log(this.min) * Math.LOG10E;
                if (differencePower > 1) {
                    value_1 = Math.pow(10, Math.log(this.min) * Math.LOG10E);
                }
                else {
                    value_1 = Math.floor(this.minZoomed / this._step) * this._step;
                    if (value_1 == 0) {
                        value_1 = this.minZoomed;
                    }
                }
            }
            var maxZoomed = this._maxZoomed + this._step;
            this.resetIterators();
            var dataItemsIterator_1 = this._dataItemsIterator;
            if (this._step == 0) {
                return;
            }
            this._step = this.fixSmallStep(this._step);
            var i = 0;
            var precisionChanged = this._prevStepDecimalPlaces != this._stepDecimalPlaces;
            this._prevStepDecimalPlaces = this._stepDecimalPlaces;
            while (value_1 <= maxZoomed) {
                var axisBreak = this.isInBreak(value_1);
                if (!axisBreak) {
                    var dataItem = dataItemsIterator_1.find(function (x) { return x.value === value_1; });
                    if (dataItem.__disabled) {
                        dataItem.__disabled = false;
                    }
                    //this.processDataItem(dataItem);
                    this.appendDataItem(dataItem);
                    dataItem.axisBreak = undefined;
                    if (dataItem.value != value_1 || precisionChanged) {
                        dataItem.value = value_1;
                        dataItem.text = this.formatLabel(value_1);
                        if (dataItem.label && dataItem.label.invalid) {
                            dataItem.label.validate();
                        }
                        if (dataItem.value >= this.min && dataItem.value <= this.max) {
                            if (dataItem.label) {
                                if ((this.axisLetter == "Y" && dataItem.label.measuredWidth > this.ghostLabel.measuredWidth) || (this.axisLetter == "X" && dataItem.label.measuredHeight > this.ghostLabel.measuredHeight)) {
                                    this.ghostLabel.text = dataItem.label.currentText;
                                    this.ghostLabel.validate();
                                }
                            }
                        }
                    }
                    this.validateDataElement(dataItem);
                }
                i++;
                var oldValue = value_1;
                if (!this.logarithmic) {
                    value_1 += this._step;
                }
                else {
                    var differencePower = Math.log(this.max) * Math.LOG10E - Math.log(this.min) * Math.LOG10E;
                    if (differencePower > 1) {
                        value_1 = Math.pow(10, Math.log(this.min) * Math.LOG10E + i);
                    }
                    else {
                        value_1 += this._step;
                    }
                }
                var stepPower = Math.pow(10, Math.floor(Math.log(Math.abs(this._step)) * Math.LOG10E));
                if (stepPower < 1) {
                    // exponent is less then 1 too. Count decimals of exponent
                    var decCount = Math.round(Math.abs(Math.log(Math.abs(stepPower)) * Math.LOG10E)) + 2;
                    decCount = Math.min(13, decCount);
                    // round value to avoid floating point issues
                    value_1 = $math.round(value_1, decCount);
                    // ceil causes problems: https://codepen.io/team/amcharts/pen/XWMjZwy?editors=1010
                    if (oldValue == value_1) {
                        value_1 = maxZoomed;
                        break;
                    }
                }
            }
            var axisBreaks = this._axisBreaks;
            if (axisBreaks) {
                // breaks later
                var renderer_1 = this.renderer;
                $iter.each(axisBreaks.iterator(), function (axisBreak) {
                    if (axisBreak.breakSize > 0) {
                        // only add grid if gap is bigger then minGridDistance
                        if ($math.getDistance(axisBreak.startPoint, axisBreak.endPoint) > renderer_1.minGridDistance) {
                            var breakValue_1 = axisBreak.adjustedMin;
                            while (breakValue_1 <= axisBreak.adjustedMax) {
                                if (breakValue_1 >= axisBreak.adjustedStartValue && breakValue_1 <= axisBreak.adjustedEndValue) {
                                    var dataItem = dataItemsIterator_1.find(function (x) { return x.value === breakValue_1; });
                                    if (dataItem.__disabled) {
                                        dataItem.__disabled = false;
                                    }
                                    //this.processDataItem(dataItem);
                                    _this.appendDataItem(dataItem);
                                    dataItem.axisBreak = axisBreak;
                                    if (dataItem.value != breakValue_1) {
                                        dataItem.value = breakValue_1;
                                        dataItem.text = _this.formatLabel(breakValue_1);
                                        if (dataItem.label && dataItem.label.invalid) {
                                            dataItem.label.validate();
                                        }
                                    }
                                    _this.validateDataElement(dataItem);
                                }
                                breakValue_1 += axisBreak.adjustedStep;
                            }
                        }
                    }
                });
            }
        }
    };
    /**
     * Validates axis data item.
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem  Data item
     */
    ValueAxis.prototype.validateDataElement = function (dataItem) {
        _super.prototype.validateDataElement.call(this, dataItem);
        //dataItem.__disabled = false;
        dataItem.itemIndex = this._axisItemCount;
        this._axisItemCount++;
        var renderer = this.renderer;
        var value = dataItem.value;
        var endValue = dataItem.endValue;
        var position = this.valueToPosition(value);
        dataItem.position = position;
        var endPosition = position;
        var fillEndPosition = this.valueToPosition(value + this._step);
        if ($type.isNumber(endValue)) {
            endPosition = this.valueToPosition(endValue);
            fillEndPosition = endPosition;
        }
        // this point is needed to calculate distance to satisfy minGridDistance
        dataItem.point = renderer.positionToPoint(position);
        var tick = dataItem.tick;
        if (tick && !tick.disabled) {
            renderer.updateTickElement(tick, position, endPosition);
        }
        var grid = dataItem.grid;
        if (grid && !grid.disabled) {
            renderer.updateGridElement(grid, position, endPosition);
        }
        var label = dataItem.label;
        if (label && !label.disabled) {
            renderer.updateLabelElement(label, position, endPosition);
        }
        var fill = dataItem.axisFill;
        if (fill && !fill.disabled) {
            renderer.updateFillElement(fill, position, fillEndPosition);
            if (!dataItem.isRange) {
                this.fillRule(dataItem);
            }
        }
        if (dataItem.bullet) {
            renderer.updateBullet(dataItem.bullet, position, endPosition);
        }
        var mask = dataItem.mask;
        if (mask) {
            renderer.updateFillElement(mask, position, fillEndPosition);
        }
    };
    /**
     * Formats the value according to axis' own [[NumberFormatter]].
     *
     * @param value  Source value
     * @return Formatted value
     */
    ValueAxis.prototype.formatLabel = function (value) {
        if (this.adjustLabelPrecision && value != 0) {
            return this.numberFormatter.format(value, undefined, this._stepDecimalPlaces);
        }
        else {
            return this.numberFormatter.format(value);
        }
    };
    Object.defineProperty(ValueAxis.prototype, "basePoint", {
        /**
         * Coordinates of the actual axis start.
         *
         * @ignore Exclude from docs
         * @return Base point
         */
        get: function () {
            var baseValue = this.baseValue;
            var position = this.valueToPosition(baseValue);
            var basePoint = this.renderer.positionToPoint(position);
            return basePoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "baseValue", {
        /**
         * @return base value
         */
        get: function () {
            var baseValue = this._baseValue;
            if (this.logarithmic) {
                baseValue = this.min;
            }
            if (!this._adapterO) {
                return baseValue;
            }
            else {
                return this._adapterO.apply("baseValue", baseValue);
            }
        },
        /**
         * A base value.
         *
         * This is a threshold value that will divide "positive" and "negative"
         * value ranges.
         *
         * Other scale-related functionality also depend on base value. E.g. stacks,
         * value-dependent coloring, etc.
         *
         * @param value Base value
         */
        set: function (value) {
            this._baseValue = value;
            this.invalidateLayout();
            this.invalidateSeries();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts a numeric value to relative position on axis
     *
     * An alias to `valueToPosition()`.
     *
     * @param value  Value
     * @return Position
     */
    ValueAxis.prototype.anyToPosition = function (value) {
        return this.valueToPosition(value);
    };
    /**
     * Converts a numeric value to orientation point (x, y, angle) on axis
     *
     * @param value  Value
     * @return Orientation point
     */
    ValueAxis.prototype.valueToPoint = function (value) {
        var position = this.valueToPosition(value);
        var point = this.renderer.positionToPoint(position);
        var angle = this.renderer.positionToAngle(position);
        return { x: point.x, y: point.y, angle: angle };
    };
    /**
     * Converts a numeric value to orientation (x, y, angle) point on axis
     *
     * @param value  Value
     * @return Orientation point
     */
    ValueAxis.prototype.anyToPoint = function (value) {
        return this.valueToPoint(value);
    };
    /**
     * Converts a numeric value to relative position on axis.
     *
     * @param value  Value
     * @return relative position
     */
    ValueAxis.prototype.valueToPosition = function (value) {
        if ($type.isNumber(value)) {
            // todo: think if possible to take previous value and do not go through all previous breaks
            var min_1 = this.min;
            var max_1 = this.max;
            if ($type.isNumber(min_1) && $type.isNumber(max_1)) {
                var difference = this._difference;
                var axisBreaks = this._axisBreaks;
                if (axisBreaks && axisBreaks.length > 0) {
                    $iter.eachContinue(axisBreaks.iterator(), function (axisBreak) {
                        var startValue = axisBreak.adjustedStartValue;
                        var endValue = axisBreak.adjustedEndValue;
                        if ($type.isNumber(startValue) && $type.isNumber(endValue)) {
                            if (value < startValue) {
                                return false;
                            }
                            if ($math.intersect({ start: startValue, end: endValue }, { start: min_1, end: max_1 })) { // todo: check this once and set some flag in axisBreak
                                startValue = Math.max(startValue, min_1);
                                endValue = Math.min(endValue, max_1);
                                var breakSize = axisBreak.breakSize;
                                // value to the right of break end
                                if (value > endValue) {
                                    min_1 += (endValue - startValue) * (1 - breakSize); // todo: maybe this can be done differently?
                                }
                                // value to the left of break start
                                else if (value < startValue) {
                                }
                                // value within break
                                else {
                                    value = startValue + (value - startValue) * breakSize;
                                }
                            }
                        }
                        return true;
                    });
                }
                var position = void 0;
                if (!this.logarithmic) {
                    position = (value - min_1) / difference;
                }
                else {
                    var treatZeroAs = this.treatZeroAs;
                    if ($type.isNumber(treatZeroAs)) {
                        if (value <= treatZeroAs) {
                            value = treatZeroAs;
                        }
                    }
                    position = (Math.log(value) * Math.LOG10E - Math.log(this.min) * Math.LOG10E) / ((Math.log(this.max) * Math.LOG10E - Math.log(this.min) * Math.LOG10E));
                }
                //position = $math.round(position, 10);
                return position;
            }
        }
        return 0;
    };
    /**
     * When fontSize of fontFamily changes we need to hard-invalidate all Labels of this container to position them properly.
     */
    ValueAxis.prototype.invalidateLabels = function () {
        _super.prototype.invalidateLabels.call(this);
        if (this.dataItems) {
            this.dataItems.each(function (dataItem) {
                dataItem.value = undefined;
            });
            this.invalidate();
        }
    };
    /**
     * Converts an relative position to a corresponding value within
     * axis' scale.
     *
     * @param position  Position (px)
     * @return Value
     */
    ValueAxis.prototype.positionToValue = function (position) {
        var min = this.min;
        var max = this.max;
        if ($type.isNumber(min) && $type.isNumber(max)) {
            var difference_1 = max - min; //no need to adjust!
            var value_2 = null;
            var axisBreaks = this._axisBreaks;
            if (axisBreaks) {
                // in case we have some axis breaks
                if (axisBreaks.length > 0) {
                    $iter.eachContinue(axisBreaks.iterator(), function (axisBreak) {
                        var breakStartPosition = axisBreak.startPosition;
                        var breakEndPosition = axisBreak.endPosition;
                        var breakStartValue = axisBreak.adjustedStartValue;
                        var breakEndValue = axisBreak.adjustedEndValue;
                        if ($type.isNumber(breakStartValue) && $type.isNumber(breakEndValue)) {
                            if (breakStartValue > max) {
                                return false;
                            }
                            if ($math.intersect({ start: breakStartValue, end: breakEndValue }, { start: min, end: max })) {
                                breakStartValue = $math.max(breakStartValue, min);
                                breakEndValue = $math.min(breakEndValue, max);
                                var breakSize = axisBreak.breakSize;
                                difference_1 -= (breakEndValue - breakStartValue) * (1 - breakSize);
                                // position to the right of break end
                                if (position > breakEndPosition) {
                                    min += (breakEndValue - breakStartValue) * (1 - breakSize);
                                }
                                // position to the left of break start
                                else if (position < breakStartPosition) {
                                }
                                // value within break
                                else {
                                    var breakPosition = (position - breakStartPosition) / (breakEndPosition - breakStartPosition);
                                    value_2 = breakStartValue + breakPosition * (breakEndValue - breakStartValue);
                                    return false;
                                }
                            }
                            return true;
                        }
                    });
                }
            }
            if (!$type.isNumber(value_2)) {
                if (this.logarithmic) {
                    value_2 = Math.pow(Math.E, (position * ((Math.log(this.max) * Math.LOG10E - Math.log(this.min) * Math.LOG10E)) + Math.log(this.min) * Math.LOG10E) / Math.LOG10E);
                }
                else {
                    value_2 = position * difference_1 + min;
                }
            }
            return value_2;
        }
        //}
    };
    /**
     * Converts an X coordinate to a relative value in axis' scale.
     *
     * @param x  X (px)
     * @return Value
     */
    ValueAxis.prototype.xToValue = function (x) {
        return this.positionToValue(this.pointToPosition({ x: x, y: 0 }));
    };
    /**
     * Converts an Y coordinate to a relative value in axis' scale.
     *
     * @param y  Y (px)
     * @return Value
     */
    ValueAxis.prototype.yToValue = function (y) {
        return this.positionToValue(this.pointToPosition({ x: 0, y: y }));
    };
    /**
     * Converts pixel coordinates to a relative position. (0-1)
     *
     * @param point  Coorinates (px)
     * @return Position (0-1)
     */
    ValueAxis.prototype.pointToPosition = function (point) {
        if (this.renderer instanceof AxisRendererY) {
            return 1 - this.renderer.pointToPosition(point);
        }
        else {
            return this.renderer.pointToPosition(point);
        }
    };
    /**
     * @ignore
     */
    ValueAxis.prototype.animateMinMax = function (min, max) {
        return this.animate([{ property: "_minAdjusted", from: this._minAdjusted, to: min }, { property: "_maxAdjusted", from: this._maxAdjusted, to: max }], this.rangeChangeDuration, this.rangeChangeEasing);
    };
    /**
     * Calculates smallest and biggest value for the axis scale.
     * @ignore
     * @todo Description (review)
     */
    ValueAxis.prototype.getMinMax = function () {
        var _this = this;
        this.updateGridCount();
        var min = Number.POSITIVE_INFINITY;
        var max = Number.NEGATIVE_INFINITY;
        // only if min and max are not set from outside, we go through min and max influencers
        if (!$type.isNumber(this._minDefined) || !$type.isNumber(this._maxDefined)) {
            this.series.each(function (series) {
                if (!series.ignoreMinMax) {
                    // check min
                    var seriesMin = series.min(_this);
                    if ($type.isNumber(seriesMin) && (seriesMin < min)) {
                        min = seriesMin;
                    }
                    // check max
                    var seriesMax = series.max(_this);
                    if ($type.isNumber(seriesMax) && (seriesMax > max)) {
                        max = seriesMax;
                    }
                }
            });
            if (this.includeRangesInMinMax) {
                this.axisRanges.each(function (range) {
                    if (!range.ignoreMinMax) {
                        var minValue = $math.min(range.value, range.endValue);
                        var maxValue = $math.max(range.value, range.endValue);
                        if (minValue < min || !$type.isNumber(min)) {
                            min = minValue;
                        }
                        if (maxValue > max || !$type.isNumber(max)) {
                            max = maxValue;
                        }
                    }
                });
            }
        }
        if (this.logarithmic) {
            var treatZeroAs = this.treatZeroAs;
            if ($type.isNumber(treatZeroAs)) {
                if (min <= 0) {
                    min = treatZeroAs;
                }
            }
            if (min <= 0) {
                this.raiseCriticalError(new Error("Logarithmic value axis can not have values <= 0."), true);
            }
        }
        if (min == 0 && max == 0) {
            max = 0.9;
            min = -0.9;
        }
        // if defined from outside
        if ($type.isNumber(this._minDefined)) {
            min = this._minDefined;
        }
        if ($type.isNumber(this._maxDefined)) {
            max = this._maxDefined;
        }
        if (this._adapterO) {
            min = this._adapterO.apply("min", min);
        }
        if (this._adapterO) {
            max = this._adapterO.apply("max", max);
        }
        if (!$type.isNumber(min) || !$type.isNumber(max)) {
            return;
        }
        this._minReal = min;
        this._maxReal = max;
        if (min == Number.POSITIVE_INFINITY) {
            min = undefined;
        }
        if (max == Number.NEGATIVE_INFINITY) {
            max = undefined;
        }
        var dif = this.adjustDifference(min, max); // previously it was max-min, but not worked well
        min = this.fixMin(min);
        max = this.fixMax(max);
        // this happens if starLocation and endLocation are 0.5 and DateAxis has only one date
        if (max - min <= 1 / Math.pow(10, 15)) {
            if (max - min != 0) {
                this._deltaMinMax = (max - min) / 2;
            }
            else {
                // the number by which we need to raise 10 to get difference
                var exponent = Math.log(Math.abs(max)) * Math.LOG10E;
                // here we find a number which is power of 10 and has the same count of numbers as difference has
                var power = Math.pow(10, Math.floor(exponent));
                // reduce this number by 10 times
                power = power / 10;
                this._deltaMinMax = power;
            }
            min -= this._deltaMinMax;
            max += this._deltaMinMax;
        }
        min -= (max - min) * this.extraMin;
        max += (max - min) * this.extraMax;
        var strict = this.strictMinMax;
        if ($type.isNumber(this._maxDefined)) {
            strict = true;
        }
        var minMaxStep = this.adjustMinMax(min, max, dif, this._gridCount, strict);
        min = minMaxStep.min;
        max = minMaxStep.max;
        dif = max - min; //new
        // do it for the second time (importat!)
        minMaxStep = this.adjustMinMax(min, max, max - min, this._gridCount, true);
        min = minMaxStep.min;
        max = minMaxStep.max;
        // return min max if strict
        if (this.strictMinMax) {
            if ($type.isNumber(this._minDefined)) {
                min = this._minDefined;
            }
            else {
                min = this._minReal;
            }
            if ($type.isNumber(this._maxDefined)) {
                max = this._maxDefined;
            }
            else {
                max = this._maxReal;
            }
            if (max - min <= 0.00000001) {
                min -= this._deltaMinMax;
                max += this._deltaMinMax;
            }
            min -= (max - min) * this.extraMin;
            max += (max - min) * this.extraMax;
        }
        if (this._adapterO) {
            min = this._adapterO.apply("min", min);
        }
        if (this._adapterO) {
            max = this._adapterO.apply("max", max);
        }
        this._step = minMaxStep.step;
        if (!$type.isNumber(min) && !$type.isNumber(max)) {
            this.start = 0;
            this.end = 1;
            this.renderer.labels.each(function (label) {
                label.dataItem.text = "";
            });
        }
        // checking isNumber is good when all series are hidden
        if ((this._minAdjusted != min || this._maxAdjusted != max) && $type.isNumber(min) && $type.isNumber(max)) {
            var animation = this._minMaxAnimation;
            if (this._extremesChanged && $type.isNumber(this._minAdjusted) && $type.isNumber(this._maxAdjusted) && this.inited) {
                if ((animation && !animation.isFinished()) && this._finalMax == max && this._finalMin == min) {
                    return;
                }
                else {
                    this._finalMin = min;
                    this._finalMax = max;
                    animation = this.animateMinMax(min, max);
                    if (animation && !animation.isFinished()) {
                        animation.events.on("animationprogress", this.validateDataItems, this);
                        animation.events.on("animationended", function () {
                            //this.validateDataItems();
                            _this.series.each(function (series) {
                                series.validate();
                            });
                            _this.validateDataItems();
                            _this.handleSelectionExtremesChange();
                        });
                        this._minMaxAnimation = animation;
                    }
                    else {
                        this.series.each(function (series) {
                            series.invalidate();
                        });
                    }
                    this.validateDataItems();
                    this.dispatchImmediately("extremeschanged");
                    this.handleSelectionExtremesChange();
                }
            }
            else {
                if ((animation && !animation.isFinished()) && this._finalMax == max && this._finalMin == min) {
                    return;
                }
                else {
                    this._minAdjusted = min;
                    this._maxAdjusted = max;
                    this._finalMin = min;
                    this._finalMax = max;
                    this.invalidateDataItems();
                    this.dispatchImmediately("extremeschanged");
                    this._saveMinMax(min, max);
                }
            }
        }
        this._extremesChanged = false;
        this._difference = this.adjustDifference(min, max);
    };
    /**
     * Adjusts the minimum value.
     *
     * This is a placeholder method for extending classes to override.
     *
     * For numeric values this does nothing, however for more complex types, like
     * dates, it may be necessary to adjust.
     *
     * @param value  Value
     * @return Adjusted value
     */
    ValueAxis.prototype.fixMin = function (value) {
        return value;
    };
    /**
     * Adjusts the maximum value.
     *
     * This is a placeholder method for extending classes to override.
     *
     * For numeric values this does nothing, however for more complex types, like
     * dates, it may be necessary to adjust.
     *
     * @param value  Value
     * @return Adjusted value
     */
    ValueAxis.prototype.fixMax = function (value) {
        return value;
    };
    /**
     * Adjusts actual min and max scale values so that the axis starts and ends
     * at "nice" values, unless `strictMinMax` is set.
     *
     * The `difference` can be something else than `max - min`, because of the
     * axis breaks.
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param min        [description]
     * @param max        [description]
     * @param difference [description]
     * @param gridCount  [description]
     * @param strictMode [description]
     * @return [description]
     */
    ValueAxis.prototype.adjustMinMax = function (min, max, difference, gridCount, strictMode) {
        // will fail if 0
        if (gridCount <= 1) {
            gridCount = 1;
        }
        gridCount = Math.round(gridCount);
        var initialMin = min;
        var initialMax = max;
        // in case min and max is the same, use max
        if (difference === 0) {
            difference = Math.abs(max);
        }
        // the number by which we need to raise 10 to get difference
        var exponent = Math.log(Math.abs(difference)) * Math.LOG10E;
        // here we find a number which is power of 10 and has the same count of numbers as difference has
        var power = Math.pow(10, Math.floor(exponent));
        // reduce this number by 10 times
        power = power / 10;
        var extra = power;
        if (strictMode) {
            extra = 0;
        }
        if (!this.logarithmic) {
            // round down min
            if (strictMode) {
                min = Math.floor(min / power) * power;
                // round up max
                max = Math.ceil(max / power) * power;
            }
            else {
                min = Math.ceil(min / power) * power - extra;
                // round up max
                max = Math.floor(max / power) * power + extra;
            }
            // don't let min go below 0 if real min is >= 0
            if (min < 0 && initialMin >= 0) {
                min = 0;
            }
            // don't let max go above 0 if real max is <= 0
            if (max > 0 && initialMax <= 0) {
                max = 0;
            }
        }
        else {
            if (min <= 0) {
                //throw Error("Logarithmic value axis can not have values <= 0.");
                min = this.baseValue;
            }
            // @todo: think of a better way or to restrict zooming when no series are selected
            if (min == Infinity) {
                min = 1;
            }
            if (max == -Infinity) {
                max = 10;
            }
            if (this.strictMinMax) {
                if (this._minDefined > 0) {
                    min = this._minDefined;
                }
                else {
                    min = min;
                }
                if (this._maxDefined > 0) {
                    max = max;
                }
            }
            else {
                min = Math.pow(10, Math.floor(Math.log(Math.abs(min)) * Math.LOG10E));
                max = Math.pow(10, Math.ceil(Math.log(Math.abs(max)) * Math.LOG10E));
            }
        }
        // repeat diff, exponent and power again with rounded values
        //difference = this.adjustDifference(min, max);
        /*

                if(min > initialMin){
                    min = initialMin;
                }

                if(max < initialMax){
                    max = initialMax;
                }
        */
        exponent = Math.log(Math.abs(difference)) * Math.LOG10E;
        power = Math.pow(10, Math.floor(exponent));
        power = power / 10;
        // approximate difference between two grid lines
        var step = Math.ceil((difference / gridCount) / power) * power;
        var stepPower = Math.pow(10, Math.floor(Math.log(Math.abs(step)) * Math.LOG10E));
        // TODO: in v3 I had fixStepE here, ommiting it for a while, need to think about other solution
        // the step should divide by  2, 5, and 10.
        var stepDivisor = Math.ceil(step / stepPower); // number 0 - 10
        if (stepDivisor > 5) {
            stepDivisor = 10;
        }
        else if (stepDivisor <= 5 && stepDivisor > 2) {
            stepDivisor = 5;
        }
        // now get real step
        step = Math.ceil(step / (stepPower * stepDivisor)) * stepPower * stepDivisor;
        if (this.maxPrecision < Number.MAX_VALUE && step != $math.ceil(step, this.maxPrecision)) {
            step = $math.ceil(step, this.maxPrecision);
        }
        var decCount = 0;
        // in case numbers are smaller than 1
        if (stepPower < 1) {
            // exponent is less then 1 too. Count decimals of exponent
            decCount = Math.round(Math.abs(Math.log(Math.abs(stepPower)) * Math.LOG10E)) + 1;
            // round step
            step = $math.round(step, decCount);
        }
        if (!this.logarithmic) {
            // final min and max
            var minCount = Math.floor(min / step);
            min = $math.round(step * minCount, decCount);
            var maxCount = void 0;
            if (!strictMode) {
                maxCount = Math.ceil(max / step);
            }
            else {
                maxCount = Math.floor(max / step);
            }
            if (maxCount == minCount) {
                maxCount++;
            }
            max = $math.round(step * maxCount, decCount);
            if (max < initialMax) {
                max = max + step;
            }
            if (min > initialMin) {
                min = min - step;
            }
        }
        return { min: min, max: max, step: step };
    };
    Object.defineProperty(ValueAxis.prototype, "min", {
        /**
         * @return Min value
         */
        get: function () {
            var min = this._minAdjusted;
            if (!$type.isNumber(min)) {
                min = this._minDefined;
            }
            return min;
        },
        /**
         * A minimum value for the axis scale.
         *
         * This value might be auto-adjusted by the Axis in order to accomodate the
         * grid nicely, i.e. plot area is divided by grid in nice equal cells.
         *
         * The above might be overridden by `strictMinMax` which will force exact
         * user-defined min and max values to be used for scale.
         *
         * @param value  Min value
         */
        set: function (value) {
            if (this._minDefined != value) {
                this._minDefined = value;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "minDefined", {
        /**
         * Min value as defined by user's code, not auto-calculated.
         *
         * @readonly
         * @return Min value
         */
        get: function () {
            return this._minDefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "maxDefined", {
        /**
         * Max value as defined by user's code, not auto-calculated.
         *
         * @readonly
         * @return Man value
         */
        get: function () {
            return this._maxDefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "extraMin", {
        /**
         * @return {number}
         */
        get: function () {
            return this.getPropertyValue("extraMin");
        },
        /**
         * Allows relatively adjusting minimum value of the axis' scale.
         *
         * The value is relative to the actual range of values currently displayed
         * on the axis.
         *
         * E.g.: 0.5 will mean half of the current range. If we have axis displaying
         * from 100 to 200, we will now have axis displaying from 50 to 200 because
         * we asked to expand minimum value by 50% (0.5).
         *
         * NOTE: this setting is not compatible with `strictMinMax`.
         *
         * @param {number}
         */
        set: function (value) {
            if (this.setPropertyValue("extraMin", value)) {
                this.invalidateDataItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "extraMax", {
        /**
         * @return Min multiplier
         */
        get: function () {
            return this.getPropertyValue("extraMax");
        },
        /**
         * Allows relatively adjusting maximum value of the axis' scale.
         *
         * The value is relative to the actual range of values currently displayed
         * on the axis.
         *
         * E.g.: 0.5 will mean half of the current range. If we have axis displaying
         * from 100 to 200, we will now have axis displaying from 100 to 250 because
         * we asked to expand maximum value by 50% (0.5).
         *
         * NOTE: this setting is not compatible with `strictMinMax`.
         *
         * @param {number}
         */
        set: function (value) {
            if (this.setPropertyValue("extraMax", value)) {
                this.invalidateDataItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "step", {
        /**
         * Current calculated delta in values between two adjacent grid lines (step).
         *
         * This is a read-only value and cannot be used to set actual step.
         *
         * @readonly
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/#Setting_the_density_of_the_the_grid_labels} For more information about modifying density of labels
         * @return [description]
         */
        get: function () {
            return this._step;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "max", {
        /**
         * @return Max value
         */
        get: function () {
            var max = this._maxAdjusted;
            if (!$type.isNumber(max)) {
                max = this._maxDefined;
            }
            return max;
        },
        /**
         * A maximum value for the axis scale.
         *
         * This value might be auto-adjusted by the Axis in order to accomodate the
         * grid nicely, i.e. plot area is divided by grid in nice equal cells.
         *
         * The above might be overridden by `strictMinMax` which will force exact
         * user-defined min and max values to be used for scale.
         *
         * @param value  Max value
         */
        set: function (value) {
            if (this._maxDefined != value) {
                this._maxDefined = value;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "adjustLabelPrecision", {
        /**
         * @return Adjust precision
         */
        get: function () {
            return this.getPropertyValue("adjustLabelPrecision");
        },
        /**
         * By default the axis will adjust precision of all numbers to match number
         * of decimals in all its labels, e.g.: `1.0`, `1.5`, `2.0`.
         *
         * To disable set `adjustLabelPrecision` to `false`, to use whatever other
         * precision or number format settings are set.
         *
         * IMPORTANT: This setting will be ignored if your number format uses
         * modifiers, e.g. `"#a"`.
         *
         * @default true
         * @since 4.9.14
         * @param  value  Adjust precision
         */
        set: function (value) {
            if (this.setPropertyValue("adjustLabelPrecision", value)) {
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Used for the Series to register itself as the user of this Axis.
     *
     * This will also decorate both the Series and Axis with event handlers, used
     * to redraw on Axis position/zoom change.
     *
     * A disposer for those events is returned, so that they can be disposed
     * together with Series.
     *
     * @ignore Exclude from docs
     * @param series  Series
     * @return Disposer for events
     */
    ValueAxis.prototype.registerSeries = function (series) {
        return new MultiDisposer([
            _super.prototype.registerSeries.call(this, series),
            series.events.on("extremeschanged", this.handleExtremesChange, this, false),
            series.events.on("selectionextremeschanged", this.handleSelectionExtremesChange, this, false),
            this.events.on("extremeschanged", series.invalidate, series, false)
        ]);
    };
    /**
     * Perform tasks after Axis zoom.
     */
    ValueAxis.prototype.handleSelectionExtremesChange = function () {
        var _this = this;
        var selectionMin;
        var selectionMax;
        var allHidden = true;
        $iter.each(this.series.iterator(), function (series) {
            if (!series.ignoreMinMax && !series.isHidden && !series.outOfRange) {
                if (series.visible && !series.isHiding) {
                    allHidden = false;
                }
                var seriesSelectionMin = series.selectionMin(_this);
                var seriesSelectionMax = series.selectionMax(_this);
                if ($type.isNumber(seriesSelectionMin)) {
                    if (!$type.isNumber(selectionMin) || (seriesSelectionMin < selectionMin)) {
                        selectionMin = seriesSelectionMin;
                    }
                }
                // check max
                if ($type.isNumber(seriesSelectionMax)) {
                    if (!$type.isNumber(selectionMax) || (seriesSelectionMax > selectionMax)) {
                        selectionMax = seriesSelectionMax;
                    }
                }
            }
        });
        if (this.includeRangesInMinMax) {
            this.axisRanges.each(function (range) {
                if (!range.ignoreMinMax) {
                    var minValue = $math.min(range.value, range.endValue);
                    var maxValue = $math.max(range.value, range.endValue);
                    if (minValue < selectionMin) {
                        selectionMin = minValue;
                    }
                    if (maxValue > selectionMax) {
                        selectionMax = maxValue;
                    }
                }
            });
        }
        // this is not good, as if date axis is initially zoomed, selection of y axis is reset to 0, 1 at the end of this method
        //$iter.each(this.series.iterator(), (series) => {
        //	if (!series.appeared) {
        //		allHidden = true;
        //	}
        //})
        if ($type.isNumber(this._minDefined)) {
            if (this.strictMinMax) {
                selectionMin = this._minDefined;
            }
            else {
                selectionMin = this.min;
            }
        }
        else if (this.strictMinMax) {
            selectionMin = this._minReal;
        }
        if ($type.isNumber(this._maxDefined)) {
            if (this.strictMinMax) {
                selectionMax = this._maxDefined;
            }
            else {
                selectionMax = this.max;
            }
        }
        else if (this.strictMinMax) {
            selectionMax = this._maxReal;
        }
        if (selectionMin == selectionMax) {
            selectionMin -= this._deltaMinMax;
            selectionMax += this._deltaMinMax;
            var minMaxStep2 = this.adjustMinMax(selectionMin, selectionMax, 0, this._gridCount, this.strictMinMax);
            selectionMin = minMaxStep2.min;
            selectionMax = minMaxStep2.max;
        }
        var dif = this.adjustDifference(selectionMin, selectionMax);
        var minMaxStep = this.adjustMinMax(selectionMin, selectionMax, dif, this._gridCount);
        selectionMin = minMaxStep.min;
        selectionMax = minMaxStep.max;
        selectionMin -= (selectionMax - selectionMin) * this.extraMin;
        selectionMax += (selectionMax - selectionMin) * this.extraMax;
        selectionMin = $math.fitToRange(selectionMin, this.min, this.max);
        selectionMax = $math.fitToRange(selectionMax, this.min, this.max);
        // do it for the second time !important
        dif = this.adjustDifference(selectionMin, selectionMax);
        minMaxStep = this.adjustMinMax(selectionMin, selectionMax, dif, this._gridCount, true);
        selectionMin = minMaxStep.min;
        selectionMax = minMaxStep.max;
        if (this.strictMinMax) {
            selectionMin = $math.max(selectionMin, this._minDefined);
            selectionMax = $math.min(selectionMax, this._maxDefined);
        }
        var step = minMaxStep.step;
        if (this.syncWithAxis) {
            minMaxStep = this.syncAxes(selectionMin, selectionMax, step);
            selectionMin = minMaxStep.min;
            selectionMax = minMaxStep.max;
            this.invalidate();
        }
        step = minMaxStep.step;
        // needed because of grouping
        this._difference = this.adjustDifference(this.min, this.max);
        var start = this.valueToPosition(selectionMin);
        var end = this.valueToPosition(selectionMax);
        // in case all series are hidden or hiding, full zoomout
        if (allHidden && !this.syncWithAxis) {
            start = 0;
            end = 1;
        }
        var declination = 0;
        if (this.syncWithAxis) {
            declination = 5;
            this.setCache(selectionMin + "-" + selectionMax, step);
        }
        else {
            if (this._step != step || this._minZoomed != selectionMin || this._maxZoomed != selectionMax) {
                this._dsc = true;
            }
            this._step = step;
            this._minZoomed = selectionMin;
            this._maxZoomed = selectionMax;
        }
        if (!this.keepSelection) {
            this.zoom({ start: start, end: end }, false, false, declination);
        }
    };
    Object.defineProperty(ValueAxis.prototype, "strictMinMax", {
        /**
         * @return Use exact values?
         */
        get: function () {
            return this.getPropertyValue("strictMinMax");
        },
        /**
         * Indicates whether to blindly use exact `min` and `max` values set by user
         * when generating Axis scale.
         *
         * If not set, the Axis might slightly adjust those values to accomodate a
         * better looking grid.
         *
         * NOTE: if `min` and `max` are not set, setting `strictMinMax` to `true`
         * will result in fixing the scale of the axis to actual lowest and highest
         * values in the series within currently selected scope.
         *
         * @default false
         * @param value Use exact values?
         */
        set: function (value) {
            if (this.setPropertyValue("strictMinMax", value)) {
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "logarithmic", {
        /**
         * @return Logarithmic scale?
         */
        get: function () {
            return this.getPropertyValue("logarithmic");
        },
        /**
         * Indicates if this axis should use a logarithmic scale.
         *
         * Please note that logarithmic axis can **only** accommodate values bigger
         * than zero.
         *
         * Having zero or negative values will result in error and failure of the
         * whole chart.
         *
         * @param value Logarithmic scale?
         */
        set: function (value) {
            if (this.setPropertyValue("logarithmic", value)) {
                this.invalidate();
                this.series.each(function (series) {
                    series.invalidateDataItems();
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "keepSelection", {
        /**
         * @return Preseve zoom after data update?
         */
        get: function () {
            return this.getPropertyValue("keepSelection");
        },
        /**
         * Indicates if a current selection (zoom) should be kept across data updates.
         *
         * If your axis is zoomed while chart's data is updated, the axis will try
         * to retain the same start and end values.
         *
         * You can also use this to initially pre-zoom axis:
         *
         * ```TypeScript
         * axis.keepSelection = true;
         * axis.start = 0.5;
         * axis.end = 0.7;
         * ```
         * ```JavaScript
         * axis.keepSelection = true;
         * axis.start = 0.5;
         * axis.end = 0.7;
         * ```
         * ```JSON
         * {
         *   "xAxes": [{
         *     // ...
         *     "keepSelection": true,
         *     "start": 0.5,
         *     "end": 0.7
         *   }]
         * }
         * ```
         *
         * The above will start the chart zoomed from the middle of the actual scope
         * to 70%.
         *
         * @since 4.1.1
         * @default false
         * @param  value  Preseve zoom after data update?
         */
        set: function (value) {
            this.setPropertyValue("keepSelection", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "includeRangesInMinMax", {
        /**
         * @return Include ranges?
         */
        get: function () {
            return this.getPropertyValue("includeRangesInMinMax");
        },
        /**
         * If set to `true`, values of axis ranges will be included when calculating
         * range of values / scale of the [[ValueAxis]].
         *
         * @default false
         * @since 4.4.9
         * @param  value  Include ranges?
         */
        set: function (value) {
            this.setPropertyValue("includeRangesInMinMax", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "maxPrecision", {
        /**
         * @return max precision
         */
        get: function () {
            return this.getPropertyValue("maxPrecision");
        },
        /**
         * Maximum number of decimals to allow when placing grid lines and labels
         * on axis.
         *
         * Set it to `0` (zero) to force integer-only axis labels.
         *
         * @param {number}
         */
        set: function (value) {
            if (this.setPropertyValue("maxPrecision", value)) {
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "extraTooltipPrecision", {
        /**
         * @return Extra decimals
         */
        get: function () {
            return this.getPropertyValue("extraTooltipPrecision");
        },
        /**
         * This setting allows using bigger precision for numbers displayed in axis
         * tooltip.
         *
         * Please note that this setting indicates additional decimal places to
         * automatically-calculated axis number precision.
         *
         * So if your axis displays numbers like 0.1, 0.2, etc. (one decimal place),
         * and you set `extraTooltipPrecision = 1`, tooltips will display numbers
         * like 0.12, 0.25, etc. (two decimal places).
         *
         * @default 0
         * @since 4.8.3
         * @param  value  Extra decimals
         */
        set: function (value) {
            if (this.setPropertyValue("extraTooltipPrecision", value)) {
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Invalidates axis data items when series extremes change
     */
    ValueAxis.prototype.handleExtremesChange = function () {
        var _this = this;
        this._extremesChanged = true;
        this.getMinMax();
        if (this.ghostLabel) {
            var mw_1 = 0;
            this.dataItems.each(function (dataItem) {
                if (dataItem.label && dataItem.label.pixelWidth > mw_1) {
                    _this.ghostLabel.text = dataItem.label.currentText;
                }
            });
        }
    };
    /**
     * Returns relative position on axis for series' data item's value.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Data field to get value from
     * @param location  Location (0-1)
     * @param stackKey  ?
     * @return X coordinate (px)
     */
    ValueAxis.prototype.getX = function (dataItem, key, location, stackKey, range) {
        return this.renderer.positionToPoint(this.getPositionX(dataItem, key, location, stackKey, range)).x;
    };
    /**
     * Returns the X coordinate for series' data item's value.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Data field to get value from
     * @param  location  Location (0-1)
     * @param  stackKey  ?
     * @return           Relative position
     */
    ValueAxis.prototype.getPositionX = function (dataItem, key, location, stackKey, range) {
        var value = dataItem.getWorkingValue(key);
        if (!$type.hasValue(stackKey)) {
            stackKey = "valueX";
        }
        var stack = dataItem.getValue(stackKey, "stack");
        if (!$type.isNumber(value)) {
            value = this.baseValue;
            if (this.logarithmic) {
                if (stack > 0) {
                    value = 0;
                }
            }
        }
        var position = this.valueToPosition(value + stack);
        if (range) {
            position = $math.fitToRange(position, range.start, range.end);
        }
        return position;
    };
    /**
     * Returns the Y coordinate for series' data item's value.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Data field to get value from
     * @param location  Location (0-1)
     * @param stackKey  Stack ID
     * @return Y coordinate (px)
     */
    ValueAxis.prototype.getY = function (dataItem, key, location, stackKey, range) {
        return this.renderer.positionToPoint(this.getPositionY(dataItem, key, location, stackKey, range)).y;
    };
    /**
     * Returns relative position on axis for series' data item's value.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Data field to get value from
     * @param  location  Location (0-1)
     * @param  stackKey  Stack ID
     * @return           Relative position
     */
    ValueAxis.prototype.getPositionY = function (dataItem, key, location, stackKey, range) {
        var value = dataItem.getWorkingValue(key);
        if (!$type.hasValue(stackKey)) {
            stackKey = "valueY";
        }
        var stack = dataItem.getValue(stackKey, "stack");
        if (!$type.isNumber(value)) {
            value = this.baseValue;
            if (this.logarithmic) {
                if (stack > 0) {
                    value = 0;
                }
            }
        }
        var position = this.valueToPosition(value + stack);
        if (range) {
            position = $math.fitToRange(position, range.start, range.end);
        }
        return position;
    };
    /**
     * Returns an angle for series data item.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Data field to get value from
     * @param location  Location (0-1)
     * @param stackKey  Stack ID
     * @param range Range to fit in
     * @return Angle
     */
    ValueAxis.prototype.getAngle = function (dataItem, key, location, stackKey, range) {
        var value = dataItem.getWorkingValue(key);
        var stack = dataItem.getValue(stackKey, "stack");
        if (!$type.isNumber(value)) {
            value = this.baseValue;
        }
        var position = this.valueToPosition(value + stack);
        if (range) {
            position = $math.fitToRange(position, range.start, range.end);
        }
        return this.positionToAngle(position);
    };
    /**
     * [getAnyRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param start     [description]
     * @param end       [description]
     * @param location  [description]
     * @return [description]
     */
    ValueAxis.prototype.getAnyRangePath = function (start, end, location) {
        var startPosition = this.valueToPosition(start);
        var endPosition = this.valueToPosition(end);
        return this.getPositionRangePath(startPosition, endPosition); // Base class (Axis) gets range shape from AxisRenderer
    };
    /**
     * Returns text to show in a axis tooltip, based on specific position within
     * axis.
     *
     * The label will be formatted as per [[NumberFormatter]] set for the whole
     * chart, or explicitly for this Axis.
     *
     * @ignore Exclude from docs
     * @param position  Position (px)
     * @return Label (numeric value)
     */
    ValueAxis.prototype.getTooltipText = function (position) {
        var value = $math.round(this.positionToValue(position), this._stepDecimalPlaces + this.extraTooltipPrecision);
        var valueStr = this.tooltip.numberFormatter.format(value);
        if (!this._adapterO) {
            return valueStr;
        }
        else {
            return this._adapterO.apply("getTooltipText", valueStr);
        }
    };
    /**
     * Zooms axis to specific values.
     *
     * @param startValue      Start value
     * @param endValue        End value
     * @param skipRangeEvent  Do not invoke events
     * @param instantly       Do not play zoom animations
     */
    ValueAxis.prototype.zoomToValues = function (startValue, endValue, skipRangeEvent, instantly) {
        var start = (startValue - this.min) / (this.max - this.min);
        var end = (endValue - this.min) / (this.max - this.min);
        this.zoom({ start: start, end: end }, skipRangeEvent, instantly);
    };
    Object.defineProperty(ValueAxis.prototype, "minZoomed", {
        /**
         * A smallest value in axis scale within current zoom.
         *
         * @return Min zoom value
         */
        get: function () {
            if (!this.syncWithAxis) {
                return $math.max(this.min, this._minZoomed);
            }
            else {
                return this._minZoomed;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "maxZoomed", {
        /**
         * A biggest value in axis scale within current zoom.
         * @return [description]
         */
        get: function () {
            if (!this.syncWithAxis) {
                return $math.min(this.max, this._maxZoomed);
            }
            else {
                return this._maxZoomed;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates positioning of Axis breaks after something changes.
     *
     * @ignore Exclude from docs
     */
    ValueAxis.prototype.fixAxisBreaks = function () {
        var _this = this;
        _super.prototype.fixAxisBreaks.call(this);
        var axisBreaks = this._axisBreaks;
        if (axisBreaks && axisBreaks.length > 0) {
            // process breaks
            axisBreaks.each(function (axisBreak) {
                var startValue = axisBreak.adjustedStartValue;
                var endValue = axisBreak.adjustedEndValue;
                // break difference
                var axisBreakDif = endValue - startValue;
                var axisBreakGridCount = Math.ceil(axisBreakDif * axisBreak.breakSize) * _this._gridCount / (_this.max - _this.min);
                // calculate min, max and step for axis break
                var breakMinMaxStep = _this.adjustMinMax(startValue, endValue, axisBreakDif, axisBreakGridCount, true);
                axisBreak.adjustedStep = breakMinMaxStep.step;
                axisBreak.adjustedMin = breakMinMaxStep.min;
                axisBreak.adjustedMax = breakMinMaxStep.max;
            });
        }
        this._difference = this.adjustDifference(this.min, this.max);
    };
    /**
     * Returns value based on position.
     *
     * Please note that `position` represents position within axis which may be
     * zoomed and not correspond to Cursor's `position`.
     *
     * To convert Cursor's `position` to Axis' `position` use `toAxisPosition()` method.
     *
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/tracking-cursors-position-via-api/#Tracking_Cursor_s_position} For more information about cursor tracking.
     * @param position  Relative position on axis (0-1)
     * @return Position label
     */
    ValueAxis.prototype.getPositionLabel = function (position) {
        var value = this.positionToValue(position);
        return this.numberFormatter.format(value);
    };
    /**
     * Shows Axis tooltip at specific value
     *
     * @param value Value
     */
    ValueAxis.prototype.showTooltipAt = function (value) {
        this.showTooltipAtPosition(this.valueToPosition(value));
    };
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    ValueAxis.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.min = source.min;
        this.max = source.max;
        this.calculateTotals = source.calculateTotals;
        this._baseValue = source.baseValue;
    };
    Object.defineProperty(ValueAxis.prototype, "syncWithAxis", {
        /**
         * @return Target axis
         */
        get: function () {
            return this.getPropertyValue("syncWithAxis");
        },
        /**
         * Enables syncing of grid with another axis.
         *
         * To enable, set to a reference of the other `ValueAxis`. This axis will try
         * to maintain its scale in such way that its grid matches target axis grid.
         *
         * IMPORTANT #1: At this stage it's an experimental feature. Use it at your
         * own risk, as it may not work in 100% of the scenarios.
         *
         * IMPORTANT #2: `syncWithAxis` is not compatible with `strictMinMax` and
         * `sequencedInterpolation` settings.
         *
         * IMPORTANT #3: `syncWithAxis` is not compatible with scrollbars. Make sure
         * you do not add a scrollbar in the same direction as synced axes. For
         * example, if you have vertical synced axes, do not add `scrollbarY` on
         * your chart. It will create anomalies when used.
         *
         * IMPORTANT #4: `syncWithAxis` is not compatible with `XYCursor` if it has
         * its `behavior` set to either `zoomY` or `zoomXY`.
         *
         * @since 4.8.1
         * @param  axis  Target axis
         */
        set: function (axis) {
            var _this = this;
            if (this.setPropertyValue("syncWithAxis", axis, true)) {
                if (axis) {
                    this._disposers.push(axis.events.on("extremeschanged", this.handleSelectionExtremesChange, this, false));
                    this._disposers.push(axis.events.on("selectionextremeschanged", this.handleSelectionExtremesChange, this, false));
                    this._disposers.push(axis.events.on("startendchanged", this.handleSelectionExtremesChange, this, false));
                    this.events.on("shown", this.handleSelectionExtremesChange, this, false);
                    this.events.on("maxsizechanged", function () {
                        _this.clearCache();
                        _this._disposers.push(registry.events.once("exitframe", function () {
                            _this.handleSelectionExtremesChange();
                        }));
                    }, this, false);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxis.prototype, "treatZeroAs", {
        /**
         * @return Zero replacement value
         */
        get: function () {
            return this.getPropertyValue("treatZeroAs");
        },
        /**
         * If set, zero values will be treated as this value.
         *
         * It is useful if you need to use data with zero-values on a logarithmic
         * axis scale.
         *
         * @since 4.9.34
         * @param  value  Zero replacement value
         */
        set: function (value) {
            this.setPropertyValue("treatZeroAs", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Syncs with a target axis.
     *
     * @param  min  Min
     * @param  max  Max
     * @param  step Step
     */
    ValueAxis.prototype.syncAxes = function (min, max, step) {
        var axis = this.syncWithAxis;
        if (axis) {
            if (!$type.isNumber(min)) {
                min = this.min;
            }
            if (!$type.isNumber(max)) {
                max = this.max;
            }
            if (!$type.isNumber(step)) {
                step = this._step;
            }
            var count = Math.round((axis.maxZoomed - axis.minZoomed) / axis.step);
            var currentCount = Math.round((max - min) / step);
            if ($type.isNumber(count) && $type.isNumber(currentCount)) {
                var synced = false;
                var c = 0;
                var diff = (max - min) * 0.01;
                var omin = min;
                var omax = max;
                var ostep = step;
                while (synced != true) {
                    synced = this.checkSync(omin, omax, ostep, count);
                    c++;
                    if (c > 1000) {
                        synced = true;
                    }
                    if (!synced) {
                        //omin = min - diff * c;
                        if (c / 3 == Math.round(c / 3)) {
                            omin = min - diff * c;
                            if (min >= 0 && omin < 0) {
                                omin = 0;
                            }
                        }
                        else {
                            omax = max + diff * c;
                            if (omax <= 0 && omax > 0) {
                                omax = 0;
                            }
                        }
                        var minMaxStep = this.adjustMinMax(omin, omax, omax - omin, this._gridCount, true);
                        omin = minMaxStep.min;
                        omax = minMaxStep.max;
                        ostep = minMaxStep.step;
                    }
                    else {
                        min = omin;
                        max = omax;
                        step = ostep;
                    }
                }
            }
        }
        return { min: min, max: max, step: step };
    };
    /**
     * Returns `true` if axis needs to be resunced with some other axis.
     */
    ValueAxis.prototype.checkSync = function (min, max, step, count) {
        var currentCount = (max - min) / step;
        for (var i = 1; i < count; i++) {
            if ($math.round(currentCount / i, 1) == count || currentCount * i == count) {
                return true;
            }
        }
        return false;
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    ValueAxis.prototype.processConfig = function (config) {
        if (config) {
            // Set up axes
            if ($type.hasValue(config.syncWithAxis) && $type.isString(config.syncWithAxis)) {
                if (this.map.hasKey(config.syncWithAxis)) {
                    config.syncWithAxis = this.map.getKey(config.syncWithAxis);
                }
                else {
                    this.processingErrors.push("[ValueAxis] No axis with id \"" + config.syncWithAxis + "\" found for `syncWithAxis`");
                    delete config.xAxis;
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    ValueAxis.prototype._saveMinMax = function (_min, _max) {
    };
    return ValueAxis;
}(Axis));
export { ValueAxis };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ValueAxis"] = ValueAxis;
registry.registeredClasses["ValueAxisDataItem"] = ValueAxisDataItem;
//# sourceMappingURL=ValueAxis.js.map