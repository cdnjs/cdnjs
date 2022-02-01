/**
 * @license Highcharts JS v9.3.3 (2022-02-01)
 * @module highcharts/modules/broken-axis
 * @requires highcharts
 *
 * (c) 2009-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import BrokenAxis from '../../Core/Axis/BrokenAxis.js';
var G = Highcharts;
// Compositions
BrokenAxis.compose(G.Axis, G.Series);
