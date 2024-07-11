/**
 * @license Highstock JS v11.4.6 (2024-07-08)
 *
 * Advanced Highcharts Stock tools
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
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
    _registerModule(_modules, 'Extensions/PriceIndication.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /**
         * (c) 2009-2024 Sebastian Bochann
         *
         * Price indicator for Highcharts
         *
         * License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         */
        const { composed } = H;
        const { addEvent, isArray, merge, pushUnique } = U;
        /* *
         *
         *  Composition
         *
         * */
        /** @private */
        function compose(SeriesClass) {
            if (pushUnique(composed, 'PriceIndication')) {
                addEvent(SeriesClass, 'afterRender', onSeriesAfterRender);
            }
        }
        /** @private */
        function onSeriesAfterRender() {
            const series = this, seriesOptions = series.options, lastVisiblePrice = seriesOptions.lastVisiblePrice, lastPrice = seriesOptions.lastPrice;
            if ((lastVisiblePrice || lastPrice) &&
                seriesOptions.id !== 'highcharts-navigator-series') {
                const xAxis = series.xAxis, yAxis = series.yAxis, origOptions = yAxis.crosshair, origGraphic = yAxis.cross, origLabel = yAxis.crossLabel, points = series.points, yLength = series.yData.length, pLength = points.length, x = series.xData[series.xData.length - 1], y = series.yData[yLength - 1];
                let yValue;
                if (lastPrice && lastPrice.enabled) {
                    yAxis.crosshair = yAxis.options.crosshair = seriesOptions.lastPrice;
                    if (!series.chart.styledMode &&
                        yAxis.crosshair &&
                        yAxis.options.crosshair &&
                        seriesOptions.lastPrice) {
                        // Set the default color from the series, #14888.
                        yAxis.crosshair.color = yAxis.options.crosshair.color =
                            seriesOptions.lastPrice.color || series.color;
                    }
                    yAxis.cross = series.lastPrice;
                    yValue = isArray(y) ? y[3] : y;
                    if (series.lastPriceLabel) {
                        series.lastPriceLabel.destroy();
                    }
                    delete yAxis.crossLabel;
                    yAxis.drawCrosshair(null, ({
                        x: x,
                        y: yValue,
                        plotX: xAxis.toPixels(x, true),
                        plotY: yAxis.toPixels(yValue, true)
                    }));
                    // Save price
                    if (series.yAxis.cross) {
                        series.lastPrice = series.yAxis.cross;
                        series.lastPrice.addClass('highcharts-color-' + series.colorIndex); // #15222
                        series.lastPrice.y = yValue;
                    }
                    series.lastPriceLabel = yAxis.crossLabel;
                }
                if (lastVisiblePrice && lastVisiblePrice.enabled && pLength > 0) {
                    yAxis.crosshair = yAxis.options.crosshair = merge({
                        color: 'transparent' // Line invisible by default
                    }, seriesOptions.lastVisiblePrice);
                    yAxis.cross = series.lastVisiblePrice;
                    const lastPoint = points[pLength - 1].isInside ?
                        points[pLength - 1] : points[pLength - 2];
                    if (series.lastVisiblePriceLabel) {
                        series.lastVisiblePriceLabel.destroy();
                    }
                    // Set to undefined to avoid collision with
                    // the yAxis crosshair #11480
                    // Delete the crossLabel each time the code is invoked, #13876.
                    delete yAxis.crossLabel;
                    // Save price
                    yAxis.drawCrosshair(null, lastPoint);
                    if (yAxis.cross) {
                        series.lastVisiblePrice = yAxis.cross;
                        if (lastPoint && typeof lastPoint.y === 'number') {
                            series.lastVisiblePrice.y = lastPoint.y;
                        }
                    }
                    series.lastVisiblePriceLabel = yAxis.crossLabel;
                }
                // Restore crosshair:
                yAxis.crosshair = yAxis.options.crosshair = origOptions;
                yAxis.cross = origGraphic;
                yAxis.crossLabel = origLabel;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const PriceIndication = {
            compose
        };
        /* *
         *
         *  API Options
         *
         * */
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
         * @default   false
         * @apioption plotOptions.series.lastVisiblePrice.enabled
         */
        /**
         * @declare   Highcharts.SeriesLastVisiblePriceLabelOptionsObject
         * @extends   yAxis.crosshair.label
         * @since     7.0.0
         * @apioption plotOptions.series.lastVisiblePrice.label
         */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastVisiblePrice.label.align
         */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastVisiblePrice.label.backgroundColor
         */
        /**
         * The border color for the `lastVisiblePrice` label.
         *
         * @type      {Highcharts.ColorType}
         * @since     7.0.0
         * @product   highstock
         * @apioption plotOptions.series.lastVisiblePrice.label.borderColor
         */
        /**
         * The border corner radius of the `lastVisiblePrice` label.
         *
         * @type      {number}
         * @default   3
         * @since     7.0.0
         * @product   highstock
         * @apioption plotOptions.series.lastVisiblePrice.label.borderRadius
        */
        /**
         * Flag to enable `lastVisiblePrice` label.
         *
         *
         * @type      {boolean}
         * @default   false
         * @since     7.0
         * @product   highstock
         * @apioption plotOptions.series.lastVisiblePrice.label.enabled
         */
        /**
         * A format string for the `lastVisiblePrice` label. Defaults to `{value}` for
         * numeric axes and `{value:%b %d, %Y}` for datetime axes.
         *
         * @type      {string}
         * @since     7.0
         * @product   highstock
         * @apioption plotOptions.series.lastVisiblePrice.label.format
        */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastVisiblePrice.label.formatter
         */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastVisiblePrice.label.padding
         */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastVisiblePrice.label.shape
         */
        /**
         * Text styles for the `lastVisiblePrice` label.
         *
         * @type      {Highcharts.CSSObject}
         * @default   {"color": "white", "fontWeight": "normal", "fontSize": "11px", "textAlign": "center"}
         * @since     7.0
         * @product   highstock
         * @apioption plotOptions.series.lastVisiblePrice.label.style
         */
        /**
         * The border width for the `lastVisiblePrice` label.
         *
         * @type      {number}
         * @default   0
         * @since     7.0
         * @product   highstock
         * @apioption plotOptions.series.lastVisiblePrice.label.borderWidth
        */
        /**
         * Padding inside the `lastVisiblePrice` label.
         *
         * @type      {number}
         * @default   8
         * @since     7.0
         * @product   highstock
         * @apioption plotOptions.series.lastVisiblePrice.label.padding
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
         * @default   false
         * @apioption plotOptions.series.lastPrice.enabled
         */
        /**
         * @declare   Highcharts.SeriesLastPriceLabelOptionsObject
         * @extends   yAxis.crosshair.label
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label
         */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label.align
         * */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label.backgroundColor
         * */
        /**
         * The border color of `lastPrice` label.
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label.borderColor
         * */
        /**
         * The border radius of `lastPrice` label.
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label.borderRadius
         * */
        /**
         * The border width of `lastPrice` label.
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label.borderWidth
         * */
        /**
         * Flag to enable `lastPrice` label.
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label.enabled
         * */
        /**
         * A format string for the `lastPrice` label. Defaults to `{value}` for
         * numeric axes and `{value:%b %d, %Y}` for datetime axes.
         *
         * @type      {string}
         * @since     7.0
         * @product   highstock
         * @apioption plotOptions.series.lastPrice.label.format
        */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label.formatter
         */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label.padding
         */
        /**
         * @since     7.0.0
         * @apioption plotOptions.series.lastPrice.label.shape
         */
        /**
         * Text styles for the `lastPrice` label.
         *
         * @type      {Highcharts.CSSObject}
         * @default   {"color": "white", "fontWeight": "normal", "fontSize": "11px", "textAlign": "center"}
         * @since     7.0
         * @product   highstock
         * @apioption plotOptions.series.lastPrice.label.style
         */
        /**
         * The border width for the `lastPrice` label.
         *
         * @type      {number}
         * @default   0
         * @since     7.0
         * @product   highstock
         * @apioption plotOptions.series.lastPrice.label.borderWidth
        */
        /**
         * Padding inside the `lastPrice` label.
         *
         * @type      {number}
         * @default   8
         * @since     7.0
         * @product   highstock
         * @apioption plotOptions.series.lastPrice.label.padding
         */
        /**
         * The color of the line of last price.
         * By default, the line has the same color as the series.
         *
         * @type      {string}
         * @product   highstock
         * @apioption plotOptions.series.lastPrice.color
         *
         */
        ''; // Keeps doclets above in JS file

        return PriceIndication;
    });
    _registerModule(_modules, 'masters/modules/price-indicator.src.js', [_modules['Core/Globals.js'], _modules['Extensions/PriceIndication.js']], function (Highcharts, PriceIndication) {

        const G = Highcharts;
        PriceIndication.compose(G.Series);

        return Highcharts;
    });
}));
