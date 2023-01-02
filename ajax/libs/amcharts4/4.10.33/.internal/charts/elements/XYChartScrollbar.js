/**
 * A module with functionality for buildin a scrollbar with an XY graph in it.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Scrollbar } from "../../core/elements/Scrollbar";
import { Sprite } from "../../core/Sprite";
import { List } from "../../core/utils/List";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { XYChart } from "../types/XYChart";
import { ValueAxis } from "../axes/ValueAxis";
import { DateAxis } from "../axes/DateAxis";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { DesaturateFilter } from "../../core/rendering/filters/DesaturateFilter";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
import * as $path from "../../core/rendering/Path";
import * as $utils from "../../core/utils/Utils";
import { percent } from "../../core/utils/Percent";
import { color } from "../../core/utils/Color";
import { options } from "../../core/Options";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A special version of the Scrollbar that has an XY chart in it.
 *
 * Used mainly as an advanced scrollbar with a preview for other XY charts.
 *
 * However, can be used as standalone element.
 *
 * @see {@link IXYChartScrollbarEvents} for a list of available events
 * @see {@link IXYChartScrollbarAdapters} for a list of available Adapters
 * @important
 */
var XYChartScrollbar = /** @class */ (function (_super) {
    __extends(XYChartScrollbar, _super);
    /**
     * Constructor
     */
    function XYChartScrollbar() {
        var _this = _super.call(this) || this;
        /**
         * A chart element Scrollbar is for.
         */
        _this._chart = new MutableValueDisposer();
        _this.className = "XYChartScrollbar";
        var interfaceColors = new InterfaceColorSet();
        _this.padding(0, 0, 0, 0);
        var scrollbarChart = _this.createChild(XYChart);
        scrollbarChart.shouldClone = false;
        scrollbarChart.margin(0, 0, 0, 0);
        scrollbarChart.padding(0, 0, 0, 0);
        scrollbarChart.interactionsEnabled = false;
        _this._scrollbarChart = scrollbarChart;
        if (!$utils.isIE()) {
            var filter = new DesaturateFilter();
            filter.filterUnits = "userSpaceOnUse";
            scrollbarChart.plotContainer.filters.push(filter);
        }
        _this._disposers.push(_this._scrollbarChart);
        _this.minHeight = 60;
        _this.minWidth = 60;
        var unselectedOverlay = _this.createChild(Sprite);
        unselectedOverlay.shouldClone = false;
        unselectedOverlay.setElement(_this.paper.add("path"));
        unselectedOverlay.fill = interfaceColors.getFor("background");
        unselectedOverlay.fillOpacity = 0.8;
        unselectedOverlay.interactionsEnabled = false;
        unselectedOverlay.isMeasured = false;
        unselectedOverlay.toBack();
        _this._unselectedOverlay = unselectedOverlay;
        _this._disposers.push(_this._unselectedOverlay);
        scrollbarChart.toBack();
        _this.background.cornerRadius(0, 0, 0, 0);
        var thumbBackground = _this.thumb.background;
        thumbBackground.cornerRadius(0, 0, 0, 0);
        thumbBackground.fillOpacity = 0;
        thumbBackground.fill = interfaceColors.getFor("background");
        var hoverState = thumbBackground.states.getKey("hover");
        if (hoverState) {
            hoverState.properties.fillOpacity = 0.2;
        }
        var downState = thumbBackground.states.getKey("down");
        if (downState) {
            downState.properties.fillOpacity = 0.4;
        }
        _this._disposers.push(_this._chart);
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(XYChartScrollbar.prototype, "series", {
        /**
         * A list of series that are used to draw graph(s) on the scrollbar.
         *
         * @readonly
         * @return Series
         */
        get: function () {
            if (!this._series) {
                this._series = new List();
                this._disposers.push(this._series.events.on("inserted", this.handleSeriesAdded, this, false));
                this._disposers.push(this._series.events.on("removed", this.handleSeriesRemoved, this, false));
            }
            return this._series;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Decorates a new series when they are pushed into a `series` list.
     *
     * @param event Event
     */
    XYChartScrollbar.prototype.handleSeriesAdded = function (event) {
        var _this = this;
        var sourceSeries = event.newValue;
        if (!sourceSeries.xAxis || !sourceSeries.yAxis) {
            return;
        }
        var scrollbarChart = this.scrollbarChart;
        scrollbarChart.zoomOutButton.disabled = true;
        this.chart = sourceSeries.chart;
        scrollbarChart.dateFormatter.inputDateFormat = this.chart.dateFormatter.inputDateFormat;
        // Ensure that scrollbar chart shares the same locale as parent chart
        scrollbarChart.language.locale = this.chart.language.locale;
        var addXAxis = true;
        var addYAxis = true;
        // check if we haven't added clone of x or y axis before
        $iter.each(this.series.iterator(), function (series) {
            if (series != sourceSeries) {
                if (series.xAxis == sourceSeries.xAxis && _this.scrollbarChart.xAxes.length > 0) {
                    addXAxis = false;
                }
                if (series.yAxis == sourceSeries.yAxis && _this.scrollbarChart.yAxes.length > 0) {
                    addYAxis = false;
                }
            }
        });
        sourceSeries.events.on("beforedisposed", function () {
            _this.series.removeValue(sourceSeries);
        });
        var interfaceColors = new InterfaceColorSet();
        var series = sourceSeries.clone();
        if (options.onlyShowOnViewport || options.queue) {
            this.addDisposer(this.chart.events.on("removedfromqueue", function () {
                scrollbarChart.invalidateData();
            }));
        }
        if ($utils.isIE()) {
            series.stroke = color("#aaaaaa");
            series.fill = series.stroke;
            series.propertyFields.fill = undefined;
            series.propertyFields.stroke = undefined;
        }
        sourceSeries.scrollbarSeries = series;
        if (addXAxis) {
            var xAxis = sourceSeries.xAxis.clone();
            scrollbarChart.xAxes.moveValue(xAxis);
            xAxis.title.disabled = true;
            xAxis.rangeChangeDuration = 0;
            //xAxis.id = sourceSeries.uid;
            var renderer = xAxis.renderer;
            renderer.ticks.template.disabled = true;
            renderer.inside = true;
            renderer.labels.template.inside = true;
            renderer.line.strokeOpacity = 0;
            renderer.minLabelPosition = 0.02;
            renderer.maxLabelPosition = 0.98;
            renderer.line.disabled = true;
            renderer.axisFills.template.disabled = true;
            renderer.baseGrid.disabled = true;
            renderer.grid.template.strokeOpacity = 0.05;
            renderer.minWidth = undefined;
            renderer.minHeight = undefined;
            renderer.padding(0, 0, 0, 0);
            renderer.chart = scrollbarChart;
            renderer.margin(0, 0, 0, 0);
            xAxis.width = percent(100);
            var labelsTemplate = renderer.labels.template;
            labelsTemplate.fillOpacity = 0.5;
            xAxis.maxZoomCount = undefined;
            xAxis.minZoomCount = undefined;
            if (xAxis instanceof DateAxis) {
                var vAxis_1 = xAxis;
                var sourceAxis = sourceSeries.xAxis;
                vAxis_1.groupCount = sourceAxis.groupCount * 5;
                vAxis_1.min = undefined;
                vAxis_1.max = undefined;
                this._disposers.push(vAxis_1.clonedFrom.events.on("extremeschanged", function () {
                    if ($type.isNumber(vAxis_1.clonedFrom.minDefined)) {
                        vAxis_1.min = vAxis_1.clonedFrom.minDefined;
                    }
                    if ($type.isNumber(vAxis_1.clonedFrom.maxDefined)) {
                        vAxis_1.max = vAxis_1.clonedFrom.maxDefined;
                    }
                }, undefined, false));
            }
            else if (xAxis instanceof ValueAxis) {
                var vAxis_2 = xAxis;
                vAxis_2.min = undefined;
                vAxis_2.max = undefined;
                if (!$type.isNumber(vAxis_2.clonedFrom.minDefined)) {
                    vAxis_2.min = undefined;
                }
                if (!$type.isNumber(vAxis_2.clonedFrom.maxDefined)) {
                    vAxis_2.max = undefined;
                }
                this._disposers.push(vAxis_2.clonedFrom.events.on("extremeschanged", function () {
                    if ($type.isNumber(vAxis_2.clonedFrom.minDefined)) {
                        vAxis_2.min = vAxis_2.clonedFrom.min;
                    }
                    if ($type.isNumber(vAxis_2.clonedFrom.maxDefined)) {
                        vAxis_2.max = vAxis_2.clonedFrom.max;
                    }
                }, undefined, false));
            }
            series.xAxis = xAxis;
        }
        else {
            this.scrollbarChart.xAxes.each(function (xAxis) {
                if (xAxis.clonedFrom == sourceSeries.xAxis) {
                    series.xAxis = xAxis;
                }
            });
        }
        if (addYAxis) {
            var yAxis = sourceSeries.yAxis.clone();
            scrollbarChart.yAxes.moveValue(yAxis);
            yAxis.title.disabled = true;
            yAxis.rangeChangeDuration = 0;
            var renderer = yAxis.renderer;
            renderer.ticks.template.disabled = true;
            renderer.inside = true;
            renderer.labels.template.inside = true;
            renderer.line.strokeOpacity = 0;
            renderer.minLabelPosition = 0.02;
            renderer.maxLabelPosition = 0.98;
            renderer.line.disabled = true;
            renderer.axisFills.template.disabled = true;
            renderer.grid.template.stroke = interfaceColors.getFor("background");
            renderer.baseGrid.disabled = true;
            renderer.grid.template.strokeOpacity = 0.05;
            renderer.minWidth = undefined;
            renderer.minHeight = undefined;
            renderer.chart = scrollbarChart;
            renderer.padding(0, 0, 0, 0);
            renderer.margin(0, 0, 0, 0);
            yAxis.height = percent(100);
            var labelsTemplate = renderer.labels.template;
            labelsTemplate.fillOpacity = 0.5;
            series.yAxis = yAxis;
            yAxis.maxZoomCount = undefined;
            yAxis.minZoomCount = undefined;
            if (yAxis instanceof DateAxis) {
                var vAxis_3 = yAxis;
                vAxis_3.min = undefined;
                vAxis_3.max = undefined;
                var sourceAxis = sourceSeries.yAxis;
                yAxis.groupCount = sourceAxis.groupCount * 5;
                this._disposers.push(vAxis_3.clonedFrom.events.on("extremeschanged", function () {
                    if ($type.isNumber(vAxis_3.clonedFrom.minDefined)) {
                        vAxis_3.min = vAxis_3.clonedFrom.minDefined;
                    }
                    if ($type.isNumber(vAxis_3.clonedFrom.maxDefined)) {
                        vAxis_3.max = vAxis_3.clonedFrom.maxDefined;
                    }
                }));
            }
            else if (yAxis instanceof ValueAxis) {
                var vAxis_4 = yAxis;
                vAxis_4.min = undefined;
                vAxis_4.max = undefined;
                if (!$type.isNumber(vAxis_4.clonedFrom.minDefined)) {
                    vAxis_4.min = undefined;
                }
                if (!$type.isNumber(vAxis_4.clonedFrom.maxDefined)) {
                    vAxis_4.max = undefined;
                }
                this._disposers.push(vAxis_4.clonedFrom.events.on("extremeschanged", function () {
                    if ($type.isNumber(vAxis_4.clonedFrom.minDefined)) {
                        vAxis_4.min = vAxis_4.clonedFrom.minDefined;
                    }
                    if ($type.isNumber(vAxis_4.clonedFrom.maxDefined)) {
                        vAxis_4.max = vAxis_4.clonedFrom.maxDefined;
                    }
                }));
            }
        }
        else {
            this.scrollbarChart.yAxes.each(function (yAxis) {
                if (yAxis.clonedFrom == sourceSeries.yAxis) {
                    series.yAxis = yAxis;
                }
            });
        }
        series.rangeChangeDuration = 0;
        series.interpolationDuration = 0;
        series.defaultState.transitionDuration = 0;
        series.showOnInit = false;
        this._disposers.push(series.events.on("validated", this.zoomOutAxes, this, false));
        // data might be set drectly on series
        this._disposers.push(sourceSeries.events.on("datavalidated", function () {
            if (series.data != sourceSeries.data) { // data setter doesn't check this
                series.data = sourceSeries.data;
            }
        }, undefined, false));
        series.defaultState.properties.visible = true;
        scrollbarChart.series.push(series);
        this.updateByOrientation();
    };
    /**
     * @ignore
     */
    XYChartScrollbar.prototype.updateByOrientation = function () {
        var _this = this;
        if (this._scrollbarChart) {
            $iter.each(this._scrollbarChart.xAxes.iterator(), function (xAxis) {
                var renderer = xAxis.renderer;
                if (_this.orientation == "vertical") {
                    renderer.grid.template.disabled = true;
                    renderer.labels.template.disabled = true;
                    renderer.minGridDistance = 10;
                }
                else {
                    renderer.grid.template.disabled = false;
                    renderer.labels.template.disabled = false;
                    renderer.minGridDistance = xAxis.clonedFrom.renderer.minGridDistance;
                }
            });
            $iter.each(this._scrollbarChart.yAxes.iterator(), function (yAxis) {
                var renderer = yAxis.renderer;
                if (_this.orientation == "horizontal") {
                    renderer.grid.template.disabled = true;
                    renderer.labels.template.disabled = true;
                    renderer.minGridDistance = 10;
                }
                else {
                    renderer.grid.template.disabled = false;
                    renderer.labels.template.disabled = false;
                    renderer.minGridDistance = yAxis.clonedFrom.renderer.minGridDistance;
                }
            });
        }
    };
    /**
     * Cleans up after series are removed from Scrollbar.
     *
     * @param event  Event
     */
    XYChartScrollbar.prototype.handleSeriesRemoved = function (event) {
        var sourceSeries = event.oldValue;
        var scrollbarChart = this.scrollbarChart;
        scrollbarChart.series.each(function (series) {
            if (series && series.clonedFrom == sourceSeries) {
                scrollbarChart.series.removeValue(series);
            }
        });
        if (scrollbarChart.series.length == 0) {
            scrollbarChart.xAxes.clear();
            scrollbarChart.yAxes.clear();
        }
        try {
            sourceSeries.events.off("validated", this.zoomOutAxes, this);
        }
        catch (err) {
        }
    };
    Object.defineProperty(XYChartScrollbar.prototype, "scrollbarChart", {
        /**
         * A chart element that is used to display graphs in the Scrollbar.
         *
         * This is not the same as `chart`. It's a totally independent instance of
         * [[XYChart]] with separate config, series, etc.
         *
         * It can be configured just like any other [[XYChart]].
         *
         * @readonly
         * @return Scrollbar's internal chart
         */
        get: function () {
            return this._scrollbarChart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYChartScrollbar.prototype, "chart", {
        /**
         * @return Chart
         */
        get: function () {
            return this._chart.get();
        },
        /**
         * A chart that Scrollbar belongs to.
         *
         * @param chart  Chart
         */
        set: function (chart) {
            if (this._chart.get() !== chart) {
                this._chart.set(chart, chart.events.on("datavalidated", this.handleDataChanged, this, false));
                this.handleDataChanged();
                this._scrollbarChart.dataProvider = chart; // this makes scrollbar chart do not validate data untill charts' data is validated
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYChartScrollbar.prototype, "unselectedOverlay", {
        /**
         * A [[Sprite]] object representing overlay that is used to dim area of the
         * scrollbar that is currently not selected.
         *
         * Use its `fillOpacity` to set opacity of the fill, with `0` (zero)
         * completely disabling the dimming, and `1` making unselected area completely
         * blank.
         *
         * @since 4.6.1
         * @readonly
         * @return Unselected area curtain element
         */
        get: function () {
            return this._unselectedOverlay;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates Scrollbar's internal chart's data when the main chart's data
     * changes.
     *
     * @ignore Exclude from docs
     */
    XYChartScrollbar.prototype.handleDataChanged = function () {
        if (this.chart.data != this.scrollbarChart.data) {
            this.scrollbarChart.data = this.chart.data;
        }
        else {
            // add data is handled in XYChart
            // invalidating all data caused the problem: https://github.com/amcharts/amcharts4/issues/2096
            this.scrollbarChart.invalidateRawData();
        }
    };
    /**
     * Zooms out all axes on the internal chart.
     */
    XYChartScrollbar.prototype.zoomOutAxes = function () {
        var scrollbarChart = this.scrollbarChart;
        $iter.each(scrollbarChart.xAxes.iterator(), function (x) {
            x.zoom({ start: 0, end: 1 }, true, true);
        });
        $iter.each(scrollbarChart.yAxes.iterator(), function (y) {
            y.zoom({ start: 0, end: 1 }, true, true);
        });
    };
    /**
     * Updates scrollbar thumb.
     *
     * @ignore
     */
    XYChartScrollbar.prototype.updateThumb = function (dispatchEvents) {
        if (dispatchEvents === void 0) { dispatchEvents = true; }
        _super.prototype.updateThumb.call(this, dispatchEvents);
        if (this._unselectedOverlay) {
            var thumb = this.thumb;
            var x = thumb.pixelX || 0;
            var y = thumb.pixelY || 0;
            var w = thumb.pixelWidth || 0;
            var h = thumb.pixelHeight || 0;
            var path = "";
            if (this.orientation == "horizontal") {
                path = $path.rectToPath({
                    x: -1,
                    y: 0,
                    width: x,
                    height: h
                });
                path += $path.rectToPath({
                    x: x + w,
                    y: 0,
                    width: (this.pixelWidth || 0) - x - w,
                    height: h
                });
            }
            else {
                path = $path.rectToPath({
                    x: 0,
                    y: 0,
                    width: w,
                    height: y
                });
                path += $path.rectToPath({
                    x: 0,
                    y: y + h,
                    width: w,
                    height: (this.pixelHeight || 0) - y - h
                });
            }
            this._unselectedOverlay.path = path;
        }
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    XYChartScrollbar.prototype.processConfig = function (config) {
        if (config) {
            if ($type.hasValue(config.series) && $type.isArray(config.series)) {
                for (var i = 0, len = config.series.length; i < len; i++) {
                    var series = config.series[i];
                    if ($type.hasValue(series) && $type.isString(series)) {
                        if (this.map.hasKey(series)) {
                            config.series[i] = this.map.getKey(series);
                        }
                        else {
                            throw Error("XYChartScrollbar error: Series with id `" + series + "` does not exist.");
                        }
                    }
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    return XYChartScrollbar;
}(Scrollbar));
export { XYChartScrollbar };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["XYChartScrollbar"] = XYChartScrollbar;
//# sourceMappingURL=XYChartScrollbar.js.map