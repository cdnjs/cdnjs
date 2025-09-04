/**
 * @license Highcharts Gantt JS v12.4.0 (2025-09-04)
 * @module highcharts/modules/current-date-indicator
 * @requires highcharts
 *
 * CurrentDateIndicator
 *
 * (c) 2010-2025 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import CurrentDateIndication from '../../Extensions/CurrentDateIndication.js';
const G = Highcharts;
CurrentDateIndication.compose(G.Axis, G.PlotLineOrBand);
export default Highcharts;
