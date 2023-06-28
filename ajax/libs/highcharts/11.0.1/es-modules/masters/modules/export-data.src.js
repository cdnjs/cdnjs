/**
 * @license Highcharts JS v11.0.1 (2023-05-08)
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
const G = Highcharts;
import ExportData from '../../Extensions/ExportData/ExportData.js';
ExportData.compose(G.Chart);
