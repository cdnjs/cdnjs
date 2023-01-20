/* *
 *
 *  Copyright (c) 2019-2021 Highsoft AS
 *
 *  Boost module: stripped-down renderer for higher performance
 *
 *  License: highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import BoostableMap from './BoostableMap.js';
import Boostables from './Boostables.js';
import BoostChart from './BoostChart.js';
var getBoostClipRect = BoostChart.getBoostClipRect, isChartSeriesBoosting = BoostChart.isChartSeriesBoosting;
import D from '../../Core/Defaults.js';
var getOptions = D.getOptions;
import H from '../../Core/Globals.js';
var doc = H.doc, noop = H.noop, win = H.win;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, error = U.error, extend = U.extend, fireEvent = U.fireEvent, isArray = U.isArray, isNumber = U.isNumber, pick = U.pick, wrap = U.wrap;
import WGLRenderer from './WGLRenderer.js';
/* *
 *
 *  Constants
 *
 * */
var CHUNK_SIZE = 3000;
var composedClasses = [];
/* *
 *
 *  Variables
 *
 * */
var index, mainCanvas;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function allocateIfNotSeriesBoosting(renderer, series) {
    var boost = series.boost;
    if (renderer &&
        boost &&
        boost.target &&
        boost.canvas &&
        !isChartSeriesBoosting(series.chart)) {
        renderer.allocateBufferForSingleSeries(series);
    }
}
/**
 * Return true if ths boost.enabled option is true
 *
 * @private
 * @param {Highcharts.Chart} chart
 * The chart
 * @return {boolean}
 * True, if boost is enabled.
 */
function boostEnabled(chart) {
    return pick((chart &&
        chart.options &&
        chart.options.boost &&
        chart.options.boost.enabled), true);
}
/**
 * @private
 */
function compose(SeriesClass, seriesTypes, wglMode) {
    if (composedClasses.indexOf(SeriesClass) === -1) {
        composedClasses.push(SeriesClass);
        addEvent(SeriesClass, 'destroy', onSeriesDestroy);
        addEvent(SeriesClass, 'hide', onSeriesHide);
        var seriesProto_1 = SeriesClass.prototype;
        if (wglMode) {
            seriesProto_1.renderCanvas = seriesRenderCanvas;
        }
        wrap(seriesProto_1, 'getExtremes', wrapSeriesGetExtremes);
        wrap(seriesProto_1, 'processData', wrapSeriesProcessData);
        wrap(seriesProto_1, 'searchPoint', wrapSeriesSearchPoint);
        [
            'translate',
            'generatePoints',
            'drawTracker',
            'drawPoints',
            'render'
        ].forEach(function (method) {
            return wrapSeriesFunctions(seriesProto_1, seriesTypes, method);
        });
    }
    if (composedClasses.indexOf(getOptions) === -1) {
        composedClasses.push(getOptions);
        var plotOptions_1 = getOptions().plotOptions;
        // Set default options
        Boostables.forEach(function (type) {
            var typePlotOptions = plotOptions_1[type];
            if (typePlotOptions) {
                typePlotOptions.boostThreshold = 5000;
                typePlotOptions.boostData = [];
                seriesTypes[type].prototype.fillOpacity = true;
            }
        });
    }
    if (wglMode) {
        var AreaSeries = seriesTypes.area, AreaSplineSeries = seriesTypes.areaspline, BubbleSeries = seriesTypes.bubble, ColumnSeries = seriesTypes.column, HeatmapSeries = seriesTypes.heatmap, ScatterSeries = seriesTypes.scatter, TreemapSeries = seriesTypes.treemap;
        if (AreaSeries &&
            composedClasses.indexOf(AreaSeries) === -1) {
            composedClasses.push(AreaSeries);
            extend(AreaSeries.prototype, {
                fill: true,
                fillOpacity: true,
                sampling: true
            });
        }
        if (AreaSplineSeries &&
            composedClasses.indexOf(AreaSplineSeries) === -1) {
            composedClasses.push(AreaSplineSeries);
            extend(AreaSplineSeries.prototype, {
                fill: true,
                fillOpacity: true,
                sampling: true
            });
        }
        if (BubbleSeries &&
            composedClasses.indexOf(BubbleSeries) === -1) {
            composedClasses.push(BubbleSeries);
            var bubbleProto_1 = BubbleSeries.prototype;
            // By default, the bubble series does not use the KD-tree, so force
            // it to.
            delete bubbleProto_1.buildKDTree;
            // seriesTypes.bubble.prototype.directTouch = false;
            // Needed for markers to work correctly
            wrap(bubbleProto_1, 'markerAttribs', function (proceed) {
                if (this.boosted) {
                    return false;
                }
                return proceed.apply(this, [].slice.call(arguments, 1));
            });
        }
        if (ColumnSeries &&
            composedClasses.indexOf(ColumnSeries) === -1) {
            composedClasses.push(ColumnSeries);
            extend(ColumnSeries.prototype, {
                fill: true,
                sampling: true
            });
        }
        if (ScatterSeries &&
            composedClasses.indexOf(ScatterSeries) === -1) {
            composedClasses.push(ScatterSeries);
            ScatterSeries.prototype.fill = true;
        }
        // We need to handle heatmaps separatly, since we can't perform the
        // size/color calculations in the shader easily.
        // @todo This likely needs future optimization.
        [HeatmapSeries, TreemapSeries].forEach(function (SC) {
            if (SC && composedClasses.indexOf(SC) === -1) {
                composedClasses.push(SC);
                wrap(SC.prototype, 'drawPoints', wrapSeriesDrawPoints);
            }
        });
    }
    return SeriesClass;
}
/**
 * Create a canvas + context and attach it to the target
 *
 * @private
 * @function createAndAttachRenderer
 *
 * @param {Highcharts.Chart} chart
 * the chart
 *
 * @param {Highcharts.Series} series
 * the series
 *
 * @return {Highcharts.BoostGLRenderer}
 * the canvas renderer
 */
