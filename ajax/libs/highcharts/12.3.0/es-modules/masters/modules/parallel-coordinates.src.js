/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/parallel-coordinates
 * @requires highcharts
 *
 * Support for parallel coordinates in Highcharts
 *
 * (c) 2010-2025 Pawel Fus
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import ParallelCoordinates from '../../Extensions/ParallelCoordinates/ParallelCoordinates.js';
const G = Highcharts;
ParallelCoordinates.compose(G.Axis, G.Chart, G.defaultOptions, G.Series);
export default Highcharts;
