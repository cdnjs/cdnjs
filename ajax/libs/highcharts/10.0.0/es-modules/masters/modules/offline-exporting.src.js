/**
 * @license Highcharts JS v10.0.0 (2022-03-07)
 * @module highcharts/modules/offline-exporting
 * @requires highcharts
 * @requires highcharts/modules/exporting
 *
 * Client side exporting module
 *
 * (c) 2015-2021 Torstein Honsi / Oystein Moseng
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import OfflineExporting from '../../Extensions/OfflineExporting/OfflineExporting.js';
var G = Highcharts;
// Compatibility
G.downloadSVGLocal = OfflineExporting.downloadSVGLocal;
// Compose
OfflineExporting.compose(G.Chart);