function createAndAttachRenderer(chart, series) {
    var ChartClass = chart.constructor, targetGroup = chart.seriesGroup || series.group, alpha = 1;
    var width = chart.chartWidth, height = chart.chartHeight, target = chart, foSupported = typeof SVGForeignObjectElement !== 'undefined';
    if (isChartSeriesBoosting(chart)) {
        target = chart;
    }
    else {
        target = series;
    }
    var boost = target.boost =
        target.boost ||
            {};
    // Support for foreignObject is flimsy as best.
    // IE does not support it, and Chrome has a bug which messes up
    // the canvas draw order.
    // As such, we force the Image fallback for now, but leaving the
    // actual Canvas path in-place in case this changes in the future.
    foSupported = false;
    if (!mainCanvas) {
        mainCanvas = doc.createElement('canvas');
    }
    if (!boost.target) {
        boost.canvas = mainCanvas;
        // Fall back to image tag if foreignObject isn't supported,
        // or if we're exporting.
        if (chart.renderer.forExport || !foSupported) {
            target.renderTarget = boost.target = chart.renderer.image('', 0, 0, width, height)
                .addClass('highcharts-boost-canvas')
                .add(targetGroup);
            boost.clear = function () {
                boost.target.attr({
                    // Insert a blank pixel (#17182)
                    /* eslint-disable-next-line max-len*/
                    href: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
                });
            };
            boost.copy = function () {
                boost.resize();
                boost.target.attr({
                    href: boost.canvas.toDataURL('image/png')
                });
            };
        }
        else {
            boost.targetFo = chart.renderer
                .createElement('foreignObject')
                .add(targetGroup);
            target.renderTarget = boost.target =
                doc.createElement('canvas');
            boost.targetCtx = boost.target.getContext('2d');
            boost.targetFo.element.appendChild(boost.target);
            boost.clear = function () {
                boost.target.width = boost.canvas.width;
                boost.target.height = boost.canvas.height;
            };
            boost.copy = function () {
                boost.target.width = boost.canvas.width;
                boost.target.height = boost.canvas.height;
                boost.targetCtx.drawImage(boost.canvas, 0, 0);
            };
        }
        boost.resize = function () {
            width = chart.chartWidth;
            height = chart.chartHeight;
            (boost.targetFo || boost.target)
                .attr({
                x: 0,
                y: 0,
                width: width,
                height: height
            })
                .css({
                pointerEvents: 'none',
                mixedBlendMode: 'normal',
                opacity: alpha
            });
            if (target instanceof ChartClass) {
                target.boost.markerGroup.translate(chart.plotLeft, chart.plotTop);
            }
        };
        boost.clipRect = chart.renderer.clipRect();
        (boost.targetFo || boost.target).clip(boost.clipRect);
        if (target instanceof ChartClass) {
            target.boost.markerGroup = target.renderer
                .g()
                .add(targetGroup)
                .translate(series.xAxis.pos, series.yAxis.pos);
        }
    }
    boost.canvas.width = width;
    boost.canvas.height = height;
    if (boost.clipRect) {
        boost.clipRect.attr(getBoostClipRect(chart, target));
    }
    boost.resize();
    boost.clear();
    if (!boost.wgl) {
        boost.wgl = new WGLRenderer(function (wgl) {
            if (wgl.settings.debug.timeBufferCopy) {
                console.time('buffer copy'); // eslint-disable-line no-console
            }
            boost.copy();
            if (wgl.settings.debug.timeBufferCopy) {
                console.timeEnd('buffer copy'); // eslint-disable-line no-console
            }
        });
        if (!boost.wgl.init(boost.canvas)) {
            // The OGL renderer couldn't be inited.
            // This likely means a shader error as we wouldn't get to this point
            // if there was no WebGL support.
            error('[highcharts boost] - unable to init WebGL renderer');
        }
        // target.ogl.clear();
        boost.wgl.setOptions(chart.options.boost || {});
        if (target instanceof ChartClass) {
            boost.wgl.allocateBuffer(chart);
        }
    }
    boost.wgl.setSize(width, height);
    return boost.wgl;
}
/**
 * If implemented in the core, parts of this can probably be
 * shared with other similar methods in Highcharts.
 * @private
 * @function Highcharts.Series#destroyGraphics
 */
