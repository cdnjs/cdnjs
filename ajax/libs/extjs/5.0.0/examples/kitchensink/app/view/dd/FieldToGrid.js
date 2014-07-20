/**
 * This example assumes prior knowledge of using a GridPanel.
 *
 * This illustrates how a DragZone can manage an arbitrary number of drag sources, and how
 * a DropZone can manage an arbitrary number of targets.
 *
 * Fields are editable. Drag the fields into the grid using the label as the handle.
 */
Ext.define('KitchenSink.view.dd.FieldToGrid', {
    extend: 'Ext.container.Container',
    
    requires: [
        'Ext.ux.dd.CellFieldDropZone',
        'Ext.ux.dd.PanelFieldDragZone',
        'Ext.grid.*',
        'Ext.form.*',
        'KitchenSink.model.Company',
        'Ext.layout.container.VBox'
    ],    
    xtype: 'dd-field-to-grid',
    
    //<example>
    exampleTitle: 'Using a GridPanel as a DropZone managing each grid cell as a target',
    otherContent: [{
        type: 'Model',
        path: 'app/model/Company.js'
    },{
        type: 'Data',
        path: 'app/data/DataSets.js'
    }],
    themes: {
        classic: {
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85
        },
        neptune: {
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115
        }
    },
    //</example>
    
    width: 700,
    height: 450,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    initComponent: function(){
        var store = new Ext.data.Store({
            model: KitchenSink.model.Company,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'array'
                }
            },
            data: KitchenSink.data.DataSets.company
        }), group = this.id + 'ddGroup';
        
        Ext.apply(this, {
            items: [{
                flex: 1,
                xtype: 'gridpanel',
                plugins: new Ext.ux.dd.CellFieldDropZone({
                    ddGroup: group,
                    onCellDrop: function(field){
                        var sorter = store.sorters.first();
                        if (sorter && sorter.property == field) {
                            store.sort();
                        }
                    }
                }),
                store: store,
                columns: [{
                    id:'company',
                    header: 'Company', 
                    sortable: true, 
                    dataIndex: 'name', 
                    flex: 1
                }, {
                    header: 'Price', 
                    width: 75, 
                    sortable: true, 
                    formatter: 'usMoney',
                    dataIndex: 'price'
                }, {
                    header: 'Change', 
                    width: 80, 
                    sortable: true, 
                    renderer: this.changeRenderer, 
                    dataIndex: 'change'
                }, {
                    header: '% Change', 
                    width: this.themeInfo.percentChangeColumnWidth, 
                    sortable: true, 
                    renderer: this.pctChangeRenderer, 
                    dataIndex: 'pctChange'
                }, {
                    header: 'Last Updated', 
                    width: this.themeInfo.lastUpdatedColumnWidth, 
                    sortable: true,
                    formatter: 'date("m/d/Y")',
                    dataIndex: 'lastChange'
                }],
                stripeRows: true,
                title: 'Company Grid'
            }, {
                frame: true,
                margin: '10 0 0 0',
                bodyPadding: 5,
                plugins: new Ext.ux.dd.PanelFieldDragZone({
                    ddGroup: group
                }),
                defaults: {
                    labelWidth: 150
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Drag this text',
                    value: 'test'
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Drag this number',
                    value: '1.2'
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Drag this date',
                    value: new Date()
                }]
            }]
        });
        this.callParent();
    },
    
    changeRenderer: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },
    
    pctChangeRenderer: function(val){
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }
});
