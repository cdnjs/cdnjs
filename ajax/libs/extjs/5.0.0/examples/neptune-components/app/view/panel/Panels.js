Ext.define('Neptune.view.panel.Panels', {
    extend: 'Ext.container.Container',
    xtype: 'panels',
    id: 'panels',

    layout: {
        type: 'table',
        columns: 4,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        height: 200,
        width: 200
    },
    items: [
        { xtype: 'basicPanel' },
        { xtype: 'collapsedPanel' },
        { xtype: 'noTitlePanel' },
        { xtype: 'nestedPanel' },
        { xtype: 'toolPanel', width: 700, height: 100, colspan: 4 }
    ]
});