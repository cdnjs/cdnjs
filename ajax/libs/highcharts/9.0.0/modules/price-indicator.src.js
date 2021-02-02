/**
 * @license Highstock JS v9.0.0 (2021-02-02)
 *
 * Advanced Highstock tools
 *
 * (c) 2010-2019 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/price-indicator', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'Extensions/PriceIndication.js', [_modules['Core/Series/Series.js'], _modules['Core/Utilities.js']], function (Series, U) {
        /**
         * (c) 2009-2021 Sebastian Bochann
         *
         * Price indicator for Highcharts
         *
         * License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         */
        var addEvent = U.addEvent,
            isArray = U.isArray,
            merge = U.merge;
        /**
         * The line marks the last price from visible range of points.
         *
         * @sample {highstock} stock/indicators/last-visible-price
         *         Last visible price
         *
         * @declare   Highcharts.SeriesLastVisiblePriceOptionsObject
         * @product   highstock
         * @requires  modules/price-indicator
         * @apioption plotOptions.series.lastVisiblePrice
         */
        /**
         * Enable or disable the indicator.
         *
         * @type      {boolean}
         * @product   highstock
         * @default   true
         * @apioption plotOptions.series.lastVisiblePrice.enabled
         */
        /**
         * @declare   Highcharts.SeriesLastVisiblePriceLabelOptionsObject
         * @apioption plotOptions.series.lastVisiblePrice.label
         */
        /**
         * Enable or disable the label.
         *
         * @type      {boolean}
         * @product   highstock
         * @default   true
         * @apioption plotOptions.series.lastVisiblePrice.label.enabled
         *
         */
        /**
         * The line marks the last price from all points.
         *
         * @sample {highstock} stock/indicators/last-price
         *         Last price
         *
         * @declare   Highcharts.SeriesLastPriceOptionsObject
         * @product   highstock
         * @requires  modules/price-indicator
         * @apioption plotOptions.series.lastPrice
         */
        /**
         * Enable or disable the indicator.
         *
         * @type      {boolean}
         * @product   highstock
         * @default   true
         * @apioption plotOptions.series.lastPrice.enabled
         */
        /**
         * The color of the line of last price.
         *
         * @type      {string}
         * @product   highstock
         * @default   red
         * @apioption plotOptions.series.lastPrice.color
         *
         */
        /* eslint-disable no-invalid-this */
        addEvent(Series, 'afterRender', function () {
            var serie = this,
                seriesOptions = serie.options,
                pointRange = seriesOptions.pointRange,
                lastVisiblePrice = seriesOptions.lastVisiblePrice,
                lastPrice = seriesOptions.lastPrice;
            if ((lastVisiblePrice || lastPrice) &&
                seriesOptions.id !== 'highcharts-navigator-series') {
                var xAxis = serie.xAxis,
                    yAxis = serie.yAxis,
                    origOptions = yAxis.crosshair,
                    origGraphic = yAxis.cross,
                    origLabel = yAxis.crossLabel,
                    points = serie.points,
                    yLength = serie.yData.length,
                    pLength = points.length,
                    x = serie.xData[serie.xData.length - 1],
                    y = serie.yData[yLength - 1],
                    lastPoint,
                    yValue,
                    crop;
                if (lastPrice && lastPrice.enabled) {
                    yAxis.crosshair = yAxis.options.crosshair = seriesOptions.lastPrice;
                    yAxis.cross = serie.lastPrice;
                    yValue = isArray(y) ? y[3] : y;
                    yAxis.drawCrosshair(null, ({
                        x: x,
                        y: yValue,
                        plotX: xAxis.toPixels(x, true),
                        plotY: yAxis.toPixels(yValue, true)
                    }));
                    // Save price
                    if (serie.yAxis.cross) {
                        serie.lastPrice = serie.yAxis.cross;
                        serie.lastPrice.y = yValue;
                    }
                }
                if (lastVisiblePrice &&
                    lastVisiblePrice.enabled &&
                    pLength > 0) {
                    crop = (points[pLength - 1].x === x) || pointRange === null ? 1 : 2;
                    yAxis.crosshair = yAxis.options.crosshair = merge({
                        color: 'transparent'
                    }, seriesOptions.lastVisiblePrice);
                    yAxis.cross = serie.lastVisiblePrice;
                    lastPoint = points[pLength - crop];
                    if (serie.crossLabel) {
                        serie.crossLabel.destroy();
                        // Set to undefined to avoid collision with
                        // the yAxis crosshair #11480
                        delete yAxis.crossLabel;
                    }
                    // Save price
                    yAxis.drawCrosshair(null, lastPoint);
                    if (yAxis.cross) {
                        serie.lastVisiblePrice = yAxis.cross;
                        if (typeof lastPoint.y === 'number') {
                            serie.lastVisiblePrice.y = lastPoint.y;
                        }
                    }
                    serie.crossLabel = yAxis.crossLabel;
                }
                // Restore crosshair:
                yAxis.crosshair = yAxis.options.crosshair = origOptions;
                yAxis.cross = origGraphic;
                yAxis.crossLabel = origLabel;
            }
        });

    });
    _registerModule(_modules, 'masters/modules/price-indicator.src.js', [], function () {


    });
}));