Ext.define('Neptune.view.button.widget.SimpleGroup', {
    extend: 'Ext.container.ButtonGroup',
    xtype: 'simpleButtonGroup',
    title: 'Simple Button Group',
    items: [
        { xtype: 'smallButton' },
        { xtype: 'smallMenuButton' },
        { xtype: 'smallSplitButton', icon: true }
    ]
});