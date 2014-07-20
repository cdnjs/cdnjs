Ext.define('Neptune.view.toolbar.widget.SimpleButtonGroup', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'simpleButtonGroupToolbar',

    items: [
        { xtype: 'simpleButtonGroup' },
        { xtype: 'smallSplitButton' }
    ]
});