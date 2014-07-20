Ext.define('Neptune.view.toolbar.widget.Mixed', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'mixedToolbar',

    items: [
        { xtype: 'largeButton' },
        { xtype: 'mediumMenuButton', icon: true },
        { xtype: 'smallSplitButton', arrowAlign: 'bottom', icon: true, iconAlign: 'top' }
    ]
});