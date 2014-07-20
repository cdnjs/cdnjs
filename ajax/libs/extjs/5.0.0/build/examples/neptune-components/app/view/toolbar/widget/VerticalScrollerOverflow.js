Ext.define('Neptune.view.toolbar.widget.VerticalScrollerOverflow', {
    extend: 'Neptune.view.toolbar.widget.MenuOverflow',
    xtype: 'verticalScrollerOverflowToolbar',
    vertical: true,
    layout: {
        type: 'vbox',
        align: 'stretch',
        overflowHandler: 'Scroller'
    }
});