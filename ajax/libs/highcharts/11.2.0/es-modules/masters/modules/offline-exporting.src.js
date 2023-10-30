/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
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
import DownloadURL from '../../Extensions/DownloadURL.js';
import OfflineExporting from '../../Extensions/OfflineExporting/OfflineExporting.js';
const G = Highcharts;
// Compatibility
G.dataURLtoBlob = DownloadURL.dataURLtoBlob;
G.downloadSVGLocal = OfflineExporting.downloadSVGLocal;
G.downloadURL = DownloadURL.downloadURL;
// Compose
OfflineExporting.compose(G.Chart);
