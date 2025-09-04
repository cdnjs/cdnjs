/**
 * @license Highcharts Gantt JS v12.4.0 (2025-09-04)
 * @module highcharts/modules/static-scale
 * @requires highcharts
 *
 * StaticScale
 *
 * (c) 2016-2025 Torstein Honsi, Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import StaticScale from '../../Extensions/StaticScale.js';
const G = Highcharts;
StaticScale.compose(G.Axis, G.Chart);
export default Highcharts;
