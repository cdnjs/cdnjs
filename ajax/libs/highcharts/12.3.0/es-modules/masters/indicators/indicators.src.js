/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/indicators
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Pawel Fus, Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import '../../Stock/Indicators/SMA/SMAIndicator.js';
import '../../Stock/Indicators/EMA/EMAIndicator.js';
import MultipleLinesComposition from '../../Stock/Indicators/MultipleLinesComposition.js';
const G = Highcharts;
G.MultipleLinesComposition =
    G.MultipleLinesComposition || MultipleLinesComposition;
export default Highcharts;
