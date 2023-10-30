/**
 * @license Highcharts Dashboards v (2023-10-30)
 * @module dashboards/modules/dashboards-plugin
 * @requires dashboards
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 * */
'use strict';
import DataGridPlugin from '../../Dashboards/Plugins/DataGridPlugin.js';
import Globals from '../../Dashboards/Globals.js';
import HighchartsPlugin from '../../Dashboards/Plugins/HighchartsPlugin.js';
/* *
 *
 *  Namespaces
 *
 * */
const G = Globals;
G.DataGridPlugin = DataGridPlugin;
G.HighchartsPlugin = HighchartsPlugin;
if (G.win.Highcharts) {
    HighchartsPlugin.custom.connectHighcharts(G.win.Highcharts);
    G.PluginHandler.addPlugin(HighchartsPlugin);
}
if (G.win.DataGrid) {
    DataGridPlugin.custom.connectDataGrid(G.win.DataGrid.DataGrid);
    G.PluginHandler.addPlugin(DataGridPlugin);
}
/* *
 *
 *  Default Export
 *
 * */
export default G;
