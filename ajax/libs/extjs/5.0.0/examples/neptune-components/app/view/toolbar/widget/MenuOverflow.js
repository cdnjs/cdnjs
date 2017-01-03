Ext.define('Neptune.view.toolbar.widget.MenuOverflow', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'menuOverflowToolbar',
    enableOverflow: true,
    items: [
        { xtype: 'smallButton' },
        { xtype: 'smallMenuButton', icon: true },
        { xtype: 'smallSplitButton' },
        { xtype: 'smallButton' },
        { xtype: 'smallMenuButton', icon: true },
        { xtype: 'smallSplitButton' },
        { xtype: 'smallButton' },
        { xtype: 'smallMenuButton', icon: true },
        { xtype: 'smallSplitButton' },
        { xtype: 'smallButton' },
        { xtype: 'smallMenuButton', icon: true },
        { xtype: 'smallSplitButton' },
        { xtype: 'smallButton' },
        { xtype: 'smallMenuButton', icon: true },
        { xtype: 'smallSplitButton' },
        { xtype: 'textField' },
        { xtype: 'comboBox' },
        { xtype: 'dateField' },
        { xtype: 'numberField' },
        { xtype: 'searchField' }
    ]
});