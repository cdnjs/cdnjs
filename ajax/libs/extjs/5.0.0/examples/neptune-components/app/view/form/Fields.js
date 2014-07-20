Ext.define('Neptune.view.form.Fields', {
    extend: 'Ext.container.Container',
    xtype: 'formFields',
    id: 'formFields',

    items: [
        { xtype: 'textField' },
        { xtype: 'comboBox' },
        { xtype: 'dateField' },
        { xtype: 'numberField' },
        { xtype: 'searchField' },
        { xtype: 'checkboxes', width: 250 },
        { xtype: 'radioButtons', width: 250 },
        { xtype: 'textArea' },
        { xtype: 'htmlEditor' },
        { xtype: 'datepicker' }
    ]
});