Ext.define('Neptune.view.button.widget.ComplexGroup', {
    extend: 'Ext.container.ButtonGroup',
    xtype: 'complexButtonGroup',
    title: 'Complex Button Group',
    columns: 4,

    items: [
        { xtype: 'largeSplitButton', text: 'Paste', icon: true, iconAlign: 'top', arrowAlign: 'bottom', rowspan: 3 },
        { xtype: 'mediumMenuButton', arrowAlign: 'bottom', text: 'New File', rowspan: 2 },
        { xtype: 'smallSplitButton', text: 'Print', icon: true },
        { xtype: 'smallMenuButton', text: 'Tools' },
        { xtype: 'smallButton', text: 'Close Tab' },
        { xtype: 'mediumSplitButton', arrowAlign: 'bottom', rowspan: 2, text: 'Open', icon: true },
        { xtype: 'smallButton', text: 'Edit', icon: true },
        { xtype: 'smallButton', text: 'New Tab' }
    ]
});