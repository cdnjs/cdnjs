/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
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
const G = Highcharts;
NetworkgraphSeries.compose(G.Chart);
