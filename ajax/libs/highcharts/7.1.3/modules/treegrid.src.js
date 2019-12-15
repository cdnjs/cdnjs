/**
 * @license Highcharts Gantt JS v7.1.3 (2019-08-14)
 *
 * Tree Grid
 *
 * (c) 2016-2019 Jon Arild Nygard
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/treegrid', ['highcharts'], function (Highcharts) {
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
                if (Object.prototype.hasOwnProperty.call(methods, method)) {
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
    _registerModule(_modules, 'masters/modules/treegrid.src.js', [], function () {


    });
}));