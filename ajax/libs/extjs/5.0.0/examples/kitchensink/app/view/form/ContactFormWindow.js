Ext.define('KitchenSink.view.form.ContactFormWindow', {
    extend: 'Ext.window.Window',
    xtype: 'form-contact-window',
    
    reference: 'popupWindow',
    
    title: 'Contact Us',
    width: 400,
    minWidth: 300,
    minHeight: 300,
    layout: 'fit',
    resizable: true,
    modal: true,
    defaultFocus: 'firstName',
    closeAction: 'hide',
    
    items: [{
        xtype: 'form',
        reference: 'windowForm',
        
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        bodyPadding: 10,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold'
        },
        
        items: [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Your Name',
            labelStyle: 'font-weight:bold;padding:0;',
            layout: 'hbox',
            defaultType: 'textfield',

            fieldDefaults: {
                labelAlign: 'top'
            },

            items: [{
                flex: 1,
                name: 'firstName',
                itemId: 'firstName',
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                ],
                fieldLabel: 'First',
                allowBlank: false
            }, {
                width: 30,
                name: 'middleInitial',
                fieldLabel: 'MI',
                margin: '0 0 0 5'
            }, {
                flex: 2,
                name: 'lastName',
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                ],
                fieldLabel: 'Last',
                allowBlank: false,
                margin: '0 0 0 5'
            }]
        }, {
            xtype: 'textfield',
            fieldLabel: 'Your Email Address',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            vtype: 'email',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Subject',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            allowBlank: false
        }, {
            xtype: 'textareafield',
            fieldLabel: 'Message',
            labelAlign: 'top',
            flex: 1,
            margin: '0',
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            allowBlank: false
        }],

        buttons: [{
            text: 'Cancel',
            handler: 'onFormCancel'
        }, {
            text: 'Send',
            handler: 'onFormSubmit'
        }]
    }]
});
