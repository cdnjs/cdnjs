Ext.define('Neptune.view.toolbar.widget.Large', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'largeToolbar',

    items: [
        { xtype: 'largeButton' },
        { xtype: 'largeMenuButton' },
        { xtype: 'largeSplitButton', icon: true }
    ]
});