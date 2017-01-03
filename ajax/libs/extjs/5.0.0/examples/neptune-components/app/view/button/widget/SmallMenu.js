Ext.define('Neptune.view.button.widget.SmallMenu', {
    extend: 'Neptune.view.button.widget.Small',
    xtype: 'smallMenuButton',
    text: 'Small Menu',
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
    ]
});