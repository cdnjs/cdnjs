/**
 * This example shows simple data binding to models (Ext.data.Model). When the value is
 * changed by the user, the change is reflected to the model and is then validated. The
 * validation is reflected back to the form field to which the value is bound. The
 * validation is based on the length of the field. By looking at the model code, you can
 * see the validator that is attached to the field.
 */
Ext.define('KitchenSink.view.binding.ModelValidation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-model-validation',
    //<example>
    otherContent: [{
        type: 'Model',
        path: 'app/model/Customer.js'
    }],

    defaults: {
        labelWidth: 50
    },
    width: 300,
    bodyPadding: 10,
    //</example>

    title: 'Customer Details',

    // This connects bound form fields to the associated model validators:
    modelValidation: true,

    session: true,
    viewModel: {
        links: {
            theCustomer: {
                reference: 'Customer',
                id: 1
            }
        }
    },

    items: [{
        xtype: 'textfield',
        fieldLabel: 'Name',
        msgTarget: 'side',
        bind: '{theCustomer.name}'  // three-way: read, write, validate
    }]
});
