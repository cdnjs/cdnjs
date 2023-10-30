/**
 * @license Highcharts Dashboards v (2023-10-30)
 * @module dashboards/datagrid
 * @requires dashboards
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import Globals from '../DataGrid/Globals.js';
import _DataGrid from '../DataGrid/DataGrid.js';
/* *
 *
 *  Namespace
 *
 * */
const G = Globals;
G.DataGrid = _DataGrid;
/* *
 *
 *  Classic Export
 *
 * */
if (!G.win.DataGrid) {
    G.win.DataGrid = G;
}
/* *
 *
 *  Default Export
 *
 * */
export default G;
