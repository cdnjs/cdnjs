/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
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
import DownloadURL from '../../Extensions/DownloadURL.js';
import ExportData from '../../Extensions/ExportData/ExportData.js';
const G = Highcharts;
// Compatibility
G.dataURLtoBlob = DownloadURL.dataURLtoBlob;
G.downloadURL = DownloadURL.downloadURL;
// Compose
ExportData.compose(G.Chart);
