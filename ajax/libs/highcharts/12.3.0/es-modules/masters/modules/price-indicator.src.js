/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/price-indicator
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Advanced Highcharts Stock tools
 *
 * (c) 2010-2025 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import PriceIndication from '../../Extensions/PriceIndication.js';
const G = Highcharts;
PriceIndication.compose(G.Series);
export default Highcharts;
