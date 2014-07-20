Ext.define('Neptune.view.panel.FramedPanels', {
    extend: 'Ext.container.Container',
    xtype: 'framedPanels',
    id: 'framed-panels',

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
        { xtype: 'framedPanel' },
        { xtype: 'collapsedFramedPanel' },
        { xtype: 'noTitleFramedPanel' },
        { xtype: 'nestedFramedPanel' },
        { xtype: 'framedToolPanel', width: 700, height: 100, colspan: 4 }
    ]
});