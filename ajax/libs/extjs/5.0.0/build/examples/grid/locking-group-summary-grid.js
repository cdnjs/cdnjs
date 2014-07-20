Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.form.field.Number',
    'Ext.form.field.Date',
    'Ext.tip.QuickTipManager',
    'Ext.layout.container.Fit'
]);

Ext.define('Task', {
    extend: 'Ext.data.Model',
    idProperty: 'taskId',
    fields: [
        {name: 'projectId', type: 'int'},
        {name: 'project', type: 'string'},
        {name: 'taskId', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'estimate', type: 'float'},
        {name: 'rate', type: 'float'},
        {name: 'due', type: 'date', dateFormat:'m/d/Y'}
    ]
});

var data = [
    {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estimate: 6, rate: 150, due:'06/24/2007'},
    {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 113, description: 'Implement AnchorLayout', estimate: 4, rate: 150, due:'06/25/2007'},
    {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 114, description: 'Add support for multiple types of anchors', estimate: 4, rate: 150, due:'06/27/2007'},
    {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 115, description: 'Testing and debugging', estimate: 8, rate: 0, due:'06/29/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 101, description: 'Add required rendering "hooks" to GridView', estimate: 6, rate: 100, due:'07/01/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 102, description: 'Extend GridView and override rendering functions', estimate: 6, rate: 100, due:'07/03/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 103, description: 'Extend Store with grouping functionality', estimate: 4, rate: 100, due:'07/04/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 121, description: 'Default CSS Styling', estimate: 2, rate: 100, due:'07/05/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 104, description: 'Testing and debugging', estimate: 6, rate: 100, due:'07/06/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 105, description: 'Ext Grid plugin integration', estimate: 4, rate: 125, due:'07/01/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 106, description: 'Summary creation during rendering phase', estimate: 4, rate: 125, due:'07/02/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 107, description: 'Dynamic summary updates in editor grids', estimate: 6, rate: 125, due:'07/05/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 108, description: 'Remote summary integration', estimate: 4, rate: 125, due:'07/05/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 109, description: 'Summary renderers and calculators', estimate: 4, rate: 125, due:'07/06/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 110, description: 'Integrate summaries with GroupingView', estimate: 10, rate: 125, due:'07/11/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 111, description: 'Testing and debugging', estimate: 8, rate: 125, due:'07/15/2007'}
];

Ext.onReady(function(){
    
    Ext.tip.QuickTipManager.init();
    
    var store = Ext.create('Ext.data.Store', {
        model: 'Task',
        data: data,
        sorters: {property: 'due', direction: 'ASC'},
        groupField: 'project'
    });

    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });
    var showSummary = true;
    var grid = Ext.create('Ext.grid.Panel', {
        width: 800,
        height: 450,
        frame: true,
        title: 'Sponsored Projects',
        iconCls: 'icon-grid',
        renderTo: document.body,
        store: store,
        plugins: [cellEditing],
        selModel: {
            selType: 'cellmodel'
        },
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                tooltip: 'Toggle the visibility of the summary row',
                text: 'Toggle Summary',
                enableToggle: true,
                pressed: true,
                handler: function(){
                    showSummary = !showSummary;
                    var view = grid.lockedGrid.getView();
                    view.getFeature('group').toggleSummaryRow(showSummary);
                    view.refresh();
                    view = grid.normalGrid.getView();
                    view.getFeature('group').toggleSummaryRow(showSummary);
                    view.refresh();
                }
            }]
        }],
        features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        columns: [{
            text: 'Task',
            width: 300,
            locked: true,
            tdCls: 'task',
            sortable: true,
            dataIndex: 'description',
            hideable: false,
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(' + value + ' Tasks)' : '(1 Task)');
            }
        }, {
            header: 'Project',
            width: 180,
            sortable: true,
            dataIndex: 'project'
        }, {
            header: 'Due Date',
            width: 130,
            sortable: true,
            dataIndex: 'due',
            summaryType: 'max',
            renderer: Ext.util.Format.dateRenderer('m/d/Y'),
            summaryRenderer: Ext.util.Format.dateRenderer('m/d/Y'),
            field: {
                xtype: 'datefield'
            }
        }, {
            header: 'Estimate',
            width: 130,
            sortable: true,
            dataIndex: 'estimate',
            summaryType: 'sum',
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                return value + ' hours';
            },
            summaryRenderer: function(value, summaryData, dataIndex) {
                return value + ' hours';
            },
            field: {
                xtype: 'numberfield'
            }
        }, {
            header: 'Rate',
            width: 130,
            sortable: true,
            renderer: Ext.util.Format.usMoney,
            summaryRenderer: Ext.util.Format.usMoney,
            dataIndex: 'rate',
            summaryType: 'average',
            field: {
                xtype: 'numberfield'
            }
        }, {
            header: 'Cost',
            width: 130,
            sortable: false,
            groupable: false,
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                return Ext.util.Format.usMoney(record.get('estimate') * record.get('rate'));
            },
            summaryType: function(records, values) {
                var i = 0,
                    length = records.length,
                    total = 0,
                    record;

                for (; i < length; ++i) {
                    record = records[i];
                    total += record.get('estimate') * record.get('rate');
                }
                return total;
            },
            summaryRenderer: Ext.util.Format.usMoney
        }]
    });
    
});
