/**
 * The sidebar view for the application. Used to display a list of books.
 * @extends Ext.view.View
 */
Ext.define('Books.view.book.SideBar', {
    alias: 'widget.booksidebar',
    extend: 'Ext.view.View',
    
    initComponent: function() {
        Ext.apply(this, {
            id: 'sidebar',
            
            dock: 'left',
            width: 180,
            border: false,
            cls: 'sidebar-list',
            
            selModel: {
                deselectOnContainerClick: false
            },
            
            itemSelector: '.product',
            tpl: [
                '<div class="sidebar-title">Books</div>',
                '<tpl for=".">',
                    '<div class="product">{name}</div>',
                '</tpl>'
            ]
        });
                
        this.callParent(arguments);
    }
});