function destroyGraphics(series) {
    var points = series.points;
    if (points) {
        var point = void 0, i = void 0;
        for (i = 0; i < points.length; i = i + 1) {
            point = points[i];
            if (point && point.destroyElements) {
                point.destroyElements(); // #7557
            }
        }
    }
    ['graph', 'area', 'tracker'].forEach(function (prop) {
        var seriesProp = series[prop];
        if (seriesProp) {
            series[prop] = seriesProp.destroy();
        }
    });
    var zonesSeries = series;
    if (zonesSeries.getZonesGraphs) {
        var props = zonesSeries.getZonesGraphs([['graph', 'highcharts-graph']]);
        props.forEach(function (prop) {
            var zoneGraph = zonesSeries[prop[0]];
            if (zoneGraph) {
                zonesSeries[prop[0]] = zoneGraph.destroy();
            }
        });
    }
}
/**
 * An "async" foreach loop. Uses a setTimeout to keep the loop from blocking the
 * UI thread.
 *
 * @private
 * @param {Array<unknown>} arr
 * The array to loop through.
 * @param {Function} fn
 * The callback to call for each item.
 * @param {Function} finalFunc
 * The callback to call when done.
 * @param {number} [chunkSize]
 * The number of iterations per timeout.
 * @param {number} [i]
 * The current index.
 * @param {boolean} [noTimeout]
 * Set to true to skip timeouts.
 */
function eachAsync(arr, fn, finalFunc, chunkSize, i, noTimeout) {
    i = i || 0;
    chunkSize = chunkSize || CHUNK_SIZE;
    var threshold = i + chunkSize;
    var proceed = true;
    while (proceed && i < threshold && i < arr.length) {
        proceed = fn(arr[i], i);
        ++i;
    }
    if (proceed) {
        if (i < arr.length) {
            if (noTimeout) {
                eachAsync(arr, fn, finalFunc, chunkSize, i, noTimeout);
            }
            else if (win.requestAnimationFrame) {
                // If available, do requestAnimationFrame - shaves off a few ms
                win.requestAnimationFrame(function () {
                    eachAsync(arr, fn, finalFunc, chunkSize, i);
                });
            }
            else {
                setTimeout(eachAsync, 0, arr, fn, finalFunc, chunkSize, i);
            }
        }
        else if (finalFunc) {
            finalFunc();
        }
    }
}
/**
 * Enter boost mode and apply boost-specific properties.
 * @private
 * @function Highcharts.Series#enterBoost
 */
