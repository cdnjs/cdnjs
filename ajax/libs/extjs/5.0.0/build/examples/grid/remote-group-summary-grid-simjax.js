Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('Ext.ux', '../ux');

Ext.require([
    'Ext.ux.ajax.SimManager'
]);

/*
 * Setup our faux Ajax response "simlet".
 */
function initAjaxSim () {
    Ext.ux.ajax.SimManager.register({
        'remote-group-summary-grid.php' : {
            stype: 'json',

            data: [
                {projectId: 100, project: 'Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estHours: 6, rate: 150, due:'06/24/2007'},
                {projectId: 100, project: 'Forms: Field Anchoring', taskId: 113, description: 'Implement AnchorLayout', estHours: 4, rate: 150, due:'06/25/2007'},
                {projectId: 100, project: 'Forms: Field Anchoring', taskId: 114, description: 'Add support for multiple types of anchors', estHours: 4, rate: 150, due:'06/27/2007'},
                {projectId: 100, project: 'Forms: Field Anchoring', taskId: 115, description: 'Testing and debugging', estHours: 8, rate: 0, due:'06/29/2007'},
                {projectId: 101, project: 'Grid: Single-level Grouping', taskId: 101, description: 'Add required rendering "hooks" to GridView', estHours: 6, rate: 100, due:'07/01/2007'},
                {projectId: 101, project: 'Grid: Single-level Grouping', taskId: 102, description: 'Extend GridView and override rendering functions', estHours: 6, rate: 100, due:'07/03/2007'},
                {projectId: 101, project: 'Grid: Single-level Grouping', taskId: 103, description: 'Extend Store with grouping functionality', estHours: 4, rate: 100, due:'07/04/2007'},
                {projectId: 101, project: 'Grid: Single-level Grouping', taskId: 121, description: 'Default CSS Styling', estHours: 2, rate: 100, due:'07/05/2007'},
                {projectId: 101, project: 'Grid: Single-level Grouping', taskId: 104, description: 'Testing and debugging', estHours: 6, rate: 100, due:'07/06/2007'},
                {projectId: 102, project: 'Grid: Summary Rows', taskId: 105, description: 'Ext Grid plugin integration', estHours: 4, rate: 125, due:'07/01/2007'},
                {projectId: 102, project: 'Grid: Summary Rows', taskId: 106, description: 'Summary creation during rendering phase', estHours: 4, rate: 125, due:'07/02/2007'},
                {projectId: 102, project: 'Grid: Summary Rows', taskId: 107, description: 'Dynamic summary updates in editor grids', estHours: 6, rate: 125, due:'07/05/2007'},
                {projectId: 102, project: 'Grid: Summary Rows', taskId: 108, description: 'Remote summary integration', estHours: 4, rate: 125, due:'07/05/2007'},
                {projectId: 102, project: 'Grid: Summary Rows', taskId: 109, description: 'Summary renderers and calculators', estHours: 4, rate: 125, due:'07/06/2007'},
                {projectId: 102, project: 'Grid: Summary Rows', taskId: 110, description: 'Integrate summaries with GroupingView', estHours: 10, rate: 125, due:'07/11/2007'},
                {projectId: 102, project: 'Grid: Summary Rows', taskId: 111, description: 'Testing and debugging', estHours: 8, rate: 125, due:'07/15/2007'}
            ],

            getGroupSummary: function (groupField, rows, ctx) {
                var ret = Ext.apply({}, rows[0]);
                ret.cost = 0;
                ret.estHours = 0;
                Ext.Array.forEach(rows, function (row) {
                    ret.estHours += row.estHours;
                    ret.cost += row.estHours * row.rate;
                });
                return ret;
            }
        }
    });
}

Ext.onReady(initAjaxSim);
