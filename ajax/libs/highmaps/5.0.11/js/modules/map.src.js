/**
 * @license Highmaps JS v5.0.11 (2017-05-04)
 * Highmaps as a plugin for Highcharts 4.1.x or Highstock 2.1.x (x being the patch version of this file)
 *
 * (c) 2011-2017 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function(factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function(Highcharts) {
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var Axis = H.Axis,
            each = H.each,
            pick = H.pick,
            wrap = H.wrap;
        /**
         * Override to use the extreme coordinates from the SVG shape, not the
         * data values
         */
        wrap(Axis.prototype, 'getSeriesExtremes', function(proceed) {
            var isXAxis = this.isXAxis,
                dataMin,
                dataMax,
                xData = [],
                useMapGeometry;

            // Remove the xData array and cache it locally so that the proceed method doesn't use it
            if (isXAxis) {
                each(this.series, function(series, i) {
                    if (series.useMapGeometry) {
                        xData[i] = series.xData;
                        series.xData = [];
                    }
                });
            }

            // Call base to reach normal cartesian series (like mappoint)
            proceed.call(this);

            // Run extremes logic for map and mapline
            if (isXAxis) {
                dataMin = pick(this.dataMin, Number.MAX_VALUE);
                dataMax = pick(this.dataMax, -Number.MAX_VALUE);
                each(this.series, function(series, i) {
                    if (series.useMapGeometry) {
                        dataMin = Math.min(dataMin, pick(series.minX, dataMin));
                        dataMax = Math.max(dataMax, pick(series.maxX, dataMin));
                        series.xData = xData[i]; // Reset xData array
                        useMapGeometry = true;
                    }
                });
                if (useMapGeometry) {
                    this.dataMin = dataMin;
                    this.dataMax = dataMax;
                }
            }
        });

        /**
         * Override axis translation to make sure the aspect ratio is always kept
         */
        wrap(Axis.prototype, 'setAxisTranslation', function(proceed) {
            var chart = this.chart,
                mapRatio,
                plotRatio = chart.plotWidth / chart.plotHeight,
                adjustedAxisLength,
                xAxis = chart.xAxis[0],
                padAxis,
                fixTo,
                fixDiff,
                preserveAspectRatio;


            // Run the parent method
            proceed.call(this);

            // Check for map-like series
            if (this.coll === 'yAxis' && xAxis.transA !== undefined) {
                each(this.series, function(series) {
                    if (series.preserveAspectRatio) {
                        preserveAspectRatio = true;
                    }
                });
            }

            // On Y axis, handle both
            if (preserveAspectRatio) {

                // Use the same translation for both axes
                this.transA = xAxis.transA = Math.min(this.transA, xAxis.transA);

                mapRatio = plotRatio / ((xAxis.max - xAxis.min) / (this.max - this.min));

                // What axis to pad to put the map in the middle
                padAxis = mapRatio < 1 ? this : xAxis;

                // Pad it
                adjustedAxisLength = (padAxis.max - padAxis.min) * padAxis.transA;
                padAxis.pixelPadding = padAxis.len - adjustedAxisLength;
                padAxis.minPixelPadding = padAxis.pixelPadding / 2;

                fixTo = padAxis.fixTo;
                if (fixTo) {
                    fixDiff = fixTo[1] - padAxis.toValue(fixTo[0], true);
                    fixDiff *= padAxis.transA;
                    if (Math.abs(fixDiff) > padAxis.minPixelPadding || (padAxis.min === padAxis.dataMin && padAxis.max === padAxis.dataMax)) { // zooming out again, keep within restricted area
                        fixDiff = 0;
                    }
                    padAxis.minPixelPadding -= fixDiff;
                }
            }
        });

        /**
         * Override Axis.render in order to delete the fixTo prop
         */
        wrap(Axis.prototype, 'render', function(proceed) {
            proceed.call(this);
            this.fixTo = null;
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var Axis = H.Axis,
            Chart = H.Chart,
            color = H.color,
            ColorAxis,
            each = H.each,
            extend = H.extend,
            isNumber = H.isNumber,
            Legend = H.Legend,
            LegendSymbolMixin = H.LegendSymbolMixin,
            noop = H.noop,
            merge = H.merge,
            pick = H.pick,
            wrap = H.wrap;

        /**
         * The ColorAxis object for inclusion in gradient legends
         */
        ColorAxis = H.ColorAxis = function() {
            this.init.apply(this, arguments);
        };
        extend(ColorAxis.prototype, Axis.prototype);
        extend(ColorAxis.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: true,
                endOnTick: true,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: 0.01

                },
                labels: {
                    overflow: 'justify',
                    rotation: 0
                },
                minColor: '#e6ebf5',
                maxColor: '#003399',
                tickLength: 5,
                showInLegend: true
            },

            // Properties to preserve after destroy, for Axis.update (#5881, #6025)
            keepProps: [
                'legendGroup',
                'legendItemHeight',
                'legendItemWidth',
                'legendItem',
                'legendSymbol'
            ].concat(Axis.prototype.keepProps),

            /**
             * Initialize the color axis
             */
            init: function(chart, userOptions) {
                var horiz = chart.options.legend.layout !== 'vertical',
                    options;

                this.coll = 'colorAxis';

                // Build the options
                options = merge(this.defaultColorAxisOptions, {
                    side: horiz ? 2 : 1,
                    reversed: !horiz
                }, userOptions, {
                    opposite: !horiz,
                    showEmpty: false,
                    title: null
                });

                Axis.prototype.init.call(this, chart, options);

                // Base init() pushes it to the xAxis array, now pop it again
                //chart[this.isXAxis ? 'xAxis' : 'yAxis'].pop();

                // Prepare data classes
                if (userOptions.dataClasses) {
                    this.initDataClasses(userOptions);
                }
                this.initStops(userOptions);

                // Override original axis properties
                this.horiz = horiz;
                this.zoomEnabled = false;

                // Add default values		
                this.defaultLegendLength = 200;
            },

            /*
             * Return an intermediate color between two colors, according to pos where 0
             * is the from color and 1 is the to color.
             * NOTE: Changes here should be copied
             * to the same function in drilldown.src.js and solid-gauge-src.js.
             */
            tweenColors: function(from, to, pos) {
                // Check for has alpha, because rgba colors perform worse due to lack of
                // support in WebKit.
                var hasAlpha,
                    ret;

                // Unsupported color, return to-color (#3920)
                if (!to.rgba.length || !from.rgba.length) {
                    ret = to.input || 'none';

                    // Interpolate
                } else {
                    from = from.rgba;
                    to = to.rgba;
                    hasAlpha = (to[3] !== 1 || from[3] !== 1);
                    ret = (hasAlpha ? 'rgba(' : 'rgb(') +
                        Math.round(to[0] + (from[0] - to[0]) * (1 - pos)) + ',' +
                        Math.round(to[1] + (from[1] - to[1]) * (1 - pos)) + ',' +
                        Math.round(to[2] + (from[2] - to[2]) * (1 - pos)) +
                        (hasAlpha ? (',' + (to[3] + (from[3] - to[3]) * (1 - pos))) : '') + ')';
                }
                return ret;
            },

            initDataClasses: function(userOptions) {
                var axis = this,
                    chart = this.chart,
                    dataClasses,
                    colorCounter = 0,
                    colorCount = chart.options.chart.colorCount,
                    options = this.options,
                    len = userOptions.dataClasses.length;
                this.dataClasses = dataClasses = [];
                this.legendItems = [];

                each(userOptions.dataClasses, function(dataClass, i) {
                    var colors;

                    dataClass = merge(dataClass);
                    dataClasses.push(dataClass);
                    if (!dataClass.color) {
                        if (options.dataClassColor === 'category') {

                            dataClass.colorIndex = colorCounter;

                            // increase and loop back to zero
                            colorCounter++;
                            if (colorCounter === colorCount) {
                                colorCounter = 0;
                            }
                        } else {
                            dataClass.color = axis.tweenColors(
                                color(options.minColor),
                                color(options.maxColor),
                                len < 2 ? 0.5 : i / (len - 1) // #3219
                            );
                        }
                    }
                });
            },

            initStops: function(userOptions) {
                this.stops = userOptions.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                each(this.stops, function(stop) {
                    stop.color = color(stop[1]);
                });
            },

            /**
             * Extend the setOptions method to process extreme colors and color
             * stops.
             */
            setOptions: function(userOptions) {
                Axis.prototype.setOptions.call(this, userOptions);

                this.options.crosshair = this.options.marker;
            },

            setAxisSize: function() {
                var symbol = this.legendSymbol,
                    chart = this.chart,
                    legendOptions = chart.options.legend || {},
                    x,
                    y,
                    width,
                    height;

                if (symbol) {
                    this.left = x = symbol.attr('x');
                    this.top = y = symbol.attr('y');
                    this.width = width = symbol.attr('width');
                    this.height = height = symbol.attr('height');
                    this.right = chart.chartWidth - x - width;
                    this.bottom = chart.chartHeight - y - height;

                    this.len = this.horiz ? width : height;
                    this.pos = this.horiz ? x : y;
                } else {
                    // Fake length for disabled legend to avoid tick issues and such (#5205)
                    this.len = (this.horiz ? legendOptions.symbolWidth : legendOptions.symbolHeight) || this.defaultLegendLength;
                }
            },

            /**
             * Translate from a value to a color
             */
            toColor: function(value, point) {
                var pos,
                    stops = this.stops,
                    from,
                    to,
                    color,
                    dataClasses = this.dataClasses,
                    dataClass,
                    i;

                if (dataClasses) {
                    i = dataClasses.length;
                    while (i--) {
                        dataClass = dataClasses[i];
                        from = dataClass.from;
                        to = dataClass.to;
                        if ((from === undefined || value >= from) && (to === undefined || value <= to)) {
                            color = dataClass.color;
                            if (point) {
                                point.dataClass = i;
                                point.colorIndex = dataClass.colorIndex;
                            }
                            break;
                        }
                    }

                } else {

                    if (this.isLog) {
                        value = this.val2lin(value);
                    }
                    pos = 1 - ((this.max - value) / ((this.max - this.min) || 1));
                    i = stops.length;
                    while (i--) {
                        if (pos > stops[i][0]) {
                            break;
                        }
                    }
                    from = stops[i] || stops[i + 1];
                    to = stops[i + 1] || from;

                    // The position within the gradient
                    pos = 1 - (to[0] - pos) / ((to[0] - from[0]) || 1);

                    color = this.tweenColors(
                        from.color,
                        to.color,
                        pos
                    );
                }
                return color;
            },

            /**
             * Override the getOffset method to add the whole axis groups inside the legend.
             */
            getOffset: function() {
                var group = this.legendGroup,
                    sideOffset = this.chart.axisOffset[this.side];

                if (group) {

                    // Hook for the getOffset method to add groups to this parent group
                    this.axisParent = group;

                    // Call the base
                    Axis.prototype.getOffset.call(this);

                    // First time only
                    if (!this.added) {

                        this.added = true;

                        this.labelLeft = 0;
                        this.labelRight = this.width;
                    }
                    // Reset it to avoid color axis reserving space
                    this.chart.axisOffset[this.side] = sideOffset;
                }
            },

            /**
             * Create the color gradient
             */
            setLegendColor: function() {
                var grad,
                    horiz = this.horiz,
                    options = this.options,
                    reversed = this.reversed,
                    one = reversed ? 1 : 0,
                    zero = reversed ? 0 : 1;

                grad = horiz ? [one, 0, zero, 0] : [0, zero, 0, one]; // #3190
                this.legendColor = {
                    linearGradient: {
                        x1: grad[0],
                        y1: grad[1],
                        x2: grad[2],
                        y2: grad[3]
                    },
                    stops: options.stops || [
                        [0, options.minColor],
                        [1, options.maxColor]
                    ]
                };
            },

            /**
             * The color axis appears inside the legend and has its own legend symbol
             */
            drawLegendSymbol: function(legend, item) {
                var padding = legend.padding,
                    legendOptions = legend.options,
                    horiz = this.horiz,
                    width = pick(legendOptions.symbolWidth, horiz ? this.defaultLegendLength : 12),
                    height = pick(legendOptions.symbolHeight, horiz ? 12 : this.defaultLegendLength),
                    labelPadding = pick(legendOptions.labelPadding, horiz ? 16 : 30),
                    itemDistance = pick(legendOptions.itemDistance, 10);

                this.setLegendColor();

                // Create the gradient
                item.legendSymbol = this.chart.renderer.rect(
                    0,
                    legend.baseline - 11,
                    width,
                    height
                ).attr({
                    zIndex: 1
                }).add(item.legendGroup);

                // Set how much space this legend item takes up
                this.legendItemWidth = width + padding + (horiz ? itemDistance : labelPadding);
                this.legendItemHeight = height + padding + (horiz ? labelPadding : 0);
            },
            /**
             * Fool the legend
             */
            setState: noop,
            visible: true,
            setVisible: noop,
            getSeriesExtremes: function() {
                var series = this.series,
                    i = series.length;
                this.dataMin = Infinity;
                this.dataMax = -Infinity;
                while (i--) {
                    if (series[i].valueMin !== undefined) {
                        this.dataMin = Math.min(this.dataMin, series[i].valueMin);
                        this.dataMax = Math.max(this.dataMax, series[i].valueMax);
                    }
                }
            },
            drawCrosshair: function(e, point) {
                var plotX = point && point.plotX,
                    plotY = point && point.plotY,
                    crossPos,
                    axisPos = this.pos,
                    axisLen = this.len;

                if (point) {
                    crossPos = this.toPixels(point[point.series.colorKey]);
                    if (crossPos < axisPos) {
                        crossPos = axisPos - 2;
                    } else if (crossPos > axisPos + axisLen) {
                        crossPos = axisPos + axisLen + 2;
                    }

                    point.plotX = crossPos;
                    point.plotY = this.len - crossPos;
                    Axis.prototype.drawCrosshair.call(this, e, point);
                    point.plotX = plotX;
                    point.plotY = plotY;

                    if (this.cross) {
                        this.cross
                            .addClass('highcharts-coloraxis-marker')
                            .add(this.legendGroup);



                    }
                }
            },
            getPlotLinePath: function(a, b, c, d, pos) {
                return isNumber(pos) ? // crosshairs only // #3969 pos can be 0 !!
                    (this.horiz ? ['M', pos - 4, this.top - 6, 'L', pos + 4, this.top - 6, pos, this.top, 'Z'] : ['M', this.left, pos, 'L', this.left - 6, pos + 6, this.left - 6, pos - 6, 'Z']) :
                    Axis.prototype.getPlotLinePath.call(this, a, b, c, d);
            },

            update: function(newOptions, redraw) {
                var chart = this.chart,
                    legend = chart.legend;

                each(this.series, function(series) {
                    series.isDirtyData = true; // Needed for Axis.update when choropleth colors change
                });

                // When updating data classes, destroy old items and make sure new ones are created (#3207)
                if (newOptions.dataClasses && legend.allItems) {
                    each(legend.allItems, function(item) {
                        if (item.isDataClass && item.legendGroup) {
                            item.legendGroup.destroy();
                        }
                    });
                    chart.isDirtyLegend = true;
                }

                // Keep the options structure updated for export. Unlike xAxis and yAxis, the colorAxis is
                // not an array. (#3207)
                chart.options[this.coll] = merge(this.userOptions, newOptions);

                Axis.prototype.update.call(this, newOptions, redraw);
                if (this.legendItem) {
                    this.setLegendColor();
                    legend.colorizeItem(this, true);
                }
            },

            /**
             * Extend basic axis remove by also removing the legend item.
             */
            remove: function() {
                if (this.legendItem) {
                    this.chart.legend.destroyItem(this);
                }
                Axis.prototype.remove.call(this);
            },

            /**
             * Get the legend item symbols for data classes
             */
            getDataClassLegendSymbols: function() {
                var axis = this,
                    chart = this.chart,
                    legendItems = this.legendItems,
                    legendOptions = chart.options.legend,
                    valueDecimals = legendOptions.valueDecimals,
                    valueSuffix = legendOptions.valueSuffix || '',
                    name;

                if (!legendItems.length) {
                    each(this.dataClasses, function(dataClass, i) {
                        var vis = true,
                            from = dataClass.from,
                            to = dataClass.to;

                        // Assemble the default name. This can be overridden by legend.options.labelFormatter
                        name = '';
                        if (from === undefined) {
                            name = '< ';
                        } else if (to === undefined) {
                            name = '> ';
                        }
                        if (from !== undefined) {
                            name += H.numberFormat(from, valueDecimals) + valueSuffix;
                        }
                        if (from !== undefined && to !== undefined) {
                            name += ' - ';
                        }
                        if (to !== undefined) {
                            name += H.numberFormat(to, valueDecimals) + valueSuffix;
                        }
                        // Add a mock object to the legend items
                        legendItems.push(extend({
                            chart: chart,
                            name: name,
                            options: {},
                            drawLegendSymbol: LegendSymbolMixin.drawRectangle,
                            visible: true,
                            setState: noop,
                            isDataClass: true,
                            setVisible: function() {
                                vis = this.visible = !vis;
                                each(axis.series, function(series) {
                                    each(series.points, function(point) {
                                        if (point.dataClass === i) {
                                            point.setVisible(vis);
                                        }
                                    });
                                });

                                chart.legend.colorizeItem(this, vis);
                            }
                        }, dataClass));
                    });
                }
                return legendItems;
            },
            name: '' // Prevents 'undefined' in legend in IE8
        });

        /**
         * Handle animation of the color attributes directly
         */
        each(['fill', 'stroke'], function(prop) {
            H.Fx.prototype[prop + 'Setter'] = function() {
                this.elem.attr(
                    prop,
                    ColorAxis.prototype.tweenColors(
                        color(this.start),
                        color(this.end),
                        this.pos
                    ),
                    null,
                    true
                );
            };
        });

        /**
         * Extend the chart getAxes method to also get the color axis
         */
        wrap(Chart.prototype, 'getAxes', function(proceed) {

            var options = this.options,
                colorAxisOptions = options.colorAxis;

            proceed.call(this);

            this.colorAxis = [];
            if (colorAxisOptions) {
                new ColorAxis(this, colorAxisOptions); // eslint-disable-line no-new
            }
        });


        /**
         * Wrap the legend getAllItems method to add the color axis. This also removes the
         * axis' own series to prevent them from showing up individually.
         */
        wrap(Legend.prototype, 'getAllItems', function(proceed) {
            var allItems = [],
                colorAxis = this.chart.colorAxis[0];

            if (colorAxis && colorAxis.options) {
                if (colorAxis.options.showInLegend) {
                    // Data classes
                    if (colorAxis.options.dataClasses) {
                        allItems = allItems.concat(colorAxis.getDataClassLegendSymbols());
                        // Gradient legend
                    } else {
                        // Add this axis on top
                        allItems.push(colorAxis);
                    }
                }

                // Don't add the color axis' series
                each(colorAxis.series, function(series) {
                    series.options.showInLegend = false;
                });
            }

            return allItems.concat(proceed.call(this));
        });

        wrap(Legend.prototype, 'colorizeItem', function(proceed, item, visible) {
            proceed.call(this, item, visible);
            if (visible && item.legendColor) {
                item.legendSymbol.attr({
                    fill: item.legendColor
                });
            }
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var defined = H.defined,
            each = H.each,
            noop = H.noop,
            seriesTypes = H.seriesTypes;

        /**
         * Mixin for maps and heatmaps
         */
        H.colorPointMixin = {
            /**
             * Color points have a value option that determines whether or not it is a null point
             */
            isValid: function() {
                return this.value !== null;
            },

            /**
             * Set the visibility of a single point
             */
            setVisible: function(vis) {
                var point = this,
                    method = vis ? 'show' : 'hide';

                // Show and hide associated elements
                each(['graphic', 'dataLabel'], function(key) {
                    if (point[key]) {
                        point[key][method]();
                    }
                });
            },
            setState: function(state) {
                H.Point.prototype.setState.call(this, state);
                if (this.graphic) {
                    this.graphic.attr({
                        zIndex: state === 'hover' ? 1 : 0
                    });
                }
            }
        };

        H.colorSeriesMixin = {
            pointArrayMap: ['value'],
            axisTypes: ['xAxis', 'yAxis', 'colorAxis'],
            optionalAxis: 'colorAxis',
            trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
            getSymbol: noop,
            parallelArrays: ['x', 'y', 'value'],
            colorKey: 'value',



            /**
             * In choropleth maps, the color is a result of the value, so this needs translation too
             */
            translateColors: function() {
                var series = this,
                    nullColor = this.options.nullColor,
                    colorAxis = this.colorAxis,
                    colorKey = this.colorKey;

                each(this.data, function(point) {
                    var value = point[colorKey],
                        color;

                    color = point.options.color ||
                        (point.isNull ? nullColor : (colorAxis && value !== undefined) ? colorAxis.toColor(value, point) : point.color || series.color);

                    if (color) {
                        point.color = color;
                    }
                });
            },

            /**
             * Get the color attibutes to apply on the graphic
             */
            colorAttribs: function(point) {
                var ret = {};
                if (defined(point.color)) {
                    ret[this.colorProp || 'fill'] = point.color;
                }
                return ret;
            }
        };

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var addEvent = H.addEvent,
            Chart = H.Chart,
            doc = H.doc,
            each = H.each,
            extend = H.extend,
            merge = H.merge,
            pick = H.pick,
            wrap = H.wrap;

        function stopEvent(e) {
            if (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                e.cancelBubble = true;
            }
        }

        /**
         * The MapNavigation handles buttons for navigation in addition to mousewheel
         * and doubleclick handlers for chart zooming.
         * @param {Chart} chart The Chart instance.
         * @class
         */
        function MapNavigation(chart) {
            this.init(chart);
        }

        /**
         * Initiator function.
         * @param  {Chart} chart The Chart instance.
         */
        MapNavigation.prototype.init = function(chart) {
            this.chart = chart;
            chart.mapNavButtons = [];
        };

        /**
         * Update the map navigation with new options. Calling this is the same as 
         * calling `chart.update({ mapNavigation: {} })`. 
         * @param  {Object} options New options for the map navigation.
         */
        MapNavigation.prototype.update = function(options) {
            var chart = this.chart,
                o = chart.options.mapNavigation,
                buttonOptions,
                attr,
                states,
                hoverStates,
                selectStates,
                outerHandler = function(e) {
                    this.handler.call(chart, e);
                    stopEvent(e); // Stop default click event (#4444)
                },
                mapNavButtons = chart.mapNavButtons;

            // Merge in new options in case of update, and register back to chart
            // options.
            if (options) {
                o = chart.options.mapNavigation =
                    merge(chart.options.mapNavigation, options);
            }

            // Destroy buttons in case of dynamic update
            while (mapNavButtons.length) {
                mapNavButtons.pop().destroy();
            }

            if (pick(o.enableButtons, o.enabled) && !chart.renderer.forExport) {

                H.objectEach(o.buttons, function(button, n) {
                    buttonOptions = merge(o.buttonOptions, button);



                    button = chart.renderer.button(
                            buttonOptions.text,
                            0,
                            0,
                            outerHandler,
                            attr,
                            hoverStates,
                            selectStates,
                            0,
                            n === 'zoomIn' ? 'topbutton' : 'bottombutton'
                        )
                        .addClass('highcharts-map-navigation')
                        .attr({
                            width: buttonOptions.width,
                            height: buttonOptions.height,
                            title: chart.options.lang[n],
                            padding: buttonOptions.padding,
                            zIndex: 5
                        })
                        .add();
                    button.handler = buttonOptions.onclick;
                    button.align(
                        extend(buttonOptions, {
                            width: button.width,
                            height: 2 * button.height
                        }),
                        null,
                        buttonOptions.alignTo
                    );
                    // Stop double click event (#4444)
                    addEvent(button.element, 'dblclick', stopEvent);

                    mapNavButtons.push(button);

                });
            }

            this.updateEvents(o);
        };

        /**
         * Update events, called internally from the update function. Add new event
         * handlers, or unbinds events if disabled.
         * @param  {Object} options Options for map navigation.
         */
        MapNavigation.prototype.updateEvents = function(options) {
            var chart = this.chart;

            // Add the double click event
            if (
                pick(options.enableDoubleClickZoom, options.enabled) ||
                options.enableDoubleClickZoomTo
            ) {
                this.unbindDblClick = this.unbindDblClick || addEvent(
                    chart.container,
                    'dblclick',
                    function(e) {
                        chart.pointer.onContainerDblClick(e);
                    }
                );
            } else if (this.unbindDblClick) {
                // Unbind and set unbinder to undefined
                this.unbindDblClick = this.unbindDblClick();
            }

            // Add the mousewheel event
            if (pick(options.enableMouseWheelZoom, options.enabled)) {
                this.unbindMouseWheel = this.unbindMouseWheel || addEvent(
                    chart.container,
                    doc.onmousewheel === undefined ? 'DOMMouseScroll' : 'mousewheel',
                    function(e) {
                        chart.pointer.onContainerMouseWheel(e);
                        // Issue #5011, returning false from non-jQuery event does
                        // not prevent default
                        stopEvent(e);
                        return false;
                    }
                );
            } else if (this.unbindMouseWheel) {
                // Unbind and set unbinder to undefined
                this.unbindMouseWheel = this.unbindMouseWheel();
            }

        };

        // Add events to the Chart object itself
        extend(Chart.prototype, {

            /**
             * Fit an inner box to an outer. If the inner box overflows left or right, align it to the sides of the
             * outer. If it overflows both sides, fit it within the outer. This is a pattern that occurs more places
             * in Highcharts, perhaps it should be elevated to a common utility function.
             */
            fitToBox: function(inner, outer) {
                each([
                    ['x', 'width'],
                    ['y', 'height']
                ], function(dim) {
                    var pos = dim[0],
                        size = dim[1];

                    if (inner[pos] + inner[size] > outer[pos] + outer[size]) { // right overflow
                        if (inner[size] > outer[size]) { // the general size is greater, fit fully to outer
                            inner[size] = outer[size];
                            inner[pos] = outer[pos];
                        } else { // align right
                            inner[pos] = outer[pos] + outer[size] - inner[size];
                        }
                    }
                    if (inner[size] > outer[size]) {
                        inner[size] = outer[size];
                    }
                    if (inner[pos] < outer[pos]) {
                        inner[pos] = outer[pos];
                    }
                });


                return inner;
            },

            /**
             * Zoom the map in or out by a certain amount. Less than 1 zooms in, greater than 1 zooms out.
             */
            mapZoom: function(howMuch, centerXArg, centerYArg, mouseX, mouseY) {
                /*if (this.isMapZooming) {
                	this.mapZoomQueue = arguments;
                	return;
                }*/

                var chart = this,
                    xAxis = chart.xAxis[0],
                    xRange = xAxis.max - xAxis.min,
                    centerX = pick(centerXArg, xAxis.min + xRange / 2),
                    newXRange = xRange * howMuch,
                    yAxis = chart.yAxis[0],
                    yRange = yAxis.max - yAxis.min,
                    centerY = pick(centerYArg, yAxis.min + yRange / 2),
                    newYRange = yRange * howMuch,
                    fixToX = mouseX ? ((mouseX - xAxis.pos) / xAxis.len) : 0.5,
                    fixToY = mouseY ? ((mouseY - yAxis.pos) / yAxis.len) : 0.5,
                    newXMin = centerX - newXRange * fixToX,
                    newYMin = centerY - newYRange * fixToY,
                    newExt = chart.fitToBox({
                        x: newXMin,
                        y: newYMin,
                        width: newXRange,
                        height: newYRange
                    }, {
                        x: xAxis.dataMin,
                        y: yAxis.dataMin,
                        width: xAxis.dataMax - xAxis.dataMin,
                        height: yAxis.dataMax - yAxis.dataMin
                    }),
                    zoomOut = newExt.x <= xAxis.dataMin &&
                    newExt.width >= xAxis.dataMax - xAxis.dataMin &&
                    newExt.y <= yAxis.dataMin &&
                    newExt.height >= yAxis.dataMax - yAxis.dataMin;

                // When mousewheel zooming, fix the point under the mouse
                if (mouseX) {
                    xAxis.fixTo = [mouseX - xAxis.pos, centerXArg];
                }
                if (mouseY) {
                    yAxis.fixTo = [mouseY - yAxis.pos, centerYArg];
                }

                // Zoom
                if (howMuch !== undefined && !zoomOut) {
                    xAxis.setExtremes(newExt.x, newExt.x + newExt.width, false);
                    yAxis.setExtremes(newExt.y, newExt.y + newExt.height, false);

                    // Reset zoom
                } else {
                    xAxis.setExtremes(undefined, undefined, false);
                    yAxis.setExtremes(undefined, undefined, false);
                }

                // Prevent zooming until this one is finished animating
                /*chart.holdMapZoom = true;
                setTimeout(function () {
                	chart.holdMapZoom = false;
                }, 200);*/
                /*delay = animation ? animation.duration || 500 : 0;
                if (delay) {
                	chart.isMapZooming = true;
                	setTimeout(function () {
                		chart.isMapZooming = false;
                		if (chart.mapZoomQueue) {
                			chart.mapZoom.apply(chart, chart.mapZoomQueue);
                		}
                		chart.mapZoomQueue = null;
                	}, delay);
                }*/

                chart.redraw();
            }
        });

        /**
         * Extend the Chart.render method to add zooming and panning
         */
        wrap(Chart.prototype, 'render', function(proceed) {
            // Render the plus and minus buttons. Doing this before the shapes makes getBBox much quicker, at least in Chrome.
            this.mapNavigation = new MapNavigation(this);
            this.mapNavigation.update();

            proceed.call(this);
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var extend = H.extend,
            pick = H.pick,
            Pointer = H.Pointer,
            wrap = H.wrap;

        // Extend the Pointer
        extend(Pointer.prototype, {

            /**
             * The event handler for the doubleclick event
             */
            onContainerDblClick: function(e) {
                var chart = this.chart;

                e = this.normalize(e);

                if (chart.options.mapNavigation.enableDoubleClickZoomTo) {
                    if (chart.pointer.inClass(e.target, 'highcharts-tracker') && chart.hoverPoint) {
                        chart.hoverPoint.zoomTo();
                    }
                } else if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
                    chart.mapZoom(
                        0.5,
                        chart.xAxis[0].toValue(e.chartX),
                        chart.yAxis[0].toValue(e.chartY),
                        e.chartX,
                        e.chartY
                    );
                }
            },

            /**
             * The event handler for the mouse scroll event
             */
            onContainerMouseWheel: function(e) {
                var chart = this.chart,
                    delta;

                e = this.normalize(e);

                // Firefox uses e.detail, WebKit and IE uses wheelDelta
                delta = e.detail || -(e.wheelDelta / 120);
                if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
                    chart.mapZoom(
                        Math.pow(chart.options.mapNavigation.mouseWheelSensitivity, delta),
                        chart.xAxis[0].toValue(e.chartX),
                        chart.yAxis[0].toValue(e.chartY),
                        e.chartX,
                        e.chartY
                    );
                }
            }
        });

        // The pinchType is inferred from mapNavigation options.
        wrap(Pointer.prototype, 'zoomOption', function(proceed) {


            var mapNavigation = this.chart.options.mapNavigation;

            // Pinch status
            if (pick(mapNavigation.enableTouchZoom, mapNavigation.enabled)) {
                this.chart.options.chart.pinchType = 'xy';
            }

            proceed.apply(this, [].slice.call(arguments, 1));

        });

        // Extend the pinchTranslate method to preserve fixed ratio when zooming
        wrap(Pointer.prototype, 'pinchTranslate', function(proceed, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch) {
            var xBigger;
            proceed.call(this, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch);

            // Keep ratio
            if (this.chart.options.chart.type === 'map' && this.hasZoom) {
                xBigger = transform.scaleX > transform.scaleY;
                this.pinchTranslateDirection(!xBigger,
                    pinchDown,
                    touches,
                    transform,
                    selectionMarker,
                    clip,
                    lastValidTouch,
                    xBigger ? transform.scaleX : transform.scaleY
                );
            }
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var color = H.color,
            ColorAxis = H.ColorAxis,
            colorPointMixin = H.colorPointMixin,
            colorSeriesMixin = H.colorSeriesMixin,
            doc = H.doc,
            each = H.each,
            extend = H.extend,
            isNumber = H.isNumber,
            LegendSymbolMixin = H.LegendSymbolMixin,
            map = H.map,
            merge = H.merge,
            noop = H.noop,
            pick = H.pick,
            isArray = H.isArray,
            Point = H.Point,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes,
            splat = H.splat;

        // The vector-effect attribute is not supported in IE <= 11 (at least), so we need
        // diffent logic (#3218)
        var supportsVectorEffect = doc.documentElement.style.vectorEffect !== undefined;


        /**
         * The MapAreaPoint object
         */
        /**
         * Add the map series type
         */
        seriesType('map', 'scatter', {
            allAreas: true,

            animation: false, // makes the complex shapes slow
            nullColor: '#f7f7f7',
            borderColor: '#cccccc',
            borderWidth: 1,
            marker: null,
            stickyTracking: false,
            joinBy: 'hc-key',
            dataLabels: {
                formatter: function() { // #2945
                    return this.point.value;
                },
                inside: true, // for the color
                verticalAlign: 'middle',
                crop: false,
                overflow: false,
                padding: 0
            },
            turboThreshold: 0,
            tooltip: {
                followPointer: true,
                pointFormat: '{point.name}: {point.value}<br/>'
            },
            states: {
                normal: {
                    animation: true
                },
                hover: {
                    brightness: 0.2,
                    halo: null
                },
                select: {
                    color: '#cccccc'
                }
            }

            // Prototype members
        }, merge(colorSeriesMixin, {
            type: 'map',
            supportsDrilldown: true,
            getExtremesFromAll: true,
            useMapGeometry: true, // get axis extremes from paths, not values
            forceDL: true,
            searchPoint: noop,
            directTouch: true, // When tooltip is not shared, this series (and derivatives) requires direct touch/hover. KD-tree does not apply.
            preserveAspectRatio: true, // X axis and Y axis must have same translation slope
            pointArrayMap: ['value'],
            /**
             * Get the bounding box of all paths in the map combined.
             */
            getBox: function(paths) {
                var MAX_VALUE = Number.MAX_VALUE,
                    maxX = -MAX_VALUE,
                    minX = MAX_VALUE,
                    maxY = -MAX_VALUE,
                    minY = MAX_VALUE,
                    minRange = MAX_VALUE,
                    xAxis = this.xAxis,
                    yAxis = this.yAxis,
                    hasBox;

                // Find the bounding box
                each(paths || [], function(point) {

                    if (point.path) {
                        if (typeof point.path === 'string') {
                            point.path = H.splitPath(point.path);
                        }

                        var path = point.path || [],
                            i = path.length,
                            even = false, // while loop reads from the end
                            pointMaxX = -MAX_VALUE,
                            pointMinX = MAX_VALUE,
                            pointMaxY = -MAX_VALUE,
                            pointMinY = MAX_VALUE,
                            properties = point.properties;

                        // The first time a map point is used, analyze its box
                        if (!point._foundBox) {
                            while (i--) {
                                if (isNumber(path[i])) {
                                    if (even) { // even = x
                                        pointMaxX = Math.max(pointMaxX, path[i]);
                                        pointMinX = Math.min(pointMinX, path[i]);
                                    } else { // odd = Y
                                        pointMaxY = Math.max(pointMaxY, path[i]);
                                        pointMinY = Math.min(pointMinY, path[i]);
                                    }
                                    even = !even;
                                }
                            }
                            // Cache point bounding box for use to position data labels, bubbles etc
                            point._midX = pointMinX + (pointMaxX - pointMinX) *
                                (point.middleX || (properties && properties['hc-middle-x']) || 0.5); // pick is slower and very marginally needed
                            point._midY = pointMinY + (pointMaxY - pointMinY) *
                                (point.middleY || (properties && properties['hc-middle-y']) || 0.5);
                            point._maxX = pointMaxX;
                            point._minX = pointMinX;
                            point._maxY = pointMaxY;
                            point._minY = pointMinY;
                            point.labelrank = pick(point.labelrank, (pointMaxX - pointMinX) * (pointMaxY - pointMinY));
                            point._foundBox = true;
                        }

                        maxX = Math.max(maxX, point._maxX);
                        minX = Math.min(minX, point._minX);
                        maxY = Math.max(maxY, point._maxY);
                        minY = Math.min(minY, point._minY);
                        minRange = Math.min(point._maxX - point._minX, point._maxY - point._minY, minRange);
                        hasBox = true;
                    }
                });

                // Set the box for the whole series
                if (hasBox) {
                    this.minY = Math.min(minY, pick(this.minY, MAX_VALUE));
                    this.maxY = Math.max(maxY, pick(this.maxY, -MAX_VALUE));
                    this.minX = Math.min(minX, pick(this.minX, MAX_VALUE));
                    this.maxX = Math.max(maxX, pick(this.maxX, -MAX_VALUE));

                    // If no minRange option is set, set the default minimum zooming range to 5 times the
                    // size of the smallest element
                    if (xAxis && xAxis.options.minRange === undefined) {
                        xAxis.minRange = Math.min(5 * minRange, (this.maxX - this.minX) / 5, xAxis.minRange || MAX_VALUE);
                    }
                    if (yAxis && yAxis.options.minRange === undefined) {
                        yAxis.minRange = Math.min(5 * minRange, (this.maxY - this.minY) / 5, yAxis.minRange || MAX_VALUE);
                    }
                }
            },

            getExtremes: function() {
                // Get the actual value extremes for colors
                Series.prototype.getExtremes.call(this, this.valueData);

                // Recalculate box on updated data
                if (this.chart.hasRendered && this.isDirtyData) {
                    this.getBox(this.options.data);
                }

                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;

                // Extremes for the mock Y axis
                this.dataMin = this.minY;
                this.dataMax = this.maxY;
            },

            /**
             * Translate the path so that it automatically fits into the plot area box
             * @param {Object} path
             */
            translatePath: function(path) {

                var series = this,
                    even = false, // while loop reads from the end
                    xAxis = series.xAxis,
                    yAxis = series.yAxis,
                    xMin = xAxis.min,
                    xTransA = xAxis.transA,
                    xMinPixelPadding = xAxis.minPixelPadding,
                    yMin = yAxis.min,
                    yTransA = yAxis.transA,
                    yMinPixelPadding = yAxis.minPixelPadding,
                    i,
                    ret = []; // Preserve the original

                // Do the translation
                if (path) {
                    i = path.length;
                    while (i--) {
                        if (isNumber(path[i])) {
                            ret[i] = even ?
                                (path[i] - xMin) * xTransA + xMinPixelPadding :
                                (path[i] - yMin) * yTransA + yMinPixelPadding;
                            even = !even;
                        } else {
                            ret[i] = path[i];
                        }
                    }
                }

                return ret;
            },

            /**
             * Extend setData to join in mapData. If the allAreas option is true, all areas
             * from the mapData are used, and those that don't correspond to a data value
             * are given null values.
             */
            setData: function(data, redraw, animation, updatePoints) {
                var options = this.options,
                    chartOptions = this.chart.options.chart,
                    globalMapData = chartOptions && chartOptions.map,
                    mapData = options.mapData,
                    joinBy = options.joinBy,
                    joinByNull = joinBy === null,
                    pointArrayMap = options.keys || this.pointArrayMap,
                    dataUsed = [],
                    mapMap = {},
                    mapPoint,
                    mapTransforms = this.chart.mapTransforms,
                    props,
                    i;

                // Collect mapData from chart options if not defined on series
                if (!mapData && globalMapData) {
                    mapData = typeof globalMapData === 'string' ? H.maps[globalMapData] : globalMapData;
                }

                if (joinByNull) {
                    joinBy = '_i';
                }
                joinBy = this.joinBy = splat(joinBy);
                if (!joinBy[1]) {
                    joinBy[1] = joinBy[0];
                }

                // Pick up numeric values, add index
                // Convert Array point definitions to objects using pointArrayMap
                if (data) {
                    each(data, function(val, i) {
                        var ix = 0;
                        if (isNumber(val)) {
                            data[i] = {
                                value: val
                            };
                        } else if (isArray(val)) {
                            data[i] = {};
                            // Automatically copy first item to hc-key if there is an extra leading string
                            if (!options.keys && val.length > pointArrayMap.length && typeof val[0] === 'string') {
                                data[i]['hc-key'] = val[0];
                                ++ix;
                            }
                            // Run through pointArrayMap and what's left of the point data array in parallel, copying over the values
                            for (var j = 0; j < pointArrayMap.length; ++j, ++ix) {
                                if (pointArrayMap[j]) {
                                    data[i][pointArrayMap[j]] = val[ix];
                                }
                            }
                        }
                        if (joinByNull) {
                            data[i]._i = i;
                        }
                    });
                }

                this.getBox(data);

                // Pick up transform definitions for chart
                this.chart.mapTransforms = mapTransforms = chartOptions && chartOptions.mapTransforms || mapData && mapData['hc-transform'] || mapTransforms;

                // Cache cos/sin of transform rotation angle
                if (mapTransforms) {
                    H.objectEach(mapTransforms, function(transform) {
                        if (transform.rotation) {
                            transform.cosAngle = Math.cos(transform.rotation);
                            transform.sinAngle = Math.sin(transform.rotation);
                        }
                    });
                }

                if (mapData) {
                    if (mapData.type === 'FeatureCollection') {
                        this.mapTitle = mapData.title;
                        mapData = H.geojson(mapData, this.type, this);
                    }

                    this.mapData = mapData;
                    this.mapMap = {};

                    for (i = 0; i < mapData.length; i++) {
                        mapPoint = mapData[i];
                        props = mapPoint.properties;

                        mapPoint._i = i;
                        // Copy the property over to root for faster access
                        if (joinBy[0] && props && props[joinBy[0]]) {
                            mapPoint[joinBy[0]] = props[joinBy[0]];
                        }
                        mapMap[mapPoint[joinBy[0]]] = mapPoint;
                    }
                    this.mapMap = mapMap;

                    // Registered the point codes that actually hold data
                    if (data && joinBy[1]) {
                        each(data, function(point) {
                            if (mapMap[point[joinBy[1]]]) {
                                dataUsed.push(mapMap[point[joinBy[1]]]);
                            }
                        });
                    }

                    if (options.allAreas) {
                        this.getBox(mapData);
                        data = data || [];

                        // Registered the point codes that actually hold data
                        if (joinBy[1]) {
                            each(data, function(point) {
                                dataUsed.push(point[joinBy[1]]);
                            });
                        }

                        // Add those map points that don't correspond to data, which will be drawn as null points
                        dataUsed = '|' + map(dataUsed, function(point) {
                            return point && point[joinBy[0]];
                        }).join('|') + '|'; // String search is faster than array.indexOf

                        each(mapData, function(mapPoint) {
                            if (!joinBy[0] || dataUsed.indexOf('|' + mapPoint[joinBy[0]] + '|') === -1) {
                                data.push(merge(mapPoint, {
                                    value: null
                                }));
                                updatePoints = false; // #5050 - adding all areas causes the update optimization of setData to kick in, even though the point order has changed
                            }
                        });
                    } else {
                        this.getBox(dataUsed); // Issue #4784
                    }
                }
                Series.prototype.setData.call(this, data, redraw, animation, updatePoints);
            },


            /**
             * No graph for the map series
             */
            drawGraph: noop,

            /**
             * We need the points' bounding boxes in order to draw the data labels, so
             * we skip it now and call it from drawPoints instead.
             */
            drawDataLabels: noop,

            /**
             * Allow a quick redraw by just translating the area group. Used for zooming and panning
             * in capable browsers.
             */
            doFullTranslate: function() {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans;
            },

            /**
             * Add the path option for data points. Find the max value for color calculation.
             */
            translate: function() {
                var series = this,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis,
                    doFullTranslate = series.doFullTranslate();

                series.generatePoints();

                each(series.data, function(point) {

                    // Record the middle point (loosely based on centroid), determined
                    // by the middleX and middleY options.
                    point.plotX = xAxis.toPixels(point._midX, true);
                    point.plotY = yAxis.toPixels(point._midY, true);

                    if (doFullTranslate) {

                        point.shapeType = 'path';
                        point.shapeArgs = {
                            d: series.translatePath(point.path)
                        };
                    }
                });

                series.translateColors();
            },

            /**
             * Get presentational attributes. In the maps series this runs in both 
             * styled and non-styled mode, because colors hold data when a colorAxis
             * is used.
             */
            pointAttribs: function(point, state) {
                var attr;

                attr = this.colorAttribs(point);


                // Prevent flickering whan called from setState
                if (point.isFading) {
                    delete attr.fill;
                }

                // If vector-effect is not supported, we set the stroke-width on the group element
                // and let all point graphics inherit. That way we don't have to iterate over all 
                // points to update the stroke-width on zooming. TODO: Check unstyled
                if (supportsVectorEffect) {
                    attr['vector-effect'] = 'non-scaling-stroke';
                } else {
                    attr['stroke-width'] = 'inherit';
                }

                return attr;
            },

            /** 
             * Use the drawPoints method of column, that is able to handle simple shapeArgs.
             * Extend it by assigning the tooltip position.
             */
            drawPoints: function() {
                var series = this,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis,
                    group = series.group,
                    chart = series.chart,
                    renderer = chart.renderer,
                    scaleX,
                    scaleY,
                    translateX,
                    translateY,
                    baseTrans = this.baseTrans,
                    transformGroup,
                    startTranslateX,
                    startTranslateY,
                    startScaleX,
                    startScaleY;

                // Set a group that handles transform during zooming and panning in order to preserve clipping
                // on series.group
                if (!series.transformGroup) {
                    series.transformGroup = renderer.g()
                        .attr({
                            scaleX: 1,
                            scaleY: 1
                        })
                        .add(group);
                    series.transformGroup.survive = true;
                }

                // Draw the shapes again
                if (series.doFullTranslate()) {

                    // Individual point actions. TODO: Check unstyled.


                    // Draw them in transformGroup
                    series.group = series.transformGroup;
                    seriesTypes.column.prototype.drawPoints.apply(series);
                    series.group = group; // Reset

                    // Add class names
                    each(series.points, function(point) {
                        if (point.graphic) {
                            if (point.name) {
                                point.graphic.addClass('highcharts-name-' + point.name.replace(/ /g, '-').toLowerCase());
                            }
                            if (point.properties && point.properties['hc-key']) {
                                point.graphic.addClass('highcharts-key-' + point.properties['hc-key'].toLowerCase());
                            }


                            point.graphic.css(
                                series.pointAttribs(point, point.selected && 'select')
                            );

                        }
                    });

                    // Set the base for later scale-zooming. The originX and originY properties are the
                    // axis values in the plot area's upper left corner.
                    this.baseTrans = {
                        originX: xAxis.min - xAxis.minPixelPadding / xAxis.transA,
                        originY: yAxis.min - yAxis.minPixelPadding / yAxis.transA + (yAxis.reversed ? 0 : yAxis.len / yAxis.transA),
                        transAX: xAxis.transA,
                        transAY: yAxis.transA
                    };

                    // Reset transformation in case we're doing a full translate (#3789)
                    this.transformGroup.animate({
                        translateX: 0,
                        translateY: 0,
                        scaleX: 1,
                        scaleY: 1
                    });

                    // Just update the scale and transform for better performance
                } else {
                    scaleX = xAxis.transA / baseTrans.transAX;
                    scaleY = yAxis.transA / baseTrans.transAY;
                    translateX = xAxis.toPixels(baseTrans.originX, true);
                    translateY = yAxis.toPixels(baseTrans.originY, true);

                    // Handle rounding errors in normal view (#3789)
                    if (scaleX > 0.99 && scaleX < 1.01 && scaleY > 0.99 && scaleY < 1.01) {
                        scaleX = 1;
                        scaleY = 1;
                        translateX = Math.round(translateX);
                        translateY = Math.round(translateY);
                    }

                    // Animate or move to the new zoom level. In order to prevent
                    // flickering as the different transform components are set out of 
                    // sync (#5991), we run a fake animator attribute and set scale and
                    // translation synchronously in the same step.
                    // A possible improvement to the API would be to handle this in the
                    // renderer or animation engine itself, to ensure that when we are 
                    // animating multiple properties, we make sure that each step for
                    // each property is performed in the same step. Also, for symbols
                    // and for transform properties, it should induce a single 
                    // updateTransform and symbolAttr call.
                    transformGroup = this.transformGroup;
                    if (chart.renderer.globalAnimation) {
                        startTranslateX = transformGroup.attr('translateX');
                        startTranslateY = transformGroup.attr('translateY');
                        startScaleX = transformGroup.attr('scaleX');
                        startScaleY = transformGroup.attr('scaleY');
                        transformGroup
                            .attr({
                                animator: 0
                            })
                            .animate({
                                animator: 1
                            }, {
                                step: function(now, fx) {
                                    transformGroup.attr({
                                        translateX: startTranslateX +
                                            (translateX - startTranslateX) * fx.pos,
                                        translateY: startTranslateY +
                                            (translateY - startTranslateY) * fx.pos,
                                        scaleX: startScaleX +
                                            (scaleX - startScaleX) * fx.pos,
                                        scaleY: startScaleY +
                                            (scaleY - startScaleY) * fx.pos
                                    });

                                }
                            });

                        // When dragging, animation is off.
                    } else {
                        transformGroup.attr({
                            translateX: translateX,
                            translateY: translateY,
                            scaleX: scaleX,
                            scaleY: scaleY
                        });
                    }

                }

                // Set the stroke-width directly on the group element so the children inherit it. We need to use
                // setAttribute directly, because the stroke-widthSetter method expects a stroke color also to be
                // set.
                if (!supportsVectorEffect) {
                    series.group.element.setAttribute(
                        'stroke-width',
                        series.options[
                            (series.pointAttrToOptions && series.pointAttrToOptions['stroke-width']) || 'borderWidth'
                        ] / (scaleX || 1)
                    );
                }

                this.drawMapDataLabels();


            },

            /**
             * Draw the data labels. Special for maps is the time that the data labels are drawn (after points),
             * and the clipping of the dataLabelsGroup.
             */
            drawMapDataLabels: function() {

                Series.prototype.drawDataLabels.call(this);
                if (this.dataLabelsGroup) {
                    this.dataLabelsGroup.clip(this.chart.clipRect);
                }
            },

            /**
             * Override render to throw in an async call in IE8. Otherwise it chokes on the US counties demo.
             */
            render: function() {
                var series = this,
                    render = Series.prototype.render;

                // Give IE8 some time to breathe.
                if (series.chart.renderer.isVML && series.data.length > 3000) {
                    setTimeout(function() {
                        render.call(series);
                    });
                } else {
                    render.call(series);
                }
            },

            /**
             * The initial animation for the map series. By default, animation is disabled.
             * Animation of map shapes is not at all supported in VML browsers.
             */
            animate: function(init) {
                var chart = this.chart,
                    animation = this.options.animation,
                    group = this.group,
                    xAxis = this.xAxis,
                    yAxis = this.yAxis,
                    left = xAxis.pos,
                    top = yAxis.pos;

                if (chart.renderer.isSVG) {

                    if (animation === true) {
                        animation = {
                            duration: 1000
                        };
                    }

                    // Initialize the animation
                    if (init) {

                        // Scale down the group and place it in the center
                        group.attr({
                            translateX: left + xAxis.len / 2,
                            translateY: top + yAxis.len / 2,
                            scaleX: 0.001, // #1499
                            scaleY: 0.001
                        });

                        // Run the animation
                    } else {
                        group.animate({
                            translateX: left,
                            translateY: top,
                            scaleX: 1,
                            scaleY: 1
                        }, animation);

                        // Delete this function to allow it only once
                        this.animate = null;
                    }
                }
            },

            /**
             * Animate in the new series from the clicked point in the old series.
             * Depends on the drilldown.js module
             */
            animateDrilldown: function(init) {
                var toBox = this.chart.plotBox,
                    level = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    fromBox = level.bBox,
                    animationOptions = this.chart.options.drilldown.animation,
                    scale;

                if (!init) {

                    scale = Math.min(fromBox.width / toBox.width, fromBox.height / toBox.height);
                    level.shapeArgs = {
                        scaleX: scale,
                        scaleY: scale,
                        translateX: fromBox.x,
                        translateY: fromBox.y
                    };

                    each(this.points, function(point) {
                        if (point.graphic) {
                            point.graphic
                                .attr(level.shapeArgs)
                                .animate({
                                    scaleX: 1,
                                    scaleY: 1,
                                    translateX: 0,
                                    translateY: 0
                                }, animationOptions);
                        }
                    });

                    this.animate = null;
                }

            },

            drawLegendSymbol: LegendSymbolMixin.drawRectangle,

            /**
             * When drilling up, pull out the individual point graphics from the lower series
             * and animate them into the origin point in the upper series.
             */
            animateDrillupFrom: function(level) {
                seriesTypes.column.prototype.animateDrillupFrom.call(this, level);
            },


            /**
             * When drilling up, keep the upper series invisible until the lower series has
             * moved into place
             */
            animateDrillupTo: function(init) {
                seriesTypes.column.prototype.animateDrillupTo.call(this, init);
            }

            // Point class
        }), extend({
            /**
             * Extend the Point object to split paths
             */
            applyOptions: function(options, x) {

                var point = Point.prototype.applyOptions.call(this, options, x),
                    series = this.series,
                    joinBy = series.joinBy,
                    mapPoint;

                if (series.mapData) {
                    mapPoint = point[joinBy[1]] !== undefined && series.mapMap[point[joinBy[1]]];
                    if (mapPoint) {
                        // This applies only to bubbles
                        if (series.xyFromShape) {
                            point.x = mapPoint._midX;
                            point.y = mapPoint._midY;
                        }
                        extend(point, mapPoint); // copy over properties
                    } else {
                        point.value = point.value || null;
                    }
                }

                return point;
            },

            /**
             * Stop the fade-out
             */
            onMouseOver: function(e) {
                clearTimeout(this.colorInterval);
                if (this.value !== null || this.series.options.nullInteraction) {
                    Point.prototype.onMouseOver.call(this, e);
                } else { //#3401 Tooltip doesn't hide when hovering over null points
                    this.series.onMouseOut(e);
                }
            },


            /**
             * Zoom the chart to view a specific area point
             */
            zoomTo: function() {
                var point = this,
                    series = point.series;

                series.xAxis.setExtremes(
                    point._minX,
                    point._maxX,
                    false
                );
                series.yAxis.setExtremes(
                    point._minY,
                    point._maxY,
                    false
                );
                series.chart.redraw();
            }
        }, colorPointMixin));

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        // The mapline series type
        seriesType('mapline', 'map', {

        }, {
            type: 'mapline',
            colorProp: 'stroke',

            drawLegendSymbol: seriesTypes.line.prototype.drawLegendSymbol
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var merge = H.merge,
            Point = H.Point,
            seriesType = H.seriesType;

        // The mappoint series type
        seriesType('mappoint', 'scatter', {
            dataLabels: {
                enabled: true,
                formatter: function() { // #2945
                    return this.point.name;
                },
                crop: false,
                defer: false,
                overflow: false,
                style: {
                    color: '#000000'
                }
            }

            // Prototype members
        }, {
            type: 'mappoint',
            forceDL: true

            // Point class
        }, {
            applyOptions: function(options, x) {
                var mergedOptions = options.lat !== undefined && options.lon !== undefined ? merge(options, this.series.chart.fromLatLonToPoint(options)) : options;
                return Point.prototype.applyOptions.call(this, mergedOptions, x);
            }
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var arrayMax = H.arrayMax,
            arrayMin = H.arrayMin,
            Axis = H.Axis,
            color = H.color,
            each = H.each,
            isNumber = H.isNumber,
            noop = H.noop,
            pick = H.pick,
            pInt = H.pInt,
            Point = H.Point,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /* ****************************************************************************
         * Start Bubble series code											          *
         *****************************************************************************/

        seriesType('bubble', 'scatter', {
            dataLabels: {
                formatter: function() { // #2945
                    return this.point.z;
                },
                inside: true,
                verticalAlign: 'middle'
            },
            // displayNegative: true,
            marker: {

                // Avoid offset in Point.setState
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: 'circle'
            },
            minSize: 8,
            maxSize: '20%',
            // negativeColor: null,
            // sizeBy: 'area'
            softThreshold: false,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: '({point.x}, {point.y}), Size: {point.z}'
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: 'z'

            // Prototype members
        }, {
            pointArrayMap: ['y', 'z'],
            parallelArrays: ['x', 'y', 'z'],
            trackerGroups: ['group', 'dataLabelsGroup'],
            specialGroup: 'group', // To allow clipping (#6296)
            bubblePadding: true,
            zoneAxis: 'z',
            directTouch: true,



            /**
             * Get the radius for each point based on the minSize, maxSize and each point's Z value. This
             * must be done prior to Series.translate because the axis needs to add padding in
             * accordance with the point sizes.
             */
            getRadii: function(zMin, zMax, minSize, maxSize) {
                var len,
                    i,
                    pos,
                    zData = this.zData,
                    radii = [],
                    options = this.options,
                    sizeByArea = options.sizeBy !== 'width',
                    zThreshold = options.zThreshold,
                    zRange = zMax - zMin,
                    value,
                    radius;

                // Set the shape type and arguments to be picked up in drawPoints
                for (i = 0, len = zData.length; i < len; i++) {

                    value = zData[i];

                    // When sizing by threshold, the absolute value of z determines the size
                    // of the bubble.
                    if (options.sizeByAbsoluteValue && value !== null) {
                        value = Math.abs(value - zThreshold);
                        zMax = Math.max(zMax - zThreshold, Math.abs(zMin - zThreshold));
                        zMin = 0;
                    }

                    if (value === null) {
                        radius = null;
                        // Issue #4419 - if value is less than zMin, push a radius that's always smaller than the minimum size
                    } else if (value < zMin) {
                        radius = minSize / 2 - 1;
                    } else {
                        // Relative size, a number between 0 and 1
                        pos = zRange > 0 ? (value - zMin) / zRange : 0.5;

                        if (sizeByArea && pos >= 0) {
                            pos = Math.sqrt(pos);
                        }
                        radius = Math.ceil(minSize + pos * (maxSize - minSize)) / 2;
                    }
                    radii.push(radius);
                }
                this.radii = radii;
            },

            /**
             * Perform animation on the bubbles
             */
            animate: function(init) {
                var animation = this.options.animation;

                if (!init) { // run the animation
                    each(this.points, function(point) {
                        var graphic = point.graphic,
                            animationTarget;

                        if (graphic && graphic.width) { // URL symbols don't have width
                            animationTarget = {
                                x: graphic.x,
                                y: graphic.y,
                                width: graphic.width,
                                height: graphic.height
                            };

                            // Start values
                            graphic.attr({
                                x: point.plotX,
                                y: point.plotY,
                                width: 1,
                                height: 1
                            });

                            // Run animation
                            graphic.animate(animationTarget, animation);
                        }
                    });

                    // delete this function to allow it only once
                    this.animate = null;
                }
            },

            /**
             * Extend the base translate method to handle bubble size
             */
            translate: function() {

                var i,
                    data = this.data,
                    point,
                    radius,
                    radii = this.radii;

                // Run the parent method
                seriesTypes.scatter.prototype.translate.call(this);

                // Set the shape type and arguments to be picked up in drawPoints
                i = data.length;

                while (i--) {
                    point = data[i];
                    radius = radii ? radii[i] : 0; // #1737

                    if (isNumber(radius) && radius >= this.minPxSize / 2) {
                        // Shape arguments
                        point.marker = H.extend(point.marker, {
                            radius: radius,
                            width: 2 * radius,
                            height: 2 * radius
                        });

                        // Alignment box for the data label
                        point.dlBox = {
                            x: point.plotX - radius,
                            y: point.plotY - radius,
                            width: 2 * radius,
                            height: 2 * radius
                        };
                    } else { // below zThreshold
                        point.shapeArgs = point.plotY = point.dlBox = undefined; // #1691
                    }
                }
            },

            alignDataLabel: seriesTypes.column.prototype.alignDataLabel,
            buildKDTree: noop,
            applyZones: noop

            // Point class
        }, {
            haloPath: function(size) {
                return Point.prototype.haloPath.call(
                    this,
                    size === 0 ? 0 : (this.marker ? this.marker.radius || 0 : 0) + size // #6067
                );
            },
            ttBelow: false
        });

        /**
         * Add logic to pad each axis with the amount of pixels
         * necessary to avoid the bubbles to overflow.
         */
        Axis.prototype.beforePadding = function() {
            var axis = this,
                axisLength = this.len,
                chart = this.chart,
                pxMin = 0,
                pxMax = axisLength,
                isXAxis = this.isXAxis,
                dataKey = isXAxis ? 'xData' : 'yData',
                min = this.min,
                extremes = {},
                smallestSize = Math.min(chart.plotWidth, chart.plotHeight),
                zMin = Number.MAX_VALUE,
                zMax = -Number.MAX_VALUE,
                range = this.max - min,
                transA = axisLength / range,
                activeSeries = [];

            // Handle padding on the second pass, or on redraw
            each(this.series, function(series) {

                var seriesOptions = series.options,
                    zData;

                if (series.bubblePadding && (series.visible || !chart.options.chart.ignoreHiddenSeries)) {

                    // Correction for #1673
                    axis.allowZoomOutside = true;

                    // Cache it
                    activeSeries.push(series);

                    if (isXAxis) { // because X axis is evaluated first

                        // For each series, translate the size extremes to pixel values
                        each(['minSize', 'maxSize'], function(prop) {
                            var length = seriesOptions[prop],
                                isPercent = /%$/.test(length);

                            length = pInt(length);
                            extremes[prop] = isPercent ?
                                smallestSize * length / 100 :
                                length;

                        });
                        series.minPxSize = extremes.minSize;
                        // Prioritize min size if conflict to make sure bubbles are
                        // always visible. #5873
                        series.maxPxSize = Math.max(extremes.maxSize, extremes.minSize);

                        // Find the min and max Z
                        zData = series.zData;
                        if (zData.length) { // #1735
                            zMin = pick(seriesOptions.zMin, Math.min(
                                zMin,
                                Math.max(
                                    arrayMin(zData),
                                    seriesOptions.displayNegative === false ? seriesOptions.zThreshold : -Number.MAX_VALUE
                                )
                            ));
                            zMax = pick(seriesOptions.zMax, Math.max(zMax, arrayMax(zData)));
                        }
                    }
                }
            });

            each(activeSeries, function(series) {

                var data = series[dataKey],
                    i = data.length,
                    radius;

                if (isXAxis) {
                    series.getRadii(zMin, zMax, series.minPxSize, series.maxPxSize);
                }

                if (range > 0) {
                    while (i--) {
                        if (isNumber(data[i]) && axis.dataMin <= data[i] && data[i] <= axis.dataMax) {
                            radius = series.radii[i];
                            pxMin = Math.min(((data[i] - min) * transA) - radius, pxMin);
                            pxMax = Math.max(((data[i] - min) * transA) + radius, pxMax);
                        }
                    }
                }
            });

            if (activeSeries.length && range > 0 && !this.isLog) {
                pxMax -= axisLength;
                transA *= (axisLength + pxMin - pxMax) / axisLength;
                each([
                    ['min', 'userMin', pxMin],
                    ['max', 'userMax', pxMax]
                ], function(keys) {
                    if (pick(axis.options[keys[0]], axis[keys[1]]) === undefined) {
                        axis[keys[0]] += keys[2] / transA;
                    }
                });
            }
        };

        /* ****************************************************************************
         * End Bubble series code                                                     *
         *****************************************************************************/

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var merge = H.merge,
            Point = H.Point,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        // The mapbubble series type
        if (seriesTypes.bubble) {

            seriesType('mapbubble', 'bubble', {
                animationLimit: 500,
                tooltip: {
                    pointFormat: '{point.name}: {point.z}'
                }

                // Prototype members
            }, {
                xyFromShape: true,
                type: 'mapbubble',
                pointArrayMap: ['z'], // If one single value is passed, it is interpreted as z
                /**
                 * Return the map area identified by the dataJoinBy option
                 */
                getMapData: seriesTypes.map.prototype.getMapData,
                getBox: seriesTypes.map.prototype.getBox,
                setData: seriesTypes.map.prototype.setData

                // Point class
            }, {
                applyOptions: function(options, x) {
                    var point;
                    if (options && options.lat !== undefined && options.lon !== undefined) {
                        point = Point.prototype.applyOptions.call(
                            this,
                            merge(options, this.series.chart.fromLatLonToPoint(options)),
                            x
                        );
                    } else {
                        point = seriesTypes.map.prototype.pointClass.prototype.applyOptions.call(this, options, x);
                    }
                    return point;
                },
                ttBelow: false
            });
        }

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var colorPointMixin = H.colorPointMixin,
            colorSeriesMixin = H.colorSeriesMixin,
            each = H.each,
            LegendSymbolMixin = H.LegendSymbolMixin,
            merge = H.merge,
            noop = H.noop,
            pick = H.pick,
            Series = H.Series,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        // The Heatmap series type
        seriesType('heatmap', 'scatter', {
            animation: false,
            borderWidth: 0,

            dataLabels: {
                formatter: function() { // #2945
                    return this.point.value;
                },
                inside: true,
                verticalAlign: 'middle',
                crop: false,
                overflow: false,
                padding: 0 // #3837
            },
            marker: null,
            pointRange: null, // dynamically set to colsize by default
            tooltip: {
                pointFormat: '{point.x}, {point.y}: {point.value}<br/>'
            },
            states: {
                normal: {
                    animation: true
                },
                hover: {
                    halo: false, // #3406, halo is not required on heatmaps
                    brightness: 0.2
                }
            }
        }, merge(colorSeriesMixin, {
            pointArrayMap: ['y', 'value'],
            hasPointSpecificOptions: true,
            supportsDrilldown: true,
            getExtremesFromAll: true,
            directTouch: true,

            /**
             * Override the init method to add point ranges on both axes.
             */
            init: function() {
                var options;
                seriesTypes.scatter.prototype.init.apply(this, arguments);

                options = this.options;
                options.pointRange = pick(options.pointRange, options.colsize || 1); // #3758, prevent resetting in setData
                this.yAxis.axisPointRange = options.rowsize || 1; // general point range
            },
            translate: function() {
                var series = this,
                    options = series.options,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis,
                    between = function(x, a, b) {
                        return Math.min(Math.max(a, x), b);
                    };

                series.generatePoints();

                each(series.points, function(point) {
                    var xPad = (options.colsize || 1) / 2,
                        yPad = (options.rowsize || 1) / 2,
                        x1 = between(Math.round(xAxis.len - xAxis.translate(point.x - xPad, 0, 1, 0, 1)), -xAxis.len, 2 * xAxis.len),
                        x2 = between(Math.round(xAxis.len - xAxis.translate(point.x + xPad, 0, 1, 0, 1)), -xAxis.len, 2 * xAxis.len),
                        y1 = between(Math.round(yAxis.translate(point.y - yPad, 0, 1, 0, 1)), -yAxis.len, 2 * yAxis.len),
                        y2 = between(Math.round(yAxis.translate(point.y + yPad, 0, 1, 0, 1)), -yAxis.len, 2 * yAxis.len);

                    // Set plotX and plotY for use in K-D-Tree and more
                    point.plotX = point.clientX = (x1 + x2) / 2;
                    point.plotY = (y1 + y2) / 2;

                    point.shapeType = 'rect';
                    point.shapeArgs = {
                        x: Math.min(x1, x2),
                        y: Math.min(y1, y2),
                        width: Math.abs(x2 - x1),
                        height: Math.abs(y2 - y1)
                    };
                });

                series.translateColors();
            },
            drawPoints: function() {
                seriesTypes.column.prototype.drawPoints.call(this);

                each(this.points, function(point) {

                    // In styled mode, use CSS, otherwise the fill used in the style
                    // sheet will take precesence over the fill attribute.
                    point.graphic.css(this.colorAttribs(point));

                }, this);
            },
            animate: noop,
            getBox: noop,
            drawLegendSymbol: LegendSymbolMixin.drawRectangle,
            alignDataLabel: seriesTypes.column.prototype.alignDataLabel,
            getExtremes: function() {
                // Get the extremes from the value data
                Series.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;

                // Get the extremes from the y data
                Series.prototype.getExtremes.call(this);
            }

        }), colorPointMixin);

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var Chart = H.Chart,
            each = H.each,
            extend = H.extend,
            format = H.format,
            merge = H.merge,
            win = H.win,
            wrap = H.wrap;
        /** 
         * Test for point in polygon. Polygon defined as array of [x,y] points.
         */
        function pointInPolygon(point, polygon) {
            var i,
                j,
                rel1,
                rel2,
                c = false,
                x = point.x,
                y = point.y;

            for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                rel1 = polygon[i][1] > y;
                rel2 = polygon[j][1] > y;
                if (rel1 !== rel2 && (x < (polygon[j][0] - polygon[i][0]) * (y - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0])) {
                    c = !c;
                }
            }

            return c;
        }

        /**
         * Get point from latLon using specified transform definition
         */
        Chart.prototype.transformFromLatLon = function(latLon, transform) {
            if (win.proj4 === undefined) {
                H.error(21);
                return {
                    x: 0,
                    y: null
                };
            }

            var projected = win.proj4(transform.crs, [latLon.lon, latLon.lat]),
                cosAngle = transform.cosAngle || (transform.rotation && Math.cos(transform.rotation)),
                sinAngle = transform.sinAngle || (transform.rotation && Math.sin(transform.rotation)),
                rotated = transform.rotation ? [projected[0] * cosAngle + projected[1] * sinAngle, -projected[0] * sinAngle + projected[1] * cosAngle] : projected;

            return {
                x: ((rotated[0] - (transform.xoffset || 0)) * (transform.scale || 1) + (transform.xpan || 0)) * (transform.jsonres || 1) + (transform.jsonmarginX || 0),
                y: (((transform.yoffset || 0) - rotated[1]) * (transform.scale || 1) + (transform.ypan || 0)) * (transform.jsonres || 1) - (transform.jsonmarginY || 0)
            };
        };

        /**
         * Get latLon from point using specified transform definition
         */
        Chart.prototype.transformToLatLon = function(point, transform) {
            if (win.proj4 === undefined) {
                H.error(21);
                return;
            }

            var normalized = {
                    x: ((point.x - (transform.jsonmarginX || 0)) / (transform.jsonres || 1) - (transform.xpan || 0)) / (transform.scale || 1) + (transform.xoffset || 0),
                    y: ((-point.y - (transform.jsonmarginY || 0)) / (transform.jsonres || 1) + (transform.ypan || 0)) / (transform.scale || 1) + (transform.yoffset || 0)
                },
                cosAngle = transform.cosAngle || (transform.rotation && Math.cos(transform.rotation)),
                sinAngle = transform.sinAngle || (transform.rotation && Math.sin(transform.rotation)),
                // Note: Inverted sinAngle to reverse rotation direction
                projected = win.proj4(transform.crs, 'WGS84', transform.rotation ? {
                    x: normalized.x * cosAngle + normalized.y * -sinAngle,
                    y: normalized.x * sinAngle + normalized.y * cosAngle
                } : normalized);

            return {
                lat: projected.y,
                lon: projected.x
            };
        };

        Chart.prototype.fromPointToLatLon = function(point) {
            var transforms = this.mapTransforms,
                transform;

            if (!transforms) {
                H.error(22);
                return;
            }

            for (transform in transforms) {
                if (transforms.hasOwnProperty(transform) && transforms[transform].hitZone &&
                    pointInPolygon({
                        x: point.x,
                        y: -point.y
                    }, transforms[transform].hitZone.coordinates[0])) {
                    return this.transformToLatLon(point, transforms[transform]);
                }
            }

            return this.transformToLatLon(point, transforms['default']); // eslint-disable-line dot-notation
        };

        Chart.prototype.fromLatLonToPoint = function(latLon) {
            var transforms = this.mapTransforms,
                transform,
                coords;

            if (!transforms) {
                H.error(22);
                return {
                    x: 0,
                    y: null
                };
            }

            for (transform in transforms) {
                if (transforms.hasOwnProperty(transform) && transforms[transform].hitZone) {
                    coords = this.transformFromLatLon(latLon, transforms[transform]);
                    if (pointInPolygon({
                            x: coords.x,
                            y: -coords.y
                        }, transforms[transform].hitZone.coordinates[0])) {
                        return coords;
                    }
                }
            }

            return this.transformFromLatLon(latLon, transforms['default']); // eslint-disable-line dot-notation
        };

        /**
         * Convert a geojson object to map data of a given Highcharts type (map, mappoint or mapline).
         */
        H.geojson = function(geojson, hType, series) {
            var mapData = [],
                path = [],
                polygonToPath = function(polygon) {
                    var i,
                        len = polygon.length;
                    path.push('M');
                    for (i = 0; i < len; i++) {
                        if (i === 1) {
                            path.push('L');
                        }
                        path.push(polygon[i][0], -polygon[i][1]);
                    }
                };

            hType = hType || 'map';

            each(geojson.features, function(feature) {

                var geometry = feature.geometry,
                    type = geometry.type,
                    coordinates = geometry.coordinates,
                    properties = feature.properties,
                    point;

                path = [];

                if (hType === 'map' || hType === 'mapbubble') {
                    if (type === 'Polygon') {
                        each(coordinates, polygonToPath);
                        path.push('Z');

                    } else if (type === 'MultiPolygon') {
                        each(coordinates, function(items) {
                            each(items, polygonToPath);
                        });
                        path.push('Z');
                    }

                    if (path.length) {
                        point = {
                            path: path
                        };
                    }

                } else if (hType === 'mapline') {
                    if (type === 'LineString') {
                        polygonToPath(coordinates);
                    } else if (type === 'MultiLineString') {
                        each(coordinates, polygonToPath);
                    }

                    if (path.length) {
                        point = {
                            path: path
                        };
                    }

                } else if (hType === 'mappoint') {
                    if (type === 'Point') {
                        point = {
                            x: coordinates[0],
                            y: -coordinates[1]
                        };
                    }
                }
                if (point) {
                    mapData.push(extend(point, {
                        name: properties.name || properties.NAME,
                        properties: properties
                    }));
                }

            });

            // Create a credits text that includes map source, to be picked up in Chart.addCredits
            if (series && geojson.copyrightShort) {
                series.chart.mapCredits = format(series.chart.options.credits.mapText, {
                    geojson: geojson
                });
                series.chart.mapCreditsFull = format(series.chart.options.credits.mapTextFull, {
                    geojson: geojson
                });
            }

            return mapData;
        };

        /**
         * Override addCredits to include map source by default
         */
        wrap(Chart.prototype, 'addCredits', function(proceed, credits) {

            credits = merge(true, this.options.credits, credits);

            // Disable credits link if map credits enabled. This to allow for in-text anchors.
            if (this.mapCredits) {
                credits.href = null;
            }

            proceed.call(this, credits);

            // Add full map credits to hover
            if (this.credits && this.mapCreditsFull) {
                this.credits.attr({
                    title: this.mapCreditsFull
                });
            }
        });

    }(Highcharts));
    (function(H) {
        /**
         * (c) 2010-2017 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */
        var Chart = H.Chart,
            defaultOptions = H.defaultOptions,
            each = H.each,
            extend = H.extend,
            merge = H.merge,
            pick = H.pick,
            Renderer = H.Renderer,
            SVGRenderer = H.SVGRenderer,
            VMLRenderer = H.VMLRenderer;


        // Add language
        extend(defaultOptions.lang, {
            zoomIn: 'Zoom in',
            zoomOut: 'Zoom out'
        });


        // Set the default map navigation options
        defaultOptions.mapNavigation = {
            buttonOptions: {
                alignTo: 'plotBox',
                align: 'left',
                verticalAlign: 'top',
                x: 0,
                width: 18,
                height: 18,
                padding: 5

            },
            buttons: {
                zoomIn: {
                    onclick: function() {
                        this.mapZoom(0.5);
                    },
                    text: '+',
                    y: 0
                },
                zoomOut: {
                    onclick: function() {
                        this.mapZoom(2);
                    },
                    text: '-',
                    y: 28
                }
            },
            mouseWheelSensitivity: 1.1
            // enabled: false,
            // enableButtons: null, // inherit from enabled
            // enableTouchZoom: null, // inherit from enabled
            // enableDoubleClickZoom: null, // inherit from enabled
            // enableDoubleClickZoomTo: false
            // enableMouseWheelZoom: null, // inherit from enabled
        };

        /**
         * Utility for reading SVG paths directly.
         */
        H.splitPath = function(path) {
            var i;

            // Move letters apart
            path = path.replace(/([A-Za-z])/g, ' $1 ');
            // Trim
            path = path.replace(/^\s*/, '').replace(/\s*$/, '');

            // Split on spaces and commas
            path = path.split(/[ ,]+/); // Extra comma to escape gulp.scripts task

            // Parse numbers
            for (i = 0; i < path.length; i++) {
                if (!/[a-zA-Z]/.test(path[i])) {
                    path[i] = parseFloat(path[i]);
                }
            }
            return path;
        };

        // A placeholder for map definitions
        H.maps = {};





        // Create symbols for the zoom buttons
        function selectiveRoundedRect(x, y, w, h, rTopLeft, rTopRight, rBottomRight, rBottomLeft) {
            return [
                'M', x + rTopLeft, y,
                // top side
                'L', x + w - rTopRight, y,
                // top right corner
                'C', x + w - rTopRight / 2,
                y, x + w,
                y + rTopRight / 2, x + w, y + rTopRight,
                // right side
                'L', x + w, y + h - rBottomRight,
                // bottom right corner
                'C', x + w, y + h - rBottomRight / 2,
                x + w - rBottomRight / 2, y + h,
                x + w - rBottomRight, y + h,
                // bottom side
                'L', x + rBottomLeft, y + h,
                // bottom left corner
                'C', x + rBottomLeft / 2, y + h,
                x, y + h - rBottomLeft / 2,
                x, y + h - rBottomLeft,
                // left side
                'L', x, y + rTopLeft,
                // top left corner
                'C', x, y + rTopLeft / 2,
                x + rTopLeft / 2, y,
                x + rTopLeft, y,
                'Z'
            ];
        }
        SVGRenderer.prototype.symbols.topbutton = function(x, y, w, h, attr) {
            return selectiveRoundedRect(x - 1, y - 1, w, h, attr.r, attr.r, 0, 0);
        };
        SVGRenderer.prototype.symbols.bottombutton = function(x, y, w, h, attr) {
            return selectiveRoundedRect(x - 1, y - 1, w, h, 0, 0, attr.r, attr.r);
        };
        // The symbol callbacks are generated on the SVGRenderer object in all browsers. Even
        // VML browsers need this in order to generate shapes in export. Now share
        // them with the VMLRenderer.
        if (Renderer === VMLRenderer) {
            each(['topbutton', 'bottombutton'], function(shape) {
                VMLRenderer.prototype.symbols[shape] = SVGRenderer.prototype.symbols[shape];
            });
        }


        /**
         * A wrapper for Chart with all the default values for a Map
         */
        H.Map = H.mapChart = function(a, b, c) {

            var hasRenderToArg = typeof a === 'string' || a.nodeName,
                options = arguments[hasRenderToArg ? 1 : 0],
                hiddenAxis = {
                    endOnTick: false,
                    visible: false,
                    minPadding: 0,
                    maxPadding: 0,
                    startOnTick: false
                },
                seriesOptions,
                defaultCreditsOptions = H.getOptions().credits;

            /* For visual testing
            hiddenAxis.gridLineWidth = 1;
            hiddenAxis.gridZIndex = 10;
            hiddenAxis.tickPositions = undefined;
            // */

            // Don't merge the data
            seriesOptions = options.series;
            options.series = null;

            options = merge({
                    chart: {
                        panning: 'xy',
                        type: 'map'
                    },
                    credits: {
                        mapText: pick(defaultCreditsOptions.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
                        mapTextFull: pick(defaultCreditsOptions.mapTextFull, '{geojson.copyright}')
                    },
                    tooltip: {
                        followTouchMove: false
                    },
                    xAxis: hiddenAxis,
                    yAxis: merge(hiddenAxis, {
                        reversed: true
                    })
                },
                options, // user's options

                { // forced options
                    chart: {
                        inverted: false,
                        alignTicks: false
                    }
                }
            );

            options.series = seriesOptions;


            return hasRenderToArg ?
                new Chart(a, options, c) :
                new Chart(options, b);
        };

    }(Highcharts));
}));
