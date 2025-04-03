/**
 * Range selector for [[DateAxis]].
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { RangeSelector } from "./RangeSelector";
import { registry } from "../../core/Registry";
import { DateFormatter } from "../../core/formatters/DateFormatter";
import * as $time from "../../core/utils/Time";
import * as $type from "../../core/utils/Type";
import * as $array from "../../core/utils/Array";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a control used to select date range and preset periods for
 * a [[DateAxis]].
 *
 * ```TypeScript
 * let selector = new am4plugins_rangeSelector.DateAxisRangeSelector()
 * selector.container = document.getElementById("selectordiv");
 * selector.axis = chart.xAxes.getIndex(0);
 * ```
 * ```JavaScript
 * var selector = new am4plugins_rangeSelector.DateAxisRangeSelector()
 * selector.container = document.getElementById("selectordiv");
 * selector.axis = chart.xAxes.getIndex(0);
 * ```
 *
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-range-selector/} for more information on how to use this plugin
 * @important
 * @todo JSON example
 */
var DateAxisRangeSelector = /** @class */ (function (_super) {
    __extends(DateAxisRangeSelector, _super);
    /**
     * Constructor
     */
    function DateAxisRangeSelector() {
        var _this = _super.call(this) || this;
        /**
         * Holds references to various HTML elements control consists of.
         */
        _this._elements = {
            periodButtons: []
        };
        /**
         * Date format to use for input fields.
         */
        _this._inputDateFormat = "yyyy-MM-dd";
        /**
         * Number of milliseconds to wait after last keystroke in date input field
         * before zooming the axis.
         *
         * @default 500
         */
        _this.zoomDelay = 500;
        _this.className = "DateAxisRangeSelector";
        _this._disposers.push(_this._language);
        _this.invalidate();
        _this.applyTheme();
        return _this;
    }
    /**
     * (Re)draws the control.
     *
     * @ignore Exclude from docs
     */
    DateAxisRangeSelector.prototype.validate = function () {
        this.draw();
        _super.prototype.validate.call(this);
    };
    /**
     * Adds events to the axis.
     */
    DateAxisRangeSelector.prototype.prepAxis = function () {
        var _this = this;
        _super.prototype.prepAxis.call(this);
        this._disposers.push(this.axis.events.on("selectionextremeschanged", function (ev) {
            _this.updateRangeInputs();
        }));
        this._disposers.push(this.axis.events.on("extremeschanged", function (ev) {
            _this.updateRangeInputs();
        }));
    };
    /**
     * Draws the control.
     *
     * @ignore
     */
    DateAxisRangeSelector.prototype.draw = function () {
        var _this = this;
        _super.prototype.draw.call(this);
        var tabindex = this.tabindex;
        // Range wrapper
        if (!this._elements.rangeWrapper) {
            this._elements.rangeWrapper = document.createElement("div");
            this._elements.rangeWrapper.className = this.classPrefix + "-range-wrapper";
            this._elements.wrapper.appendChild(this._elements.rangeWrapper);
        }
        // From title
        if (!this._elements.fromTitle) {
            this._elements.fromTitle = document.createElement("span");
            this._elements.fromTitle.className = this.classPrefix + "-title " + this.classPrefix + "-from-title";
            this._elements.fromTitle.innerHTML = this.language.translateAny("From %1", undefined, "");
            this._elements.rangeWrapper.appendChild(this._elements.fromTitle);
        }
        // From input
        if (!this._elements.fromInput) {
            this._elements.fromInput = document.createElement("input");
            this._elements.fromInput.type = "text";
            this._elements.fromInput.className = this.classPrefix + "-from-input";
            if (tabindex) {
                this._elements.fromInput.setAttribute("tabindex", tabindex.toString());
            }
            this._elements.rangeWrapper.appendChild(this._elements.fromInput);
            this._elements.fromInput.addEventListener("keyup", function () {
                _this.updateZoom();
            });
        }
        // To title
        if (!this._elements.toTitle) {
            this._elements.toTitle = document.createElement("span");
            this._elements.toTitle.className = this.classPrefix + "-title " + this.classPrefix + "-to-title";
            this._elements.toTitle.innerHTML = this.language.translateAny("To %1", undefined, "");
            this._elements.rangeWrapper.appendChild(this._elements.toTitle);
        }
        // To input
        if (!this._elements.toInput) {
            this._elements.toInput = document.createElement("input");
            this._elements.toInput.type = "text";
            this._elements.toInput.className = this.classPrefix + "-to-input";
            if (tabindex) {
                this._elements.toInput.setAttribute("tabindex", tabindex.toString());
            }
            this._elements.rangeWrapper.appendChild(this._elements.toInput);
            this._elements.toInput.addEventListener("keyup", function () {
                _this.updateZoom();
            });
        }
        // Period buttons
        if (this.periods.length) {
            // period wrapper
            if (!this._elements.periodWrapper) {
                this._elements.periodWrapper = document.createElement("div");
                this._elements.periodWrapper.className = this.classPrefix + "-period-wrapper";
                this._elements.wrapper.appendChild(this._elements.periodWrapper);
                // Period title
                if (!this._elements.periodTitle) {
                    this._elements.periodTitle = document.createElement("span");
                    this._elements.periodTitle.className = this.classPrefix + "-title " + this.classPrefix + "-period-title";
                    this._elements.periodTitle.innerHTML = this.language.translateAny("Zoom");
                    this._elements.periodWrapper.appendChild(this._elements.periodTitle);
                }
                // Period buttons
                $array.each(this.periods, function (period) {
                    var button = document.createElement("button");
                    button.className = _this.classPrefix + "-period-button";
                    button.innerHTML = period.name;
                    if (tabindex) {
                        button.setAttribute("tabindex", tabindex.toString());
                    }
                    _this._elements.periodButtons.push(button);
                    _this._elements.periodWrapper.appendChild(button);
                    button.addEventListener("click", function () {
                        _this.setPeriodInterval(period.interval);
                    });
                });
            }
        }
        this.dispatchImmediately("drawn", {
            type: "drawn"
        });
        this.updateRangeInputs();
    };
    /**
     * Updates input values based on the current zoom selection of the axis.
     *
     * @ignore
     */
    DateAxisRangeSelector.prototype.updateRangeInputs = function () {
        if (this._elements.fromInput && this._elements.toInput && this.axis) {
            var axis = this.axis;
            var formatter = this.dateFormatter;
            var minZoomed = axis.minZoomed + $time.getDuration(axis.mainBaseInterval.timeUnit, axis.mainBaseInterval.count) * 0.5;
            this._elements.fromInput.value = formatter.format(minZoomed, this.inputDateFormat);
            this._elements.toInput.value = formatter.format(new Date(axis.maxZoomed), this.inputDateFormat);
        }
    };
    /**
     * Zooms axis according to input fields.
     *
     * @ignore
     */
    DateAxisRangeSelector.prototype.updateZoom = function () {
        var _this = this;
        if (this._zoomTimeout) {
            clearTimeout(this._zoomTimeout);
        }
        this._zoomTimeout = setTimeout(function () {
            var start = _this._elements.fromInput.value;
            var end = _this._elements.toInput.value;
            if ((start.length < _this.inputDateFormat.length) || (end.length < _this.inputDateFormat.length)) {
                return;
            }
            var startDate = _this.dateFormatter.parse(start, _this.inputDateFormat);
            var endDate = _this.dateFormatter.parse(end, _this.inputDateFormat);
            if (startDate && endDate) {
                _this.axis.zoomToDates(startDate, endDate);
            }
        }, this.zoomDelay);
    };
    /**
     * Zooms the axis to a preset time interal or `"ytd"` or `"max"`.
     *
     * @param  interval  Interval
     */
    DateAxisRangeSelector.prototype.setPeriodInterval = function (interval, simulated) {
        var _this = this;
        if (simulated === void 0) { simulated = false; }
        var date;
        var group = this.getGroupInterval(this.axis.mainBaseInterval);
        if (interval == "max") {
            date = new Date(this.axis.groupMin[group] || this.axis.min);
        }
        else if (interval == "ytd") {
            date = new Date(this.axis.groupMax[group] || this.axis.max);
            $time.round(date, "year", 1);
        }
        else if ($type.isObject(interval)) {
            date = new Date(this.axis.groupMax[group] || this.axis.max);
            $time.add(date, interval.timeUnit, -1 * interval.count);
        }
        if (date) {
            this.zoomToDates(date);
        }
        var animated = this.axis.rangeChangeDuration > 0;
        var groupingChanged = false;
        var zoomFinished = !animated;
        if (!simulated) {
            this.axis.events.once("groupperiodchanged", function (ev) {
                console.log("grouping", zoomFinished, groupingChanged);
                groupingChanged = true;
                if (zoomFinished) {
                    _this.setPeriodInterval(interval, true);
                }
            });
            this.axis.events.once("rangechangeended", function (ev) {
                console.log("range", zoomFinished, groupingChanged);
                zoomFinished = true;
                if (groupingChanged) {
                    _this.setPeriodInterval(interval, true);
                }
            });
        }
        this.dispatchImmediately("periodselected", {
            interval: interval,
            startDate: date
        });
    };
    DateAxisRangeSelector.prototype.getGroupInterval = function (interval) {
        return interval.timeUnit + interval.count;
    };
    /**
     * Zooms the axis using start date.
     *
     * @param  date  Start date
     */
    DateAxisRangeSelector.prototype.zoomToDates = function (date) {
        var axis = this.axis;
        var group = this.getGroupInterval(axis.baseInterval);
        var min = axis.groupMin[group] || axis.min;
        var max = axis.groupMax[group] || axis.max;
        axis.keepSelection = true;
        axis.zoom({ start: (date.getTime() - min) / (max - min), end: 1 });
    };
    Object.defineProperty(DateAxisRangeSelector.prototype, "periods", {
        /**
         * @return Periods
         */
        get: function () {
            if (!this._periods) {
                this._periods = [
                    { name: this.language.translateAny("%1M", undefined, "1"), interval: { timeUnit: "month", count: 1 } },
                    { name: this.language.translateAny("%1M", undefined, "3"), interval: { timeUnit: "month", count: 3 } },
                    { name: this.language.translateAny("%1M", undefined, "6"), interval: { timeUnit: "month", count: 6 } },
                    { name: this.language.translateAny("%1Y", undefined, "1"), interval: { timeUnit: "year", count: 1 } },
                    { name: this.language.translateAny("YTD"), interval: "ytd" },
                    { name: this.language.translateAny("MAX"), interval: "max" },
                ];
            }
            return this._periods;
        },
        /**
         * Getters and setters
         */
        /**
         * A list of pre-defined periods to show buttons for.
         *
         * @param  value  Periods
         */
        set: function (value) {
            this._periods = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxisRangeSelector.prototype, "dateFormatter", {
        /**
         * @return Formatter
         */
        get: function () {
            if (!this._dateFormatter) {
                // Maybe use one from axis?
                if (this._axis) {
                    this._dateFormatter = this._axis.dateFormatter;
                }
                else {
                    this._dateFormatter = new DateFormatter();
                    this._disposers.push(this._dateFormatter);
                }
            }
            return this._dateFormatter;
        },
        /**
         * A [[DateFormatter]] instance to use.
         *
         * If not set, control will inherit one from the target axis.
         *
         * @param  value  Formatter
         */
        set: function (value) {
            this._dateFormatter = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxisRangeSelector.prototype, "inputDateFormat", {
        /**
         * @return Date format
         */
        get: function () {
            if (this._inputDateFormat) {
                return this._inputDateFormat;
            }
            else if (this.dateFormatter && $type.isString(this.dateFormatter.dateFormat)) {
                return this.dateFormatter.dateFormat;
            }
            else {
                return "yyyy-MM-dd";
            }
        },
        /**
         * An format to use for the date input fields.
         *
         * If not set, it will use `dateFormat` from the [[DateFormatter]] object.
         *
         * @default "yyyy-MM-dd"
         * @param  value  Date format
         */
        set: function (value) {
            if (this._inputDateFormat != value) {
                this._inputDateFormat = value;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    return DateAxisRangeSelector;
}(RangeSelector));
export { DateAxisRangeSelector };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["DateAxisRangeSelector"] = DateAxisRangeSelector;
//# sourceMappingURL=DateAxisRangeSelector.js.map