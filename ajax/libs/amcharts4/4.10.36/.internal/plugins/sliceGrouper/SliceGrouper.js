/**
 * Plugin for automatically grouping small chart slices into single group.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Plugin } from "../../core/utils/Plugin";
import { List } from "../../core/utils/List";
import { registry } from "../../core/Registry";
import { ZoomOutButton } from "../../core/elements/ZoomOutButton";
import * as $object from "../../core/utils/Object";
import * as $type from "../../core/utils/Type";
import { options } from "../../core/Options";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A plugin which automatically groups [[PercenSeries]] slices that are smaller
 * than certain percent into one "Other" slice.
 *
 * By pushing an instance of [[SliceGrouper]] into `plugin` list of
 * any [[PercentSeries]], it automatically applies the functionality.
 *
 * Example:
 *
 * ```TypeScript
 * let series = chart.series.push(new am4charts.PieSeries());
 * series.dataFields.valueY = "value";
 * series.dataFields.dateX = "date";
 *
 * let grouper = series.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
 * ```
 * ```JavaScript
 * var series = chart.series.push(new am4charts.PieSeries());
 * series.dataFields.valueY = "value";
 * series.dataFields.dateX = "date";
 *
 * var grouper = series.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     // ...
 *   }, {
 *     "type": "PieSeries",
 *     "dataFields": {
 *       "valueY": "value",
 *       "dateX": "date"
 *     },
 *     "plugins": [{
 *       "type": "SliceGrouper"
 *     }]
 *   }]
 * }
 * ```
 *
 * @since 4.3.11
 */
