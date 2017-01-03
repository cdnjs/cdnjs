Ext.define('Neptune.view.toolbar.Toolbars', {
    extend: 'Ext.container.Container',
    xtype: 'toolbars',
    id: 'toolbars',

    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        width: 600,
        border: Neptune.theme === 'neptune' ? 4 : undefined
    },
    items: [
        { xtype: 'basicToolbar' },
        { xtype: 'verticalFieldsToolbar', width: null, rowspan: 5 },
        { xtype: 'verticalToolbar', width: null, rowspan: 10 },
        { xtype: 'mediumToolbar' },
        { xtype: 'largeToolbar' },
        { xtype: 'mixedToolbar' },
        { xtype: 'fieldsToolbar' },
        { xtype: 'fieldsToolbar2' },
        { xtype: 'verticalMenuOverflowToolbar', height: 170, width: null, rowspan: 3 },
        { xtype: 'menuOverflowToolbar' },
        { xtype: 'scrollerOverflowToolbar' },
        { xtype: 'simpleButtonGroupToolbar' },
        { xtype: 'verticalScrollerOverflowToolbar', height: 300, width: null, rowspan: 2 },
        { xtype: 'complexButtonGroupToolbar' }
    ]
});