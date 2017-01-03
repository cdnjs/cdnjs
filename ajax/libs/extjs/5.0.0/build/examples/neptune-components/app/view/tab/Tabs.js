Ext.define('Neptune.view.tab.Tabs', {
    extend: 'Ext.container.Container',
    xtype: 'tabs',
    id: 'tabs',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        width: 400,
        height: 300
    },
    items: [
        { xtype: 'basicTabPanel' },
        { xtype: 'framedTabPanel' },
        { xtype: 'basicPlainTabPanel' },
        { xtype: 'framedPlainTabPanel' }
    ]
});