Ext.define('Neptune.view.button.Groups', {
    extend: 'Ext.container.Container',
    xtype: 'buttonGroups',
    id: 'buttonGroups',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; text-align: center;' }
    },

    items: [
        { xtype: 'simpleButtonGroup' },
        { xtype: 'complexButtonGroup' }
    ]
});