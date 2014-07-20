/**
 * Advanced validation examples using VTypes
 */
Ext.define('KitchenSink.view.form.AdvancedVTypes', {
    extend: 'Ext.container.Container',
    xtype: 'form-advtypes',
    controller: 'form-advtypes',
    
    //<example>
    requires: [
        'KitchenSink.AdvancedVType',
        'KitchenSink.view.form.AdvancedVTypesController'
    ],
    
    exampleTitle: 'Advanced VTypes',
    otherContent: [{
        type: 'ViewController',
        path: 'app/view/form/AdvancedVTypesController.js'
    }, {
        type: 'VType',
        path: 'app/AdvancedVType.js'
    }],
    //</example>
    
    defaults: {
        style: {
            'margin-bottom': '20px'
        }
    },
    
    width: 500,
    
    items: [{
        xtype: 'box', // same as 'component'
        html: [
            '<p>The first example shows two date fields acting as a date range. ',
            'Selecting an initial date sets the minimum value for the end field. ',
            'Selecting an ending date sets a maximum value for the start field.</p>'
        ]
    }, {
        xtype: 'form',
        title: 'Date Range',
        frame: true,
        bodyPadding: '5 5 0',
        
        style: {
            'margin-bottom': '40px'
        },
        
        fieldDefaults: {
            msgTarget: 'side',
            autoFitErrors: false
        },
        
        layout: 'form',
        
        defaultType: 'datefield',
        
        items: [{
            fieldLabel: 'Start Date',
            name: 'startdt',
            itemId: 'startdt',
            vtype: 'daterange',
            endDateField: 'enddt' // id of the end date field
        }, {
            fieldLabel: 'End Date',
            name: 'enddt',
            itemId: 'enddt',
            vtype: 'daterange',
            startDateField: 'startdt' // id of the start date field
        }]
    }, {
        xtype: 'box',
        html: [
            '<p>This second example shows a password verification, the second value must be equivalent',
            'to the first to validate.</p>'
        ]
    }, {
        xtype: 'form',
        frame: true,
        title: 'Password Verification',
        bodyPadding: '5 5 0',
        
        layout: 'form',
        
        fieldDefaults: {
            msgTarget: 'side',
            autoFitErrors: false
        },
        
        defaults: {
            inputType: 'password'
        },
        defaultType: 'textfield',
        
        items: [{
            fieldLabel: 'Password',
            name: 'pass',
            itemId: 'pass',
            allowBlank: false,
            listeners: {
                validitychange: 'validateField',
                blur: 'validateField'
            }
        }, {
            fieldLabel: 'Confirm Password',
            name: 'pass-cfrm',
            vtype: 'password',
            initialPassField: 'pass' // id of the initial password field
        }]
    }]
});
