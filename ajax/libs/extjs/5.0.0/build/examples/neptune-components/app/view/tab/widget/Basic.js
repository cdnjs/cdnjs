Ext.define('Neptune.view.tab.widget.Basic', {
    extend: 'Ext.tab.Panel',
    xtype: 'basicTabPanel',
    defaults: {
        icon: '../shared/icons/fam/feed_add.png'
    },
    items: [
        { title: 'Active Tab', closable: true, html: NeptuneAppData.dummyText },
        { title: 'Inactive Tab', closable: true, html: NeptuneAppData.dummyText },
        { title: 'Disabled Tab', closable: true, disabled: true, html: NeptuneAppData.dummyText }
    ]
});