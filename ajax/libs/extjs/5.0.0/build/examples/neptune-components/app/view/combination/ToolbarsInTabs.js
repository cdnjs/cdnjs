Ext.define('Neptune.view.combination.ToolbarsInTabs', {
    extend: 'Ext.container.Container',
    xtype: 'toolbarsInTabs',
    id: 'toolbarsInTabs',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        width: 400,
        height: 200
    },
    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: 'Active Tab',
                    html: NeptuneAppData.dummyText,
                    tbar: { xtype: 'basicToolbar' },
                    bbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: NeptuneAppData.dummyText },
                { title: 'Disabled Tab', disabled: true, html: NeptuneAppData.dummyText }
            ]
        },
        {
            xtype: 'tabpanel',
            frame: true,
            items: [
                {
                    title: 'Active Tab',
                    html: NeptuneAppData.dummyText,
                    tbar: { xtype: 'basicToolbar' },
                    bbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: NeptuneAppData.dummyText },
                { title: 'Disabled Tab', disabled: true, html: NeptuneAppData.dummyText }
            ]
        },
        {
            xtype: 'tabpanel',
            items: [
                {
                    title: 'Active Tab',
                    html: NeptuneAppData.dummyText,
                    lbar: { xtype: 'basicToolbar' },
                    rbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: NeptuneAppData.dummyText },
                { title: 'Disabled Tab', disabled: true, html: NeptuneAppData.dummyText }
            ]
        },
        {
            xtype: 'tabpanel',
            frame: true,
            items: [
                {
                    title: 'Active Tab',
                    html: NeptuneAppData.dummyText,
                    lbar: { xtype: 'basicToolbar' },
                    rbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: NeptuneAppData.dummyText },
                { title: 'Disabled Tab', disabled: true, html: NeptuneAppData.dummyText }
            ]
        },
        {
            xtype: 'tabpanel',
            height: 300,
            items: [
                {
                    title: 'Active Tab',
                    html: NeptuneAppData.dummyText,
                    tbar: [ {xtype: 'complexButtonGroup' } ],
                    bbar: { xtype: 'basicToolbar' },
                    lbar: { xtype: 'basicToolbar' },
                    rbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: NeptuneAppData.dummyText },
                { title: 'Disabled Tab', disabled: true, html: NeptuneAppData.dummyText }
            ]
        },
        {
            xtype: 'tabpanel',
            height: 300,
            frame: true,
            items: [
                {
                    title: 'Active Tab',
                    html: NeptuneAppData.dummyText,
                    tbar: [ {xtype: 'complexButtonGroup' } ],
                    bbar: { xtype: 'basicToolbar' },
                    lbar: { xtype: 'basicToolbar' },
                    rbar: { xtype: 'basicToolbar' }
                },
                { title: 'Inactive Tab', html: NeptuneAppData.dummyText },
                { title: 'Disabled Tab', disabled: true, html: NeptuneAppData.dummyText }
            ]
        }
    ]
});