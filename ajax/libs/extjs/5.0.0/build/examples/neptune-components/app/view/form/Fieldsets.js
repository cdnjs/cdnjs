Ext.define('Neptune.view.form.Fieldsets', {
    extend: 'Ext.container.Container',
    xtype: 'fieldsets',
    id: 'fieldsets',

    layout: {
        type: 'table',
        columns: 1,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    items: [
        { xtype: 'basicFieldset' },
        { xtype: 'collapsibleFieldset' },
        { xtype: 'checkboxFieldset' }
    ]
});