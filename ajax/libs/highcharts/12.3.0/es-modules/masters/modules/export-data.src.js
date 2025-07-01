/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/export-data
 * @requires highcharts
 * @requires highcharts/modules/exporting
 *
 * Export data module
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import DownloadURL from '../../Extensions/DownloadURL.js';
import ExportData from '../../Extensions/ExportData/ExportData.js';
const G = Highcharts;
// Compatibility
G.dataURLtoBlob = G.dataURLtoBlob || DownloadURL.dataURLtoBlob;
G.downloadURL = G.downloadURL || DownloadURL.downloadURL;
// Compose
ExportData.compose(G.Chart, G.Exporting, G.Series);
export default Highcharts;
