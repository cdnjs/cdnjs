/**
 * @license Highcharts JS v10.2.1 (2022-08-29)
 * @module highcharts/modules/series-on-point
 * @requires highcharts
 *
 * Series on point module
 *
 * (c) 2010-2022 Highsoft AS
 * Author: Rafal Sebestjanski and Piotr Madej
 *
 * License: www.highcharts.com/license
 */
'use strict';
import SeriesOnPointComposition from '../../Series/SeriesOnPointComposition.js';
var G = Highcharts;
SeriesOnPointComposition.compose(G.Series, G.Chart);
