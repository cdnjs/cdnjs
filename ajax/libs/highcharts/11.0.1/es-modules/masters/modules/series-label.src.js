/**
 * @license Highcharts JS v11.0.1 (2023-05-08)
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
const G = Highcharts;
SeriesLabel.compose(G.Chart, G.SVGRenderer);
