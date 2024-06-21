/**
 * @license Highcharts JS v11.4.3 (2024-05-22)
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/broken-axis', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'masters/modules/broken-axis.src.js', [_modules['Core/Globals.js'], _modules['Core/Axis/BrokenAxis.js']], function (Highcharts, BrokenAxis) {

        const G = Highcharts;
        G.BrokenAxis = G.BrokenAxis || BrokenAxis;
        G.BrokenAxis.compose(G.Axis, G.Series);

        return Highcharts;
    });
}));