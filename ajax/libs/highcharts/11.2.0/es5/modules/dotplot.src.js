/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 *
 * Dot plot series type for Highcharts
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/dotplot', ['highcharts'], function (Highcharts) {
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
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Series/DotPlot/DotPlotSeriesDefaults.js', [], function () {
        /* *
         *
         *  (c) 2009-2021 Torstein Honsi
         *
         *  Dot plot series type for Highcharts
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        var DotPlotSeriesDefaults = {
                itemPadding: 0.2,
                marker: {
                    symbol: 'circle',
                    states: {
                        hover: {},
                        select: {}
                    }
                }
            };
        /* *
         *
         *  Default Export
         *
         * */

        return DotPlotSeriesDefaults;
    });
    _registerModule(_modules, 'Series/DotPlot/DotPlotSeries.js', [_modules['Series/DotPlot/DotPlotSeriesDefaults.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (DotPlotSeriesDefaults, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2009-2021 Torstein Honsi
         *
         *  Dot plot series type for Highcharts
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * @private
         * @todo
         * - Check update, remove etc.
         * - Custom icons like persons, carts etc. Either as images, font icons or
         *   Highcharts symbols.
         */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var ColumnSeries = SeriesRegistry.seriesTypes.column;
        var extend = U.extend,
            merge = U.merge,
            pick = U.pick;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.dotplot
         *
         * @augments Highcharts.Series
         */
        var DotPlotSeries = /** @class */ (function (_super) {
                __extends(DotPlotSeries, _super);
            function DotPlotSeries() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            DotPlotSeries.prototype.drawPoints = function () {
                var series = this,
                    options = series.options,
                    renderer = series.chart.renderer,
                    seriesMarkerOptions = options.marker,
                    itemPaddingTranslated = series.yAxis.transA *
                        options.itemPadding,
                    borderWidth = series.borderWidth,
                    crisp = borderWidth % 2 ? 0.5 : 1;
                for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                    var point = _a[_i];
                    var pointMarkerOptions = point.marker || {},
                        symbol = (pointMarkerOptions.symbol ||
                            seriesMarkerOptions.symbol),
                        radius = pick(pointMarkerOptions.radius,
                        seriesMarkerOptions.radius),
                        isSquare = symbol !== 'rect';
                    var yPos = void 0,
                        attr = void 0,
                        graphics = void 0,
                        size = void 0,
                        yTop = void 0,
                        x = void 0,
                        y = void 0;
                    point.graphics = graphics = point.graphics || [];
                    var pointAttr = point.pointAttr ?
                            (point.pointAttr[point.selected ? 'selected' : ''] ||
                                series.pointAttr['']) :
                            series.pointAttribs(point,
                        point.selected && 'select');
                    delete pointAttr.r;
                    if (series.chart.styledMode) {
                        delete pointAttr.stroke;
                        delete pointAttr['stroke-width'];
                    }
                    if (point.y !== null) {
                        if (!point.graphic) {
                            point.graphic = renderer.g('point').add(series.group);
                        }
                        yTop = pick(point.stackY, point.y);
                        size = Math.min(point.pointWidth, series.yAxis.transA - itemPaddingTranslated);
                        var i_1 = Math.floor(yTop);
                        for (yPos = yTop; yPos > yTop - point.y; yPos--, i_1--) {
                            x = point.barX + (isSquare ?
                                point.pointWidth / 2 - size / 2 :
                                0);
                            y = series.yAxis.toPixels(yPos, true) +
                                itemPaddingTranslated / 2;
                            if (series.options.crisp) {
                                x = Math.round(x) - crisp;
                                y = Math.round(y) + crisp;
                            }
                            attr = {
                                x: x,
                                y: y,
                                width: Math.round(isSquare ? size : point.pointWidth),
                                height: Math.round(size),
                                r: radius
                            };
                            var graphic = graphics[i_1];
                            if (graphic) {
                                graphic.animate(attr);
                            }
                            else {
                                graphic = renderer.symbol(symbol)
                                    .attr(extend(attr, pointAttr))
                                    .add(point.graphic);
                            }
                            graphic.isActive = true;
                            graphics[i_1] = graphic;
                        }
                    }
                    var i = -1;
                    for (var _b = 0, graphics_1 = graphics; _b < graphics_1.length; _b++) {
                        var graphic = graphics_1[_b];
                        ++i;
                        if (graphic) {
                            if (!graphic.isActive) {
                                graphic.destroy();
                                graphics.splice(i, 1);
                            }
                            else {
                                graphic.isActive = false;
                            }
                        }
                    }
                }
            };
            DotPlotSeries.defaultOptions = merge(ColumnSeries.defaultOptions, DotPlotSeriesDefaults);
            return DotPlotSeries;
        }(ColumnSeries));
        extend(DotPlotSeries.prototype, {
            markerAttribs: void 0
        });
        SeriesRegistry.registerSeriesType('dotplot', DotPlotSeries);
        /* *
         *
         *  Default Export
         *
         * */

        return DotPlotSeries;
    });
    _registerModule(_modules, 'masters/modules/dotplot.src.js', [], function () {


    });
}));