function enterBoost(series) {
    series.boost = series.boost || {
        // faster than a series bind:
        getPoint: (function (bp) { return getPoint(series, bp); })
    };
    var alteredByBoost = series.boost.altered = [];
    // Save the original values, including whether it was an own
    // property or inherited from the prototype.
    ['allowDG', 'directTouch', 'stickyTracking'].forEach(function (prop) {
        alteredByBoost.push({
            prop: prop,
            val: series[prop],
            own: Object.hasOwnProperty.call(series, prop)
        });
    });
    series.allowDG = false;
    series.directTouch = false;
    series.stickyTracking = true;
    // Prevent animation when zooming in on boosted series(#13421).
    series.finishedAnimating = true;
    // Hide series label if any
    if (series.labelBySeries) {
        series.labelBySeries = series.labelBySeries.destroy();
    }
}
/**
 * Exit from boost mode and restore non-boost properties.
 * @private
 * @function Highcharts.Series#exitBoost
 */
function exitBoost(series) {
    var boost = series.boost;
    // Reset instance properties and/or delete instance properties and go back
    // to prototype
    if (boost) {
        (boost.altered || []).forEach(function (setting) {
            if (setting.own) {
                series[setting.prop] = setting.val;
            }
            else {
                // Revert to prototype
                delete series[setting.prop];
            }
        });
        // Clear previous run
        if (boost.clear) {
            boost.clear();
        }
    }
}
/**
 * @private
 * @function Highcharts.Series#hasExtremes
 */
function hasExtremes(series, checkX) {
    var options = series.options, data = options.data, xAxis = series.xAxis && series.xAxis.options, yAxis = series.yAxis && series.yAxis.options, colorAxis = series.colorAxis && series.colorAxis.options;
    return data.length > (options.boostThreshold || Number.MAX_VALUE) &&
        // Defined yAxis extremes
        isNumber(yAxis.min) &&
        isNumber(yAxis.max) &&
        // Defined (and required) xAxis extremes
        (!checkX ||
            (isNumber(xAxis.min) && isNumber(xAxis.max))) &&
        // Defined (e.g. heatmap) colorAxis extremes
        (!colorAxis ||
            (isNumber(colorAxis.min) && isNumber(colorAxis.max)));
}
/**
 * Extend series.destroy to also remove the fake k-d-tree points (#5137).
 * Normally this is handled by Series.destroy that calls Point.destroy,
 * but the fake search points are not registered like that.
 * @private
 */
function onSeriesDestroy() {
    var series = this, chart = series.chart;
    if (chart.boost &&
        chart.boost.markerGroup === series.markerGroup) {
        series.markerGroup = null;
    }
    if (chart.hoverPoints) {
        chart.hoverPoints = chart.hoverPoints.filter(function (point) {
            return point.series === series;
        });
    }
    if (chart.hoverPoint && chart.hoverPoint.series === series) {
        chart.hoverPoint = null;
    }
}
/**
 * @private
 */
function onSeriesHide() {
    var boost = this.boost;
    if (boost && boost.canvas && boost.target) {
        if (boost.wgl) {
            boost.wgl.clear();
        }
        if (boost.clear) {
            boost.clear();
        }
    }
}
/**
 * Performs the actual render if the renderer is
 * attached to the series.
 * @private
 */
function renderIfNotSeriesBoosting(series) {
    var boost = series.boost;
    if (boost &&
        boost.canvas &&
        boost.target &&
        boost.wgl &&
        !isChartSeriesBoosting(series.chart)) {
        boost.wgl.render(series.chart);
    }
}
/**
 * Return a full Point object based on the index.
 * The boost module uses stripped point objects for performance reasons.

 * @private
 * @param {object|Highcharts.Point} boostPoint
 *        A stripped-down point object
 * @return {Highcharts.Point}
 *         A Point object as per https://api.highcharts.com/highcharts#Point
 */
