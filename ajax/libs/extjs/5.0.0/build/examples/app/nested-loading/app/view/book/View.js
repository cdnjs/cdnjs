/**
 * The view which displays information about a speficied book
 * @extends Ext.panel.Panel
 */
Ext.define('Books.view.book.View', {
    alias: 'widget.bookview',
    extend: 'Ext.panel.Panel',
    
    requires: ['Ext.Img'],
    
    initComponent: function() {
        Ext.apply(this, {
            cls: 'item-ct',
            flex: 2,
            border: false,
            autoScroll: true,
            layout: {
                type : 'hbox',
                align: 'middle',
                pack : 'center',
                availableSpaceOffset: Ext.getScrollbarSize().width
            },
            
            items: [{
                xtype: 'image',
                itemId: 'imgCt',
                src: Ext.BLANK_IMAGE_URL,
                margin: '0 20 0 0',
                width : 250,
                height: 308
            }, {
                xtype: 'component',
                tpl: [
                    '<div class="name">{name} <span>${price}</span></div>',
                    '<div class="author">By {author}</div>',
                    '<div class="detail">{detail}</div>'
                ],
                itemId: 'contentCt',
                width: 500,
                border: false
            }]
        });
                
        this.callParent(arguments);
    },
    
    /**
     * Binds a record to this view
     */
    bind: function(record) {
        this.child('#imgCt').setSrc(record.get('image'));
        this.child('#contentCt').update(record.getData());
    }
});