/**
 * @license Highcharts Gantt JS v7.2.0 (2019-09-03)
 *
 * Gantt series
 *
 * (c) 2016-2019 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/gantt', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'parts-gantt/CurrentDateIndicator.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2016-2019 Highsoft AS
         *
         *  Author: Lars A. V. Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = H.addEvent, Axis = H.Axis, PlotLineOrBand = H.PlotLineOrBand, merge = H.merge, wrap = H.wrap;
        var defaultConfig = {
            /**
             * Show an indicator on the axis for the current date and time. Can be a
             * boolean or a configuration object similar to
             * [xAxis.plotLines](#xAxis.plotLines).
             *
             * @sample gantt/current-date-indicator/demo
             *         Current date indicator enabled
             * @sample gantt/current-date-indicator/object-config
             *         Current date indicator with custom options
             *
             * @type      {boolean|*}
             * @default   true
             * @extends   xAxis.plotLines
             * @excluding value
             * @product   gantt
             * @apioption xAxis.currentDateIndicator
             */
            currentDateIndicator: true,
            color: '#ccd6eb',
            width: 2,
            label: {
                /**
                 * Format of the label. This options is passed as the fist argument to
                 * [dateFormat](/class-reference/Highcharts#dateFormat) function.
                 *
                 * @type      {string}
                 * @default   '%a, %b %d %Y, %H:%M'
                 * @product   gantt
                 * @apioption xAxis.currentDateIndicator.label.format
                 */
                format: '%a, %b %d %Y, %H:%M',
                formatter: function (value, format) {
                    return H.dateFormat(format, value);
                },
                rotation: 0,
                style: {
                    fontSize: '10px'
                }
            }
        };
        /* eslint-disable no-invalid-this */
        addEvent(Axis, 'afterSetOptions', function () {
            var options = this.options, cdiOptions = options.currentDateIndicator;
            if (cdiOptions) {
                cdiOptions = typeof cdiOptions === 'object' ?
                    merge(defaultConfig, cdiOptions) : merge(defaultConfig);
                cdiOptions.value = new Date();
                if (!options.plotLines) {
                    options.plotLines = [];
                }
                options.plotLines.push(cdiOptions);
            }
        });
        addEvent(PlotLineOrBand, 'render', function () {
            // If the label already exists, update its text
            if (this.label) {
                this.label.attr({
                    text: this.getLabelText(this.options.label)
                });
            }
        });
        wrap(PlotLineOrBand.prototype, 'getLabelText', function (defaultMethod, defaultLabelOptions) {
            var options = this.options;
            if (options.currentDateIndicator && options.label &&
                typeof options.label.formatter === 'function') {
                options.value = new Date();
                return options.label.formatter
                    .call(this, options.value, options.label.format);
            }
            return defaultMethod.call(this, defaultLabelOptions);
        });

    });
    _registerModule(_modules, 'parts-gantt/GridAxis.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2016 Highsoft AS
         *  Authors: Lars A. V. Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined, erase = U.erase, isArray = U.isArray, isNumber = U.isNumber;
        var addEvent = H.addEvent, argsToArray = function (args) {
            return Array.prototype.slice.call(args, 1);
        }, dateFormat = H.dateFormat, isObject = function (x) {
            // Always use strict mode
            return U.isObject(x, true);
        }, merge = H.merge, pick = H.pick, wrap = H.wrap, Chart = H.Chart, Axis = H.Axis, Tick = H.Tick;
        var applyGridOptions = function applyGridOptions(axis) {
            var options = axis.options, gridOptions = options && isObject(options.grid) ? options.grid : {}, 
            // TODO: Consider using cell margins defined in % of font size?
            // 25 is optimal height for default fontSize (11px)
            // 25 / 11 ≈ 2.28
            fontSizeToCellHeightRatio = 25 / 11, fontSize = options.labels.style.fontSize, fontMetrics = axis.chart.renderer.fontMetrics(fontSize);
            // Center-align by default
            if (!options.labels) {
                options.labels = {};
            }
            options.labels.align = pick(options.labels.align, 'center');
            // @todo: Check against tickLabelPlacement between/on etc
            /* Prevents adding the last tick label if the axis is not a category
               axis.
               Since numeric labels are normally placed at starts and ends of a
               range of value, and this module makes the label point at the value,
               an "extra" label would appear. */
            if (!axis.categories) {
                options.showLastLabel = false;
            }
            // Make tick marks taller, creating cell walls of a grid. Use cellHeight
            // axis option if set
            if (axis.horiz) {
                options.tickLength = gridOptions.cellHeight ||
                    fontMetrics.h * fontSizeToCellHeightRatio;
            }
            // Prevents rotation of labels when squished, as rotating them would not
            // help.
            axis.labelRotation = 0;
            options.labels.rotation = 0;
        };
        /**
         * Set grid options for the axis labels. Requires Highcharts Gantt.
         *
         * @since     6.2.0
         * @product   gantt
         * @apioption xAxis.grid
         */
        /**
         * Enable grid on the axis labels. Defaults to true for Gantt charts.
         *
         * @type      {boolean}
         * @default   true
         * @since     6.2.0
         * @product   gantt
         * @apioption xAxis.grid.enabled
         */
        /**
         * Set specific options for each column (or row for horizontal axes) in the
         * grid. Each extra column/row is its own axis, and the axis options can be set
         * here.
         *
         * @sample gantt/demo/left-axis-table
         *         Left axis as a table
         *
         * @type      {Array<Highcharts.XAxisOptions>}
         * @apioption xAxis.grid.columns
         */
        /**
         * Set border color for the label grid lines.
         *
         * @type      {Highcharts.ColorString}
         * @apioption xAxis.grid.borderColor
         */
        /**
         * Set border width of the label grid lines.
         *
         * @type      {number}
         * @default   1
         * @apioption xAxis.grid.borderWidth
         */
        /**
         * Set cell height for grid axis labels. By default this is calculated from font
         * size.
         *
         * @type      {number}
         * @apioption xAxis.grid.cellHeight
         */
        // Enum for which side the axis is on.
        // Maps to axis.side
        var axisSide = {
            top: 0,
            right: 1,
            bottom: 2,
            left: 3,
            0: 'top',
            1: 'right',
            2: 'bottom',
            3: 'left'
        };
        /**
         * Checks if an axis is the outer axis in its dimension. Since
         * axes are placed outwards in order, the axis with the highest
         * index is the outermost axis.
         *
         * Example: If there are multiple x-axes at the top of the chart,
         * this function returns true if the axis supplied is the last
         * of the x-axes.
         *
         * @private
         * @function Highcharts.Axis#isOuterAxis
         *
         * @return {boolean}
         *         true if the axis is the outermost axis in its dimension; false if not
         */
        Axis.prototype.isOuterAxis = function () {
            var axis = this, chart = axis.chart, columnIndex = axis.columnIndex, columns = axis.linkedParent && axis.linkedParent.columns ||
                axis.columns, parentAxis = columnIndex ? axis.linkedParent : axis, thisIndex = -1, lastIndex = 0;
            chart[axis.coll].forEach(function (otherAxis, index) {
                if (otherAxis.side === axis.side && !otherAxis.options.isInternal) {
                    lastIndex = index;
                    if (otherAxis === parentAxis) {
                        // Get the index of the axis in question
                        thisIndex = index;
                    }
                }
            });
            return (lastIndex === thisIndex &&
                (isNumber(columnIndex) ? columns.length === columnIndex : true));
        };
        /**
         * Get the largest label width and height.
         *
         * @private
         * @function Highcharts.Axis#getMaxLabelDimensions
         *
         * @param {Highcharts.Dictionary<Highcharts.Tick>} ticks
         *        All the ticks on one axis.
         *
         * @param {Array<number|string>} tickPositions
         *        All the tick positions on one axis.
         *
         * @return {Highcharts.SizeObject}
         *         object containing the properties height and width.
         */
        Axis.prototype.getMaxLabelDimensions = function (ticks, tickPositions) {
            var dimensions = {
                width: 0,
                height: 0
            };
            tickPositions.forEach(function (pos) {
                var tick = ticks[pos], tickHeight = 0, tickWidth = 0, label;
                if (isObject(tick)) {
                    label = isObject(tick.label) ? tick.label : {};
                    // Find width and height of tick
                    tickHeight = label.getBBox ? label.getBBox().height : 0;
                    if (label.textStr && !isNumber(label.textPxLength)) {
                        label.textPxLength = label.getBBox().width;
                    }
                    tickWidth = isNumber(label.textPxLength) ? label.textPxLength : 0;
                    // Update the result if width and/or height are larger
                    dimensions.height = Math.max(tickHeight, dimensions.height);
                    dimensions.width = Math.max(tickWidth, dimensions.width);
                }
            });
            return dimensions;
        };
        // Add custom date formats
        H.dateFormats.W = function (timestamp) {
            var d = new Date(timestamp), yearStart, weekNo;
            d.setHours(0, 0, 0, 0);
            d.setDate(d.getDate() - (d.getDay() || 7));
            yearStart = new Date(d.getFullYear(), 0, 1);
            weekNo =
                Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
            return weekNo;
        };
        // First letter of the day of the week, e.g. 'M' for 'Monday'.
        H.dateFormats.E = function (timestamp) {
            return dateFormat('%a', timestamp, true).charAt(0);
        };
        /* eslint-disable no-invalid-this, valid-jsdoc */
        addEvent(Tick, 'afterGetLabelPosition', 
        /**
         * Center tick labels in cells.
         *
         * @private
         */
        function (e) {
            var tick = this, label = tick.label, axis = tick.axis, reversed = axis.reversed, chart = axis.chart, options = axis.options, gridOptions = ((options && isObject(options.grid)) ? options.grid : {}), labelOpts = axis.options.labels, align = labelOpts.align, 
            // verticalAlign is currently not supported for axis.labels.
            verticalAlign = 'middle', // labelOpts.verticalAlign,
            side = axisSide[axis.side], tickmarkOffset = e.tickmarkOffset, tickPositions = axis.tickPositions, tickPos = tick.pos - tickmarkOffset, nextTickPos = (isNumber(tickPositions[e.index + 1]) ?
                tickPositions[e.index + 1] - tickmarkOffset :
                axis.max + tickmarkOffset), tickSize = axis.tickSize('tick', true), tickWidth = isArray(tickSize) ? tickSize[0] : 0, crispCorr = tickSize && tickSize[1] / 2, labelHeight, lblMetrics, lines, bottom, top, left, right;
            // Only center tick labels in grid axes
            if (gridOptions.enabled === true) {
                // Calculate top and bottom positions of the cell.
                if (side === 'top') {
                    bottom = axis.top + axis.offset;
                    top = bottom - tickWidth;
                }
                else if (side === 'bottom') {
                    top = chart.chartHeight - axis.bottom + axis.offset;
                    bottom = top + tickWidth;
                }
                else {
                    bottom = axis.top + axis.len - axis.translate(reversed ? nextTickPos : tickPos);
                    top = axis.top + axis.len - axis.translate(reversed ? tickPos : nextTickPos);
                }
                // Calculate left and right positions of the cell.
                if (side === 'right') {
                    left = chart.chartWidth - axis.right + axis.offset;
                    right = left + tickWidth;
                }
                else if (side === 'left') {
                    right = axis.left + axis.offset;
                    left = right - tickWidth;
                }
                else {
                    left = Math.round(axis.left + axis.translate(reversed ? nextTickPos : tickPos)) - crispCorr;
                    right = Math.round(axis.left + axis.translate(reversed ? tickPos : nextTickPos)) - crispCorr;
                }
                tick.slotWidth = right - left;
                // Calculate the positioning of the label based on alignment.
                e.pos.x = (align === 'left' ?
                    left :
                    align === 'right' ?
                        right :
                        left + ((right - left) / 2) // default to center
                );
                e.pos.y = (verticalAlign === 'top' ?
                    top :
                    verticalAlign === 'bottom' ?
                        bottom :
                        top + ((bottom - top) / 2) // default to middle
                );
                lblMetrics = chart.renderer.fontMetrics(labelOpts.style.fontSize, label.element);
                labelHeight = label.getBBox().height;
                // Adjustment to y position to align the label correctly.
                // Would be better to have a setter or similar for this.
                if (!labelOpts.useHTML) {
                    lines = Math.round(labelHeight / lblMetrics.h);
                    e.pos.y += (
                    // Center the label
                    // TODO: why does this actually center the label?
                    ((lblMetrics.b - (lblMetrics.h - lblMetrics.f)) / 2) +
                        // Adjust for height of additional lines.
                        -(((lines - 1) * lblMetrics.h) / 2));
                }
                else {
                    e.pos.y += (
                    // Readjust yCorr in htmlUpdateTransform
                    lblMetrics.b +
                        // Adjust for height of html label
                        -(labelHeight / 2));
                }
                e.pos.x += (axis.horiz && labelOpts.x || 0);
            }
        });
        // Draw vertical axis ticks extra long to create cell floors and roofs.
        // Overrides the tickLength for vertical axes.
        addEvent(Axis, 'afterTickSize', function (e) {
            var axis = this, dimensions = axis.maxLabelDimensions, options = axis.options, gridOptions = (options && isObject(options.grid)) ? options.grid : {}, labelPadding, distance;
            if (gridOptions.enabled === true) {
                labelPadding =
                    (Math.abs(axis.defaultLeftAxisOptions.labels.x) * 2);
                distance = labelPadding + (axis.horiz ?
                    dimensions.height :
                    dimensions.width);
                if (isArray(e.tickSize)) {
                    e.tickSize[0] = distance;
                }
                else {
                    e.tickSize = [distance];
                }
            }
        });
        addEvent(Axis, 'afterGetTitlePosition', function (e) {
            var axis = this, options = axis.options, gridOptions = (options && isObject(options.grid)) ? options.grid : {};
            if (gridOptions.enabled === true) {
                // compute anchor points for each of the title align options
                var title = axis.axisTitle, titleWidth = title && title.getBBox().width, horiz = axis.horiz, axisLeft = axis.left, axisTop = axis.top, axisWidth = axis.width, axisHeight = axis.height, axisTitleOptions = options.title, opposite = axis.opposite, offset = axis.offset, tickSize = axis.tickSize() || [0], xOption = axisTitleOptions.x || 0, yOption = axisTitleOptions.y || 0, titleMargin = pick(axisTitleOptions.margin, horiz ? 5 : 10), titleFontSize = axis.chart.renderer.fontMetrics(axisTitleOptions.style &&
                    axisTitleOptions.style.fontSize, title).f, 
                // TODO account for alignment
                // the position in the perpendicular direction of the axis
                offAxis = (horiz ? axisTop + axisHeight : axisLeft) +
                    (horiz ? 1 : -1) * // horizontal axis reverses the margin
                        (opposite ? -1 : 1) * // so does opposite axes
                        (tickSize[0] / 2) +
                    (axis.side === axisSide.bottom ? titleFontSize : 0);
                e.titlePosition.x = horiz ?
                    axisLeft - titleWidth / 2 - titleMargin + xOption :
                    offAxis + (opposite ? axisWidth : 0) + offset + xOption;
                e.titlePosition.y = horiz ?
                    (offAxis -
                        (opposite ? axisHeight : 0) +
                        (opposite ? titleFontSize : -titleFontSize) / 2 +
                        offset +
                        yOption) :
                    axisTop - titleMargin + yOption;
            }
        });
        // Avoid altering tickInterval when reserving space.
        wrap(Axis.prototype, 'unsquish', function (proceed) {
            var axis = this, options = axis.options, gridOptions = (options && isObject(options.grid)) ? options.grid : {};
            if (gridOptions.enabled === true && this.categories) {
                return this.tickInterval;
            }
            return proceed.apply(this, argsToArray(arguments));
        });
        addEvent(Axis, 'afterSetOptions', 
        /**
         * Creates a left and right wall on horizontal axes:
         *
         * - Places leftmost tick at the start of the axis, to create a left wall
         *
         * - Ensures that the rightmost tick is at the end of the axis, to create a
         *   right wall.
         *
         * @private
         * @function
         */
        function (e) {
            var options = this.options, userOptions = e.userOptions, gridAxisOptions, gridOptions = ((options && isObject(options.grid)) ? options.grid : {});
            if (gridOptions.enabled === true) {
                // Merge the user options into default grid axis options so that
                // when a user option is set, it takes presedence.
                gridAxisOptions = merge(true, {
                    className: ('highcharts-grid-axis ' + (userOptions.className || '')),
                    dateTimeLabelFormats: {
                        hour: {
                            list: ['%H:%M', '%H']
                        },
                        day: {
                            list: ['%A, %e. %B', '%a, %e. %b', '%E']
                        },
                        week: {
                            list: ['Week %W', 'W%W']
                        },
                        month: {
                            list: ['%B', '%b', '%o']
                        }
                    },
                    grid: {
                        borderWidth: 1
                    },
                    labels: {
                        padding: 2,
                        style: {
                            fontSize: '13px'
                        }
                    },
                    margin: 0,
                    title: {
                        text: null,
                        reserveSpace: false,
                        rotation: 0
                    },
                    // In a grid axis, only allow one unit of certain types, for
                    // example we shouln't have one grid cell spanning two days.
                    units: [[
                            'millisecond',
                            [1, 10, 100]
                        ], [
                            'second',
                            [1, 10]
                        ], [
                            'minute',
                            [1, 5, 15]
                        ], [
                            'hour',
                            [1, 6]
                        ], [
                            'day',
                            [1]
                        ], [
                            'week',
                            [1]
                        ], [
                            'month',
                            [1]
                        ], [
                            'year',
                            null
                        ]]
                }, userOptions);
                // X-axis specific options
                if (this.coll === 'xAxis') {
                    // For linked axes, tickPixelInterval is used only if the
                    // tickPositioner below doesn't run or returns undefined (like
                    // multiple years)
                    if (defined(userOptions.linkedTo) &&
                        !defined(userOptions.tickPixelInterval)) {
                        gridAxisOptions.tickPixelInterval = 350;
                    }
                    // For the secondary grid axis, use the primary axis' tick
                    // intervals and return ticks one level higher.
                    if (
                    // Check for tick pixel interval in options
                    !defined(userOptions.tickPixelInterval) &&
                        // Only for linked axes
                        defined(userOptions.linkedTo) &&
                        !defined(userOptions.tickPositioner) &&
                        !defined(userOptions.tickInterval)) {
                        gridAxisOptions.tickPositioner = function (min, max) {
                            var parentInfo = (this.linkedParent &&
                                this.linkedParent.tickPositions &&
                                this.linkedParent.tickPositions.info);
                            if (parentInfo) {
                                var unitIdx, count, unitName, i, units = gridAxisOptions.units, unitRange;
                                for (i = 0; i < units.length; i++) {
                                    if (units[i][0] ===
                                        parentInfo.unitName) {
                                        unitIdx = i;
                                        break;
                                    }
                                }
                                // Spanning multiple years, go default
                                if (!units[unitIdx][1]) {
                                    return;
                                }
                                // Get the first allowed count on the next unit.
                                if (units[unitIdx + 1]) {
                                    unitName = units[unitIdx + 1][0];
                                    count =
                                        (units[unitIdx + 1][1] || [1])[0];
                                }
                                unitRange = H.timeUnits[unitName];
                                this.tickInterval = unitRange * count;
                                return this.getTimeTicks({
                                    unitRange: unitRange,
                                    count: count,
                                    unitName: unitName
                                }, min, max, this.options.startOfWeek);
                            }
                        };
                    }
                }
                // Now merge the combined options into the axis options
                merge(true, this.options, gridAxisOptions);
                if (this.horiz) {
                    /*               _________________________
                       Make this:    ___|_____|_____|_____|__|
                                     ^                     ^
                                     _________________________
                       Into this:    |_____|_____|_____|_____|
                                        ^                 ^    */
                    options.minPadding = pick(userOptions.minPadding, 0);
                    options.maxPadding = pick(userOptions.maxPadding, 0);
                }
                // If borderWidth is set, then use its value for tick and line
                // width.
                if (isNumber(options.grid.borderWidth)) {
                    options.tickWidth = options.lineWidth = gridOptions.borderWidth;
                }
            }
        });
        addEvent(Axis, 'afterSetAxisTranslation', function () {
            var axis = this, options = axis.options, gridOptions = ((options && isObject(options.grid)) ? options.grid : {}), tickInfo = this.tickPositions && this.tickPositions.info, userLabels = this.userOptions.labels || {};
            if (this.horiz) {
                if (gridOptions.enabled === true) {
                    axis.series.forEach(function (series) {
                        series.options.pointRange = 0;
                    });
                }
                // Lower level time ticks, like hours or minutes, represent points
                // in time and not ranges. These should be aligned left in the grid
                // cell by default. The same applies to years of higher order.
                if (tickInfo &&
                    (options.dateTimeLabelFormats[tickInfo.unitName]
                        .range === false ||
                        tickInfo.count > 1 // years
                    ) &&
                    !defined(userLabels.align)) {
                    options.labels.align = 'left';
                    if (!defined(userLabels.x)) {
                        options.labels.x = 3;
                    }
                }
            }
        });
        // @todo Does this function do what the drawing says? Seems to affect ticks and
        //       not the labels directly?
        addEvent(Axis, 'trimTicks', 
        /**
         * Makes tick labels which are usually ignored in a linked axis displayed if
         * they are within range of linkedParent.min.
         * ```
         *                        _____________________________
         *                        |   |       |       |       |
         * Make this:             |   |   2   |   3   |   4   |
         *                        |___|_______|_______|_______|
         *                          ^
         *                        _____________________________
         *                        |   |       |       |       |
         * Into this:             | 1 |   2   |   3   |   4   |
         *                        |___|_______|_______|_______|
         *                          ^
         * ```
         *
         * @private
         */
        function () {
            var axis = this, options = axis.options, gridOptions = ((options && isObject(options.grid)) ? options.grid : {}), categoryAxis = axis.categories, tickPositions = axis.tickPositions, firstPos = tickPositions[0], lastPos = tickPositions[tickPositions.length - 1], linkedMin = axis.linkedParent && axis.linkedParent.min, linkedMax = axis.linkedParent && axis.linkedParent.max, min = linkedMin || axis.min, max = linkedMax || axis.max, tickInterval = axis.tickInterval, endMoreThanMin = (firstPos < min &&
                firstPos + tickInterval > min), startLessThanMax = (lastPos > max &&
                lastPos - tickInterval < max);
            if (gridOptions.enabled === true &&
                !categoryAxis &&
                (axis.horiz || axis.isLinked)) {
                if (endMoreThanMin && !options.startOnTick) {
                    tickPositions[0] = min;
                }
                if (startLessThanMax && !options.endOnTick) {
                    tickPositions[tickPositions.length - 1] = max;
                }
            }
        });
        addEvent(Axis, 'afterRender', 
        /**
         * Draw an extra line on the far side of the outermost axis,
         * creating floor/roof/wall of a grid. And some padding.
         * ```
         * Make this:
         *             (axis.min) __________________________ (axis.max)
         *                           |    |    |    |    |
         * Into this:
         *             (axis.min) __________________________ (axis.max)
         *                        ___|____|____|____|____|__
         * ```
         *
         * @private
         * @function
         *
         * @param {Function} proceed
         *        the original function
         */
        function () {
            var axis = this, options = axis.options, gridOptions = ((options && isObject(options.grid)) ? options.grid : {}), labelPadding, distance, lineWidth, linePath, yStartIndex, yEndIndex, xStartIndex, xEndIndex, renderer = axis.chart.renderer, horiz = axis.horiz, axisGroupBox;
            if (gridOptions.enabled === true) {
                // @todo acutual label padding (top, bottom, left, right)
                // Label padding is needed to figure out where to draw the outer
                // line.
                labelPadding = (Math.abs(axis.defaultLeftAxisOptions.labels.x) * 2);
                axis.maxLabelDimensions = axis.getMaxLabelDimensions(axis.ticks, axis.tickPositions);
                distance = axis.maxLabelDimensions.width + labelPadding;
                lineWidth = options.lineWidth;
                // Remove right wall before rendering if updating
                if (axis.rightWall) {
                    axis.rightWall.destroy();
                }
                axisGroupBox = axis.axisGroup.getBBox();
                /*
                   Draw an extra axis line on outer axes
                               >
                   Make this:    |______|______|______|___

                               > _________________________
                   Into this:    |______|______|______|__|
                                                           */
                if (axis.isOuterAxis() && axis.axisLine) {
                    if (horiz) {
                        // -1 to avoid adding distance each time the chart updates
                        distance = axisGroupBox.height - 1;
                    }
                    if (lineWidth) {
                        linePath = axis.getLinePath(lineWidth);
                        xStartIndex = linePath.indexOf('M') + 1;
                        xEndIndex = linePath.indexOf('L') + 1;
                        yStartIndex = linePath.indexOf('M') + 2;
                        yEndIndex = linePath.indexOf('L') + 2;
                        // Negate distance if top or left axis
                        if (axis.side === axisSide.top ||
                            axis.side === axisSide.left) {
                            distance = -distance;
                        }
                        // If axis is horizontal, reposition line path vertically
                        if (horiz) {
                            linePath[yStartIndex] =
                                linePath[yStartIndex] + distance;
                            linePath[yEndIndex] =
                                linePath[yEndIndex] + distance;
                        }
                        else {
                            // If axis is vertical, reposition line path
                            // horizontally
                            linePath[xStartIndex] =
                                linePath[xStartIndex] + distance;
                            linePath[xEndIndex] =
                                linePath[xEndIndex] + distance;
                        }
                        if (!axis.axisLineExtra) {
                            axis.axisLineExtra = renderer
                                .path(linePath)
                                .attr({
                                /* eslint-disable spaced-comment */
                        
                                stroke: options.lineColor,
                                'stroke-width': lineWidth,
                        
                                /* eslint-enable spaced-comment */
                                zIndex: 7
                            })
                                .addClass('highcharts-axis-line')
                                .add(axis.axisGroup);
                        }
                        else {
                            axis.axisLineExtra.animate({
                                d: linePath
                            });
                        }
                        // show or hide the line depending on options.showEmpty
                        axis.axisLine[axis.showAxis ? 'show' : 'hide'](true);
                    }
                }
                (axis.columns || []).forEach(function (column) {
                    column.render();
                });
            }
        });
        // Handle columns and getOffset
        var onGridAxisAfterGetOffset = function onGridAxisAfterGetOffset() {
            (this.columns || []).forEach(function (column) {
                column.getOffset();
            });
        };
        var onGridAxisAfterInit = function onGridAxisAfterInit() {
            var axis = this, chart = axis.chart, userOptions = axis.userOptions, options = axis.options, gridOptions = options && isObject(options.grid) ? options.grid : {};
            if (gridOptions.enabled) {
                applyGridOptions(axis);
                // TODO: wrap the axis instead
                wrap(axis, 'labelFormatter', function (proceed) {
                    var axis = this.axis, tickPos = axis.tickPositions, value = this.value, series = (axis.isLinked ?
                        axis.linkedParent :
                        axis).series[0], isFirst = value === tickPos[0], isLast = value === tickPos[tickPos.length - 1], point = series && H.find(series.options.data, function (p) {
                        return p[axis.isXAxis ? 'x' : 'y'] === value;
                    });
                    // Make additional properties available for the
                    // formatter
                    this.isFirst = isFirst;
                    this.isLast = isLast;
                    this.point = point;
                    // Call original labelFormatter
                    return proceed.call(this);
                });
            }
            if (gridOptions.columns) {
                var columns = axis.columns = [], columnIndex = axis.columnIndex = 0;
                // Handle columns, each column is a grid axis
                while (++columnIndex < gridOptions.columns.length) {
                    var columnOptions = merge(userOptions, gridOptions.columns[gridOptions.columns.length - columnIndex - 1], {
                        linkedTo: 0,
                        // Force to behave like category axis
                        type: 'category'
                    });
                    delete columnOptions.grid.columns; // Prevent recursion
                    var column = new Axis(axis.chart, columnOptions, true);
                    column.isColumn = true;
                    column.columnIndex = columnIndex;
                    // Remove column axis from chart axes array, and place it
                    // in the columns array.
                    erase(chart.axes, column);
                    erase(chart[axis.coll], column);
                    columns.push(column);
                }
            }
        };
        var onGridAxisAfterSetChartSize = function onGridAxisAfterSetChartSize() {
            this.axes.forEach(function (axis) {
                (axis.columns || []).forEach(function (column) {
                    column.setAxisSize();
                    column.setAxisTranslation();
                });
            });
        };
        // Handle columns and setScale
        var onGridAxisAfterSetScale = function onGridAxisAfterSetScale() {
            (this.columns || []).forEach(function (column) {
                column.setScale();
            });
        };
        var onGridAxisDestroy = function onGridAxisDestroy(e) {
            (this.columns || []).forEach(function (column) {
                column.destroy(e.keepEvents);
            });
        };
        // Wraps axis init to draw cell walls on vertical axes.
        var onGridAxisInit = function onGridAxisInit(e) {
            var userOptions = e.userOptions, gridOptions = ((userOptions && isObject(userOptions.grid)) ?
                userOptions.grid :
                {});
            if (gridOptions.enabled && defined(gridOptions.borderColor)) {
                userOptions.tickColor = userOptions.lineColor = gridOptions.borderColor;
            }
        };
        var onGridAxisAfterSetOptions = function onGridAxisAfterSetOptions(e) {
            var axis = this, userOptions = e.userOptions, gridOptions = ((userOptions && isObject(userOptions.grid)) ?
                userOptions.grid :
                {}), columns = gridOptions.columns;
            // Add column options to the parent axis.
            // Children has their column options set on init in onGridAxisAfterInit.
            if (gridOptions.enabled && columns) {
                merge(true, axis.options, columns[columns.length - 1]);
            }
        };
        var axisEvents = {
            afterGetOffset: onGridAxisAfterGetOffset,
            afterInit: onGridAxisAfterInit,
            afterSetOptions: onGridAxisAfterSetOptions,
            afterSetScale: onGridAxisAfterSetScale,
            destroy: onGridAxisDestroy,
            init: onGridAxisInit
        };
        // Add event handlers
        Object.keys(axisEvents).forEach(function (event) {
            addEvent(Axis, event, axisEvents[event]);
        });
        addEvent(Chart, 'afterSetChartSize', onGridAxisAfterSetChartSize);

    });
    _registerModule(_modules, 'modules/static-scale.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         * (c) 2016-2019 Torstein Honsi, Lars Cabrera
         *
         * License: www.highcharts.com/license
         */



        var defined = U.defined,
            isNumber = U.isNumber;

        var Chart = H.Chart,
            pick = H.pick;

        /**
         * For vertical axes only. Setting the static scale ensures that each tick unit
         * is translated into a fixed pixel height. For example, setting the static
         * scale to 24 results in each Y axis category taking up 24 pixels, and the
         * height of the chart adjusts. Adding or removing items will make the chart
         * resize.
         *
         * @sample gantt/xrange-series/demo/
         *         X-range series with static scale
         *
         * @type      {number}
         * @default   50
         * @since     6.2.0
         * @product   gantt
         * @apioption yAxis.staticScale
         */

        H.addEvent(H.Axis, 'afterSetOptions', function () {
            var chartOptions = this.chart.options && this.chart.options.chart;
            if (
                !this.horiz &&
                isNumber(this.options.staticScale) &&
                (
                    !chartOptions.height ||
                    (
                        chartOptions.scrollablePlotArea &&
                        chartOptions.scrollablePlotArea.minHeight
                    )
                )
            ) {
                this.staticScale = this.options.staticScale;
            }
        });

        Chart.prototype.adjustHeight = function () {
            if (this.redrawTrigger !== 'adjustHeight') {
                (this.axes || []).forEach(function (axis) {
                    var chart = axis.chart,
                        animate = !!chart.initiatedScale && chart.options.animation,
                        staticScale = axis.options.staticScale,
                        height,
                        diff;

                    if (axis.staticScale && defined(axis.min)) {
                        height = pick(
                            axis.unitLength,
                            axis.max + axis.tickInterval - axis.min
                        ) * staticScale;


                        // Minimum height is 1 x staticScale.
                        height = Math.max(height, staticScale);

                        diff = height - chart.plotHeight;

                        if (Math.abs(diff) >= 1) {
                            chart.plotHeight = height;
                            chart.redrawTrigger = 'adjustHeight';
                            chart.setSize(undefined, chart.chartHeight + diff, animate);
                        }

                        // Make sure clip rects have the right height before initial
                        // animation.
                        axis.series.forEach(function (series) {
                            var clipRect =
                                series.sharedClipKey && chart[series.sharedClipKey];

                            if (clipRect) {
                                clipRect.attr({
                                    height: chart.plotHeight
                                });
                            }
                        });
                    }

                });
                this.initiatedScale = true;
            }
            this.redrawTrigger = null;
        };
        H.addEvent(Chart, 'render', Chart.prototype.adjustHeight);

    });
    _registerModule(_modules, 'parts-gantt/Tree.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2016-2019 Highsoft AS
         *
         *  Authors: Jon Arild Nygard
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint no-console: 0 */
        var isNumber = U.isNumber;
        var extend = H.extend, pick = H.pick, isFunction = function (x) {
            return typeof x === 'function';
        };
        /**
         * Creates an object map from parent id to childrens index.
         *
         * @private
         * @function Highcharts.Tree#getListOfParents
         *
         * @param {Array<*>} data
         *        List of points set in options. `Array<*>.parent`is parent id of point.
         *
         * @param {Array<string>} ids
         *        List of all point ids.
         *
         * @return {Highcharts.Dictionary<Array<*>>}
         *         Map from parent id to children index in data
         */
        var getListOfParents = function (data, ids) {
            var listOfParents = data.reduce(function (prev, curr) {
                var parent = pick(curr.parent, '');
                if (prev[parent] === undefined) {
                    prev[parent] = [];
                }
                prev[parent].push(curr);
                return prev;
            }, {}), parents = Object.keys(listOfParents);
            // If parent does not exist, hoist parent to root of tree.
            parents.forEach(function (parent, list) {
                var children = listOfParents[parent];
                if ((parent !== '') && (ids.indexOf(parent) === -1)) {
                    children.forEach(function (child) {
                        list[''].push(child);
                    });
                    delete list[parent];
                }
            });
            return listOfParents;
        };
        var getNode = function (id, parent, level, data, mapOfIdToChildren, options) {
            var descendants = 0, height = 0, after = options && options.after, before = options && options.before, node = {
                data: data,
                depth: level - 1,
                id: id,
                level: level,
                parent: parent
            }, start, end, children;
            // Allow custom logic before the children has been created.
            if (isFunction(before)) {
                before(node, options);
            }
            // Call getNode recursively on the children. Calulate the height of the
            // node, and the number of descendants.
            children = ((mapOfIdToChildren[id] || [])).map(function (child) {
                var node = getNode(child.id, id, (level + 1), child, mapOfIdToChildren, options), childStart = child.start, childEnd = (child.milestone === true ?
                    childStart :
                    child.end);
                // Start should be the lowest child.start.
                start = ((!isNumber(start) || childStart < start) ?
                    childStart :
                    start);
                // End should be the largest child.end.
                // If child is milestone, then use start as end.
                end = ((!isNumber(end) || childEnd > end) ?
                    childEnd :
                    end);
                descendants = descendants + 1 + node.descendants;
                height = Math.max(node.height + 1, height);
                return node;
            });
            // Calculate start and end for point if it is not already explicitly set.
            if (data) {
                data.start = pick(data.start, start);
                data.end = pick(data.end, end);
            }
            extend(node, {
                children: children,
                descendants: descendants,
                height: height
            });
            // Allow custom logic after the children has been created.
            if (isFunction(after)) {
                after(node, options);
            }
            return node;
        };
        var getTree = function (data, options) {
            var ids = data.map(function (d) {
                return d.id;
            }), mapOfIdToChildren = getListOfParents(data, ids);
            return getNode('', null, 1, null, mapOfIdToChildren, options);
        };
        var Tree = {
            getListOfParents: getListOfParents,
            getNode: getNode,
            getTree: getTree
        };

        return Tree;
    });
    _registerModule(_modules, 'mixins/tree-series.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isArray = U.isArray, isNumber = U.isNumber, isObject = U.isObject;
        var extend = H.extend, isBoolean = function (x) {
            return typeof x === 'boolean';
        }, isFn = function (x) {
            return typeof x === 'function';
        }, merge = H.merge, pick = H.pick;
        /* eslint-disable valid-jsdoc */
        /**
         * @todo Combine buildTree and buildNode with setTreeValues
         * @todo Remove logic from Treemap and make it utilize this mixin.
         * @private
         */
        var setTreeValues = function setTreeValues(tree, options) {
            var before = options.before, idRoot = options.idRoot, mapIdToNode = options.mapIdToNode, nodeRoot = mapIdToNode[idRoot], levelIsConstant = (isBoolean(options.levelIsConstant) ?
                options.levelIsConstant :
                true), points = options.points, point = points[tree.i], optionsPoint = point && point.options || {}, childrenTotal = 0, children = [], value;
            extend(tree, {
                levelDynamic: tree.level - (levelIsConstant ? 0 : nodeRoot.level),
                name: pick(point && point.name, ''),
                visible: (idRoot === tree.id ||
                    (isBoolean(options.visible) ? options.visible : false))
            });
            if (isFn(before)) {
                tree = before(tree, options);
            }
            // First give the children some values
            tree.children.forEach(function (child, i) {
                var newOptions = extend({}, options);
                extend(newOptions, {
                    index: i,
                    siblings: tree.children.length,
                    visible: tree.visible
                });
                child = setTreeValues(child, newOptions);
                children.push(child);
                if (child.visible) {
                    childrenTotal += child.val;
                }
            });
            tree.visible = childrenTotal > 0 || tree.visible;
            // Set the values
            value = pick(optionsPoint.value, childrenTotal);
            extend(tree, {
                children: children,
                childrenTotal: childrenTotal,
                isLeaf: tree.visible && !childrenTotal,
                val: value
            });
            return tree;
        };
        /**
         * @private
         */
        var getColor = function getColor(node, options) {
            var index = options.index, mapOptionsToLevel = options.mapOptionsToLevel, parentColor = options.parentColor, parentColorIndex = options.parentColorIndex, series = options.series, colors = options.colors, siblings = options.siblings, points = series.points, getColorByPoint, chartOptionsChart = series.chart.options.chart, point, level, colorByPoint, colorIndexByPoint, color, colorIndex;
            /**
             * @private
             */
            function variation(color) {
                var colorVariation = level && level.colorVariation;
                if (colorVariation) {
                    if (colorVariation.key === 'brightness') {
                        return H.color(color).brighten(colorVariation.to * (index / siblings)).get();
                    }
                }
                return color;
            }
            if (node) {
                point = points[node.i];
                level = mapOptionsToLevel[node.level] || {};
                getColorByPoint = point && level.colorByPoint;
                if (getColorByPoint) {
                    colorIndexByPoint = point.index % (colors ?
                        colors.length :
                        chartOptionsChart.colorCount);
                    colorByPoint = colors && colors[colorIndexByPoint];
                }
                // Select either point color, level color or inherited color.
                if (!series.chart.styledMode) {
                    color = pick(point && point.options.color, level && level.color, colorByPoint, parentColor && variation(parentColor), series.color);
                }
                colorIndex = pick(point && point.options.colorIndex, level && level.colorIndex, colorIndexByPoint, parentColorIndex, options.colorIndex);
            }
            return {
                color: color,
                colorIndex: colorIndex
            };
        };
        /**
         * Creates a map from level number to its given options.
         *
         * @private
         * @function getLevelOptions
         * @param {object} params
         *        Object containing parameters.
         *        - `defaults` Object containing default options. The default options
         *           are merged with the userOptions to get the final options for a
         *           specific level.
         *        - `from` The lowest level number.
         *        - `levels` User options from series.levels.
         *        - `to` The highest level number.
         * @return {Highcharts.Dictionary<object>|null}
         *         Returns a map from level number to its given options.
         */
        var getLevelOptions = function getLevelOptions(params) {
            var result = null, defaults, converted, i, from, to, levels;
            if (isObject(params)) {
                result = {};
                from = isNumber(params.from) ? params.from : 1;
                levels = params.levels;
                converted = {};
                defaults = isObject(params.defaults) ? params.defaults : {};
                if (isArray(levels)) {
                    converted = levels.reduce(function (obj, item) {
                        var level, levelIsConstant, options;
                        if (isObject(item) && isNumber(item.level)) {
                            options = merge({}, item);
                            levelIsConstant = (isBoolean(options.levelIsConstant) ?
                                options.levelIsConstant :
                                defaults.levelIsConstant);
                            // Delete redundant properties.
                            delete options.levelIsConstant;
                            delete options.level;
                            // Calculate which level these options apply to.
                            level = item.level + (levelIsConstant ? 0 : from - 1);
                            if (isObject(obj[level])) {
                                extend(obj[level], options);
                            }
                            else {
                                obj[level] = options;
                            }
                        }
                        return obj;
                    }, {});
                }
                to = isNumber(params.to) ? params.to : 1;
                for (i = 0; i <= to; i++) {
                    result[i] = merge({}, defaults, isObject(converted[i]) ? converted[i] : {});
                }
            }
            return result;
        };
        /**
         * Update the rootId property on the series. Also makes sure that it is
         * accessible to exporting.
         *
         * @private
         * @function updateRootId
         *
         * @param {object} series
         *        The series to operate on.
         *
         * @return {string}
         *         Returns the resulting rootId after update.
         */
        var updateRootId = function (series) {
            var rootId, options;
            if (isObject(series)) {
                // Get the series options.
                options = isObject(series.options) ? series.options : {};
                // Calculate the rootId.
                rootId = pick(series.rootNode, options.rootId, '');
                // Set rootId on series.userOptions to pick it up in exporting.
                if (isObject(series.userOptions)) {
                    series.userOptions.rootId = rootId;
                }
                // Set rootId on series to pick it up on next update.
                series.rootNode = rootId;
            }
            return rootId;
        };
        var result = {
            getColor: getColor,
            getLevelOptions: getLevelOptions,
            setTreeValues: setTreeValues,
            updateRootId: updateRootId
        };

        return result;
    });
    _registerModule(_modules, 'modules/broken-axis.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2009-2019 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isArray = U.isArray;
        var addEvent = H.addEvent, pick = H.pick, extend = H.extend, find = H.find, fireEvent = H.fireEvent, Axis = H.Axis, Series = H.Series;
        /**
         * Returns the first break found where the x is larger then break.from and
         * smaller then break.to.
         *
         * @param {number} x
         *        The number which should be within a break.
         * @param {Array<Highcharts.XAxisBreaksOptions>} breaks
         *        The array of breaks to search within.
         * @return {Highcharts.XAxisBreaksOptions|undefined}
         *         Returns the first break found that matches, returns false if no break
         *         is found.
         */
        var findBreakAt = function (x, breaks) {
            return find(breaks, function (b) {
                return b.from < x && x < b.to;
            });
        };
        extend(Axis.prototype, {
            isInBreak: function (brk, val) {
                var ret, repeat = brk.repeat || Infinity, from = brk.from, length = brk.to - brk.from, test = (val >= from ?
                    (val - from) % repeat :
                    repeat - ((from - val) % repeat));
                if (!brk.inclusive) {
                    ret = test < length && test !== 0;
                }
                else {
                    ret = test <= length;
                }
                return ret;
            },
            isInAnyBreak: function (val, testKeep) {
                var breaks = this.options.breaks, i = breaks && breaks.length, inbrk, keep, ret;
                if (i) {
                    while (i--) {
                        if (this.isInBreak(breaks[i], val)) {
                            inbrk = true;
                            if (!keep) {
                                keep = pick(breaks[i].showPoints, !this.isXAxis);
                            }
                        }
                    }
                    if (inbrk && testKeep) {
                        ret = inbrk && !keep;
                    }
                    else {
                        ret = inbrk;
                    }
                }
                return ret;
            }
        });
        /* eslint-disable no-invalid-this */
        addEvent(Axis, 'afterInit', function () {
            if (typeof this.setBreaks === 'function') {
                this.setBreaks(this.options.breaks, false);
            }
        });
        addEvent(Axis, 'afterSetTickPositions', function () {
            if (this.isBroken) {
                var axis = this, tickPositions = this.tickPositions, info = this.tickPositions.info, newPositions = [], i;
                for (i = 0; i < tickPositions.length; i++) {
                    if (!axis.isInAnyBreak(tickPositions[i])) {
                        newPositions.push(tickPositions[i]);
                    }
                }
                this.tickPositions = newPositions;
                this.tickPositions.info = info;
            }
        });
        // Force Axis to be not-ordinal when breaks are defined
        addEvent(Axis, 'afterSetOptions', function () {
            if (this.isBroken) {
                this.options.ordinal = false;
            }
        });
        /**
         * Dynamically set or unset breaks in an axis. This function in lighter than
         * usin Axis.update, and it also preserves animation.
         *
         * @private
         * @function Highcharts.Axis#setBreaks
         *
         * @param {Array<Highcharts.XAxisBreaksOptions>} [breaks]
         *        The breaks to add. When `undefined` it removes existing breaks.
         *
         * @param {boolean} [redraw=true]
         *        Whether to redraw the chart immediately.
         *
         * @return {void}
         */
        Axis.prototype.setBreaks = function (breaks, redraw) {
            var axis = this, isBroken = (isArray(breaks) && !!breaks.length);
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            function breakVal2Lin(val) {
                var nval = val, brk, i;
                for (i = 0; i < axis.breakArray.length; i++) {
                    brk = axis.breakArray[i];
                    if (brk.to <= val) {
                        nval -= brk.len;
                    }
                    else if (brk.from >= val) {
                        break;
                    }
                    else if (axis.isInBreak(brk, val)) {
                        nval -= (val - brk.from);
                        break;
                    }
                }
                return nval;
            }
            /**
             * @private
             */
            function breakLin2Val(val) {
                var nval = val, brk, i;
                for (i = 0; i < axis.breakArray.length; i++) {
                    brk = axis.breakArray[i];
                    if (brk.from >= nval) {
                        break;
                    }
                    else if (brk.to < nval) {
                        nval += brk.len;
                    }
                    else if (axis.isInBreak(brk, nval)) {
                        nval += brk.len;
                    }
                }
                return nval;
            }
            /* eslint-enable valid-jsdoc */
            axis.isDirty = axis.isBroken !== isBroken;
            axis.isBroken = isBroken;
            axis.options.breaks = axis.userOptions.breaks = breaks;
            axis.forceRedraw = true; // Force recalculation in setScale
            if (!isBroken && axis.val2lin === breakVal2Lin) {
                // Revert to prototype functions
                delete axis.val2lin;
                delete axis.lin2val;
            }
            if (isBroken) {
                axis.userOptions.ordinal = false;
                axis.val2lin = breakVal2Lin;
                axis.lin2val = breakLin2Val;
                axis.setExtremes = function (newMin, newMax, redraw, animation, eventArguments) {
                    // If trying to set extremes inside a break, extend min to after,
                    // and max to before the break ( #3857 )
                    if (this.isBroken) {
                        var axisBreak, breaks = this.options.breaks;
                        while ((axisBreak = findBreakAt(newMin, breaks))) {
                            newMin = axisBreak.to;
                        }
                        while ((axisBreak = findBreakAt(newMax, breaks))) {
                            newMax = axisBreak.from;
                        }
                        // If both min and max is within the same break.
                        if (newMax < newMin) {
                            newMax = newMin;
                        }
                    }
                    Axis.prototype.setExtremes.call(this, newMin, newMax, redraw, animation, eventArguments);
                };
                axis.setAxisTranslation = function (saveOld) {
                    Axis.prototype.setAxisTranslation.call(this, saveOld);
                    this.unitLength = null;
                    if (this.isBroken) {
                        var breaks = axis.options.breaks, 
                        // Temporary one:
                        breakArrayT = [], breakArray = [], length = 0, inBrk, repeat, min = axis.userMin || axis.min, max = axis.userMax || axis.max, pointRangePadding = pick(axis.pointRangePadding, 0), start, i;
                        // Min & max check (#4247)
                        breaks.forEach(function (brk) {
                            repeat = brk.repeat || Infinity;
                            if (axis.isInBreak(brk, min)) {
                                min +=
                                    (brk.to % repeat) -
                                        (min % repeat);
                            }
                            if (axis.isInBreak(brk, max)) {
                                max -=
                                    (max % repeat) -
                                        (brk.from % repeat);
                            }
                        });
                        // Construct an array holding all breaks in the axis
                        breaks.forEach(function (brk) {
                            start = brk.from;
                            repeat = brk.repeat || Infinity;
                            while (start - repeat > min) {
                                start -= repeat;
                            }
                            while (start < min) {
                                start += repeat;
                            }
                            for (i = start; i < max; i += repeat) {
                                breakArrayT.push({
                                    value: i,
                                    move: 'in'
                                });
                                breakArrayT.push({
                                    value: i + (brk.to - brk.from),
                                    move: 'out',
                                    size: brk.breakSize
                                });
                            }
                        });
                        breakArrayT.sort(function (a, b) {
                            return ((a.value === b.value) ?
                                ((a.move === 'in' ? 0 : 1) -
                                    (b.move === 'in' ? 0 : 1)) :
                                a.value - b.value);
                        });
                        // Simplify the breaks
                        inBrk = 0;
                        start = min;
                        breakArrayT.forEach(function (brk) {
                            inBrk += (brk.move === 'in' ? 1 : -1);
                            if (inBrk === 1 && brk.move === 'in') {
                                start = brk.value;
                            }
                            if (inBrk === 0) {
                                breakArray.push({
                                    from: start,
                                    to: brk.value,
                                    len: brk.value - start - (brk.size || 0)
                                });
                                length += brk.value - start - (brk.size || 0);
                            }
                        });
                        axis.breakArray = breakArray;
                        // Used with staticScale, and below, the actual axis length when
                        // breaks are substracted.
                        axis.unitLength =
                            max - min - length + pointRangePadding;
                        fireEvent(axis, 'afterBreaks');
                        if (axis.staticScale) {
                            axis.transA = axis.staticScale;
                        }
                        else if (axis.unitLength) {
                            axis.transA *=
                                (max - axis.min + pointRangePadding) /
                                    axis.unitLength;
                        }
                        if (pointRangePadding) {
                            axis.minPixelPadding =
                                axis.transA * axis.minPointOffset;
                        }
                        axis.min = min;
                        axis.max = max;
                    }
                };
            }
            if (pick(redraw, true)) {
                this.chart.redraw();
            }
        };
        addEvent(Series, 'afterGeneratePoints', function () {
            var series = this, xAxis = series.xAxis, yAxis = series.yAxis, points = series.points, point, i = points.length, connectNulls = series.options.connectNulls, nullGap;
            if (xAxis && yAxis && (xAxis.options.breaks || yAxis.options.breaks)) {
                while (i--) {
                    point = points[i];
                    // Respect nulls inside the break (#4275)
                    nullGap = point.y === null && connectNulls === false;
                    if (!nullGap &&
                        (xAxis.isInAnyBreak(point.x, true) ||
                            yAxis.isInAnyBreak(point.y, true))) {
                        points.splice(i, 1);
                        if (this.data[i]) {
                            // Removes the graphics for this point if they exist
                            this.data[i].destroyElements();
                        }
                    }
                }
            }
        });
        addEvent(Series, 'afterRender', function drawPointsWrapped() {
            this.drawBreaks(this.xAxis, ['x']);
            this.drawBreaks(this.yAxis, pick(this.pointArrayMap, ['y']));
        });
        /* eslint-enable no-invalid-this */
        H.Series.prototype.drawBreaks = function (axis, keys) {
            var series = this, points = series.points, breaks, threshold, eventName, y;
            if (!axis) {
                return; // #5950
            }
            keys.forEach(function (key) {
                breaks = axis.breakArray || [];
                threshold = axis.isXAxis ?
                    axis.min :
                    pick(series.options.threshold, axis.min);
                points.forEach(function (point) {
                    y = pick(point['stack' + key.toUpperCase()], point[key]);
                    breaks.forEach(function (brk) {
                        eventName = false;
                        if ((threshold < brk.from &&
                            y > brk.to) ||
                            (threshold > brk.from &&
                                y < brk.from)) {
                            eventName = 'pointBreak';
                        }
                        else if ((threshold < brk.from &&
                            y > brk.from &&
                            y < brk.to) ||
                            (threshold > brk.from &&
                                y > brk.to &&
                                y < brk.from)) {
                            eventName = 'pointInBreak';
                        }
                        if (eventName) {
                            fireEvent(axis, eventName, { point: point, brk: brk });
                        }
                    });
                });
            });
        };
        /**
         * Extend getGraphPath by identifying gaps in the data so that we can draw a gap
         * in the line or area. This was moved from ordinal axis module to broken axis
         * module as of #5045.
         *
         * @private
         * @function Highcharts.Series#gappedPath
         *
         * @return {Highcharts.SVGPathArray}
         *         Gapped path
         */
        H.Series.prototype.gappedPath = function () {
            var currentDataGrouping = this.currentDataGrouping, groupingSize = currentDataGrouping && currentDataGrouping.gapSize, gapSize = this.options.gapSize, points = this.points.slice(), i = points.length - 1, yAxis = this.yAxis, xRange, stack;
            /**
             * Defines when to display a gap in the graph, together with the
             * [gapUnit](plotOptions.series.gapUnit) option.
             *
             * In case when `dataGrouping` is enabled, points can be grouped into a
             * larger time span. This can make the grouped points to have a greater
             * distance than the absolute value of `gapSize` property, which will result
             * in disappearing graph completely. To prevent this situation the mentioned
             * distance between grouped points is used instead of previously defined
             * `gapSize`.
             *
             * In practice, this option is most often used to visualize gaps in
             * time series. In a stock chart, intraday data is available for daytime
             * hours, while gaps will appear in nights and weekends.
             *
             * @see [gapUnit](plotOptions.series.gapUnit)
             * @see [xAxis.breaks](#xAxis.breaks)
             *
             * @sample {highstock} stock/plotoptions/series-gapsize/
             *         Setting the gap size to 2 introduces gaps for weekends in daily
             *         datasets.
             *
             * @type      {number}
             * @default   0
             * @product   highstock
             * @apioption plotOptions.series.gapSize
             */
            /**
             * Together with [gapSize](plotOptions.series.gapSize), this option defines
             * where to draw gaps in the graph.
             *
             * When the `gapUnit` is `relative` (default), a gap size of 5 means
             * that if the distance between two points is greater than five times
             * that of the two closest points, the graph will be broken.
             *
             * When the `gapUnit` is `value`, the gap is based on absolute axis values,
             * which on a datetime axis is milliseconds. This also applies to the
             * navigator series that inherits gap options from the base series.
             *
             * @see [gapSize](plotOptions.series.gapSize)
             *
             * @type       {string}
             * @default    relative
             * @since      5.0.13
             * @product    highstock
             * @validvalue ["relative", "value"]
             * @apioption  plotOptions.series.gapUnit
             */
            if (gapSize && i > 0) { // #5008
                // Gap unit is relative
                if (this.options.gapUnit !== 'value') {
                    gapSize *= this.basePointRange;
                }
                // Setting a new gapSize in case dataGrouping is enabled (#7686)
                if (groupingSize &&
                    groupingSize > gapSize &&
                    // Except when DG is forced (e.g. from other series)
                    // and has lower granularity than actual points (#11351)
                    groupingSize >= this.basePointRange) {
                    gapSize = groupingSize;
                }
                // extension for ordinal breaks
                while (i--) {
                    if (points[i + 1].x - points[i].x > gapSize) {
                        xRange = (points[i].x + points[i + 1].x) / 2;
                        points.splice(// insert after this one
                        i + 1, 0, {
                            isNull: true,
                            x: xRange
                        });
                        // For stacked chart generate empty stack items, #6546
                        if (this.options.stacking) {
                            stack = yAxis.stacks[this.stackKey][xRange] =
                                new H.StackItem(yAxis, yAxis.options
                                    .stackLabels, false, xRange, this.stack);
                            stack.total = 0;
                        }
                    }
                }
            }
            // Call base method
            return this.getGraphPath(points);
        };

    });
    _registerModule(_modules, 'parts-gantt/TreeGrid.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['parts-gantt/Tree.js'], _modules['mixins/tree-series.js']], function (H, U, Tree, mixinTreeSeries) {
        /* *
         *
         *  (c) 2016 Highsoft AS
         *  Authors: Jon Arild Nygard
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint no-console: 0 */
        var defined = U.defined, isNumber = U.isNumber, isString = U.isString;
        var addEvent = H.addEvent, argsToArray = function (args) {
            return Array.prototype.slice.call(args, 1);
        }, extend = H.extend, find = H.find, fireEvent = H.fireEvent, getLevelOptions = mixinTreeSeries.getLevelOptions, merge = H.merge, isBoolean = function (x) {
            return typeof x === 'boolean';
        }, isObject = function (x) {
            // Always use strict mode.
            return U.isObject(x, true);
        }, pick = H.pick, wrap = H.wrap, GridAxis = H.Axis, GridAxisTick = H.Tick;
        var override = function (obj, methods) {
            var method, func;
            for (method in methods) {
                if (Object.hasOwnProperty.call(methods, method)) {
                    func = methods[method];
                    wrap(obj, method, func);
                }
            }
        };
        var getBreakFromNode = function (node, max) {
            var from = node.collapseStart, to = node.collapseEnd;
            // In broken-axis, the axis.max is minimized until it is not within a break.
            // Therefore, if break.to is larger than axis.max, the axis.to should not
            // add the 0.5 axis.tickMarkOffset, to avoid adding a break larger than
            // axis.max
            // TODO consider simplifying broken-axis and this might solve itself
            if (to >= max) {
                from -= 0.5;
            }
            return {
                from: from,
                to: to,
                showPoints: false
            };
        };
        /**
         * Creates a list of positions for the ticks on the axis. Filters out positions
         * that are outside min and max, or is inside an axis break.
         *
         * @private
         * @function getTickPositions
         *
         * @param {Highcharts.Axis} axis
         *        The Axis to get the tick positions from.
         *
         * @return {Array<number>}
         *         List of positions.
         */
        var getTickPositions = function (axis) {
            return Object.keys(axis.mapOfPosToGridNode).reduce(function (arr, key) {
                var pos = +key;
                if (axis.min <= pos &&
                    axis.max >= pos &&
                    !axis.isInAnyBreak(pos)) {
                    arr.push(pos);
                }
                return arr;
            }, []);
        };
        /**
         * Check if a node is collapsed.
         *
         * @private
         * @function isCollapsed
         *
         * @param {Highcharts.Axis} axis
         *        The axis to check against.
         *
         * @param {object} node
         *        The node to check if is collapsed.
         *
         * @param {number} pos
         *        The tick position to collapse.
         *
         * @return {boolean}
         *         Returns true if collapsed, false if expanded.
         */
        var isCollapsed = function (axis, node) {
            var breaks = (axis.options.breaks || []), obj = getBreakFromNode(node, axis.max);
            return breaks.some(function (b) {
                return b.from === obj.from && b.to === obj.to;
            });
        };
        /**
         * Calculates the new axis breaks to collapse a node.
         *
         * @private
         * @function collapse
         *
         * @param {Highcharts.Axis} axis
         *        The axis to check against.
         *
         * @param {object} node
         *        The node to collapse.
         *
         * @param {number} pos
         *        The tick position to collapse.
         *
         * @return {Array<object>}
         *         Returns an array of the new breaks for the axis.
         */
        var collapse = function (axis, node) {
            var breaks = (axis.options.breaks || []), obj = getBreakFromNode(node, axis.max);
            breaks.push(obj);
            return breaks;
        };
        /**
         * Calculates the new axis breaks to expand a node.
         *
         * @private
         * @function expand
         *
         * @param {Highcharts.Axis} axis
         *        The axis to check against.
         *
         * @param {object} node
         *        The node to expand.
         *
         * @param {number} pos
         *        The tick position to expand.
         *
         * @return {Array<object>}
         *         Returns an array of the new breaks for the axis.
         */
        var expand = function (axis, node) {
            var breaks = (axis.options.breaks || []), obj = getBreakFromNode(node, axis.max);
            // Remove the break from the axis breaks array.
            return breaks.reduce(function (arr, b) {
                if (b.to !== obj.to || b.from !== obj.from) {
                    arr.push(b);
                }
                return arr;
            }, []);
        };
        /* eslint-disable valid-jsdoc */
        /**
         * Calculates the new axis breaks after toggling the collapse/expand state of a
         * node. If it is collapsed it will be expanded, and if it is exapended it will
         * be collapsed.
         *
         * @private
         * @function toggleCollapse
         *
         * @param {Highcharts.Axis} axis
         *        The axis to check against.
         *
         * @param {object} node
         *        The node to toggle.
         *
         * @return {Array<object>}
         *         Returns an array of the new breaks for the axis.
         */
        var toggleCollapse = function (axis, node) {
            return (isCollapsed(axis, node) ?
                expand(axis, node) :
                collapse(axis, node));
        };
        var renderLabelIcon = function (tick, params) {
            var icon = tick.labelIcon, isNew = !icon, renderer = params.renderer, labelBox = params.xy, options = params.options, width = options.width, height = options.height, iconCenter = {
                x: labelBox.x - (width / 2) - options.padding,
                y: labelBox.y - (height / 2)
            }, rotation = params.collapsed ? 90 : 180, shouldRender = params.show && isNumber(iconCenter.y);
            if (isNew) {
                tick.labelIcon = icon = renderer.path(renderer.symbols[options.type](options.x, options.y, width, height))
                    .addClass('highcharts-label-icon')
                    .add(params.group);
            }
            // Set the new position, and show or hide
            if (!shouldRender) {
                icon.attr({ y: -9999 }); // #1338
            }
            // Presentational attributes
            if (!renderer.styledMode) {
                icon
                    .attr({
                    'stroke-width': 1,
                    'fill': pick(params.color, '#666666')
                })
                    .css({
                    cursor: 'pointer',
                    stroke: options.lineColor,
                    strokeWidth: options.lineWidth
                });
            }
            // Update the icon positions
            icon[isNew ? 'attr' : 'animate']({
                translateX: iconCenter.x,
                translateY: iconCenter.y,
                rotation: rotation
            });
        };
        var onTickHover = function (label) {
            label.addClass('highcharts-treegrid-node-active');
            if (!label.renderer.styledMode) {
                label.css({
                    textDecoration: 'underline'
                });
            }
        };
        var onTickHoverExit = function (label, options) {
            var css = defined(options.style) ? options.style : {};
            label.removeClass('highcharts-treegrid-node-active');
            if (!label.renderer.styledMode) {
                label.css({
                    textDecoration: css.textDecoration
                });
            }
        };
        /**
         * Creates a tree structure of the data, and the treegrid. Calculates
         * categories, and y-values of points based on the tree.
         *
         * @private
         * @function getTreeGridFromData
         *
         * @param {Array<*>} data
         *        All the data points to display in the axis.
         *
         * @param {boolean} uniqueNames
         *        Wether or not the data node with the same name should share grid cell.
         *        If true they do share cell. False by default.
         *
         * @param {number} numberOfSeries
         *
         * @return {object}
         *         Returns an object containing categories, mapOfIdToNode,
         *         mapOfPosToGridNode, and tree.
         *
         * @todo There should be only one point per line.
         * @todo It should be optional to have one category per point, or merge cells
         * @todo Add unit-tests.
         */
        var getTreeGridFromData = function (data, uniqueNames, numberOfSeries) {
            var categories = [], collapsedNodes = [], mapOfIdToNode = {}, mapOfPosToGridNode = {}, posIterator = -1, uniqueNamesEnabled = isBoolean(uniqueNames) ? uniqueNames : false, tree, treeParams, updateYValuesAndTickPos;
            // Build the tree from the series data.
            treeParams = {
                // After the children has been created.
                after: function (node) {
                    var gridNode = mapOfPosToGridNode[node.pos], height = 0, descendants = 0;
                    gridNode.children.forEach(function (child) {
                        descendants += child.descendants + 1;
                        height = Math.max(child.height + 1, height);
                    });
                    gridNode.descendants = descendants;
                    gridNode.height = height;
                    if (gridNode.collapsed) {
                        collapsedNodes.push(gridNode);
                    }
                },
                // Before the children has been created.
                before: function (node) {
                    var data = isObject(node.data) ? node.data : {}, name = isString(data.name) ? data.name : '', parentNode = mapOfIdToNode[node.parent], parentGridNode = (isObject(parentNode) ?
                        mapOfPosToGridNode[parentNode.pos] :
                        null), hasSameName = function (x) {
                        return x.name === name;
                    }, gridNode, pos;
                    // If not unique names, look for a sibling node with the same name.
                    if (uniqueNamesEnabled &&
                        isObject(parentGridNode) &&
                        !!(gridNode = find(parentGridNode.children, hasSameName))) {
                        // If if there is a gridNode with the same name, reuse position.
                        pos = gridNode.pos;
                        // Add data node to list of nodes in the grid node.
                        gridNode.nodes.push(node);
                    }
                    else {
                        // If it is a new grid node, increment position.
                        pos = posIterator++;
                    }
                    // Add new grid node to map.
                    if (!mapOfPosToGridNode[pos]) {
                        mapOfPosToGridNode[pos] = gridNode = {
                            depth: parentGridNode ? parentGridNode.depth + 1 : 0,
                            name: name,
                            nodes: [node],
                            children: [],
                            pos: pos
                        };
                        // If not root, then add name to categories.
                        if (pos !== -1) {
                            categories.push(name);
                        }
                        // Add name to list of children.
                        if (isObject(parentGridNode)) {
                            parentGridNode.children.push(gridNode);
                        }
                    }
                    // Add data node to map
                    if (isString(node.id)) {
                        mapOfIdToNode[node.id] = node;
                    }
                    // If one of the points are collapsed, then start the grid node in
                    // collapsed state.
                    if (data.collapsed === true) {
                        gridNode.collapsed = true;
                    }
                    // Assign pos to data node
                    node.pos = pos;
                }
            };
            updateYValuesAndTickPos = function (map, numberOfSeries) {
                var setValues = function (gridNode, start, result) {
                    var nodes = gridNode.nodes, end = start + (start === -1 ? 0 : numberOfSeries - 1), diff = (end - start) / 2, padding = 0.5, pos = start + diff;
                    nodes.forEach(function (node) {
                        var data = node.data;
                        if (isObject(data)) {
                            // Update point
                            data.y = start + data.seriesIndex;
                            // Remove the property once used
                            delete data.seriesIndex;
                        }
                        node.pos = pos;
                    });
                    result[pos] = gridNode;
                    gridNode.pos = pos;
                    gridNode.tickmarkOffset = diff + padding;
                    gridNode.collapseStart = end + padding;
                    gridNode.children.forEach(function (child) {
                        setValues(child, end + 1, result);
                        end = child.collapseEnd - padding;
                    });
                    // Set collapseEnd to the end of the last child node.
                    gridNode.collapseEnd = end + padding;
                    return result;
                };
                return setValues(map['-1'], -1, {});
            };
            // Create tree from data
            tree = Tree.getTree(data, treeParams);
            // Update y values of data, and set calculate tick positions.
            mapOfPosToGridNode = updateYValuesAndTickPos(mapOfPosToGridNode, numberOfSeries);
            // Return the resulting data.
            return {
                categories: categories,
                mapOfIdToNode: mapOfIdToNode,
                mapOfPosToGridNode: mapOfPosToGridNode,
                collapsedNodes: collapsedNodes,
                tree: tree
            };
        };
        /**
         * Builds the tree of categories and calculates its positions.
         * @private
         * @param {object} e Event object
         * @param {object} e.target The chart instance which the event was fired on.
         * @param {object[]} e.target.axes The axes of the chart.
         */
        var onBeforeRender = function (e) {
            var chart = e.target, axes = chart.axes;
            axes
                .filter(function (axis) {
                return axis.options.type === 'treegrid';
            })
                .forEach(function (axis) {
                var options = axis.options || {}, labelOptions = options.labels, removeFoundExtremesEvent, uniqueNames = options.uniqueNames, numberOfSeries = 0, isDirty, data, treeGrid;
                // Check whether any of series is rendering for the first time,
                // visibility has changed, or its data is dirty,
                // and only then update. #10570, #10580
                // Also check if mapOfPosToGridNode exists. #10887
                isDirty = (!axis.mapOfPosToGridNode ||
                    axis.series.some(function (series) {
                        return !series.hasRendered ||
                            series.isDirtyData ||
                            series.isDirty;
                    }));
                if (isDirty) {
                    // Concatenate data from all series assigned to this axis.
                    data = axis.series.reduce(function (arr, s) {
                        if (s.visible) {
                            // Push all data to array
                            s.options.data.forEach(function (data) {
                                if (isObject(data)) {
                                    // Set series index on data. Removed again after
                                    // use.
                                    data.seriesIndex = numberOfSeries;
                                    arr.push(data);
                                }
                            });
                            // Increment series index
                            if (uniqueNames === true) {
                                numberOfSeries++;
                            }
                        }
                        return arr;
                    }, []);
                    // setScale is fired after all the series is initialized,
                    // which is an ideal time to update the axis.categories.
                    treeGrid = getTreeGridFromData(data, uniqueNames, (uniqueNames === true) ? numberOfSeries : 1);
                    // Assign values to the axis.
                    axis.categories = treeGrid.categories;
                    axis.mapOfPosToGridNode =
                        treeGrid.mapOfPosToGridNode;
                    axis.hasNames = true;
                    axis.tree = treeGrid.tree;
                    // Update yData now that we have calculated the y values
                    axis.series.forEach(function (series) {
                        var data = series.options.data.map(function (d) {
                            return isObject(d) ? merge(d) : d;
                        });
                        // Avoid destroying points when series is not visible
                        if (series.visible) {
                            series.setData(data, false);
                        }
                    });
                    // Calculate the label options for each level in the tree.
                    axis.mapOptionsToLevel =
                        getLevelOptions({
                            defaults: labelOptions,
                            from: 1,
                            levels: labelOptions.levels,
                            to: axis.tree.height
                        });
                    // Collapse all the nodes belonging to a point where collapsed
                    // equals true. Only do this on init.
                    // Can be called from beforeRender, if getBreakFromNode removes
                    // its dependency on axis.max.
                    if (e.type === 'beforeRender') {
                        removeFoundExtremesEvent =
                            H.addEvent(axis, 'foundExtremes', function () {
                                treeGrid.collapsedNodes.forEach(function (node) {
                                    var breaks = collapse(axis, node);
                                    axis.setBreaks(breaks, false);
                                });
                                removeFoundExtremesEvent();
                            });
                    }
                }
            });
        };
        override(GridAxis.prototype, {
            init: function (proceed, chart, userOptions) {
                var axis = this, isTreeGrid = userOptions.type === 'treegrid';
                // Set default and forced options for TreeGrid
                if (isTreeGrid) {
                    // Add event for updating the categories of a treegrid.
                    // NOTE Preferably these events should be set on the axis.
                    addEvent(chart, 'beforeRender', onBeforeRender);
                    addEvent(chart, 'beforeRedraw', onBeforeRender);
                    userOptions = merge({
                        // Default options
                        grid: {
                            enabled: true
                        },
                        // TODO: add support for align in treegrid.
                        labels: {
                            align: 'left',
                            /**
                            * Set options on specific levels in a tree grid axis. Takes
                            * precedence over labels options.
                            *
                            * @sample {gantt} gantt/treegrid-axis/labels-levels
                            *         Levels on TreeGrid Labels
                            *
                            * @type      {Array<*>}
                            * @product   gantt
                            * @apioption yAxis.labels.levels
                            *
                            * @private
                            */
                            levels: [{
                                    /**
                                    * Specify the level which the options within this object
                                    * applies to.
                                    *
                                    * @type      {number}
                                    * @product   gantt
                                    * @apioption yAxis.labels.levels.level
                                    *
                                    * @private
                                    */
                                    level: undefined
                                }, {
                                    level: 1,
                                    /**
                                     * @type      {Highcharts.CSSObject}
                                     * @product   gantt
                                     * @apioption yAxis.labels.levels.style
                                     *
                                     * @private
                                     */
                                    style: {
                                        /** @ignore-option */
                                        fontWeight: 'bold'
                                    }
                                }],
                            /**
                             * The symbol for the collapse and expand icon in a
                             * treegrid.
                             *
                             * @product      gantt
                             * @optionparent yAxis.labels.symbol
                             *
                             * @private
                             */
                            symbol: {
                                /**
                                 * The symbol type. Points to a definition function in
                                 * the `Highcharts.Renderer.symbols` collection.
                                 *
                                 * @type {Highcharts.SymbolKeyValue}
                                 *
                                 * @private
                                 */
                                type: 'triangle',
                                x: -5,
                                y: -5,
                                height: 10,
                                width: 10,
                                padding: 5
                            }
                        },
                        uniqueNames: false
                    }, userOptions, {
                        // Forced options
                        reversed: true,
                        // grid.columns is not supported in treegrid
                        grid: {
                            columns: undefined
                        }
                    });
                }
                // Now apply the original function with the original arguments,
                // which are sliced off this function's arguments
                proceed.apply(axis, [chart, userOptions]);
                if (isTreeGrid) {
                    axis.hasNames = true;
                    axis.options.showLastLabel = true;
                }
            },
            /**
             * Override to add indentation to axis.maxLabelDimensions.
             *
             * @private
             * @function Highcharts.GridAxis#getMaxLabelDimensions
             *
             * @param {Function} proceed
             *        The original function
             */
            getMaxLabelDimensions: function (proceed) {
                var axis = this, options = axis.options, labelOptions = options && options.labels, indentation = (labelOptions && isNumber(labelOptions.indentation) ?
                    options.labels.indentation :
                    0), retVal = proceed.apply(axis, argsToArray(arguments)), isTreeGrid = axis.options.type === 'treegrid', treeDepth;
                if (isTreeGrid && this.mapOfPosToGridNode) {
                    treeDepth = axis.mapOfPosToGridNode[-1].height;
                    retVal.width += indentation * (treeDepth - 1);
                }
                return retVal;
            },
            /**
             * Generates a tick for initial positioning.
             *
             * @private
             * @function Highcharts.GridAxis#generateTick
             *
             * @param {Function} proceed
             *        The original generateTick function.
             *
             * @param {number} pos
             *        The tick position in axis values.
             */
            generateTick: function (proceed, pos) {
                var axis = this, mapOptionsToLevel = (isObject(axis.mapOptionsToLevel) ? axis.mapOptionsToLevel : {}), isTreeGrid = axis.options.type === 'treegrid', ticks = axis.ticks, tick = ticks[pos], levelOptions, options, gridNode;
                if (isTreeGrid) {
                    gridNode = axis.mapOfPosToGridNode[pos];
                    levelOptions = mapOptionsToLevel[gridNode.depth];
                    if (levelOptions) {
                        options = {
                            labels: levelOptions
                        };
                    }
                    if (!tick) {
                        ticks[pos] = tick =
                            new GridAxisTick(axis, pos, null, undefined, {
                                category: gridNode.name,
                                tickmarkOffset: gridNode.tickmarkOffset,
                                options: options
                            });
                    }
                    else {
                        // update labels depending on tick interval
                        tick.parameters.category = gridNode.name;
                        tick.options = options;
                        tick.addLabel();
                    }
                }
                else {
                    proceed.apply(axis, argsToArray(arguments));
                }
            },
            /**
             * Set the tick positions, tickInterval, axis min and max.
             *
             * @private
             * @function Highcharts.GridAxis#setTickInterval
             *
             * @param {Function} proceed
             *        The original setTickInterval function.
             */
            setTickInterval: function (proceed) {
                var axis = this, options = axis.options, isTreeGrid = options.type === 'treegrid';
                if (isTreeGrid) {
                    axis.min = pick(axis.userMin, options.min, axis.dataMin);
                    axis.max = pick(axis.userMax, options.max, axis.dataMax);
                    fireEvent(axis, 'foundExtremes');
                    // setAxisTranslation modifies the min and max according to
                    // axis breaks.
                    axis.setAxisTranslation(true);
                    axis.tickmarkOffset = 0.5;
                    axis.tickInterval = 1;
                    axis.tickPositions = this.mapOfPosToGridNode ?
                        getTickPositions(axis) :
                        [];
                }
                else {
                    proceed.apply(axis, argsToArray(arguments));
                }
            }
        });
        override(GridAxisTick.prototype, {
            getLabelPosition: function (proceed, x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
                var tick = this, lbOptions = pick(tick.options && tick.options.labels, labelOptions), pos = tick.pos, axis = tick.axis, options = axis.options, isTreeGrid = options.type === 'treegrid', result = proceed.apply(tick, [x, y, label, horiz, lbOptions, tickmarkOffset, index, step]), symbolOptions, indentation, mapOfPosToGridNode, node, level;
                if (isTreeGrid) {
                    symbolOptions = (lbOptions && isObject(lbOptions.symbol) ?
                        lbOptions.symbol :
                        {});
                    indentation = (lbOptions && isNumber(lbOptions.indentation) ?
                        lbOptions.indentation :
                        0);
                    mapOfPosToGridNode = axis.mapOfPosToGridNode;
                    node = mapOfPosToGridNode && mapOfPosToGridNode[pos];
                    level = (node && node.depth) || 1;
                    result.x += (
                    // Add space for symbols
                    ((symbolOptions.width) + (symbolOptions.padding * 2)) +
                        // Apply indentation
                        ((level - 1) * indentation));
                }
                return result;
            },
            renderLabel: function (proceed) {
                var tick = this, pos = tick.pos, axis = tick.axis, label = tick.label, mapOfPosToGridNode = axis.mapOfPosToGridNode, options = axis.options, labelOptions = pick(tick.options && tick.options.labels, options && options.labels), symbolOptions = (labelOptions && isObject(labelOptions.symbol) ?
                    labelOptions.symbol :
                    {}), node = mapOfPosToGridNode && mapOfPosToGridNode[pos], level = node && node.depth, isTreeGrid = options.type === 'treegrid', hasLabel = !!(label && label.element), shouldRender = axis.tickPositions.indexOf(pos) > -1, prefixClassName = 'highcharts-treegrid-node-', collapsed, addClassName, removeClassName, styledMode = axis.chart.styledMode;
                if (isTreeGrid && node) {
                    // Add class name for hierarchical styling.
                    if (hasLabel) {
                        label.addClass(prefixClassName + 'level-' + level);
                    }
                }
                proceed.apply(tick, argsToArray(arguments));
                if (isTreeGrid && node && hasLabel && node.descendants > 0) {
                    collapsed = isCollapsed(axis, node);
                    renderLabelIcon(tick, {
                        color: !styledMode && label.styles.color,
                        collapsed: collapsed,
                        group: label.parentGroup,
                        options: symbolOptions,
                        renderer: label.renderer,
                        show: shouldRender,
                        xy: label.xy
                    });
                    // Add class name for the node.
                    addClassName = prefixClassName +
                        (collapsed ? 'collapsed' : 'expanded');
                    removeClassName = prefixClassName +
                        (collapsed ? 'expanded' : 'collapsed');
                    label
                        .addClass(addClassName)
                        .removeClass(removeClassName);
                    if (!styledMode) {
                        label.css({
                            cursor: 'pointer'
                        });
                    }
                    // Add events to both label text and icon
                    [label, tick.labelIcon].forEach(function (object) {
                        if (!object.attachedTreeGridEvents) {
                            // On hover
                            H.addEvent(object.element, 'mouseover', function () {
                                onTickHover(label);
                            });
                            // On hover out
                            H.addEvent(object.element, 'mouseout', function () {
                                onTickHoverExit(label, labelOptions);
                            });
                            H.addEvent(object.element, 'click', function () {
                                tick.toggleCollapse();
                            });
                            object.attachedTreeGridEvents = true;
                        }
                    });
                }
            }
        });
        extend(GridAxisTick.prototype, /** @lends Highcharts.Tick.prototype */ {
            /**
             * Collapse the grid cell. Used when axis is of type treegrid.
             *
             * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
             *
             * @private
             * @function Highcharts.Tick#collapse
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or wait for an explicit call to
             *        {@link Highcharts.Chart#redraw}
             */
            collapse: function (redraw) {
                var tick = this, axis = tick.axis, pos = tick.pos, node = axis.mapOfPosToGridNode[pos], breaks = collapse(axis, node);
                axis.setBreaks(breaks, pick(redraw, true));
            },
            /**
             * Expand the grid cell. Used when axis is of type treegrid.
             *
             * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
             *
             * @private
             * @function Highcharts.Tick#expand
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or wait for an explicit call to
             *        {@link Highcharts.Chart#redraw}
             */
            expand: function (redraw) {
                var tick = this, axis = tick.axis, pos = tick.pos, node = axis.mapOfPosToGridNode[pos], breaks = expand(axis, node);
                axis.setBreaks(breaks, pick(redraw, true));
            },
            /**
             * Toggle the collapse/expand state of the grid cell. Used when axis is of
             * type treegrid.
             *
             * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
             *
             * @private
             * @function Highcharts.Tick#toggleCollapse
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or wait for an explicit call to
             *        {@link Highcharts.Chart#redraw}
             */
            toggleCollapse: function (redraw) {
                var tick = this, axis = tick.axis, pos = tick.pos, node = axis.mapOfPosToGridNode[pos], breaks = toggleCollapse(axis, node);
                axis.setBreaks(breaks, pick(redraw, true));
            }
        });
        // Make utility functions available for testing.
        GridAxis.prototype.utils = {
            getNode: Tree.getNode
        };

    });
    _registerModule(_modules, 'parts-gantt/PathfinderAlgorithms.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2016 Highsoft AS
         *  Author: Øystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var min = Math.min, max = Math.max, abs = Math.abs, pick = H.pick;
        /**
         * Get index of last obstacle before xMin. Employs a type of binary search, and
         * thus requires that obstacles are sorted by xMin value.
         *
         * @private
         * @function findLastObstacleBefore
         *
         * @param {Array<object>} obstacles
         *        Array of obstacles to search in.
         *
         * @param {number} xMin
         *        The xMin threshold.
         *
         * @param {number} [startIx]
         *        Starting index to search from. Must be within array range.
         *
         * @return {number}
         *         The index of the last obstacle element before xMin.
         */
        function findLastObstacleBefore(obstacles, xMin, startIx) {
            var left = startIx || 0, // left limit
            right = obstacles.length - 1, // right limit
            min = xMin - 0.0000001, // Make sure we include all obstacles at xMin
            cursor, cmp;
            while (left <= right) {
                cursor = (right + left) >> 1;
                cmp = min - obstacles[cursor].xMin;
                if (cmp > 0) {
                    left = cursor + 1;
                }
                else if (cmp < 0) {
                    right = cursor - 1;
                }
                else {
                    return cursor;
                }
            }
            return left > 0 ? left - 1 : 0;
        }
        /**
         * Test if a point lays within an obstacle.
         *
         * @private
         * @function pointWithinObstacle
         *
         * @param {object} obstacle
         *        Obstacle to test.
         *
         * @param {Highcharts.Point} point
         *        Point with x/y props.
         *
         * @return {boolean}
         *         Whether point is within the obstacle or not.
         */
        function pointWithinObstacle(obstacle, point) {
            return (point.x <= obstacle.xMax &&
                point.x >= obstacle.xMin &&
                point.y <= obstacle.yMax &&
                point.y >= obstacle.yMin);
        }
        /**
         * Find the index of an obstacle that wraps around a point.
         * Returns -1 if not found.
         *
         * @private
         * @function findObstacleFromPoint
         *
         * @param {Array<object>} obstacles
         *        Obstacles to test.
         *
         * @param {Highcharts.Point} point
         *        Point with x/y props.
         *
         * @return {number}
         *         Ix of the obstacle in the array, or -1 if not found.
         */
        function findObstacleFromPoint(obstacles, point) {
            var i = findLastObstacleBefore(obstacles, point.x + 1) + 1;
            while (i--) {
                if (obstacles[i].xMax >= point.x &&
                    // optimization using lazy evaluation
                    pointWithinObstacle(obstacles[i], point)) {
                    return i;
                }
            }
            return -1;
        }
        /**
         * Get SVG path array from array of line segments.
         *
         * @private
         * @function pathFromSegments
         *
         * @param {Array<object>} segments
         *        The segments to build the path from.
         *
         * @return {Highcharts.SVGPathArray}
         *         SVG path array as accepted by the SVG Renderer.
         */
        function pathFromSegments(segments) {
            var path = [];
            if (segments.length) {
                path.push('M', segments[0].start.x, segments[0].start.y);
                for (var i = 0; i < segments.length; ++i) {
                    path.push('L', segments[i].end.x, segments[i].end.y);
                }
            }
            return path;
        }
        /**
         * Limits obstacle max/mins in all directions to bounds. Modifies input
         * obstacle.
         *
         * @private
         * @function limitObstacleToBounds
         *
         * @param {object} obstacle
         *        Obstacle to limit.
         *
         * @param {object} bounds
         *        Bounds to use as limit.
         *
         * @return {void}
         */
        function limitObstacleToBounds(obstacle, bounds) {
            obstacle.yMin = max(obstacle.yMin, bounds.yMin);
            obstacle.yMax = min(obstacle.yMax, bounds.yMax);
            obstacle.xMin = max(obstacle.xMin, bounds.xMin);
            obstacle.xMax = min(obstacle.xMax, bounds.xMax);
        }
        // Define the available pathfinding algorithms.
        // Algorithms take up to 3 arguments: starting point, ending point, and an
        // options object.
        var algorithms = {
            /**
             * Get an SVG path from a starting coordinate to an ending coordinate.
             * Draws a straight line.
             *
             * @function Highcharts.Pathfinder.algorithms.straight
             *
             * @param {Highcharts.PositionObject} start
             *        Starting coordinate, object with x/y props.
             *
             * @param {Highcharts.PositionObject} end
             *        Ending coordinate, object with x/y props.
             *
             * @return {object}
             *         An object with the SVG path in Array form as accepted by the SVG
             *         renderer, as well as an array of new obstacles making up this
             *         path.
             */
            straight: function (start, end) {
                return {
                    path: ['M', start.x, start.y, 'L', end.x, end.y],
                    obstacles: [{ start: start, end: end }]
                };
            },
            /**
             * Find a path from a starting coordinate to an ending coordinate, using
             * right angles only, and taking only starting/ending obstacle into
             * consideration.
             *
             * @function Highcharts.Pathfinder.algorithms.simpleConnect
             *
             * @param {Highcharts.PositionObject} start
             *        Starting coordinate, object with x/y props.
             *
             * @param {Highcharts.PositionObject} end
             *        Ending coordinate, object with x/y props.
             *
             * @param {object} options
             *        Options for the algorithm:
             *        - chartObstacles: Array of chart obstacles to avoid
             *        - startDirectionX: Optional. True if starting in the X direction.
             *          If not provided, the algorithm starts in the direction that is
             *          the furthest between start/end.
             *
             * @return {object}
             *         An object with the SVG path in Array form as accepted by the SVG
             *         renderer, as well as an array of new obstacles making up this
             *         path.
             */
            simpleConnect: H.extend(function (start, end, options) {
                var segments = [], endSegment, dir = pick(options.startDirectionX, abs(end.x - start.x) > abs(end.y - start.y)) ? 'x' : 'y', chartObstacles = options.chartObstacles, startObstacleIx = findObstacleFromPoint(chartObstacles, start), endObstacleIx = findObstacleFromPoint(chartObstacles, end), startObstacle, endObstacle, prevWaypoint, waypoint, waypoint2, useMax, endPoint;
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Return a clone of a point with a property set from a target object,
                 * optionally with an offset
                 * @private
                 */
                function copyFromPoint(from, fromKey, to, toKey, offset) {
                    var point = {
                        x: from.x,
                        y: from.y
                    };
                    point[fromKey] = to[toKey || fromKey] + (offset || 0);
                    return point;
                }
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Return waypoint outside obstacle.
                 * @private
                 */
                function getMeOut(obstacle, point, direction) {
                    var useMax = abs(point[direction] - obstacle[direction + 'Min']) >
                        abs(point[direction] - obstacle[direction + 'Max']);
                    return copyFromPoint(point, direction, obstacle, direction + (useMax ? 'Max' : 'Min'), useMax ? 1 : -1);
                }
                // Pull out end point
                if (endObstacleIx > -1) {
                    endObstacle = chartObstacles[endObstacleIx];
                    waypoint = getMeOut(endObstacle, end, dir);
                    endSegment = {
                        start: waypoint,
                        end: end
                    };
                    endPoint = waypoint;
                }
                else {
                    endPoint = end;
                }
                // If an obstacle envelops the start point, add a segment to get out,
                // and around it.
                if (startObstacleIx > -1) {
                    startObstacle = chartObstacles[startObstacleIx];
                    waypoint = getMeOut(startObstacle, start, dir);
                    segments.push({
                        start: start,
                        end: waypoint
                    });
                    // If we are going back again, switch direction to get around start
                    // obstacle.
                    if (
                    // Going towards max from start:
                    waypoint[dir] >= start[dir] ===
                        // Going towards min to end:
                        waypoint[dir] >= endPoint[dir]) {
                        dir = dir === 'y' ? 'x' : 'y';
                        useMax = start[dir] < end[dir];
                        segments.push({
                            start: waypoint,
                            end: copyFromPoint(waypoint, dir, startObstacle, dir + (useMax ? 'Max' : 'Min'), useMax ? 1 : -1)
                        });
                        // Switch direction again
                        dir = dir === 'y' ? 'x' : 'y';
                    }
                }
                // We are around the start obstacle. Go towards the end in one
                // direction.
                prevWaypoint = segments.length ?
                    segments[segments.length - 1].end :
                    start;
                waypoint = copyFromPoint(prevWaypoint, dir, endPoint);
                segments.push({
                    start: prevWaypoint,
                    end: waypoint
                });
                // Final run to end point in the other direction
                dir = dir === 'y' ? 'x' : 'y';
                waypoint2 = copyFromPoint(waypoint, dir, endPoint);
                segments.push({
                    start: waypoint,
                    end: waypoint2
                });
                // Finally add the endSegment
                segments.push(endSegment);
                return {
                    path: pathFromSegments(segments),
                    obstacles: segments
                };
            }, {
                requiresObstacles: true
            }),
            /**
             * Find a path from a starting coordinate to an ending coordinate, taking
             * obstacles into consideration. Might not always find the optimal path,
             * but is fast, and usually good enough.
             *
             * @function Highcharts.Pathfinder.algorithms.fastAvoid
             *
             * @param {Highcharts.PositionObject} start
             *        Starting coordinate, object with x/y props.
             *
             * @param {Highcharts.PositionObject} end
             *        Ending coordinate, object with x/y props.
             *
             * @param {object} options
             *        Options for the algorithm.
             *        - chartObstacles:  Array of chart obstacles to avoid
             *        - lineObstacles:   Array of line obstacles to jump over
             *        - obstacleMetrics: Object with metrics of chartObstacles cached
             *        - hardBounds:      Hard boundaries to not cross
             *        - obstacleOptions: Options for the obstacles, including margin
             *        - startDirectionX: Optional. True if starting in the X direction.
             *                           If not provided, the algorithm starts in the
             *                           direction that is the furthest between
             *                           start/end.
             *
             * @return {object}
             *         An object with the SVG path in Array form as accepted by the SVG
             *         renderer, as well as an array of new obstacles making up this
             *         path.
             */
            fastAvoid: H.extend(function (start, end, options) {
                /*
                    Algorithm rules/description
                    - Find initial direction
                    - Determine soft/hard max for each direction.
                    - Move along initial direction until obstacle.
                    - Change direction.
                    - If hitting obstacle, first try to change length of previous line
                      before changing direction again.

                    Soft min/max x = start/destination x +/- widest obstacle + margin
                    Soft min/max y = start/destination y +/- tallest obstacle + margin

                    @todo:
                        - Make retrospective, try changing prev segment to reduce
                          corners
                        - Fix logic for breaking out of end-points - not always picking
                          the best direction currently
                        - When going around the end obstacle we should not always go the
                          shortest route, rather pick the one closer to the end point
                */
                var dirIsX = pick(options.startDirectionX, abs(end.x - start.x) > abs(end.y - start.y)), dir = dirIsX ? 'x' : 'y', segments, useMax, extractedEndPoint, endSegments = [], forceObstacleBreak = false, // Used in clearPathTo to keep track of
                // when to force break through an obstacle.
                // Boundaries to stay within. If beyond soft boundary, prefer to
                // change direction ASAP. If at hard max, always change immediately.
                metrics = options.obstacleMetrics, softMinX = min(start.x, end.x) - metrics.maxWidth - 10, softMaxX = max(start.x, end.x) + metrics.maxWidth + 10, softMinY = min(start.y, end.y) - metrics.maxHeight - 10, softMaxY = max(start.y, end.y) + metrics.maxHeight + 10, 
                // Obstacles
                chartObstacles = options.chartObstacles, startObstacleIx = findLastObstacleBefore(chartObstacles, softMinX), endObstacleIx = findLastObstacleBefore(chartObstacles, softMaxX);
                // eslint-disable-next-line valid-jsdoc
                /**
                 * How far can you go between two points before hitting an obstacle?
                 * Does not work for diagonal lines (because it doesn't have to).
                 * @private
                 */
                function pivotPoint(fromPoint, toPoint, directionIsX) {
                    var firstPoint, lastPoint, highestPoint, lowestPoint, i, searchDirection = fromPoint.x < toPoint.x ? 1 : -1;
                    if (fromPoint.x < toPoint.x) {
                        firstPoint = fromPoint;
                        lastPoint = toPoint;
                    }
                    else {
                        firstPoint = toPoint;
                        lastPoint = fromPoint;
                    }
                    if (fromPoint.y < toPoint.y) {
                        lowestPoint = fromPoint;
                        highestPoint = toPoint;
                    }
                    else {
                        lowestPoint = toPoint;
                        highestPoint = fromPoint;
                    }
                    // Go through obstacle range in reverse if toPoint is before
                    // fromPoint in the X-dimension.
                    i = searchDirection < 0 ?
                        // Searching backwards, start at last obstacle before last point
                        min(findLastObstacleBefore(chartObstacles, lastPoint.x), chartObstacles.length - 1) :
                        // Forwards. Since we're not sorted by xMax, we have to look
                        // at all obstacles.
                        0;
                    // Go through obstacles in this X range
                    while (chartObstacles[i] && (searchDirection > 0 && chartObstacles[i].xMin <= lastPoint.x ||
                        searchDirection < 0 && chartObstacles[i].xMax >= firstPoint.x)) {
                        // If this obstacle is between from and to points in a straight
                        // line, pivot at the intersection.
                        if (chartObstacles[i].xMin <= lastPoint.x &&
                            chartObstacles[i].xMax >= firstPoint.x &&
                            chartObstacles[i].yMin <= highestPoint.y &&
                            chartObstacles[i].yMax >= lowestPoint.y) {
                            if (directionIsX) {
                                return {
                                    y: fromPoint.y,
                                    x: fromPoint.x < toPoint.x ?
                                        chartObstacles[i].xMin - 1 :
                                        chartObstacles[i].xMax + 1,
                                    obstacle: chartObstacles[i]
                                };
                            }
                            // else ...
                            return {
                                x: fromPoint.x,
                                y: fromPoint.y < toPoint.y ?
                                    chartObstacles[i].yMin - 1 :
                                    chartObstacles[i].yMax + 1,
                                obstacle: chartObstacles[i]
                            };
                        }
                        i += searchDirection;
                    }
                    return toPoint;
                }
                /**
                 * Decide in which direction to dodge or get out of an obstacle.
                 * Considers desired direction, which way is shortest, soft and hard
                 * bounds.
                 *
                 * (? Returns a string, either xMin, xMax, yMin or yMax.)
                 *
                 * @private
                 * @function
                 *
                 * @param {object} obstacle
                 *        Obstacle to dodge/escape.
                 *
                 * @param {object} fromPoint
                 *        Point with x/y props that's dodging/escaping.
                 *
                 * @param {object} toPoint
                 *        Goal point.
                 *
                 * @param {boolean} dirIsX
                 *        Dodge in X dimension.
                 *
                 * @param {object} bounds
                 *        Hard and soft boundaries.
                 *
                 * @return {boolean}
                 *         Use max or not.
                 */
                function getDodgeDirection(obstacle, fromPoint, toPoint, dirIsX, bounds) {
                    var softBounds = bounds.soft, hardBounds = bounds.hard, dir = dirIsX ? 'x' : 'y', toPointMax = { x: fromPoint.x, y: fromPoint.y }, toPointMin = { x: fromPoint.x, y: fromPoint.y }, minPivot, maxPivot, maxOutOfSoftBounds = obstacle[dir + 'Max'] >=
                        softBounds[dir + 'Max'], minOutOfSoftBounds = obstacle[dir + 'Min'] <=
                        softBounds[dir + 'Min'], maxOutOfHardBounds = obstacle[dir + 'Max'] >=
                        hardBounds[dir + 'Max'], minOutOfHardBounds = obstacle[dir + 'Min'] <=
                        hardBounds[dir + 'Min'], 
                    // Find out if we should prefer one direction over the other if
                    // we can choose freely
                    minDistance = abs(obstacle[dir + 'Min'] - fromPoint[dir]), maxDistance = abs(obstacle[dir + 'Max'] - fromPoint[dir]), 
                    // If it's a small difference, pick the one leading towards dest
                    // point. Otherwise pick the shortest distance
                    useMax = abs(minDistance - maxDistance) < 10 ?
                        fromPoint[dir] < toPoint[dir] :
                        maxDistance < minDistance;
                    // Check if we hit any obstacles trying to go around in either
                    // direction.
                    toPointMin[dir] = obstacle[dir + 'Min'];
                    toPointMax[dir] = obstacle[dir + 'Max'];
                    minPivot = pivotPoint(fromPoint, toPointMin, dirIsX)[dir] !==
                        toPointMin[dir];
                    maxPivot = pivotPoint(fromPoint, toPointMax, dirIsX)[dir] !==
                        toPointMax[dir];
                    useMax = minPivot ?
                        (maxPivot ? useMax : true) :
                        (maxPivot ? false : useMax);
                    // useMax now contains our preferred choice, bounds not taken into
                    // account. If both or neither direction is out of bounds we want to
                    // use this.
                    // Deal with soft bounds
                    useMax = minOutOfSoftBounds ?
                        (maxOutOfSoftBounds ? useMax : true) : // Out on min
                        (maxOutOfSoftBounds ? false : useMax); // Not out on min
                    // Deal with hard bounds
                    useMax = minOutOfHardBounds ?
                        (maxOutOfHardBounds ? useMax : true) : // Out on min
                        (maxOutOfHardBounds ? false : useMax); // Not out on min
                    return useMax;
                }
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Find a clear path between point.
                 * @private
                 */
                function clearPathTo(fromPoint, toPoint, dirIsX) {
                    // Don't waste time if we've hit goal
                    if (fromPoint.x === toPoint.x && fromPoint.y === toPoint.y) {
                        return [];
                    }
                    var dir = dirIsX ? 'x' : 'y', pivot, segments, waypoint, waypointUseMax, envelopingObstacle, secondEnvelopingObstacle, envelopWaypoint, obstacleMargin = options.obstacleOptions.margin, bounds = {
                        soft: {
                            xMin: softMinX,
                            xMax: softMaxX,
                            yMin: softMinY,
                            yMax: softMaxY
                        },
                        hard: options.hardBounds
                    };
                    // If fromPoint is inside an obstacle we have a problem. Break out
                    // by just going to the outside of this obstacle. We prefer to go to
                    // the nearest edge in the chosen direction.
                    envelopingObstacle =
                        findObstacleFromPoint(chartObstacles, fromPoint);
                    if (envelopingObstacle > -1) {
                        envelopingObstacle = chartObstacles[envelopingObstacle];
                        waypointUseMax = getDodgeDirection(envelopingObstacle, fromPoint, toPoint, dirIsX, bounds);
                        // Cut obstacle to hard bounds to make sure we stay within
                        limitObstacleToBounds(envelopingObstacle, options.hardBounds);
                        envelopWaypoint = dirIsX ? {
                            y: fromPoint.y,
                            x: envelopingObstacle[waypointUseMax ? 'xMax' : 'xMin'] +
                                (waypointUseMax ? 1 : -1)
                        } : {
                            x: fromPoint.x,
                            y: envelopingObstacle[waypointUseMax ? 'yMax' : 'yMin'] +
                                (waypointUseMax ? 1 : -1)
                        };
                        // If we crashed into another obstacle doing this, we put the
                        // waypoint between them instead
                        secondEnvelopingObstacle = findObstacleFromPoint(chartObstacles, envelopWaypoint);
                        if (secondEnvelopingObstacle > -1) {
                            secondEnvelopingObstacle = chartObstacles[secondEnvelopingObstacle];
                            // Cut obstacle to hard bounds
                            limitObstacleToBounds(secondEnvelopingObstacle, options.hardBounds);
                            // Modify waypoint to lay between obstacles
                            envelopWaypoint[dir] = waypointUseMax ? max(envelopingObstacle[dir + 'Max'] - obstacleMargin + 1, (secondEnvelopingObstacle[dir + 'Min'] +
                                envelopingObstacle[dir + 'Max']) / 2) :
                                min((envelopingObstacle[dir + 'Min'] + obstacleMargin - 1), ((secondEnvelopingObstacle[dir + 'Max'] +
                                    envelopingObstacle[dir + 'Min']) / 2));
                            // We are not going anywhere. If this happens for the first
                            // time, do nothing. Otherwise, try to go to the extreme of
                            // the obstacle pair in the current direction.
                            if (fromPoint.x === envelopWaypoint.x &&
                                fromPoint.y === envelopWaypoint.y) {
                                if (forceObstacleBreak) {
                                    envelopWaypoint[dir] = waypointUseMax ?
                                        max(envelopingObstacle[dir + 'Max'], secondEnvelopingObstacle[dir + 'Max']) + 1 :
                                        min(envelopingObstacle[dir + 'Min'], secondEnvelopingObstacle[dir + 'Min']) - 1;
                                }
                                // Toggle on if off, and the opposite
                                forceObstacleBreak = !forceObstacleBreak;
                            }
                            else {
                                // This point is not identical to previous.
                                // Clear break trigger.
                                forceObstacleBreak = false;
                            }
                        }
                        segments = [{
                                start: fromPoint,
                                end: envelopWaypoint
                            }];
                    }
                    else { // If not enveloping, use standard pivot calculation
                        pivot = pivotPoint(fromPoint, {
                            x: dirIsX ? toPoint.x : fromPoint.x,
                            y: dirIsX ? fromPoint.y : toPoint.y
                        }, dirIsX);
                        segments = [{
                                start: fromPoint,
                                end: {
                                    x: pivot.x,
                                    y: pivot.y
                                }
                            }];
                        // Pivot before goal, use a waypoint to dodge obstacle
                        if (pivot[dirIsX ? 'x' : 'y'] !== toPoint[dirIsX ? 'x' : 'y']) {
                            // Find direction of waypoint
                            waypointUseMax = getDodgeDirection(pivot.obstacle, pivot, toPoint, !dirIsX, bounds);
                            // Cut waypoint to hard bounds
                            limitObstacleToBounds(pivot.obstacle, options.hardBounds);
                            waypoint = {
                                x: dirIsX ?
                                    pivot.x :
                                    pivot.obstacle[waypointUseMax ? 'xMax' : 'xMin'] +
                                        (waypointUseMax ? 1 : -1),
                                y: dirIsX ?
                                    pivot.obstacle[waypointUseMax ? 'yMax' : 'yMin'] +
                                        (waypointUseMax ? 1 : -1) :
                                    pivot.y
                            };
                            // We're changing direction here, store that to make sure we
                            // also change direction when adding the last segment array
                            // after handling waypoint.
                            dirIsX = !dirIsX;
                            segments = segments.concat(clearPathTo({
                                x: pivot.x,
                                y: pivot.y
                            }, waypoint, dirIsX));
                        }
                    }
                    // Get segments for the other direction too
                    // Recursion is our friend
                    segments = segments.concat(clearPathTo(segments[segments.length - 1].end, toPoint, !dirIsX));
                    return segments;
                }
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Extract point to outside of obstacle in whichever direction is
                 * closest. Returns new point outside obstacle.
                 * @private
                 */
                function extractFromObstacle(obstacle, point, goalPoint) {
                    var dirIsX = min(obstacle.xMax - point.x, point.x - obstacle.xMin) <
                        min(obstacle.yMax - point.y, point.y - obstacle.yMin), bounds = {
                        soft: options.hardBounds,
                        hard: options.hardBounds
                    }, useMax = getDodgeDirection(obstacle, point, goalPoint, dirIsX, bounds);
                    return dirIsX ? {
                        y: point.y,
                        x: obstacle[useMax ? 'xMax' : 'xMin'] + (useMax ? 1 : -1)
                    } : {
                        x: point.x,
                        y: obstacle[useMax ? 'yMax' : 'yMin'] + (useMax ? 1 : -1)
                    };
                }
                // Cut the obstacle array to soft bounds for optimization in large
                // datasets.
                chartObstacles =
                    chartObstacles.slice(startObstacleIx, endObstacleIx + 1);
                // If an obstacle envelops the end point, move it out of there and add
                // a little segment to where it was.
                if ((endObstacleIx = findObstacleFromPoint(chartObstacles, end)) > -1) {
                    extractedEndPoint = extractFromObstacle(chartObstacles[endObstacleIx], end, start);
                    endSegments.push({
                        end: end,
                        start: extractedEndPoint
                    });
                    end = extractedEndPoint;
                }
                // If it's still inside one or more obstacles, get out of there by
                // force-moving towards the start point.
                while ((endObstacleIx = findObstacleFromPoint(chartObstacles, end)) > -1) {
                    useMax = end[dir] - start[dir] < 0;
                    extractedEndPoint = {
                        x: end.x,
                        y: end.y
                    };
                    extractedEndPoint[dir] = chartObstacles[endObstacleIx][useMax ? dir + 'Max' : dir + 'Min'] + (useMax ? 1 : -1);
                    endSegments.push({
                        end: end,
                        start: extractedEndPoint
                    });
                    end = extractedEndPoint;
                }
                // Find the path
                segments = clearPathTo(start, end, dirIsX);
                // Add the end-point segments
                segments = segments.concat(endSegments.reverse());
                return {
                    path: pathFromSegments(segments),
                    obstacles: segments
                };
            }, {
                requiresObstacles: true
            })
        };

        return algorithms;
    });
    _registerModule(_modules, 'parts-gantt/ArrowSymbols.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2017 Highsoft AS
         *  Authors: Lars A. V. Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * Creates an arrow symbol. Like a triangle, except not filled.
         * ```
         *                   o
         *             o
         *       o
         * o
         *       o
         *             o
         *                   o
         * ```
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the arrow
         *
         * @param {number} y
         *        y position of the arrow
         *
         * @param {number} w
         *        width of the arrow
         *
         * @param {number} h
         *        height of the arrow
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols.arrow = function (x, y, w, h) {
            return [
                'M', x, y + h / 2,
                'L', x + w, y,
                'L', x, y + h / 2,
                'L', x + w, y + h
            ];
        };
        /**
         * Creates a half-width arrow symbol. Like a triangle, except not filled.
         * ```
         *       o
         *    o
         * o
         *    o
         *       o
         * ```
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the arrow
         *
         * @param {number} y
         *        y position of the arrow
         *
         * @param {number} w
         *        width of the arrow
         *
         * @param {number} h
         *        height of the arrow
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols['arrow-half'] = function (x, y, w, h) {
            return H.SVGRenderer.prototype.symbols.arrow(x, y, w / 2, h);
        };
        /**
         * Creates a left-oriented triangle.
         * ```
         *             o
         *       ooooooo
         * ooooooooooooo
         *       ooooooo
         *             o
         * ```
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the triangle
         *
         * @param {number} y
         *        y position of the triangle
         *
         * @param {number} w
         *        width of the triangle
         *
         * @param {number} h
         *        height of the triangle
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols['triangle-left'] = function (x, y, w, h) {
            return [
                'M', x + w, y,
                'L', x, y + h / 2,
                'L', x + w, y + h,
                'Z'
            ];
        };
        /**
         * Alias function for triangle-left.
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the arrow
         *
         * @param {number} y
         *        y position of the arrow
         *
         * @param {number} w
         *        width of the arrow
         *
         * @param {number} h
         *        height of the arrow
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols['arrow-filled'] =
            H.SVGRenderer.prototype.symbols['triangle-left'];
        /**
         * Creates a half-width, left-oriented triangle.
         * ```
         *       o
         *    oooo
         * ooooooo
         *    oooo
         *       o
         * ```
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the triangle
         *
         * @param {number} y
         *        y position of the triangle
         *
         * @param {number} w
         *        width of the triangle
         *
         * @param {number} h
         *        height of the triangle
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols['triangle-left-half'] = function (x, y, w, h) {
            return H.SVGRenderer.prototype.symbols['triangle-left'](x, y, w / 2, h);
        };
        /**
         * Alias function for triangle-left-half.
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the arrow
         *
         * @param {number} y
         *        y position of the arrow
         *
         * @param {number} w
         *        width of the arrow
         *
         * @param {number} h
         *        height of the arrow
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols['arrow-filled-half'] =
            H.SVGRenderer.prototype.symbols['triangle-left-half'];

    });
    _registerModule(_modules, 'parts-gantt/Pathfinder.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['parts-gantt/PathfinderAlgorithms.js']], function (H, U, pathfinderAlgorithms) {
        /* *
         *
         *  (c) 2016 Highsoft AS
         *  Authors: Øystein Moseng, Lars A. V. Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * The default pathfinder algorithm to use for a chart. It is possible to define
         * your own algorithms by adding them to the
         * `Highcharts.Pathfinder.prototype.algorithms`
         * object before the chart has been created.
         *
         * The default algorithms are as follows:
         *
         * `straight`:      Draws a straight line between the connecting
         *                  points. Does not avoid other points when drawing.
         *
         * `simpleConnect`: Finds a path between the points using right angles
         *                  only. Takes only starting/ending points into
         *                  account, and will not avoid other points.
         *
         * `fastAvoid`:     Finds a path between the points using right angles
         *                  only. Will attempt to avoid other points, but its
         *                  focus is performance over accuracy. Works well with
         *                  less dense datasets.
         *
         * @typedef {"fastAvoid"|"simpleConnect"|"straight"|string} Highcharts.PathfinderTypeValue
         */
        var defined = U.defined, objectEach = U.objectEach, splat = U.splat;
        var deg2rad = H.deg2rad, extend = H.extend, addEvent = H.addEvent, merge = H.merge, pick = H.pick, max = Math.max, min = Math.min;
        /*
         @todo:
             - Document how to write your own algorithms
             - Consider adding a Point.pathTo method that wraps creating a connection
               and rendering it
        */
        // Set default Pathfinder options
        extend(H.defaultOptions, {
            /**
             * The Pathfinder module allows you to define connections between any two
             * points, represented as lines - optionally with markers for the start
             * and/or end points. Multiple algorithms are available for calculating how
             * the connecting lines are drawn.
             *
             * Connector functionality requires Highcharts Gantt to be loaded. In Gantt
             * charts, the connectors are used to draw dependencies between tasks.
             *
             * @see [dependency](series.gantt.data.dependency)
             *
             * @sample gantt/pathfinder/demo
             *         Pathfinder connections
             *
             * @product      gantt
             * @optionparent connectors
             */
            connectors: {
                /**
                 * Enable connectors for this chart. Requires Highcharts Gantt.
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since     6.2.0
                 * @apioption connectors.enabled
                 */
                /**
                 * Set the default dash style for this chart's connecting lines.
                 *
                 * @type      {string}
                 * @default   solid
                 * @since     6.2.0
                 * @apioption connectors.dashStyle
                 */
                /**
                 * Set the default color for this chart's Pathfinder connecting lines.
                 * Defaults to the color of the point being connected.
                 *
                 * @type      {Highcharts.ColorString}
                 * @since     6.2.0
                 * @apioption connectors.lineColor
                 */
                /**
                 * Set the default pathfinder margin to use, in pixels. Some Pathfinder
                 * algorithms attempt to avoid obstacles, such as other points in the
                 * chart. These algorithms use this margin to determine how close lines
                 * can be to an obstacle. The default is to compute this automatically
                 * from the size of the obstacles in the chart.
                 *
                 * To draw connecting lines close to existing points, set this to a low
                 * number. For more space around existing points, set this number
                 * higher.
                 *
                 * @sample gantt/pathfinder/algorithm-margin
                 *         Small algorithmMargin
                 *
                 * @type      {number}
                 * @since     6.2.0
                 * @apioption connectors.algorithmMargin
                 */
                /**
                 * Set the default pathfinder algorithm to use for this chart. It is
                 * possible to define your own algorithms by adding them to the
                 * Highcharts.Pathfinder.prototype.algorithms object before the chart
                 * has been created.
                 *
                 * The default algorithms are as follows:
                 *
                 * `straight`:      Draws a straight line between the connecting
                 *                  points. Does not avoid other points when drawing.
                 *
                 * `simpleConnect`: Finds a path between the points using right angles
                 *                  only. Takes only starting/ending points into
                 *                  account, and will not avoid other points.
                 *
                 * `fastAvoid`:     Finds a path between the points using right angles
                 *                  only. Will attempt to avoid other points, but its
                 *                  focus is performance over accuracy. Works well with
                 *                  less dense datasets.
                 *
                 * Default value: `straight` is used as default for most series types,
                 * while `simpleConnect` is used as default for Gantt series, to show
                 * dependencies between points.
                 *
                 * @sample gantt/pathfinder/demo
                 *         Different types used
                 *
                 * @type    {Highcharts.PathfinderTypeValue}
                 * @default undefined
                 * @since   6.2.0
                 */
                type: 'straight',
                /**
                 * Set the default pixel width for this chart's Pathfinder connecting
                 * lines.
                 *
                 * @since 6.2.0
                 */
                lineWidth: 1,
                /**
                 * Marker options for this chart's Pathfinder connectors. Note that
                 * this option is overridden by the `startMarker` and `endMarker`
                 * options.
                 *
                 * @since 6.2.0
                 */
                marker: {
                    /**
                     * Set the radius of the connector markers. The default is
                     * automatically computed based on the algorithmMargin setting.
                     *
                     * Setting marker.width and marker.height will override this
                     * setting.
                     *
                     * @type      {number}
                     * @since     6.2.0
                     * @apioption connectors.marker.radius
                     */
                    /**
                     * Set the width of the connector markers. If not supplied, this
                     * is inferred from the marker radius.
                     *
                     * @type      {number}
                     * @since     6.2.0
                     * @apioption connectors.marker.width
                     */
                    /**
                     * Set the height of the connector markers. If not supplied, this
                     * is inferred from the marker radius.
                     *
                     * @type      {number}
                     * @since     6.2.0
                     * @apioption connectors.marker.height
                     */
                    /**
                     * Set the color of the connector markers. By default this is the
                     * same as the connector color.
                     *
                     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since     6.2.0
                     * @apioption connectors.marker.color
                     */
                    /**
                     * Set the line/border color of the connector markers. By default
                     * this is the same as the marker color.
                     *
                     * @type      {Highcharts.ColorString}
                     * @since     6.2.0
                     * @apioption connectors.marker.lineColor
                     */
                    /**
                     * Enable markers for the connectors.
                     */
                    enabled: false,
                    /**
                     * Horizontal alignment of the markers relative to the points.
                     *
                     * @type {Highcharts.AlignValue}
                     */
                    align: 'center',
                    /**
                     * Vertical alignment of the markers relative to the points.
                     *
                     * @type {Highcharts.VerticalAlignValue}
                     */
                    verticalAlign: 'middle',
                    /**
                     * Whether or not to draw the markers inside the points.
                     */
                    inside: false,
                    /**
                     * Set the line/border width of the pathfinder markers.
                     */
                    lineWidth: 1
                },
                /**
                 * Marker options specific to the start markers for this chart's
                 * Pathfinder connectors. Overrides the generic marker options.
                 *
                 * @extends connectors.marker
                 * @since   6.2.0
                 */
                startMarker: {
                    /**
                     * Set the symbol of the connector start markers.
                     */
                    symbol: 'diamond'
                },
                /**
                 * Marker options specific to the end markers for this chart's
                 * Pathfinder connectors. Overrides the generic marker options.
                 *
                 * @extends connectors.marker
                 * @since   6.2.0
                 */
                endMarker: {
                    /**
                     * Set the symbol of the connector end markers.
                     */
                    symbol: 'arrow-filled'
                }
            }
        });
        /**
         * Override Pathfinder connector options for a series. Requires Highcharts Gantt
         * to be loaded.
         *
         * @extends   connectors
         * @since     6.2.0
         * @excluding enabled, algorithmMargin
         * @product   gantt
         * @apioption plotOptions.series.connectors
         */
        /**
         * Connect to a point. Requires Highcharts Gantt to be loaded. This option can
         * be either a string, referring to the ID of another point, or an object, or an
         * array of either. If the option is an array, each element defines a
         * connection.
         *
         * @sample gantt/pathfinder/demo
         *         Different connection types
         *
         * @type      {string|Array<string|*>|*}
         * @extends   plotOptions.series.connectors
         * @since     6.2.0
         * @excluding enabled
         * @product   gantt
         * @apioption series.xrange.data.connect
         */
        /**
         * The ID of the point to connect to.
         *
         * @type      {string}
         * @since     6.2.0
         * @product   gantt
         * @apioption series.xrange.data.connect.to
         */
        /**
         * Get point bounding box using plotX/plotY and shapeArgs. If using
         * graphic.getBBox() directly, the bbox will be affected by animation.
         *
         * @private
         * @function
         *
         * @param {Highcharts.Point} point
         *        The point to get BB of.
         *
         * @return {Highcharts.Dictionary<number>|null}
         *         Result xMax, xMin, yMax, yMin.
         */
        function getPointBB(point) {
            var shapeArgs = point.shapeArgs, bb;
            // Prefer using shapeArgs (columns)
            if (shapeArgs) {
                return {
                    xMin: shapeArgs.x,
                    xMax: shapeArgs.x + shapeArgs.width,
                    yMin: shapeArgs.y,
                    yMax: shapeArgs.y + shapeArgs.height
                };
            }
            // Otherwise use plotX/plotY and bb
            bb = point.graphic && point.graphic.getBBox();
            return bb ? {
                xMin: point.plotX - bb.width / 2,
                xMax: point.plotX + bb.width / 2,
                yMin: point.plotY - bb.height / 2,
                yMax: point.plotY + bb.height / 2
            } : null;
        }
        /**
         * Calculate margin to place around obstacles for the pathfinder in pixels.
         * Returns a minimum of 1 pixel margin.
         *
         * @private
         * @function
         *
         * @param {Array<object>} obstacles
         *        Obstacles to calculate margin from.
         *
         * @return {number}
         *         The calculated margin in pixels. At least 1.
         */
        function calculateObstacleMargin(obstacles) {
            var len = obstacles.length, i = 0, j, obstacleDistance, distances = [], 
            // Compute smallest distance between two rectangles
            distance = function (a, b, bbMargin) {
                // Count the distance even if we are slightly off
                var margin = pick(bbMargin, 10), yOverlap = a.yMax + margin > b.yMin - margin &&
                    a.yMin - margin < b.yMax + margin, xOverlap = a.xMax + margin > b.xMin - margin &&
                    a.xMin - margin < b.xMax + margin, xDistance = yOverlap ? (a.xMin > b.xMax ? a.xMin - b.xMax : b.xMin - a.xMax) : Infinity, yDistance = xOverlap ? (a.yMin > b.yMax ? a.yMin - b.yMax : b.yMin - a.yMax) : Infinity;
                // If the rectangles collide, try recomputing with smaller margin.
                // If they collide anyway, discard the obstacle.
                if (xOverlap && yOverlap) {
                    return (margin ?
                        distance(a, b, Math.floor(margin / 2)) :
                        Infinity);
                }
                return min(xDistance, yDistance);
            };
            // Go over all obstacles and compare them to the others.
            for (; i < len; ++i) {
                // Compare to all obstacles ahead. We will already have compared this
                // obstacle to the ones before.
                for (j = i + 1; j < len; ++j) {
                    obstacleDistance = distance(obstacles[i], obstacles[j]);
                    // TODO: Magic number 80
                    if (obstacleDistance < 80) { // Ignore large distances
                        distances.push(obstacleDistance);
                    }
                }
            }
            // Ensure we always have at least one value, even in very spaceous charts
            distances.push(80);
            return max(Math.floor(distances.sort(function (a, b) {
                return (a - b);
            })[
            // Discard first 10% of the relevant distances, and then grab
            // the smallest one.
            Math.floor(distances.length / 10)] / 2 - 1 // Divide the distance by 2 and subtract 1.
            ), 1 // 1 is the minimum margin
            );
        }
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The Connection class. Used internally to represent a connection between two
         * points.
         *
         * @private
         * @class
         * @name Highcharts.Connection
         *
         * @param {Highcharts.Point} from
         *        Connection runs from this Point.
         *
         * @param {Highcharts.Point} to
         *        Connection runs to this Point.
         *
         * @param {Highcharts.ConnectorsOptions} [options]
         *        Connection options.
         */
        function Connection(from, to, options) {
            this.init(from, to, options);
        }
        Connection.prototype = {
            /**
             * Initialize the Connection object. Used as constructor only.
             *
             * @function Highcharts.Connection#init
             *
             * @param {Highcharts.Point} from
             *        Connection runs from this Point.
             *
             * @param {Highcharts.Point} to
             *        Connection runs to this Point.
             *
             * @param {Highcharts.ConnectorsOptions} [options]
             *        Connection options.
             */
            init: function (from, to, options) {
                this.fromPoint = from;
                this.toPoint = to;
                this.options = options;
                this.chart = from.series.chart;
                this.pathfinder = this.chart.pathfinder;
            },
            /**
             * Add (or update) this connection's path on chart. Stores reference to the
             * created element on this.graphics.path.
             *
             * @function Highcharts.Connection#renderPath
             *
             * @param {Highcharts.SVGPathArray} path
             *        Path to render, in array format. E.g. ['M', 0, 0, 'L', 10, 10]
             *
             * @param {Highcharts.SVGAttributes} [attribs]
             *        SVG attributes for the path.
             *
             * @param {Highcharts.AnimationOptionsObject} [animation]
             *        Animation options for the rendering.
             */
            renderPath: function (path, attribs, animation) {
                var connection = this, chart = this.chart, styledMode = chart.styledMode, pathfinder = chart.pathfinder, animate = !chart.options.chart.forExport && animation !== false, pathGraphic = connection.graphics && connection.graphics.path, anim;
                // Add the SVG element of the pathfinder group if it doesn't exist
                if (!pathfinder.group) {
                    pathfinder.group = chart.renderer.g()
                        .addClass('highcharts-pathfinder-group')
                        .attr({ zIndex: -1 })
                        .add(chart.seriesGroup);
                }
                // Shift the group to compensate for plot area.
                // Note: Do this always (even when redrawing a path) to avoid issues
                // when updating chart in a way that changes plot metrics.
                pathfinder.group.translate(chart.plotLeft, chart.plotTop);
                // Create path if does not exist
                if (!(pathGraphic && pathGraphic.renderer)) {
                    pathGraphic = chart.renderer.path()
                        .add(pathfinder.group);
                    if (!styledMode) {
                        pathGraphic.attr({
                            opacity: 0
                        });
                    }
                }
                // Set path attribs and animate to the new path
                pathGraphic.attr(attribs);
                anim = { d: path };
                if (!styledMode) {
                    anim.opacity = 1;
                }
                pathGraphic[animate ? 'animate' : 'attr'](anim, animation);
                // Store reference on connection
                this.graphics = this.graphics || {};
                this.graphics.path = pathGraphic;
            },
            /**
             * Calculate and add marker graphics for connection to the chart. The
             * created/updated elements are stored on this.graphics.start and
             * this.graphics.end.
             *
             * @function Highcharts.Connection#addMarker
             *
             * @param {string} type
             *        Marker type, either 'start' or 'end'.
             *
             * @param {Highcharts.ConnectorsMarkerOptions} options
             *        All options for this marker. Not calculated or merged with other
             *        options.
             *
             * @param {Highcharts.SVGPathArray} path
             *        Connection path in array format. This is used to calculate the
             *        rotation angle of the markers.
             */
            addMarker: function (type, options, path) {
                var connection = this, chart = connection.fromPoint.series.chart, pathfinder = chart.pathfinder, renderer = chart.renderer, point = (type === 'start' ?
                    connection.fromPoint :
                    connection.toPoint), anchor = point.getPathfinderAnchorPoint(options), markerVector, radians, rotation, box, width, height, pathVector;
                if (!options.enabled) {
                    return;
                }
                // Last vector before start/end of path, used to get angle
                if (type === 'start') {
                    pathVector = {
                        x: path[4],
                        y: path[5]
                    };
                }
                else { // 'end'
                    pathVector = {
                        x: path[path.length - 5],
                        y: path[path.length - 4]
                    };
                }
                // Get angle between pathVector and anchor point and use it to create
                // marker position.
                radians = point.getRadiansToVector(pathVector, anchor);
                markerVector = point.getMarkerVector(radians, options.radius, anchor);
                // Rotation of marker is calculated from angle between pathVector and
                // markerVector.
                // (Note:
                //  Used to recalculate radians between markerVector and pathVector,
                //  but this should be the same as between pathVector and anchor.)
                rotation = -radians / deg2rad;
                if (options.width && options.height) {
                    width = options.width;
                    height = options.height;
                }
                else {
                    width = height = options.radius * 2;
                }
                // Add graphics object if it does not exist
                connection.graphics = connection.graphics || {};
                box = {
                    x: markerVector.x - (width / 2),
                    y: markerVector.y - (height / 2),
                    width: width,
                    height: height,
                    rotation: rotation,
                    rotationOriginX: markerVector.x,
                    rotationOriginY: markerVector.y
                };
                if (!connection.graphics[type]) {
                    // Create new marker element
                    connection.graphics[type] = renderer
                        .symbol(options.symbol)
                        .addClass('highcharts-point-connecting-path-' + type + '-marker')
                        .attr(box)
                        .add(pathfinder.group);
                    if (!renderer.styledMode) {
                        connection.graphics[type].attr({
                            fill: options.color || connection.fromPoint.color,
                            stroke: options.lineColor,
                            'stroke-width': options.lineWidth,
                            opacity: 0
                        })
                            .animate({
                            opacity: 1
                        }, point.series.options.animation);
                    }
                }
                else {
                    connection.graphics[type].animate(box);
                }
            },
            /**
             * Calculate and return connection path.
             * Note: Recalculates chart obstacles on demand if they aren't calculated.
             *
             * @function Highcharts.Connection#getPath
             *
             * @param {Highcharts.ConnectorsOptions} options
             *        Connector options. Not calculated or merged with other options.
             *
             * @return {object|undefined}
             *         Calculated SVG path data in array format.
             */
            getPath: function (options) {
                var pathfinder = this.pathfinder, chart = this.chart, algorithm = pathfinder.algorithms[options.type], chartObstacles = pathfinder.chartObstacles;
                if (typeof algorithm !== 'function') {
                    H.error('"' + options.type + '" is not a Pathfinder algorithm.');
                    return;
                }
                // This function calculates obstacles on demand if they don't exist
                if (algorithm.requiresObstacles && !chartObstacles) {
                    chartObstacles =
                        pathfinder.chartObstacles =
                            pathfinder.getChartObstacles(options);
                    // If the algorithmMargin was computed, store the result in default
                    // options.
                    chart.options.connectors.algorithmMargin =
                        options.algorithmMargin;
                    // Cache some metrics too
                    pathfinder.chartObstacleMetrics =
                        pathfinder.getObstacleMetrics(chartObstacles);
                }
                // Get the SVG path
                return algorithm(
                // From
                this.fromPoint.getPathfinderAnchorPoint(options.startMarker), 
                // To
                this.toPoint.getPathfinderAnchorPoint(options.endMarker), merge({
                    chartObstacles: chartObstacles,
                    lineObstacles: pathfinder.lineObstacles || [],
                    obstacleMetrics: pathfinder.chartObstacleMetrics,
                    hardBounds: {
                        xMin: 0,
                        xMax: chart.plotWidth,
                        yMin: 0,
                        yMax: chart.plotHeight
                    },
                    obstacleOptions: {
                        margin: options.algorithmMargin
                    },
                    startDirectionX: pathfinder.getAlgorithmStartDirection(options.startMarker)
                }, options));
            },
            /**
             * (re)Calculate and (re)draw the connection.
             *
             * @function Highcharts.Connection#render
             */
            render: function () {
                var connection = this, fromPoint = connection.fromPoint, series = fromPoint.series, chart = series.chart, pathfinder = chart.pathfinder, pathResult, path, options = merge(chart.options.connectors, series.options.connectors, fromPoint.options.connectors, connection.options), attribs = {};
                // Set path attribs
                if (!chart.styledMode) {
                    attribs.stroke = options.lineColor || fromPoint.color;
                    attribs['stroke-width'] = options.lineWidth;
                    if (options.dashStyle) {
                        attribs.dashstyle = options.dashStyle;
                    }
                }
                attribs['class'] = // eslint-disable-line dot-notation
                    'highcharts-point-connecting-path ' +
                        'highcharts-color-' + fromPoint.colorIndex;
                options = merge(attribs, options);
                // Set common marker options
                if (!defined(options.marker.radius)) {
                    options.marker.radius = min(max(Math.ceil((options.algorithmMargin || 8) / 2) - 1, 1), 5);
                }
                // Get the path
                pathResult = connection.getPath(options);
                path = pathResult.path;
                // Always update obstacle storage with obstacles from this path.
                // We don't know if future calls will need this for their algorithm.
                if (pathResult.obstacles) {
                    pathfinder.lineObstacles =
                        pathfinder.lineObstacles || [];
                    pathfinder.lineObstacles =
                        pathfinder.lineObstacles.concat(pathResult.obstacles);
                }
                // Add the calculated path to the pathfinder group
                connection.renderPath(path, attribs, series.options.animation);
                // Render the markers
                connection.addMarker('start', merge(options.marker, options.startMarker), path);
                connection.addMarker('end', merge(options.marker, options.endMarker), path);
            },
            /**
             * Destroy connection by destroying the added graphics elements.
             *
             * @function Highcharts.Connection#destroy
             */
            destroy: function () {
                if (this.graphics) {
                    objectEach(this.graphics, function (val) {
                        val.destroy();
                    });
                    delete this.graphics;
                }
            }
        };
        /**
         * The Pathfinder class.
         *
         * @private
         * @class
         * @name Highcharts.Pathfinder
         *
         * @param {Highcharts.Chart} chart
         *        The chart to operate on.
         */
        function Pathfinder(chart) {
            this.init(chart);
        }
        Pathfinder.prototype = {
            /**
             * @name Highcharts.Pathfinder#algorithms
             * @type {Highcharts.Dictionary<Function>}
             */
            algorithms: pathfinderAlgorithms,
            /**
             * Initialize the Pathfinder object.
             *
             * @function Highcharts.Pathfinder#init
             *
             * @param {Highcharts.Chart} chart
             *        The chart context.
             */
            init: function (chart) {
                // Initialize pathfinder with chart context
                this.chart = chart;
                // Init connection reference list
                this.connections = [];
                // Recalculate paths/obstacles on chart redraw
                addEvent(chart, 'redraw', function () {
                    this.pathfinder.update();
                });
            },
            /**
             * Update Pathfinder connections from scratch.
             *
             * @function Highcharts.Pathfinder#update
             *
             * @param {boolean} [deferRender]
             *        Whether or not to defer rendering of connections until
             *        series.afterAnimate event has fired. Used on first render.
             */
            update: function (deferRender) {
                var chart = this.chart, pathfinder = this, oldConnections = pathfinder.connections;
                // Rebuild pathfinder connections from options
                pathfinder.connections = [];
                chart.series.forEach(function (series) {
                    if (series.visible && !series.options.isInternal) {
                        series.points.forEach(function (point) {
                            var to, connects = (point.options &&
                                point.options.connect &&
                                splat(point.options.connect));
                            if (point.visible && point.isInside !== false && connects) {
                                connects.forEach(function (connect) {
                                    to = chart.get(typeof connect === 'string' ?
                                        connect : connect.to);
                                    if (to instanceof H.Point &&
                                        to.series.visible &&
                                        to.visible &&
                                        to.isInside !== false) {
                                        // Add new connection
                                        pathfinder.connections.push(new Connection(point, // from
                                        to, typeof connect === 'string' ?
                                            {} :
                                            connect));
                                    }
                                });
                            }
                        });
                    }
                });
                // Clear connections that should not be updated, and move old info over
                // to new connections.
                for (var j = 0, k, found, lenOld = oldConnections.length, lenNew = pathfinder.connections.length; j < lenOld; ++j) {
                    found = false;
                    for (k = 0; k < lenNew; ++k) {
                        if (oldConnections[j].fromPoint ===
                            pathfinder.connections[k].fromPoint &&
                            oldConnections[j].toPoint ===
                                pathfinder.connections[k].toPoint) {
                            pathfinder.connections[k].graphics =
                                oldConnections[j].graphics;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        oldConnections[j].destroy();
                    }
                }
                // Clear obstacles to force recalculation. This must be done on every
                // redraw in case positions have changed. Recalculation is handled in
                // Connection.getPath on demand.
                delete this.chartObstacles;
                delete this.lineObstacles;
                // Draw the pending connections
                pathfinder.renderConnections(deferRender);
            },
            /**
             * Draw the chart's connecting paths.
             *
             * @function Highcharts.Pathfinder#renderConnections
             *
             * @param {boolean} [deferRender]
             *        Whether or not to defer render until series animation is finished.
             *        Used on first render.
             */
            renderConnections: function (deferRender) {
                if (deferRender) {
                    // Render after series are done animating
                    this.chart.series.forEach(function (series) {
                        var render = function () {
                            // Find pathfinder connections belonging to this series
                            // that haven't rendered, and render them now.
                            var pathfinder = series.chart.pathfinder, conns = pathfinder && pathfinder.connections || [];
                            conns.forEach(function (connection) {
                                if (connection.fromPoint &&
                                    connection.fromPoint.series === series) {
                                    connection.render();
                                }
                            });
                            if (series.pathfinderRemoveRenderEvent) {
                                series.pathfinderRemoveRenderEvent();
                                delete series.pathfinderRemoveRenderEvent;
                            }
                        };
                        if (series.options.animation === false) {
                            render();
                        }
                        else {
                            series.pathfinderRemoveRenderEvent = addEvent(series, 'afterAnimate', render);
                        }
                    });
                }
                else {
                    // Go through connections and render them
                    this.connections.forEach(function (connection) {
                        connection.render();
                    });
                }
            },
            /**
             * Get obstacles for the points in the chart. Does not include connecting
             * lines from Pathfinder. Applies algorithmMargin to the obstacles.
             *
             * @function Highcharts.Pathfinder#getChartObstacles
             *
             * @param {object} options
             *        Options for the calculation. Currenlty only
             *        options.algorithmMargin.
             *
             * @return {Array<object>}
             *         An array of calculated obstacles. Each obstacle is defined as an
             *         object with xMin, xMax, yMin and yMax properties.
             */
            getChartObstacles: function (options) {
                var obstacles = [], series = this.chart.series, margin = pick(options.algorithmMargin, 0), calculatedMargin;
                for (var i = 0, sLen = series.length; i < sLen; ++i) {
                    if (series[i].visible && !series[i].options.isInternal) {
                        for (var j = 0, pLen = series[i].points.length, bb, point; j < pLen; ++j) {
                            point = series[i].points[j];
                            if (point.visible) {
                                bb = getPointBB(point);
                                if (bb) {
                                    obstacles.push({
                                        xMin: bb.xMin - margin,
                                        xMax: bb.xMax + margin,
                                        yMin: bb.yMin - margin,
                                        yMax: bb.yMax + margin
                                    });
                                }
                            }
                        }
                    }
                }
                // Sort obstacles by xMin for optimization
                obstacles = obstacles.sort(function (a, b) {
                    return a.xMin - b.xMin;
                });
                // Add auto-calculated margin if the option is not defined
                if (!defined(options.algorithmMargin)) {
                    calculatedMargin =
                        options.algorithmMargin =
                            calculateObstacleMargin(obstacles);
                    obstacles.forEach(function (obstacle) {
                        obstacle.xMin -= calculatedMargin;
                        obstacle.xMax += calculatedMargin;
                        obstacle.yMin -= calculatedMargin;
                        obstacle.yMax += calculatedMargin;
                    });
                }
                return obstacles;
            },
            /**
             * Utility function to get metrics for obstacles:
             * - Widest obstacle width
             * - Tallest obstacle height
             *
             * @function Highcharts.Pathfinder#getObstacleMetrics
             *
             * @param {Array<object>} obstacles
             *        An array of obstacles to inspect.
             *
             * @return {object}
             *         The calculated metrics, as an object with maxHeight and maxWidth
             *         properties.
             */
            getObstacleMetrics: function (obstacles) {
                var maxWidth = 0, maxHeight = 0, width, height, i = obstacles.length;
                while (i--) {
                    width = obstacles[i].xMax - obstacles[i].xMin;
                    height = obstacles[i].yMax - obstacles[i].yMin;
                    if (maxWidth < width) {
                        maxWidth = width;
                    }
                    if (maxHeight < height) {
                        maxHeight = height;
                    }
                }
                return {
                    maxHeight: maxHeight,
                    maxWidth: maxWidth
                };
            },
            /**
             * Utility to get which direction to start the pathfinding algorithm
             * (X vs Y), calculated from a set of marker options.
             *
             * @function Highcharts.Pathfinder#getAlgorithmStartDirection
             *
             * @param {Highcharts.ConnectorsMarkerOptions} markerOptions
             *        Marker options to calculate from.
             *
             * @return {boolean}
             *         Returns true for X, false for Y, and undefined for autocalculate.
             */
            getAlgorithmStartDirection: function (markerOptions) {
                var xCenter = markerOptions.align !== 'left' &&
                    markerOptions.align !== 'right', yCenter = markerOptions.verticalAlign !== 'top' &&
                    markerOptions.verticalAlign !== 'bottom', undef;
                return xCenter ?
                    (yCenter ? undef : false) : // x is centered
                    (yCenter ? true : undef); // x is off-center
            }
        };
        // Add to Highcharts namespace
        H.Connection = Connection;
        H.Pathfinder = Pathfinder;
        // Add pathfinding capabilities to Points
        extend(H.Point.prototype, /** @lends Point.prototype */ {
            /**
             * Get coordinates of anchor point for pathfinder connection.
             *
             * @private
             * @function Highcharts.Point#getPathfinderAnchorPoint
             *
             * @param {Highcharts.ConnectorsMarkerOptions} markerOptions
             *        Connection options for position on point.
             *
             * @return {Highcharts.PositionObject}
             *         An object with x/y properties for the position. Coordinates are
             *         in plot values, not relative to point.
             */
            getPathfinderAnchorPoint: function (markerOptions) {
                var bb = getPointBB(this), x, y;
                switch (markerOptions.align) { // eslint-disable-line default-case
                    case 'right':
                        x = 'xMax';
                        break;
                    case 'left':
                        x = 'xMin';
                }
                switch (markerOptions.verticalAlign) { // eslint-disable-line default-case
                    case 'top':
                        y = 'yMin';
                        break;
                    case 'bottom':
                        y = 'yMax';
                }
                return {
                    x: x ? bb[x] : (bb.xMin + bb.xMax) / 2,
                    y: y ? bb[y] : (bb.yMin + bb.yMax) / 2
                };
            },
            /**
             * Utility to get the angle from one point to another.
             *
             * @private
             * @function Highcharts.Point#getRadiansToVector
             *
             * @param {Highcharts.PositionObject} v1
             *        The first vector, as an object with x/y properties.
             *
             * @param {Highcharts.PositionObject} v2
             *        The second vector, as an object with x/y properties.
             *
             * @return {number}
             *         The angle in degrees
             */
            getRadiansToVector: function (v1, v2) {
                var box;
                if (!defined(v2)) {
                    box = getPointBB(this);
                    v2 = {
                        x: (box.xMin + box.xMax) / 2,
                        y: (box.yMin + box.yMax) / 2
                    };
                }
                return Math.atan2(v2.y - v1.y, v1.x - v2.x);
            },
            /**
             * Utility to get the position of the marker, based on the path angle and
             * the marker's radius.
             *
             * @private
             * @function Highcharts.Point#getMarkerVector
             *
             * @param {number} radians
             *        The angle in radians from the point center to another vector.
             *
             * @param {number} markerRadius
             *        The radius of the marker, to calculate the additional distance to
             *        the center of the marker.
             *
             * @param {object} anchor
             *        The anchor point of the path and marker as an object with x/y
             *        properties.
             *
             * @return {object}
             *         The marker vector as an object with x/y properties.
             */
            getMarkerVector: function (radians, markerRadius, anchor) {
                var twoPI = Math.PI * 2.0, theta = radians, bb = getPointBB(this), rectWidth = bb.xMax - bb.xMin, rectHeight = bb.yMax - bb.yMin, rAtan = Math.atan2(rectHeight, rectWidth), tanTheta = 1, leftOrRightRegion = false, rectHalfWidth = rectWidth / 2.0, rectHalfHeight = rectHeight / 2.0, rectHorizontalCenter = bb.xMin + rectHalfWidth, rectVerticalCenter = bb.yMin + rectHalfHeight, edgePoint = {
                    x: rectHorizontalCenter,
                    y: rectVerticalCenter
                }, markerPoint = {}, xFactor = 1, yFactor = 1;
                while (theta < -Math.PI) {
                    theta += twoPI;
                }
                while (theta > Math.PI) {
                    theta -= twoPI;
                }
                tanTheta = Math.tan(theta);
                if ((theta > -rAtan) && (theta <= rAtan)) {
                    // Right side
                    yFactor = -1;
                    leftOrRightRegion = true;
                }
                else if (theta > rAtan && theta <= (Math.PI - rAtan)) {
                    // Top side
                    yFactor = -1;
                }
                else if (theta > (Math.PI - rAtan) || theta <= -(Math.PI - rAtan)) {
                    // Left side
                    xFactor = -1;
                    leftOrRightRegion = true;
                }
                else {
                    // Bottom side
                    xFactor = -1;
                }
                // Correct the edgePoint according to the placement of the marker
                if (leftOrRightRegion) {
                    edgePoint.x += xFactor * (rectHalfWidth);
                    edgePoint.y += yFactor * (rectHalfWidth) * tanTheta;
                }
                else {
                    edgePoint.x += xFactor * (rectHeight / (2.0 * tanTheta));
                    edgePoint.y += yFactor * (rectHalfHeight);
                }
                if (anchor.x !== rectHorizontalCenter) {
                    edgePoint.x = anchor.x;
                }
                if (anchor.y !== rectVerticalCenter) {
                    edgePoint.y = anchor.y;
                }
                markerPoint.x = edgePoint.x + (markerRadius * Math.cos(theta));
                markerPoint.y = edgePoint.y - (markerRadius * Math.sin(theta));
                return markerPoint;
            }
        });
        /**
         * Warn if using legacy options. Copy the options over. Note that this will
         * still break if using the legacy options in chart.update, addSeries etc.
         * @private
         */
        function warnLegacy(chart) {
            if (chart.options.pathfinder ||
                chart.series.reduce(function (acc, series) {
                    if (series.options) {
                        merge(true, (series.options.connectors = series.options.connectors ||
                            {}), series.options.pathfinder);
                    }
                    return acc || series.options && series.options.pathfinder;
                }, false)) {
                merge(true, (chart.options.connectors = chart.options.connectors || {}), chart.options.pathfinder);
                H.error('WARNING: Pathfinder options have been renamed. ' +
                    'Use "chart.connectors" or "series.connectors" instead.');
            }
        }
        // Initialize Pathfinder for charts
        H.Chart.prototype.callbacks.push(function (chart) {
            var options = chart.options;
            if (options.connectors.enabled !== false) {
                warnLegacy(chart);
                this.pathfinder = new Pathfinder(this);
                this.pathfinder.update(true); // First draw, defer render
            }
        });

    });
    _registerModule(_modules, 'modules/xrange.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  X-range series module
         *
         *  (c) 2010-2019 Torstein Honsi, Lars A. V. Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         * @interface Highcharts.PointOptionsObject in parts/Point.ts
         */ /**
        * The ending X value of the range point.
        * @name Highcharts.PointOptionsObject#x2
        * @type {number|undefined}
        * @requires modules/xrange
        */
        var defined = U.defined, isNumber = U.isNumber, isObject = U.isObject;
        var addEvent = H.addEvent, color = H.color, columnType = H.seriesTypes.column, correctFloat = H.correctFloat, merge = H.merge, pick = H.pick, seriesType = H.seriesType, seriesTypes = H.seriesTypes, Axis = H.Axis, Point = H.Point, Series = H.Series;
        /**
         * Return color of a point based on its category.
         *
         * @private
         * @function getColorByCategory
         *
         * @param {object} series
         *        The series which the point belongs to.
         *
         * @param {object} point
         *        The point to calculate its color for.
         *
         * @return {object}
         *         Returns an object containing the properties color and colorIndex.
         */
        function getColorByCategory(series, point) {
            var colors = series.options.colors || series.chart.options.colors, colorCount = colors ?
                colors.length :
                series.chart.options.chart.colorCount, colorIndex = point.y % colorCount, color = colors && colors[colorIndex];
            return {
                colorIndex: colorIndex,
                color: color
            };
        }
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.xrange
         *
         * @augments Highcharts.Series
         */
        seriesType('xrange', 'column'
        /**
         * The X-range series displays ranges on the X axis, typically time
         * intervals with a start and end date.
         *
         * @sample {highcharts} highcharts/demo/x-range/
         *         X-range
         * @sample {highcharts} highcharts/css/x-range/
         *         Styled mode X-range
         * @sample {highcharts} highcharts/chart/inverted-xrange/
         *         Inverted X-range
         *
         * @extends      plotOptions.column
         * @since        6.0.0
         * @product      highcharts highstock gantt
         * @excluding    boostThreshold, crisp, cropThreshold, depth, edgeColor,
         *               edgeWidth, findNearestPointBy, getExtremesFromAll,
         *               negativeColor, pointInterval, pointIntervalUnit,
         *               pointPlacement, pointRange, pointStart, softThreshold,
         *               stacking, threshold, data
         * @optionparent plotOptions.xrange
         */
        , {
            /**
             * A partial fill for each point, typically used to visualize how much
             * of a task is performed. The partial fill object can be set either on
             * series or point level.
             *
             * @sample {highcharts} highcharts/demo/x-range
             *         X-range with partial fill
             *
             * @product   highcharts highstock gantt
             * @apioption plotOptions.xrange.partialFill
             */
            /**
             * The fill color to be used for partial fills. Defaults to a darker
             * shade of the point color.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @product   highcharts highstock gantt
             * @apioption plotOptions.xrange.partialFill.fill
             */
            /**
             * A partial fill for each point, typically used to visualize how much
             * of a task is performed. See [completed](series.gantt.data.completed).
             *
             * @sample gantt/demo/progress-indicator
             *         Gantt with progress indicator
             *
             * @product   gantt
             * @apioption plotOptions.gantt.partialFill
             */
            /**
             * In an X-range series, this option makes all points of the same Y-axis
             * category the same color.
             */
            colorByPoint: true,
            dataLabels: {
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                formatter: function () {
                    var point = this.point, amount = point.partialFill;
                    if (isObject(amount)) {
                        amount = amount.amount;
                    }
                    if (isNumber(amount) && amount > 0) {
                        return correctFloat(amount * 100) + '%';
                    }
                },
                /** @ignore-option */
                inside: true,
                /** @ignore-option */
                verticalAlign: 'middle'
            },
            tooltip: {
                headerFormat: '<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.yCategory}</b><br/>'
            },
            borderRadius: 3,
            pointRange: 0
        }, {
            type: 'xrange',
            parallelArrays: ['x', 'x2', 'y'],
            requireSorting: false,
            animate: seriesTypes.line.prototype.animate,
            cropShoulder: 1,
            getExtremesFromAll: true,
            autoIncrement: H.noop,
            buildKDTree: H.noop,
            /* eslint-disable valid-jsdoc */
            /**
             * Borrow the column series metrics, but with swapped axes. This gives
             * free access to features like groupPadding, grouping, pointWidth etc.
             *
             * @private
             * @function Highcharts.Series#getColumnMetrics
             *
             * @return {Highcharts.ColumnMetricsObject}
             */
            getColumnMetrics: function () {
                var metrics, chart = this.chart;
                /**
                 * @private
                 */
                function swapAxes() {
                    chart.series.forEach(function (s) {
                        var xAxis = s.xAxis;
                        s.xAxis = s.yAxis;
                        s.yAxis = xAxis;
                    });
                }
                swapAxes();
                metrics = columnType.prototype.getColumnMetrics.call(this);
                swapAxes();
                return metrics;
            },
            /**
             * Override cropData to show a point where x or x2 is outside visible
             * range, but one of them is inside.
             *
             * @private
             * @function Highcharts.Series#cropData
             *
             * @param {Array<number>} xData
             *
             * @param {Array<number>} yData
             *
             * @param {number} min
             *
             * @param {number} max
             *
             * @param {number} [cropShoulder]
             *
             * @return {*}
             */
            cropData: function (xData, yData, min, max) {
                // Replace xData with x2Data to find the appropriate cropStart
                var cropData = Series.prototype.cropData, crop = cropData.call(this, this.x2Data, yData, min, max);
                // Re-insert the cropped xData
                crop.xData = xData.slice(crop.start, crop.end);
                return crop;
            },
            /**
             * Finds the index of an existing point that matches the given point
             * options.
             *
             * @private
             * @function Highcharts.Series#findPointIndex
             * @param {object} options The options of the point.
             * @returns {number|undefined} Returns index of a matching point,
             * returns undefined if no match is found.
             */
            findPointIndex: function (options) {
                var series = this, 
                // Search in data, since broken-axis can remove points inside a
                // break.
                points = series.data, oldData = series.points, id = options.id, point, pointIndex;
                if (id) {
                    point = H.find(points, function (point) {
                        return point.id === id;
                    });
                    pointIndex = point ? point.index : undefined;
                }
                if (pointIndex === undefined) {
                    point = H.find(points, function (point) {
                        return (point.x === options.x &&
                            point.x2 === options.x2 &&
                            !(oldData[pointIndex] &&
                                oldData[pointIndex].touched));
                    });
                    pointIndex = point ? point.index : undefined;
                }
                // Reduce pointIndex if data is cropped
                if (series.cropped &&
                    pointIndex >= series.cropStart) {
                    pointIndex -= series.cropStart;
                }
                return pointIndex;
            },
            /**
             * @private
             * @function Highcharts.Series#translatePoint
             *
             * @param {Highcharts.Point} point
             */
            translatePoint: function (point) {
                var series = this, xAxis = series.xAxis, yAxis = series.yAxis, metrics = series.columnMetrics, options = series.options, minPointLength = options.minPointLength || 0, plotX = point.plotX, posX = pick(point.x2, point.x + (point.len || 0)), plotX2 = xAxis.translate(posX, 0, 0, 0, 1), length = Math.abs(plotX2 - plotX), widthDifference, shapeArgs, partialFill, inverted = this.chart.inverted, borderWidth = pick(options.borderWidth, 1), crisper = borderWidth % 2 / 2, yOffset = metrics.offset, pointHeight = Math.round(metrics.width), dlLeft, dlRight, dlWidth, clipRectWidth;
                if (minPointLength) {
                    widthDifference = minPointLength - length;
                    if (widthDifference < 0) {
                        widthDifference = 0;
                    }
                    plotX -= widthDifference / 2;
                    plotX2 += widthDifference / 2;
                }
                plotX = Math.max(plotX, -10);
                plotX2 = Math.min(Math.max(plotX2, -10), xAxis.len + 10);
                // Handle individual pointWidth
                if (defined(point.options.pointWidth)) {
                    yOffset -= ((Math.ceil(point.options.pointWidth) - pointHeight) / 2);
                    pointHeight = Math.ceil(point.options.pointWidth);
                }
                // Apply pointPlacement to the Y axis
                if (options.pointPlacement &&
                    isNumber(point.plotY) &&
                    yAxis.categories) {
                    point.plotY = yAxis.translate(point.y, 0, 1, 0, 1, options.pointPlacement);
                }
                point.shapeArgs = {
                    x: Math.floor(Math.min(plotX, plotX2)) + crisper,
                    y: Math.floor(point.plotY + yOffset) + crisper,
                    width: Math.round(Math.abs(plotX2 - plotX)),
                    height: pointHeight,
                    r: series.options.borderRadius
                };
                // Align data labels inside the shape and inside the plot area
                dlLeft = point.shapeArgs.x;
                dlRight = dlLeft + point.shapeArgs.width;
                if (dlLeft < 0 || dlRight > xAxis.len) {
                    dlLeft = Math.min(xAxis.len, Math.max(0, dlLeft));
                    dlRight = Math.max(0, Math.min(dlRight, xAxis.len));
                    dlWidth = dlRight - dlLeft;
                    point.dlBox = merge(point.shapeArgs, {
                        x: dlLeft,
                        width: dlRight - dlLeft,
                        centerX: dlWidth ? dlWidth / 2 : null
                    });
                }
                else {
                    point.dlBox = null;
                }
                // Tooltip position
                if (!inverted) {
                    point.tooltipPos[0] +=
                        length / 2 * (xAxis.reversed ? -1 : 1);
                    point.tooltipPos[1] -= metrics.width / 2;
                    // Limit position by the correct axis size (#9727)
                    point.tooltipPos[0] = Math.max(Math.min(point.tooltipPos[0], xAxis.len - 1), 0);
                    point.tooltipPos[1] = Math.max(Math.min(point.tooltipPos[1], yAxis.len - 1), 0);
                }
                else {
                    point.tooltipPos[1] +=
                        length / 2 * (xAxis.reversed ? 1 : -1);
                    point.tooltipPos[0] += metrics.width / 2;
                    // Limit position by the correct axis size (#9727)
                    point.tooltipPos[1] = Math.max(Math.min(point.tooltipPos[1], xAxis.len - 1), 0);
                    point.tooltipPos[0] = Math.max(Math.min(point.tooltipPos[0], yAxis.len - 1), 0);
                }
                // Add a partShapeArgs to the point, based on the shapeArgs property
                partialFill = point.partialFill;
                if (partialFill) {
                    // Get the partial fill amount
                    if (isObject(partialFill)) {
                        partialFill = partialFill.amount;
                    }
                    // If it was not a number, assume 0
                    if (!isNumber(partialFill)) {
                        partialFill = 0;
                    }
                    shapeArgs = point.shapeArgs;
                    point.partShapeArgs = {
                        x: shapeArgs.x,
                        y: shapeArgs.y,
                        width: shapeArgs.width,
                        height: shapeArgs.height,
                        r: series.options.borderRadius
                    };
                    clipRectWidth = Math.max(Math.round(length * partialFill + point.plotX -
                        plotX), 0);
                    point.clipRectArgs = {
                        x: xAxis.reversed ? // #10717
                            shapeArgs.x + length - clipRectWidth :
                            shapeArgs.x,
                        y: shapeArgs.y,
                        width: clipRectWidth,
                        height: shapeArgs.height
                    };
                }
            },
            /**
             * @private
             * @function Highcharts.Series#translate
             */
            translate: function () {
                columnType.prototype.translate.apply(this, arguments);
                this.points.forEach(function (point) {
                    this.translatePoint(point);
                }, this);
            },
            /**
             * Draws a single point in the series. Needed for partial fill.
             *
             * This override turns point.graphic into a group containing the
             * original graphic and an overlay displaying the partial fill.
             *
             * @private
             * @function Highcharts.Series#drawPoint
             *
             * @param {Highcharts.Point} point
             *        An instance of Point in the series.
             *
             * @param {"animate"|"attr"} verb
             *        'animate' (animates changes) or 'attr' (sets options)
             */
            drawPoint: function (point, verb) {
                var series = this, seriesOpts = series.options, renderer = series.chart.renderer, graphic = point.graphic, type = point.shapeType, shapeArgs = point.shapeArgs, partShapeArgs = point.partShapeArgs, clipRectArgs = point.clipRectArgs, pfOptions = point.partialFill, cutOff = seriesOpts.stacking && !seriesOpts.borderRadius, pointState = point.state, stateOpts = (seriesOpts.states[pointState || 'normal'] ||
                    {}), pointStateVerb = pointState === undefined ? 'attr' : verb, pointAttr = series.pointAttribs(point, pointState), animation = pick(series.chart.options.chart.animation, stateOpts.animation), fill;
                if (!point.isNull) {
                    // Original graphic
                    if (graphic) { // update
                        graphic.rect[verb](shapeArgs);
                    }
                    else {
                        point.graphic = graphic = renderer.g('point')
                            .addClass(point.getClassName())
                            .add(point.group || series.group);
                        graphic.rect = renderer[type](merge(shapeArgs))
                            .addClass(point.getClassName())
                            .addClass('highcharts-partfill-original')
                            .add(graphic);
                    }
                    // Partial fill graphic
                    if (partShapeArgs) {
                        if (graphic.partRect) {
                            graphic.partRect[verb](merge(partShapeArgs));
                            graphic.partialClipRect[verb](merge(clipRectArgs));
                        }
                        else {
                            graphic.partialClipRect = renderer.clipRect(clipRectArgs.x, clipRectArgs.y, clipRectArgs.width, clipRectArgs.height);
                            graphic.partRect =
                                renderer[type](partShapeArgs)
                                    .addClass('highcharts-partfill-overlay')
                                    .add(graphic)
                                    .clip(graphic.partialClipRect);
                        }
                    }
                    // Presentational
                    if (!series.chart.styledMode) {
                        graphic
                            .rect[verb](pointAttr, animation)
                            .shadow(seriesOpts.shadow, null, cutOff);
                        if (partShapeArgs) {
                            // Ensure pfOptions is an object
                            if (!isObject(pfOptions)) {
                                pfOptions = {};
                            }
                            if (isObject(seriesOpts.partialFill)) {
                                pfOptions = merge(pfOptions, seriesOpts.partialFill);
                            }
                            fill = (pfOptions.fill ||
                                color(pointAttr.fill).brighten(-0.3).get() ||
                                color(point.color || series.color)
                                    .brighten(-0.3).get());
                            pointAttr.fill = fill;
                            graphic
                                .partRect[pointStateVerb](pointAttr, animation)
                                .shadow(seriesOpts.shadow, null, cutOff);
                        }
                    }
                }
                else if (graphic) {
                    point.graphic = graphic.destroy(); // #1269
                }
            },
            /**
             * @private
             * @function Highcharts.Series#drawPoints
             */
            drawPoints: function () {
                var series = this, verb = series.getAnimationVerb();
                // Draw the columns
                series.points.forEach(function (point) {
                    series.drawPoint(point, verb);
                });
            },
            /**
             * Returns "animate", or "attr" if the number of points is above the
             * animation limit.
             *
             * @private
             * @function Highcharts.Series#getAnimationVerb
             *
             * @return {string}
             */
            getAnimationVerb: function () {
                return (this.chart.pointCount < (this.options.animationLimit || 250) ?
                    'animate' :
                    'attr');
            }
            /*
            // Override to remove stroke from points. For partial fill.
            pointAttribs: function () {
                var series = this,
                    retVal = columnType.prototype.pointAttribs
                        .apply(series, arguments);

                //retVal['stroke-width'] = 0;
                return retVal;
            }
            //*/
            /* eslint-enable valid-jsdoc */
        }, {
            /**
             * The ending X value of the range point.
             * @name Highcharts.Point#x2
             * @type {number|undefined}
             * @requires modules/xrange
             */
            /**
             * Extend applyOptions so that `colorByPoint` for x-range means that one
             * color is applied per Y axis category.
             *
             * @private
             * @function Highcharts.Point#applyOptions
             *
             * @return {Highcharts.Series}
             */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            resolveColor: function () {
                var series = this.series, colorByPoint;
                if (series.options.colorByPoint && !this.options.color) {
                    colorByPoint = getColorByCategory(series, this);
                    if (!series.chart.styledMode) {
                        this.color = colorByPoint.color;
                    }
                    if (!this.options.colorIndex) {
                        this.colorIndex = colorByPoint.colorIndex;
                    }
                }
                else if (!this.color) {
                    this.color = series.color;
                }
            },
            /**
             * Extend init to have y default to 0.
             *
             * @private
             * @function Highcharts.Point#init
             *
             * @return {Highcharts.Point}
             */
            init: function () {
                Point.prototype.init.apply(this, arguments);
                if (!this.y) {
                    this.y = 0;
                }
                return this;
            },
            /**
             * @private
             * @function Highcharts.Point#setState
             */
            setState: function () {
                Point.prototype.setState.apply(this, arguments);
                this.series.drawPoint(this, this.series.getAnimationVerb());
            },
            /**
             * @private
             * @function Highcharts.Point#getLabelConfig
             *
             * @return {Highcharts.PointLabelObject}
             */
            // Add x2 and yCategory to the available properties for tooltip formats
            getLabelConfig: function () {
                var point = this, cfg = Point.prototype.getLabelConfig.call(point), yCats = point.series.yAxis.categories;
                cfg.x2 = point.x2;
                cfg.yCategory = point.yCategory = yCats && yCats[point.y];
                return cfg;
            },
            tooltipDateKeys: ['x', 'x2'],
            /**
             * @private
             * @function Highcharts.Point#isValid
             *
             * @return {boolean}
             */
            isValid: function () {
                return typeof this.x === 'number' &&
                    typeof this.x2 === 'number';
            }
            /* eslint-enable valid-jsdoc */
        });
        /**
         * Max x2 should be considered in xAxis extremes
         */
        addEvent(Axis, 'afterGetSeriesExtremes', function () {
            var axis = this, // eslint-disable-line no-invalid-this
            axisSeries = axis.series, dataMax, modMax;
            if (axis.isXAxis) {
                dataMax = pick(axis.dataMax, -Number.MAX_VALUE);
                axisSeries.forEach(function (series) {
                    if (series.x2Data) {
                        series.x2Data
                            .forEach(function (val) {
                            if (val > dataMax) {
                                dataMax = val;
                                modMax = true;
                            }
                        });
                    }
                });
                if (modMax) {
                    axis.dataMax = dataMax;
                }
            }
        });
        /**
         * An `xrange` series. If the [type](#series.xrange.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.xrange
         * @excluding boostThreshold, crisp, cropThreshold, depth, edgeColor, edgeWidth,
         *            findNearestPointBy, getExtremesFromAll, negativeColor,
         *            pointInterval, pointIntervalUnit, pointPlacement, pointRange,
         *            pointStart, softThreshold, stacking, threshold
         * @product   highcharts highstock gantt
         * @apioption series.xrange
         */
        /**
         * An array of data points for the series. For the `xrange` series type,
         * points can be given in the following ways:
         *
         * 1. An array of objects with named values. The objects are point configuration
         *    objects as seen below.
         *    ```js
         *    data: [{
         *        x: Date.UTC(2017, 0, 1),
         *        x2: Date.UTC(2017, 0, 3),
         *        name: "Test",
         *        y: 0,
         *        color: "#00FF00"
         *    }, {
         *        x: Date.UTC(2017, 0, 4),
         *        x2: Date.UTC(2017, 0, 5),
         *        name: "Deploy",
         *        y: 1,
         *        color: "#FF0000"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<*>}
         * @extends   series.line.data
         * @product   highcharts highstock gantt
         * @apioption series.xrange.data
         */
        /**
         * The starting X value of the range point.
         *
         * @sample {highcharts} highcharts/demo/x-range
         *         X-range
         *
         * @type      {number}
         * @product   highcharts highstock gantt
         * @apioption series.xrange.data.x
         */
        /**
         * The ending X value of the range point.
         *
         * @sample {highcharts} highcharts/demo/x-range
         *         X-range
         *
         * @type      {number}
         * @product   highcharts highstock gantt
         * @apioption series.xrange.data.x2
         */
        /**
         * The Y value of the range point.
         *
         * @sample {highcharts} highcharts/demo/x-range
         *         X-range
         *
         * @type      {number}
         * @product   highcharts highstock gantt
         * @apioption series.xrange.data.y
         */
        /**
         * A partial fill for each point, typically used to visualize how much of
         * a task is performed. The partial fill object can be set either on series
         * or point level.
         *
         * @sample {highcharts} highcharts/demo/x-range
         *         X-range with partial fill
         *
         * @product   highcharts highstock gantt
         * @apioption series.xrange.data.partialFill
         */
        /**
         * The amount of the X-range point to be filled. Values can be 0-1 and are
         * converted to percentages in the default data label formatter.
         *
         * @type      {number}
         * @product   highcharts highstock gantt
         * @apioption series.xrange.data.partialFill.amount
         */
        /**
         * The fill color to be used for partial fills. Defaults to a darker shade
         * of the point color.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @product   highcharts highstock gantt
         * @apioption series.xrange.data.partialFill.fill
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'parts-gantt/GanttSeries.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2016-2019 Highsoft AS
         *
         *  Author: Lars A. V. Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isNumber = U.isNumber, splat = U.splat;
        var dateFormat = H.dateFormat, merge = H.merge, pick = H.pick, seriesType = H.seriesType, seriesTypes = H.seriesTypes, Series = H.Series, parent = seriesTypes.xrange;
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.gantt
         *
         * @augments Highcharts.Series
         */
        seriesType('gantt', 'xrange'
        /**
         * A `gantt` series. If the [type](#series.gantt.type) option is not specified,
         * it is inherited from [chart.type](#chart.type).
         *
         * @extends      plotOptions.xrange
         * @product      gantt
         * @optionparent plotOptions.gantt
         */
        , {
            // options - default options merged with parent
            grouping: false,
            dataLabels: {
                /** @ignore-option */
                enabled: true
            },
            tooltip: {
                headerFormat: '<span style="font-size: 10px">{series.name}</span><br/>',
                pointFormat: null,
                pointFormatter: function () {
                    var point = this, series = point.series, tooltip = series.chart.tooltip, xAxis = series.xAxis, formats = series.tooltipOptions.dateTimeLabelFormats, startOfWeek = xAxis.options.startOfWeek, ttOptions = series.tooltipOptions, format = ttOptions.xDateFormat, start, end, milestone = point.options.milestone, retVal = '<b>' + (point.name || point.yCategory) + '</b>';
                    if (ttOptions.pointFormat) {
                        return point.tooltipFormatter(ttOptions.pointFormat);
                    }
                    if (!format) {
                        format = splat(tooltip.getDateFormat(xAxis.closestPointRange, point.start, startOfWeek, formats))[0];
                    }
                    start = dateFormat(format, point.start);
                    end = dateFormat(format, point.end);
                    retVal += '<br/>';
                    if (!milestone) {
                        retVal += 'Start: ' + start + '<br/>';
                        retVal += 'End: ' + end + '<br/>';
                    }
                    else {
                        retVal += start + '<br/>';
                    }
                    return retVal;
                }
            },
            connectors: {
                type: 'simpleConnect',
                animation: {
                    reversed: true // Dependencies go from child to parent
                },
                startMarker: {
                    enabled: true,
                    symbol: 'arrow-filled',
                    radius: 4,
                    fill: '#fa0',
                    align: 'left'
                },
                endMarker: {
                    enabled: false,
                    align: 'right'
                }
            }
        }, {
            pointArrayMap: ['start', 'end', 'y'],
            // Keyboard navigation, don't use nearest vertical mode
            keyboardMoveVertical: false,
            /* eslint-disable valid-jsdoc */
            /**
             * Handle milestones, as they have no x2.
             * @private
             */
            translatePoint: function (point) {
                var series = this, shapeArgs, size;
                parent.prototype.translatePoint.call(series, point);
                if (point.options.milestone) {
                    shapeArgs = point.shapeArgs;
                    size = shapeArgs.height;
                    point.shapeArgs = {
                        x: shapeArgs.x - (size / 2),
                        y: shapeArgs.y,
                        width: size,
                        height: size
                    };
                }
            },
            /**
             * Draws a single point in the series.
             *
             * This override draws the point as a diamond if point.options.milestone
             * is true, and uses the original drawPoint() if it is false or not set.
             *
             * @requires module:highcharts-gantt
             *
             * @private
             * @function Highcharts.seriesTypes.gantt#drawPoint
             *
             * @param {Highcharts.Point} point
             *        An instance of Point in the series
             *
             * @param {"animate"|"attr"} verb
             *        'animate' (animates changes) or 'attr' (sets options)
             *
             * @return {void}
             */
            drawPoint: function (point, verb) {
                var series = this, seriesOpts = series.options, renderer = series.chart.renderer, shapeArgs = point.shapeArgs, plotY = point.plotY, graphic = point.graphic, state = point.selected && 'select', cutOff = seriesOpts.stacking && !seriesOpts.borderRadius, diamondShape;
                if (point.options.milestone) {
                    if (isNumber(plotY) && point.y !== null) {
                        diamondShape = renderer.symbols.diamond(shapeArgs.x, shapeArgs.y, shapeArgs.width, shapeArgs.height);
                        if (graphic) {
                            graphic[verb]({
                                d: diamondShape
                            });
                        }
                        else {
                            point.graphic = graphic = renderer.path(diamondShape)
                                .addClass(point.getClassName(), true)
                                .add(point.group || series.group);
                        }
                        // Presentational
                        if (!series.chart.styledMode) {
                            point.graphic
                                .attr(series.pointAttribs(point, state))
                                .shadow(seriesOpts.shadow, null, cutOff);
                        }
                    }
                    else if (graphic) {
                        point.graphic = graphic.destroy(); // #1269
                    }
                }
                else {
                    parent.prototype.drawPoint.call(series, point, verb);
                }
            },
            setData: Series.prototype.setData,
            /**
             * @private
             */
            setGanttPointAliases: function (options) {
                /**
                 * Add a value to options if the value exists.
                 * @private
                 */
                function addIfExists(prop, val) {
                    if (val !== undefined) {
                        options[prop] = val;
                    }
                }
                addIfExists('x', pick(options.start, options.x));
                addIfExists('x2', pick(options.end, options.x2));
                addIfExists('partialFill', pick(options.completed, options.partialFill));
                addIfExists('connect', pick(options.dependency, options.connect));
            }
            /* eslint-enable valid-jsdoc */
        }, merge(parent.prototype.pointClass.prototype, {
            // pointProps - point member overrides. We inherit from parent as well.
            /* eslint-disable valid-jsdoc */
            /**
             * Applies the options containing the x and y data and possible some
             * extra properties. This is called on point init or from point.update.
             *
             * @private
             * @function Highcharts.Point#applyOptions
             *
             * @param {object} options
             *        The point options
             *
             * @param {number} x
             *        The x value
             *
             * @return {Highcharts.Point}
             *         The Point instance
             */
            applyOptions: function (options, x) {
                var point = this, retVal = merge(options);
                H.seriesTypes.gantt.prototype.setGanttPointAliases(retVal);
                retVal = parent.prototype.pointClass.prototype.applyOptions
                    .call(point, retVal, x);
                return retVal;
            },
            isValid: function () {
                return ((typeof this.start === 'number' ||
                    typeof this.x === 'number') &&
                    (typeof this.end === 'number' ||
                        typeof this.x2 === 'number' ||
                        this.milestone));
            }
            /* eslint-enable valid-jsdoc */
        }));
        /**
         * A `gantt` series.
         *
         * @extends   series,plotOptions.gantt
         * @excluding boostThreshold, connectors, dashStyle, findNearestPointBy,
         *            getExtremesFromAll, marker, negativeColor, pointInterval,
         *            pointIntervalUnit, pointPlacement, pointStart
         * @product   gantt
         * @apioption series.gantt
         */
        /**
         * Data for a Gantt series.
         *
         * @type      {Array<*>}
         * @extends   series.xrange.data
         * @excluding className, color, colorIndex, connect, dataLabels, events, id,
         *            partialFill, selected, x, x2
         * @product   gantt
         * @apioption series.gantt.data
         */
        /**
         * Whether the grid node belonging to this point should start as collapsed. Used
         * in axes of type treegrid.
         *
         * @sample {gantt} gantt/treegrid-axis/collapsed/
         *         Start as collapsed
         *
         * @type      {boolean}
         * @default   false
         * @product   gantt
         * @apioption series.gantt.data.collapsed
         */
        /**
         * The start time of a task.
         *
         * @type      {number}
         * @product   gantt
         * @apioption series.gantt.data.start
         */
        /**
         * The end time of a task.
         *
         * @type      {number}
         * @product   gantt
         * @apioption series.gantt.data.end
         */
        /**
         * The Y value of a task.
         *
         * @type      {number}
         * @product   gantt
         * @apioption series.gantt.data.y
         */
        /**
         * The name of a task. If a `treegrid` y-axis is used (default in Gantt charts),
         * this will be picked up automatically, and used to calculate the y-value.
         *
         * @type      {string}
         * @product   gantt
         * @apioption series.gantt.data.name
         */
        /**
         * Progress indicator, how much of the task completed. If it is a number, the
         * `fill` will be applied automatically.
         *
         * @sample {gantt} gantt/demo/progress-indicator
         *         Progress indicator
         *
         * @type      {number|*}
         * @extends   series.xrange.data.partialFill
         * @product   gantt
         * @apioption series.gantt.data.completed
         */
        /**
         * The amount of the progress indicator, ranging from 0 (not started) to 1
         * (finished).
         *
         * @type      {number}
         * @default   0
         * @apioption series.gantt.data.completed.amount
         */
        /**
         * The fill of the progress indicator. Defaults to a darkened variety of the
         * main color.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @apioption series.gantt.data.completed.fill
         */
        /**
         * The ID of the point (task) that this point depends on in Gantt charts.
         * Aliases [connect](series.xrange.data.connect). Can also be an object,
         * specifying further connecting [options](series.gantt.connectors) between the
         * points. Multiple connections can be specified by providing an array.
         *
         * @sample gantt/demo/project-management
         *         Dependencies
         * @sample gantt/pathfinder/demo
         *         Different connection types
         *
         * @type      {string|Array<string|*>|*}
         * @extends   series.xrange.data.connect
         * @since     6.2.0
         * @product   gantt
         * @apioption series.gantt.data.dependency
         */
        /**
         * Whether this point is a milestone. If so, only the `start` option is handled,
         * while `end` is ignored.
         *
         * @sample gantt/gantt/milestones
         *         Milestones
         *
         * @type      {boolean}
         * @since     6.2.0
         * @product   gantt
         * @apioption series.gantt.data.milestone
         */
        /**
         * The ID of the parent point (task) of this point in Gantt charts.
         *
         * @sample gantt/demo/subtasks
         *         Gantt chart with subtasks
         *
         * @type      {string}
         * @since     6.2.0
         * @product   gantt
         * @apioption series.gantt.data.parent
         */
        /**
         * @excluding afterAnimate
         * @apioption series.gantt.events
         */
        ''; // adds doclets above to the transpiled file

    });
    _registerModule(_modules, 'parts-gantt/GanttChart.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2016-2019 Highsoft AS
         *
         *  Author: Lars A. V. Cabrera
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isArray = U.isArray, splat = U.splat;
        var merge = H.merge, Chart = H.Chart;
        /**
         * Factory function for Gantt charts.
         *
         * @example
         * // Render a chart in to div#container
         * var chart = Highcharts.ganttChart('container', {
         *     title: {
         *         text: 'My chart'
         *     },
         *     series: [{
         *         data: ...
         *     }]
         * });
         *
         * @function Highcharts.ganttChart
         *
         * @param {string|Highcharts.HTMLDOMElement} renderTo
         *        The DOM element to render to, or its id.
         *
         * @param {Highcharts.Options} options
         *        The chart options structure.
         *
         * @param {Highcharts.ChartCallbackFunction} [callback]
         *        Function to run when the chart has loaded and and all external images
         *        are loaded. Defining a
         *        [chart.events.load](https://api.highcharts.com/highcharts/chart.events.load)
         *        handler is equivalent.
         *
         * @return {Highcharts.Chart}
         *         Returns the Chart object.
         */
        H.ganttChart = function (renderTo, options, callback) {
            var hasRenderToArg = typeof renderTo === 'string' || renderTo.nodeName, seriesOptions = options.series, defaultOptions = H.getOptions(), defaultLinkedTo, userOptions = options;
            options = arguments[hasRenderToArg ? 1 : 0];
            // If user hasn't defined axes as array, make it into an array and add a
            // second axis by default.
            if (!isArray(options.xAxis)) {
                options.xAxis = [options.xAxis || {}, {}];
            }
            // apply X axis options to both single and multi x axes
            options.xAxis = options.xAxis.map(function (xAxisOptions, i) {
                if (i === 1) { // Second xAxis
                    defaultLinkedTo = 0;
                }
                return merge(defaultOptions.xAxis, {
                    grid: {
                        enabled: true
                    },
                    opposite: true,
                    linkedTo: defaultLinkedTo
                }, xAxisOptions, // user options
                {
                    type: 'datetime'
                });
            });
            // apply Y axis options to both single and multi y axes
            options.yAxis = (splat(options.yAxis || {})).map(function (yAxisOptions) {
                return merge(defaultOptions.yAxis, // #3802
                {
                    grid: {
                        enabled: true
                    },
                    staticScale: 50,
                    reversed: true,
                    // Set default type treegrid, but only if 'categories' is
                    // undefined
                    type: yAxisOptions.categories ? yAxisOptions.type : 'treegrid'
                }, yAxisOptions // user options
                );
            });
            options.series = null;
            options = merge(true, {
                chart: {
                    type: 'gantt'
                },
                title: {
                    text: null
                },
                legend: {
                    enabled: false
                }
            }, options, // user's options
            // forced options
            {
                isGantt: true
            });
            options.series = userOptions.series = seriesOptions;
            options.series.forEach(function (series) {
                series.data.forEach(function (point) {
                    H.seriesTypes.gantt.prototype.setGanttPointAliases(point);
                });
            });
            return hasRenderToArg ?
                new Chart(renderTo, options, callback) :
                new Chart(options, options); // @todo does not look correct
        };

    });
    _registerModule(_modules, 'parts/Scrollbar.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined;
        var addEvent = H.addEvent, Axis = H.Axis, correctFloat = H.correctFloat, defaultOptions = H.defaultOptions, destroyObjectProperties = H.destroyObjectProperties, fireEvent = H.fireEvent, hasTouch = H.hasTouch, isTouchDevice = H.isTouchDevice, merge = H.merge, pick = H.pick, removeEvent = H.removeEvent, swapXY;
        /**
         *
         * The scrollbar is a means of panning over the X axis of a stock chart.
         * Scrollbars can  also be applied to other types of axes.
         *
         * Another approach to scrollable charts is the [chart.scrollablePlotArea](
         * https://api.highcharts.com/highcharts/chart.scrollablePlotArea) option that
         * is especially suitable for simpler cartesian charts on mobile.
         *
         * In styled mode, all the presentational options for the
         * scrollbar are replaced by the classes `.highcharts-scrollbar-thumb`,
         * `.highcharts-scrollbar-arrow`, `.highcharts-scrollbar-button`,
         * `.highcharts-scrollbar-rifles` and `.highcharts-scrollbar-track`.
         *
         * @sample stock/yaxis/inverted-bar-scrollbar/
         *         A scrollbar on a simple bar chart
         *
         * @product highstock gantt
         * @optionparent scrollbar
         */
        var defaultScrollbarOptions = {
            /**
             * The height of the scrollbar. The height also applies to the width
             * of the scroll arrows so that they are always squares. Defaults to
             * 20 for touch devices and 14 for mouse devices.
             *
             * @sample stock/scrollbar/height/
             *         A 30px scrollbar
             *
             * @type    {number}
             * @default 20/14
             */
            height: isTouchDevice ? 20 : 14,
            /**
             * The border rounding radius of the bar.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderRadius: 0,
            /**
             * The corner radius of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderRadius: 0,
            /**
             * Enable or disable the scrollbar.
             *
             * @sample stock/scrollbar/enabled/
             *         Disable the scrollbar, only use navigator
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.enabled
             */
            /**
             * Whether to redraw the main chart as the scrollbar or the navigator
             * zoomed window is moved. Defaults to `true` for modern browsers and
             * `false` for legacy IE browsers as well as mobile devices.
             *
             * @sample stock/scrollbar/liveredraw
             *         Setting live redraw to false
             *
             * @type  {boolean}
             * @since 1.3
             */
            liveRedraw: undefined,
            /**
             * The margin between the scrollbar and its axis when the scrollbar is
             * applied directly to an axis.
             */
            margin: 10,
            /**
             * The minimum width of the scrollbar.
             *
             * @since 1.2.5
             */
            minWidth: 6,
            /**
             * Whether to show or hide the scrollbar when the scrolled content is
             * zoomed out to it full extent.
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.showFull
             */
            step: 0.2,
            /**
             * The z index of the scrollbar group.
             */
            zIndex: 3,
            /**
             * The background color of the scrollbar itself.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            barBackgroundColor: '#cccccc',
            /**
             * The width of the bar's border.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderWidth: 1,
            /**
             * The color of the scrollbar's border.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            barBorderColor: '#cccccc',
            /**
             * The color of the small arrow inside the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonArrowColor: '#333333',
            /**
             * The color of scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonBackgroundColor: '#e6e6e6',
            /**
             * The color of the border of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonBorderColor: '#cccccc',
            /**
             * The border width of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderWidth: 1,
            /**
             * The color of the small rifles in the middle of the scrollbar.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            rifleColor: '#333333',
            /**
             * The color of the track background.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            trackBackgroundColor: '#f2f2f2',
            /**
             * The color of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            trackBorderColor: '#f2f2f2',
            /**
             * The corner radius of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type      {number}
             * @default   0
             * @apioption scrollbar.trackBorderRadius
             */
            /**
             * The width of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            trackBorderWidth: 1
        };
        defaultOptions.scrollbar = merge(true, defaultScrollbarOptions, defaultOptions.scrollbar);
        /**
         * When we have vertical scrollbar, rifles and arrow in buttons should be
         * rotated. The same method is used in Navigator's handles, to rotate them.
         *
         * @function Highcharts.swapXY
         *
         * @param {Highcharts.SVGPathArray} path
         *        Path to be rotated.
         *
         * @param {boolean} [vertical]
         *        If vertical scrollbar, swap x-y values.
         *
         * @return {Highcharts.SVGPathArray}
         *         Rotated path.
         */
        H.swapXY = swapXY = function (path, vertical) {
            var i, len = path.length, temp;
            if (vertical) {
                for (i = 0; i < len; i += 3) {
                    temp = path[i + 1];
                    path[i + 1] = path[i + 2];
                    path[i + 2] = temp;
                }
            }
            return path;
        };
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A reusable scrollbar, internally used in Highstock's navigator and optionally
         * on individual axes.
         *
         * @private
         * @class
         * @name Highcharts.Scrollbar
         * @param {Highcharts.SVGRenderer} renderer
         * @param {Highcharts.ScrollbarOptions} options
         * @param {Highcharts.Chart} chart
         */
        function Scrollbar(renderer, options, chart) {
            this.init(renderer, options, chart);
        }
        Scrollbar.prototype = {
            /**
             * @private
             * @function Highcharts.Scrollbar#init
             * @param {Highcharts.SVGRenderer} renderer
             * @param {Highcharts.ScrollbarOptions} options
             * @param {Highcharts.Chart} chart
             * @return {void}
             */
            init: function (renderer, options, chart) {
                this.scrollbarButtons = [];
                this.renderer = renderer;
                this.userOptions = options;
                this.options = merge(defaultScrollbarOptions, options);
                this.chart = chart;
                // backward compatibility
                this.size = pick(this.options.size, this.options.height);
                // Init
                if (options.enabled) {
                    this.render();
                    this.initEvents();
                    this.addEvents();
                }
            },
            /**
             * Render scrollbar with all required items.
             *
             * @private
             * @function Highcharts.Scrollbar#render
             */
            render: function () {
                var scroller = this, renderer = scroller.renderer, options = scroller.options, size = scroller.size, styledMode = this.chart.styledMode, group;
                // Draw the scrollbar group
                scroller.group = group = renderer.g('scrollbar').attr({
                    zIndex: options.zIndex,
                    translateY: -99999
                }).add();
                // Draw the scrollbar track:
                scroller.track = renderer.rect()
                    .addClass('highcharts-scrollbar-track')
                    .attr({
                    x: 0,
                    r: options.trackBorderRadius || 0,
                    height: size,
                    width: size
                }).add(group);
                if (!styledMode) {
                    scroller.track.attr({
                        fill: options.trackBackgroundColor,
                        stroke: options.trackBorderColor,
                        'stroke-width': options.trackBorderWidth
                    });
                }
                this.trackBorderWidth = scroller.track.strokeWidth();
                scroller.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });
                // Draw the scrollbar itself
                scroller.scrollbarGroup = renderer.g().add(group);
                scroller.scrollbar = renderer.rect()
                    .addClass('highcharts-scrollbar-thumb')
                    .attr({
                    height: size,
                    width: size,
                    r: options.barBorderRadius || 0
                }).add(scroller.scrollbarGroup);
                scroller.scrollbarRifles = renderer
                    .path(swapXY([
                    'M',
                    -3, size / 4,
                    'L',
                    -3, 2 * size / 3,
                    'M',
                    0, size / 4,
                    'L',
                    0, 2 * size / 3,
                    'M',
                    3, size / 4,
                    'L',
                    3, 2 * size / 3
                ], options.vertical))
                    .addClass('highcharts-scrollbar-rifles')
                    .add(scroller.scrollbarGroup);
                if (!styledMode) {
                    scroller.scrollbar.attr({
                        fill: options.barBackgroundColor,
                        stroke: options.barBorderColor,
                        'stroke-width': options.barBorderWidth
                    });
                    scroller.scrollbarRifles.attr({
                        stroke: options.rifleColor,
                        'stroke-width': 1
                    });
                }
                scroller.scrollbarStrokeWidth = scroller.scrollbar.strokeWidth();
                scroller.scrollbarGroup.translate(-scroller.scrollbarStrokeWidth % 2 / 2, -scroller.scrollbarStrokeWidth % 2 / 2);
                // Draw the buttons:
                scroller.drawScrollbarButton(0);
                scroller.drawScrollbarButton(1);
            },
            /**
             * Position the scrollbar, method called from a parent with defined
             * dimensions.
             *
             * @private
             * @function Highcharts.Scrollbar#position
             * @param {number} x
             *        x-position on the chart
             * @param {number} y
             *        y-position on the chart
             * @param {number} width
             *        width of the scrollbar
             * @param {number} height
             *        height of the scorllbar
             * @return {void}
             */
            position: function (x, y, width, height) {
                var scroller = this, options = scroller.options, vertical = options.vertical, xOffset = height, yOffset = 0, method = scroller.rendered ? 'animate' : 'attr';
                scroller.x = x;
                scroller.y = y + this.trackBorderWidth;
                scroller.width = width; // width with buttons
                scroller.height = height;
                scroller.xOffset = xOffset;
                scroller.yOffset = yOffset;
                // If Scrollbar is a vertical type, swap options:
                if (vertical) {
                    scroller.width = scroller.yOffset = width = yOffset = scroller.size;
                    scroller.xOffset = xOffset = 0;
                    scroller.barWidth = height - width * 2; // width without buttons
                    scroller.x = x = x + scroller.options.margin;
                }
                else {
                    scroller.height = scroller.xOffset = height = xOffset =
                        scroller.size;
                    scroller.barWidth = width - height * 2; // width without buttons
                    scroller.y = scroller.y + scroller.options.margin;
                }
                // Set general position for a group:
                scroller.group[method]({
                    translateX: x,
                    translateY: scroller.y
                });
                // Resize background/track:
                scroller.track[method]({
                    width: width,
                    height: height
                });
                // Move right/bottom button ot it's place:
                scroller.scrollbarButtons[1][method]({
                    translateX: vertical ? 0 : width - xOffset,
                    translateY: vertical ? height - yOffset : 0
                });
            },
            /**
             * Draw the scrollbar buttons with arrows
             *
             * @private
             * @function Highcharts.Scrollbar#drawScrollbarButton
             * @param {number} index
             *        0 is left, 1 is right
             * @return {void}
             */
            drawScrollbarButton: function (index) {
                var scroller = this, renderer = scroller.renderer, scrollbarButtons = scroller.scrollbarButtons, options = scroller.options, size = scroller.size, group, tempElem;
                group = renderer.g().add(scroller.group);
                scrollbarButtons.push(group);
                // Create a rectangle for the scrollbar button
                tempElem = renderer.rect()
                    .addClass('highcharts-scrollbar-button')
                    .add(group);
                // Presentational attributes
                if (!this.chart.styledMode) {
                    tempElem.attr({
                        stroke: options.buttonBorderColor,
                        'stroke-width': options.buttonBorderWidth,
                        fill: options.buttonBackgroundColor
                    });
                }
                // Place the rectangle based on the rendered stroke width
                tempElem.attr(tempElem.crisp({
                    x: -0.5,
                    y: -0.5,
                    width: size + 1,
                    height: size + 1,
                    r: options.buttonBorderRadius
                }, tempElem.strokeWidth()));
                // Button arrow
                tempElem = renderer
                    .path(swapXY([
                    'M',
                    size / 2 + (index ? -1 : 1),
                    size / 2 - 3,
                    'L',
                    size / 2 + (index ? -1 : 1),
                    size / 2 + 3,
                    'L',
                    size / 2 + (index ? 2 : -2),
                    size / 2
                ], options.vertical))
                    .addClass('highcharts-scrollbar-arrow')
                    .add(scrollbarButtons[index]);
                if (!this.chart.styledMode) {
                    tempElem.attr({
                        fill: options.buttonArrowColor
                    });
                }
            },
            /**
             * Set scrollbar size, with a given scale.
             *
             * @private
             * @function Highcharts.Scrollbar#setRange
             * @param {number} from
             *        scale (0-1) where bar should start
             * @param {number} to
             *        scale (0-1) where bar should end
             * @return {void}
             */
            setRange: function (from, to) {
                var scroller = this, options = scroller.options, vertical = options.vertical, minWidth = options.minWidth, fullWidth = scroller.barWidth, fromPX, toPX, newPos, newSize, newRiflesPos, method = (this.rendered &&
                    !this.hasDragged &&
                    !(this.chart.navigator && this.chart.navigator.hasDragged)) ? 'animate' : 'attr';
                if (!defined(fullWidth)) {
                    return;
                }
                from = Math.max(from, 0);
                fromPX = Math.ceil(fullWidth * from);
                toPX = fullWidth * Math.min(to, 1);
                scroller.calculatedWidth = newSize = correctFloat(toPX - fromPX);
                // We need to recalculate position, if minWidth is used
                if (newSize < minWidth) {
                    fromPX = (fullWidth - minWidth + newSize) * from;
                    newSize = minWidth;
                }
                newPos = Math.floor(fromPX + scroller.xOffset + scroller.yOffset);
                newRiflesPos = newSize / 2 - 0.5; // -0.5 -> rifle line width / 2
                // Store current position:
                scroller.from = from;
                scroller.to = to;
                if (!vertical) {
                    scroller.scrollbarGroup[method]({
                        translateX: newPos
                    });
                    scroller.scrollbar[method]({
                        width: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateX: newRiflesPos
                    });
                    scroller.scrollbarLeft = newPos;
                    scroller.scrollbarTop = 0;
                }
                else {
                    scroller.scrollbarGroup[method]({
                        translateY: newPos
                    });
                    scroller.scrollbar[method]({
                        height: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateY: newRiflesPos
                    });
                    scroller.scrollbarTop = newPos;
                    scroller.scrollbarLeft = 0;
                }
                if (newSize <= 12) {
                    scroller.scrollbarRifles.hide();
                }
                else {
                    scroller.scrollbarRifles.show(true);
                }
                // Show or hide the scrollbar based on the showFull setting
                if (options.showFull === false) {
                    if (from <= 0 && to >= 1) {
                        scroller.group.hide();
                    }
                    else {
                        scroller.group.show();
                    }
                }
                scroller.rendered = true;
            },
            /**
             * Init events methods, so we have an access to the Scrollbar itself
             *
             * @private
             * @function Highcharts.Scrollbar#initEvents
             * @return {void}
             * @fires Highcharts.Scrollbar#event:changed
             */
            initEvents: function () {
                var scroller = this;
                /**
                 * Event handler for the mouse move event.
                 * @private
                 */
                scroller.mouseMoveHandler = function (e) {
                    var normalizedEvent = scroller.chart.pointer.normalize(e), options = scroller.options, direction = options.vertical ? 'chartY' : 'chartX', initPositions = scroller.initPositions, scrollPosition, chartPosition, change;
                    // In iOS, a mousemove event with e.pageX === 0 is fired when
                    // holding the finger down in the center of the scrollbar. This
                    // should be ignored.
                    if (scroller.grabbedCenter &&
                        // #4696, scrollbar failed on Android
                        (!e.touches || e.touches[0][direction] !== 0)) {
                        chartPosition = scroller.cursorToScrollbarPosition(normalizedEvent)[direction];
                        scrollPosition = scroller[direction];
                        change = chartPosition - scrollPosition;
                        scroller.hasDragged = true;
                        scroller.updatePosition(initPositions[0] + change, initPositions[1] + change);
                        if (scroller.hasDragged) {
                            fireEvent(scroller, 'changed', {
                                from: scroller.from,
                                to: scroller.to,
                                trigger: 'scrollbar',
                                DOMType: e.type,
                                DOMEvent: e
                            });
                        }
                    }
                };
                /**
                 * Event handler for the mouse up event.
                 * @private
                 */
                scroller.mouseUpHandler = function (e) {
                    if (scroller.hasDragged) {
                        fireEvent(scroller, 'changed', {
                            from: scroller.from,
                            to: scroller.to,
                            trigger: 'scrollbar',
                            DOMType: e.type,
                            DOMEvent: e
                        });
                    }
                    scroller.grabbedCenter =
                        scroller.hasDragged =
                            scroller.chartX =
                                scroller.chartY = null;
                };
                scroller.mouseDownHandler = function (e) {
                    var normalizedEvent = scroller.chart.pointer.normalize(e), mousePosition = scroller.cursorToScrollbarPosition(normalizedEvent);
                    scroller.chartX = mousePosition.chartX;
                    scroller.chartY = mousePosition.chartY;
                    scroller.initPositions = [scroller.from, scroller.to];
                    scroller.grabbedCenter = true;
                };
                scroller.buttonToMinClick = function (e) {
                    var range = correctFloat(scroller.to - scroller.from) *
                        scroller.options.step;
                    scroller.updatePosition(correctFloat(scroller.from - range), correctFloat(scroller.to - range));
                    fireEvent(scroller, 'changed', {
                        from: scroller.from,
                        to: scroller.to,
                        trigger: 'scrollbar',
                        DOMEvent: e
                    });
                };
                scroller.buttonToMaxClick = function (e) {
                    var range = (scroller.to - scroller.from) * scroller.options.step;
                    scroller.updatePosition(scroller.from + range, scroller.to + range);
                    fireEvent(scroller, 'changed', {
                        from: scroller.from,
                        to: scroller.to,
                        trigger: 'scrollbar',
                        DOMEvent: e
                    });
                };
                scroller.trackClick = function (e) {
                    var normalizedEvent = scroller.chart.pointer.normalize(e), range = scroller.to - scroller.from, top = scroller.y + scroller.scrollbarTop, left = scroller.x + scroller.scrollbarLeft;
                    if ((scroller.options.vertical && normalizedEvent.chartY > top) ||
                        (!scroller.options.vertical && normalizedEvent.chartX > left)) {
                        // On the top or on the left side of the track:
                        scroller.updatePosition(scroller.from + range, scroller.to + range);
                    }
                    else {
                        // On the bottom or the right side of the track:
                        scroller.updatePosition(scroller.from - range, scroller.to - range);
                    }
                    fireEvent(scroller, 'changed', {
                        from: scroller.from,
                        to: scroller.to,
                        trigger: 'scrollbar',
                        DOMEvent: e
                    });
                };
            },
            /**
             * Get normalized (0-1) cursor position over the scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#cursorToScrollbarPosition
             *
             * @param  {*} normalizedEvent
             *         normalized event, with chartX and chartY values
             *
             * @return {Highcharts.Dictionary<number>}
             *         Local position {chartX, chartY}
             */
            cursorToScrollbarPosition: function (normalizedEvent) {
                var scroller = this, options = scroller.options, minWidthDifference = options.minWidth > scroller.calculatedWidth ?
                    options.minWidth :
                    0; // minWidth distorts translation
                return {
                    chartX: (normalizedEvent.chartX - scroller.x -
                        scroller.xOffset) /
                        (scroller.barWidth - minWidthDifference),
                    chartY: (normalizedEvent.chartY - scroller.y -
                        scroller.yOffset) /
                        (scroller.barWidth - minWidthDifference)
                };
            },
            /**
             * Update position option in the Scrollbar, with normalized 0-1 scale
             *
             * @private
             * @function Highcharts.Scrollbar#updatePosition
             * @param  {number} from
             * @param  {number} to
             * @return {void}
             */
            updatePosition: function (from, to) {
                if (to > 1) {
                    from = correctFloat(1 - correctFloat(to - from));
                    to = 1;
                }
                if (from < 0) {
                    to = correctFloat(to - from);
                    from = 0;
                }
                this.from = from;
                this.to = to;
            },
            /**
             * Update the scrollbar with new options
             *
             * @private
             * @function Highcharts.Scrollbar#update
             * @param  {Highcharts.ScrollbarOptions} options
             * @return {void}
             */
            update: function (options) {
                this.destroy();
                this.init(this.chart.renderer, merge(true, this.options, options), this.chart);
            },
            /**
             * Set up the mouse and touch events for the Scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#addEvents
             * @return {void}
             */
            addEvents: function () {
                var buttonsOrder = this.options.inverted ? [1, 0] : [0, 1], buttons = this.scrollbarButtons, bar = this.scrollbarGroup.element, track = this.track.element, mouseDownHandler = this.mouseDownHandler, mouseMoveHandler = this.mouseMoveHandler, mouseUpHandler = this.mouseUpHandler, _events;
                // Mouse events
                _events = [
                    [buttons[buttonsOrder[0]].element, 'click', this.buttonToMinClick],
                    [buttons[buttonsOrder[1]].element, 'click', this.buttonToMaxClick],
                    [track, 'click', this.trackClick],
                    [bar, 'mousedown', mouseDownHandler],
                    [bar.ownerDocument, 'mousemove', mouseMoveHandler],
                    [bar.ownerDocument, 'mouseup', mouseUpHandler]
                ];
                // Touch events
                if (hasTouch) {
                    _events.push([bar, 'touchstart', mouseDownHandler], [bar.ownerDocument, 'touchmove', mouseMoveHandler], [bar.ownerDocument, 'touchend', mouseUpHandler]);
                }
                // Add them all
                _events.forEach(function (args) {
                    addEvent.apply(null, args);
                });
                this._events = _events;
            },
            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Scrollbar#removeEvents
             * @return {void}
             */
            removeEvents: function () {
                this._events.forEach(function (args) {
                    removeEvent.apply(null, args);
                });
                this._events.length = 0;
            },
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Scrollbar#destroy
             * @return {void}
             */
            destroy: function () {
                var scroller = this.chart.scroller;
                // Disconnect events added in addEvents
                this.removeEvents();
                // Destroy properties
                [
                    'track',
                    'scrollbarRifles',
                    'scrollbar',
                    'scrollbarGroup',
                    'group'
                ].forEach(function (prop) {
                    if (this[prop] && this[prop].destroy) {
                        this[prop] = this[prop].destroy();
                    }
                }, this);
                // #6421, chart may have more scrollbars
                if (scroller && this === scroller.scrollbar) {
                    scroller.scrollbar = null;
                    // Destroy elements in collection
                    destroyObjectProperties(scroller.scrollbarButtons);
                }
            }
        };
        if (!H.Scrollbar) {
            /* *
             * Wrap axis initialization and create scrollbar if enabled:
             */
            addEvent(Axis, 'afterInit', function () {
                var axis = this;
                if (axis.options &&
                    axis.options.scrollbar &&
                    axis.options.scrollbar.enabled) {
                    // Predefined options:
                    axis.options.scrollbar.vertical = !axis.horiz;
                    axis.options.startOnTick = axis.options.endOnTick = false;
                    axis.scrollbar = new Scrollbar(axis.chart.renderer, axis.options.scrollbar, axis.chart);
                    addEvent(axis.scrollbar, 'changed', function (e) {
                        var unitedMin = Math.min(pick(axis.options.min, axis.min), axis.min, axis.dataMin), unitedMax = Math.max(pick(axis.options.max, axis.max), axis.max, axis.dataMax), range = unitedMax - unitedMin, to, from;
                        if ((axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)) {
                            to = unitedMin + range * this.to;
                            from = unitedMin + range * this.from;
                        }
                        else {
                            // y-values in browser are reversed, but this also applies
                            // for reversed horizontal axis:
                            to = unitedMin + range * (1 - this.from);
                            from = unitedMin + range * (1 - this.to);
                        }
                        if (pick(this.options.liveRedraw, H.svg && !H.isTouchDevice && !this.chart.isBoosting) ||
                            // Mouseup always should change extremes
                            e.DOMType === 'mouseup' ||
                            // Internal events
                            !defined(e.DOMType)) {
                            axis.setExtremes(from, to, true, e.DOMType !== 'mousemove', e);
                        }
                        else {
                            // When live redraw is disabled, don't change extremes
                            // Only change the position of the scollbar thumb
                            this.setRange(this.from, this.to);
                        }
                    });
                }
            });
            /* *
            * Wrap rendering axis, and update scrollbar if one is created:
            */
            addEvent(Axis, 'afterRender', function () {
                var axis = this, scrollMin = Math.min(pick(axis.options.min, axis.min), axis.min, pick(axis.dataMin, axis.min) // #6930
                ), scrollMax = Math.max(pick(axis.options.max, axis.max), axis.max, pick(axis.dataMax, axis.max) // #6930
                ), scrollbar = axis.scrollbar, offset = axis.axisTitleMargin + (axis.titleOffset || 0), scrollbarsOffsets = axis.chart.scrollbarsOffsets, axisMargin = axis.options.margin || 0, offsetsIndex, from, to;
                if (scrollbar) {
                    if (axis.horiz) {
                        // Reserve space for labels/title
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += offset;
                        }
                        scrollbar.position(axis.left, axis.top + axis.height + 2 + scrollbarsOffsets[1] -
                            (axis.opposite ? axisMargin : 0), axis.width, axis.height);
                        // Next scrollbar should reserve space for margin (if set)
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += axisMargin;
                        }
                        offsetsIndex = 1;
                    }
                    else {
                        // Reserve space for labels/title
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += offset;
                        }
                        scrollbar.position(axis.left + axis.width + 2 + scrollbarsOffsets[0] -
                            (axis.opposite ? 0 : axisMargin), axis.top, axis.width, axis.height);
                        // Next scrollbar should reserve space for margin (if set)
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += axisMargin;
                        }
                        offsetsIndex = 0;
                    }
                    scrollbarsOffsets[offsetsIndex] += scrollbar.size +
                        scrollbar.options.margin;
                    if (isNaN(scrollMin) ||
                        isNaN(scrollMax) ||
                        !defined(axis.min) ||
                        !defined(axis.max) ||
                        axis.min === axis.max // #10733
                    ) {
                        // default action: when extremes are the same or there is not
                        // extremes on the axis, but scrollbar exists, make it full size
                        scrollbar.setRange(0, 1);
                    }
                    else {
                        from =
                            (axis.min - scrollMin) / (scrollMax - scrollMin);
                        to =
                            (axis.max - scrollMin) / (scrollMax - scrollMin);
                        if ((axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)) {
                            scrollbar.setRange(from, to);
                        }
                        else {
                            // inverse vertical axis
                            scrollbar.setRange(1 - to, 1 - from);
                        }
                    }
                }
            });
            /* *
             * Make space for a scrollbar
             * @private
             */
            addEvent(Axis, 'afterGetOffset', function () {
                var axis = this, index = axis.horiz ? 2 : 1, scrollbar = axis.scrollbar;
                if (scrollbar) {
                    axis.chart.scrollbarsOffsets = [0, 0]; // reset scrollbars offsets
                    axis.chart.axisOffset[index] +=
                        scrollbar.size + scrollbar.options.margin;
                }
            });
            H.Scrollbar = Scrollbar;
        }

    });
    _registerModule(_modules, 'parts/RangeSelector.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * Define the time span for the button
         *
         * @typedef {"all"|"day"|"hour"|"millisecond"|"minute"|"month"|"second"|"week"|"year"|"ytd"} Highcharts.RangeSelectorButtonTypeValue
         */
        /**
         * Callback function to react on button clicks.
         *
         * @callback Highcharts.RangeSelectorClickCallbackFunction
         *
         * @param {global.Event} e
         *        Event arguments.
         *
         * @param {boolean|undefined}
         *        Return false to cancel the default button event.
         */
        /**
         * Callback function to parse values entered in the input boxes and return a
         * valid JavaScript time as milliseconds since 1970.
         *
         * @callback Highcharts.RangeSelectorParseCallbackFunction
         *
         * @param {string} value
         *        Input value to parse.
         *
         * @return {number}
         *         Parsed JavaScript time value.
         */
        var defined = U.defined, isNumber = U.isNumber, objectEach = U.objectEach, pInt = U.pInt, splat = U.splat;
        var addEvent = H.addEvent, Axis = H.Axis, Chart = H.Chart, css = H.css, createElement = H.createElement, defaultOptions = H.defaultOptions, destroyObjectProperties = H.destroyObjectProperties, discardElement = H.discardElement, extend = H.extend, fireEvent = H.fireEvent, merge = H.merge, pick = H.pick;
        /* ************************************************************************** *
         * Start Range Selector code                                                  *
         * ************************************************************************** */
        extend(defaultOptions, {
            /**
             * The range selector is a tool for selecting ranges to display within
             * the chart. It provides buttons to select preconfigured ranges in
             * the chart, like 1 day, 1 week, 1 month etc. It also provides input
             * boxes where min and max dates can be manually input.
             *
             * @product      highstock gantt
             * @optionparent rangeSelector
             */
            rangeSelector: {
                /**
                 * Whether to enable all buttons from the start. By default buttons are
                 * only enabled if the corresponding time range exists on the X axis,
                 * but enabling all buttons allows for dynamically loading different
                 * time ranges.
                 *
                 * @sample {highstock} stock/rangeselector/allbuttonsenabled-true/
                 *         All buttons enabled
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.0.3
                 * @apioption rangeSelector.allButtonsEnabled
                 */
                /**
                 * An array of configuration objects for the buttons.
                 *
                 * Defaults to
                 *
                 * <pre>buttons: [{
                 *     type: 'month',
                 *     count: 1,
                 *     text: '1m'
                 * }, {
                 *     type: 'month',
                 *     count: 3,
                 *     text: '3m'
                 * }, {
                 *     type: 'month',
                 *     count: 6,
                 *     text: '6m'
                 * }, {
                 *     type: 'ytd',
                 *     text: 'YTD'
                 * }, {
                 *     type: 'year',
                 *     count: 1,
                 *     text: '1y'
                 * }, {
                 *     type: 'all',
                 *     text: 'All'
                 * }]</pre>
                 *
                 * @sample {highstock} stock/rangeselector/datagrouping/
                 *         Data grouping by buttons
                 *
                 * @type      {Array<*>}
                 * @apioption rangeSelector.buttons
                 */
                /**
                 * How many units of the defined type the button should span. If `type`
                 * is "month" and `count` is 3, the button spans three months.
                 *
                 * @type      {number}
                 * @default   1
                 * @apioption rangeSelector.buttons.count
                 */
                /**
                 * Fires when clicking on the rangeSelector button. One parameter,
                 * event, is passed to the function, containing common event
                 * information.
                 *
                 * <pre>
                 * click: function(e) {
                 *   console.log(this);
                 * }
                 * </pre>
                 *
                 * Return false to stop default button's click action.
                 *
                 * @sample {highstock} stock/rangeselector/button-click/
                 *         Click event on the button
                 *
                 * @type      {Highcharts.RangeSelectorClickCallbackFunction}
                 * @apioption rangeSelector.buttons.events.click
                 */
                /**
                 * Additional range (in milliseconds) added to the end of the calculated
                 * time span.
                 *
                 * @sample {highstock} stock/rangeselector/min-max-offsets/
                 *         Button offsets
                 *
                 * @type      {number}
                 * @default   0
                 * @since     6.0.0
                 * @apioption rangeSelector.buttons.offsetMax
                 */
                /**
                 * Additional range (in milliseconds) added to the start of the
                 * calculated time span.
                 *
                 * @sample {highstock} stock/rangeselector/min-max-offsets/
                 *         Button offsets
                 *
                 * @type      {number}
                 * @default   0
                 * @since     6.0.0
                 * @apioption rangeSelector.buttons.offsetMin
                 */
                /**
                 * When buttons apply dataGrouping on a series, by default zooming
                 * in/out will deselect buttons and unset dataGrouping. Enable this
                 * option to keep buttons selected when extremes change.
                 *
                 * @sample {highstock} stock/rangeselector/preserve-datagrouping/
                 *         Different preserveDataGrouping settings
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     6.1.2
                 * @apioption rangeSelector.buttons.preserveDataGrouping
                 */
                /**
                 * A custom data grouping object for each button.
                 *
                 * @see [series.dataGrouping](#plotOptions.series.dataGrouping)
                 *
                 * @sample {highstock} stock/rangeselector/datagrouping/
                 *         Data grouping by range selector buttons
                 *
                 * @type      {*}
                 * @extends   plotOptions.series.dataGrouping
                 * @apioption rangeSelector.buttons.dataGrouping
                 */
                /**
                 * The text for the button itself.
                 *
                 * @type      {string}
                 * @apioption rangeSelector.buttons.text
                 */
                /**
                 * Defined the time span for the button. Can be one of `millisecond`,
                 * `second`, `minute`, `hour`, `day`, `week`, `month`, `year`, `ytd`,
                 * and `all`.
                 *
                 * @type       {Highcharts.RangeSelectorButtonTypeValue}
                 * @apioption  rangeSelector.buttons.type
                 */
                /**
                 * The space in pixels between the buttons in the range selector.
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption rangeSelector.buttonSpacing
                 */
                /**
                 * Enable or disable the range selector.
                 *
                 * @sample {highstock} stock/rangeselector/enabled/
                 *         Disable the range selector
                 *
                 * @type      {boolean}
                 * @default   true
                 * @apioption rangeSelector.enabled
                 */
                /**
                 * The vertical alignment of the rangeselector box. Allowed properties
                 * are `top`, `middle`, `bottom`.
                 *
                 * @sample {highstock} stock/rangeselector/vertical-align-middle/
                 *         Middle
                 * @sample {highstock} stock/rangeselector/vertical-align-bottom/
                 *         Bottom
                 *
                 * @type  {Highcharts.VerticalAlignValue}
                 * @since 6.0.0
                 */
                verticalAlign: 'top',
                /**
                 * A collection of attributes for the buttons. The object takes SVG
                 * attributes like `fill`, `stroke`, `stroke-width`, as well as `style`,
                 * a collection of CSS properties for the text.
                 *
                 * The object can also be extended with states, so you can set
                 * presentational options for `hover`, `select` or `disabled` button
                 * states.
                 *
                 * CSS styles for the text label.
                 *
                 * In styled mode, the buttons are styled by the
                 * `.highcharts-range-selector-buttons .highcharts-button` rule with its
                 * different states.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type {Highcharts.SVGAttributes}
                 */
                buttonTheme: {
                    /** @ignore */
                    width: 28,
                    /** @ignore */
                    height: 18,
                    /** @ignore */
                    padding: 2,
                    /** @ignore */
                    zIndex: 7 // #484, #852
                },
                /**
                 * When the rangeselector is floating, the plot area does not reserve
                 * space for it. This opens for positioning anywhere on the chart.
                 *
                 * @sample {highstock} stock/rangeselector/floating/
                 *         Placing the range selector between the plot area and the
                 *         navigator
                 *
                 * @since 6.0.0
                 */
                floating: false,
                /**
                 * The x offset of the range selector relative to its horizontal
                 * alignment within `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @since 6.0.0
                 */
                x: 0,
                /**
                 * The y offset of the range selector relative to its horizontal
                 * alignment within `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @since 6.0.0
                 */
                y: 0,
                /**
                 * Deprecated. The height of the range selector. Currently it is
                 * calculated dynamically.
                 *
                 * @deprecated
                 * @type  {number|undefined}
                 * @since 2.1.9
                 */
                height: undefined,
                /**
                 * The border color of the date input boxes.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {Highcharts.ColorString}
                 * @default   #cccccc
                 * @since     1.3.7
                 * @apioption rangeSelector.inputBoxBorderColor
                 */
                /**
                 * The pixel height of the date input boxes.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {number}
                 * @default   17
                 * @since     1.3.7
                 * @apioption rangeSelector.inputBoxHeight
                 */
                /**
                 * CSS for the container DIV holding the input boxes. Deprecated as
                 * of 1.2.5\. Use [inputPosition](#rangeSelector.inputPosition) instead.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @deprecated
                 * @type      {Highcharts.CSSObject}
                 * @apioption rangeSelector.inputBoxStyle
                 */
                /**
                 * The pixel width of the date input boxes.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {number}
                 * @default   90
                 * @since     1.3.7
                 * @apioption rangeSelector.inputBoxWidth
                 */
                /**
                 * The date format in the input boxes when not selected for editing.
                 * Defaults to `%b %e, %Y`.
                 *
                 * @sample {highstock} stock/rangeselector/input-format/
                 *         Milliseconds in the range selector
                 *
                 * @type      {string}
                 * @default   %b %e, %Y
                 * @apioption rangeSelector.inputDateFormat
                 */
                /**
                 * A custom callback function to parse values entered in the input boxes
                 * and return a valid JavaScript time as milliseconds since 1970.
                 *
                 * @sample {highstock} stock/rangeselector/input-format/
                 *         Milliseconds in the range selector
                 *
                 * @type      {Highcharts.RangeSelectorParseCallbackFunction}
                 * @since     1.3.3
                 * @apioption rangeSelector.inputDateParser
                 */
                /**
                 * The date format in the input boxes when they are selected for
                 * editing. This must be a format that is recognized by JavaScript
                 * Date.parse.
                 *
                 * @sample {highstock} stock/rangeselector/input-format/
                 *         Milliseconds in the range selector
                 *
                 * @type      {string}
                 * @default   %Y-%m-%d
                 * @apioption rangeSelector.inputEditDateFormat
                 */
                /**
                 * Enable or disable the date input boxes. Defaults to enabled when
                 * there is enough space, disabled if not (typically mobile).
                 *
                 * @sample {highstock} stock/rangeselector/input-datepicker/
                 *         Extending the input with a jQuery UI datepicker
                 *
                 * @type      {boolean}
                 * @default   true
                 * @apioption rangeSelector.inputEnabled
                 */
                /**
                 * Positioning for the input boxes. Allowed properties are `align`,
                 *  `x` and `y`.
                 *
                 * @since 1.2.4
                 */
                inputPosition: {
                    /**
                     * The alignment of the input box. Allowed properties are `left`,
                     * `center`, `right`.
                     *
                     * @sample {highstock} stock/rangeselector/input-button-position/
                     *         Alignment
                     *
                     * @type  {Highcharts.AlignValue}
                     * @since 6.0.0
                     */
                    align: 'right',
                    /**
                     * X offset of the input row.
                     */
                    x: 0,
                    /**
                     * Y offset of the input row.
                     */
                    y: 0
                },
                /**
                 * The index of the button to appear pre-selected.
                 *
                 * @type      {number}
                 * @apioption rangeSelector.selected
                 */
                /**
                 * Positioning for the button row.
                 *
                 * @since 1.2.4
                 */
                buttonPosition: {
                    /**
                     * The alignment of the input box. Allowed properties are `left`,
                     * `center`, `right`.
                     *
                     * @sample {highstock} stock/rangeselector/input-button-position/
                     *         Alignment
                     *
                     * @type  {Highcharts.AlignValue}
                     * @since 6.0.0
                     */
                    align: 'left',
                    /**
                     * X offset of the button row.
                     */
                    x: 0,
                    /**
                     * Y offset of the button row.
                     */
                    y: 0
                },
                /**
                 * CSS for the HTML inputs in the range selector.
                 *
                 * In styled mode, the inputs are styled by the
                 * `.highcharts-range-input text` rule in SVG mode, and
                 * `input.highcharts-range-selector` when active.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {Highcharts.CSSObject}
                 * @apioption rangeSelector.inputStyle
                 */
                /**
                 * CSS styles for the labels - the Zoom, From and To texts.
                 *
                 * In styled mode, the labels are styled by the
                 * `.highcharts-range-label` class.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type {Highcharts.CSSObject}
                 */
                labelStyle: {
                    /** @ignore */
                    color: '#666666'
                }
            }
        });
        defaultOptions.lang = merge(defaultOptions.lang, 
        /**
         * Language object. The language object is global and it can't be set
         * on each chart initialization. Instead, use `Highcharts.setOptions` to
         * set it before any chart is initialized.
         *
         * <pre>Highcharts.setOptions({
         *     lang: {
         *         months: [
         *             'Janvier', 'Février', 'Mars', 'Avril',
         *             'Mai', 'Juin', 'Juillet', 'Août',
         *             'Septembre', 'Octobre', 'Novembre', 'Décembre'
         *         ],
         *         weekdays: [
         *             'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
         *             'Jeudi', 'Vendredi', 'Samedi'
         *         ]
         *     }
         * });</pre>
         *
         * @optionparent lang
         */
        {
            /**
             * The text for the label for the range selector buttons.
             *
             * @product highstock gantt
             */
            rangeSelectorZoom: 'Zoom',
            /**
             * The text for the label for the "from" input box in the range
             * selector.
             *
             * @product highstock gantt
             */
            rangeSelectorFrom: 'From',
            /**
             * The text for the label for the "to" input box in the range selector.
             *
             * @product highstock gantt
             */
            rangeSelectorTo: 'To'
        });
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The range selector.
         *
         * @private
         * @class
         * @name Highcharts.RangeSelector
         * @param {Highcharts.Chart} chart
         */
        function RangeSelector(chart) {
            // Run RangeSelector
            this.init(chart);
        }
        RangeSelector.prototype = {
            /**
             * The method to run when one of the buttons in the range selectors is
             * clicked
             *
             * @private
             * @function Highcharts.RangeSelector#clickButton
             * @param {number} i
             *        The index of the button
             * @param {boolean} [redraw]
             * @return {void}
             */
            clickButton: function (i, redraw) {
                var rangeSelector = this, chart = rangeSelector.chart, rangeOptions = rangeSelector.buttonOptions[i], baseAxis = chart.xAxis[0], unionExtremes = (chart.scroller && chart.scroller.getUnionExtremes()) || baseAxis || {}, dataMin = unionExtremes.dataMin, dataMax = unionExtremes.dataMax, newMin, newMax = baseAxis && Math.round(Math.min(baseAxis.max, pick(dataMax, baseAxis.max))), // #1568
                type = rangeOptions.type, baseXAxisOptions, range = rangeOptions._range, rangeMin, minSetting, rangeSetting, ctx, ytdExtremes, dataGrouping = rangeOptions.dataGrouping;
                // chart has no data, base series is removed
                if (dataMin === null || dataMax === null) {
                    return;
                }
                // Set the fixed range before range is altered
                chart.fixedRange = range;
                // Apply dataGrouping associated to button
                if (dataGrouping) {
                    this.forcedDataGrouping = true;
                    Axis.prototype.setDataGrouping.call(baseAxis || { chart: this.chart }, dataGrouping, false);
                    this.frozenStates = rangeOptions.preserveDataGrouping;
                }
                // Apply range
                if (type === 'month' || type === 'year') {
                    if (!baseAxis) {
                        // This is set to the user options and picked up later when the
                        // axis is instantiated so that we know the min and max.
                        range = rangeOptions;
                    }
                    else {
                        ctx = {
                            range: rangeOptions,
                            max: newMax,
                            chart: chart,
                            dataMin: dataMin,
                            dataMax: dataMax
                        };
                        newMin = baseAxis.minFromRange.call(ctx);
                        if (isNumber(ctx.newMax)) {
                            newMax = ctx.newMax;
                        }
                    }
                    // Fixed times like minutes, hours, days
                }
                else if (range) {
                    newMin = Math.max(newMax - range, dataMin);
                    newMax = Math.min(newMin + range, dataMax);
                }
                else if (type === 'ytd') {
                    // On user clicks on the buttons, or a delayed action running from
                    // the beforeRender event (below), the baseAxis is defined.
                    if (baseAxis) {
                        // When "ytd" is the pre-selected button for the initial view,
                        // its calculation is delayed and rerun in the beforeRender
                        // event (below). When the series are initialized, but before
                        // the chart is rendered, we have access to the xData array
                        // (#942).
                        if (dataMax === undefined) {
                            dataMin = Number.MAX_VALUE;
                            dataMax = Number.MIN_VALUE;
                            chart.series.forEach(function (series) {
                                // reassign it to the last item
                                var xData = series.xData;
                                dataMin = Math.min(xData[0], dataMin);
                                dataMax = Math.max(xData[xData.length - 1], dataMax);
                            });
                            redraw = false;
                        }
                        ytdExtremes = rangeSelector.getYTDExtremes(dataMax, dataMin, chart.time.useUTC);
                        newMin = rangeMin = ytdExtremes.min;
                        newMax = ytdExtremes.max;
                        // "ytd" is pre-selected. We don't yet have access to processed
                        // point and extremes data (things like pointStart and pointInterval
                        // are missing), so we delay the process (#942)
                    }
                    else {
                        rangeSelector.deferredYTDClick = i;
                        return;
                    }
                }
                else if (type === 'all' && baseAxis) {
                    newMin = dataMin;
                    newMax = dataMax;
                }
                newMin += rangeOptions._offsetMin;
                newMax += rangeOptions._offsetMax;
                rangeSelector.setSelected(i);
                // Update the chart
                if (!baseAxis) {
                    // Axis not yet instanciated. Temporarily set min and range
                    // options and remove them on chart load (#4317).
                    baseXAxisOptions = splat(chart.options.xAxis)[0];
                    rangeSetting = baseXAxisOptions.range;
                    baseXAxisOptions.range = range;
                    minSetting = baseXAxisOptions.min;
                    baseXAxisOptions.min = rangeMin;
                    addEvent(chart, 'load', function resetMinAndRange() {
                        baseXAxisOptions.range = rangeSetting;
                        baseXAxisOptions.min = minSetting;
                    });
                }
                else {
                    // Existing axis object. Set extremes after render time.
                    baseAxis.setExtremes(newMin, newMax, pick(redraw, 1), null, // auto animation
                    {
                        trigger: 'rangeSelectorButton',
                        rangeSelectorButton: rangeOptions
                    });
                }
            },
            /**
             * Set the selected option. This method only sets the internal flag, it
             * doesn't update the buttons or the actual zoomed range.
             *
             * @private
             * @function Highcharts.RangeSelector#setSelected
             * @param {number} [selected]
             * @return {void}
             */
            setSelected: function (selected) {
                this.selected = this.options.selected = selected;
            },
            /**
             * The default buttons for pre-selecting time frames
             */
            defaultButtons: [{
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'ytd',
                    text: 'YTD'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            /**
             * Initialize the range selector
             *
             * @private
             * @function Highcharts.RangeSelector#init
             * @param {Highcharts.Chart} chart
             * @return {void}
             */
            init: function (chart) {
                var rangeSelector = this, options = chart.options.rangeSelector, buttonOptions = options.buttons ||
                    [].concat(rangeSelector.defaultButtons), selectedOption = options.selected, blurInputs = function () {
                    var minInput = rangeSelector.minInput, maxInput = rangeSelector.maxInput;
                    // #3274 in some case blur is not defined
                    if (minInput && minInput.blur) {
                        fireEvent(minInput, 'blur');
                    }
                    if (maxInput && maxInput.blur) {
                        fireEvent(maxInput, 'blur');
                    }
                };
                rangeSelector.chart = chart;
                rangeSelector.options = options;
                rangeSelector.buttons = [];
                rangeSelector.buttonOptions = buttonOptions;
                this.unMouseDown = addEvent(chart.container, 'mousedown', blurInputs);
                this.unResize = addEvent(chart, 'resize', blurInputs);
                // Extend the buttonOptions with actual range
                buttonOptions.forEach(rangeSelector.computeButtonRange);
                // zoomed range based on a pre-selected button index
                if (selectedOption !== undefined && buttonOptions[selectedOption]) {
                    this.clickButton(selectedOption, false);
                }
                addEvent(chart, 'load', function () {
                    // If a data grouping is applied to the current button, release it
                    // when extremes change
                    if (chart.xAxis && chart.xAxis[0]) {
                        addEvent(chart.xAxis[0], 'setExtremes', function (e) {
                            if (this.max - this.min !==
                                chart.fixedRange &&
                                e.trigger !== 'rangeSelectorButton' &&
                                e.trigger !== 'updatedData' &&
                                rangeSelector.forcedDataGrouping &&
                                !rangeSelector.frozenStates) {
                                this.setDataGrouping(false, false);
                            }
                        });
                    }
                });
            },
            /**
             * Dynamically update the range selector buttons after a new range has been
             * set
             *
             * @private
             * @function Highcharts.RangeSelector#updateButtonStates
             * @return {void}
             */
            updateButtonStates: function () {
                var rangeSelector = this, chart = this.chart, baseAxis = chart.xAxis[0], actualRange = Math.round(baseAxis.max - baseAxis.min), hasNoData = !baseAxis.hasVisibleSeries, day = 24 * 36e5, // A single day in milliseconds
                unionExtremes = (chart.scroller &&
                    chart.scroller.getUnionExtremes()) || baseAxis, dataMin = unionExtremes.dataMin, dataMax = unionExtremes.dataMax, ytdExtremes = rangeSelector.getYTDExtremes(dataMax, dataMin, chart.time.useUTC), ytdMin = ytdExtremes.min, ytdMax = ytdExtremes.max, selected = rangeSelector.selected, selectedExists = isNumber(selected), allButtonsEnabled = rangeSelector.options.allButtonsEnabled, buttons = rangeSelector.buttons;
                rangeSelector.buttonOptions.forEach(function (rangeOptions, i) {
                    var range = rangeOptions._range, type = rangeOptions.type, count = rangeOptions.count || 1, button = buttons[i], state = 0, disable, select, offsetRange = rangeOptions._offsetMax -
                        rangeOptions._offsetMin, isSelected = i === selected, 
                    // Disable buttons where the range exceeds what is allowed in
                    // the current view
                    isTooGreatRange = range >
                        dataMax - dataMin, 
                    // Disable buttons where the range is smaller than the minimum
                    // range
                    isTooSmallRange = range < baseAxis.minRange, 
                    // Do not select the YTD button if not explicitly told so
                    isYTDButNotSelected = false, 
                    // Disable the All button if we're already showing all
                    isAllButAlreadyShowingAll = false, isSameRange = range === actualRange;
                    // Months and years have a variable range so we check the extremes
                    if ((type === 'month' || type === 'year') &&
                        (actualRange + 36e5 >=
                            { month: 28, year: 365 }[type] * day * count - offsetRange) &&
                        (actualRange - 36e5 <=
                            { month: 31, year: 366 }[type] * day * count + offsetRange)) {
                        isSameRange = true;
                    }
                    else if (type === 'ytd') {
                        isSameRange = (ytdMax - ytdMin + offsetRange) === actualRange;
                        isYTDButNotSelected = !isSelected;
                    }
                    else if (type === 'all') {
                        isSameRange = (baseAxis.max - baseAxis.min >=
                            dataMax - dataMin);
                        isAllButAlreadyShowingAll = (!isSelected &&
                            selectedExists &&
                            isSameRange);
                    }
                    // The new zoom area happens to match the range for a button - mark
                    // it selected. This happens when scrolling across an ordinal gap.
                    // It can be seen in the intraday demos when selecting 1h and scroll
                    // across the night gap.
                    disable = (!allButtonsEnabled &&
                        (isTooGreatRange ||
                            isTooSmallRange ||
                            isAllButAlreadyShowingAll ||
                            hasNoData));
                    select = ((isSelected && isSameRange) ||
                        (isSameRange && !selectedExists && !isYTDButNotSelected) ||
                        (isSelected && rangeSelector.frozenStates));
                    if (disable) {
                        state = 3;
                    }
                    else if (select) {
                        selectedExists = true; // Only one button can be selected
                        state = 2;
                    }
                    // If state has changed, update the button
                    if (button.state !== state) {
                        button.setState(state);
                        // Reset (#9209)
                        if (state === 0 && selected === i) {
                            rangeSelector.setSelected(null);
                        }
                    }
                });
            },
            /**
             * Compute and cache the range for an individual button
             *
             * @private
             * @function Highcharts.RangeSelector#computeButtonRange
             * @param {Highcharts.RangeSelectorButtonsOptions} rangeOptions
             * @return {void}
             */
            computeButtonRange: function (rangeOptions) {
                var type = rangeOptions.type, count = rangeOptions.count || 1, 
                // these time intervals have a fixed number of milliseconds, as
                // opposed to month, ytd and year
                fixedTimes = {
                    millisecond: 1,
                    second: 1000,
                    minute: 60 * 1000,
                    hour: 3600 * 1000,
                    day: 24 * 3600 * 1000,
                    week: 7 * 24 * 3600 * 1000
                };
                // Store the range on the button object
                if (fixedTimes[type]) {
                    rangeOptions._range = fixedTimes[type] * count;
                }
                else if (type === 'month' || type === 'year') {
                    rangeOptions._range = {
                        month: 30,
                        year: 365
                    }[type] * 24 * 36e5 * count;
                }
                rangeOptions._offsetMin = pick(rangeOptions.offsetMin, 0);
                rangeOptions._offsetMax = pick(rangeOptions.offsetMax, 0);
                rangeOptions._range +=
                    rangeOptions._offsetMax - rangeOptions._offsetMin;
            },
            /**
             * Set the internal and displayed value of a HTML input for the dates
             *
             * @private
             * @function Highcharts.RangeSelector#setInputValue
             * @param {string} name
             * @param {number} [inputTime]
             * @return {void}
             */
            setInputValue: function (name, inputTime) {
                var options = this.chart.options.rangeSelector, time = this.chart.time, input = this[name + 'Input'];
                if (defined(inputTime)) {
                    input.previousValue = input.HCTime;
                    input.HCTime = inputTime;
                }
                input.value = time.dateFormat(options.inputEditDateFormat || '%Y-%m-%d', input.HCTime);
                this[name + 'DateBox'].attr({
                    text: time.dateFormat(options.inputDateFormat || '%b %e, %Y', input.HCTime)
                });
            },
            /**
             * @private
             * @function Highcharts.RangeSelector#showInput
             * @param {string} name
             * @return {void}
             */
            showInput: function (name) {
                var inputGroup = this.inputGroup, dateBox = this[name + 'DateBox'];
                css(this[name + 'Input'], {
                    left: (inputGroup.translateX + dateBox.x) + 'px',
                    top: inputGroup.translateY + 'px',
                    width: (dateBox.width - 2) + 'px',
                    height: (dateBox.height - 2) + 'px',
                    border: '2px solid silver'
                });
            },
            /**
             * @private
             * @function Highcharts.RangeSelector#hideInput
             * @param {string} name
             * @return {void}
             */
            hideInput: function (name) {
                css(this[name + 'Input'], {
                    border: 0,
                    width: '1px',
                    height: '1px'
                });
                this.setInputValue(name);
            },
            /**
             * Draw either the 'from' or the 'to' HTML input box of the range selector
             *
             * @private
             * @function Highcharts.RangeSelector#drawInput
             * @param {string} name
             * @return {void}
             */
            drawInput: function (name) {
                var rangeSelector = this, chart = rangeSelector.chart, chartStyle = chart.renderer.style || {}, renderer = chart.renderer, options = chart.options.rangeSelector, lang = defaultOptions.lang, div = rangeSelector.div, isMin = name === 'min', input, label, dateBox, inputGroup = this.inputGroup;
                /**
                 * @private
                 */
                function updateExtremes() {
                    var inputValue = input.value, value = (options.inputDateParser || Date.parse)(inputValue), chartAxis = chart.xAxis[0], dataAxis = chart.scroller && chart.scroller.xAxis ?
                        chart.scroller.xAxis :
                        chartAxis, dataMin = dataAxis.dataMin, dataMax = dataAxis.dataMax;
                    if (value !== input.previousValue) {
                        input.previousValue = value;
                        // If the value isn't parsed directly to a value by the
                        // browser's Date.parse method, like YYYY-MM-DD in IE, try
                        // parsing it a different way
                        if (!isNumber(value)) {
                            value = inputValue.split('-');
                            value = Date.UTC(pInt(value[0]), pInt(value[1]) - 1, pInt(value[2]));
                        }
                        if (isNumber(value)) {
                            // Correct for timezone offset (#433)
                            if (!chart.time.useUTC) {
                                value =
                                    value + new Date().getTimezoneOffset() * 60 * 1000;
                            }
                            // Validate the extremes. If it goes beyound the data min or
                            // max, use the actual data extreme (#2438).
                            if (isMin) {
                                if (value > rangeSelector.maxInput.HCTime) {
                                    value = undefined;
                                }
                                else if (value < dataMin) {
                                    value = dataMin;
                                }
                            }
                            else {
                                if (value < rangeSelector.minInput.HCTime) {
                                    value = undefined;
                                }
                                else if (value > dataMax) {
                                    value = dataMax;
                                }
                            }
                            // Set the extremes
                            if (value !== undefined) { // @todo typof undefined
                                chartAxis.setExtremes(isMin ? value : chartAxis.min, isMin ? chartAxis.max : value, undefined, undefined, { trigger: 'rangeSelectorInput' });
                            }
                        }
                    }
                }
                // Create the text label
                this[name + 'Label'] = label = renderer
                    .label(lang[isMin ? 'rangeSelectorFrom' : 'rangeSelectorTo'], this.inputGroup.offset)
                    .addClass('highcharts-range-label')
                    .attr({
                    padding: 2
                })
                    .add(inputGroup);
                inputGroup.offset += label.width + 5;
                // Create an SVG label that shows updated date ranges and and records
                // click events that bring in the HTML input.
                this[name + 'DateBox'] = dateBox = renderer
                    .label('', inputGroup.offset)
                    .addClass('highcharts-range-input')
                    .attr({
                    padding: 2,
                    width: options.inputBoxWidth || 90,
                    height: options.inputBoxHeight || 17,
                    'text-align': 'center'
                })
                    .on('click', function () {
                    // If it is already focused, the onfocus event doesn't fire
                    // (#3713)
                    rangeSelector.showInput(name);
                    rangeSelector[name + 'Input'].focus();
                });
                if (!chart.styledMode) {
                    dateBox.attr({
                        stroke: options.inputBoxBorderColor || '#cccccc',
                        'stroke-width': 1
                    });
                }
                dateBox.add(inputGroup);
                inputGroup.offset += dateBox.width + (isMin ? 10 : 0);
                // Create the HTML input element. This is rendered as 1x1 pixel then set
                // to the right size when focused.
                this[name + 'Input'] = input = createElement('input', {
                    name: name,
                    className: 'highcharts-range-selector',
                    type: 'text'
                }, {
                    top: chart.plotTop + 'px' // prevent jump on focus in Firefox
                }, div);
                if (!chart.styledMode) {
                    // Styles
                    label.css(merge(chartStyle, options.labelStyle));
                    dateBox.css(merge({
                        color: '#333333'
                    }, chartStyle, options.inputStyle));
                    css(input, extend({
                        position: 'absolute',
                        border: 0,
                        width: '1px',
                        height: '1px',
                        padding: 0,
                        textAlign: 'center',
                        fontSize: chartStyle.fontSize,
                        fontFamily: chartStyle.fontFamily,
                        top: '-9999em' // #4798
                    }, options.inputStyle));
                }
                // Blow up the input box
                input.onfocus = function () {
                    rangeSelector.showInput(name);
                };
                // Hide away the input box
                input.onblur = function () {
                    // update extermes only when inputs are active
                    if (input === H.doc.activeElement) { // Only when focused
                        // Update also when no `change` event is triggered, like when
                        // clicking inside the SVG (#4710)
                        updateExtremes();
                    }
                    // #10404 - move hide and blur outside focus
                    rangeSelector.hideInput(name);
                    input.blur(); // #4606
                };
                // handle changes in the input boxes
                input.onchange = updateExtremes;
                input.onkeypress = function (event) {
                    // IE does not fire onchange on enter
                    if (event.keyCode === 13) {
                        updateExtremes();
                    }
                };
            },
            /**
             * Get the position of the range selector buttons and inputs. This can be
             * overridden from outside for custom positioning.
             *
             * @private
             * @function Highcharts.RangeSelector#getPosition
             *
             * @return {Highcharts.Dictionary<number>}
             */
            getPosition: function () {
                var chart = this.chart, options = chart.options.rangeSelector, top = options.verticalAlign === 'top' ?
                    chart.plotTop - chart.axisOffset[0] :
                    0; // set offset only for varticalAlign top
                return {
                    buttonTop: top + options.buttonPosition.y,
                    inputTop: top + options.inputPosition.y - 10
                };
            },
            /**
             * Get the extremes of YTD. Will choose dataMax if its value is lower than
             * the current timestamp. Will choose dataMin if its value is higher than
             * the timestamp for the start of current year.
             *
             * @private
             * @function Highcharts.RangeSelector#getYTDExtremes
             *
             * @param {number} dataMax
             *
             * @param {number} dataMin
             *
             * @return {*}
             *         Returns min and max for the YTD
             */
            getYTDExtremes: function (dataMax, dataMin, useUTC) {
                var time = this.chart.time, min, now = new time.Date(dataMax), year = time.get('FullYear', now), startOfYear = useUTC ?
                    time.Date.UTC(year, 0, 1) : // eslint-disable-line new-cap
                    +new time.Date(year, 0, 1);
                min = Math.max(dataMin || 0, startOfYear);
                now = now.getTime();
                return {
                    max: Math.min(dataMax || now, now),
                    min: min
                };
            },
            /**
             * Render the range selector including the buttons and the inputs. The first
             * time render is called, the elements are created and positioned. On
             * subsequent calls, they are moved and updated.
             *
             * @private
             * @function Highcharts.RangeSelector#render
             * @param {number} [min]
             *        X axis minimum
             * @param {number} [max]
             *        X axis maximum
             * @return {void}
             */
            render: function (min, max) {
                var rangeSelector = this, chart = rangeSelector.chart, renderer = chart.renderer, container = chart.container, chartOptions = chart.options, navButtonOptions = (chartOptions.exporting &&
                    chartOptions.exporting.enabled !== false &&
                    chartOptions.navigation &&
                    chartOptions.navigation.buttonOptions), lang = defaultOptions.lang, div = rangeSelector.div, options = chartOptions.rangeSelector, 
                // Place inputs above the container
                inputsZIndex = pick(chartOptions.chart.style &&
                    chartOptions.chart.style.zIndex, 0) + 1, floating = options.floating, buttons = rangeSelector.buttons, inputGroup = rangeSelector.inputGroup, buttonTheme = options.buttonTheme, buttonPosition = options.buttonPosition, inputPosition = options.inputPosition, inputEnabled = options.inputEnabled, states = buttonTheme && buttonTheme.states, plotLeft = chart.plotLeft, buttonLeft, buttonGroup = rangeSelector.buttonGroup, group, groupHeight, rendered = rangeSelector.rendered, verticalAlign = rangeSelector.options.verticalAlign, legend = chart.legend, legendOptions = legend && legend.options, buttonPositionY = buttonPosition.y, inputPositionY = inputPosition.y, animate = rendered || false, verb = animate ? 'animate' : 'attr', exportingX = 0, alignTranslateY, legendHeight, minPosition, translateY = 0, translateX;
                if (options.enabled === false) {
                    return;
                }
                // create the elements
                if (!rendered) {
                    rangeSelector.group = group = renderer.g('range-selector-group')
                        .attr({
                        zIndex: 7
                    })
                        .add();
                    rangeSelector.buttonGroup = buttonGroup =
                        renderer.g('range-selector-buttons').add(group);
                    rangeSelector.zoomText = renderer
                        .text(lang.rangeSelectorZoom, 0, 15)
                        .add(buttonGroup);
                    if (!chart.styledMode) {
                        rangeSelector.zoomText.css(options.labelStyle);
                        buttonTheme['stroke-width'] =
                            pick(buttonTheme['stroke-width'], 0);
                    }
                    rangeSelector.buttonOptions.forEach(function (rangeOptions, i) {
                        buttons[i] = renderer
                            .button(rangeOptions.text, 0, 0, function (e) {
                            // extract events from button object and call
                            var buttonEvents = (rangeOptions.events &&
                                rangeOptions.events.click), callDefaultEvent;
                            if (buttonEvents) {
                                callDefaultEvent =
                                    buttonEvents.call(rangeOptions, e);
                            }
                            if (callDefaultEvent !== false) {
                                rangeSelector.clickButton(i);
                            }
                            rangeSelector.isActive = true;
                        }, buttonTheme, states && states.hover, states && states.select, states && states.disabled)
                            .attr({
                            'text-align': 'center'
                        })
                            .add(buttonGroup);
                    });
                    // first create a wrapper outside the container in order to make
                    // the inputs work and make export correct
                    if (inputEnabled !== false) {
                        rangeSelector.div = div = createElement('div', null, {
                            position: 'relative',
                            height: 0,
                            zIndex: inputsZIndex
                        });
                        container.parentNode.insertBefore(div, container);
                        // Create the group to keep the inputs
                        rangeSelector.inputGroup = inputGroup =
                            renderer.g('input-group').add(group);
                        inputGroup.offset = 0;
                        rangeSelector.drawInput('min');
                        rangeSelector.drawInput('max');
                    }
                }
                // #8769, allow dynamically updating margins
                rangeSelector.zoomText[verb]({
                    x: pick(plotLeft + buttonPosition.x, plotLeft)
                });
                // button start position
                buttonLeft = pick(plotLeft + buttonPosition.x, plotLeft) +
                    rangeSelector.zoomText.getBBox().width + 5;
                rangeSelector.buttonOptions.forEach(function (rangeOptions, i) {
                    buttons[i][verb]({ x: buttonLeft });
                    // increase button position for the next button
                    buttonLeft += buttons[i].width + pick(options.buttonSpacing, 5);
                });
                plotLeft = chart.plotLeft - chart.spacing[3];
                rangeSelector.updateButtonStates();
                // detect collisiton with exporting
                if (navButtonOptions &&
                    this.titleCollision(chart) &&
                    verticalAlign === 'top' &&
                    buttonPosition.align === 'right' && ((buttonPosition.y +
                    buttonGroup.getBBox().height - 12) <
                    ((navButtonOptions.y || 0) +
                        navButtonOptions.height))) {
                    exportingX = -40;
                }
                if (buttonPosition.align === 'left') {
                    translateX = buttonPosition.x - chart.spacing[3];
                }
                else if (buttonPosition.align === 'right') {
                    translateX =
                        buttonPosition.x + exportingX - chart.spacing[1];
                }
                // align button group
                buttonGroup.align({
                    y: buttonPosition.y,
                    width: buttonGroup.getBBox().width,
                    align: buttonPosition.align,
                    x: translateX
                }, true, chart.spacingBox);
                // skip animation
                rangeSelector.group.placed = animate;
                rangeSelector.buttonGroup.placed = animate;
                if (inputEnabled !== false) {
                    var inputGroupX, inputGroupWidth, buttonGroupX, buttonGroupWidth;
                    // detect collision with exporting
                    if (navButtonOptions &&
                        this.titleCollision(chart) &&
                        verticalAlign === 'top' &&
                        inputPosition.align === 'right' && ((inputPosition.y -
                        inputGroup.getBBox().height - 12) <
                        ((navButtonOptions.y || 0) +
                            navButtonOptions.height +
                            chart.spacing[0]))) {
                        exportingX = -40;
                    }
                    else {
                        exportingX = 0;
                    }
                    if (inputPosition.align === 'left') {
                        translateX = plotLeft;
                    }
                    else if (inputPosition.align === 'right') {
                        translateX = -Math.max(chart.axisOffset[1], -exportingX);
                    }
                    // Update the alignment to the updated spacing box
                    inputGroup.align({
                        y: inputPosition.y,
                        width: inputGroup.getBBox().width,
                        align: inputPosition.align,
                        // fix wrong getBBox() value on right align
                        x: inputPosition.x + translateX - 2
                    }, true, chart.spacingBox);
                    // detect collision
                    inputGroupX = (inputGroup.alignAttr.translateX +
                        inputGroup.alignOptions.x -
                        exportingX +
                        // getBBox for detecing left margin
                        inputGroup.getBBox().x +
                        // 2px padding to not overlap input and label
                        2);
                    inputGroupWidth = inputGroup.alignOptions.width;
                    buttonGroupX = buttonGroup.alignAttr.translateX +
                        buttonGroup.getBBox().x;
                    // 20 is minimal spacing between elements
                    buttonGroupWidth = buttonGroup.getBBox().width + 20;
                    if ((inputPosition.align ===
                        buttonPosition.align) || ((buttonGroupX + buttonGroupWidth > inputGroupX) &&
                        (inputGroupX + inputGroupWidth > buttonGroupX) &&
                        (buttonPositionY <
                            (inputPositionY +
                                inputGroup.getBBox().height)))) {
                        inputGroup.attr({
                            translateX: inputGroup.alignAttr.translateX +
                                (chart.axisOffset[1] >= -exportingX ? 0 : -exportingX),
                            translateY: inputGroup.alignAttr.translateY +
                                buttonGroup.getBBox().height + 10
                        });
                    }
                    // Set or reset the input values
                    rangeSelector.setInputValue('min', min);
                    rangeSelector.setInputValue('max', max);
                    // skip animation
                    rangeSelector.inputGroup.placed = animate;
                }
                // vertical align
                rangeSelector.group.align({
                    verticalAlign: verticalAlign
                }, true, chart.spacingBox);
                // set position
                groupHeight =
                    rangeSelector.group.getBBox().height + 20; // # 20 padding
                alignTranslateY =
                    rangeSelector.group.alignAttr.translateY;
                // calculate bottom position
                if (verticalAlign === 'bottom') {
                    legendHeight = (legendOptions &&
                        legendOptions.verticalAlign === 'bottom' &&
                        legendOptions.enabled &&
                        !legendOptions.floating ?
                        legend.legendHeight + pick(legendOptions.margin, 10) :
                        0);
                    groupHeight = groupHeight + legendHeight - 20;
                    translateY = (alignTranslateY -
                        groupHeight -
                        (floating ? 0 : options.y) -
                        (chart.titleOffset ? chart.titleOffset[2] : 0) -
                        10 // 10 spacing
                    );
                }
                if (verticalAlign === 'top') {
                    if (floating) {
                        translateY = 0;
                    }
                    if (chart.titleOffset && chart.titleOffset[0]) {
                        translateY = chart.titleOffset[0];
                    }
                    translateY += ((chart.margin[0] - chart.spacing[0]) || 0);
                }
                else if (verticalAlign === 'middle') {
                    if (inputPositionY === buttonPositionY) {
                        if (inputPositionY < 0) {
                            translateY = alignTranslateY + minPosition;
                        }
                        else {
                            translateY = alignTranslateY;
                        }
                    }
                    else if (inputPositionY || buttonPositionY) {
                        if (inputPositionY < 0 ||
                            buttonPositionY < 0) {
                            translateY -= Math.min(inputPositionY, buttonPositionY);
                        }
                        else {
                            translateY =
                                alignTranslateY - groupHeight + minPosition;
                        }
                    }
                }
                rangeSelector.group.translate(options.x, options.y + Math.floor(translateY));
                // translate HTML inputs
                if (inputEnabled !== false) {
                    rangeSelector.minInput.style.marginTop =
                        rangeSelector.group.translateY + 'px';
                    rangeSelector.maxInput.style.marginTop =
                        rangeSelector.group.translateY + 'px';
                }
                rangeSelector.rendered = true;
            },
            /**
             * Extracts height of range selector
             *
             * @private
             * @function Highcharts.RangeSelector#getHeight
             * @return {number}
             *         Returns rangeSelector height
             */
            getHeight: function () {
                var rangeSelector = this, options = rangeSelector.options, rangeSelectorGroup = rangeSelector.group, inputPosition = options.inputPosition, buttonPosition = options.buttonPosition, yPosition = options.y, buttonPositionY = buttonPosition.y, inputPositionY = inputPosition.y, rangeSelectorHeight = 0, minPosition;
                if (options.height) {
                    return options.height;
                }
                rangeSelectorHeight = rangeSelectorGroup ?
                    // 13px to keep back compatibility
                    (rangeSelectorGroup.getBBox(true).height) + 13 +
                        yPosition :
                    0;
                minPosition = Math.min(inputPositionY, buttonPositionY);
                if ((inputPositionY < 0 && buttonPositionY < 0) ||
                    (inputPositionY > 0 && buttonPositionY > 0)) {
                    rangeSelectorHeight += Math.abs(minPosition);
                }
                return rangeSelectorHeight;
            },
            /**
             * Detect collision with title or subtitle
             *
             * @private
             * @function Highcharts.RangeSelector#titleCollision
             *
             * @param {Highcharts.Chart} chart
             *
             * @return {boolean}
             *         Returns collision status
             */
            titleCollision: function (chart) {
                return !(chart.options.title.text ||
                    chart.options.subtitle.text);
            },
            /**
             * Update the range selector with new options
             *
             * @private
             * @function Highcharts.RangeSelector#update
             * @param {Highcharts.RangeSelectorOptions} options
             * @return {void}
             */
            update: function (options) {
                var chart = this.chart;
                merge(true, chart.options.rangeSelector, options);
                this.destroy();
                this.init(chart);
                chart.rangeSelector.render();
            },
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.RangeSelector#destroy
             */
            destroy: function () {
                var rSelector = this, minInput = rSelector.minInput, maxInput = rSelector.maxInput;
                rSelector.unMouseDown();
                rSelector.unResize();
                // Destroy elements in collections
                destroyObjectProperties(rSelector.buttons);
                // Clear input element events
                if (minInput) {
                    minInput.onfocus = minInput.onblur = minInput.onchange = null;
                }
                if (maxInput) {
                    maxInput.onfocus = maxInput.onblur = maxInput.onchange = null;
                }
                // Destroy HTML and SVG elements
                objectEach(rSelector, function (val, key) {
                    if (val && key !== 'chart') {
                        if (val.destroy) {
                            // SVGElement
                            val.destroy();
                        }
                        else if (val.nodeType) {
                            // HTML element
                            discardElement(this[key]);
                        }
                    }
                    if (val !== RangeSelector.prototype[key]) {
                        rSelector[key] = null;
                    }
                }, this);
            }
        };
        /**
         * Get the axis min value based on the range option and the current max. For
         * stock charts this is extended via the {@link RangeSelector} so that if the
         * selected range is a multiple of months or years, it is compensated for
         * various month lengths.
         *
         * @private
         * @function Highcharts.Axis#minFromRange
         * @return {number|undefined}
         *         The new minimum value.
         */
        Axis.prototype.minFromRange = function () {
            var rangeOptions = this.range, type = rangeOptions.type, timeName = {
                month: 'Month',
                year: 'FullYear'
            }[type], min, max = this.max, dataMin, range, time = this.chart.time, 
            // Get the true range from a start date
            getTrueRange = function (base, count) {
                var date = new time.Date(base), basePeriod = time.get(timeName, date);
                time.set(timeName, date, basePeriod + count);
                if (basePeriod === time.get(timeName, date)) {
                    time.set('Date', date, 0); // #6537
                }
                return date.getTime() - base;
            };
            if (isNumber(rangeOptions)) {
                min = max - rangeOptions;
                range = rangeOptions;
            }
            else {
                min = max + getTrueRange(max, -rangeOptions.count);
                // Let the fixedRange reflect initial settings (#5930)
                if (this.chart) {
                    this.chart.fixedRange = max - min;
                }
            }
            dataMin = pick(this.dataMin, Number.MIN_VALUE);
            if (!isNumber(min)) {
                min = dataMin;
            }
            if (min <= dataMin) {
                min = dataMin;
                if (range === undefined) { // #4501
                    range = getTrueRange(min, rangeOptions.count);
                }
                this.newMax = Math.min(min + range, this.dataMax);
            }
            if (!isNumber(max)) {
                min = undefined;
            }
            return min;
        };
        if (!H.RangeSelector) {
            // Initialize rangeselector for stock charts
            addEvent(Chart, 'afterGetContainer', function () {
                if (this.options.rangeSelector.enabled) {
                    this.rangeSelector = new RangeSelector(this);
                }
            });
            addEvent(Chart, 'beforeRender', function () {
                var chart = this, axes = chart.axes, rangeSelector = chart.rangeSelector, verticalAlign;
                if (rangeSelector) {
                    if (isNumber(rangeSelector.deferredYTDClick)) {
                        rangeSelector.clickButton(rangeSelector.deferredYTDClick);
                        delete rangeSelector.deferredYTDClick;
                    }
                    axes.forEach(function (axis) {
                        axis.updateNames();
                        axis.setScale();
                    });
                    chart.getAxisMargins();
                    rangeSelector.render();
                    verticalAlign = rangeSelector.options.verticalAlign;
                    if (!rangeSelector.options.floating) {
                        if (verticalAlign === 'bottom') {
                            this.extraBottomMargin = true;
                        }
                        else if (verticalAlign !== 'middle') {
                            this.extraTopMargin = true;
                        }
                    }
                }
            });
            addEvent(Chart, 'update', function (e) {
                var chart = this, options = e.options, optionsRangeSelector = options.rangeSelector, rangeSelector = chart.rangeSelector, verticalAlign, extraBottomMarginWas = this.extraBottomMargin, extraTopMarginWas = this.extraTopMargin;
                if (optionsRangeSelector &&
                    optionsRangeSelector.enabled &&
                    !defined(rangeSelector)) {
                    this.options.rangeSelector.enabled = true;
                    this.rangeSelector = new RangeSelector(this);
                }
                this.extraBottomMargin = false;
                this.extraTopMargin = false;
                if (rangeSelector) {
                    rangeSelector.render();
                    verticalAlign = (optionsRangeSelector &&
                        optionsRangeSelector.verticalAlign) || (rangeSelector.options && rangeSelector.options.verticalAlign);
                    if (!rangeSelector.options.floating) {
                        if (verticalAlign === 'bottom') {
                            this.extraBottomMargin = true;
                        }
                        else if (verticalAlign !== 'middle') {
                            this.extraTopMargin = true;
                        }
                    }
                    if (this.extraBottomMargin !== extraBottomMarginWas ||
                        this.extraTopMargin !== extraTopMarginWas) {
                        this.isDirtyBox = true;
                    }
                }
            });
            addEvent(Chart, 'render', function () {
                var chart = this, rangeSelector = chart.rangeSelector, verticalAlign;
                if (rangeSelector && !rangeSelector.options.floating) {
                    rangeSelector.render();
                    verticalAlign = rangeSelector.options.verticalAlign;
                    if (verticalAlign === 'bottom') {
                        this.extraBottomMargin = true;
                    }
                    else if (verticalAlign !== 'middle') {
                        this.extraTopMargin = true;
                    }
                }
            });
            addEvent(Chart, 'getMargins', function () {
                var rangeSelector = this.rangeSelector, rangeSelectorHeight;
                if (rangeSelector) {
                    rangeSelectorHeight = rangeSelector.getHeight();
                    if (this.extraTopMargin) {
                        this.plotTop += rangeSelectorHeight;
                    }
                    if (this.extraBottomMargin) {
                        this.marginBottom += rangeSelectorHeight;
                    }
                }
            });
            Chart.prototype.callbacks.push(function (chart) {
                var extremes, rangeSelector = chart.rangeSelector, unbindRender, unbindSetExtremes;
                /**
                 * @private
                 */
                function renderRangeSelector() {
                    extremes = chart.xAxis[0].getExtremes();
                    if (isNumber(extremes.min)) {
                        rangeSelector.render(extremes.min, extremes.max);
                    }
                }
                if (rangeSelector) {
                    // redraw the scroller on setExtremes
                    unbindSetExtremes = addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
                        rangeSelector.render(e.min, e.max);
                    });
                    // redraw the scroller chart resize
                    unbindRender = addEvent(chart, 'redraw', renderRangeSelector);
                    // do it now
                    renderRangeSelector();
                }
                // Remove resize/afterSetExtremes at chart destroy
                addEvent(chart, 'destroy', function destroyEvents() {
                    if (rangeSelector) {
                        unbindRender();
                        unbindSetExtremes();
                    }
                });
            });
            H.RangeSelector = RangeSelector;
        }

    });
    _registerModule(_modules, 'parts/Navigator.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined, erase = U.erase, isArray = U.isArray, isNumber = U.isNumber, splat = U.splat;
        var addEvent = H.addEvent, Axis = H.Axis, Chart = H.Chart, color = H.color, defaultOptions = H.defaultOptions, destroyObjectProperties = H.destroyObjectProperties, extend = H.extend, hasTouch = H.hasTouch, isTouchDevice = H.isTouchDevice, merge = H.merge, pick = H.pick, removeEvent = H.removeEvent, Scrollbar = H.Scrollbar, Series = H.Series, seriesTypes = H.seriesTypes, defaultSeriesType, 
        // Finding the min or max of a set of variables where we don't know if they
        // are defined, is a pattern that is repeated several places in Highcharts.
        // Consider making this a global utility method.
        numExt = function (extreme) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var numbers = [].filter.call(args, isNumber);
            if (numbers.length) {
                return Math[extreme].apply(0, numbers);
            }
        };
        defaultSeriesType = seriesTypes.areaspline === undefined ?
            'line' :
            'areaspline';
        extend(defaultOptions, {
            /**
             * Maximum range which can be set using the navigator's handles.
             * Opposite of [xAxis.minRange](#xAxis.minRange).
             *
             * @sample {highstock} stock/navigator/maxrange/
             *         Defined max and min range
             *
             * @type      {number}
             * @since     6.0.0
             * @product   highstock gantt
             * @apioption xAxis.maxRange
             */
            /**
             * The navigator is a small series below the main series, displaying
             * a view of the entire data set. It provides tools to zoom in and
             * out on parts of the data as well as panning across the dataset.
             *
             * @product      highstock gantt
             * @optionparent navigator
             */
            navigator: {
                /**
                 * Whether the navigator and scrollbar should adapt to updated data
                 * in the base X axis. When loading data async, as in the demo below,
                 * this should be `false`. Otherwise new data will trigger navigator
                 * redraw, which will cause unwanted looping. In the demo below, the
                 * data in the navigator is set only once. On navigating, only the main
                 * chart content is updated.
                 *
                 * @sample {highstock} stock/demo/lazy-loading/
                 *         Set to false with async data loading
                 *
                 * @type      {boolean}
                 * @default   true
                 * @apioption navigator.adaptToUpdatedData
                 */
                /**
                 * An integer identifying the index to use for the base series, or a
                 * string representing the id of the series.
                 *
                 * **Note**: As of Highcharts 5.0, this is now a deprecated option.
                 * Prefer [series.showInNavigator](#plotOptions.series.showInNavigator).
                 *
                 * @see [series.showInNavigator](#plotOptions.series.showInNavigator)
                 *
                 * @deprecated
                 * @type      {number|string}
                 * @default   0
                 * @apioption navigator.baseSeries
                 */
                /**
                 * Enable or disable the navigator.
                 *
                 * @sample {highstock} stock/navigator/enabled/
                 *         Disable the navigator
                 *
                 * @type      {boolean}
                 * @default   true
                 * @apioption navigator.enabled
                 */
                /**
                 * When the chart is inverted, whether to draw the navigator on the
                 * opposite side.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     5.0.8
                 * @apioption navigator.opposite
                 */
                /**
                 * The height of the navigator.
                 *
                 * @sample {highstock} stock/navigator/height/
                 *         A higher navigator
                 */
                height: 40,
                /**
                 * The distance from the nearest element, the X axis or X axis labels.
                 *
                 * @sample {highstock} stock/navigator/margin/
                 *         A margin of 2 draws the navigator closer to the X axis labels
                 */
                margin: 25,
                /**
                 * Whether the mask should be inside the range marking the zoomed
                 * range, or outside. In Highstock 1.x it was always `false`.
                 *
                 * @sample {highstock} stock/navigator/maskinside-false/
                 *         False, mask outside
                 *
                 * @since   2.0
                 */
                maskInside: true,
                /**
                 * Options for the handles for dragging the zoomed area.
                 *
                 * @sample {highstock} stock/navigator/handles/
                 *         Colored handles
                 */
                handles: {
                    /**
                     * Width for handles.
                     *
                     * @sample {highstock} stock/navigator/styled-handles/
                     *         Styled handles
                     *
                     * @since   6.0.0
                     */
                    width: 7,
                    /**
                     * Height for handles.
                     *
                     * @sample {highstock} stock/navigator/styled-handles/
                     *         Styled handles
                     *
                     * @since   6.0.0
                     */
                    height: 15,
                    /**
                     * Array to define shapes of handles. 0-index for left, 1-index for
                     * right.
                     *
                     * Additionally, the URL to a graphic can be given on this form:
                     * `url(graphic.png)`. Note that for the image to be applied to
                     * exported charts, its URL needs to be accessible by the export
                     * server.
                     *
                     * Custom callbacks for symbol path generation can also be added to
                     * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
                     * used by its method name, as shown in the demo.
                     *
                     * @sample {highstock} stock/navigator/styled-handles/
                     *         Styled handles
                     *
                     * @type    {Array<string>}
                     * @default ["navigator-handle", "navigator-handle"]
                     * @since   6.0.0
                     */
                    symbols: ['navigator-handle', 'navigator-handle'],
                    /**
                     * Allows to enable/disable handles.
                     *
                     * @since   6.0.0
                     */
                    enabled: true,
                    /**
                     * The width for the handle border and the stripes inside.
                     *
                     * @sample {highstock} stock/navigator/styled-handles/
                     *         Styled handles
                     *
                     * @since     6.0.0
                     * @apioption navigator.handles.lineWidth
                     */
                    lineWidth: 1,
                    /**
                     * The fill for the handle.
                     *
                     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    backgroundColor: '#f2f2f2',
                    /**
                     * The stroke for the handle border and the stripes inside.
                     *
                     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    borderColor: '#999999'
                },
                /**
                 * The color of the mask covering the areas of the navigator series
                 * that are currently not visible in the main series. The default
                 * color is bluish with an opacity of 0.3 to see the series below.
                 *
                 * @see In styled mode, the mask is styled with the
                 *      `.highcharts-navigator-mask` and
                 *      `.highcharts-navigator-mask-inside` classes.
                 *
                 * @sample {highstock} stock/navigator/maskfill/
                 *         Blue, semi transparent mask
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default rgba(102,133,194,0.3)
                 */
                maskFill: color('#6685c2').setOpacity(0.3).get(),
                /**
                 * The color of the line marking the currently zoomed area in the
                 * navigator.
                 *
                 * @sample {highstock} stock/navigator/outline/
                 *         2px blue outline
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default #cccccc
                 */
                outlineColor: '#cccccc',
                /**
                 * The width of the line marking the currently zoomed area in the
                 * navigator.
                 *
                 * @see In styled mode, the outline stroke width is set with the
                 *      `.highcharts-navigator-outline` class.
                 *
                 * @sample {highstock} stock/navigator/outline/
                 *         2px blue outline
                 *
                 * @type    {number}
                 */
                outlineWidth: 1,
                /**
                 * Options for the navigator series. Available options are the same
                 * as any series, documented at [plotOptions](#plotOptions.series)
                 * and [series](#series).
                 *
                 * Unless data is explicitly defined on navigator.series, the data
                 * is borrowed from the first series in the chart.
                 *
                 * Default series options for the navigator series are:
                 *
                 * <pre>series: {
                 *     type: 'areaspline',
                 *     fillOpacity: 0.05,
                 *     dataGrouping: {
                 *         smoothed: true
                 *     },
                 *     lineWidth: 1,
                 *     marker: {
                 *         enabled: false
                 *     }
                 * }</pre>
                 *
                 * @see In styled mode, the navigator series is styled with the
                 *      `.highcharts-navigator-series` class.
                 *
                 * @sample {highstock} stock/navigator/series-data/
                 *         Using a separate data set for the navigator
                 * @sample {highstock} stock/navigator/series/
                 *         A green navigator series
                 *
                 * @type {*|Highcharts.SeriesOptionsType}
                 */
                series: {
                    /**
                     * The type of the navigator series. Defaults to `areaspline` if
                     * defined, otherwise `line`.
                     *
                     * @type    {string}
                     * @default areaspline
                     */
                    type: defaultSeriesType,
                    /**
                     * The fill opacity of the navigator series.
                     */
                    fillOpacity: 0.05,
                    /**
                     * The pixel line width of the navigator series.
                     */
                    lineWidth: 1,
                    /**
                     * @ignore-option
                     */
                    compare: null,
                    /**
                     * Unless data is explicitly defined, the data is borrowed from the
                     * first series in the chart.
                     *
                     * @type      {Array<number|Array<number|string|null>|object|null>}
                     * @product   highstock
                     * @apioption navigator.series.data
                     */
                    /**
                     * Data grouping options for the navigator series.
                     *
                     * @extends plotOptions.series.dataGrouping
                     */
                    dataGrouping: {
                        approximation: 'average',
                        enabled: true,
                        groupPixelWidth: 2,
                        smoothed: true,
                        // Day and week differs from plotOptions.series.dataGrouping
                        units: [
                            ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                            ['second', [1, 2, 5, 10, 15, 30]],
                            ['minute', [1, 2, 5, 10, 15, 30]],
                            ['hour', [1, 2, 3, 4, 6, 8, 12]],
                            ['day', [1, 2, 3, 4]],
                            ['week', [1, 2, 3]],
                            ['month', [1, 3, 6]],
                            ['year', null]
                        ]
                    },
                    /**
                     * Data label options for the navigator series. Data labels are
                     * disabled by default on the navigator series.
                     *
                     * @extends plotOptions.series.dataLabels
                     */
                    dataLabels: {
                        /** @internal */
                        enabled: false,
                        /** @internal */
                        zIndex: 2 // #1839
                    },
                    id: 'highcharts-navigator-series',
                    className: 'highcharts-navigator-series',
                    /**
                     * Sets the fill color of the navigator series.
                     *
                     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @apioption navigator.series.color
                     */
                    /**
                     * Line color for the navigator series. Allows setting the color
                     * while disallowing the default candlestick setting.
                     *
                     * @type {Highcharts.ColorString|null}
                     */
                    lineColor: null,
                    marker: {
                        enabled: false
                    },
                    pointRange: 0,
                    /**
                     * The threshold option. Setting it to 0 will make the default
                     * navigator area series draw its area from the 0 value and up.
                     *
                     * @type {number|null}
                     */
                    threshold: null
                },
                /**
                 * Options for the navigator X axis. Default series options
                 * for the navigator xAxis are:
                 *
                 * <pre>xAxis: {
                 *     tickWidth: 0,
                 *     lineWidth: 0,
                 *     gridLineWidth: 1,
                 *     tickPixelInterval: 200,
                 *     labels: {
                 *            align: 'left',
                 *         style: {
                 *             color: '#888'
                 *         },
                 *         x: 3,
                 *         y: -4
                 *     }
                 * }</pre>
                 *
                 * @extends   xAxis
                 * @excluding linkedTo, maxZoom, minRange, opposite, range, scrollbar,
                 *            showEmpty, maxRange
                 */
                xAxis: {
                    /**
                     * Additional range on the right side of the xAxis. Works similar to
                     * xAxis.maxPadding, but value is set in milliseconds.
                     * Can be set for both, main xAxis and navigator's xAxis.
                     *
                     * @since   6.0.0
                     */
                    overscroll: 0,
                    className: 'highcharts-navigator-xaxis',
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: '#e6e6e6',
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: 'left',
                        /**
                         * @type {Highcharts.CSSObject}
                         */
                        style: {
                            /** @ignore */
                            color: '#999999'
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: false
                },
                /**
                 * Options for the navigator Y axis. Default series options
                 * for the navigator yAxis are:
                 *
                 * <pre>yAxis: {
                 *     gridLineWidth: 0,
                 *     startOnTick: false,
                 *     endOnTick: false,
                 *     minPadding: 0.1,
                 *     maxPadding: 0.1,
                 *     labels: {
                 *         enabled: false
                 *     },
                 *     title: {
                 *         text: null
                 *     },
                 *     tickWidth: 0
                 * }</pre>
                 *
                 * @extends   yAxis
                 * @excluding height, linkedTo, maxZoom, minRange, ordinal, range,
                 *            showEmpty, scrollbar, top, units, maxRange, minLength,
                 *            maxLength, resize
                 */
                yAxis: {
                    className: 'highcharts-navigator-yaxis',
                    gridLineWidth: 0,
                    startOnTick: false,
                    endOnTick: false,
                    minPadding: 0.1,
                    maxPadding: 0.1,
                    labels: {
                        enabled: false
                    },
                    crosshair: false,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Draw one of the handles on the side of the zoomed range in the navigator
         *
         * @private
         * @function Highcharts.Renderer#symbols.navigator-handle
         * @param {number} x
         * @param {number} y
         * @param {number} w
         * @param {number} h
         * @param {Highcharts.NavigatorHandlesOptions} options
         * @return {Highcharts.SVGPathArray}
         *         Path to be used in a handle
         */
        H.Renderer.prototype.symbols['navigator-handle'] = function (x, y, w, h, options) {
            var halfWidth = options.width / 2, markerPosition = Math.round(halfWidth / 3) + 0.5, height = options.height;
            return [
                'M',
                -halfWidth - 1, 0.5,
                'L',
                halfWidth, 0.5,
                'L',
                halfWidth, height + 0.5,
                'L',
                -halfWidth - 1, height + 0.5,
                'L',
                -halfWidth - 1, 0.5,
                'M',
                -markerPosition, 4,
                'L',
                -markerPosition, height - 3,
                'M',
                markerPosition - 1, 4,
                'L',
                markerPosition - 1, height - 3
            ];
        };
        /**
         * Add logic to normalize the zoomed range in order to preserve the pressed
         * state of range selector buttons
         *
         * @private
         * @function Highcharts.Axis#toFixedRange
         * @param {number} [pxMin]
         * @param {number} [pxMax]
         * @param {number} [fixedMin]
         * @param {number} [fixedMax]
         * @return {*}
         */
        Axis.prototype.toFixedRange = function (pxMin, pxMax, fixedMin, fixedMax) {
            var fixedRange = this.chart && this.chart.fixedRange, newMin = pick(fixedMin, this.translate(pxMin, true, !this.horiz)), newMax = pick(fixedMax, this.translate(pxMax, true, !this.horiz)), changeRatio = fixedRange && (newMax - newMin) / fixedRange;
            // If the difference between the fixed range and the actual requested range
            // is too great, the user is dragging across an ordinal gap, and we need to
            // release the range selector button.
            if (changeRatio > 0.7 && changeRatio < 1.3) {
                if (fixedMax) {
                    newMin = newMax - fixedRange;
                }
                else {
                    newMax = newMin + fixedRange;
                }
            }
            if (!isNumber(newMin) || !isNumber(newMax)) { // #1195, #7411
                newMin = newMax = undefined;
            }
            return {
                min: newMin,
                max: newMax
            };
        };
        /**
         * The Navigator class
         *
         * @private
         * @class
         * @name Highcharts.Navigator
         *
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        function Navigator(chart) {
            this.init(chart);
        }
        Navigator.prototype = {
            /**
             * Draw one of the handles on the side of the zoomed range in the navigator
             *
             * @private
             * @function Highcharts.Navigator#drawHandle
             *
             * @param {number} x
             *        The x center for the handle
             *
             * @param {number} index
             *        0 for left and 1 for right
             *
             * @param {boolean|undefined} inverted
             *        flag for chart.inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawHandle: function (x, index, inverted, verb) {
                var navigator = this, height = navigator.navigatorOptions.handles.height;
                // Place it
                navigator.handles[index][verb](inverted ? {
                    translateX: Math.round(navigator.left + navigator.height / 2),
                    translateY: Math.round(navigator.top + parseInt(x, 10) + 0.5 - height)
                } : {
                    translateX: Math.round(navigator.left + parseInt(x, 10)),
                    translateY: Math.round(navigator.top + navigator.height / 2 - height / 2 - 1)
                });
            },
            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawOutline
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean|undefined} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawOutline: function (zoomedMin, zoomedMax, inverted, verb) {
                var navigator = this, maskInside = navigator.navigatorOptions.maskInside, outlineWidth = navigator.outline.strokeWidth(), halfOutline = outlineWidth / 2, outlineCorrection = (outlineWidth % 2) / 2, // #5800
                outlineHeight = navigator.outlineHeight, scrollbarHeight = navigator.scrollbarHeight, navigatorSize = navigator.size, left = navigator.left - scrollbarHeight, navigatorTop = navigator.top, verticalMin, path;
                if (inverted) {
                    left -= halfOutline;
                    verticalMin = navigatorTop + zoomedMax + outlineCorrection;
                    zoomedMax = navigatorTop + zoomedMin + outlineCorrection;
                    path = [
                        'M',
                        left + outlineHeight,
                        // top edge
                        navigatorTop - scrollbarHeight - outlineCorrection,
                        'L',
                        left + outlineHeight,
                        verticalMin,
                        'L',
                        left,
                        verticalMin,
                        'L',
                        left,
                        zoomedMax,
                        'L',
                        left + outlineHeight,
                        zoomedMax,
                        'L',
                        left + outlineHeight,
                        // bottom edge
                        navigatorTop + navigatorSize + scrollbarHeight
                    ].concat(maskInside ? [
                        'M',
                        left + outlineHeight,
                        verticalMin - halfOutline,
                        'L',
                        left + outlineHeight,
                        zoomedMax + halfOutline // upper right of z.r.
                    ] : []);
                }
                else {
                    zoomedMin += left + scrollbarHeight - outlineCorrection;
                    zoomedMax += left + scrollbarHeight - outlineCorrection;
                    navigatorTop += halfOutline;
                    path = [
                        'M',
                        left,
                        navigatorTop,
                        'L',
                        zoomedMin,
                        navigatorTop,
                        'L',
                        zoomedMin,
                        navigatorTop + outlineHeight,
                        'L',
                        zoomedMax,
                        navigatorTop + outlineHeight,
                        'L',
                        zoomedMax,
                        navigatorTop,
                        'L',
                        left + navigatorSize + scrollbarHeight * 2,
                        navigatorTop // right
                    ].concat(maskInside ? [
                        'M',
                        zoomedMin - halfOutline,
                        navigatorTop,
                        'L',
                        zoomedMax + halfOutline,
                        navigatorTop // upper right of z.r.
                    ] : []);
                }
                navigator.outline[verb]({
                    d: path
                });
            },
            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawMasks
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean|undefined} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawMasks: function (zoomedMin, zoomedMax, inverted, verb) {
                var navigator = this, left = navigator.left, top = navigator.top, navigatorHeight = navigator.height, height, width, x, y;
                // Determine rectangle position & size
                // According to (non)inverted position:
                if (inverted) {
                    x = [left, left, left];
                    y = [top, top + zoomedMin, top + zoomedMax];
                    width = [navigatorHeight, navigatorHeight, navigatorHeight];
                    height = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                }
                else {
                    x = [left, left + zoomedMin, left + zoomedMax];
                    y = [top, top, top];
                    width = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                    height = [navigatorHeight, navigatorHeight, navigatorHeight];
                }
                navigator.shades.forEach(function (shade, i) {
                    shade[verb]({
                        x: x[i],
                        y: y[i],
                        width: width[i],
                        height: height[i]
                    });
                });
            },
            /**
             * Generate DOM elements for a navigator:
             *
             * - main navigator group
             *
             * - all shades
             *
             * - outline
             *
             * - handles
             *
             * @private
             * @function Highcharts.Navigator#renderElements
             */
            renderElements: function () {
                var navigator = this, navigatorOptions = navigator.navigatorOptions, maskInside = navigatorOptions.maskInside, chart = navigator.chart, inverted = chart.inverted, renderer = chart.renderer, navigatorGroup, mouseCursor = {
                    cursor: inverted ? 'ns-resize' : 'ew-resize'
                };
                // Create the main navigator group
                navigator.navigatorGroup = navigatorGroup = renderer.g('navigator')
                    .attr({
                    zIndex: 8,
                    visibility: 'hidden'
                })
                    .add();
                // Create masks, each mask will get events and fill:
                [
                    !maskInside,
                    maskInside,
                    !maskInside
                ].forEach(function (hasMask, index) {
                    navigator.shades[index] = renderer.rect()
                        .addClass('highcharts-navigator-mask' +
                        (index === 1 ? '-inside' : '-outside'))
                        .add(navigatorGroup);
                    if (!chart.styledMode) {
                        navigator.shades[index]
                            .attr({
                            fill: hasMask ?
                                navigatorOptions.maskFill :
                                'rgba(0,0,0,0)'
                        })
                            .css((index === 1) && mouseCursor);
                    }
                });
                // Create the outline:
                navigator.outline = renderer.path()
                    .addClass('highcharts-navigator-outline')
                    .add(navigatorGroup);
                if (!chart.styledMode) {
                    navigator.outline.attr({
                        'stroke-width': navigatorOptions.outlineWidth,
                        stroke: navigatorOptions.outlineColor
                    });
                }
                // Create the handlers:
                if (navigatorOptions.handles.enabled) {
                    [0, 1].forEach(function (index) {
                        navigatorOptions.handles.inverted = chart.inverted;
                        navigator.handles[index] = renderer.symbol(navigatorOptions.handles.symbols[index], -navigatorOptions.handles.width / 2 - 1, 0, navigatorOptions.handles.width, navigatorOptions.handles.height, navigatorOptions.handles);
                        // zIndex = 6 for right handle, 7 for left.
                        // Can't be 10, because of the tooltip in inverted chart #2908
                        navigator.handles[index].attr({ zIndex: 7 - index })
                            .addClass('highcharts-navigator-handle ' +
                            'highcharts-navigator-handle-' +
                            ['left', 'right'][index]).add(navigatorGroup);
                        if (!chart.styledMode) {
                            var handlesOptions = navigatorOptions.handles;
                            navigator.handles[index]
                                .attr({
                                fill: handlesOptions.backgroundColor,
                                stroke: handlesOptions.borderColor,
                                'stroke-width': handlesOptions.lineWidth
                            })
                                .css(mouseCursor);
                        }
                    });
                }
            },
            /**
             * Update navigator
             *
             * @private
             * @function Highcharts.Navigator#update
             *
             * @param {Highcharts.NavigatorOptions} options
             *        Options to merge in when updating navigator
             */
            update: function (options) {
                // Remove references to old navigator series in base series
                (this.series || []).forEach(function (series) {
                    if (series.baseSeries) {
                        delete series.baseSeries.navigatorSeries;
                    }
                });
                // Destroy and rebuild navigator
                this.destroy();
                var chartOptions = this.chart.options;
                merge(true, chartOptions.navigator, this.options, options);
                this.init(this.chart);
            },
            /**
             * Render the navigator
             *
             * @private
             * @function Highcharts.Navigator#render
             * @param {number} min
             *        X axis value minimum
             * @param {number} max
             *        X axis value maximum
             * @param {number} [pxMin]
             *        Pixel value minimum
             * @param {number} [pxMax]
             *        Pixel value maximum
             * @return {void}
             */
            render: function (min, max, pxMin, pxMax) {
                var navigator = this, chart = navigator.chart, navigatorWidth, scrollbarLeft, scrollbarTop, scrollbarHeight = navigator.scrollbarHeight, navigatorSize, xAxis = navigator.xAxis, scrollbarXAxis = xAxis.fake ? chart.xAxis[0] : xAxis, navigatorEnabled = navigator.navigatorEnabled, zoomedMin, zoomedMax, rendered = navigator.rendered, inverted = chart.inverted, verb, newMin, newMax, currentRange, minRange = chart.xAxis[0].minRange, maxRange = chart.xAxis[0].options.maxRange;
                // Don't redraw while moving the handles (#4703).
                if (this.hasDragged && !defined(pxMin)) {
                    return;
                }
                // Don't render the navigator until we have data (#486, #4202, #5172).
                if (!isNumber(min) || !isNumber(max)) {
                    // However, if navigator was already rendered, we may need to resize
                    // it. For example hidden series, but visible navigator (#6022).
                    if (rendered) {
                        pxMin = 0;
                        pxMax = pick(xAxis.width, scrollbarXAxis.width);
                    }
                    else {
                        return;
                    }
                }
                navigator.left = pick(xAxis.left, 
                // in case of scrollbar only, without navigator
                chart.plotLeft + scrollbarHeight +
                    (inverted ? chart.plotWidth : 0));
                navigator.size = zoomedMax = navigatorSize = pick(xAxis.len, (inverted ? chart.plotHeight : chart.plotWidth) -
                    2 * scrollbarHeight);
                if (inverted) {
                    navigatorWidth = scrollbarHeight;
                }
                else {
                    navigatorWidth = navigatorSize + 2 * scrollbarHeight;
                }
                // Get the pixel position of the handles
                pxMin = pick(pxMin, xAxis.toPixels(min, true));
                pxMax = pick(pxMax, xAxis.toPixels(max, true));
                // Verify (#1851, #2238)
                if (!isNumber(pxMin) || Math.abs(pxMin) === Infinity) {
                    pxMin = 0;
                    pxMax = navigatorWidth;
                }
                // Are we below the minRange? (#2618, #6191)
                newMin = xAxis.toValue(pxMin, true);
                newMax = xAxis.toValue(pxMax, true);
                currentRange = Math.abs(H.correctFloat(newMax - newMin));
                if (currentRange < minRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - minRange, true);
                    }
                    else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + minRange, true);
                    }
                }
                else if (defined(maxRange) && currentRange > maxRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - maxRange, true);
                    }
                    else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + maxRange, true);
                    }
                }
                // Handles are allowed to cross, but never exceed the plot area
                navigator.zoomedMax = Math.min(Math.max(pxMin, pxMax, 0), zoomedMax);
                navigator.zoomedMin = Math.min(Math.max(navigator.fixedWidth ?
                    navigator.zoomedMax - navigator.fixedWidth :
                    Math.min(pxMin, pxMax), 0), zoomedMax);
                navigator.range = navigator.zoomedMax - navigator.zoomedMin;
                zoomedMax = Math.round(navigator.zoomedMax);
                zoomedMin = Math.round(navigator.zoomedMin);
                if (navigatorEnabled) {
                    navigator.navigatorGroup.attr({
                        visibility: 'visible'
                    });
                    // Place elements
                    verb = rendered && !navigator.hasDragged ? 'animate' : 'attr';
                    navigator.drawMasks(zoomedMin, zoomedMax, inverted, verb);
                    navigator.drawOutline(zoomedMin, zoomedMax, inverted, verb);
                    if (navigator.navigatorOptions.handles.enabled) {
                        navigator.drawHandle(zoomedMin, 0, inverted, verb);
                        navigator.drawHandle(zoomedMax, 1, inverted, verb);
                    }
                }
                if (navigator.scrollbar) {
                    if (inverted) {
                        scrollbarTop = navigator.top - scrollbarHeight;
                        scrollbarLeft = navigator.left - scrollbarHeight +
                            (navigatorEnabled || !scrollbarXAxis.opposite ? 0 :
                                // Multiple axes has offsets:
                                (scrollbarXAxis.titleOffset || 0) +
                                    // Self margin from the axis.title
                                    scrollbarXAxis.axisTitleMargin);
                        scrollbarHeight = navigatorSize + 2 * scrollbarHeight;
                    }
                    else {
                        scrollbarTop = navigator.top + (navigatorEnabled ?
                            navigator.height :
                            -scrollbarHeight);
                        scrollbarLeft = navigator.left - scrollbarHeight;
                    }
                    // Reposition scrollbar
                    navigator.scrollbar.position(scrollbarLeft, scrollbarTop, navigatorWidth, scrollbarHeight);
                    // Keep scale 0-1
                    navigator.scrollbar.setRange(
                    // Use real value, not rounded because range can be very small
                    // (#1716)
                    navigator.zoomedMin / (navigatorSize || 1), navigator.zoomedMax / (navigatorSize || 1));
                }
                navigator.rendered = true;
            },
            /**
             * Set up the mouse and touch events for the navigator
             *
             * @private
             * @function Highcharts.Navigator#addMouseEvents
             */
            addMouseEvents: function () {
                var navigator = this, chart = navigator.chart, container = chart.container, eventsToUnbind = [], mouseMoveHandler, mouseUpHandler;
                /**
                 * Create mouse events' handlers.
                 * Make them as separate functions to enable wrapping them:
                 */
                navigator.mouseMoveHandler = mouseMoveHandler = function (e) {
                    navigator.onMouseMove(e);
                };
                navigator.mouseUpHandler = mouseUpHandler = function (e) {
                    navigator.onMouseUp(e);
                };
                // Add shades and handles mousedown events
                eventsToUnbind = navigator.getPartsEvents('mousedown');
                // Add mouse move and mouseup events. These are bind to doc/container,
                // because Navigator.grabbedSomething flags are stored in mousedown
                // events
                eventsToUnbind.push(addEvent(container, 'mousemove', mouseMoveHandler), addEvent(container.ownerDocument, 'mouseup', mouseUpHandler));
                // Touch events
                if (hasTouch) {
                    eventsToUnbind.push(addEvent(container, 'touchmove', mouseMoveHandler), addEvent(container.ownerDocument, 'touchend', mouseUpHandler));
                    eventsToUnbind.concat(navigator.getPartsEvents('touchstart'));
                }
                navigator.eventsToUnbind = eventsToUnbind;
                // Data events
                if (navigator.series && navigator.series[0]) {
                    eventsToUnbind.push(addEvent(navigator.series[0].xAxis, 'foundExtremes', function () {
                        chart.navigator.modifyNavigatorAxisExtremes();
                    }));
                }
            },
            /**
             * Generate events for handles and masks
             *
             * @private
             * @function Highcharts.Navigator#getPartsEvents
             *
             * @param {string} eventName
             *        Event name handler, 'mousedown' or 'touchstart'
             *
             * @return {Array<Function>}
             *         An array of functions to remove navigator functions from the
             *         events again.
             */
            getPartsEvents: function (eventName) {
                var navigator = this, events = [];
                ['shades', 'handles'].forEach(function (name) {
                    navigator[name].forEach(function (navigatorItem, index) {
                        events.push(addEvent(navigatorItem.element, eventName, function (e) {
                            navigator[name + 'Mousedown'](e, index);
                        }));
                    });
                });
                return events;
            },
            /**
             * Mousedown on a shaded mask, either:
             *
             * - will be stored for future drag&drop
             *
             * - will directly shift to a new range
             *
             * @private
             * @function Highcharts.Navigator#shadesMousedown
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             *
             * @param {number} index
             *        Index of a mask in Navigator.shades array
             */
            shadesMousedown: function (e, index) {
                e = this.chart.pointer.normalize(e);
                var navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, zoomedMin = navigator.zoomedMin, navigatorPosition = navigator.left, navigatorSize = navigator.size, range = navigator.range, chartX = e.chartX, fixedMax, fixedMin, ext, left;
                // For inverted chart, swap some options:
                if (chart.inverted) {
                    chartX = e.chartY;
                    navigatorPosition = navigator.top;
                }
                if (index === 1) {
                    // Store information for drag&drop
                    navigator.grabbedCenter = chartX;
                    navigator.fixedWidth = range;
                    navigator.dragOffset = chartX - zoomedMin;
                }
                else {
                    // Shift the range by clicking on shaded areas
                    left = chartX - navigatorPosition - range / 2;
                    if (index === 0) {
                        left = Math.max(0, left);
                    }
                    else if (index === 2 && left + range >= navigatorSize) {
                        left = navigatorSize - range;
                        if (navigator.reversedExtremes) {
                            // #7713
                            left -= range;
                            fixedMin = navigator.getUnionExtremes().dataMin;
                        }
                        else {
                            // #2293, #3543
                            fixedMax = navigator.getUnionExtremes().dataMax;
                        }
                    }
                    if (left !== zoomedMin) { // it has actually moved
                        navigator.fixedWidth = range; // #1370
                        ext = xAxis.toFixedRange(left, left + range, fixedMin, fixedMax);
                        if (defined(ext.min)) { // #7411
                            chart.xAxis[0].setExtremes(Math.min(ext.min, ext.max), Math.max(ext.min, ext.max), true, null, // auto animation
                            { trigger: 'navigator' });
                        }
                    }
                }
            },
            /**
             * Mousedown on a handle mask.
             * Will store necessary information for drag&drop.
             *
             * @private
             * @function Highcharts.Navigator#handlesMousedown
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             * @param {number} index
             *        Index of a handle in Navigator.handles array
             * @return {void}
             */
            handlesMousedown: function (e, index) {
                e = this.chart.pointer.normalize(e);
                var navigator = this, chart = navigator.chart, baseXAxis = chart.xAxis[0], 
                // For reversed axes, min and max are changed,
                // so the other extreme should be stored
                reverse = navigator.reversedExtremes;
                if (index === 0) {
                    // Grab the left handle
                    navigator.grabbedLeft = true;
                    navigator.otherHandlePos = navigator.zoomedMax;
                    navigator.fixedExtreme = reverse ? baseXAxis.min : baseXAxis.max;
                }
                else {
                    // Grab the right handle
                    navigator.grabbedRight = true;
                    navigator.otherHandlePos = navigator.zoomedMin;
                    navigator.fixedExtreme = reverse ? baseXAxis.max : baseXAxis.min;
                }
                chart.fixedRange = null;
            },
            /**
             * Mouse move event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseMove
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             */
            onMouseMove: function (e) {
                var navigator = this, chart = navigator.chart, left = navigator.left, navigatorSize = navigator.navigatorSize, range = navigator.range, dragOffset = navigator.dragOffset, inverted = chart.inverted, chartX;
                // In iOS, a mousemove event with e.pageX === 0 is fired when holding
                // the finger down in the center of the scrollbar. This should be
                // ignored.
                if (!e.touches || e.touches[0].pageX !== 0) { // #4696
                    e = chart.pointer.normalize(e);
                    chartX = e.chartX;
                    // Swap some options for inverted chart
                    if (inverted) {
                        left = navigator.top;
                        chartX = e.chartY;
                    }
                    // Drag left handle or top handle
                    if (navigator.grabbedLeft) {
                        navigator.hasDragged = true;
                        navigator.render(0, 0, chartX - left, navigator.otherHandlePos);
                        // Drag right handle or bottom handle
                    }
                    else if (navigator.grabbedRight) {
                        navigator.hasDragged = true;
                        navigator.render(0, 0, navigator.otherHandlePos, chartX - left);
                        // Drag scrollbar or open area in navigator
                    }
                    else if (navigator.grabbedCenter) {
                        navigator.hasDragged = true;
                        if (chartX < dragOffset) { // outside left
                            chartX = dragOffset;
                            // outside right
                        }
                        else if (chartX >
                            navigatorSize + dragOffset - range) {
                            chartX = navigatorSize + dragOffset - range;
                        }
                        navigator.render(0, 0, chartX - dragOffset, chartX - dragOffset + range);
                    }
                    if (navigator.hasDragged &&
                        navigator.scrollbar &&
                        pick(navigator.scrollbar.options.liveRedraw, 
                        // By default, don't run live redraw on VML, on touch
                        // devices or if the chart is in boost.
                        H.svg && !isTouchDevice && !this.chart.isBoosting)) {
                        e.DOMType = e.type; // DOMType is for IE8
                        setTimeout(function () {
                            navigator.onMouseUp(e);
                        }, 0);
                    }
                }
            },
            /**
             * Mouse up event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseUp
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             * @return {void}
             */
            onMouseUp: function (e) {
                var navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, scrollbar = navigator.scrollbar, unionExtremes, fixedMin, fixedMax, ext, DOMEvent = e.DOMEvent || e;
                if (
                // MouseUp is called for both, navigator and scrollbar (that order),
                // which causes calling afterSetExtremes twice. Prevent first call
                // by checking if scrollbar is going to set new extremes (#6334)
                (navigator.hasDragged && (!scrollbar || !scrollbar.hasDragged)) ||
                    e.trigger === 'scrollbar') {
                    unionExtremes = navigator.getUnionExtremes();
                    // When dragging one handle, make sure the other one doesn't change
                    if (navigator.zoomedMin === navigator.otherHandlePos) {
                        fixedMin = navigator.fixedExtreme;
                    }
                    else if (navigator.zoomedMax === navigator.otherHandlePos) {
                        fixedMax = navigator.fixedExtreme;
                    }
                    // Snap to right edge (#4076)
                    if (navigator.zoomedMax === navigator.size) {
                        fixedMax = navigator.reversedExtremes ?
                            unionExtremes.dataMin :
                            unionExtremes.dataMax;
                    }
                    // Snap to left edge (#7576)
                    if (navigator.zoomedMin === 0) {
                        fixedMin = navigator.reversedExtremes ?
                            unionExtremes.dataMax :
                            unionExtremes.dataMin;
                    }
                    ext = xAxis.toFixedRange(navigator.zoomedMin, navigator.zoomedMax, fixedMin, fixedMax);
                    if (defined(ext.min)) {
                        chart.xAxis[0].setExtremes(Math.min(ext.min, ext.max), Math.max(ext.min, ext.max), true, 
                        // Run animation when clicking buttons, scrollbar track etc,
                        // but not when dragging handles or scrollbar
                        navigator.hasDragged ? false : null, {
                            trigger: 'navigator',
                            triggerOp: 'navigator-drag',
                            DOMEvent: DOMEvent // #1838
                        });
                    }
                }
                if (e.DOMType !== 'mousemove') {
                    navigator.grabbedLeft = navigator.grabbedRight =
                        navigator.grabbedCenter = navigator.fixedWidth =
                            navigator.fixedExtreme = navigator.otherHandlePos =
                                navigator.hasDragged = navigator.dragOffset = null;
                }
            },
            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Navigator#removeEvents
             * @return {void}
             */
            removeEvents: function () {
                if (this.eventsToUnbind) {
                    this.eventsToUnbind.forEach(function (unbind) {
                        unbind();
                    });
                    this.eventsToUnbind = undefined;
                }
                this.removeBaseSeriesEvents();
            },
            /**
             * Remove data events.
             *
             * @private
             * @function Highcharts.Navigator#removeBaseSeriesEvents
             * @return {void}
             */
            removeBaseSeriesEvents: function () {
                var baseSeries = this.baseSeries || [];
                if (this.navigatorEnabled && baseSeries[0]) {
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        baseSeries.forEach(function (series) {
                            removeEvent(series, 'updatedData', this.updatedDataHandler);
                        }, this);
                    }
                    // We only listen for extremes-events on the first baseSeries
                    if (baseSeries[0].xAxis) {
                        removeEvent(baseSeries[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes);
                    }
                }
            },
            /**
             * Initialize the Navigator object
             *
             * @private
             * @function Highcharts.Navigator#init
             *
             * @param {Highcharts.Chart} chart
             */
            init: function (chart) {
                var chartOptions = chart.options, navigatorOptions = chartOptions.navigator, navigatorEnabled = navigatorOptions.enabled, scrollbarOptions = chartOptions.scrollbar, scrollbarEnabled = scrollbarOptions.enabled, height = navigatorEnabled ? navigatorOptions.height : 0, scrollbarHeight = scrollbarEnabled ?
                    scrollbarOptions.height :
                    0;
                this.handles = [];
                this.shades = [];
                this.chart = chart;
                this.setBaseSeries();
                this.height = height;
                this.scrollbarHeight = scrollbarHeight;
                this.scrollbarEnabled = scrollbarEnabled;
                this.navigatorEnabled = navigatorEnabled;
                this.navigatorOptions = navigatorOptions;
                this.scrollbarOptions = scrollbarOptions;
                this.outlineHeight = height + scrollbarHeight;
                this.opposite = pick(navigatorOptions.opposite, !navigatorEnabled && chart.inverted); // #6262
                var navigator = this, baseSeries = navigator.baseSeries, xAxisIndex = chart.xAxis.length, yAxisIndex = chart.yAxis.length, baseXaxis = baseSeries && baseSeries[0] && baseSeries[0].xAxis ||
                    chart.xAxis[0] || { options: {} };
                chart.isDirtyBox = true;
                if (navigator.navigatorEnabled) {
                    // an x axis is required for scrollbar also
                    navigator.xAxis = new Axis(chart, merge({
                        // inherit base xAxis' break and ordinal options
                        breaks: baseXaxis.options.breaks,
                        ordinal: baseXaxis.options.ordinal
                    }, navigatorOptions.xAxis, {
                        id: 'navigator-x-axis',
                        yAxis: 'navigator-y-axis',
                        isX: true,
                        type: 'datetime',
                        index: xAxisIndex,
                        isInternal: true,
                        offset: 0,
                        keepOrdinalPadding: true,
                        startOnTick: false,
                        endOnTick: false,
                        minPadding: 0,
                        maxPadding: 0,
                        zoomEnabled: false
                    }, chart.inverted ? {
                        offsets: [scrollbarHeight, 0, -scrollbarHeight, 0],
                        width: height
                    } : {
                        offsets: [0, -scrollbarHeight, 0, scrollbarHeight],
                        height: height
                    }));
                    navigator.yAxis = new Axis(chart, merge(navigatorOptions.yAxis, {
                        id: 'navigator-y-axis',
                        alignTicks: false,
                        offset: 0,
                        index: yAxisIndex,
                        isInternal: true,
                        zoomEnabled: false
                    }, chart.inverted ? {
                        width: height
                    } : {
                        height: height
                    }));
                    // If we have a base series, initialize the navigator series
                    if (baseSeries || navigatorOptions.series.data) {
                        navigator.updateNavigatorSeries(false);
                        // If not, set up an event to listen for added series
                    }
                    else if (chart.series.length === 0) {
                        navigator.unbindRedraw = addEvent(chart, 'beforeRedraw', function () {
                            // We've got one, now add it as base
                            if (chart.series.length > 0 && !navigator.series) {
                                navigator.setBaseSeries();
                                navigator.unbindRedraw(); // reset
                            }
                        });
                    }
                    navigator.reversedExtremes = (chart.inverted && !navigator.xAxis.reversed) || (!chart.inverted && navigator.xAxis.reversed);
                    // Render items, so we can bind events to them:
                    navigator.renderElements();
                    // Add mouse events
                    navigator.addMouseEvents();
                    // in case of scrollbar only, fake an x axis to get translation
                }
                else {
                    navigator.xAxis = {
                        translate: function (value, reverse) {
                            var axis = chart.xAxis[0], ext = axis.getExtremes(), scrollTrackWidth = axis.len - 2 * scrollbarHeight, min = numExt('min', axis.options.min, ext.dataMin), valueRange = numExt('max', axis.options.max, ext.dataMax) - min;
                            return reverse ?
                                // from pixel to value
                                (value * valueRange / scrollTrackWidth) + min :
                                // from value to pixel
                                scrollTrackWidth * (value - min) / valueRange;
                        },
                        toPixels: function (value) {
                            return this.translate(value);
                        },
                        toValue: function (value) {
                            return this.translate(value, true);
                        },
                        toFixedRange: Axis.prototype.toFixedRange,
                        fake: true
                    };
                }
                // Initialize the scrollbar
                if (chart.options.scrollbar.enabled) {
                    chart.scrollbar = navigator.scrollbar = new Scrollbar(chart.renderer, merge(chart.options.scrollbar, {
                        margin: navigator.navigatorEnabled ? 0 : 10,
                        vertical: chart.inverted
                    }), chart);
                    addEvent(navigator.scrollbar, 'changed', function (e) {
                        var range = navigator.size, to = range * this.to, from = range * this.from;
                        navigator.hasDragged = navigator.scrollbar.hasDragged;
                        navigator.render(0, 0, from, to);
                        if (chart.options.scrollbar.liveRedraw ||
                            (e.DOMType !== 'mousemove' &&
                                e.DOMType !== 'touchmove')) {
                            setTimeout(function () {
                                navigator.onMouseUp(e);
                            });
                        }
                    });
                }
                // Add data events
                navigator.addBaseSeriesEvents();
                // Add redraw events
                navigator.addChartEvents();
            },
            /**
             * Get the union data extremes of the chart - the outer data extremes of the
             * base X axis and the navigator axis.
             *
             * @private
             * @function Highcharts.Navigator#getUnionExtremes
             * @param {boolean} [returnFalseOnNoBaseSeries]
             *        as the param says.
             * @return {Highcharts.Dictionary<(number|undefined)>|undefined}
             */
            getUnionExtremes: function (returnFalseOnNoBaseSeries) {
                var baseAxis = this.chart.xAxis[0], navAxis = this.xAxis, navAxisOptions = navAxis.options, baseAxisOptions = baseAxis.options, ret;
                if (!returnFalseOnNoBaseSeries || baseAxis.dataMin !== null) {
                    ret = {
                        dataMin: pick(// #4053
                        navAxisOptions && navAxisOptions.min, numExt('min', baseAxisOptions.min, baseAxis.dataMin, navAxis.dataMin, navAxis.min)),
                        dataMax: pick(navAxisOptions && navAxisOptions.max, numExt('max', baseAxisOptions.max, baseAxis.dataMax, navAxis.dataMax, navAxis.max))
                    };
                }
                return ret;
            },
            /**
             * Set the base series and update the navigator series from this. With a bit
             * of modification we should be able to make this an API method to be called
             * from the outside
             *
             * @private
             * @function Highcharts.Navigator#setBaseSeries
             * @param {Highcharts.SeriesOptionsType} [baseSeriesOptions]
             *        Additional series options for a navigator
             * @param {boolean} [redraw]
             *        Whether to redraw after update.
             * @return {void}
             */
            setBaseSeries: function (baseSeriesOptions, redraw) {
                var chart = this.chart, baseSeries = this.baseSeries = [];
                baseSeriesOptions = (baseSeriesOptions ||
                    chart.options && chart.options.navigator.baseSeries ||
                    (chart.series.length ?
                        // Find the first non-navigator series (#8430)
                        H.find(chart.series, function (s) {
                            return !s.options.isInternal;
                        }).index :
                        0));
                // Iterate through series and add the ones that should be shown in
                // navigator.
                (chart.series || []).forEach(function (series, i) {
                    if (
                    // Don't include existing nav series
                    !series.options.isInternal &&
                        (series.options.showInNavigator ||
                            (i === baseSeriesOptions ||
                                series.options.id === baseSeriesOptions) &&
                                series.options.showInNavigator !== false)) {
                        baseSeries.push(series);
                    }
                });
                // When run after render, this.xAxis already exists
                if (this.xAxis && !this.xAxis.fake) {
                    this.updateNavigatorSeries(true, redraw);
                }
            },
            /**
             * Update series in the navigator from baseSeries, adding new if does not
             * exist.
             *
             * @private
             * @function Highcharts.Navigator.updateNavigatorSeries
             * @param {boolean} addEvents
             * @param {boolean} [redraw]
             * @return {void}
             */
            updateNavigatorSeries: function (addEvents, redraw) {
                var navigator = this, chart = navigator.chart, baseSeries = navigator.baseSeries, baseOptions, mergedNavSeriesOptions, chartNavigatorSeriesOptions = navigator.navigatorOptions.series, baseNavigatorOptions, navSeriesMixin = {
                    enableMouseTracking: false,
                    index: null,
                    linkedTo: null,
                    group: 'nav',
                    padXAxis: false,
                    xAxis: 'navigator-x-axis',
                    yAxis: 'navigator-y-axis',
                    showInLegend: false,
                    stacking: false,
                    isInternal: true,
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                }, 
                // Remove navigator series that are no longer in the baseSeries
                navigatorSeries = navigator.series =
                    (navigator.series || []).filter(function (navSeries) {
                        var base = navSeries.baseSeries;
                        if (baseSeries.indexOf(base) < 0) { // Not in array
                            // If there is still a base series connected to this
                            // series, remove event handler and reference.
                            if (base) {
                                removeEvent(base, 'updatedData', navigator.updatedDataHandler);
                                delete base.navigatorSeries;
                            }
                            // Kill the nav series. It may already have been
                            // destroyed (#8715).
                            if (navSeries.chart) {
                                navSeries.destroy();
                            }
                            return false;
                        }
                        return true;
                    });
                // Go through each base series and merge the options to create new
                // series
                if (baseSeries && baseSeries.length) {
                    baseSeries.forEach(function eachBaseSeries(base) {
                        var linkedNavSeries = base.navigatorSeries, userNavOptions = extend(
                        // Grab color and visibility from base as default
                        {
                            color: base.color,
                            visible: base.visible
                        }, !isArray(chartNavigatorSeriesOptions) ?
                            chartNavigatorSeriesOptions :
                            defaultOptions.navigator.series);
                        // Don't update if the series exists in nav and we have disabled
                        // adaptToUpdatedData.
                        if (linkedNavSeries &&
                            navigator.navigatorOptions.adaptToUpdatedData === false) {
                            return;
                        }
                        navSeriesMixin.name = 'Navigator ' + baseSeries.length;
                        baseOptions = base.options || {};
                        baseNavigatorOptions = baseOptions.navigatorOptions || {};
                        mergedNavSeriesOptions = merge(baseOptions, navSeriesMixin, userNavOptions, baseNavigatorOptions);
                        // Merge data separately. Do a slice to avoid mutating the
                        // navigator options from base series (#4923).
                        var navigatorSeriesData = baseNavigatorOptions.data || userNavOptions.data;
                        navigator.hasNavigatorData =
                            navigator.hasNavigatorData || !!navigatorSeriesData;
                        mergedNavSeriesOptions.data =
                            navigatorSeriesData ||
                                baseOptions.data && baseOptions.data.slice(0);
                        // Update or add the series
                        if (linkedNavSeries && linkedNavSeries.options) {
                            linkedNavSeries.update(mergedNavSeriesOptions, redraw);
                        }
                        else {
                            base.navigatorSeries = chart.initSeries(mergedNavSeriesOptions);
                            base.navigatorSeries.baseSeries = base; // Store ref
                            navigatorSeries.push(base.navigatorSeries);
                        }
                    });
                }
                // If user has defined data (and no base series) or explicitly defined
                // navigator.series as an array, we create these series on top of any
                // base series.
                if (chartNavigatorSeriesOptions.data &&
                    !(baseSeries && baseSeries.length) ||
                    isArray(chartNavigatorSeriesOptions)) {
                    navigator.hasNavigatorData = false;
                    // Allow navigator.series to be an array
                    chartNavigatorSeriesOptions =
                        splat(chartNavigatorSeriesOptions);
                    chartNavigatorSeriesOptions.forEach(function (userSeriesOptions, i) {
                        navSeriesMixin.name =
                            'Navigator ' + (navigatorSeries.length + 1);
                        mergedNavSeriesOptions = merge(defaultOptions.navigator.series, {
                            // Since we don't have a base series to pull color from,
                            // try to fake it by using color from series with same
                            // index. Otherwise pull from the colors array. We need
                            // an explicit color as otherwise updates will increment
                            // color counter and we'll get a new color for each
                            // update of the nav series.
                            color: chart.series[i] &&
                                !chart.series[i].options.isInternal &&
                                chart.series[i].color ||
                                chart.options.colors[i] ||
                                chart.options.colors[0]
                        }, navSeriesMixin, userSeriesOptions);
                        mergedNavSeriesOptions.data = userSeriesOptions.data;
                        if (mergedNavSeriesOptions.data) {
                            navigator.hasNavigatorData = true;
                            navigatorSeries.push(chart.initSeries(mergedNavSeriesOptions));
                        }
                    });
                }
                if (addEvents) {
                    this.addBaseSeriesEvents();
                }
            },
            /**
             * Add data events.
             * For example when main series is updated we need to recalculate extremes
             *
             * @private
             * @function Highcharts.Navigator#addBaseSeriesEvent
             * @return {void}
             */
            addBaseSeriesEvents: function () {
                var navigator = this, baseSeries = navigator.baseSeries || [];
                // Bind modified extremes event to first base's xAxis only.
                // In event of > 1 base-xAxes, the navigator will ignore those.
                // Adding this multiple times to the same axis is no problem, as
                // duplicates should be discarded by the browser.
                if (baseSeries[0] && baseSeries[0].xAxis) {
                    addEvent(baseSeries[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes);
                }
                baseSeries.forEach(function (base) {
                    // Link base series show/hide to navigator series visibility
                    addEvent(base, 'show', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(true, false);
                        }
                    });
                    addEvent(base, 'hide', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(false, false);
                        }
                    });
                    // Respond to updated data in the base series, unless explicitily
                    // not adapting to data changes.
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        if (base.xAxis) {
                            addEvent(base, 'updatedData', this.updatedDataHandler);
                        }
                    }
                    // Handle series removal
                    addEvent(base, 'remove', function () {
                        if (this.navigatorSeries) {
                            erase(navigator.series, this.navigatorSeries);
                            if (defined(this.navigatorSeries.options)) {
                                this.navigatorSeries.remove(false);
                            }
                            delete this.navigatorSeries;
                        }
                    });
                }, this);
            },
            /**
             * Get minimum from all base series connected to the navigator
             * @private
             * @param  {number} currentSeriesMin
             *         Minium from the current series
             * @return {number} Minimum from all series
             */
            getBaseSeriesMin: function (currentSeriesMin) {
                return this.baseSeries.reduce(function (min, series) {
                    // (#10193)
                    return Math.min(min, series.xData ? series.xData[0] : min);
                }, currentSeriesMin);
            },
            /**
             * Set the navigator x axis extremes to reflect the total. The navigator
             * extremes should always be the extremes of the union of all series in the
             * chart as well as the navigator series.
             *
             * @private
             * @function Highcharts.Navigator#modifyNavigatorAxisExtremes
             */
            modifyNavigatorAxisExtremes: function () {
                var xAxis = this.xAxis, unionExtremes;
                if (xAxis.getExtremes) {
                    unionExtremes = this.getUnionExtremes(true);
                    if (unionExtremes &&
                        (unionExtremes.dataMin !== xAxis.min ||
                            unionExtremes.dataMax !== xAxis.max)) {
                        xAxis.min = unionExtremes.dataMin;
                        xAxis.max = unionExtremes.dataMax;
                    }
                }
            },
            /**
             * Hook to modify the base axis extremes with information from the Navigator
             *
             * @private
             * @function Highcharts.Navigator#modifyBaseAxisExtremes
             */
            modifyBaseAxisExtremes: function () {
                var baseXAxis = this, navigator = baseXAxis.chart.navigator, baseExtremes = baseXAxis.getExtremes(), baseMin = baseExtremes.min, baseMax = baseExtremes.max, baseDataMin = baseExtremes.dataMin, baseDataMax = baseExtremes.dataMax, range = baseMax - baseMin, stickToMin = navigator.stickToMin, stickToMax = navigator.stickToMax, overscroll = pick(baseXAxis.options.overscroll, 0), newMax, newMin, navigatorSeries = navigator.series && navigator.series[0], hasSetExtremes = !!baseXAxis.setExtremes, 
                // When the extremes have been set by range selector button, don't
                // stick to min or max. The range selector buttons will handle the
                // extremes. (#5489)
                unmutable = baseXAxis.eventArgs &&
                    baseXAxis.eventArgs.trigger === 'rangeSelectorButton';
                if (!unmutable) {
                    // If the zoomed range is already at the min, move it to the right
                    // as new data comes in
                    if (stickToMin) {
                        newMin = baseDataMin;
                        newMax = newMin + range;
                    }
                    // If the zoomed range is already at the max, move it to the right
                    // as new data comes in
                    if (stickToMax) {
                        newMax = baseDataMax + overscroll;
                        // if stickToMin is true, the new min value is set above
                        if (!stickToMin) {
                            newMin = Math.max(newMax - range, navigator.getBaseSeriesMin(navigatorSeries && navigatorSeries.xData ?
                                navigatorSeries.xData[0] :
                                -Number.MAX_VALUE));
                        }
                    }
                    // Update the extremes
                    if (hasSetExtremes && (stickToMin || stickToMax)) {
                        if (isNumber(newMin)) {
                            baseXAxis.min = baseXAxis.userMin = newMin;
                            baseXAxis.max = baseXAxis.userMax = newMax;
                        }
                    }
                }
                // Reset
                navigator.stickToMin =
                    navigator.stickToMax = null;
            },
            /**
             * Handler for updated data on the base series. When data is modified, the
             * navigator series must reflect it. This is called from the Chart.redraw
             * function before axis and series extremes are computed.
             *
             * @private
             * @function Highcharts.Navigator#updateDataHandler
             */
            updatedDataHandler: function () {
                var navigator = this.chart.navigator, baseSeries = this, navigatorSeries = this.navigatorSeries, xDataMin = navigator.getBaseSeriesMin(baseSeries.xData[0]);
                // If the scrollbar is scrolled all the way to the right, keep right as
                // new data  comes in.
                navigator.stickToMax = navigator.reversedExtremes ?
                    Math.round(navigator.zoomedMin) === 0 :
                    Math.round(navigator.zoomedMax) >= Math.round(navigator.size);
                // Detect whether the zoomed area should stick to the minimum or
                // maximum. If the current axis minimum falls outside the new updated
                // dataset, we must adjust.
                navigator.stickToMin = isNumber(baseSeries.xAxis.min) &&
                    (baseSeries.xAxis.min <= xDataMin) &&
                    (!this.chart.fixedRange || !navigator.stickToMax);
                // Set the navigator series data to the new data of the base series
                if (navigatorSeries && !navigator.hasNavigatorData) {
                    navigatorSeries.options.pointStart = baseSeries.xData[0];
                    navigatorSeries.setData(baseSeries.options.data, false, null, false); // #5414
                }
            },
            /**
             * Add chart events, like redrawing navigator, when chart requires that.
             *
             * @private
             * @function Highcharts.Navigator#addChartEvents
             * @return {void}
             */
            addChartEvents: function () {
                if (!this.eventsToUnbind) {
                    this.eventsToUnbind = [];
                }
                this.eventsToUnbind.push(
                // Move the scrollbar after redraw, like after data updata even if
                // axes don't redraw
                addEvent(this.chart, 'redraw', function () {
                    var navigator = this.navigator, xAxis = navigator && (navigator.baseSeries &&
                        navigator.baseSeries[0] &&
                        navigator.baseSeries[0].xAxis ||
                        navigator.scrollbar && this.xAxis[0]); // #5709
                    if (xAxis) {
                        navigator.render(xAxis.min, xAxis.max);
                    }
                }), 
                // Make room for the navigator, can be placed around the chart:
                addEvent(this.chart, 'getMargins', function () {
                    var chart = this, navigator = chart.navigator, marginName = navigator.opposite ?
                        'plotTop' : 'marginBottom';
                    if (chart.inverted) {
                        marginName = navigator.opposite ?
                            'marginRight' : 'plotLeft';
                    }
                    chart[marginName] =
                        (chart[marginName] || 0) + (navigator.navigatorEnabled || !chart.inverted ?
                            navigator.outlineHeight :
                            0) + navigator.navigatorOptions.margin;
                }));
            },
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Navigator#destroy
             */
            destroy: function () {
                // Disconnect events added in addEvents
                this.removeEvents();
                if (this.xAxis) {
                    erase(this.chart.xAxis, this.xAxis);
                    erase(this.chart.axes, this.xAxis);
                }
                if (this.yAxis) {
                    erase(this.chart.yAxis, this.yAxis);
                    erase(this.chart.axes, this.yAxis);
                }
                // Destroy series
                (this.series || []).forEach(function (s) {
                    if (s.destroy) {
                        s.destroy();
                    }
                });
                // Destroy properties
                [
                    'series', 'xAxis', 'yAxis', 'shades', 'outline', 'scrollbarTrack',
                    'scrollbarRifles', 'scrollbarGroup', 'scrollbar', 'navigatorGroup',
                    'rendered'
                ].forEach(function (prop) {
                    if (this[prop] && this[prop].destroy) {
                        this[prop].destroy();
                    }
                    this[prop] = null;
                }, this);
                // Destroy elements in collection
                [this.handles].forEach(function (coll) {
                    destroyObjectProperties(coll);
                }, this);
            }
        };
        if (!H.Navigator) {
            H.Navigator = Navigator;
            // For Stock charts, override selection zooming with some special features
            // because X axis zooming is already allowed by the Navigator and Range
            // selector.
            addEvent(Axis, 'zoom', function (e) {
                var chart = this.chart, chartOptions = chart.options, zoomType = chartOptions.chart.zoomType, pinchType = chartOptions.chart.pinchType, previousZoom, navigator = chartOptions.navigator, rangeSelector = chartOptions.rangeSelector;
                if (this.isXAxis && ((navigator && navigator.enabled) ||
                    (rangeSelector && rangeSelector.enabled))) {
                    // For y only zooming, ignore the X axis completely
                    if (zoomType === 'y') {
                        e.zoomed = false;
                        // For xy zooming, record the state of the zoom before zoom
                        // selection, then when the reset button is pressed, revert to this
                        // state. This should apply only if the chart is initialized with a
                        // range (#6612), otherwise zoom all the way out.
                    }
                    else if (((!isTouchDevice && zoomType === 'xy') ||
                        (isTouchDevice && pinchType === 'xy')) &&
                        this.options.range) {
                        previousZoom = this.previousZoom;
                        if (defined(e.newMin)) {
                            this.previousZoom = [this.min, this.max];
                        }
                        else if (previousZoom) {
                            e.newMin = previousZoom[0];
                            e.newMax = previousZoom[1];
                            delete this.previousZoom;
                        }
                    }
                }
                if (e.zoomed !== undefined) {
                    e.preventDefault();
                }
            });
            // For Stock charts. For x only zooming, do not to create the zoom button
            // because X axis zooming is already allowed by the Navigator and Range
            // selector. (#9285)
            addEvent(Chart, 'beforeShowResetZoom', function () {
                var chartOptions = this.options, navigator = chartOptions.navigator, rangeSelector = chartOptions.rangeSelector;
                if (((navigator && navigator.enabled) ||
                    (rangeSelector && rangeSelector.enabled)) &&
                    ((!isTouchDevice && chartOptions.chart.zoomType === 'x') ||
                        (isTouchDevice && chartOptions.chart.pinchType === 'x'))) {
                    return false;
                }
            });
            // Initialize navigator for stock charts
            addEvent(Chart, 'beforeRender', function () {
                var options = this.options;
                if (options.navigator.enabled ||
                    options.scrollbar.enabled) {
                    this.scroller = this.navigator = new Navigator(this);
                }
            });
            // For stock charts, extend the Chart.setChartSize method so that we can set
            // the final top position of the navigator once the height of the chart,
            // including the legend, is determined. #367. We can't use Chart.getMargins,
            // because labels offsets are not calculated yet.
            addEvent(Chart, 'afterSetChartSize', function () {
                var legend = this.legend, navigator = this.navigator, scrollbarHeight, legendOptions, xAxis, yAxis;
                if (navigator) {
                    legendOptions = legend && legend.options;
                    xAxis = navigator.xAxis;
                    yAxis = navigator.yAxis;
                    scrollbarHeight = navigator.scrollbarHeight;
                    // Compute the top position
                    if (this.inverted) {
                        navigator.left = navigator.opposite ?
                            this.chartWidth - scrollbarHeight -
                                navigator.height :
                            this.spacing[3] + scrollbarHeight;
                        navigator.top = this.plotTop + scrollbarHeight;
                    }
                    else {
                        navigator.left = this.plotLeft + scrollbarHeight;
                        navigator.top = navigator.navigatorOptions.top ||
                            this.chartHeight -
                                navigator.height -
                                scrollbarHeight -
                                this.spacing[2] -
                                (this.rangeSelector && this.extraBottomMargin ?
                                    this.rangeSelector.getHeight() :
                                    0) -
                                ((legendOptions &&
                                    legendOptions.verticalAlign === 'bottom' &&
                                    legendOptions.enabled &&
                                    !legendOptions.floating) ?
                                    legend.legendHeight +
                                        pick(legendOptions.margin, 10) :
                                    0) -
                                (this.titleOffset ? this.titleOffset[2] : 0);
                    }
                    if (xAxis && yAxis) { // false if navigator is disabled (#904)
                        if (this.inverted) {
                            xAxis.options.left = yAxis.options.left = navigator.left;
                        }
                        else {
                            xAxis.options.top = yAxis.options.top = navigator.top;
                        }
                        xAxis.setAxisSize();
                        yAxis.setAxisSize();
                    }
                }
            });
            // Merge options, if no scrolling exists yet
            addEvent(Chart, 'update', function (e) {
                var navigatorOptions = (e.options.navigator || {}), scrollbarOptions = (e.options.scrollbar || {});
                if (!this.navigator && !this.scroller &&
                    (navigatorOptions.enabled || scrollbarOptions.enabled)) {
                    merge(true, this.options.navigator, navigatorOptions);
                    merge(true, this.options.scrollbar, scrollbarOptions);
                    delete e.options.navigator;
                    delete e.options.scrollbar;
                }
            });
            // Initialize navigator, if no scrolling exists yet
            addEvent(Chart, 'afterUpdate', function (event) {
                if (!this.navigator && !this.scroller &&
                    (this.options.navigator.enabled ||
                        this.options.scrollbar.enabled)) {
                    this.scroller = this.navigator = new Navigator(this);
                    if (pick(event.redraw, true)) {
                        this.redraw(event.animation); // #7067
                    }
                }
            });
            // Handle adding new series
            addEvent(Chart, 'afterAddSeries', function () {
                if (this.navigator) {
                    // Recompute which series should be shown in navigator, and add them
                    this.navigator.setBaseSeries(null, false);
                }
            });
            // Handle updating series
            addEvent(Series, 'afterUpdate', function () {
                if (this.chart.navigator && !this.options.isInternal) {
                    this.chart.navigator.setBaseSeries(null, false);
                }
            });
            Chart.prototype.callbacks.push(function (chart) {
                var extremes, navigator = chart.navigator;
                // Initialize the navigator
                if (navigator && chart.xAxis[0]) {
                    extremes = chart.xAxis[0].getExtremes();
                    navigator.render(extremes.min, extremes.max);
                }
            });
        }

    });
    _registerModule(_modules, 'masters/modules/gantt.src.js', [], function () {


    });
}));