Ext.define('Neptune.view.form.Forms', {
    extend: 'Ext.container.Container',
    xtype: 'forms',
    id: 'forms',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    items: [
        { xtype: 'basicForm' },
        { xtype: 'framedForm' },
        { xtype: 'fieldsetForm' },
        { xtype: 'framedFieldsetForm' }
    ]
});