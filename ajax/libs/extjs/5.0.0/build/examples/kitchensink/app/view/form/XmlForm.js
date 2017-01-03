/**
 * This is a very simple example of using XML for load and submit of data with an Ext
 * dynamic form.
 */
Ext.define('KitchenSink.view.form.XmlForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-xml',
    controller: 'form-xml',
    
    //<example>
    requires: [
        'Ext.data.reader.Xml',
        'KitchenSink.model.form.Contact',
        'KitchenSink.model.form.FieldError',
        'KitchenSink.view.form.XmlFormController'
    ],
    
    exampleTitle: 'XML Form',
    otherContent: [{
        type: 'Contact Model',
        path: 'app/model/form/Contact.js'
    }, {
        type: 'FieldError Model',
        path: 'app/model/form/FieldError.js'
    }, {
        type: 'Store',
        path: 'app/store/States.js'
    }, {
        type: 'ViewController',
        path: 'app/view/form/XmlFormController.js'
    }, {
        type: 'Load XML',
        path: 'resources/data/form/xml-form-data.xml'
    }, {
        type: 'Submit response',
        path: 'resources/data/form/xml-form-errors.xml'
    }],
    //</example>
    
    title:'XML Form',
    frame: true,
    width: 340,
    bodyPadding: 5,
    waitMsgTarget: true,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 85,
        msgTarget: 'side'
    },

    // configure how to read the XML data, using an instance
    reader: {
        type: 'xml',
        model: 'KitchenSink.model.form.Contact',
        record: 'contact',
        successProperty: '@success'
    },

    // configure how to read the XML error, using a config
    errorReader: {
        type: 'xml',
        model: 'KitchenSink.model.form.FieldError',
        record : 'field',
        successProperty: '@success'
    },

    items: [{
        xtype: 'fieldset',
        title: 'Contact Information',
        defaultType: 'textfield',
        defaults: {
            width: 280
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
            vtype:'email'
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
        text: 'Load',
        listeners: {
            click: 'onLoadClick'
        }
    }, {
        text: 'Submit',
        disabled: true,
        formBind: true,
        listeners: {
            click: 'onSubmitClick'
        }
    }]
});
