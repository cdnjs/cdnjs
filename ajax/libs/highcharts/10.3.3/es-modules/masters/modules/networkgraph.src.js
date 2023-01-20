/**
 * @license Highcharts JS v10.3.3 (2023-01-20)
 * @module highcharts/modules/networkgraph
 * @requires highcharts
 *
 * Force directed graph module
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import NetworkgraphSeries from '../../Series/Networkgraph/NetworkgraphSeries.js';
var G = Highcharts;
NetworkgraphSeries.compose(G.Chart);
