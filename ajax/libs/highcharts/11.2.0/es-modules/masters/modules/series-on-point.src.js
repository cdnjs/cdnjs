/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
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
const G = Highcharts;
SeriesOnPointComposition.compose(G.Series, G.Chart);
