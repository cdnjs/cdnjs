/**
 * This example shows how to setup a one way drag and drop from a Grid to a Panel.
 */
Ext.define('KitchenSink.view.dd.GridToForm', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ext.grid.*',
        'Ext.form.*',
        'Ext.layout.container.HBox',
        'Ext.dd.DropTarget',
        'KitchenSink.model.dd.Simple'
    ],    
    xtype: 'dd-grid-to-form',
    
    //<example>
    exampleTitle: 'Drag and Drop from a Data Grid to a Form Panel',
    otherContent: [{
        type: 'Model',
        path: 'app/model/dd/Simple.js'
    }],
    //</example>
    
    width: 650,
    height: 300,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bodyPadding: 5,
    myData: [
        { name : 'Record 0', column1 : '0', column2 : '0' },
        { name : 'Record 1', column1 : '1', column2 : '1' },
        { name : 'Record 2', column1 : '2', column2 : '2' },
        { name : 'Record 3', column1 : '3', column2 : '3' },
        { name : 'Record 4', column1 : '4', column2 : '4' },
        { name : 'Record 5', column1 : '5', column2 : '5' },
        { name : 'Record 6', column1 : '6', column2 : '6' },
        { name : 'Record 7', column1 : '7', column2 : '7' },
        { name : 'Record 8', column1 : '8', column2 : '8' },
        { name : 'Record 9', column1 : '9', column2 : '9' }
    ],
    
    initComponent: function(){
        this.items = [{
            xtype: 'grid',
            viewConfig: {
                plugins: {
                    ddGroup: 'grid-to-form',
                    ptype: 'gridviewdragdrop',
                    enableDrop: false
                }
            },
            store: new Ext.data.Store({
                model: KitchenSink.model.dd.Simple,
                data: this.myData
            }),
            columns: [{
                flex:  1,  
                header: 'Record Name', 
                sortable: true, 
                dataIndex: 'name'
            }, {
                header: 'column1', 
                width: 80, 
                sortable: true, 
                dataIndex: 'column1'
            }, {
                header: 'column2', 
                width: 80, 
                sortable: true, 
                dataIndex: 'column2'
            }],
            enableDragDrop: true,
            width: 325,
            margin: '0 5 0 0',
            title: 'Data Grid',
            tools: [{
                type: 'refresh',
                tooltip: 'Reset example',
                scope: this,
                handler: this.onResetClick
            }],
            selModel: new Ext.selection.RowModel({
                singleSelect : true
            })
        }, {
            xtype: 'form',
            flex: 1,
            title: 'Generic Form Panel',
            bodyPadding: 10,
            labelWidth: 100,
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Record Name',
                name: 'name'
            }, {
                fieldLabel: 'Column 1',
                name: 'column1'
            }, {
                fieldLabel: 'Column 2',
                name: 'column2'
            }]
        }];

        this.callParent();
    },
    
    onResetClick: function(){
        this.down('grid').getStore().loadData(this.myData);
        this.down('form').getForm().reset();
    },
    
    onBoxReady: function(){
        this.callParent(arguments);
        var form = this.down('form'),
            body = form.body;
            
        this.formPanelDropTarget = new Ext.dd.DropTarget(body, {
            ddGroup: 'grid-to-form',
            notifyEnter: function(ddSource, e, data) {
                //Add some flare to invite drop.
                body.stopAnimation();
                body.highlight();
            },
            notifyDrop: function(ddSource, e, data) {
                // Reference the record (single selection) for readability
                var selectedRecord = ddSource.dragData.records[0];

                // Load the record into the form
                form.getForm().loadRecord(selectedRecord);

                // Delete record from the source store.  not really required.
                ddSource.view.store.remove(selectedRecord);
                return true;
            }
        });
    },
    
    beforeDestroy: function(){
        var target = this.formPanelDropTarget;
        if (target) {
            target.unreg();
            this.formPanelDropTarget = null;
        }
        this.callParent();
    }
});
