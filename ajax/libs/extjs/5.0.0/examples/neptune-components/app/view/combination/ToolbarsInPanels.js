Ext.define('Neptune.view.combination.ToolbarsInPanels', {
    extend: 'Ext.container.Container',
    xtype: 'toolbarsInPanels',
    id: 'toolbarsInPanels',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        width: 400,
        height: 200,
        bodyPadding: 10,
        html: NeptuneAppData.dummyText,
        autoScroll: true
    },
    items: [
        {
            title: 'Horizontal Toolbars',
            tbar: { xtype: 'basicToolbar' },
            bbar: { xtype: 'basicToolbar' }
        },
        {
            title: 'Horizontal Toolbars Framed',
            frame: true,
            tbar: { xtype: 'basicToolbar' },
            bbar: { xtype: 'basicToolbar' }
        },
        {
            title: 'Vertical Toolbars',
            lbar: { xtype: 'basicToolbar' },
            rbar: { xtype: 'basicToolbar' }
        },
        {
            title: 'Vertical Toolbars Framed',
            frame: true,
            lbar: { xtype: 'basicToolbar' },
            rbar: { xtype: 'basicToolbar' }
        },
        {
            title: 'All Toolbars',
            height: 300,
            tbar: [ {xtype: 'complexButtonGroup' } ],
            bbar: { xtype: 'basicToolbar' },
            lbar: { xtype: 'basicToolbar' },
            rbar: { xtype: 'basicToolbar' }
        },
        {
            title: 'All Toolbars Framed',
            height: 300,
            frame: true,
            tbar: [ {xtype: 'complexButtonGroup' } ],
            bbar: { xtype: 'basicToolbar' },
            lbar: { xtype: 'basicToolbar' },
            rbar: { xtype: 'basicToolbar' }
        }
    ]
});