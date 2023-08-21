/**
 * Regression plugin.
 *
 * Uses regression-js library by Tom Alexander
 * http://tom-alexander.github.io/regression-js/
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import * as regression from "regression";
import { Plugin } from "../../core/utils/Plugin";
import { registry } from "../../core/Registry";
import { EventDispatcher } from "../../core/utils/EventDispatcher";
import * as $object from "../../core/utils/Object";
import * as $type from "../../core/utils/Type";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A module which automatically calculates data for for trend lines using
 * various regression algorithms.
 *
 * By pushing an instance of [[Regression]] into `plugin` list of
 * any [[XYSeries]], it automatically recalculates and overrides its
 * data to show regression trend line, inestead of the source values.
 *
 * Example:
 *
 * ```TypeScript
 * let regseries = chart.series.push(new am4charts.LineSeries());
 * regseries.dataFields.valueY = "value";
 * regseries.dataFields.dateX = "date";
 *
 * let reg = regseries.plugins.push(new am4plugins_regression.Regression());
 * reg.method = "polynomial";
 * ```
 * ```JavaScript
 * var regseries = chart.series.push(new am4charts.LineSeries());
 * regseries.dataFields.valueY = "value";
 * regseries.dataFields.dateX = "date";
 *
 * var reg = regseries.plugins.push(new am4plugins_regression.Regression());
 * reg.method = "polynomial";
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     // ...
 *   }, {
 *     "type": "LineSeries",
 *     "dataFields": {
 *       "valueY": "value",
 *       "dateX": "date"
 *     },
 *     "plugins": [{
 *       "type": "Regression",
 *       "method": "polynomial"
 *     }]
 *   }]
 * }
 * ```
 *
 * @since 4.2.2
 */
