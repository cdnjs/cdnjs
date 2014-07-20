/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Books.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Books.view.Header',
        'Books.view.book.View',
        'Books.view.book.SideBar',
        'Books.view.review.List'
    ],
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    id    : 'viewport',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    
                    dockedItems: [
                        Ext.create('Books.view.Header'),
                        Ext.create('Books.view.book.SideBar')
                    ],
                    
                    items: [
                        Ext.create('Books.view.book.View'),
                        Ext.create('Books.view.review.List')
                    ]
                }
            ]
        });
                
        me.callParent(arguments);
    }
});