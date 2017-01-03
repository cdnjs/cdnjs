Ext.define('Neptune.view.combination.PanelTabToolbarGrid', function() {
    function getConfig(frame) {
        return {
            xtype: 'panel',
            width: 600,
            height: 500,
            frame: frame,
            title: 'Panel Tab Toolbar Grid' + (frame ? ' Framed' : ''),
            layout: 'fit',
            items: [
                {
                    xtype: 'tabpanel',
                    border: frame ? 1 : 0,
                    items: [
                        {
                            title: 'Active Tab',
                            xtype: 'basicGrid',
                            border: 0,
                            dockedItems: [{
                                xtype: 'pagingtoolbar',
                                store: 'Company',
                                dock: 'bottom',
                                displayInfo: true
                            }, {
                                dock: 'top',
                                xtype: 'toolbar',
                                items: [
                                    { xtype: 'smallButton', text: 'File' },
                                    { xtype: 'smallMenuButton', text: 'Edit', icon: true },
                                    { xtype: 'smallSplitButton', text: 'View' },
                                    '->',
                                    { xtype: 'searchField'}
                                ]
                            }]
                        },
                        { title: 'Inactive Tab', html: NeptuneAppData.dummyText },
                        { title: 'Disabled Tab', disabled: true, html: NeptuneAppData.dummyText }
                    ]
                }
            ],
            buttons: [
                { text: 'Submit' },
                { text: 'Cancel' }
            ]
        };
    }
    return {
        extend: 'Ext.container.Container',
        xtype: 'panelTabToolbarGrid',
        id: 'panelTabToolbarGrid',

        layout: {
            type: 'table',
            columns: 2,
            tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
        },

        items: [
            getConfig(),
            getConfig(true)
        ]
    };
});