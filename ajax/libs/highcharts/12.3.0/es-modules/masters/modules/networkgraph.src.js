/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/networkgraph
 * @requires highcharts
 *
 * Force directed graph module
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import NetworkgraphSeries from '../../Series/Networkgraph/NetworkgraphSeries.js';
const G = Highcharts;
NetworkgraphSeries.compose(G.Chart);
export default Highcharts;
