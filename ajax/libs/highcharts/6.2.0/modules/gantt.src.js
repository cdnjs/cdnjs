/**
 * @license Highcharts JS v6.2.0 (2018-10-17)
 * Gantt series
 *
 * (c) 2016 Lars A. V. Cabrera
 *
 * --- WORK IN PROGRESS ---
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory;
		});
	} else {
		factory(Highcharts);
	}
}(function (Highcharts) {
	(function (H) {
		/**
		* (c) 2016 Highsoft AS
		* Author: Lars A. V. Cabrera
		*
		* License: www.highcharts.com/license
		*/

		/**
		 * Show an indicator on the axis for the current date and time. Can be a boolean
		 * or a configuration object similar to [xAxis.plotLines](#xAxis.plotLines).
		 *
		 * @type {Object}
		 * @extends {xAxis.plotLines}
		 * @excluding value
		 * @sample  gantt/current-date-indicator/demo
		 *          Current date indicator enabled
		 * @sample  gantt/current-date-indicator/object-config
		 *          Current date indicator with custom options
		 * @product gantt
		 * @apioption xAxis.currentDateIndicator
		 */

		var addEvent = H.addEvent,
		    Axis = H.Axis,
		    PlotLineOrBand = H.PlotLineOrBand,
		    merge = H.merge,
		    defaultConfig = {
		        currentDateIndicator: true,
		        color: '#ccd6eb',
		        width: 2,
		        label: {
		            format: '%a, %b %d %Y, %H:%M',
		            formatter: undefined,
		            rotation: 0,
		            style: {
		                fontSize: '10px'
		            }
		        }
		    };

		addEvent(Axis, 'afterSetOptions', function () {
		    var options = this.options,
		        cdiOptions = options.currentDateIndicator;

		    if (cdiOptions) {
		        if (typeof cdiOptions === 'object') {
		            // Ignore formatter if custom format is defined
		            if (cdiOptions.label && cdiOptions.label.format) {
		                cdiOptions.label.formatter = undefined;
		            }
		            cdiOptions = merge(defaultConfig, cdiOptions);
		        } else {
		            cdiOptions = merge(defaultConfig);
		        }

		        cdiOptions.value = new Date();

		        if (!options.plotLines) {
		            options.plotLines = [];
		        }

		        options.plotLines.push(cdiOptions);
		    }

		});

		addEvent(PlotLineOrBand, 'render', function () {
		    var options = this.options,
		        format,
		        formatter;

		    if (options.currentDateIndicator && options.label) {
		        format = options.label.format;
		        formatter = options.label.formatter;

		        options.value = new Date();
		        if (typeof formatter === 'function') {
		            options.label.text = formatter(this);
		        } else {
		            options.label.text = H.dateFormat(format, new Date());
		        }

		        // If the label already exists, update its text
		        if (this.label) {
		            this.label.attr({
		                text: options.label.text
		            });
		        }
		    }
		});

	}(Highcharts));
	(function (H) {
		/**
		* (c) 2016 Highsoft AS
		* Authors: Lars A. V. Cabrera
		*
		* License: www.highcharts.com/license
		*/

		var argsToArray = function (args) {
		        return Array.prototype.slice.call(args, 1);
		    },
		    dateFormat = H.dateFormat,
		    defined = H.defined,
		    each = H.each,
		    isArray = H.isArray,
		    isNumber = H.isNumber,
		    isObject = function (x) {
		        // Always use strict mode
		        return H.isObject(x, true);
		    },
		    merge = H.merge,
		    pick = H.pick,
		    wrap = H.wrap,
		    Axis = H.Axis,
		    Tick = H.Tick;

		/**
		 * Set grid options for the axis labels. Requires Highcharts Gantt.
		 *
		 * @type      {object}
		 * @since     6.2.0
		 * @product   gantt
		 * @apioption xAxis.grid
		 */

		/**
		 * Enable grid on the axis labels. Defaults to true for Gantt charts.
		 *
		 * @type      {boolean}
		 * @since     6.2.0
		 * @default   true
		 * @product   gantt
		 * @apioption xAxis.grid.enabled
		 */

		/**
		 * Set specific options for each column (or row for horizontal axes) in the
		 * grid. Each extra column/row is its own axis, and the axis options can be set
		 * here.
		 *
		 * @type      {Array<object>}
		 * @sample    gantt/demo/left-axis-table
		 *            Left axis as a table
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
		 * @default 1
		 * @apioption xAxis.grid.borderWidth
		 */

		/**
		 * Set cell height for grid axis labels. By default this is calculated from font
		 * size.
		 *
		 * @type      {number}
		 * @default null
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
		 * Checks if an axis is a navigator axis.
		 * @return {Boolean} true if axis is found in axis.chart.navigator
		 */
		Axis.prototype.isNavigatorAxis = function () {
		    return /highcharts-navigator-[xy]axis/.test(this.options.className);
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
		 * @return true if the axis is the outermost axis in its dimension;
		 *         false if not
		 */
		Axis.prototype.isOuterAxis = function () {
		    var axis = this,
		        chart = axis.chart,
		        thisIndex = -1,
		        isOuter = true;

		    each(chart.axes, function (otherAxis, index) {
		        if (otherAxis.side === axis.side && !otherAxis.isNavigatorAxis()) {
		            if (otherAxis === axis) {
		                // Get the index of the axis in question
		                thisIndex = index;

		                // Check thisIndex >= 0 in case thisIndex has
		                // not been found yet
		            } else if (thisIndex >= 0 && index > thisIndex) {
		                // There was an axis on the same side with a
		                // higher index.
		                isOuter = false;
		            }
		        }
		    });
		    // There were either no other axes on the same side,
		    // or the other axes were not farther from the chart
		    return isOuter;
		};

		/**
		 * Get the largest label width and height.
		 * @param {object} ticks All the ticks on one axis.
		 * @param {array} tickPositions All the tick positions on one axis.
		 * @return {object} object containing the properties height and width.
		 */
		Axis.prototype.getMaxLabelDimensions = function (ticks, tickPositions) {
		    var dimensions = {
		        width: 0,
		        height: 0
		    };

		    each(tickPositions, function (pos) {
		        var tick = ticks[pos],
		            tickHeight = 0,
		            tickWidth = 0,
		            label;

		        if (isObject(tick)) {
		            label = isObject(tick.label) ? tick.label : {};

		            // Find width and height of tick
		            tickHeight = label.getBBox ? label.getBBox().height : 0;
		            tickWidth = isNumber(label.textPxLength) ? label.textPxLength : 0;

		            // Update the result if width and/or height are larger
		            dimensions.height = Math.max(tickHeight, dimensions.height);
		            dimensions.width = Math.max(tickWidth, dimensions.width);
		        }
		    });

		    return dimensions;
		};

		/**
		 * Add custom date formats
		 */
		H.dateFormats = {
		    // Week number
		    W: function (timestamp) {
		        var d = new Date(timestamp),
		            yearStart,
		            weekNo;
		        d.setHours(0, 0, 0, 0);
		        d.setDate(d.getDate() - (d.getDay() || 7));
		        yearStart = new Date(d.getFullYear(), 0, 1);
		        weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
		        return weekNo;
		    },
		    // First letter of the day of the week, e.g. 'M' for 'Monday'.
		    E: function (timestamp) {
		        return dateFormat('%a', timestamp, true).charAt(0);
		    }
		};

		/**
		 * If chart is stockChart, always return 'left' to avoid labels being placed
		 * inside chart. Stock charts place yAxis labels inside by default.
		 * @param {function} proceed - the original function
		 * @return {string} 'left' if stockChart, or auto calculated alignment
		 */
		wrap(Axis.prototype, 'autoLabelAlign', function (proceed) {
		    var axis = this,
		        retVal;
		    if (axis.chart.isStock) {
		        retVal = 'left';
		    } else {
		        retVal = proceed.apply(axis, argsToArray(arguments));
		    }
		    return retVal;
		});

		/**
		 * Center tick labels in cells.
		 *
		 * @param {function} proceed - the original function
		 *
		 * @return {object} object - an object containing x and y positions
		 *                           for the tick
		 */
		wrap(Tick.prototype, 'getLabelPosition', function (proceed, x, y, label, horiz,
		            labelOpts, tickmarkOffset, index) {
		    var tick = this,
		        axis = tick.axis,
		        reversed = axis.reversed,
		        chart = axis.chart,
		        options = axis.options,
		        gridOptions = (options && isObject(options.grid)) ? options.grid : {},
		        align = labelOpts.align,
		        // verticalAlign is currently not supported for axis.labels.
		        verticalAlign = 'middle', // labelOpts.verticalAlign,
		        side = axisSide[axis.side],
		        tickPositions = axis.tickPositions,
		        tickPos = tick.pos - tickmarkOffset,
		        nextTickPos = (
		            isNumber(tickPositions[index + 1]) ?
		            tickPositions[index + 1] - tickmarkOffset :
		            axis.max + tickmarkOffset
		        ),
		        tickSize = axis.tickSize('tick', true),
		        tickWidth = isArray(tickSize) ? tickSize[0] : 0,
		        crispCorr = tickSize && tickSize[1] / 2,
		        labelHeight,
		        lblMetrics,
		        lines,
		        result,
		        bottom,
		        top,
		        left,
		        right;

		    // Only center tick labels in grid axes
		    if (gridOptions.enabled === true) {
		        /**
		         * Calculate top and bottom positions of the cell.
		         */
		        if (side === 'top') {
		            bottom = axis.top + axis.offset;
		            top = bottom - tickWidth;
		        } else if (side === 'bottom') {
		            top = chart.chartHeight - axis.bottom + axis.offset;
		            bottom = top + tickWidth;
		        } else {
		            bottom = axis.top + axis.len - axis.translate(
		                reversed ? nextTickPos : tickPos
		            );
		            top = axis.top + axis.len - axis.translate(
		                reversed ? tickPos : nextTickPos
		            );
		        }

		        /**
		         * Calculate left and right positions of the cell.
		         */
		        if (side === 'right') {
		            left = chart.chartWidth - axis.right + axis.offset;
		            right = left + tickWidth;
		        } else if (side === 'left') {
		            right = axis.left + axis.offset;
		            left = right - tickWidth;
		        } else {
		            left = Math.round(axis.left + axis.translate(
		                reversed ? nextTickPos : tickPos
		            )) - crispCorr;
		            right = Math.round(axis.left + axis.translate(
		                reversed ? tickPos : nextTickPos
		            )) - crispCorr;
		        }

		        tick.slotWidth = right - left;

		        /**
		         * Calculate the positioning of the label based on alignment.
		         */
		        result = {
		            x: (
		                align === 'left' ?
		                left :
		                align === 'right' ?
		                right :
		                left + ((right - left) / 2) // default to center
		            ),
		            y: (
		                verticalAlign === 'top' ?
		                top :
		                verticalAlign === 'bottom' ?
		                bottom :
		                top + ((bottom - top) / 2) // default to middle
		            )
		        };

		        lblMetrics = chart.renderer.fontMetrics(
		            labelOpts.style.fontSize,
		            label.element
		        );
		        labelHeight = label.getBBox().height;

		        // Adjustment to y position to align the label correctly.
		        // Would be better to have a setter or similar for this.
		        if (!labelOpts.useHTML) {
		            lines = Math.round(labelHeight / lblMetrics.h);
		            result.y += (
		                // Center the label
		                // TODO: why does this actually center the label?
		                ((lblMetrics.b - (lblMetrics.h - lblMetrics.f)) / 2) +
		                // Adjust for height of additional lines.
		                -(((lines - 1) * lblMetrics.h) / 2)
		            );
		        } else {
		            result.y += (
		                // Readjust yCorr in htmlUpdateTransform
		                lblMetrics.b +
		                // Adjust for height of html label
		                -(labelHeight / 2)
		            );
		        }

		        result.x += (axis.horiz && labelOpts.x || 0);
		    } else {
		        result = proceed.apply(tick, argsToArray(arguments));
		    }
		    return result;
		});

		/**
		 * Draw vertical axis ticks extra long to create cell floors and roofs.
		 * Overrides the tickLength for vertical axes.
		 *
		 * @param {function} proceed - the original function
		 * @returns {array} retVal -
		 */
		wrap(Axis.prototype, 'tickSize', function (proceed) {
		    var axis = this,
		        dimensions = axis.maxLabelDimensions,
		        options = axis.options,
		        gridOptions = (options && isObject(options.grid)) ? options.grid : {},
		        retVal = proceed.apply(axis, argsToArray(arguments)),
		        labelPadding,
		        distance;

		    if (gridOptions.enabled === true) {
		        labelPadding = (Math.abs(axis.defaultLeftAxisOptions.labels.x) * 2);
		        distance = labelPadding +
		            (axis.horiz ? dimensions.height : dimensions.width);

		        if (isArray(retVal)) {
		            retVal[0] = distance;
		        } else {
		            retVal = [distance];
		        }
		    }
		    return retVal;
		});

		wrap(Axis.prototype, 'getTitlePosition', function (proceed) {
		    var axis = this,
		        options = axis.options,
		        gridOptions = (options && isObject(options.grid)) ? options.grid : {};

		    if (gridOptions.enabled === true) {
		        // compute anchor points for each of the title align options
		        var title = axis.axisTitle,
		            titleWidth = title && title.getBBox().width,
		            horiz = axis.horiz,
		            axisLeft = axis.left,
		            axisTop = axis.top,
		            axisWidth = axis.width,
		            axisHeight = axis.height,
		            axisTitleOptions = options.title,
		            opposite = axis.opposite,
		            offset = axis.offset,
		            tickSize = axis.tickSize() || [0],
		            xOption = axisTitleOptions.x || 0,
		            yOption = axisTitleOptions.y || 0,
		            titleMargin = pick(axisTitleOptions.margin, horiz ? 5 : 10),
		            titleFontSize = axis.chart.renderer.fontMetrics(
		                axisTitleOptions.style && axisTitleOptions.style.fontSize,
		                title
		            ).f,
		            // TODO account for alignment
		            // the position in the perpendicular direction of the axis
		            offAxis = (horiz ? axisTop + axisHeight : axisLeft) +
		                (horiz ? 1 : -1) * // horizontal axis reverses the margin
		                (opposite ? -1 : 1) * // so does opposite axes
		                (tickSize[0] / 2) +
		                (axis.side === axisSide.bottom ? titleFontSize : 0);

		        return {
		            x: horiz ?
		                axisLeft - titleWidth / 2 - titleMargin + xOption :
		                offAxis + (opposite ? axisWidth : 0) + offset + xOption,
		            y: horiz ?
		                (
		                    offAxis -
		                    (opposite ? axisHeight : 0) +
		                    (opposite ? titleFontSize : -titleFontSize) / 2 +
		                    offset +
		                    yOption
		                ) :
		                axisTop - titleMargin + yOption
		        };
		    }

		    return proceed.apply(this, argsToArray(arguments));
		});

		/**
		 * Avoid altering tickInterval when reserving space.
		 */
		wrap(Axis.prototype, 'unsquish', function (proceed) {
		    var axis = this,
		        options = axis.options,
		        gridOptions = (options && isObject(options.grid)) ? options.grid : {};

		    if (gridOptions.enabled === true && this.categories) {
		        return this.tickInterval;
		    }

		    return proceed.apply(this, argsToArray(arguments));
		});

		/**
		 * Creates a left and right wall on horizontal axes:
		 * - Places leftmost tick at the start of the axis, to create a left wall
		 * - Ensures that the rightmost tick is at the end of the axis, to create a
		 *    right wall.
		 *
		 * @param {function} proceed - the original function
		 * @param {object} options - the pure axis options as input by the user
		 */
		H.addEvent(Axis, 'afterSetOptions', function (e) {
		    var options = this.options,
		        userOptions = e.userOptions,
		        gridAxisOptions,
		        gridOptions = (options && isObject(options.grid)) ? options.grid : {};

		    if (gridOptions.enabled === true) {

		        // Merge the user options into default grid axis options so that when a
		        // user option is set, it takes presedence.
		        gridAxisOptions = merge(true, {

		            className: 'highcharts-grid-axis ' + (userOptions.className || ''),

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

		            title: {
		                text: null,
		                reserveSpace: false,
		                rotation: 0
		            },

		            // In a grid axis, only allow one unit of certain types, for example
		            // we shouln't have one grid cell spanning two days.
		            units: [[
		                'millisecond', // unit name
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
		            if (
		                defined(userOptions.linkedTo) &&
		                !defined(userOptions.tickPixelInterval)
		            ) {
		                gridAxisOptions.tickPixelInterval = 350;
		            }

		            // For the secondary grid axis, use the primary axis' tick intervals
		            // and return ticks one level higher.
		            if (
		                // Check for tick pixel interval in options
		                !defined(userOptions.tickPixelInterval) &&

		                // Only for linked axes
		                defined(userOptions.linkedTo) &&

		                !defined(userOptions.tickPositioner) &&
		                !defined(userOptions.tickInterval)
		            ) {
		                gridAxisOptions.tickPositioner = function (min, max) {

		                    var parentInfo = (
		                        this.linkedParent &&
		                        this.linkedParent.tickPositions &&
		                        this.linkedParent.tickPositions.info
		                    );

		                    if (parentInfo) {

		                        var unitIdx,
		                            count,
		                            unitName,
		                            i,
		                            units = gridAxisOptions.units,
		                            unitRange;

		                        for (i = 0; i < units.length; i++) {
		                            if (units[i][0] === parentInfo.unitName) {
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
		                            count = (units[unitIdx + 1][1] || [1])[0];
		                        }

		                        unitRange = H.timeUnits[unitName];
		                        this.tickInterval = unitRange * count;
		                        return this.getTimeTicks(
		                            {
		                                unitRange: unitRange,
		                                count: count,
		                                unitName: unitName
		                            },
		                            min,
		                            max,
		                            this.options.startOfWeek
		                        );
		                    }
		                };
		            }

		        }

		        // Now merge the combined options into the axis options
		        merge(true, this.options, gridAxisOptions);

		        if (this.horiz) {
		            /**              _________________________
		             * Make this:    ___|_____|_____|_____|__|
		             *               ^                     ^
		             *               _________________________
		             * Into this:    |_____|_____|_____|_____|
		             *                  ^                 ^
		             */
		            options.minPadding = pick(userOptions.minPadding, 0);
		            options.maxPadding = pick(userOptions.maxPadding, 0);
		        }

		        // If borderWidth is set, then use its value for tick and line width.
		        if (isNumber(options.grid.borderWidth)) {
		            options.tickWidth = options.lineWidth = gridOptions.borderWidth;
		        }

		    }
		});

		/**
		 * Ensures a left wall on horizontal axes with series inheriting from column.
		 * ColumnSeries normally sets pointRange to null, resulting in Axis to select
		 * other values for point ranges. This enforces the above Axis.setOptions()
		 * override.
		 *                  _________________________
		 * Enforce this:    ___|_____|_____|_____|__|
		 *                  ^
		 *                  _________________________
		 * To be this:      |_____|_____|_____|_____|
		 *                  ^
		 *
		 * @param {function} proceed - the original function
		 * @param {object} options - the pure axis options as input by the user
		 */
		wrap(Axis.prototype, 'setAxisTranslation', function (proceed) {
		    var axis = this,
		        options = axis.options,
		        gridOptions = (options && isObject(options.grid)) ? options.grid : {},
		        tickInfo = this.tickPositions && this.tickPositions.info,
		        userLabels = this.userOptions.labels || {};

		    if (this.horiz) {
		        if (gridOptions.enabled === true) {
		            each(axis.series, function (series) {
		                series.options.pointRange = 0;
		            });
		        }

		        // Lower level time ticks, like hours or minutes, represent points in
		        // time and not ranges. These should be aligned left in the grid cell
		        // by default. The same applies to years of higher order.
		        if (
		            tickInfo &&
		            (
		                options.dateTimeLabelFormats[tickInfo.unitName]
		                    .range === false ||
		                tickInfo.count > 1 // years
		            ) &&
		            !defined(userLabels.align)
		        ) {
		            options.labels.align = 'left';

		            if (!defined(userLabels.x)) {
		                options.labels.x = 3;
		            }
		        }
		    }

		    proceed.apply(axis, argsToArray(arguments));
		});

		// TODO: Does this function do what the drawing says? Seems to affect ticks and
		//       not the labels directly?
		/**
		 * Makes tick labels which are usually ignored in a linked axis displayed if
		 * they are within range of linkedParent.min.
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
		 * @param {function} proceed - the original function
		 */
		wrap(Axis.prototype, 'trimTicks', function (proceed) {
		    var axis = this,
		        options = axis.options,
		        gridOptions = (options && isObject(options.grid)) ? options.grid : {},
		        categoryAxis = axis.categories,
		        tickPositions = axis.tickPositions,
		        firstPos = tickPositions[0],
		        lastPos = tickPositions[tickPositions.length - 1],
		        linkedMin = axis.linkedParent && axis.linkedParent.min,
		        linkedMax = axis.linkedParent && axis.linkedParent.max,
		        min = linkedMin || axis.min,
		        max = linkedMax || axis.max,
		        tickInterval = axis.tickInterval,
		        moreThanMin = firstPos > min,
		        lessThanMax = lastPos < max,
		        endMoreThanMin = firstPos < min && firstPos + tickInterval > min,
		        startLessThanMax = lastPos > max && lastPos - tickInterval < max;

		    if (
		        gridOptions.enabled === true &&
		        !categoryAxis &&
		        (axis.horiz || axis.isLinked)
		    ) {
		        if ((moreThanMin || endMoreThanMin) && !options.startOnTick) {
		            tickPositions[0] = min;
		        }

		        if ((lessThanMax || startLessThanMax) && !options.endOnTick) {
		            tickPositions[tickPositions.length - 1] = max;
		        }
		    }

		    proceed.apply(axis, argsToArray(arguments));
		});

		/**
		 * Draw an extra line on the far side of the outermost axis,
		 * creating floor/roof/wall of a grid. And some padding.
		 *
		 * Make this:
		 *             (axis.min) __________________________ (axis.max)
		 *                           |    |    |    |    |
		 * Into this:
		 *             (axis.min) __________________________ (axis.max)
		 *                        ___|____|____|____|____|__
		 *
		 * @param {function} proceed - the original function
		 */
		wrap(Axis.prototype, 'render', function (proceed) {
		    var axis = this,
		        options = axis.options,
		        gridOptions = (options && isObject(options.grid)) ? options.grid : {},
		        labelPadding,
		        distance,
		        lineWidth,
		        linePath,
		        yStartIndex,
		        yEndIndex,
		        xStartIndex,
		        xEndIndex,
		        renderer = axis.chart.renderer,
		        horiz = axis.horiz,
		        axisGroupBox;

		    if (gridOptions.enabled === true) {
		        // TODO acutual label padding (top, bottom, left, right)
		        // Label padding is needed to figure out where to draw the outer line.
		        labelPadding = (Math.abs(axis.defaultLeftAxisOptions.labels.x) * 2);
		        axis.maxLabelDimensions = axis.getMaxLabelDimensions(
		            axis.ticks,
		            axis.tickPositions
		        );
		        distance = axis.maxLabelDimensions.width + labelPadding;
		        lineWidth = options.lineWidth;

		        // Remove right wall before rendering if updating
		        if (axis.rightWall) {
		            axis.rightWall.destroy();
		        }

		        // Call original Axis.render() to obtain axis.axisLine and
		        // axis.axisGroup
		        proceed.apply(axis);

		        axisGroupBox = axis.axisGroup.getBBox();

		        /*
		         * Draw an extra axis line on outer axes
		         *             >
		         * Make this:    |______|______|______|___
		         *
		         *             > _________________________
		         * Into this:    |______|______|______|__|
		         *
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
		                if (axis.side === axisSide.top || axis.side === axisSide.left) {
		                    distance = -distance;
		                }

		                // If axis is horizontal, reposition line path vertically
		                if (horiz) {
		                    linePath[yStartIndex] = linePath[yStartIndex] + distance;
		                    linePath[yEndIndex] = linePath[yEndIndex] + distance;
		                } else {
		                    // If axis is vertical, reposition line path horizontally
		                    linePath[xStartIndex] = linePath[xStartIndex] + distance;
		                    linePath[xEndIndex] = linePath[xEndIndex] + distance;
		                }

		                if (!axis.axisLineExtra) {
		                    axis.axisLineExtra = renderer.path(linePath)
		                        .attr({
                            
		                            stroke: options.lineColor,
		                            'stroke-width': lineWidth,
                            
		                            zIndex: 7
		                        })
		                        .addClass('highcharts-axis-line')
		                        .add(axis.axisGroup);
		                } else {
		                    axis.axisLineExtra.animate({
		                        d: linePath
		                    });
		                }

		                // show or hide the line depending on options.showEmpty
		                axis.axisLine[axis.showAxis ? 'show' : 'hide'](true);
		            }
		        }

		    } else {
		        proceed.apply(axis);
		    }
		});

		/**
		 * Wraps axis init to draw cell walls on vertical axes.
		 *
		 * @param {function} proceed - the original function
		 */
		wrap(Axis.prototype, 'init', function (proceed, chart, userOptions) {
		    var axis = this,
		        gridOptions = (
		            (userOptions && isObject(userOptions.grid)) ?
		            userOptions.grid :
		            {}
		        ),
		        columnOptions,
		        column,
		        columnIndex,
		        i;
		    function applyGridOptions(axis) {
		        var options = axis.options,
		            // TODO: Consider using cell margins defined in % of font size?
		            // 25 is optimal height for default fontSize (11px)
		            // 25 / 11 ≈ 2.28
		            fontSizeToCellHeightRatio = 25 / 11,
		            fontSize = options.labels.style.fontSize,
		            fontMetrics = axis.chart.renderer.fontMetrics(fontSize);

		        // Center-align by default
		        if (!options.labels) {
		            options.labels = {};
		        }
		        options.labels.align = pick(options.labels.align, 'center');

		        // TODO: Check against tickLabelPlacement between/on etc
		        /**
		         * Prevents adding the last tick label if the axis is not a category
		         * axis.
		         *
		         * Since numeric labels are normally placed at starts and ends of a
		         * range of value, and this module makes the label point at the value,
		         * an "extra" label would appear.
		         */
		        if (!axis.categories) {
		            options.showLastLabel = false;
		        }

		        /**
		         * Make tick marks taller, creating cell walls of a grid.
		         * Use cellHeight axis option if set
		         */
		        if (axis.horiz) {
		            options.tickLength = gridOptions.cellHeight ||
		                    fontMetrics.h * fontSizeToCellHeightRatio;
		        }

		        /**
		         * Prevents rotation of labels when squished, as rotating them would not
		         * help.
		         */
		        axis.labelRotation = 0;
		        options.labels.rotation = 0;
		    }

		    if (gridOptions.enabled) {
		        if (defined(gridOptions.borderColor)) {
		            userOptions.tickColor =
		                userOptions.lineColor = gridOptions.borderColor;
		        }

		        // Handle columns, each column is a grid axis
		        if (isArray(gridOptions.columns)) {
		            columnIndex = 0;
		            i = gridOptions.columns.length;
		            while (i--) {
		                columnOptions = merge(
		                    userOptions,
		                    gridOptions.columns[i],
		                    {
		                        // Force to behave like category axis
		                        type: 'category'
		                    }
		                );

		                delete columnOptions.grid.columns; // Prevent recursion

		                column = new Axis(chart, columnOptions);
		                column.isColumn = true;
		                column.columnIndex = columnIndex;

		                wrap(column, 'labelFormatter', function (proceed) {
		                    var axis = this.axis,
		                        tickPos = axis.tickPositions,
		                        value = this.value,
		                        series = axis.series[0],
		                        isFirst = value === tickPos[0],
		                        isLast = value === tickPos[tickPos.length - 1],
		                        point = H.find(series.options.data, function (p) {
		                            return p[axis.isXAxis ? 'x' : 'y'] === value;
		                        });

		                    // Make additional properties available for the formatter
		                    this.isFirst = isFirst;
		                    this.isLast = isLast;
		                    this.point = point;

		                    // Call original labelFormatter
		                    return proceed.call(this);
		                });

		                columnIndex++;
		            }
		        } else {
		            // Call original Axis.init()
		            proceed.apply(axis, argsToArray(arguments));
		            applyGridOptions(axis);
		        }
		    } else {
		        // Call original Axis.init()
		        proceed.apply(axis, argsToArray(arguments));
		    }
		});

	}(Highcharts));
	(function (H) {
		/**
		 * (c) 2018 Torstein Honsi, Lars Cabrera
		 *
		 * License: www.highcharts.com/license
		 */

		var Chart = H.Chart,
		    each = H.each,
		    pick = H.pick;

		/**
		 * For vertical axes only. Setting the static scale ensures that each tick unit
		 * is translated into a fixed pixel height. For example, setting the static
		 * scale to 24 results in each Y axis category taking up 24 pixels, and the
		 * height of the chart adjusts. Adding or removing items will make the chart
		 * resize.
		 *
		 * @type {number}
		 * @sample gantt/xrange-series/demo/ X-range series with static scale
		 * @since 6.2.0
		 * @product gantt
		 * @default 50
		 * @apioption yAxis.staticScale
		 */

		H.addEvent(H.Axis, 'afterSetOptions', function () {
		    if (
		        !this.horiz &&
		        H.isNumber(this.options.staticScale) &&
		        !this.chart.options.chart.height
		    ) {
		        this.staticScale = this.options.staticScale;
		    }
		});

		Chart.prototype.adjustHeight = function () {
		    if (this.redrawTrigger !== 'adjustHeight') {
		        each(this.axes || [], function (axis) {
		            var chart = axis.chart,
		                animate = !!chart.initiatedScale && chart.options.animation,
		                staticScale = axis.options.staticScale,
		                height,
		                diff;

		            if (axis.staticScale && H.defined(axis.min)) {
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
		                each(axis.series, function (series) {
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

	}(Highcharts));
	var Tree = (function (H) {
		/**
		* (c) 2016 Highsoft AS
		* Authors: Jon Arild Nygard
		*
		* License: www.highcharts.com/license
		*/
		/* eslint no-console: 0 */
		var each = H.each,
		    extend = H.extend,
		    isNumber = H.isNumber,
		    keys = H.keys,
		    map = H.map,
		    pick = H.pick,
		    reduce = H.reduce,
		    isFunction = function (x) {
		        return typeof x === 'function';
		    };

		/**
		 * Creates an object map from parent id to childrens index.
		 * @param   {Array}  data          List of points set in options.
		 * @param   {string} data[].parent Parent id of point.
		 * @param   {Array}  ids           List of all point ids.
		 * @returns {Object}               Map from parent id to children index in data
		 */
		var getListOfParents = function (data, ids) {
		    var listOfParents = reduce(data, function (prev, curr) {
		            var parent = pick(curr.parent, '');
		            if (prev[parent] === undefined) {
		                prev[parent] = [];
		            }
		            prev[parent].push(curr);
		            return prev;
		        }, {}),
		        parents = keys(listOfParents);

		    // If parent does not exist, hoist parent to root of tree.
		    each(parents, function (parent, list) {
		        var children = listOfParents[parent];
		        if ((parent !== '') && (H.inArray(parent, ids) === -1)) {
		            each(children, function (child) {
		                list[''].push(child);
		            });
		            delete list[parent];
		        }
		    });
		    return listOfParents;
		};
		var getNode = function (id, parent, level, data, mapOfIdToChildren, options) {
		    var descendants = 0,
		        height = 0,
		        after = options && options.after,
		        before = options && options.before,
		        node = {
		            data: data,
		            depth: level - 1,
		            id: id,
		            level: level,
		            parent: parent
		        },
		        start,
		        end,
		        children;

		    // Allow custom logic before the children has been created.
		    if (isFunction(before)) {
		        before(node, options);
		    }

		    /**
		     * Call getNode recursively on the children. Calulate the height of the
		     * node, and the number of descendants.
		     */
		    children = map((mapOfIdToChildren[id] || []), function (child) {
		        var node = getNode(
		                child.id,
		                id,
		                (level + 1),
		                child,
		                mapOfIdToChildren,
		                options
		            ),
		            childStart = child.start,
		            childEnd = (
		                child.milestone === true ?
		                childStart :
		                child.end
		            );

		        // Start should be the lowest child.start.
		        start = (
		            (!isNumber(start) || childStart < start) ?
		            childStart :
		            start
		        );

		        // End should be the largest child.end.
		        // If child is milestone, then use start as end.
		        end = (
		            (!isNumber(end) || childEnd > end) ?
		            childEnd :
		            end
		        );

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
		    var ids = map(data, function (d) {
		            return d.id;
		        }),
		        mapOfIdToChildren = getListOfParents(data, ids);
		    return getNode('', null, 1, null, mapOfIdToChildren, options);
		};

		var Tree = {
		    getListOfParents: getListOfParents,
		    getNode: getNode,
		    getTree: getTree
		};


		return Tree;
	}(Highcharts));
	var result = (function (H) {
		var each = H.each,
		    extend = H.extend,
		    isArray = H.isArray,
		    isBoolean = function (x) {
		        return typeof x === 'boolean';
		    },
		    isFn = function (x) {
		        return typeof x === 'function';
		    },
		    isObject = H.isObject,
		    isNumber = H.isNumber,
		    merge = H.merge,
		    pick = H.pick,
		    reduce = H.reduce;
		// TODO Combine buildTree and buildNode with setTreeValues
		// TODO Remove logic from Treemap and make it utilize this mixin.
		var setTreeValues = function setTreeValues(tree, options) {
		    var before = options.before,
		        idRoot = options.idRoot,
		        mapIdToNode = options.mapIdToNode,
		        nodeRoot = mapIdToNode[idRoot],
		        levelIsConstant = (
		            isBoolean(options.levelIsConstant) ?
		            options.levelIsConstant :
		            true
		        ),
		        points = options.points,
		        point = points[tree.i],
		        optionsPoint = point && point.options || {},
		        childrenTotal = 0,
		        children = [],
		        value;
		    extend(tree, {
		        levelDynamic: tree.level - (levelIsConstant ? 0 : nodeRoot.level),
		        name: pick(point && point.name, ''),
		        visible: (
		            idRoot === tree.id ||
		            (isBoolean(options.visible) ? options.visible : false)
		        )
		    });
		    if (isFn(before)) {
		        tree = before(tree, options);
		    }
		    // First give the children some values
		    each(tree.children, function (child, i) {
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

		var getColor = function getColor(node, options) {
		    var index = options.index,
		        mapOptionsToLevel = options.mapOptionsToLevel,
		        parentColor = options.parentColor,
		        parentColorIndex = options.parentColorIndex,
		        series = options.series,
		        colors = options.colors,
		        siblings = options.siblings,
		        points = series.points,
		        getColorByPoint,
		        point,
		        level,
		        colorByPoint,
		        colorIndexByPoint,
		        color,
		        colorIndex;
		    function variation(color) {
		        var colorVariation = level && level.colorVariation;
		        if (colorVariation) {
		            if (colorVariation.key === 'brightness') {
		                return H.color(color).brighten(
		                    colorVariation.to * (index / siblings)
		                ).get();
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
		                series.chart.options.chart.colorCount
		            );
		            colorByPoint = colors && colors[colorIndexByPoint];
		        }

        
		        // Select either point color, level color or inherited color.
		        color = pick(
		            point && point.options.color,
		            level && level.color,
		            colorByPoint,
		            parentColor && variation(parentColor),
		            series.color
		        );
        
		        colorIndex = pick(
		            point && point.options.colorIndex,
		            level && level.colorIndex,
		            colorIndexByPoint,
		            parentColorIndex,
		            options.colorIndex
		        );
		    }
		    return {
		        color: color,
		        colorIndex: colorIndex
		    };
		};

		/**
		 * getLevelOptions - Creates a map from level number to its given options.
		 * @param {Object} params Object containing parameters.
		 * @param {Object} params.defaults Object containing default options. The
		 * default options are merged with the userOptions to get the final options for
		 * a specific level.
		 * @param {Number} params.from The lowest level number.
		 * @param {Array} params.levels User options from series.levels.
		 * @param {Number} params.to The highest level number.
		 * @return {null|Object} Returns a map from level number to its given options.
		 * Returns null if invalid input parameters.
		 */
		var getLevelOptions = function getLevelOptions(params) {
		    var result = null,
		        defaults,
		        converted,
		        i,
		        from,
		        to,
		        levels;
		    if (isObject(params)) {
		        result = {};
		        from = isNumber(params.from) ? params.from : 1;
		        levels = params.levels;
		        converted = {};
		        defaults = isObject(params.defaults) ? params.defaults : {};
		        if (isArray(levels)) {
		            converted = reduce(levels, function (obj, item) {
		                var level,
		                    levelIsConstant,
		                    options;
		                if (isObject(item) && isNumber(item.level)) {
		                    options = merge({}, item);
		                    levelIsConstant = (
		                        isBoolean(options.levelIsConstant) ?
		                        options.levelIsConstant :
		                        defaults.levelIsConstant
		                    );
		                    // Delete redundant properties.
		                    delete options.levelIsConstant;
		                    delete options.level;
		                    // Calculate which level these options apply to.
		                    level = item.level + (levelIsConstant ? 0 : from - 1);
		                    if (isObject(obj[level])) {
		                        extend(obj[level], options);
		                    } else {
		                        obj[level] = options;
		                    }
		                }
		                return obj;
		            }, {});
		        }
		        to = isNumber(params.to) ? params.to : 1;
		        for (i = 0; i <= to; i++) {
		            result[i] = merge(
		                {},
		                defaults,
		                isObject(converted[i]) ? converted[i] : {}
		            );
		        }
		    }
		    return result;
		};

		/**
		 * Update the rootId property on the series. Also makes sure that it is
		 * accessible to exporting.
		 * @param {object} series The series to operate on.
		 * @returns Returns the resulting rootId after update.
		 */
		var updateRootId = function (series) {
		    var rootId,
		        options;
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
	}(Highcharts));
	(function (H) {
		/**
		 * (c) 2009-2018 Torstein Honsi
		 *
		 * License: www.highcharts.com/license
		 */

		var addEvent = H.addEvent,
		    pick = H.pick,
		    wrap = H.wrap,
		    each = H.each,
		    extend = H.extend,
		    isArray = H.isArray,
		    fireEvent = H.fireEvent,
		    Axis = H.Axis,
		    Series = H.Series;

		function stripArguments() {
		    return Array.prototype.slice.call(arguments, 1);
		}

		extend(Axis.prototype, {
		    isInBreak: function (brk, val) {
		        var ret,
		            repeat = brk.repeat || Infinity,
		            from = brk.from,
		            length = brk.to - brk.from,
		            test = (
		                val >= from ?
		                    (val - from) % repeat :
		                    repeat - ((from - val) % repeat)
		            );

		        if (!brk.inclusive) {
		            ret = test < length && test !== 0;
		        } else {
		            ret = test <= length;
		        }
		        return ret;
		    },

		    isInAnyBreak: function (val, testKeep) {

		        var breaks = this.options.breaks,
		            i = breaks && breaks.length,
		            inbrk,
		            keep,
		            ret;


		        if (i) {

		            while (i--) {
		                if (this.isInBreak(breaks[i], val)) {
		                    inbrk = true;
		                    if (!keep) {
		                        keep = pick(
		                            breaks[i].showPoints,
		                            this.isXAxis ? false : true
		                        );
		                    }
		                }
		            }

		            if (inbrk && testKeep) {
		                ret = inbrk && !keep;
		            } else {
		                ret = inbrk;
		            }
		        }
		        return ret;
		    }
		});

		addEvent(Axis, 'afterInit', function () {
		    if (typeof this.setBreaks === 'function') {
		        this.setBreaks(this.options.breaks, false);
		    }
		});

		addEvent(Axis, 'afterSetTickPositions', function () {
		    if (this.isBroken) {
		        var axis = this,
		            tickPositions = this.tickPositions,
		            info = this.tickPositions.info,
		            newPositions = [],
		            i;

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
		 * @param  {Array} [breaks]
		 *         The breaks to add. When `undefined` it removes existing breaks.
		 * @param  {Boolean} [redraw=true]
		 *         Whether to redraw the chart immediately.
		 */
		Axis.prototype.setBreaks = function (breaks, redraw) {
		    var axis = this,
		        isBroken = (isArray(breaks) && !!breaks.length);

		    function breakVal2Lin(val) {
		        var nval = val,
		            brk,
		            i;

		        for (i = 0; i < axis.breakArray.length; i++) {
		            brk = axis.breakArray[i];
		            if (brk.to <= val) {
		                nval -= brk.len;
		            } else if (brk.from >= val) {
		                break;
		            } else if (axis.isInBreak(brk, val)) {
		                nval -= (val - brk.from);
		                break;
		            }
		        }

		        return nval;
		    }

		    function breakLin2Val(val) {
		        var nval = val,
		            brk,
		            i;

		        for (i = 0; i < axis.breakArray.length; i++) {
		            brk = axis.breakArray[i];
		            if (brk.from >= nval) {
		                break;
		            } else if (brk.to < nval) {
		                nval += brk.len;
		            } else if (axis.isInBreak(brk, nval)) {
		                nval += brk.len;
		            }
		        }
		        return nval;
		    }


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

		        axis.setExtremes = function (
		            newMin,
		            newMax,
		            redraw,
		            animation,
		            eventArguments
		        ) {
		            // If trying to set extremes inside a break, extend it to before and
		            // after the break ( #3857 )
		            if (this.isBroken) {
		                while (this.isInAnyBreak(newMin)) {
		                    newMin -= this.closestPointRange;
		                }
		                while (this.isInAnyBreak(newMax)) {
		                    newMax -= this.closestPointRange;
		                }
		            }
		            Axis.prototype.setExtremes.call(
		                this,
		                newMin,
		                newMax,
		                redraw,
		                animation,
		                eventArguments
		            );
		        };

		        axis.setAxisTranslation = function (saveOld) {
		            Axis.prototype.setAxisTranslation.call(this, saveOld);

		            this.unitLength = null;
		            if (this.isBroken) {
		                var breaks = axis.options.breaks,
		                    breakArrayT = [],    // Temporary one
		                    breakArray = [],
		                    length = 0,
		                    inBrk,
		                    repeat,
		                    min = axis.userMin || axis.min,
		                    max = axis.userMax || axis.max,
		                    pointRangePadding = pick(axis.pointRangePadding, 0),
		                    start,
		                    i;

		                // Min & max check (#4247)
		                each(breaks, function (brk) {
		                    repeat = brk.repeat || Infinity;
		                    if (axis.isInBreak(brk, min)) {
		                        min += (brk.to % repeat) - (min % repeat);
		                    }
		                    if (axis.isInBreak(brk, max)) {
		                        max -= (max % repeat) - (brk.from % repeat);
		                    }
		                });

		                // Construct an array holding all breaks in the axis
		                each(breaks, function (brk) {
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
		                    return (
		                        (a.value === b.value) ?
		                        (a.move === 'in' ? 0 : 1) - (b.move === 'in' ? 0 : 1) :
		                        a.value - b.value
		                    );
		                });

		                // Simplify the breaks
		                inBrk = 0;
		                start = min;

		                each(breakArrayT, function (brk) {
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
		                axis.unitLength = max - min - length + pointRangePadding;

		                fireEvent(axis, 'afterBreaks');

		                if (axis.staticScale) {
		                    axis.transA = axis.staticScale;
		                } else if (axis.unitLength) {
		                    axis.transA *= (max - axis.min + pointRangePadding) /
		                        axis.unitLength;
		                }

		                if (pointRangePadding) {
		                    axis.minPixelPadding = axis.transA * axis.minPointOffset;
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

		wrap(Series.prototype, 'generatePoints', function (proceed) {

		    proceed.apply(this, stripArguments(arguments));

		    var series = this,
		        xAxis = series.xAxis,
		        yAxis = series.yAxis,
		        points = series.points,
		        point,
		        i = points.length,
		        connectNulls = series.options.connectNulls,
		        nullGap;


		    if (xAxis && yAxis && (xAxis.options.breaks || yAxis.options.breaks)) {
		        while (i--) {
		            point = points[i];

		            // Respect nulls inside the break (#4275)
		            nullGap = point.y === null && connectNulls === false;
		            if (
		                !nullGap &&
		                (
		                    xAxis.isInAnyBreak(point.x, true) ||
		                    yAxis.isInAnyBreak(point.y, true)
		                )
		            ) {
		                points.splice(i, 1);
		                if (this.data[i]) {
		                    // Removes the graphics for this point if they exist
		                    this.data[i].destroyElements();
		                }
		            }
		        }
		    }

		});

		function drawPointsWrapped(proceed) {
		    proceed.apply(this);
		    this.drawBreaks(this.xAxis, ['x']);
		    this.drawBreaks(this.yAxis, pick(this.pointArrayMap, ['y']));
		}

		H.Series.prototype.drawBreaks = function (axis, keys) {
		    var series = this,
		        points = series.points,
		        breaks,
		        threshold,
		        eventName,
		        y;

		    if (!axis) {
		        return; // #5950
		    }

		    each(keys, function (key) {
		        breaks = axis.breakArray || [];
		        threshold = axis.isXAxis ?
		            axis.min :
		            pick(series.options.threshold, axis.min);
		        each(points, function (point) {
		            y = pick(point['stack' + key.toUpperCase()], point[key]);
		            each(breaks, function (brk) {
		                eventName = false;

		                if (
		                    (threshold < brk.from && y > brk.to) ||
		                    (threshold > brk.from && y < brk.from)
		                ) {
		                    eventName = 'pointBreak';

		                } else if (
		                    (threshold < brk.from && y > brk.from && y < brk.to) ||
		                    (threshold > brk.from && y > brk.to && y < brk.from)
		                ) {
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
		 */
		H.Series.prototype.gappedPath = function () {
		    var currentDataGrouping = this.currentDataGrouping,
		        groupingSize = currentDataGrouping && currentDataGrouping.totalRange,
		        gapSize = this.options.gapSize,
		        points = this.points.slice(),
		        i = points.length - 1,
		        yAxis = this.yAxis,
		        xRange,
		        stack;

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
		     * @type    {Number}
		     * @see     [gapUnit](plotOptions.series.gapUnit) and
		     *          [xAxis.breaks](#xAxis.breaks)
		     * @sample  {highstock} stock/plotoptions/series-gapsize/
		     *          Setting the gap size to 2 introduces gaps for weekends in daily
		     *          datasets.
		     * @default 0
		     * @product highstock
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
		     * @type {String}
		     * @see [gapSize](plotOptions.series.gapSize)
		     * @default relative
		     * @validvalue ["relative", "value"]
		     * @since 5.0.13
		     * @product highstock
		     * @apioption plotOptions.series.gapUnit
		     */

		    if (gapSize && i > 0) { // #5008

		        // Gap unit is relative
		        if (this.options.gapUnit !== 'value') {
		            gapSize *= this.closestPointRange;
		        }

		        // Setting a new gapSize in case dataGrouping is enabled (#7686)
		        if (groupingSize && groupingSize > gapSize) {
		            gapSize = groupingSize;
		        }

		        // extension for ordinal breaks
		        while (i--) {
		            if (points[i + 1].x - points[i].x > gapSize) {
		                xRange = (points[i].x + points[i + 1].x) / 2;

		                points.splice( // insert after this one
		                    i + 1,
		                    0,
		                    {
		                        isNull: true,
		                        x: xRange
		                    }
		                );

		                // For stacked chart generate empty stack items, #6546
		                if (this.options.stacking) {
		                    stack = yAxis.stacks[this.stackKey][xRange] =
		                        new H.StackItem(
		                            yAxis,
		                            yAxis.options.stackLabels,
		                            false,
		                            xRange,
		                            this.stack
		                        );
		                    stack.total = 0;
		                }
		            }
		        }
		    }

		    // Call base method
		    return this.getGraphPath(points);
		};

		wrap(H.seriesTypes.column.prototype, 'drawPoints', drawPointsWrapped);
		wrap(H.Series.prototype, 'drawPoints', drawPointsWrapped);

	}(Highcharts));
	(function (H, Tree, mixinTreeSeries) {
		/**
		* (c) 2016 Highsoft AS
		* Authors: Jon Arild Nygard
		*
		* License: www.highcharts.com/license
		*/
		/* eslint no-console: 0 */
		var argsToArray = function (args) {
		        return Array.prototype.slice.call(args, 1);
		    },
		    defined = H.defined,
		    each = H.each,
		    extend = H.extend,
		    find = H.find,
		    fireEvent = H.fireEvent,
		    getLevelOptions = mixinTreeSeries.getLevelOptions,
		    map = H.map,
		    merge = H.merge,
		    inArray = H.inArray,
		    isBoolean = function (x) {
		        return typeof x === 'boolean';
		    },
		    isNumber = H.isNumber,
		    isObject = function (x) {
		        // Always use strict mode.
		        return H.isObject(x, true);
		    },
		    isString = H.isString,
		    keys = H.keys,
		    pick = H.pick,
		    reduce = H.reduce,
		    wrap = H.wrap,
		    GridAxis = H.Axis,
		    GridAxisTick = H.Tick;

		/**
		 * some - Equivalent of Array.prototype.some
		 *
		 * @param  {Array}    arr       Array to look for matching elements in.
		 * @param  {function} condition The condition to check against.
		 * @return {boolean}            Whether some elements pass the condition.
		 */
		var some = function (arr, condition) {
		    var result = false;
		    each(arr, function (element, index, array) {
		        if (!result) {
		            result = condition(element, index, array);
		        }
		    });
		    return result;
		};

		var override = function (obj, methods) {
		    var method,
		        func;
		    for (method in methods) {
		        if (methods.hasOwnProperty(method)) {
		            func = methods[method];
		            wrap(obj, method, func);
		        }
		    }
		};

		/**
		 * getCategoriesFromTree - getCategories based on a tree
		 *
		 * @param  {object} tree Root of tree to collect categories from
		 * @return {Array}       Array of categories
		 */
		var getCategoriesFromTree = function (tree) {
		    var categories = [];
		    if (tree.data) {
		        categories.push(tree.data.name);
		    }
		    each(tree.children, function (child) {
		        categories = categories.concat(getCategoriesFromTree(child));
		    });
		    return categories;
		};

		var mapTickPosToNode = function (node, categories) {
		    var map = {},
		        name = node.data && node.data.name,
		        pos = inArray(name, categories);
		    map[pos] = node;
		    each(node.children, function (child) {
		        extend(map, mapTickPosToNode(child, categories));
		    });
		    return map;
		};

		var getBreakFromNode = function (node, max) {
		    var from = node.collapseStart,
		        to = node.collapseEnd;

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
		 * @param {Object} axis The Axis to get the tick positions from.
		 * @param {number} axis.min The minimum value of the axis.
		 * @param {number} axis.max The maximum value of the axis.
		 * @param {function} axis.isInAnyBreak Function to determine if a position is
		 * inside any breaks on the axis.
		 * @returns {number[]} List of positions.
		 */
		var getTickPositions = function (axis) {
		    return reduce(
		        keys(axis.mapOfPosToGridNode),
		        function (arr, key) {
		            var pos = +key;
		            if (
		                axis.min <= pos &&
		                axis.max >= pos &&
		                !axis.isInAnyBreak(pos)
		            ) {
		                arr.push(pos);
		            }
		            return arr;
		        },
		        []
		    );
		};
		/**
		 * Check if a node is collapsed.
		 * @param {object} axis The axis to check against.
		 * @param {object} node The node to check if is collapsed.
		 * @param {number} pos The tick position to collapse.
		 * @returns {boolean} Returns true if collapsed, false if expanded.
		 */
		var isCollapsed = function (axis, node) {
		    var breaks = (axis.options.breaks || []),
		        obj = getBreakFromNode(node, axis.max);
		    return some(breaks, function (b) {
		        return b.from === obj.from && b.to === obj.to;
		    });
		};

		/**
		 * Calculates the new axis breaks to collapse a node.
		 * @param {object} axis The axis to check against.
		 * @param {object} node The node to collapse.
		 * @param {number} pos The tick position to collapse.
		 * @returns {array} Returns an array of the new breaks for the axis.
		 */
		var collapse = function (axis, node) {
		    var breaks = (axis.options.breaks || []),
		        obj = getBreakFromNode(node, axis.max);
		    breaks.push(obj);
		    return breaks;
		};

		/**
		 * Calculates the new axis breaks to expand a node.
		 * @param {object} axis The axis to check against.
		 * @param {object} node The node to expand.
		 * @param {number} pos The tick position to expand.
		 * @returns {array} Returns an array of the new breaks for the axis.
		 */
		var expand = function (axis, node) {
		    var breaks = (axis.options.breaks || []),
		        obj = getBreakFromNode(node, axis.max);
		    // Remove the break from the axis breaks array.
		    return reduce(breaks, function (arr, b) {
		        if (b.to !== obj.to || b.from !== obj.from) {
		            arr.push(b);
		        }
		        return arr;
		    }, []);
		};

		/**
		 * Calculates the new axis breaks after toggling the collapse/expand state of a
		 * node. If it is collapsed it will be expanded, and if it is exapended it will
		 * be collapsed.
		 * @param {object} axis The axis to check against.
		 * @param {object} node The node to toggle.
		 * @param {number} pos The tick position to toggle.
		 * @returns {array} Returns an array of the new breaks for the axis.
		 */
		var toggleCollapse = function (axis, node) {
		    return (
		        isCollapsed(axis, node) ?
		        expand(axis, node) :
		        collapse(axis, node)
		    );
		};
		var renderLabelIcon = function (tick, params) {
		    var icon = tick.labelIcon,
		        isNew = !icon,
		        renderer = params.renderer,
		        labelBox = params.xy,
		        options = params.options,
		        width = options.width,
		        height = options.height,
		        iconCenter = {
		            x: labelBox.x - (width / 2) - options.padding,
		            y: labelBox.y - (height / 2)
		        },
		        rotation = params.collapsed ? 90 : 180,
		        shouldRender = params.show && H.isNumber(iconCenter.y);

		    if (isNew) {
		        tick.labelIcon = icon = renderer.path(renderer.symbols[options.type](
		            options.x,
		            options.y,
		            width,
		            height
		        ))
		        .addClass('highcharts-label-icon')
		        .add(params.group);
		    }

		    // Set the new position, and show or hide
		    if (!shouldRender) {
		        icon.attr({ y: -9999 }); // #1338
		    }

    
		    // Presentational attributes
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
    

		    // Update the icon positions
		    icon[isNew ? 'attr' : 'animate']({
		        translateX: iconCenter.x,
		        translateY: iconCenter.y,
		        rotation: rotation
		    });

		};
		var onTickHover = function (label) {
		    label.addClass('highcharts-treegrid-node-active');
    
		    label.css({
		        textDecoration: 'underline'
		    });
    
		};
		var onTickHoverExit = function (label, options) {
		    var css = defined(options.style) ? options.style : {};
		    label.removeClass('highcharts-treegrid-node-active');
    
		    label.css({
		        textDecoration: css.textDecoration
		    });
    
		};

		/**
		 * Creates a tree structure of the data, and the treegrid. Calculates
		 * categories, and y-values of points based on the tree.
		 * @param {Array} data All the data points to display in the axis.
		 * @param {boolean} uniqueNames Wether or not the data node with the same name
		 * should share grid cell. If true they do share cell. False by default.
		 * @returns {object} Returns an object containing categories, mapOfIdToNode,
		 * mapOfPosToGridNode, and tree.
		 * @todo There should be only one point per line.
		 * @todo It should be optional to have one category per point, or merge cells
		 * @todo Add unit-tests.
		 */
		var getTreeGridFromData = function (data, uniqueNames, numberOfSeries) {
		    var categories = [],
		        collapsedNodes = [],
		        mapOfIdToNode = {},
		        mapOfPosToGridNode = {},
		        posIterator = -1,
		        uniqueNamesEnabled = isBoolean(uniqueNames) ? uniqueNames : false,
		        tree,
		        treeParams,
		        updateYValuesAndTickPos;

		    // Build the tree from the series data.
		    treeParams = {
		        // After the children has been created.
		        after: function (node) {
		            var gridNode = mapOfPosToGridNode[node.pos],
		                height = 0,
		                descendants = 0;
		            each(gridNode.children, function (child) {
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
		            var data = isObject(node.data) ? node.data : {},
		                name = isString(data.name) ? data.name : '',
		                parentNode = mapOfIdToNode[node.parent],
		                parentGridNode = (
		                    isObject(parentNode) ?
		                    mapOfPosToGridNode[parentNode.pos] :
		                    null
		                ),
		                hasSameName = function (x) {
		                    return x.name === name;
		                },
		                gridNode,
		                pos;

		            // If not unique names, look for a sibling node with the same name.
		            if (
		                uniqueNamesEnabled &&
		                isObject(parentGridNode) &&
		                !!(gridNode = find(parentGridNode.children, hasSameName))
		            ) {
		                // If if there is a gridNode with the same name, reuse position.
		                pos = gridNode.pos;
		                // Add data node to list of nodes in the grid node.
		                gridNode.nodes.push(node);
		            } else {
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
		            var nodes = gridNode.nodes,
		                end = start + (start === -1 ? 0 : numberOfSeries - 1),
		                diff = (end - start) / 2,
		                padding = 0.5,
		                pos = start + diff;

		            each(nodes, function (node) {
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


		            each(gridNode.children, function (child) {
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
		    mapOfPosToGridNode = updateYValuesAndTickPos(
		        mapOfPosToGridNode,
		        numberOfSeries
		    );

		    // Return the resulting data.
		    return {
		        categories: categories,
		        mapOfIdToNode: mapOfIdToNode,
		        mapOfPosToGridNode: mapOfPosToGridNode,
		        collapsedNodes: collapsedNodes,
		        tree: tree
		    };
		};

		override(GridAxis.prototype, {
		    init: function (proceed, chart, userOptions) {
		        var axis = this,
		            removeFoundExtremesEvent,
		            isTreeGrid = userOptions.type === 'treegrid';
		        // Set default and forced options for TreeGrid
		        if (isTreeGrid) {
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
		                    * @product gantt
		                    * @sample {gantt} gantt/treegrid-axis/labels-levels
		                    *           Levels on TreeGrid Labels
		                    * @type {Array<Object>}
		                    * @apioption yAxis.labels.levels
		                    */
		                    levels: [{
		                        /**
		                        * Specify the level which the options within this object
		                        * applies to.
		                        *
		                        * @sample {gantt} gantt/treegrid-axis/labels-levels
		                        */
		                        level: undefined
		                    }, {
		                        level: 1,
		                        style: {
		                            fontWeight: 'bold'
		                        }
		                    }],

		                    /**
		                     * The symbol for the collapse and expand icon in a
		                     * treegrid.
		                     *
		                     * @product gantt
		                     * @optionparent yAxis.labels.symbol
		                     */
		                    symbol: {
		                        /**
		                         * The symbol type. Points to a definition function in
		                         * the `Highcharts.Renderer.symbols` collection.
		                         *
		                         * @validvalue ['arc', 'circle', 'diamond', 'square', 'triangle', 'triangle-down']
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

		            }, userOptions, { // User options
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
		            H.addEvent(axis.chart, 'beforeRender', function () {
		                var labelOptions = axis.options && axis.options.labels;

		                // beforeRender is fired after all the series is initialized,
		                // which is an ideal time to update the axis.categories.
		                axis.updateYNames();

		                // Update yData now that we have calculated the y values
		                // TODO: it would be better to be able to calculate y values
		                // before Series.setData
		                each(axis.series, function (series) {
		                    series.yData = map(series.options.data, function (data) {
		                        return data.y;
		                    });
		                });

		                // Calculate the label options for each level in the tree.
		                axis.mapOptionsToLevel = getLevelOptions({
		                    defaults: labelOptions,
		                    from: 1,
		                    levels: labelOptions.levels,
		                    to: axis.tree.height
		                });

		                // Collapse all the nodes belonging to a point where collapsed
		                // equals true.
		                // Can be called from beforeRender, if getBreakFromNode removes
		                // its dependency on axis.max.
		                removeFoundExtremesEvent =
		                    H.addEvent(axis, 'foundExtremes', function () {
		                        each(axis.collapsedNodes, function (node) {
		                            var breaks = collapse(axis, node);
		                            axis.setBreaks(breaks, false);
		                        });
		                        removeFoundExtremesEvent();
		                    });
		            });
		            axis.hasNames = true;
		            axis.options.showLastLabel = true;
		        }
		    },
		    /**
		     * Override to add indentation to axis.maxLabelDimensions.
		     * @param  {Function}   proceed the original function
		     * @returns {undefined}
		     */
		    getMaxLabelDimensions: function (proceed) {
		        var axis = this,
		            options = axis.options,
		            labelOptions = options && options.labels,
		            indentation = (
		                labelOptions && isNumber(labelOptions.indentation) ?
		                options.labels.indentation :
		                0
		            ),
		            retVal = proceed.apply(axis, argsToArray(arguments)),
		            isTreeGrid = axis.options.type === 'treegrid',
		            treeDepth;

		        if (isTreeGrid) {
		            treeDepth = axis.mapOfPosToGridNode[-1].height;
		            retVal.width += indentation * (treeDepth - 1);
		        }

		        return retVal;
		    },
		    /**
		     * Generates a tick for initial positioning.
		     *
		     * @private
		     * @param {function} proceed The original generateTick function.
		     * @param {number} pos The tick position in axis values.
		     */
		    generateTick: function (proceed, pos) {
		        var axis = this,
		            mapOptionsToLevel = (
		                isObject(axis.mapOptionsToLevel) ? axis.mapOptionsToLevel : {}
		            ),
		            isTreeGrid = axis.options.type === 'treegrid',
		            ticks = axis.ticks,
		            tick = ticks[pos],
		            levelOptions,
		            options,
		            gridNode;

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
		            } else {
		                // update labels depending on tick interval
		                tick.parameters.category = gridNode.name;
		                tick.options = options;
		                tick.addLabel();
		            }
		        } else {
		            proceed.apply(axis, argsToArray(arguments));
		        }
		    },
		    /**
		     * Set the tick positions, tickInterval, axis min and max.
		     *
		     * @private
		     */
		    setTickInterval: function (proceed) {
		        var axis = this,
		            options = axis.options,
		            isTreeGrid = options.type === 'treegrid';

		        if (isTreeGrid) {
		            axis.min = pick(axis.userMin, options.min, axis.dataMin);
		            axis.max = pick(axis.userMax, options.max, axis.dataMax);

		            fireEvent(axis, 'foundExtremes');

		            // setAxisTranslation modifies the min and max according to
		            // axis breaks.
		            axis.setAxisTranslation(true);

		            axis.tickmarkOffset = 0.5;
		            axis.tickInterval = 1;
		            axis.tickPositions = getTickPositions(axis);
		        } else {
		            proceed.apply(axis, argsToArray(arguments));
		        }
		    }
		});
		override(GridAxisTick.prototype, {
		    getLabelPosition: function (
		        proceed,
		        x,
		        y,
		        label,
		        horiz,
		        labelOptions,
		        tickmarkOffset,
		        index,
		        step
		    ) {
		        var tick = this,
		            lbOptions = pick(
		                tick.options && tick.options.labels,
		                labelOptions
		            ),
		            pos = tick.pos,
		            axis = tick.axis,
		            options = axis.options,
		            isTreeGrid = options.type === 'treegrid',
		            result = proceed.apply(
		                tick,
		                [x, y, label, horiz, lbOptions, tickmarkOffset, index, step]
		            ),
		            symbolOptions,
		            indentation,
		            mapOfPosToGridNode,
		            node,
		            level;

		        if (isTreeGrid) {
		            symbolOptions = (
		                lbOptions && isObject(lbOptions.symbol) ?
		                lbOptions.symbol :
		                {}
		            );
		            indentation = (
		                lbOptions && isNumber(lbOptions.indentation) ?
		                lbOptions.indentation :
		                0
		            );
		            mapOfPosToGridNode = axis.mapOfPosToGridNode;
		            node = mapOfPosToGridNode && mapOfPosToGridNode[pos];
		            level = (node && node.depth) || 1;
		            result.x += (
		                // Add space for symbols
		                ((symbolOptions.width) + (symbolOptions.padding * 2)) +
		                // Apply indentation
		                ((level - 1) * indentation)
		            );
		        }

		        return result;
		    },
		    renderLabel: function (proceed) {
		        var tick = this,
		            pos = tick.pos,
		            axis = tick.axis,
		            label = tick.label,
		            mapOfPosToGridNode = axis.mapOfPosToGridNode,
		            options = axis.options,
		            labelOptions = pick(
		                tick.options && tick.options.labels,
		                options && options.labels
		            ),
		            symbolOptions = (
		                labelOptions && isObject(labelOptions.symbol) ?
		                labelOptions.symbol :
		                {}
		            ),
		            node = mapOfPosToGridNode && mapOfPosToGridNode[pos],
		            level = node && node.depth,
		            isTreeGrid = options.type === 'treegrid',
		            hasLabel = !!(label && label.element),
		            shouldRender = inArray(pos, axis.tickPositions) > -1,
		            prefixClassName = 'highcharts-treegrid-node-',
		            collapsed,
		            addClassName,
		            removeClassName;

		        if (isTreeGrid && node) {
		            // Add class name for hierarchical styling.
		            if (hasLabel) {
		                label.addClass(prefixClassName + 'level-' + level);
		            }
		        }

		        proceed.apply(tick, argsToArray(arguments));

		        if (isTreeGrid && node && hasLabel && node.descendants > 0) {
		            collapsed = isCollapsed(axis, node);

		            renderLabelIcon(
		                tick,
		                {
                    
		                    color: label.styles.color,
                    
		                    collapsed: collapsed,
		                    group: label.parentGroup,
		                    options: symbolOptions,
		                    renderer: label.renderer,
		                    show: shouldRender,
		                    xy: label.xy
		                }
		            );

		            // Add class name for the node.
		            addClassName = prefixClassName +
		                (collapsed ? 'collapsed' : 'expanded');
		            removeClassName = prefixClassName +
		                (collapsed ? 'expanded' : 'collapsed');

		            label
		                .addClass(addClassName)
		                .removeClass(removeClassName);

            
		            label.css({
		                cursor: 'pointer'
		            });
            

		            // Add events to both label text and icon
		            each([label, tick.labelIcon], function (object) {
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

		extend(GridAxisTick.prototype, /** @lends Highcharts.Tick.prototype */{
		    /**
		     * Collapse the grid cell. Used when axis is of type treegrid.
		     * @param  {boolean} [redraw=true] Whether to redraw the chart or wait for
		     * an explicit call to {@link Highcharts.Chart#redraw}
		     * @sample {gantt} gantt/treegrid-axis/collapsed-dynamically/demo.js
		     * Dynamically collapse
		     */
		    collapse: function (redraw) {
		        var tick = this,
		            axis = tick.axis,
		            pos = tick.pos,
		            node = axis.mapOfPosToGridNode[pos],
		            breaks = collapse(axis, node);
		        axis.setBreaks(breaks, pick(redraw, true));
		    },
		    /**
		     * Expand the grid cell. Used when axis is of type treegrid.
		     *
		     * @param  {boolean} [redraw=true] Whether to redraw the chart or wait for
		     * an explicit call to {@link Highcharts.Chart#redraw}
		     * @sample {gantt} gantt/treegrid-axis/collapsed-dynamically/demo.js
		     * Dynamically collapse
		     */
		    expand: function (redraw) {
		        var tick = this,
		            axis = tick.axis,
		            pos = tick.pos,
		            node = axis.mapOfPosToGridNode[pos],
		            breaks = expand(axis, node);
		        axis.setBreaks(breaks, pick(redraw, true));
		    },
		    /**
		     * Toggle the collapse/expand state of the grid cell. Used when axis is of
		     * type treegrid.
		     *
		     * @param  {boolean} [redraw=true] Whether to redraw the chart or wait for
		     * an explicit call to {@link Highcharts.Chart#redraw}
		     * @sample {gantt} gantt/treegrid-axis/collapsed-dynamically/demo.js
		     * Dynamically collapse
		     */
		    toggleCollapse: function (redraw) {
		        var tick = this,
		            axis = tick.axis,
		            pos = tick.pos,
		            node = axis.mapOfPosToGridNode[pos],
		            breaks = toggleCollapse(axis, node);
		        axis.setBreaks(breaks, pick(redraw, true));
		    }
		});

		GridAxis.prototype.updateYNames = function () {
		    var axis = this,
		        options = axis.options,
		        isTreeGrid = options.type === 'treegrid',
		        uniqueNames = options.uniqueNames,
		        isYAxis = !axis.isXAxis,
		        series = axis.series,
		        numberOfSeries = 0,
		        treeGrid,
		        data;

		    if (isTreeGrid && isYAxis) {
		        // Concatenate data from all series assigned to this axis.
		        data = reduce(series, function (arr, s) {
		            if (s.visible) {
		                // Push all data to array
		                each(s.options.data, function (data) {
		                    if (isObject(data)) {
		                        // Set series index on data. Removed again after use.
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

		        // Calculate categories and the hierarchy for the grid.
		        treeGrid = getTreeGridFromData(
		            data,
		            uniqueNames,
		            (uniqueNames === true) ? numberOfSeries : 1
		        );

		        // Assign values to the axis.
		        axis.categories = treeGrid.categories;
		        axis.mapOfPosToGridNode = treeGrid.mapOfPosToGridNode;
		        // Used on init to start a node as collapsed
		        axis.collapsedNodes = treeGrid.collapsedNodes;
		        axis.hasNames = true;
		        axis.tree = treeGrid.tree;
		    }
		};

		// Make utility functions available for testing.
		GridAxis.prototype.utils = {
		    getNode: Tree.getNode
		};

	}(Highcharts, Tree, result));
	var algorithms = (function (H) {
		/**
		 * (c) 2016 Highsoft AS
		 * Author: Øystein Moseng
		 *
		 * License: www.highcharts.com/license
		 */

		var min = Math.min,
		    max = Math.max,
		    abs = Math.abs,
		    pick = H.pick;

		/**
		 * Get index of last obstacle before xMin. Employs a type of binary search, and
		 * thus requires that obstacles are sorted by xMin value.
		 *
		 * @param {Array} obstacles Array of obstacles to search in.
		 * @param {Number} xMin The xMin threshold.
		 * @param {Number} startIx Starting index to search from. Must be within array
		 *  range.
		 *
		 * @return {Number} result The index of the last obstacle element before xMin.
		 */
		function findLastObstacleBefore(obstacles, xMin, startIx) {
		    var left = startIx || 0, // left limit
		        right = obstacles.length - 1, // right limit
		        min = xMin - 0.0000001, // Make sure we include all obstacles at xMin
		        cursor,
		        cmp;
		    while (left <= right) {
		        cursor = (right + left) >> 1;
		        cmp = min - obstacles[cursor].xMin;
		        if (cmp > 0) {
		            left = cursor + 1;
		        } else if (cmp < 0) {
		            right = cursor - 1;
		        } else {
		            return cursor;
		        }
		    }
		    return left > 0 ? left - 1 : 0;
		}

		/**
		 * Test if a point lays within an obstacle.
		 *
		 * @param {Object} obstacle Obstacle to test.
		 * @param {Object} point Point with x/y props.
		 *
		 * @return {Boolean} result Whether point is within the obstacle or not.
		 */
		function pointWithinObstacle(obstacle, point) {
		    return (
		        point.x <= obstacle.xMax &&
		        point.x >= obstacle.xMin &&
		        point.y <= obstacle.yMax &&
		        point.y >= obstacle.yMin
		    );
		}

		/**
		 * Find the index of an obstacle that wraps around a point.
		 * Returns -1 if not found.
		 *
		 * @param {Array} obstacles Obstacles to test.
		 * @param {Object} point Point with x/y props.
		 *
		 * @return {Number} result Ix of the obstacle in the array, or -1 if not found.
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
		 * @param {Array} segments The segments to build the path from.
		 *
		 * @return {Array} result SVG path array as accepted by the SVG Renderer.
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
		 * @param {Object} obstacle Obstacle to limit.
		 * @param {Object} bounds Bounds to use as limit.
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
		     * @param {Object} start Starting coordinate, object with x/y props.
		     * @param {Object} end Ending coordinate, object with x/y props.
		     *
		     * @return {Object} result An object with the SVG path in Array form as
		     *  accepted by the SVG renderer, as well as an array of new obstacles
		     *  making up this path.
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
		     *  Options
		     *      - chartObstacles:   Array of chart obstacles to avoid
		     *      - startDirectionX:  Optional. True if starting in the X direction.
		     *                          If not provided, the algorithm starts in the
		     *                          direction that is the furthest between
		     *                          start/end.
		     *
		     * @param {Object} start Starting coordinate, object with x/y props.
		     * @param {Object} end Ending coordinate, object with x/y props.
		     * @param {Object} options Options for the algorithm.
		     *
		     * @return {Object} result An object with the SVG path in Array form as
		     *  accepted by the SVG renderer, as well as an array of new obstacles
		     *  making up this path.
		     */
		    simpleConnect: H.extend(function (start, end, options) {
		        var segments = [],
		            endSegment,
		            dir = pick(
		                options.startDirectionX,
		                abs(end.x - start.x) > abs(end.y - start.y)
		            ) ? 'x' : 'y',
		            chartObstacles = options.chartObstacles,
		            startObstacleIx = findObstacleFromPoint(chartObstacles, start),
		            endObstacleIx = findObstacleFromPoint(chartObstacles, end),
		            startObstacle,
		            endObstacle,
		            prevWaypoint,
		            waypoint,
		            waypoint2,
		            useMax,
		            endPoint;

		        // Return a clone of a point with a property set from a target object,
		        // optionally with an offset
		        function copyFromPoint(from, fromKey, to, toKey, offset) {
		            var point = {
		                x: from.x,
		                y: from.y
		            };
		            point[fromKey] = to[toKey || fromKey] + (offset || 0);
		            return point;
		        }

		        // Return waypoint outside obstacle
		        function getMeOut(obstacle, point, direction) {
		            var useMax = abs(point[direction] - obstacle[direction + 'Min']) >
		                        abs(point[direction] - obstacle[direction + 'Max']);
		            return copyFromPoint(
		                point,
		                direction,
		                obstacle,
		                direction + (useMax ? 'Max' : 'Min'),
		                useMax ? 1 : -1
		            );
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
		        } else {
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
		                waypoint[dir] > start[dir] ===  // Going towards max from start
		                waypoint[dir] > endPoint[dir]   // Going towards min to end
		            ) {
		                dir = dir === 'y' ? 'x' : 'y';
		                useMax = start[dir] < end[dir];
		                segments.push({
		                    start: waypoint,
		                    end: copyFromPoint(
		                        waypoint,
		                        dir,
		                        startObstacle,
		                        dir + (useMax ? 'Max' : 'Min'),
		                        useMax ? 1 : -1
		                    )
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
		     *  Options
		     *      - chartObstacles:   Array of chart obstacles to avoid
		     *      - lineObstacles:    Array of line obstacles to jump over
		     *      - obstacleMetrics:  Object with metrics of chartObstacles cached
		     *      - hardBounds:       Hard boundaries to not cross
		     *      - obstacleOptions:  Options for the obstacles, including margin
		     *      - startDirectionX:  Optional. True if starting in the X direction.
		     *                          If not provided, the algorithm starts in the
		     *                          direction that is the furthest between
		     *                          start/end.
		     *
		     * @param {Object} start Starting coordinate, object with x/y props.
		     * @param {Object} end Ending coordinate, object with x/y props.
		     * @param {Object} options Options for the algorithm.
		     *
		     * @return {Object} result An object with the SVG path in Array form as
		     *  accepted by the SVG renderer, as well as an array of new obstacles
		     *  making up this path.
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

		            TODO:
		                - Make retrospective, try changing prev segment to reduce
		                  corners
		                - Fix logic for breaking out of end-points - not always picking
		                  the best direction currently
		                - When going around the end obstacle we should not always go the
		                  shortest route, rather pick the one closer to the end point
		        */
		        var dirIsX = pick(
		                options.startDirectionX,
		                abs(end.x - start.x) > abs(end.y - start.y)
		            ),
		            dir = dirIsX ? 'x' : 'y',
		            segments,
		            useMax,
		            extractedEndPoint,
		            endSegments = [],
		            forceObstacleBreak = false, // Used in clearPathTo to keep track of
		                                    // when to force break through an obstacle.

		            // Boundaries to stay within. If beyond soft boundary, prefer to
		            // change direction ASAP. If at hard max, always change immediately.
		            metrics = options.obstacleMetrics,
		            softMinX = min(start.x, end.x) - metrics.maxWidth - 10,
		            softMaxX = max(start.x, end.x) + metrics.maxWidth + 10,
		            softMinY = min(start.y, end.y) - metrics.maxHeight - 10,
		            softMaxY = max(start.y, end.y) + metrics.maxHeight + 10,

		            // Obstacles
		            chartObstacles = options.chartObstacles,
		            startObstacleIx = findLastObstacleBefore(chartObstacles, softMinX),
		            endObstacleIx = findLastObstacleBefore(chartObstacles, softMaxX);

		        // How far can you go between two points before hitting an obstacle?
		        // Does not work for diagonal lines (because it doesn't have to).
		        function pivotPoint(fromPoint, toPoint, directionIsX) {
		            var firstPoint,
		                lastPoint,
		                highestPoint,
		                lowestPoint,
		                i,
		                searchDirection = fromPoint.x < toPoint.x ? 1 : -1;

		            if (fromPoint.x < toPoint.x) {
		                firstPoint = fromPoint;
		                lastPoint = toPoint;
		            } else {
		                firstPoint = toPoint;
		                lastPoint = fromPoint;
		            }

		            if (fromPoint.y < toPoint.y) {
		                lowestPoint = fromPoint;
		                highestPoint = toPoint;
		            } else {
		                lowestPoint = toPoint;
		                highestPoint = fromPoint;
		            }

		            // Go through obstacle range in reverse if toPoint is before
		            // fromPoint in the X-dimension.
		            i = searchDirection < 0 ?
		                // Searching backwards, start at last obstacle before last point
		                min(findLastObstacleBefore(chartObstacles, lastPoint.x),
		                    chartObstacles.length - 1) :
		                // Forwards. Since we're not sorted by xMax, we have to look
		                // at all obstacles.
		                0;

		            // Go through obstacles in this X range
		            while (chartObstacles[i] && (
		                searchDirection > 0 && chartObstacles[i].xMin <= lastPoint.x ||
		                searchDirection < 0 && chartObstacles[i].xMax >= firstPoint.x
		            )) {
		                // If this obstacle is between from and to points in a straight
		                // line, pivot at the intersection.
		                if (
		                    chartObstacles[i].xMin <= lastPoint.x &&
		                    chartObstacles[i].xMax >= firstPoint.x &&
		                    chartObstacles[i].yMin <= highestPoint.y &&
		                    chartObstacles[i].yMax >= lowestPoint.y
		                ) {
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
		         * Returns a string, either xMin, xMax, yMin or yMax.
		         *
		         * @param {Object} obstacle Obstacle to dodge/escape.
		         * @param {Object} fromPoint Point with x/y props that's
		         * dodging/escaping.
		         * @param {Object} toPoint Goal point.
		         * @param {Boolean} dirIsX Dodge in X dimension.
		         * @param {Object} bounds Hard and soft boundaries.
		         *
		         * @return {Boolean} result Use max or not.
		         */
		        function getDodgeDirection(
		            obstacle,
		            fromPoint,
		            toPoint,
		            dirIsX,
		            bounds
		        ) {
		            var softBounds = bounds.soft,
		                hardBounds = bounds.hard,
		                dir = dirIsX ? 'x' : 'y',
		                toPointMax = { x: fromPoint.x, y: fromPoint.y },
		                toPointMin = { x: fromPoint.x, y: fromPoint.y },
		                minPivot,
		                maxPivot,
		                maxOutOfSoftBounds = obstacle[dir + 'Max'] >=
		                                    softBounds[dir + 'Max'],
		                minOutOfSoftBounds = obstacle[dir + 'Min'] <=
		                                    softBounds[dir + 'Min'],
		                maxOutOfHardBounds = obstacle[dir + 'Max'] >=
		                                    hardBounds[dir + 'Max'],
		                minOutOfHardBounds = obstacle[dir + 'Min'] <=
		                                    hardBounds[dir + 'Min'],
		                // Find out if we should prefer one direction over the other if
		                // we can choose freely
		                minDistance = abs(obstacle[dir + 'Min'] - fromPoint[dir]),
		                maxDistance = abs(obstacle[dir + 'Max'] - fromPoint[dir]),
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

		        // Find a clear path between point
		        function clearPathTo(fromPoint, toPoint, dirIsX) {
		            // Don't waste time if we've hit goal
		            if (fromPoint.x === toPoint.x && fromPoint.y === toPoint.y) {
		                return [];
		            }

		            var dir = dirIsX ? 'x' : 'y',
		                pivot,
		                segments,
		                waypoint,
		                waypointUseMax,
		                envelopingObstacle,
		                secondEnvelopingObstacle,
		                envelopWaypoint,
		                obstacleMargin = options.obstacleOptions.margin,
		                bounds = {
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
		                waypointUseMax = getDodgeDirection(
		                    envelopingObstacle, fromPoint, toPoint, dirIsX, bounds
		                );

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
		                secondEnvelopingObstacle = findObstacleFromPoint(
		                    chartObstacles, envelopWaypoint);
		                if (secondEnvelopingObstacle > -1) {
		                    secondEnvelopingObstacle = chartObstacles[
		                        secondEnvelopingObstacle
		                    ];

		                    // Cut obstacle to hard bounds
		                    limitObstacleToBounds(
		                        secondEnvelopingObstacle,
		                        options.hardBounds
		                    );

		                    // Modify waypoint to lay between obstacles
		                    envelopWaypoint[dir] = waypointUseMax ? max(
		                        envelopingObstacle[dir + 'Max'] - obstacleMargin + 1,
		                        (
		                            secondEnvelopingObstacle[dir + 'Min'] +
		                            envelopingObstacle[dir + 'Max']
		                        ) / 2
		                    ) :
		                    min(
		                        envelopingObstacle[dir + 'Min'] + obstacleMargin - 1,
		                        (
		                            secondEnvelopingObstacle[dir + 'Max'] +
		                            envelopingObstacle[dir + 'Min']
		                        ) / 2
		                    );

		                    // We are not going anywhere. If this happens for the first
		                    // time, do nothing. Otherwise, try to go to the extreme of
		                    // the obstacle pair in the current direction.
		                    if (fromPoint.x === envelopWaypoint.x &&
		                        fromPoint.y === envelopWaypoint.y) {
		                        if (forceObstacleBreak) {
		                            envelopWaypoint[dir] = waypointUseMax ?
		                                max(
		                                    envelopingObstacle[dir + 'Max'],
		                                    secondEnvelopingObstacle[dir + 'Max']
		                                ) + 1 :
		                                min(
		                                    envelopingObstacle[dir + 'Min'],
		                                    secondEnvelopingObstacle[dir + 'Min']
		                                ) - 1;
		                        }
		                        // Toggle on if off, and the opposite
		                        forceObstacleBreak = !forceObstacleBreak;
		                    } else {
		                        // This point is not identical to previous.
		                        // Clear break trigger.
		                        forceObstacleBreak = false;
		                    }
		                }

		                segments = [{
		                    start: fromPoint,
		                    end: envelopWaypoint
		                }];

		            } else { // If not enveloping, use standard pivot calculation

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
		                    waypointUseMax = getDodgeDirection(
		                        pivot.obstacle, pivot, toPoint, !dirIsX, bounds
		                    );

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
		            segments = segments.concat(clearPathTo(
		                segments[segments.length - 1].end, toPoint, !dirIsX
		            ));

		            return segments;
		        }

		        // Extract point to outside of obstacle in whichever direction is
		        // closest. Returns new point outside obstacle.
		        function extractFromObstacle(obstacle, point, goalPoint) {
		            var dirIsX = min(obstacle.xMax - point.x, point.x - obstacle.xMin) <
		                        min(obstacle.yMax - point.y, point.y - obstacle.yMin),
		                bounds = {
		                    soft: options.hardBounds,
		                    hard: options.hardBounds
		                },
		                useMax = getDodgeDirection(
		                    obstacle, point, goalPoint, dirIsX, bounds
		                );

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
		            extractedEndPoint = extractFromObstacle(
		                chartObstacles[endObstacleIx],
		                end,
		                start
		            );
		            endSegments.push({
		                end: end,
		                start: extractedEndPoint
		            });
		            end = extractedEndPoint;
		        }
		        // If it's still inside one or more obstacles, get out of there by
		        // force-moving towards the start point.
		        while (
		            (endObstacleIx = findObstacleFromPoint(chartObstacles, end)) > -1
		        ) {
		            useMax = end[dir] - start[dir] < 0;
		            extractedEndPoint = {
		                x: end.x,
		                y: end.y
		            };
		            extractedEndPoint[dir] = chartObstacles[endObstacleIx][
		                useMax ? dir + 'Max' : dir + 'Min'
		            ] + (useMax ? 1 : -1);
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
	}(Highcharts));
	(function (H) {
		/**
		 * (c) 2017 Highsoft AS
		 * Authors: Lars A. V. Cabrera
		 *
		 * License: www.highcharts.com/license
		 */

		/**
		 * Creates an arrow symbol. Like a triangle, except not filled.
		 *                   o
		 *             o
		 *       o
		 * o
		 *       o
		 *             o
		 *                   o
		 * @param  {number} x x position of the arrow
		 * @param  {number} y y position of the arrow
		 * @param  {number} w width of the arrow
		 * @param  {number} h height of the arrow
		 * @return {Array}   Path array
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
		 *       o
		 *    o
		 * o
		 *    o
		 *       o
		 * @param  {number} x x position of the arrow
		 * @param  {number} y y position of the arrow
		 * @param  {number} w width of the arrow
		 * @param  {number} h height of the arrow
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols['arrow-half'] = function (x, y, w, h) {
		    return H.SVGRenderer.prototype.symbols.arrow(x, y, w / 2, h);
		};

		/**
		 * Creates a left-oriented triangle.
		 *             o
		 *       ooooooo
		 * ooooooooooooo
		 *       ooooooo
		 *             o
		 * @param  {number} x x position of the triangle
		 * @param  {number} y y position of the triangle
		 * @param  {number} w width of the triangle
		 * @param  {number} h height of the triangle
		 * @return {Array}   Path array
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
		 * @param  {number} x x position of the arrow
		 * @param  {number} y y position of the arrow
		 * @param  {number} w width of the arrow
		 * @param  {number} h height of the arrow
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols['arrow-filled'] =
		        H.SVGRenderer.prototype.symbols['triangle-left'];

		/**
		 * Creates a half-width, left-oriented triangle.
		 *       o
		 *    oooo
		 * ooooooo
		 *    oooo
		 *       o
		 * @param  {number} x x position of the triangle
		 * @param  {number} y y position of the triangle
		 * @param  {number} w width of the triangle
		 * @param  {number} h height of the triangle
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols['triangle-left-half'] = function (x, y, w, h) {
		    return H.SVGRenderer.prototype.symbols['triangle-left'](x, y, w / 2, h);
		};

		/**
		 * Alias function for triangle-left-half.
		 * @param  {number} x x position of the arrow
		 * @param  {number} y y position of the arrow
		 * @param  {number} w width of the arrow
		 * @param  {number} h height of the arrow
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols['arrow-filled-half'] =
		        H.SVGRenderer.prototype.symbols['triangle-left-half'];

	}(Highcharts));
	(function (H, pathfinderAlgorithms) {
		/**
		 * (c) 2016 Highsoft AS
		 * Authors: Øystein Moseng, Lars A. V. Cabrera
		 *
		 * License: www.highcharts.com/license
		 */

		var defined = H.defined,
		    deg2rad = H.deg2rad,
		    extend = H.extend,
		    each = H.each,
		    addEvent = H.addEvent,
		    merge = H.merge,
		    pick = H.pick,
		    max = Math.max,
		    min = Math.min;

		/*
		 TODO:
		     - Test dynamics, hiding/adding/removing/updating chart/series/points/axes
		     - Test connecting to multiple points
		     - Add demos/samples
		     - Document how to write your own algorithms
		     - Consider adding a Point.pathTo method that wraps creating a connection
		       and rendering it
		*/


		// Set default Pathfinder options
		extend(H.defaultOptions, {
		    /**
		     * The Pathfinder allows you to define connections between any two points,
		     * represented as lines - optionally with markers for the start and/or end
		     * points. Multiple algorithms are available for calculating how the
		     * connecting lines are drawn.
		     *
		     * Pathfinder functionality requires Highcharts Gantt to be loaded. In Gantt
		     * charts, the Pathfinder is used to draw dependencies between tasks.
		     *
		     * @product gantt
		     * @see [dependency](series.gantt.data.dependency)
		     * @optionparent pathfinder
		     */
		    pathfinder: {
		        /**
		         * Enable the pathfinder for this chart. Requires Highcharts Gantt.
		         *
		         * @type {boolean}
		         * @default true
		         * @since 6.2.0
		         * @apioption pathfinder.enabled
		         */

		        /**
		         * Set the default dash style for this chart's Pathfinder connecting
		         * lines.
		         *
		         * @type {string}
		         * @default solid
		         * @since 6.2.0
		         * @apioption pathfinder.dashStyle
		         */

		        /**
		         * Set the default color for this chart's Pathfinder connecting lines.
		         * Defaults to the color of the point being connected.
		         *
		         * @type {Color}
		         * @default null
		         * @since 6.2.0
		         * @apioption pathfinder.lineColor
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
		         * @type {number}
		         * @default null
		         * @since 6.2.0
		         * @apioption pathfinder.algorithmMargin
		         */

		        /**
		         * Set the default pathfinder algorithm to use for this chart. It is
		         * possible to define your own algorithms by adding them to the
		         * Highcharts.Pathfinder.prototype.algorithms object after the chart
		         * has been created.
		         *
		         * The default algorithms are as follows:
		         *
		         * straight:        Draws a straight line between the connecting points.
		         *                  Does not avoid other points when drawing.
		         *
		         * simpleConnect:   Finds a path between the points using right angles
		         *                  only. Takes only starting/ending points into
		         *                  account, and will not avoid other points.
		         *
		         * fastAvoid:       Finds a path between the points using right angles
		         *                  only. Will attempt to avoid other points, but its
		         *                  focus is performance over accuracy. Works well with
		         *                  less dense datasets.
		         *
		         * @type {string}
		         * @default straight
		         * @since 6.2.0
		         * @apioption pathfinder.type
		         */
		        type: 'straight',

		        /**
		         * Set the default pixel width for this chart's Pathfinder connecting
		         * lines.
		         *
		         * @type {number}
		         * @default 1
		         * @since 6.2.0
		         * @apioption pathfinder.lineWidth
		         */
		        lineWidth: 1,

		        /**
		         * Marker options for this chart's Pathfinder connectors.
		         *
		         * @type {object}
		         * @since 6.2.0
		         * @apioption pathfinder.marker
		         */
		        marker: {
		            /**
		             * Set the radius of the pathfinder markers. The default is
		             * automatically computed based on the algorithmMargin setting.
		             *
		             * Setting marker.width and marker.height will override this
		             * setting.
		             *
		             * @type {number}
		             * @default null
		             * @since 6.2.0
		             * @apioption pathfinder.marker.radius
		             */

		            /**
		             * Set the width of the pathfinder markers. If not supplied, this
		             * is inferred from the marker radius.
		             *
		             * @type {number}
		             * @default null
		             * @since 6.2.0
		             * @apioption pathfinder.marker.width
		             */

		            /**
		             * Set the height of the pathfinder markers. If not supplied, this
		             * is inferred from the marker radius.
		             *
		             * @type {number}
		             * @default null
		             * @since 6.2.0
		             * @apioption pathfinder.marker.height
		             */

		            /**
		             * Set the color of the pathfinder markers. By default this is the
		             * same as the connector color.
		             *
		             * @type {Color}
		             * @default null
		             * @since 6.2.0
		             * @apioption pathfinder.marker.color
		             */

		            /**
		             * Set the line/border color of the pathfinder markers. By default
		             * this is the same as the marker color.
		             *
		             * @type {Color}
		             * @default null
		             * @since 6.2.0
		             * @apioption pathfinder.marker.lineColor
		             */

		            /**
		             * Enable markers for the connectors.
		             */
		            enabled: false,

		            /**
		             * Horizontal alignment of the markers relative to the points.
		             */
		            align: 'center',

		            /**
		             * Vertical alignment of the markers relative to the points.
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
		         * @type {object}
		         * @since 6.2.0
		         * @extends pathfinder.marker
		         * @apioption pathfinder.startMarker
		         */
		        startMarker: {
		            /**
		             * Set the symbol of the pathfinder start markers.
		             */
		            symbol: 'diamond'
		        },

		        /**
		         * Marker options specific to the end markers for this chart's
		         * Pathfinder connectors. Overrides the generic marker options.
		         *
		         * @type {object}
		         * @since 6.2.0
		         * @extends pathfinder.marker
		         * @apioption pathfinder.endMarker
		         */
		        endMarker: {
		            /**
		             * Set the symbol of the pathfinder end markers.
		             */
		            symbol: 'arrow-filled'
		        }
		    }
		});

		/**
		 * Override Pathfinder options for a series. Requires Highcharts Gantt or the
		 * Pathfinder module.
		 *
		 * @since 6.2.0
		 * @extends pathfinder
		 * @product gantt
		 * @apioption plotOptions.series.pathfinder
		 * @excluding enabled,algorithmMargin
		 */

		/**
		 * Connect to a point. Requires Highcharts Gantt to be loaded. This option can
		 * be either a string, referring to the ID of another point, or an object.
		 *
		 * @type {string|object}
		 * @since 6.2.0
		 * @extends plotOptions.series.pathfinder
		 * @product gantt
		 * @apioption series.xrange.data.connect
		 */

		/**
		 * The ID of the point to connect to.
		 *
		 * @type {string}
		 * @since 6.2.0
		 * @product gantt
		 * @apioption series.xrange.data.connect.to
		 */


		/**
		 * Get point bounding box using plotX/plotY and shapeArgs. If using
		 * graphic.getBBox() directly, the bbox will be affected by animation.
		 *
		 * @param   {Highcharts.Point} point
		 *          The point to get BB of.
		 *
		 * @return  {object}
		 *          Result xMax, xMin, yMax, yMin.
		 */
		function getPointBB(point) {
		    var shapeArgs = point.shapeArgs,
		        bb;

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
		 * @param   {Array} obstacles
		 *          Obstacles to calculate margin from.
		 *
		 * @return  {number}
		 *          The calculated margin in pixels. At least 1.
		 */
		function calculateObstacleMargin(obstacles) {
		    var len = obstacles.length,
		        i = 0,
		        j,
		        obstacleDistance,
		        distances = [],
		        // Compute smallest distance between two rectangles
		        distance = function (a, b, bbMargin) {
		            // Count the distance even if we are slightly off
		            var margin = pick(bbMargin, 10),
		                yOverlap = a.yMax + margin > b.yMin - margin &&
		                            a.yMin - margin < b.yMax + margin,
		                xOverlap = a.xMax + margin > b.xMin - margin &&
		                            a.xMin - margin < b.xMax + margin,
		                xDistance = yOverlap ? (
		                    a.xMin > b.xMax ? a.xMin - b.xMax : b.xMin - a.xMax
		                ) : Infinity,
		                yDistance = xOverlap ? (
		                    a.yMin > b.yMax ? a.yMin - b.yMax : b.yMin - a.yMax
		                ) : Infinity;

		            // If the rectangles collide, try recomputing with smaller margin.
		            // If they collide anyway, discard the obstacle.
		            if (xOverlap && yOverlap) {
		                return (
		                    margin ?
		                    distance(a, b, Math.floor(margin / 2)) :
		                    Infinity
		                );
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

		    return max(
		        Math.floor(
		            distances.sort(function (a, b) {
		                return a - b;
		            })[
		                // Discard first 10% of the relevant distances, and then grab
		                // the smallest one.
		                Math.floor(distances.length / 10)
		            ] / 2 - 1 // Divide the distance by 2 and subtract 1.
		        ),
		        1 // 1 is the minimum margin
		    );
		}


		/**
		 * The Connection class. Used internally to represent a connection between two
		 * points.
		 *
		 * @private
		 * @class Connection
		 *
		 * @param   {Highcharts.Point} from
		 *          Connection runs from this Point.
		 *
		 * @param   {Highcharts.Point} to
		 *          Connection runs to this Point.
		 *
		 * @param   {object} [options]
		 *          Connection options.
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
		     * @param   {Highcharts.Point} from
		     *          Connection runs from this Point.
		     *
		     * @param   {Highcharts.Point} to
		     *          Connection runs to this Point.
		     *
		     * @param   {object} [options]
		     *          Connection options.
		     *
		     * @return  {void}
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
		     * @param   {Array} path
		     *          Path to render, in array format. E.g. ['M', 0, 0, 'L', 10, 10]
		     *
		     * @param   {object} [attribs]
		     *          SVG attributes for the path.
		     *
		     * @param   {object} [animation]
		     *          Animation options for the rendering.
		     *
		     * @param   {Function} [complete]
		     *          Callback function when the path has been rendered and animation
		     *          is complete.
		     *
		     * @return  {void}
		     */
		    renderPath: function (path, attribs, animation) {
		        var connection = this,
		            chart = this.chart,
		            pathfinder = chart.pathfinder,
		            animate = !chart.options.chart.forExport && animation !== false,
		            pathGraphic = connection.graphics && connection.graphics.path;

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
                
		                .attr({
		                    opacity: 0
		                })
                
		                .add(pathfinder.group);
		        }

		        // Set path attribs and animate to the new path
		        pathGraphic.attr(attribs);
		        pathGraphic[animate ? 'animate' : 'attr']({
            
		            opacity: 1,
            
		            d: path
		        }, animation);

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
		     * @param   {string} type
		     *          Marker type, either 'start' or 'end'.
		     *
		     * @param   {object} options
		     *          All options for this marker. Not calculated or merged with other
		     *          options.
		     *
		     * @param   {Array} path
		     *          Connection path in array format. This is used to calculate the
		     *          rotation angle of the markers.
		     *
		     * @return  {void}
		     */
		    addMarker: function (type, options, path) {
		        var connection = this,
		            chart = connection.fromPoint.series.chart,
		            pathfinder = chart.pathfinder,
		            renderer = chart.renderer,
		            point = (
		                type === 'start' ?
		                connection.fromPoint :
		                connection.toPoint
		            ),
		            anchor = point.getPathfinderAnchorPoint(options),
		            markerVector,
		            radians,
		            rotation,
		            box,
		            width,
		            height,
		            pathVector;


		        if (!options.enabled) {
		            return;
		        }

		        // Last vector before start/end of path, used to get angle
		        if (type === 'start') {
		            pathVector = {
		                x: path[4],
		                y: path[5]
		            };
		        } else { // 'end'
		            pathVector = {
		                x: path[path.length - 5],
		                y: path[path.length - 4]
		            };
		        }

		        // Get angle between pathVector and anchor point and use it to create
		        // marker position.
		        radians = point.getRadiansToVector(pathVector, anchor);
		        markerVector = point.getMarkerVector(
		            radians,
		            options.radius,
		            anchor
		        );

		        // Rotation of marker is calculated from angle between pathVector and
		        // markerVector.
		        // (Note:
		        //  Used to recalculate radians between markerVector and pathVector,
		        //  but this should be the same as between pathVector and anchor.)
		        rotation = -radians / deg2rad;

		        if (options.width && options.height) {
		            width = options.width;
		            height = options.height;
		        } else {
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
		            connection.graphics[type] = renderer.symbol(
		                    options.symbol
		                )
		                .addClass(
		                    'highcharts-point-connecting-path-' + type + '-marker'
		                )
		                .attr(box)

                
		                .attr({
		                    fill: options.color || connection.fromPoint.color,
		                    stroke: options.lineColor,
		                    'stroke-width': options.lineWidth,
		                    opacity: 0
		                })
		                .animate({
		                    opacity: 1
		                }, point.series.options.animation)
                
		                .add(pathfinder.group);
		        } else {
		            connection.graphics[type].animate(box);
		        }
		    },

		    /**
		     * Calculate and return connection path.
		     * Note: Recalculates chart obstacles on demand if they aren't calculated.
		     *
		     * @function Highcharts.Connection#getPath
		     *
		     * @param   {object} options
		     *          Pathfinder options. Not calculated or merged with other options.
		     *
		     * @return  {Array}
		     *          Calculated SVG path data in array format.
		     */
		    getPath: function (options) {
		        var pathfinder = this.pathfinder,
		            chart = this.chart,
		            algorithm = pathfinder.algorithms[options.type],
		            chartObstacles = pathfinder.chartObstacles;

		        if (typeof algorithm !== 'function') {
		            H.error(
		                '"' + options.type + '" is not a Pathfinder algorithm.'
		            );
		            return;
		        }

		        // This function calculates obstacles on demand if they don't exist
		        if (algorithm.requiresObstacles && !chartObstacles) {
		            chartObstacles =
		                pathfinder.chartObstacles =
		                pathfinder.getChartObstacles(options);

		            // If the algorithmMargin was computed, store the result in default
		            // options.
		            chart.options.pathfinder.algorithmMargin = options.algorithmMargin;

		            // Cache some metrics too
		            pathfinder.chartObstacleMetrics =
		                pathfinder.getObstacleMetrics(chartObstacles);
		        }

		        // Get the SVG path
		        return algorithm(
		            // From
		            this.fromPoint.getPathfinderAnchorPoint(options.startMarker),
		            // To
		            this.toPoint.getPathfinderAnchorPoint(options.endMarker),
		            merge({
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
		                startDirectionX: pathfinder.getAlgorithmStartDirection(
		                                options.startMarker
		                            )
		            }, options)
		        );
		    },

		    /**
		     * (re)Calculate and (re)draw the connection.
		     *
		     * @function Highcharts.Connection#render
		     */
		    render: function () {
		        var connection = this,
		            fromPoint = connection.fromPoint,
		            series = fromPoint.series,
		            chart = series.chart,
		            pathfinder = chart.pathfinder,
		            pathResult,
		            path,
		            options = merge(
		                chart.options.pathfinder, series.options.pathfinder,
		                fromPoint.options.pathfinder, connection.options
		            ),
		            attribs = {};

		        // Set path attribs
        
		        attribs.stroke = options.lineColor || fromPoint.color;
		        attribs['stroke-width'] = options.lineWidth;
		        if (options.dashStyle) {
		            attribs.dashstyle = options.dashStyle;
		        }
        

		        attribs.class = 'highcharts-point-connecting-path ' +
		            'highcharts-color-' + fromPoint.colorIndex;
		        options = merge(attribs, options);

		        // Set common marker options
		        if (!defined(options.marker.radius)) {
		            options.marker.radius = min(max(
		                Math.ceil((options.algorithmMargin || 8) / 2) - 1, 1
		            ), 5);
		        }
		        // Get the path
		        pathResult = connection.getPath(options);
		        path = pathResult.path;

		        // Always update obstacle storage with obstacles from this path.
		        // We don't know if future calls will need this for their algorithm.
		        if (pathResult.obstacles) {
		            pathfinder.lineObstacles = pathfinder.lineObstacles || [];
		            pathfinder.lineObstacles =
		                pathfinder.lineObstacles.concat(pathResult.obstacles);
		        }

		        // Add the calculated path to the pathfinder group
		        connection.renderPath(path, attribs, series.options.animation);

		        // Render the markers
		        connection.addMarker(
		            'start',
		            merge(options.marker, options.startMarker),
		            path
		        );
		        connection.addMarker(
		            'end',
		            merge(options.marker, options.endMarker),
		            path
		        );
		    },

		    /**
		     * Destroy connection by destroying the added graphics elements.
		     *
		     * @function Highcharts.Connection#destroy
		     */
		    destroy: function () {
		        if (this.graphics) {
		            H.objectEach(this.graphics, function (val) {
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
		 * @class Pathfinder
		 *
		 * @param   {Highcharts.Chart} chart
		 *          The chart to operate on.
		 */
		function Pathfinder(chart) {
		    this.init(chart);
		}
		Pathfinder.prototype = {

		    algorithms: pathfinderAlgorithms,

		    /**
		     * Initialize the Pathfinder object.
		     *
		     * @function Highcharts.Pathfinder#init
		     *
		     * @param   {Highcharts.Chart} chart
		     *          The chart context.
		     *
		     * @return  {void}
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
		     * @param {boolean} deferRender Whether or not to defer rendering of
		     *      connections until series.afterAnimate event has fired. Used on first
		     *      render.
		     */
		    update: function (deferRender) {
		        var chart = this.chart,
		            pathfinder = this,
		            oldConnections = pathfinder.connections;

		        // Rebuild pathfinder connections from options
		        pathfinder.connections = [];
		        each(chart.series, function (series) {
		            if (series.visible) {
		                each(series.points, function (point) {
		                    var to,
		                        connects = (
		                            point.options &&
		                            point.options.connect &&
		                            H.splat(point.options.connect)
		                        );
		                    if (point.visible && point.isInside !== false && connects) {
		                        each(connects, function (connect) {
		                            to = chart.get(typeof connect === 'string' ?
		                                connect : connect.to
		                            );
		                            if (
		                                to instanceof H.Point &&
		                                to.series.visible &&
		                                to.visible &&
		                                to.isInside !== false
		                            ) {
		                                // Add new connection
		                                pathfinder.connections.push(new Connection(
		                                    point, // from
		                                    to,
		                                    typeof connect === 'string' ? {} : connect
		                                ));
		                            }
		                        });
		                    }
		                });
		            }
		        });

		        // Clear connections that should not be updated, and move old info over
		        // to new connections.
		        for (
		            var j = 0, k, found, lenOld = oldConnections.length,
		                lenNew = pathfinder.connections.length;
		            j < lenOld;
		            ++j
		        ) {
		            found = false;
		            for (k = 0; k < lenNew; ++k) {
		                if (
		                    oldConnections[j].fromPoint ===
		                        pathfinder.connections[k].fromPoint &&
		                    oldConnections[j].toPoint ===
		                        pathfinder.connections[k].toPoint
		                ) {
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
		     * @param {boolean} deferRender Whether or not to defer render until series
		     *      animation is finished. Used on first render.
		     */
		    renderConnections: function (deferRender) {
		        if (deferRender) {
		            // Render after series are done animating
		            each(this.chart.series, function (series) {
		                var render = function () {
		                    // Find pathfinder connections belonging to this series
		                    // that haven't rendered, and render them now.
		                    var pathfinder = series.chart.pathfinder,
		                        conns = pathfinder && pathfinder.connections || [];
		                    each(conns, function (connection) {
		                        if (
		                            connection.fromPoint &&
		                            connection.fromPoint.series === series
		                        ) {
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
		                } else {
		                    series.pathfinderRemoveRenderEvent = addEvent(
		                        series, 'afterAnimate', render
		                    );
		                }
		            });
		        } else {
		            // Go through connections and render them
		            each(this.connections, function (connection) {
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
		     * @param   {object} options
		     *          Options for the calculation. Currenlty only
		     *          options.algorithmMargin.
		     *
		     * @return  {Array}
		     *          An array of calculated obstacles. Each obstacle is defined as
		     *          an object with xMin, xMax, yMin and yMax properties.
		     */
		    getChartObstacles: function (options) {
		        var obstacles = [],
		            series = this.chart.series,
		            margin = pick(options.algorithmMargin, 0),
		            calculatedMargin;
		        for (var i = 0, sLen = series.length; i < sLen; ++i) {
		            if (series[i].visible) {
		                for (
		                    var j = 0, pLen = series[i].points.length, bb, point;
		                    j < pLen;
		                    ++j
		                ) {
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
		            each(obstacles, function (obstacle) {
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
		     *  - Widest obstacle width
		     *  - Tallest obstacle height
		     *
		     * @function Highcharts.Pathfinder#getObstacleMetrics
		     *
		     * @param   {Array} obstacles
		     *          An array of obstacles to inspect.
		     *
		     * @return  {object}
		     *          The calculated metrics, as an object with maxHeight and maxWidth
		     *          properties.
		     */
		    getObstacleMetrics: function (obstacles) {
		        var maxWidth = 0,
		            maxHeight = 0,
		            width,
		            height,
		            i = obstacles.length;

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
		     * @param   {object} markerOptions
		     *          Marker options to calculate from.
		     *
		     * @return  {boolean}
		     *          Returns true for X, false for Y, and undefined for
		     *          autocalculate.
		     */
		    getAlgorithmStartDirection: function (markerOptions) {
		        var xCenter = markerOptions.align !== 'left' &&
		                        markerOptions.align !== 'right',
		            yCenter = markerOptions.verticalAlign !== 'top' &&
		                        markerOptions.verticalAlign !== 'bottom',
		            undef;

		        return xCenter ?
		            (yCenter ? undef : false) : // x is centered
		            (yCenter ? true : undef);   // x is off-center
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
		     * @param   {object} markerOptions
		     *          Connection options for position on point.
		     *
		     * @return  {object}
		     *          An object with x/y properties for the position. Coordinates are
		     *          in plot values, not relative to point.
		     */
		    getPathfinderAnchorPoint: function (markerOptions) {
		        var bb = getPointBB(this),
		            x,
		            y;

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
		     * @param   {object} v1
		     *          The first vector, as an object with x/y properties.
		     *
		     * @param   {object} v2
		     *          The second vector, as an object with x/y properties.
		     *
		     * @return  {number}
		     *          The angle in degrees
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
		     * @param   {number} radians
		     *          The angle in radians from the point center to another vector.
		     *
		     * @param   {number} markerRadius
		     *          The radius of the marker, to calculate the additional distance
		     *          to the center of the marker.
		     *
		     * @param   {object} anchor
		     *          The anchor point of the path and marker as an object with x/y
		     *          properties.
		     *
		     * @return  {object}
		     *          The marker vector as an object with x/y properties.
		     */
		    getMarkerVector: function (radians, markerRadius, anchor) {
		        var twoPI = Math.PI * 2.0,
		            theta = radians,
		            bb = getPointBB(this),
		            rectWidth = bb.xMax - bb.xMin,
		            rectHeight = bb.yMax - bb.yMin,
		            rAtan = Math.atan2(rectHeight, rectWidth),
		            tanTheta = 1,
		            leftOrRightRegion = false,
		            rectHalfWidth = rectWidth / 2.0,
		            rectHalfHeight = rectHeight / 2.0,
		            rectHorizontalCenter = bb.xMin + rectHalfWidth,
		            rectVerticalCenter = bb.yMin + rectHalfHeight,
		            edgePoint = {
		                x: rectHorizontalCenter,
		                y: rectVerticalCenter
		            },
		            markerPoint = {},
		            xFactor = 1,
		            yFactor = 1;

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
		        } else if (theta > rAtan && theta <= (Math.PI - rAtan)) {
		            // Top side
		            yFactor = -1;
		        } else if (theta > (Math.PI - rAtan) || theta <= -(Math.PI - rAtan)) {
		            // Left side
		            xFactor = -1;
		            leftOrRightRegion = true;
		        } else {
		            // Bottom side
		            xFactor = -1;
		        }

		        // Correct the edgePoint according to the placement of the marker
		        if (leftOrRightRegion) {
		            edgePoint.x += xFactor * (rectHalfWidth);
		            edgePoint.y += yFactor * (rectHalfWidth) * tanTheta;
		        } else {
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

		// Initialize Pathfinder for charts
		H.Chart.prototype.callbacks.push(function (chart) {
		    var options = chart.options;
		    if (options.pathfinder.enabled !== false) {
		        this.pathfinder = new Pathfinder(this);
		        this.pathfinder.update(true); // First draw, defer render
		    }
		});

	}(Highcharts, algorithms));
	(function (H) {
		/**
		 * X-range series module
		 *
		 * (c) 2010-2018 Torstein Honsi, Lars A. V. Cabrera
		 *
		 * License: www.highcharts.com/license
		 */



		var addEvent = H.addEvent,
		    defined = H.defined,
		    color = H.Color,
		    columnType = H.seriesTypes.column,
		    each = H.each,
		    isNumber = H.isNumber,
		    isObject = H.isObject,
		    merge = H.merge,
		    pick = H.pick,
		    seriesType = H.seriesType,
		    seriesTypes = H.seriesTypes,
		    Axis = H.Axis,
		    Point = H.Point,
		    Series = H.Series;

		/**
		 * Return color of a point based on its category.
		 *
		 * @param {object} series The series which the point belongs to.
		 * @param {object} point The point to calculate its color for.
		 * @returns {object} Returns an object containing the properties color and
		 * colorIndex.
		 */
		var getColorByCategory = function getColorByCategory(series, point) {
		    var colors = series.options.colors || series.chart.options.colors,
		        colorCount = colors ?
		            colors.length :
		            series.chart.options.chart.colorCount,
		        colorIndex = point.y % colorCount,
		        color = colors && colors[colorIndex];

		    return {
		        colorIndex: colorIndex,
		        color: color
		    };
		};

		/**
		 * @private
		 * @class
		 * @name Highcharts.seriesTypes.xrange
		 *
		 * @augments Highcharts.Series
		 */
		seriesType('xrange', 'column'

		/**
		 * The X-range series displays ranges on the X axis, typically time intervals
		 * with a start and end date.
		 *
		 * @extends      {plotOptions.column}
		 * @excluding    boostThreshold,crisp,cropThreshold,depth,edgeColor,edgeWidth,
		 *               findNearestPointBy,getExtremesFromAll,negativeColor,
		 *               pointInterval,pointIntervalUnit,pointPlacement,
		 *               pointRange,pointStart,softThreshold,stacking,threshold,data
		 * @product      highcharts highstock gantt
		 * @sample       {highcharts} highcharts/demo/x-range/
		 *               X-range
		 * @sample       {highcharts} highcharts/css/x-range/
		 *               Styled mode X-range
		 * @sample       {highcharts} highcharts/chart/inverted-xrange/
		 *               Inverted X-range
		 * @since        6.0.0
		 * @product      highcharts highstock
		 * @optionparent plotOptions.xrange
		 */
		, {

		    /**
		     * A partial fill for each point, typically used to visualize how much of
		     * a task is performed. The partial fill object can be set either on series
		     * or point level.
		     *
		     * @sample {highcharts} highcharts/demo/x-range
		     *         X-range with partial fill
		     *
		     * @product   highcharts highstock gantt
		     * @apioption plotOptions.xrange.partialFill
		     */

		    /**
		     * The fill color to be used for partial fills. Defaults to a darker shade
		     * of the point color.
		     *
		     * @type      {Highcharts.ColorString}
		     * @product   highcharts highstock gantt
		     * @apioption plotOptions.xrange.partialFill.fill
		     */

		    /**
		     * A partial fill for each point, typically used to visualize how much of
		     * a task is performed. The partial fill object can be set either on series
		     * or point level.
		     *
		     * @sample    {highcharts} highcharts/demo/x-range
		     *            X-range with partial fill
		     * @type      {Object}
		     * @extends   plotOptions.xrange.partialFill
		     * @apioption series.xrange.data.partialFill
		     */


		    /**
		     * In an X-range series, this option makes all points of the same Y-axis
		     * category the same color.
		     */
		    colorByPoint: true,

		    dataLabels: {

		        verticalAlign: 'middle',

		        inside: true,

		        /**
		         * The default formatter for X-range data labels displays the percentage
		         * of the partial fill amount.
		         *
		         * @type    {Highcharts.FormatterCallbackFunction}
		         * @default function () { return (amount * 100) + '%'; }
		         */
		        formatter: function () {
		            var point = this.point,
		                amount = point.partialFill;
		            if (isObject(amount)) {
		                amount = amount.amount;
		            }
		            if (!defined(amount)) {
		                amount = 0;
		            }
		            return (amount * 100) + '%';
		        }
		    },

		    tooltip: {

		        headerFormat: '<span style="font-size: 0.85em">{point.x} - {point.x2}</span><br/>',

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
		    /**
		     * Borrow the column series metrics, but with swapped axes. This gives free
		     * access to features like groupPadding, grouping, pointWidth etc.
		     *
		     * @private
		     * @function Higcharts.seriesTypes.xrange#getColumnMetrics
		     *
		     * @return {Highcharts.ColumnMetricsObject}
		     */
		    getColumnMetrics: function () {
		        var metrics,
		            chart = this.chart;

		        function swapAxes() {
		            each(chart.series, function (s) {
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
		     * Override cropData to show a point where x or x2 is outside visible range,
		     * but one of them is inside.
		     *
		     * @private
		     * @function Highcharts.seriesTypes.xrange#cropData
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
		        var cropData = Series.prototype.cropData,
		            crop = cropData.call(this, this.x2Data, yData, min, max);

		        // Re-insert the cropped xData
		        crop.xData = xData.slice(crop.start, crop.end);

		        return crop;
		    },

		    /**
		     * @private
		     * @function Highcharts.seriesTypes.xrange#translatePoint
		     *
		     * @param {Highcharts.Point} point
		     */
		    translatePoint: function (point) {
		        var series = this,
		            xAxis = series.xAxis,
		            yAxis = series.yAxis,
		            metrics = series.columnMetrics,
		            options = series.options,
		            minPointLength = options.minPointLength || 0,
		            plotX = point.plotX,
		            posX = pick(point.x2, point.x + (point.len || 0)),
		            plotX2 = xAxis.translate(posX, 0, 0, 0, 1),
		            length = Math.abs(plotX2 - plotX),
		            widthDifference,
		            shapeArgs,
		            partialFill,
		            inverted = this.chart.inverted,
		            borderWidth = pick(options.borderWidth, 1),
		            crisper = borderWidth % 2 / 2,
		            yOffset = metrics.offset,
		            pointHeight = Math.round(metrics.width),
		            dlLeft,
		            dlRight,
		            dlWidth;

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
		            yOffset -= (Math.ceil(point.options.pointWidth) - pointHeight) / 2;
		            pointHeight = Math.ceil(point.options.pointWidth);
		        }

		        // Apply pointPlacement to the Y axis
		        if (
		            options.pointPlacement &&
		            isNumber(point.plotY) &&
		            yAxis.categories
		        ) {
		            point.plotY = yAxis
		                .translate(point.y, 0, 1, 0, 1, options.pointPlacement);
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

		        } else {
		            point.dlBox = null;
		        }

		        // Tooltip position
		        point.tooltipPos[0] += inverted ? 0 : length / 2;
		        point.tooltipPos[1] -= inverted ? -length / 2 : metrics.width / 2;

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
		            point.clipRectArgs = {
		                x: shapeArgs.x,
		                y: shapeArgs.y,
		                width: Math.max(
		                    Math.round(
		                        length * partialFill +
		                        (point.plotX - plotX)
		                    ),
		                    0
		                ),
		                height: shapeArgs.height
		            };
		        }

		        // Category from Y axis
		        if (yAxis.categories) {
		            point.category = yAxis.categories[point.y];
		        }
		    },

		    /**
		     * @private
		     * @function Highcharts.seriesTypes.xrange#translate
		     */
		    translate: function () {
		        columnType.prototype.translate.apply(this, arguments);
		        each(this.points, function (point) {
		            this.translatePoint(point);
		        }, this);
		    },

		    /**
		     * Draws a single point in the series. Needed for partial fill.
		     *
		     * This override turns point.graphic into a group containing the original
		     * graphic and an overlay displaying the partial fill.
		     *
		     * @private
		     * @function Highcharts.seriesTypes.xrange#drawPoint
		     *
		     * @param {Highcharts.Point} point
		     *        An instance of Point in the series.
		     *
		     * @param {"animate"|"attr"} verb
		     *        'animate' (animates changes) or 'attr' (sets options)
		     */
		    drawPoint: function (point, verb) {
		        var series = this,
		            seriesOpts = series.options,
		            renderer = series.chart.renderer,
		            graphic = point.graphic,
		            type = point.shapeType,
		            shapeArgs = point.shapeArgs,
		            partShapeArgs = point.partShapeArgs,
		            clipRectArgs = point.clipRectArgs,
		            pfOptions = point.partialFill,
		            fill,
		            state = point.selected && 'select',
		            cutOff = seriesOpts.stacking && !seriesOpts.borderRadius;

		        if (!point.isNull) {

		            // Original graphic
		            if (graphic) { // update
		                point.graphicOriginal[verb](
		                    merge(shapeArgs)
		                );

		            } else {
		                point.graphic = graphic = renderer.g('point')
		                    .addClass(point.getClassName())
		                    .add(point.group || series.group);

		                point.graphicOriginal = renderer[type](shapeArgs)
		                    .addClass(point.getClassName())
		                    .addClass('highcharts-partfill-original')
		                    .add(graphic);
		            }

		            // Partial fill graphic
		            if (partShapeArgs) {
		                if (point.graphicOverlay) {
		                    point.graphicOverlay[verb](
		                        merge(partShapeArgs)
		                    );
		                    point.clipRect.animate(
		                        merge(clipRectArgs)
		                    );

		                } else {

		                    point.clipRect = renderer.clipRect(
		                        clipRectArgs.x,
		                        clipRectArgs.y,
		                        clipRectArgs.width,
		                        clipRectArgs.height
		                    );

		                    point.graphicOverlay = renderer[type](partShapeArgs)
		                        .addClass('highcharts-partfill-overlay')
		                        .add(graphic)
		                        .clip(point.clipRect);
		                }
		            }


            
		            // Presentational
		            point.graphicOriginal
		                .attr(series.pointAttribs(point, state))
		                .shadow(seriesOpts.shadow, null, cutOff);
		            if (partShapeArgs) {
		                // Ensure pfOptions is an object
		                if (!isObject(pfOptions)) {
		                    pfOptions = {};
		                }
		                if (isObject(seriesOpts.partialFill)) {
		                    pfOptions = merge(pfOptions, seriesOpts.partialFill);
		                }

		                fill = (
		                    pfOptions.fill ||
		                    color(point.color || series.color).brighten(-0.3).get()
		                );

		                point.graphicOverlay
		                    .attr(series.pointAttribs(point, state))
		                    .attr({
		                        'fill': fill
		                    })
		                    .shadow(seriesOpts.shadow, null, cutOff);
		            }
            

		        } else if (graphic) {
		            point.graphic = graphic.destroy(); // #1269
		        }
		    },

		    /**
		     * @private
		     * @function Highcharts.seriesTypes.xrange#drawPoints
		     */
		    drawPoints: function () {
		        var series = this,
		            verb = series.getAnimationVerb();

		        // Draw the columns
		        each(series.points, function (point) {
		            series.drawPoint(point, verb);
		        });
		    },


		    /**
		     * Returns "animate", or "attr" if the number of points is above the
		     * animation limit.
		     *
		     * @private
		     * @function Highcharts.seriesTypes.xrange#getAnimationVerb
		     *
		     * @return {string}
		     */
		    getAnimationVerb: function () {
		        return this.chart.pointCount < (this.options.animationLimit || 250) ?
		             'animate' : 'attr';
		    }

		    /**
		     * Override to remove stroke from points.
		     * For partial fill.
		     *
		     * @ignore
		     * @private
		     * @function Highcharts.seriesTypes.xrange#pointAttribs
		     *
		     * @return {*}
		     * /
		    pointAttribs: function () {
		        var series = this,
		            retVal = columnType.prototype.pointAttribs.apply(series, arguments);

		        //retVal['stroke-width'] = 0;
		        return retVal;
		    }
		    //*/

		}, { // Point class properties
		    /**
		     * Extend applyOptions so that `colorByPoint` for x-range means that one
		     * color is applied per Y axis category.
		     *
		     * @private
		     * @function Highcharts.Point#applyOptions
		     *
		     * @return {Highcharts.Series}
		     */
		    applyOptions: function () {
		        var point = Point.prototype.applyOptions.apply(this, arguments),
		            series = point.series,
		            colorByPoint;

		        if (series.options.colorByPoint && !point.options.color) {
		            colorByPoint = getColorByCategory(series, point);
            
		            point.color = colorByPoint.color;
            
		            if (!point.options.colorIndex) {
		                point.colorIndex = colorByPoint.colorIndex;
		            }
		        }

		        return point;
		    },
		    /**
		     * Extend init to have y default to 0.
		     *
		     * @private
		     * @function Highcharts.Point#init
		     *
		     * @return {Highcharts.Series}
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
		        var point = this,
		            cfg = Point.prototype.getLabelConfig.call(point),
		            yCats = point.series.yAxis.categories;

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
		});

		// Max x2 should be considered in xAxis extremes
		addEvent(Axis, 'afterGetSeriesExtremes', function () {
		    var axis = this,
		        axisSeries = axis.series,
		        dataMax,
		        modMax;

		    if (axis.isXAxis) {
		        dataMax = pick(axis.dataMax, -Number.MAX_VALUE);
		        each(axisSeries, function (series) {
		            if (series.x2Data) {
		                each(series.x2Data, function (val) {
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
		 * @excluding boostThreshold,crisp,cropThreshold,depth,edgeColor,edgeWidth,
		 *            findNearestPointBy,getExtremesFromAll,
		 *            negativeColor,pointInterval,pointIntervalUnit,pointPlacement,
		 *            pointRange,pointStart,softThreshold,stacking,threshold
		 * @product   highcharts highstock gantt
		 * @apioption series.xrange
		 */

		/**
		 * An array of data points for the series. For the `xrange` series type,
		 * points can be given in the following ways:
		 *
		 * 1.  An array of objects with named values. The objects are point
		 * configuration objects as seen below.
		 *
		 *  ```js
		 *     data: [{
		 *         x: Date.UTC(2017, 0, 1),
		 *         x2: Date.UTC(2017, 0, 3),
		 *         name: "Test",
		 *         y: 0,
		 *         color: "#00FF00"
		 *     }, {
		 *         x: Date.UTC(2017, 0, 4),
		 *         x2: Date.UTC(2017, 0, 5),
		 *         name: "Deploy",
		 *         y: 1,
		 *         color: "#FF0000"
		 *     }]
		 *  ```
		 *
		 * @sample {highcharts} highcharts/chart/reflow-true/
		 *         Numerical values
		 * @sample {highcharts} highcharts/series/data-array-of-arrays/
		 *         Arrays of numeric x and y
		 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
		 *         Arrays of datetime x and y
		 * @sample {highcharts} highcharts/series/data-array-of-name-value/
		 *         Arrays of point.name and y
		 * @sample {highcharts} highcharts/series/data-array-of-objects/
		 *         Config objects
		 *
		 * @type      {Array<number|Array<number>|*>}
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
		 * @type      {Highcharts.ColorString}
		 * @product   highcharts highstock gantt
		 * @apioption series.xrange.data.partialFill.fill
		 */

	}(Highcharts));
	(function (H) {
		/**
		* (c) 2016 Highsoft AS
		* Authors: Lars A. V. Cabrera
		*
		* License: www.highcharts.com/license
		*/


		var dateFormat = H.dateFormat,
		    isObject = H.isObject,
		    isNumber = H.isNumber,
		    merge = H.merge,
		    pick = H.pick,
		    seriesType = H.seriesType,
		    seriesTypes = H.seriesTypes,
		    stop = H.stop,
		    Series = H.Series,
		    parent = seriesTypes.xrange;

		/**
		 * A `gantt` series. If the [type](#series.gantt.type) option is not specified,
		 * it is inherited from [chart.type](#chart.type).
		 *
		 * @type {Object}
		 * @extends {plotOptions.xrange}
		 * @product gantt
		 * @optionparent plotOptions.gantt
		 */
		seriesType('gantt', 'xrange', {
		    // options - default options merged with parent

		    grouping: false,

		    dataLabels: {
		        enabled: true,
		        formatter: function () {
		            var point = this,
		                amount = point.point.partialFill;

		            if (isObject(amount)) {
		                amount = amount.amount;
		            }
		            if (isNumber(amount) && amount > 0) {
		                return (amount * 100) + '%';
		            }
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="color:{point.color};text-align:right">' +
		                            '{series.name}' +
		                        '</span><br/>',
		        pointFormat: null,
		        pointFormatter: function () {
		            var point = this,
		                series = point.series,
		                tooltip = series.chart.tooltip,
		                xAxis = series.xAxis,
		                options = xAxis.options,
		                formats = options.dateTimeLabelFormats,
		                startOfWeek = xAxis.options.startOfWeek,
		                ttOptions = series.tooltipOptions,
		                format = ttOptions.xDateFormat,
		                range = point.end ? point.end - point.start : 0,
		                start,
		                end,
		                milestone = point.options.milestone,
		                dateRowStart = '<span style="font-size: 0.8em">',
		                dateRowEnd = '</span><br/>',
		                retVal = '<b>' + (point.name || point.category) + '</b>';

		            if (ttOptions.pointFormat) {
		                return point.tooltipFormatter(ttOptions.pointFormat);
		            }

		            if (!format) {
		                format = H.splat(
		                    tooltip.getDateFormat(
		                        range,
		                        point.start,
		                        startOfWeek,
		                        formats
		                    )
		                )[0];
		            }

		            start = dateFormat(format, point.start);
		            end = dateFormat(format, point.end);

		            retVal += '<br/>';

		            if (!milestone) {
		                retVal += dateRowStart + 'Start: ' + start + dateRowEnd;
		                retVal += dateRowStart + 'End: ' + end + dateRowEnd;
		            } else {
		                retVal += dateRowStart + 'Date ' + start + dateRowEnd;
		            }

		            return retVal;
		        }
		    },
		    pathfinder: {
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
		            enabled: false, // Only show arrow on the dependent task
		            align: 'right'
		        }
		    }
		}, {
		    // props - series member overrides

		    // Keyboard navigation, don't use nearest vertical mode
		    keyboardMoveVertical: false,

		    // Handle milestones, as they have no x2
		    translatePoint: function (point) {
		        var series = this,
		            shapeArgs,
		            size;

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
		     * This override draws the point as a diamond if point.options.milestone is
		     * true, and uses the original drawPoint() if it is false or not set.
		     *
		     * @param  {Object} point an instance of Point in the series
		     * @param  {string} verb 'animate' (animates changes) or 'attr' (sets
		     *                       options)
		     * @returns {void}
		     */
		    drawPoint: function (point, verb) {
		        var series = this,
		            seriesOpts = series.options,
		            renderer = series.chart.renderer,
		            shapeArgs = point.shapeArgs,
		            plotY = point.plotY,
		            graphic = point.graphic,
		            state = point.selected && 'select',
		            cutOff = seriesOpts.stacking && !seriesOpts.borderRadius,
		            diamondShape;

		        if (point.options.milestone) {
		            if (isNumber(plotY) && point.y !== null) {
		                diamondShape = renderer.symbols.diamond(
		                    shapeArgs.x,
		                    shapeArgs.y,
		                    shapeArgs.width,
		                    shapeArgs.height
		                );

		                if (graphic) {
		                    stop(graphic);
		                    graphic[verb]({
		                        d: diamondShape
		                    });
		                } else {
		                    point.graphic = graphic = renderer.path(diamondShape)
		                    .addClass(point.getClassName(), true)
		                    .add(point.group || series.group);
		                }
                
		                // Presentational
		                point.graphic
		                    .attr(series.pointAttribs(point, state))
		                    .shadow(seriesOpts.shadow, null, cutOff);
                
		            } else if (graphic) {
		                point.graphic = graphic.destroy(); // #1269
		            }
		        } else {
		            parent.prototype.drawPoint.call(series, point, verb);
		        }
		    },

		    setData: Series.prototype.setData,

		    setGanttPointAliases: function (options) {
		        // Add a value to options if the value exists
		        function addIfExists(prop, val) {
		            if (val !== undefined) {
		                options[prop] = val;
		            }
		        }
		        addIfExists('x', pick(options.start, options.x));
		        addIfExists('x2', pick(options.end, options.x2));
		        addIfExists(
		            'partialFill', pick(options.completed, options.partialFill)
		        );
		        addIfExists('connect', pick(options.dependency, options.connect));
		    }

		}, merge(parent.prototype.pointClass.prototype, {
		    // pointProps - point member overrides. We inherit from parent as well.
		    /**
		     * Applies the options containing the x and y data and possible some extra
		     * properties. This is called on point init or from point.update.
		     *
		     * @param {Object} options the point options
		     * @param {number} x the x value
		     * @return {Object} the Point instance
		     */
		    applyOptions: function (options, x) {
		        var point = this,
		            series = point.series,
		            retVal = merge(options);

		        series.setGanttPointAliases(retVal);

		        retVal = parent.prototype.pointClass.prototype.applyOptions
		            .call(point, retVal, x);
		        return retVal;
		    }
		}));

		/**
		 * Data for a Gantt series.
		 *
		 * @type {Object}
		 * @extends {series.xrange.data}
		 * @excluding connect,x,x2,partialFill
		 * @product gantt
		 * @apioption series.gantt.data
		 */

		/**
		 * Whether the grid node belonging to this point should start as collapsed. Used
		 * in axes of type treegrid.
		 *
		 * @type {Boolean}
		 * @default false
		 * @product gantt
		 * @sample {gantt} gantt/treegrid-axis/collapsed/ Start as collapsed
		 * @apioption series.gantt.data.collapsed
		 */

		/**
		 * The start time of a task.
		 *
		 * @type {number}
		 * @product gantt
		 * @apioption series.gantt.data.start
		 */

		/**
		 * The end time of a task.
		 *
		 * @type {number}
		 * @product gantt
		 * @apioption series.gantt.data.end
		 */

		/**
		 * The Y value of a task.
		 *
		 * @type {number}
		 * @product gantt
		 * @apioption series.gantt.data.y
		 */

		/**
		 * The name of a task. If a `treegrid` y-axis is used (default in Gantt charts),
		 * this will be picked up automatically, and used to calculate the y-value.
		 *
		 * @type {string}
		 * @product gantt
		 * @apioption series.gantt.data.name
		 */

		/**
		 * Progress indicator, how much of the task completed. If it is a number, the
		 * `fill` will be applied automatically.
		 *
		 * @type {object|number}
		 * @default undefined
		 * @extends {series.xrange.data.partialFill}
		 * @product gantt
		 * @sample {gantt} gantt/demo/progress-indicator Progress indicator
		 * @apioption series.gantt.data.completed
		 */

		/**
		 * The amount of the progress indicator, ranging from 0 (not started) to 1
		 * (finished).
		 *
		 * @type {number}
		 * @default 0
		 * @apioption series.gantt.data.completed.amount
		 */

		/**
		 * The fill of the progress indicator. Defaults to a darkened variety of the
		 * main color.
		 *
		 * @type {Highcharts.ColorString}
		 * @default undefined
		 * @apioption series.gantt.data.completed.fill
		 */

		/**
		 * The ID of the point (task) that this point depends on in Gantt charts.
		 * Aliases [connect](series.xrange.data#connect). Can also be an object,
		 * specifying further connecting [options](series.gantt.pathfinder) between the
		 * points.
		 *
		 * @type {string|object}
		 * @extends {series.xrange.data.connect}
		 * @since 6.2.0
		 * @sample  gantt/demo/project-management
		 *          Dependencies
		 * @product gantt
		 * @apioption series.gantt.data.dependency
		 */

		/**
		 * Whether this point is a milestone. If so, only the `start` option is handled,
		 * while `end` is ignored.
		 *
		 * @type {boolean}
		 * @since 6.2.0
		 * @sample  gantt/gantt/milestones
		 *          Milestones
		 * @product gantt
		 * @apioption series.gantt.data.milestone
		 */

		/**
		 * The ID of the parent point (task) of this point in Gantt charts.
		 *
		 * @type {string}
		 * @since 6.2.0
		 * @sample  gantt/demo/subtasks
		 *          Gantt chart with subtasks
		 * @product gantt
		 * @apioption series.gantt.data.parent
		 */

		/**
		 * A `gantt` series.
		 *
		 * @type {Object}
		 * @extends {plotOptions.gantt}
		 * @product gantt
		 * @apioption series.gantt
		 */

	}(Highcharts));
	(function (H) {
		/**
		* (c) 2016 Highsoft AS
		* Authors: Lars A. V. Cabrera
		*
		* License: www.highcharts.com/license
		*/

		var each = H.each,
		    map = H.map,
		    merge = H.merge,
		    splat = H.splat,
		    Chart = H.Chart;

		/**
		 * The GanttChart class.
		 * @class Highcharts.ganttChart
		 * @memberOf Highcharts
		 * @param {String|HTMLDOMElement} renderTo The DOM element to render to, or
		 *                                         its id.
		 * @param {ChartOptions}          options  The chart options structure.
		 * @param {Function}              callback Function to run when the chart has
		 *                                         loaded.
		 */
		H.ganttChart = function (renderTo, options, callback) {
		    var hasRenderToArg = typeof renderTo === 'string' || renderTo.nodeName,
		        seriesOptions = options.series,
		        defaultOptions = H.getOptions(),
		        defaultLinkedTo;
		    options = arguments[hasRenderToArg ? 1 : 0];

		    // If user hasn't defined axes as array, make it into an array and add a
		    // second axis by default.
		    if (!H.isArray(options.xAxis)) {
		        options.xAxis = [options.xAxis || {}, {}];
		    }

		    // apply X axis options to both single and multi x axes
		    options.xAxis = map(options.xAxis, function (xAxisOptions, i) {
		        if (i === 1) { // Second xAxis
		            defaultLinkedTo = 0;
		        }
		        return merge(
		            defaultOptions.xAxis,
		            { // defaults
		                grid: {
		                    enabled: true
		                },
		                opposite: true,
		                linkedTo: defaultLinkedTo
		            },
		            xAxisOptions, // user options
		            { // forced options
		                type: 'datetime'
		            }
		        );
		    });

		    // apply Y axis options to both single and multi y axes
		    options.yAxis = map(splat(options.yAxis || {}), function (yAxisOptions) {
		        return merge(
		            defaultOptions.yAxis, // #3802
		            { // defaults
		                grid: {
		                    enabled: true
		                },

		                staticScale: 50,

		                reversed: true,

		                // Set default type treegrid, but only if 'categories' is
		                // undefined
		                type: yAxisOptions.categories ? yAxisOptions.type : 'treegrid'
		            },
		            yAxisOptions // user options
		        );
		    });

		    options.series = null;

		    options = merge(
		        {
		            chart: {
		                type: 'gantt'
		            },
		            title: {
		                text: null
		            },
		            legend: {
		                enabled: false
		            }
		        },

		        options // user's options
		    );

		    options.series = seriesOptions;

		    each(options.series, function (series) {
		        each(series.data, function (point) {
		            H.seriesTypes.gantt.prototype.setGanttPointAliases(point);
		        });
		    });

		    return hasRenderToArg ?
		        new Chart(renderTo, options, callback) :
		        new Chart(options, options);
		};

	}(Highcharts));
	return (function () {


	}());
}));
