/**
 * In the following example, the space needed for the email validation error message is
 * taken automatically from the field size when needed. The mousedown event is being used
 * for validation for more immediate feedback. Also note that the FormPanel itself is
 * using an HBox layout.
 */
Ext.define('KitchenSink.view.form.HBoxLayoutForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-hboxlayout',
    
    //<example>
    requires: [
        'Ext.layout.container.Anchor',
        'Ext.layout.container.HBox'
    ],
    
    exampleTitle: 'HBox Layout Form',
    //</example>

    title: 'HBox Form Panel',
    bodyPadding: '5 5 0',
    width: 600,
    
    fieldDefaults: {
        labelAlign: 'top',
        msgTarget: 'side'
    },
    
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: 'anchor'
    },

    layout: 'hbox',
    
    items: [{
        items: [{
            xtype: 'textfield',
            fieldLabel: 'First Name',
            anchor: '-5',
            name: 'first'
        }, {
            xtype:'textfield',
            fieldLabel: 'Company',
            anchor: '-5',
            name: 'company'
        }]
    }, {
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Last Name',
            anchor: '100%',
            name: 'last'
        },{
            xtype: 'textfield',
            fieldLabel: 'Email',
            anchor: '100%',
            name: 'email',
            vtype: 'email'
        }]
    }],
    
    buttons: ['->', {
        text: 'Save'
    }, {
        text: 'Cancel'
    }]
});