function getPoint(series, boostPoint) {
    var seriesOptions = series.options, xAxis = series.xAxis, PointClass = series.pointClass;
    if (boostPoint instanceof PointClass) {
        return boostPoint;
    }
    var xData = (series.xData ||
        seriesOptions.xData ||
        series.processedXData ||
        false), point = (new PointClass()).init(series, series.options.data[boostPoint.i], xData ? xData[boostPoint.i] : void 0);
    point.category = pick(xAxis.categories ?
        xAxis.categories[point.x] :
        point.x, // @todo simplify
    point.x);
    point.dist = boostPoint.dist;
    point.distX = boostPoint.distX;
    point.plotX = boostPoint.plotX;
    point.plotY = boostPoint.plotY;
    point.index = boostPoint.i;
    point.percentage = boostPoint.percentage;
    point.isInside = series.isPointInside(point);
    return point;
}
/**
 * @private
 * @function Highcharts.Series#renderCanvas
 */
function seriesRenderCanvas() {
    var _this = this;
    var options = this.options || {}, chart = this.chart, xAxis = this.xAxis, yAxis = this.yAxis, xData = options.xData || this.processedXData, yData = options.yData || this.processedYData, rawData = options.data, xExtremes = xAxis.getExtremes(), xMin = xExtremes.min, xMax = xExtremes.max, yExtremes = yAxis.getExtremes(), yMin = yExtremes.min, yMax = yExtremes.max, pointTaken = {}, sampling = !!this.sampling, enableMouseTracking = options.enableMouseTracking !== false, threshold = options.threshold, isRange = this.pointArrayMap &&
        this.pointArrayMap.join(',') === 'low,high', isStacked = !!options.stacking, cropStart = this.cropStart || 0, requireSorting = this.requireSorting, useRaw = !xData, compareX = options.findNearestPointBy === 'x', xDataFull = (this.xData ||
        this.options.xData ||
        this.processedXData ||
        false);
    var renderer = false, lastClientX, yBottom = yAxis.getThreshold(threshold), minVal, maxVal, minI, maxI;
    // Get or create the renderer
    renderer = createAndAttachRenderer(chart, this);
    chart.boosted = true;
    if (!this.visible) {
        return;
    }
    // If we are zooming out from SVG mode, destroy the graphics
    if (this.points || this.graph) {
        destroyGraphics(this);
    }
    // If we're rendering per. series we should create the marker groups
    // as usual.
    if (!isChartSeriesBoosting(chart)) {
        // If all series were boosting, but are not anymore
        // restore private markerGroup
        if (chart.boost &&
            this.markerGroup === chart.boost.markerGroup) {
            this.markerGroup = void 0;
        }
        this.markerGroup = this.plotGroup('markerGroup', 'markers', true, 1, chart.seriesGroup);
    }
    else {
        // If series has a private markeGroup, remove that
        // and use common markerGroup
        if (this.markerGroup &&
            this.markerGroup !== chart.boost.markerGroup) {
            this.markerGroup.destroy();
        }
        // Use a single group for the markers
        this.markerGroup = chart.boost.markerGroup;
        // When switching from chart boosting mode, destroy redundant
        // series boosting targets
        if (this.boost && this.boost.target) {
            this.renderTarget = this.boost.target = this.boost.target.destroy();
        }
    }
    var points = this.points = [], addKDPoint = function (clientX, plotY, i, percentage) {
        // We need to do ceil on the clientX to make things
        // snap to pixel values. The renderer will frequently
        // draw stuff on "sub-pixels".
        clientX = Math.ceil(clientX);
        // Shaves off about 60ms compared to repeated concatenation
        index = compareX ? clientX : clientX + ',' + plotY;
        // The k-d tree requires series points.
        // Reduce the amount of points, since the time to build the
        // tree increases exponentially.
        if (enableMouseTracking && !pointTaken[index]) {
            pointTaken[index] = true;
            if (chart.inverted) {
                clientX = xAxis.len - clientX;
                plotY = yAxis.len - plotY;
            }
            points.push({
                x: xDataFull ? xDataFull[cropStart + i] : false,
                clientX: clientX,
                plotX: clientX,
                plotY: plotY,
                i: cropStart + i,
                percentage: percentage
            });
        }
    };
    // Do not start building while drawing
    this.buildKDTree = noop;
    if (renderer) {
        allocateIfNotSeriesBoosting(renderer, this);
        renderer.pushSeries(this);
        // Perform the actual renderer if we're on series level
        renderIfNotSeriesBoosting(this);
    }
    /**
     * This builds the KD-tree
     * @private
     */
    function processPoint(d, i) {
        var chartDestroyed = typeof chart.index === 'undefined';
        var x, y, clientX, plotY, percentage, low = false, isYInside = true;
        if (typeof d === 'undefined') {
            return true;
        }
        if (!chartDestroyed) {
            if (useRaw) {
                x = d[0];
                y = d[1];
            }
            else {
                x = d;
                y = yData[i];
            }
            // Resolve low and high for range series
            if (isRange) {
                if (useRaw) {
                    y = d.slice(1, 3);
                }
                low = y[0];
                y = y[1];
            }
            else if (isStacked) {
                x = d.x;
                y = d.stackY;
                low = y - d.y;
                percentage = d.percentage;
            }
            // Optimize for scatter zooming
            if (!requireSorting) {
                isYInside = (y || 0) >= yMin && y <= yMax;
            }
            if (y !== null && x >= xMin && x <= xMax && isYInside) {
                clientX = xAxis.toPixels(x, true);
                if (sampling) {
                    if (typeof minI === 'undefined' ||
                        clientX === lastClientX) {
                        if (!isRange) {
                            low = y;
                        }
                        if (typeof maxI === 'undefined' ||
                            y > maxVal) {
                            maxVal = y;
                            maxI = i;
                        }
                        if (typeof minI === 'undefined' ||
                            low < minVal) {
                            minVal = low;
                            minI = i;
                        }
                    }
                    // Add points and reset
                    if (!compareX || clientX !== lastClientX) {
                        // maxI is number too:
                        if (typeof minI !== 'undefined') {
                            plotY =
                                yAxis.toPixels(maxVal, true);
                            yBottom =
                                yAxis.toPixels(minVal, true);
                            addKDPoint(clientX, plotY, maxI, percentage);
                            if (yBottom !== plotY) {
                                addKDPoint(clientX, yBottom, minI, percentage);
                            }
                        }
                        minI = maxI = void 0;
                        lastClientX = clientX;
                    }
                }
                else {
                    plotY = Math.ceil(yAxis.toPixels(y, true));
                    addKDPoint(clientX, plotY, i, percentage);
                }
            }
        }
        return !chartDestroyed;
    }
    /**
     * @private
     */
    var boostOptions = renderer.settings, doneProcessing = function () {
        fireEvent(_this, 'renderedCanvas');
        // Go back to prototype, ready to build
        delete _this.buildKDTree;
        _this.buildKDTree();
        if (boostOptions.debug.timeKDTree) {
            console.timeEnd('kd tree building'); // eslint-disable-line no-console
        }
    };
    // Loop over the points to build the k-d tree - skip this if
    // exporting
    if (!chart.renderer.forExport) {
        if (boostOptions.debug.timeKDTree) {
            console.time('kd tree building'); // eslint-disable-line no-console
        }
        eachAsync(isStacked ? this.data : (xData || rawData), processPoint, doneProcessing);
    }
}
/**
 * Used for treemap|heatmap.drawPoints
 * @private
 */
