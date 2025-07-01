/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/indicators
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Pawel Fus, Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
import * as __WEBPACK_EXTERNAL_MODULE__modules_stock_src_js_b3d80146__ from "../modules/stock.src.js";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/

;// external ["../highcharts.src.js","default"]
const external_highcharts_src_js_default_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"];
var external_highcharts_src_js_default_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_namespaceObject);
;// external ["../highcharts.src.js","default","Chart"]
const external_highcharts_src_js_default_Chart_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].Chart;
var external_highcharts_src_js_default_Chart_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Chart_namespaceObject);
;// external ["../highcharts.src.js","default","SeriesRegistry"]
const external_highcharts_src_js_default_SeriesRegistry_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].SeriesRegistry;
var external_highcharts_src_js_default_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_SeriesRegistry_namespaceObject);
;// ./code/es-modules/Stock/Indicators/SMA/SMAIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { line: LineSeries } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { addEvent, fireEvent, error, extend, isArray, merge, pick } = (external_highcharts_src_js_default_default());
/**
 *
 * Return the parent series values in the legacy two-dimensional yData
 * format
 * @private
 */
const tableToMultiYData = (series, processed) => {
    const yData = [], pointArrayMap = series.pointArrayMap, table = processed && series.dataTable.modified || series.dataTable;
    if (!pointArrayMap) {
        return series.getColumn('y', processed);
    }
    const columns = pointArrayMap.map((key) => series.getColumn(key, processed));
    for (let i = 0; i < table.rowCount; i++) {
        const values = pointArrayMap.map((key, colIndex) => columns[colIndex]?.[i] || 0);
        yData.push(values);
    }
    return yData;
};
/* *
 *
 *  Class
 *
 * */
/**
 * The SMA series type.
 *
 * @private
 */
