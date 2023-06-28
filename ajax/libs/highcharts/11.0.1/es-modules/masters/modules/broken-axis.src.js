/**
 * @license Highcharts JS v11.0.1 (2023-05-08)
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
const G = Highcharts;
// Compositions
BrokenAxis.compose(G.Axis, G.Series);
