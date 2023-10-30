/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 * @module highcharts/modules/variwide
 * @requires highcharts
 *
 * Highcharts variwide module
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import VariwideSeries from '../../Series/Variwide/VariwideSeries.js';
const G = Highcharts;
VariwideSeries.compose(G.Axis, G.Tick);
