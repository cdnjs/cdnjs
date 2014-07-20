Ext.define('Neptune.view.form.widget.Basic', {
    extend: 'Ext.form.Panel',
    xtype: 'basicForm',

    title: 'Basic Form',
    width: 300,
    bodyPadding: 10,
    defaults: {
        anchor: '100%'
    },
    items: [
        { xtype: 'textField' },
        { xtype: 'comboBox' },
        { xtype: 'numberField' }
    ],
    buttons: [
        { text: 'Submit' },
        { text: 'Cancel' }
    ]
});