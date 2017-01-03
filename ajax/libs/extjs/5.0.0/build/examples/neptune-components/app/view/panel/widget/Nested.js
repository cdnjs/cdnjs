Ext.define('Neptune.view.panel.widget.Nested', {
    extend: 'Ext.panel.Panel',
    xtype: 'nestedPanel',

    title: 'Nested Panels',
    layout: 'fit',
    width: 200,
    bodyPadding: 10,
    closable: true,
    items: [{
        title: 'Inner Panel',
        height: 152,
        html: NeptuneAppData.dummyText
    }]
});