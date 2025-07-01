/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/series-on-point
 * @requires highcharts
 *
 * Series on point module
 *
 * (c) 2010-2025 Highsoft AS
 * Author: Rafal Sebestjanski and Piotr Madej
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import SeriesOnPointComposition from '../../Series/SeriesOnPointComposition.js';
const G = Highcharts;
SeriesOnPointComposition.compose(G.Series, G.Chart);
export default Highcharts;
