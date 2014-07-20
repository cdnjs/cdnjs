/**
 * Demonstrates a simple registration form.
 */
Ext.define('KitchenSink.view.form.RegisterForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-register',
    
    //<example>
    requires: [
        'KitchenSink.model.State',
        'KitchenSink.store.States'
    ],
    
    exampleTitle: 'Registration Form',
    otherContent: [{
        type: 'Store',
        path: 'app/store/States.js'
    }, {
        type: 'Model',
        path: 'app/model/State.js'
    }],
    //</example>
    
    frame: true,
    title: 'Register',
    bodyPadding: 10,
    autoScroll:true,
    width: 355,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115,
        msgTarget: 'side'
    },
    
    items: [{
        xtype: 'fieldset',
        title: 'User Info',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        
        items: [
            { allowBlank:false, fieldLabel: 'User ID', name: 'user', emptyText: 'user id' },
            { allowBlank:false, fieldLabel: 'Password', name: 'pass', emptyText: 'password', inputType: 'password' },
            { allowBlank:false, fieldLabel: 'Verify', name: 'pass', emptyText: 'password', inputType: 'password' }
        ]
    }, {
        xtype: 'fieldset',
        title: 'Contact Information',
        
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        
        items: [{
            fieldLabel: 'First Name',
            emptyText: 'First Name',
            name: 'first'
        }, {
            fieldLabel: 'Last Name',
            emptyText: 'Last Name',
            name: 'last'
        }, {
            fieldLabel: 'Company',
            name: 'company'
        }, {
            fieldLabel: 'Email',
            name: 'email',
            vtype: 'email'
        }, {
            xtype: 'combobox',
            fieldLabel: 'State',
            name: 'state',
            store: {
                type: 'states'
            },
            valueField: 'abbr',
            displayField: 'state',
            typeAhead: true,
            queryMode: 'local',
            emptyText: 'Select a state...'
        }, {
            xtype: 'datefield',
            fieldLabel: 'Date of Birth',
            name: 'dob',
            allowBlank: false,
            maxValue: new Date()
        }]
    }],

    buttons: [{
        text: 'Register',
        disabled: true,
        formBind: true
    }]
});