var SliceGrouper = /** @class */ (function (_super) {
    __extends(SliceGrouper, _super);
    /**
     * Constructor
     */
    function SliceGrouper() {
        var _this = 
        // Nothing to do here
        _super.call(this) || this;
        /**
         * A list of small slices that do not satisfy `threshold`.
         */
        _this.smallSlices = new List();
        /**
         * A list of big slices that do not satisfy `threshold`.
         */
        _this.bigSlices = new List();
        /**
         * A name to use for the "Other" slice.
         *
         * @default "Other"
         */
        _this.groupName = "Other";
        /**
         * Custom properties to apply to the "Other" slice.
         *
         * @since 4.5.3
         * @type {IFunnelSliceProperties}
         */
        _this.groupProperties = {};
        /**
         * If set to `true` the legend will be synced to show currently visible
         * slices only.
         *
         * @defaylt false
         */
        _this.syncLegend = false;
        /**
         * Threshold percent.
         */
        _this._threshold = 5;
        /**
         * Disposer for click events.
         */
        _this._clickDisposers = [];
        /**
         * What happens when "Other" slice is cicked.
         */
        _this._clickBehavior = "none";
        _this._ignoreDataUpdate = false;
        /**
         * Is group slice currently closed or expanded?
         */
        _this._closed = true;
        return _this;
    }
    SliceGrouper.prototype.init = function () {
        _super.prototype.init.call(this);
        this.processSeries();
    };
    /**
     * Decorates series with required events and adapters used to hijack its
     * data.
     */
    SliceGrouper.prototype.processSeries = function () {
        var _this = this;
        var series = this.target;
        var chart = series.chart;
        var dataProvider = series.data && series.data.length ? series : chart;
        this._dataProvider = dataProvider;
        // Invalidate calculated data whenever data updates
        var event = (options.queue || options.onlyShowOnViewport) && !chart.inited ? "inited" : "datavalidated";
        this._disposers.push(dataProvider.events.on(event, function (ev) {
            if (_this._ignoreDataUpdate) {
                _this._ignoreDataUpdate = false;
                return;
            }
            _this.groupSlice = undefined;
            _this.smallSlices.clear();
            _this.bigSlices.clear();
            // Collect and prepare small slices
            var groupValue = 0;
            var groupSliceItem;
            series.dataItems.each(function (item, index) {
                var value = item.values.value.percent;
                if (item.dataContext.sliceGrouperOther) {
                    groupSliceItem = item.dataContext;
                }
                else if ((_this.limit && (index >= _this.limit)) || (!_this.limit && (Math.abs(value) <= Math.abs(_this.threshold)))) {
                    groupValue += item.value;
                    item.hiddenInLegend = true;
                    item.hide();
                    item.hidden = true;
                    // We need this in order to handle conflict with responsive
                    // functionality
                    item.label.events.on("transitionended", function (ev) {
                        if (_this._closed) {
                            item.hide();
                        }
                    });
                    _this.smallSlices.push(item.slice);
                }
                else {
                    _this.bigSlices.push(item.slice);
                }
            });
            // Create "Other" slice
            if (groupValue != 0) {
                if (groupSliceItem) {
                    groupSliceItem[series.dataFields.value] = groupValue;
                    _this._ignoreDataUpdate = true;
                    dataProvider.validateRawData();
                }
                else {
                    var groupData = {
                        sliceGrouperOther: true
                    };
                    groupData[series.dataFields.category] = _this.groupName;
                    groupData[series.dataFields.value] = groupValue;
                    _this._ignoreDataUpdate = true;
                    dataProvider.addData(groupData);
                }
            }
        }));
        this._disposers.push(series.events.on("validated", function (ev) {
            series.slices.each(function (slice) {
                if (slice.dataItem.dataContext.sliceGrouperOther) {
                    if (!_this.groupSlice) {
                        _this.groupSlice = slice;
                        _this.initSlices();
                    }
                }
            });
        }));
    };
    /**
     * Initializes group slice.
     */
    SliceGrouper.prototype.initSlices = function () {
        var _this = this;
        if (!this.groupSlice) {
            return;
        }
        // Apply custom peroperties
        $object.each(this.groupProperties, function (key, val) {
            _this.groupSlice[key] = val;
        });
        // Set up click
        if (this.clickBehavior != "none") {
            if (!this.groupSlice.events.has("hit", this.toggleGroupOn, this)) {
                this._clickDisposers.push(this.groupSlice.events.on("hit", this.toggleGroupOn, this));
            }
        }
    };
    /**
     * Toggles group on.
     */
    SliceGrouper.prototype.toggleGroupOn = function () {
        var _this = this;
        if (this.clickBehavior == "none") {
            return;
        }
        this._closed = false;
        // Hide "Other" slice
        this.groupSlice.dataItem.hide();
        if (this.syncLegend) {
            this.groupSlice.dataItem.hiddenInLegend = true;
        }
        this._clickDisposers.push(this.groupSlice.events.once("shown", function (ev) {
            _this.toggleGroupOff();
        }));
        // Unhide hidden slices
        this.smallSlices.each(function (slice) {
            slice.dataItem.hidden = false;
            slice.dataItem.show();
            if (_this.syncLegend) {
                slice.dataItem.hiddenInLegend = false;
            }
        });
        // Maybe hide big slices
        if (this.clickBehavior == "zoom") {
            this.bigSlices.each(function (slice) {
                slice.dataItem.hide();
                if (_this.syncLegend) {
                    slice.dataItem.hiddenInLegend = true;
                }
            });
        }
        if (this.syncLegend) {
            this.target.baseSprite.feedLegend();
        }
        // Show zoomout button
        this.zoomOutButton.show();
    };
    /**
     * Toggles group off.
     */
    SliceGrouper.prototype.toggleGroupOff = function () {
        var _this = this;
        if (this.clickBehavior == "none") {
            return;
        }
        this._closed = true;
        // Toggle "Other" slice back on
        this.groupSlice.events.disableType("shown");
        this.groupSlice.dataItem.show();
        this.groupSlice.events.enableType("shown");
        if (this.syncLegend) {
            this.groupSlice.dataItem.hiddenInLegend = false;
        }
        // Maybe unhide big slices
        if (this.clickBehavior == "zoom") {
            this.bigSlices.each(function (slice) {
                slice.dataItem.hidden = false;
                slice.dataItem.show();
                if (_this.syncLegend) {
                    slice.dataItem.hiddenInLegend = false;
                }
            });
        }
        // Hide small slices
        this.smallSlices.each(function (slice) {
            slice.dataItem.hide();
            if (_this.syncLegend) {
                slice.dataItem.hiddenInLegend = true;
            }
        });
        if (this.syncLegend) {
            this.target.baseSprite.feedLegend();
        }
        // Hide zoomout button
        this.zoomOutButton.hide();
    };
    Object.defineProperty(SliceGrouper.prototype, "threshold", {
        /**
         * @return Threshold
         */
        get: function () {
            return this._threshold;
        },
        /**
         * Percent threshold which slices to group. If a slice is less than
         * `threshold` percent, it will be moved into "Other" group.
         *
         * @default 5
         * @param  value  Threshold
         */
        set: function (value) {
            if (this._threshold != value) {
                this._threshold = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliceGrouper.prototype, "limit", {
        /**
         * @return Limit
         */
        get: function () {
            return this._limit;
        },
        /**
         * Maximum number of ungrouped slices to show. Any slice beyond `limit` will
         * go into the "Other" group.
         *
         * NOTE: if `limit` is set, `threshold` setting will be ignored.
         *
         * @default undefined
         * @since 4.9.14
         * @param  value  Limit
         */
        set: function (value) {
            if (this._limit != value) {
                this._limit = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliceGrouper.prototype, "zoomOutButton", {
        /**
         * @return Button
         */
        get: function () {
            var _this = this;
            if (!this._zoomOutButton) {
                var chart = this.target.baseSprite;
                var zoomOutButton = chart.tooltipContainer.createChild(ZoomOutButton);
                zoomOutButton.shouldClone = false;
                zoomOutButton.align = "right";
                zoomOutButton.valign = "top";
                zoomOutButton.zIndex = Number.MAX_SAFE_INTEGER;
                zoomOutButton.marginTop = 5;
                zoomOutButton.marginRight = 5;
                zoomOutButton.hide(0);
                this.zoomOutButton = zoomOutButton;
                this._disposers.push(this._zoomOutButton);
                zoomOutButton.events.on("hit", function () {
                    _this.toggleGroupOff();
                }, this);
            }
            return this._zoomOutButton;
        },
        /**
         * An instance of [[ZoomOutButton]] that is shown when "Other" slice is
         * broken down, to get back to grouped state.
         *
         * @param  value  Button
         */
        set: function (value) {
            this._zoomOutButton = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliceGrouper.prototype, "clickBehavior", {
        /**
         * @returns Click behavior
         */
        get: function () {
            return this._clickBehavior;
        },
        /**
         * What happens when "Other" slice is clicked/tapped:
         *
         * * "none": nothing (default)
         * * "break": the slice is broken down into actual slices it consists of
         * * "zoom": actual small slices are shown and the rest of the slices are hidden
         *
         * @param  value  Click behavior
         */
        set: function (value) {
            if (this._clickBehavior != value) {
                this._clickBehavior = value;
                this.initSlices();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Disposes the element
     */
    SliceGrouper.prototype.dispose = function () {
        this.disposeClickEvents();
        this.groupSlice = undefined;
        this.smallSlices.clear();
        this.bigSlices.clear();
        if (this._dataProvider && $type.isArray(this._dataProvider.data)) {
            for (var i = 0; i < this._dataProvider.data.length; i++) {
                var row = this._dataProvider.data[i];
                if (row.sliceGrouperOther) {
                    this._dataProvider.data.splice(i, 1);
                    this._dataProvider.invalidateData();
                    break;
                }
            }
        }
        _super.prototype.dispose.call(this);
    };
    SliceGrouper.prototype.disposeClickEvents = function () {
        var a = this._clickDisposers;
        this._clickDisposers = null;
        while (a.length !== 0) {
            var disposer = a.shift();
            disposer.dispose();
        }
    };
    return SliceGrouper;
}(Plugin));
export { SliceGrouper };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SliceGrouper"] = SliceGrouper;
//# sourceMappingURL=SliceGrouper.js.map