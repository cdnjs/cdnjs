Ext.define('Ext.rtl.chart.Legend', {
    override: 'Ext.chart.Legend',
    
    init: function() {
        var me = this;   
        
        me.callParent(arguments);
        me.position = me.chart.invertPosition(me.position);    
        me.rtl = me.chart.getInherited().rtl;
    },
    
    updateItemDimensions: function() {
        var me = this,
            result = me.callParent(),
            padding = me.padding,
            spacing = me.itemSpacing,
            items = me.items,
            len = items.length,
            mfloor = Math.floor,
            width = result.totalWidth,
            usedWidth = 0,
            i, item, itemWidth;
            
        if (me.rtl && !me.isVertical) {
            for (i = 0; i < len; ++i) {
                item = items[i];
 
                // Set the item's position relative to the legend box
                itemWidth = mfloor(item.getBBox().width + spacing);
                item.x = -usedWidth + padding;
                usedWidth += itemWidth;
            }
        }
        return result;
    }
});
