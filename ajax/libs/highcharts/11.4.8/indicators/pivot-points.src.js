/**
 * @license Highstock JS v11.4.8 (2024-08-29)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Paweł Fus
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/pivot-points', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Stock/Indicators/PivotPoints/PivotPointsPoint.js', [_modules['Core/Series/SeriesRegistry.js']], function (SeriesRegistry) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const SMAPoint = SeriesRegistry.seriesTypes.sma.prototype.pointClass;
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
            SeriesRegistry.seriesTypes.sma.prototype.pointClass.prototype[functionName].call(point);
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

        return PivotPointsPoint;
    });
    _registerModule(_modules, 'Stock/Indicators/PivotPoints/PivotPointsIndicator.js', [_modules['Stock/Indicators/PivotPoints/PivotPointsPoint.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (PivotPointsPoint, SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { merge, extend, defined, isArray } = U;
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
            pointClass: PivotPointsPoint
        });
        /* *
         *
         *  Registry
         *
         * */
        SeriesRegistry.registerSeriesType('pivotpoints', PivotPointsIndicator);
        /* *
         *
         *  Default Export
         *
         * */
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

        return PivotPointsIndicator;
    });
    _registerModule(_modules, 'masters/indicators/pivot-points.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
