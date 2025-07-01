/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/pivot-points
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Paweł Fus
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
;// ./code/es-modules/Stock/Indicators/PivotPoints/PivotPointsPoint.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const SMAPoint = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes.sma.prototype.pointClass;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function destroyExtraLabels(point, functionName) {
    const props = point.series.pointArrayMap;
    let prop, i = props.length;
    (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes.sma.prototype.pointClass.prototype[functionName].call(point);
    while (i--) {
        prop = 'dataLabel' + props[i];
        // S4 dataLabel could be removed by parent method:
        if (point[prop] && point[prop].element) {
            point[prop].destroy();
        }
        point[prop] = null;
    }
}
/* *
 *
 *  Class
 *
 * */
class PivotPointsPoint extends SMAPoint {
    /* *
     *
     *  Functions
     *
     * */
    destroyElements() {
        destroyExtraLabels(this, 'destroyElements');
    }
    // This method is called when removing points, e.g. series.update()
    destroy() {
        destroyExtraLabels(this, 'destroyElements');
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PivotPoints_PivotPointsPoint = (PivotPointsPoint);

;// ./code/es-modules/Stock/Indicators/PivotPoints/PivotPointsIndicator.js
/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { merge, extend, defined, isArray } = (external_highcharts_src_js_default_default());
/**
 *
 *  Class
 *
 **/
/**
 * The Pivot Points series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.pivotpoints
 *
 * @augments Highcharts.Series
 */
class PivotPointsIndicator extends SMAIndicator {
    /* *
     *
     *  Functions
     *
     * */
    toYData(point) {
        return [point.P]; // The rest should not affect extremes
    }
    translate() {
        const indicator = this;
        super.translate.apply(indicator);
        indicator.points.forEach(function (point) {
            indicator.pointArrayMap.forEach(function (value) {
                if (defined(point[value])) {
                    point['plot' + value] = (indicator.yAxis.toPixels(point[value], true));
                }
            });
        });
        // Pivot points are rendered as horizontal lines
        // And last point start not from the next one (as it's the last one)
        // But from the approximated last position in a given range
        indicator.plotEndPoint = indicator.xAxis.toPixels(indicator.endPoint, true);
    }
    getGraphPath(points) {
        const indicator = this, allPivotPoints = ([[], [], [], [], [], [], [], [], []]), pointArrayMapLength = indicator.pointArrayMap.length;
        let endPoint = indicator.plotEndPoint, path = [], position, point, pointsLength = points.length, i;
        while (pointsLength--) {
            point = points[pointsLength];
            for (i = 0; i < pointArrayMapLength; i++) {
                position = indicator.pointArrayMap[i];
                if (defined(point[position])) {
                    allPivotPoints[i].push({
                        // Start left:
                        plotX: point.plotX,
                        plotY: point['plot' + position],
                        isNull: false
                    }, {
                        // Go to right:
                        plotX: endPoint,
                        plotY: point['plot' + position],
                        isNull: false
                    }, {
                        // And add null points in path to generate breaks:
                        plotX: endPoint,
                        plotY: null,
                        isNull: true
                    });
                }
            }
            endPoint = point.plotX;
        }
        allPivotPoints.forEach((pivotPoints) => {
            path = path.concat(super.getGraphPath.call(indicator, pivotPoints));
        });
        return path;
    }
    // TODO: Rewrite this logic to use multiple datalabels
    drawDataLabels() {
        const indicator = this, pointMapping = indicator.pointArrayMap;
        let currentLabel, pointsLength, point, i;
        if (indicator.options.dataLabels.enabled) {
            pointsLength = indicator.points.length;
            // For every Resistance/Support group we need to render labels.
            // Add one more item, which will just store dataLabels from
            // previous iteration
            pointMapping.concat([false]).forEach((position, k) => {
                i = pointsLength;
                while (i--) {
                    point = indicator.points[i];
                    if (!position) {
                        // Store S4 dataLabel too:
                        point['dataLabel' + pointMapping[k - 1]] =
                            point.dataLabel;
                    }
                    else {
                        point.y = point[position];
                        point.pivotLine = position;
                        point.plotY = point['plot' + position];
                        currentLabel = point['dataLabel' + position];
                        // Store previous label
                        if (k) {
                            point['dataLabel' + pointMapping[k - 1]] = point.dataLabel;
                        }
                        if (!point.dataLabels) {
                            point.dataLabels = [];
                        }
                        point.dataLabels[0] = point.dataLabel =
                            currentLabel =
                                currentLabel && currentLabel.element ?
                                    currentLabel :
                                    null;
                    }
                }
                super.drawDataLabels
                    .call(indicator);
            });
        }
    }
    getValues(series, params) {
        const period = params.period, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, placement = this[params.algorithm + 'Placement'], 
        // 0- from, 1- to, 2- R1, 3- R2, 4- pivot, 5- S1 etc.
        PP = [], xData = [], yData = [];
        let endTimestamp, slicedXLen, slicedX, slicedY, lastPP, pivot, avg, i;
        // Pivot Points requires high, low and close values
        if (xVal.length < period ||
            !isArray(yVal[0]) ||
            yVal[0].length !== 4) {
            return;
        }
        for (i = period + 1; i <= yValLen + period; i += period) {
            slicedX = xVal.slice(i - period - 1, i);
            slicedY = yVal.slice(i - period - 1, i);
            slicedXLen = slicedX.length;
            endTimestamp = slicedX[slicedXLen - 1];
            pivot = this.getPivotAndHLC(slicedY);
            avg = placement(pivot);
            lastPP = PP.push([endTimestamp]
                .concat(avg));
            xData.push(endTimestamp);
            yData.push(PP[lastPP - 1].slice(1));
        }
        // We don't know exact position in ordinal axis
        // So we use simple logic:
        // Get first point in last range, calculate visible average range
        // and multiply by period
        this.endPoint = slicedX[0] + ((endTimestamp - slicedX[0]) /
            slicedXLen) * period;
        return {
            values: PP,
            xData: xData,
            yData: yData
        };
    }
    getPivotAndHLC(values) {
        const close = values[values.length - 1][3];
        let high = -Infinity, low = Infinity;
        values.forEach(function (p) {
            high = Math.max(high, p[1]);
            low = Math.min(low, p[2]);
        });
        const pivot = (high + low + close) / 3;
        return [pivot, high, low, close];
    }
    standardPlacement(values) {
        const diff = values[1] - values[2], avg = [
            null,
            null,
            values[0] + diff,
            values[0] * 2 - values[2],
            values[0],
            values[0] * 2 - values[1],
            values[0] - diff,
            null,
            null
        ];
        return avg;
    }
    camarillaPlacement(values) {
        const diff = values[1] - values[2], avg = [
            values[3] + diff * 1.5,
            values[3] + diff * 1.25,
            values[3] + diff * 1.1666,
            values[3] + diff * 1.0833,
            values[0],
            values[3] - diff * 1.0833,
            values[3] - diff * 1.1666,
            values[3] - diff * 1.25,
            values[3] - diff * 1.5
        ];
        return avg;
    }
    fibonacciPlacement(values) {
        const diff = values[1] - values[2], avg = [
            null,
            values[0] + diff,
            values[0] + diff * 0.618,
            values[0] + diff * 0.382,
            values[0],
            values[0] - diff * 0.382,
            values[0] - diff * 0.618,
            values[0] - diff,
            null
        ];
        return avg;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * Pivot points indicator. This series requires the `linkedTo` option to be
 * set and should be loaded after `stock/indicators/indicators.js` file.
 *
 * @sample stock/indicators/pivot-points
 *         Pivot points
 *
 * @extends      plotOptions.sma
 * @since        6.0.0
 * @product      highstock
 * @requires     stock/indicators/indicators
 * @requires     stock/indicators/pivot-points
 * @optionparent plotOptions.pivotpoints
 */
PivotPointsIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
    /**
     * @excluding index
     */
    params: {
        index: void 0, // Unchangeable index, do not inherit (#15362)
        period: 28,
        /**
         * Algorithm used to calculate resistance and support lines based
         * on pivot points. Implemented algorithms: `'standard'`,
         * `'fibonacci'` and `'camarilla'`
         */
        algorithm: 'standard'
    },
    marker: {
        enabled: false
    },
    enableMouseTracking: false,
    dataLabels: {
        enabled: true,
        format: '{point.pivotLine}'
    },
    dataGrouping: {
        approximation: 'averages'
    }
});
extend(PivotPointsIndicator.prototype, {
    nameBase: 'Pivot Points',
    pointArrayMap: ['R4', 'R3', 'R2', 'R1', 'P', 'S1', 'S2', 'S3', 'S4'],
    pointValKey: 'P',
    pointClass: PivotPoints_PivotPointsPoint
});
/* *
 *
 *  Registry
 *
 * */
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('pivotpoints', PivotPointsIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PivotPoints_PivotPointsIndicator = ((/* unused pure expression or super */ null && (PivotPointsIndicator)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A pivot points indicator. If the [type](#series.pivotpoints.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.pivotpoints
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/pivot-points
 * @apioption series.pivotpoints
 */
''; // To include the above in the js output'

;// ./code/es-modules/masters/indicators/pivot-points.src.js





/* harmony default export */ const pivot_points_src = ((external_highcharts_src_js_default_default()));

export { pivot_points_src as default };
