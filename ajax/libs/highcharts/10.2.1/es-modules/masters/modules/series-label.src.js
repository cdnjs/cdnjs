/**
 * @license Highcharts JS v10.2.1 (2022-08-29)
 * @module highcharts/modules/series-label
 * @requires highcharts
 *
 * (c) 2009-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import SeriesLabel from '../../Extensions/SeriesLabel/SeriesLabel.js';
var G = Highcharts;
SeriesLabel.compose(G.Chart, G.SVGRenderer);
