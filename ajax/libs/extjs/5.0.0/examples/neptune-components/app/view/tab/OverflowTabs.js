Ext.define('Neptune.view.tab.OverflowTabs', {
    extend: 'Ext.container.Container',
    xtype: 'overflowTabs',
    id: 'overflowTabs',

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
        { xtype: 'overflowTabPanel' },
        { xtype: 'overflowTabPanel', frame: true },
        { xtype: 'overflowTabPanel', tabPosition: 'bottom' },
        { xtype: 'overflowTabPanel', tabPosition: 'bottom', frame: true }
    ]
});