/**
 * This example shows how to use the date/month pickers.
 */
Ext.define('KitchenSink.view.form.Date', {
    extend: 'Ext.container.Container',
    xtype: 'form-date',
    
    //<example>
    requires: [
        'Ext.panel.Panel',
        'Ext.picker.Date',
        'Ext.picker.Month',
        'Ext.layout.container.VBox',
        'Ext.layout.container.HBox'
    ],
    exampleTitle: 'Date/Month Picking',
    themes: {
        classic: {
            width: 400
        },
        neptune: {
            width: 465
        },
        'neptune-touch': {
            width: 600
        }
    },
    //</example>
    
    layout: {
        type: 'vbox',
        align: 'center'
    },
    
    width: 500,

    items: [{
        xtype: 'container',
        layout: 'hbox',
        margin: '0 0 20 0',
        items: [{
            title: 'Date Picker',
            margin: '0 20 0 0',
            items: {
                xtype: 'datepicker'
            }
        }, {
            title: 'Month Picker',
            items: {
                xtype: 'monthpicker'
            }
        }]
    }, {
        xtype: 'container',
        layout: 'hbox',
        items: [{
            title: 'Date Picker (no today)',
            margin: '0 20 0 0',
            items: {
                xtype: 'datepicker',
                showToday: false
            }
        }, {
            title: 'Month Picker (no buttons)',
            items: {
                xtype: 'monthpicker',
                showButtons: false
            }
        }]
    }],
    
    initComponent: function() {
        this.width = this.themeInfo.width;
        
        this.callParent();
    }
});
