/**
 * @license Highcharts JS v11.3.0 (2024-01-10)
 * @module highcharts/modules/broken-axis
 * @requires highcharts
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import BrokenAxis from '../../Core/Axis/BrokenAxis.js';
const G = Highcharts;
// Compositions
BrokenAxis.compose(G.Axis, G.Series);
