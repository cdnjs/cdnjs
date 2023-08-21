/**
 * XY Chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, SerialChartDataItem } from "./SerialChart";
import { Container } from "../../core/Container";
import { List, ListDisposer } from "../../core/utils/List";
import { Color } from "../../core/utils/Color";
import { ValueAxis } from "../axes/ValueAxis";
import { DateAxis } from "../axes/DateAxis";
import { AxisRendererX } from "../axes/AxisRendererX";
import { AxisRendererY } from "../axes/AxisRendererY";
import { CategoryAxis } from "../axes/CategoryAxis";
import { XYSeries } from "../series/XYSeries";
import { Disposer } from "../../core/utils/Disposer";
import { ZoomOutButton } from "../../core/elements/ZoomOutButton";
import { percent } from "../../core/utils/Percent";
import { registry } from "../../core/Registry";
import { XYChartScrollbar } from "../elements/XYChartScrollbar";
import * as $math from "../../core/utils/Math";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
import * as $utils from "../../core/utils/Utils";
import * as $array from "../../core/utils/Array";
import * as $number from "../../core/utils/Number";
import { defaultRules, ResponsiveBreakpoints } from "../../core/utils/Responsive";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[XYChart]].
 *
 * @see {@link DataItem}
 */
var XYChartDataItem = /** @class */ (function (_super) {
    __extends(XYChartDataItem, _super);
    /**
     * Constructor
     */
    function XYChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "XYChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return XYChartDataItem;
}(SerialChartDataItem));
export { XYChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates an XY chart, and any derivative chart, like Serial, Date-based, etc.
 *
 * Basically this is a chart type, that is used to display any chart
 * information in a square plot area.
 *
 * The horizontal and vertical scale is determined by the type of Axis.
 *
 * The plot types are determined by type of Series.
 *
 * ```TypeScript
 * // Includes
 * import * as am4core from "@amcharts/amcharts4/core";
 * import * as am4charts from "@amcharts/amcharts4/charts";
 *
 * // Create chart
 * let chart = am4core.create("chartdiv", am4charts.XYChart);
 *
 * // Add Data
 * chart.data = [{
 * "country": "USA",
 * "visits": 3025
 * }, {
 * 	"country": "China",
 * 	"visits": 1882
 * }, {
 * 	"country": "Japan",
 * 	"visits": 1809
 * }];
 *
 * // Add category axis
 * let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
 * categoryAxis.dataFields.category = "country";
 *
 * // Add value axis
 * let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
 *
 * // Add series
 * let series = chart.series.push(new am4charts.ColumnSeries());
 * series.name = "Web Traffic";
 * series.dataFields.categoryX = "country";
 * series.dataFields.valueY = "visits";
 * ```
 * ```JavaScript
 * // Create chart
 * var chart = am4core.create("chartdiv", am4charts.XYChart);
 *
 * // The following would work as well:
 * // var chart = am4core.create("chartdiv", "XYChart");
 *
 * // Add Data
 * chart.data = [{
 * "country": "USA",
 * "visits": 3025
 * }, {
 * 	"country": "China",
 * 	"visits": 1882
 * }, {
 * 	"country": "Japan",
 * 	"visits": 1809
 * }];
 *
 * // Add category axis
 * var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
 * categoryAxis.dataFields.category = "country";
 *
 * // Add value axis
 * var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
 *
 * // Add series
 * var series = chart.series.push(new am4charts.ColumnSeries());
 * series.name = "Web Traffic";
 * series.dataFields.categoryX = "country";
 * series.dataFields.valueY = "visits";
 * ```
 * ```JSON
 * var chart = am4core.createFromConfig({
 *
 * 	// Category axis
 * 	"xAxes": [{
 * 		"type": "CategoryAxis",
 * 		"dataFields": {
 * 			"category": "country"
 * 		}
 * 	}],
 *
 * 	// Value axis
 * 	"yAxes": [{
 * 		"type": "ValueAxis"
 * 	}],
 *
 * 	// Series
 * 	"series": [{
 * 		"type": "ColumnSeries",
 * 		"dataFields": {
 * 			"categoryX": "country",
 * 			"valueY": "visits"
 * 		},
 * 		"name": "Web Traffic"
 * 	}],
 *
 * 	// Cursor
 * 	"cursor": {},
 *
 * 	// Data
 * 	"data": [{
 * 		"country": "USA",
 * 		"visits": 3025
 * 	}, {
 * 		"country": "China",
 * 		"visits": 1882
 * 	}, {
 * 		"country": "Japan",
 * 		"visits": 1809
 * 	}]
 *
 * }, "chartdiv", "XYChart");
 * ```
 *
 *
 * @see {@link IXYChartEvents} for a list of available Events
 * @see {@link IXYChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/xy-chart/} for documentation
 * @important
 */
var XYChart = /** @class */ (function (_super) {
    __extends(XYChart, _super);
    /**
     * Constructor
     */
    function XYChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Defines the type of horizontal axis rederer.
         */
        _this._axisRendererX = AxisRendererX;
        /**
         * Defines the type of vertical axis rederer.
         */
        _this._axisRendererY = AxisRendererY;
        /**
         * @ignore
         */
        _this._seriesPoints = [];
        _this.className = "XYChart";
        // Set defaults
        //this.margin(10, 10, 10, 10);
        _this.maskBullets = true;
        _this.arrangeTooltips = true;
        // Create main chart container
        var chartContainer = _this.chartContainer;
        chartContainer.layout = "vertical";
        _this.padding(15, 15, 15, 15);
        // Create top axes container
        var topAxesCont = chartContainer.createChild(Container);
        topAxesCont.shouldClone = false;
        topAxesCont.layout = "vertical";
        topAxesCont.width = percent(100);
        topAxesCont.zIndex = 1;
        _this.topAxesContainer = topAxesCont;
        // Create vertical axes and plot area container
        // Plot area and vertical axes share the whole width of the chart,
        // so we need to put then into a separate container so that layouting
        // engine takes care of the positioning
        var yAxesAndPlotCont = chartContainer.createChild(Container);
        yAxesAndPlotCont.shouldClone = false;
        yAxesAndPlotCont.layout = "horizontal";
        yAxesAndPlotCont.width = percent(100);
        yAxesAndPlotCont.height = percent(100);
        yAxesAndPlotCont.zIndex = 0;
        _this.yAxesAndPlotContainer = yAxesAndPlotCont;
        // Create a container for bottom axes
        var bottomAxesCont = chartContainer.createChild(Container);
        bottomAxesCont.shouldClone = false;
        bottomAxesCont.width = percent(100);
        bottomAxesCont.layout = "vertical";
        bottomAxesCont.zIndex = 1;
        _this.bottomAxesContainer = bottomAxesCont;
        // Create a container for left-side axes
        var leftAxesCont = yAxesAndPlotCont.createChild(Container);
        leftAxesCont.shouldClone = false;
        leftAxesCont.layout = "horizontal";
        leftAxesCont.height = percent(100);
        leftAxesCont.contentAlign = "right";
        leftAxesCont.events.on("transformed", _this.updateXAxesMargins, _this, false);
        leftAxesCont.zIndex = 1;
        _this.leftAxesContainer = leftAxesCont;
        // Create a container for plot area
        var plotCont = yAxesAndPlotCont.createChild(Container);
        plotCont.shouldClone = false;
        plotCont.height = percent(100);
        plotCont.width = percent(100);
        // Create transparend background for plot container so that hover works
        // on all of it
        plotCont.background.fillOpacity = 0;
        _this.plotContainer = plotCont;
        // must go below plot container
        _this.mouseWheelBehavior = "none";
        _this._cursorContainer = plotCont;
        // Create a container for right-side axes
        var rightAxesCont = yAxesAndPlotCont.createChild(Container);
        rightAxesCont.shouldClone = false;
        rightAxesCont.layout = "horizontal";
        rightAxesCont.height = percent(100);
        rightAxesCont.zIndex = 1;
        rightAxesCont.events.on("transformed", _this.updateXAxesMargins, _this, false);
        _this.rightAxesContainer = rightAxesCont;
        _this.seriesContainer.parent = plotCont;
        _this.bulletsContainer.parent = plotCont;
        var zoomOutButton = plotCont.createChild(ZoomOutButton);
        zoomOutButton.shouldClone = false;
        zoomOutButton.align = "right";
        zoomOutButton.valign = "top";
        zoomOutButton.zIndex = Number.MAX_SAFE_INTEGER;
        zoomOutButton.marginTop = 5;
        zoomOutButton.marginRight = 5;
        zoomOutButton.hide(0);
        _this.zoomOutButton = zoomOutButton;
        // Create a container for bullets
        var axisBulletsContainer = _this.plotContainer.createChild(Container);
        axisBulletsContainer.shouldClone = false;
        axisBulletsContainer.width = percent(100);
        axisBulletsContainer.height = percent(100);
        axisBulletsContainer.isMeasured = false;
        axisBulletsContainer.zIndex = 4;
        axisBulletsContainer.layout = "none";
        _this.axisBulletsContainer = axisBulletsContainer;
        _this._bulletMask = _this.plotContainer;
        _this.events.on("beforedatavalidated", function () {
            _this.series.each(function (series) {
                series.dataGrouped = false;
                series._baseInterval = {};
            });
        }, _this, false);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    XYChart.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        this.zoomOutButton.exportable = false;
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("X/Y chart");
        }
    };
    /**
     * Draws the chart.
     *
     * @ignore Exclude from docs
     */
    XYChart.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.seriesContainer.toFront();
        this.bulletsContainer.toFront();
        if (this.maskBullets) {
            this.bulletsContainer.mask = this._bulletMask;
        }
        this.updateSeriesLegend();
    };
    /**
     * Triggers a redrawing of all chart's series.
     *
     * @ignore Exclude from docs
     */
    XYChart.prototype.updatePlotElements = function () {
        $iter.each(this.series.iterator(), function (series) {
            series.invalidate();
        });
    };
    /**
     * Triggers data (re)validation which in turn can cause a redraw of the
     * whole chart or just aprticular series / elements.
     *
     * @ignore Exclude from docs
     */
    XYChart.prototype.validateData = function () {
        // tell axes that data changed
        if (this._parseDataFrom == 0) {
            $iter.each(this.xAxes.iterator(), function (axis) {
                axis.dataChangeUpdate();
            });
            $iter.each(this.yAxes.iterator(), function (axis) {
                axis.dataChangeUpdate();
            });
            $iter.each(this.series.iterator(), function (series) {
                series.dataChangeUpdate();
            });
        }
        _super.prototype.validateData.call(this);
    };
    /**
     * Updates margins for horizontal axes based on settings and available space.
     *
     * @ignore Exclude from docs
     */
    XYChart.prototype.updateXAxesMargins = function () {
        var leftAxesWidth = this.leftAxesContainer.measuredWidth;
        var rightAxesWidth = this.rightAxesContainer.measuredWidth;
        var bottomAxesCont = this.bottomAxesContainer;
        if (bottomAxesCont.paddingLeft != leftAxesWidth || bottomAxesCont.paddingRight != rightAxesWidth) {
            bottomAxesCont.paddingLeft = leftAxesWidth;
            bottomAxesCont.paddingRight = rightAxesWidth;
        }
        var topAxesCont = this.topAxesContainer;
        if (topAxesCont.paddingLeft != leftAxesWidth || topAxesCont.paddingRight != rightAxesWidth) {
            topAxesCont.paddingLeft = leftAxesWidth;
            topAxesCont.paddingRight = rightAxesWidth;
        }
    };
    /**
     * Triggers a re-initialization of this element.
     *
     * Will result in complete redrawing of the element.
     *
     * @ignore Exclude from docs
     */
    XYChart.prototype.reinit = function () {
        _super.prototype.reinit.call(this);
        this.series.each(function (series) {
            series.appeared = false;
        });
    };
    /**
     * Triggers an update on the horizontal axis when one of its properties
     * change.
     *
     * @ignore Exclude from docs
     * @param event An event object
     */
    XYChart.prototype.handleXAxisChange = function (event) {
        this.updateXAxis(event.target);
    };
    /**
     * Triggers an update on the vertical axis when one of its properties
     * change.
     *
     * @ignore Exclude from docs
     * @param event An event object
     */
    XYChart.prototype.handleYAxisChange = function (event) {
        this.updateYAxis(event.target);
    };
    /**
     * Sets up a new horizontal (X) axis when it is added to the chart.
     *
     * @ignore Exclude from docs
     * @param event  Axis insert event
     */
    XYChart.prototype.processXAxis = function (event) {
        var axis = event.newValue;
        axis.chart = this;
        if (!axis.renderer) {
            axis.renderer = new this._axisRendererX();
            axis.renderer.observe(["opposite", "inside", "inversed", "minGridDistance"], this.handleXAxisChange, this, false);
        }
        axis.axisLetter = "X";
        axis.events.on("startendchanged", this.handleXAxisRangeChange, this, false);
        //axis.events.on("endchanged", this.handleXAxisRangeChange, this, false);
        // Although axis does not use data directly, we set dataProvider here
        // (but not add to chart data users) to hold up rendering before data
        // is parsed (system handles this)
        axis.dataProvider = this;
        this.updateXAxis(axis.renderer);
        this.processAxis(axis);
    };
    /**
     * Sets up a new vertical (Y) axis when it is added to the chart.
     *
     * @ignore Exclude from docs
     * @param event Axis insert event
     */
    XYChart.prototype.processYAxis = function (event) {
        var axis = event.newValue;
        axis.chart = this;
        if (!axis.renderer) {
            axis.renderer = new this._axisRendererY();
            axis.renderer.observe(["opposite", "inside", "inversed", "minGridDistance"], this.handleYAxisChange, this, false);
        }
        axis.axisLetter = "Y";
        axis.events.on("startendchanged", this.handleYAxisRangeChange, this, false);
        //axis.events.on("endchanged", this.handleYAxisRangeChange, this, false);
        // Although axis does not use data directly, we set dataProvider here
        // (but not add to chart data users) to hold up rendering before data
        // is parsed (system handles this)
        axis.dataProvider = this;
        this.updateYAxis(axis.renderer);
        this.processAxis(axis);
    };
    /**
     * Updates horizontal (X) scrollbar and other horizontal axis whenever axis'
     * value range changes.
     */
    XYChart.prototype.handleXAxisRangeChange = function () {
        var range = this.getCommonAxisRange(this.xAxes);
        if (this.scrollbarX) {
            this.zoomAxes(this.xAxes, range, true);
        }
        this.toggleZoomOutButton();
        this.updateScrollbar(this.scrollbarX, range);
    };
    /**
     * Shows or hides the Zoom Out button depending on whether the chart is fully
     * zoomed out or not.
     */
    XYChart.prototype.toggleZoomOutButton = function () {
        if (this.zoomOutButton) {
            var show_1 = false;
            $iter.eachContinue(this.xAxes.iterator(), function (axis) {
                if (axis.toggleZoomOutButton) {
                    if (axis.maxZoomCount > 0) {
                        var minZoomFactor = axis.maxZoomFactor / axis.maxZoomCount;
                        if ($math.round(axis.end - axis.start, 3) < 1 / minZoomFactor) {
                            show_1 = true;
                            return false;
                        }
                    }
                    else {
                        if ($math.round(axis.start, 3) > 0 || $math.round(axis.end, 3) < 1) {
                            show_1 = true;
                            return false;
                        }
                    }
                }
                return true;
            });
            $iter.eachContinue(this.yAxes.iterator(), function (axis) {
                if (axis.toggleZoomOutButton) {
                    if (axis.maxZoomCount > 0) {
                        var minZoomFactor = axis.maxZoomFactor / axis.maxZoomCount;
                        if ($math.round(axis.end - axis.start, 3) < 1 / minZoomFactor) {
                            show_1 = true;
                            return false;
                        }
                    }
                    else {
                        if ($math.round(axis.start, 3) > 0 || $math.round(axis.end, 3) < 1) {
                            show_1 = true;
                            return false;
                        }
                    }
                    return true;
                }
            });
            if (!this.seriesAppeared) {
                show_1 = false;
            }
            if (show_1) {
                this.zoomOutButton.show();
            }
            else {
                this.zoomOutButton.hide();
            }
        }
    };
    /**
     * @ignore
     * moved this check to a separate method so that we could override it in TreeMapSeries
     */
    XYChart.prototype.seriesAppeared = function () {
        var appeared = false;
        $iter.each(this.series.iterator(), function (series) {
            if (!series.appeared) {
                appeared = false;
                return false;
            }
        });
        return appeared;
    };
    /**
     * Updates vertical (Y) scrollbar and other horizontal axis whenever axis'
     * value range changes.
     */
    XYChart.prototype.handleYAxisRangeChange = function () {
        var range = this.getCommonAxisRange(this.yAxes);
        if (this.scrollbarY) {
            this.zoomAxes(this.yAxes, range, true);
        }
        this.toggleZoomOutButton();
        this.updateScrollbar(this.scrollbarY, range);
    };
    /**
     * Updates a relative scrollbar whenever data range of the axis changes.
     *
     * @param scrollbar  Scrollbar instance
     * @param range      New data (values) range of the axis
     */
    XYChart.prototype.updateScrollbar = function (scrollbar, range) {
        if (scrollbar) {
            scrollbar.skipRangeEvents();
            scrollbar.start = range.start;
            scrollbar.end = range.end;
        }
    };
    /**
     * Returns a common range of values between a list of axes.
     *
     * This is used to synchronize the zoom between multiple axes.
     *
     * @ignore Exclude from docs
     * @param axes  A list of axes
     * @return Common value range
     */
    XYChart.prototype.getCommonAxisRange = function (axes) {
        var start;
        var end;
        axes.each(function (axis) {
            if (!axis.zoomable || (axis instanceof ValueAxis && axis.syncWithAxis)) {
            }
            else {
                var axisStart = axis.start;
                var axisEnd = axis.end;
                if (axis.renderer.inversed) {
                    axisStart = 1 - axis.end;
                    axisEnd = 1 - axis.start;
                }
                if (!$type.isNumber(start) || (axisStart < start)) {
                    start = axisStart;
                }
                if (!$type.isNumber(end) || (axisEnd > end)) {
                    end = axisEnd;
                }
            }
        });
        return { start: start, end: end };
    };
    /**
     * Triggers (re)rendering of the horizontal (X) axis.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     */
    XYChart.prototype.updateXAxis = function (renderer) {
        var axis = renderer.axis;
        if (renderer.opposite) {
            axis.parent = this.topAxesContainer;
            axis.toFront();
        }
        else {
            axis.parent = this.bottomAxesContainer;
            axis.toBack();
        }
        if (axis.renderer) {
            axis.renderer.processRenderer();
        }
    };
    /**
     * Triggers (re)rendering of the vertical (Y) axis.
     *
     * @ignore Exclude from docs
     * @param axis  Axis
     */
    XYChart.prototype.updateYAxis = function (renderer) {
        var axis = renderer.axis;
        if (renderer.opposite) {
            axis.parent = this.rightAxesContainer;
            axis.toBack();
        }
        else {
            axis.parent = this.leftAxesContainer;
            axis.toFront();
        }
        if (axis.renderer) {
            axis.renderer.processRenderer();
        }
    };
    /**
     * Decorates an Axis for use with this chart, e.g. sets proper renderer
     * and containers for placement.
     *
     * @param axis  Axis
     */
    XYChart.prototype.processAxis = function (axis) {
        var _this = this;
        // Value axis does not use data directly, only category axis does
        if (axis instanceof CategoryAxis) {
            this._dataUsers.moveValue(axis);
        }
        var renderer = axis.renderer;
        renderer.gridContainer.parent = this.plotContainer;
        renderer.gridContainer.toBack();
        renderer.breakContainer.parent = this.plotContainer;
        renderer.breakContainer.toFront();
        renderer.breakContainer.zIndex = 10;
        axis.addDisposer(new Disposer(function () {
            _this.dataUsers.removeValue(axis);
        }));
        renderer.bulletsContainer.parent = this.axisBulletsContainer;
        this._disposers.push(axis.events.on("positionchanged", function () {
            var point = $utils.spritePointToSprite({ x: 0, y: 0 }, axis, _this.axisBulletsContainer);
            if (axis.renderer instanceof AxisRendererY) {
                renderer.bulletsContainer.y = point.y;
            }
            if (axis.renderer instanceof AxisRendererX) {
                renderer.bulletsContainer.x = point.x;
            }
        }, undefined, false));
        this.plotContainer.events.on("maxsizechanged", function () {
            if (_this.inited) {
                axis.invalidateDataItems();
                _this.updateSeriesMasks();
            }
        }, axis, false);
    };
    /**
     * This is done because for some reason IE doesn't change mask if path of a
     * mask changes.
     */
    XYChart.prototype.updateSeriesMasks = function () {
        if ($utils.isIE()) {
            this.series.each(function (series) {
                var mask = series.mainContainer.mask;
                series.mainContainer.mask = undefined;
                series.mainContainer.mask = mask;
            });
        }
    };
    XYChart.prototype.handleSeriesRemoved = function (event) {
        var series = event.oldValue;
        if (series) {
            if (series.xAxis) {
                series.xAxis.series.removeValue(series);
                series.xAxis.invalidateProcessedData();
            }
            if (series.yAxis) {
                series.yAxis.series.removeValue(series);
                series.yAxis.invalidateProcessedData();
            }
            // otherwise extremes won't change
            this.series.each(function (series) {
                series.resetExtremes();
            });
        }
        _super.prototype.handleSeriesRemoved.call(this, event);
    };
    Object.defineProperty(XYChart.prototype, "xAxes", {
        /**
         * A list of horizontal (X) axes.
         *
         * @return List of axes
         */
        get: function () {
            if (!this._xAxes) {
                this._xAxes = new List();
                this._xAxes.events.on("inserted", this.processXAxis, this, false);
                this._xAxes.events.on("removed", this.handleAxisRemoval, this, false);
                this._disposers.push(new ListDisposer(this._xAxes, false));
            }
            return this._xAxes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    XYChart.prototype.handleAxisRemoval = function (event) {
        var axis = event.oldValue;
        this.dataUsers.removeValue(axis); // need to remove, as it might not be disposed
        if (axis.autoDispose) {
            axis.dispose();
        }
    };
    Object.defineProperty(XYChart.prototype, "yAxes", {
        /**
         * A list of vertical (Y) axes.
         *
         * @return List of axes
         */
        get: function () {
            if (!this._yAxes) {
                this._yAxes = new List();
                this._yAxes.events.on("inserted", this.processYAxis, this, false);
                this._yAxes.events.on("removed", this.handleAxisRemoval, this, false);
                this._disposers.push(new ListDisposer(this._yAxes, false));
            }
            return this._yAxes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Decorates a new [[XYSeries]] object with required parameters when it is
     * added to the chart.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    XYChart.prototype.handleSeriesAdded = function (event) {
        try {
            _super.prototype.handleSeriesAdded.call(this, event);
            var series = event.newValue;
            if (this.xAxes.length == 0 || this.yAxes.length == 0) {
                registry.removeFromInvalidComponents(series);
                series.dataInvalid = false;
            }
            $utils.used(series.xAxis); // this is enough to get axis, handled in getter
            $utils.used(series.yAxis); // this is enough to get axis, handled in getter
            series.maskBullets = series.maskBullets;
            if (series.fill == undefined) {
                if (this.patterns) {
                    if (!$type.hasValue(series.stroke)) {
                        series.stroke = this.colors.next();
                    }
                    series.fill = this.patterns.next();
                    if ($type.hasValue(series.fillOpacity)) {
                        series.fill.backgroundOpacity = series.fillOpacity;
                    }
                    if (series.stroke instanceof Color) {
                        series.fill.stroke = series.stroke;
                        series.fill.fill = series.stroke;
                    }
                }
                else {
                    series.fill = this.colors.next();
                }
            }
            if (!$type.hasValue(series.stroke)) {
                series.stroke = series.fill;
            }
        }
        catch (e) {
            this.raiseCriticalError(e);
        }
    };
    Object.defineProperty(XYChart.prototype, "cursor", {
        /**
         * @return Cursor
         */
        get: function () {
            return this._cursor;
        },
        /**
         * Chart's [[Cursor]].
         *
         * @param cursor  Cursor
         */
        set: function (cursor) {
            if (this._cursor != cursor) {
                if (this._cursor) {
                    this.removeDispose(this._cursor);
                }
                this._cursor = cursor;
                if (cursor) {
                    // TODO this is wrong, fix it
                    this._disposers.push(cursor);
                    cursor.chart = this;
                    cursor.shouldClone = false;
                    cursor.parent = this._cursorContainer;
                    cursor.events.on("cursorpositionchanged", this.handleCursorPositionChange, this, false);
                    cursor.events.on("zoomstarted", this.handleCursorZoomStart, this, false);
                    cursor.events.on("zoomended", this.handleCursorZoomEnd, this, false);
                    cursor.events.on("panstarted", this.handleCursorPanStart, this, false);
                    cursor.events.on("panning", this.handleCursorPanning, this, false);
                    cursor.events.on("panended", this.handleCursorPanEnd, this, false);
                    cursor.events.on("behaviorcanceled", this.handleCursorCanceled, this, false);
                    cursor.events.on("hidden", this.handleHideCursor, this, false);
                    cursor.zIndex = Number.MAX_SAFE_INTEGER - 1;
                    if (this.tapToActivate) {
                        // We need this in order to setup cursor properly
                        this.setTapToActivate(this.tapToActivate);
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Performs tasks when the cursor's position changes, e.g. shows proper
     * tooltips on axes and series.
     *
     * @ignore Exclude from docs
     */
    XYChart.prototype.handleCursorPositionChange = function () {
        var cursor = this.cursor;
        if (cursor.visible && !cursor.isHiding) {
            var xPosition_1 = this.cursor.xPosition;
            var yPosition_1 = this.cursor.yPosition;
            this.showSeriesTooltip({
                x: xPosition_1,
                y: yPosition_1
            });
            var exceptAxes_1 = [];
            var snapToSeries = cursor.snapToSeries;
            if (snapToSeries && !cursor.downPoint) {
                if (snapToSeries instanceof XYSeries) {
                    snapToSeries = [snapToSeries];
                }
                var dataItems_1 = [];
                $array.each(snapToSeries, function (snpSeries) {
                    if (!snpSeries.isHidden && !snpSeries.isHiding) {
                        var xAxis = snpSeries.xAxis;
                        var yAxis = snpSeries.yAxis;
                        if (xAxis instanceof ValueAxis && !(xAxis instanceof DateAxis) && yAxis instanceof ValueAxis && !(yAxis instanceof DateAxis)) {
                            snpSeries.dataItems.each(function (dataItem) {
                                dataItems_1.push(dataItem);
                            });
                            $array.move(exceptAxes_1, snpSeries.yAxis);
                            $array.move(exceptAxes_1, snpSeries.xAxis);
                        }
                        else {
                            if (snpSeries.baseAxis == snpSeries.xAxis) {
                                $array.move(exceptAxes_1, snpSeries.yAxis);
                                dataItems_1.push(xAxis.getSeriesDataItem(snpSeries, xAxis.toAxisPosition(xPosition_1), true));
                            }
                            if (snpSeries.baseAxis == snpSeries.yAxis) {
                                $array.move(exceptAxes_1, snpSeries.xAxis);
                                dataItems_1.push(yAxis.getSeriesDataItem(snpSeries, yAxis.toAxisPosition(yPosition_1), true));
                            }
                        }
                    }
                });
                var closestDataItem_1 = this.getClosest(dataItems_1, xPosition_1, yPosition_1);
                if (closestDataItem_1) {
                    this.series.each(function (series) {
                        var closestSeries = closestDataItem_1.component;
                        if (series != closestSeries) {
                            series.hideTooltip();
                            if (series.xAxis != closestSeries.xAxis) {
                                series.xAxis.hideTooltip();
                                exceptAxes_1.push(series.xAxis);
                            }
                            if (series.yAxis != closestSeries.yAxis) {
                                series.yAxis.hideTooltip();
                                exceptAxes_1.push(series.yAxis);
                            }
                        }
                    });
                    closestDataItem_1.component.showTooltipAtDataItem(closestDataItem_1);
                    cursor.handleSnap(closestDataItem_1.component);
                }
            }
            //}
            this._seriesPoints = [];
            if (this._cursorXPosition != xPosition_1) {
                this.showAxisTooltip(this.xAxes, xPosition_1, exceptAxes_1);
            }
            if (this._cursorYPosition != yPosition_1) {
                this.showAxisTooltip(this.yAxes, yPosition_1, exceptAxes_1);
            }
            if (this.arrangeTooltips) {
                this.sortSeriesTooltips(this._seriesPoints);
            }
            if (this.legend) {
                this.legend.afterDraw();
            }
        }
    };
    /**
     * Finds closest data item to position out of the array of items.
     *
     * @since 4.9.29
     * @param   dataItems  Array of items
     * @param              xPosition X position
     * @param              yPosition Y position
     * @return             Data item
     */
    XYChart.prototype.getClosest = function (dataItems, xPosition, yPosition) {
        var minDistance = Infinity;
        var closestDataItem;
        $array.eachContinue(dataItems, function (dataItem) {
            if (dataItem) {
                var xAxis = dataItem.component.xAxis;
                var yAxis = dataItem.component.yAxis;
                var xPos = xAxis.positionToCoordinate(xAxis.toGlobalPosition(xAxis.toAxisPosition(xPosition)));
                var yPos = yAxis.positionToCoordinate(yAxis.toGlobalPosition(yAxis.toAxisPosition(yPosition)));
                var xField = dataItem.component.xField;
                var yField = dataItem.component.yField;
                if (xAxis instanceof ValueAxis && !$type.isNumber(dataItem.getValue(xField))) {
                    return true;
                }
                if (yAxis instanceof ValueAxis && !$type.isNumber(dataItem.getValue(yField))) {
                    return true;
                }
                var dxPosition = xAxis.positionToCoordinate(xAxis.toGlobalPosition(xAxis.getPositionX(dataItem, xField, dataItem.locations[xField], "valueX")));
                var dyPosition = yAxis.positionToCoordinate(yAxis.toGlobalPosition(yAxis.getPositionY(dataItem, yField, dataItem.locations[yField], "valueY")));
                var distance = Math.sqrt(Math.pow(xPos - dxPosition, 2) + Math.pow(yPos - dyPosition, 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    closestDataItem = dataItem;
                }
                return true;
            }
        });
        return closestDataItem;
    };
    /**
     * Hides all cursor-related tooltips when the cursor itself is hidden.
     *
     * @ignore Exclude from docs
     */
    XYChart.prototype.handleHideCursor = function () {
        this.hideObjectTooltip(this.xAxes);
        this.hideObjectTooltip(this.yAxes);
        this.hideObjectTooltip(this.series);
        this._cursorXPosition = undefined;
        this._cursorYPosition = undefined;
        this.updateSeriesLegend();
    };
    /**
     * Updates values for each series' legend item.
     *
     * @ignore Exclude from docs
     */
    XYChart.prototype.updateSeriesLegend = function () {
        $iter.each(this.series.iterator(), function (series) {
            series.updateLegendValue();
        });
    };
    /**
     * Hides a tooltip for a list of objects.
     *
     * @ignore Exclude from docs
     * @param sprites  A list of sprites to hide tooltip for
     */
    XYChart.prototype.hideObjectTooltip = function (sprites) {
        $iter.each(sprites.iterator(), function (sprite) {
            if (sprite.cursorTooltipEnabled) {
                sprite.hideTooltip(0);
            }
        });
    };
    /**
     * Shows a tooltip for all chart's series, using specific coordinates as a
     * reference point.
     *
     * The tooltip might be shown at different coordinates depending on the
     * actual data point's position, overlapping with other tooltips, etc.
     *
     * @ignore Exclude from docs
     * @param position  Reference point
     */
    XYChart.prototype.showSeriesTooltip = function (position) {
        var _this = this;
        if (!position) {
            this.series.each(function (series) {
                series.hideTooltip();
            });
            return;
        }
        var seriesPoints = [];
        this.series.each(function (series) {
            //if (series.tooltipText || series.tooltipHTML) { // not good, bullets are not hovered then
            if ((series.xAxis instanceof DateAxis && series.xAxis.snapTooltip) || (series.yAxis instanceof DateAxis && series.yAxis.snapTooltip)) {
                // void
            }
            else {
                var point = series.showTooltipAtPosition(position.x, position.y);
                if (point) {
                    series.tooltip.setBounds($utils.spriteRectToSvg({ x: 0, y: 0, width: _this.pixelWidth, height: _this.pixelHeight }, _this));
                    seriesPoints.push({ series: series, point: point });
                }
            }
            //}
        });
        if (this.arrangeTooltips) {
            this.sortSeriesTooltips(seriesPoints);
        }
    };
    /**
     * @ignore
     */
    XYChart.prototype.sortSeriesTooltips = function (seriesPoints) {
        if (seriesPoints.length > 0) {
            var cursor_1 = this.cursor;
            if (cursor_1 && $type.isNumber(cursor_1.maxTooltipDistance)) {
                var cursorPoint_1 = $utils.spritePointToSvg({ x: cursor_1.point.x, y: cursor_1.point.y }, cursor_1);
                var nearestSeries_1;
                var nearestPoint_1;
                var smallestDistance_1 = Infinity;
                $array.each(seriesPoints, function (seriesPoint) {
                    var series = seriesPoint.series;
                    var fixedPoint = seriesPoint.point;
                    if (fixedPoint) {
                        var point = { x: fixedPoint.x, y: fixedPoint.y };
                        var distance = Math.abs($math.getDistance(point, cursorPoint_1));
                        if (distance < smallestDistance_1) {
                            nearestPoint_1 = point;
                            smallestDistance_1 = distance;
                            nearestSeries_1 = series;
                        }
                    }
                });
                var newSeriesPoints_1 = [];
                if (nearestSeries_1) {
                    $array.each(seriesPoints, function (seriesPoint) {
                        if (Math.abs($math.getDistance(seriesPoint.point, nearestPoint_1)) <= Math.abs(cursor_1.maxTooltipDistance)) {
                            newSeriesPoints_1.push({ series: seriesPoint.series, point: seriesPoint.point });
                        }
                        else {
                            var tooltipDataItem = seriesPoint.series.tooltipDataItem;
                            if (tooltipDataItem) {
                                $array.each(tooltipDataItem.sprites, function (sprite) {
                                    sprite.isHover = false;
                                    sprite.handleOutReal(); // to avoid flicker
                                });
                            }
                            seriesPoint.series.hideTooltip(0);
                        }
                    });
                    if (cursor_1.maxTooltipDistance < 0) {
                        if (newSeriesPoints_1.length > 0) {
                            $array.each(newSeriesPoints_1, function (np) {
                                if (nearestSeries_1 != np.series) {
                                    np.series.hideTooltip(0);
                                }
                            });
                        }
                        newSeriesPoints_1 = [{ series: nearestSeries_1, point: nearestPoint_1 }];
                    }
                }
                seriesPoints = newSeriesPoints_1;
            }
            var topLeft_1 = $utils.spritePointToSvg({ x: -0.5, y: -0.5 }, this.plotContainer);
            var bottomRight_1 = $utils.spritePointToSvg({ x: this.plotContainer.pixelWidth + 0.5, y: this.plotContainer.pixelHeight + 0.5 }, this.plotContainer);
            var sum_1 = 0;
            var filteredSeriesPoints_1 = [];
            $array.each(seriesPoints, function (seriesPoint) {
                var point = seriesPoint.point;
                if (point && $math.isInRectangle(point, { x: topLeft_1.x, y: topLeft_1.y, width: bottomRight_1.x - topLeft_1.x, height: bottomRight_1.y - topLeft_1.y })) {
                    filteredSeriesPoints_1.push({ point: point, series: seriesPoint.series });
                    sum_1 += point.y;
                }
            });
            seriesPoints = filteredSeriesPoints_1;
            var firstSeries = this.series.getIndex(0);
            var inversed = false;
            if (firstSeries && firstSeries.yAxis && firstSeries.yAxis.renderer.inversed) {
                inversed = true;
            }
            if (inversed) {
                seriesPoints.sort(function (a, b) { return $number.order(a.point.y, b.point.y); });
            }
            else {
                seriesPoints.sort(function (a, b) { return $number.order(b.point.y, a.point.y); });
                seriesPoints.reverse();
            }
            var averageY = sum_1 / seriesPoints.length;
            var maxY = $utils.svgPointToDocument({ x: 0, y: 0 }, this.svgContainer.SVGContainer).y;
            if (seriesPoints.length > 0) {
                var top_1 = topLeft_1.y;
                var bottom = bottomRight_1.y;
                // TODO is this needed ?
                $utils.spritePointToDocument({ x: 0, y: top_1 }, this);
                var dropped = false;
                if (averageY > top_1 + (bottom - top_1) / 2) {
                    var nextHeight = bottom;
                    for (var i = seriesPoints.length - 1; i >= 0; i--) {
                        var series = seriesPoints[i].series;
                        var tooltip = series.tooltip;
                        var pointY = seriesPoints[i].point.y;
                        tooltip.setBounds({ x: 0, y: -maxY, width: this.pixelWidth, height: nextHeight + maxY });
                        if (tooltip.invalid) {
                            tooltip.validate();
                        }
                        tooltip.toBack();
                        nextHeight = $utils.spritePointToSvg({ x: 0, y: tooltip.label.pixelY - tooltip.pixelY + pointY - tooltip.pixelMarginTop }, tooltip).y;
                        if (nextHeight < -maxY) {
                            dropped = true;
                            break;
                        }
                    }
                }
                if (averageY <= top_1 + (bottom - top_1) / 2 || dropped) {
                    var nextY = top_1;
                    for (var i = 0, len = seriesPoints.length; i < len; i++) {
                        var series = seriesPoints[i].series;
                        var pointY = seriesPoints[i].point.y;
                        var tooltip = series.tooltip;
                        tooltip.setBounds({ x: 0, y: nextY, width: this.pixelWidth, height: bottom });
                        if (tooltip.invalid) {
                            tooltip.validate();
                        }
                        tooltip.toBack();
                        nextY = $utils.spritePointToSvg({ x: 0, y: tooltip.label.pixelY + tooltip.label.measuredHeight - tooltip.pixelY + pointY + tooltip.pixelMarginBottom }, tooltip).y;
                    }
                }
            }
        }
    };
    /**
     * Shows tooltips for a list of axes at specific position.
     *
     * Position might be X coordinate for horizontal axes, and Y coordinate for
     * vertical axes.
     *
     * @ignore Exclude from docs
     * @param axes      List of axes to show tooltip on
     * @param position  Position (px)
     */
    XYChart.prototype.showAxisTooltip = function (axes, position, except) {
        var _this = this;
        $iter.each(axes.iterator(), function (axis) {
            if (!except || except.indexOf(axis) == -1) {
                if (_this.dataItems.length > 0 || axis.dataItems.length > 0) {
                    axis.showTooltipAtPosition(position);
                }
            }
        });
    };
    /**
     * Recalculates the value range for the axis taking into account zoom level & inversed.
     *
     * @param axis   Axis
     * @param range  Range
     * @return Modified range
     */
    XYChart.prototype.getUpdatedRange = function (axis, range) {
        if (!axis) {
            return;
        }
        var start;
        var end;
        var inversed = axis.renderer.inversed;
        if (inversed) {
            $math.invertRange(range);
            start = 1 - axis.end;
            end = 1 - axis.start;
        }
        else {
            start = axis.start;
            end = axis.end;
        }
        var difference = end - start;
        return {
            start: start + range.start * difference,
            end: start + range.end * difference
        };
    };
    /**
     * Performs zoom and other operations when user finishes zooming using chart
     * cursor, e.g. zooms axes.
     *
     * @param event Cursor's event
     */
    XYChart.prototype.handleCursorZoomEnd = function (event) {
        var cursor = this.cursor;
        var behavior = cursor.behavior;
        if (behavior == "zoomX" || behavior == "zoomXY") {
            var xRange = cursor.xRange;
            if (xRange && this.xAxes.length > 0) {
                xRange = this.getUpdatedRange(this.xAxes.getIndex(0), xRange);
                xRange.priority = "start";
                this.zoomAxes(this.xAxes, xRange);
            }
        }
        if (behavior == "zoomY" || behavior == "zoomXY") {
            var yRange = cursor.yRange;
            if (yRange && this.yAxes.length > 0) {
                yRange = this.getUpdatedRange(this.yAxes.getIndex(0), yRange);
                yRange.priority = "start";
                this.zoomAxes(this.yAxes, yRange);
            }
        }
        this.handleHideCursor();
    };
    /**
     * Performs zoom and other operations when user is panning chart plot using chart cursor.
     *
     * @param event Cursor's event
     */
    XYChart.prototype.handleCursorPanStart = function (event) {
        var xAxis = this.xAxes.getIndex(0);
        if (xAxis) {
            this._panStartXRange = { start: xAxis.start, end: xAxis.end };
            if (xAxis.renderer.inversed) {
                this._panStartXRange = $math.invertRange(this._panStartXRange);
            }
        }
        var yAxis = this.yAxes.getIndex(0);
        if (yAxis) {
            this._panStartYRange = { start: yAxis.start, end: yAxis.end };
            if (yAxis.renderer.inversed) {
                this._panStartYRange = $math.invertRange(this._panStartYRange);
            }
        }
    };
    /**
     * Performs zoom and other operations when user ends panning
     *
     * @param event Cursor's event
     */
    XYChart.prototype.handleCursorPanEnd = function (event) {
        var cursor = this.cursor;
        var behavior = cursor.behavior;
        if (this._panEndXRange && (behavior == "panX" || behavior == "panXY")) {
            var panEndRange = this._panEndXRange;
            var panStartRange = this._panStartXRange;
            var delta = 0;
            if (panEndRange.start < 0) {
                delta = panEndRange.start;
            }
            if (panStartRange.end > 1) {
                if (panEndRange.end > panStartRange.end) {
                    delta = panEndRange.end - panStartRange.end;
                }
            }
            else if (panEndRange.end > 1) {
                delta = panEndRange.end - 1;
            }
            this.zoomAxes(this.xAxes, { start: panEndRange.start - delta, end: panEndRange.end - delta }, false, cursor.snapOnPan);
            this._panEndXRange = undefined;
            this._panStartXRange = undefined;
        }
        if (this._panEndYRange && (behavior == "panY" || behavior == "panXY")) {
            var panEndRange = this._panEndYRange;
            var delta = 0;
            if (panEndRange.start < 0) {
                delta = panEndRange.start;
            }
            if (panEndRange.end > 1) {
                delta = panEndRange.end - 1;
            }
            this.zoomAxes(this.yAxes, { start: panEndRange.start - delta, end: panEndRange.end - delta }, false, cursor.snapOnPan);
            this._panEndYRange = undefined;
            this._panStartYRange = undefined;
        }
    };
    XYChart.prototype.handleCursorCanceled = function () {
        this._panEndXRange = undefined;
        this._panStartXRange = undefined;
    };
    /**
     * Performs zoom and other operations when user is panning chart plot using chart cursor.
     *
     * @param event Cursor's event
     */
    XYChart.prototype.handleCursorPanning = function (event) {
        var cursor = this.cursor;
        var behavior = cursor.behavior;
        var maxPanOut = cursor.maxPanOut;
        if (this._panStartXRange && (behavior == "panX" || behavior == "panXY")) {
            var panStartRange = this._panStartXRange;
            var range = cursor.xRange;
            var axisRange = this.getCommonAxisRange(this.xAxes);
            var difference = (panStartRange.end - panStartRange.start);
            var delta = range.start * (axisRange.end - axisRange.start);
            var newStart = Math.max(-maxPanOut, delta + panStartRange.start);
            var newEnd = Math.min(delta + panStartRange.end, 1 + maxPanOut);
            if (newStart <= 0) {
                newEnd = newStart + difference;
            }
            if (newEnd >= 1) {
                newStart = newEnd - difference;
            }
            var newRange = {
                start: newStart,
                end: newEnd
            };
            this._panEndXRange = newRange;
            this.zoomAxes(this.xAxes, newRange, false, false, cursor.maxPanOut);
        }
        if (this._panStartYRange && (behavior == "panY" || behavior == "panXY")) {
            var panStartRange = this._panStartYRange;
            var range = cursor.yRange;
            var axisRange = this.getCommonAxisRange(this.yAxes);
            var difference = panStartRange.end - panStartRange.start;
            var delta = range.start * (axisRange.end - axisRange.start);
            var newStart = Math.max(-maxPanOut, delta + panStartRange.start);
            var newEnd = Math.min(delta + panStartRange.end, 1 + maxPanOut);
            if (newStart <= 0) {
                newEnd = newStart + difference;
            }
            if (newEnd >= 1) {
                newStart = newEnd - difference;
            }
            var newRange = {
                start: newStart,
                end: newEnd
            };
            this._panEndYRange = newRange;
            this.zoomAxes(this.yAxes, newRange, false, false, cursor.maxPanOut);
        }
        this.handleHideCursor();
    };
    /**
     * @ignore
     */
    XYChart.prototype.handleYAxisSet = function (series) {
    };
    /**
     * Performs zoom and other operations when user starts zooming using chart
     * cursor, e.g. zooms axes.
     *
     * @param event Cursor's event
     */
    XYChart.prototype.handleCursorZoomStart = function (event) {
        // Nothing here
        // This method is here only as a "placeholder" for extending classes to
        // override if necessary
    };
    Object.defineProperty(XYChart.prototype, "scrollbarX", {
        /**
         * @return Scrollbar
         */
        get: function () {
            return this._scrollbarX;
        },
        /**
         * Horizontal (X) scrollbar.
         *
         * @param scrollbar Scrollbar
         */
        set: function (scrollbar) {
            var _this = this;
            if (this._scrollbarX) {
                this.removeDispose(this._scrollbarX);
            }
            this._scrollbarX = scrollbar;
            if (scrollbar) {
                this._disposers.push(scrollbar);
                scrollbar.parent = this.topAxesContainer;
                scrollbar.shouldClone = false;
                scrollbar.startGrip.exportable = false;
                scrollbar.endGrip.exportable = false;
                scrollbar.toBack();
                scrollbar.orientation = "horizontal";
                scrollbar.events.on("rangechanged", this.handleXScrollbarChange, this, false);
                this.events.on("datavalidated", function () { return scrollbar.updateThumb(false); }, this, false);
                // accessibility related
                scrollbar.adapter.add("positionValue", function (arg) {
                    var xAxis = _this.xAxes.getIndex(0);
                    if (xAxis) {
                        arg.value = xAxis.getPositionLabel(xAxis.renderer.inversed
                            ? 1 - arg.position
                            : arg.position);
                    }
                    return arg;
                });
                scrollbar.adapter.add("positionValueDirection", function (arg) {
                    var xAxis = _this.xAxes.getIndex(0);
                    if (xAxis) {
                        arg.flipped = xAxis.renderer.inversed;
                    }
                    return arg;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYChart.prototype, "scrollbarY", {
        /**
         * @return Scrollbar
         */
        get: function () {
            return this._scrollbarY;
        },
        /**
         * Vertical (Y) scrollbar.
         *
         * @param scrollbar Scrollbar
         */
        set: function (scrollbar) {
            var _this = this;
            if (this._scrollbarY) {
                this.removeDispose(this._scrollbarY);
            }
            this._scrollbarY = scrollbar;
            if (scrollbar) {
                this._disposers.push(scrollbar);
                scrollbar.parent = this.rightAxesContainer;
                scrollbar.startGrip.exportable = false;
                scrollbar.shouldClone = false;
                scrollbar.endGrip.exportable = false;
                scrollbar.toFront();
                scrollbar.orientation = "vertical";
                scrollbar.events.on("rangechanged", this.handleYScrollbarChange, this, false);
                this.events.on("datavalidated", function () { return scrollbar.updateThumb(false); }, this, false);
                // accessibility related
                scrollbar.adapter.add("positionValue", function (arg) {
                    var yAxis = _this.yAxes.getIndex(0);
                    if (yAxis) {
                        arg.value = yAxis.getPositionLabel(yAxis.renderer.inversed ? arg.position : 1 - arg.position);
                    }
                    return arg;
                });
                scrollbar.adapter.add("positionValueDirection", function (arg) {
                    var yAxis = _this.yAxes.getIndex(0);
                    if (yAxis) {
                        arg.flipped = !yAxis.renderer.inversed;
                    }
                    return arg;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Zooms axes affected by the horizontal (X) scrollbar when the selection
     * on it changes.
     *
     * @param event Scrollbar range change event
     */
    XYChart.prototype.handleXScrollbarChange = function (event) {
        if (this.inited) {
            var scrollbar = event.target;
            var range = scrollbar.range;
            if (range.start == 0) {
                range.priority = "start";
            }
            if (range.end == 1) {
                range.priority = "end";
            }
            range = this.zoomAxes(this.xAxes, range);
            scrollbar.fixRange(range);
        }
    };
    /**
     * Zooms axes affected by the vertical (Y) scrollbar when the selection
     * on it changes.
     *
     * @param event Scrollbar range change event
     */
    XYChart.prototype.handleYScrollbarChange = function (event) {
        if (this.inited) {
            var scrollbar = event.target;
            var range = scrollbar.range;
            if (range.end == 1) {
                range.priority = "end";
            }
            if (range.start == 0) {
                range.priority = "start";
            }
            range = this.zoomAxes(this.yAxes, range);
            scrollbar.fixRange(range);
        }
    };
    /**
     * Zooms axes that are affected by to specific relative range.
     *
     * @param axes       List of axes to zoom
     * @param range      Range of values to zoom to (0-1)
     * @param instantly  If set to `true` will skip zooming animation
     * @return Recalculated range that is common to all involved axes
     */
    XYChart.prototype.zoomAxes = function (axes, range, instantly, round, declination, stop) {
        var realRange = { start: 0, end: 1 };
        this.showSeriesTooltip(); // hides
        var originalRange = range;
        if (!this.dataInvalid) {
            $iter.each(axes.iterator(), function (axis) {
                var maxZoomFactor = axis.maxZoomFactor;
                if ($type.isNumber(axis.minZoomCount)) {
                    maxZoomFactor = maxZoomFactor / axis.minZoomCount;
                }
                if (stop && 1 / (range.end - range.start) >= maxZoomFactor) {
                    // void
                }
                else {
                    if (axis.zoomable) {
                        if (axis.renderer.inversed) {
                            range = $math.invertRange(originalRange);
                        }
                        else {
                            range = originalRange;
                        }
                        axis.hideTooltip(0);
                        if (round) {
                            //let diff = range.end - range.start;
                            if (axis instanceof CategoryAxis) {
                                var cellWidth = axis.getCellEndPosition(0) - axis.getCellStartPosition(0);
                                range.start = axis.roundPosition(range.start + cellWidth / 2 - (axis.startLocation) * cellWidth, axis.startLocation);
                                range.end = axis.roundPosition(range.end - cellWidth / 2 + (1 - axis.endLocation) * cellWidth, axis.endLocation);
                            }
                            else {
                                var d = 0.0001;
                                range.start = axis.roundPosition(range.start + d, 0, axis.startLocation);
                                range.end = axis.roundPosition(range.end + d, 0, axis.endLocation);
                            }
                        }
                        var axisRange = axis.zoom(range, instantly, instantly, declination);
                        if (axis.renderer.inversed) {
                            axisRange = $math.invertRange(axisRange);
                        }
                        realRange = axisRange;
                    }
                }
            });
        }
        return realRange;
    };
    Object.defineProperty(XYChart.prototype, "maskBullets", {
        /**
         * @return Mask bullet container?
         */
        get: function () {
            return this.getPropertyValue("maskBullets");
        },
        /**
         * Indicates if bullet container is masked.
         *
         * If it is set to `true`, any bullets that do not fit into bullet container
         * will be clipped off. Settting to `false` will allow bullets to "spill out"
         * of the plot area so they are not cut off.
         *
         * @param value Mask bullet container?
         */
        set: function (value) {
            if (this.setPropertyValue("maskBullets", value, true) && this.bulletsContainer) {
                if (value) {
                    this.bulletsContainer.mask = this._bulletMask;
                }
                else {
                    this.bulletsContainer.mask = undefined;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYChart.prototype, "arrangeTooltips", {
        /**
         * @return Arrange tooltips?
         */
        get: function () {
            return this.getPropertyValue("arrangeTooltips");
        },
        /**
         * Indicates if chart should arrange series tooltips so that they would not
         * overlap.
         *
         * If set to `true` (default), the chart will adjust vertical positions of
         * all simultaneously shown tooltips to avoid overlapping.
         *
         * However, if you have a vertically-arranged chart, it might not make sense,
         * because tooltips would most probably not be aligned horizontally. In this
         * case it would probably be a good idea to set this setting to `false`.
         *
         * @default true
         * @param value Arrange tooltips?
         */
        set: function (value) {
            this.setPropertyValue("arrangeTooltips", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handles mouse wheel event.
     *
     * @param event  Original event
     */
    XYChart.prototype.handleWheel = function (event) {
        var plotContainer = this.plotContainer;
        var svgPoint = $utils.documentPointToSvg(event.point, this.htmlContainer, this.svgContainer.cssScale);
        var plotPoint = $utils.svgPointToSprite(svgPoint, plotContainer);
        var shift = event.shift.y;
        this.handleWheelReal(shift, this.mouseWheelBehavior, plotPoint);
    };
    /**
     * Handles mouse wheel event.
     *
     * @param event  Original event
     */
    XYChart.prototype.handleHorizontalWheel = function (event) {
        var plotContainer = this.plotContainer;
        var svgPoint = $utils.documentPointToSvg(event.point, this.htmlContainer, this.svgContainer.cssScale);
        var plotPoint = $utils.svgPointToSprite(svgPoint, plotContainer);
        this.handleWheelReal(event.shift.x, this.horizontalMouseWheelBehavior, plotPoint);
    };
    /**
     * @ignore
     */
    XYChart.prototype.handleWheelReal = function (shift, mouseWheelBehavior, plotPoint) {
        if (shift != 0) {
            var plotContainer = this.plotContainer;
            var rangeX = this.getCommonAxisRange(this.xAxes);
            var rangeY = this.getCommonAxisRange(this.yAxes);
            var shiftStep = .1;
            var maxPanOut = 0;
            if (mouseWheelBehavior == "panX" || mouseWheelBehavior == "panXY") {
                var xAxis = this.xAxes.getIndex(0);
                var round = false;
                var singleItemStep = shiftStep;
                if (xAxis instanceof CategoryAxis) {
                    singleItemStep = .5 / ((rangeX.end - rangeX.start) * xAxis.dataItems.length);
                    round = true;
                }
                shiftStep = Math.max(0.2, singleItemStep);
                var differenceX = rangeX.end - rangeX.start;
                var newStartX = Math.max(-maxPanOut, rangeX.start + shiftStep * shift / 100 * (rangeX.end - rangeX.start));
                var newEndX = Math.min(rangeX.end + shiftStep * shift / 100 * (rangeX.end - rangeX.start), 1 + maxPanOut);
                if (newStartX <= 0) {
                    newEndX = newStartX + differenceX;
                }
                if (newEndX >= 1) {
                    newStartX = newEndX - differenceX;
                }
                this.zoomAxes(this.xAxes, { start: newStartX, end: newEndX }, undefined, round);
            }
            if (mouseWheelBehavior == "panY" || mouseWheelBehavior == "panXY") {
                var yAxis = this.yAxes.getIndex(0);
                var singleItemStep = shiftStep;
                var round = false;
                if (yAxis instanceof CategoryAxis) {
                    singleItemStep = .5 / ((rangeX.end - rangeX.start) * yAxis.dataItems.length);
                    round = true;
                }
                shiftStep = Math.max(0.2, singleItemStep);
                shift *= -1;
                var differenceY = rangeY.end - rangeY.start;
                var newStartY = Math.max(-maxPanOut, rangeY.start + shiftStep * shift / 100 * (rangeY.end - rangeY.start));
                var newEndY = Math.min(rangeY.end + shiftStep * shift / 100 * (rangeY.end - rangeY.start), 1 + maxPanOut);
                if (newStartY <= 0) {
                    newEndY = newStartY + differenceY;
                }
                if (newEndY >= 1) {
                    newStartY = newEndY - differenceY;
                }
                this.zoomAxes(this.yAxes, { start: newStartY, end: newEndY }, undefined, round);
            }
            if (mouseWheelBehavior == "zoomX" || mouseWheelBehavior == "zoomXY") {
                var locationX = plotPoint.x / plotContainer.maxWidth;
                var location2X = this.xAxes.getIndex(0).toAxisPosition(locationX);
                var newStartX = Math.max(-maxPanOut, rangeX.start - shiftStep * (rangeX.end - rangeX.start) * shift / 100 * locationX);
                newStartX = Math.min(newStartX, location2X);
                var newEndX = Math.min(rangeX.end + shiftStep * (rangeX.end - rangeX.start) * shift / 100 * (1 - locationX), 1 + maxPanOut);
                newEndX = Math.max(newEndX, location2X);
                this.zoomAxes(this.xAxes, { start: newStartX, end: newEndX }, undefined);
            }
            if (mouseWheelBehavior == "zoomY" || mouseWheelBehavior == "zoomXY") {
                var locationY = plotPoint.y / plotContainer.maxHeight;
                var location2Y = this.yAxes.getIndex(0).toAxisPosition(locationY);
                var newStartY = Math.max(-maxPanOut, rangeY.start - shiftStep * (rangeY.end - rangeY.start) * shift / 100 * (1 - locationY));
                newStartY = Math.min(newStartY, location2Y);
                var newEndY = Math.min(rangeY.end + shiftStep * shift / 100 * locationY * (rangeY.end - rangeY.start), 1 + maxPanOut);
                newEndY = Math.max(newEndY, location2Y);
                this.zoomAxes(this.yAxes, { start: newStartY, end: newEndY }, undefined);
            }
        }
    };
    Object.defineProperty(XYChart.prototype, "mouseWheelBehavior", {
        /**
         * @return Mouse wheel behavior
         */
        get: function () {
            return this.getPropertyValue("mouseWheelBehavior");
        },
        /**
         * Specifies action for when mouse wheel is used when over the chart.
         *
         * Options: Options: `"zoomX"`, `"zoomY"`, `"zoomXY"`, `"panX"`, `"panY"`,`"panXY"`, `"none"` (default).
         *
         * You can control sensitivity of wheel zooming via `mouseOptions`.
         *
         * @default "none"
         * @see {@link https://www.amcharts.com/docs/v4/reference/sprite/#mouseOptions_property} More information about `mouseOptions`
         * @param mouse wheel behavior
         */
        set: function (value) {
            if (this.setPropertyValue("mouseWheelBehavior", value)) {
                if (value != "none") {
                    this._mouseWheelDisposer = this.plotContainer.events.on("wheel", this.handleWheel, this, false);
                    this._disposers.push(this._mouseWheelDisposer);
                }
                else {
                    if (this._mouseWheelDisposer) {
                        this.plotContainer.wheelable = false;
                        this.plotContainer.hoverable = false;
                        this._mouseWheelDisposer.dispose();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XYChart.prototype, "horizontalMouseWheelBehavior", {
        /**
         * @return Horizontal mouse wheel behavior
         */
        get: function () {
            return this.getPropertyValue("horizontalMouseWheelBehavior");
        },
        /**
         * Specifies action for when horizontal mouse wheel is used when over the chart.
         *
         * Options: Options: `"zoomX"`, `"zoomY"`, `"zoomXY"`, `"panX"`, `"panY"`, `"panXY"`, `"none"` (default).
         *
         * @default "none"
         * @see {@link https://www.amcharts.com/docs/v4/reference/sprite/#mouseOptions_property} More information about `mouseOptions`
         * @param mouse wheel behavior
         */
        set: function (value) {
            if (this.setPropertyValue("horizontalMouseWheelBehavior", value)) {
                if (value != "none") {
                    this._mouseWheelDisposer2 = this.plotContainer.events.on("wheel", this.handleHorizontalWheel, this, false);
                    this._disposers.push(this._mouseWheelDisposer2);
                }
                else {
                    if (this._mouseWheelDisposer2) {
                        this.plotContainer.wheelable = false;
                        this.plotContainer.hoverable = false;
                        this._mouseWheelDisposer2.dispose();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This function is called by the [[DataSource]]'s `dateFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-specific data fields so they are parsed properly.
     *
     * @param fields  Array of date fields
     * @return Array of date fields populated with chart's date fields
     */
    XYChart.prototype.dataSourceDateFields = function (fields) {
        var _this = this;
        // Process parent
        fields = _super.prototype.dataSourceDateFields.call(this, fields);
        // Check if we have any series with date-fields
        $iter.each(this.series.iterator(), function (series) {
            fields = _this.populateDataSourceFields(fields, series.dataFields, ["dateX", "dateY", "openDateX", "openDateY"]);
        });
        return fields;
    };
    /**
     * This function is called by the [[DataSource]]'s `numberFields` adapater
     * so that particular chart types can popuplate this setting with their
     * own type-specific data fields so they are parsed properly.
     *
     * @param value  Array of number fields
     * @return Array of number fields populated with chart's number fields
     */
    XYChart.prototype.dataSourceNumberFields = function (fields) {
        var _this = this;
        fields = _super.prototype.dataSourceDateFields.call(this, fields);
        // Check if we have any series with date-fields
        $iter.each(this.series.iterator(), function (series) {
            fields = _this.populateDataSourceFields(fields, series.dataFields, ["valueX", "valueY", "openValueX", "openValueY"]);
        });
        return fields;
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    XYChart.prototype.processConfig = function (config) {
        if (config) {
            // Save axis ranges for later processing
            var xAxes = [];
            var yAxes = [];
            // Set up axes
            if ($type.hasValue(config.xAxes) && $type.isArray(config.xAxes)) {
                for (var i = 0, len = config.xAxes.length; i < len; i++) {
                    if (!config.xAxes[i].type) {
                        throw Error("[XYChart error] No type set for xAxes[" + i + "].");
                    }
                    else if ($type.hasValue(config.xAxes[i]["axisRanges"])) {
                        // Maybe convert string dates?
                        for (var x = 0, len_1 = config.xAxes[i]["axisRanges"].length; x < len_1; x++) {
                            var range = config.xAxes[i]["axisRanges"][x];
                            if ($type.hasValue(range.date) && $type.isString(range.date)) {
                                range.date = this.dateFormatter.parse(range.date);
                            }
                            if ($type.hasValue(range.endDate) && $type.isString(range.endDate)) {
                                range.endDate = this.dateFormatter.parse(range.endDate);
                            }
                        }
                        xAxes.push({
                            axisRanges: config.xAxes[i]["axisRanges"],
                            index: i
                        });
                        delete (config.xAxes[i]["axisRanges"]);
                    }
                }
            }
            if ($type.hasValue(config.yAxes) && $type.isArray(config.yAxes)) {
                for (var i = 0, len = config.yAxes.length; i < len; i++) {
                    if (!config.yAxes[i].type) {
                        throw Error("[XYChart error] No type set for yAxes[" + i + "].");
                    }
                    else if ($type.hasValue(config.yAxes[i]["axisRanges"])) {
                        // Maybe convert string dates?
                        for (var x = 0, len_2 = config.yAxes[i]["axisRanges"].length; x < len_2; x++) {
                            var range = config.yAxes[i]["axisRanges"][x];
                            if ($type.hasValue(range.date) && $type.isString(range.date)) {
                                range.date = this.dateFormatter.parse(range.date);
                            }
                            if ($type.hasValue(range.endDate) && $type.isString(range.endDate)) {
                                range.endDate = this.dateFormatter.parse(range.endDate);
                            }
                        }
                        yAxes.push({
                            axisRanges: config.yAxes[i]["axisRanges"],
                            index: i
                        });
                        delete (config.yAxes[i]["axisRanges"]);
                    }
                }
            }
            // Set up series
            if ($type.hasValue(config.series) && $type.isArray(config.series)) {
                for (var i = 0, len = config.series.length; i < len; i++) {
                    config.series[i].type = config.series[i].type || "LineSeries";
                }
            }
            // Set up cursor
            if ($type.hasValue(config.cursor) && !$type.hasValue(config.cursor.type)) {
                config.cursor.type = "XYCursor";
            }
            // Set up scrollbars
            if ($type.hasValue(config.scrollbarX) && !$type.hasValue(config.scrollbarX.type)) {
                config.scrollbarX.type = "Scrollbar";
            }
            if ($type.hasValue(config.scrollbarY) && !$type.hasValue(config.scrollbarY.type)) {
                config.scrollbarY.type = "Scrollbar";
            }
            _super.prototype.processConfig.call(this, config);
            // Finish up with ranges.
            // We need to do this here because series are processed last in JSON
            // config. Therefore their respective objects are not yet are available
            // when axis (and respectively their ranges) are being processed.
            if (yAxes.length) {
                for (var i = 0, len = yAxes.length; i < len; i++) {
                    this.yAxes.getIndex(yAxes[i].index).config = {
                        axisRanges: yAxes[i].axisRanges
                    };
                }
            }
            if (xAxes.length) {
                for (var i = 0, len = xAxes.length; i < len; i++) {
                    this.xAxes.getIndex(xAxes[i].index).config = {
                        axisRanges: xAxes[i].axisRanges
                    };
                }
            }
        }
    };
    /**
     * This function is used to sort element's JSON config properties, so that
     * some properties that absolutely need to be processed last, can be put at
     * the end.
     *
     * @ignore Exclude from docs
     * @param a  Element 1
     * @param b  Element 2
     * @return Sorting number
     */
    XYChart.prototype.configOrder = function (a, b) {
        if (a == b) {
            return 0;
        }
        // Must come last
        else if (a == "scrollbarX") {
            return 1;
        }
        else if (b == "scrollbarX") {
            return -1;
        }
        else if (a == "scrollbarY") {
            return 1;
        }
        else if (b == "scrollbarY") {
            return -1;
        }
        else if (a == "cursor") {
            return 1;
        }
        else if (b == "cursor") {
            return -1;
        }
        else if (a == "series") {
            return 1;
        }
        else if (b == "series") {
            return -1;
        }
        else {
            return _super.prototype.configOrder.call(this, a, b);
        }
    };
    /**
     * Creates a new Series of type suitable for this chart.
     *
     * @return New series
     */
    XYChart.prototype.createSeries = function () {
        return new XYSeries();
    };
    Object.defineProperty(XYChart.prototype, "zoomOutButton", {
        /**
         * @return Zoom out button
         */
        get: function () {
            return this._zoomOutButton;
        },
        /**
         * A [[Button]] element that is used for zooming out the chart.
         *
         * This button appears only when chart is zoomed in, and disappears
         * autoamatically when it is zoome dout.
         *
         * @param button  Zoom out button
         */
        set: function (button) {
            var _this = this;
            this._zoomOutButton = button;
            if (button) {
                button.events.on("hit", function () {
                    _this.zoomAxes(_this.xAxes, { start: 0, end: 1 });
                    _this.zoomAxes(_this.yAxes, { start: 0, end: 1 });
                }, undefined, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all parameters from another [[XYChart]].
     *
     * @param source Source XYChart
     */
    XYChart.prototype.copyFrom = function (source) {
        var _this = this;
        source.xAxes.each(function (axis) {
            var a = _this.xAxes.push(axis.clone());
            a.chart = _this;
            a.renderer.chart = _this;
        });
        source.yAxes.each(function (axis) {
            var a = _this.yAxes.push(axis.clone());
            a.renderer.chart = _this;
            a.chart = _this;
        });
        //this.xAxes.copyFrom(source.xAxes);
        //this.yAxes.copyFrom(source.yAxes);
        _super.prototype.copyFrom.call(this, source);
        //this.zoomOutButton.copyFrom(source.zoomOutButton);
        if (source.cursor) {
            this.cursor = source.cursor.clone();
        }
        if (source.scrollbarX) {
            this.scrollbarX = source.scrollbarX.clone();
        }
        if (source.scrollbarY) {
            this.scrollbarY = source.scrollbarY.clone();
        }
        //@todo copy all container properties
    };
    /**
     * @ignore
     */
    XYChart.prototype.disposeData = function () {
        _super.prototype.disposeData.call(this);
        var scrollbarX = this.scrollbarX;
        if (scrollbarX && scrollbarX instanceof XYChartScrollbar) {
            scrollbarX.scrollbarChart.disposeData();
        }
        var scrollbarY = this.scrollbarY;
        if (scrollbarY && scrollbarY instanceof XYChartScrollbar) {
            scrollbarY.scrollbarChart.disposeData();
        }
        this.xAxes.each(function (axis) {
            if (axis instanceof CategoryAxis) {
                axis.disposeData();
            }
        });
        this.yAxes.each(function (axis) {
            if (axis instanceof CategoryAxis) {
                axis.disposeData();
            }
        });
    };
    /**
     * Adds one or several (array) of data items to the existing data.
     *
     * @param rawDataItem One or many raw data item objects
     */
    XYChart.prototype.addData = function (rawDataItem, removeCount) {
        if (this.scrollbarX instanceof XYChartScrollbar) {
            this.addScrollbarData(this.scrollbarX, removeCount);
        }
        if (this.scrollbarY instanceof XYChartScrollbar) {
            this.addScrollbarData(this.scrollbarY, removeCount);
        }
        _super.prototype.addData.call(this, rawDataItem, removeCount);
    };
    /**
     * @ignore
     */
    XYChart.prototype.addScrollbarData = function (scrollbar, removeCount) {
        var chart = scrollbar.scrollbarChart;
        chart._parseDataFrom = chart.data.length;
        chart.invalidateData();
    };
    /**
     * @ignore
     */
    XYChart.prototype.removeScrollbarData = function (scrollbar, removeCount) {
        var chart = scrollbar.scrollbarChart;
        if ($type.isNumber(removeCount)) {
            while (removeCount > 0) {
                var dataItem = this.dataItems.getIndex(0);
                if (dataItem) {
                    chart.dataItems.remove(dataItem);
                }
                chart.dataUsers.each(function (dataUser) {
                    var dataItem = dataUser.dataItems.getIndex(0);
                    if (dataItem) {
                        dataUser.dataItems.remove(dataItem);
                    }
                });
                chart._parseDataFrom--;
                removeCount--;
            }
            chart.invalidateData();
        }
    };
    /**
     * Removes elements from the beginning of data
     *
     * @param count number of elements to remove
     */
    XYChart.prototype.removeData = function (count) {
        if (this.scrollbarX instanceof XYChartScrollbar) {
            this.removeScrollbarData(this.scrollbarX, count);
        }
        if (this.scrollbarY instanceof XYChartScrollbar) {
            this.removeScrollbarData(this.scrollbarY, count);
        }
        _super.prototype.removeData.call(this, count);
    };
    /**
     * @param  value  Tap to activate?
     */
    XYChart.prototype.setTapToActivate = function (value) {
        _super.prototype.setTapToActivate.call(this, value);
        if (this.cursor) {
            this.cursor.interactions.isTouchProtected = value;
            this.plotContainer.interactions.isTouchProtected = value;
        }
    };
    XYChart.prototype.handleTapToActivate = function () {
        _super.prototype.handleTapToActivate.call(this);
        if (this.cursor) {
            this.cursor.interactions.isTouchProtected = false;
            this.plotContainer.interactions.isTouchProtected = false;
        }
    };
    XYChart.prototype.handleTapToActivateDeactivation = function () {
        _super.prototype.handleTapToActivateDeactivation.call(this);
        if (this.cursor) {
            this.cursor.interactions.isTouchProtected = true;
            this.plotContainer.interactions.isTouchProtected = true;
        }
    };
    return XYChart;
}(SerialChart));
export { XYChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["XYChart"] = XYChart;
/**
 * Add default responsive rules
 */
/**
 * Remove horizontal scrollbar on narrow charts.
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.maybeXS,
    state: function (target, stateId) {
        if (target instanceof XYChart && target.scrollbarX) {
            var state = target.states.create(stateId);
            var sbstate = target.scrollbarX.states.create(stateId);
            sbstate.properties.disabled = true;
            return state;
        }
        return null;
    }
});
/**
 * Remove vertical scrollbar on short charts.
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.maybeXS,
    state: function (target, stateId) {
        if (target instanceof XYChart && target.scrollbarY) {
            var state = target.states.create(stateId);
            var sbstate = target.scrollbarY.states.create(stateId);
            sbstate.properties.disabled = true;
            return state;
        }
        return null;
    }
});
//# sourceMappingURL=XYChart.js.map