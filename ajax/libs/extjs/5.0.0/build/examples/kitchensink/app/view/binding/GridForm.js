/**
 * This example demonstrates being able to change the binding at runtime. The company
 * binds to the form and as each record is selected the form is populated. As the form
 * values change, the record is updated.
 */
Ext.define('KitchenSink.view.binding.GridForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-gridform',
    
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.form.Panel',
        'Ext.form.field.Display',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'KitchenSink.store.Companies'
    ],
    
    //<example>
    themes: {
        classic: {
            green: 'green',
            red: 'red'
        },
        neptune: {
            green: '#73b51e',
            red: '#cf4c35'
        }
    },
    //</example>
    
    title: 'All Companies',
    width: 1000,
    height: 400,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    defaultListenerScope: true,
    viewModel: {
        data: {
            theCompany: {
                name: 'Choose a company'
            }
        }
    },
    
    items: [{
        xtype: 'gridpanel',
        flex: 5,
        selModel: {
            listeners: {
                select: 'onRowSelect'
            }
        },
        store: {
            type: 'companies'
        },
        columns: [{
            text     : 'Company',
            flex     : 1,
            sortable : false,
            dataIndex: 'name'
        }, {
            text     : 'Price',
            width    : 95,
            sortable : true,
            formatter: 'usMoney',
            dataIndex: 'price'
        }, {
            text     : 'Change',
            width    : 80,
            sortable : true,
            renderer : function(val) {
                var out = Ext.util.Format.number(val, '0.00');
                if (val > 0) {
                    return '<span style="color:' + this.ownerCt.themeInfo.green + ';">' + out + '</span>';
                } else if (val < 0) {
                    return '<span style="color:' + this.ownerCt.themeInfo.red + ';">' + out + '</span>';
                }
                return out;
            },
            dataIndex: 'change'
        }, {
            text     : '% Change',
            width    : 110,
            sortable : true,
            renderer : function(val) {
                var out = Ext.util.Format.number(val, '0.00%');
                if (val > 0) {
                    return '<span style="color:' + this.ownerCt.themeInfo.green + ';">' + out + '</span>';
                } else if (val < 0) {
                    return '<span style="color:' + this.ownerCt.themeInfo.red + ';">' + out + '</span>';
                }
                return out;
            },
            dataIndex: 'pctChange'
        }, {
            text     : 'Last Updated',
            width    : 115,
            sortable : true,
            formatter: 'date("m/d/Y")',
            dataIndex: 'lastChange'
        }]
    }, {
        xtype: 'container',
        flex: 2,
        margin: 10,
        items: {
            xtype: 'fieldset',
            bind: {
                title: '{theCompany.name}'
            },
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'Price',
                bind: '{theCompany.price}'
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Change',
                bind: '{theCompany.change}'
            }, {
                xtype: 'numberfield',
                fieldLabel: '% Change',
                bind: '{theCompany.pctChange}'
            }, {
                xtype: 'datefield',
                fieldLabel: 'Last Change',
                bind: '{theCompany.lastChange}'
            }]
        }
    }],

    onRowSelect: function(selModel, rec) {
        this.getViewModel().set('theCompany', rec);
    }
});
