Ext.Loader.setConfig({ enabled: true });

Ext.require([
    'Ext.grid.*',
    'Ext.data.*'
]);

Ext.define('Task', {
    extend: 'Ext.data.Model',
    idProperty: 'taskId',
    fields: [
        {name: 'projectId', type: 'int'},
        {name: 'project', type: 'string'},
        {name: 'taskId', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'estHours', type: 'float'},
        {name: 'rate', type: 'float'},
        {name: 'cost', type: 'float'},
        {name: 'due', type: 'date', dateFormat:'m/d/Y'}
    ]
});

Ext.onReady(function(){
    var store = Ext.create('Ext.data.Store', {
        model: 'Task',
        autoLoad: true,
        remoteSort: true,
        proxy: {
            type: 'ajax',
            url: 'remote-group-summary-grid.php',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        },
        sorters: {property: 'due', direction: 'ASC'},
        groupField: 'project'
    });
    
    var grid = Ext.create('Ext.grid.Panel', {
        width: 800,
        height: 450,
        title: 'Sponsored Projects',
        renderTo: Ext.getBody(),
        store: store,
        viewConfig: {
            stripeRows: false
        },
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                text: 'Show Summary',
                pressed: true,
                enableToggle: true,
                toggleHandler: function(btn, pressed){
                    var view = grid.getView();
                    view.getFeature('group').toggleSummaryRow(pressed);
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
            flex: 1,
            sortable: true,
            tdCls: 'task',
            dataIndex: 'description',
            hideable: false,
            summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(' + value + ' Tasks)' : '(1 Task)');
            }
        }, {
            hideable: false,
            header: 'Project',
            width: 20,
            sortable: true,
            dataIndex: 'project'
        }, {
            header: 'Due Date',
            width: 120,
            sortable: true,
            dataIndex: 'due',
            renderer: Ext.util.Format.dateRenderer('m/d/Y'),
            summaryRenderer: Ext.util.Format.dateRenderer('m/d/Y')
        }, {
            header: 'Estimate',
            width: 95,
            sortable: true,
            dataIndex: 'estHours',
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                return value + ' hours';
            },
            summaryRenderer: function(value, summaryData, dataIndex) {
                return value + ' hours';
            }
        }, {
            header: 'Rate',
            width: 95,
            sortable: true,
            renderer: Ext.util.Format.usMoney,
            summaryRenderer: Ext.util.Format.usMoney,
            dataIndex: 'rate',
            summaryType: 'average'
        }, {
            id: 'cost',
            header: 'Cost',
            width: 95,
            sortable: false,
            groupable: false,
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                return Ext.util.Format.usMoney(record.get('estHours') * record.get('rate'));
            },
            dataIndex: 'cost',
            summaryRenderer: Ext.util.Format.usMoney
        }]
    });
});
