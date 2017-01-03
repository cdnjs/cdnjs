Ext.define('Ext.rtl.chart.LegendItem', {
    override: 'Ext.chart.LegendItem',
    
    updatePosition: function(relativeTo) {
        var me = this,
            items = me.items,
            ln = items.length,
            legend = me.legend,
            currentX = me.x,
            currentY = me.y,
            item, i, x, y, translate, o, width,
            relativeX, relativeY;
            
        if (!relativeTo) {
            relativeTo = legend;
        }
            
        if (!legend.chart.getInherited().rtl || !relativeTo.width) {
            me.callParent(arguments);
            return;
        }
        
        relativeX = relativeTo.x;
        relativeY = relativeTo.y;
        width = relativeTo.width;
        for (i = 0; i < ln; i++) {
            translate = true;
            item = items[i];
            switch (item.type) {
                case 'text':
                    x = width + relativeX + currentX - 30 - item.getBBox().width; // -25 & -5 for a gap
                    y = relativeY + currentY;
                    translate = false;
                    break;
                case 'rect':
                    x = width + relativeX + currentX - 25;
                    y = relativeY + currentY - 6;
                    break;
                default:
                    x = width + relativeX + currentX - 25;
                    y = relativeY + currentY;
            }
            
            o = {
                x: x,
                y: y
            };
            
            item.setAttributes(translate ? {
                translate: o
            } : o, true);
        }
    }    
});
