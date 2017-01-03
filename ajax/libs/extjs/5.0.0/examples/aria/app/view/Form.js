Ext.define('Aria.view.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.mysimpleform',
    
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.slider.Single',
        'Ext.form.CheckboxGroup',
        'Ext.form.RadioGroup',
        'Ext.form.FieldSet',
        'Ext.data.ArrayStore',
        'Ext.button.Button'
    ],
    
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 80,
        margin: '0 0 6 0'
    },
    
    width: 320,
    title: 'Personal Information',
    bodyPadding: 12,
    autoScroll: true,
    
    ariaAttributes: {
        'aria-atomic': true
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        height: 30,
        items: [{
            xtype: 'button',
            text: 'Submit',
            handler: function(btn) {
                var form, data;
                
                form = btn.up('form');
                data = form.getForm().getValues();
                
                Ext.Msg.alert(
                    'Form submit',
                    'Form data:<br><br>' + Ext.JSON.encode(data).replace(/(["\]])\,/g, '$1,<br>')
                );
            }
        }, {
            xtype: 'button',
            text: 'Cancel',
            handler: function() {
                Aria.app.msg('Notice', 'You have clicked Cancel button');
            }
        }]
    }],
    
    items:[{
        xtype: 'displayfield',
        fieldLabel: 'Purpose',
        value: 'Section 508 compliance'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        name: 'name',
        allowBlank: false
    }, {
        xtype: 'textfield',
        fieldLabel: 'Email',
        name: 'email',
        vtype: 'email'
    }, {
        xtype: 'combobox',
        fieldLabel: 'Company',
        name: 'company',
        store: {
            proxy: {
                type: 'memory',
                reader: 'array'
            },
            fields: [
                'company', 'abbr'
            ],
            data: [
                ['Apple Inc.', 'AAPL'],
                ['Cisco System Inc.', 'CSCO'],
                ['Google Inc.', 'GOOG'],
                ['Intel Corporation', 'INTC'],
                ['Level 3 Communications, Inc.'],
                ['Microsoft Corporation', 'MSFT'],
                ['Nokia Corporation', 'NOK'],
                ['Oracle Corporation', 'ORCL'],
                ['Starbucks Corporation', 'SBUX'],
                ['Yahoo INc.', 'YHOO']
            ]
        },
        queryMode: 'local',
        displayField: 'company',
        valueField: 'company',
        allowBlank: false
    }, {
        xtype: 'datefield',
        fieldLabel: 'Birth Date',
        name: 'birthdate',
        submitFormat: 'Y-m-d'
    }, {
        xtype: 'timefield',
        fieldLabel: 'Time',
        name: 'time',
        submitFormat: 'H:M:S'
    }, {
        xtype: 'sliderfield',
        fieldLabel: 'Size',
        name: 'size',
        value: 80,
        width: 250
    }, {
        xtype: 'checkboxgroup',
        fieldLabel: 'Music',
        defaultType: 'checkboxfield',
        columns: 2,
        items: [{
            boxLabel: 'Classical',
            name: 'classical',
            inputValue: '1',
            id: 'checkbox1'
        }, {
            boxLabel: 'Rock',
            name: 'rock',
            inputValue: '2',
            checked: true,
            id: 'checkbox2',
            required: true
        }, {
            boxLabel: 'Blues',
            name: 'blues',
            inputValue: '3',
            id: 'checkbox3'
        }]
    }, {
        xtype: 'radiogroup',
        fieldLabel: 'Color',
        // Arrange radio buttons into two columns, distributed vertically
        columns: 2,
        vertical: false,
        items: [{
            boxLabel: 'Red',
            name: 'color',
            inputValue: '1'
        }, {
            boxLabel: 'Blue',
            name: 'color',
            inputValue: '2',
            checked: true
        }]
    }, {
        xtype: 'fieldset',
        title: 'Drop Down FieldSet',
        collapsible: true,
        columnWidth: 0.5,
        layout: 'anchor',
        items: [{
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'description'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Duration',
            name: 'duration',
            step: 10,
            maxLength: 100,
            minLength: 0,
            value: 50
        }]
    }, {
        xtype: 'fieldset',
        title: 'Checkbox FieldSet',
        columnWidth: 0.5,
        checkboxToggle: true,
        layout: 'anchor',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'First Name',
            name: 'firstname'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Last Name',
            name: 'lastname'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Company Name',
            name: 'company'
        }]
    }]
});