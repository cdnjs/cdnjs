/**
 * This example shows how to setup two way drag and drop from one GridPanel to another.
 */
Ext.define('KitchenSink.view.dd.GridToGrid', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ext.grid.*',
        'Ext.layout.container.HBox',
        'KitchenSink.model.dd.Simple'
    ],    
    xtype: 'dd-grid-to-grid',
    
    //<example>
    exampleTitle: 'Drag and Drop from Grid to Grid Example',
    otherContent: [{
        type: 'Model',
        path: 'app/model/dd/Simple.js'
    }],
    //</example>
    
    width: 650,
    height: 300,
    layout: {
        type: 'hbox',
        align: 'stretch',
        padding: 5
    },
    
    myData: [
        { name : 'Rec 0', column1 : '0', column2 : '0' },
        { name : 'Rec 1', column1 : '1', column2 : '1' },
        { name : 'Rec 2', column1 : '2', column2 : '2' },
        { name : 'Rec 3', column1 : '3', column2 : '3' },
        { name : 'Rec 4', column1 : '4', column2 : '4' },
        { name : 'Rec 5', column1 : '5', column2 : '5' },
        { name : 'Rec 6', column1 : '6', column2 : '6' },
        { name : 'Rec 7', column1 : '7', column2 : '7' },
        { name : 'Rec 8', column1 : '8', column2 : '8' },
        { name : 'Rec 9', column1 : '9', column2 : '9' }
    ],
    
    initComponent: function(){
        var group1 = this.id + 'group1',
            group2 = this.id + 'group2',
            columns = [{
                text: 'Record Name', 
                flex: 1, 
                sortable: true, 
                dataIndex: 'name'
            }, {
                text: 'column1', 
                width: 80, 
                sortable: true, 
                dataIndex: 'column1'
            }, {
                text: 'column2', 
                width: 80, 
                sortable: true, 
                dataIndex: 'column2'
            }];
            
        this.items = [{
            itemId: 'grid1',
            flex: 1,
            xtype: 'grid',
            multiSelect: true,
                viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: group1,
                    dropGroup: group2
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                        Ext.example.msg('Drag from right to left', 'Dropped ' + data.records[0].get('name') + dropOn);
                    }
                }
            },
            store: new Ext.data.Store({
                model: KitchenSink.model.dd.Simple,
                data: this.myData
            }),
            columns: columns,
            title: 'First Grid',
            tools: [{
                type: 'refresh',
                tooltip: 'Reset both grids',
                scope: this,
                handler: this.onResetClick
            }],
            margin: '0 5 0 0'
        }, {
            itemId: 'grid2',
            flex: 1,
            xtype: 'grid',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: group2,
                    dropGroup: group1
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                        Ext.example.msg('Drag from left to right', 'Dropped ' + data.records[0].get('name') + dropOn);
                    }
                }
            },
            store: new Ext.data.Store({
                model: KitchenSink.model.dd.Simple
            }),
            columns: columns,
            stripeRows: true,
            title: 'Second Grid'
        }];

        this.callParent();
    },
    
    onResetClick: function(){
        //refresh source grid
        this.down('#grid1').getStore().loadData(this.myData);

        //purge destination grid
        this.down('#grid2').getStore().removeAll();
    }
});
