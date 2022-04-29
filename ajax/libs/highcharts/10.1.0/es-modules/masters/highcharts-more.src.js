/**
 * @license Highcharts JS v10.1.0 (2022-04-29)
 * @module highcharts/highcharts-more
 * @requires highcharts
 *
 * (c) 2009-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../Core/Globals.js';
var G = Highcharts;
import '../Extensions/Pane.js';
import RadialAxis from '../Core/Axis/RadialAxis.js';
RadialAxis.compose(G.Axis, G.Tick);
import '../Series/AreaRange/AreaRangeSeries.js';
import '../Series/AreaSplineRange/AreaSplineRangeSeries.js';
import '../Series/BoxPlot/BoxPlotSeries.js';
import BubbleSeries from '../Series/Bubble/BubbleSeries.js';
BubbleSeries.compose(G.Chart, G.Legend, G.Series);
import '../Series/ColumnRange/ColumnRangeSeries.js';
import '../Series/ColumnPyramid/ColumnPyramidSeries.js';
import '../Series/ErrorBar/ErrorBarSeries.js';
import '../Series/Gauge/GaugeSeries.js';
import '../Series/PackedBubble/PackedBubbleSeries.js';
import '../Series/Polygon/PolygonSeries.js';
import '../Series/Waterfall/WaterfallSeries.js';
import '../Extensions/Polar.js';