class SMAIndicator extends LineSeries {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    destroy() {
        this.dataEventsToUnbind.forEach(function (unbinder) {
            unbinder();
        });
        super.destroy.apply(this, arguments);
    }
    /**
     * @private
     */
    getName() {
        const params = [];
        let name = this.name;
        if (!name) {
            (this.nameComponents || []).forEach(function (component, index) {
                params.push(this.options.params[component] +
                    pick(this.nameSuffixes[index], ''));
            }, this);
            name = (this.nameBase || this.type.toUpperCase()) +
                (this.nameComponents ? ' (' + params.join(', ') + ')' : '');
        }
        return name;
    }
    /**
     * @private
     */
    getValues(series, params) {
        const period = params.period, xVal = series.xData || [], yVal = series.yData, yValLen = yVal.length, SMA = [], xData = [], yData = [];
        let i, index = -1, range = 0, SMAPoint, sum = 0;
        if (xVal.length < period) {
            return;
        }
        // Switch index for OHLC / Candlestick / Arearange
        if (isArray(yVal[0])) {
            index = params.index ? params.index : 0;
        }
        // Accumulate first N-points
        while (range < period - 1) {
            sum += index < 0 ? yVal[range] : yVal[range][index];
            range++;
        }
        // Calculate value one-by-one for each period in visible data
        for (i = range; i < yValLen; i++) {
            sum += index < 0 ? yVal[i] : yVal[i][index];
            SMAPoint = [xVal[i], sum / period];
            SMA.push(SMAPoint);
            xData.push(SMAPoint[0]);
            yData.push(SMAPoint[1]);
            sum -= (index < 0 ?
                yVal[i - range] :
                yVal[i - range][index]);
        }
        return {
            values: SMA,
            xData: xData,
            yData: yData
        };
    }
    /**
     * @private
     */
    init(chart, options) {
        const indicator = this;
        super.init.call(indicator, chart, options);
        // Only after series are linked indicator can be processed.
        const linkedSeriesUnbiner = addEvent((external_highcharts_src_js_default_Chart_default()), 'afterLinkSeries', function ({ isUpdating }) {
            // #18643 indicator shouldn't recalculate
            // values while series updating.
            if (isUpdating) {
                return;
            }
            const hasEvents = !!indicator.dataEventsToUnbind.length;
            if (indicator.linkedParent) {
                if (!hasEvents) {
                    // No matter which indicator, always recalculate after
                    // updating the data.
                    indicator.dataEventsToUnbind.push(addEvent(indicator.linkedParent, 'updatedData', function () {
                        indicator.recalculateValues();
                    }));
                    // Some indicators (like VBP) requires an additional
                    // event (afterSetExtremes) to properly show the data.
                    if (indicator.calculateOn.xAxis) {
                        indicator.dataEventsToUnbind.push(addEvent(indicator.linkedParent.xAxis, indicator.calculateOn.xAxis, function () {
                            indicator.recalculateValues();
                        }));
                    }
                }
                // Most indicators are being calculated on chart's init.
                if (indicator.calculateOn.chart === 'init') {
                    // When closestPointRange is set, it is an indication
                    // that `Series.processData` has run. If it hasn't we
                    // need to `recalculateValues`.
                    if (!indicator.closestPointRange) {
                        indicator.recalculateValues();
                    }
                }
                else if (!hasEvents) {
                    // Some indicators (like VBP) has to recalculate their
                    // values after other chart's events (render).
                    const unbinder = addEvent(indicator.chart, indicator.calculateOn.chart, function () {
                        indicator.recalculateValues();
                        // Call this just once.
                        unbinder();
                    });
                }
            }
            else {
                return error('Series ' +
                    indicator.options.linkedTo +
                    ' not found! Check `linkedTo`.', false, chart);
            }
        }, {
            order: 0
        });
        // Make sure we find series which is a base for an indicator
        // chart.linkSeries();
        indicator.dataEventsToUnbind = [];
        indicator.eventsToUnbind.push(linkedSeriesUnbiner);
    }
    /**
     * @private
     */
    recalculateValues() {
        const croppedDataValues = [], indicator = this, table = this.dataTable, oldData = indicator.points || [], oldDataLength = indicator.dataTable.rowCount, emptySet = {
            values: [],
            xData: [],
            yData: []
        };
        let overwriteData = true, oldFirstPointIndex, oldLastPointIndex, min, max;
        // For the newer data table, temporarily set the parent series `yData`
        // to the legacy format that is documented for custom indicators, and
        // get the xData from the data table
        const yData = indicator.linkedParent.yData, processedYData = indicator.linkedParent.processedYData;
        indicator.linkedParent.xData = indicator.linkedParent
            .getColumn('x');
        indicator.linkedParent.yData = tableToMultiYData(indicator.linkedParent);
        indicator.linkedParent.processedYData = tableToMultiYData(indicator.linkedParent, true);
        // Updating an indicator with redraw=false may destroy data.
        // If there will be a following update for the parent series,
        // we will try to access Series object without any properties
        // (except for prototyped ones). This is what happens
        // for example when using Axis.setDataGrouping(). See #16670
        const processedData = indicator.linkedParent.options &&
            // #18176, #18177 indicators should work with empty dataset
            indicator.linkedParent.dataTable.rowCount ?
            (indicator.getValues(indicator.linkedParent, indicator.options.params) || emptySet) : emptySet;
        // Reset
        delete indicator.linkedParent.xData;
        indicator.linkedParent.yData = yData;
        indicator.linkedParent.processedYData = processedYData;
        const pointArrayMap = indicator.pointArrayMap || ['y'], valueColumns = {};
        // Split legacy twodimensional values into value columns
        processedData.yData
            .forEach((values) => {
            pointArrayMap.forEach((key, index) => {
                const column = valueColumns[key] || [];
                column.push(isArray(values) ? values[index] : values);
                if (!valueColumns[key]) {
                    valueColumns[key] = column;
                }
            });
        });
        // We need to update points to reflect changes in all,
        // x and y's, values. However, do it only for non-grouped
        // data - grouping does it for us (#8572)
        if (oldDataLength &&
            !indicator.hasGroupedData &&
            indicator.visible &&
            indicator.points) {
            // When data is cropped update only avaliable points (#9493)
            if (indicator.cropped) {
                if (indicator.xAxis) {
                    min = indicator.xAxis.min;
                    max = indicator.xAxis.max;
                }
                const croppedData = indicator.cropData(table, min, max);
                const keys = ['x', ...(indicator.pointArrayMap || ['y'])];
                for (let i = 0; i < (croppedData.modified?.rowCount || 0); i++) {
                    const values = keys.map((key) => this.getColumn(key)[i] || 0);
                    croppedDataValues.push(values);
                }
                const indicatorXData = indicator.getColumn('x');
                oldFirstPointIndex = processedData.xData.indexOf(indicatorXData[0]);
                oldLastPointIndex = processedData.xData.indexOf(indicatorXData[indicatorXData.length - 1]);
                // Check if indicator points should be shifted (#8572)
                if (oldFirstPointIndex === -1 &&
                    oldLastPointIndex === processedData.xData.length - 2) {
                    if (croppedDataValues[0][0] === oldData[0].x) {
                        croppedDataValues.shift();
                    }
                }
                indicator.updateData(croppedDataValues);
            }
            else if (indicator.updateAllPoints || // #18710
                // Omit addPoint() and removePoint() cases
                processedData.xData.length !== oldDataLength - 1 &&
                    processedData.xData.length !== oldDataLength + 1) {
                overwriteData = false;
                indicator.updateData(processedData.values);
            }
        }
        if (overwriteData) {
            table.setColumns({
                ...valueColumns,
                x: processedData.xData
            });
            indicator.options.data = processedData.values;
        }
        if (indicator.calculateOn.xAxis &&
            indicator.getColumn('x', true).length) {
            indicator.isDirty = true;
            indicator.redraw();
        }
        indicator.isDirtyData = !!indicator.linkedSeries.length;
        fireEvent(indicator, 'updatedData'); // #18689
    }
    /**
     * @private
     */
    processData() {
        const series = this, compareToMain = series.options.compareToMain, linkedParent = series.linkedParent;
        super.processData.apply(series, arguments);
        if (series.dataModify &&
            linkedParent &&
            linkedParent.dataModify &&
            linkedParent.dataModify.compareValue &&
            compareToMain) {
            series.dataModify.compareValue =
                linkedParent.dataModify.compareValue;
        }
        return;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * The parameter allows setting line series type and use OHLC indicators.
 * Data in OHLC format is required.
 *
 * @sample {highstock} stock/indicators/use-ohlc-data
 *         Use OHLC data format to plot line chart
 *
 * @type      {boolean}
 * @product   highstock
 * @apioption plotOptions.line.useOhlcData
 */
/**
 * Simple moving average indicator (SMA). This series requires `linkedTo`
 * option to be set.
 *
 * @sample stock/indicators/sma
 *         Simple moving average indicator
 *
 * @extends      plotOptions.line
 * @since        6.0.0
 * @excluding    allAreas, colorAxis, dragDrop, joinBy, keys,
 *               navigatorOptions, pointInterval, pointIntervalUnit,
 *               pointPlacement, pointRange, pointStart, showInNavigator,
 *               stacking, useOhlcData
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @optionparent plotOptions.sma
 */
SMAIndicator.defaultOptions = merge(LineSeries.defaultOptions, {
    /**
     * The name of the series as shown in the legend, tooltip etc. If not
     * set, it will be based on a technical indicator type and default
     * params.
     *
     * @type {string}
     */
    name: void 0,
    tooltip: {
        /**
         * Number of decimals in indicator series.
         */
        valueDecimals: 4
    },
    /**
     * The main series ID that indicator will be based on. Required for this
     * indicator.
     *
     * @type {string}
     */
    linkedTo: void 0,
    /**
     * Whether to compare indicator to the main series values
     * or indicator values.
     *
     * @sample {highstock} stock/plotoptions/series-comparetomain/
     *         Difference between comparing SMA values to the main series
     *         and its own values.
     *
     * @type {boolean}
     */
    compareToMain: false,
    /**
     * Parameters used in calculation of regression series' points.
     */
    params: {
        /**
         * The point index which indicator calculations will base. For
         * example using OHLC data, index=2 means the indicator will be
         * calculated using Low values.
         */
        index: 3,
        /**
         * The base period for indicator calculations. This is the number of
         * data points which are taken into account for the indicator
         * calculations.
         */
        period: 14
    }
});
extend(SMAIndicator.prototype, {
    calculateOn: {
        chart: 'init'
    },
    hasDerivedData: true,
    nameComponents: ['period'],
    nameSuffixes: [], // E.g. Zig Zag uses extra '%'' in the legend name
    useCommonDataGrouping: true
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('sma', SMAIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const SMA_SMAIndicator = ((/* unused pure expression or super */ null && (SMAIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `SMA` series. If the [type](#series.sma.type) option is not specified, it
 * is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.sma
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL, useOhlcData
 * @requires  stock/indicators/indicators
 * @apioption series.sma
 */
(''); // Adds doclet above to the transpiled file

;// ./code/es-modules/Stock/Indicators/EMA/EMAIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: EMAIndicator_SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { correctFloat, isArray: EMAIndicator_isArray, merge: EMAIndicator_merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The EMA series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.ema
 *
 * @augments Highcharts.Series
 */
class EMAIndicator extends EMAIndicator_SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    accumulatePeriodPoints(period, index, yVal) {
        let sum = 0, i = 0, y = 0;
        while (i < period) {
            y = index < 0 ? yVal[i] : yVal[i][index];
            sum = sum + y;
            i++;
        }
        return sum;
    }
    calculateEma(xVal, yVal, i, EMApercent, calEMA, index, SMA) {
        const x = xVal[i - 1], yValue = index < 0 ?
            yVal[i - 1] :
            yVal[i - 1][index], y = typeof calEMA === 'undefined' ?
            SMA : correctFloat((yValue * EMApercent) +
            (calEMA * (1 - EMApercent)));
        return [x, y];
    }
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, EMApercent = 2 / (period + 1), EMA = [], xData = [], yData = [];
        let calEMA, EMAPoint, i, index = -1, sum = 0, SMA = 0;
        // Check period, if bigger than points length, skip
        if (yValLen < period) {
            return;
        }
        // Switch index for OHLC / Candlestick / Arearange
        if (EMAIndicator_isArray(yVal[0])) {
            index = params.index ? params.index : 0;
        }
        // Accumulate first N-points
        sum = this.accumulatePeriodPoints(period, index, yVal);
        // First point
        SMA = sum / period;
        // Calculate value one-by-one for each period in visible data
        for (i = period; i < yValLen + 1; i++) {
            EMAPoint = this.calculateEma(xVal, yVal, i, EMApercent, calEMA, index, SMA);
            EMA.push(EMAPoint);
            xData.push(EMAPoint[0]);
            yData.push(EMAPoint[1]);
            calEMA = EMAPoint[1];
        }
        return {
            values: EMA,
            xData: xData,
            yData: yData
        };
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Exponential moving average indicator (EMA). This series requires the
 * `linkedTo` option to be set.
 *
 * @sample stock/indicators/ema
 * Exponential moving average indicator
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @optionparent plotOptions.ema
 */
EMAIndicator.defaultOptions = EMAIndicator_merge(EMAIndicator_SMAIndicator.defaultOptions, {
    params: {
        /**
         * The point index which indicator calculations will base. For
         * example using OHLC data, index=2 means the indicator will be
         * calculated using Low values.
         *
         * By default index value used to be set to 0. Since
         * Highcharts Stock 7 by default index is set to 3
         * which means that the ema indicator will be
         * calculated using Close values.
         */
        index: 3,
        period: 9 // @merge 14 in v6.2
    }
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('ema', EMAIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const EMA_EMAIndicator = ((/* unused pure expression or super */ null && (EMAIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `EMA` series. If the [type](#series.ema.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.ema
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @apioption series.ema
 */
''; // Adds doclet above to the transpiled file

;// ./code/es-modules/Stock/Indicators/MultipleLinesComposition.js
/**
 *
 *  (c) 2010-2025 Wojciech Chmiel
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: { prototype: smaProto } } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { defined, error: MultipleLinesComposition_error, merge: MultipleLinesComposition_merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Composition
 *
 * */
var MultipleLinesComposition;
(function (MultipleLinesComposition) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    /**
     * Additional lines DOCS names. Elements of linesApiNames array should
     * be consistent with DOCS line names defined in your implementation.
     * Notice that linesApiNames should have decreased amount of elements
     * relative to pointArrayMap (without pointValKey).
     *
     * @private
     * @type {Array<string>}
     */
    const linesApiNames = ['bottomLine'];
    /**
     * Lines ids. Required to plot appropriate amount of lines.
     * Notice that pointArrayMap should have more elements than
     * linesApiNames, because it contains main line and additional lines ids.
     * Also it should be consistent with amount of lines calculated in
     * getValues method from your implementation.
     *
     * @private
     * @type {Array<string>}
     */
    const pointArrayMap = ['top', 'bottom'];
    /**
     * Names of the lines, between which the area should be plotted.
     * If the drawing of the area should
     * be disabled for some indicators, leave this option as an empty array.
     * Names should be the same as the names in the pointArrayMap.
     *
     * @private
     * @type {Array<string>}
     */
    const areaLinesNames = ['top'];
    /**
     * Main line id.
     *
     * @private
     * @type {string}
     */
    const pointValKey = 'top';
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Composition useful for all indicators that have more than one line.
     * Compose it with your implementation where you will provide the
     * `getValues` method appropriate to your indicator and `pointArrayMap`,
     * `pointValKey`, `linesApiNames` properties. Notice that `pointArrayMap`
     * should be consistent with the amount of lines calculated in the
     * `getValues` method.
     *
     * @private
     */
    function compose(IndicatorClass) {
        const proto = IndicatorClass.prototype;
        proto.linesApiNames = (proto.linesApiNames ||
            linesApiNames.slice());
        proto.pointArrayMap = (proto.pointArrayMap ||
            pointArrayMap.slice());
        proto.pointValKey = (proto.pointValKey ||
            pointValKey);
        proto.areaLinesNames = (proto.areaLinesNames ||
            areaLinesNames.slice());
        proto.drawGraph = indicatorDrawGraph;
        proto.getGraphPath = indicatorGetGraphPath;
        proto.toYData = indicatorToYData;
        proto.translate = indicatorTranslate;
        return IndicatorClass;
    }
    MultipleLinesComposition.compose = compose;
    /**
     * Generate the API name of the line
     *
     * @private
     * @param propertyName name of the line
     */
    function getLineName(propertyName) {
        return ('plot' +
            propertyName.charAt(0).toUpperCase() +
            propertyName.slice(1));
    }
    /**
     * Create translatedLines Collection based on pointArrayMap.
     *
     * @private
     * @param {string} [excludedValue]
     *        Main line id
     * @return {Array<string>}
     *         Returns translated lines names without excluded value.
     */
    function getTranslatedLinesNames(indicator, excludedValue) {
        const translatedLines = [];
        (indicator.pointArrayMap || []).forEach((propertyName) => {
            if (propertyName !== excludedValue) {
                translatedLines.push(getLineName(propertyName));
            }
        });
        return translatedLines;
    }
    /**
     * Draw main and additional lines.
     *
     * @private
     */
    function indicatorDrawGraph() {
        const indicator = this, pointValKey = indicator.pointValKey, linesApiNames = indicator.linesApiNames, areaLinesNames = indicator.areaLinesNames, mainLinePoints = indicator.points, mainLineOptions = indicator.options, mainLinePath = indicator.graph, gappedExtend = {
            options: {
                gapSize: mainLineOptions.gapSize
            }
        }, 
        // Additional lines point place holders:
        secondaryLines = [], secondaryLinesNames = getTranslatedLinesNames(indicator, pointValKey);
        let pointsLength = mainLinePoints.length, point;
        // Generate points for additional lines:
        secondaryLinesNames.forEach((plotLine, index) => {
            // Create additional lines point place holders
            secondaryLines[index] = [];
            while (pointsLength--) {
                point = mainLinePoints[pointsLength];
                secondaryLines[index].push({
                    x: point.x,
                    plotX: point.plotX,
                    plotY: point[plotLine],
                    isNull: !defined(point[plotLine])
                });
            }
            pointsLength = mainLinePoints.length;
        });
        // Modify options and generate area fill:
        if (indicator.userOptions.fillColor && areaLinesNames.length) {
            const index = secondaryLinesNames.indexOf(getLineName(areaLinesNames[0])), secondLinePoints = secondaryLines[index], firstLinePoints = areaLinesNames.length === 1 ?
                mainLinePoints :
                secondaryLines[secondaryLinesNames.indexOf(getLineName(areaLinesNames[1]))], originalColor = indicator.color;
            indicator.points = firstLinePoints;
            indicator.nextPoints = secondLinePoints;
            indicator.color = indicator.userOptions.fillColor;
            indicator.options = MultipleLinesComposition_merge(mainLinePoints, gappedExtend);
            indicator.graph = indicator.area;
            indicator.fillGraph = true;
            smaProto.drawGraph.call(indicator);
            indicator.area = indicator.graph;
            // Clean temporary properties:
            delete indicator.nextPoints;
            delete indicator.fillGraph;
            indicator.color = originalColor;
        }
        // Modify options and generate additional lines:
        linesApiNames.forEach((lineName, i) => {
            if (secondaryLines[i]) {
                indicator.points = secondaryLines[i];
                if (mainLineOptions[lineName]) {
                    indicator.options = MultipleLinesComposition_merge(mainLineOptions[lineName].styles, gappedExtend);
                }
                else {
                    MultipleLinesComposition_error('Error: "There is no ' + lineName +
                        ' in DOCS options declared. Check if linesApiNames' +
                        ' are consistent with your DOCS line names."');
                }
                indicator.graph = indicator['graph' + lineName];
                smaProto.drawGraph.call(indicator);
                // Now save lines:
                indicator['graph' + lineName] = indicator.graph;
            }
            else {
                MultipleLinesComposition_error('Error: "' + lineName + ' doesn\'t have equivalent ' +
                    'in pointArrayMap. To many elements in linesApiNames ' +
                    'relative to pointArrayMap."');
            }
        });
        // Restore options and draw a main line:
        indicator.points = mainLinePoints;
        indicator.options = mainLineOptions;
        indicator.graph = mainLinePath;
        smaProto.drawGraph.call(indicator);
    }
    /**
     * Create the path based on points provided as argument.
     * If indicator.nextPoints option is defined, create the areaFill.
     *
     * @private
     * @param points Points on which the path should be created
     */
    function indicatorGetGraphPath(points) {
        let areaPath, path = [], higherAreaPath = [];
        points = points || this.points;
        // Render Span
        if (this.fillGraph && this.nextPoints) {
            areaPath = smaProto.getGraphPath.call(this, this.nextPoints);
            if (areaPath && areaPath.length) {
                areaPath[0][0] = 'L';
                path = smaProto.getGraphPath.call(this, points);
                higherAreaPath = areaPath.slice(0, path.length);
                // Reverse points, so that the areaFill will start from the end:
                for (let i = higherAreaPath.length - 1; i >= 0; i--) {
                    path.push(higherAreaPath[i]);
                }
            }
        }
        else {
            path = smaProto.getGraphPath.apply(this, arguments);
        }
        return path;
    }
    /**
     * @private
     * @param {Highcharts.Point} point
     *        Indicator point
     * @return {Array<number>}
     *         Returns point Y value for all lines
     */
    function indicatorToYData(point) {
        const pointColl = [];
        (this.pointArrayMap || []).forEach((propertyName) => {
            pointColl.push(point[propertyName]);
        });
        return pointColl;
    }
    /**
     * Add lines plot pixel values.
     *
     * @private
     */
    function indicatorTranslate() {
        const pointArrayMap = this.pointArrayMap;
        let LinesNames = [], value;
        LinesNames = getTranslatedLinesNames(this);
        smaProto.translate.apply(this, arguments);
        this.points.forEach((point) => {
            pointArrayMap.forEach((propertyName, i) => {
                value = point[propertyName];
                // If the modifier, like for example compare exists,
                // modified the original value by that method, #15867.
                if (this.dataModify) {
                    value = this.dataModify.modifyValue(value);
                }
                if (value !== null) {
                    point[LinesNames[i]] = this.yAxis.toPixels(value, true);
                }
            });
        });
    }
})(MultipleLinesComposition || (MultipleLinesComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Indicators_MultipleLinesComposition = (MultipleLinesComposition);

;// external "../modules/stock.src.js"
var x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var y = (x) => (() => (x))
    const stock_src_js_namespaceObject = x({  });
;// ./code/es-modules/masters/indicators/indicators.src.js







const G = (external_highcharts_src_js_default_default());
G.MultipleLinesComposition =
    G.MultipleLinesComposition || Indicators_MultipleLinesComposition;
/* harmony default export */ const indicators_src = ((external_highcharts_src_js_default_default()));

export { indicators_src as default };
