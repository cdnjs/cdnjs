/**
 * @license Highcharts Stock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/klinger
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Karol Kolodziej
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
;// external "../modules/stock.src.js"
var x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var y = (x) => (() => (x))
    const stock_src_js_namespaceObject = x({  });
;// external ["../highcharts.src.js","default","SeriesRegistry"]
const external_highcharts_src_js_default_SeriesRegistry_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].SeriesRegistry;
var external_highcharts_src_js_default_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_SeriesRegistry_namespaceObject);
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

const { defined, error, merge } = (external_highcharts_src_js_default_default());
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
            indicator.options = merge(mainLinePoints, gappedExtend);
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
                    indicator.options = merge(mainLineOptions[lineName].styles, gappedExtend);
                }
                else {
                    error('Error: "There is no ' + lineName +
                        ' in DOCS options declared. Check if linesApiNames' +
                        ' are consistent with your DOCS line names."');
                }
                indicator.graph = indicator['graph' + lineName];
                smaProto.drawGraph.call(indicator);
                // Now save lines:
                indicator['graph' + lineName] = indicator.graph;
            }
            else {
                error('Error: "' + lineName + ' doesn\'t have equivalent ' +
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

;// ./code/es-modules/Stock/Indicators/Klinger/KlingerIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { ema: EMAIndicator, sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { correctFloat, error: KlingerIndicator_error, extend, isArray, merge: KlingerIndicator_merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The Klinger oscillator series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.klinger
 *
 * @augments Highcharts.Series
 */
class KlingerIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    calculateTrend(yVal, i) {
        const isUpward = yVal[i][1] + yVal[i][2] + yVal[i][3] >
            yVal[i - 1][1] + yVal[i - 1][2] + yVal[i - 1][3];
        return isUpward ? 1 : -1;
    }
    // Checks if the series and volumeSeries are accessible, number of
    // points.x is longer than period, is series has OHLC data
    isValidData(firstYVal) {
        const chart = this.chart, options = this.options, series = this.linkedParent, isSeriesOHLC = isArray(firstYVal) &&
            firstYVal.length === 4, volumeSeries = this.volumeSeries ||
            (this.volumeSeries =
                chart.get(options.params.volumeSeriesID));
        if (!volumeSeries) {
            KlingerIndicator_error('Series ' +
                options.params.volumeSeriesID +
                ' not found! Check `volumeSeriesID`.', true, series.chart);
        }
        const isLengthValid = [series, volumeSeries].every(function (series) {
            return series && series.dataTable.rowCount >=
                options.params.slowAvgPeriod;
        });
        return !!(isLengthValid && isSeriesOHLC);
    }
    getCM(previousCM, DM, trend, previousTrend, prevoiusDM) {
        return correctFloat(DM + (trend === previousTrend ? previousCM : prevoiusDM));
    }
    getDM(high, low) {
        return correctFloat(high - low);
    }
    getVolumeForce(yVal) {
        const volumeForce = [];
        let CM = 0, // Cumulative measurement
        DM, // Daily measurement
        force, i = 1, // Start from second point
        previousCM = 0, previousDM = yVal[0][1] - yVal[0][2], // Initial DM
        previousTrend = 0, trend;
        for (i; i < yVal.length; i++) {
            trend = this.calculateTrend(yVal, i);
            DM = this.getDM(yVal[i][1], yVal[i][2]);
            // For the first iteration when the previousTrend doesn't exist,
            // previousCM doesn't exist either, but it doesn't matter becouse
            // it's filltered out in the getCM method in else statement,
            // (in this iteration, previousCM can be raplaced with the DM).
            CM = this.getCM(previousCM, DM, trend, previousTrend, previousDM);
            force = this.volumeSeries.getColumn('y')[i] *
                trend * Math.abs(2 * ((DM / CM) - 1)) * 100;
            volumeForce.push([force]);
            // Before next iteration, assign the current as the previous.
            previousTrend = trend;
            previousCM = CM;
            previousDM = DM;
        }
        return volumeForce;
    }
    getEMA(yVal, prevEMA, SMA, EMApercent, index, i, xVal) {
        return EMAIndicator.prototype.calculateEma(xVal || [], yVal, typeof i === 'undefined' ? 1 : i, EMApercent, prevEMA, typeof index === 'undefined' ? -1 : index, SMA);
    }
    getSMA(period, index, values) {
        return EMAIndicator.prototype
            .accumulatePeriodPoints(period, index, values) / period;
    }
    getValues(series, params) {
        const Klinger = [], xVal = series.xData, yVal = series.yData, xData = [], yData = [], calcSingal = [];
        let KO, i = 0, fastEMA = 0, slowEMA, previousFastEMA = void 0, previousSlowEMA = void 0, signal = null;
        // If the necessary conditions are not fulfilled, don't proceed.
        if (!this.isValidData(yVal[0])) {
            return;
        }
        // Calculate the Volume Force array.
        const volumeForce = this.getVolumeForce(yVal);
        // Calculate SMA for the first points.
        const SMAFast = this.getSMA(params.fastAvgPeriod, 0, volumeForce), SMASlow = this.getSMA(params.slowAvgPeriod, 0, volumeForce);
        // Calculate EMApercent for the first points.
        const fastEMApercent = 2 / (params.fastAvgPeriod + 1), slowEMApercent = 2 / (params.slowAvgPeriod + 1);
        // Calculate KO
        for (i; i < yVal.length; i++) {
            // Get EMA for fast period.
            if (i >= params.fastAvgPeriod) {
                fastEMA = this.getEMA(volumeForce, previousFastEMA, SMAFast, fastEMApercent, 0, i, xVal)[1];
                previousFastEMA = fastEMA;
            }
            // Get EMA for slow period.
            if (i >= params.slowAvgPeriod) {
                slowEMA = this.getEMA(volumeForce, previousSlowEMA, SMASlow, slowEMApercent, 0, i, xVal)[1];
                previousSlowEMA = slowEMA;
                KO = correctFloat(fastEMA - slowEMA);
                calcSingal.push(KO);
                // Calculate signal SMA
                if (calcSingal.length >= params.signalPeriod) {
                    signal = calcSingal.slice(-params.signalPeriod)
                        .reduce((prev, curr) => prev + curr) / params.signalPeriod;
                }
                Klinger.push([xVal[i], KO, signal]);
                xData.push(xVal[i]);
                yData.push([KO, signal]);
            }
        }
        return {
            values: Klinger,
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
 * Klinger oscillator. This series requires the `linkedTo` option to be set
 * and should be loaded after the `stock/indicators/indicators.js` file.
 *
 * @sample stock/indicators/klinger
 *         Klinger oscillator
 *
 * @extends      plotOptions.sma
 * @since 9.1.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/klinger
 * @optionparent plotOptions.klinger
 */
KlingerIndicator.defaultOptions = KlingerIndicator_merge(SMAIndicator.defaultOptions, {
    /**
     * Parameters used in calculation of Klinger Oscillator.
     *
     * @excluding index, period
     */
    params: {
        /**
         * The fast period for indicator calculations.
         */
        fastAvgPeriod: 34,
        /**
         * The slow period for indicator calculations.
         */
        slowAvgPeriod: 55,
        /**
         * The base period for signal calculations.
         */
        signalPeriod: 13,
        /**
         * The id of another series to use its data as volume data for the
         * indiator calculation.
         */
        volumeSeriesID: 'volume'
    },
    signalLine: {
        /**
         * Styles for a signal line.
         */
        styles: {
            /**
             * Pixel width of the line.
             */
            lineWidth: 1,
            /**
             * Color of the line. If not set, it's inherited from
             * [plotOptions.klinger.color
             * ](#plotOptions.klinger.color).
             *
             * @type {Highcharts.ColorString}
             */
            lineColor: '#ff0000'
        }
    },
    dataGrouping: {
        approximation: 'averages'
    },
    tooltip: {
        pointFormat: '<span style="color: {point.color}">\u25CF</span>' +
            '<b> {series.name}</b><br/>' +
            '<span style="color: {point.color}">Klinger</span>: ' +
            '{point.y}<br/>' +
            '<span style="color: ' +
            '{point.series.options.signalLine.styles.lineColor}">' +
            'Signal</span>' +
            ': {point.signal}<br/>'
    }
});
extend(KlingerIndicator.prototype, {
    areaLinesNames: [],
    linesApiNames: ['signalLine'],
    nameBase: 'Klinger',
    nameComponents: ['fastAvgPeriod', 'slowAvgPeriod'],
    pointArrayMap: ['y', 'signal'],
    parallelArrays: ['x', 'y', 'signal'],
    pointValKey: 'y'
});
Indicators_MultipleLinesComposition.compose(KlingerIndicator);
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('klinger', KlingerIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Klinger_KlingerIndicator = ((/* unused pure expression or super */ null && (KlingerIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A Klinger oscillator. If the [type](#series.klinger.type)
 * option is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.klinger
 * @since 9.1.0
 * @product   highstock
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/klinger
 * @apioption series.klinger
 */
''; // To include the above in the js output

;// ./code/es-modules/masters/indicators/klinger.src.js





/* harmony default export */ const klinger_src = ((external_highcharts_src_js_default_default()));

export { klinger_src as default };
