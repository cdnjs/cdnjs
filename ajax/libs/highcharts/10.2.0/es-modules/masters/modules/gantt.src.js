/**
 * @license Highcharts Gantt JS v10.2.0 (2022-07-05)
 * @module highcharts/modules/gantt
 * @requires highcharts
 *
 * Gantt series
 *
 * (c) 2016-2021 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import '../../Series/XRange/XRangeSeries.js';
import '../../Series/Gantt/GanttSeries.js';
import GanttChart from '../../Core/Chart/GanttChart.js';
import Scrollbar from '../../Core/Scrollbar.js';
import '../../Extensions/RangeSelector.js';
import '../../Core/Navigator.js';
var G = Highcharts;
// Classes
G.Scrollbar = Scrollbar;
G.GanttChart = GanttChart;
G.ganttChart = GanttChart.ganttChart;
// Compositions
Scrollbar.compose(G.Axis);