function wrapSeriesDrawPoints(proceed) {
    var enabled = true;
    if (this.chart.options && this.chart.options.boost) {
        enabled = typeof this.chart.options.boost.enabled === 'undefined' ?
            true :
            this.chart.options.boost.enabled;
    }
    if (!enabled || !this.boosted) {
        return proceed.call(this);
    }
    this.chart.boosted = true;
    // Make sure we have a valid OGL context
    var renderer = createAndAttachRenderer(this.chart, this);
    if (renderer) {
        allocateIfNotSeriesBoosting(renderer, this);
        renderer.pushSeries(this);
    }
    renderIfNotSeriesBoosting(this);
}
/**
 * Override a bunch of methods the same way. If the number of points is
 * below the threshold, run the original method. If not, check for a
 * canvas version or do nothing.
 *
 * Note that we're not overriding any of these for heatmaps.
 */
function wrapSeriesFunctions(seriesProto, seriesTypes, method) {
    /**
     * @private
     */
    function branch(proceed) {
        var letItPass = this.options.stacking &&
            (method === 'translate' || method === 'generatePoints');
        if (!this.boosted ||
            letItPass ||
            !boostEnabled(this.chart) ||
            this.type === 'heatmap' ||
            this.type === 'treemap' ||
            !BoostableMap[this.type] ||
            this.options.boostThreshold === 0) {
            proceed.call(this);
            // Run canvas version of method, like renderCanvas(), if it exists
        }
        else if (method === 'render' && this.renderCanvas) {
            this.renderCanvas();
        }
    }
    wrap(seriesProto, method, branch);
    // Special case for some types, when translate method is already wrapped
    if (method === 'translate') {
        [
            'column',
            'arearange',
            'columnrange',
            'heatmap',
            'treemap'
        ].forEach(function (type) {
            if (seriesTypes[type]) {
                wrap(seriesTypes[type].prototype, method, branch);
            }
        });
    }
}
/**
 * Do not compute extremes when min and max are set. If we use this in the
 * core, we can add the hook to hasExtremes to the methods directly.
 * @private
 */
