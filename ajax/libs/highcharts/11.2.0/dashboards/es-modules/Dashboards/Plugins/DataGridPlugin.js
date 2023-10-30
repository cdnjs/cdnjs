/* *
 *
 *  (c) 2009-2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Karol Kolodziej
 *
 * */
'use strict';
import DataGridComponent from './DataGridComponent.js';
/* *
 *
 *  Functions
 *
 * */
/**
 * Connects DataGrid with the Dashboard plugin.
 *
 * @param {Dashboards.DataGrid} dataGrid DataGrid core to connect.
 */
function connectDataGrid(DataGridClass) {
    DataGridComponent.DataGridConstructor = DataGridClass;
}
/**
 * Callback function of the Dashboard plugin.
 *
 * @param {Dashboards.PluginHandler.Event} e
 * Plugin context provided by the Dashboard.
 */
function onRegister(e) {
    const { ComponentRegistry } = e;
    ComponentRegistry.registerComponent('DataGrid', DataGridComponent);
}
/**
 * Callback function of the Dashboard plugin.
 *
 * @param {Dashboard.PluginHandler.Event} e Plugin context provided by the Dashboard.
 */
function onUnregister(e) {
    const { Sync } = e;
}
/* *
 *
 *  Default Export
 *
 * */
const DataGridCustom = {
    connectDataGrid
};
const DataGridPlugin = {
    custom: DataGridCustom,
    name: 'DataGrid.DashboardsPlugin',
    onRegister,
    onUnregister
};
export default DataGridPlugin;
