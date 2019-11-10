/**
 * @license Highcharts JS v6.2.0 (2018-10-17)
 * Tree Grid
 *
 * (c) 2016 Jon Arild Nygard
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
	return (function () {


	}());
}));
