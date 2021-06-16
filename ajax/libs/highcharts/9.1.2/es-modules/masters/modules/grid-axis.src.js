/**
 * @license Highcharts Gantt JS v9.1.2 (2021-06-16)
 * @module highcharts/modules/grid-axis
 * @requires highcharts
 *
 * GridAxis
 *
 * (c) 2016-2021 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import GridAxis from '../../Core/Axis/GridAxis.js';
var G = Highcharts;
// Compositions
GridAxis.compose(G.Axis, G.Chart, G.Tick);
