/**
 * @license Highcharts Gantt JS v9.1.0 (2021-05-04)
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
import '../../Core/Scrollbar.js';
import '../../Extensions/RangeSelector.js';
import '../../Core/Navigator.js';
Highcharts.GanttChart = GanttChart;
Highcharts.ganttChart = GanttChart.ganttChart;
