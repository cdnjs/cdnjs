/**
 * @license Highcharts JS v10.3.1 (2022-10-31)
 * @module highcharts/modules/export-data
 * @requires highcharts
 * @requires highcharts/modules/exporting
 *
 * Exporting module
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
var G = Highcharts;
import ExportData from '../../Extensions/ExportData/ExportData.js';
ExportData.compose(G.Chart);