var Regression = /** @class */ (function (_super) {
    __extends(Regression, _super);
    /**
     * Constructor
     */
    function Regression() {
        var _this = 
        // Nothing to do here
        _super.call(this) || this;
        /**
         * An [[EventDispatcher]] instance.
         *
         * @since 4.3.14
         */
        _this.events = new EventDispatcher();
        /**
         * Method
         */
        _this._method = "linear";
        /**
         * Options
         */
        _this._options = {};
        /**
         * Simplify output data.
         */
        _this._simplify = false;
        /**
         * Reorder data after calculation
         */
        _this._reorder = false;
        /**
         * Hash of the data original data. Used to check whether we need to
         * recalculate, or the data did not change.
         */
        _this._originalDataHash = "";
        /**
         * Should skip next "beforedatavalidated" event?
         */
        _this._skipValidatedEvent = false;
        return _this;
    }
    Regression.prototype.init = function () {
        _super.prototype.init.call(this);
        this.processSeries();
    };
    /**
     * Decorates series with required events and adapters used to hijack its
     * data.
     */
    Regression.prototype.processSeries = function () {
        var _this = this;
        this.invalidateData();
        // Invalidate calculated data whenever data updates
        this._disposers.push(this.target.events.on("beforedatavalidated", function (ev) {
            if (_this._skipValidatedEvent) {
                _this._skipValidatedEvent = false;
                return;
            }
            // Update data
            _this.saveOriginalData();
            _this.calcData();
        }));
        if (this.target.chart) {
            this._disposers.push(this.target.chart.events.on("beforedatavalidated", function (ev) {
                _this.target.invalidateData();
            }));
        }
        // Add data adapter
        this.target.adapter.add("data", function () {
            if (_this._data === undefined) {
                _this.calcData();
            }
            return _this._data;
        });
        // Save original series data
        this.saveOriginalData();
    };
    /**
     * Saves series' original data and (re)adds data adapter.
     */
    Regression.prototype.saveOriginalData = function () {
        // Temporarily disable the data adapter
        this.target.adapter.disableKey("data");
        // Save
        if (this.target.data && this.target.data.length) {
            this._originalData = this.target.data;
        }
        // Re-enabled the adapter
        this.target.adapter.enableKey("data");
    };
    /**
     * Invalidates data.
     */
    Regression.prototype.invalidateData = function () {
        this._data = undefined;
    };
    /**
     * Calculates regression series data.
     */
    Regression.prototype.calcData = function () {
        this._data = [];
        var series = this.target;
        // Get series' data (global or series own)
        var seriesData = this._originalData;
        if (!seriesData || seriesData.length == 0) {
            seriesData = this.target.baseSprite.data;
        }
        // Determine if this line is pivoted (horizontal value axis)
        // If both axes are value, we consider the line to be horizontal.
        var pivot = series.dataFields.valueX && !series.dataFields.valueY ? true : false;
        var valueField = pivot ? series.dataFields.valueX : series.dataFields.valueY;
        var positionField = pivot ? series.dataFields.valueY : series.dataFields.valueX;
        // Assemble series' own data
        var newData = [];
        var _loop_1 = function (i) {
            var item = {};
            $object.each(this_1.target.dataFields, function (key, val) {
                item[val] = seriesData[i][val];
            });
            if ($type.hasValue(item[valueField])) {
                newData.push(item);
            }
        };
        var this_1 = this;
        for (var i = 0; i < seriesData.length; i++) {
            _loop_1(i);
        }
        // Order data points
        if (this.reorder) {
            newData.sort(function (a, b) {
                if (a[positionField] > b[positionField]) {
                    return 1;
                }
                else if (a[positionField] < b[positionField]) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
        }
        // Build matrix for the regression function
        var matrix = [];
        //const pivot = series.dataFields.valueX && !series.dataFields.valueY ? true : false;
        for (var i = 0; i < newData.length; i++) {
            var x = series.dataFields.valueX && pivot ? newData[i][series.dataFields.valueX] : i;
            var y = series.dataFields.valueY && !pivot ? newData[i][series.dataFields.valueY] : i;
            matrix.push(pivot ? [y, x] : [x, y]);
        }
        // Calculate regression values
        var result = [];
        switch (this.method) {
            case "polynomial":
                result = regression.polynomial(matrix, this.options);
                break;
            default:
                result = regression.linear(matrix, this.options);
        }
        // Set results
        this.result = result;
        // Invoke event
        var hash = btoa(JSON.stringify(newData));
        if (hash != this._originalDataHash) {
            this.events.dispatchImmediately("processed", {
                type: "processed",
                target: this
            });
        }
        this._originalDataHash = hash;
        // Build data
        this._data = [];
        var _loop_2 = function (i) {
            if (this_2.simplify && i) {
                i = result.points.length - 1;
            }
            var item = {};
            $object.each(this_2.target.dataFields, function (key, val) {
                if ((key == "valueY" && !pivot) || (key == "valueX" && pivot)) {
                    item[val] = result.points[i][1];
                }
                else {
                    item[val] = newData[i][val];
                }
            });
            this_2._data.push(item);
            out_i_1 = i;
        };
        var this_2 = this, out_i_1;
        for (var i = 0; i < result.points.length; i++) {
            _loop_2(i);
            i = out_i_1;
        }
    };
    Object.defineProperty(Regression.prototype, "method", {
        /**
         * @return Method
         */
        get: function () {
            return this._method;
        },
        /**
         * Method to calculate regression.
         *
         * Supported values: "linear" (default), "polynomial".
         *
         * @default linear
         * @param  value  Method
         */
        set: function (value) {
            if (this._method != value) {
                this._method = value;
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Regression.prototype, "options", {
        /**
         * @return Options
         */
        get: function () {
            return this._options;
        },
        /**
         * Regression output options.
         *
         * Below are default values.
         *
         * ```JSON
         * {
         *   order: 2,
         *   precision: 2,
         * }
         * ```
         *
         * @see {@link https://github.com/Tom-Alexander/regression-js#configuration-options} About options
         * @param  value  Options
         */
        set: function (value) {
            if (this._options != value) {
                this._options = value;
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Regression.prototype, "simplify", {
        /**
         * @return Simplify?
         */
        get: function () {
            return this._simplify;
        },
        /**
         * Simplify regression line data? If set to `true` it will use only two
         * result data points: first and last.
         *
         * NOTE: this does make sense with "linear" method only.
         *
         * @default false
         * @since 4.2.3
         * @param  value  Simplify?
         */
        set: function (value) {
            if (this._simplify != value) {
                this._simplify = value;
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Regression.prototype, "reorder", {
        /**
         * @return Reorder data?
         */
        get: function () {
            return this._reorder;
        },
        /**
         * Orders data points after calculation. This can make sense in scatter plot
         * scenarios where data points can come in non-linear fashion.
         *
         * @default false
         * @since 4.2.3
         * @param  value  Reorder data?
         */
        set: function (value) {
            if (this._reorder != value) {
                this._reorder = value;
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    return Regression;
}(Plugin));
export { Regression };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Regression"] = Regression;
//# sourceMappingURL=Regression.js.map