/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 * @module highcharts/modules/funnel
 * @requires highcharts
 *
 * Highcharts funnel module
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import FunnelSeries from '../../Series/Funnel/FunnelSeries.js';
import '../../Series/Pyramid/PyramidSeries.js';
const G = Highcharts;
FunnelSeries.compose(G.Chart);