function wrapSeriesGetExtremes(proceed) {
    if (this.boosted &&
        hasExtremes(this)) {
        return {};
    }
    return proceed.apply(this, [].slice.call(arguments, 1));
}
/**
 * If the series is a heatmap or treemap, or if the series is not boosting
 * do the default behaviour. Otherwise, process if the series has no
 * extremes.
 * @private
 */
function wrapSeriesProcessData(proceed) {
    var _this = this;
    var dataToMeasure = this.options.data;
    /**
     * Used twice in this function, first on this.options.data, the second
     * time it runs the check again after processedXData is built.
     * If the data is going to be grouped, the series shouldn't be boosted.
     * @private
     */
    var getSeriesBoosting = function (data) {
        var series = _this;
        // Check if will be grouped.
        if (series.forceCrop) {
            return false;
        }
        return (isChartSeriesBoosting(series.chart) ||
            ((data ? data.length : 0) >=
                (series.options.boostThreshold || Number.MAX_VALUE)));
    };
    if (boostEnabled(this.chart) && BoostableMap[this.type]) {
        var series = this;
        // If there are no extremes given in the options, we also need to
        // process the data to read the data extremes. If this is a heatmap,
        // do default behaviour.
        if (
        // First pass with options.data:
        !getSeriesBoosting(dataToMeasure) ||
            series.type === 'heatmap' ||
            series.type === 'treemap' ||
            // processedYData for the stack (#7481):
            series.options.stacking ||
            !hasExtremes(series, true)) {
            proceed.apply(series, [].slice.call(arguments, 1));
            dataToMeasure = series.processedXData;
        }
        // Set the isBoosting flag, second pass with processedXData to
        // see if we have zoomed.
        series.boosted = getSeriesBoosting(dataToMeasure);
        // Enter or exit boost mode
        if (series.boosted) {
            // Force turbo-mode:
            var firstPoint = void 0;
            if (series.options.data &&
                series.options.data.length) {
                firstPoint = series.getFirstValidPoint(series.options.data);
                if (!isNumber(firstPoint) && !isArray(firstPoint)) {
                    error(12, false, series.chart);
                }
            }
            enterBoost(series);
        }
        else {
            exitBoost(series);
        }
        // The series type is not boostable
    }
    else {
        proceed.apply(this, [].slice.call(arguments, 1));
    }
}
/**
 * Return a point instance from the k-d-tree
 * @private
 */
function wrapSeriesSearchPoint(proceed) {
    var result = proceed.apply(this, [].slice.call(arguments, 1));
    if (this.boost && result) {
        return this.boost.getPoint(result);
    }
    return result;
}
/* *
 *
 *  Default Export
 *
 * */
var BoostSeries = {
    compose: compose,
    destroyGraphics: destroyGraphics,
    getPoint: getPoint
};
export default BoostSeries;
