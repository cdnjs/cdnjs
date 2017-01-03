/**
 * This form is a popup window used by the ChildSession view. This view is
 * added as a contained window so we use the same ViewController instance.
 */
Ext.define('KitchenSink.view.binding.ChildSessionForm', {
    extend: 'Ext.window.Window',
    xtype: 'binding-child-session-form',
    //<example>
    requires: [
        'Ext.form.Panel',
        'Ext.layout.container.Fit',
        'Ext.form.field.Text',
        'Ext.grid.Panel'
    ],
    title: 'Edit', // needed for bind/title - should fix setTitle
    //</example>

    bind: {
        title: 'Edit {theCustomer.name}'
    },
    layout: 'fit',
    modal: true,
    width: 400,
    height: 350,
    closable: true,

    items: {
        xtype: 'form',
        bodyPadding: 10,
        border: false,
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name',
            reference: 'name',
            bind: '{theCustomer.name}'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Phone',
            reference: 'phone',
            bind: '{theCustomer.phone}'
        }, {
            xtype: 'grid',
            reference: 'orders',
            margin: '10 0 0 0',
            title: 'Orders',
            bind: '{theCustomer.orders}',
            columns: [{
                text: 'Id',
                dataIndex: 'id',
                width: 30
            }, {
                xtype: 'datecolumn',
                text: 'Date',
                dataIndex: 'date',
                format: 'Y-m-d',
                flex: 1
            }, {
                xtype: 'checkcolumn',
                text: 'Shipped', 
                dataIndex: 'shipped'
            }, {
               xtype: 'widgetcolumn',
                width: 90,
                widget: {
                    xtype: 'button',
                    text: 'Remove',
                    handler: 'onRemoveClick'
                }
            }]
        }]
    },

    buttons: [{
        text: 'Save',
        handler: 'onSaveClick'
    }, {
        text: 'Cancel',
        handler: 'onCancelClick'
    }]
});
