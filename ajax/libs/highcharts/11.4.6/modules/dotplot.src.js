/**
 * @license Highcharts JS v11.4.6 (2024-07-08)
 *
 * Dot plot series type for Highcharts
 *
 * (c) 2010-2024 Torstein Honsi
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
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Series/DotPlot/DotPlotSeriesDefaults.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Torstein Honsi
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
        const DotPlotSeriesDefaults = {
            itemPadding: 0.1,
            marker: {
                symbol: 'circle',
                states: {
                    hover: {},
                    select: {}
                }
            },
            slotsPerBar: void 0
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
         *  (c) 2009-2024 Torstein Honsi
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
        const { column: ColumnSeries } = SeriesRegistry.seriesTypes;
        const { extend, isNumber, merge, pick } = U;
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
        class DotPlotSeries extends ColumnSeries {
            /* *
             *
             *  Functions
             *
             * */
            drawPoints() {
                const series = this, options = series.options, renderer = series.chart.renderer, seriesMarkerOptions = options.marker, total = this.points.reduce((acc, point) => acc + Math.abs(point.y || 0), 0), totalHeight = this.points.reduce((acc, point) => acc + (point.shapeArgs?.height || 0), 0), itemPadding = options.itemPadding || 0, columnWidth = this.points[0]?.shapeArgs?.width || 0;
                let slotsPerBar = options.slotsPerBar, slotWidth = columnWidth;
                // Find the suitable number of slots per column
                if (!isNumber(slotsPerBar)) {
                    slotsPerBar = 1;
                    while (slotsPerBar < total) {
                        if (total / slotsPerBar <
                            (totalHeight / slotWidth) * 1.2) {
                            break;
                        }
                        slotsPerBar++;
                        slotWidth = columnWidth / slotsPerBar;
                    }
                }
                const height = (totalHeight * slotsPerBar) / total;
                for (const point of series.points) {
                    const pointMarkerOptions = point.marker || {}, symbol = (pointMarkerOptions.symbol ||
                        seriesMarkerOptions.symbol), radius = pick(pointMarkerOptions.radius, seriesMarkerOptions.radius), isSquare = symbol !== 'rect', width = isSquare ? height : slotWidth, shapeArgs = point.shapeArgs || {}, startX = (shapeArgs.x || 0) + ((shapeArgs.width || 0) -
                        slotsPerBar * width) / 2, positiveYValue = Math.abs(point.y ?? 0), shapeY = (shapeArgs.y || 0), shapeHeight = (shapeArgs.height || 0);
                    let graphics, x = startX, y = point.negative ? shapeY : shapeY + shapeHeight - height, slotColumn = 0;
                    point.graphics = graphics = point.graphics || [];
                    const pointAttr = point.pointAttr ?
                        (point.pointAttr[point.selected ? 'selected' : ''] ||
                            series.pointAttr['']) :
                        series.pointAttribs(point, point.selected && 'select');
                    delete pointAttr.r;
                    if (series.chart.styledMode) {
                        delete pointAttr.stroke;
                        delete pointAttr['stroke-width'];
                    }
                    if (typeof point.y === 'number') {
                        if (!point.graphic) {
                            point.graphic = renderer.g('point').add(series.group);
                        }
                        for (let val = 0; val < positiveYValue; val++) {
                            const attr = {
                                x: x + width * itemPadding,
                                y: y + height * itemPadding,
                                width: width * (1 - 2 * itemPadding),
                                height: height * (1 - 2 * itemPadding),
                                r: radius
                            };
                            let graphic = graphics[val];
                            if (graphic) {
                                graphic.animate(attr);
                            }
                            else {
                                graphic = renderer
                                    .symbol(symbol)
                                    .attr(extend(attr, pointAttr))
                                    .add(point.graphic);
                            }
                            graphic.isActive = true;
                            graphics[val] = graphic;
                            x += width;
                            slotColumn++;
                            if (slotColumn >= slotsPerBar) {
                                slotColumn = 0;
                                x = startX;
                                y = point.negative ? y + height : y - height;
                            }
                        }
                    }
                    let i = -1;
                    for (const graphic of graphics) {
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
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        DotPlotSeries.defaultOptions = merge(ColumnSeries.defaultOptions, DotPlotSeriesDefaults);
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
    _registerModule(_modules, 'masters/modules/dotplot.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
