/**
 * The FieldContainer\'s child items are arranged like in any other container, using the
 * layout configuration property. In this example, each FieldContainer is set to use an
 * HBox layout.
 *
 * FieldContainers can be configured with the combineErrors option, which combines errors
 * from the sub fields and presents them at the container level. In this example the
 * Availability, Phone and Full Name items have this option enabled, and the Time worked
 * item does not.
 */
Ext.define('KitchenSink.view.form.FieldContainer', {
    extend: 'Ext.form.Panel',
    xtype: 'form-fieldcontainer',
    controller: 'form-fieldcontainer',

    //<example>
    requires: [
        'KitchenSink.model.PartTimeEmployee',
        'KitchenSink.view.form.FieldContainerController'
    ],

    exampleTitle: 'Field Container',
    otherContent: [{
        type: 'Model',
        path: 'app/model/PartTimeEmployee.js'
    }, {
        type: 'ViewController',
        path: 'app/view/form/FieldContainerController.js'
    }],
    //</example>

    title: 'Employee Information',
    width: 600,
    bodyPadding: 10,
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },
    items: [{
        xtype: 'textfield',
        name: 'email',
        fieldLabel: 'Email Address',
        vtype: 'email',
        msgTarget: 'side',
        allowBlank: false
    }, {
        xtype: 'fieldcontainer',
        fieldLabel: 'Availability',
        combineErrors: true,
        msgTarget : 'side',
        layout: 'hbox',
        defaults: {
            flex: 1,
            hideLabel: true
        },
        items: [{
            xtype: 'datefield',
            name: 'startDate',
            fieldLabel: 'Start',
            margin: '0 5 0 0',
            allowBlank: false
        }, {
            xtype     : 'datefield',
            name      : 'endDate',
            fieldLabel: 'End',
            allowBlank: false
        }]
    }, {
        xtype: 'fieldset',
        title: 'Details',
        collapsible: true,
        defaults: {
            labelWidth: 89,
            anchor: '100%',
            layout: {
                type: 'hbox',
                defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
            }
        },
        items: [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Phone',
            combineErrors: true,
            msgTarget: 'under',
            defaults: {
                hideLabel: true
            },
            items: [
                {xtype: 'displayfield', value: '('},
                {xtype: 'textfield',    fieldLabel: 'Phone 1', name: 'phone-1', width: 45, allowBlank: false},
                {xtype: 'displayfield', value: ')'},
                {xtype: 'textfield',    fieldLabel: 'Phone 2', name: 'phone-2', width: 45, allowBlank: false, margin: '0 5 0 0'},
                {xtype: 'displayfield', value: '-'},
                {xtype: 'textfield',    fieldLabel: 'Phone 3', name: 'phone-3', width: 60, allowBlank: false}
            ]
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Time worked',
            combineErrors: false,
            defaults: {
                hideLabel: true
            },
            items: [{
               name : 'hours',
               xtype: 'numberfield',
               width: 95,
               allowBlank: false
           }, {
               xtype: 'displayfield',
               value: 'hours'
           }, {
               name : 'minutes',
               xtype: 'numberfield',
               width: 95,
               allowBlank: false
           }, {
               xtype: 'displayfield',
               value: 'mins'
            }]
        }, {
            xtype : 'fieldcontainer',
            combineErrors: true,
            msgTarget: 'side',
            fieldLabel: 'Full Name',
            defaults: {
                hideLabel: true
            },
            items: [{
                //the width of this field in the HBox layout is set directly
                //the other 2 items are given flex: 1, so will share the rest of the space
                width: 75,
                xtype: 'combo',
                queryMode: 'local',
                value: 'mrs',
                triggerAction: 'all',
                forceSelection: true,
                editable: false,
                fieldLabel: 'Title',
                name: 'title',
                displayField: 'name',
                valueField: 'value',
                store: {
                    fields: ['name', 'value'],
                    data: [
                        {name : 'Mr',   value: 'mr'},
                        {name : 'Mrs',  value: 'mrs'},
                        {name : 'Miss', value: 'miss'}
                    ]
                }
            }, {
                xtype: 'textfield',
                flex : 1,
                name : 'firstName',
                fieldLabel: 'First',
                allowBlank: false
            }, {
                xtype: 'textfield',
                flex : 1,
                name : 'lastName',
                fieldLabel: 'Last',
                allowBlank: false
            }]
        }]
    }],
    
    buttons: [{
        text   : 'Load test data',
        handler: 'onLoadClick'
    }, {
        text   : 'Save',
        handler: 'onSaveClick'
    }, {
        text   : 'Reset',
        handler: 'onResetClick'
    }]
});