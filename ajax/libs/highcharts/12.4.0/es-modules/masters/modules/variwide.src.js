/**
 * @license Highcharts JS v12.4.0 (2025-09-04)
 * @module highcharts/modules/variwide
 * @requires highcharts
 *
 * Highcharts variwide module
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import VariwideSeries from '../../Series/Variwide/VariwideSeries.js';
const G = Highcharts;
VariwideSeries.compose(G.Axis, G.Tick);
export default Highcharts;
