/**
 * This example shows simple data binding to models (Ext.data.Model). When the value is
 * changed by the user, the change is reflected to the model and is then validated by a
 * custom field type. The validation is reflected back to the form field to which the
 * value is bound.
 */
Ext.define('KitchenSink.view.binding.FieldValidation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-field-validation',
    //<example>
    otherContent: [{
        type: 'Model',
        path: 'app/model/Customer.js'
    },{
        type: 'Field',
        path: 'app/model/field/PhoneNumber.js'
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
        fieldLabel: 'Phone',
        msgTarget: 'side',
        bind: '{theCustomer.phone}'  // validation is from custom model field
    }]
});
