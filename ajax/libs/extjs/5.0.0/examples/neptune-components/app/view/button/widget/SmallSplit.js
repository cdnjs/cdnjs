Ext.define('Neptune.view.button.widget.SmallSplit', {
    extend: 'Ext.button.Split',
    xtype: 'smallSplitButton',
    text: 'Small Split',
    menu: [
        {text: 'Menu item'},
        {text: 'Check 1', checked: true},
        {text: 'Check 2', checked: false},
        '-',
        {text: 'Option 1', checked: true,  group: 'opts'},
        {text: 'Option 2', checked: false, group: 'opts'},
        '-',
        {
            text: 'Sub-items',
            menu: Ext.widget('menu', {
                items: [
                    {text: 'Item 1'},
                    {text: 'Item 2'}
                ]
            })
        }
    ],

    constructor: function(cfg) {
        if (cfg.icon) {
            this.iconCls = 'btn-add';
        }
        this.callParent(arguments);
    }
});