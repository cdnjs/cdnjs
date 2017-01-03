Ext.define('Neptune.view.panel.widget.Accordion', {
    extend: 'Ext.panel.Panel',
    xtype: 'accordionPanel',

    layout: 'accordion',
    title: 'Accordion Panel',
    items: [
        { xtype: 'basicPanel', title: 'Inbox' },
        { xtype: 'basicPanel', title: 'Sent Items' },
        { xtype: 'basicPanel', title: 'Trash' },
        { xtype: 'basicPanel', title: 'Junk Mail' }
    ]
});