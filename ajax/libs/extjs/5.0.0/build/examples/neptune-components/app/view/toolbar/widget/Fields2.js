Ext.define('Neptune.view.toolbar.widget.Fields2', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'fieldsToolbar2',

    defaults: {
        hideLabel: true
    },
    items: [
        { xtype: 'checkboxes', vertical: false },
        { xtype: 'radioButtons', vertical: false },
        { xtype: 'searchField' }
    ]
});