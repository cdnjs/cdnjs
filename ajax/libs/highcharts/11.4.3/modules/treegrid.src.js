/**
 * @license Highcharts Gantt JS v11.4.3 (2024-05-22)
 *
 * Tree Grid
 *
 * (c) 2016-2024 Jon Arild Nygard
 *
 * License: www.highcharts.com/license
 */
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
    _registerModule(_modules, 'Core/Axis/BrokenAxis.js', [_modules['Core/Axis/Stacking/StackItem.js'], _modules['Core/Utilities.js']], function (StackItem, U) {
        /* *
         *
         *  (c) 2009-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, find, fireEvent, isArray, isNumber, pick } = U;
        /* *
         *
         *  Composition
         *
         * */
        /**
         * Axis with support of broken data rows.
         * @private
         */
        var BrokenAxis;
        (function (BrokenAxis) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds support for broken axes.
             * @private
             */
            function compose(AxisClass, SeriesClass) {
                if (!AxisClass.keepProps.includes('brokenAxis')) {
                    AxisClass.keepProps.push('brokenAxis');
                    addEvent(AxisClass, 'init', onAxisInit);
                    addEvent(AxisClass, 'afterInit', onAxisAfterInit);
                    addEvent(AxisClass, 'afterSetTickPositions', onAxisAfterSetTickPositions);
                    addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);
                    const seriesProto = SeriesClass.prototype;
                    seriesProto.drawBreaks = seriesDrawBreaks;
                    seriesProto.gappedPath = seriesGappedPath;
                    addEvent(SeriesClass, 'afterGeneratePoints', onSeriesAfterGeneratePoints);
                    addEvent(SeriesClass, 'afterRender', onSeriesAfterRender);
                }
                return AxisClass;
            }
            BrokenAxis.compose = compose;
            /**
             * @private
             */
            function onAxisAfterInit() {
                if (typeof this.brokenAxis !== 'undefined') {
                    this.brokenAxis.setBreaks(this.options.breaks, false);
                }
            }
            /**
             * Force Axis to be not-ordinal when breaks are defined.
             * @private
             */
            function onAxisAfterSetOptions() {
                const axis = this;
                if (axis.brokenAxis?.hasBreaks) {
                    axis.options.ordinal = false;
                }
            }
            /**
             * @private
             */
            function onAxisAfterSetTickPositions() {
                const axis = this, brokenAxis = axis.brokenAxis;
                if (brokenAxis?.hasBreaks) {
                    const tickPositions = axis.tickPositions, info = axis.tickPositions.info, newPositions = [];
                    for (let i = 0; i < tickPositions.length; i++) {
                        if (!brokenAxis.isInAnyBreak(tickPositions[i])) {
                            newPositions.push(tickPositions[i]);
                        }
                    }
                    axis.tickPositions = newPositions;
                    axis.tickPositions.info = info;
                }
            }
            /**
             * @private
             */
            function onAxisInit() {
                const axis = this;
                if (!axis.brokenAxis) {
                    axis.brokenAxis = new Additions(axis);
                }
            }
            /**
             * @private
             */
            function onSeriesAfterGeneratePoints() {
                const { isDirty, options: { connectNulls }, points, xAxis, yAxis } = this;
                // Set, or reset visibility of the points. Axis.setBreaks marks
                // the series as isDirty
                if (isDirty) {
                    let i = points.length;
                    while (i--) {
                        const point = points[i];
                        // Respect nulls inside the break (#4275)
                        const nullGap = point.y === null && connectNulls === false;
                        const isPointInBreak = (!nullGap && (xAxis?.brokenAxis?.isInAnyBreak(point.x, true) ||
                            yAxis?.brokenAxis?.isInAnyBreak(point.y, true)));
                        // Set point.visible if in any break.
                        // If not in break, reset visible to original value.
                        point.visible = isPointInBreak ?
                            false :
                            point.options.visible !== false;
                    }
                }
            }
            /**
             * @private
             */
            function onSeriesAfterRender() {
                this.drawBreaks(this.xAxis, ['x']);
                this.drawBreaks(this.yAxis, pick(this.pointArrayMap, ['y']));
            }
            /**
             * @private
             */
            function seriesDrawBreaks(axis, keys) {
                const series = this, points = series.points;
                let breaks, threshold, y;
                if (axis?.brokenAxis?.hasBreaks) {
                    const brokenAxis = axis.brokenAxis;
                    keys.forEach(function (key) {
                        breaks = brokenAxis?.breakArray || [];
                        threshold = axis.isXAxis ?
                            axis.min :
                            pick(series.options.threshold, axis.min);
                        // Array of breaks that have been "zoomed-out" which means that
                        // they were shown previously, but now after zoom, they are not
                        // (#19885).
                        const breaksOutOfRange = axis?.options?.breaks?.filter(function (brk) {
                            let isOut = true;
                            // Iterate to see if "brk" is in axis range
                            for (let i = 0; i < breaks.length; i++) {
                                const otherBreak = breaks[i];
                                if (otherBreak.from === brk.from &&
                                    otherBreak.to === brk.to) {
                                    isOut = false;
                                    break;
                                }
                            }
                            return isOut;
                        });
                        points.forEach(function (point) {
                            y = pick(point['stack' + key.toUpperCase()], point[key]);
                            breaks.forEach(function (brk) {
                                if (isNumber(threshold) && isNumber(y)) {
                                    let eventName = '';
                                    if ((threshold < brk.from && y > brk.to) ||
                                        (threshold > brk.from && y < brk.from)) {
                                        eventName = 'pointBreak';
                                    }
                                    else if ((threshold < brk.from &&
                                        y > brk.from &&
                                        y < brk.to) || (threshold > brk.from &&
                                        y > brk.to &&
                                        y < brk.from)) {
                                        eventName = 'pointInBreak';
                                    }
                                    if (eventName) {
                                        fireEvent(axis, eventName, { point, brk });
                                    }
                                }
                            });
                            breaksOutOfRange?.forEach(function (brk) {
                                fireEvent(axis, 'pointOutsideOfBreak', { point, brk });
                            });
                        });
                    });
                }
            }
            /**
             * Extend getGraphPath by identifying gaps in the data so that we
             * can draw a gap in the line or area. This was moved from ordinal
             * axis module to broken axis module as of #5045.
             *
             * @private
             * @function Highcharts.Series#gappedPath
             *
             * @return {Highcharts.SVGPathArray}
             * Gapped path
             */
            function seriesGappedPath() {
                const currentDataGrouping = this.currentDataGrouping, groupingSize = currentDataGrouping?.gapSize, points = this.points.slice(), yAxis = this.yAxis;
                let gapSize = this.options.gapSize, i = points.length - 1, stack;
                /**
                 * Defines when to display a gap in the graph, together with the
                 * [gapUnit](plotOptions.series.gapUnit) option.
                 *
                 * In case when `dataGrouping` is enabled, points can be grouped
                 * into a larger time span. This can make the grouped points to
                 * have a greater distance than the absolute value of `gapSize`
                 * property, which will result in disappearing graph completely.
                 * To prevent this situation the mentioned distance between
                 * grouped points is used instead of previously defined
                 * `gapSize`.
                 *
                 * In practice, this option is most often used to visualize gaps
                 * in time series. In a stock chart, intraday data is available
                 * for daytime hours, while gaps will appear in nights and
                 * weekends.
                 *
                 * @see [gapUnit](plotOptions.series.gapUnit)
                 * @see [xAxis.breaks](#xAxis.breaks)
                 *
                 * @sample {highstock} stock/plotoptions/series-gapsize/
                 * Setting the gap size to 2 introduces gaps for weekends in
                 * daily datasets.
                 *
                 * @type      {number}
                 * @default   0
                 * @product   highstock
                 * @requires  modules/broken-axis
                 * @apioption plotOptions.series.gapSize
                 */
                /**
                 * Together with [gapSize](plotOptions.series.gapSize), this
                 * option defines where to draw gaps in the graph.
                 *
                 * When the `gapUnit` is `"relative"` (default), a gap size of 5
                 * means that if the distance between two points is greater than
                 * 5 times that of the two closest points, the graph will be
                 * broken.
                 *
                 * When the `gapUnit` is `"value"`, the gap is based on absolute
                 * axis values, which on a datetime axis is milliseconds. This
                 * also applies to the navigator series that inherits gap
                 * options from the base series.
                 *
                 * @see [gapSize](plotOptions.series.gapSize)
                 *
                 * @type       {string}
                 * @default    relative
                 * @since      5.0.13
                 * @product    highstock
                 * @validvalue ["relative", "value"]
                 * @requires   modules/broken-axis
                 * @apioption  plotOptions.series.gapUnit
                 */
                if (gapSize && i > 0) { // #5008
                    // Gap unit is relative
                    if (this.options.gapUnit !== 'value') {
                        gapSize *= this.basePointRange;
                    }
                    // Setting a new gapSize in case dataGrouping is enabled
                    // (#7686)
                    if (groupingSize &&
                        groupingSize > gapSize &&
                        // Except when DG is forced (e.g. from other series)
                        // and has lower granularity than actual points (#11351)
                        groupingSize >= this.basePointRange) {
                        gapSize = groupingSize;
                    }
                    // Extension for ordinal breaks
                    let current, next;
                    while (i--) {
                        // Reassign next if it is not visible
                        if (!(next && next.visible !== false)) {
                            next = points[i + 1];
                        }
                        current = points[i];
                        // Skip iteration if one of the points is not visible
                        if (next.visible === false || current.visible === false) {
                            continue;
                        }
                        if (next.x - current.x > gapSize) {
                            const xRange = (current.x + next.x) / 2;
                            points.splice(// Insert after this one
                            i + 1, 0, {
                                isNull: true,
                                x: xRange
                            });
                            // For stacked chart generate empty stack items, #6546
                            if (yAxis.stacking && this.options.stacking) {
                                stack = yAxis.stacking.stacks[this.stackKey][xRange] = new StackItem(yAxis, yAxis.options.stackLabels, false, xRange, this.stack);
                                stack.total = 0;
                            }
                        }
                        // Assign current to next for the upcoming iteration
                        next = current;
                    }
                }
                // Call base method
                return this.getGraphPath(points);
            }
            /* *
             *
             *  Class
             *
             * */
            /**
             * Provides support for broken axes.
             * @private
             * @class
             */
            class Additions {
                /* *
                 *
                 *  Static Functions
                 *
                 * */
                /**
                 * @private
                 */
                static isInBreak(brk, val) {
                    const repeat = brk.repeat || Infinity, from = brk.from, length = brk.to - brk.from, test = (val >= from ?
                        (val - from) % repeat :
                        repeat - ((from - val) % repeat));
                    let ret;
                    if (!brk.inclusive) {
                        ret = test < length && test !== 0;
                    }
                    else {
                        ret = test <= length;
                    }
                    return ret;
                }
                /**
                 * @private
                 */
                static lin2Val(val) {
                    const axis = this;
                    const brokenAxis = axis.brokenAxis;
                    const breakArray = brokenAxis && brokenAxis.breakArray;
                    if (!breakArray || !isNumber(val)) {
                        return val;
                    }
                    let nval = val, brk, i;
                    for (i = 0; i < breakArray.length; i++) {
                        brk = breakArray[i];
                        if (brk.from >= nval) {
                            break;
                        }
                        else if (brk.to < nval) {
                            nval += brk.len;
                        }
                        else if (Additions.isInBreak(brk, nval)) {
                            nval += brk.len;
                        }
                    }
                    return nval;
                }
                /**
                 * @private
                 */
                static val2Lin(val) {
                    const axis = this;
                    const brokenAxis = axis.brokenAxis;
                    const breakArray = brokenAxis && brokenAxis.breakArray;
                    if (!breakArray || !isNumber(val)) {
                        return val;
                    }
                    let nval = val, brk, i;
                    for (i = 0; i < breakArray.length; i++) {
                        brk = breakArray[i];
                        if (brk.to <= val) {
                            nval -= brk.len;
                        }
                        else if (brk.from >= val) {
                            break;
                        }
                        else if (Additions.isInBreak(brk, val)) {
                            nval -= (val - brk.from);
                            break;
                        }
                    }
                    return nval;
                }
                /* *
                 *
                 *  Constructors
                 *
                 * */
                constructor(axis) {
                    this.hasBreaks = false;
                    this.axis = axis;
                }
                /* *
                 *
                 *  Functions
                 *
                 * */
                /**
                 * Returns the first break found where the x is larger then break.from
                 * and smaller then break.to.
                 *
                 * @param {number} x
                 * The number which should be within a break.
                 *
                 * @param {Array<Highcharts.XAxisBreaksOptions>} breaks
                 * The array of breaks to search within.
                 *
                 * @return {Highcharts.XAxisBreaksOptions|undefined}
                 * Returns the first break found that matches, returns false if no break
                 * is found.
                 */
                findBreakAt(x, breaks) {
                    return find(breaks, function (b) {
                        return b.from < x && x < b.to;
                    });
                }
                /**
                 * @private
                 */
                isInAnyBreak(val, testKeep) {
                    const brokenAxis = this, axis = brokenAxis.axis, breaks = axis.options.breaks || [];
                    let i = breaks.length, inbrk, keep, ret;
                    if (i && isNumber(val)) {
                        while (i--) {
                            if (Additions.isInBreak(breaks[i], val)) {
                                inbrk = true;
                                if (!keep) {
                                    keep = pick(breaks[i].showPoints, !axis.isXAxis);
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
                /**
                 * Dynamically set or unset breaks in an axis. This function in lighter
                 * than using Axis.update, and it also preserves animation.
                 *
                 * @private
                 * @function Highcharts.Axis#setBreaks
                 *
                 * @param {Array<Highcharts.XAxisBreaksOptions>} [breaks]
                 * The breaks to add. When `undefined` it removes existing breaks.
                 *
                 * @param {boolean} [redraw=true]
                 * Whether to redraw the chart immediately.
                 */
                setBreaks(breaks, redraw) {
                    const brokenAxis = this;
                    const axis = brokenAxis.axis;
                    const hasBreaks = isArray(breaks) &&
                        !!breaks.length &&
                        !!Object.keys(breaks[0]).length; // Check for [{}], #16368.
                    axis.isDirty = brokenAxis.hasBreaks !== hasBreaks;
                    brokenAxis.hasBreaks = hasBreaks;
                    if (breaks !== axis.options.breaks) {
                        axis.options.breaks = axis.userOptions.breaks = breaks;
                    }
                    axis.forceRedraw = true; // Force recalculation in setScale
                    // Recalculate series related to the axis.
                    axis.series.forEach(function (series) {
                        series.isDirty = true;
                    });
                    if (!hasBreaks && axis.val2lin === Additions.val2Lin) {
                        // Revert to prototype functions
                        delete axis.val2lin;
                        delete axis.lin2val;
                    }
                    if (hasBreaks) {
                        axis.userOptions.ordinal = false;
                        axis.lin2val = Additions.lin2Val;
                        axis.val2lin = Additions.val2Lin;
                        axis.setExtremes = function (newMin, newMax, redraw, animation, eventArguments) {
                            // If trying to set extremes inside a break, extend min to
                            // after, and max to before the break ( #3857 )
                            if (brokenAxis.hasBreaks) {
                                const breaks = (this.options.breaks || []);
                                let axisBreak;
                                while ((axisBreak = brokenAxis.findBreakAt(newMin, breaks))) {
                                    newMin = axisBreak.to;
                                }
                                while ((axisBreak = brokenAxis.findBreakAt(newMax, breaks))) {
                                    newMax = axisBreak.from;
                                }
                                // If both min and max is within the same break.
                                if (newMax < newMin) {
                                    newMax = newMin;
                                }
                            }
                            axis.constructor.prototype.setExtremes.call(this, newMin, newMax, redraw, animation, eventArguments);
                        };
                        axis.setAxisTranslation = function () {
                            axis.constructor.prototype.setAxisTranslation.call(this);
                            brokenAxis.unitLength = void 0;
                            if (brokenAxis.hasBreaks) {
                                const breaks = axis.options.breaks || [], 
                                // Temporary one:
                                breakArrayT = [], breakArray = [], pointRangePadding = pick(axis.pointRangePadding, 0);
                                let length = 0, inBrk, repeat, min = axis.userMin || axis.min, max = axis.userMax || axis.max, start, i;
                                // Min & max check (#4247)
                                breaks.forEach(function (brk) {
                                    repeat = brk.repeat || Infinity;
                                    if (isNumber(min) && isNumber(max)) {
                                        if (Additions.isInBreak(brk, min)) {
                                            min += ((brk.to % repeat) -
                                                (min % repeat));
                                        }
                                        if (Additions.isInBreak(brk, max)) {
                                            max -= ((max % repeat) -
                                                (brk.from % repeat));
                                        }
                                    }
                                });
                                // Construct an array holding all breaks in the axis
                                breaks.forEach(function (brk) {
                                    start = brk.from;
                                    repeat = brk.repeat || Infinity;
                                    if (isNumber(min) && isNumber(max)) {
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
                                                value: i + brk.to - brk.from,
                                                move: 'out',
                                                size: brk.breakSize
                                            });
                                        }
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
                                    if (inBrk === 0 && isNumber(start)) {
                                        breakArray.push({
                                            from: start,
                                            to: brk.value,
                                            len: brk.value - start - (brk.size || 0)
                                        });
                                        length += (brk.value -
                                            start -
                                            (brk.size || 0));
                                    }
                                });
                                brokenAxis.breakArray = breakArray;
                                // Used with staticScale, and below the actual axis
                                // length, when breaks are subtracted.
                                if (isNumber(min) &&
                                    isNumber(max) &&
                                    isNumber(axis.min)) {
                                    brokenAxis.unitLength = max - min - length +
                                        pointRangePadding;
                                    fireEvent(axis, 'afterBreaks');
                                    if (axis.staticScale) {
                                        axis.transA = axis.staticScale;
                                    }
                                    else if (brokenAxis.unitLength) {
                                        axis.transA *=
                                            (max - axis.min + pointRangePadding) /
                                                brokenAxis.unitLength;
                                    }
                                    if (pointRangePadding) {
                                        axis.minPixelPadding =
                                            axis.transA * (axis.minPointOffset || 0);
                                    }
                                    axis.min = min;
                                    axis.max = max;
                                }
                            }
                        };
                    }
                    if (pick(redraw, true)) {
                        axis.chart.redraw();
                    }
                }
            }
            BrokenAxis.Additions = Additions;
        })(BrokenAxis || (BrokenAxis = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return BrokenAxis;
    });
    _registerModule(_modules, 'Core/Axis/GridAxis.js', [_modules['Core/Axis/Axis.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Axis, H, U) {
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
        const { dateFormats } = H;
        const { addEvent, defined, erase, find, isArray, isNumber, merge, pick, timeUnits, wrap } = U;
        /* *
         *
         *  Enums
         *
         * */
        /**
         * Enum for which side the axis is on. Maps to axis.side.
         * @private
         */
        var GridAxisSide;
        (function (GridAxisSide) {
            GridAxisSide[GridAxisSide["top"] = 0] = "top";
            GridAxisSide[GridAxisSide["right"] = 1] = "right";
            GridAxisSide[GridAxisSide["bottom"] = 2] = "bottom";
            GridAxisSide[GridAxisSide["left"] = 3] = "left";
        })(GridAxisSide || (GridAxisSide = {}));
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function argsToArray(args) {
            return Array.prototype.slice.call(args, 1);
        }
        /**
         * @private
         */
        function isObject(x) {
            // Always use strict mode
            return U.isObject(x, true);
        }
        /**
         * @private
         */
        function applyGridOptions(axis) {
            const options = axis.options;
            // Center-align by default
            /*
            if (!options.labels) {
                options.labels = {};
            }
            */
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
            // Prevents rotation of labels when squished, as rotating them would not
            // help.
            axis.labelRotation = 0;
            options.labels.rotation = 0;
            // Allow putting ticks closer than their data points.
            options.minTickInterval = 1;
        }
        /**
         * Extends axis class with grid support.
         * @private
         */
        function compose(AxisClass, ChartClass, TickClass) {
            if (!AxisClass.keepProps.includes('grid')) {
                AxisClass.keepProps.push('grid');
                AxisClass.prototype.getMaxLabelDimensions = getMaxLabelDimensions;
                wrap(AxisClass.prototype, 'unsquish', wrapUnsquish);
                wrap(AxisClass.prototype, 'getOffset', wrapGetOffset);
                // Add event handlers
                addEvent(AxisClass, 'init', onInit);
                addEvent(AxisClass, 'afterGetTitlePosition', onAfterGetTitlePosition);
                addEvent(AxisClass, 'afterInit', onAfterInit);
                addEvent(AxisClass, 'afterRender', onAfterRender);
                addEvent(AxisClass, 'afterSetAxisTranslation', onAfterSetAxisTranslation);
                addEvent(AxisClass, 'afterSetOptions', onAfterSetOptions);
                addEvent(AxisClass, 'afterSetOptions', onAfterSetOptions2);
                addEvent(AxisClass, 'afterSetScale', onAfterSetScale);
                addEvent(AxisClass, 'afterTickSize', onAfterTickSize);
                addEvent(AxisClass, 'trimTicks', onTrimTicks);
                addEvent(AxisClass, 'destroy', onDestroy);
                addEvent(ChartClass, 'afterSetChartSize', onChartAfterSetChartSize);
                addEvent(TickClass, 'afterGetLabelPosition', onTickAfterGetLabelPosition);
                addEvent(TickClass, 'labelFormat', onTickLabelFormat);
            }
            return AxisClass;
        }
        /**
         * Get the largest label width and height.
         *
         * @private
         * @function Highcharts.Axis#getMaxLabelDimensions
         *
         * @param {Highcharts.Dictionary<Highcharts.Tick>} ticks
         * All the ticks on one axis.
         *
         * @param {Array<number|string>} tickPositions
         * All the tick positions on one axis.
         *
         * @return {Highcharts.SizeObject}
         * Object containing the properties height and width.
         *
         * @todo Move this to the generic axis implementation, as it is used there.
         */
        function getMaxLabelDimensions(ticks, tickPositions) {
            const dimensions = {
                width: 0,
                height: 0
            };
            tickPositions.forEach(function (pos) {
                const tick = ticks[pos];
                let labelHeight = 0, labelWidth = 0, label;
                if (isObject(tick)) {
                    label = isObject(tick.label) ? tick.label : {};
                    // Find width and height of label
                    labelHeight = label.getBBox ? label.getBBox().height : 0;
                    if (label.textStr && !isNumber(label.textPxLength)) {
                        label.textPxLength = label.getBBox().width;
                    }
                    labelWidth = isNumber(label.textPxLength) ?
                        // Math.round ensures crisp lines
                        Math.round(label.textPxLength) :
                        0;
                    if (label.textStr) {
                        // Set the tickWidth same as the label width after ellipsis
                        // applied #10281
                        labelWidth = Math.round(label.getBBox().width);
                    }
                    // Update the result if width and/or height are larger
                    dimensions.height = Math.max(labelHeight, dimensions.height);
                    dimensions.width = Math.max(labelWidth, dimensions.width);
                }
            });
            // For tree grid, add indentation
            if (this.options.type === 'treegrid' &&
                this.treeGrid &&
                this.treeGrid.mapOfPosToGridNode) {
                const treeDepth = this.treeGrid.mapOfPosToGridNode[-1].height || 0;
                dimensions.width += (this.options.labels.indentation *
                    (treeDepth - 1));
            }
            return dimensions;
        }
        /**
         * Handle columns and getOffset.
         * @private
         */
        function wrapGetOffset(proceed) {
            const { grid } = this, 
            // On the left side we handle the columns first because the offset is
            // calculated from the plot area and out
            columnsFirst = this.side === 3;
            if (!columnsFirst) {
                proceed.apply(this);
            }
            if (!grid?.isColumn) {
                let columns = grid?.columns || [];
                if (columnsFirst) {
                    columns = columns.slice().reverse();
                }
                columns
                    .forEach((column) => {
                    column.getOffset();
                });
            }
            if (columnsFirst) {
                proceed.apply(this);
            }
        }
        /**
         * @private
         */
        function onAfterGetTitlePosition(e) {
            const axis = this;
            const options = axis.options;
            const gridOptions = options.grid || {};
            if (gridOptions.enabled === true) {
                // Compute anchor points for each of the title align options
                const { axisTitle, height: axisHeight, horiz, left: axisLeft, offset, opposite, options, top: axisTop, width: axisWidth } = axis;
                const tickSize = axis.tickSize();
                const titleWidth = axisTitle && axisTitle.getBBox().width;
                const xOption = options.title.x;
                const yOption = options.title.y;
                const titleMargin = pick(options.title.margin, horiz ? 5 : 10);
                const titleFontSize = axisTitle ? axis.chart.renderer.fontMetrics(axisTitle).f : 0;
                const crispCorr = tickSize ? tickSize[0] / 2 : 0;
                // TODO account for alignment
                // the position in the perpendicular direction of the axis
                const offAxis = ((horiz ? axisTop + axisHeight : axisLeft) +
                    (horiz ? 1 : -1) * // Horizontal axis reverses the margin
                        (opposite ? -1 : 1) * // So does opposite axes
                        crispCorr +
                    (axis.side === GridAxisSide.bottom ? titleFontSize : 0));
                e.titlePosition.x = horiz ?
                    axisLeft - (titleWidth || 0) / 2 - titleMargin + xOption :
                    offAxis + (opposite ? axisWidth : 0) + offset + xOption;
                e.titlePosition.y = horiz ?
                    (offAxis -
                        (opposite ? axisHeight : 0) +
                        (opposite ? titleFontSize : -titleFontSize) / 2 +
                        offset +
                        yOption) :
                    axisTop - titleMargin + yOption;
            }
        }
        /**
         * @private
         */
        function onAfterInit() {
            const axis = this;
            const { chart, options: { grid: gridOptions = {} }, userOptions } = axis;
            if (gridOptions.enabled) {
                applyGridOptions(axis);
            }
            if (gridOptions.columns) {
                const columns = axis.grid.columns = [];
                let columnIndex = axis.grid.columnIndex = 0;
                // Handle columns, each column is a grid axis
                while (++columnIndex < gridOptions.columns.length) {
                    const columnOptions = merge(userOptions, gridOptions.columns[columnIndex], {
                        isInternal: true,
                        linkedTo: 0,
                        // Disable by default the scrollbar on the grid axis
                        scrollbar: {
                            enabled: false
                        }
                    }, 
                    // Avoid recursion
                    {
                        grid: {
                            columns: void 0
                        }
                    });
                    const column = new Axis(axis.chart, columnOptions, 'yAxis');
                    column.grid.isColumn = true;
                    column.grid.columnIndex = columnIndex;
                    // Remove column axis from chart axes array, and place it
                    // in the columns array.
                    erase(chart.axes, column);
                    erase(chart[axis.coll] || [], column);
                    columns.push(column);
                }
            }
        }
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
         * @private
         */
        function onAfterRender() {
            const axis = this, { axisTitle, grid, options } = axis, gridOptions = options.grid || {};
            if (gridOptions.enabled === true) {
                const min = axis.min || 0, max = axis.max || 0, firstTick = axis.ticks[axis.tickPositions[0]];
                // Adjust the title max width to the column width (#19657)
                if (axisTitle &&
                    !axis.chart.styledMode &&
                    firstTick?.slotWidth &&
                    !axis.options.title.style.width) {
                    axisTitle.css({ width: `${firstTick.slotWidth}px` });
                }
                // @todo actual label padding (top, bottom, left, right)
                axis.maxLabelDimensions = axis.getMaxLabelDimensions(axis.ticks, axis.tickPositions);
                // Remove right wall before rendering if updating
                if (axis.rightWall) {
                    axis.rightWall.destroy();
                }
                /*
                Draw an extra axis line on outer axes
                            >
                Make this:    |______|______|______|___

                            > _________________________
                Into this:    |______|______|______|__|
                                                        */
                if (axis.grid && axis.grid.isOuterAxis() && axis.axisLine) {
                    const lineWidth = options.lineWidth;
                    if (lineWidth) {
                        const linePath = axis.getLinePath(lineWidth), startPoint = linePath[0], endPoint = linePath[1], 
                        // Negate distance if top or left axis
                        // Subtract 1px to draw the line at the end of the tick
                        tickLength = (axis.tickSize('tick') || [1])[0], distance = tickLength * ((axis.side === GridAxisSide.top ||
                            axis.side === GridAxisSide.left) ? -1 : 1);
                        // If axis is horizontal, reposition line path vertically
                        if (startPoint[0] === 'M' && endPoint[0] === 'L') {
                            if (axis.horiz) {
                                startPoint[2] += distance;
                                endPoint[2] += distance;
                            }
                            else {
                                startPoint[1] += distance;
                                endPoint[1] += distance;
                            }
                        }
                        // If it doesn't exist, add an upper and lower border
                        // for the vertical grid axis.
                        if (!axis.horiz && axis.chart.marginRight) {
                            const upperBorderStartPoint = startPoint, upperBorderEndPoint = [
                                'L',
                                axis.left,
                                startPoint[2] || 0
                            ], upperBorderPath = [
                                upperBorderStartPoint,
                                upperBorderEndPoint
                            ], lowerBorderEndPoint = [
                                'L',
                                axis.chart.chartWidth - axis.chart.marginRight,
                                axis.toPixels(max + axis.tickmarkOffset)
                            ], lowerBorderStartPoint = [
                                'M',
                                endPoint[1] || 0,
                                axis.toPixels(max + axis.tickmarkOffset)
                            ], lowerBorderPath = [
                                lowerBorderStartPoint,
                                lowerBorderEndPoint
                            ];
                            if (!axis.grid.upperBorder && min % 1 !== 0) {
                                axis.grid.upperBorder = axis.grid.renderBorder(upperBorderPath);
                            }
                            if (axis.grid.upperBorder) {
                                axis.grid.upperBorder.attr({
                                    stroke: options.lineColor,
                                    'stroke-width': options.lineWidth
                                });
                                axis.grid.upperBorder.animate({
                                    d: upperBorderPath
                                });
                            }
                            if (!axis.grid.lowerBorder && max % 1 !== 0) {
                                axis.grid.lowerBorder = axis.grid.renderBorder(lowerBorderPath);
                            }
                            if (axis.grid.lowerBorder) {
                                axis.grid.lowerBorder.attr({
                                    stroke: options.lineColor,
                                    'stroke-width': options.lineWidth
                                });
                                axis.grid.lowerBorder.animate({
                                    d: lowerBorderPath
                                });
                            }
                        }
                        // Render an extra line parallel to the existing axes, to
                        // close the grid.
                        if (!axis.grid.axisLineExtra) {
                            axis.grid.axisLineExtra = axis.grid.renderBorder(linePath);
                        }
                        else {
                            axis.grid.axisLineExtra.attr({
                                stroke: options.lineColor,
                                'stroke-width': options.lineWidth
                            });
                            axis.grid.axisLineExtra.animate({
                                d: linePath
                            });
                        }
                        // Show or hide the line depending on options.showEmpty
                        axis.axisLine[axis.showAxis ? 'show' : 'hide']();
                    }
                }
                (grid && grid.columns || []).forEach((column) => column.render());
                // Manipulate the tick mark visibility
                // based on the axis.max- allows smooth scrolling.
                if (!axis.horiz &&
                    axis.chart.hasRendered &&
                    (axis.scrollbar ||
                        (axis.linkedParent && axis.linkedParent.scrollbar)) &&
                    axis.tickPositions.length) {
                    const tickmarkOffset = axis.tickmarkOffset, lastTick = axis.tickPositions[axis.tickPositions.length - 1], firstTick = axis.tickPositions[0];
                    let label, tickMark;
                    while ((label = axis.hiddenLabels.pop()) && label.element) {
                        label.show(); // #15453
                    }
                    while ((tickMark = axis.hiddenMarks.pop()) &&
                        tickMark.element) {
                        tickMark.show(); // #16439
                    }
                    // Hide/show first tick label.
                    label = axis.ticks[firstTick].label;
                    if (label) {
                        if (min - firstTick > tickmarkOffset) {
                            axis.hiddenLabels.push(label.hide());
                        }
                        else {
                            label.show();
                        }
                    }
                    // Hide/show last tick mark/label.
                    label = axis.ticks[lastTick].label;
                    if (label) {
                        if (lastTick - max > tickmarkOffset) {
                            axis.hiddenLabels.push(label.hide());
                        }
                        else {
                            label.show();
                        }
                    }
                    const mark = axis.ticks[lastTick].mark;
                    if (mark &&
                        lastTick - max < tickmarkOffset &&
                        lastTick - max > 0 && axis.ticks[lastTick].isLast) {
                        axis.hiddenMarks.push(mark.hide());
                    }
                }
            }
        }
        /**
         * @private
         */
        function onAfterSetAxisTranslation() {
            const axis = this;
            const tickInfo = axis.tickPositions && axis.tickPositions.info;
            const options = axis.options;
            const gridOptions = options.grid || {};
            const userLabels = axis.userOptions.labels || {};
            // Fire this only for the Gantt type chart, #14868.
            if (gridOptions.enabled) {
                if (axis.horiz) {
                    axis.series.forEach((series) => {
                        series.options.pointRange = 0;
                    });
                    // Lower level time ticks, like hours or minutes, represent
                    // points in time and not ranges. These should be aligned
                    // left in the grid cell by default. The same applies to
                    // years of higher order.
                    if (tickInfo &&
                        options.dateTimeLabelFormats &&
                        options.labels &&
                        !defined(userLabels.align) &&
                        (options.dateTimeLabelFormats[tickInfo.unitName]
                            .range === false ||
                            tickInfo.count > 1 // Years
                        )) {
                        options.labels.align = 'left';
                        if (!defined(userLabels.x)) {
                            options.labels.x = 3;
                        }
                    }
                }
                else {
                    // Don't trim ticks which not in min/max range but
                    // they are still in the min/max plus tickInterval.
                    if (this.options.type !== 'treegrid' &&
                        axis.grid &&
                        axis.grid.columns) {
                        this.minPointOffset = this.tickInterval;
                    }
                }
            }
        }
        /**
         * Creates a left and right wall on horizontal axes:
         * - Places leftmost tick at the start of the axis, to create a left
         *   wall
         * - Ensures that the rightmost tick is at the end of the axis, to
         *   create a right wall.
         * @private
         */
        function onAfterSetOptions(e) {
            const options = this.options, userOptions = e.userOptions, gridOptions = ((options && isObject(options.grid)) ? options.grid : {});
            let gridAxisOptions;
            if (gridOptions.enabled === true) {
                // Merge the user options into default grid axis options so
                // that when a user option is set, it takes precedence.
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
                            fontSize: '0.9em'
                        }
                    },
                    margin: 0,
                    title: {
                        text: null,
                        reserveSpace: false,
                        rotation: 0,
                        style: {
                            textOverflow: 'ellipsis'
                        }
                    },
                    // In a grid axis, only allow one unit of certain types,
                    // for example we shouldn't have one grid cell spanning
                    // two days.
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
                    // For linked axes, tickPixelInterval is used only if
                    // the tickPositioner below doesn't run or returns
                    // undefined (like multiple years)
                    if (defined(userOptions.linkedTo) &&
                        !defined(userOptions.tickPixelInterval)) {
                        gridAxisOptions.tickPixelInterval = 350;
                    }
                    // For the secondary grid axis, use the primary axis'
                    // tick intervals and return ticks one level higher.
                    if (
                    // Check for tick pixel interval in options
                    !defined(userOptions.tickPixelInterval) &&
                        // Only for linked axes
                        defined(userOptions.linkedTo) &&
                        !defined(userOptions.tickPositioner) &&
                        !defined(userOptions.tickInterval) &&
                        !defined(userOptions.units)) {
                        gridAxisOptions.tickPositioner = function (min, max) {
                            const parentInfo = (this.linkedParent &&
                                this.linkedParent.tickPositions &&
                                this.linkedParent.tickPositions.info);
                            if (parentInfo) {
                                const units = (gridAxisOptions.units || []);
                                let unitIdx, count = 1, unitName = 'year';
                                for (let i = 0; i < units.length; i++) {
                                    const unit = units[i];
                                    if (unit && unit[0] === parentInfo.unitName) {
                                        unitIdx = i;
                                        break;
                                    }
                                }
                                // Get the first allowed count on the next unit.
                                const unit = (isNumber(unitIdx) && units[unitIdx + 1]);
                                if (unit) {
                                    unitName = unit[0] || 'year';
                                    const counts = unit[1];
                                    count = counts && counts[0] || 1;
                                    // In case the base X axis shows years, make the
                                    // secondary axis show ten times the years (#11427)
                                }
                                else if (parentInfo.unitName === 'year') {
                                    // `unitName` is 'year'
                                    count = parentInfo.count * 10;
                                }
                                const unitRange = timeUnits[unitName];
                                this.tickInterval = unitRange * count;
                                return this.chart.time.getTimeTicks({ unitRange, count, unitName }, min, max, this.options.startOfWeek);
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
                // If borderWidth is set, then use its value for tick and
                // line width.
                if (isNumber(options.grid.borderWidth)) {
                    options.tickWidth = options.lineWidth =
                        gridOptions.borderWidth;
                }
            }
        }
        /**
         * @private
         */
        function onAfterSetOptions2(e) {
            const axis = this;
            const userOptions = e.userOptions;
            const gridOptions = userOptions && userOptions.grid || {};
            const columns = gridOptions.columns;
            // Add column options to the parent axis. Children has their column options
            // set on init in onGridAxisAfterInit.
            if (gridOptions.enabled && columns) {
                merge(true, axis.options, columns[0]);
            }
        }
        /**
         * Handle columns and setScale.
         * @private
         */
        function onAfterSetScale() {
            const axis = this;
            (axis.grid.columns || []).forEach((column) => column.setScale());
        }
        /**
         * Draw vertical axis ticks extra long to create cell floors and roofs.
         * Overrides the tickLength for vertical axes.
         * @private
         */
        function onAfterTickSize(e) {
            const { horiz, maxLabelDimensions, options: { grid: gridOptions = {} } } = this;
            if (gridOptions.enabled && maxLabelDimensions) {
                const labelPadding = this.options.labels.distance * 2;
                const distance = horiz ?
                    (gridOptions.cellHeight ||
                        labelPadding + maxLabelDimensions.height) :
                    labelPadding + maxLabelDimensions.width;
                if (isArray(e.tickSize)) {
                    e.tickSize[0] = distance;
                }
                else {
                    e.tickSize = [distance, 0];
                }
            }
        }
        /**
         * @private
         */
        function onChartAfterSetChartSize() {
            this.axes.forEach((axis) => {
                (axis.grid && axis.grid.columns || []).forEach((column) => {
                    column.setAxisSize();
                    column.setAxisTranslation();
                });
            });
        }
        /**
         * @private
         */
        function onDestroy(e) {
            const { grid } = this;
            (grid.columns || []).forEach((column) => column.destroy(e.keepEvents));
            grid.columns = void 0;
        }
        /**
         * Wraps axis init to draw cell walls on vertical axes.
         * @private
         */
        function onInit(e) {
            const axis = this;
            const userOptions = e.userOptions || {};
            const gridOptions = userOptions.grid || {};
            if (gridOptions.enabled && defined(gridOptions.borderColor)) {
                userOptions.tickColor = userOptions.lineColor = (gridOptions.borderColor);
            }
            if (!axis.grid) {
                axis.grid = new GridAxisAdditions(axis);
            }
            axis.hiddenLabels = [];
            axis.hiddenMarks = [];
        }
        /**
         * Center tick labels in cells.
         * @private
         */
        function onTickAfterGetLabelPosition(e) {
            const tick = this, label = tick.label, axis = tick.axis, reversed = axis.reversed, chart = axis.chart, options = axis.options, gridOptions = options.grid || {}, labelOpts = axis.options.labels, align = labelOpts.align, 
            // `verticalAlign` is currently not supported for axis.labels.
            verticalAlign = 'middle', // LabelOpts.verticalAlign,
            side = GridAxisSide[axis.side], tickmarkOffset = e.tickmarkOffset, tickPositions = axis.tickPositions, tickPos = tick.pos - tickmarkOffset, nextTickPos = (isNumber(tickPositions[e.index + 1]) ?
                tickPositions[e.index + 1] - tickmarkOffset :
                (axis.max || 0) + tickmarkOffset), tickSize = axis.tickSize('tick'), tickWidth = tickSize ? tickSize[0] : 0, crispCorr = tickSize ? tickSize[1] / 2 : 0;
            // Only center tick labels in grid axes
            if (gridOptions.enabled === true) {
                let bottom, top, left, right;
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
                    bottom = axis.top + axis.len - (axis.translate(reversed ? nextTickPos : tickPos) || 0);
                    top = axis.top + axis.len - (axis.translate(reversed ? tickPos : nextTickPos) || 0);
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
                    left = Math.round(axis.left + (axis.translate(reversed ? nextTickPos : tickPos) || 0)) - crispCorr;
                    right = Math.min(// #15742
                    Math.round(axis.left + (axis.translate(reversed ? tickPos : nextTickPos) || 0)) - crispCorr, axis.left + axis.len);
                }
                tick.slotWidth = right - left;
                // Calculate the positioning of the label based on
                // alignment.
                e.pos.x = (align === 'left' ?
                    left :
                    align === 'right' ?
                        right :
                        left + ((right - left) / 2) // Default to center
                );
                e.pos.y = (verticalAlign === 'top' ?
                    top :
                    verticalAlign === 'bottom' ?
                        bottom :
                        top + ((bottom - top) / 2) // Default to middle
                );
                if (label) {
                    const lblMetrics = chart.renderer.fontMetrics(label), labelHeight = label.getBBox().height;
                    // Adjustment to y position to align the label correctly.
                    // Would be better to have a setter or similar for this.
                    if (!labelOpts.useHTML) {
                        const lines = Math.round(labelHeight / lblMetrics.h);
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
                }
                e.pos.x += (axis.horiz && labelOpts.x) || 0;
            }
        }
        /**
         * @private
         */
        function onTickLabelFormat(ctx) {
            const { axis, value } = ctx;
            if (axis.options.grid &&
                axis.options.grid.enabled) {
                const tickPos = axis.tickPositions;
                const series = (axis.linkedParent || axis).series[0];
                const isFirst = value === tickPos[0];
                const isLast = value === tickPos[tickPos.length - 1];
                const point = series && find(series.options.data, function (p) {
                    return p[axis.isXAxis ? 'x' : 'y'] === value;
                });
                let pointCopy;
                if (point && series.is('gantt')) {
                    // For the Gantt set point aliases to the pointCopy
                    // to do not change the original point
                    pointCopy = merge(point);
                    H.seriesTypes.gantt.prototype.pointClass
                        .setGanttPointAliases(pointCopy);
                }
                // Make additional properties available for the
                // formatter
                ctx.isFirst = isFirst;
                ctx.isLast = isLast;
                ctx.point = pointCopy;
            }
        }
        /**
         * Makes tick labels which are usually ignored in a linked axis
         * displayed if they are within range of linkedParent.min.
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
         * @private
         * @todo Does this function do what the drawing says? Seems to affect
         *       ticks and not the labels directly?
         */
        function onTrimTicks() {
            const axis = this, options = axis.options, gridOptions = options.grid || {}, categoryAxis = axis.categories, tickPositions = axis.tickPositions, firstPos = tickPositions[0], secondPos = tickPositions[1], lastPos = tickPositions[tickPositions.length - 1], beforeLastPos = tickPositions[tickPositions.length - 2], linkedMin = axis.linkedParent && axis.linkedParent.min, linkedMax = axis.linkedParent && axis.linkedParent.max, min = linkedMin || axis.min, max = linkedMax || axis.max, tickInterval = axis.tickInterval, startLessThanMin = ( // #19845
            isNumber(min) &&
                min >= firstPos + tickInterval &&
                min < secondPos), endMoreThanMin = (isNumber(min) &&
                firstPos < min &&
                firstPos + tickInterval > min), startLessThanMax = (isNumber(max) &&
                lastPos > max &&
                lastPos - tickInterval < max), endMoreThanMax = (isNumber(max) &&
                max <= lastPos - tickInterval &&
                max > beforeLastPos);
            if (gridOptions.enabled === true &&
                !categoryAxis &&
                (axis.isXAxis || axis.isLinked)) {
                if ((endMoreThanMin || startLessThanMin) && !options.startOnTick) {
                    tickPositions[0] = min;
                }
                if ((startLessThanMax || endMoreThanMax) && !options.endOnTick) {
                    tickPositions[tickPositions.length - 1] = max;
                }
            }
        }
        /**
         * Avoid altering tickInterval when reserving space.
         * @private
         */
        function wrapUnsquish(proceed) {
            const axis = this;
            const { options: { grid: gridOptions = {} } } = axis;
            if (gridOptions.enabled === true && axis.categories) {
                return axis.tickInterval;
            }
            return proceed.apply(axis, argsToArray(arguments));
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * Additions for grid axes.
         * @private
         * @class
         */
        class GridAxisAdditions {
            /* *
            *
            *  Constructors
            *
            * */
            constructor(axis) {
                this.axis = axis;
            }
            /* *
            *
            *  Functions
            *
            * */
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
             *
             * @return {boolean}
             * True if the axis is the outermost axis in its dimension; false if
             * not.
             */
            isOuterAxis() {
                const axis = this.axis;
                const chart = axis.chart;
                const columnIndex = axis.grid.columnIndex;
                const columns = (axis.linkedParent?.grid.columns ||
                    axis.grid.columns ||
                    []);
                const parentAxis = columnIndex ? axis.linkedParent : axis;
                let thisIndex = -1, lastIndex = 0;
                // On the left side, when we have columns (not only multiple axes), the
                // main axis is to the left
                if (axis.side === 3 && !chart.inverted && columns.length) {
                    return !axis.linkedParent;
                }
                (chart[axis.coll] || []).forEach((otherAxis, index) => {
                    if (otherAxis.side === axis.side &&
                        !otherAxis.options.isInternal) {
                        lastIndex = index;
                        if (otherAxis === parentAxis) {
                            // Get the index of the axis in question
                            thisIndex = index;
                        }
                    }
                });
                return (lastIndex === thisIndex &&
                    (isNumber(columnIndex) ?
                        columns.length === columnIndex :
                        true));
            }
            /**
             * Add extra border based on the provided path.
             * @private
             * @param {SVGPath} path
             * The path of the border.
             * @return {Highcharts.SVGElement}
             * Border
             */
            renderBorder(path) {
                const axis = this.axis, renderer = axis.chart.renderer, options = axis.options, extraBorderLine = renderer.path(path)
                    .addClass('highcharts-axis-line')
                    .add(axis.axisGroup);
                if (!renderer.styledMode) {
                    extraBorderLine.attr({
                        stroke: options.lineColor,
                        'stroke-width': options.lineWidth,
                        zIndex: 7
                    });
                }
                return extraBorderLine;
            }
        }
        /* *
         *
         *  Registry
         *
         * */
        // First letter of the day of the week, e.g. 'M' for 'Monday'.
        dateFormats.E = function (timestamp) {
            return this.dateFormat('%a', timestamp, true).charAt(0);
        };
        // Adds week date format
        dateFormats.W = function (timestamp) {
            const time = this, d = new this.Date(timestamp), unitsToOmit = ['Hours', 'Milliseconds', 'Minutes', 'Seconds'];
            unitsToOmit.forEach(function (format) {
                time.set(format, d, 0);
            });
            const firstDay = (this.get('Day', d) + 6) % 7;
            const thursday = new this.Date(d.valueOf());
            this.set('Date', thursday, this.get('Date', d) - firstDay + 3);
            const firstThursday = new this.Date(this.get('FullYear', thursday), 0, 1);
            if (this.get('Day', firstThursday) !== 4) {
                this.set('Month', d, 0);
                this.set('Date', d, 1 + (11 - this.get('Day', firstThursday)) % 7);
            }
            return (1 +
                Math.floor((thursday.valueOf() - firstThursday.valueOf()) / 604800000)).toString();
        };
        /* *
         *
         *  Default Export
         *
         * */
        const GridAxis = {
            compose
        };
        /* *
         *
         *  API Options
         *
         * */
        /**
         * @productdesc {gantt}
         * For grid axes (like in Gantt charts),
         * it is possible to declare as a list to provide different
         * formats depending on available space.
         *
         * Defaults to:
         * ```js
         * {
         *     hour: { list: ['%H:%M', '%H'] },
         *     day: { list: ['%A, %e. %B', '%a, %e. %b', '%E'] },
         *     week: { list: ['Week %W', 'W%W'] },
         *     month: { list: ['%B', '%b', '%o'] }
         * }
         * ```
         *
         * @sample {gantt} gantt/grid-axis/date-time-label-formats
         *         Gantt chart with custom axis date format.
         *
         * @apioption xAxis.dateTimeLabelFormats
         */
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
         * @sample gantt/demo/treegrid-columns
         *         Collapsible tree grid with columns
         *
         * @type      {Array<Highcharts.XAxisOptions>}
         * @apioption xAxis.grid.columns
         */
        /**
         * Set border color for the label grid lines.
         *
         * @type      {Highcharts.ColorString}
         * @default   #e6e6e6
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
         * size. This option only applies to horizontal axes. For vertical axes, check
         * the [#yAxis.staticScale](yAxis.staticScale) option.
         *
         * @sample gantt/grid-axis/cellheight
         *         Gant chart with custom cell height
         * @type      {number}
         * @apioption xAxis.grid.cellHeight
         */
        ''; // Keeps doclets above in JS file

        return GridAxis;
    });
    _registerModule(_modules, 'Gantt/Tree.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2016-2024 Highsoft AS
         *
         *  Authors: Jon Arild Nygard
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        const { extend, isNumber, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Creates an object map from parent id to children's index.
         *
         * @private
         * @function Highcharts.Tree#getListOfParents
         *
         * @param {Array<*>} data
         *        List of points set in options. `Array.parent` is parent id of point.
         *
         * @return {Highcharts.Dictionary<Array<*>>}
         * Map from parent id to children index in data
         */
        function getListOfParents(data) {
            const root = '', ids = [], listOfParents = data.reduce((prev, curr) => {
                const { parent = '', id } = curr;
                if (typeof prev[parent] === 'undefined') {
                    prev[parent] = [];
                }
                prev[parent].push(curr);
                if (id) {
                    ids.push(id);
                }
                return prev;
            }, {});
            Object.keys(listOfParents).forEach((node) => {
                if ((node !== root) && (ids.indexOf(node) === -1)) {
                    const adoptedByRoot = listOfParents[node].map(function (orphan) {
                        const { ...parentExcluded } = orphan; // #15196
                        return parentExcluded;
                    });
                    listOfParents[root].push(...adoptedByRoot);
                    delete listOfParents[node];
                }
            });
            return listOfParents;
        }
        /** @private */
        function getNode(id, parent, level, data, mapOfIdToChildren, options) {
            const after = options && options.after, before = options && options.before, node = {
                data,
                depth: level - 1,
                id,
                level,
                parent: (parent || '')
            };
            let descendants = 0, height = 0, start, end;
            // Allow custom logic before the children has been created.
            if (typeof before === 'function') {
                before(node, options);
            }
            // Call getNode recursively on the children. Calculate the height of the
            // node, and the number of descendants.
            const children = ((mapOfIdToChildren[id] || [])).map((child) => {
                const node = getNode(child.id, id, (level + 1), child, mapOfIdToChildren, options), childStart = child.start || NaN, childEnd = (child.milestone === true ?
                    childStart :
                    child.end ||
                        NaN);
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
            if (typeof after === 'function') {
                after(node, options);
            }
            return node;
        }
        /** @private */
        function getTree(data, options) {
            return getNode('', null, 1, null, getListOfParents(data), options);
        }
        /* *
         *
         *  Default Export
         *
         * */
        const Tree = {
            getNode,
            getTree
        };

        return Tree;
    });
    _registerModule(_modules, 'Core/Axis/TreeGrid/TreeGridTick.js', [_modules['Core/Utilities.js']], function (U) {
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
        const { addEvent, removeEvent, isObject, isNumber, pick, wrap } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function onTickInit() {
            const tick = this;
            if (!tick.treeGrid) {
                tick.treeGrid = new TreeGridTickAdditions(tick);
            }
        }
        /**
         * @private
         */
        function onTickHover(label) {
            label.addClass('highcharts-treegrid-node-active');
            if (!label.renderer.styledMode) {
                label.css({
                    textDecoration: 'underline'
                });
            }
        }
        /**
         * @private
         */
        function onTickHoverExit(label, options) {
            const css = isObject(options.style) ? options.style : {};
            label.removeClass('highcharts-treegrid-node-active');
            if (!label.renderer.styledMode) {
                label.css({ textDecoration: (css.textDecoration || 'none') });
            }
        }
        /**
         * @private
         */
        function renderLabelIcon(tick, params) {
            const treeGrid = tick.treeGrid, isNew = !treeGrid.labelIcon, renderer = params.renderer, labelBox = params.xy, options = params.options, width = options.width || 0, height = options.height || 0, padding = options.padding ?? tick.axis.linkedParent ? 0 : 5, iconCenter = {
                x: labelBox.x - (width / 2) - padding,
                y: labelBox.y - (height / 2)
            }, rotation = params.collapsed ? 90 : 180, shouldRender = params.show && isNumber(iconCenter.y);
            let icon = treeGrid.labelIcon;
            if (!icon) {
                treeGrid.labelIcon = icon = renderer
                    .path(renderer.symbols[options.type](options.x || 0, options.y || 0, width, height))
                    .addClass('highcharts-label-icon')
                    .add(params.group);
            }
            // Set the new position, and show or hide
            icon[shouldRender ? 'show' : 'hide'](); // #14904, #1338
            // Presentational attributes
            if (!renderer.styledMode) {
                icon
                    .attr({
                    cursor: 'pointer',
                    'fill': pick(params.color, "#666666" /* Palette.neutralColor60 */),
                    'stroke-width': 1,
                    stroke: options.lineColor,
                    strokeWidth: options.lineWidth || 0
                });
            }
            // Update the icon positions
            icon[isNew ? 'attr' : 'animate']({
                translateX: iconCenter.x,
                translateY: iconCenter.y,
                rotation: rotation
            });
        }
        /**
         * @private
         */
        function wrapGetLabelPosition(proceed, x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
            const tick = this, lbOptions = pick(tick.options && tick.options.labels, labelOptions), pos = tick.pos, axis = tick.axis, options = axis.options, isTreeGrid = options.type === 'treegrid', result = proceed.apply(tick, [x, y, label, horiz, lbOptions, tickmarkOffset, index, step]);
            let mapOfPosToGridNode, node, level;
            if (isTreeGrid) {
                const { width = 0, padding = axis.linkedParent ? 0 : 5 } = (lbOptions && isObject(lbOptions.symbol, true) ?
                    lbOptions.symbol :
                    {}), indentation = (lbOptions && isNumber(lbOptions.indentation) ?
                    lbOptions.indentation :
                    0);
                mapOfPosToGridNode = axis.treeGrid.mapOfPosToGridNode;
                node = mapOfPosToGridNode && mapOfPosToGridNode[pos];
                level = (node && node.depth) || 1;
                result.x += (
                // Add space for symbols
                (width + (padding * 2)) +
                    // Apply indentation
                    ((level - 1) * indentation));
            }
            return result;
        }
        /**
         * @private
         */
        function wrapRenderLabel(proceed) {
            const tick = this, { pos, axis, label, treeGrid: tickGrid, options: tickOptions } = tick, icon = tickGrid?.labelIcon, labelElement = label?.element, { treeGrid: axisGrid, options: axisOptions, chart, tickPositions } = axis, mapOfPosToGridNode = axisGrid.mapOfPosToGridNode, labelOptions = pick(tickOptions?.labels, axisOptions?.labels), symbolOptions = (labelOptions && isObject(labelOptions.symbol, true) ?
                labelOptions.symbol :
                {}), node = mapOfPosToGridNode && mapOfPosToGridNode[pos], { descendants, depth } = node || {}, hasDescendants = node && descendants && descendants > 0, level = depth, isTreeGridElement = (axisOptions.type === 'treegrid') && labelElement, shouldRender = tickPositions.indexOf(pos) > -1, prefixClassName = 'highcharts-treegrid-node-', prefixLevelClass = prefixClassName + 'level-', styledMode = chart.styledMode;
            let collapsed, addClassName, removeClassName;
            if (isTreeGridElement && node) {
                // Add class name for hierarchical styling.
                label
                    .removeClass(new RegExp(prefixLevelClass + '.*'))
                    .addClass(prefixLevelClass + level);
            }
            proceed.apply(tick, Array.prototype.slice.call(arguments, 1));
            if (isTreeGridElement && hasDescendants) {
                collapsed = axisGrid.isCollapsed(node);
                renderLabelIcon(tick, {
                    color: (!styledMode &&
                        label.styles.color ||
                        ''),
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
                [label, icon].forEach((object) => {
                    if (object && !object.attachedTreeGridEvents) {
                        // On hover
                        addEvent(object.element, 'mouseover', function () {
                            onTickHover(label);
                        });
                        // On hover out
                        addEvent(object.element, 'mouseout', function () {
                            onTickHoverExit(label, labelOptions);
                        });
                        addEvent(object.element, 'click', function () {
                            tickGrid.toggleCollapse();
                        });
                        object.attachedTreeGridEvents = true;
                    }
                });
            }
            else if (icon) {
                removeEvent(labelElement);
                label?.css({ cursor: 'default' });
                icon.destroy();
            }
        }
        /* *
         *
         *  Classes
         *
         * */
        /**
         * @private
         * @class
         */
        class TreeGridTickAdditions {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * @private
             */
            static compose(TickClass) {
                const tickProto = TickClass.prototype;
                if (!tickProto.toggleCollapse) {
                    addEvent(TickClass, 'init', onTickInit);
                    wrap(tickProto, 'getLabelPosition', wrapGetLabelPosition);
                    wrap(tickProto, 'renderLabel', wrapRenderLabel);
                    // Backwards compatibility
                    tickProto.collapse = function (redraw) {
                        this.treeGrid.collapse(redraw);
                    };
                    tickProto.expand = function (redraw) {
                        this.treeGrid.expand(redraw);
                    };
                    tickProto.toggleCollapse = function (redraw) {
                        this.treeGrid.toggleCollapse(redraw);
                    };
                }
            }
            /* *
             *
             *  Constructors
             *
             * */
            /**
             * @private
             */
            constructor(tick) {
                this.tick = tick;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Collapse the grid cell. Used when axis is of type treegrid.
             *
             * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
             *
             * @private
             * @function Highcharts.Tick#collapse
             *
             * @param {boolean} [redraw=true]
             * Whether to redraw the chart or wait for an explicit call to
             * {@link Highcharts.Chart#redraw}
             */
            collapse(redraw) {
                const tick = this.tick, axis = tick.axis, brokenAxis = axis.brokenAxis;
                if (brokenAxis &&
                    axis.treeGrid.mapOfPosToGridNode) {
                    const pos = tick.pos, node = axis.treeGrid.mapOfPosToGridNode[pos], breaks = axis.treeGrid.collapse(node);
                    brokenAxis.setBreaks(breaks, pick(redraw, true));
                }
            }
            /**
             * Destroy remaining labelIcon if exist.
             *
             * @private
             * @function Highcharts.Tick#destroy
             */
            destroy() {
                if (this.labelIcon) {
                    this.labelIcon.destroy();
                }
            }
            /**
             * Expand the grid cell. Used when axis is of type treegrid.
             *
             * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
             *
             * @private
             * @function Highcharts.Tick#expand
             *
             * @param {boolean} [redraw=true]
             * Whether to redraw the chart or wait for an explicit call to
             * {@link Highcharts.Chart#redraw}
             */
            expand(redraw) {
                const { pos, axis } = this.tick, { treeGrid, brokenAxis } = axis, posMappedNodes = treeGrid.mapOfPosToGridNode;
                if (brokenAxis && posMappedNodes) {
                    const node = posMappedNodes[pos], breaks = treeGrid.expand(node);
                    brokenAxis.setBreaks(breaks, pick(redraw, true));
                }
            }
            /**
             * Toggle the collapse/expand state of the grid cell. Used when axis is
             * of type treegrid.
             *
             * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
             *
             * @private
             * @function Highcharts.Tick#toggleCollapse
             *
             * @param {boolean} [redraw=true]
             * Whether to redraw the chart or wait for an explicit call to
             * {@link Highcharts.Chart#redraw}
             */
            toggleCollapse(redraw) {
                const tick = this.tick, axis = tick.axis, brokenAxis = axis.brokenAxis;
                if (brokenAxis &&
                    axis.treeGrid.mapOfPosToGridNode) {
                    const pos = tick.pos, node = axis.treeGrid.mapOfPosToGridNode[pos], breaks = axis.treeGrid.toggleCollapse(node);
                    brokenAxis.setBreaks(breaks, pick(redraw, true));
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return TreeGridTickAdditions;
    });
    _registerModule(_modules, 'Series/TreeUtilities.js', [_modules['Core/Color/Color.js'], _modules['Core/Utilities.js']], function (Color, U) {
        /* *
         *
         *  (c) 2014-2024 Highsoft AS
         *
         *  Authors: Jon Arild Nygard / Oystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { extend, isArray, isNumber, isObject, merge, pick, relativeLength } = U;
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable valid-jsdoc */
        /**
         * @private
         */
        function getColor(node, options) {
            const index = options.index, mapOptionsToLevel = options.mapOptionsToLevel, parentColor = options.parentColor, parentColorIndex = options.parentColorIndex, series = options.series, colors = options.colors, siblings = options.siblings, points = series.points, chartOptionsChart = series.chart.options.chart;
            let getColorByPoint, point, level, colorByPoint, colorIndexByPoint, color, colorIndex;
            /**
             * @private
             */
            const variateColor = (color) => {
                const colorVariation = level && level.colorVariation;
                if (colorVariation &&
                    colorVariation.key === 'brightness' &&
                    index &&
                    siblings) {
                    return Color.parse(color).brighten(colorVariation.to * (index / siblings)).get();
                }
                return color;
            };
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
                    color = pick(point && point.options.color, level && level.color, colorByPoint, parentColor && variateColor(parentColor), series.color);
                }
                colorIndex = pick(point && point.options.colorIndex, level && level.colorIndex, colorIndexByPoint, parentColorIndex, options.colorIndex);
            }
            return {
                color: color,
                colorIndex: colorIndex
            };
        }
        /**
         * Creates a map from level number to its given options.
         *
         * @private
         *
         * @param {Object} params
         * Object containing parameters.
         * - `defaults` Object containing default options. The default options are
         *   merged with the userOptions to get the final options for a specific
         *   level.
         * - `from` The lowest level number.
         * - `levels` User options from series.levels.
         * - `to` The highest level number.
         *
         * @return {Highcharts.Dictionary<object>|null}
         * Returns a map from level number to its given options.
         */
        function getLevelOptions(params) {
            const result = {};
            let defaults, converted, i, from, to, levels;
            if (isObject(params)) {
                from = isNumber(params.from) ? params.from : 1;
                levels = params.levels;
                converted = {};
                defaults = isObject(params.defaults) ? params.defaults : {};
                if (isArray(levels)) {
                    converted = levels.reduce((obj, item) => {
                        let level, levelIsConstant, options;
                        if (isObject(item) && isNumber(item.level)) {
                            options = merge({}, item);
                            levelIsConstant = pick(options.levelIsConstant, defaults.levelIsConstant);
                            // Delete redundant properties.
                            delete options.levelIsConstant;
                            delete options.level;
                            // Calculate which level these options apply to.
                            level = item.level + (levelIsConstant ? 0 : from - 1);
                            if (isObject(obj[level])) {
                                merge(true, obj[level], options); // #16329
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
        }
        /**
         * @private
         * @todo Combine buildTree and buildNode with setTreeValues
         * @todo Remove logic from Treemap and make it utilize this mixin.
         */
        function setTreeValues(tree, options) {
            const before = options.before, idRoot = options.idRoot, mapIdToNode = options.mapIdToNode, nodeRoot = mapIdToNode[idRoot], levelIsConstant = (options.levelIsConstant !== false), points = options.points, point = points[tree.i], optionsPoint = point && point.options || {}, children = [];
            let childrenTotal = 0;
            tree.levelDynamic = tree.level - (levelIsConstant ? 0 : nodeRoot.level);
            tree.name = pick(point && point.name, '');
            tree.visible = (idRoot === tree.id ||
                options.visible === true);
            if (typeof before === 'function') {
                tree = before(tree, options);
            }
            // First give the children some values
            tree.children.forEach((child, i) => {
                const newOptions = extend({}, options);
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
            // Set the values
            const value = pick(optionsPoint.value, childrenTotal);
            tree.visible = value >= 0 && (childrenTotal > 0 || tree.visible);
            tree.children = children;
            tree.childrenTotal = childrenTotal;
            tree.isLeaf = tree.visible && !childrenTotal;
            tree.val = value;
            return tree;
        }
        /**
         * Update the rootId property on the series. Also makes sure that it is
         * accessible to exporting.
         *
         * @private
         *
         * @param {Object} series
         * The series to operate on.
         *
         * @return {string}
         * Returns the resulting rootId after update.
         */
        function updateRootId(series) {
            let rootId, options;
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
        }
        /**
         * Get the node width, which relies on the plot width and the nodeDistance
         * option.
         *
         * @private
         */
        function getNodeWidth(series, columnCount) {
            const { chart, options } = series, { nodeDistance = 0, nodeWidth = 0 } = options, { plotSizeX = 1 } = chart;
            // Node width auto means they are evenly distributed along the width of
            // the plot area
            if (nodeWidth === 'auto') {
                if (typeof nodeDistance === 'string' && /%$/.test(nodeDistance)) {
                    const fraction = parseFloat(nodeDistance) / 100, total = columnCount + fraction * (columnCount - 1);
                    return plotSizeX / total;
                }
                const nDistance = Number(nodeDistance);
                return ((plotSizeX + nDistance) /
                    (columnCount || 1)) - nDistance;
            }
            return relativeLength(nodeWidth, plotSizeX);
        }
        /* *
         *
         *  Default Export
         *
         * */
        const TreeUtilities = {
            getColor,
            getLevelOptions,
            getNodeWidth,
            setTreeValues,
            updateRootId
        };

        return TreeUtilities;
    });
    _registerModule(_modules, 'Core/Axis/TreeGrid/TreeGridAxis.js', [_modules['Core/Axis/BrokenAxis.js'], _modules['Core/Axis/GridAxis.js'], _modules['Gantt/Tree.js'], _modules['Core/Axis/TreeGrid/TreeGridTick.js'], _modules['Series/TreeUtilities.js'], _modules['Core/Utilities.js']], function (BrokenAxis, GridAxis, Tree, TreeGridTick, TU, U) {
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
        const { getLevelOptions } = TU;
        const { addEvent, find, fireEvent, isArray, isObject, isString, merge, pick, removeEvent, wrap } = U;
        /* *
         *
         *  Variables
         *
         * */
        let TickConstructor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function getBreakFromNode(node, max) {
            const to = node.collapseEnd || 0;
            let from = node.collapseStart || 0;
            // In broken-axis, the axis.max is minimized until it is not within a
            // break. Therefore, if break.to is larger than axis.max, the axis.to
            // should not add the 0.5 axis.tickMarkOffset, to avoid adding a break
            // larger than axis.max.
            // TODO consider simplifying broken-axis and this might solve itself
            if (to >= max) {
                from -= 0.5;
            }
            return {
                from: from,
                to: to,
                showPoints: false
            };
        }
        /**
         * Creates a tree structure of the data, and the treegrid. Calculates
         * categories, and y-values of points based on the tree.
         *
         * @private
         * @function getTreeGridFromData
         *
         * @param {Array<Highcharts.GanttPointOptions>} data
         * All the data points to display in the axis.
         *
         * @param {boolean} uniqueNames
         * Whether or not the data node with the same name should share grid cell. If
         * true they do share cell. False by default.
         *
         * @param {number} numberOfSeries
         *
         * @return {Object}
         * Returns an object containing categories, mapOfIdToNode,
         * mapOfPosToGridNode, and tree.
         *
         * @todo There should be only one point per line.
         * @todo It should be optional to have one category per point, or merge
         *       cells
         * @todo Add unit-tests.
         */
        function getTreeGridFromData(data, uniqueNames, numberOfSeries) {
            const categories = [], collapsedNodes = [], mapOfIdToNode = {}, uniqueNamesEnabled = typeof uniqueNames === 'boolean' ?
                uniqueNames : false;
            let mapOfPosToGridNode = {}, posIterator = -1;
            // Build the tree from the series data.
            const treeParams = {
                // After the children has been created.
                after: function (node) {
                    const gridNode = mapOfPosToGridNode[node.pos];
                    let height = 0, descendants = 0;
                    gridNode.children.forEach(function (child) {
                        descendants += (child.descendants || 0) + 1;
                        height = Math.max((child.height || 0) + 1, height);
                    });
                    gridNode.descendants = descendants;
                    gridNode.height = height;
                    if (gridNode.collapsed) {
                        collapsedNodes.push(gridNode);
                    }
                },
                // Before the children has been created.
                before: function (node) {
                    const data = isObject(node.data, true) ?
                        node.data :
                        {}, name = isString(data.name) ? data.name : '', parentNode = mapOfIdToNode[node.parent], parentGridNode = (isObject(parentNode, true) ?
                        mapOfPosToGridNode[parentNode.pos] :
                        null), hasSameName = function (x) {
                        return x.name === name;
                    };
                    let gridNode, pos;
                    // If not unique names, look for sibling node with the same name
                    if (uniqueNamesEnabled &&
                        isObject(parentGridNode, true) &&
                        !!(gridNode = find(parentGridNode.children, hasSameName))) {
                        // If there is a gridNode with the same name, reuse position
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
                            id: data.id,
                            nodes: [node],
                            children: [],
                            pos: pos
                        };
                        // If not root, then add name to categories.
                        if (pos !== -1) {
                            categories.push(name);
                        }
                        // Add name to list of children.
                        if (isObject(parentGridNode, true)) {
                            parentGridNode.children.push(gridNode);
                        }
                    }
                    // Add data node to map
                    if (isString(node.id)) {
                        mapOfIdToNode[node.id] = node;
                    }
                    // If one of the points are collapsed, then start the grid node
                    // in collapsed state.
                    if (gridNode &&
                        data.collapsed === true) {
                        gridNode.collapsed = true;
                    }
                    // Assign pos to data node
                    node.pos = pos;
                }
            };
            const updateYValuesAndTickPos = function (map, numberOfSeries) {
                const setValues = function (gridNode, start, result) {
                    const nodes = gridNode.nodes, padding = 0.5;
                    let end = start + (start === -1 ? 0 : numberOfSeries - 1);
                    const diff = (end - start) / 2, pos = start + diff;
                    nodes.forEach(function (node) {
                        const data = node.data;
                        if (isObject(data, true)) {
                            // Update point
                            data.y = start + (data.seriesIndex || 0);
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
                        end = (child.collapseEnd || 0) - padding;
                    });
                    // Set collapseEnd to the end of the last child node.
                    gridNode.collapseEnd = end + padding;
                    return result;
                };
                return setValues(map['-1'], -1, {});
            };
            // Create tree from data
            const tree = Tree.getTree(data, treeParams);
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
        }
        /**
         * Builds the tree of categories and calculates its positions.
         * @private
         * @param {Object} e Event object
         * @param {Object} e.target The chart instance which the event was fired on.
         * @param {object[]} e.target.axes The axes of the chart.
         */
        function onBeforeRender(e) {
            const chart = e.target, axes = chart.axes;
            axes.filter(function (axis) {
                return axis.options.type === 'treegrid';
            }).forEach(function (axis) {
                const options = axis.options || {}, labelOptions = options.labels, uniqueNames = options.uniqueNames, max = options.max, 
                // Check whether any of series is rendering for the first
                // time, visibility has changed, or its data is dirty, and
                // only then update. #10570, #10580. Also check if
                // mapOfPosToGridNode exists. #10887
                isDirty = (!axis.treeGrid.mapOfPosToGridNode ||
                    axis.series.some(function (series) {
                        return !series.hasRendered ||
                            series.isDirtyData ||
                            series.isDirty;
                    }));
                let numberOfSeries = 0, data, treeGrid;
                if (isDirty) {
                    // Concatenate data from all series assigned to this axis.
                    data = axis.series.reduce(function (arr, s) {
                        if (s.visible) {
                            // Push all data to array
                            (s.options.data || []).forEach(function (data) {
                                // For using keys - rebuild the data structure
                                if (s.options.keys && s.options.keys.length) {
                                    data = s.pointClass.prototype
                                        .optionsToObject
                                        .call({ series: s }, data);
                                    s.pointClass.setGanttPointAliases(data);
                                }
                                if (isObject(data, true)) {
                                    // Set series index on data. Removed again
                                    // after use.
                                    data.seriesIndex = (numberOfSeries);
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
                    // If max is higher than set data - add a
                    // dummy data to render categories #10779
                    if (max && data.length < max) {
                        for (let i = data.length; i <= max; i++) {
                            data.push({
                                // Use the zero-width character
                                // to avoid conflict with uniqueNames
                                name: i + '\u200B'
                            });
                        }
                    }
                    // `setScale` is fired after all the series is initialized,
                    // which is an ideal time to update the axis.categories.
                    treeGrid = getTreeGridFromData(data, uniqueNames || false, (uniqueNames === true) ? numberOfSeries : 1);
                    // Assign values to the axis.
                    axis.categories = treeGrid.categories;
                    axis.treeGrid.mapOfPosToGridNode = (treeGrid.mapOfPosToGridNode);
                    axis.hasNames = true;
                    axis.treeGrid.tree = treeGrid.tree;
                    // Update yData now that we have calculated the y values
                    axis.series.forEach(function (series) {
                        const axisData = (series.options.data || []).map(function (d) {
                            if (isArray(d) &&
                                series.options.keys &&
                                series.options.keys.length) {
                                // Get the axisData from the data array used to
                                // build the treeGrid where has been modified
                                data.forEach(function (point) {
                                    if (d.indexOf(point.x) >= 0 &&
                                        d.indexOf(point.x2) >= 0) {
                                        d = point;
                                    }
                                });
                            }
                            return isObject(d, true) ? merge(d) : d;
                        });
                        // Avoid destroying points when series is not visible
                        if (series.visible) {
                            series.setData(axisData, false);
                        }
                    });
                    // Calculate the label options for each level in the tree.
                    axis.treeGrid.mapOptionsToLevel =
                        getLevelOptions({
                            defaults: labelOptions,
                            from: 1,
                            levels: labelOptions && labelOptions.levels,
                            to: axis.treeGrid.tree && axis.treeGrid.tree.height
                        });
                    // Setting initial collapsed nodes
                    if (e.type === 'beforeRender') {
                        axis.treeGrid.collapsedNodes = treeGrid.collapsedNodes;
                    }
                }
            });
        }
        /**
         * Generates a tick for initial positioning.
         *
         * @private
         * @function Highcharts.GridAxis#generateTick
         *
         * @param {Function} proceed
         * The original generateTick function.
         *
         * @param {number} pos
         * The tick position in axis values.
         */
        function wrapGenerateTick(proceed, pos) {
            const axis = this, mapOptionsToLevel = axis.treeGrid.mapOptionsToLevel || {}, isTreeGrid = axis.options.type === 'treegrid', ticks = axis.ticks;
            let tick = ticks[pos], levelOptions, options, gridNode;
            if (isTreeGrid &&
                axis.treeGrid.mapOfPosToGridNode) {
                gridNode = axis.treeGrid.mapOfPosToGridNode[pos];
                levelOptions = mapOptionsToLevel[gridNode.depth];
                if (levelOptions) {
                    options = {
                        labels: levelOptions
                    };
                }
                if (!tick &&
                    TickConstructor) {
                    ticks[pos] = tick =
                        new TickConstructor(axis, pos, void 0, void 0, {
                            category: gridNode.name,
                            tickmarkOffset: gridNode.tickmarkOffset,
                            options: options
                        });
                }
                else {
                    // Update labels depending on tick interval
                    tick.parameters.category = gridNode.name;
                    tick.options = options;
                    tick.addLabel();
                }
            }
            else {
                proceed.apply(axis, Array.prototype.slice.call(arguments, 1));
            }
        }
        /**
         * @private
         */
        function wrapInit(proceed, chart, userOptions, coll) {
            const axis = this, isTreeGrid = userOptions.type === 'treegrid';
            if (!axis.treeGrid) {
                axis.treeGrid = new TreeGridAxisAdditions(axis);
            }
            // Set default and forced options for TreeGrid
            if (isTreeGrid) {
                // Add event for updating the categories of a treegrid.
                // NOTE Preferably these events should be set on the axis.
                addEvent(chart, 'beforeRender', onBeforeRender);
                addEvent(chart, 'beforeRedraw', onBeforeRender);
                // Add new collapsed nodes on addseries
                addEvent(chart, 'addSeries', function (e) {
                    if (e.options.data) {
                        const treeGrid = getTreeGridFromData(e.options.data, userOptions.uniqueNames || false, 1);
                        axis.treeGrid.collapsedNodes = (axis.treeGrid.collapsedNodes || []).concat(treeGrid.collapsedNodes);
                    }
                });
                // Collapse all nodes in axis.treegrid.collapsednodes
                // where collapsed equals true.
                addEvent(axis, 'foundExtremes', function () {
                    if (axis.treeGrid.collapsedNodes) {
                        axis.treeGrid.collapsedNodes.forEach(function (node) {
                            const breaks = axis.treeGrid.collapse(node);
                            if (axis.brokenAxis) {
                                axis.brokenAxis.setBreaks(breaks, false);
                                // Remove the node from the axis collapsedNodes
                                if (axis.treeGrid.collapsedNodes) {
                                    axis.treeGrid.collapsedNodes = axis.treeGrid
                                        .collapsedNodes
                                        .filter((n) => ((node.collapseStart !==
                                        n.collapseStart) ||
                                        node.collapseEnd !== n.collapseEnd));
                                }
                            }
                        });
                    }
                });
                // If staticScale is not defined on the yAxis
                // and chart height is set, set axis.isDirty
                // to ensure collapsing works (#12012)
                addEvent(axis, 'afterBreaks', function () {
                    if (axis.coll === 'yAxis' &&
                        !axis.staticScale &&
                        axis.chart.options.chart.height) {
                        axis.isDirty = true;
                    }
                });
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
                                level: void 0
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
                            width: 10
                        }
                    },
                    uniqueNames: false
                }, userOptions, {
                    // Forced options
                    reversed: true
                });
            }
            // Now apply the original function with the original arguments, which are
            // sliced off this function's arguments
            proceed.apply(axis, [chart, userOptions, coll]);
            if (isTreeGrid) {
                axis.hasNames = true;
                axis.options.showLastLabel = true;
            }
        }
        /**
         * Set the tick positions, tickInterval, axis min and max.
         *
         * @private
         * @function Highcharts.GridAxis#setTickInterval
         *
         * @param {Function} proceed
         * The original setTickInterval function.
         */
        function wrapSetTickInterval(proceed) {
            const axis = this, options = axis.options, linkedParent = typeof options.linkedTo === 'number' ?
                this.chart[axis.coll]?.[options.linkedTo] :
                void 0, isTreeGrid = options.type === 'treegrid';
            if (isTreeGrid) {
                axis.min = pick(axis.userMin, options.min, axis.dataMin);
                axis.max = pick(axis.userMax, options.max, axis.dataMax);
                fireEvent(axis, 'foundExtremes');
                // `setAxisTranslation` modifies the min and max according to axis
                // breaks.
                axis.setAxisTranslation();
                axis.tickInterval = 1;
                axis.tickmarkOffset = 0.5;
                axis.tickPositions = axis.treeGrid.mapOfPosToGridNode ?
                    axis.treeGrid.getTickPositions() :
                    [];
                if (linkedParent) {
                    const linkedParentExtremes = linkedParent.getExtremes();
                    axis.min = pick(linkedParentExtremes.min, linkedParentExtremes.dataMin);
                    axis.max = pick(linkedParentExtremes.max, linkedParentExtremes.dataMax);
                    axis.tickPositions = linkedParent.tickPositions;
                }
                axis.linkedParent = linkedParent;
            }
            else {
                proceed.apply(axis, Array.prototype.slice.call(arguments, 1));
            }
        }
        /**
         * Wrap axis redraw to remove TreeGrid events from ticks
         *
         * @private
         * @function Highcharts.GridAxis#redraw
         *
         * @param {Function} proceed
         * The original setTickInterval function.
         */
        function wrapRedraw(proceed) {
            const axis = this, options = axis.options, isTreeGrid = options.type === 'treegrid';
            if (isTreeGrid && axis.visible) {
                axis.tickPositions.forEach(function (pos) {
                    const tick = axis.ticks[pos];
                    if (tick.label && tick.label.attachedTreeGridEvents) {
                        removeEvent(tick.label.element);
                        tick.label.attachedTreeGridEvents = false;
                    }
                });
            }
            proceed.apply(axis, Array.prototype.slice.call(arguments, 1));
        }
        /* *
         *
         *  Classes
         *
         * */
        /**
         * @private
         * @class
         */
        class TreeGridAxisAdditions {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * @private
             */
            static compose(AxisClass, ChartClass, SeriesClass, TickClass) {
                if (!AxisClass.keepProps.includes('treeGrid')) {
                    const axisProps = AxisClass.prototype;
                    AxisClass.keepProps.push('treeGrid');
                    wrap(axisProps, 'generateTick', wrapGenerateTick);
                    wrap(axisProps, 'init', wrapInit);
                    wrap(axisProps, 'setTickInterval', wrapSetTickInterval);
                    wrap(axisProps, 'redraw', wrapRedraw);
                    // Make utility functions available for testing.
                    axisProps.utils = {
                        getNode: Tree.getNode
                    };
                    if (!TickConstructor) {
                        TickConstructor = TickClass;
                    }
                }
                GridAxis.compose(AxisClass, ChartClass, TickClass);
                BrokenAxis.compose(AxisClass, SeriesClass);
                TreeGridTick.compose(TickClass);
                return AxisClass;
            }
            /* *
             *
             *  Constructors
             *
             * */
            /**
             * @private
             */
            constructor(axis) {
                this.axis = axis;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Set the collapse status.
             *
             * @private
             *
             * @param {Highcharts.Axis} axis
             * The axis to check against.
             *
             * @param {Highcharts.GridNode} node
             * The node to collapse.
             */
            setCollapsedStatus(node) {
                const axis = this.axis, chart = axis.chart;
                axis.series.forEach(function (series) {
                    const data = series.options.data;
                    if (node.id && data) {
                        const point = chart.get(node.id), dataPoint = data[series.data.indexOf(point)];
                        if (point && dataPoint) {
                            point.collapsed = node.collapsed;
                            dataPoint.collapsed = node.collapsed;
                        }
                    }
                });
            }
            /**
             * Calculates the new axis breaks to collapse a node.
             *
             * @private
             *
             * @param {Highcharts.Axis} axis
             * The axis to check against.
             *
             * @param {Highcharts.GridNode} node
             * The node to collapse.
             *
             * @param {number} pos
             * The tick position to collapse.
             *
             * @return {Array<object>}
             * Returns an array of the new breaks for the axis.
             */
            collapse(node) {
                const axis = this.axis, breaks = (axis.options.breaks || []), obj = getBreakFromNode(node, axis.max);
                breaks.push(obj);
                // Change the collapsed flag #13838
                node.collapsed = true;
                axis.treeGrid.setCollapsedStatus(node);
                return breaks;
            }
            /**
             * Calculates the new axis breaks to expand a node.
             *
             * @private
             *
             * @param {Highcharts.Axis} axis
             * The axis to check against.
             *
             * @param {Highcharts.GridNode} node
             * The node to expand.
             *
             * @param {number} pos
             * The tick position to expand.
             *
             * @return {Array<object>}
             * Returns an array of the new breaks for the axis.
             */
            expand(node) {
                const axis = this.axis, breaks = (axis.options.breaks || []), obj = getBreakFromNode(node, axis.max);
                // Change the collapsed flag #13838
                node.collapsed = false;
                axis.treeGrid.setCollapsedStatus(node);
                // Remove the break from the axis breaks array.
                return breaks.reduce(function (arr, b) {
                    if (b.to !== obj.to || b.from !== obj.from) {
                        arr.push(b);
                    }
                    return arr;
                }, []);
            }
            /**
             * Creates a list of positions for the ticks on the axis. Filters out
             * positions that are outside min and max, or is inside an axis break.
             *
             * @private
             *
             * @return {Array<number>}
             * List of positions.
             */
            getTickPositions() {
                const axis = this.axis, roundedMin = Math.floor(axis.min / axis.tickInterval) * axis.tickInterval, roundedMax = Math.ceil(axis.max / axis.tickInterval) * axis.tickInterval;
                return Object.keys(axis.treeGrid.mapOfPosToGridNode || {}).reduce(function (arr, key) {
                    const pos = +key;
                    if (pos >= roundedMin &&
                        pos <= roundedMax &&
                        !(axis.brokenAxis && axis.brokenAxis.isInAnyBreak(pos))) {
                        arr.push(pos);
                    }
                    return arr;
                }, []);
            }
            /**
             * Check if a node is collapsed.
             *
             * @private
             *
             * @param {Highcharts.Axis} axis
             * The axis to check against.
             *
             * @param {Object} node
             * The node to check if is collapsed.
             *
             * @param {number} pos
             * The tick position to collapse.
             *
             * @return {boolean}
             * Returns true if collapsed, false if expanded.
             */
            isCollapsed(node) {
                const axis = this.axis, breaks = (axis.options.breaks || []), obj = getBreakFromNode(node, axis.max);
                return breaks.some(function (b) {
                    return b.from === obj.from && b.to === obj.to;
                });
            }
            /**
             * Calculates the new axis breaks after toggling the collapse/expand
             * state of a node. If it is collapsed it will be expanded, and if it is
             * expanded it will be collapsed.
             *
             * @private
             *
             * @param {Highcharts.Axis} axis
             * The axis to check against.
             *
             * @param {Highcharts.GridNode} node
             * The node to toggle.
             *
             * @return {Array<object>}
             * Returns an array of the new breaks for the axis.
             */
            toggleCollapse(node) {
                return (this.isCollapsed(node) ?
                    this.expand(node) :
                    this.collapse(node));
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return TreeGridAxisAdditions;
    });
    _registerModule(_modules, 'masters/modules/treegrid.src.js', [_modules['Core/Globals.js'], _modules['Core/Axis/TreeGrid/TreeGridAxis.js']], function (Highcharts, TreeGridAxis) {

        const G = Highcharts;
        TreeGridAxis.compose(G.Axis, G.Chart, G.Series, G.Tick);

        return Highcharts;
    });
}));