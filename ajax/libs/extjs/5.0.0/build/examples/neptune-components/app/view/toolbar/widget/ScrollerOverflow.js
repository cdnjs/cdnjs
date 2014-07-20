Ext.define('Neptune.view.toolbar.widget.ScrollerOverflow', {
    extend: 'Neptune.view.toolbar.widget.MenuOverflow',
    xtype: 'scrollerOverflowToolbar',
    layout: {
        type: 'hbox',
        overflowHandler: 'Scroller'
    }
});