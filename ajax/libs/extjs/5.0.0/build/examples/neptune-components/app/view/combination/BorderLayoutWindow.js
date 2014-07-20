Ext.define('Neptune.view.combination.BorderLayoutWindow', {
    extend: 'Ext.container.Container',
    xtype: 'borderLayoutWindow',
    id: 'borderLayoutWindow',

    items: [{
        xtype: 'window',
        x: 15,
        y: 15,
        title: 'Border Layout Window',
        closable: true,
        closeAction: 'hide',
        width: 600,
        minWidth: 350,
        height: 350,
        layout: {
            type: 'border',
            padding: 5
        },
        items: [{
            region: 'west',
            xtype: 'accordionPanel',
            width: 200,
            split: true,
            collapsible: true,
            floatable: false
        }, {
            region: 'center',
            xtype: 'tabpanel',
            items: [{
                title: 'Bogus Tab',
                layout: 'fit',
                items: [
                    {
                        xtype: 'basicGrid',
                        border: 0,
                        title: null,
                        columns: [
                            { text: 'Company', flex: 1, dataIndex: 'company', editor: 'textfield' },
                            { text: 'Price', width: 75, sortable: true, formatter: 'usMoney', dataIndex: 'price', editor: 'numberfield' },
                            { text: 'Last Updated', width: 85, sortable: true, formatter: 'date("m/d/Y")', dataIndex: 'lastChange', editor: 'datefield' }
                        ]
                    }
                ]
            }, {
                title: 'Another Tab',
                html: NeptuneAppData.dummyText
            }, {
                title: 'Closable Tab',
                html: NeptuneAppData.dummyText,
                closable: true
            }]
        }]
    }],

    afterRender: function() {
        this.floatingItems.getAt(0).show();
        this.callParent(arguments);
    }
});



